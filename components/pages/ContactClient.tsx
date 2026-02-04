'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import PageHeader from '@/components/PageHeader'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, CheckCircle2 } from 'lucide-react'

export default function ContactClient({ dict, lang }: { dict: any, lang: string }) {
    const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle')
    const isRtl = lang === 'ar'

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setFormStatus('submitting')
        // Simulate API call
        setTimeout(() => {
            setFormStatus('success')
        }, 1500)
    }

    return (
        <main className="bg-white min-h-screen">
            <Header lang={lang} navigation={dict?.navigation} header={dict?.header} />
            <PageHeader
                title={dict?.contact_page?.title || 'تواصل معنا'}
                subtitle={dict?.contact_page?.subtitle || 'نحن هنا لدعم رحلتك العلمية...'}
                breadcrumb={[{ label: dict?.contact_page?.breadcrumb || 'اتصل بنا' }]}
                lang={lang}
            />

            <div className="container mx-auto px-6 py-20">

                {/* Contact Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 -mt-32 relative z-10">
                    <ContactCard
                        icon={<Phone size={32} />}
                        title={dict?.contact_page?.cards?.call_title || 'اتصل بنا مباشرة'}
                        info="+20 100 123 4567"
                        subInfo={dict?.contact_page?.cards?.call_sub || 'متاح طوال أيام الأسبوع'}
                        delay={0}
                        lang={lang}
                    />
                    <ContactCard
                        icon={<Mail size={32} />}
                        title={dict?.contact_page?.cards?.email_title || 'البريد الإلكتروني'}
                        info="sales@al-eman.com"
                        subInfo={dict?.contact_page?.cards?.email_sub || 'نرد خلال 24 ساعة'}
                        delay={0.1}
                        lang={lang}
                    />
                    <ContactCard
                        icon={<MapPin size={32} />}
                        title={dict?.contact_page?.cards?.visit_title || 'شرّفنا بالزيارة'}
                        info={dict?.contact_page?.cards?.visit_sub || 'مدينة نصر، القاهرة'}
                        subInfo={isRtl ? 'المنطقة السادسة، ش حسنين هيكل' : '6th District, Hassanein Heikal St.'}
                        delay={0.2}
                        lang={lang}
                    />
                </div>

                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16`}>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-gray-50 rounded-[40px] p-8 md:p-12 border border-gray-100"
                    >
                        <div className={`mb-8 ${isRtl ? 'text-right' : 'text-left'}`}>
                            <h2 className="text-3xl font-black text-gray-900 mb-4 font-cairo">{dict?.contact_page?.form?.title}</h2>
                            <p className="text-gray-500">{dict?.contact_page?.form?.subtitle}</p>
                        </div>

                        {formStatus === 'success' ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-green-50 border border-green-100 rounded-3xl p-8 text-center"
                            >
                                <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle2 size={40} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2 font-cairo">{dict?.contact_page?.form?.success_title}</h3>
                                <p className="text-gray-600">{dict?.contact_page?.form?.success_desc}</p>
                                <button
                                    onClick={() => setFormStatus('idle')}
                                    className="mt-6 text-primary font-bold hover:underline"
                                >
                                    {dict?.contact_page?.form?.send_another}
                                </button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className={`space-y-2 ${isRtl ? 'text-right' : 'text-left'}`}>
                                        <label className="text-sm font-bold text-gray-700">{dict?.contact_page?.form?.name}</label>
                                        <input required type="text" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-start" placeholder={dict?.contact_page?.form?.name_placeholder} />
                                    </div>
                                    <div className={`space-y-2 ${isRtl ? 'text-right' : 'text-left'}`}>
                                        <label className="text-sm font-bold text-gray-700">{dict?.contact_page?.form?.company}</label>
                                        <input type="text" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-start" placeholder={dict?.contact_page?.form?.company_placeholder} />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className={`space-y-2 ${isRtl ? 'text-right' : 'text-left'}`}>
                                        <label className="text-sm font-bold text-gray-700">{dict?.contact_page?.form?.email}</label>
                                        <input required type="email" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-start" placeholder="email@example.com" />
                                    </div>
                                    <div className={`space-y-2 ${isRtl ? 'text-right' : 'text-left'}`}>
                                        <label className="text-sm font-bold text-gray-700">{dict?.contact_page?.form?.phone}</label>
                                        <input required type="tel" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-start" placeholder="01xxxxxxxxx" />
                                    </div>
                                </div>

                                <div className={`space-y-2 ${isRtl ? 'text-right' : 'text-left'}`}>
                                    <label className="text-sm font-bold text-gray-700">{dict?.contact_page?.form?.type}</label>
                                    <select className={`w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all appearance-none cursor-pointer text-start`}>
                                        <option>{dict?.contact_page?.form?.type_options?.quote}</option>
                                        <option>{dict?.contact_page?.form?.type_options?.consult}</option>
                                        <option>{dict?.contact_page?.form?.type_options?.support}</option>
                                        <option>{dict?.contact_page?.form?.type_options?.general}</option>
                                    </select>
                                </div>

                                <div className={`space-y-2 ${isRtl ? 'text-right' : 'text-left'}`}>
                                    <label className="text-sm font-bold text-gray-700">{dict?.contact_page?.form?.message}</label>
                                    <textarea required rows={4} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-start" placeholder={dict?.contact_page?.form?.message_placeholder} />
                                </div>

                                <button
                                    disabled={formStatus === 'submitting'}
                                    className="w-full py-4 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {formStatus === 'submitting' ? (
                                        dict?.contact_page?.form?.submitting
                                    ) : (
                                        <>
                                            {dict?.contact_page?.form?.submit} <Send size={18} className={isRtl ? 'rotate-180' : ''} />
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </motion.div>

                    {/* Map & Info */}
                    <div className="space-y-12">
                        {/* Map */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="h-[400px] bg-gray-200 rounded-[40px] overflow-hidden border border-gray-100 shadow-lg relative group"
                        >
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3452.967879942698!2d31.3432753!3d30.066429999999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583e60156d8129%3A0x6d9fee813c01d3a4!2sNasr%20City%2C%20Cairo%20Governorate!5e0!3m2!1sen!2seg!4v1706640000000!5m2!1sen!2seg"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="grayscale group-hover:grayscale-0 transition-all duration-700"
                            />
                        </motion.div>

                        {/* Working Hours */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm"
                        >
                            <div className={`flex items-center gap-4 mb-6 ${isRtl ? 'flex-row' : 'flex-row'}`}>
                                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                                    <Clock size={24} />
                                </div>
                                <div className={isRtl ? 'text-right' : 'text-left'}>
                                    <h3 className="font-bold text-lg font-cairo">{dict?.contact_page?.working_hours?.title}</h3>
                                    <p className="text-gray-500 text-sm">{dict?.contact_page?.working_hours?.subtitle}</p>
                                </div>
                            </div>
                            <ul className="space-y-4">
                                <li className="flex justify-between items-center text-sm font-medium border-b border-gray-50 pb-3">
                                    <span className="text-gray-900">{dict?.contact_page?.working_hours?.days}</span>
                                    <span className="text-primary font-bold dir-ltr">9:00 AM - 6:00 PM</span>
                                </li>
                                <li className="flex justify-between items-center text-sm font-medium pt-1">
                                    <span className="text-gray-900">{dict?.contact_page?.working_hours?.friday}</span>
                                    <span className="text-red-500 font-bold">{dict?.contact_page?.working_hours?.closed}</span>
                                </li>
                            </ul>
                        </motion.div>
                    </div>

                </div>

                {/* Floating WhatsApp for Contact Page */}
                <a
                    href="https://wa.me/201001234567"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`fixed bottom-8 ${isRtl ? 'left-8' : 'right-8'} z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center gap-2 group`}
                >
                    <MessageCircle size={28} />
                    <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 font-bold whitespace-nowrap">
                        {dict?.contact_page?.whatsapp_cta}
                    </span>
                </a>

            </div>

            <Footer dict={dict?.footer} lang={lang} />
        </main>
    )
}

function ContactCard({ icon, title, info, subInfo, delay, lang }: { icon: React.ReactNode, title: string, info: string, subInfo: string, delay: number, lang: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            className="bg-white p-8 rounded-[30px] border border-gray-100 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2 transition-all duration-300 text-center group"
        >
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 group-hover:bg-primary group-hover:text-white transition-colors mx-auto mb-6">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 font-cairo">{title}</h3>
            <p className={`text-primary font-bold text-lg mb-1 ${lang === 'en' && info.startsWith('+') ? 'dir-ltr' : 'dir-ltr'}`}>{info}</p>
            <p className="text-sm text-gray-400">{subInfo}</p>
        </motion.div>
    )
}
