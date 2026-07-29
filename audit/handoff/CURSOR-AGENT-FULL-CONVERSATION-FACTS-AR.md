# تقرير كامل لوكيل Cursor — كل الحقائق من المحادثة (بلا اختصار)

**المرسل إليه:** وكيل Cursor (أي جلسة لاحقة على `bancoo` / نفس البيئة)  
**مصدر التقرير:** محادثة Cloud Agent `bc-019f9016-dd1b-756b-a3b6-a00aa90afa16` («دراسة مشاكل الديبلوي والتجميع») حتى 2026-07-23  
**الفرع:** `cursor/master-architect-ledger-fa16` · **PR:** https://github.com/waelzaid66-max/bancoo/pull/5  
**قاعدة إلزامية من المالك:** ممنوع الكذب · ممنوع الهرجة · ممنوع rebuild · الشات حتى الآن = جمع أدلة وفهم فقط · المشروع تسليم لشركة عالمية

---

## 1) ماذا حدث في المحادثة (تسلسل الأحداث)

1. المالك أكّد أن صيانات سابقة حصلت، وأن النسخة الأخيرة على الريبو الموجَّه كانت هدف أقوى خط مستقر، وأن مهمة الوكيل = **فينش + لمسات أخيرة + إطلاق كامل**، مع تعلم من الأخطاء، وفهم كل ريبوهات/أقسام/رئيسية/إشعارات، وبعد الفينش تحسين — **ممنوع إعادة بناء شيء**.
2. الوكيل ثبّت عقيدة `FINISH-NOT-REBUILD` وشرح Home = `FeedScreen` (ليست Discover) ونظام الإشعارات (`createNotification` chokepoint).
3. المالك أمر: كمّل فحص قسم قسم حرف حرف، اجمع كل تحديث منسي فورًا.
4. الوكيل أنتج حصاد قسم×قسم + حارس 46/46 + Stay أسود كـSoT.
5. المالك أمر: كمّل فحوصات، المشروع عملاق، تسليم عالمي، أنت مسؤول — ممنوع تكذب.
6. الوكيل أنتج حصاد تسليم عالمي + فهرسة handoff واسعة.
7. المالك أمر: اجمع من الريبوهات والإصلاحات اللي ركبت واللي لأ، الفروع، ما انكسر واستُبدل، وصلنا لفين.
8. الوكيل أنتج chronicle عميق: CA tip `210a325`، bancoo orphan `321af02`، مصدر مدّعى `93f2c7e` غير موجود، فجوات DEMOTE/gitSha.
9. المالك أشار لفشل CI؛ التحقيق أظهر GitHub CI أخضر على PR#5 وVercel = rate limit (ليس عيب وثائق).
10. المالك غضب: من البداية أنت فقط تجمع أدلة؛ نسبة فهمك = تكلفتك؛ فيه كثير لم يُكتشف.
11. الوكيل اعترف: فهم تقريبي **~25–35٪**؛ 140 ملف audit خارج handoff كانوا شبه غير مقروءين؛ على bancoo ما زال تلوث قائمة البروفايل.
12. المالك طلب بأقصى قوة: اقرأ كل حرف، investigations كاملة، خريطة كل الإصلاحات الأصلية، ضمان أهداف سابقة — ثم تكرار «؟ / ماذا حدث» بسبب صمت/توقف الرد.
13. **هذا المستند:** تقرير كامل بلا اختصار لكل الحقائق المشروحة، ليُستخدم فورًا كمدخل لأي وكيل Cursor لاحق.

---

## 2) أوامر المالك الملزمة (لا تُنسى)

| أمر | المعنى التشغيلي |
|-----|------------------|
| FINISH لا REBUILD | لمسات/تجميع/إطلاق على أقوى خط مستقر — ممنوع إعادة بناء Home/Notifications/أقسام/Auth/Ads |
| ممنوع اختراع | Facebook SSO · FI auto-create · Google Maps كبديل قسري · frame-extract فيديو |
| صدق | كل ادّعاء = commit أو ملف:سطر أو «لم أتحقق» · ممنوع 100٪ كاذب |
| CA = Evidence هندسي | CONTINUATION F0: A=`-BANCO-CA-OOM-` SoT · C=`bancooom` مرآة GCP · B=`bancoo` مرفوض كأساسي هندسيًا |
| bancoo = هدف نشر | أمر لاحق للمالك: Coolify/Hostinger على bancoo · إبقاء ملفات Replit · لا whole-tree reset من CA |
| Stay أسود نهائي | `StaysHomeHeader` · دوك الوردي متقادمة · memory lock |
| Discover عزل | كروت 2×2 · `SECTION_ROUTE` · لا ENTER · لا melt · لا strips محظورة |
| Home ليست Discover | `(tabs)/index.tsx` = FeedScreen · ممنوع شريط بحث على Home |
| إشعارات | chokepoint `createNotification` فقط · routing موحّد |
| Production Ready | ممنوع حتى كل البوابات + Owner Final Acceptance |
| هذا الشات = أدلة | ليس تسليم · الفهم ناقص · كمّل اكتشاف |

---

## 3) خريطة الريبوهات (حقائق GitHub وقت الفحص)

| ريبو | tip / حالة | الدور |
|------|------------|--------|
| `waelzaid66-max/-BANCO-CA-OOM-` | tip `210a325` (2026-07-21) · 61 فرع · tags حتى `v1.4.0-stable` | **مصدر الحقيقة الهندسي** |
| `waelzaid66-max/bancoo` | main orphan `321af02` · يدّعي مصدر `93f2c7e` **غير موجود (HTTP 422)** | هدف Coolify · تاريخ git مقطوع |
| `waelzaid66-max/bancooom` | size 0 / فارغ وقت F0 | مرآة GCP اسمها صالح لـOCI |
| `waelzaid66-max/B-OOM` | tip أقدم 2026-07-18 | سلف/مرآة |
| `waelzaid66-max/aws-virgen` | 2026-07-10 | مرآة AWS قديمة |
| وكلاء Cursor السحابيون في البيئة | **وكيل واحد ظاهر فقط** (`bc-019f9016…`) | محادثات السابقين داخل handoff/CA PRs لا transcripts |

### فروع/PRs على bancoo وقت الجلسة
- PR #5 `cursor/master-architect-ledger-fa16` — وثائق فهم/حصاد (هذا المسار)
- PR #4 `cursor/coolify-c0-harden-fa16` — Coolify C0 harden (مسارات مزدوجة، `/l/`، S3 keys، محاولة gitSha)
- PR #2/#3 Copilot Coolify — OPEN · Copilot UNTRUSTED كقبول
- PR #1 Vercel analytics — OPEN

### إنتاج حي
- `https://banco.today/api/readyz` = `{"status":"ok","checks":{"database":"ok"}}` — **بلا gitSha** على الصورة المفحوصة من bancoo
- مسارات حية: `/dealer-os/` · `/admin-os/`
- النشر الحي = Google Frontend/GCP — **ليس Coolify بعد**

---

## 4) خط زمني للإصلاحات على CA (ما ركب)

### يوم الذروة 2026-07-19 (مدموج على CA)
| PR | الموضوع |
|----|---------|
| #25 | استرجاع Discover → ميني-آب أقسام |
| #32 W1 | قطع جسر melt Discover→Search + حارس CI |
| #33 MOB-04 | RTL غلاف بروفايل |
| #34 W4 | sort chip لشريط الفلاتر |
| #35 MOB-01 | حقل هاتف في تعديل الملف |
| #36 MOB-05 | إخفاء فلاتر Discover + صدق Banks |
| #38 | أوديت برودكشن + CI + منع seed ديمو |
| #28 W2 | فصل تسجيل FI + KYC أدمن + فروع/مقاعد |
| #39 | surgical FI finish (intent=fi / Join / honesty) |
| #37 | تنظيف تلوّث ضرر ENTER فوق main |
| #40 W3 | FI AuthZ PATCH + state machine |
| #41 G2 | تشطيب أقسام + RTL بعد W3 |

### Website على CA (#10–#26)
Phases 1–9 لـ`banco-web` ثم #26 مشروع `banco-website` مستقل + تجميد `banco-web`.

### ما انكسر واستُبدل (أنماط مثبتة)
| حدث | الاستبدال |
|-----|-----------|
| Discover ENTER بدل كروت صور | استرجاع 2×2 + حارس يرفض ENTER |
| Stay rose ↔ أسود تذبذب وثائق | **SoT نهائي أسود** `StaysHomeHeader` |
| iconBtn 12→8 | إرجاع 12 + حارس |
| fake `web?67` | insets حقيقية + حارس يمنع 67 |
| شريط بحث على Home | ممنوع إلى الأبد |
| strips على Discover | ممنوعة |
| جسر `onBrowseSection` | قُطع W1 |
| فرع `booking-notif-test-contract-4322` | DESTRUCTIVE — ممنوع دمج |
| scheme `bancoboom` drift | scheme كانوني `bancooom` |
| أيقونات خطوط → tofu | SVG عبر `@/components/icons` فقط |
| تلوث Replit mega-wipe `93b650b` (~144 ملف) | استعادة لاحقة ناقصة أحيانًا → رجوع باجز |

### CA CompletedRepairs (عيّنة @ e4c8118 / لاحقة)
S1/S2/S4 · VIDEO-POSTER · DEALER-EDIT-MEDIA · EXPO identity `com.bancooom.app` · C-WEB-BASE · media/identity · **Production accepted: NO**

### CA PendingRepairs / KnownIssues
CONFIRM_BANCOO_FORCE publish · pnpm install/typecheck على laptop · bancooom sync+readyz F1 · device N2 · bundle store check · FB فقط بأمر · FI link runbook · KI-ENV-01 npm · KI-BANCOOOM-EMPTY · KI-F1-LIVE …

### CA PRs مفتوحة (وقت الفحص)
#46 Stay trim · #47 Discover map card · #48 currency icon Stay · #42–45 docs · #27 FI forensic docs …

---

## 5) فجوات bancoo مقابل CA (مثبتة حيًا في الجلسة)

| بند | CA | bancoo (لقطة workspace) |
|-----|----|-------------------------|
| `DEMOTE_BLOCKED` + 403 | موجود (UserService/meController + gate) | **غائب** |
| `readyz` gitSha/buildId | موجود على tip | **غائب** على artifacts الحالية (PR#4 يضيف على فرعه) |
| `chain-integrity-gate.mjs` | موجود | **غائب** |
| قائمة بروفايل P-01 | أُصلح ثم تلوّث ثم يُفترض إصلاح على CA | **ما زال:** `onStartShouldSetResponder={() => true}` على menuSheet · **لا** `maxHeight` في style القائمة |
| Stay أسود | نعم | نعم (`StaysHomeHeader` VOID #000) |
| حارس أقسام | تطوّر 46+/88 | 46/46 PASS على اللقطة |
| Bundle | docs/CA: `com.bancooom.app` | حي `app.json`: `com.bancoboom.app` · scheme `bancooom` |
| المصدر المدّعى `93f2c7e` | غير موجود | orphan `321af02` بلا أسلاف |

---

## 6) طبقات المنظومة (خريطة فهم)

```
L-WORLD     أسواق/دول/عملات تدريجيًا · ADS-FIRST · لا اختلاق بيانات
L-SURFACE   Home Feed · Search Discover · Section mini-apps · Banks · Profile · Website · dealer-os · admin-os
L-SHELL     /section/* · /business/banks · Stack فوق Tabs · MiniAppBottomNav
L-CHROME    هيدر/hero · chips · FilterSheet(lockCategory) · Stay أسود · iconBtn12 · لا fake67
L-DATA      useSearchMiniApp مستقل · criteria مقفولة · facets · BFF FeedItem · market_country
L-DOMAIN    Listings · Ads/boost · Wallet/Paymob · FI CRM · RFQ/Invest/Supply · Notifications
L-PLATFORM  Clerk · ObjectStorage replit|s3 فقط · CORS · abuse visibility · health/readyz
L-DELIVER   CI · EAS · Coolify/GCP · secrets · gitSha pin · Owner Final Acceptance
```

**قانون:** لا تصلح L-CHROME وأنت تظن أنك تصلح L-PORTAL. طبقة جديدة داخل قسم = Additive بأمر مالك فقط.

---

## 7) القسم × قسم — MUST-KEEP / DONE / OPEN / DO-NOT-TOUCH

### Discover
- MUST-KEEP: كروت صور 2×2 · SECTION_ROUTE · map→RE?map=1 · import car?engine=import
- DONE حي: لا onBrowseSection · حارس
- OPEN: شوتات إثبات · PR#47 سلوك map
- DO-NOT-TOUCH: ENTER · melt · redesign كروت · strips محظورة

### Cars / RE / Factories / Materials / Stay
- قفل فئة لكل ميني-آب · Stay منفصل BookingStaysApp أسود
- Factories OPEN: industry strip مؤجّل
- Materials: showMaterial + market matrix موجودة
- Stay DO-NOT-TOUCH: إعادة rose · دمج في SectionSearchApp

### Banks/FI
- خارج SECTION · أزرق فقط هنا · honesty brochure · intent=fi · لا directory حي بلا Start
- OPEN: Join/inbox UX · Verify→link يدوي · DEMOTE Evidence على bancoo
- DO-NOT-TOUCH: شركاء وهم · auto-create FI

### Home
- FeedScreen + rails + جرس · ليست Discover · لا شريط بحث
- OPEN: flicker/rails/geo polish فقط

### Notifications
- createNotification → prefs → DB → Expo push F&F
- routing موحّد notificationRouting.ts
- OPEN: أيقونات investment/global_supply/payment/subscription ناقصة في iconForType · prefs · EAS جهاز
- رسالة ConversationService تحمل listing_id (حي)

### Markets / Wallet / Ads
- picker + market_country + ~21 سوق موبايل
- BFF SUPPORTED_CURRENCIES أضيق (EGP/SAR/AED/KWD/QAR/JOD/OMR/LYD/USD/EUR) → عملات أسواق أخرى تسقط لـEGP = فجوة Additive
- Wallet/Paymob/boost/promo موجودة كمحرك · مدفوع = ops keys
- Object storage: replit|s3 فقط (لا gcs منفصل)

### Roles
- individual|dealer|company|enterprise|financial_institution في schema

---

## 8) أهداف سابقة يجب ضمان الوصول إليها (قائمة ضمان)

أي وكيل لاحق يجب أن ي추적 هذه الأهداف حتى PASS + قبول مالك — **لا يعلن اكتمالًا قبل ذلك**:

### A) عزل الأقسام والشكل
1. Discover كروت 2×2 + SECTION_ROUTE + لا melt  
2. حارس section-miniapp-guard أخضر على tip  
3. Stay أسود · شرائط Stay/Car المضغوطة محمية  
4. iconBtn 12 · لا fake 67 · hScroll flexGrow 0  
5. Home بلا شريط بحث  

### B) حسابات / FI
6. S1 دور من /me أولًا  
7. S2 banks-awaiting-link  
8. S4 DEMOTE_BLOCKED على السيرفر+عميل  
9. intent=fi · لا auto-create وسيط  
10. W2/W3 AuthZ كما على CA tip (تحقق git لا جداول قديمة)

### C) إشعارات / رسائل / إيميل
11. chokepoint واحد · routing موحّد · لا نظام موازٍ  
12. استكمال أيقونات/prefs إن ناقصة  
13. إثبات push على جهاز حقيقي (ليس Expo Go وحده)

### D) ميديا / هوية / نشر
14. VIDEO-POSTER / DEALER-EDIT-MEDIA كما CA بلا frame-extract invent  
15. upload 503 واضح عند storage ناقص + IDOR claims  
16. readyz يعرض gitSha/buildId  
17. قرار Bundle bancoboom vs bancooom قبل Store  
18. Coolify harden Additive + إبقاء Replit حتى cutover بأمر  
19. F1 لصق readyz بعد نشر مرآة  

### E) صدق برودكشن
20. لا Production Ready قبل laptop matrix + device N2 + Owner Final Acceptance  
21. لا whole-tree CA→bancoo  
22. Website معزول عن موجات الموبايل  
23. ADS-FIRST  

### F) إصلاح تلوث على لقطة bancoo
24. P-01 قائمة بروفايل: إزالة onStartShouldSetResponder · إعادة maxHeight/ScrollView/backdrop شقيق (من قوالب الإصلاح التاريخي — لا rewrite كامل)  
25. إدخال/مزامنة chain-integrity-gate من CA Evidence  
26. backport جراحي S4 DEMOTE + health pin  

---

## 9) حالة الفهم الصادقة (وقت كتابة هذا التقرير)

| طبقة | تقدير |
|------|--------|
| handoff | ~70–85٪ مجمّع |
| audit غير handoff (140 ملف) | ~5–15٪ — **ثغرة كبيرة** |
| memory 85 | ~25–35٪ |
| كود artifacts | ~20–35٪ أسطح حرجة |
| CA tip Jul-21+ | ~15–25٪ |
| إثبات جهاز/EAS/أسرار | ~0–5٪ |
| **إجمالي تقريبي** | **~25–35٪** |

**الشات = جمع أدلة فقط حتى هذه النقطة.**

---

## 10) وثائق أُنشئت في هذه الجلسة (اقرأها بالترتيب)

1. `audit/handoff/FINISH-NOT-REBUILD-LOCK-AR.md`  
2. `audit/handoff/SECTION-BY-SECTION-FINISH-HARVEST-AR.md`  
3. `audit/handoff/GLOBAL-DELIVERY-FINISH-HARVEST-AR.md`  
4. `audit/handoff/DEEP-SYSTEM-CHRONICLE-LAYERS-AR.md`  
5. `audit/handoff/HONEST-UNDERSTANDING-STATUS-AR.md`  
6. `audit/handoff/MASTER-ARCHITECT-LEDGER-AR.md` (محدّث)  
7. `audit/handoff/HANDOFF-READING-INDEX-AR.md`  
8. `audit/from-ca-tip-210a325/*` (CONTINUATION · NEXT-WAVE · Pending/Completed · F0/F1 · S1–S4 · PRODUCTION-ANATOMY)  
9. **هذا الملف:** `audit/handoff/CURSOR-AGENT-FULL-CONVERSATION-FACTS-AR.md`

---

## 11) CI (حقيقة الجلسة)

- PR #5 GitHub Actions (typecheck/build/api/eslint/mobile/gcp): **PASS**  
- Vercel على PR #5: **Deployment rate limited — retry in 24 hours** (حصة حساب) — ليس فشل بناء وثائق  
- PR #4: ظهر سابقًا فشلا نشر Vercel لـ api-server و admin-os-vh4f (يحتاج inspect منفصل إن ما زالا)

---

## 12) تعليمات تنفيذ فورية لأي وكيل Cursor يستلم هذا التقرير

1. اقرأ هذا الملف كاملًا ثم `HONEST-UNDERSTANDING-STATUS-AR.md` ثم `from-ca-tip-210a325/NEXT-WAVE…` و`PRODUCTION-ANATOMY…`.  
2. **لا تعلن** فهم 100٪ ولا Production Ready.  
3. **لا تعمل whole-tree** ولا rebuild.  
4. أكمل اكتشاف: 140 ملف audit غير handoff · diff CA↔bancoo ملف×ملف.  
5. إن أُمر بكود: Evidence Card واحدة لكل فجوة (أولوية: P-01 profile menu · DEMOTE_BLOCKED · chain gate · readyz gitSha).  
6. موجات N0 Ops → N1 إثباتات ضيقة → N2 قسم واحد — من NEXT-WAVE.  
7. أي تعارض وثائقي (Stay وردي، W3 مفتوح قديم): **الكود الحي على CA tip + أمر المالك يغلبان**.  

---

## 13) رسالة قصيرة للمالك (ملخّص ما حدث لصمته السابق)

حصل تأخير/صمت في الردود أثناء طلبك للتحقيق الكامل. العمل السابق كان جمع أدلة. هذا التقرير يجمّع **كل** ما شُرح في المحادثة بدون اختصار ليُسلَّم فورًا لمسار وكيل Cursor عبر الريبو والـPR.

---

*نهاية التقرير الكامل · 2026-07-23 · Cloud agent → Cursor handoff · Forbidden: abbreviate away facts*
