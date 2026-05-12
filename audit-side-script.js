// scroll script >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>// سكربت التمرير
window.addEventListener('scroll', function () {
    if (window.scrollY > 10) {
        document.body.classList.add('scrolled');
    } else {
        document.body.classList.remove('scrolled');
    }
});

// email validation >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>// التحقق من صحة البريد الإلكتروني
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

// scrript for phone code >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>// سكربت رمز الهاتف
document.addEventListener("DOMContentLoaded", function () {
    let dropdownButton = document.getElementById("dropdownButton");
    let dropdownList = document.getElementById("dropdownList");
    let phoneInput = document.getElementById("phoneInput");

    // عند الضغط على الزر، تظهر القائمة أو تختفي
    dropdownButton.addEventListener("click", function (event) {
        event.stopPropagation();
        dropdownList.style.display = dropdownList.style.display === "block" ? "none" : "block";
    });

    // عند اختيار دولة، يتم تحديث الرقم والرمز وإغلاق القائمة
    dropdownList.addEventListener("click", function (event) {
        let selectedItem = event.target.closest(".dropdown-item");
        if (!selectedItem) return;

        let code = selectedItem.getAttribute("data-code");
        let country = selectedItem.getAttribute("data-country");
        let flagCode = selectedItem.getAttribute("data-flag");

        document.getElementById("selectedCountry").innerText = `${code} (${country})`;
        document.getElementById("selectedFlag").src = `https://flagcdn.com/w40/${flagCode}.png`;
        phoneInput.value = code;

        dropdownList.style.display = "none";
    });

    // إغلاق القائمة عند النقر خارجها
    document.addEventListener("click", function (event) {
        if (!event.target.closest(".custom-dropdown")) {
            dropdownList.style.display = "none";
        }
    });
});

// check list dropdown >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>// سكربت قائمة التحقق
function toggleDropdown(dropdownId, checkbox) {
    let dropdown = document.getElementById(dropdownId);
    if (dropdown) {
        dropdown.style.display = checkbox.checked ? "block" : "none";
    }
}

// checkboxes for the dropdown >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>// سكربت مربعات الاختيار للقائمة المنسدلة
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

// تطبيق الدالة على كل المجموعات
document.addEventListener("DOMContentLoaded", function () {
    allowOnlyOneSelection('#checkbox42, #checkbox43, #checkbox44, #checkbox45');
    allowOnlyOneSelection('#checkbox53, #checkbox54, #checkbox55, #checkbox56, #checkbox57, #checkbox58');
    allowOnlyOneSelection('#checkbox61, #checkbox62');
    allowOnlyOneSelection('#checkbox63, #checkbox64');
    allowOnlyOneSelection('#checkbox65, #checkbox66');
    allowOnlyOneSelection('#checkbox67, #checkbox68');
    allowOnlyOneSelection('#checkbox69, #checkbox70');
    allowOnlyOneSelection('#checkbox46, #checkbox47, #checkbox48, #checkbox49, #checkbox50, #checkbox51, #checkbox52');
});

// script for language validation >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>// سكربت التحقق من اللغة
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

// script for sending data to emailjs >>>>>>>>>>>>>>>>>>>>>>>>>>>>>// سكربت إرسال البيانات إلى emailjs

document.addEventListener("DOMContentLoaded", function () {
    emailjs.init("YE7phgS6i3fiqXi09");

    let responseElement = document.getElementById("responseMessage");
    let requestButton = document.getElementById("requestPrice");
    let inputs = document.querySelectorAll("input[required], textarea, select");
    let checkboxes = document.querySelectorAll("input[name='services[]']");
    let phoneInput = document.querySelector("input[name='mobile']");

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
                    errorMessage.textContent = "This field is required*";
                    input.parentNode.insertBefore(errorMessage, input.nextSibling);
                }
                isValid = false;
            }
        });

        let isChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);
        if (!isChecked) {
            checkboxes.forEach(checkbox => checkbox.closest("label").classList.add("checkbox-error"));
            isValid = false;
        } else {
            checkboxes.forEach(checkbox => checkbox.closest("label").classList.remove("checkbox-error"));
        }

        if (!isValid) {
            responseElement.innerHTML = '<div class="alert-danger">All fields are required! ❌</div>';
            responseElement.style.display = "block";
        }

        return isValid;
    }

    async function sendEmail(event) {
        event.preventDefault();
        if (!validateForm()) return;

        // إعداد البيانات
        let formData = {};
        inputs.forEach(input => {
            formData[input.name] = input.value.trim();
        });

        // تحديد كود الدولة
        let selectedCountryElement = document.getElementById("selectedCountry");
        if (selectedCountryElement) {
            let countryCode = selectedCountryElement.innerText.split(" ")[0].replace(/\D/g, '');
            formData["phonecode"] = countryCode ? parseInt(countryCode, 10) : "";
        }

        if (phoneInput) {
            let phoneNumber = phoneInput.value.trim().replace(/\D/g, '');
            formData["mobile"] = phoneNumber;
            formData["full_phone"] = `+${formData["phonecode"]} ${phoneNumber}`;
        }

        // الخدمات
        let selectedServices = [];
        checkboxes.forEach(service => {
            if (service.checked) selectedServices.push(service.value);
        });
        formData["services"] = selectedServices.join(", ");
        formData["source_page"] = window.location.pathname.split("/").pop() || "Unknown";

        // التحقق من الاسم والبريد الإلكتروني
        const nameInput = formData["name"];
        const emailInput = formData["email"];

        // ✅ تحقق طول الاسم الكلي
        if (nameInput.length < 2 || nameInput.length > 40) {
            responseElement.innerHTML = '<div class="alert alert-danger">❌ يرجى إدخال اسم صحيح (بين 2 و 40 حرفًا).</div>';
            responseElement.style.display = "block";
            return;
        }

        // ✅ تحقق من تكرار الحروف داخل كل مقطع
        const partsForRepeatCheck = nameInput.split(" ").filter(Boolean);
        for (const part of partsForRepeatCheck) {
            const counts = {};
            for (const char of part) {
                const lowerChar = char.toLowerCase();
                if (!/[a-zA-Zأ-ي]/.test(lowerChar)) continue;
                counts[lowerChar] = (counts[lowerChar] || 0) + 1;
                if (counts[lowerChar] > 3) {
                    responseElement.innerHTML = `<div class="alert alert-danger">❌ المقطع "${part}" يحتوي على تكرار مفرط للحرف "${char}".</div>`;
                    responseElement.style.display = "block";
                    return;
                }
            }
        }

        // ✅ منع الرموز أو الأرقام
        const invalidNamePattern = /[^a-zA-Zأ-ي\s]/;
        if (invalidNamePattern.test(nameInput)) {
            responseElement.innerHTML = '<div class="alert alert-danger">❌ يرجى إدخال اسم حقيقي بدون رموز أو أرقام.</div>';
            responseElement.style.display = "block";
            return;
        }

        // ✅ يجب أن يحتوي الاسم على أكثر من مقطع
        if (!nameInput.includes(" ")) {
            responseElement.innerHTML = '<div class="alert alert-danger">❌ يرجى إدخال الاسم الكامل (مثلاً: محمد علي).</div>';
            responseElement.style.display = "block";
            return;
        }

        // ✅ كل مقطع ≤ 12 حرف
        const parts = nameInput.split(" ").filter(Boolean);
        const longPart = parts.find(part => part.length > 12);
        if (longPart) {
            responseElement.innerHTML = `<div class="alert alert-danger">❌ المقطع "${longPart}" طويل جدًا، يجب ألا يتجاوز 12 حرفًا.</div>`;
            responseElement.style.display = "block";
            return;
        }

        // ✅ التحقق من البريد الإلكتروني الحقيقي باستخدام Abstract API
        const apiKey = "8f5ad0dca22649f681ca4bbbb7dca4c8";
        responseElement.innerHTML = '<div class="alert alert-info">⏳ جاري إرسال النموذج...</div>';
        responseElement.style.display = "block";

        try {
            const res = await fetch(`https://emailreputation.abstractapi.com/v1/?api_key=${apiKey}&email=${emailInput}`);
            const data = await res.json();

            if (!data.email_deliverability || data.email_deliverability.status !== "deliverable") {
                responseElement.innerHTML = '<div class="alert alert-danger">❌ يرجى إدخال بريد إلكتروني حقيقي وقابل للاستلام.</div>';
                responseElement.style.display = "block";
                return;
            }

            // ✅ البريد صالح، أرسل الآن
            console.log("📤 البيانات المرسلة:", formData);
            localStorage.setItem("formData", JSON.stringify(formData));

            const response = await emailjs.send("service_0p0gln7", "template_atz2wa9", formData);
            console.log("✅ تم الإرسال بنجاح", response);
            responseElement.innerHTML = '<div class="alert-success">تم إرسال الطلب بنجاح! ✅</div>';
            responseElement.style.display = "block";
            localStorage.setItem("formSubmitted", "true");

            setTimeout(() => {
                window.location.href = "sent.html";
            }, 2000);
        } catch (error) {
            console.error("❌ فشل الإرسال", error);
            responseElement.innerHTML = '<div class="alert-danger">❌ فشل إرسال الطلب، حاول مرة أخرى.</div>';
            responseElement.style.display = "block";
        }
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
                input.classList.add("input-error");
                if (!errorMessage || !errorMessage.classList.contains("error-message")) {
                    errorMessage = document.createElement("div");
                    errorMessage.classList.add("error-message");
                    errorMessage.textContent = "This field is required*";
                    input.parentNode.insertBefore(errorMessage, input.nextSibling);
                }
            }
        });
    });

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", function () {
            if (checkbox.checked) {
                checkboxes.forEach(box => box.closest("label").classList.remove("checkbox-error"));
            }
        });
    });
});



// script for movement >>>>>>>>>>>>>>>>>>>>>>>>>>>>>// سكربت الحركة
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
