<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

// إعدادات SMTP
$smtpHost = "smtp.gmail.com";  
$smtpUsername = "kandilmahmoud03@gmail.com";  
$smtpPassword = "ctia liik zpar nqet"; // استخدم "App Password"
$smtpPort = 587;
$to = "mahmoudkandil090@gmail.com";  

// التحقق من الطلب القادم عبر POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // التحقق من نوع البيانات المرسلة
    $isContactForm = isset($_POST["name"]) && isset($_POST["email"]) && isset($_POST["message"]);
    $isRequestForm = isset($_POST['service']) || isset($_POST['additional_info']) || isset($_POST['extra_service']);
    $isDetailedRequest = isset($_POST["name"]) && isset($_POST["email"]) && isset($_POST["services"]);
    // التقاط مصدر الطلب
    $sourcePage = $_POST['source_page'] ?? 'غير معروف';

    // التحقق من باقي البيانات كما هو في الكود الحالي
    // ...

    // في حالة طلب السعر المفصل أو أي نموذج آخر

    function sendEmail($subject, $body, $replyEmail = null, $replyName = null) {
        global $smtpHost, $smtpUsername, $smtpPassword, $smtpPort, $to;
        
        $mail = new PHPMailer(true);
        try {
            $mail->isSMTP();
            $mail->Host = $smtpHost;
            $mail->SMTPAuth = true;
            $mail->Username = $smtpUsername;
            $mail->Password = $smtpPassword;
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = $smtpPort;

            $mail->setFrom($smtpUsername, 'موقعك الإلكتروني');
            $mail->addAddress($to);
            if ($replyEmail && $replyName) {
                $mail->addReplyTo($replyEmail, $replyName);
            }

            $mail->isHTML(true);
            $mail->Subject = $subject;
            $mail->Body = $body;

            $mail->send();
            echo "✅ تم إرسال الطلب بنجاح!";
        } catch (Exception $e) {
            echo "❌ فشل إرسال البريد: " . $mail->ErrorInfo;
        }
    }

    // إرسال نموذج الاتصال
    if ($isContactForm && !$isRequestForm && !$isDetailedRequest) {
        $name = htmlspecialchars($_POST["name"]);
        $email = trim($_POST["email"]);
        $subject = htmlspecialchars($_POST["subject"]);
        $message = htmlspecialchars($_POST["message"]);

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            die("⚠️ البريد الإلكتروني غير صحيح.");
        }

        $body = "
            <h2>📩 تفاصيل رسالة المستخدم:</h2>
            <p><strong>👤 الاسم:</strong> $name</p>
            <p><strong>📧 البريد الإلكتروني:</strong> $email</p>
            <p><strong>📝 الموضوع:</strong> $subject</p>
            <p><strong>💬 الرسالة:</strong><br>$message</p>
        ";
        sendEmail("📩 رسالة جديدة من نموذج الاتصال", $body, $email, $name);
    }

    // إرسال طلب السعر البسيط
    elseif ($isRequestForm && !$isContactForm && !$isDetailedRequest) {
        $service = $_POST['service'] ?? "غير محدد";
        $additional_info = $_POST['additional_info'] ?? "غير محدد";
        $extra_service = $_POST['extra_service'] ?? "غير محدد";

        $body = "
            <h2>📦 تفاصيل الطلب:</h2>
            <p><strong>🔹 الخدمة المطلوبة:</strong> $service</p>
            <p><strong>📋 معلومات إضافية:</strong> $additional_info</p>
            <p><strong>📌 خدمة إضافية:</strong> $extra_service</p>
        ";
        sendEmail("📦 تفاصيل طلب السعر الجديد", $body);
    }

    // إرسال طلب السعر المفصل
    elseif ($isDetailedRequest) {
        $name = trim($_POST["name"] ?? "");
        $email = trim($_POST["email"] ?? "");
        $yourcompany = trim($_POST["yourcompany"] ?? "");
        $position = trim($_POST["position"] ?? "");
        $phonecode = trim($_POST["phonecode"] ?? "");
        $mobile = trim($_POST["mobile"] ?? "");
        $inspectionyears = filter_input(INPUT_POST, 'inspectionyears', FILTER_SANITIZE_NUMBER_INT) ?? "غير مدخل";
        $TherequiredNumberofvisitspermonth = filter_input(INPUT_POST, 'TherequiredNumberofvisitspermonth', FILTER_SANITIZE_NUMBER_INT) ?? "غير مدخل";
        $Companycapital = filter_input(INPUT_POST, 'Companycapital', FILTER_SANITIZE_NUMBER_INT) ?? "غير مدخل";
        $phonecode = filter_input(INPUT_POST, 'phonecode', FILTER_SANITIZE_NUMBER_INT) ?? "غير مدخل";

        $selectedServices = isset($_POST['services']) ? json_decode($_POST['services'], true) : [];
        

        // التحقق من ملء جميع الحقول المطلوبة
        if (empty($name) || empty($email) ||   empty($position) || empty($mobile)) {
            die("⚠️ جميع الحقول مطلوبة.");
        }

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            die("⚠️ البريد الإلكتروني غير صالح.");
        }

        if (empty($selectedServices)) {
            die("⚠️ يجب اختيار كل الاختيارات المطلوبة.");
        }
        
        

        $servicesText = implode(", ", $selectedServices);

        $body = "
            <h2>📩 بيانات المرسل:</h2>
            <p><strong>👤 الاسم:</strong> $name</p>
            <p><strong>📧 البريد الإلكتروني:</strong> $email</p>
            <p><strong>📞 رمز الدولة:</strong> $phonecode</p>
            <p><strong>📞 رقم الهاتف:</strong> $mobile</p>
            <p><strong>🏢 الشركة:</strong> $yourcompany</p>
            <p><strong>📆 سنوات الخبرة:</strong> $inspectionyears</p>
            <p><strong>📆 عدد الزيارات المطلوبة شهريا:</strong> $TherequiredNumberofvisitspermonth</p>
            <p><strong>📆 رأس مال الشركة:</strong> $Companycapital</p>
            
            <p><strong>🏷️ الوظيفة:</strong> $position</p>
            <hr>
            <h2>📦 تفاصيل الطلب:</h2>
            <p><strong>🔹 الخدمات المختارة:</strong> $servicesText</p>
            <!-- إضافة مصدر الطلب في البريد الإلكتروني -->
        <p><strong>🌐 مصدر الصفحة:</strong> $sourcePage</p>
    
        ";
        sendEmail("📩 طلب سعر جديد من الموقع", $body, $email, $name);
    }

    // في حالة عدم تطابق البيانات
    else {
        echo "⚠️ البيانات غير صحيحة أو غير مكتملة.";
    }
} else {
    echo "⚠️ طلب غير صالح.";
}
?>
