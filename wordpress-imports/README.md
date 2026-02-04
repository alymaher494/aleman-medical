# دليل استيراد ملفات WordPress

## الملفات الموجودة:

### 1. `services-en.xml`
يحتوي على 8 خدمات باللغة الإنجليزية:
1. Microbiology Products (منتجات الأحياء الدقيقة)
2. Chemicals and Reagents (المواد الكيميائية والكواشف)
3. Laboratory Media (الميديا المخبرية)
4. Reference Strains (السلالات المرجعية)
5. Laboratory Equipment (الأجهزة والمعدات المخبرية)
6. Glassware and Plasticware (الزجاجيات والبلاستيكيات)
7. Laboratory Consumables (المستلزمات المخبرية الاستهلاكية)
8. Complete Laboratory Setup (تجهيز المختبرات الكاملة)

### 2. `posts-en.xml`
يحتوي على 3 مقالات باللغة الإنجليزية:
1. Complete Guide to Safe Handling of Microbial Reference Strains
2. Latest Engineering Standards in Modern Medical Laboratory Setup  
3. The Critical Importance of High-Quality Reagents in Laboratory Testing

---

## خطوات الاستيراد:

### الخطوة 1: تثبيت أداة الاستيراد
1. اذهب إلى **Tools > Import** في لوحة تحكم WordPress
2. اختر **WordPress** من القائمة
3. اضغط **Install Now** ثم **Run Importer**

### الخطوة 2: استيراد الخدمات
1. اختر ملف `services-en.xml`
2. اضغط **Upload file and import**
3. اختر المستخدم (admin) لتعيين المحتوى له
4. لا تحدد خيار "Download attachments" (الصور ستضاف لاحقاً)
5. اضغط **Submit**

### الخطوة 3: استيراد المقالات
1. كرر نفس الخطوات مع ملف `posts-en.xml`

### الخطوة 4: ربط الترجمات في Polylang
**مهم جداً:** بعد الاستيراد، يجب ربط كل خدمة/مقال إنجليزي بنظيره العربي:

1. اذهب إلى **Services** في القائمة الجانبية
2. افتح الخدمة الإنجليزية للتعديل
3. في الشريط الجانبي، ابحث عن قسم **Languages**
4. اختر اللغة **English**
5. في خانة "Translation of", اختر الخدمة العربية المقابلة
6. احفظ التغييرات

كرر هذه الخطوات لكل خدمة ومقال.

### الخطوة 5: إضافة الصور البارزة (Featured Images)
لكل خدمة ومقال:
1. افتح العنصر للتعديل
2. في الشريط الجانبي، اختر **Featured Image**
3. ارفع الصورة المناسبة
4. احفظ

---

## ملاحظات مهمة:

- تأكد من أن إضافة Polylang مفعلة
- تأكد من أن Custom Post Type للـ Services موجود
- بعد الاستيراد، راجع slugs (الروابط) وتأكد من مطابقتها للكود
- إذا ظهرت مشاكل في الاستيراد، تأكد من أن الملف محفوظ بترميز UTF-8

---

## الخطوة التالية بعد الاستيراد:
بعد إكمال الربط في Polylang، سيظهر المحتوى الإنجليزي تلقائياً على الموقع عند التبديل للنسخة الإنجليزية.
