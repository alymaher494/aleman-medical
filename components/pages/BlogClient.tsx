'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHeader from '@/components/PageHeader'
import { Calendar, User, ArrowLeft, Tag, Search, ChevronLeft, Clock, Filter } from 'lucide-react'

export default function BlogClient({ dict, lang, posts }: { dict: any, lang: string, posts: any[] }) {
    const [activeCategory, setActiveCategory] = useState(dict?.blog_page?.all || 'الكل')
    const [searchQuery, setSearchQuery] = useState('')
    const isRtl = lang === 'ar'

    const featuredPost = posts[0]
    const remainingPosts = posts.slice(1)

    const categories = [
        { name: dict?.blog_page?.all || 'الكل', count: posts.length },
        { name: isRtl ? 'ميكروبيولوجي' : 'Microbiology', count: 5 },
        { name: isRtl ? 'أجهزة ومعدات' : 'Equipment', count: 3 },
        { name: isRtl ? 'الجودة والاعتماد' : 'Quality', count: 2 },
    ]

    const tags = isRtl
        ? ['أيزو', 'ATCC', 'FDA', 'تعقيم', 'مختبرات', 'أبحاث', 'سلامة']
        : ['ISO', 'ATCC', 'FDA', 'Sterilization', 'Labs', 'Research', 'Safety']

    return (
        <main className="bg-white min-h-screen">
            <Header lang={lang} navigation={dict?.navigation} header={dict?.header} />
            <PageHeader
                title={dict?.blog_page?.title || 'المدونة العلمية'}
                subtitle={dict?.blog_page?.subtitle || 'آخر المقالات...'}
                breadcrumb={[{ label: dict?.blog_page?.breadcrumb || 'المدونة' }]}
                lang={lang}
            />

            {/* Newsletter Mini Strip */}
            <div className="bg-primary py-4">
                <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-4 text-white">
                    <span className="text-sm font-black font-cairo whitespace-nowrap">{isRtl ? 'اشترك في نشرتنا العلمية:' : 'Join our scientific newsletter:'}</span>
                    <div className="flex w-full md:w-auto gap-2">
                        <input type="email" placeholder={dict?.blog_page?.newsletter?.placeholder} className="bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-sm focus:outline-none focus:bg-white/20 flex-grow md:w-64 text-white placeholder:text-white/50" />
                        <button className="bg-white text-primary px-6 py-2 rounded-xl text-sm font-black hover:bg-gray-100 transition-colors">{dict?.blog_page?.newsletter?.btn}</button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 py-16">

                {/* Featured Post Highlight */}
                {featuredPost && (
                    <div className="mb-20">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="bg-gray-900 rounded-[50px] overflow-hidden relative group shadow-2xl shadow-black/10"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-2">
                                <div className="aspect-[16/10] lg:aspect-auto overflow-hidden">
                                    <img src={featuredPost.image} alt={featuredPost.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                                </div>
                                <div className="p-10 md:p-16 flex flex-col justify-center text-start">
                                    <div className="flex items-center gap-4 text-xs font-black uppercase tracking-[0.2em] text-primary-light mb-6">
                                        <span className="bg-primary/20 px-4 py-2 rounded-full">{featuredPost.category}</span>
                                        <span className="text-white/40">{featuredPost.date}</span>
                                    </div>
                                    <h2 className="text-3xl md:text-5xl font-black text-white font-cairo leading-tight mb-8">
                                        <Link href={`/${lang}/blog/${featuredPost.slug}`} className="hover:text-primary-light transition-colors">
                                            {featuredPost.title}
                                        </Link>
                                    </h2>
                                    <p className="text-white/60 text-lg leading-relaxed mb-10 line-clamp-3">
                                        {featuredPost.excerpt}
                                    </p>
                                    <div className="flex items-center gap-6">
                                        <Link href={`/${lang}/blog/${featuredPost.slug}`} className="px-10 py-5 bg-primary text-white rounded-2xl font-black flex items-center gap-3 shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
                                            {dict?.blog_page?.read_more || 'اقرأ المقال'}
                                            <ArrowLeft size={18} className={isRtl ? '' : 'rotate-180'} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">

                    {/* Sidebar Area (1/4) */}
                    <aside className="lg:col-span-1 space-y-10 order-2 lg:order-1">

                        {/* Search */}
                        <div className="text-start">
                            <h3 className="font-black text-lg mb-6 font-cairo flex items-center gap-2">
                                <Search size={20} className="text-primary" />
                                {dict?.blog_page?.search_title}
                            </h3>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder={dict?.blog_page?.search_placeholder}
                                    className={`w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 ${isRtl ? 'pr-12 pl-4' : 'pl-12 pr-4'} text-sm focus:outline-none focus:border-primary/50 focus:bg-white transition-all shadow-sm`}
                                />
                                <Search className={`absolute ${isRtl ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-gray-300`} size={20} />
                            </div>
                        </div>

                        {/* Categories */}
                        <div className="text-start">
                            <h3 className="font-black text-lg mb-6 font-cairo flex items-center gap-2">
                                <Filter size={20} className="text-primary" />
                                {dict?.blog_page?.categories_title}
                            </h3>
                            <div className="flex flex-col gap-2">
                                {categories.map((cat, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveCategory(cat.name)}
                                        className={`flex items-center justify-between px-5 py-4 rounded-2xl text-sm font-black transition-all group ${activeCategory === cat.name ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'bg-gray-50 text-gray-500 hover:bg-white hover:shadow-md hover:text-primary'}`}
                                    >
                                        <span>{cat.name}</span>
                                        <span className={`text-[10px] w-6 h-6 rounded-full flex items-center justify-center font-bold ${activeCategory === cat.name ? 'bg-white/20' : 'bg-gray-200 text-gray-400 group-hover:bg-primary/10 group-hover:text-primary'}`}>{cat.count}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Tags Cloud */}
                        <div className="text-start">
                            <h3 className="font-black text-lg mb-6 font-cairo flex items-center gap-2">
                                <Tag size={20} className="text-primary" />
                                {dict?.blog_page?.tags_title}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {tags.map((tag, idx) => (
                                    <button key={idx} className="px-4 py-2 bg-gray-50 text-gray-500 text-[11px] font-black rounded-xl hover:bg-primary/5 hover:text-primary transition-all uppercase tracking-wider">
                                        #{tag}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Expert Contact CTA Sidebar */}
                        <div className="bg-gradient-to-br from-gray-900 to-primary-dark text-white p-8 rounded-[40px] shadow-2xl shadow-primary/10">
                            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                                <User size={24} className="text-primary-light" />
                            </div>
                            <h4 className="font-black text-xl mb-4 font-cairo">{isRtl ? 'هل لديك سؤال تقني؟' : 'Have a technical question?'}</h4>
                            <p className="text-white/50 text-xs leading-relaxed mb-6">{isRtl ? 'فريقنا العلمي متاح للإجابة على استفساراتكم وتوفير المعلومات المطلوبة.' : 'Our scientific team is available to answer your inquiries and provide the requested information.'}</p>
                            <Link href={`/${lang}/contact`} className="block w-full py-4 bg-primary text-white rounded-xl font-black text-sm text-center shadow-lg shadow-black/20 hover:scale-[1.02] transition-transform">{dict?.navigation?.contact}</Link>
                        </div>

                    </aside>

                    {/* Articles Grid (3/4) Area */}
                    <div className="lg:col-span-3 order-1 lg:order-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <AnimatePresence mode='popLayout'>
                                {remainingPosts.map((post) => (
                                    <motion.article
                                        key={post.id}
                                        layout
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        className="bg-white rounded-[40px] overflow-hidden border border-gray-100/50 shadow-sm hover:shadow-2xl transition-all duration-500 group flex flex-col h-full"
                                    >
                                        <Link href={`/${lang}/blog/${post.slug}`} className="flex flex-col h-full">
                                            {/* Image Reveal Area */}
                                            <div className="relative h-64 overflow-hidden">
                                                <img
                                                    src={post.image}
                                                    alt={post.title}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                                <div className={`absolute top-6 ${isRtl ? 'right-6' : 'left-6'} bg-white/95 backdrop-blur px-4 py-1.5 rounded-full text-[10px] font-black text-primary uppercase tracking-widest shadow-lg`}>
                                                    {post.category}
                                                </div>
                                            </div>

                                            {/* Content Area */}
                                            <div className="p-8 md:p-10 flex flex-col flex-grow text-start">
                                                <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6">
                                                    <span className="flex items-center gap-2"><Calendar size={14} className="text-primary/40" /> {post.date}</span>
                                                    <div className="w-1.5 h-1.5 rounded-full bg-gray-100" />
                                                    <span className="flex items-center gap-2"><Clock size={14} className="text-primary/40" /> 5 {isRtl ? 'د' : 'min'}</span>
                                                </div>

                                                <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-6 font-cairo group-hover:text-primary transition-colors leading-tight line-clamp-2 min-h-[3.5em]">
                                                    {post.title}
                                                </h3>

                                                <p className="text-gray-500 font-medium leading-relaxed text-sm mb-8 flex-grow line-clamp-3">
                                                    {post.excerpt}
                                                </p>

                                                <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                                                            <User size={14} className="text-gray-400" />
                                                        </div>
                                                        <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">{post.author}</span>
                                                    </div>
                                                    <div className="w-10 h-10 rounded-full bg-primary overflow-hidden relative flex items-center justify-center text-white translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 shadow-xl shadow-primary/40">
                                                        <ArrowLeft size={18} className={isRtl ? '' : 'rotate-180'} />
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.article>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Pagination Polished */}
                        <div className="flex justify-center mt-16 gap-3">
                            <button className="w-14 h-14 rounded-2xl bg-primary text-white font-black shadow-xl shadow-primary/20 hover:scale-105 transition-transform">1</button>
                            <button className="w-14 h-14 rounded-2xl bg-white text-gray-400 font-black border border-gray-100 hover:bg-gray-50 hover:border-gray-300 transition-all">2</button>
                            <button className="w-14 h-14 rounded-2xl bg-white text-primary font-black border border-gray-100 hover:bg-primary hover:text-white transition-all flex items-center justify-center">
                                <ChevronLeft size={20} className={isRtl ? '' : 'rotate-180'} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <Footer dict={dict?.footer} lang={lang} />
        </main>
    )
}
