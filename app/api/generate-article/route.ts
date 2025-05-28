import { NextRequest, NextResponse } from 'next/server'

import { auth } from '@/lib/auth'
import { generateArticle } from '@/actions/ai-content'

interface RequestBody {
  keyword: string
  locale?: string
}

export async function POST(request: NextRequest) {
  const session = await auth()
  if (session?.user?.id !== process.env.NEXT_PUBLIC_ADMIN_ID) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const body: RequestBody = await request.json()
    const { keyword, locale } = body

    if (!keyword) {
      return NextResponse.json({ error: 'Keyword is required' }, { status: 400 })
    }

    const article = await generateArticle({ keyword, locale })
    return NextResponse.json(article)
  } catch (error: any) {
    console.error('Generate article error:', error)
    return NextResponse.json({ error: error.message || 'Failed to generate article' }, { status: 500 })
  }
}
