'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import type { WordPressClient } from '@/lib/wordpress'

interface Client {
    name: string
    logo: string
    image?: string
    altText?: string
}

export default function ClientsWordPress({
    clients,
    dict,
    lang = 'ar'
}: {
    clients: WordPressClient[],
    dict?: any,
    lang?: string
}) {
    // Fallback static clients if WordPress data is not available
    const fallbackClients: Client[] = [
        { name: 'هيئة الدواء المصرية', logo: 'EDA', image: undefined, altText: 'هيئة الدواء المصرية' },
        { name: 'Pharco Pharmaceuticals', logo: 'PHARCO', image: undefined, altText: 'Pharco Pharmaceuticals' },
        { name: 'Nestle', logo: 'Nestle', image: undefined, altText: 'Nestle' },
        { name: 'Danone', logo: 'Danone', image: undefined, altText: 'Danone' },
        { name: 'Eva Pharma', logo: 'EVA', image: undefined, altText: 'Eva Pharma' },
        { name: 'Juhayna', logo: 'Juhayna', image: undefined, altText: 'Juhayna' },
        { name: 'Pfizer', logo: 'Pfizer', image: undefined, altText: 'Pfizer' },
        { name: 'Sanofi', logo: 'Sanofi', image: undefined, altText: 'Sanofi' },
    ]

    // Use WordPress clients if available, otherwise use fallback
    const displayClients: Client[] = clients && clients.length > 0
        ? clients.map(client => ({
            name: client.clientFields?.companyName || client.title,
            logo: client.clientFields?.logo || client.title,
            image: client.featuredImage?.node?.sourceUrl,
            altText: client.featuredImage?.node?.altText || client.title
        }))
        : fallbackClients

    // Ensure we have enough clients for smooth marquee (minimum 8)
    const minClients = 8
    let marqueeClients = [...displayClients]
    while (marqueeClients.length < minClients) {
        marqueeClients = [...marqueeClients, ...displayClients]
    }

    // Triple the list for seamless infinite loop
    const infiniteClients = [...marqueeClients, ...marqueeClients, ...marqueeClients]

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
                        x: [0, "-33.33%"],
                    }}
                    transition={{
                        duration: 60,
                        ease: 'linear',
                        repeat: Infinity,
                    }}
                    className="flex w-max gap-8 md:gap-12"
                >
                    {infiniteClients.map((client, idx) => (
                        <div
                            key={`${client.name}-${idx}`}
                            className="flex flex-col items-center justify-center min-w-[260px] md:min-w-[340px]"
                        >
                            <motion.div
                                whileHover={{ scale: 1.03, y: -5 }}
                                className="h-32 w-full flex items-center justify-center bg-gradient-to-r from-primary to-primary-light rounded-[35px] shadow-lg shadow-primary/5 border border-white/10 transition-all duration-500 overflow-hidden relative group/logo"
                            >
                                {/* Subtle internal shine effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/logo:animate-shine" />

                                {client.image ? (
                                    <div className="relative w-full h-full p-6">
                                        <Image
                                            src={client.image}
                                            alt={client.altText || client.name}
                                            fill
                                            sizes="340px"
                                            className="object-contain filter brightness-0 invert opacity-95 group-hover/logo:opacity-100 transition-opacity p-4"
                                        />
                                    </div>
                                ) : (
                                    <span className="text-2xl md:text-3xl font-black text-white/95 group-hover/logo:text-white transition-all duration-300 drop-shadow-md tracking-tight px-4 text-center">
                                        {client.logo}
                                    </span>
                                )}
                            </motion.div>
                            <span className="mt-5 text-[11px] font-black text-primary/40 uppercase tracking-widest transition-colors text-center">
                                {client.name}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>

            <div className="container mx-auto px-6 mt-16 text-center">
                <p className="text-gray-400 font-medium text-sm">
                    {dict?.footer_text_1 || 'أكثر من'} <span className="text-primary font-black">{displayClients.length > 0 ? displayClients.length * 10 : 500}</span> {dict?.footer_text_2 || 'عميل وشريك نجاح...'}
                </p>
            </div>
        </section>
    )
}
