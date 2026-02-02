import { getDictionary } from '@/lib/get-dictionary'
import { Locale } from '@/i18n-config'
import ContactClient from '@/components/pages/ContactClient'

export default async function ContactPage({ params }: { params: Promise<{ lang: Locale }> }) {
    const { lang } = await params
    const dict = await getDictionary(lang)

    return <ContactClient dict={dict} lang={lang} />
}
