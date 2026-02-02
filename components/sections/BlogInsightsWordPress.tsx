'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Tag } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface Post {
    id: string
    title: string
    excerpt?: string
    slug: string
    date: string
    featuredImage?: {
        node: {
            sourceUrl: string
            altText?: string
        }
    }
    categories?: {
        nodes: Array<{
            name: string
        }>
    }
}

export default function BlogInsightsWordPress({
    posts,
    dict,
    lang = 'ar'
}: {
    posts: Post[],
    dict?: any,
    lang?: string
}) {
    const isRtl = lang === 'ar'

    // Fallback static posts if WordPress data is not available
    const fallbackPosts = [
        {
            id: '1',
            title: dict?.articles?.article1?.title || 'أحدث التقنيات في المختبرات الطبية',
            excerpt: dict?.articles?.article1?.excerpt || 'اكتشف كيف تساهم التكنولوجيا الحديثة...',
            category: dict?.articles?.article1?.category || 'تقنيات',
            date: '2024-01-15',
            image: 'https://images.unsplash.com/photo-1579154273821-ad99159ad503?q=80&w=800',
            slug: 'latest-lab-tech',
            altText: dict?.articles?.article1?.title || 'أحدث التقنيات في المختبرات الطبية'
        },
        {
            id: '2',
            title: dict?.articles?.article2?.title || 'معايير الجودة في المختبرات',
            excerpt: dict?.articles?.article2?.excerpt || 'دليل شامل لضمان الجودة...',
            category: dict?.articles?.article2?.category || 'جودة',
            date: '2024-01-10',
            image: 'https://images.unsplash.com/photo-1532187643603-ba119ca4109e?q=80&w=800',
            slug: 'quality-standards',
            altText: dict?.articles?.article2?.title || 'معايير الجودة في المختبرات'
        },
        {
            id: '3',
            title: dict?.articles?.article3?.title || 'دليل اختيار الأجهزة المخبرية',
            excerpt: dict?.articles?.article3?.excerpt || 'نصائح الخبراء لاختيار المعدات...',
            category: dict?.articles?.article3?.category || 'إرشادات',
            date: '2024-01-05',
            image: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?q=80&w=800',
            slug: 'equipment-guide',
            altText: dict?.articles?.article3?.title || 'دليل اختيار الأجهزة المخبرية'
        },
    ]

    // Use WordPress posts if available, otherwise use fallback
    const displayPosts = posts && posts.length > 0
        ? posts.slice(0, 3).map(post => ({
            id: post.id,
            title: post.title,
            excerpt: post.excerpt?.replace(/<[^>]*>/g, '').substring(0, 150) || '',
            category: post.categories?.nodes[0]?.name || 'مقالات',
            date: new Date(post.date).toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }),
            image: post.featuredImage?.node?.sourceUrl || 'https://images.unsplash.com/photo-1579154273821-ad99159ad503?q=80&w=800',
            altText: post.featuredImage?.node?.altText || post.title,
            slug: post.slug
        }))
        : fallbackPosts

    return (
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-6">

                {/* Header */}
                <div className={`flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8`}>
                    <div className={`max-w-2xl ${isRtl ? 'text-right' : 'text-left'}`}>
                        <motion.h2
                            initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight"
                        >
                            {dict?.title}
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-lg text-gray-500 font-medium leading-relaxed"
                        >
                            {dict?.description}
                        </motion.p>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`hidden md:flex items-center gap-3 px-8 py-4 border-2 border-primary/10 text-primary font-bold rounded-full hover:bg-primary hover:text-white transition-all duration-300 font-cairo`}
                    >
                        {dict?.cta}
                        <ArrowLeft size={18} className={isRtl ? '' : 'rotate-180'} />
                    </motion.button>
                </div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayPosts.map((post, idx) => (
                        <motion.article
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white rounded-[40px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 group"
                        >
                            <Link href={`/${lang}/blog/${post.slug}`} className="block">
                                {/* Featured Image */}
                                <div className="relative h-56 overflow-hidden">
                                    <Image
                                        src={post.image}
                                        alt={post.altText || post.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                                    {/* Category Badge */}
                                    <div className={`absolute top-6 z-10 ${isRtl ? 'right-6' : 'left-6'}`}>
                                        <div className="px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-xs font-black text-primary-light uppercase tracking-widest shadow-sm flex items-center gap-2">
                                            <Tag size={12} />
                                            {post.category}
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-8">
                                    {/* Date */}
                                    <div className={`flex items-center gap-2 text-gray-400 text-xs mb-4 ${isRtl ? '' : 'flex-row-reverse justify-end'}`}>
                                        <Calendar size={14} />
                                        <span>{post.date}</span>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xl font-bold text-gray-900 mb-4 font-cairo group-hover:text-primary transition-colors line-clamp-2">
                                        {post.title}
                                    </h3>

                                    {/* Excerpt */}
                                    <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                                        {post.excerpt}
                                    </p>

                                    {/* Read More */}
                                    <div className={`flex items-center gap-2 text-primary font-black text-sm uppercase tracking-wider group/btn`}>
                                        {dict?.read_more || 'اقرأ المزيد'}
                                        <ArrowLeft size={16} className={`transition-transform ${isRtl ? 'group-hover/btn:-translate-x-1' : 'rotate-180 group-hover/btn:translate-x-1'}`} />
                                    </div>
                                </div>
                            </Link>
                        </motion.article>
                    ))}
                </div>

            </div>
        </section>
    )
}
