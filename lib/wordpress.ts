// WordPress GraphQL endpoint - MUST be defined in .env.local
const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL

if (!WORDPRESS_API_URL) {
    console.warn('⚠️ NEXT_PUBLIC_WORDPRESS_API_URL is not defined. Using fallback static data.')
}

// GraphQL Queries
const GET_POSTS_QUERY = `
    query GetPosts($language: LanguageCodeFilterEnum) {
        posts(where: { language: $language }, first: 6) {
            nodes {
                id
                title
                excerpt
                slug
                date
                featuredImage {
                    node {
                        sourceUrl
                        altText
                    }
                }
                categories {
                    nodes {
                        name
                    }
                }
            }
        }
    }
`

const GET_SERVICES_QUERY = `
    query GetServices($language: LanguageCodeFilterEnum) {
        allServices(where: { language: $language }, first: 10) {
            nodes {
                id
                title
                content
                slug
                featuredImage {
                    node {
                        sourceUrl
                        altText
                    }
                }
                serviceFields {
                    description
                    icon
                }
            }
        }
    }
`

const GET_PRODUCTS_QUERY = `
    query GetProducts {
        allProducts(first: 100) {
            nodes {
                id
                title
                slug
                featuredImage {
                    node {
                        sourceUrl
                        altText
                    }
                }
                productFields {
                    price
                    brand
                    category
                    sku
                    isCertified
                    shortDescription
                    pdfBrochure
                }
            }
        }
    }
`

const GET_CLIENTS_QUERY = `
    query GetClients($language: LanguageCodeFilterEnum) {
        allClientsPartners(where: { language: $language }, first: 40) {
            nodes {
                id
                title
                featuredImage {
                    node {
                        sourceUrl
                        altText
                    }
                }
                clientFields {
                    logo
                    companyName
                }
            }
        }
    }
`

const GET_SERVICE_BY_SLUG = `
    query GetServiceBySlug($id: ID!, $idType: ServiceIdType!) {
        service(id: $id, idType: $idType) {
            id
            title
            content
            slug
            featuredImage {
                node {
                    sourceUrl
                    altText
                }
            }
            serviceFields {
                description
                icon
            }
        }
    }
`

const GET_PRODUCT_BY_SLUG = `
    query GetProductBySlug($id: ID!, $idType: ProductIdType!) {
        product(id: $id, idType: $idType) {
            id
            title
            slug
            content
            featuredImage {
                node {
                    sourceUrl
                    altText
                }
            }
            productFields {
                price
                brand
                category
                sku
                isCertified
                shortDescription
                pdfBrochure
            }
        }
    }
`

const GET_POST_BY_SLUG = `
    query GetPostBySlug($id: ID!, $idType: PostIdType!) {
        post(id: $id, idType: $idType) {
            id
            title
            content
            date
            slug
            excerpt
            featuredImage {
                node {
                    sourceUrl
                    altText
                }
            }
            author {
                node {
                    name
                }
            }
            categories {
                nodes {
                    name
                }
            }
        }
    }
`

// Sanitize HTML content from WordPress
export function sanitizeHTML(html: string): string {
    if (!html) return ''
    return html
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/on\w+="[^"]*"/g, '')
        .replace(/on\w+='[^']*'/g, '')
        .trim()
}

// Encode URLs with non-ASCII characters (Arabic letters)
export function fixWpUrl(url: string | null | undefined): string {
    if (!url) return ''
    if (!url.startsWith('http')) return url
    try {
        const urlObj = new URL(url)
        return `${urlObj.protocol}//${urlObj.hostname}${encodeURI(urlObj.pathname)}${urlObj.search}`
    } catch (e) {
        return url
    }
}

export function getWhatsAppUrl(phone: string, message: string) {
    const cleanPhone = phone.replace(/\D/g, '')
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`
}

// Fetch data from WordPress using fetch API with ISR
async function fetchWordPressData(query: string, variables = {}) {
    if (!WORDPRESS_API_URL) return null

    try {
        const response = await fetch(WORDPRESS_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, variables }),
            next: { revalidate: 60 } // Reduced to 1 minute for testing
        })

        if (!response.ok) {
            console.error(`❌ WP API Response Error: ${response.status}`)
            return null
        }

        const json = await response.json()
        if (json.errors) {
            console.error('❌ GraphQL Errors:', JSON.stringify(json.errors, null, 2))
            return null
        }
        return json.data
    } catch (error) {
        console.error('❌ Error fetching WordPress data:', error)
        return null
    }
}

export async function fetchServiceBySlug(slug: string) {
    try {
        const data = await fetchWordPressData(GET_SERVICE_BY_SLUG, { id: slug, idType: 'SLUG' })
        if (!data?.service) {
            console.log(`ℹ️ Service with slug "${slug}" not found in WP.`)
            return null
        }
        return {
            ...data.service,
            content: sanitizeHTML(data.service.content || ''),
            serviceFields: {
                ...data.service.serviceFields,
                description: sanitizeHTML(data.service.serviceFields?.description || ''),
            },
            featuredImage: data.service.featuredImage ? {
                node: {
                    ...data.service.featuredImage.node,
                    sourceUrl: fixWpUrl(data.service.featuredImage.node.sourceUrl)
                }
            } : null
        }
    } catch (error) {
        return null
    }
}

export async function fetchPostBySlug(slug: string) {
    try {
        const data = await fetchWordPressData(GET_POST_BY_SLUG, { id: slug, idType: 'SLUG' })
        if (!data?.post) return null
        return {
            ...data.post,
            content: sanitizeHTML(data.post.content || ''),
            featuredImage: data.post.featuredImage ? {
                node: {
                    ...data.post.featuredImage.node,
                    sourceUrl: fixWpUrl(data.post.featuredImage.node.sourceUrl)
                }
            } : null
        }
    } catch (error) {
        return null
    }
}

export async function fetchPosts(language: 'AR' | 'EN' = 'AR') {
    try {
        const data = await fetchWordPressData(GET_POSTS_QUERY, { language })
        if (!data?.posts?.nodes) return []
        return data.posts.nodes.map((post: any) => ({
            ...post,
            excerpt: sanitizeHTML(post.excerpt || ''),
            featuredImage: post.featuredImage ? {
                node: {
                    ...post.featuredImage.node,
                    sourceUrl: fixWpUrl(post.featuredImage.node.sourceUrl)
                }
            } : null
        }))
    } catch (error) {
        return []
    }
}

export async function fetchProducts(language: 'AR' | 'EN' = 'AR') {
    try {
        const data = await fetchWordPressData(GET_PRODUCTS_QUERY, {})
        if (!data?.allProducts?.nodes) return []
        return data.allProducts.nodes.map((p: any) => ({
            ...p,
            featuredImage: p.featuredImage ? {
                node: {
                    ...p.featuredImage.node,
                    sourceUrl: fixWpUrl(p.featuredImage.node.sourceUrl)
                }
            } : null
        }))
    } catch (error) {
        return []
    }
}

export async function fetchServices(language: 'AR' | 'EN' = 'AR') {
    try {
        const data = await fetchWordPressData(GET_SERVICES_QUERY, { language })
        if (!data?.allServices?.nodes) return []
        return data.allServices.nodes.map((service: any) => ({
            ...service,
            content: sanitizeHTML(service.content || ''),
            serviceFields: {
                ...service.serviceFields,
                description: sanitizeHTML(service.serviceFields?.description || ''),
            },
            featuredImage: service.featuredImage ? {
                node: {
                    ...service.featuredImage.node,
                    sourceUrl: fixWpUrl(service.featuredImage.node.sourceUrl)
                }
            } : null
        }))
    } catch (error) {
        return []
    }
}

export async function fetchProductBySlug(slug: string) {
    try {
        const data = await fetchWordPressData(GET_PRODUCT_BY_SLUG, { id: slug, idType: 'SLUG' })
        if (!data?.product) return null
        return {
            ...data.product,
            content: sanitizeHTML(data.product.content || ''),
            featuredImage: data.product.featuredImage ? {
                node: {
                    ...data.product.featuredImage.node,
                    sourceUrl: fixWpUrl(data.product.featuredImage.node.sourceUrl)
                }
            } : null
        }
    } catch (error) {
        return null
    }
}


export async function fetchClients(language: 'AR' | 'EN' = 'AR') {
    try {
        const data = await fetchWordPressData(GET_CLIENTS_QUERY, { language })
        if (!data?.allClientsPartners?.nodes) return []
        console.log(`✅ Fetched ${data.allClientsPartners.nodes.length} clients from WP`)
        return data.allClientsPartners.nodes.map((c: any) => ({
            ...c,
            featuredImage: c.featuredImage ? {
                node: {
                    ...c.featuredImage.node,
                    sourceUrl: fixWpUrl(c.featuredImage.node.sourceUrl)
                }
            } : null,
            clientFields: c.clientFields ? {
                ...c.clientFields,
                logo: fixWpUrl(c.clientFields.logo)
            } : null
        }))
    } catch (error) {
        return []
    }
}

export interface WordPressClient {
    id: string
    title: string
    featuredImage?: {
        node: {
            sourceUrl: string
            altText?: string
        }
    }
    clientFields?: {
        logo?: string
        companyName?: string
    }
}
