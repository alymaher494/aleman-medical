import { getDictionary } from '@/lib/get-dictionary'
import { Locale } from '@/i18n-config'
import SinglePostClient from '@/components/pages/SinglePostClient'

export default async function SingleBlogPost({ params }: { params: Promise<{ lang: Locale, slug: string }> }) {
    const { lang, slug } = await params
    const dict = await getDictionary(lang)

    // In dynamic reality, fetch by slug. Here we match the mock slug.
    const isAr = lang === 'ar'

    const post = {
        title: isAr ? 'أهمية معايير الجودة ISO 17025 في المختبرات الطبية' : 'The Importance of ISO 17025 Quality Standards in Medical Labs',
        date: isAr ? '15 أكتوبر 2025' : 'October 15, 2025',
        author: isAr ? 'د. أحمد فتحي' : 'Dr. Ahmed Fathi',
        authorRole: isAr ? 'خبير استشاري جودة' : 'Quality Consultant Expert',
        readTime: isAr ? '5 دقائق قراءة' : '5 min read',
        category: isAr ? 'الجودة والاعتماد' : 'Quality & Accreditation',
        image: 'https://images.unsplash.com/photo-1579165466741-7f35a4755657?q=80&w=1600',
        tags: isAr ? ['جودة', 'ISO_17025', 'تحاليل_طبية', 'اعتماد'] : ['Quality', 'ISO_17025', 'Medical_Analysis', 'Accreditation'],
        content: isAr ? `
            <p class="lead">تعتبر المواصفة القياسية ISO/IEC 17025 من أهم المعايير العالمية التي تحدد الكفاءة الفنية للمختبرات الطبية ومختبرات المعايرة. الحصول على هذا الاعتماد ليس مجرد شهادة تعلق على الحائط، بل هو دليل قاطع على دقة النتائج التي يصدرها مختبرك.</p>
            
            <h3>لماذا الـ ISO 17025 مهمة؟</h3>
            <p>تضمن هذه المواصفة أن المختبر يمتلك نظام إدارة جودة فعال، وكفاءة فنية عالية، وقدرة على إنتاج نتائج اختبار ومعايرة دقيقة وثابتة. وهذا يعزز الثقة بين المختبر وعملائه، سواء كانوا مرضى، أطباء، أو جهات رقابية.</p>
            
            <h3>الخطوات الأساسية للتجهيز للاعتماد:</h3>
            <ul>
                <li><strong>دراسة الفجوة (Gap Analysis):</strong> تحديد الفرق بين الوضع الحالي للمختبر ومتطلبات المواصفة.</li>
                <li><strong>تجهيز البنية التحتية:</strong> التأكد من أن الأجهزة، البيئة، والمرافق تلبي المعايير المطلوبة.</li>
                <li><strong>التوثيق:</strong> إعداد دليل الجودة، إجراءات العمل القياسية (SOPs)، وسجلات الأجهزة.</li>
                <li><strong>التدريب:</strong> تأهيل الكادر الفني والإداري لفهم وتطبيق متطلبات المواصفة.</li>
            </ul>

            <blockquote>"الجودة ليست فعلاً، بل هي عادة." - في المختبرات، الجودة هي الفرق بين التشخيص الصحيح والخطأ الطبي.</blockquote>

            <h3>دور شركة الأيمان في رحلة اعتمادك</h3>
            <p>نحن في الأيمان لا نكتفي بتوريد الأجهزة، بل نساعدك في اختيار الأجهزة التي تتوافق مع متطلبات الـ ISO، ونقدم لك شهادات المعايرة الأولية (IQ/OQ/PQ) التي تعتبر جزءاً أساسياً من ملف الاعتماد.</p>
            <p>تواصل معنا اليوم للبدء في تقييم مختبرك وتجهيزه لأعلى مستويات الدقة العالمية.</p>
        ` : `
            <p class="lead">The ISO/IEC 17025 standard is one of the most important international standards that define the technical competence of medical and calibration laboratories. Obtaining this accreditation is not just a certificate on the wall; it is definitive proof of the accuracy of the results your laboratory issues.</p>
            
            <h3>Why is ISO 17025 Important?</h3>
            <p>This standard ensures that the laboratory has an effective quality management system, high technical competence, and the ability to produce accurate and consistent test and calibration results. This enhances trust between the lab and its clients, whether they are patients, doctors, or regulatory bodies.</p>
            
            <h3>Key Steps to Prepare for Accreditation:</h3>
            <ul>
                <li><strong>Gap Analysis:</strong> Determining the difference between the current state of the lab and the requirements of the standard.</li>
                <li><strong>Infrastructure Preparation:</strong> Ensuring that equipment, environment, and facilities meet the required standards.</li>
                <li><strong>Documentation:</strong> Preparing the quality manual, Standard Operating Procedures (SOPs), and equipment logs.</li>
                <li><strong>Training:</strong> Qualifying technical and administrative staff to understand and apply the requirements of the standard.</li>
            </ul>

            <blockquote>"Quality is not an act, it is a habit." - In laboratories, quality is the difference between a correct diagnosis and a medical error.</blockquote>

            <h3>The Role of Al Eman in Your Accreditation Journey</h3>
            <p>At Al Eman, we don't just supply equipment; we help you choose devices that comply with ISO requirements and provide initial calibration certificates (IQ/OQ/PQ), which are an essential part of the accreditation file.</p>
            <p>Contact us today to start evaluating and preparing your laboratory for the highest international levels of accuracy.</p>
        `,
        relatedPosts: [
            { id: 1, title: isAr ? 'كيف تختار السلالات المرجعية؟' : 'How to Choose Reference Strains?', category: isAr ? 'علوم الحياة' : 'Life Sciences', image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=400', slug: 'choosing-reference-strains' },
            { id: 2, title: isAr ? 'أحدث تقنيات التعقيم بالبخار' : 'Latest Steam Sterilization Tech', category: isAr ? 'الأجهزة' : 'Equipment', image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=400', slug: 'sterilization-techniques' }
        ]
    }

    return <SinglePostClient dict={dict} lang={lang} post={post} />
}
