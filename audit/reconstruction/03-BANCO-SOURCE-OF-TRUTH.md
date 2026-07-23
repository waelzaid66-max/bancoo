# BANCO — Source of Truth (SoT) — Living Master Document

**Owner:** Dr. Eng. Wael Zaid · **Maintainer note:** Cursor agent (`-8112`) · **Date:** 2026-07-23
**Phase:** A/B (STUDY + PLAN only — **no code / PR‑to‑main / merge / migration / fix**).
**Repair target (owner decision):** **`bancoo`** · **Deploy (owner decision):** **Coolify first, full, parallel with Replit**.
**Evidence source for backports:** CA `-BANCO-CA-OOM-` @ `210a325` (per‑file Evidence Card; never blind reset).
**Integrity:** no guessing · every claim = evidence + Confidence · conflicts → Evidence Card · UNKNOWN stays UNKNOWN.

> هذا المستند = عقل المشروع. أي وكيل جديد يقرأه أولًا فلا يبدأ من الصفر ولا يكرّر الأخطاء. مطابق لتدقيق المالك 2026‑07‑23 ومؤكَّد بأدلة مستقلة.

---

## F0 — الحكم المعماري (RESOLVED, evidence)
| سؤال | جواب | Confidence |
|---|---|---|
| أحدث خط تطوير | **CA `210a325`** (2026‑07‑21 23:41Z, tags→v1.4.0 + موجات مساء 21) | High (verified) |
| هدف الإصلاح | **`bancoo`** (قرار المالك) — يتيم `321af02`، فيه #28/#40، لكنه ناقص موجات CA مساء 21 | High |
| مصدر backport | **CA فقط**، Evidence Card لكل ملف | High |
| B‑OOM / b.deals / aws‑virgen | أسلاف/مرايا أقدم — **لا كنز فريد** (Jul 18/11/10) | High (verified tips) |
| Deploy | **Coolify** (بالتوازي مع Replit) — Coolify على فروع PR فقط حاليًا | High |
| ORM | **Drizzle** (ليس Prisma) | High |
| Facebook login | **غير موجود في أي ريبو** (`oauth_facebook`=0) → **بناء جديد** بأمر المالك، ليس استرجاعًا | High (verified) |

**قاعدة:** ممنوع whole‑tree merge بين الريبوهات · ممنوع اعتبار آخر commit/merge/AI مصدر حقيقة · الدليل فقط.

---

## 1) Master Architecture (مؤكَّد)
`Clerk → api-server (Express5 /api/v1/*) → Postgres+Drizzle(pg_trgm) · Object Storage(s3|replit فقط، gcs مرفوض بالكود) · Paymob/Resend/OpenAI(env-gated)`. Surfaces: `banco-mobile` (Expo 54/RN 0.81.5, newArch) · `admin-os`/`dealer-os` (Vite, BANCO Market) · `landing` · `banco-web`(مجمّد)/`banco-website`(مستقل) · `lib/*` (db, api-spec→Orval, search-contract, taxonomy, design-tokens). pnpm 11.9 · Node 24.

## 2) Master Feature / Account Registry (4 أنواع — مؤكَّد بالكود)
| نوع | API `account_type` | DB `users.role` | حالة |
|---|---|---|---|
| الشخصي | individual | individual | PRESENT |
| بانكو بيزنس | dealer | dealer | **تسمية UI فقط**؛ الكود/DB/API لسه `dealer` (لا rename في أي ريبو — UNKNOWN إن كان يُهاجَر) |
| الشركات/الموردين | company | company | PRESENT؛ «موردين» = سطح B2B فوق الدور، ليس دورًا |
| البنوك | financial_institution | financial_institution | PRESENT (intent=fi، #40 AuthZ)؛ Verify≠inbox، DEMOTE_BLOCKED/awaiting‑link **على CA فقط** |

## 3) Master Fix / Gap Registry (backport CA→bancoo — Evidence Card لكل بند)
| # | البند | حالة bancoo | حالة CA | أولوية | Confidence |
|---|---|---|---|---|---|
| G1 | قائمة البروفايل (P‑01): `onStartShouldSetResponder`+بلا `maxHeight` | **منتكس** (profile.tsx:2216) | مُصلَح (`maxHeight:"85%"`، بلا responder) | Critical | High (verified) |
| G2 | DEMOTE_BLOCKED (منع تخفيض دور صامت) | غائب | موجود (meController/UserService+gate) | High | High |
| G3 | FI awaiting‑admin‑link UX (banks.tsx) | ناقص | موجود | High | Med‑High |
| G4 | media/upload 503 + edit‑media + posters | أقدم | محسّن | High | Med |
| G5 | status/sold/archive SoT + cache invalidation | أقدم | محسّن | High | Med |
| G6 | chain-integrity-gate.mjs + reports/continuous-recovery | غائب | موجود | High | High (verified) |
| G7 | Bundle id | `com.bancoboom.app` | `com.bancooom.app` (كنسي) | High(store) | High (verified) |
| G8 | الدول/العملات: أقسام لسه «مفروشة» مش قائمة أفقية مضغوطة | جزئي | — | Med (UX) | UNKNOWN (يحتاج فحص جهاز/لقطة للأقسام المحددة) |
| G9 | الأيقونة/السبلاش/الخطوط + الأزرار المضغوطة (iconBtn 12) | يتحقّق | مؤكَّد بالذاكرة/الحراس | Med | Med |
| G10 | أسماء «Replit» → BOOM | 5 refs **أدوات/بيئة فقط** (لا إعلانات ظاهرة) | نفس الشيء | Low | High (verified) |

## 4) Master Deployment Registry (Coolify‑first)
- `docker-compose.coolify.yml` + `deploy/coolify/*`: postgres+api+banco-web+banco-website+web(nginx). **موجود على فروع PR فقط** (#2/#3 متعارضان — يُعتمد #3، يُدمج `.dockerignore` من #2).
- **إصلاح إلزامي في الدليل:** Coolify يذكر `OBJECT_STORAGE_PROVIDER=gcs` بينما الكود يرفض gcs (s3|replit فقط) → خطر نشر بلا ميديا.
- Migrations يدوية (خطر lag) · secrets في env فقط (لا `.replit` — درس SEC‑001) · `/api/readyz` gitSha · SSL/DNS/monitoring/backup = OPS.
- **Vercel كـAPI كامل = غير مناسب** (سبب فشل `Output Directory "A"`) → إيقاف مسار Vercel/Copilot لتفادي التصادم.

## 5) Master Risk / Regression / Compatibility (مختصر)
- **Critical:** G1 profile · G2 demote · storage(gcs) · أسرار/Clerk origins (شاشة بيضاء على pk_live لو الدومين مش مسموح).
- **High:** bancoo ناقص موجات CA مساء 21 → regressions media/FI/archive · PR2/PR3 Coolify هشّان · static-build/Publish غير مثبت (/banco-mobile 500).
- **قاعدة تنفيذ (Phase C):** كل fix = Impact + Dependency + Compatibility + Regression sim + Rollback + guard test، فرع واحد لكل محور، بوابات خضراء قبل الدمج.

## 6) Master Recovery Waves (خطط فقط — تنفيذ بعد اعتمادك)
- **W0 قرارات مالك:** (أ) تأكيد bancoo هدف + backport من CA. (ب) Facebook: بناء جديد؟ (ج) Supplier دور مستقل أم feature؟ (د) rename dealer→بيزنس: UI فقط أم enum migration؟ (هـ) bundle id الكنسي؟
- **W1 تحصين (P0):** chain-integrity-gate + secret‑scan + `.gitignore` للأسرار + إثبات Publish/readyz بـSHA + أسرار/Clerk origins/storage s3|replit.
- **W2 Backport جراحي CA→bancoo:** G1→G6 بترتيب، Evidence Card + guard + rollback لكل بند.
- **W3 تحقق حي لأنواع الحسابات:** فرد/بيزنس/شركة/بنك(intent=fi)/لا‑demote.
- **W4 Coolify كامل:** #3 فقط + إصلاح gcs + إثبات بناء الصور + migrate + كل الصفحات.
- **W5 موبايل UI (device‑proven):** G8 الدول/العملات قائمة أفقية مضغوطة · G9 أيقونة/سبلاش/خطوط/أزرار · bundle id.
- **W6 منتج بقرار:** Facebook SSO (جديد) · radius map · FI auto‑link · rename DB.
- بوابة: لا موجة N+1 قبل قبول اختبار + موافقتك المكتوبة.

## 7) Rollback + Verification
كل موجة: فرع مستقل + PR · قبل الدمج: typecheck/lint/tests/build/guards خضراء + `/api/readyz` · Rollback = revert الفرع (main لا يُمَس إلا بموافقة). ممنوع force على main. ممنوع حذف كود قبل إثبات أنه dead.

## 8) UNKNOWNs (بلا تخمين)
قيم الأسرار الحية · هل `/api/readyz` الحي يطابق SHA · حالة `bancooom` remote · الأقسام المحددة ذات الدول/العملات «المفروشة» (G8) · هل touch‑dead في profile ما زال (G1 مؤكَّد منتكس) · Bundle store listing تحت الاسم القديم.

## 9) DO‑NOT (أقفال)
لا whole‑tree reset · لا اختراع Facebook بلا قرار · لا دمج فرع `booking-notif-test-contract-4322` (مدمّر) · لا أسرار في git (SEC‑001) · لا كسر الشكل — تعديل الشكل بدقة قصوى مع حساب المساحات وأسلوب ديناميكي حديث مماثل للموجود.

---
*دراسة/خطة فقط — لا تنفيذ حتى اعتماد المالك. عند الاعتماد: أبدأ W1 على `bancoo` بفروع/PR جراحية.*
