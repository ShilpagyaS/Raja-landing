"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const CERT_PORTAL = "https://cert.rajagemstones.com";

type Gem = { name: string; type: string; hue: string; hue2: string; accent: string; photo: string };

const SHOWCASE: Gem[] = [
  {
    name: "Blue Sapphire (Neelam)",
    type: "Precious",
    hue: "#1a3aff",
    hue2: "#6e99ff",
    accent: "#2E5BFF",
    photo: "/gems/blue-sapphire-neelam.jpg",
  },
  {
    name: "Ruby",
    type: "Precious",
    hue: "#c0003c",
    hue2: "#ff6b8a",
    accent: "#F0436B",
    photo: "/gems/ruby.jpg",
  },
  {
    name: "Diamond",
    type: "Precious",
    hue: "#8ab0ff",
    hue2: "#e8f0ff",
    accent: "#BFD4FF",
    photo: "/gems/diamond.jpg",
  },
  {
    name: "Emerald (Panna)",
    type: "Precious",
    hue: "#006644",
    hue2: "#22c97a",
    accent: "#18C29C",
    photo: "/gems/emerald-panna.jpg",
  },
  {
    name: "Opal",
    type: "Semi-Precious",
    hue: "#7a6bb0",
    hue2: "#c9e8e0",
    accent: "#B79CD9",
    photo: "/gems/opal.jpg",
  },
  {
    name: "Red Garnet (Hessonite/Gomed)",
    type: "Semi-Precious",
    hue: "#7a0e12",
    hue2: "#ff8a4d",
    accent: "#C9412B",
    photo: "/gems/red-garnet.jpg",
  },
  {
    name: "Yellow Sapphire (Pukhraj)",
    type: "Precious",
    hue: "#b8860b",
    hue2: "#ffe07a",
    accent: "#E8B23A",
    photo: "/gems/yellow-sapphire.jpg",
  },
  {
    name: "Red Coral (Moonga)",
    type: "Organic",
    hue: "#8a1f12",
    hue2: "#ff8a6b",
    accent: "#D9492B",
    photo: "/gems/red-coral-moonga.jpg",
  },
];

const MARQUEE = [
  { icon: "💎", name: "Diamond",    type: "Precious" },
  { icon: "🔴", name: "Ruby",       type: "Precious" },
  { icon: "💚", name: "Emerald",    type: "Precious" },
  { icon: "💙", name: "Sapphire",   type: "Precious" },
  { icon: "🟣", name: "Amethyst",   type: "Semi-Precious" },
  { icon: "🟠", name: "Topaz",      type: "Semi-Precious" },
  { icon: "⚪", name: "Pearl",      type: "Organic" },
  { icon: "🟢", name: "Jade",       type: "Semi-Precious" },
  { icon: "🔵", name: "Aquamarine", type: "Precious" },
  { icon: "⬜", name: "Quartz",     type: "Semi-Precious" },
  { icon: "🟡", name: "Citrine",    type: "Semi-Precious" },
  { icon: "🔶", name: "Tourmaline", type: "Semi-Precious" },
];

function GemArt({ hue, hue2, accent, id }: { hue: string; hue2: string; accent: string; id: string }) {
  return (
    <svg viewBox="0 0 300 400" aria-hidden="true" style={{ position:"absolute", inset:0, width:"100%", height:"100%" }}>
      <defs>
        <radialGradient id={`bg-${id}`} cx="50%" cy="30%" r="80%">
          <stop offset="0%" stopColor={hue2} stopOpacity="0.35" />
          <stop offset="100%" stopColor="#020210" stopOpacity="1" />
        </radialGradient>
        <radialGradient id={`gem-glow-${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.6" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`face-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={hue2} />
          <stop offset="45%" stopColor={accent} />
          <stop offset="100%" stopColor="#010115" />
        </linearGradient>
        <filter id={`blur-${id}`}><feGaussianBlur stdDeviation="18" /></filter>
      </defs>
      <rect width="300" height="400" fill={`url(#bg-${id})`} />
      {/* Glow behind gem */}
      <ellipse cx="150" cy="220" rx="90" ry="90" fill={`url(#gem-glow-${id})`} filter={`url(#blur-${id})`} />
      {/* Big faceted gem */}
      <g transform="translate(150 210)">
        <polygon points="-55,-70 55,-70 80,-20 0,0 -80,-20" fill={`url(#face-${id})`} opacity="0.95" />
        <polygon points="-80,-20 0,0 0,80 -66,35" fill={hue} opacity="0.88" />
        <polygon points="80,-20 0,0 0,80 66,35" fill={hue} opacity="0.72" />
        <polygon points="-55,-70 -80,-20 0,0" fill={hue2} opacity="0.60" />
        <polygon points="55,-70 80,-20 0,0" fill={hue2} opacity="0.40" />
        <polygon points="0,0 -66,35 0,80" fill="rgba(255,255,255,0.08)" />
        <polygon points="-55,-70 55,-70 0,0" fill="rgba(255,255,255,0.14)" />
        <polygon points="-55,-70 55,-70 80,-20 0,80 -80,-20" fill="none" stroke="#EBD08A" strokeOpacity="0.45" strokeWidth="1.5" />
        <circle cx="-28" cy="-42" r="3.5" fill="white" opacity="0.95" />
        <circle cx="18" cy="-50" r="2" fill="white" opacity="0.75" />
        <circle cx="45" cy="-30" r="1.5" fill="white" opacity="0.5" />
        <circle cx="-50" cy="-35" r="1.2" fill="white" opacity="0.45" />
      </g>
    </svg>
  );
}

export default function LandingPage() {
  const particlesRef = useRef<HTMLDivElement>(null);
  const [certNo, setCertNo] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [photoErr, setPhotoErr] = useState<Record<string, boolean>>({});
  const navRef = useRef<HTMLElement>(null);

  // Floating particles + crystal shards
  useEffect(() => {
    const container = particlesRef.current;
    if (!container) return;

    for (let i = 0; i < 40; i++) {
      const p = document.createElement("div");
      p.className = "particle";
      p.style.left = Math.random() * 100 + "%";
      const size = Math.random() * 4 + 1.5;
      p.style.width = p.style.height = size + "px";
      const colors = ["#EBD08A", "#C9A84C", "#ffffff", "#18C29C", "#2E5BFF", "#F0436B"];
      p.style.background = colors[Math.floor(Math.random() * colors.length)];
      p.style.animationDuration = Math.random() * 18 + 10 + "s";
      p.style.animationDelay = Math.random() * 18 + "s";
      container.appendChild(p);
    }

    for (let i = 0; i < 12; i++) {
      const s = document.createElement("div");
      s.className = "crystal-shard";
      s.style.left = Math.random() * 100 + "%";
      const sz = Math.random() * 12 + 6;
      s.style.width = sz * 0.4 + "px";
      s.style.height = sz + "px";
      s.style.animationDuration = Math.random() * 22 + 14 + "s";
      s.style.animationDelay = Math.random() * 20 + "s";
      container.appendChild(s);
    }
  }, []);

  // Scroll reveal
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Counter animation
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          const target = parseInt(el.dataset.count || "0");
          const suffix = el.dataset.suffix || "";
          let current = 0;
          const inc = target / 60;
          const timer = setInterval(() => {
            current += inc;
            if (current >= target) { current = target; clearInterval(timer); }
            el.textContent = Math.floor(current).toLocaleString() + suffix;
          }, 25);
          obs.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );
    document.querySelectorAll("[data-count]").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Nav scroll effect
  useEffect(() => {
    const nav = navRef.current;
    const handler = () => {
      if (nav) nav.className = window.scrollY > 60 ? "nav-scrolled" : "";
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const handler = () => { if (window.innerWidth > 768) setMenuOpen(false); };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const verifyCert = () => {
    if (!certNo.trim()) return;
    setVerifying(true);
    setTimeout(() => {
      window.location.href = `${CERT_PORTAL}/verify/${encodeURIComponent(certNo.trim().toUpperCase())}`;
    }, 700);
  };

  const closeMenu = () => setMenuOpen(false);
  const marqueeList = [...MARQUEE, ...MARQUEE];

  return (
    <>
      {/* ── NAV ── */}
      <nav id="navbar" ref={navRef}>
        <Link href="/" className="nav-logo">
          <Image
            src="/rgtl-logo.png" alt="RGTL Logo" width={46} height={46}
            className="nav-logo-img"
            style={{ width: 46, height: 46 }}
          />
          <div>
            <span className="nav-logo-name">RAJA GEMS</span>
            <span className="nav-logo-sub">Testing Lab</span>
          </div>
        </Link>

        <div className="nav-links">
          <a href="#how-it-works">Process</a>
          <a href="#features">Why RGTL</a>
          <a href="#gems">Stones</a>
          <a href="#verify">Verify</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <a href={CERT_PORTAL} className="nav-cta" target="_blank" rel="noreferrer">Admin Login</a>
        </div>

        <button className={`hamburger ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen((o) => !o)} aria-label="Toggle menu">
          <span /><span /><span />
        </button>
      </nav>

      {/* ── MOBILE MENU ── */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <a href="#how-it-works" onClick={closeMenu}>Process</a>
        <a href="#features" onClick={closeMenu}>Why RGTL</a>
        <a href="#gems" onClick={closeMenu}>Stones</a>
        <a href="#verify" onClick={closeMenu}>Verify</a>
        <a href="#about" onClick={closeMenu}>About</a>
        <a href="#contact" onClick={closeMenu}>Contact</a>
        <a href={CERT_PORTAL} className="mob-cta" target="_blank" rel="noreferrer" onClick={closeMenu}>🔐 Admin Login</a>
      </div>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-bg" />
        {/* Animated ambient orbs */}
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />
        <div className="hero-orb hero-orb-4" />
        <div className="hero-grid" />
        <div className="particles" ref={particlesRef} />

        <div className="hero-content">
          <div className="hero-badge">
            <div className="badge-dot" />
            Trusted Gem Certification · Jabalpur, M.P.
          </div>

          <div className="hero-crest">
            <Image
              src="/rgtl-logo.png" alt="RGTL Crest" width={260} height={260}
              style={{ width: "100%", height: "100%", objectFit: "cover" }} priority
            />
          </div>

          <h1 className="hero-title">
            Every Gem Tells<br />
            <span>a True Story</span>
          </h1>
          <p className="hero-subtitle">Where science meets the ancient art of gemology</p>
          <p className="hero-desc">
            Raja Gems Testing Lab provides internationally-aligned gem certification for diamonds,
            precious stones and semi-precious minerals. Each certificate carries a scannable QR code —
            verifiable by anyone, anywhere, instantly.
          </p>
          <div className="hero-btns">
            <a href="#verify" className="btn-primary">✦ Verify a Certificate</a>
            <a href="#how-it-works" className="btn-secondary">How It Works</a>
          </div>
          <div className="hero-stats">
            {[
              { count: 5000, suffix: "+", label: "Gems Certified" },
              { count: 12, suffix: "+", label: "Years Experience" },
              { count: 100, suffix: "%", label: "Authentic" },
              { count: 50, suffix: "+", label: "Gem Varieties" },
            ].map((s) => (
              <div className="stat" key={s.label}>
                <div className="stat-num" data-count={s.count} data-suffix={s.suffix}>0</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="gold-rule" />

      {/* ── HOW IT WORKS ── */}
      <section className="how" id="how-it-works">
        <div className="how-inner">
          <div className="how-header reveal">
            <span className="section-label">Our Process</span>
            <h2 className="section-title">From Gem to <span>Certified Card</span></h2>
            <p className="section-desc" style={{ margin: "0 auto" }}>
              A rigorous, transparent process every stone passes through before receiving the RGTL seal.
            </p>
          </div>
          <div className="how-steps reveal">
            {[
              { n: "01", icon: "🔬", title: "Physical Testing", desc: "Refractive index, specific gravity, UV fluorescence and microscopic inclusion mapping — every parameter measured." },
              { n: "02", icon: "📋", title: "Data Recording", desc: "Variety, weight, color, cut, dimensions and observations recorded in our secure cloud database." },
              { n: "03", icon: "💳", title: "Certificate Issued", desc: "A professional certificate card with all gem details, gemmologist's signature and a unique number." },
              { n: "04", icon: "📱", title: "QR Verification", desc: "Every card carries a scannable QR code. Verify authenticity from any smartphone, anywhere." },
            ].map((s) => (
              <div className="how-step" key={s.n}>
                <div className="step-num">{s.n}</div>
                <span className="step-icon">{s.icon}</span>
                <div className="step-title">{s.title}</div>
                <p className="step-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="gold-rule" />

      {/* ── FEATURES ── */}
      <section className="features" id="features">
        <div className="features-inner">
          <div className="reveal">
            <span className="section-label">Why Choose RGTL</span>
            <h2 className="section-title">The Standard <span>Gems Deserve</span></h2>
            <p className="section-desc">
              We don&apos;t just issue certificates — we stand behind every one with expert knowledge,
              precision equipment and permanent digital records.
            </p>
            <div style={{ marginTop: "32px" }}>
              <a href="#contact" className="btn-primary">✦ Get Your Gem Tested</a>
            </div>
          </div>
          <div className="features-grid reveal">
            {[
              { icon: "🛡️", title: "Tamper-Proof", desc: "Stored permanently in cloud database. Cannot be faked or altered after issuance." },
              { icon: "⚡", title: "Instant Verify", desc: "Scan QR and verify in under 3 seconds on any smartphone worldwide." },
              { icon: "🎓", title: "Expert Analysis", desc: "Certified gemmologist with 12+ years across all gem types and origins." },
              { icon: "📍", title: "Local Trust", desc: "Heart of Jabalpur's Sarafa Bazar. Trusted for over a decade." },
              { icon: "💎", title: "All Gem Types", desc: "Diamonds, rubies, emeralds, sapphires and 50+ varieties tested with precision." },
              { icon: "📄", title: "Detailed Report", desc: "Variety, weight, color, shape, measurement, gravity and expert comment." },
            ].map((f) => (
              <div className="feature-card" key={f.title}>
                <span className="feature-icon">{f.icon}</span>
                <div className="feature-title">{f.title}</div>
                <p className="feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="gold-rule" />

      {/* ── GEMS SHOWCASE ── */}
      <section className="gems" id="gems">
        <div className="gems-inner reveal">
          <span className="section-label">Gems We Certify</span>
          <h2 className="section-title">50+ <span>Stone Varieties</span></h2>
          <p className="section-desc" style={{ margin: "0 auto", textAlign: "center" }}>
            From precious diamonds and rubies to rare semi-precious minerals — we certify them all.
          </p>
        </div>

        <div className="gem-showcase reveal">
          {SHOWCASE.map((g, i) => {
            const id = `gem-${i}`;
            const hasPhoto = !!g.photo && !photoErr[g.name];
            return (
              <div className="gem-tile" key={g.name}>
                {/* SVG art as base layer (always present, also acts as fallback) */}
                <GemArt hue={g.hue} hue2={g.hue2} accent={g.accent} id={id} />
                {/* Real photo on top when available */}
                {hasPhoto && (
                  <Image
                    className="gem-photo"
                    src={g.photo}
                    alt={g.name}
                    fill
                    sizes="(max-width: 480px) 50vw, (max-width: 768px) 50vw, 25vw"
                    onError={() => setPhotoErr((p) => ({ ...p, [g.name]: true }))}
                    style={{ objectFit: "cover" }}
                  />
                )}
                <div className="gem-shine" />
                <div className="gem-caption">
                  <div className="gem-caption-name">{g.name}</div>
                  <div className="gem-caption-type">{g.type}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="gems-track" style={{ maxWidth: "100%", overflow: "hidden" }}>
          <div className="gems-scroll">
            {marqueeList.map((g, i) => (
              <div className="gem-pill" key={i}>
                <span className="gem-pill-icon">{g.icon}</span>
                <div>
                  <div className="gem-pill-name">{g.name}</div>
                  <div className="gem-pill-type">{g.type}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="gold-rule" />

      {/* ── VERIFY ── */}
      <section className="verify-section" id="verify">
        <div className="verify-inner reveal">
          <span className="section-label">Instant Verification</span>
          <h2 className="section-title">Check Any <span>Certificate</span></h2>
          <p className="section-desc" style={{ margin: "0 auto" }}>
            Have a Raja Gems certificate? Enter the number below to verify authenticity instantly.
          </p>
          <div className="verify-box">
            <p className="verify-tagline">
              &quot;Scan the QR on any RGTL card, or enter the certificate number manually&quot;
            </p>
            <div className="verify-input-row">
              <input
                className="verify-input"
                type="text"
                placeholder="e.g. RG119903"
                value={certNo}
                onChange={(e) => setCertNo(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && verifyCert()}
              />
              <button className="verify-btn" onClick={verifyCert} disabled={verifying}>
                {verifying ? "Checking…" : "Verify Now"}
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="gold-rule" />

      {/* ── ABOUT ── */}
      <section className="about" id="about">
        <div className="about-inner">
          <div className="about-card reveal">
            <div className="about-logo">
              <Image src="/rgtl-logo.png" alt="RGTL" width={130} height={130}
                style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div className="about-name">Akash Soni</div>
            <div className="about-role">Chief Gemmologist · RGTL</div>
            {/* eslint-disable-next-line @next/next/no-img-element */}

            <div>
              <span className="about-tag">Certified Gemmologist</span>
              <span className="about-tag">12+ Years</span>
              <span className="about-tag">Jabalpur</span>
            </div>
          </div>

          <div className="reveal">
            <span className="section-label">About the Lab</span>
            <h2 className="section-title">Precision You Can <span>Trust</span></h2>
            <p className="section-desc">
              Raja Gems Testing Lab was founded to bring transparency and trust to the gem trade in
              Central India. Based in the historic Nunhai Sarafa Bazar of Jabalpur, we combine
              traditional gemological expertise with modern digital certification.
            </p>
            <div className="about-list">
              {[
                { icon: "🏛️", title: "Established Lab", text: "Located in Nunhai Sarafa Bazar, the heart of Jabalpur's gem and jewellery district." },
                { icon: "🔐", title: "Digital-First Certification", text: "Every certificate is backed by permanent cloud records. Scan QR — truth is one tap away." },
                { icon: "⚖️", title: "Unbiased Testing", text: "Our analysis is purely scientific. No commercial interest affects the result." },
              ].map((item) => (
                <div className="about-list-item" key={item.title}>
                  <span className="about-list-icon">{item.icon}</span>
                  <div>
                    <div className="about-list-title">{item.title}</div>
                    <p className="about-list-text">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="gold-rule" />

      {/* ── CONTACT ── */}
      <section className="contact" id="contact">
        <div className="contact-inner">
          <div>
            <span className="section-label reveal">Find Us</span>
            <h2 className="section-title reveal">Visit the <span>Lab</span></h2>
            <p className="section-desc reveal">Bring your gems in person or contact us to schedule a testing appointment.</p>
            <div className="contact-info reveal">
              {[
                { icon: "📍", label: "Jabalpur Office", value: "Aashirwad Swarn Market, Nunhai Sarafa Bazar, Jabalpur (M.P.)", href: "https://maps.google.com/?q=Nunhai+Sarafa+Bazar+Jabalpur" },
                { icon: "📍", label: "Jaipur Office", value: "Chaksu Ka Chowk, Ghee Walon Ka Rasta, Johri Bazar, Jaipur (Raj.)", href: "https://maps.google.com/?q=Johri+Bazar+Jaipur" },
                { icon: "📞", label: "Phone", value: "+91 93000 07865", href: "tel:+919300007865" },
                { icon: "🌐", label: "Certificate Portal", value: "cert.rajagemstones.com", href: CERT_PORTAL },
                { icon: "🕐", label: "Working Hours", value: "Mon – Sat: 10:00 AM – 7:00 PM", href: undefined },
              ].map((c) =>
                c.href ? (
                  <a key={c.label} className="contact-item" href={c.href} target="_blank" rel="noreferrer">
                    <span className="contact-item-icon">{c.icon}</span>
                    <div>
                      <div className="contact-item-label">{c.label}</div>
                      <div className="contact-item-value">{c.value}</div>
                    </div>
                  </a>
                ) : (
                  <div key={c.label} className="contact-item">
                    <span className="contact-item-icon">{c.icon}</span>
                    <div>
                      <div className="contact-item-label">{c.label}</div>
                      <div className="contact-item-value">{c.value}</div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="reveal">
            <div className="contact-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3667.5!2d79.95!3d23.16!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDA5JzM2LjAiTiA3OcKwNTcnMDAuMCJF!5e0!3m2!1sen!2sin!4v1!5m2!1sen!2sin"
                allowFullScreen loading="lazy" title="Raja Gems Location"
              />
            </div>
            <div style={{ marginTop: "18px", textAlign: "center" }}>
              <a href={CERT_PORTAL} className="btn-primary" target="_blank" rel="noreferrer">
                🔐 Admin — Generate Certificate
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="gold-rule" />

      {/* ── FOOTER ── */}
      <footer>
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-logo">
              <Image src="/rgtl-logo.png" alt="RGTL" width={44} height={44}
                style={{ borderRadius: "50%", border: "2px solid var(--gold)", objectFit: "cover", width:44, height:44 }} />
              <div>
                <div className="footer-logo-name">RAJA GEMS TESTING LAB</div>
                <div style={{ fontSize: "11px", color: "var(--grey)", letterSpacing: "1px" }}>Jabalpur · Jaipur</div>
              </div>
            </div>
            <div className="footer-links">
              <a href="#how-it-works">Process</a>
              <a href="#features">Why RGTL</a>
              <a href="#gems">Stones</a>
              <a href="#verify">Verify</a>
              <a href="#about">About</a>
              <a href="#contact">Contact</a>
              <a href={CERT_PORTAL} target="_blank" rel="noreferrer">Admin</a>
            </div>
          </div>
          <div className="footer-divider" />
          <div className="footer-bottom">
            <div className="footer-copy">© 2025 Raja Gems Testing Lab. All rights reserved.</div>
            <div className="footer-cert">💎 Certified Gemstone Authentication</div>
          </div>
        </div>
      </footer>

      {/* ── FLOATING BUTTON ── */}
      <a href="#verify" className="float-badge">
        <span>🔍</span>
        <span>Verify Certificate</span>
      </a>
    </>
  );
}
