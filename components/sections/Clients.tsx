'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import type { WordPressClient } from '@/lib/wordpress'

interface ClientItem {
    name: string
    logo: string
    image?: string
}

const fallbackClients: ClientItem[] = [
    { name: 'هيئة الدواء المصرية', logo: 'EDA' },
    { name: 'Pharco Pharmaceuticals', logo: 'PHARCO' },
    { name: 'Nestle', logo: 'Nestle' },
    { name: 'Danone', logo: 'Danone' },
    { name: 'General Organization for Export & Import Control', logo: 'GOEIC' },
    { name: 'Regional Center for Food & Feed', logo: 'RCFF' },
    { name: 'Sedico Pharmaceuticals', logo: 'Sedico' },
    { name: 'Eva Pharma', logo: 'EVA' },
]

export default function Clients({
    wpClients,
    dict,
    lang = 'ar'
}: {
    wpClients?: WordPressClient[],
    dict?: any,
    lang?: string
}) {
    const isRtl = lang === 'ar'

    // Use WP clients if available, otherwise fallback
    const displayClients: ClientItem[] = wpClients && wpClients.length > 0
        ? wpClients.map(client => ({
            name: client.clientFields?.companyName || client.title,
            logo: client.clientFields?.logo || client.title,
            image: client.featuredImage?.node?.sourceUrl || client.clientFields?.logo
        }))
        : fallbackClients

    // Double/Triple for seamless loop
    const marqueeItems = [...displayClients, ...displayClients, ...displayClients]

    return (
        <section className="py-24 bg-white overflow-hidden border-y border-gray-50">
            <div className="container mx-auto px-6 mb-16 text-center">
                <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-primary-light font-black text-xs uppercase tracking-[0.4em] mb-4 block"
                >
                    {dict?.tag || 'سابقة أعمالنا'}
                </motion.span>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-black text-gray-900 font-cairo"
                >
                    {dict?.MarqueeText || 'نعتز بثقتهم وشركائنا في النجاح'}
                </motion.h2>
            </div>

            {/* Marquee Container with lateral fades */}
            <div className="relative w-full overflow-hidden py-10 before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-40 before:bg-gradient-to-r before:from-white before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-40 after:bg-gradient-to-l after:from-white after:to-transparent">
                <motion.div
                    animate={{
                        x: isRtl ? ["0%", "-33.3333%"] : ["-33.3333%", "0%"],
                    }}
                    transition={{
                        duration: 30, // Optimized speed
                        ease: 'linear',
                        repeat: Infinity,
                    }}
                    className="flex w-max"
                >
                    {marqueeItems.map((client, idx) => (
                        <div
                            key={idx}
                            className="flex flex-col items-center justify-center min-w-[200px] md:min-w-[280px] px-8 group"
                        >
                            <motion.div
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="h-28 w-full flex items-center justify-center bg-gray-50/50 rounded-[35px] shadow-sm border border-gray-100 transition-all duration-500 overflow-hidden relative group/logo p-6"
                            >
                                {client.image ? (
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={client.image}
                                            alt={client.name}
                                            fill
                                            className="object-contain transition-transform duration-500 group-hover/logo:scale-110"
                                        />
                                    </div>
                                ) : (
                                    <span className="text-xl font-black text-primary/30 group-hover/logo:text-primary transition-all duration-300 tracking-tight text-center">
                                        {client.logo}
                                    </span>
                                )}
                            </motion.div>
                            <span className="mt-5 text-[10px] font-black text-primary/40 uppercase tracking-widest group-hover:text-primary transition-colors text-center px-4 line-clamp-1">
                                {client.name}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>

            <div className="container mx-auto px-6 mt-16 text-center">
                <p className="text-gray-400 font-medium text-sm">
                    {dict?.footer_text_1 || 'أكثر من'} <span className="text-primary font-black">500</span> {dict?.footer_text_2 || 'عميل وشريك نجاح...'}
                </p>
            </div>
        </section>
    )
}
