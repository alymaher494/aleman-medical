import { getDictionary } from '@/lib/get-dictionary'
import { Locale } from '@/i18n-config'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FinalCTA from '@/components/sections/FinalCTA'
import PageHeader from '@/components/PageHeader'
import ServiceClient from '@/components/pages/ServiceClient'
import { fetchServiceBySlug } from '@/lib/wordpress'
import { notFound } from 'next/navigation'

export default async function ServicePage({ params }: { params: Promise<{ lang: Locale, slug: string }> }) {
    const { lang, slug } = await params
    const dict = await getDictionary(lang)
    const isAr = lang === 'ar'

    // Fetch service from WordPress
    const wpService = await fetchServiceBySlug(slug)

    if (!wpService) {
        // Fallback to static data if not in WP yet - or return notFound() if you prefer
        // For development, let's keep the mock object but use WP data if it exists
        if (slug !== 'lab-setup') {
            // return notFound() // Uncomment after importing all services to WP
        }
    }

    const service = wpService ? {
        title: wpService.title,
        description: wpService.serviceFields?.description || wpService.content,
        image: wpService.featuredImage?.node?.sourceUrl || 'https://images.unsplash.com/photo-1581093588401-fbb07e1136c3?q=80&w=1200',
        features: isAr ? [
            'تصميم هندسي عالي الجودة',
            'توريد وتركيب أجهزة التحليل',
            'تدريب الطاقم الفني',
            'دعم فني متخصص',
        ] : [
            'High-quality engineering design',
            'Supply and installation of instruments',
            'Technical staff training',
            'Specialized technical support'
        ],
        process: isAr ? [
            { title: 'الاستشارة', desc: 'تحديد الاحتياجات الدقيقة للمختبر.' },
            { title: 'التصميم', desc: 'رسم المخططات وتوزيع الأجهزة.' },
            { title: 'التوريد', desc: 'توريد أحدث الأجهزة من وكلائنا.' },
        ] : [
            { title: 'Consultation', desc: 'Identification of exact lab needs.' },
            { title: 'Design', desc: 'Drafting plans and equipment distribution.' },
            { title: 'Supply', desc: 'Supplying latest equipment from partners.' },
        ],
        relatedProducts: []
    } : {
        title: isAr ? 'تجهيز المختبرات المتكامل' : 'Integrated Lab Setup',
        description: isAr
            ? 'نقدم حلولاً هندسية وتقنية متكاملة لتأسيس المختبرات الطبية والبحثية.'
            : 'We provide integrated engineering and technical solutions for medical labs.',
        image: 'https://images.unsplash.com/photo-1581093588401-fbb07e1136c3?q=80&w=1200',
        features: isAr ? ['تصميم ISO', 'أثاث مخبري'] : ['ISO design', 'Lab furniture'],
        process: isAr ? [{ title: 'معاينة', desc: 'دراسة الموقع' }] : [{ title: 'Site study', desc: 'Inspection' }],
        relatedProducts: []
    }

    return (
        <main className="bg-white min-h-screen">
            <Header lang={lang} navigation={dict.navigation} header={dict.header} />

            <PageHeader
                title={service.title}
                breadcrumb={[
                    { label: dict.navigation.services, href: `/${lang}/services` },
                    { label: service.title }
                ]}
                lang={lang}
            />

            <ServiceClient service={service} dict={dict} lang={lang} />

            <FinalCTA dict={dict.final_cta} lang={lang} />
            <Footer dict={dict.footer} lang={lang} />
        </main>
    )
}
