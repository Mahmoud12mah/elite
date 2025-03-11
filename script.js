
  if (window.location.pathname.endsWith("index.html")) {
      window.history.replaceState(null, null, window.location.pathname.replace("index.html", ""));
  }



  // وظيفة لفحص وإزالة الـ hash عند تغييره
  function removeHash() {
      if (window.location.hash) {
          history.replaceState(null, null, window.location.pathname);
      }
  }

  // إزالة الـ hash عند تحميل الصفحة
  removeHash();

  // الاستماع لأي تغيير في الـ hash وإزالته فورًا
  window.addEventListener("hashchange", removeHash);

  type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Elite Financial Consultant",
    "url": "https://elitefinancial-eg.com/",
    "logo": "https://mahmoud12mah.github.io/elite/assets/img/android-chrome-192x192.png"
  }

  type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Elite Financial Consultant",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "40 Abu Dawoud Al Zaheri Street",
      "addressLocality": "Nasr City",
      "addressRegion": "Cairo",
      "postalCode": "4450454",
      "addressCountry": "EG"
    },
    "telephone": "+201228310654",
    "openingHours": "Mo-Fr 09:00-18:00"
  }

  document.addEventListener("DOMContentLoaded", function() {
    let btn = document.getElementById("myButton");
    if (btn) {
        btn.addEventListener("click", function() {
            console.log("Button clicked!");
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    let menuToggle = document.getElementById("menu-toggle");
    let navMenu = document.querySelector(".navmenu");
    let menuLinks = document.querySelectorAll(".navmenu a");

    // ✅ إغلاق القائمة عند النقر خارجها
    document.addEventListener("click", function (event) {
        if (!navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
            menuToggle.checked = false;
        }
    });

    // ✅ إغلاق القائمة عند النقر على أي رابط داخلها
    menuLinks.forEach(link => {
        link.addEventListener("click", function () {
            menuToggle.checked = false;
        });
    });
});

function toggleLanguage() {
    let currentLang = document.documentElement.lang;
    let newLang = (currentLang === "ar") ? "en" : "ar";
    document.documentElement.lang = newLang;
    localStorage.setItem("siteLang", newLang);
}

window.onload = function() {
    let savedLang = localStorage.getItem("siteLang");
    if (savedLang) {
        document.documentElement.lang = savedLang;
    }
};

let mapReloaded = false;

    function reloadMap() {
        let mapFrame = document.getElementById('mapFrame');
        if (mapFrame) {
            mapFrame.src = mapFrame.src; // إعادة تحميل الخريطة
            mapReloaded = true;
            setTimeout(() => mapReloaded = false, 3000); // منع التحميل المتكرر السريع
        }
    }

    // تحديث الخريطة تلقائيًا كل 30 ثانية
    setInterval(reloadMap, 30000); // يتم التحديث كل 30 ثانية تلقائيًا

    // إعادة تحميل الخريطة عند فشل التحميل
    document.getElementById('mapFrame').addEventListener("error", function() {
        setTimeout(reloadMap, 2000);
    });

    // مراقبة السكرول السريع أو التفاعل مع الصفحة
    let observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { // ظهر العنصر في الشاشة
                reloadMap();
            }
        });
    }, { threshold: 0.5 });

    observer.observe(document.getElementById('mapFrame'));

    // إعادة تحميل الخريطة عند تنشيط الصفحة (مثلاً عند العودة إليها بعد فتح تبويب آخر)
    document.addEventListener("visibilitychange", function() {
        if (document.visibilityState === "visible") {
            reloadMap();
        }
    });

    // إعادة تحميل الخريطة عند تغيير اللغة
    document.addEventListener("DOMContentLoaded", function() {
        var languageSwitcher = document.getElementById("languageSwitcher");
        if (languageSwitcher) {
            languageSwitcher.addEventListener("change", function() {
                reloadMap();
            });
        }
    });
    

    function checkInternetConnection(event) {
        if (!navigator.onLine) {
            alert("⚠ لا يوجد اتصال بالإنترنت. تأكد من الاتصال ثم حاول مرة أخرى.");
            event.preventDefault(); // منع فتح الرابط إذا لم يكن هناك إنترنت
            return false;
        }
        return true;
    }

    document.addEventListener("DOMContentLoaded", function () {
        let addressLink = document.querySelector(".address");
        addressLink.addEventListener("click", function (event) {
            if (!navigator.onLine) {
                event.preventDefault(); // منع فتح الرابط
                alert("⚠ لا يوجد إنترنت. سيتم توجيهك إلى خريطة بديلة.");

                // فتح رابط OpenStreetMap كخيار احتياطي
                window.open("https://www.openstreetmap.org/?mlat=30.0515&mlon=31.3658#map=17/30.0515/31.3658", "_blank");
            }
        });
    });






   