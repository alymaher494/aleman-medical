'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, MoveRight } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import Image from 'next/image'
import Link from 'next/link'

// Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default function Hero({ lang, dict }: { lang: string, dict: any }) {
    const isRtl = lang === 'ar'

    // High-quality reliable images with fallbacks
    const images = [
        { src: 'https://images.unsplash.com/photo-1579165466741-7f35a4755657?q=80&w=1920&auto=format&fit=crop', alt: 'Laboratory Equipment' },
        { src: 'https://images.unsplash.com/photo-1532187643603-ba119ca4109e?q=80&w=1920&auto=format&fit=crop', alt: 'Science Research' },
        { src: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1920&auto=format&fit=crop', alt: 'Chemical Analysis' },
        { src: 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?q=80&w=1920&auto=format&fit=crop', alt: 'Pharmacy Production' },
    ]

    return (
        <section className="relative pt-32 pb-20 md:pt-10 md:pb-32 overflow-hidden bg-gradient-to-b from-brand-bg to-white">

            {/* Content Layer */}
            <div className="container mx-auto px-6 relative z-10 py-16 text-center">
                <div className="max-w-4xl mx-auto">
                    {/* Top Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gray-100 shadow-sm mb-8"
                    >
                        <span className="w-2 h-2 rounded-full bg-primary-light animate-pulse" />
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            {dict?.badge || (lang === 'ar' ? 'نخدم القطاع الطبي والدوائي منذ 1995' : 'Serving Medical & Pharma Sectors Since 1995')}
                        </span>
                    </motion.div>

                    {/* Main Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="text-4xl md:text-6xl font-black text-gray-900 mb-8 leading-[1.3] tracking-tight bg-gradient-to-l from-primary to-primary-light bg-clip-text text-transparent px-4"
                    >
                        {dict?.title}
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="text-lg md:text-xl text-gray-500 mb-12 max-w-4xl mx-auto leading-relaxed font-medium px-4"
                    >
                        {dict?.subtitle}
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="flex flex-wrap items-center justify-center gap-4 mb-16"
                    >
                        <Link href={`/${lang}/products`}>
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="px-10 py-4.5 bg-primary text-white rounded-2xl font-bold flex items-center gap-3 shadow-2xl shadow-primary/20 transition-all font-cairo"
                            >
                                {dict?.cta_primary}
                                <ArrowLeft size={20} className={isRtl ? '' : 'rotate-180'} />
                            </motion.button>
                        </Link>
                        <Link href={`/${lang}/contact`}>
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="px-10 py-4 bg-primary-light hover:bg-primary text-white rounded-full font-bold flex items-center gap-3 shadow-xl shadow-blue-100 transition-all text-lg font-cairo"
                            >
                                {dict?.cta_secondary}
                                <ArrowLeft size={18} className={isRtl ? '' : 'rotate-180'} />
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Slider Layer */}
            <div className="w-full relative px-0 group">
                <Swiper
                    modules={[Autoplay, Navigation, Pagination]}
                    centeredSlides={true}
                    loop={true}
                    spaceBetween={40}
                    slidesPerView={1.25}
                    speed={1200}
                    autoplay={{
                        delay: 6000,
                        disableOnInteraction: false,
                    }}
                    navigation={{
                        nextEl: '.swiper-drag-btn-hero',
                    }}
                    pagination={{
                        clickable: true,
                        dynamicBullets: true,
                    }}
                    breakpoints={{
                        320: { slidesPerView: 1, spaceBetween: 20 },
                        768: { slidesPerView: 1.15, spaceBetween: 30 },
                        1024: { slidesPerView: 1.35, spaceBetween: 50 },
                    }}
                    className="hero-slider-main !overflow-visible"
                >
                    {images.map((img, idx) => (
                        <SwiperSlide key={idx}>
                            <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-[40px] md:rounded-[60px] shadow-2xl shadow-black/5 border border-white/20">
                                <Image
                                    src={img.src}
                                    alt={img.alt}
                                    fill
                                    priority={idx === 0}
                                    quality={100}
                                    className="object-cover transition-transform duration-[2000ms] hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Custom Nav */}
                <button
                    className={`swiper-drag-btn-hero absolute ${isRtl ? 'left-[10%]' : 'right-[10%]'} top-1/2 -translate-y-1/2 z-30 w-16 h-16 md:w-24 md:h-24 flex items-center justify-center bg-white rounded-full shadow-2xl text-primary hover:scale-110 active:scale-95 transition-all duration-300 opacity-0 group-hover:opacity-100`}
                >
                    <MoveRight size={32} className={isRtl ? 'rotate-180' : ''} />
                </button>
            </div>

        </section>
    )
}
