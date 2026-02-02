import { getDictionary } from '@/lib/get-dictionary'
import { Locale } from '@/i18n-config'
import AboutClient from '@/components/pages/AboutClient'
import Footer from '@/components/Footer' // Assuming Footer component path

export default async function AboutPage({ params }: { params: Promise<{ lang: Locale }> }) {
    const { lang } = await params
    const dict = await getDictionary(lang)

    return (
        <>
            <AboutClient dict={dict} lang={lang} />
            <Footer dict={dict.footer} lang={lang} />
        </>
    )
}
