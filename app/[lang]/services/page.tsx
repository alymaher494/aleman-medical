import { getDictionary } from '@/lib/get-dictionary'
import { Locale } from '@/i18n-config'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHeader from '@/components/PageHeader'
import Services from '@/components/sections/Services'
import FinalCTA from '@/components/sections/FinalCTA'

export default async function ServicesPage({ params }: { params: Promise<{ lang: Locale }> }) {
    const { lang } = await params
    const dict = await getDictionary(lang)

    return (
        <main className="bg-white min-h-screen">
            <Header lang={lang} navigation={dict.navigation} header={dict.header} />

            <PageHeader
                title={dict.navigation.services}
                subtitle={dict.services_section.description}
                breadcrumb={[{ label: dict.navigation.services }]}
                lang={lang}
            />

            <Services dict={dict.services_section} lang={lang} />

            <FinalCTA dict={dict.final_cta} lang={lang} />
            <Footer dict={dict.footer} lang={lang} />
        </main>
    )
}
