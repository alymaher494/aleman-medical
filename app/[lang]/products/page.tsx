import { getDictionary } from '@/lib/get-dictionary'
import { Locale } from '@/i18n-config'
import ProductsClient from '@/components/pages/ProductsClient'
import { fetchProducts } from '@/lib/wordpress'

export default async function ProductsPage({ params }: { params: Promise<{ lang: Locale }> }) {
    const { lang } = await params
    const dict = await getDictionary(lang)

    const wpLang = lang.toUpperCase() as 'AR' | 'EN'
    let products: any[] = []

    try {
        const wpProducts = await fetchProducts(wpLang)
        if (wpProducts && wpProducts.length > 0) {
            products = wpProducts.map((p: any) => ({
                id: p.id,
                title: p.title,
                category: p.productFields?.category || (lang === 'ar' ? 'عام' : 'General'),
                brand: p.productFields?.brand || 'Al Eman',
                price: p.productFields?.price || dict.products_section.price_request,
                image: p.featuredImage?.node?.sourceUrl || 'https://images.unsplash.com/photo-1581093421113-5bc178877196?q=80&w=800',
                slug: p.slug
            }))
        }
    } catch (error) {
        console.error('Error fetching products:', error)
    }

    // Fallback if WP is empty
    if (products.length === 0) {
        products = [
            { id: 1, title: lang === 'ar' ? 'محلول كيميائي عالي النقاء' : 'High Purity Chemical Solution', category: lang === 'ar' ? 'كيماويات' : 'Chemicals', brand: 'Al Eman', price: dict.products_section.price_request, image: 'https://images.unsplash.com/photo-1581093421113-5bc178877196?q=80&w=800', slug: 'high-purity-chemical' },
            { id: 2, title: lang === 'ar' ? 'جهاز طرد مركزي متطور' : 'Advanced Centrifuge', category: lang === 'ar' ? 'أجهزة' : 'Equipment', brand: 'LabMax', price: dict.products_section.price_request, image: 'https://images.unsplash.com/photo-1581093196223-9f687e61a088?q=80&w=800', slug: 'centrifuge-max' },
            { id: 3, title: lang === 'ar' ? 'سلالات ميكروبيولوجية مرجعية' : 'Reference Strains', category: lang === 'ar' ? 'سلالات' : 'Strains', brand: 'MicroBio', price: dict.products_section.price_request, image: 'https://images.unsplash.com/photo-1532187643603-ba119ca4109e?q=80&w=800', slug: 'ref-strains' }
        ]
    }

    return (
        <main className="bg-white min-h-screen">
            <ProductsClient dict={dict} lang={lang} products={products} />
        </main>
    )
}
