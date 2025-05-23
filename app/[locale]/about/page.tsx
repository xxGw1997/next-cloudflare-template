import { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'

import { Link } from '@/i18n/navigation'

export const runtime = 'edge'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('AboutPage.meta')
  const site = await getTranslations('siteInfo')

  return {
    title: t('title', {
      brandName: site('brandName')
    }),
    description: t('description', {
      brandName: site('brandName')
    })
  }
}

const About = () => {
  const t = useTranslations('AboutPage')

  return (
    <div>
      <p>{t('title')}</p>
      <Link href="/">{t('home')}</Link>
    </div>
  )
}

export default About
