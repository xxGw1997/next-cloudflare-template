import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'

import { getArticleBySlug } from '@/actions/ai-content'
import BlogBody from '@/components/blog/blog-body'
import { formatDate } from '@/lib/utils'

interface PostSlugPageProps {
  params: Promise<{
    slug: string
  }>
}

export const revalidate = 3600

export async function generateMetadata({ params }: PostSlugPageProps) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  const t = await getTranslations('blog')
  const siteInfoT = await getTranslations('siteInfo')

  if (!article) {
    return {
      title: t('postNotFound'),
      description: t('postNotFoundDescription')
    }
  }

  return {
    title: `${article.title} | ${siteInfoT('brandName')}`,
    description: article.excerpt
  }
}

const PostSlugPage = async ({ params }: PostSlugPageProps) => {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  const t = await getTranslations('blog')

  if (!article || !article.publishedAt) {
    notFound()
  }

  return (
    <article className="prose prose-invert prose-code:before:hidden prose-code:after:hidden max-w-none">
      <div className="mb-8 text-sm">{t('publishedAt', { date: formatDate(article.publishedAt) })}</div>
      <BlogBody content={article.content} />
    </article>
  )
}

export default PostSlugPage
