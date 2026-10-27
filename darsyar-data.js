/* داده‌های سامانه درس‌یار
   افزودن درس یا پودمان جدید فقط با گسترش همین ساختار انجام می‌شود؛
   صفحه‌های اصلی و درس از روی داده رندر می‌شوند و نیازی به بازنویسی ندارند. */
"use strict";

const DARSYAR = {
  courses: [
    {
      id: "danesh-fani",
      title: "دانش فنی",
      icon: "⚙️",
      desc: "یادگیری مفاهیم فنی، اصطلاحات تخصصی و واژگان مرتبط با رشته تحصیلی",
      page: "danesh-fani.html",
      modules: [
        {
          id: "danesh-fani-p1",
          title: "پودمان اول",
          desc: "یادگیری واژگان و جملات تخصصی انگلیسی همراه با ترجمه و تلفظ",
          status: "ready",
          page: "podman-1.html",
          progressKey: "elq_learned",
          total: 94
        },
        { id: "danesh-fani-p2", title: "پودمان دوم", status: "coming" },
        { id: "danesh-fani-p3", title: "پودمان سوم", status: "coming" },
        { id: "danesh-fani-p4", title: "پودمان چهارم", status: "coming" },
        { id: "danesh-fani-p5", title: "پودمان پنجم", status: "coming" }
      ]
    }
  ]
};

/* پیشرفت واقعی یک پودمان از localStorage خوانده می‌شود */
function darsyarPodmanProgress(mod){
  if (mod.status !== "ready") return null;
  let learned = 0;
  try {
    learned = Object.keys(JSON.parse(localStorage.getItem(mod.progressKey) || "{}")).length;
  } catch (e) { learned = 0; }
  const total = mod.total || 0;
  return { learned, total, pct: total ? Math.round((learned / total) * 100) : 0 };
}

/* پیشرفت کلی: مجموع همه پودمان‌های آماده */
function darsyarOverallProgress(course){
  let learned = 0, total = 0;
  course.modules.forEach(mod => {
    const p = darsyarPodmanProgress(mod);
    if (p){ learned += p.learned; total += p.total; }
  });
  return { learned, total, pct: total ? Math.round((learned / total) * 100) : 0 };
}
