'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, FileText, Phone, ArrowLeft, Beaker, ShieldCheck, Truck, Cog } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function ServiceClient({ service, dict, lang }: { service: any, dict: any, lang: string }) {
    const isRtl = lang === 'ar'

    return (
        <div className="container mx-auto px-6 py-20">
            <div className={`grid grid-cols-1 lg:grid-cols-3 gap-12`}>

                {/* MAIN CONTENT (2/3) */}
                <div className="lg:col-span-2">
                    {/* Main Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="rounded-[40px] overflow-hidden mb-12 shadow-xl border border-gray-100 bg-gray-50 relative h-[300px] md:h-[450px]"
                    >
                        {service.image ? (
                            <Image
                                src={service.image}
                                alt={service.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                                <Beaker size={64} />
                            </div>
                        )}
                    </motion.div>

                    {/* Overview */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className={`mb-16 ${isRtl ? 'text-right' : 'text-left'}`}
                    >
                        <h2 className="text-3xl font-black text-gray-900 mb-6 font-cairo">
                            {isRtl ? 'نظرة عامة على الخدمة' : 'Service Overview'}
                        </h2>
                        <p className="text-gray-600 leading-loose text-lg font-medium">
                            {service.description}
                        </p>
                    </motion.div>

                    {/* Key Features */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className={`mb-16 bg-gray-50 p-10 rounded-[40px] border border-gray-100 ${isRtl ? 'text-right' : 'text-left'}`}
                    >
                        <h3 className="text-2xl font-black text-gray-900 mb-8 font-cairo flex items-center gap-3">
                            <ShieldCheck className="text-primary" />
                            {isRtl ? `لماذا تختار خدمة ${service.title}؟` : `Why Choose Our ${service.title}?`}
                        </h3>
                        <ul className="space-y-4">
                            {service.features.map((feature: string, idx: number) => (
                                <li key={idx} className="flex items-center gap-4 text-gray-700 font-bold">
                                    <CheckCircle2 className="text-green-500 flex-shrink-0" size={24} />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Our Process - Vertical Steps */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className={`mb-16 ${isRtl ? 'text-right' : 'text-left'}`}
                    >
                        <h3 className="text-2xl font-black text-gray-900 mb-10 font-cairo flex items-center gap-3">
                            <Cog className="text-primary" />
                            {isRtl ? 'رحلة العمل (Our Process)' : 'Our Work Process'}
                        </h3>
                        <div className={`space-y-8 relative before:absolute ${isRtl ? 'before:right-6' : 'before:left-6'} before:top-4 before:bottom-4 before:w-[2px] before:bg-gray-200`}>
                            {service.process.map((step: any, idx: number) => (
                                <div key={idx} className={`relative flex items-start gap-8 ${isRtl ? 'pr-16' : 'pl-16'} group`}>
                                    {/* Number Bubble */}
                                    <div className={`absolute ${isRtl ? 'right-0' : 'left-0'} top-0 w-12 h-12 bg-white border-4 border-gray-100 rounded-full flex items-center justify-center font-black text-xl text-primary z-10 group-hover:border-primary group-hover:bg-primary group-hover:text-white transition-colors`}>
                                        {idx + 1}
                                    </div>

                                    <div>
                                        <h4 className="text-xl font-bold text-gray-900 mb-2 font-cairo">{step.title}</h4>
                                        <p className="text-gray-500 leading-relaxed font-medium">{step.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Related Products */}
                    {service.relatedProducts && service.relatedProducts.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className={isRtl ? 'text-right' : 'text-left'}
                        >
                            <h3 className="text-2xl font-black text-gray-900 mb-8 font-cairo flex items-center gap-3">
                                <Beaker className="text-primary" />
                                {isRtl ? 'تجهيزات مرتبطة بهذه الخدمة' : 'Related Equipment'}
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {service.relatedProducts.map((prod: any) => (
                                    <div key={prod.id} className="bg-white border border-gray-100 rounded-[30px] overflow-hidden hover:shadow-lg transition-shadow group">
                                        <div className="h-40 overflow-hidden">
                                            <img src={prod.image} alt={prod.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        </div>
                                        <div className="p-6">
                                            <span className="text-[10px] bg-gray-100 text-gray-500 px-3 py-1 rounded-full font-bold mb-3 inline-block">
                                                {prod.category}
                                            </span>
                                            <h5 className="font-bold text-gray-900 mb-2 font-cairo text-sm">{prod.name}</h5>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>


                {/* SIDEBAR (1/3) */}
                <div className="lg:col-span-1">
                    <div className="sticky top-28 space-y-8">
                        {/* Contact Expert Card */}
                        <motion.div
                            initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-gray-900 text-white p-8 rounded-[40px]"
                        >
                            <div className={`flex items-center gap-4 mb-6 ${isRtl ? 'flex-row' : 'flex-row'}`}>
                                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-primary-light">
                                    <Phone size={32} />
                                </div>
                                <div className={isRtl ? 'text-right' : 'text-left'}>
                                    <h4 className="font-bold text-lg font-cairo">
                                        {isRtl ? 'هل تحتاج مساعدة؟' : 'Need Help?'}
                                    </h4>
                                    <p className="text-gray-400 text-xs">
                                        {isRtl ? 'تحدث مباشرة مع خبرائنا' : 'Speak directly with our experts'}
                                    </p>
                                </div>
                            </div>

                            <form className="space-y-4">
                                <input type="text" placeholder={isRtl ? "الاسم الكامل" : "Full Name"} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary placeholder:text-gray-500 text-start" />
                                <input type="email" placeholder={isRtl ? "البريد الإلكتروني" : "Email Address"} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary placeholder:text-gray-500 text-start" />
                                <input type="text" placeholder={isRtl ? "الجهة / المصنع" : "Entity / Factory"} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary placeholder:text-gray-500 text-start" />
                                <textarea placeholder={isRtl ? "تفاصيل احتياجك..." : "Project details..."} rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary placeholder:text-gray-500 text-start" />

                                <button className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-white hover:text-primary transition-colors flex items-center justify-center gap-2">
                                    {isRtl ? 'اطلب استشارة مجانية' : 'Request Free Consultation'}
                                    <ArrowLeft size={18} className={isRtl ? '' : 'rotate-180'} />
                                </button>
                            </form>

                            <div className="mt-8 pt-8 border-t border-white/10 flex flex-col gap-4 text-start">
                                <Link href="tel:+201001234567" className="flex items-center gap-3 text-sm text-gray-300 hover:text-primary transition-colors">
                                    <Phone size={16} className="text-primary-light" />
                                    <span dir="ltr">+20 100 123 4567</span>
                                </Link>
                                <div className="flex items-center gap-3 text-sm text-gray-300">
                                    <Truck size={16} className="text-primary-light" />
                                    <span>{isRtl ? 'توريد لكافة أنحاء الجمهورية' : 'Nationwide delivery available'}</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Download Brochure */}
                        <motion.div
                            initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <button className="w-full py-6 rounded-[30px] border-2 border-dashed border-gray-300 text-gray-500 font-bold hover:border-primary hover:text-primary hover:bg-primary/5 transition-all flex flex-col items-center justify-center gap-3">
                                <FileText size={32} />
                                <span>{isRtl ? 'تحميل بروفايل الخدمة (PDF)' : 'Download Service Profile (PDF)'}</span>
                                <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-400">2.5 MB</span>
                            </button>
                        </motion.div>
                    </div>
                </div>

            </div>
        </div>
    )
}
