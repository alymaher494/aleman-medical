import 'server-only'
import type { Locale } from '../i18n-config'

// We enumerate all dictionaries here for better linting and typescript support
// We also use a function to import the dictionary to avoid bundling all dictionaries
const dictionaries = {
    ar: () => import('../dictionaries/ar.json').then((module) => module.default),
    en: () => import('../dictionaries/en.json').then((module) => module.default),
}

export const getDictionary = async (locale: Locale) => dictionaries[locale]?.() ?? dictionaries.ar()
