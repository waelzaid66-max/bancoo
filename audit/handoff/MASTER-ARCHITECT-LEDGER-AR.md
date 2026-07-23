# BANCO — دفتر المهندس المسؤول (Master Architect Ledger) — مراجعة صدق

**تاريخ هذه المراجعة:** 2026-07-23 (مراجعة ثالثة بعد قفل المالك: فينش + لمسات أخيرة + إطلاق · **ممنوع إعادة بناء أي شيء**)

---

## −1) قفل المالك الملزم — FINISH · لا REBUILD

**نص المالك (ملخّص ملزم):** صيانات سابقة حصلت · النسخة الأخيرة المعروضة على الريبو الموجَّه كانت هدف أقوى خط مستقر · هذا الوكيل للفينش والتجميع والإطلاق الكامل · يتعلّم من كل خطأ وفهم غلط · يعرف كل ريبوهات · يفهم ليش كل قسم · خاصة الرئيسية والإشعارات · بعد الفينش نحسّن ونكمّل · **ممنوع إعادة بناء شيء.**

| قاعدة | المعنى التشغيلي |
|-------|------------------|
| **FINISH / ASSEMBLE** | لمسات أخيرة · تجميع Evidence · Harden نشر · إغلاق فجوات مثبتة فقط |
| **ممنوع REBUILD** | لا إعادة كتابة Home كـDiscover · لا نظام إشعارات جديد · لا melt أقسام · لا whole-tree CA↔bancoo · لا «تنظيف» يمسح بوابات |
| **أقوى خط مستقر** | CA tip = Evidence جراحي · bancoo = هدف Coolify بأمر المالك · لا مسح إنجازات الصيانة السابقة |
| **بعد الفينش** | تحسين/تكميل موجة بموجة — ليس إعادة اختراع المنصة |
| **أخطاء أُنسى** | ادّعاء 100٪ · لهجة greenfield · اختراع FB SSO / FI auto-create · Coolify = قبول إنتاج |

مصدر حوكمة مطابق: `CURSOR-FINISH-GOVERNANCE-PRINCIPLES-AR.md` · `PROJECT-PHILOSOPHY-DEPLOY-SECTION-GOALS-AR.md` (Additive only).

---

## 0) إعلان صدق إلزامي (قبل أي رقم فهم)

### ما أقدر أدّعيه الآن — وما لا أقدر

| ادّعاء | الحكم |
|--------|--------|
| قرأت **كل** ملفات `audit/handoff` حرفًا بحرف (103 في bancoo / 109 في CA) | **لا — كذب لو ادّعيت ذلك** |
| استخرجت إجماع الوكلاء من الملفات الأساسية + عيّنة الحوارات + تقارير CA continuous-recovery | **نعم — تم في هذه الجولة** |
| أملك transcripts كل وكلاء Cursor السحابيين السابقين | **لا** — أداة `list-cloud-agents` في هذه البيئة تُظهر **هذا الوكيل فقط** (`bc-019f9016-…`). مناقشات الوكلاء السابقين موثّقة أساسًا **داخل الريبو** (`audit/handoff/*` · `PASTE-CURSOR-LAPTOP-*` · `reports/continuous-recovery/*`) |
| الإنتاج مقبول (`productionAccepted`) | **NO** في كل تقارير CA · CONTINUATION يمنع «Production Ready» حتى كل البوابات PASS + قبول مالك |
| فهمي = 100٪ | **لا** · ادّعاء 100٪ هنا = كذب. النسبة الصادقة بعد هذه الجولة: **معرفة قواعد ملزمة عالية (~90٪ من الوثائق الأساسية)** · **معرفة حالة الكود الحي/~CA tip جزئية** · **إثبات جهاز/EAS/Store = شبه صفر من عندي** |

### بروتوكول الصدق (من الوكلاء السابقين — ملزم)

من `CAPABILITY-SPLIT-AND-HONESTY-PROTOCOL-AR.md` (متطابق CA↔bancoo):

- كل ادّعاء = `commit` أو `ملف:سطر` أو صراحة «لم أتحقق»
- ممنوع إعلان «مُصلَح» قبل تحقق مزدوج
- «لم أتحقق» أفضل من التخمين

---

## 1) أين تعيش مناقشات الوكلاء السابقين (مصدر الحقيقة الورقي)

| مصدر | ماذا فيه |
|------|----------|
| `/audit/handoff/` (~103–109 ملف) | حوارات Cursor↔Claude↔Copilot↔Replit↔Owner · إيصالات · أوامر لصق |
| CA `reports/continuous-recovery/` | Completed/Pending/KnownIssues · Production accepted: **NO** |
| CA `audit/CONTINUATION-CLOUD-LAPTOP-DUAL-AGENT-2026-07-21-AR.md` | تقسيم Cloud↔Laptop · F0 SoT · never-touch |
| CA `PASTE-CURSOR-LAPTOP-AGENT-WAVE-*` (موجودة في CA فقط؛ ناقصة من bancoo handoff) | موجات media/identity/archive/sold · non-goals |
| PRs على CA `#25–#48` | تاريخ دمج فعلي (W1/W2/W3/G2…) |
| هذا الحساب السحابي | وكيل واحد ظاهر فقط — لا أختلق وكلاء لم أقرأ transcriptsهم |

**ملفات أساسية قُرئت بعمق في هذه الجولة (عيّنة ملزمة):**  
CANONICAL · CAPABILITY-SPLIT · GAP-INVENTORY · GAP-CLOSEOUT · ARCHITECTURE-LAYERS · ADS-FIRST · AGENT-DAMAGE · GOLDEN-PATH · ROLES · CLAUDE-RESPONSE-FULL-FACTS · CLAUDE-FULL-INVENTORY · إيصالات Cursor↔Claude · CONTINUATION · PendingRepairs · RepositoryComparison · CompletedRepairs · MASTER ledger السابق · فحوص حية `banco.today` من هذه الجلسة.

**لم تُقرأ حرفًا بحرف بعد:** باقي عشرات ملفات handoff + كل `.agents/memory/*` + كل تمويل `09-CLAUDE-FAILURES` كامل التفاصيل سطرًا بسطر.

---

## 2) إجماع الوكلاء السابقين (لا اختراع — قرارات موثّقة)

| موضوع | القرار الملزم | مصدر |
|-------|---------------|------|
| سلطة القرار | المالك فقط | OWNER-ONLY / Capability |
| من يكتب كود الإنتاج | **Cursor** | Roles · Golden path |
| Replit | إثبات تشغيل فقط — **ممنوع تعديل كود من Replit** | GOLDEN-PATH · ROLES |
| Copilot | **UNTRUSTED** — لا PASS بلا تقرير Cursor/حارس | COPILOT-UNTRUSTED |
| ترتيب الموجات المنتج | W0→W1→W2→W3→W4 بلا قفز | CLAUDE-ACK Joint A1 |
| W1 melt Discover | مُغلق (#32) + حارس أقسام | Gap closeout · PRs |
| W2 FI فصل تسجيل | مُغلق (#28) حسب الوثائق اللاحقة | Joint status |
| W3 FI أمن | كان يحتاج `Start W3` حرفيًا · وثائق لاحقة تدّعي #40 مدمجًا — **تحقق SHA على CA tip قبل إعادة فتح** | Surgical · ACK |
| ADS-FIRST | إعلان أولًا · بنوك ليست سوق شركاء | ADS-FIRST-LOCK |
| لا اختراع | Facebook Login · FI auto-create · Google Maps live كبديل إلزامي · frame-extract فيديو | WAVE pastes · CompletedRepairs |
| لا melt أقسام | Discover → SECTION_ROUTE فقط | AGENT-DAMAGE · Architecture |
| طبقات جراحية | لمس طبقة مسمّاة واحدة · لا تخلط L-PORTAL مع L-CHROME | ARCHITECTURE-LAYERS |
| عزل الموقع | لا تعدّل موبايل من مهمة ويب | WEBSITE isolation |
| أيقونات | SVG فقط | Joint A7 · memory icon pinning |
| SoT هندسي (F0 CONTINUATION) | **A** = `-BANCO-CA-OOM-` · **C** = `bancooom` GCP (كان فارغًا) · **B** = `bancoo` مرفوض كأساسي في نص CONTINUATION | CONTINUATION §F0 |
| قبول إنتاج | ممنوع حتى كل PASS + Owner Final Acceptance | CONTINUATION · كل تقارير recovery |

### تعارضات وثائق يجب احترامها (لا أختار بهدوء)

1. **Stay header:** وثائق مبكرة = وردي rose MUST-KEEP · وثائق لاحقة Owner/Replit = هيدر أسود مطلوب · **قبل أي لمس Stay: اطبع الكود الحالي + قرار مالك صريح — لا أعيد الهيدر من دوك قديم.**  
2. **SoT الريبو:** CONTINUATION يرفض `bancoo` كأساسي · أمر المالك لاحقًا لـ Coolify على `bancoo` + الإبقاء على Replit · **الحل الصادق:** CA = مصدر Evidence جراحي · bancoo = هدف نشر Hostinger بأمر المالك · ممنوع whole-tree reset.  
3. **جداول فجوات قديمة** ما زالت تقول W3 مفتوح بينما PRs لاحقة مدمجة — **لا أستخدم جدولًا قديمًا كـ SoT بلا `git` على CA tip.**

---

## 3) ماذا ادّعى الوكلاء أنه اكتمل (على خط CA — ليس قبول إنتاج)

من `CompletedRepairs.md` @ `e4c8118` وما قبلها (ملخص):

- حراس أقسام / إصلاح Discover بعد ضرر ENTER  
- موجات FI AuthZ / demote / accountTypeChosen بعد `/me`  
- VIDEO-POSTER · DEALER-EDIT-MEDIA · هوية Expo `com.bancooom.app`  
- أرشفة / sold / cache invalidation  
- سلسلة تقارير recovery · **Production accepted: NO**

من Gap closeout (عصر 2026-07-19): RTL/sort/Stay/Materials strips / MOB-01 phone / W4 sort chip — **على خط CA آنذاك**؛ bancoo orphan قد يفتقد لاحقها.

---

## 4) ماذا بقي مفتوحًا **كما كتبوه هم** (PendingRepairs + KnownIssues)

1. نشر/مزامنة bancoo MAIN بحذر (`CONFIRM_BANCOO_FORCE` / سكربت publish)  
2. `pnpm install` + typecheck/lint/build + laptop matrix  
3. sync `bancooom` + deploy + لصق `/api/readyz` (F1)  
4. Device N2 Android/iOS  
5. تأكيد Bundle: هل المتجر تحت `bancoboom` أم الانتقال لـ `bancooom`  
6. Facebook في Clerk **فقط إن أمر المالك** — لا stub  
7. Runbook ربط FI مؤسسي (لا auto-create)  
8. إثبات web export على Replit بعد deps  
9. KI-ENV-01 npm · KI-BANCOOOM-EMPTY · KI-F1-LIVE · KI-WEB-EXPORT  

**فحوص هذه الجلسة أضافت (دليل حي، ليس اختراعًا):**

- `https://banco.today` `/api/readyz` = ok/database ok · **بلا gitSha** · Google Frontend  
- مسارات حية `/dealer-os/` `/admin-os/`  
- Coolify لم يُقطع بعد  

---

## 5) تصحيح خططي السابقة (C0–C8) لتوافق إجماع الوكلاء

| موجة | كانت | التصحيح الصادق |
|------|------|----------------|
| C0 Coolify harden | نُفّذت PR #4 | **تبقى صالحة** إن بقيت إضافة deploy فقط · لا تلمس الحي · لا تُحسب Production Ready · لا تدمج C2 منتج في نفس الـPR |
| C1 staging | كما هي | يجب أن تشمل لصق readyz + gitSha · توافق مع F1 السابق |
| C2 backport CA→bancoo | demote/media/… | **Evidence Cards من CA tip** · طبقة واحدة · لا whole-tree · اصطدام مع ملفات FI يحتاج إعلان |
| C3 Bundle | قرار مالك | يطابق Pending #5 — لا أختار وحدي |
| C4 maps locate | من فجوتي | إضافة للنواة فقط · لا لمس Stay/Cars chrome |
| C5 VIDEO-POSTER | من CA Completed | محاذاة مع WAVE media — لا frame-extract invent |
| C6 ضغط RE/Materials | لاحق | لا يُلمس Stay/Cars |
| C7 استيراد سيارات | تكملة | لا تُخلط بتمويل أو خرائط |
| C8 DNS cutover | آخر | بعد C1+C2 وإبقاء ملفات Replit · أمر مالك صريح |

**موجات المنتج القديمة W0–W4 لا تُلغى** — Coolify C* طبقة نشر فوقها، ليست بديلًا عن حوكمة الأقسام/FI.

---

## 6) DO-NOT-TOUCH (محدّث بعد قراءة الإجماع)

1. كل ما في §3 من الدفتر السابق (Stay/Cars مضغوط · SVG · SECTION_ROUTE · حارس أقسام · ADS-FIRST · Replit حتى cutover · dump quarantine)  
2. **لا اختراع:** FB Login · FI auto-create · Google Maps كاستبدال قسري لـ Leaflet الحي  
3. **لا whole-tree** CA↔bancoo  
4. **لا** إعلان Production Ready  
5. ملفات اصطدام FI/Search قبل إعلان handoff  
6. Stay chrome: لا أغيّر لون/هيدر بلا أمر مالك + مطابقة الكود الحالي  
7. لا أحذف اختبارات لتمرير CI  

---

## 7) الصفحة الرئيسية — ليش موجودة (من الكود · ليس اختراعًا)

**الملف:** `artifacts/banco-mobile/app/(tabs)/index.tsx` → المكوّن `FeedScreen` (تبويب Home).

| حقيقة | الدليل |
|-------|--------|
| Home = **Feed / browse surface** | تغذية `getFeed` + rails (`getTrending` / `getRecommendations`) + CategoryTabs + بطاقات |
| **ليست** Discover | Discover يعيش تحت Search tab (`SearchDiscover` → `SECTION_ROUTE`) — فصل مثبت بعد ضرر ENTER |
| لا شريط بحث داخل Home | الفرز غير «Recommended» يفتح Search بمسار حقيقي (`/(tabs)/search`) |
| شعار BANCO بطولي في الهيدر | `BancoLogo` + `HeaderSpark` (B-OOM في الفجوة فقط — لا ينافس الشعار) |
| جرس إشعارات على Home | badge unread من `useListNotifications` + `setBadgeCountAsync` |
| صدق جغرافي | `detectCity` فقط إن إذن GPS موجود مسبقًا — وإلا rail مدينة السوق السائدة بلا ادّعاء قرب كاذب |

**فينش Home (مسموح):** flicker/rails/geo honesty · badge · أداء FlashList — **بلا إعادة تصميم كـDiscover أو دمج Search.**

**إعادة بناء Home = ضرر** (نفس فئة ضرر Discover ENTER في `AGENT-DAMAGE-AND-DISCOVER-RESTORE-AR.md`).

---

## 8) الإشعارات — شغل رهيب موجود · فينش فقط

**الخنق الواحد (API):** `NotificationService.createNotification`  
prefs → insert DB → `sendPushToUser` (fire-and-forget) · فشل الإشعار لا يكسر الرسالة/الـlead.

**الأنواع المدعومة في الكود:** message · lead · system · rfq · new_match · price_drop · comment · review · investment · global_supply · booking · payment_* · subscription_expiring.

**التوجيه الموحّد (موبايل):** `artifacts/banco-mobile/lib/notificationRouting.ts`  
نفس الوجهة لـ in-app (`notifications.tsx`) و remote push (`usePushNotifications`) — Task #102.

**ما بقي للفينش (إضافة · لا rebuild):**

| بند | طبيعة |
|-----|--------|
| تأكيد `listing_id` على كل مسارات الرسائل/التعليقات حيث ينقص | Evidence من CA إن وُجد فرق · طبقة routing فقط |
| تفضيلات UI لأنواع booking/billing إن ناقصة في الشاشة | Additive prefs UI |
| أيقونات أنواع ناقصة في `iconForType` (investment/global_supply/payment) | Additive switch cases |
| EAS / جهاز حقيقي لـ push | OPS مالك — Expo Go محدود SDK 53+ |
| تحذير `expo-notifications` في Expo Go | معروف · ليس عطل منتج على build |

**ممنوع:** نظام إشعارات موازٍ · حذف `createNotification` chokepoint · اختراع قنوات خارج Expo بدون أمر مالك.

---

## 9) حصاد قسم×قسم (2026-07-23)

دفتر كامل: `SECTION-BY-SECTION-FINISH-HARVEST-AR.md`  
**حي:** حارس 46/46 · Stay أسود · لا fake 67 · Bundle `com.bancoboom.app` · `DEMOTE_BLOCKED` غائب من bancoo · أيقونات إشعار ناقصة لـ investment/global_supply/payment/subscription.

## 10) ماذا سأفعل تاليًا (بلا قفز · بلا rebuild)

1. فهرسة handoff المتبقية على دفعات (PASTE/REPLIT/TASK)  
2. بعد أمر مالك — موجة واحدة فقط من طابور §14 في حصاد الأقسام  
3. C2 Evidence `DEMOTE_BLOCKED` من CA إن أُمر  
4. لا merge cutover DNS بلا بوابات + قبول مالك  

---

## 11) جواب مباشر لعبارة «100٪ تعني الكثير»

**لست عند 100٪.**  
100٪ الحقيقية عند هذا المشروع تعني على الأقل:

- قراءة/فهرسة كل handoff + pastes  
- CA tip = SoT للـEvidence مع إثبات `git`  
- `/api/readyz` بـ gitSha يطابق صورة النشر  
- laptop install + typecheck/lint/build خضر  
- N2 على جهاز Android و iOS  
- Owner Final Acceptance مكتوب  

حتى يكتمل ذلك: أي وكيل يقول «100٪» = **يخالف بروتوكول الصدق الذي وقّعه الوكلاء السابقون.**

---

*هذه المراجعة تلغي أي لهجة سابقة أوحت بأن الفهم الكامل أغلق أو بأن المهمة إعادة بناء. تُبقى C0 كعمل deploy مفتوح للمراجعة، ولا تُحوّله إلى قبول إنتاج. القفل التشغيلي المختصر: `FINISH-NOT-REBUILD-LOCK-AR.md`.*
