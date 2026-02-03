# دليل التكامل مع WordPress - Al Eman Website

## 📋 نظرة عامة

تم إنشاء نظام تكامل كامل مع WordPress باستخدام GraphQL و Polylang للدعم متعدد اللغات.

---

## 🔧 الإعداد الأولي

### 1. تثبيت المكتبات المطلوبة

```bash
npm install @apollo/client graphql
```

### 2. إعداد متغيرات البيئة

أنشئ ملف `.env.local` وأضف:

```env
NEXT_PUBLIC_WORDPRESS_API_URL=http://localhost/aleman-medical/graphql
```

**ملاحظة:** استبدل الرابط برابط موقع WordPress الخاص بك.

---

## 📁 الملفات المُنشأة

### 1. **lib/wordpress.ts**
ملف الاتصال الرئيسي بـ WordPress GraphQL API.

**الوظائف المتاحة:**
- `fetchServices(language)` - جلب الخدمات
- `fetchClients(language)` - جلب شركاء النجاح
- `fetchPosts(language)` - جلب المقالات

**الاستعلامات (Queries):**
- `GET_SERVICES` - استعلام الخدمات
- `GET_CLIENTS` - استعلام العملاء
- `GET_POSTS` - استعلام المقالات

### 2. **المكونات المتكاملة مع WordPress:**

#### `components/sections/ServicesWordPress.tsx`
- ✅ يعرض الخدمات من WordPress
- ✅ دعم الصور من WordPress
- ✅ دعم الأيقونات المخصصة
- ✅ Fallback للبيانات الثابتة

#### `components/sections/ClientsWordPress.tsx`
- ✅ يعرض شعارات العملاء من WordPress
- ✅ دعم الصور
- ✅ Marquee animation
- ✅ Fallback للبيانات الثابتة

#### `components/sections/BlogInsightsWordPress.tsx`
- ✅ يعرض آخر 3 مقالات من WordPress
- ✅ دعم الصور المميزة
- ✅ عرض التاريخ والفئات
- ✅ Fallback للبيانات الثابتة

### 3. **app/[lang]/page-wordpress.tsx**
صفحة رئيسية متكاملة مع WordPress.

---

## 🔍 GraphQL Schema المُستخدم

### استعلام الخدمات (Services)

```graphql
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
```

### استعلام العملاء (Clients)

```graphql
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
```

### استعلام المقالات (Posts)

```graphql
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
```

---

## 🌍 دعم Polylang (متعدد اللغات)

### تحويل اللغة

```typescript
const wpLanguage = lang.toUpperCase() // 'ar' -> 'AR', 'en' -> 'EN'
```

### استخدام المتغير في الاستعلام

```typescript
const services = await fetchServices('AR') // للعربية
const services = await fetchServices('EN') // للإنجليزية
```

---

## 🔄 Revalidation (إعادة التحقق)

تم تعيين `revalidate: 60` لجميع الاستعلامات:

```typescript
context: {
    fetchOptions: {
        next: { revalidate: 60 }, // إعادة التحقق كل 60 ثانية
    },
}
```

**الفائدة:**
- المحتوى يتحدث تلقائياً كل دقيقة
- تحسين الأداء مع ISR (Incremental Static Regeneration)

---

## 🖼️ معالجة الصور

### استخدام next/image

```tsx
<Image
    src={service.featuredImage?.node?.sourceUrl}
    alt={service.featuredImage?.node?.altText || service.title}
    fill
    className="object-cover"
/>
```

### إعداد next.config.js

أضف نطاق WordPress للصور:

```javascript
module.exports = {
    images: {
        domains: ['localhost', 'yourdomain.com'],
    },
}
```

---

## 🎯 كيفية الاستخدام

### الطريقة 1: استبدال الصفحة الحالية

```bash
# احذف الصفحة القديمة
rm app/[lang]/page.tsx

# أعد تسمية الصفحة الجديدة
mv app/[lang]/page-wordpress.tsx app/[lang]/page.tsx
```

### الطريقة 2: الاختبار جنباً إلى جنب

احتفظ بكلا الصفحتين:
- `/ar` - الصفحة الثابتة
- `/ar/wordpress` - الصفحة المتصلة بـ WordPress

---

## 🔧 إعداد WordPress

### المتطلبات:

1. **WPGraphQL Plugin**
   ```
   https://wordpress.org/plugins/wp-graphql/
   ```

2. **Polylang Plugin**
   ```
   https://wordpress.org/plugins/polylang/
   ```

3. **WPGraphQL for Polylang**
   ```
   https://github.com/valu-digital/wp-graphql-polylang
   ```

4. **Custom Post Types**
   - Services (`service`)
   - Clients/Partners (`client_partner`)

### Custom Fields (ACF):

#### للخدمات (Services):
- `description` - نص
- `icon` - اختيار (microscope, beaker, flask, clipboard, settings)

#### للعملاء (Clients):
- `logo` - نص
- `companyName` - نص

---

## 🧪 الاختبار

### 1. اختبار الاتصال

```bash
curl -X POST http://localhost/aleman-medical/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{ posts { nodes { title } } }"}'
```

### 2. اختبار في المتصفح

افتح GraphiQL:
```
http://localhost/aleman-medical/graphql
```

### 3. اختبار الصفحة

```bash
npm run dev
```

افتح: `http://localhost:3000/ar`

---

## 🐛 استكشاف الأخطاء

### خطأ: "Failed to fetch"

**الحل:**
- تحقق من رابط WordPress API في `.env.local`
- تأكد من تشغيل WordPress
- تحقق من تثبيت WPGraphQL

### خطأ: "allServices is not defined"

**الحل:**
- تأكد من تسجيل Custom Post Type في GraphQL
- تحقق من إعدادات WPGraphQL

### الصور لا تظهر

**الحل:**
- أضف نطاق WordPress في `next.config.js`
- تحقق من رابط الصورة في WordPress

---

## 📊 الأداء

### التحسينات المُطبقة:

1. ✅ **ISR (Incremental Static Regeneration)**
   - Revalidate كل 60 ثانية

2. ✅ **Image Optimization**
   - استخدام next/image

3. ✅ **Parallel Fetching**
   - جلب البيانات بالتوازي باستخدام `Promise.all`

4. ✅ **Fallback Data**
   - عرض بيانات ثابتة في حالة فشل الاتصال

---

## 🚀 الخطوات التالية

### 1. إنشاء صفحات ديناميكية:

```typescript
// app/[lang]/services/[slug]/page.tsx
export async function generateStaticParams() {
    const services = await fetchServices('AR')
    return services.map(service => ({ slug: service.slug }))
}
```

### 2. إضافة البحث:

```graphql
query SearchPosts($search: String!) {
    posts(where: { search: $search }) {
        nodes { ... }
    }
}
```

### 3. إضافة Pagination:

```graphql
query GetPosts($after: String) {
    posts(first: 10, after: $after) {
        pageInfo {
            hasNextPage
            endCursor
        }
        nodes { ... }
    }
}
```

---

## ✅ Checklist

قبل النشر، تأكد من:

- [ ] تحديث `NEXT_PUBLIC_WORDPRESS_API_URL` في `.env.local`
- [ ] إضافة نطاق WordPress في `next.config.js`
- [ ] اختبار جميع الاستعلامات
- [ ] التحقق من الصور
- [ ] اختبار كلا اللغتين (AR/EN)
- [ ] اختبار Fallback data
- [ ] مراجعة الأداء

---

## 📞 الدعم

للمساعدة أو الأسئلة:
- راجع [WPGraphQL Documentation](https://www.wpgraphql.com/docs/introduction)
- راجع [Next.js Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)

---

**تم إنشاء هذا الدليل في:** 2026-02-01
**الإصدار:** 1.0.0
