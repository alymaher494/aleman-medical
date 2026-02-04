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
                image: p.featuredImage?.node?.sourceUrl || 'https://images.unsplash.com/photo-1581093196867-27f311f49615?q=80&w=600',
                slug: p.slug
            }))
        }
    } catch (error) {
        console.error('Error fetching products:', error)
    }

    // Fallback if WP is empty
    if (products.length === 0) {
        products = [
            {
                id: 'f1',
                title: lang === 'ar' ? 'ATCC® 25922™ Escherichia coli' : 'ATCC® 25922™ Escherichia coli',
                category: lang === 'ar' ? 'السلالات المرجعية' : 'Reference Strains',
                brand: 'ATCC',
                price: dict.products_section.price_request,
                image: 'https://images.unsplash.com/photo-1579165466741-7f35a4755657?q=80&w=600',
                slug: 'atcc-25922'
            },
            {
                id: 'f2',
                title: lang === 'ar' ? 'ميزان تحليلي دقيق 0.0001g' : 'Analytical Balance 0.0001g',
                category: lang === 'ar' ? 'الأجهزة والمعدات' : 'Equipment',
                brand: 'Mettler Toledo',
                price: dict.products_section.price_request,
                image: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?q=80&w=600',
                slug: 'analytical-balance'
            }
        ]
    }

    return (
        <main className="bg-white min-h-screen">
            <ProductsClient dict={dict} lang={lang} products={products} />
        </main>
    )
}
