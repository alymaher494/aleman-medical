'use client'

import { motion } from 'framer-motion'
import { Award, ShieldCheck, Truck, HeadphonesIcon, Factory, Layers, BookOpen } from 'lucide-react'

export default function ValueProposition({ dict, lang = 'ar' }: { dict?: any, lang?: string }) {
    const defaultValues = [
        {
            title: dict?.items?.exp_title || 'خبرة 30 عاماً',
            description: dict?.items?.exp_desc || 'ثلاثة عقود من الريادة...',
            icon: <Award size={32} />,
        },
        {
            title: dict?.items?.auth_title || 'اعتماد وموثوقية',
            description: dict?.items?.auth_desc || 'نلتزم بتوريد منتجات...',
            icon: <ShieldCheck size={32} />,
        },
        {
            title: dict?.items?.direct_title || 'علاقات مباشرة مع الموردين',
            description: dict?.items?.direct_desc || 'وكلاء وموردون...',
            icon: <Truck size={32} />,
        },
        {
            title: dict?.items?.support_title || 'دعم فني متخصص',
            description: dict?.items?.support_desc || 'فريق مهندسين...',
            icon: <HeadphonesIcon size={32} />,
        },
    ]

    // Extend with additional items from dict if they exist
    const additionalValues = dict?.additional_items ? [
        {
            title: lang === 'ar' ? 'تجهيز كامل' : 'Full Capability',
            description: dict.additional_items.scratch,
            icon: <Factory size={32} />
        },
        {
            title: lang === 'ar' ? 'تنوع المحفظة' : 'Diverse Portfolio',
            description: dict.additional_items.portfolio,
            icon: <Layers size={32} />
        },
        {
            title: lang === 'ar' ? 'سجل حافل' : 'Track Record',
            description: dict.additional_items.track_record,
            icon: <BookOpen size={32} />
        }
    ] : []

    const values = [...defaultValues, ...additionalValues]

    const isRtl = lang === 'ar'

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="container mx-auto px-6">

                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-black text-gray-900 mb-6 font-cairo"
                    >
                        {dict?.title}
                    </motion.h2>
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '80px' }}
                        viewport={{ once: true }}
                        className="h-1.5 bg-primary mx-auto rounded-full mb-8"
                    />
                </div>

                {/* Values Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
                    {values.map((value, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="group text-center"
                        >
                            <div className="w-20 h-20 bg-brand-bg rounded-[24px] flex items-center justify-center text-primary-light mx-auto mb-8 transition-all duration-500 group-hover:bg-primary group-hover:text-white group-hover:shadow-xl group-hover:shadow-primary/20 group-hover:-rotate-6">
                                {value.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4 font-cairo">
                                {value.title}
                            </h3>
                            <p className="text-gray-500 leading-relaxed font-medium text-sm">
                                {value.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    )
}

