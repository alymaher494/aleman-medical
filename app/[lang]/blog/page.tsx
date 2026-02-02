import { getDictionary } from '@/lib/get-dictionary'
import { Locale } from '@/i18n-config'
import BlogClient from '@/components/pages/BlogClient'

export default async function BlogPage({ params }: { params: Promise<{ lang: Locale }> }) {
    const { lang } = await params
    const dict = await getDictionary(lang)

    const isAr = lang === 'ar'

    // Mock Posts with i18n support
    const posts = [
        {
            id: 1,
            title: isAr ? 'أهمية معايير الجودة ISO 17025 في المختبرات الطبية' : 'Importance of ISO 17025 Quality Standards in Medical Labs',
            excerpt: isAr ? 'تعرف على الشروط الأساسية للحصول على اعتماد الأيزو لمختبرك وطرق تطبيقها بفعالية لضمان دقة النتائج المخبرية والاعتراف الدولي.' : 'Learn the basic requirements for obtaining ISO accreditation for your lab and how to apply them effectively to ensure accurate results and international recognition.',
            date: isAr ? '15 أكتوبر 2025' : 'October 15, 2025',
            author: isAr ? 'د. أحمد فتحي' : 'Dr. Ahmed Fathi',
            category: isAr ? 'الجودة والاعتماد' : 'Quality & Accreditation',
            image: 'https://images.unsplash.com/photo-1579165466741-7f35a4755657?q=80&w=1600',
            slug: 'iso-17025-importance'
        },
        {
            id: 2,
            title: isAr ? 'دليل اختيار السلالات المرجعية المناسبة لاختبارات الميكروبيولوجي' : 'Guide to Choosing the Right Reference Strains for Microbiology Tests',
            excerpt: isAr ? 'كيف تختار السلالة المرجعية (Reference Strain) الصحيحة من ATCC لضمان نجاح اختبارات الرقابة النوعية والتحقق من الميديا.' : 'How to choose the correct Reference Strain from ATCC to ensure the success of quality control tests and media validation.',
            date: isAr ? '02 نوفمبر 2025' : 'November 02, 2025',
            author: isAr ? 'فريق الأيمان العلمي' : 'Al Eman Scientific Team',
            category: isAr ? 'ميكروبيولوجي' : 'Microbiology',
            image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=800',
            slug: 'choosing-reference-strains'
        },
        {
            id: 3,
            title: isAr ? 'أحدث تقنيات التعقيم في مصانع الأغذية والأدوية' : 'Latest Sterilization Techniques in Food & Pharma Factories',
            excerpt: isAr ? 'استعراض لأحدث أجهزة الأوتوكلاف وأنظمة التعقيم بالبخار الجاف المستخدمة عالمياً لضمان أعلى مستويات الأمان والتعقيم.' : 'Review of the latest autoclave devices and dry steam sterilization systems used worldwide to ensure the highest levels of safety and sterilization.',
            date: isAr ? '20 سبتمبر 2025' : 'September 20, 2025',
            author: isAr ? 'م. محمد علي' : 'Eng. Mohamed Ali',
            category: isAr ? 'أجهزة ومعدات' : 'Equipment',
            image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=800',
            slug: 'sterilization-techniques'
        },
        {
            id: 4,
            title: isAr ? 'تصميم المختبرات الكيميائية: معايير الأمان والتوزيع الفراغي' : 'Chemical Lab Design: Safety Standards and Spatial Distribution',
            excerpt: isAr ? 'دليل شامل حول كيفية تصميم مختبر كيميائي آمن، مع التركيز على أنظمة التهوية، وتوزيع طاولات العمل، ومخارج الطوارئ.' : 'A comprehensive guide on how to design a safe chemical laboratory, focusing on ventilation systems, laboratory furniture distribution, and emergency exits.',
            date: isAr ? '05 ديسمبر 2025' : 'December 05, 2025',
            author: isAr ? 'د. سارة محمود' : 'Dr. Sarah Mahmoud',
            category: isAr ? 'تجهيز المختبرات' : 'Lab Setup',
            image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=800',
            slug: 'chemical-lab-design'
        },
        {
            id: 5,
            title: isAr ? 'أهمية الكواشف عالية النقاء في دقة التحاليل الدوائية' : 'Importance of High Purity Reagents in Pharma Analysis Accuracy',
            excerpt: isAr ? 'لماذا تعتبر المادة الخام وجودة الكاشف هي العنصر الحاسم في الحصول على نتائج دقيقة في مختبرات الرقابة الدوائية.' : 'Why raw materials and reagent quality are critical factors in obtaining accurate results in pharmaceutical control laboratories.',
            date: isAr ? '12 يناير 2026' : 'January 12, 2026',
            author: isAr ? 'فريق الأيمان العلمي' : 'Al Eman Scientific Team',
            category: isAr ? 'الكيماويات' : 'Chemicals',
            image: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?q=80&w=800',
            slug: 'high-purity-reagents'
        }
    ]

    return <BlogClient dict={dict} lang={lang} posts={posts} />
}
