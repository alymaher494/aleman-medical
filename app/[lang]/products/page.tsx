import { getDictionary } from '@/lib/get-dictionary'
import { Locale } from '@/i18n-config'
import ProductsClient from '@/components/pages/ProductsClient'

export default async function ProductsPage({ params }: { params: Promise<{ lang: Locale }> }) {
    const { lang } = await params
    const dict = await getDictionary(lang)

    // Mock Products with i18n
    const products = [
        {
            id: 1,
            title: lang === 'ar' ? 'ATCC® 25922™ Escherichia coli' : 'ATCC® 25922™ Escherichia coli',
            category: lang === 'ar' ? 'السلالات المرجعية' : 'Reference Strains',
            brand: 'ATCC',
            price: lang === 'ar' ? 'طلب عرض سعر' : 'Request Quote',
            image: 'https://images.unsplash.com/photo-1579165466741-7f35a4755657?q=80&w=600',
            slug: 'atcc-25922'
        },
        {
            id: 2,
            title: lang === 'ar' ? 'ميزان تحليلي دقيق 0.0001g' : 'Analytical Balance 0.0001g',
            category: lang === 'ar' ? 'الأجهزة والمعدات' : 'Equipment',
            brand: 'Mettler Toledo',
            price: lang === 'ar' ? 'طلب عرض سعر' : 'Request Quote',
            image: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?q=80&w=600',
            slug: 'analytical-balance'
        },
        {
            id: 3,
            title: lang === 'ar' ? 'محلول منظم pH 7.00' : 'pH Buffer Solution 7.00',
            category: lang === 'ar' ? 'الكيماويات والكواشف' : 'Chemicals',
            brand: 'Sigma-Aldrich',
            price: lang === 'ar' ? 'طلب عرض سعر' : 'Request Quote',
            image: 'https://images.unsplash.com/photo-1622260614153-03223fb72052?q=80&w=600',
            slug: 'buffer-solution-ph7'
        },
        {
            id: 4,
            title: lang === 'ar' ? 'حاضنة بكتريولوجية 50 لتر' : 'Bacteriological Incubator 50L',
            category: lang === 'ar' ? 'الأجهزة والمعدات' : 'Equipment',
            brand: 'Memmert',
            price: lang === 'ar' ? 'طلب عرض سعر' : 'Request Quote',
            image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=600',
            slug: 'incubator-50l'
        },
        {
            id: 5,
            title: lang === 'ar' ? 'Staphylococcus aureus subsp. aureus' : 'Staphylococcus aureus subsp. aureus',
            category: lang === 'ar' ? 'السلالات المرجعية' : 'Reference Strains',
            brand: 'ATCC',
            price: lang === 'ar' ? 'طلب عرض سعر' : 'Request Quote',
            image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=600',
            slug: 'staph-aureus'
        },
        {
            id: 6,
            title: lang === 'ar' ? 'مجهر ثلاثي العدسات' : 'Trinocular Microscope',
            category: lang === 'ar' ? 'الأجهزة والمعدات' : 'Equipment',
            brand: 'Olympus',
            price: lang === 'ar' ? 'طلب عرض سعر' : 'Request Quote',
            image: 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?q=80&w=600',
            slug: 'trinocular-microscope'
        },
    ]

    return <ProductsClient dict={dict} lang={lang} products={products} />
}
