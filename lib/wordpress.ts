// WordPress GraphQL endpoint - MUST be defined in .env.local
const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL

if (!WORDPRESS_API_URL) {
    console.warn('⚠️ NEXT_PUBLIC_WORDPRESS_API_URL is not defined. Using fallback static data.')
}

// GraphQL Queries as plain strings (no gql tag needed)
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

const GET_CLIENTS_QUERY = `
    query GetClients($language: LanguageCodeFilterEnum) {
        allClientsPartners(where: { language: $language }, first: 20) {
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

// Sanitize HTML content from WordPress
export function sanitizeHTML(html: string): string {
    if (!html) return ''

    // Remove script tags and dangerous attributes
    return html
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/on\w+="[^"]*"/g, '')
        .replace(/on\w+='[^']*'/g, '')
        .trim()
}

// Fetch data from WordPress using fetch API with ISR
async function fetchWordPressData(query: string, variables = {}) {
    if (!WORDPRESS_API_URL) {
        console.warn('WordPress API URL not configured. Returning null.')
        return null
    }

    try {
        const response = await fetch(WORDPRESS_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query,
                variables,
            }),
            // ISR: Revalidate every 60 seconds
            next: { revalidate: 60 },
        })

        if (!response.ok) {
            console.error(`WordPress API Error: ${response.status} ${response.statusText}`)
            return null
        }

        const json = await response.json()

        if (json.errors) {
            console.error('GraphQL Errors:', json.errors)
            return null
        }

        return json.data
    } catch (error) {
        console.error('Error fetching WordPress data:', error)
        return null
    }
}

// Fetch posts from WordPress
export async function fetchPosts(language: 'AR' | 'EN' = 'AR') {
    try {
        const data = await fetchWordPressData(GET_POSTS_QUERY, { language })

        if (!data?.posts?.nodes) {
            console.log('No posts found from WordPress. Using fallback data.')
            return []
        }

        // Sanitize excerpt
        return data.posts.nodes.map((post: any) => ({
            ...post,
            excerpt: sanitizeHTML(post.excerpt || ''),
        }))
    } catch (error) {
        console.error('Error fetching posts:', error)
        return []
    }
}

// Fetch services from WordPress
export async function fetchServices(language: 'AR' | 'EN' = 'AR') {
    try {
        const data = await fetchWordPressData(GET_SERVICES_QUERY, { language })

        if (!data?.allServices?.nodes) {
            console.log('No services found from WordPress. Using fallback data.')
            return []
        }

        // Sanitize content
        return data.allServices.nodes.map((service: any) => ({
            ...service,
            content: sanitizeHTML(service.content || ''),
            serviceFields: {
                ...service.serviceFields,
                description: sanitizeHTML(service.serviceFields?.description || ''),
            },
        }))
    } catch (error) {
        console.error('Error fetching services:', error)
        return []
    }
}

// Fetch clients from WordPress
export async function fetchClients(language: 'AR' | 'EN' = 'AR') {
    try {
        const data = await fetchWordPressData(GET_CLIENTS_QUERY, { language })

        if (!data?.allClientsPartners?.nodes) {
            console.log('No clients found from WordPress. Using fallback data.')
            return []
        }

        console.log(`✅ Fetched ${data.allClientsPartners.nodes.length} clients from WordPress`)

        return data.allClientsPartners.nodes
    } catch (error) {
        console.error('Error fetching clients:', error)
        return []
    }
}

// Type definitions for better TypeScript support
export interface WordPressPost {
    id: string
    title: string
    excerpt: string
    slug: string
    date: string
    featuredImage?: {
        node: {
            sourceUrl: string
            altText?: string
        }
    }
    categories?: {
        nodes: Array<{
            name: string
        }>
    }
}

export interface WordPressService {
    id: string
    title: string
    content: string
    slug: string
    featuredImage?: {
        node: {
            sourceUrl: string
            altText?: string
        }
    }
    serviceFields?: {
        description: string
        icon: string
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
        logo: string
        companyName: string
    }
}
