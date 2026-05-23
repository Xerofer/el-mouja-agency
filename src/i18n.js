import siteData from "./data.json";

// Multilingual content for الموجة Agency — Arabic, English, French

export const LANGS = {
  ar: { label: "العربية", dir: "rtl", code: "AR" },
  en: { label: "English", dir: "ltr", code: "EN" },
  fr: { label: "Français", dir: "ltr", code: "FR" },
};

export const translations = {
  ar: {
    // nav
    nav: {
      home: "الرئيسية",
      about: "من نحن",
      services: "الخدمات",
      work: "أعمالنا",
      team: "الفريق",
      join: "انضم إلينا",
      contact: "اتصل بنا",
      lightMode: "الوضع الفاتح",
      darkMode: "الوضع الداكن",
    },
    // loader
    loader: {
      tagline: "موجة من الإبداع",
    },
    // hero
    hero: {
      kicker: "وكالة اتصال • إشهار • تسويق",
      title1: "نصنع",
      titleHighlight: "الموجة",
      title2: "التي تحرّك علامتك",
      subtitle:
        "نربط صنّاع المحتوى بالشركات، ونبني هويتك من الصفر — تسويقًا وإشهارًا وهوية بصرية.",
      ctaPrimary: "ابدأ مشروعك",
      ctaSecondary: "اكتشف أعمالنا",
      stat1: "مشروع منجز",
      stat2: "صانع محتوى",
      stat3: "علامة تجارية",
    },
    // about
    about: {
      kicker: "من نحن",
      title: "وكالة الموجة",
      lead:
        "الموجة هي وكالة اتصال وإشهار وتسويق. نحن الجسر بين صنّاع المحتوى والشركات.",
      body:
        "نبني هوية شركتك من الصفر — من الاستراتيجية التسويقية إلى الإشهار والهوية البصرية. مهمتنا أن نمنح علامتك صوتًا أصيلًا وحضورًا لا يُنسى.",
      point1: "استراتيجية مبنية على البيانات",
      point2: "إبداع بلا حدود",
      point3: "تنفيذ احترافي من الألف إلى الياء",
    },
    // services
    services: {
      kicker: "ما نقدّمه",
      title: "خدماتنا",
      subtitle: "حلول متكاملة لتنمية علامتك التجارية",
      list: [
        { t: "إدارة الشبكات الاجتماعية", d: "استراتيجية وتصميم وإنشاء محتوى جذّاب يحقق التفاعل." },
        { t: "إنتاج الفيديو", d: "كتابة السيناريو، التعليق الصوتي، التصوير والمونتاج الاحترافي." },
        { t: "الاستراتيجية التسويقية", d: "خطة عمل مخصّصة لتطوير علامتك التجارية." },
        { t: "الإشهار والإعلانات", d: "حملات إعلانية مستهدفة على مختلف المنصات." },
        { t: "الرعاية والشراكات", d: "ربطك برعاة وشركاء يعزّزون نموّ علامتك." },
        { t: "محتوى UGC", d: "محتوى أصيل من المستخدمين مصمّم لعلامتك." },
        { t: "إنشاء المواقع والتطبيقات", d: "مواقع ويب وتطبيقات جوال عصرية وسريعة." },
        { t: "صناعة الأفلام", d: "أفلام قصيرة وإعلانية بجودة سينمائية." },
        { t: "تنظيم الأحداث", d: "تخطيط وتنظيم فعاليات احترافية لا تُنسى." },
        { t: "الأعراس والمناسبات", d: "تغطية وتنظيم الأعراس وحفلات المناقشة." },
      ],
    },
    // work
    work: {
      kicker: "إنجازاتنا",
      title: "أعمالنا",
      subtitle: "نظرة على بعض المشاريع التي صنعناها",
      filterAll: "الكل",
      filterVideo: "فيديو",
      filterImage: "تصميم",
    },
    // team
    team: {
      kicker: "وراء الموجة",
      title: "فريقنا",
      subtitle: "العقول المبدعة التي تحرّك كل مشروع",
    },
    // join
    join: {
      kicker: "كن جزءًا منّا",
      title: "انضم إلى الموجة",
      subtitle: "اختر فئتك واملأ النموذج، وسنتواصل معك قريبًا.",
      creator: "صانع محتوى",
      creatorDesc: "هل تصنع محتوى؟ انضم إلى شبكتنا من المبدعين.",
      company: "شركة / علامة تجارية",
      companyDesc: "هل لديك علامة تجارية؟ دعنا نبنيها معًا.",
      fields: {
        firstName: "الاسم",
        lastName: "اللقب",
        phone: "رقم الهاتف",
        tiktok: "رابط حساب تيك توك",
        instagram: "رابط حساب إنستغرام",
        companyName: "اسم الشركة",
        description: "الوصف — ماذا تريد من وكالتنا؟",
      },
      submit: "إرسال الطلب",
      success: "تم استلام طلبك! سنتواصل معك قريبًا.",
      back: "رجوع",
    },
    // contact
    contact: {
      kicker: "تواصل معنا",
      title: "لنصنع شيئًا عظيمًا",
      subtitle: "نحن على بُعد رسالة واحدة.",
      phone: "الهاتف",
      follow: "تابعنا",
    },
    footer: {
      rights: "جميع الحقوق محفوظة",
      built: "وكالة الموجة — نصنع الموجة التي تحرّك علامتك.",
    },
  },

  en: {
    nav: {
      home: "Home",
      about: "About",
      services: "Services",
      work: "Work",
      team: "Team",
      join: "Join Us",
      contact: "Contact",
      lightMode: "Light mode",
      darkMode: "Dark mode",
    },
    loader: {
      tagline: "A wave of creativity",
    },
    hero: {
      kicker: "Communication • Advertising • Marketing Agency",
      title1: "We create the",
      titleHighlight: "wave",
      title2: "that moves your brand",
      subtitle:
        "We connect content creators with companies, and build your identity from scratch — marketing, advertising, and visual identity.",
      ctaPrimary: "Start your project",
      ctaSecondary: "Explore our work",
      stat1: "Projects delivered",
      stat2: "Content creators",
      stat3: "Brands built",
    },
    about: {
      kicker: "Who we are",
      title: "El Mouja Agency",
      lead:
        "El Mouja is a communication, advertising and marketing agency. We are the bridge between content creators and companies.",
      body:
        "We build your company's identity from the ground up — from marketing strategy to advertising and visual identity. Our mission is to give your brand an authentic voice and an unforgettable presence.",
      point1: "Data-driven strategy",
      point2: "Boundless creativity",
      point3: "End-to-end professional execution",
    },
    services: {
      kicker: "What we offer",
      title: "Our Services",
      subtitle: "Integrated solutions to grow your brand",
      list: [
        { t: "Social Media Management", d: "Strategy, design and engaging content creation that drives results." },
        { t: "Video Production", d: "Scriptwriting, voice-over, professional shooting and editing." },
        { t: "Marketing Strategy", d: "A personalized action plan to develop your brand." },
        { t: "Advertising", d: "Targeted ad campaigns across every platform." },
        { t: "Sponsors & Partnerships", d: "Connecting you with sponsors and partners that fuel growth." },
        { t: "UGC Content", d: "Authentic user-generated content crafted for your brand." },
        { t: "Websites & Mobile Apps", d: "Modern, fast websites and mobile applications." },
        { t: "Film Making", d: "Short films and commercials with cinematic quality." },
        { t: "Event Organization", d: "Planning and running unforgettable professional events." },
        { t: "Weddings & Ceremonies", d: "Coverage and organization of weddings and thesis defenses." },
      ],
    },
    work: {
      kicker: "Our portfolio",
      title: "Our Work",
      subtitle: "A look at some of the projects we've crafted",
      filterAll: "All",
      filterVideo: "Video",
      filterImage: "Design",
    },
    team: {
      kicker: "Behind the wave",
      title: "Our Team",
      subtitle: "The creative minds driving every project",
    },
    join: {
      kicker: "Be part of us",
      title: "Join the Wave",
      subtitle: "Choose your category, fill in the form, and we'll reach out soon.",
      creator: "Content Creator",
      creatorDesc: "Do you create content? Join our network of creators.",
      company: "Company / Brand",
      companyDesc: "Have a brand? Let's build it together.",
      fields: {
        firstName: "First name",
        lastName: "Last name",
        phone: "Phone number",
        tiktok: "TikTok account link",
        instagram: "Instagram account link",
        companyName: "Company name",
        description: "Description — what do you want from our agency?",
      },
      submit: "Submit request",
      success: "Your request has been received! We'll be in touch soon.",
      back: "Back",
    },
    contact: {
      kicker: "Get in touch",
      title: "Let's make something great",
      subtitle: "We're just one message away.",
      phone: "Phone",
      follow: "Follow us",
    },
    footer: {
      rights: "All rights reserved",
      built: "El Mouja Agency — we create the wave that moves your brand.",
    },
  },

  fr: {
    nav: {
      home: "Accueil",
      about: "À propos",
      services: "Services",
      work: "Réalisations",
      team: "Équipe",
      join: "Rejoignez-nous",
      contact: "Contact",
      lightMode: "Mode clair",
      darkMode: "Mode sombre",
    },
    loader: {
      tagline: "Une vague de créativité",
    },
    hero: {
      kicker: "Agence de communication • publicité • marketing",
      title1: "Nous créons la",
      titleHighlight: "vague",
      title2: "qui propulse votre marque",
      subtitle:
        "Nous relions les créateurs de contenu aux entreprises et construisons votre identité de A à Z — marketing, publicité et identité visuelle.",
      ctaPrimary: "Démarrer votre projet",
      ctaSecondary: "Voir nos réalisations",
      stat1: "Projets livrés",
      stat2: "Créateurs de contenu",
      stat3: "Marques construites",
    },
    about: {
      kicker: "Qui sommes-nous",
      title: "Agence El Mouja",
      lead:
        "El Mouja est une agence de communication, de publicité et de marketing. Nous sommes le pont entre les créateurs de contenu et les entreprises.",
      body:
        "Nous construisons l'identité de votre entreprise à partir de zéro — de la stratégie marketing à la publicité et à l'identité visuelle. Notre mission : donner à votre marque une voix authentique et une présence inoubliable.",
      point1: "Stratégie pilotée par la donnée",
      point2: "Créativité sans limites",
      point3: "Exécution professionnelle de bout en bout",
    },
    services: {
      kicker: "Ce que nous offrons",
      title: "Nos Services",
      subtitle: "Des solutions intégrées pour faire grandir votre marque",
      list: [
        { t: "Gestion des réseaux sociaux", d: "Stratégie, design et création de contenu engageant." },
        { t: "Production vidéo", d: "Écriture de script, voix off, tournage et montage professionnel." },
        { t: "Stratégie marketing", d: "Un plan d'action personnalisé pour développer votre marque." },
        { t: "Publicité", d: "Campagnes publicitaires ciblées sur toutes les plateformes." },
        { t: "Sponsors & partenariats", d: "Vous relier aux sponsors et partenaires qui boostent la croissance." },
        { t: "Contenu UGC", d: "Contenu authentique créé pour votre marque." },
        { t: "Sites web & applications", d: "Sites web et applications mobiles modernes et rapides." },
        { t: "Réalisation de films", d: "Courts-métrages et publicités de qualité cinématographique." },
        { t: "Organisation d'événements", d: "Planification et organisation d'événements inoubliables." },
        { t: "Mariages & soutenances", d: "Couverture et organisation de mariages et de soutenances." },
      ],
    },
    work: {
      kicker: "Notre portfolio",
      title: "Nos Réalisations",
      subtitle: "Un aperçu de quelques projets que nous avons créés",
      filterAll: "Tout",
      filterVideo: "Vidéo",
      filterImage: "Design",
    },
    team: {
      kicker: "Derrière la vague",
      title: "Notre Équipe",
      subtitle: "Les esprits créatifs derrière chaque projet",
    },
    join: {
      kicker: "Faites partie de nous",
      title: "Rejoignez la Vague",
      subtitle: "Choisissez votre catégorie, remplissez le formulaire, et nous vous contacterons bientôt.",
      creator: "Créateur de contenu",
      creatorDesc: "Vous créez du contenu ? Rejoignez notre réseau de créateurs.",
      company: "Entreprise / Marque",
      companyDesc: "Vous avez une marque ? Construisons-la ensemble.",
      fields: {
        firstName: "Prénom",
        lastName: "Nom",
        phone: "Numéro de téléphone",
        tiktok: "Lien du compte TikTok",
        instagram: "Lien du compte Instagram",
        companyName: "Nom de l'entreprise",
        description: "Description — que voulez-vous de notre agence ?",
      },
      submit: "Envoyer la demande",
      success: "Votre demande a été reçue ! Nous vous contacterons bientôt.",
      back: "Retour",
    },
    contact: {
      kicker: "Contactez-nous",
      title: "Créons quelque chose de grand",
      subtitle: "Nous sommes à un message de vous.",
      phone: "Téléphone",
      follow: "Suivez-nous",
    },
    footer: {
      rights: "Tous droits réservés",
      built: "Agence El Mouja — nous créons la vague qui propulse votre marque.",
    },
  },
};

// Shared data — team members and work items are loaded from src/data.json
// so they can be managed through the /admin page without touching code.
export const teamMembers = siteData.teamMembers;
export const workItems = siteData.workItems;

export const agencyContact = {
  phone: "+213 555 00 00 00",
  facebook: "https://facebook.com/almoujaagency",
  instagram: "https://instagram.com/almouja.agency",
  tiktok: "https://tiktok.com/@almouja.agency",
};
