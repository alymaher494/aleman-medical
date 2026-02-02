import { getDictionary } from '@/lib/get-dictionary'
import { Locale } from '@/i18n-config'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FinalCTA from '@/components/sections/FinalCTA'
import ProductClient from '@/components/pages/ProductClient'

export default async function ProductPage({ params }: { params: Promise<{ lang: Locale, slug: string }> }) {
    const { lang, slug } = await params
    const dict = await getDictionary(lang)

    const isAr = lang === 'ar'
    // Mock Data
    const product = {
        title: isAr ? 'ATCC® 25922™ Escherichia coli' : 'ATCC® 25922™ Escherichia coli',
        category: isAr ? 'السلالات المرجعية (Microbiology)' : 'Reference Strains (Microbiology)',
        brand: 'ATCC',
        sku: 'ATCC-25922',
        description: isAr
            ? 'سلالة مرجعية قياسية من الإشريكية القولونية (E. coli)، تستخدم على نطاق واسع في اختبارات مراقبة الجودة، الحساسية للمضادات الحيوية، والبحث العلمي. معتمدة ومطابقة للمواصفات العالمية.'
            : 'Standard reference strain of Escherichia coli (E. coli), widely used in quality control tests, antibiotic sensitivity, and scientific research. Certified and compliant with global specs.',
        stockStatus: isAr ? 'متوفر في المخزون' : 'In Stock',
        isCertified: true,
        images: [
            'https://images.unsplash.com/photo-1579165466741-7f35a4755657?q=80&w=800',
            'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=800',
            'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=800',
        ],
        specs: isAr ? [
            { label: 'الرقم الكودي (Catalog No)', value: '25922' },
            { label: 'التصنيف الحيوي', value: 'Bacteria, Gram-negative' },
            { label: 'وسط النمو (Growth Medium)', value: 'Nutrient Agar' },
            { label: 'درجة حرارة الحفظ', value: '-80°C to -196°C (Liquid Nitrogen)' },
            { label: 'مستوى السلامة (Biosafety)', value: 'Level 1' },
        ] : [
            { label: 'Catalog No', value: '25922' },
            { label: 'Biological Classification', value: 'Bacteria, Gram-negative' },
            { label: 'Growth Medium', value: 'Nutrient Agar' },
            { label: 'Storage Temp', value: '-80°C to -196°C (Liquid Nitrogen)' },
            { label: 'Biosafety Level', value: 'Level 1' },
        ],
        downloads: [
            { name: 'Technical Data Sheet (TDS)', size: '1.2 MB' },
            { name: 'Material Safety Data Sheet (MSDS)', size: '850 KB' },
            { name: 'Certificate of Analysis (CoA)', size: '500 KB' },
        ],
        related: [
            { id: 1, name: isAr ? 'Staphylococcus aureus subsp. aureus' : 'Staphylococcus aureus subsp. aureus', category: isAr ? 'السلالات المرجعية' : 'Reference Strains', image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=400' },
            { id: 2, name: isAr ? 'Pseudomonas aeruginosa (Schroeter)' : 'Pseudomonas aeruginosa (Schroeter)', category: isAr ? 'السلالات المرجعية' : 'Reference Strains', image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=400' },
            { id: 3, name: isAr ? 'Salmonella enterica subsp. enterica' : 'Salmonella enterica subsp. enterica', category: isAr ? 'السلالات المرجعية' : 'Reference Strains', image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=400' },
        ]
    }

    return (
        <main className="bg-white min-h-screen">
            <Header lang={lang} navigation={dict.navigation} header={dict.header} />

            <ProductClient product={product} dict={dict} lang={lang} />

            <FinalCTA dict={dict.final_cta} lang={lang} />
            <Footer dict={dict.footer} lang={lang} />
        </main>
    )
}
