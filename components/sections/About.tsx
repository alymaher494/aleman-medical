'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, CheckCircle2, FlaskConical, Microscope, Beaker, Award, Users } from 'lucide-react'
import Link from 'next/link'

export default function About({ dict, lang = 'ar' }: { dict?: any, lang?: string }) {
    const stats = [
        { number: '30+', label: dict?.stats?.exp || 'عاماً من الخبرة', icon: <Award className="text-primary" size={24} />, id: '001' },
        { number: '+500', label: dict?.stats?.clients || 'عميل وشريك نجاح', icon: <Users className="text-primary" size={24} />, id: '002' },
        { number: '100%', label: dict?.stats?.quality || 'جودة وموثوقية', icon: <Microscope className="text-primary" size={24} />, id: '003' },
    ]

    const isRtl = lang === 'ar'

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-6">

                {/* Top Grid: Content + Visual Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">

                    {/* Text Content */}
                    <div className="lg:col-span-5 text-start order-2 lg:order-1">
                        <motion.h2
                            initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-black text-gray-900 mb-8 leading-tight"
                        >
                            {dict?.title}
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-lg text-gray-500 mb-10 leading-relaxed font-medium"
                        >
                            {dict?.description}
                        </motion.p>

                        <Link href={`/${lang}/about`}>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-primary text-white rounded-full font-bold flex items-center gap-3 shadow-xl shadow-blue-100 transition-all font-cairo"
                            >
                                {dict?.cta}
                                <ArrowLeft size={18} className={isRtl ? '' : 'rotate-180'} />
                            </motion.button>
                        </Link>
                    </div>

                    {/* Visual Cards Grid */}
                    <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6 order-1 lg:order-2">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-primary/5 rounded-[40px] p-8 aspect-square flex flex-col justify-end gap-4 overflow-hidden relative group"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800"
                                className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-700"
                                alt="Medical Service"
                            />
                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">{dict?.cards?.precision_title}</h3>
                                <p className="text-sm text-gray-600 font-medium">{dict?.cards?.precision_desc}</p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-white border border-gray-100 rounded-[40px] p-10 shadow-2xl shadow-gray-100/50 flex flex-col justify-center gap-6"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                                    <Microscope size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-lg leading-none mb-1">{dict?.cards?.lab_title}</h4>
                                    <span className="text-xs text-secondary font-bold">Lab Solution</span>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="h-2 w-full bg-gray-50 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: '85%' }}
                                        viewport={{ once: true }}
                                        className="h-full bg-primary"
                                    />
                                </div>
                                <div className="h-2 w-full bg-gray-50 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: '95%' }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.3 }}
                                        className="h-full bg-[#a594ff]"
                                    />
                                </div>
                                <p className="text-sm text-gray-400 font-medium leading-relaxed">{dict?.cards?.lab_desc}</p>
                            </div>
                        </motion.div>
                    </div>

                </div>

                {/* Bottom Layer: Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-gray-50/50 border border-gray-100/50 p-8 rounded-[30px] flex items-center justify-between group hover:bg-white hover:shadow-xl transition-all duration-300"
                        >
                            <div className="flex items-center gap-6">
                                <div className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter">
                                    {stat.number}
                                </div>
                                <div className="text-start">
                                    <div className="text-sm text-gray-500 font-bold mb-1 uppercase tracking-wider">
                                        {stat.label}
                                    </div>
                                    <div className="text-[10px] text-gray-300 font-bold tracking-widest mt-1">{stat.id}</div>
                                </div>
                            </div>
                            <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-primary-light">
                                {stat.icon}
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    )
}
