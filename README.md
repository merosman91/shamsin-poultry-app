shamsin-poultry-app/
├── components/                  # المكونات القابلة لإعادة الاستخدام
│   ├── ui/                      # مكونات الواجهة الأساسية (زر، حقل إدخال، إلخ)
│   │   ├── button.js
│   │   ├── input.js
│   │   └── modal.js
│   ├── layout.js                # التصميم الرئيسي للصفحة
│   ├── batch-card.js            # بطاقة عرض الدفعة
│   ├── daily-log-form.js        # نموذج التسجيل اليومي
│   ├── finance-form.js          # نموذج الإضافة المالية
│   ├── inventory-table.js       # جدول المخزون
│   └── report-generator.js      # مولد تقارير PDF
│
├── lib/                         # المنطق والمكتبات المساعدة
│   ├── db.js                    # إعداد قاعدة بيانات Dexie (IndexedDB)
│   └── utils.js                 # دوال مساعدة (تنسيق العملة، التاريخ)
│
├── pages/                       # صفحات التطبيق (Next.js Routing)
│   ├── _app.js                  # إعدادات التطبيق العامة
│   ├── _document.js             # إعدادات HTML
│   ├── index.js                 # الصفحة الرئيسية (لوحة التحكم)
│   ├── batches/
│   │   ├── index.js             # صفحة عرض جميع الدفعات
│   │   └── [id].js              # صفحة تفاصيل دفعة معينة
│   ├── finance.js               # صفحة الإدارة المالية
│   ├── inventory.js             # صفحة إدارة المخزون
│   └── reports.js               # صفحة التقارير
│
├── public/                      # الملفات الثابتة
│   ├── icons/                   # أيقونات PWA
│   │   ├── icon-192x192.png
│   │   └── icon-512x512.png
│   ├── NotoSansArabic-Regular.ttf # خط عربي لتقارير PDF
│   └── manifest.json            # ملف PWA Manifest
│
├── styles/                      # ملفات التصميم
│   └── globals.css              # تصميم Tailwind CSS العام
│
├── .env.local                   # متغيرات البيئة (اختياري)
├── .gitignore
├── package.json
├── next.config.js               # إعدادات Next.js و PWA
└── README.md                    # شرح المشروع
