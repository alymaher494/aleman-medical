'use client'

import { motion } from 'framer-motion'
import { Calendar, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function BlogInsights({
    wpPosts,
    dict,
    lang = 'ar'
}: {
    wpPosts?: any[],
    dict?: any,
    lang?: string
}) {
    const isRtl = lang === 'ar'

    const fallbackPosts = [
        {
            id: '1',
            title: dict?.posts?.post1?.title || 'كيفية التعامل الآمن...',
            excerpt: dict?.posts?.post1?.excerpt || 'دليل شامل...',
            date: '15/01/2026',
            image: 'https://images.unsplash.com/photo-1579165466741-7f35a4755657?q=80&w=800',
            category: dict?.posts?.post1?.cat || 'علوم الحياة',
            slug: 'safe-handling'
        },
        {
            id: '2',
            title: dict?.posts?.post2?.title || 'أحدث التقنيات...',
            excerpt: dict?.posts?.post2?.excerpt || 'استكشف المعايير...',
            date: '10/01/2026',
            image: 'https://images.unsplash.com/photo-1581093421113-5bc178877196?q=80&w=800',
            category: dict?.posts?.post2?.cat || 'تجهيزات مخبرية',
            slug: 'latest-tech'
        },
        {
            id: '3',
            title: dict?.posts?.post3?.title || 'أهمية الكواشف...',
            excerpt: dict?.posts?.post3?.excerpt || 'لماذا تعتبر...',
            date: '05/01/2026',
            image: 'https://images.unsplash.com/photo-1532187643603-ba119ca4109e?q=80&w=800',
            category: dict?.posts?.post3?.cat || 'كيماويات',
            slug: 'reagents-importance'
        }
    ]

    const displayPosts = wpPosts && wpPosts.length > 0
        ? wpPosts.map(post => ({
            id: post.id,
            title: post.title,
            excerpt: post.excerpt?.replace(/<[^>]*>?/gm, '').substring(0, 120) + '...',
            date: new Date(post.date).toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US'),
            image: post.featuredImage?.node?.sourceUrl || 'https://images.unsplash.com/photo-1579154273821-ad99159ad503?q=80&w=800',
            category: post.categories?.nodes?.[0]?.name || (isRtl ? 'علمي' : 'Scientific'),
            slug: post.slug
        }))
        : fallbackPosts

    return (
        <section className="py-24 bg-gray-50/30">
            <div className="container mx-auto px-6">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                    <div className="text-start">
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-primary-light font-black text-xs uppercase tracking-widest mb-4 block"
                        >
                            {dict?.tag}
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-black text-gray-900 font-cairo"
                        >
                            {dict?.title}
                        </motion.h2>
                    </div>

                    <Link href={`/${lang}/blog`}>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 text-primary font-bold group"
                        >
                            {dict?.cta}
                            <ArrowLeft size={18} className={`transition-transform ${isRtl ? 'group-hover:-translate-x-2' : 'rotate-180 group-hover:translate-x-2'}`} />
                        </motion.button>
                    </Link>
                </div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {displayPosts.map((post, idx) => (
                        <motion.article
                            key={post.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="group bg-white rounded-[40px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500"
                        >
                            <Link href={`/${lang}/blog/${post.slug}`}>
                                {/* Image */}
                                <div className="aspect-[16/10] overflow-hidden relative">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className={`absolute top-6 ${isRtl ? 'right-6' : 'left-6'}`}>
                                        <span className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black text-primary uppercase tracking-widest shadow-sm">
                                            {post.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-8 text-start">
                                    <div className="flex items-center gap-2 text-gray-400 text-xs font-bold mb-4">
                                        <Calendar size={14} />
                                        {post.date}
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-900 mb-4 font-cairo leading-tight group-hover:text-primary transition-colors line-clamp-2">
                                        {post.title}
                                    </h3>

                                    <p className="text-gray-500 text-sm font-medium leading-relaxed mb-8 line-clamp-3">
                                        {post.excerpt}
                                    </p>

                                    <div className="text-primary-light font-black text-xs uppercase tracking-widest flex items-center gap-2 group/btn">
                                        {dict?.read_more}
                                        <div className="w-8 h-[2px] bg-primary-light transition-all group-hover/btn:w-12" />
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
