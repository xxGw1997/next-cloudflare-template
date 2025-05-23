import type { MetadataRoute } from 'next'

import { locales } from '@/i18n/routing'

export const runtime = 'edge'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

  // 定义所有路由
  const routes = ['', '/about']

  const entries: MetadataRoute.Sitemap = []

  for (const route of routes) {
    for (const locale of locales) {
      entries.push({
        url: `${baseUrl}/${locale.code}${route}`
      })
    }
  }

  return entries
}
