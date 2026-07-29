# قفل FINISH · ممنوع REBUILD

**تاريخ:** 2026-07-23  
**مصدر:** أمر المالك المباشر لهذا الوكيل — فينش اللمسات الأخيرة + إطلاق كامل · ممنوع إعادة بناء شيء.

---

## 1) الفهم الملزم

1. صيانات سابقة **حصلت** — لا نبدأ من صفر.  
2. النسخة الأخيرة على الريبو الموجَّه كانت هدف **أقوى خط مستقر**.  
3. مهمة هذا الوكيل: **فينش · تجميع · إطلاق** — ثم تحسين/تكميل.  
4. **ممنوع** إعادة بناء Home / Notifications / أقسام / Auth / Ads / FI من الصفر.  
5. أي فهم سابق أوحى بـ greenfield أو «نعيد تصميم المنصة» = **خطأ يُنسى فورًا**.

---

## 2) Home — الغرض (لا تخلطه مع Discover)

| السطح | الملف | الوظيفة |
|-------|--------|---------|
| **Home tab** | `(tabs)/index.tsx` → `FeedScreen` | فيد + rails + فئات + دخول للإشعارات/الفرز |
| **Discover** | داخل Search → `SearchDiscover` | بوابات صور 2×2 → `SECTION_ROUTE` ميني-آب |

Home **ليست** بوابة الأقسام. تحويلها لـDiscover أو دمجها مع Search = نفس فئة ضرر ENTER التاريخي.

**فينش مسموح:** صدق جغرافي · badge · rails · أداء · flicker.  
**ممنوع:** redesign كامل · إضافة شريط بحث يذيب الأقسام · مسح CategoryTabs/rails.

---

## 3) Notifications — البنية القوية (لا تُستبدل)

```text
حدث منتج → createNotification → prefs mute؟ → DB row → Expo push (best-effort)
                                      ↓
                    notifications.tsx + usePushNotifications
                                      ↓
                         routeForNotification (مصدر واحد)
```

**فينش مسموح:** إكمال أيقونات/prefs/listing_id routing · EAS push على جهاز.  
**ممنوع:** chokepoint جديد · قناة push موازية بلا أمر · حذف أنواع موجودة.

---

## 4) Checklist قبل أي PR يمس منتج

- [ ] هل هذا إصلاح مثبت بـ `ملف:سطر`؟  
- [ ] هل Additive only؟  
- [ ] هل يلمس Stay/Cars chrome المضغوط أو SECTION_ROUTE أو ADS-FIRST؟ → توقف  
- [ ] هل يبدو «إعادة كتابة سطح»؟ → **ارفض · اسأل المالك**  
- [ ] هل يدّعي Production Ready من Coolify وحده؟ → **كذب**

---

## 5) إشارة سريعة للدفتر الكامل

التفاصيل والأمواج C0–C8 + DO-NOT-TOUCH: `MASTER-ARCHITECT-LEDGER-AR.md` §−1 · §6–§9.

— Cursor · Finish lock · Owner order 2026-07-23
