"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const CERT_PORTAL = "https://cert.rajagemstones.com";

const GEMS = [
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

export default function LandingPage() {
  const particlesRef  = useRef<HTMLDivElement>(null);
  const [certNo, setCertNo]       = useState("");
  const [verifying, setVerifying] = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  // Particles
  useEffect(() => {
    const container = particlesRef.current;
    if (!container) return;
    for (let i = 0; i < 35; i++) {
      const p = document.createElement("div");
      p.className = "particle";
      p.style.left = Math.random() * 100 + "%";
      const size = Math.random() * 4 + 2;
      p.style.width = p.style.height = size + "px";
      p.style.animationDuration = (Math.random() * 15 + 10) + "s";
      p.style.animationDelay    = (Math.random() * 15) + "s";
      container.appendChild(p);
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
    const nav = document.getElementById("navbar");
    const handler = () => {
      if (nav) nav.style.padding = window.scrollY > 50 ? "10px 5%" : "16px 5%";
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close menu on resize
  useEffect(() => {
    const handler = () => { if (window.innerWidth > 768) setMenuOpen(false); };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  // Prevent body scroll when menu open
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
  const gemsList = [...GEMS, ...GEMS];

  return (
    <>
      {/* ── NAV ── */}
      <nav id="navbar">
        <Link href="/" className="nav-logo">
          <Image src="/rgtl-logo.jpg" alt="RGTL Logo" width={40} height={40}
            style={{ borderRadius: "50%", border: "1.5px solid #C9A84C", objectFit: "cover" }} />
          <div>
            <span className="nav-logo-name">RAJA GEMS</span>
            <span className="nav-logo-sub">Testing Lab</span>
          </div>
        </Link>

        {/* Desktop links */}
        <div className="nav-links">
          <a href="#how-it-works">Process</a>
          <a href="#features">Why RGTL</a>
          <a href="#verify">Verify</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <a href={CERT_PORTAL} className="nav-cta" target="_blank" rel="noreferrer">Admin Login</a>
        </div>

        {/* Hamburger */}
        <button
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* ── MOBILE MENU ── */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <a href="#how-it-works" onClick={closeMenu}>Process</a>
        <a href="#features"     onClick={closeMenu}>Why RGTL</a>
        <a href="#verify"       onClick={closeMenu}>Verify</a>
        <a href="#about"        onClick={closeMenu}>About</a>
        <a href="#contact"      onClick={closeMenu}>Contact</a>
        <a href={CERT_PORTAL} className="mob-cta" target="_blank" rel="noreferrer" onClick={closeMenu}>
          🔐 Admin Login
        </a>
      </div>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-grid" />
        <div className="particles" ref={particlesRef} />

        <div className="hero-content">
          <div className="hero-badge">
            <div className="badge-dot" />
            Trusted Gem Certification · Jabalpur
          </div>
          <div className="hero-crest">
            <Image src="/rgtl-logo.jpg" alt="RGTL Crest" width={90} height={90}
              style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <h1 className="hero-title">
            Every Gem Tells<br />
            <span>a True Story</span>
          </h1>
          <p className="hero-subtitle">Where science meets the ancient art of gemology</p>
          <p className="hero-desc">
            Raja Gems Testing Lab provides internationally-aligned gem certification for diamonds, precious stones and semi-precious minerals. Each certificate carries a scannable QR code — verifiable by anyone, anywhere, instantly.
          </p>
          <div className="hero-btns">
            <a href="#verify" className="btn-primary">Verify a Certificate</a>
            <a href="#how-it-works" className="btn-secondary">How It Works</a>
          </div>
          <div className="hero-stats">
            {[
              { count: 5000, suffix: "+", label: "Gems Certified" },
              { count: 12,   suffix: "+", label: "Years Experience" },
              { count: 100,  suffix: "%", label: "Authentic" },
              { count: 50,   suffix: "+", label: "Gem Varieties" },
            ].map((s) => (
              <div className="stat" key={s.label}>
                <div className="stat-num" data-count={s.count} data-suffix={s.suffix}>0</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="hero-divider" />
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
              { n: "01", icon: "🔬", title: "Physical Testing",   desc: "Each gem undergoes refractive index measurement, specific gravity testing, UV fluorescence and microscopic inclusion mapping." },
              { n: "02", icon: "📋", title: "Data Recording",     desc: "All findings — variety, weight, color, cut, measurements and comments — are recorded in our secure database." },
              { n: "03", icon: "💳", title: "Certificate Issued", desc: "A professional certificate card is generated bearing all gem details, the gemmologist's signature and a unique number." },
              { n: "04", icon: "📱", title: "QR Verification",    desc: "Every card carries a QR code. Scan with any smartphone to instantly access the verified certificate." },
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
              We don&apos;t just issue certificates — we stand behind every one with expert knowledge, precision equipment and permanent digital records.
            </p>
            <div style={{ marginTop: "32px" }}>
              <a href="#contact" className="btn-primary">Get Your Gem Tested</a>
            </div>
          </div>
          <div className="features-grid reveal">
            {[
              { icon: "🛡️", title: "Tamper-Proof",   desc: "Stored permanently in cloud database. Cannot be faked or altered." },
              { icon: "⚡", title: "Instant Verify",  desc: "Scan QR and verify in under 3 seconds on any smartphone." },
              { icon: "🎓", title: "Expert Analysis", desc: "Certified gemmologist with 12+ years across all gem types." },
              { icon: "📍", title: "Local Trust",     desc: "Heart of Jabalpur's Sarafa Bazar. Trusted for over a decade." },
              { icon: "💎", title: "All Gem Types",   desc: "Diamonds, rubies, emeralds, sapphires and 50+ varieties tested." },
              { icon: "📄", title: "Detailed Report", desc: "Variety, weight, color, shape, measurement, gravity and comment." },
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

      {/* ── GEMS MARQUEE ── */}
      <section className="gems">
        <div className="gems-inner">
          <span className="section-label reveal">Gems We Certify</span>
          <h2 className="section-title reveal">50+ <span>Stone Varieties</span></h2>
        </div>
        <div className="gems-track">
          <div className="gems-scroll">
            {gemsList.map((g, i) => (
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
            <p style={{ fontFamily: "'Cormorant Garant',serif", fontSize: "clamp(15px,3vw,18px)", color: "var(--grey)", fontStyle: "italic", lineHeight: 1.5 }}>
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
                {verifying ? "Checking..." : "Verify Now"}
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
              <Image src="/rgtl-logo.jpg" alt="RGTL" width={90} height={90}
                style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div className="about-name">Akash Soni</div>
            <div className="about-role">Chief Gemmologist · RGTL</div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/signature.png" alt="Signature" className="about-sig" />
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
              Raja Gems Testing Lab was founded to bring transparency and trust to the gem trade in Central India. Based in the historic Nunhai Sarafa Bazar of Jabalpur, we combine traditional gemological expertise with modern digital certification.
            </p>
            <div className="about-list">
              {[
                { icon: "🏛️", title: "Established Lab",           text: "Located in Aashirwad Swarn Market, the heart of Jabalpur's gem and jewellery district." },
                { icon: "🔐", title: "Digital-First Certification", text: "Every certificate is backed by permanent cloud records. Scan QR — truth is one tap away." },
                { icon: "⚖️", title: "Unbiased Testing",           text: "Our analysis is purely scientific. No commercial interest affects the result." },
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
                { icon: "📍", label: "Address", value: "Aashirwad Swarn Market, Nunhai Sarafa Bazar, Jabalpur (M.P.)", href: "https://maps.google.com/?q=Nunhai+Sarafa+Bazar+Jabalpur" },
                { icon: "📞", label: "Phone",   value: "+91 93000 07865", href: "tel:+919300007865" },
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
              <Image src="/rgtl-logo.jpg" alt="RGTL" width={38} height={38}
                style={{ borderRadius: "50%", border: "1.5px solid #C9A84C", objectFit: "cover" }} />
              <div>
                <div className="footer-logo-name">RAJA GEMS TESTING LAB</div>
                <div style={{ fontSize: "11px", color: "var(--grey)", letterSpacing: "1px" }}>Jabalpur, Madhya Pradesh</div>
              </div>
            </div>
            <div className="footer-links">
              <a href="#how-it-works">Process</a>
              <a href="#features">Why RGTL</a>
              <a href="#verify">Verify</a>
              <a href="#about">About</a>
              <a href="#contact">Contact</a>
              <a href={CERT_PORTAL} target="_blank" rel="noreferrer">Admin</a>
            </div>
          </div>
          <div className="footer-divider" />
          <div className="footer-bottom">
            <div className="footer-copy">© 2024 Raja Gems Testing Lab. All rights reserved. Jabalpur (M.P.)</div>
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
