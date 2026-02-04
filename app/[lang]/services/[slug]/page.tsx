import { getDictionary } from '@/lib/get-dictionary'
import { Locale } from '@/i18n-config'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FinalCTA from '@/components/sections/FinalCTA'
import PageHeader from '@/components/PageHeader'
import ServiceClient from '@/components/pages/ServiceClient'
import { fetchServiceBySlug } from '@/lib/wordpress'

// Helper to get local fallback image based on slug
const getFallbackImage = (slug: string) => {
    const images: Record<string, string> = {
        'microbiology': '/assets/services/microbiology.png',
        'chemicals': '/assets/services/chemicals.png',
        'media': '/assets/services/media.png',
        'strains': '/assets/services/strains.png',
        'lab-equipment': '/assets/services/equipment.png',
        'glassware': '/assets/services/glassware.png',
        'consumables': '/assets/services/consumables.png',
        'lab-setup': '/assets/services/lab-setup.png',
    }
    return images[slug] || '/assets/services/lab-setup.png'
}

export default async function ServicePage({ params }: { params: Promise<{ lang: Locale, slug: string }> }) {
    const { lang, slug } = await params
    const dict = await getDictionary(lang)
    const isAr = lang === 'ar'

    // Fetch service from WordPress
    const wpService = await fetchServiceBySlug(slug)

    // Build the service object
    const service = wpService ? {
        title: wpService.title,
        description: wpService.serviceFields?.description || wpService.content?.replace(/<[^>]*>?/gm, ''),
        image: wpService.featuredImage?.node?.sourceUrl || getFallbackImage(slug),
        features: isAr ? [
            'تصميم هندسي عالي الجودة يتوافق مع المعايير الدولية',
            'توريد وتركيب أحدث أجهزة التحليل والقياس',
            'تدريب شامل للطاقم الفني على التشغيل والصيانة',
            'دعم فني متخصص ومستمر بعد التوريد',
        ] : [
            'High-quality engineering design compliant with global standards',
            'Supply and installation of latest analytical instruments',
            'Comprehensive technical staff training on operation',
            'Continuous specialized technical support after delivery'
        ],
        process: isAr ? [
            { title: 'الاستشارة والمعاينة', desc: 'تحديد الاحتياجات الدقيقة بناءً على تخصص المختبر.' },
            { title: 'التصميم الهندسي', desc: 'توزيع الأجهزة لضمان انسيابية العمل والسلامة.' },
            { title: 'التوريد والتركيب', desc: 'توريد الأجهزة من وكلائنا العالميين وتركيبها بدقة.' },
        ] : [
            { title: 'Consultation', desc: 'Identifying exact needs based on lab specialization.' },
            { title: 'Engineering Design', desc: 'Optimizing equipment layout for workflow and safety.' },
            { title: 'Supply & Installation', desc: 'Delivering equipment from global partners and expert setup.' },
        ],
        relatedProducts: []
    } : {
        // Full local fallback data if WP record doesn't exist yet
        title: dict?.services_section?.items?.[slug.replace('-', '_')]?.title || (isAr ? 'خدمة مخبرية متخصصة' : 'Specialized Lab Service'),
        description: dict?.services_section?.items?.[slug.replace('-', '_')]?.desc || (isAr ? 'نقدم حلولاً متكاملة لهذه الخدمة وفق أعلى المعايير.' : 'We provide integrated solutions for this service.'),
        image: getFallbackImage(slug),
        features: isAr ? ['جودة عالية', 'دعم فني'] : ['High Quality', 'Technical Support'],
        process: isAr ? [{ title: 'بدء العمل', desc: 'دراسة المتطلبات' }] : [{ title: 'Start', desc: 'Requirement study' }],
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
