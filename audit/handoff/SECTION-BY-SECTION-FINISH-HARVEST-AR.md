# دفتر فينش قسم × قسم — حصاد كامل (بدون إعادة بناء)

**تاريخ:** 2026-07-23  
**قاعدة:** FINISH / ASSEMBLE فقط · `FINISH-NOT-REBUILD-LOCK-AR.md`  
**إثبات حي هذه الجولة:** `section-miniapp-guard` **46/46 PASS** · Stay = أسود `StaysHomeHeader` · لا `web?67` تحت `banco-mobile` · Bundle حي `com.bancoboom.app` · scheme `bancooom` · `DEMOTE_BLOCKED` **غائب** من bancoo artifacts

---

## 0) كيف تقرأ هذا الدفتر

| عمود | معنى |
|------|------|
| MUST-KEEP | لا يُمس إلا بأمر مالك مكتوب |
| DONE (حي) | مثبت بالكود/الحارس الآن — ليس بجدول قديم |
| OPEN فينش | Additive فقط |
| DO-NOT-TOUCH | إعادة بناء / melt / اختراع = مرفوض |
| وثائق متقادمة | لا تستخدمها كـ SoT ضد الكود الحي |

---

## 1) Discover (L-PORTAL)

| | |
|--|--|
| **الملفات** | `SearchDiscover.tsx` · host `search.tsx` |
| **MUST-KEEP** | شبكة كروت صور 2×2 · `SECTION_ROUTE` · `router.push` · بوابة Stay عرض كامل · `?engine=import` لسيارات · map→RE `?map=1` · rose هوية عقار على بوابة Stay (أزرق = Banks فقط) |
| **DONE حي** | لا `onBrowseSection` · حارس يمنع melt · ENTER مرفوض |
| **OPEN فينش** | شوتات Replit بوابات الخمس + إثبات بلا CategoryTabs فوق Discover (OPEN-01/G1) |
| **DO-NOT-TOUCH** | redesign كروت · صفوف ENTER · حقن criteria في Search |
| **متقادم** | أي نص يقول Discover مكسور بـENTER بعد الاسترجاع `6b18408` |

---

## 2) Cars — `/section/car`

| | |
|--|--|
| **Shell** | `app/section/car.tsx` → `SectionSearchApp category="car"` |
| **MUST-KEEP** | قفل `car` · engines سيارات · شرائط ماركة/أصل · deep-link `?engine=import` · `iconBtn` pad 12 · `hScroll.flexGrow:0` · `topPad` insets حقيقية |
| **DONE حي** | hard-lock + strips + import route intent في `SectionSearchApp` · حارس |
| **OPEN فينش** | شوتات قبول brand/origin/import · لاحقًا C7 استيراد سيارات (تكملة لا rebuild) |
| **DO-NOT-TOUCH** | فك القفل · توحيد chrome مع Stay |

---

## 3) Real Estate — `/section/real-estate`

| | |
|--|--|
| **Shell** | `app/section/real-estate.tsx` |
| **MUST-KEEP** | قفل `real_estate` · rentalTerm · مصفوفة سوق تحت الأنواع · map latch `?map=1` (MOB-07) · pill مضغوط |
| **DONE حي** | أقفال + map intent + market matrix في SectionSearchApp · حارس |
| **OPEN فينش** | شوتات عرض≠أنواع / تمليك+شقة / إيجار→أنظمة · C6 ضغط chrome لاحقًا **فقط** (لا يُخلط مع Stay) |
| **DO-NOT-TOUCH** | حقن فئة من الخريطة إلى Search tab · Google Maps كبديل قسري لـLeaflet |

---

## 4) Factories — `/section/factories` (`facilities`)

| | |
|--|--|
| **Shell** | `app/section/factories.tsx` |
| **MUST-KEEP** | قفل `facilities` · industrial chips مرافق · فصل عن materials |
| **DONE حي** | قفل + industrial baseline · intentional **لا** مصفوفة سوق مثل RE |
| **OPEN فينش / منسي** | **Factories industry strip** بنفس روح المواد — مؤجّل خارج موجة RE/Car (`PASTE-REPLIT-RECORD…` §5) — Additive عند أمر مالك |
| **DO-NOT-TOUCH** | ذوبان مع materials · invent شريط سوق كامل بلا أمر |

---

## 5) Materials — `/section/materials`

| | |
|--|--|
| **Shell** | `app/section/materials.tsx` |
| **MUST-KEEP** | قفل `materials` · خامة + أصل + مصفوفة سوق · `FilterSheet.showMaterial` · لا تسريب أصل للمصانع |
| **DONE حي** | `showMaterialChrome` + `showMaterialsMarketMatrix` · حارس wires |
| **OPEN فينش** | شوتات FilterSheet خامة · C6 ضغط لاحق |
| **DO-NOT-TOUCH** | قتل showMaterial مرة أخرى |

---

## 6) Stay / Booking — `/section/booking`

| | |
|--|--|
| **Shell** | `BookingStaysApp` + **`StaysHomeHeader` أسود (`VOID #000`)** |
| **MUST-KEEP (SoT حي)** | هيدر أسود Owner-approved · قفل `real_estate`+`rent` · StayCard · لا فنادق · `flexGrow:0` · لا fake 67 |
| **DONE حي** | حارس: «owner-approved black Stay header» · ملف يقول صراحة premium black · `topPad` insets (لا 67 في الحي) |
| **تعارض وثائقي** | دوك تموز-19 (OWNER-COMPLAINT / SURGICAL I6 / FULL-PICTURE) تقول وردي MUST-KEEP — **مرفوضة ضد الكود + Claude inventory @47cc4e5 + أمر المالك** |
| **OPEN فينش** | شوتات Stay · OPEN-12 host hub إيجار يومي (منتج منفصل · Start) · رصد بصري فقط لأي crush |
| **DO-NOT-TOUCH** | إعادة rose من دوك قديم · دمج Stay في `SectionSearchApp` · توحيد هيدر مع الأقسام |

---

## 7) Banks & Financiers — `/business/banks` (خارج SECTION)

| | |
|--|--|
| **MUST-KEEP** | عالم تمويل منفصل · أزرق هنا فقط · honesty brochure · `intent=fi` · ADS-FIRST · لا directory حي بلا Start |
| **DONE حي** | topPad insets · honesty keys في i18n · حارس: لا live intermediary API · FI verify لا يفتح dealer storefront · inbox خطأ غير 403 |
| **OPEN فينش / منسي** | OPEN-08 Join تحت الأعضاء · OPEN-09 اختصار inbox من Profile · F-ORD Verify→link يدوي · OPEN-14 اختبارات inbox · شكل PRODUCTS كتالوج · باقة/نقل آمن (Start) |
| **DO-NOT-TOUCH** | شركاء وهميين · auto-create FI · melt لـSearch · Facebook SSO بلا أمر |

---

## 8) Home — `(tabs)/index.tsx` = `FeedScreen`

| | |
|--|--|
| **MUST-KEEP** | فيد + rails + CategoryTabs + جرس إشعارات + BancoLogo — **ليست Discover** |
| **DONE حي** | بنية قوية · geo صادق · badge OS |
| **OPEN فينش** | flicker/rails أداء · badge · geo honesty polish |
| **DO-NOT-TOUCH** | تحويل Home لبوابة أقسام · شريط بحث يذيب الأقسام |

---

## 9) Search host — `(tabs)/search.tsx`

| | |
|--|--|
| **MUST-KEEP** | Discover بلا كروم فئات (MOB-05) · نتائج بعد بحث نشط · instance منفصل عن ميني-آب |
| **DONE حي** | W1 melt مغلق · حارس |
| **OPEN** | شوت إثبات بلا CategoryTabs على Discover |
| **DO-NOT-TOUCH** | إعادة `onBrowseSection` / `browseSection` |

---

## 10) Profile

| | |
|--|--|
| **MUST-KEEP** | MOB-01 هاتف · MOB-04 RTL · منيو ⋮ جنب تعديل (لا فوق الغلاف) · `accountTypeChosen` بعد اختيار نوع · `intent=fi` لا demote لتاجر |
| **DONE حي** | flags في profile · verification يحمي FI |
| **OPEN** | اختصارات FI inbox · prefs إشعار |
| **DO-NOT-TOUCH** | إرجاع منيو فوق الغلاف |

---

## 11) Notifications

| | |
|--|--|
| **MUST-KEEP** | `createNotification` chokepoint · prefs mute · Expo push F&F · `notificationRouting` موحّد |
| **DONE حي** | أنواع كاملة في API · رسالة تحمل `listing_id` في ConversationService · routing يدعم listing/booking/billing/FI |
| **OPEN فينش مثبت بالكود** | `iconForType` يغطي فقط: message/lead/new_match/price_drop/rfq/comment/review/booking — **ناقص:** investment · global_supply · payment_* · subscription_expiring · system | prefs UI لأنواع billing/booking إن ناقصة | EAS جهاز حقيقي |
| **DO-NOT-TOUCH** | نظام موازٍ · حذف chokepoint |

---

## 12) Messages / Listings / Maps / Ads / Auth

| سطح | MUST-KEEP | DONE حي | OPEN فينش | DO-NOT-TOUCH |
|-----|-----------|---------|-----------|--------------|
| Messages | محادثة+عرض سعر | موجود | ضمان سياق listing عند الفتح | rebuild شات |
| Create/Listings | Tiny floor · media حقيقي · ADS-FIRST | دورة إنشاء غنية | C2 DEALER-EDIT-MEDIA · C5 VIDEO-POSTER بلا frame-extract invent | rebuild مسار إنشاء |
| Maps | MOB-07 RE · Leaflet | latch+pill | C4 locate إضافة نواة | Google قسري · category inject |
| Ads | إعلان أولًا | قفل موثّق | لا directory بنوك ينافس الفيد بلا Start | بوابة تمويل من Discover |
| Auth | Clerk · 4 أدوار | getOrCreateUser · intent=fi | **`DEMOTE_BLOCKED` غائب في bancoo** → Evidence C2 من CA · FB SSO بأمر فقط | FI auto-create |

---

## 13) Deploy / هوية / Ops — تحديثات منسية حرجة

| بند | الحي الآن | ماذا نفعل |
|-----|-----------|-----------|
| Bundle ID | `com.bancoboom.app` | قرار مالك قبل Store — docs ذكرت `com.bancooom.app` |
| URL scheme | `bancooom` | لا تغيّر بلا أمر (حارس سكيم سابق) |
| `DEMOTE_BLOCKED` | **ABSENT** في artifacts | موجة C2 Evidence من CA tip — طبقة auth فقط |
| Fake topPad 67 | **صفر** hits | ابقَ الحارس؛ لا تُرجع 67 |
| Coolify C0 | PR #4 | Harden فقط · ليس Production Ready |
| Production live | banco.today GCP · بلا gitSha | C1 staging+readyz pin |
| Website | معزول | لا موجات موبايل تلمسه |
| Replit files | تبقى | لا حذف حتى cutover بأمر |

---

## 14) طابور فينش الذكي (ترتيب · بلا rebuild)

### الآن (ثقة)
1. الإبقاء على حارس 46/46 أخضر قبل أي لمس أقسام  
2. تثبيت SoT Stay = أسود في كل تقارير لاحقة (رفض rose)  
3. قرار مالك Bundle ID  

### موجة فينش منتج خفيفة (بعد أمر)
1. Notifications: أيقونات الأنواع الناقصة (+ prefs إن لزم) — ملف واحد  
2. C2: Evidence Card `DEMOTE_BLOCKED` (+ media/poster إن ثبت فرق) من CA  
3. Banks UX خفيف OPEN-08/09 بلا directory  
4. Factories industry strip (Additive)  

### إثبات بصري / Ops
1. شوتات Discover×5 + Stay + Banks  
2. C1 Coolify staging + readyz gitSha  
3. EAS device push  

### Start صريح فقط
OPEN-02 directory · OPEN-06/07/12 · DNS C8 · FB SSO  

---

## 15) مصادر هذه الجولة (قُرئت بعمق)

MINIAPP-PER-SECTION · ARCHITECTURE-LAYERS · PAGE-BY-PAGE · SURGICAL-MINIAPP · FULL-PICTURE · GAP-INVENTORY · GAP-CLOSEOUT · CLAUDE-FULL-INVENTORY · CLAUDE-MASTER-FEATURE-LIFECYCLE · MOBILE-HARDENING · MAINTENANCE-GOALS · INVESTIGATION · JOINT-ARCHITECTURE · BANKS-FORENSIC · OWNER-COMPLAINT · FINISH-NOT-REBUILD · MASTER-LEDGER · ADS-FIRST · PASTE-REPLIT-RECORD-RE-CAR · CURSOR-FINISH-GOVERNANCE · PROJECT-PHILOSOPHY · حارس حي + sniff كود.

**ما زال INDEXED-ONLY:** عشرات PASTE/REPLIT/TASK — تُفهرس على دفعات؛ الإجماع أعلاه كافٍ للفينش دون rebuild.

---

*Cursor · Section-by-section harvest · 2026-07-23 · Forbidden: rebuild*
