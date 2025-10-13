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

    // التمرير فورًا إلى السؤال
    scrollToElement(userMessage);

    askedQuestions.add(element.textContent);

    setTimeout(() => {
        const botMessage = document.createElement('div');
        botMessage.className = 'chat-message';
        botMessage.textContent = 'يتم كتابة الإجابة...';
        chatBody.appendChild(botMessage);

        // التمرير فورًا إلى الإجابة الوهمية قبل تحديثها
        scrollToElement(botMessage);

        setTimeout(() => {
            botMessage.textContent = getAnswer(element.textContent);
            scrollToElement(botMessage); // تمرير بعد تحديث الإجابة

            // عرض باقي الأسئلة المتبقية بنفس التصميم كأزرار
            showRemainingQuestions();
        }, 1000);
    }, 500);
}

function getAnswer(question) {
    const answers = {
        'ما هي الخدمات التي نقدمها': `نحن في إيليت للأستشارات المالية نلتزم بتقديم خدمات محاسبية ومالية عالية الجودة لدعم نجاح أعمالكم. بخبرة تمتد لسنوات في مجالات المحاسبة، المراجعة، والاستشارات المالية، نعمل على تزويد عملائنا بحلول مبتكرة تلبي احتياجاتهم وتساعدهم على تحقيق أهدافهم المالية بكفاءة وشفافية.

نقدم مجموعة متكاملة من الخدمات، تشمل إعداد القوائم المالية، التدقيق والمراجعة، تأسيس الشركات بكافة انواعها، الاستشارات الضريبية، والتخطيط المالي، مع التركيز على الامتثال لأحدث المعايير المحاسبية والقوانين المحلية.
       `,

        'عناوين المركز الرئيسي والفروع': `المكتب الرئيسي: 40 شارع أبو داوود الظاهري، مدينة نصر، القاهرة، مصر.
        الفرع: 633 طريق الحرية، جناكليس، مبنى الزراعين، الإسكندرية، مصر.`,

        'كيف يمكنك التواصل معنا': `يمكنك التواصل معنا عبر
         الهاتف: 1228310654 20+
        وعبر نموذج الاتصال على موقعنا الإلكتروني
        والبريد الإلكترونيinfo@elitefinancial-eg.com`,

        'ما الذي يميز مكتب إيليت للاستشارات المالية عن غيره': `نحن نتميز 
       بتقديم خدمات مخصصة لكل عميل بناءً على احتياجاته
        و الالتزام بأعلى معايير الجودة والمهنية
        و بناء علاقات طويلة الأمد قائمة على الثقة والشفافية`,

        'كيف يمكن لمكتب إيليت مساعدتي في تأسيس شركتي الجديدة': `نحن نساعدك عبر
         تقديم الاستشارات القانونية والإدارية لاختيار الهيكل المناسب
         وتسهيل الحصول على التراخيص اللازمة
         ولمزيد من المعلومات التواصل علي رقم 1228310654 20+`,

        'كيف يمكنني طلب خدمة التسعير': `لطلب خدمة التسعير، قم بالخطوات التالية:
        1. زيارة موقعنا: https://elitefinancial-eg.com/
        2. الانتقال إلى صفحة طلب سعر واختيار الخدمة المطلوبة.
        3. ملئ النموذج بكافة المعلومات المطلوبة بدقة ثم الضغط علي زر طلب سعر.
        4. سيقوم فريق إيليت بالاتصال بك لفهم متطلباتك بدقة.​
        5. سنقوم بتقييم طلبك وتقديم عرض سعر مخصص بناءً على متطلباتك.`,



        'ما هي خبرة شركة إيليت للاستشارات المالية في مجال المحاسبة والضرائب؟': `إيليت تتمتع بخبرة واسعة في مجال المحاسبة والضرائب:
        - تمتلك فريقًا من الخبراء المتخصصين في إعداد البيانات المالية وتحليلها.
        - تقديم استشارات ضريبية دقيقة لضمان الامتثال للقوانين الضريبية.
        - مساعدة الشركات في تقديم الإقرارات الضريبية وتجنب الأخطاء المحاسبية.
        - العمل وفقًا لأحدث المعايير المحاسبية المحلية والدولية.`
    };

    return answers[question] || 'عذرًا، لم أتمكن من العثور على إجابة لهذا السؤال. يُرجى التواصل معنا لمزيد من التفاصيل.';
}

function showRemainingQuestions() {
    const allQuestions = [
        'ما هي الخدمات التي نقدمها',
        'عناوين المركز الرئيسي والفروع',
        'كيف يمكنك التواصل معنا',
        'كيف يمكن لمكتب إيليت مساعدتي في تأسيس شركتي الجديدة',
        'ما الذي يميز مكتب إيليت للاستشارات المالية عن غيره',
        'كيف يمكنني طلب خدمة التسعير',

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
    const resetButton = createQuestionElement('عرض الأسئلة من جديد');
    resetButton.onclick = function () {
        this.remove(); // حذف الزر عند الضغط عليه
        resetQuestions();
    };
    chatBody.appendChild(resetButton);
    scrollToElement(resetButton);
}



function resetQuestions() {
    askedQuestions.clear();

    // إزالة زر "عرض الأسئلة من جديد" إن وجد
    const resetButton = document.querySelector('.reset-button');
    if (resetButton) {
        resetButton.remove();
    }

    showRemainingQuestions();

    // التمرير إلى آخر عنصر بعد عرض الأسئلة
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
        alert("⚠ لا يوجد اتصال بالإنترنت. تأكد من الاتصال ثم حاول مرة أخرى.");
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

// news script >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
document.addEventListener("DOMContentLoaded", function () {
    const newsList = [
        { text: "لقاءٍ مع العاملين بمأمورية ضرائب بنها وممثلي المجتمع الضريبي بالقليوبية بديوان عام المحافظة", link: "News1.html" },
        { text: "جميع المأموريات تلتزم بتطبيق التسهيلات وفقًا للقوانين الصادرة", link: "News2.html" },
        { text: "التسهيلات الضريبية فرصة لن تتكرر ومواعيد التقديم للاستفادة أوشكت على الانتهاء", link: "News3.html" },
        { text: "لقاء مصلحة الضرائب المصرية مع المحاسبين والمراجعين في إطار التسهيلات الضريبية", link: "News4.html" },
        { text: "فرق دعم فني ميداني لتسهيل الخدمات الضريبية للممولين وغير الممولين", link: "News5.html" },
        { text: "آخر موعد لتقديم طلبات إنهاء المنازعات الضريبية ٣٠يونيو", link: "News6.html" },
        { text: "مصلحة الضرائب تكرم عددًا من الأندية الرياضية", link: "News7.html" },
        { text: "صدور قرار رقم (225) لسنة 2025 الخاص (بالمرحلة الفرعية الأولى من المرحلة الرئيسية الثامنة) لمنظومة الإيصال الإلكترونى.", link: "News8.html" },
    ];

    const wrapper = document.getElementById("newsWrapper");
    let speed = 1;
    let offset = 0;
    let isPaused = false;

    // تكرار العناصر لتغطية الشاشة 3 مرات
    for (let i = 0; i < 3; i++) {
        newsList.forEach(news => {
            let item = document.createElement("a");
            item.classList.add("news-item");
            item.href = news.link;
            item.innerText = news.text;
            item.style.textDecoration = "none";
            item.style.color = "inherit";
            wrapper.appendChild(item);

            item.addEventListener("mouseover", () => isPaused = true);
            item.addEventListener("mouseout", () => isPaused = false);
            item.addEventListener("touchstart", () => isPaused = true);
            item.addEventListener("touchend", () => isPaused = false);
        });
    }

    function moveNews() {
        if (!isPaused) {
            offset -= speed;
            wrapper.style.left = offset + "px";
            if (Math.abs(offset) >= wrapper.scrollWidth / 3) {
                offset = 0;
            }
        }
        requestAnimationFrame(moveNews);
    }

    moveNews();
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
            responseElement.innerHTML = '<div class="alert alert-danger">❌ يرجى إدخال اسم صحيح (بين 2 و 40 حرفًا).</div>';
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

        // ✅ يجب أن يحتوي الاسم على أكثر من مقطع (وجود مسافة واحدة على الأقل)
        if (!nameInput.includes(" ")) {
            responseElement.innerHTML = '<div class="alert alert-danger">❌ يرجى إدخال الاسم الكامل.</div>';
            responseElement.style.display = "block";
            return;
        }

        // ✅ التأكد أن كل مقطع لا يتجاوز 12 حرفًا
        const parts = nameInput.split(" ").filter(Boolean); // تقسيم الاسم إلى مقاطع
        const longPart = parts.find(part => part.length > 12);
        if (longPart) {
            responseElement.innerHTML = `<div class="alert alert-danger">❌ المقطع "${longPart}" طويل جدًا، يجب ألا يتجاوز 12 حرفًا.</div>`;
            responseElement.style.display = "block";
            return;
        }

        // ✅ عرض رسالة جاري الإرسال قبل التحقق والإرسال
        responseElement.innerHTML = '<div class="alert alert-info">⏳ جاري إرسال النموذج...</div>';
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
                    responseElement.innerHTML = '<div class="alert alert-danger">❌ يرجى إدخال بريد إلكتروني حقيقي وقابل للاستلام.</div>';
                    responseElement.style.display = "block";
                    throw new Error("Invalid email");
                }
            })
            .then(function (response) {
                console.log("✅ تم الإرسال بنجاح", response);
                responseElement.innerHTML = '<div class="alert alert-success">✅ تم ارسال طلبك بنجاح!</div>';
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
                responseElement.innerHTML = '<div class="alert alert-danger">❌ فشل ارسال الطلب، حاول مرة أخرى.</div>';
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






