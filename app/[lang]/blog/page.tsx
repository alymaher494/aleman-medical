import { getDictionary } from '@/lib/get-dictionary'
import { Locale } from '@/i18n-config'
import BlogClient from '@/components/pages/BlogClient'
import { fetchPosts } from '@/lib/wordpress'

export default async function BlogPage({ params }: { params: Promise<{ lang: Locale }> }) {
    const { lang } = await params
    const dict = await getDictionary(lang)

    const wpLang = lang.toUpperCase() as 'AR' | 'EN'
    let posts: any[] = []

    try {
        const wpPosts = await fetchPosts(wpLang)
        if (wpPosts && wpPosts.length > 0) {
            posts = wpPosts.map((p: any) => ({
                id: p.id,
                title: p.title,
                excerpt: p.excerpt || '',
                date: new Date(p.date).toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' }),
                author: p.author?.node?.name || (lang === 'ar' ? 'فريق الأيمان' : 'Al Eman Team'),
                category: p.categories?.nodes?.[0]?.name || (lang === 'ar' ? 'مقال علمي' : 'Scientific Post'),
                image: p.featuredImage?.node?.sourceUrl || 'https://images.unsplash.com/photo-1579165466741-7f35a4755657?q=80&w=1600',
                slug: p.slug
            }))
        }
    } catch (error) {
        console.error('Error fetching blog posts:', error)
    }

    // Fallback if WP is empty
    if (posts.length === 0) {
        posts = [
            {
                id: 'f1',
                title: lang === 'ar' ? 'أهمية معايير الجودة ISO 17025 في المختبرات الطبية' : 'Importance of ISO 17025 Quality Standards in Medical Labs',
                excerpt: lang === 'ar' ? 'تعرف على الشروط الأساسية للحصول على اعتماد الأيزو لمختبرك وطرق تطبيقها بفعالية...' : 'Learn the basic requirements for obtaining ISO accreditation...',
                date: lang === 'ar' ? '24 فبراير 2026' : 'February 24, 2026',
                author: lang === 'ar' ? 'د. أحمد فتحي' : 'Dr. Ahmed Fathi',
                category: lang === 'ar' ? 'الجودة والاعتماد' : 'Quality & Accreditation',
                image: 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?q=80&w=1600',
                slug: 'iso-17025-overview'
            }
        ]
    }

    return (
        <main className="bg-white min-h-screen">
            <BlogClient dict={dict} lang={lang} posts={posts} />
        </main>
    )
}
