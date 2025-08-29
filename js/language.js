// Multi-Language Support for 3D Printer Website
class LanguageManager {
    constructor() {
        this.currentLang = 'en';
        this.translations = {};
        this.init();
    }

    init() {
        // Load saved language preference
        const savedLang = localStorage.getItem('selectedLanguage') || 'en';
        this.setLanguage(savedLang);

        // Initialize language switcher
        this.initLanguageSwitcher();

        // Load translations
        this.loadTranslations();
    }

    initLanguageSwitcher() {
        // Main language switcher
        const languageBtn = document.getElementById('languageBtn');
        const languageModal = document.getElementById('languageModal');
        const languageOptions = document.querySelectorAll('.language-option');
        const modalClose = document.querySelector('.language-modal-close');

        if (languageBtn && languageModal) {
            // Open modal
            languageBtn.addEventListener('click', () => {
                languageModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            });

            // Close modal
            modalClose.addEventListener('click', () => {
                languageModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });

            // Close on outside click
            languageModal.addEventListener('click', (e) => {
                if (e.target === languageModal) {
                    languageModal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });

            // Language selection
            languageOptions.forEach(option => {
                option.addEventListener('click', () => {
                    const lang = option.getAttribute('data-lang');
                    this.setLanguage(lang);
                    languageModal.style.display = 'none';
                    document.body.style.overflow = 'auto';

                    // Update active state
                    languageOptions.forEach(opt => opt.classList.remove('active'));
                    option.classList.add('active');
                });
            });
        }

        // Footer language selector
        const footerLanguageBtn = document.getElementById('footerLanguageBtn');
        if (footerLanguageBtn) {
            footerLanguageBtn.addEventListener('click', () => {
                languageModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            });
        }
    }

    setLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('selectedLanguage', lang);

        // Update HTML lang attribute
        document.documentElement.lang = lang;
        document.documentElement.setAttribute('data-lang', lang);

        // Update direction for RTL languages
        if (lang === 'ar') {
            document.documentElement.dir = 'rtl';
        } else {
            document.documentElement.dir = 'ltr';
        }

        // Update language switcher display
        this.updateLanguageDisplay();

        // Apply translations
        this.applyTranslations();

        // Dispatch language change event
        window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));
    }

    updateLanguageDisplay() {
        const flagElement = document.getElementById('currentLangFlag');
        const textElement = document.getElementById('currentLangText');
        const footerFlagElement = document.getElementById('footerLangFlag');
        const footerTextElement = document.getElementById('footerLangText');

        const langData = {
            'en': { flag: '🇺🇸', text: 'EN' },
            'fr': { flag: '🇫🇷', text: 'FR' },
            'ar': { flag: '🇸🇦', text: 'العربية' }
        };

        const current = langData[this.currentLang];

        if (flagElement) flagElement.textContent = current.flag;
        if (textElement) textElement.textContent = current.text;
        if (footerFlagElement) footerFlagElement.textContent = current.flag;
        if (footerTextElement) footerTextElement.textContent = current.text;
    }

    loadTranslations() {
        this.translations = {
            'en': {
                // Navigation
                'nav.home': 'Home',
                'nav.about': 'About',
                'nav.services': 'Services',
                'nav.projects': 'Projects',
                'nav.contact': 'Contact',

                // Hero Section
                'hero.badge': 'Trusted by 500+ Clients',
                'hero.title': 'Transform Your Ideas Into Reality',
                'hero.subtitle': 'Professional 3D printing services for prototypes, custom parts, and innovative designs across all industries',
                'hero.stat1': 'Projects Completed',
                'hero.stat2': 'Client Satisfaction',
                'hero.stat3': 'Response Time',
                'hero.viewWork': 'View Our Work',
                'hero.startProject': 'Start Your Project',

                // Services
                'services.badge': 'Our Expertise',
                'services.title': 'Professional 3D Printing Services',
                'services.subtitle': 'From concept to creation, we bring your ideas to life with precision and quality',
                'service.design.title': '3D Design & Modeling',
                'service.design.desc': 'Professional CAD design and 3D modeling services for your custom requirements',
                'service.printing.title': '3D Printing',
                'service.printing.desc': 'High-precision 3D printing with various materials and technologies',
                'service.finishing.title': 'Post-Processing',
                'service.finishing.desc': 'Professional finishing services including painting, sanding, and assembly',

                // About
                'about.title': 'About XT 3D Projects',
                'about.subtitle': 'Transforming ideas into tangible reality through innovative 3D printing technology',
                'about.desc1': 'Welcome to XT 3D Projects, your premier destination for professional 3D printing services. We specialize in transforming creative concepts into physical reality using cutting-edge additive manufacturing technology.',
                'about.desc2': 'With over 5 years of experience and a portfolio of 500+ successful projects, we serve clients across various industries including automotive, medical, architecture, and industrial manufacturing.',
                'about.stat1': 'Projects',
                'about.stat2': 'Satisfaction',
                'about.stat3': 'Years',
                'about.highlight1': 'Award-Winning Quality',
                'about.highlight2': '24/7 Support',
                'about.highlight3': 'Global Reach',

                // Projects
                'projects.badge': 'Our Portfolio',
                'projects.title': 'Featured Projects',
                'projects.subtitle': 'Explore our diverse range of 3D printing applications across different industries',
                'project.category.mobile': 'Mobile',
                'project.category.collection': 'Collection',
                'project.category.prototype': 'Prototype',
                'project.mobile.title': 'Custom Phone Cases',
                'project.mobile.desc': 'Personalized phone cases with unique designs and perfect fit',
                'project.miniature.title': 'Miniature Models',
                'project.miniature.desc': 'Detailed scale models for collectors and enthusiasts',
                'project.prototype.title': 'Functional Prototypes',
                'project.prototype.desc': 'Rapid prototyping for product development and testing',
                'project.order': 'Order Now',
                'projects.cta.title': 'Ready to Start Your Project?',
                'projects.cta.subtitle': 'Join hundreds of satisfied clients who trust us with their 3D printing needs',
                'projects.cta.button': 'Get Started Today',

                // Industries
                'industries.title': 'Industries We Serve',
                'industries.subtitle': 'Specialized 3D printing solutions for diverse industry applications',
                'industry.automotive.title': 'Automotive',
                'industry.automotive.desc': 'Prototypes, parts, and scale models for automotive industry',
                'industry.medical.title': 'Medical',
                'industry.medical.desc': 'Custom prosthetics, anatomical models, and medical devices',
                'industry.architecture.title': 'Architecture',
                'industry.architecture.desc': 'Architectural models, maquettes, and detailed structures',
                'industry.industrial.title': 'Industrial',
                'industry.industrial.desc': 'Manufacturing aids, jigs, fixtures, and custom tooling',
                'industry.art.title': 'Art & Design',
                'industry.art.desc': 'Sculptures, artistic pieces, and creative design objects',

                // Contact
                'contact.title': 'Get In Touch',
                'contact.subtitle': 'Ready to bring your ideas to life? Let\'s discuss your project',
                'contact.email.title': 'Email',
                'contact.phone.title': 'Phone',
                'contact.hours.title': 'Response Time',
                'contact.hours.value': 'Within 24 hours',
                'contact.social.title': 'Follow Us',

                // Form
                'form.name': 'Full Name',
                'form.email': 'Email Address',
                'form.projectType': 'Project Type',
                'form.selectOption': 'Select a project type',
                'form.prototype': 'Functional Prototype',
                'form.model': 'Scale Model',
                'form.custom': 'Custom Part',
                'form.other': 'Other',
                'form.message': 'Project Description',
                'form.file': 'Reference File (Optional)',
                'form.fileHelp': 'Upload STL, OBJ, or reference images',
                'form.submit': 'Send Message',

                // Footer
                'footer.tagline': 'Bringing ideas to life through 3D innovation',
                'footer.quickLinks': 'Quick Links',
                'footer.services': 'Our Services',
                'footer.contact': 'Contact Info',
                'footer.rights': 'All rights reserved',
                'footer.madeWith': 'Made with passion for 3D innovation',

                // Modal
                'modal.success.title': 'Message Sent Successfully!',
                'modal.success.message': 'Thank you for your message. We\'ll get back to you within 24 hours.',
                'modal.close': 'Close',

                // CTA
                'cta.getQuote': 'Get Quote',

                // Page Title
                'title': 'XT 3D Projects - Professional 3D Printing Services'
            },
            'fr': {
                // Navigation
                'nav.home': 'Accueil',
                'nav.about': 'À Propos',
                'nav.services': 'Services',
                'nav.projects': 'Projets',
                'nav.contact': 'Contact',

                // Hero Section
                'hero.badge': 'Approuvé par 500+ Clients',
                'hero.title': 'Transformez Vos Idées en Réalité',
                'hero.subtitle': 'Services professionnels d\'impression 3D pour prototypes, pièces personnalisées et designs innovants',
                'hero.stat1': 'Projets Réalisés',
                'hero.stat2': 'Satisfaction Client',
                'hero.stat3': 'Temps de Réponse',
                'hero.viewWork': 'Voir Notre Travail',
                'hero.startProject': 'Commencer Votre Projet',

                // Services
                'services.badge': 'Notre Expertise',
                'services.title': 'Services d\'Impression 3D Professionnels',
                'services.subtitle': 'Du concept à la création, nous donnons vie à vos idées avec précision et qualité',
                'service.design.title': 'Conception 3D & Modélisation',
                'service.design.desc': 'Services de conception CAD et modélisation 3D professionnels pour vos besoins personnalisés',
                'service.printing.title': 'Impression 3D',
                'service.printing.desc': 'Impression 3D haute précision avec divers matériaux et technologies',
                'service.finishing.title': 'Post-Traitement',
                'service.finishing.desc': 'Services de finition professionnels incluant peinture, ponçage et assemblage',

                // About
                'about.title': 'À Propos de XT 3D Projects',
                'about.subtitle': 'Transformer les idées en réalité tangible grâce à la technologie d\'impression 3D innovante',
                'about.desc1': 'Bienvenue chez XT 3D Projects, votre destination de premier choix pour les services d\'impression 3D professionnels. Nous nous spécialisons dans la transformation de concepts créatifs en réalité physique en utilisant la technologie de fabrication additive de pointe.',
                'about.desc2': 'Avec plus de 5 ans d\'expérience et un portfolio de 500+ projets réussis, nous servons des clients dans diverses industries incluant l\'automobile, la médecine, l\'architecture et la fabrication industrielle.',
                'about.stat1': 'Projets',
                'about.stat2': 'Satisfaction',
                'about.stat3': 'Années',
                'about.highlight1': 'Qualité Récompensée',
                'about.highlight2': 'Support 24/7',
                'about.highlight3': 'Portée Globale',

                // Projects
                'projects.badge': 'Notre Portfolio',
                'projects.title': 'Projets en Vedette',
                'projects.subtitle': 'Explorez notre gamme diversifiée d\'applications d\'impression 3D dans différentes industries',
                'project.category.mobile': 'Mobile',
                'project.category.collection': 'Collection',
                'project.category.prototype': 'Prototype',
                'project.mobile.title': 'Coques de Téléphone Personnalisées',
                'project.mobile.desc': 'Coques de téléphone personnalisées avec designs uniques et ajustement parfait',
                'project.miniature.title': 'Modèles Miniatures',
                'project.miniature.desc': 'Modèles à échelle détaillés pour collectionneurs et passionnés',
                'project.prototype.title': 'Prototypes Fonctionnels',
                'project.prototype.desc': 'Prototypage rapide pour le développement et les tests de produits',
                'project.order': 'Commander',
                'projects.cta.title': 'Prêt à Commencer Votre Projet?',
                'projects.cta.subtitle': 'Rejoignez des centaines de clients satisfaits qui nous font confiance',
                'projects.cta.button': 'Commencer Aujourd\'hui',

                // Industries
                'industries.title': 'Industries que Nous Servons',
                'industries.subtitle': 'Solutions d\'impression 3D spécialisées pour diverses applications industrielles',
                'industry.automotive.title': 'Automobile',
                'industry.automotive.desc': 'Prototypes, pièces et modèles à échelle pour l\'industrie automobile',
                'industry.medical.title': 'Médical',
                'industry.medical.desc': 'Prothèses personnalisées, modèles anatomiques et dispositifs médicaux',
                'industry.architecture.title': 'Architecture',
                'industry.architecture.desc': 'Modèles architecturaux, maquettes et structures détaillées',
                'industry.industrial.title': 'Industriel',
                'industry.industrial.desc': 'Aides à la fabrication, gabarits, fixations et outillage personnalisé',
                'industry.art.title': 'Art & Design',
                'industry.art.desc': 'Sculptures, pièces artistiques et objets de design créatif',

                // Contact
                'contact.title': 'Contactez-Nous',
                'contact.subtitle': 'Prêt à donner vie à vos idées? Discutons de votre projet',
                'contact.email.title': 'Email',
                'contact.phone.title': 'Téléphone',
                'contact.hours.title': 'Temps de Réponse',
                'contact.hours.value': 'Dans les 24 heures',
                'contact.social.title': 'Suivez-Nous',

                // Form
                'form.name': 'Nom Complet',
                'form.email': 'Adresse Email',
                'form.projectType': 'Type de Projet',
                'form.selectOption': 'Sélectionnez un type de projet',
                'form.prototype': 'Prototype Fonctionnel',
                'form.model': 'Modèle à l\'Échelle',
                'form.custom': 'Pièce Personnalisée',
                'form.other': 'Autre',
                'form.message': 'Description du Projet',
                'form.file': 'Fichier de Référence (Optionnel)',
                'form.fileHelp': 'Téléchargez STL, OBJ ou images de référence',
                'form.submit': 'Envoyer le Message',

                // Footer
                'footer.tagline': 'Donner vie aux idées grâce à l\'innovation 3D',
                'footer.quickLinks': 'Liens Rapides',
                'footer.services': 'Nos Services',
                'footer.contact': 'Info Contact',
                'footer.rights': 'Tous droits réservés',
                'footer.madeWith': 'Créé avec passion pour l\'innovation 3D',

                // Modal
                'modal.success.title': 'Message Envoyé avec Succès!',
                'modal.success.message': 'Merci pour votre message. Nous vous répondrons dans les 24 heures.',
                'modal.close': 'Fermer',

                // CTA
                'cta.getQuote': 'Obtenir un Devis',

                // Page Title
                'title': 'XT 3D Projects - Services d\'Impression 3D Professionnels'
            },
            'ar': {
                // Navigation
                'nav.home': 'الرئيسية',
                'nav.about': 'من نحن',
                'nav.services': 'الخدمات',
                'nav.projects': 'المشاريع',
                'nav.contact': 'اتصل بنا',

                // Hero Section
                'hero.badge': 'موثوق من قبل 500+ عميل',
                'hero.title': 'حول أفكارك إلى واقع',
                'hero.subtitle': 'خدمات طباعة ثلاثية الأبعاد المهنية للنماذج الأولية والقطع المخصصة والتصاميم المبتكرة',
                'hero.stat1': 'مشاريع مكتملة',
                'hero.stat2': 'رضا العملاء',
                'hero.stat3': 'وقت الرد',
                'hero.viewWork': 'عرض أعمالنا',
                'hero.startProject': 'ابدأ مشروعك',

                // Services
                'services.badge': 'خبرتنا',
                'services.title': 'خدمات الطباعة ثلاثية الأبعاد المهنية',
                'services.subtitle': 'من المفهوم إلى الإنشاء، نحن نحول أفكارك إلى واقع بدقة وجودة',
                'service.design.title': 'التصميم ثلاثي الأبعاد والنمذجة',
                'service.design.desc': 'خدمات التصميم باستخدام CAD والنمذجة ثلاثية الأبعاد المهنية لمتطلباتك المخصصة',
                'service.printing.title': 'الطباعة ثلاثية الأبعاد',
                'service.printing.desc': 'طباعة ثلاثية الأبعاد عالية الدقة مع مواد وتقنيات متنوعة',
                'service.finishing.title': 'المعالجة النهائية',
                'service.finishing.desc': 'خدمات التشطيب المهنية بما في ذلك الطلاء والصنفرة والتجميع',

                // About
                'about.title': 'من نحن XT 3D Projects',
                'about.subtitle': 'تحويل الأفكار إلى واقع ملموس من خلال تقنية الطباعة ثلاثية الأبعاد المبتكرة',
                'about.desc1': 'مرحباً بكم في XT 3D Projects، وجهتكم الأولى لخدمات الطباعة ثلاثية الأبعاد المهنية. نحن متخصصون في تحويل المفاهيم الإبداعية إلى واقع مادي باستخدام تقنية التصنيع الإضافي المتطورة.',
                'about.desc2': 'مع أكثر من 5 سنوات من الخبرة ومحفظة تضم 500+ مشروع ناجح، نخدم العملاء في مختلف الصناعات بما في ذلك السيارات والطب والعمارة والتصنيع الصناعي.',
                'about.stat1': 'مشاريع',
                'about.stat2': 'رضا',
                'about.stat3': 'سنوات',
                'about.highlight1': 'جودة حائزة على جوائز',
                'about.highlight2': 'دعم 24/7',
                'about.highlight3': 'انتشار عالمي',

                // Projects
                'projects.badge': 'محفظتنا',
                'projects.title': 'المشاريع المميزة',
                'projects.subtitle': 'استكشف مجموعتنا المتنوعة من تطبيقات الطباعة ثلاثية الأبعاد في مختلف الصناعات',
                'project.category.mobile': 'موبايل',
                'project.category.collection': 'مجموعة',
                'project.category.prototype': 'نموذج أولي',
                'project.mobile.title': 'أغلفة الهواتف المخصصة',
                'project.mobile.desc': 'أغلفة هواتف مخصصة بتصاميم فريدة وملاءمة مثالية',
                'project.miniature.title': 'النماذج المصغرة',
                'project.miniature.desc': 'نماذج مصغرة مفصلة للهواة والمجموعين',
                'project.prototype.title': 'النماذج الأولية الوظيفية',
                'project.prototype.desc': 'النماذج الأولية السريعة لتطوير واختبار المنتجات',
                'project.order': 'اطلب الآن',
                'projects.cta.title': 'جاهز لبدء مشروعك؟',
                'projects.cta.subtitle': 'انضم إلى مئات العملاء الراضين الذين يثقون بنا',
                'projects.cta.button': 'ابدأ اليوم',

                // Industries
                'industries.title': 'الصناعات التي نخدمها',
                'industries.subtitle': 'حلول الطباعة ثلاثية الأبعاد المتخصصة لتطبيقات صناعية متنوعة',
                'industry.automotive.title': 'السيارات',
                'industry.automotive.desc': 'النماذج الأولية والقطع ونماذج المقياس لصناعة السيارات',
                'industry.medical.title': 'الطبية',
                'industry.medical.desc': 'الأطراف الصناعية المخصصة ونماذج التشريح والأجهزة الطبية',
                'industry.architecture.title': 'الهندسة المعمارية',
                'industry.architecture.title': 'النماذج المعمارية والمعروضات والتراكيب المفصلة',
                'industry.industrial.title': 'الصناعية',
                'industry.industrial.desc': 'مساعدات التصنيع والقوالب والتثبيتات والأدوات المخصصة',
                'industry.art.title': 'الفن والتصميم',
                'industry.art.desc': 'المنحوتات والقطع الفنية وأشياء التصميم الإبداعي',

                // Contact
                'contact.title': 'تواصل معنا',
                'contact.subtitle': 'جاهز لإحياء أفكارك؟ دعنا نناقش مشروعك',
                'contact.email.title': 'البريد الإلكتروني',
                'contact.phone.title': 'الهاتف',
                'contact.hours.title': 'وقت الرد',
                'contact.hours.value': 'خلال 24 ساعة',
                'contact.social.title': 'تابعنا',

                // Form
                'form.name': 'الاسم الكامل',
                'form.email': 'عنوان البريد الإلكتروني',
                'form.projectType': 'نوع المشروع',
                'form.selectOption': 'اختر نوع المشروع',
                'form.prototype': 'نموذج أولي وظيفي',
                'form.model': 'نموذج مقياس',
                'form.custom': 'قطعة مخصصة',
                'form.other': 'أخرى',
                'form.message': 'وصف المشروع',
                'form.file': 'ملف مرجعي (اختياري)',
                'form.fileHelp': 'ارفع STL أو OBJ أو صور مرجعية',
                'form.submit': 'إرسال الرسالة',

                // Footer
                'footer.tagline': 'إحياء الأفكار من خلال الابتكار ثلاثي الأبعاد',
                'footer.quickLinks': 'روابط سريعة',
                'footer.services': 'خدماتنا',
                'footer.contact': 'معلومات الاتصال',
                'footer.rights': 'جميع الحقوق محفوظة',
                'footer.madeWith': 'مصنوع بحب للابتكار ثلاثي الأبعاد',

                // Modal
                'modal.success.title': 'تم إرسال الرسالة بنجاح!',
                'modal.success.message': 'شكراً لرسالتك. سنعود إليك خلال 24 ساعة.',
                'modal.close': 'إغلاق',

                // CTA
                'cta.getQuote': 'احصل على عرض سعر',

                // Page Title
                'title': 'XT 3D Projects - خدمات الطباعة ثلاثية الأبعاد المهنية'
            }
        };
    }

    applyTranslations() {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (this.translations[this.currentLang] && this.translations[this.currentLang][key]) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = this.translations[this.currentLang][key];
                } else if (element.tagName === 'TITLE') {
                    document.title = this.translations[this.currentLang][key];
                } else {
                    element.textContent = this.translations[this.currentLang][key];
                }
            }
        });
    }

    getTranslation(key) {
        return this.translations[this.currentLang]?.[key] || key;
    }

    getCurrentLanguage() {
        return this.currentLang;
    }
}

// Initialize language manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.languageManager = new LanguageManager();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LanguageManager;
}