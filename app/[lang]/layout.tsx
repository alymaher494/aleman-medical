import type { Metadata } from 'next'
import { Cairo } from 'next/font/google'
import '../globals.css'

const cairo = Cairo({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cairo',
})

export const metadata: Metadata = {
  title: 'Al Eman Medical & Scientific Services | الإيمان للخدمات الطبية والعلمية',
  description: 'شريكك الموثوق لحلول المختبرات المتكاملة منذ أكثر من 30 عاماً',
}

import { i18n, type Locale } from '../../i18n-config'

export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params

  return (
    <html lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <body className={`${cairo.variable} font-cairo bg-white text-gray-900`}>
        {children}
      </body>
    </html>
  )
}
