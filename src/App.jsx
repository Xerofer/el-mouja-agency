import { useState, useEffect, useRef, createContext, useContext } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  translations,
  LANGS,
  teamMembers,
  workItems,
  agencyContact,
} from "./i18n";
import { Icons } from "./Icons";
import "./components.css";

/* ===== Language context ===== */
const LangCtx = createContext();
const useLang = () => useContext(LangCtx);

/* ===== Theme context ===== */
const ThemeCtx = createContext();
const useTheme = () => useContext(ThemeCtx);

/* ===== Scroll-reveal wrapper ===== */
function Reveal({ children, delay = 0, y = 40, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ===== PRELOADER — landing intro ===== */
function Preloader({ onDone }) {
  const { t } = useLang();
  useEffect(() => {
    const timer = setTimeout(onDone, 2900);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <motion.div
      className="preloader noise"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6 } }}
    >
      <motion.svg
        className="preloader-wave"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        initial={{ y: 320 }}
        animate={{ y: 120 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        style={{ height: 320 }}
      >
        <defs>
          <linearGradient id="pwave" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6d5797" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#6d5797" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          fill="url(#pwave)"
          animate={{
            d: [
              "M0,160 C320,260 520,60 720,140 C920,220 1120,80 1440,160 L1440,320 L0,320 Z",
              "M0,140 C320,60 520,240 720,160 C920,80 1120,240 1440,140 L1440,320 L0,320 Z",
              "M0,160 C320,260 520,60 720,140 C920,220 1120,80 1440,160 L1440,320 L0,320 Z",
            ],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.svg>

      <motion.img
        src="/logo.png"
        alt="الموجة"
        className="preloader-logo"
        initial={{ opacity: 0, scale: 0.6, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      />
      <motion.div
        className="preloader-tag"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1 }}
      >
        {t.loader.tagline}
      </motion.div>
      <div className="preloader-bar">
        <motion.span
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2.4, ease: "easeInOut", delay: 0.3 }}
        />
      </div>
    </motion.div>
  );
}

/* ===== THEME TOGGLE ===== */
function ThemeToggle({ className = "" }) {
  const { t } = useLang();
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      className={`theme-toggle ${className}`}
      onClick={toggleTheme}
      aria-label={theme === "dark" ? t.nav.lightMode : t.nav.darkMode}
      title={theme === "dark" ? t.nav.lightMode : t.nav.darkMode}
    >
      <span className="theme-toggle-track">
        <motion.span
          className="theme-toggle-thumb"
          animate={{ x: theme === "dark" ? 0 : 22 }}
          transition={{ type: "spring", stiffness: 500, damping: 32 }}
        >
          {theme === "dark" ? (
            <Icons.moon style={{ width: 12, height: 12 }} />
          ) : (
            <Icons.sun style={{ width: 12, height: 12 }} />
          )}
        </motion.span>
      </span>
    </button>
  );
}

/* ===== NAVBAR ===== */
function Navbar({ onJoin }) {
  const { t, lang, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const langRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close language menu on outside click / Escape
  useEffect(() => {
    if (!langOpen) return;
    const onClick = (e) => {
      if (langRef.current && !langRef.current.contains(e.target))
        setLangOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setLangOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [langOpen]);

  // lock scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const links = [
    ["home", "#home"],
    ["about", "#about"],
    ["services", "#services"],
    ["work", "#work"],
    ["team", "#team"],
    ["contact", "#contact"],
  ];

  const go = (hash) => {
    setMenuOpen(false);
    document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        className={`nav ${scrolled ? "scrolled" : ""}`}
        initial={{ y: -90 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      >
        <div className="nav-inner">
          <div className="nav-brand" onClick={() => go("#home")}>
            <img src="/logo.png" alt="الموجة" />
            <span className="nav-brand-name">
              EL MOUJA<span style={{ color: "var(--violet)" }}>.</span>
            </span>
          </div>

          <ul className="nav-links">
            {links.map(([key, hash]) => (
              <li key={key}>
                <a className="nav-link" onClick={() => go(hash)}>
                  {t.nav[key]}
                </a>
              </li>
            ))}
          </ul>

          <div className="nav-right">
            <ThemeToggle className="nav-theme-desktop" />

            <div className="lang-switch" ref={langRef}>
              <button
                className="lang-btn"
                onClick={() => setLangOpen((o) => !o)}
                aria-expanded={langOpen}
              >
                <Icons.globe style={{ width: 15, height: 15 }} />
                {LANGS[lang].code}
                <Icons.chevron
                  style={{
                    width: 13,
                    height: 13,
                    transform: langOpen ? "rotate(180deg)" : "none",
                    transition: "transform 0.25s",
                  }}
                />
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    className="lang-menu"
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={{ duration: 0.2 }}
                  >
                    {Object.keys(LANGS).map((code) => (
                      <button
                        key={code}
                        className={`lang-option ${lang === code ? "active" : ""}`}
                        onClick={() => {
                          setLang(code);
                          setLangOpen(false);
                        }}
                      >
                        {LANGS[code].label}
                        {lang === code && <span className="dot" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button className="btn btn-primary nav-cta" onClick={onJoin}>
              {t.nav.join}
            </button>

            <button
              className={`burger ${menuOpen ? "open" : ""}`}
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="menu"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {links.map(([key, hash], i) => (
              <motion.a
                key={key}
                onClick={() => go(hash)}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06 * i }}
              >
                {t.nav[key]}
              </motion.a>
            ))}
            <motion.div
              className="mobile-menu-actions"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <ThemeToggle />
              <button
                className="btn btn-primary"
                onClick={() => {
                  setMenuOpen(false);
                  onJoin();
                }}
              >
                {t.nav.join}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ===== HERO ===== */
function Hero({ onJoin }) {
  const { t, lang } = useLang();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yLogo = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: 34 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="hero noise" id="home" ref={ref}>
      <div className="hero-bg" />
      <div className="hero-grid" />

      <motion.div
        className="wave-glow"
        style={{
          width: 420,
          height: 420,
          background: "var(--violet-deep)",
          top: "-6%",
          [lang === "ar" ? "left" : "right"]: "-4%",
        }}
        animate={{ y: [0, 30, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container">
        <motion.div
          className="hero-inner"
          variants={container}
          initial="hidden"
          animate="show"
          style={{ opacity }}
        >
          <div className="hero-text">
            <motion.div className="hero-kicker" variants={item}>
              <span className="pulse" />
              {t.hero.kicker}
            </motion.div>

            <h1 className="hero-title">
              <motion.span className="word" variants={item}>
                {t.hero.title1}&nbsp;
              </motion.span>
              <motion.span className="word hero-highlight" variants={item}>
                <span className="text-grad">{t.hero.titleHighlight}</span>
                <svg viewBox="0 0 200 24" preserveAspectRatio="none">
                  <motion.path
                    d="M2 14 C40 4 70 22 100 12 C130 2 160 20 198 10"
                    fill="none"
                    stroke="var(--violet)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.1, delay: 1.1 }}
                  />
                </svg>
              </motion.span>
              <br />
              <motion.span className="word" variants={item}>
                {t.hero.title2}
              </motion.span>
            </h1>

            <motion.p className="hero-sub" variants={item}>
              {t.hero.subtitle}
            </motion.p>

            <motion.div className="hero-actions" variants={item}>
              <button className="btn btn-primary" onClick={onJoin}>
                {t.hero.ctaPrimary}
                <Icons.arrow
                  style={{
                    width: 17,
                    height: 17,
                    transform: lang === "ar" ? "scaleX(-1)" : "none",
                  }}
                />
              </button>
              <a
                className="btn btn-ghost"
                onClick={() =>
                  document
                    .querySelector("#work")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                {t.hero.ctaSecondary}
              </a>
            </motion.div>

            <motion.div className="hero-stats" variants={item}>
              {[
                ["120+", t.hero.stat1],
                ["60+", t.hero.stat2],
                ["45+", t.hero.stat3],
              ].map(([num, lbl]) => (
                <div className="hero-stat" key={lbl}>
                  <div className="num">{num}</div>
                  <div className="lbl">{lbl}</div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div className="hero-visual" variants={item}>
            <motion.div className="hero-orb" style={{ y: yLogo }}>
              <div className="hero-orb-glow" />
              {[360, 290, 220].map((size, i) => (
                <motion.div
                  key={size}
                  className="hero-orb-ring"
                  style={{ width: size, height: size }}
                  animate={{ rotate: i % 2 ? -360 : 360 }}
                  transition={{
                    duration: 26 + i * 10,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              ))}
              {[0, 120, 240].map((deg, i) => (
                <motion.div
                  key={deg}
                  style={{ position: "absolute", width: 360, height: 360 }}
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 18 + i * 6,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <div
                    className="hero-orbit-dot"
                    style={{
                      top: 0,
                      left: "50%",
                      transform: `translateX(-50%) rotate(${deg}deg)`,
                    }}
                  />
                </motion.div>
              ))}
              <motion.img
                src="/logo.png"
                alt="الموجة"
                className="hero-logo-float"
                animate={{ y: [0, -16, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ===== WAVE DIVIDER ===== */
function WaveDivider({ flip }) {
  return (
    <div
      style={{
        lineHeight: 0,
        transform: flip ? "scaleY(-1)" : "none",
        position: "relative",
        zIndex: 1,
        marginBottom: -2,
      }}
    >
      <svg
        viewBox="0 0 1440 110"
        preserveAspectRatio="none"
        style={{ width: "100%", height: 80, display: "block" }}
      >
        <motion.path
          fill="var(--bg-2)"
          animate={{
            d: [
              "M0,50 C240,100 480,10 720,50 C960,90 1200,20 1440,55 L1440,110 L0,110 Z",
              "M0,55 C240,15 480,95 720,50 C960,5 1200,85 1440,45 L1440,110 L0,110 Z",
              "M0,50 C240,100 480,10 720,50 C960,90 1200,20 1440,55 L1440,110 L0,110 Z",
            ],
          }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}

/* ===== ABOUT ===== */
function About() {
  const { t } = useLang();
  return (
    <section className="section" id="about" style={{ background: "var(--bg-2)" }}>
      <div className="container">
        <div className="about-grid">
          <Reveal>
            <span className="kicker">{t.about.kicker}</span>
            <h2 className="section-title">
              <span className="text-grad">{t.about.title}</span>
            </h2>
            <p className="about-lead">{t.about.lead}</p>
            <p className="about-body">{t.about.body}</p>
            <div className="about-points">
              {[t.about.point1, t.about.point2, t.about.point3].map((p, i) => (
                <motion.div
                  className="about-point"
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 * i, duration: 0.6 }}
                >
                  <span className="tick">
                    <Icons.check style={{ width: 16, height: 16 }} />
                  </span>
                  {p}
                </motion.div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <motion.div
              className="about-visual"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5 }}
            >
              <div className="about-visual-grid" />
              <motion.img
                src="/logo.png"
                alt="الموجة"
                animate={{ y: [0, -14, 0], rotate: [0, 2, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="about-badge glass">
                <Icons.spark
                  style={{
                    width: 14,
                    height: 14,
                    color: "var(--violet)",
                    display: "inline",
                    verticalAlign: "-2px",
                    marginInlineEnd: 6,
                  }}
                />
                Since 2021
              </div>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ===== SERVICES ===== */
const serviceIcons = [
  Icons.social,
  Icons.video,
  Icons.strategy,
  Icons.ad,
  Icons.sponsor,
  Icons.ugc,
  Icons.web,
  Icons.film,
  Icons.event,
  Icons.wedding,
];

function Services() {
  const { t } = useLang();
  return (
    <section className="section noise" id="services">
      <motion.div
        className="wave-glow"
        style={{
          width: 480,
          height: 480,
          background: "var(--violet-deep)",
          bottom: "5%",
          left: "-10%",
        }}
        animate={{ y: [0, -40, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div className="services-head">
          <Reveal>
            <span className="kicker">{t.services.kicker}</span>
            <h2 className="section-title">{t.services.title}</h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="section-sub">{t.services.subtitle}</p>
          </Reveal>
        </div>

        <div className="services-grid">
          {t.services.list.map((s, i) => {
            const Icon = serviceIcons[i] || Icons.spark;
            return (
              <motion.div
                key={i}
                className="service-card glass"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.6,
                  delay: (i % 3) * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <div className="sc-glow" />
                <div className="service-num">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="service-icon">
                  <Icon />
                </div>
                <h3 className="service-title">{s.t}</h3>
                <p className="service-desc">{s.d}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ===== WORK / PORTFOLIO ===== */
function Work() {
  const { t, lang } = useLang();
  const [filter, setFilter] = useState("all");

  const filtered = workItems.filter(
    (w) => filter === "all" || w.type === filter
  );
  const spanFor = (idx) => {
    const pattern = ["big", "", "", "", "wide", "", "", ""];
    return pattern[idx % pattern.length];
  };

  return (
    <section className="section" id="work" style={{ background: "var(--bg-2)" }}>
      <div className="container">
        <Reveal>
          <span className="kicker">{t.work.kicker}</span>
          <h2 className="section-title">
            {t.work.title.split(" ")[0]}{" "}
            <span className="text-grad">
              {t.work.title.split(" ").slice(1).join(" ")}
            </span>
          </h2>
          <p className="section-sub">{t.work.subtitle}</p>
        </Reveal>

        <div className="work-filters">
          {[
            ["all", t.work.filterAll],
            ["video", t.work.filterVideo],
            ["image", t.work.filterImage],
          ].map(([key, label]) => (
            <button
              key={key}
              className={`work-filter ${filter === key ? "active" : ""}`}
              onClick={() => setFilter(key)}
            >
              {label}
            </button>
          ))}
        </div>

        <motion.div className="work-grid" layout>
          <AnimatePresence mode="popLayout">
            {filtered.map((w, i) => (
              <motion.div
                key={w.id}
                layout
                className={`work-card ${spanFor(i)}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6 }}
              >
                <div
                  className="work-card-bg"
                  style={
                    w.image
                      ? {
                          backgroundImage: `url(${w.image})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }
                      : {
                          background: `linear-gradient(150deg, hsl(${w.hue} 45% 32%), hsl(${
                            w.hue + 30
                          } 50% 16%))`,
                        }
                  }
                />
                <div className="work-card-shimmer" />
                <div className="work-type-badge">
                  {w.type === "video" ? (
                    <Icons.video
                      style={{ width: 16, height: 16, color: "#fff" }}
                    />
                  ) : (
                    <Icons.image
                      style={{ width: 16, height: 16, color: "#fff" }}
                    />
                  )}
                </div>
                {w.type === "video" && (
                  <div className="work-play">
                    <Icons.play
                      style={{
                        width: 22,
                        height: 22,
                        color: "var(--bg)",
                        marginInlineStart: 3,
                      }}
                    />
                  </div>
                )}
                <div className="work-card-overlay">
                  <span className="work-cat">{w.cat[lang]}</span>
                  <h3 className="work-card-title">{w.title[lang]}</h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

/* ===== TEAM ===== */
/* ===== TEAM — horizontal auto-scrolling marquee ===== */
function TeamCard({ m, lang }) {
  // PNG photos are treated as transparent cutouts (whole person visible)
  const isCutout =
    !!m.photo &&
    (m.photo.startsWith("data:image/png") ||
      /\.png(\?|$)/i.test(m.photo));
  return (
    <div className="team-card glass">
      <div className="team-photo">
        {m.photo ? (
          <img
            src={m.photo}
            alt={m.name}
            loading="lazy"
            className={isCutout ? "cutout" : ""}
          />
        ) : null}
        <span className="team-photo-initials">{m.initials}</span>
      </div>
      <div className="team-info">
        <div className="team-name">{m.name}</div>
        <div className="team-role">{m.role[lang]}</div>
      </div>
    </div>
  );
}

function Team() {
  const { t, lang } = useLang();
  const [paused, setPaused] = useState(false);
  const [overflowing, setOverflowing] = useState(true);
  const viewportRef = useRef(null);
  const measureRef = useRef(null);

  // measure: does one full set of cards exceed the available width?
  useEffect(() => {
    const check = () => {
      const vp = viewportRef.current;
      const track = measureRef.current;
      if (!vp || !track) return;
      // when scrolling, the track holds 2 sets -> one set is scrollWidth/2;
      // when static, it holds 1 set -> one set is scrollWidth.
      const oneSet = overflowing
        ? track.scrollWidth / 2
        : track.scrollWidth;
      setOverflowing(oneSet > vp.clientWidth + 4);
    };
    check();
    window.addEventListener("resize", check);
    const t1 = setTimeout(check, 400);
    return () => {
      window.removeEventListener("resize", check);
      clearTimeout(t1);
    };
  }, [lang, overflowing]);

  // when overflowing we render the list twice for a seamless loop;
  // when it fits we render it once, centered and static.
  const cards = overflowing
    ? [...teamMembers, ...teamMembers]
    : teamMembers;

  return (
    <section className="section noise team-section" id="team">
      <div className="container">
        <Reveal>
          <div style={{ textAlign: "center" }}>
            <span className="kicker" style={{ justifyContent: "center" }}>
              {t.team.kicker}
            </span>
            <h2 className="section-title">
              <span className="text-grad">{t.team.title}</span>
            </h2>
            <p className="section-sub" style={{ margin: "16px auto 0" }}>
              {t.team.subtitle}
            </p>
          </div>
        </Reveal>
      </div>

      <Reveal className="team-marquee-reveal">
        <div
          ref={viewportRef}
          className={`team-marquee ${overflowing ? "is-scrolling" : "is-static"} ${
            paused ? "paused" : ""
          }`}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
        >
          <div className="team-track" ref={measureRef}>
            {cards.map((m, i) => (
              <TeamCard key={`${m.id || m.name}-${i}`} m={m} lang={lang} />
            ))}
          </div>
          {overflowing && (
            <>
              <div className="team-marquee-fade left" />
              <div className="team-marquee-fade right" />
            </>
          )}
        </div>
      </Reveal>
    </section>
  );
}

/* ===== JOIN FORM MODAL ===== */
function JoinForm({ category, onClose }) {
  const { t, lang } = useLang();
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({});
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const f = t.join.fields;

  return (
    <motion.div
      className="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="modal noise"
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.95 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        {done ? (
          <div className="form-success">
            <motion.div
              className="form-success-icon"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Icons.check style={{ width: 32, height: 32, color: "#fff" }} />
            </motion.div>
            <h3 className="modal-title">{t.join.success}</h3>
            <button
              className="btn btn-primary form-submit"
              onClick={onClose}
              style={{ marginTop: 22 }}
            >
              {t.join.back}
            </button>
          </div>
        ) : (
          <>
            <h3 className="modal-title">
              {category === "creator" ? t.join.creator : t.join.company}
            </h3>
            <p className="modal-sub">
              {category === "creator" ? t.join.creatorDesc : t.join.companyDesc}
            </p>

            {category === "creator" ? (
              <>
                <div className="form-field">
                  <label>{f.firstName}</label>
                  <input
                    type="text"
                    value={form.firstName || ""}
                    onChange={set("firstName")}
                    placeholder={f.firstName}
                  />
                </div>
                <div className="form-field">
                  <label>{f.lastName}</label>
                  <input
                    type="text"
                    value={form.lastName || ""}
                    onChange={set("lastName")}
                    placeholder={f.lastName}
                  />
                </div>
                <div className="form-field">
                  <label>{f.phone}</label>
                  <input
                    type="tel"
                    value={form.phone || ""}
                    onChange={set("phone")}
                    placeholder="+213 ..."
                  />
                </div>
                <div className="form-field">
                  <label>{f.tiktok}</label>
                  <input
                    type="url"
                    value={form.tiktok || ""}
                    onChange={set("tiktok")}
                    placeholder="https://tiktok.com/@..."
                  />
                </div>
                <div className="form-field">
                  <label>{f.instagram}</label>
                  <input
                    type="url"
                    value={form.instagram || ""}
                    onChange={set("instagram")}
                    placeholder="https://instagram.com/..."
                  />
                </div>
              </>
            ) : (
              <>
                <div className="form-field">
                  <label>{f.companyName}</label>
                  <input
                    type="text"
                    value={form.companyName || ""}
                    onChange={set("companyName")}
                    placeholder={f.companyName}
                  />
                </div>
                <div className="form-field">
                  <label>{f.phone}</label>
                  <input
                    type="tel"
                    value={form.phone || ""}
                    onChange={set("phone")}
                    placeholder="+213 ..."
                  />
                </div>
                <div className="form-field">
                  <label>{f.description}</label>
                  <textarea
                    value={form.description || ""}
                    onChange={set("description")}
                    placeholder={f.description}
                  />
                </div>
              </>
            )}

            <button
              className="btn btn-primary form-submit"
              onClick={() => setDone(true)}
            >
              {t.join.submit}
              <Icons.arrow
                style={{
                  width: 16,
                  height: 16,
                  transform: lang === "ar" ? "scaleX(-1)" : "none",
                }}
              />
            </button>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

/* ===== JOIN SECTION ===== */
function Join({ openCategory, setOpenCategory }) {
  const { t, lang } = useLang();
  return (
    <section className="section" id="join" style={{ background: "var(--bg-2)" }}>
      <div className="container">
        <Reveal>
          <div style={{ textAlign: "center" }}>
            <span className="kicker" style={{ justifyContent: "center" }}>
              {t.join.kicker}
            </span>
            <h2 className="section-title">
              <span className="text-grad">{t.join.title}</span>
            </h2>
            <p className="section-sub" style={{ margin: "16px auto 0" }}>
              {t.join.subtitle}
            </p>
          </div>
        </Reveal>

        <div className="join-cards">
          {[
            ["creator", Icons.creator, t.join.creator, t.join.creatorDesc],
            ["company", Icons.building, t.join.company, t.join.companyDesc],
          ].map(([key, Icon, title, desc], i) => (
            <motion.div
              key={key}
              className="join-card glass"
              onClick={() => setOpenCategory(key)}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <div className="jc-glow" />
              <div className="join-card-icon">
                <Icon style={{ width: 30, height: 30, color: "#fff" }} />
              </div>
              <h3 className="join-card-title">{title}</h3>
              <p className="join-card-desc">{desc}</p>
              <span className="join-card-arrow">
                {t.join.submit}
                <Icons.arrow
                  style={{
                    width: 16,
                    height: 16,
                    transform: lang === "ar" ? "scaleX(-1)" : "none",
                  }}
                />
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {openCategory && (
          <JoinForm
            category={openCategory}
            onClose={() => setOpenCategory(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

/* ===== CONTACT ===== */
function Contact() {
  const { t } = useLang();
  return (
    <section className="section noise" id="contact">
      <div className="container">
        <div className="contact-wrap">
          <Reveal>
            <span className="kicker">{t.contact.kicker}</span>
            <h2 className="section-title">{t.contact.title}</h2>
            <p className="section-sub">{t.contact.subtitle}</p>

            <div className="contact-card glass" style={{ marginTop: 30 }}>
              <a href={`tel:${agencyContact.phone}`} className="contact-row">
                <span className="ci">
                  <Icons.phone
                    style={{ width: 20, height: 20, color: "var(--violet)" }}
                  />
                </span>
                <span>
                  <div className="cl">{t.contact.phone}</div>
                  <div className="cv" dir="ltr">
                    {agencyContact.phone}
                  </div>
                </span>
              </a>

              <div className="contact-row">
                <span className="ci">
                  <Icons.social
                    style={{ width: 20, height: 20, color: "var(--violet)" }}
                  />
                </span>
                <span style={{ width: "100%" }}>
                  <div className="cl">{t.contact.follow}</div>
                  <div className="contact-socials">
                    <a
                      className="social-btn"
                      href={agencyContact.facebook}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Icons.facebook style={{ width: 19, height: 19 }} />
                    </a>
                    <a
                      className="social-btn"
                      href={agencyContact.instagram}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Icons.instagram style={{ width: 19, height: 19 }} />
                    </a>
                    <a
                      className="social-btn"
                      href={agencyContact.tiktok}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Icons.tiktok style={{ width: 19, height: 19 }} />
                    </a>
                  </div>
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="contact-visual">
              <div className="contact-logo-ring">
                <div
                  className="hero-orb-glow"
                  style={{ width: 280, height: 280 }}
                />
                {[320, 250].map((size, i) => (
                  <motion.div
                    key={size}
                    className="hero-orb-ring"
                    style={{ width: size, height: size, position: "absolute" }}
                    animate={{ rotate: i % 2 ? -360 : 360 }}
                    transition={{
                      duration: 30 + i * 12,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                ))}
                <motion.img
                  src="/logo.png"
                  alt="الموجة"
                  animate={{ y: [0, -14, 0] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ===== FOOTER ===== */
function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();
  const links = ["home", "about", "services", "work", "team", "contact"];
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <img src="/logo.png" alt="الموجة" />
            <span className="footer-brand-text">
              EL MOUJA<span style={{ color: "var(--violet)" }}>.</span>
            </span>
          </div>
          <nav className="footer-nav">
            {links.map((l) => (
              <a
                key={l}
                onClick={() =>
                  document
                    .querySelector(`#${l}`)
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                {t.nav[l]}
              </a>
            ))}
          </nav>
        </div>
        <div className="footer-bottom">
          <span>{t.footer.built}</span>
          <div className="footer-socials">
            <a href={agencyContact.facebook} target="_blank" rel="noreferrer">
              <Icons.facebook style={{ width: 16, height: 16 }} />
            </a>
            <a href={agencyContact.instagram} target="_blank" rel="noreferrer">
              <Icons.instagram style={{ width: 16, height: 16 }} />
            </a>
            <a href={agencyContact.tiktok} target="_blank" rel="noreferrer">
              <Icons.tiktok style={{ width: 16, height: 16 }} />
            </a>
          </div>
          <span>
            © {year} — {t.footer.rights}
          </span>
        </div>
      </div>
    </footer>
  );
}

/* ===== ROOT APP ===== */
export default function App() {
  const [lang, setLang] = useState("fr");
  const [theme, setTheme] = useState("dark");
  const [loading, setLoading] = useState(true);
  const [openCategory, setOpenCategory] = useState(null);
  const [showTop, setShowTop] = useState(false);

  const t = translations[lang];
  const dir = LANGS[lang].dir;

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((th) => (th === "dark" ? "light" : "dark"));

  const scrollToJoin = () => {
    document.querySelector("#join")?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "";
  }, [loading]);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <LangCtx.Provider value={{ t, lang, setLang }}>
      <ThemeCtx.Provider value={{ theme, toggleTheme }}>
        <AnimatePresence>
          {loading && <Preloader onDone={() => setLoading(false)} />}
        </AnimatePresence>

        <motion.div className="scroll-progress" style={{ scaleX: progress }} />

        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Navbar onJoin={scrollToJoin} />
            <Hero onJoin={scrollToJoin} />
            <WaveDivider />
            <About />
            <Services />
            <Work />
            <Team />
            <Join
              openCategory={openCategory}
              setOpenCategory={setOpenCategory}
            />
            <Contact />
            <Footer />

            <AnimatePresence>
              {showTop && (
                <motion.button
                  className="to-top"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  whileHover={{ y: -4 }}
                >
                  <Icons.arrowUp
                    style={{ width: 20, height: 20, color: "#fff" }}
                  />
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </ThemeCtx.Provider>
    </LangCtx.Provider>
  );
}
