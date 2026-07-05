// مصفوفة البيانات (قاعدة بيانات المشاريع الخاصة بـ F Studio)
const projects = [
    {
        id: 1,
        title: "منصة F-Commerce",
        category: "web",
        desc: "متجر إلكتروني متكامل سريع ومتوافق مع الهواتف ومبني بالكامل بالـ JavaScript الخام.",
        image: "assets/images/project1.jpg", 
        link: "#"
    },
    {
        id: 2,
        title: "تحليل بيانات مبيعات متكاملة",
        category: "data",
        desc: "لوحة مؤشرات تفاعلية لاستخراج الإحصائيات وحساب المعدلات باستخدام لغة Python.",
        image: "assets/images/project2.jpg",
        link: "#"
    },
    {
        id: 3,
        title: "نظام أتمتة الردود الذكي",
        category: "ai",
        desc: "دمج حلول الذكاء الاصطناعي لبناء بوت خدمة عملاء تفاعلي للشركات والمنصات.",
        image: "assets/images/project3.jpg",
        link: "#"
    },
    {
        id: 4,
        title: "هوية Tech-Start البصرية",
        category: "design",
        desc: "تصميم شعار وهوية بصرية كاملة بنمط مستقبلي لشركة ناشئة متخصصة بالاتصالات.",
        image: "assets/images/project4.jpg",
        link: "#"
    }
];

const portfolioGrid = document.getElementById('portfolio-grid');
const filterBtns = document.querySelectorAll('.filter-btn');

// دالة توليد بطاقات المشاريع داخل الصفحة
function displayProjects(filterValue = 'all') {
    if (!portfolioGrid) return; // لضمان عدم حدوث خطأ إذا لم نكن في صفحة المعرض
    
    portfolioGrid.innerHTML = ''; // مسح المحتوى الحالي للشبكة

    // تصفية المشاريع بناءً على الفئة المختارة
    const filteredProjects = filterValue === 'all' 
        ? projects 
        : projects.filter(p => p.category === filterValue);

    // بناء كود الـ HTML لكل بطاقة مشروع وعرضها
    filteredProjects.forEach(project => {
        const card = `
            <div class="project-card" data-category="${project.category}">
                <img src="${project.image}" alt="${project.title}" class="project-img" onerror="this.src='https://via.placeholder.com/400x250/121216/00ffa3?text=F+Studio'">
                <div class="project-info">
                    <span class="project-category">${getCategoryName(project.category)}</span>
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-desc">${project.desc}</p>
                    <a href="${project.link}" class="btn btn-secondary" style="padding: 0.5rem 1rem; font-size: 0.8rem; border-radius: 6px;">تفاصيل المشروع</a>
                </div>
            </div>
        `;
        portfolioGrid.innerHTML += card;
    });
}

// دالة بسيطة لتحويل كلمة الفئة البرمجية إلى نص عربي منسق للعملاء
function getCategoryName(category) {
    const categories = {
        'web': 'تطوير الويب',
        'data': 'تحليل البيانات',
        'ai': 'ذكاء اصطناعي',
        'design': 'تصميم وإبداع'
    };
    return categories[category] || category;
}

// تفعيل الفلترة عند الضغط على الأزرار
if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // إزالة الكلاس النشط من الزر القديم وإضافته للزر الحالي
            document.querySelector('.filter-btn.active').classList.remove('active');
            btn.classList.add('active');

            // جلب قيمة الفلترة وتشغيل الدالة
            const filterValue = btn.getAttribute('data-filter');
            displayProjects(filterValue);
        });
    });
}

// تشغيل العرض تلقائياً بمجرد فتح صفحة المعرض
document.addEventListener('DOMContentLoaded', () => {
    displayProjects('all');
});
