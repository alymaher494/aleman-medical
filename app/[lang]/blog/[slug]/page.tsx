import { getDictionary } from '@/lib/get-dictionary'
import { Locale } from '@/i18n-config'
import SinglePostClient from '@/components/pages/SinglePostClient'
import { fetchPostBySlug } from '@/lib/wordpress'

export default async function SingleBlogPost({ params }: { params: Promise<{ lang: Locale, slug: string }> }) {
    const { lang, slug } = await params
    const dict = await getDictionary(lang)
    const isAr = lang === 'ar'

    // Fetch the post from WordPress
    const wpPost = await fetchPostBySlug(slug)

    // Build post object from WordPress data or fallback
    const post = wpPost ? {
        title: wpPost.title,
        date: new Date(wpPost.date).toLocaleDateString(isAr ? 'ar-EG' : 'en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
        }),
        author: wpPost.author?.node?.name || (isAr ? 'فريق الأيمان' : 'Al Eman Team'),
        authorRole: isAr ? 'فريق التحرير' : 'Editorial Team',
        readTime: isAr ? '5 دقائق قراءة' : '5 min read',
        category: wpPost.categories?.nodes?.[0]?.name || (isAr ? 'مقالات' : 'Articles'),
        image: wpPost.featuredImage?.node?.sourceUrl || 'https://images.unsplash.com/photo-1579165466741-7f35a4755657?q=80&w=1600',
        tags: wpPost.tags?.nodes?.map((t: any) => t.name) || [],
        content: wpPost.content || '',
        relatedPosts: []
    } : {
        // Fallback data if post not found in WP
        title: isAr ? 'مقال غير موجود' : 'Post Not Found',
        date: new Date().toLocaleDateString(isAr ? 'ar-EG' : 'en-US'),
        author: isAr ? 'فريق الأيمان' : 'Al Eman Team',
        authorRole: isAr ? 'فريق التحرير' : 'Editorial Team',
        readTime: isAr ? '5 دقائق قراءة' : '5 min read',
        category: isAr ? 'مقالات' : 'Articles',
        image: 'https://images.unsplash.com/photo-1579165466741-7f35a4755657?q=80&w=1600',
        tags: [],
        content: isAr ? '<p>لم يتم العثور على هذا المقال.</p>' : '<p>This article was not found.</p>',
        relatedPosts: []
    }

    return <SinglePostClient dict={dict} lang={lang} post={post} />
}
