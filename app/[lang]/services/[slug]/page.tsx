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

    // Match slug to dictionary key
    const dictKey = slug.replace(/-/g, '_')
    const dictService = dict?.services_section?.items?.[dictKey]

    // Build the service object
    const service = wpService ? {
        title: wpService.title,
        description: wpService.serviceFields?.description || wpService.content?.replace(/<[^>]*>?/gm, ''),
        image: wpService.featuredImage?.node?.sourceUrl || getFallbackImage(slug),
        features: wpService.serviceFields?.features || (isAr ? [
            `توفير ${wpService.title} بأعلى معايير الجودة العالمية`,
            'دعم فني متخصص ومستمر لضمان أفضل النتائج',
            'حلول متكاملة تلبّي احتياجات المختبرات الحديثة',
            'الالتزام بمعايير السلامة والجودة والاعتماد',
        ] : [
            `Providing ${wpService.title} with highest international standards`,
            'Continuous specialized technical support for best results',
            'Integrated solutions meeting modern laboratory needs',
            'Commitment to safety, quality, and accreditation standards'
        ]),
        process: isAr ? [
            { title: 'الاستشارة والمعاينة', desc: 'تحديد الاحتياجات الدقيقة بناءً على تخصص المختبر.' },
            { title: 'التوريد والتركيب', desc: 'توريد المنتجات والأجهزة من وكلائنا العالميين.' },
            { title: 'التشغيل والدعم', desc: 'ضمان سير العمل وتقديم الدعم الفني اللازم.' },
        ] : [
            { title: 'Consultation', desc: 'Identifying exact needs based on laboratory specialization.' },
            { title: 'Supply & Delivery', desc: 'Delivering products and equipment from global partners.' },
            { title: 'Operation & Support', desc: 'Ensuring workflow and providing necessary technical support.' },
        ],
        relatedProducts: []
    } : {
        // Full local fallback data if WP record doesn't exist yet
        title: dictService?.title || (isAr ? 'خدمة مخبرية متخصصة' : 'Specialized Lab Service'),
        description: dictService?.desc || (isAr ? 'نقدم حلولاً متكاملة لهذه الخدمة وفق أعلى المعايير.' : 'We provide integrated solutions for this service.'),
        image: getFallbackImage(slug),
        features: isAr ? [
            'جودة عالية وموثوقية',
            'دعم فني متخصص',
            'حلول متكاملة',
            'التزام بالمعايير الدولية'
        ] : [
            'High Quality & Reliability',
            'Specialized Technical Support',
            'Integrated Solutions',
            'International Standards Compliance'
        ],
        process: isAr ? [
            { title: 'دراسة المتطلبات', desc: 'تحديد التجهيزات والمواد اللازمة.' },
            { title: 'التجهيز والتوريد', desc: 'توفير كافة المستلزمات بدقة.' },
            { title: 'متابعة الجودة', desc: 'التأكد من مطابقة النتائج للمعايير.' },
        ] : [
            { title: 'Requirement Study', desc: 'Identifying necessary equipment and materials.' },
            { title: 'Supply & Prep', desc: 'Providing all requirements accurately.' },
            { title: 'Quality Follow-up', desc: 'Ensuring results match standards.' },
        ],
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
