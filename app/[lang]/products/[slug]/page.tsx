import { getDictionary } from '@/lib/get-dictionary'
import { Locale } from '@/i18n-config'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FinalCTA from '@/components/sections/FinalCTA'
import ProductClient from '@/components/pages/ProductClient'
import { fetchProductBySlug } from '@/lib/wordpress' // We need to add this function to wordpress.ts

export default async function ProductPage({ params }: { params: Promise<{ lang: Locale, slug: string }> }) {
    const { lang, slug } = await params
    const dict = await getDictionary(lang)
    const isAr = lang === 'ar'

    // Fetch product from WordPress
    const wpProduct = await fetchProductBySlug(slug)

    // Build product object from WP data or use proper fallback structure
    const product = wpProduct ? {
        title: wpProduct.title,
        category: wpProduct.productFields?.category || (isAr ? 'منتج طبي' : 'Medical Product'),
        brand: wpProduct.productFields?.brand || (isAr ? 'علامة تجارية' : 'Brand'),
        sku: wpProduct.productFields?.sku || wpProduct.slug,
        description: wpProduct.productFields?.shortDescription || wpProduct.content?.replace(/<[^>]*>?/gm, '').substring(0, 200) + '...',
        stockStatus: isAr ? 'متوفر في المخزون' : 'In Stock',
        isCertified: wpProduct.productFields?.isCertified || false,
        pdfBrochure: wpProduct.productFields?.pdfBrochure || null,
        images: wpProduct.featuredImage?.node?.sourceUrl
            ? [wpProduct.featuredImage.node.sourceUrl]
            : ['https://images.unsplash.com/photo-1579165466741-7f35a4755657?q=80&w=800'],
        specs: wpProduct.productFields?.price ? [
            { label: isAr ? 'السعر' : 'Price', value: wpProduct.productFields.price }
        ] : [],
        downloads: wpProduct.productFields?.pdfBrochure ? [
            { name: isAr ? 'كتالوج المنتج' : 'Product Brochure', size: 'PDF' }
        ] : [],
        related: []
    } : {
        // Fallback Mock Data if not found (keeps page working for demo)
        title: isAr ? 'منتج غير موجود' : 'Product Not Found',
        category: '',
        brand: '',
        sku: '',
        description: isAr ? 'عذراً، هذا المنتج غير متوفر حالياً.' : 'Sorry, this product is currently unavailable.',
        stockStatus: isAr ? 'غير متوفر' : 'Out of Stock',
        isCertified: false,
        images: ['https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=800'],
        specs: [],
        downloads: [],
        related: []
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
