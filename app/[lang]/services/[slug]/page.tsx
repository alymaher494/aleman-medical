import { getDictionary } from '@/lib/get-dictionary'
import { Locale } from '@/i18n-config'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FinalCTA from '@/components/sections/FinalCTA'
import PageHeader from '@/components/PageHeader'
import ServiceClient from '@/components/pages/ServiceClient'

export default async function ServicePage({ params }: { params: Promise<{ lang: Locale, slug: string }> }) {
    const { lang, slug } = await params
    const dict = await getDictionary(lang)

    // Mock data for the template - normally would fetch based on params.slug
    const isAr = lang === 'ar'
    const service = {
        title: isAr ? 'تجهيز المختبرات المتكامل' : 'Integrated Lab Setup',
        description: isAr
            ? 'نقدم حلولاً هندسية وتقنية متكاملة لتأسيس المختبرات الطبية والبحثية ومختبرات مراقبة الجودة، بدءاً من التصميم وحتى التشغيل والاعتماد.'
            : 'We provide integrated engineering and technical solutions for establishing medical, research, and quality control laboratories, from design to operation and accreditation.',
        image: 'https://images.unsplash.com/photo-1581093588401-fbb07e1136c3?q=80&w=1200',
        features: isAr ? [
            'تصميم هندسي مطابق لمعايير ISO 17025',
            'تجهيز كامل للأثاث المخبري (Benches & Hoods)',
            'توريد وتركيب أجهزة التحليل الرئيسية',
            'أنظمة التهوية والسلامة المهنية',
            'تدريب الطاقم الفني ودعم الاعتماد',
        ] : [
            'Engineering design compliant with ISO 17025',
            'Full lab furniture setup (Benches & Hoods)',
            'Supply and installation of main analytical instruments',
            'Ventilation and occupational safety systems',
            'Technical staff training and accreditation support',
        ],
        process: isAr ? [
            { title: 'الاستشارة والمعاينة', desc: 'دراسة الموقع وتحديد الاحتياجات الدقيقة للمختبر بناءً على التخصص.' },
            { title: 'التصميم الهندسي', desc: 'رسم المخططات وتوزيع الأجهزة لضمان انسيابية العمل والسلامة.' },
            { title: 'التوريد والتركيب', desc: 'توريد أحدث الأجهزة من وكلائنا العالميين وتركيبها بواسطة خبرائنا.' },
            { title: 'التشغيل والتدريب', desc: 'اختبار كفاءة الأجهزة وتدريب الفريق على التشغيل والصيانة.' },
        ] : [
            { title: 'Consultation & Inspection', desc: 'Site study and identification of exact lab needs based on specialization.' },
            { title: 'Engineering Design', desc: 'Drafting plans and equipment distribution for workflow efficiency and safety.' },
            { title: 'Supply & Installation', desc: 'Supplying latest equipment from our global partners and installing by our experts.' },
            { title: 'Operation & Training', desc: 'Testing equipment efficiency and training the team on operation and maintenance.' },
        ],
        relatedProducts: [
            { id: 101, name: 'Autoclave Steam Sterilizer', category: isAr ? 'أجهزة التعقيم' : 'Sterilization', image: 'https://images.unsplash.com/photo-1582719188393-bb71ca45dbb9?q=80&w=400' },
            { id: 102, name: 'Laminar Flow Hood', category: isAr ? 'أثاث مخبري' : 'Lab Furniture', image: 'https://images.unsplash.com/photo-1617135002237-640989f6671a?q=80&w=400' },
            { id: 103, name: 'Precision Balance', category: isAr ? 'أجهزة وزنية' : 'Precision Instruments', image: 'https://images.unsplash.com/photo-1584820927997-7cfaa3e414c9?q=80&w=400' },
        ]
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
