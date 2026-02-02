'use client'

import { motion } from 'framer-motion'
import { Microscope, Beaker, FlaskConical, ClipboardList, Settings2, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function Services({ dict, lang = 'ar' }: { dict?: any, lang?: string }) {
    const services = [
        {
            id: '001',
            title: dict?.items?.lab_setup?.title || 'تجهيز المختبرات',
            description: dict?.items?.lab_setup?.desc || 'حلول متكاملة...',
            icon: <Settings2 size={24} />,
            image: 'https://images.unsplash.com/photo-1579154273821-ad99159ad503?q=80&w=800',
            slug: 'lab-setup'
        },
        {
            id: '002',
            title: dict?.items?.microbiology?.title || 'علوم الحياة',
            description: dict?.items?.microbiology?.desc || 'منتجات الأحياء الدقيقة...',
            icon: <Microscope size={24} />,
            image: 'https://images.unsplash.com/photo-1532187643603-ba119ca4109e?q=80&w=800',
            slug: 'microbiology'
        },
        {
            id: '003',
            title: dict?.items?.chemicals?.title || 'الكيماويات والكواشف',
            description: dict?.items?.chemicals?.desc || 'توفير الكيماويات...',
            icon: <Beaker size={24} />,
            image: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?q=80&w=800',
            slug: 'chemicals'
        },
        {
            id: '004',
            title: dict?.items?.equipment?.title || 'الأجهزة والمعدات',
            description: dict?.items?.equipment?.desc || 'توريد وتركيب...',
            icon: <FlaskConical size={24} />,
            image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=800',
            slug: 'lab-equipment'
        },
        {
            id: '005',
            title: dict?.items?.consumables?.title || 'المستهلكات المخبرية',
            description: dict?.items?.consumables?.desc || 'الزجاجيات...',
            icon: <ClipboardList size={24} />,
            image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800',
            slug: 'consumables'
        },
    ]

    const isRtl = lang === 'ar'

    return (
        <section className="py-24 bg-gradient-to-b from-white to-brand-bg/30">
            <div className="container mx-auto px-6">

                {/* Header Content */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight"
                    >
                        {dict?.title}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-gray-500 font-medium leading-relaxed"
                    >
                        {dict?.description}
                    </motion.p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white border border-gray-100 rounded-[40px] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 group flex flex-col h-full"
                        >
                            <Link href={`/${lang}/services/${service.slug}`} className="flex flex-col h-full">
                                {/* Image Reveal Area */}
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <div className={`absolute top-6 ${isRtl ? 'right-6' : 'left-6'}`}>
                                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary-light shadow-lg">
                                            {service.icon}
                                        </div>
                                    </div>
                                </div>

                                {/* Content Area */}
                                <div className="p-8 flex flex-col flex-grow">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="text-secondary font-bold text-xs tracking-widest">{service.id}</span>
                                        <div className="h-[1px] flex-grow bg-gray-100" />
                                    </div>

                                    <h3 className="text-2xl font-bold text-gray-900 mb-4 font-cairo group-hover:text-primary transition-colors">
                                        {service.title}
                                    </h3>

                                    <p className="text-gray-500 font-medium leading-relaxed text-sm mb-8 flex-grow">
                                        {service.description}
                                    </p>

                                    <div
                                        className={`flex items-center gap-2 text-primary font-black text-sm uppercase tracking-wider group/btn self-start`}
                                    >
                                        {dict?.btn}
                                        <ArrowLeft size={16} className={`transition-transform ${isRtl ? 'group-hover/btn:-translate-x-1' : 'rotate-180 group-hover/btn:translate-x-1'}`} />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    )
}
