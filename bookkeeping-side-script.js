// script for scrolling and menu interaction >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
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

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
document.getElementById("emailInput").addEventListener("input", function () {
    let email = this.value;
    let emailError = document.getElementById("emailError");
    let requestPriceButton = document.getElementById("requestPrice"); // الإشارة إلى الزر الصحيح

    // التحقق من صحة البريد الإلكتروني باستخدام regex
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        emailError.textContent = "الرجاء إدخال بريد إلكتروني صالح";
        requestPriceButton.disabled = true; // تعطيل زر "Request Price"
    } else {
        emailError.textContent = "";
        requestPriceButton.disabled = false; // تمكين الزر
    }
});

// script for phone code  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
document.addEventListener("DOMContentLoaded", function () {
    let dropdownButton = document.getElementById("dropdownButton");
    let dropdownList = document.getElementById("dropdownList");
    let phoneInput = document.getElementById("phoneInput");

    // عند الضغط على الزر، تظهر القائمة أو تختفي
    dropdownButton.addEventListener("click", function (event) {
        event.stopPropagation();
        dropdownList.style.display = dropdownList.style.display === "block" ? "none" : "block";
    });

    // عند اختيار دولة، يتم تحديث الرمز بجانب الرقم دون فرضه كقيمة المدخلة
    dropdownList.addEventListener("click", function (event) {
        let selectedItem = event.target.closest(".dropdown-item");
        if (!selectedItem) return;

        let code = selectedItem.getAttribute("data-code");
        let country = selectedItem.getAttribute("data-country");
        let flagCode = selectedItem.getAttribute("data-flag");

        document.getElementById("selectedCountry").innerText = `${code} (${country})`;
        document.getElementById("selectedFlag").src = `https://flagcdn.com/w40/${flagCode}.png`;

        // لا يتم فرض كود الدولة داخل حقل الإدخال، لكنه يبقى مرئيًا بجانب الإدخال
        phoneInput.setAttribute("data-code", code);

        dropdownList.style.display = "none";
    });

    // إغلاق القائمة عند النقر خارجها
    document.addEventListener("click", function (event) {
        if (!event.target.closest(".custom-dropdown")) {
            dropdownList.style.display = "none";
        }
    });
});

// script for checkboxes >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function toggleDropdown(dropdownId, checkbox) {
    let dropdown = document.getElementById(dropdownId);

    if (dropdown) {
        // إظهار أو إخفاء القائمة بناءً على حالة التشيك بوكس
        dropdown.style.display = checkbox.checked ? "block" : "none";
    }
}

// تشغيل القائمة المنسدلة فقط عند تحديد التشيك بوكس الأول
document.getElementById('checkbox1').addEventListener('change', function () {
    let dropdown1 = document.getElementById('dropdown1');
    let checkboxesGroup1 = document.querySelectorAll('#checkbox8, #checkbox9, #checkbox10, #checkbox11, #checkbox12, #checkbox13');

    if (this.checked) {
        dropdown1.style.display = 'block';

        // السماح فقط باختيار واحد من المجموعة (8-13)
        checkboxesGroup1.forEach(checkbox => {
            checkbox.addEventListener('change', function () {
                checkboxesGroup1.forEach(cb => {
                    if (cb !== this) {
                        cb.checked = false;
                    }
                });
            });
        });

    } else {
        dropdown1.style.display = 'none';

        // إلغاء تحديد جميع الخيارات من 8 إلى 13 عند إلغاء checkbox1
        checkboxesGroup1.forEach(checkbox => {
            checkbox.checked = false;
        });
    }
});

// السماح فقط باختيار واحد من كل مجموعة بشكل مستقل
function allowOnlyOneSelection(groupSelector) {
    let checkboxesGroup = document.querySelectorAll(groupSelector);

    checkboxesGroup.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            checkboxesGroup.forEach(cb => {
                if (cb !== this) {
                    cb.checked = false;
                }
            });
        });
    });
}

// تطبيق السماح باختيار واحد فقط لكل مجموعة
allowOnlyOneSelection('#checkbox1, #checkbox2');
allowOnlyOneSelection('#checkbox3, #checkbox4');

// script for language >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function toggleLanguage() {
    // الحصول على لغة الصفحة الحالية
    let currentLang = document.documentElement.lang;

    // التبديل بين "ar" و "en"
    let newLang = (currentLang === "ar") ? "en" : "ar";

    // تعيين اللغة الجديدة
    document.documentElement.lang = newLang;

    // حفظ اللغة الجديدة في localStorage حتى لا تختفي عند إعادة تحميل الصفحة
    localStorage.setItem("siteLang", newLang);
}

// عند تحميل الصفحة، تأكد أن اللغة المحفوظة يتم تطبيقها
window.onload = function () {
    let savedLang = localStorage.getItem("siteLang");
    if (savedLang) {
        document.documentElement.lang = savedLang;
    }
};

// script for form sending data to emailjs  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>
document.addEventListener("DOMContentLoaded", function () {
    emailjs.init("YE7phgS6i3fiqXi09");

    let form = document.getElementById("requestForm");
    let responseElement = document.getElementById("responseMessage");
    let requestButton = document.getElementById("requestPrice");
    let phoneInput = document.querySelector("input[name='mobile']");
    let visitsInput = document.querySelector("input[name='TherequiredNumberofvisitspermonth']");
    let inputs = document.querySelectorAll("input[required], textarea, select");

    function validateForm() {
        let isValid = true;
        responseElement.innerHTML = "";
        responseElement.style.display = "none";

        inputs.forEach(input => {
            let errorMessage = input.nextElementSibling;
            if (!input.value.trim()) {
                input.classList.add("input-error");
                if (!errorMessage || !errorMessage.classList.contains("error-message")) {
                    errorMessage = document.createElement("div");
                    errorMessage.classList.add("error-message");
                    errorMessage.textContent = "هذا الحقل مطلوب*";
                    input.parentNode.insertBefore(errorMessage, input.nextSibling);
                }
                isValid = false;
            }
        });

        // التحقق من عدد الزيارات المطلوبة شهريًا
        if (!visitsInput.value.trim()) {
            visitsInput.classList.add("input-error");
            let errorMessage = visitsInput.nextElementSibling;
            if (!errorMessage || !errorMessage.classList.contains("error-message")) {
                errorMessage = document.createElement("div");
                errorMessage.classList.add("error-message");
                errorMessage.textContent = "هذا الحقل مطلوب*";
                visitsInput.parentNode.insertBefore(errorMessage, visitsInput.nextSibling);
            }
            isValid = false;
        } else {
            visitsInput.classList.remove("input-error");
            let errorMessage = visitsInput.nextElementSibling;
            if (errorMessage && errorMessage.classList.contains("error-message")) {
                errorMessage.remove();
            }
        }

        let checkboxes = document.querySelectorAll("input[name='services[]']");
        let isChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);
        if (!isChecked) {
            checkboxes.forEach(checkbox => checkbox.closest("label").classList.add("checkbox-error"));
            isValid = false;
        } else {
            checkboxes.forEach(checkbox => checkbox.closest("label").classList.remove("checkbox-error"));
        }

        if (!isValid) {
            responseElement.innerHTML = '<div class="alert-danger">جميع الحقول مطلوبة! ❌</div>';
            responseElement.style.display = "block";
        }

        return isValid;
    }

    function sendEmail(event) {
        event.preventDefault();
        if (!validateForm()) return;

        let formData = new FormData(form);
        let data = {};
        formData.forEach((value, key) => { data[key] = value; });

        let countryCodeElement = document.getElementById("selectedCountry");
        let countryCode = countryCodeElement ? countryCodeElement.textContent.trim().split(" ")[0].replace(/\D/g, '') : "";
        let phoneNumber = phoneInput ? phoneInput.value.trim().replace(/\D/g, '') : "";

        if (countryCode) {
            data["phonecode"] = parseInt(countryCode, 10);
        }
        if (phoneNumber) {
            data["mobile"] = phoneNumber;
            data["full_phone"] = `+${countryCode} ${phoneNumber}`;
        }

        if (visitsInput) {
            data["TherequiredNumberofvisitspermonth"] = visitsInput.value.trim();
        }

        let selectedServices = [];
        document.querySelectorAll("input[name='services[]']:checked").forEach(service => {
            selectedServices.push(service.value);
        });
        data["services"] = selectedServices.join(", ");

        data["source_page"] = window.location.pathname.split("/").pop() || "Unknown";

        console.log("📤 البيانات المرسلة:", data);
        localStorage.setItem("formData", JSON.stringify(data));

        emailjs.send("service_0p0gln7", "template_atz2wa9", data)
            .then(function (response) {
                console.log("✅ تم الإرسال بنجاح", response);
                responseElement.innerHTML = '<div class="alert-success">تم إرسال الطلب بنجاح! ✅</div>';
                responseElement.style.display = "block";
                setTimeout(() => { responseElement.style.display = "none"; }, 5000);
                localStorage.setItem("formSubmitted", "true");
                setTimeout(() => { window.location.href = "sent.html"; }, 2000);
            }, function (error) {
                console.error("❌ فشل الإرسال", error);
                responseElement.innerHTML = '<div class="alert-danger">فشل إرسال الطلب، حاول مرة اخرى! ❌: ' + error.text + '</div>';
                responseElement.style.display = "block";
                setTimeout(() => { responseElement.style.display = "none"; }, 5000);
            });
    }

    if (requestButton) {
        requestButton.addEventListener("click", sendEmail);
    }

    inputs.forEach(input => {
        input.addEventListener("input", function () {
            let errorMessage = input.nextElementSibling;
            if (input.value.trim()) {
                input.classList.remove("input-error");
                if (errorMessage && errorMessage.classList.contains("error-message")) {
                    errorMessage.remove();
                }
            } else {
                if (!errorMessage || !errorMessage.classList.contains("error-message")) {
                    errorMessage = document.createElement("div");
                    errorMessage.classList.add("error-message");
                    errorMessage.textContent = "هذا الحقل مطلوب*";
                    input.parentNode.insertBefore(errorMessage, input.nextSibling);
                }
                input.classList.add("input-error");
            }
        });
    });

    let checkboxes = document.querySelectorAll("input[name='services[]']");
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", function () {
            if (checkbox.checked) {
                checkboxes.forEach(box => box.closest("label").classList.remove("checkbox-error"));
            }
        });
    });

    // إزالة أو عرض رسالة الخطأ عند إدخال عدد الزيارات أو حذفه
    visitsInput.addEventListener("input", function () {
        let errorMessage = visitsInput.nextElementSibling;
        if (visitsInput.value.trim()) {
            visitsInput.classList.remove("input-error");
            if (errorMessage && errorMessage.classList.contains("error-message")) {
                errorMessage.remove();
            }
        } else {
            if (!errorMessage || !errorMessage.classList.contains("error-message")) {
                errorMessage = document.createElement("div");
                errorMessage.classList.add("error-message");
                errorMessage.textContent = "هذا الحقل مطلوب*";
                visitsInput.parentNode.insertBefore(errorMessage, visitsInput.nextSibling);
            }
            visitsInput.classList.add("input-error");
        }
    });
});

// script for movement >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
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
    const aboutLink = document.getElementById("About56");

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
    const servicesLink = document.getElementById("Services50");

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
    const servicesLink = document.getElementById("Services51");

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
    const servicesLink = document.getElementById("Services52");

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
    const servicesLink = document.getElementById("Services53");

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
    const servicesLink = document.getElementById("Services54");

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
    const servicesLink = document.getElementById("Services55");

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
    const contactLink = document.getElementById("Contact57");

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