'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Rocket } from 'lucide-react'
import Link from 'next/link'

export default function FinalCTA({ dict, lang = 'ar' }: { dict?: any, lang?: string }) {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="relative rounded-[50px] overflow-hidden bg-gradient-to-r from-primary via-primary to-primary-light p-12 md:p-20 text-center">

                    {/* Decorative Elements */}
                    <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-light/20 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />

                    <div className="relative z-10 max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white mx-auto mb-10"
                        >
                            <Rocket size={32} />
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-8 font-cairo leading-tight"
                        >
                            {dict?.title} <br />
                            <span className="text-white/80">{dict?.subtitle}</span>
                        </motion.h2>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-wrap justify-center gap-6"
                        >
                            <Link href={`/${lang}/contact`}>
                                <motion.button
                                    whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-10 py-5 bg-white text-primary rounded-full font-black text-lg shadow-xl flex items-center gap-3 transition-all font-cairo"
                                >
                                    {dict?.btn}
                                    <ArrowLeft size={20} className={lang === 'ar' ? '' : 'rotate-180'} />
                                </motion.button>
                            </Link>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    )
}
