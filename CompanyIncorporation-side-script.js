// script for scrolling and navigation bar functionality
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

// script for email validation >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
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

// script for phone code validation >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
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

// script for sheet language >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
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

// script for checkbox >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
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
allowOnlyOneSelection('#checkbox1, #checkbox2, #checkbox3, #checkbox4, #checkbox5, #checkbox6');
allowOnlyOneSelection('#checkbox7, #checkbox8');

// script for sending data to emailjs to send email >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
document.addEventListener("DOMContentLoaded", function () {
    emailjs.init("YE7phgS6i3fiqXi09");

    let responseElement = document.getElementById("responseMessage");
    let requestButton = document.getElementById("requestPrice");
    let inputs = document.querySelectorAll("input[required], textarea, select, input[name='Companycapital']");
    let checkboxes = document.querySelectorAll("input[name='services[]']");
    let phoneInput = document.querySelector("input[name='mobile']");
    let companyCapitalInput = document.querySelector("input[name='Companycapital']");

    function validateForm() {
        let isValid = true;
        responseElement.innerHTML = "";
        responseElement.style.display = "none";

        // ✅ تحقق من الحقول الفارغة
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

        // ✅ تحقق من اختيار الخدمات
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

        let data = {};
        inputs.forEach(input => {
            data[input.name] = input.value.trim();
        });

        // ✅ تحقق الاسم
        const nameInput = data["name"];
        const emailInput = data["email"];

        if (nameInput.length < 2 || nameInput.length > 40) {
            responseElement.innerHTML = '<div class="alert alert-danger">❌ يرجى إدخال اسم صحيح (بين 2 و 40 حرفًا).</div>';
            responseElement.style.display = "block";
            return;
        }

        // ✅ لا تكرار الحروف أكثر من 3 مرات في المقطع
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

        // ✅ عرض "جاري إرسال النموذج..."
        responseElement.innerHTML = '<div class="alert alert-info">⏳ جاري إرسال النموذج...</div>';
        responseElement.style.display = "block";

        // ✅ التحقق من البريد الإلكتروني باستخدام Abstract API
        const apiKey = "8f5ad0dca22649f681ca4bbbb7dca4c8";

        try {
            const res = await fetch(`https://emailreputation.abstractapi.com/v1/?api_key=${apiKey}&email=${emailInput}`);
            const dataEmail = await res.json();

            if (!dataEmail.email_deliverability || dataEmail.email_deliverability.status !== "deliverable") {
                responseElement.innerHTML = '<div class="alert alert-danger">❌ يرجى إدخال بريد إلكتروني حقيقي وقابل للاستلام.</div>';
                responseElement.style.display = "block";
                return;
            }
        } catch (error) {
            console.error("❌ خطأ أثناء التحقق من البريد:", error);
            responseElement.innerHTML = '<div class="alert alert-danger">❌ حدث خطأ أثناء التحقق من البريد الإلكتروني.</div>';
            responseElement.style.display = "block";
            return;
        }

        // ✅ تجهيز باقي البيانات
        let selectedCountryElement = document.getElementById("selectedCountry");
        if (selectedCountryElement) {
            let countryCode = selectedCountryElement.innerText.split(" ")[0].replace(/\D/g, '');
            data["phonecode"] = countryCode ? parseInt(countryCode, 10) : "";
        }

        if (phoneInput) {
            let phoneNumber = phoneInput.value.trim().replace(/\D/g, '');
            data["mobile"] = phoneNumber;
            data["full_phone"] = `+${data["phonecode"]} ${phoneNumber}`;
        }

        let selectedServices = [];
        checkboxes.forEach(service => {
            if (service.checked) selectedServices.push(service.value);
        });
        data["services"] = selectedServices.join(", ");

        data["source_page"] = window.location.pathname.split("/").pop() || "Unknown";

        console.log("📤 البيانات المرسلة:", data);
        localStorage.setItem("formData", JSON.stringify(data));

        // ✅ إرسال الإيميل فعليًا
        emailjs.send("service_0p0gln7", "template_atz2wa9", data)
            .then(function (response) {
                console.log("✅ تم الإرسال بنجاح", response);
                responseElement.innerHTML = '<div class="alert alert-success">تم إرسال الطلب بنجاح! ✅</div>';
                responseElement.style.display = "block";
                setTimeout(() => { responseElement.style.display = "none"; }, 5000);
                localStorage.setItem("formSubmitted", "true");
                setTimeout(() => { window.location.href = "sent.html"; }, 2000);
            }, function (error) {
                console.error("❌ فشل الإرسال", error);
                responseElement.innerHTML = '<div class="alert alert-danger">فشل إرسال الطلب، حاول مرة اخرى! ❌: ' + error.text + '</div>';
                responseElement.style.display = "block";
                setTimeout(() => { responseElement.style.display = "none"; }, 5000);
            });
    }

    if (requestButton) {
        requestButton.addEventListener("click", sendEmail);
    }

    // ✅ التفاعلات الفورية
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

    if (companyCapitalInput) {
        companyCapitalInput.addEventListener("input", function () {
            companyCapitalInput.value = companyCapitalInput.value.replace(/[^0-9]/g, '');
        });
    }
});


// script for movement >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
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


