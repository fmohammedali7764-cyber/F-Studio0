// 1. شاشة الانتظار الافتتاحية (Splash Screen)
window.addEventListener('load', () => {
    const splash = document.getElementById('splash-screen');
    if (splash) {
        setTimeout(() => {
            splash.style.opacity = '0';
            setTimeout(() => splash.style.display = 'none', 500);
        }, 1500); // تختفي تلقائياً بعد ثانية ونصف
    }
});

// 2. تفعيل تبديل الوضع الداكن والفاتح وحفظ خيار الزائر
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
    // التحقق لو كان المستخدم قد اختار وضعاً معيناً سابقاً
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme); // حفظ الاختيار في المتصفح
    });
}

// 3. تأثير ظهور العناصر الفني عند التمرير (Scroll Reveal)
const revealElements = document.querySelectorAll('.reveal');
const revealOnScroll = () => {
    revealElements.forEach(el => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = 120; // المسافة بالبكسل لبدء الحركة
        
        if (elementTop < windowHeight - elementVisible) {
            el.classList.add('active');
        }
    });
};
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll); // تشغيلها عند التحميل المبدئي أيضاً

// 4. العدادات الرقمية المتحركة للإحصائيات
const counters = document.querySelectorAll('.counter');
const startCounters = () => {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const speed = 150; // سرعة حركة الأرقام
        
        const updateCount = () => {
            const count = +counter.innerText;
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 10);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
};

// تشغيل العداد تلقائياً بمجرد تمرير الشاشة والوصول لقسم الإحصائيات
let counted = false;
window.addEventListener('scroll', () => {
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        const sectionTop = statsSection.offsetTop - window.innerHeight;
        if (window.scrollY > sectionTop && !counted) {
            startCounters();
            counted = true;
        }
    }
});

// 5. زر العودة للأعلى الذكي (Scroll to Top)
const scrollTopBtn = document.getElementById('scroll-top');
if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            scrollTopBtn.style.display = 'block';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}
