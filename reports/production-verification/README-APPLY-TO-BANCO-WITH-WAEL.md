# صندوق بريد استرجاع SoT — ليس للنشر من bancoo

**الريبو الوحيد المعتمد:** `https://github.com/waelzaid66-max/banco-with-wael`  
**هوية الموبايل:** `com.bancooom.app`  
**لا تستخدم `bancoo` في Coolify.**

## تطبيق الحزم على SoT (بحساب يملك write)

```bash
git clone https://github.com/waelzaid66-max/banco-with-wael.git
cd banco-with-wael
git checkout -b cursor/production-gap-certification-5cf0 origin/main
git am path/to/sot-restitution-patches/*.patch
git push -u origin cursor/production-gap-certification-5cf0
```

ثم افتح PR إلى `main` على **banco-with-wael**.

ملفات `DEPLOYMENT_SOURCE_OF_TRUTH.md` و `53-*` و الشهادات هنا نسخة مطابقة لـ SoT للنقل فقط.
