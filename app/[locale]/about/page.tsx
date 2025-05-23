import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'

export const runtime = 'edge'

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
