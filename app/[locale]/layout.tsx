import { SessionProvider } from 'next-auth/react'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { notFound } from 'next/navigation'
import { locales, routing } from '@/i18n/routing'

import Container from '@/components/container'
import Footer from '@/components/footer'
import Header from '@/components/header'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'

import type { Metadata } from 'next'

import '../globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://blog.zzwxy.xyz'),
  title: {
    template: '%s | BrandName',
    default: 'BrandName'
  },
  description: 'Think, Write, Code',
  icons: {
    icon: '/logo.svg'
  },
  authors: [{ name: 'xxgw', url: 'https://github.com/xxgw1997' }],
  creator: 'xxgw',
  openGraph: {
    images: ['/logo.svg']
  }
}

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  const currentLocale = locales.find((l) => l.code === locale)

  return (
    <html lang={currentLocale?.code ?? 'en'} dir={currentLocale?.dir || 'ltr'} suppressHydrationWarning>
      <body className="antialiased">
        <NextIntlClientProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <SessionProvider>
              <Header />
              <Container>{children}</Container>
              <Footer />
            </SessionProvider>
            <Toaster richColors />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
