
// =====================================
// إعدادات العرض التقديمي
// =====================================

const slides = document.querySelectorAll(".slide");

const currentSlideElement = document.getElementById("currentSlide");
const totalSlidesElement = document.getElementById("totalSlides");
const progressFill = document.getElementById("progressFill");

const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const homeBtn = document.getElementById("homeBtn");

let currentIndex = 0;

const totalSlides = slides.length;

// =====================================
// تهيئة العرض
// =====================================

function initializePresentation() {

    totalSlidesElement.textContent = String(totalSlides).padStart(2, "0");

    showSlide(0);

    // تفعيل الأيقونات
    if (window.lucide) {
        lucide.createIcons();
    }

}

// =====================================
// عرض الشريحة المطلوبة
// =====================================

function showSlide(index) {

    // التأكد من أن رقم الشريحة صحيح
    if (index < 0 || index >= totalSlides) {
        return;
    }

    currentIndex = index;

    // إخفاء جميع الشرائح
    slides.forEach((slide, i) => {

        slide.classList.remove("active");

        if (i === currentIndex) {
            slide.classList.add("active");
        }

    });

    // تحديث رقم الشريحة الحالية
    currentSlideElement.textContent =
        String(currentIndex + 1).padStart(2, "0");

    // تحديث شريط التقدم
    const progress = ((currentIndex + 1) / totalSlides) * 100;

    progressFill.style.width = progress + "%";

    // تحديث حالة أزرار التنقل
    prevBtn.disabled = currentIndex === 0;

    nextBtn.disabled = currentIndex === totalSlides - 1;

}

// =====================================
// الانتقال للشريحة التالية
// =====================================

function nextSlide() {

    if (currentIndex < totalSlides - 1) {

        showSlide(currentIndex + 1);

    }

}

// =====================================
// الرجوع للشريحة السابقة
// =====================================

function previousSlide() {

    if (currentIndex > 0) {

        showSlide(currentIndex - 1);

    }

}

// =====================================
// العودة إلى الشريحة الأولى
// =====================================

function goToHome() {

    showSlide(0);

}

// =====================================
// ربط أزرار التحكم
// =====================================

nextBtn.addEventListener("click", nextSlide);

prevBtn.addEventListener("click", previousSlide);

homeBtn.addEventListener("click", goToHome);

// =====================================
// التحكم باستخدام لوحة المفاتيح
// =====================================

document.addEventListener("keydown", function(event) {

    // منع تأثير الأسهم أثناء الكتابة داخل حقول الإدخال
    if (
        event.target.tagName === "INPUT" ||
        event.target.tagName === "TEXTAREA"
    ) {
        return;
    }

    switch (event.key) {

        case "ArrowLeft":
            event.preventDefault();
            nextSlide();
            break;

        case "ArrowRight":
            event.preventDefault();
            previousSlide();
            break;

        case "Home":
            event.preventDefault();
            goToHome();
            break;

        case "End":
            event.preventDefault();
            showSlide(totalSlides - 1);
            break;

    }

});

// =====================================
// دعم اللمس والسحب على الجوال
// =====================================

let touchStartX = 0;
let touchEndX = 0;

const presentation = document.querySelector(".presentation");

presentation.addEventListener("touchstart", function(event) {

    touchStartX = event.changedTouches[0].screenX;

}, { passive: true });

presentation.addEventListener("touchend", function(event) {

    touchEndX = event.changedTouches[0].screenX;

    handleSwipe();

}, { passive: true });

function handleSwipe() {

    const swipeDistance = touchEndX - touchStartX;

    // تجاهل الحركات الصغيرة
    if (Math.abs(swipeDistance) < 60) {
        return;
    }

    // اتجاه السحب متوافق مع RTL
    if (swipeDistance < 0) {

        nextSlide();

    } else {

        previousSlide();

    }

}

// =====================================
// تشغيل العرض عند فتح الصفحة
// =====================================

document.addEventListener("DOMContentLoaded", function() {

    initializePresentation();

});

// =====================================
// ضمان تشغيل العرض حتى عند تحميل
// السكربت بعد اكتمال الصفحة
// =====================================

if (document.readyState !== "loading") {

    initializePresentation();

}
