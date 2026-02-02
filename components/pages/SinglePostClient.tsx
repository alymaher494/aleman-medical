'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FinalCTA from '@/components/sections/FinalCTA'
import PageHeader from '@/components/PageHeader'
import { Calendar, User, Clock, Share2, Facebook, Twitter, Linkedin, Copy, ArrowLeft, Tag, ChevronRight } from 'lucide-react'

export default function SinglePostClient({ dict, lang, post }: { dict: any, lang: string, post: any }) {
    const isRtl = lang === 'ar'

    return (
        <main className="bg-white min-h-screen">
            <Header lang={lang} navigation={dict?.navigation} header={dict?.header} />

            {/* Breadcrumb & Navigation */}
            <div className="bg-gray-50 border-b border-gray-100 pt-32 pb-6">
                <div className="container mx-auto px-6">
                    <div className={`flex items-center gap-2 text-sm font-medium text-gray-500 mb-4 ${isRtl ? 'flex-row' : 'flex-row'}`}>
                        <Link href={`/${lang}`} className="hover:text-primary transition-colors">{dict?.navigation?.home}</Link>
                        <ChevronRight size={14} className={isRtl ? 'rotate-180 text-gray-300' : 'text-gray-300'} />
                        <Link href={`/${lang}/blog`} className="hover:text-primary transition-colors">{dict?.navigation?.blog}</Link>
                        <ChevronRight size={14} className={isRtl ? 'rotate-180 text-gray-300' : 'text-gray-300'} />
                        <span className="text-gray-900 line-clamp-1">{post.title}</span>
                    </div>
                </div>
            </div>

            {/* Post Hero */}
            <section className="py-12 md:py-20 overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="max-w-5xl mx-auto">
                        <div className={`flex flex-col gap-8 ${isRtl ? 'text-right' : 'text-left'}`}>
                            {/* Meta */}
                            <div className="flex flex-wrap items-center gap-4 text-xs font-black uppercase tracking-widest text-primary">
                                <span className="bg-primary/5 px-4 py-2 rounded-full">{post.category}</span>
                                <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                                <span className="text-gray-500 flex items-center gap-2"><Clock size={14} /> {post.readTime}</span>
                            </div>

                            {/* Title */}
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-3xl md:text-5xl lg:text-6xl font-black text-gray-900 font-cairo leading-[1.2]"
                            >
                                {post.title}
                            </motion.h1>

                            {/* Author & Date */}
                            <div className="flex items-center gap-6 pb-12 border-b border-gray-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-primary font-bold overflow-hidden">
                                        {post.authorImage ? <img src={post.authorImage} alt={post.author} className="w-full h-full object-cover" /> : <User size={24} />}
                                    </div>
                                    <div className="text-start">
                                        <div className="text-sm font-black text-gray-900 font-cairo">{post.author}</div>
                                        <div className="text-xs text-gray-500 font-medium">{post.authorRole}</div>
                                    </div>
                                </div>
                                <div className="h-10 w-[1px] bg-gray-100" />
                                <div className="text-start">
                                    <div className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">{isRtl ? 'تاريخ النشر' : 'Published On'}</div>
                                    <div className="text-sm font-black text-gray-900 font-cairo">{post.date}</div>
                                </div>
                            </div>
                        </div>

                        {/* Featured Image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="mt-12 rounded-[40px] md:rounded-[60px] overflow-hidden shadow-2xl shadow-black/5 aspect-[16/9] md:aspect-[21/9]"
                        >
                            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Article Body */}
            <section className="pb-24">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 max-w-6xl mx-auto">

                        {/* Share & Sidebar Left */}
                        <aside className="lg:col-span-1 hidden lg:block">
                            <div className="sticky top-32 space-y-8 flex flex-col items-center">
                                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300 vertical-text py-4 border-y border-gray-100 mb-4 whitespace-nowrap">
                                    {dict?.blog_page?.single_post?.share}
                                </div>
                                <div className="flex flex-col gap-4">
                                    {[
                                        { icon: <Facebook size={18} />, color: 'hover:bg-[#1877F2]' },
                                        { icon: <Twitter size={18} />, color: 'hover:bg-[#1DA1F2]' },
                                        { icon: <Linkedin size={18} />, color: 'hover:bg-[#0A66C2]' },
                                        { icon: <Copy size={18} />, color: 'hover:bg-gray-800' }
                                    ].map((social, i) => (
                                        <button key={i} className={`w-12 h-12 rounded-2xl bg-gray-50 text-gray-400 ${social.color} hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm hover:shadow-lg`}>
                                            {social.icon}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </aside>

                        {/* Content */}
                        <article className="lg:col-span-8">
                            <div
                                className={`prose prose-lg prose-blue max-w-none text-gray-600 leading-[1.8] font-medium font-cairo
                                    prose-headings:text-gray-900 prose-headings:font-black prose-headings:font-cairo
                                    prose-p:mb-8 prose-li:mb-2
                                    prose-blockquote:border-s-4 prose-blockquote:border-primary prose-blockquote:bg-gray-50 prose-blockquote:p-8 prose-blockquote:rounded-3xl prose-blockquote:not-italic prose-blockquote:text-xl prose-blockquote:font-black prose-blockquote:text-gray-900
                                    prose-img:rounded-[30px] prose-img:shadow-xl
                                    ${isRtl ? 'text-right' : 'text-left'}`}
                                dangerouslySetInnerHTML={{ __html: post.content }}
                            />

                            {/* Tags Section */}
                            <div className={`mt-16 pt-12 border-t border-gray-100 ${isRtl ? 'text-right' : 'text-left'}`}>
                                <h4 className="text-lg font-black text-gray-900 mb-6 font-cairo flex items-center gap-3">
                                    <Tag className="text-primary" size={20} />
                                    {dict?.blog_page?.tags_title}
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {post.tags.map((tag: string, i: number) => (
                                        <span key={i} className="px-5 py-2.5 bg-gray-50 text-gray-500 rounded-xl text-xs font-bold hover:bg-primary/5 hover:text-primary transition-all cursor-pointer">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Post Navigation */}
                            <div className="mt-16 bg-gray-50 rounded-[40px] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 border border-gray-100">
                                <div className="text-start">
                                    <h4 className="text-xl font-black text-gray-900 mb-2 font-cairo">{dict?.blog_page?.single_post?.cta_title}</h4>
                                    <p className="text-gray-500 text-sm font-medium">{dict?.blog_page?.single_post?.cta_subtitle}</p>
                                </div>
                                <Link href={`/${lang}/contact`} className="px-10 py-5 bg-primary text-white rounded-2xl font-black shadow-xl shadow-primary/20 hover:scale-105 transition-transform flex items-center gap-3">
                                    {dict?.navigation?.contact}
                                    <ArrowLeft size={18} className={isRtl ? '' : 'rotate-180'} />
                                </Link>
                            </div>
                        </article>

                        {/* Recent Posts Sidebar Right */}
                        <aside className="lg:col-span-3 space-y-8">
                            <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm sticky top-32">
                                <h3 className={`font-black text-lg mb-8 font-cairo border-b border-gray-50 pb-4 ${isRtl ? 'text-right' : 'text-left'}`}>
                                    {dict?.blog_page?.single_post?.related}
                                </h3>
                                <div className="space-y-8">
                                    {post.relatedPosts?.map((related: any) => (
                                        <Link href={`/${lang}/blog/${related.slug}`} key={related.id} className="group block text-start">
                                            <div className="aspect-[16/10] rounded-2xl overflow-hidden mb-4 shadow-sm">
                                                <img src={related.image} alt={related.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                            </div>
                                            <div className="text-[10px] font-black text-primary uppercase tracking-widest mb-2 px-3 py-1 bg-primary/5 rounded-full inline-block">{related.category}</div>
                                            <h4 className="font-black text-gray-900 text-sm leading-tight group-hover:text-primary transition-colors line-clamp-2 md:h-10">
                                                {related.title}
                                            </h4>
                                        </Link>
                                    ))}
                                </div>

                                <Link href={`/${lang}/blog`} className="mt-10 pt-6 border-t border-gray-50 flex items-center justify-between group">
                                    <span className="text-xs font-black text-gray-400 group-hover:text-primary transition-colors">{dict?.blog_page?.single_post?.view_all}</span>
                                    <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all">
                                        <ArrowLeft size={16} className={isRtl ? '' : 'rotate-180'} />
                                    </div>
                                </Link>
                            </div>
                        </aside>

                    </div>
                </div>
            </section>

            <FinalCTA dict={dict?.final_cta} lang={lang} />
            <Footer dict={dict?.footer} lang={lang} />

            <style jsx>{`
                .vertical-text {
                    writing-mode: vertical-rl;
                    text-orientation: mixed;
                }
            `}</style>
        </main>
    )
}
