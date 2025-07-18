// script for header behavior
window.addEventListener('scroll', function () {
    if (window.scrollY > 10) {
        document.body.classList.add('scrolled');
    } else {
        document.body.classList.remove('scrolled');
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

// script for movement >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
document.addEventListener("DOMContentLoaded", function () {
    const contactLink = document.getElementById("services111");

    if (contactLink) {
        contactLink.addEventListener("click", function (event) {
            event.preventDefault(); // منع التنقل الافتراضي

            // حفظ المعلومة بأن المستخدم يريد الانتقال إلى "contact"
            sessionStorage.setItem("scrollToSection", "services");

            // تحويل المستخدم إلى الصفحة الرئيسية
            window.location.href = "index.html";
        });
    }

    // تنفيذ السكروول بعد الوصول للصفحة الرئيسية
    const scrollTo = sessionStorage.getItem("scrollToSection");
    if (scrollTo) {
        const targetElement = document.getElementById(scrollTo);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth" });
        }
        sessionStorage.removeItem("scrollToSection");
    }
});



document.addEventListener("DOMContentLoaded", function () {
    const contactLink = document.getElementById("services112");

    if (contactLink) {
        contactLink.addEventListener("click", function (event) {
            event.preventDefault(); // منع التنقل الافتراضي

            // حفظ المعلومة بأن المستخدم يريد الانتقال إلى "contact"
            sessionStorage.setItem("scrollToSection", "services");

            // تحويل المستخدم إلى الصفحة الرئيسية
            window.location.href = "index.html";
        });
    }

    // تنفيذ السكروول بعد الوصول للصفحة الرئيسية
    const scrollTo = sessionStorage.getItem("scrollToSection");
    if (scrollTo) {
        const targetElement = document.getElementById(scrollTo);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth" });
        }
        sessionStorage.removeItem("scrollToSection");
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const contactLink = document.getElementById("services113");

    if (contactLink) {
        contactLink.addEventListener("click", function (event) {
            event.preventDefault(); // منع التنقل الافتراضي

            // حفظ المعلومة بأن المستخدم يريد الانتقال إلى "contact"
            sessionStorage.setItem("scrollToSection", "services");

            // تحويل المستخدم إلى الصفحة الرئيسية
            window.location.href = "index.html";
        });
    }

    // تنفيذ السكروول بعد الوصول للصفحة الرئيسية
    const scrollTo = sessionStorage.getItem("scrollToSection");
    if (scrollTo) {
        const targetElement = document.getElementById(scrollTo);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth" });
        }
        sessionStorage.removeItem("scrollToSection");
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const contactLink = document.getElementById("services114");

    if (contactLink) {
        contactLink.addEventListener("click", function (event) {
            event.preventDefault(); // منع التنقل الافتراضي

            // حفظ المعلومة بأن المستخدم يريد الانتقال إلى "contact"
            sessionStorage.setItem("scrollToSection", "services");

            // تحويل المستخدم إلى الصفحة الرئيسية
            window.location.href = "index.html";
        });
    }

    // تنفيذ السكروول بعد الوصول للصفحة الرئيسية
    const scrollTo = sessionStorage.getItem("scrollToSection");
    if (scrollTo) {
        const targetElement = document.getElementById(scrollTo);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth" });
        }
        sessionStorage.removeItem("scrollToSection");
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const contactLink = document.getElementById("services115");

    if (contactLink) {
        contactLink.addEventListener("click", function (event) {
            event.preventDefault(); // منع التنقل الافتراضي

            // حفظ المعلومة بأن المستخدم يريد الانتقال إلى "contact"
            sessionStorage.setItem("scrollToSection", "services");

            // تحويل المستخدم إلى الصفحة الرئيسية
            window.location.href = "index.html";
        });
    }

    // تنفيذ السكروول بعد الوصول للصفحة الرئيسية
    const scrollTo = sessionStorage.getItem("scrollToSection");
    if (scrollTo) {
        const targetElement = document.getElementById(scrollTo);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth" });
        }
        sessionStorage.removeItem("scrollToSection");
    }
});



document.addEventListener("DOMContentLoaded", function () {
    const contactLink = document.getElementById("services116");

    if (contactLink) {
        contactLink.addEventListener("click", function (event) {
            event.preventDefault(); // منع التنقل الافتراضي

            // حفظ المعلومة بأن المستخدم يريد الانتقال إلى "contact"
            sessionStorage.setItem("scrollToSection", "services");

            // تحويل المستخدم إلى الصفحة الرئيسية
            window.location.href = "index.html";
        });
    }

    // تنفيذ السكروول بعد الوصول للصفحة الرئيسية
    const scrollTo = sessionStorage.getItem("scrollToSection");
    if (scrollTo) {
        const targetElement = document.getElementById(scrollTo);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth" });
        }
        sessionStorage.removeItem("scrollToSection");
    }
});



document.addEventListener("DOMContentLoaded", function () {
    const contactLink = document.getElementById("FooterContact");

    if (contactLink) {
        contactLink.addEventListener("click", function (event) {
            event.preventDefault(); // منع التنقل الافتراضي

            // حفظ المعلومة بأن المستخدم يريد الانتقال إلى "contact"
            sessionStorage.setItem("scrollToSection", "contact");

            // تحويل المستخدم إلى الصفحة الرئيسية
            window.location.href = "index.html";
        });
    }

    // تنفيذ السكروول بعد الوصول للصفحة الرئيسية
    const scrollTo = sessionStorage.getItem("scrollToSection");
    if (scrollTo) {
        const targetElement = document.getElementById(scrollTo);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth" });
        }
        sessionStorage.removeItem("scrollToSection");
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const contactLink = document.getElementById("Footerabout");

    if (contactLink) {
        contactLink.addEventListener("click", function (event) {
            event.preventDefault(); // منع التنقل الافتراضي

            // حفظ المعلومة بأن المستخدم يريد الانتقال إلى "contact"
            sessionStorage.setItem("scrollToSection", "about");

            // تحويل المستخدم إلى الصفحة الرئيسية
            window.location.href = "index.html";
        });
    }

    // تنفيذ السكروول بعد الوصول للصفحة الرئيسية
    const scrollTo = sessionStorage.getItem("scrollToSection");
    if (scrollTo) {
        const targetElement = document.getElementById(scrollTo);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth" });
        }
        sessionStorage.removeItem("scrollToSection");
    }
});



document.addEventListener("DOMContentLoaded", function () {
    const contactLink = document.getElementById("FooterHome");

    if (contactLink) {
        contactLink.addEventListener("click", function (event) {
            event.preventDefault(); // منع التنقل الافتراضي



            // تحويل المستخدم إلى الصفحة الرئيسية
            window.location.href = "index.html";
        });
    }

    // تنفيذ السكروول بعد الوصول للصفحة الرئيسية
    const scrollTo = sessionStorage.getItem("scrollToSection");
    if (scrollTo) {
        const targetElement = document.getElementById(scrollTo);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth" });
        }
        sessionStorage.removeItem("scrollToSection");
    }
});





document.addEventListener("DOMContentLoaded", function () {
    const External = document.getElementById("External");
    if (External) {
        External.addEventListener("click", function (event) {
            event.preventDefault();
            setTimeout(function () {
                window.location.href = "External Audit.html";
            }, 500);
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const Home = document.getElementById("Home");
    if (Home) {
        Home.addEventListener("click", function (event) {
            event.preventDefault();
            setTimeout(function () {
                window.location.href = "index.html";
            }, 500);
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const aboutLink = document.getElementById("About");

    if (aboutLink) {
        aboutLink.addEventListener("click", function (event) {
            event.preventDefault(); // منع السلوك الافتراضي

            // حفظ المعلومة بأن المستخدم يريد الانتقال إلى "about"
            sessionStorage.setItem("scrollToSection", "about");

            // توجيه المستخدم إلى الصفحة الرئيسية
            window.location.href = "index.html";
        });
    }
});



document.addEventListener("DOMContentLoaded", function () {
    const servicesLink = document.getElementById("Services");

    if (servicesLink) {
        servicesLink.addEventListener("click", function (event) {
            event.preventDefault(); // منع السلوك الافتراضي

            // حفظ المعلومة بأن المستخدم يريد الانتقال إلى "about"
            sessionStorage.setItem("scrollToSection", "services");

            // توجيه المستخدم إلى الصفحة الرئيسية
            window.location.href = "index.html";
        });
    }
});



document.addEventListener("DOMContentLoaded", function () {
    const contactLink = document.getElementById("Contact");

    if (contactLink) {
        contactLink.addEventListener("click", function (event) {
            event.preventDefault(); // منع السلوك الافتراضي

            // حفظ المعلومة بأن المستخدم يريد الانتقال إلى "about"
            sessionStorage.setItem("scrollToSection", "contact");

            // توجيه المستخدم إلى الصفحة الرئيسية
            window.location.href = "index.html";
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const Book = document.getElementById("Book");
    if (Book) {
        Book.addEventListener("click", function (event) {
            event.preventDefault();
            setTimeout(function () {
                window.location.href = "BookKeeping.html";
            }, 500);
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const CompanyIncorporation = document.getElementById("CompanyIncorporation");
    if (CompanyIncorporation) {
        CompanyIncorporation.addEventListener("click", function (event) {
            event.preventDefault();
            setTimeout(function () {
                window.location.href = "CompanyIncorporation.html";
            }, 500);
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const Taxes = document.getElementById("Taxes");
    if (Taxes) {
        Taxes.addEventListener("click", function (event) {
            event.preventDefault();
            setTimeout(function () {
                window.location.href = "Taxes.html";
            }, 500);
        });
    }
});


document.addEventListener("DOMContentLoaded", function () {
    let logoURL = "https://elitefinancial-eg.com/assets/img/logo.png"; // رابط اللوجو

    document.querySelectorAll("img").forEach(img => {
        if (!img.src || img.src.trim() === "") {
            img.src = logoURL;
            img.alt = "Elite Financial Consultant Logo";
        }
    });
});