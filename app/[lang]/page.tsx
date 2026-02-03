import Header from '@/components/Header'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Services from '@/components/sections/Services'
import FeaturedProducts from '@/components/sections/FeaturedProducts'
import Clients from '@/components/sections/Clients'
import ValueProposition from '@/components/sections/ValueProposition'
import BlogInsights from '@/components/sections/BlogInsights'
import FinalCTA from '@/components/sections/FinalCTA'
import Footer from '@/components/Footer'
import { getDictionary } from '../../lib/get-dictionary'
import { Locale } from '../../i18n-config'
import { fetchServices, fetchClients, fetchPosts } from '@/lib/wordpress'

export default async function Home({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params
  const dict = await getDictionary(lang)

  // Fetch WordPress data in parallel
  let wpServices: any[] = []
  let wpClients: any[] = []
  let wpPosts: any[] = []

  const wpLang = lang.toUpperCase() as 'AR' | 'EN'

  try {
    const [services, clients, posts] = await Promise.all([
      fetchServices(wpLang),
      fetchClients(wpLang),
      fetchPosts(wpLang)
    ])
    wpServices = services || []
    wpClients = clients || []
    wpPosts = posts || []
  } catch (error) {
    console.error('Error fetching WordPress data:', error)
  }

  return (
    <main className="overflow-x-hidden">
      <Header lang={lang} navigation={dict.navigation} header={dict.header} />
      <Hero lang={lang} dict={dict.hero} />
      <About dict={dict.about} lang={lang} />
      <Services dict={dict.services_section} lang={lang} wpServices={wpServices} />
      <FeaturedProducts dict={dict.products_section} lang={lang} />
      <Clients dict={dict.clients_section} lang={lang} wpClients={wpClients} />
      <ValueProposition dict={dict.value_proposition} lang={lang} />
      <BlogInsights dict={dict.blog_section} lang={lang} wpPosts={wpPosts} />
      <FinalCTA dict={dict.final_cta} lang={lang} />
      <Footer dict={dict.footer} lang={lang} />
    </main>
  )
}
