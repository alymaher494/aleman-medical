import { getDictionary } from '@/lib/get-dictionary'
import { fetchServices, fetchClients, fetchPosts } from '@/lib/wordpress'
import type { Locale } from '@/i18n-config'
import Header from '@/components/Header'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import ServicesWordPress from '@/components/sections/ServicesWordPress'
import FeaturedProducts from '@/components/sections/FeaturedProducts'
import ClientsWordPress from '@/components/sections/ClientsWordPress'
import ValueProposition from '@/components/sections/ValueProposition'
import BlogInsightsWordPress from '@/components/sections/BlogInsightsWordPress'
import FinalCTA from '@/components/sections/FinalCTA'
import Footer from '@/components/Footer'

export default async function HomeWordPress({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params
    const dict = await getDictionary(lang as Locale)

    // Convert language code to WordPress Polylang format (AR, EN)
    const wpLanguage = lang.toUpperCase() as 'AR' | 'EN'

    // Fetch data from WordPress
    const [services, clients, posts] = await Promise.all([
        fetchServices(wpLanguage),
        fetchClients(wpLanguage),
        fetchPosts(wpLanguage),
    ])

    return (
        <main className="overflow-x-hidden">
            <Header lang={lang} navigation={dict.navigation} header={dict.header} />
            <Hero lang={lang} dict={dict.hero} />
            <About dict={dict.about} lang={lang} />
            <ServicesWordPress services={services} dict={dict.services_section} lang={lang} />
            <FeaturedProducts dict={dict.products_section} lang={lang} />
            <ClientsWordPress clients={clients} dict={dict.clients_section} lang={lang} />
            <ValueProposition dict={dict.value_proposition} lang={lang} />
            <BlogInsightsWordPress posts={posts} dict={dict.blog_section} lang={lang} />
            <FinalCTA dict={dict.final_cta} lang={lang} />
            <Footer dict={dict.footer} lang={lang} />
        </main>
    )
}
