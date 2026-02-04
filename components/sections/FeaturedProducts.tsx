'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function FeaturedProducts({ dict, lang = 'ar', wpProducts = [] }: { dict?: any, lang?: string, wpProducts?: any[] }) {
    const [activeTab, setActiveTab] = useState('all')

    const categories = [
        { id: 'all', name: dict?.categories?.all || 'الكل' },
        { id: 'chemicals', name: dict?.categories?.chemicals || 'الكيماويات' },
        { id: 'equipment', name: dict?.categories?.equipment || 'الأجهزة' },
        { id: 'strains', name: dict?.categories?.strains || 'السلالات' },
    ]

    // Use WP products if available, with fallbacks for UI consistency
    const displayProducts = wpProducts.length > 0
        ? wpProducts.map(p => ({
            id: p.id,
            title: p.title,
            category: p.productFields?.category?.toLowerCase() || 'equipment',
            image: p.featuredImage?.node?.sourceUrl || 'https://images.unsplash.com/photo-1581093196867-27f311f49615?q=80&w=600',
            price: p.productFields?.price || dict?.price_request,
            slug: p.slug
        }))
        : [
            {
                id: 1,
                title: lang === 'ar' ? 'محلول كيميائي عالي النقاء' : 'High Purity Chemical Solution',
                category: 'chemicals',
                image: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?q=80&w=600',
                price: dict?.price_request,
                slug: 'high-purity-chemical'
            },
            {
                id: 2,
                title: lang === 'ar' ? 'جهاز طرد مركزي متطور' : 'Advanced Centrifuge',
                category: 'equipment',
                image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=600',
                price: dict?.price_request,
                slug: 'centrifuge-max'
            }
        ]

    const filteredProducts = activeTab === 'all'
        ? displayProducts
        : displayProducts.filter(p => p.category === activeTab || (activeTab === 'strains' && p.category.includes('strain')))

    const isRtl = lang === 'ar'

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-6">

                {/* Header content */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 text-start">
                    <div className="max-w-2xl">
                        <motion.h2
                            initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight font-cairo"
                        >
                            {dict?.title}
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-lg text-gray-500 font-medium leading-relaxed"
                        >
                            {dict?.description}
                        </motion.p>
                    </div>

                    <Link href={`/${lang}/products`}>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="hidden md:flex items-center gap-3 px-8 py-4 border-2 border-primary/10 text-primary font-bold rounded-full hover:bg-primary hover:text-white transition-all duration-300 font-cairo"
                        >
                            {dict?.cta}
                            <ArrowLeft size={18} className={isRtl ? '' : 'rotate-180'} />
                        </motion.button>
                    </Link>
                </div>

                {/* Tab Filtering */}
                <div className={`flex flex-wrap gap-3 mb-12 justify-start`}>
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveTab(cat.id)}
                            className={`px-6 py-3 rounded-2xl font-bold text-sm transition-all duration-300 ${activeTab === cat.id
                                ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-105'
                                : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                                }`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>

                {/* Product Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence mode='popLayout'>
                        {filteredProducts.slice(0, 6).map((product) => (
                            <motion.div
                                key={product.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4 }}
                                className="group relative bg-gray-50 rounded-[40px] overflow-hidden border border-gray-100/50 hover:bg-gradient-to-br hover:from-primary hover:to-primary-light hover:shadow-lg hover:shadow-primary/20 transition-all duration-500"
                            >
                                <Link href={`/${lang}/products/${product.slug}`} className="block h-full">
                                    {/* Image Container */}
                                    <div className="aspect-square relative overflow-hidden p-6">
                                        <div className="w-full h-full rounded-[30px] overflow-hidden relative shadow-sm bg-white">
                                            <Image
                                                src={product.image}
                                                alt={product.title}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>

                                        {/* Badge */}
                                        <div className={`absolute top-10 z-10 ${isRtl ? 'right-10' : 'left-10'}`}>
                                            <div className="px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black text-primary-light uppercase tracking-widest shadow-sm">
                                                {categories.find(c => c.id === product.category)?.name || product.category}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-8 pt-0">
                                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-white mb-4 font-cairo min-h-[56px] line-clamp-2 transition-colors duration-300">
                                            {product.title}
                                        </h3>

                                        <div className="flex items-center justify-between mt-6">
                                            <span className="text-primary-light group-hover:text-white font-black text-sm transition-colors duration-300">{product.price}</span>
                                            <div
                                                className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-white group-hover:text-primary transition-all duration-300 shadow-sm"
                                            >
                                                <ArrowLeft size={20} className={isRtl ? '' : 'rotate-180'} />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Mobile-only CTA */}
                <div className="mt-12 md:hidden">
                    <Link href={`/${lang}/products`}>
                        <button className="w-full py-5 bg-gray-900 text-white rounded-[25px] font-bold shadow-xl shadow-gray-200">
                            {dict?.cta_mobile || 'استعرض جميع المنتجات'}
                        </button>
                    </Link>
                </div>

            </div>
        </section>
    )
}
