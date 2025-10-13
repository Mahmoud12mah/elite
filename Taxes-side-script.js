// script for scrolling and navigation menu behavior>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
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

// script for email validation >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
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

// script for phone code validation >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
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

// script for dropdown menu behavior >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function toggleExclusive(selectedId, otherId, dropdownId, otherDropdownId) {
    let selectedCheckbox = document.getElementById(selectedId);
    let otherCheckbox = document.getElementById(otherId);

    if (selectedCheckbox.checked) {
        otherCheckbox.checked = false; // إلغاء تحديد الآخر
    }

    // تحديث القوائم المنسدلة
    toggleDropdown(dropdownId, selectedCheckbox);
    toggleDropdown(otherDropdownId, otherCheckbox);
}

function toggleDropdown(dropdownId, checkbox) {
    let dropdown = document.getElementById(dropdownId);
    if (dropdown) {
        dropdown.style.display = checkbox.checked ? "block" : "none";
    }
}

// script for checkbox behavior >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
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
allowOnlyOneSelection('#checkbox14, #checkbox15, #checkbox16, #checkbox17, #checkbox18, #checkbox19');
allowOnlyOneSelection('#checkbox20, #checkbox21, #checkbox22, #checkbox23, #checkbox24, #checkbox25');
allowOnlyOneSelection('#checkbox26, #checkbox27, #checkbox28, #checkbox29, #checkbox30, #checkbox31');
allowOnlyOneSelection('#checkbox32, #checkbox33, #checkbox34, #checkbox35, #checkbox36, #checkbox37');
allowOnlyOneSelection('#checkbox38, #checkbox39');
allowOnlyOneSelection('#checkbox40, #checkbox41');
allowOnlyOneSelection('#checkbox47, #checkbox48');
allowOnlyOneSelection('#checkbox49, #checkbox50, #checkbox51, #checkbox52, #checkbox53, #checkbox54');
allowOnlyOneSelection('#checkbox55, #checkbox56, #checkbox57, #checkbox58, #checkbox59, #checkbox60');
allowOnlyOneSelection('#checkbox61, #checkbox62, #checkbox63, #checkbox64, #checkbox65, #checkbox66');
allowOnlyOneSelection('#checkbox67, #checkbox68, #checkbox69, #checkbox70, #checkbox71, #checkbox72');
allowOnlyOneSelection('#checkbox73, #checkbox74, #checkbox75, #checkbox76, #checkbox77, #checkbox78');
allowOnlyOneSelection('#checkbox79, #checkbox80');
allowOnlyOneSelection('#checkbox81, #checkbox82');

// script for sending form data to emailjs >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
document.addEventListener("DOMContentLoaded", function () {
    emailjs.init("YE7phgS6i3fiqXi09");

    let requestButton = document.getElementById("requestPrice");
    let responseElement = document.getElementById("responseMessage");

    if (!responseElement) {
        console.warn("⚠️ عنصر #responseMessage غير موجود في الصفحة!");
        return;
    }

    function validateForm() {
        let isValid = true;
        responseElement.innerHTML = "";
        responseElement.style.display = "none";

        let requiredInputs = document.querySelectorAll("input[required], textarea, select");
        requiredInputs.forEach(input => {
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

        let checkboxes = document.querySelectorAll("input[name='services[]']");
        let isServiceChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);

        if (!isServiceChecked) {
            checkboxes.forEach(checkbox => {
                checkbox.closest("label").classList.add("checkbox-error");
            });
            isValid = false;
        } else {
            checkboxes.forEach(checkbox => {
                checkbox.closest("label").classList.remove("checkbox-error");
            });
        }

        let inspectionYearsInput = document.querySelector("input[name='inspectionyears']");
        let annualInspectionService = document.querySelector("input[name='services[]'][value='Annual Inspection Service']");

        if (annualInspectionService && annualInspectionService.checked) {
            let errorMessage = inspectionYearsInput.nextElementSibling;
            if (!inspectionYearsInput.value.trim()) {
                inspectionYearsInput.classList.add("input-error");
                if (!errorMessage || !errorMessage.classList.contains("error-message")) {
                    errorMessage = document.createElement("div");
                    errorMessage.classList.add("error-message");
                    errorMessage.textContent = "هذا الحقل مطلوب*";
                    inspectionYearsInput.parentNode.insertBefore(errorMessage, inspectionYearsInput.nextSibling);
                }
                isValid = false;
            }
        }

        if (!isValid) {
            responseElement.innerHTML = '<div data-lang="Allfieldsrequired" class="alert-danger">جميع الحقول مطلوبة! ❌</div>';
            responseElement.style.display = "block";
        }

        return isValid;
    }

    async function sendEmail(event) {
        event.preventDefault();
        if (!validateForm()) return;

        let formData = new FormData(document.getElementById("requestForm"));
        let data = {};

        formData.forEach((value, key) => {
            data[key] = value;
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

        // ✅ التحقق من البريد الإلكتروني الحقيقي باستخدام Abstract API
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

        // استخراج رقم الهاتف ورمز الدولة
        let phoneInput = document.querySelector("input[name='mobile']");
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

        // استخراج بيانات الشركة
        let companyInput = document.querySelector("input[name='yourcompany']");
        if (companyInput) {
            data["yourcompany"] = companyInput.value.trim();
        }

        // استخراج سنوات الخبرة
        let inspectionYearsInput = document.querySelector("input[name='inspectionyears']");
        if (inspectionYearsInput) {
            data["inspectionyears"] = parseInt(inspectionYearsInput.value.trim(), 10) || 0;
        }

        // استخراج الخدمات المختارة
        let selectedServices = [];
        document.querySelectorAll("input[name='services[]']:checked").forEach(service => {
            selectedServices.push(service.value);
        });
        data["services"] = selectedServices.join(", ");

        // استخراج الصفحة الحالية
        let currentPage = window.location.pathname.split("/").pop() || "Unknown";
        data["source_page"] = currentPage;

        console.log("📤 البيانات المرسلة:", data);
        localStorage.setItem("formData", JSON.stringify(data));

        // ✅ إرسال الإيميل بعد كل التحققات
        emailjs.send("service_0p0gln7", "template_atz2wa9", data)
            .then(function (response) {
                console.log("✅ تم الإرسال بنجاح", response);
                responseElement.innerHTML = '<div data-lang="Sentsuccessfully!" class="alert-success">تم إرسال الطلب بنجاح! ✅</div>';
                responseElement.style.display = "block";
                setTimeout(() => { responseElement.style.display = "none"; }, 5000);
                localStorage.setItem("formSubmitted", "true");
                setTimeout(function () {
                    window.location.href = "sent.html";
                }, 2000);
            }, function (error) {
                console.error("❌ فشل الإرسال", error);
                responseElement.innerHTML = '<div data-lang="Failedtosendrequest" class="alert-danger">فشل إرسال الطلب، حاول مرة اخرى! ❌: ' + error.text + '</div>';
                responseElement.style.display = "block";
                setTimeout(() => { responseElement.style.display = "none"; }, 5000);
            });
    }

    if (requestButton) {
        requestButton.addEventListener("click", sendEmail);
    }

    document.querySelectorAll("input, textarea, select").forEach(input => {
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
                    errorMessage.textContent = "هذا الحقل مطلوب*";
                    input.parentNode.insertBefore(errorMessage, input.nextSibling);
                }
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
});

// script for language site >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
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

// script for movement >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
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