// chat body >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> //
let askedQuestions = new Set();

function toggleChat() {
    const chat = document.getElementById('chatContainer');
    chat.style.display = chat.style.display === 'none' || chat.style.display === '' ? 'flex' : 'none';
}

function sendQuestion(element) {
    const chatBody = document.getElementById('chatBody');
    const userMessage = document.createElement('div');
    userMessage.className = 'chat-message chat-response';
    userMessage.textContent = element.textContent;
    chatBody.appendChild(userMessage);

    // scroll immediately to question
    scrollToElement(userMessage);

    askedQuestions.add(element.textContent);

    setTimeout(() => {
        const botMessage = document.createElement('div');
        botMessage.className = 'chat-message';
        botMessage.textContent = 'Typing answer...';
        chatBody.appendChild(botMessage);

        // scroll immediately to fake answer
        scrollToElement(botMessage);

        setTimeout(() => {
            botMessage.textContent = getAnswer(element.textContent);
            scrollToElement(botMessage); // scroll after updating answer

            // show remaining questions as buttons
            showRemainingQuestions();
        }, 1000);
    }, 500);
}

function getAnswer(question) {
    const answers = {
        'What services do we provide': `At Elite Financial Consulting, we are committed to providing high-quality accounting and financial services to support the success of your business. With years of experience in accounting, auditing, and financial consulting, we work to provide our clients with innovative solutions that meet their needs and help them achieve their financial goals efficiently and transparently.

We offer a comprehensive range of services, including preparing financial statements, auditing and review, company formation of all types, tax consulting, and financial planning, with a focus on compliance with the latest accounting standards and local laws.
       `,

        'Head office and branch addresses': `Head office: 40 Abu Dawoud Al Zaheri Street, Nasr City, Cairo, Egypt.
Branch: 633 El Horreya Road, Gianaclis, El Zeraaen Building, Alexandria, Egypt.`,

        'How can you contact us': `You can contact us via
phone: +20 1228310654
through the contact form on our website
and email: info@elitefinancial-eg.com`,

        'What makes Elite Financial Consulting different from others': `We are distinguished by:
- Providing customized services for each client based on their needs
- Commitment to the highest standards of quality and professionalism
- Building long-term relationships based on trust and transparency`,

        'How can Elite office help me establish my new company': `We help you by:
- Providing legal and administrative consulting to choose the appropriate structure
- Facilitating obtaining the required licenses
- For more information, contact us at +20 1228310654`,

        'How can I request a pricing service': `To request a pricing service, follow these steps:
1. Visit our website: https://elitefinancial-eg.com/
2. Go to the pricing request page and select the required service.
3. Fill in the form with all required information accurately, then click Request Price.
4. The Elite team will contact you to understand your requirements in detail.
5. We will evaluate your request and provide a customized quotation based on your needs.`,

        'What is Elite Financial Consulting\'s experience in accounting and taxes?': `Elite has extensive experience in accounting and taxation:
- A team of experts specialized in preparing and analyzing financial statements.
- Providing accurate tax consulting to ensure compliance with tax laws.
- Assisting companies in filing tax returns and avoiding accounting errors.
- Working according to the latest local and international accounting standards.`
    };

    return answers[question] || 'Sorry, I could not find an answer to this question. Please contact us for more details.';
}

function showRemainingQuestions() {
    const allQuestions = [
        'What services do we provide',
        'Head office and branch addresses',
        'How can you contact us',
        'How can Elite office help me establish my new company',
        'What makes Elite Financial Consulting different from others',
        'How can I request a pricing service',
    ];

    const chatBody = document.getElementById('chatBody');

    let remainingQuestions = allQuestions.filter(q => !askedQuestions.has(q));

    if (remainingQuestions.length === 0) {
        showResetButton();
        return;
    }

    remainingQuestions.forEach(question => {
        const questionElement = createQuestionElement(question);
        chatBody.appendChild(questionElement);
    });
}

function showResetButton() {
    const chatBody = document.getElementById('chatBody');
    const resetButton = createQuestionElement('Show questions again');
    resetButton.onclick = function () {
        this.remove(); // remove button on click
        resetQuestions();
    };
    chatBody.appendChild(resetButton);
    scrollToElement(resetButton);
}

function resetQuestions() {
    askedQuestions.clear();

    // remove reset button if exists
    const resetButton = document.querySelector('.reset-button');
    if (resetButton) {
        resetButton.remove();
    }

    showRemainingQuestions();

    // scroll to last element after showing questions
    setTimeout(() => {
        const chatBody = document.getElementById('chatBody');
        if (chatBody.lastChild) {
            scrollToElement(chatBody.lastChild);
        }
    }, 100);
}

function createQuestionElement(text) {
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.textContent = text;
    questionElement.onclick = function () { sendQuestion(this); };
    return questionElement;
}

function scrollToElement(element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
// map script >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> //
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

window.onload = function () {
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

document.addEventListener("DOMContentLoaded", function () {
    let mapFrame = document.getElementById('mapFrame');
    if (mapFrame) {
        // إعادة تحميل الخريطة عند فشل التحميل
        mapFrame.addEventListener("error", function () {
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

        observer.observe(mapFrame);
    }

    // مراقبة تغيير اللغة
    var languageSwitcher = document.getElementById("languageSwitcher");
    if (languageSwitcher) {
        languageSwitcher.addEventListener("change", function () {
            reloadMap();
        });
    }

    // معالجة الضغط على العنوان
    let addressLink = document.querySelector(".address");
    if (addressLink) {
        addressLink.addEventListener("click", function (event) {
            if (!navigator.onLine) {
                event.preventDefault(); // منع فتح الرابط
                alert("⚠ لا يوجد إنترنت. سيتم توجيهك إلى خريطة بديلة.");
                window.open("https://www.openstreetmap.org/?mlat=30.0515&mlon=31.3658#map=17/30.0515/31.3658", "_blank");
            }
        });
    }
});

// إعادة تحميل الخريطة عند تنشيط الصفحة (مثلاً عند العودة إليها بعد فتح تبويب آخر)
document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "visible") {
        reloadMap();
    }
});

function checkInternetConnection(event) {
    if (!navigator.onLine) {
        alert("⚠ No internet connection. Please check your connection and try again.");
        event.preventDefault(); // منع فتح الرابط إذا لم يكن هناك إنترنت
        return false;
    }
    return true;
}

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section[id]");
    let currentActiveId = "";

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;

                // حتى لا يحدث تكرار وإجهاد في استبدال الرابط
                if (currentActiveId !== id) {
                    currentActiveId = id;
                    history.replaceState(null, null, `#${id}`);
                }
            }
        });
    }, {
        threshold: 0.6 // القسم يجب أن يكون ظاهرًا بنسبة 60% على الأقل
    });

    sections.forEach(section => observer.observe(section));
});

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
window.addEventListener('scroll', function () {
    if (window.scrollY > 10) {
        document.body.classList.add('scrolled');
    } else {
        document.body.classList.remove('scrolled');
    }
});

//  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
document.addEventListener("DOMContentLoaded", function () {
    let btn = document.getElementById("myButton");
    if (btn) {
        btn.addEventListener("click", function () {
            console.log("Button clicked!");
        });
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const section = sessionStorage.getItem("scrollToSection");
    if (section) {
        const target = document.getElementById(section);
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
        sessionStorage.removeItem("scrollToSection");
    }
});

// كود نموذج الاتصال باستخدام EmailJS>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>



(function () {
    emailjs.init("YE7phgS6i3fiqXi09"); // استبدل بـ Public Key من EmailJS
})();

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("contactForm").addEventListener("submit", function (event) {
        event.preventDefault(); // منع إعادة تحميل الصفحة

        let form = this;
        let responseElement = document.getElementById("contactResponse");

        // ✅ حفظ الصفحة السابقة قبل الإرسال
        localStorage.setItem("previousPage", window.location.href);

        // ✅ جلب القيم
        const emailInput = form.querySelector('input[name="email"]').value.trim();
        const nameInput = form.querySelector('input[name="name"]').value.trim();

        // ✅ التحقق من طول الاسم الكلي
        if (nameInput.length < 2 || nameInput.length > 40) {
            responseElement.innerHTML = '<div class="alert alert-danger">❌ Please enter a valid name (between 2 and 40 characters).</div>';
            responseElement.style.display = "block";
            return;
        }

        // ✅ التحقق من تكرار الحروف داخل كل مقطع (حتى لو كانت غير متتالية)
        const partsForRepeatCheck = nameInput.split(" ").filter(Boolean);
        for (const part of partsForRepeatCheck) {
            const counts = {};
            for (const char of part) {
                const lowerChar = char.toLowerCase();
                if (!/[a-zA-Zأ-ي]/.test(lowerChar)) continue; // تجاهل غير الحروف
                counts[lowerChar] = (counts[lowerChar] || 0) + 1;
                if (counts[lowerChar] > 3) {
                    responseElement.innerHTML = `<div class="alert alert-danger">❌ The clip"${part}" It contains excessive letter repetition."${char}".</div>`;
                    responseElement.style.display = "block";
                    return;
                }
            }
        }

        // ✅ منع الرموز أو الأرقام
        const invalidNamePattern = /[^a-zA-Zأ-ي\s]/;
        if (invalidNamePattern.test(nameInput)) {
            responseElement.innerHTML = '<div class="alert alert-danger">❌ Please enter a real name without symbols or numbers.</div>';
            responseElement.style.display = "block";
            return;
        }

        // ✅ يجب أن يحتوي الاسم على أكثر من مقطع (وجود مسافة واحدة على الأقل)
        if (!nameInput.includes(" ")) {
            responseElement.innerHTML = '<div class="alert alert-danger">❌ Please enter your full name, for example (Mohammed Ali).</div>';
            responseElement.style.display = "block";
            return;
        }

        // ✅ التأكد أن كل مقطع لا يتجاوز 12 حرفًا
        const parts = nameInput.split(" ").filter(Boolean); // تقسيم الاسم إلى مقاطع
        const longPart = parts.find(part => part.length > 12);
        if (longPart) {
            responseElement.innerHTML = `<div class="alert alert-danger">❌ The clip"${longPart}" It's too long; it shouldn't exceed 12 characters.</div>`;
            responseElement.style.display = "block";
            return;
        }

        // ✅ عرض رسالة جاري الإرسال قبل التحقق والإرسال
        responseElement.innerHTML = '<div class="alert alert-info">⏳ Form being sent...</div>';
        responseElement.style.display = "block";

        // ✅ التحقق من البريد الإلكتروني الحقيقي باستخدام Abstract API
        const apiKey = "8f5ad0dca22649f681ca4bbbb7dca4c8"; // مفتاحك الحالي من Abstract API

        fetch(`https://emailreputation.abstractapi.com/v1/?api_key=${apiKey}&email=${emailInput}`)
            .then(res => res.json())
            .then(data => {
                console.log("🔍 نتيجة التحقق من البريد:", data);

                if (data.email_deliverability && data.email_deliverability.status === "deliverable") {
                    // ✅ البريد حقيقي، نكمل الإرسال عبر EmailJS
                    return emailjs.sendForm("service_0p0gln7", "template_vymp718", form);
                } else {
                    // ❌ البريد غير صالح أو غير موجود فعليًا
                    responseElement.innerHTML = '<div class="alert alert-danger">❌ Please enter a real and receiveable email address.</div>';
                    responseElement.style.display = "block";
                    throw new Error("Invalid email");
                }
            })
            .then(function (response) {
                console.log("✅ تم الإرسال بنجاح", response);
                responseElement.innerHTML = '<div class="alert alert-success">✅ Your request has been successfully sent!</div>';
                responseElement.style.display = "block";
                form.reset();

                localStorage.setItem("formSubmitted", "true");

                setTimeout(function () {
                    window.location.href = "sent.html";
                }, 2000);
            })
            .catch(function (error) {
                if (error.message === "Invalid email") return;

                console.error("❌ فشل الإرسال", error);
                responseElement.innerHTML = '<div class="alert alert-danger">❌ Request failed to send, please try again.</div>';
                responseElement.style.display = "block";
            });

        return false;
    });
});





// كود سلاسة للصورة الرئيسية >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
window.addEventListener("load", function () {
    const img = document.querySelector('.fade-in-image');
    if (img) {
        img.classList.add('loaded');
    }
});


// كود منع الاسكرول عند تحميل الصفحة
window.addEventListener("load", function () {
    if (window.location.hash) {
        history.replaceState(null, "", window.location.pathname + window.location.search);
    }
});






