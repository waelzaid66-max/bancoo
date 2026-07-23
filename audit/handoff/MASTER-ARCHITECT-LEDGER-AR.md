# BANCO — دفتر المهندس المسؤول (Master Architect Ledger)

**Owner directive (binding):** أنا المهندس الأول والأخير لهذا المشروع وهذا الحساب.  
**قواعد ذهبية:** ممنوع كسر أي شيء شغال · تحسين/إضافة بفهم فقط · Android + iOS دقة عالية · أيقونات SVG · خرائط موزعة حسب القسم · فيديو قابل للتوسع · لا تلمس شاشة قبل فهمها.

**تاريخ الدفتر:** 2026-07-23  
**مصدر البحث:** Pre-Exec Gate كامل + فحوص حية `banco.today` + مقارنة CA `210a325` ↔ bancoo `321af02` + Coolify C0 PR #4

---

## 1) حقيقة المنصات (لا تخمين)

| سطح | الحالة الآن |
|-----|-------------|
| إنتاج حي | `https://banco.today` (+ `banco.deals`) على **GCP/Google Frontend** — DB ok — **بدون `gitSha`** |
| مسارات حية | `/dealer-os/` · `/admin-os/` (ليست `/market/` بعد) |
| Coolify Hostinger | هدف هجرة — ملفات في PR #4 (C0 Harden) — **لم يُقطع DNS بعد** |
| Replit | يبقى كاملًا بالتوازي حتى cutover صريح |
| `bancoom.com` | لا DNS |
| Replit القديم `banco-ca-oom.replit.app` | not live |
| `www.banco.today` | Hostinger Horizons — منتج مختلف عن الـAPI |
| `banco.autos` | 503 |
| موبايل | Expo 54 · EAS · scheme `bancooom` · associatedDomains: today/deals/autos |
| Bundle | bancoo: `com.bancoboom.app` · CA: `com.bancooom.app` — **قرار مالك مفتوح** |

---

## 2) شكاوى المالك ↔ حالة التحقق (من الشات كاملًا)

| شكوى / توجيه | الفهم | الحالة |
|---------------|--------|--------|
| لا تنفيذ قبل فهم أعمق من المالك | Pre-Exec Gate | **تم البحث** · التنفيذ بموجات فقط |
| Coolify وليس تخريب Replit | PR #4 C0 · Replit يبقى | **جزئي** (ملفات جاهزة · لا cutover) |
| لا اختراع Facebook SSO | أيقونات روابط فقط · لا OAuth | **محمي بالسياسة** |
| ADS-FIRST · بنوك ليست سوق بديل | قفل `ADS-FIRST-LOCK-AR.md` | **محمي** |
| ضغط بلد+عملة Stay/Cars | `MarketCountryButton` | **FIXED — لا تلمس** |
| RE/Materials ما زالت منتشرة | `re-market-matrix` / `materials-market-matrix` | **OPEN لاحقًا فقط** |
| أيقونات SVG أندرويد (لا خطوط) | Lucide registry + pin `15.0.3` + `icons.test.mjs` | **FIXED — لا تلمس** |
| خرائط لكل قسم بتناسب | نواة مشتركة + توزيع أدناه | **موجود** · فجوات locate/مركز سوق |
| فيديو/كاميرا أعلى دقة وقابل للتوسع | gallery + upload موجودة · poster ناقص في bancoo | **جزئي** |
| استيراد سيارات دورة كاملة | أصل imported + CTA موجود · تتبع شحن وهمي · CSV بلا origin_type | **جزئي** |
| ميني-آبات لا تُذاب في بحث واحد | `section-miniapp-guard` + Discover ENTER | **FIXED — لا تلمس** |
| Demote FI/company | CA فقط | **ناقص في bancoo** |
| Profile touch-dead / accountType | CA أصلَح | **ناقص في bancoo** |
| Banks Join أبدي لـ FI | CA: awaiting-admin-link | **ناقص في bancoo** |
| مسافات ديناميكية Android/iOS | ضغط Stay/Cars موجود · لا تلمس الشغّال | **حماية أولًا** |
| لا مسح / لا كسر | قاعدة تشغيل دائمة | **ملزم** |

---

## 3) ممنوع المساس (DO-NOT-TOUCH)

1. `MarketCountryButton` على **Stay / Cars / Facilities**  
2. `components/icons.tsx` سياسة SVG + اختبارات الأيقونات + pin `@expo/vector-icons@15.0.3`  
3. Discover → `SECTION_ROUTE` (ممنوع melt الأقسام في تاب Search)  
4. أقفال التصنيف في `SectionSearchApp` / `BookingStaysApp` / `FilterSheet.lockCategory`  
5. Stay كصدفة منفصلة (`BookingStaysApp`) — لا توحيد قسري مع `SectionSearchApp`  
6. `tests/section-miniapp-guard.test.mjs`  
7. هوية الألوان الحمراء للأقسام (Banks أزرق فقط استثناء)  
8. تغذية البطاقات: thumbnail = صورة أو poster — **أبدًا ليس URL فيديو خام**  
9. ADS-FIRST + لا دليل بنوك منافس + لا Facebook SSO invent  
10. ملفات Replit / `.replit` / مسارات تطوير Replit حتى أمر cutover  
11. Dump `release/banco_dev_dump_*.sql.gz` — quarantine · لا استيراد إنتاج أعمى  
12. أي شاشة قال المالك إنها «اتظبطت» حتى يوجد Evidence Card + اختبار حارس  

---

## 4) معمارية الميني-آبات (كل قسم)

```
Discover (بوابة فقط)
  ├─ Stay     → BookingStaysApp     [خريطة + بلد مضغوط]
  ├─ Cars     → SectionSearchApp(car) [خريطة + بلد مضغوط + محركات incl. import]
  ├─ RE       → SectionSearchApp(real_estate) [خريطة + matrix منتشر + Explore من Discover]
  ├─ Materials→ SectionSearchApp(materials) [خريطة + matrix منتشر]
  └─ Facilities→ SectionSearchApp(facilities) [خريطة + بلد مضغوط]

نواة مشتركة: useSearchMiniApp · criteria · FilterSheet · SearchResultsMap · mapHtml (Leaflet/OSM)
Business hubs (banks/supply/…) خارج مسارات الأقسام الخمسة
```

### توزيع أدوات الخريطة (ما يجب أن يبقى متناسبًا)

| قسم | خريطة نتائج | Explore card | بلد/عملة | ملاحظة |
|-----|-------------|--------------|----------|--------|
| Discover | لا (بوابة) | نعم → RE `?map=1` | — | لا تُحوَّل Discover لخريطة تمويل |
| Stay | نعم | — | مضغوط | لا تلمس |
| Cars | نعم | لا مخصص | مضغوط | محرك import منفصل عن الخريطة |
| RE | نعم | من Discover | منتشر | مرشّح ضغط لاحقًا فقط |
| Materials | نعم | لا | منتشر | مرشّح ضغط لاحقًا فقط |
| Facilities | نعم | لا | مضغوط | لا تلمس نمط البلد |

**فجوة خريطة مشتركة (CA ahead):** زر locate-me + مركز الخريطة حسب `marketCountry` — تُضاف للنواة المشتركة دون لمس chrome الأقسام المضغوطة.

---

## 5) Android + iOS — عقد الدقة

| محور | العقد |
|------|--------|
| أيقونات | SVG عبر registry فقط — أي glyph جديد يُسجَّل قبل الاستخدام |
| مسافات | لا «إعادة تصميم» لشاشات ثابتة · ضغط ديناميكي = موجات منفصلة بEvidence |
| Safe area / RTL | احترام `useSafeAreaInsets` + `isRTL` الموجود |
| أذونات | كاميرا للصور · لا تسجيل فيديو داخل التطبيق حاليًا (`microphonePermission: false`) — تغيير المنتج يحتاج قرار مالك |
| Universal links | `banco.today` / `.deals` / `.autos` — لا تغيّر hosts بلا قرار |
| Bundle ID | قرار مالك قبل أي store submit |
| `EXPO_PUBLIC_ROUTER_ORIGIN` | الافتراضي `replit.com` تلوث منتج — يُضبط عند EAS production فقط |

---

## 6) فيديو / كاميرا / عرض (قابل للتوسع)

| طبقة | موجود | ناقص (bancoo) |
|------|--------|----------------|
| سياسة وسائط | 15 صورة / 2 فيديو / 20ث / 50MB | — |
| رفع+verify | `lib/upload.ts` | 503 أوضح في CA |
| Poster على create/edit | — | **CA VIDEO-POSTER** |
| MediaGallery poster خامل | — | CA |
| ListingMediaEditor كاميرا | مكتبة فقط | كاميرا صور مثل create |
| Fullscreen controls | حلقة expo-video | seek/controls قرار منتج |
| Dealer-OS فيديو | صور غالبًا | محاذاة لاحقة |
| Search thumbnail | helper موجود | SearchService bancoo لا يستدعيه دائمًا |

**قاعدة:** أي توسع كاميرات/فيديو = طبقات فوق العقد الحالي · لا إعادة كتابة gallery من صفر.

---

## 7) دورة استيراد السيارات

| جزء | حالة |
|-----|------|
| فلتر/محرك `origin_type=imported` | موجود |
| إنشاء إعلان local/imported | موجود |
| شارات في الفيد | موجودة |
| شاشة `import-tracking` | UI تعليمي — **بلا backend حالة شحن** |
| Dealer CSV bulk | يستورد حقول أساسية — **لا يكتب origin_type صراحة** · بلا وسائط |
| موبايل bulk | غير موجود |

**تكملة صحيحة:** (1) ربط CSV → `origin_type` · (2) قرار: هل tracking حقيقي أم يبقى دليل · (3) لا تخلط «استيراد» بخرائط أو تمويل.

---

## 8) فجوات CA → هدف النشر (P0 قبل الإنتاج من bancoo وحده)

| أولوية | ملف / موضوع |
|--------|-------------|
| P0 | `DEMOTE_BLOCKED` + profile demote + accountTypeChosen بعد `/me` |
| P0 | Profile menu backdrop (Pressable شقيق) |
| P0 | banks `showAwaitingAdminLink` |
| P0 | Poster claim/promote + upload/update 503 |
| P0 | SearchService → `pickListingThumbnailUrl` |
| P0 | index `/me` role-first + backdrop |
| P1 | map locate + marketCountry center |
| P1 | VIDEO-POSTER mobile + MediaGallery |
| P1 | admin-os FI link integrity (لا overwrite owner) |
| P2 | ضغط RE/Materials فقط |
| P2 | تكملة import CSV/tracking بقرار مالك |
| قرار | Bundle ID |

---

## 9) موجات التنفيذ (ملزمة الترتيب)

| موجة | المحتوى | شرط البدء |
|------|---------|-----------|
| **C0** | Coolify harden: مسارات مزدوجة · `/l/` · S3 keys · GIT_SHA · docs بلا gcs | **PR #4 مفتوح** — لا يلمس الحي |
| **C1** | Staging Coolify حي + لصق `/api/readyz` بـ gitSha | موافقة مالك + أسرار |
| **C2** | Backport جراحي CA P0 (demote/media/account/banks) Evidence Cards | بعد فهم كل ملف · اختبار حارس |
| **C3** | Bundle ID + EAS env (`DOMAIN` · `ROUTER_ORIGIN`) | قرار مالك |
| **C4** | نواة خريطة: locate + market center (بدون لمس Stay/Cars chrome) | C2 مستقر |
| **C5** | VIDEO-POSTER + gallery poster + اختياري كاميرا على Editor | C2 media |
| **C6** | ضغط RE/Materials فقط | بعد C4/C5 |
| **C7** | تكملة استيراد سيارات (CSV origin + قرار tracking) | موافقة منتج |
| **C8** | DNS cutover Coolify ← GCP مع إبقاء Replit ملفات | إثبات C1+C2 |

**ممنوع:** موجة واحدة تلمس كل شيء · حذف اختبارات لتمرير CI · reset شجري CA↔bancoo.

---

## 10) مستودعات الحقائق

| Repo | Tip | دور |
|------|-----|-----|
| `bancoo` | `321af02` orphan + PR #4 Coolify | هدف نشر Hostinger |
| `-BANCO-CA-OOM-` | `210a325` | خط هندسة أقوى · مصدر Evidence |
| B-OOM / aws-virgen / b.deals | أقدم | لا كنز فريد فوق CA |

---

## 11) تعريف نجاح القسم (Definition of Done)

لكل ميني-آب قبل إغلاق موجة تلمسه:

1. حارس `section-miniapp-guard` أخضر  
2. أيقونات: لا tofu على Android emulator/device  
3. خريطة: pins + overlay + فلتر قسم مقفول  
4. إنشاء/تعديل: وسائط لا تكسر البطاقة (poster إن وُجد فيديو)  
5. لا انحدار على Stay/Cars المضغوطة (لقطات/اختبار)  
6. RTL + مسافات آمنة على iPhone وAndroid  

---

## 12) التزام المهندس المسؤول

- أعمل بـ Evidence Cards · لا افتراض  
- أضيف طبقات فوق الصحيح · لا أهدم  
- أي شكوى مالك جديدة تُسجَّل هنا قبل التنفيذ  
- الحساب مخصص لهذا المشروع · نجاح كل قسم واجب  

*آخر تحديث: بعد C0 Harden PR #4 و اكتمال فحوص الخرائط/الأيقونات/الفيديو/الاستيراد.*
