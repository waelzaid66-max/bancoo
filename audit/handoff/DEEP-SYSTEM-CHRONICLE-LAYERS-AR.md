# تاريخ عميق + طبقات المنظومة — من ما حدث إلى النقطة الحالية

**تاريخ:** 2026-07-23  
**قاعدة صدق:** لست عند 100٪ · transcripts وكلاء Cursor السحابيين السابقين **غير متاحة** هنا (أداة list تُظهر هذا الوكيل فقط) · تاريخ هندسي غني يعيش في **CA** لا في git history لـbancoo  
**قاعدة شغل:** FINISH لا REBUILD · طبقات جديدة داخل الأقسام = Additive جراحي بأمر مالك فقط

---

## 0) خريطة الريبوهات (حقائق GitHub حيّة)

| ريبو | tip / تاريخ | الدور |
|------|-------------|--------|
| **`waelzaid66-max/-BANCO-CA-OOM-`** | `210a325` 2026-07-21 «fingerprint after media/identity» · **61 فرع** · tags حتى `v1.4.0-stable` | **SoT هندسي** — تاريخ PRs #1–#41+ · إصلاحات أقسام/FI/ويب |
| **`waelzaid66-max/bancoo`** (هذا الوكيل) | `main` = orphan `321af02` يدّعي مصدر `93f2c7e` · فروع وكيل: ledger + coolify | **هدف Coolify/Hostinger** بأمر المالك · تاريخ git **مقطوع** (handoff بلا أسلاف) |
| **`waelzaid66-max/B-OOM`** | `6fce7a3` 2026-07-18 | مرآة/سلف أقدم |
| **`waelzaid66-max/bancooom`** | فارغ size 0 · 2026-07-09 | هدف نشر GCP كان فارغًا (KI) |
| **`waelzaid66-max/aws-virgen`** | 2026-07-10 | مرآة AWS قديمة |
| مرايا محلية في `reports/from-other-repos/` | banco.store · cloud-web-app · aws-virgen | لقطات README فقط — لا كنز كود فريد |

**فروع bancoo الآن (6):** `main` · `cursor/master-architect-ledger-fa16` (PR#5) · `cursor/coolify-c0-harden-fa16` (PR#4) · Copilot Coolify PR#2/#3 · Vercel analytics PR#1 — **كلها OPEN · لا دمج إنتاج بعد.**

**وكلاء Cursor السحابيون الظاهرون لهذه البيئة:** وكيل واحد فقط (`bc-019f9016…`). محادثات الوكلاء السابقين موثّقة داخل `audit/handoff/*` + CA PRs — **ليس** عبر transcripts.

---

## 1) الطبقات المعمارية (كيف تُفهم المنظومة — سوق أصول دولي)

```
L-WORLD     أسواق/دول/عملات تدريجيًا · ADS-FIRST · لا اختلاق بيانات
L-SURFACE   Home Feed · Search Discover · Section mini-apps · Banks · Profile · Website · dealer-os · admin-os
L-SHELL     routes `/section/*` · `/business/banks` · Stack فوق Tabs · MiniAppBottomNav
L-CHROME    هيدر/hero · chips · FilterSheet(lockCategory) · Stay أسود · iconBtn12 · لا fake67
L-DATA      useSearchMiniApp مستقل · criteria مقفولة · facets · BFF FeedItem · market_country
L-DOMAIN    Listings · Ads/boost · Wallet/Paymob · FI CRM · RFQ/Invest/Supply · Notifications chokepoint
L-PLATFORM  Clerk · ObjectStorage replit|s3 · CORS · abuse visibility · health/readyz
L-DELIVER   CI · EAS · Coolify/GCP · secrets · digSha pin · Owner Final Acceptance
```

**قانون الطبقات:** إصلاح `L-CHROME` لا يُحسب إصلاح `L-PORTAL`. إنشاء «طبقة جديدة داخل قسم» = شريط/مصفوفة/سلوك Additive تحت نفس الـshell — **ليس** إعادة بناء الميني-آب.

مصادر: `ARCHITECTURE-LAYERS` · `MINIAPP-PER-SECTION` · `.agents/memory/banco-section-*` · `banco-bff-arch` · `banco-search-discover-*`.

---

## 2) خط زمني — ما ركب · ما انكسر · ما استُبدل (CA = الدراما الحقيقية)

### عصر استقرار مبكر (tags)
`v1.0.0-rc.*` → `v1.1.x-production` → `v1.2` → `v1.3` → **`v1.4.0-stable-2026-07-18`** على CA.

### 2026-07-18 — Website stack على CA (#10–#22)
Phases 1–9 لـ`banco-web` ثم لاحقًا **#26** مشروع `banco-website` مستقل + تجميد `banco-web`.  
**MUST-KEEP:** عزل الموقع عن موجات الموبايل.

### 2026-07-19 — يوم الأقسام/FI (الذروة)
| PR | ماذا ركب | ملاحظة |
|----|----------|--------|
| **#25** | استرجاع Discover → ميني-آب أقسام | ضد الذوبان |
| **#32 W1** | قطع جسر melt + حارس CI | أساس العزل |
| **#33 MOB-04** | RTL غلاف بروفايل | |
| **#34 W4** | sort chip لشريط الفلاتر | |
| **#35 MOB-01** | حقل هاتف | |
| **#36 MOB-05** | إخفاء فلاتر Discover + صدق Banks | |
| **#38** | أوديت برودكشن + CI + منع seed ديمو | |
| **#28 W2** | فصل تسجيل FI + KYC أدمن + فروع/مقاعد | |
| **#39** | surgical FI finish (intent/Join/honesty) | |
| **#37** | تنظيف تلوّث ضرر فوق main (ENTER وغيره) | سلسلة ضرر→استرجاع |
| **#40 W3** | FI AuthZ PATCH + state machine | مدمج على CA |
| **#41 G2** | تشطيب أقسام + RTL بعد W3 | |

### ما انكسر واستُبدل (أنماط مثبتة)

| حدث | الاستبدال / القفل |
|-----|-------------------|
| Discover → صفوف ENTER بدل كروت صور | استرجاع 2×2 + حارس يرفض ENTER |
| Stay rose ↔ أسود تذبذب وثائقي | **SoT نهائي:** أسود `StaysHomeHeader` (memory + guard) · دوك وردي متقادمة |
| `#23` boom-stay-black | CLOSED كـPR قديم؛ القرار النهائي لاحقًا ثبّت الأسود على main |
| `iconBtn` 12→8 سحق أزرار | إرجاع 12 + حارس |
| fake `web?67` سحق هيدر | insets · حارس يمنع 67 |
| شريط بحث على Home | **ممنوع إلى الأبد** (memory) |
| strips على Discover (علامات/ترند/…) | **ممنوعة** — Discover = بوابات أقسام |
| Stay بلون بنوك أزرق | rose هوية عقار لـStay · أزرق = Banks فقط |
| جسر `onBrowseSection` | قُطع في W1 |
| فرع `booking-notif-test-contract-4322` | **DESTRUCTIVE — ممنوع دمج** |
| scheme `bancoboom` drift | scheme الكانوني `bancooom` |
| أيقونات خطوط → tofu أندرويد | SVG registry فقط |

### بعد #41 — مفتوح على CA (لم يُدمج بعد)
| PR مفتوح | الموضوع |
|----------|---------|
| **#46** | trim هيدر Stay ~5mm |
| **#47** | Discover map card دائمًا |
| **#48** | دمج أيقونة دولة+عملة في Stay |
| **#42–45** | docs/compose/inventory/security B4 |
| **#27** | forensic FI docs |
| **#3–4** | GCP CI / sync docs قديمة |

### 2026-07-21 — bancoo orphan handoff
`321af02` لقطة كاملة + dump · **بلا تاريخ commits السابق** · المصدر المدّعى `93f2c7e` يحتاج مطابقة على CA (قد لا يساوي tip `210a325`).  
CA واصل إلى `210a325` (media/identity fingerprint) — **أحدث من لقطة bancoo main.**

### 2026-07-23 — هذا الوكيل على bancoo
| PR | الحالة | المحتوى |
|----|--------|---------|
| #1 Vercel analytics | OPEN | غير مسار Coolify |
| #2/#3 Copilot Coolify | OPEN | UNTRUSTED كقبول · بنية نشر |
| **#4** C0 harden | OPEN draft-ish | مسارات مزدوجة · `/l/` · S3 keys · محاولة pin |
| **#5** ledger/harvest | OPEN | فهم/فهرسة فقط — لا كود منتج بعد |

**إنتاج حي اليوم:** `banco.today` GCP · readyz ok بلا gitSha على صورة bancoo الحالية · مسارات `/dealer-os/` `/admin-os/`.

---

## 3) ما ركب على CA tip ولم يُثبت بعد على bancoo (فجوات تجميع)

| بند | CA | bancoo (حي في workspace) |
|-----|----|--------------------------|
| `DEMOTE_BLOCKED` + 403 في meController | موجود (UserService/meController + gate script) | **غائب** |
| `readyz` + `gitSha`/`buildId` | موجود في health.ts tip | **غائب** على main/artifacts الحالية (PR#4 يحاول إضافته) |
| Stay أسود | نعم | نعم (موجود) |
| notificationRouting | نعم | نعم |
| موجات media/identity بعد fingerprint | tip `210a325` | غير متحقق سطرًا بسطر مقابل bancoo |
| حارس أقسام 46+/88 | تطوّر على CA | 46/46 على لقطة bancoo السابقة |

---

## 4) ما كُتب vs ما كمل vs ما ناقص (ثلاث حقائق متوازية)

### كُتب (وثائق/لصقات)
مئات ملفات handoff · PASTE Replit الملغاة · جداول W0–W4 · Stay وردي في دوك مبكرة · ادعاءات Production Ready مرفوضة في recovery.

### كمل على خط CA (كدمج PR — ليس قبول متجر)
عزل أقسام W1 · MOB-01/04/05 · W4 · FI W2/W3 · G2 · website مستقل · حراس · كثير من Honesty Banks.

### ناقص لتسليم شركة عالمية
1. تجميع CA→bancoo Evidence (demote · gitSha · media/poster…) بلا whole-tree  
2. أسرار Paymob/`PAYMENT_CONFIG_ENCRYPTION_KEY` · Clerk live · EAS  
3. شوتات جهاز على SHA مثبت  
4. قرار Bundle `bancoboom` vs docs `bancooom`  
5. BFF عملات vs أسواق الموبايل الأوسع  
6. أيقونات إشعار ناقصة · Factories industry strip · M4–M7 maintenance memory  
7. map near-me · FX · directory بنوك (Start)  
8. Owner Final Acceptance مكتوب  
9. Coolify cutover + إبقاء Replit حتى الأمر  

---

## 5) طبقات داخل الأقسام — أين يُسمح «إنشاء طبقة جديدة»

| قسم | طبقات موجودة | طبقة جديدة محتملة (Additive فقط · بأمر) |
|-----|--------------|----------------------------------------|
| Discover | كروت 2×2 · Stay portal · map CTA (حي) | #47 سلوك map دائم — لا redesign كروت |
| Cars | engines · brand/origin · import deep-link | Car import lifecycle (M5 / C7) |
| RE | engines · rentalTerm · market matrix · map latch | ضغط chrome C6 · locate C4 |
| Factories | industrial chips | **industry strip** (منسي موثّق) |
| Materials | material/origin/market | ضغط لاحق |
| Stay | أسود Bands A–D · terms · StayCard | #46 trim · #48 currency icon · host hub Start |
| Banks | brochure · intent=fi · inbox أعضاء | UX Join/inbox · لا directory بلا Start |

**ممنوع كطبقة جديدة:** melt إلى Search · Home search bar · strips Discover المحظورة · نظام إشعارات موازٍ · FI auto-create.

---

## 6) ذاكرة الوكلاء (`.agents/memory`) — أقفال تشغيلية حية

عيّنة ملزمة قُرئت: Stay black lock · Discover strips ban · Home no search · section pages invariants · push chokepoint · BFF immutability · abuse visibility · scheme bancooom · EAS META-INF · empty-DB false alarm · M4–M7 ما زالت ACTIVE في maintenance orders (تحقق قبل ادعاء DONE) · B.4 open: FX/import/encryption key/Paymob.

---

## 7) أين نحن الآن (نقطة الوكيل على bancoo)

```
[CA tip 210a325] ──Evidence──► [bancoo orphan 321af02 + docs PRs]
                                      │
                      ┌───────────────┼───────────────┐
                      ▼               ▼               ▼
                 PR#5 فهم/حصاد   PR#4 Coolify C0   PR#2/3 Copilot
                 (هذا الفرع)      (harden)          (UNTRUSTED قبول)
                      │
                      ▼
              إنتاج حي GCP (ليس Coolify بعد)
              readyz بلا gitSha على صورة bancoo
```

**الفهم:** تعمّق كثيرًا عبر handoff+memory+PRs+مقارنة CA — **ما زال ناقصًا:** كل سطر media/identity على CA بعد اللقطة · كل memory الـ85 حرفًا · إثبات جهاز · أسرار · قبول مالك.

---

## 8) ماذا أفعل تاليًا لتعميق أشد (بلا rebuild)

1. Evidence Cards ملف×ملف: `DEMOTE_BLOCKED` · health gitSha · VIDEO-POSTER من CA→bancoo  
2. قراءة `audit/*` على CA عبر `gh` للـrecovery CONTINUATION  
3. بقية memory files دفعة  
4. موجة كود واحدة فقط بعد أمر مالك من طابور P0/P1  

---

*Cursor · Deep chronicle · 2026-07-23 · Forbidden: fake complete understanding · Forbidden: whole-tree rebuild*
