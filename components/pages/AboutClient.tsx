'use client'

import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHeader from '@/components/PageHeader'
import Clients from '@/components/sections/Clients'
import ValueProposition from '@/components/sections/ValueProposition'
import FinalCTA from '@/components/sections/FinalCTA'
import { Target, Eye, History } from 'lucide-react'

export default function AboutClient({ dict, lang }: { dict: any, lang: string }) {
    const isRtl = lang === 'ar'

    return (
        <main className="overflow-x-hidden bg-white">
            <Header lang={lang} navigation={dict?.navigation} header={dict?.header} />

            <PageHeader
                title={dict?.about_page?.title || 'من نحن'}
                subtitle={dict?.about_page?.subtitle || 'رحلة...'}
                breadcrumb={[{ label: dict?.about_page?.title || 'من نحن' }]}
                lang={lang}
            />

            {/* Story Section */}
            <section className="py-24">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row items-center gap-16">

                        <div className="lg:w-1/2">
                            <motion.div
                                initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="relative"
                            >
                                <div className="absolute inset-0 bg-primary/5 rounded-[50px] rotate-3" />
                                <img
                                    src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800"
                                    alt={dict?.about_page?.title}
                                    className="relative rounded-[50px] shadow-2xl z-10 w-full"
                                />
                                <div className={`absolute -bottom-10 bg-white p-8 rounded-3xl shadow-xl z-20 border border-gray-100 hidden md:block ${isRtl ? '-left-10' : '-right-10'}`}>
                                    <div className="text-5xl font-black text-primary mb-2 font-cairo">30+</div>
                                    <div className="text-gray-500 font-bold text-sm">{dict?.about?.stats?.exp || 'عاماً من الخبرة'}</div>
                                </div>
                            </motion.div>
                        </div>

                        <div className="lg:w-1/2">
                            <motion.span
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                className="text-primary font-black text-sm uppercase tracking-widest mb-4 block"
                            >
                                {dict?.about_page?.story_tag}
                            </motion.span>

                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-4xl font-black text-gray-900 mb-8 font-cairo leading-tight"
                            >
                                {dict?.about_page?.story_title}
                            </motion.h2>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="space-y-6 text-gray-600 leading-relaxed font-medium text-lg"
                            >
                                <p>{dict?.about_page?.story_p1}</p>
                                <p>{dict?.about_page?.story_p2}</p>
                                <p>{dict?.about_page?.story_p3}</p>
                            </motion.div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-24 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Mission */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className={`bg-white p-12 rounded-[40px] border border-gray-100 shadow-sm hover:shadow-xl transition-shadow relative overflow-hidden group ${isRtl ? 'text-right' : 'text-left'}`}
                        >
                            <div className={`absolute top-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] transition-all group-hover:bg-primary/10 ${isRtl ? 'right-0' : 'left-0 rounded-br-[100px] rounded-bl-none'}`} />
                            <Target size={48} className="text-primary mb-6" />
                            <h3 className="text-2xl font-black text-gray-900 mb-4 font-cairo">{dict?.about_page?.mission_title}</h3>
                            <p className="text-gray-600 leading-relaxed">
                                {dict?.about_page?.mission_desc}
                            </p>
                        </motion.div>

                        {/* Vision */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className={`bg-white p-12 rounded-[40px] border border-gray-100 shadow-sm hover:shadow-xl transition-shadow relative overflow-hidden group ${isRtl ? 'text-right' : 'text-left'}`}
                        >
                            <div className={`absolute top-0 w-32 h-32 bg-primary-light/5 rounded-bl-[100px] transition-all group-hover:bg-primary-light/10 ${isRtl ? 'right-0' : 'left-0 rounded-br-[100px] rounded-bl-none'}`} />
                            <Eye size={48} className="text-primary-light mb-6" />
                            <h3 className="text-2xl font-black text-gray-900 mb-4 font-cairo">{dict?.about_page?.vision_title}</h3>
                            <p className="text-gray-600 leading-relaxed">
                                {dict?.about_page?.vision_desc}
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Experience Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="md:w-1/2">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-4xl font-black text-gray-900 mb-8 font-cairo"
                            >
                                {dict?.about_page?.experience_title}
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="text-lg text-gray-600 leading-relaxed font-medium"
                            >
                                {dict?.about_page?.experience_desc}
                            </motion.p>
                        </div>
                        <div className="md:w-1/2">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="bg-primary/5 rounded-[50px] p-12 text-center"
                            >
                                <div className="text-6xl font-black text-primary mb-4 font-cairo">30+</div>
                                <div className="text-xl font-bold text-gray-500 uppercase tracking-widest">
                                    {lang === 'ar' ? 'عاماً من التميز' : 'Years of Excellence'}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-24 bg-brand-bg/20">
                <div className="container mx-auto px-6">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl font-black text-gray-900 mb-16 text-center font-cairo"
                    >
                        {dict?.about_page?.values_title}
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {dict?.about_page?.values && Object.entries(dict.about_page.values).map(([key, value], idx) => (
                            <motion.div
                                key={key}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm hover:shadow-lg transition-all"
                            >
                                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
                                    <History size={24} />
                                </div>
                                <p className="text-gray-700 font-bold text-lg leading-relaxed">
                                    {value as string}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Sectors Section */}
            {dict?.sectors_section && (
                <section className="py-24 bg-white">
                    <div className="container mx-auto px-6">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-4xl font-black text-gray-900 mb-6 font-cairo"
                            >
                                {dict.sectors_section.title}
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="text-lg text-gray-500 font-medium"
                            >
                                {dict.sectors_section.subtitle}
                            </motion.p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {dict.sectors_section.items.map((item: string, idx: number) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex items-center gap-4 hover:bg-white hover:shadow-md transition-all group"
                                >
                                    <div className="w-2 h-2 bg-primary rounded-full group-hover:scale-150 transition-transform" />
                                    <span className="text-gray-900 font-bold">{item}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <ValueProposition dict={dict?.value_proposition} lang={lang} />
            <Clients dict={dict?.clients_section} lang={lang} />
            <FinalCTA dict={dict?.final_cta} lang={lang} />
        </main>

    )
}
