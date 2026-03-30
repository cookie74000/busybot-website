// =============================================================
// BusyBot — Neon Signal Design System
// Dark SaaS: Deep navy base + electric green WhatsApp accents
// Sections: Nav, Hero, Ticker, How It Works, Industries, Features, Pricing, FAQ, CTA, Footer
// =============================================================

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  MessageCircle, Zap, Clock, Users, CheckCircle, ChevronDown,
  Star, ArrowRight, Phone, Mail, MapPin, Menu, X, Bot,
  Calendar, TrendingUp, Shield, Sparkles, Building2
} from "lucide-react";

// ─── Phone mockup CDN URLs ───────────────────────────────────
const MOCKUPS = [
  { url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663205307184/6MSDLWabw8SebuAjciJMi4/1_Martial_Arts_fcc036fe.png", label: "Martial Arts" },
  { url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663205307184/6MSDLWabw8SebuAjciJMi4/2_Personal_Trainer_e360266c.png", label: "Personal Trainer" },
  { url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663205307184/6MSDLWabw8SebuAjciJMi4/3_Electrician_20169130.png", label: "Electrician" },
  { url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663205307184/6MSDLWabw8SebuAjciJMi4/4_Plumber_5b387a2e.png", label: "Plumber" },
  { url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663205307184/6MSDLWabw8SebuAjciJMi4/5_Tattoo_77ada967.png", label: "Tattoo Studio" },
  { url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663205307184/6MSDLWabw8SebuAjciJMi4/6_Nail_Tech_ac1e1426.png", label: "Nail Tech" },
  { url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663205307184/6MSDLWabw8SebuAjciJMi4/7_Cosmetics_609fa06c.png", label: "Cosmetics" },
  { url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663205307184/6MSDLWabw8SebuAjciJMi4/8_Dog_Groomer_d832e25a.png", label: "Dog Groomer" },
  { url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663205307184/6MSDLWabw8SebuAjciJMi4/9_Cleaner_c1bcc520.png", label: "Cleaner" },
  { url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663205307184/6MSDLWabw8SebuAjciJMi4/10_Landscaper_81167ef8.png", label: "Landscaper" },
  { url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663205307184/6MSDLWabw8SebuAjciJMi4/11_Hairdresser_bd6a54e1.png", label: "Hairdresser" },
  { url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663205307184/6MSDLWabw8SebuAjciJMi4/12_Driving_5ba9b6db.png", label: "Driving School" },
  { url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663205307184/6MSDLWabw8SebuAjciJMi4/13_Window_63147672.png", label: "Window Cleaner" },
  { url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663205307184/6MSDLWabw8SebuAjciJMi4/14_Mechanic_252a117c.png", label: "Mechanic" },
  { url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663205307184/6MSDLWabw8SebuAjciJMi4/15_Photographer_3efbe6ef.png", label: "Photographer" },
  { url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663205307184/6MSDLWabw8SebuAjciJMi4/16_Locksmith_8fa0c009.png", label: "Locksmith" },
  { url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663205307184/6MSDLWabw8SebuAjciJMi4/17_Decorator_4d14f359.png", label: "Decorator" },
  { url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663205307184/6MSDLWabw8SebuAjciJMi4/18_Estate_Agent_a63f1425.png", label: "Estate Agent" },
  { url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663205307184/6MSDLWabw8SebuAjciJMi4/19_Dentist_de2ff194.png", label: "Dentist" },
  { url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663205307184/6MSDLWabw8SebuAjciJMi4/20_Restaurant_c75848b8.png", label: "Restaurant" },
];

// ─── Counter hook ─────────────────────────────────────────────
function useCounter(end: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, start]);
  return count;
}

// ─── Stat card ────────────────────────────────────────────────
function StatCard({ value, suffix, label, started }: { value: number; suffix: string; label: string; started: boolean }) {
  const count = useCounter(value, 1800, started);
  return (
    <div className="text-center">
      <div className="text-4xl font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
        <span className="gradient-text">{count}{suffix}</span>
      </div>
      <div className="text-sm mt-1" style={{ color: 'rgba(240,244,255,0.55)', fontFamily: 'DM Sans, sans-serif' }}>{label}</div>
    </div>
  );
}

// ─── FAQ item ─────────────────────────────────────────────────
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="glass-card overflow-hidden">
      <button
        className="w-full flex items-center justify-between p-5 text-left"
        onClick={() => setOpen(!open)}
      >
        <span className="font-semibold text-white pr-4" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>{q}</span>
        <ChevronDown
          size={18}
          style={{ color: '#00E676', flexShrink: 0, transition: 'transform 0.3s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-5 pb-5 text-sm leading-relaxed" style={{ color: 'rgba(240,244,255,0.65)', fontFamily: 'DM Sans, sans-serif' }}>
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────
export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMockup, setActiveMockup] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true });

  // Auto-rotate mockups
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMockup(prev => (prev + 1) % MOCKUPS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // Nav scroll effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Industries', href: '#industries' },
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
  ];

  const features = [
    { icon: <Bot size={22} />, title: '24/7 AI Responses', desc: 'Your bot never sleeps. It answers enquiries, qualifies leads, and books appointments at any hour — even on bank holidays.' },
    { icon: <Calendar size={22} />, title: 'Automatic Booking', desc: 'Customers book appointments directly through WhatsApp. No back-and-forth, no missed calls, no double-bookings.' },
    { icon: <Users size={22} />, title: 'Member Registration', desc: 'New students, clients, or customers are registered and added to your management system automatically — no manual data entry.' },
    { icon: <Zap size={22} />, title: 'Instant Setup', desc: 'We build and deploy your custom bot in 48 hours. No technical knowledge required from you — just provide your business details.' },
    { icon: <TrendingUp size={22} />, title: 'Grows With You', desc: 'Start with enquiry handling, add booking, then member management. BusyBot scales as your business grows.' },
    { icon: <Shield size={22} />, title: 'GDPR Compliant', desc: 'All data is handled securely through WhatsApp\'s encrypted platform. Customer data is stored safely and never shared.' },
  ];

  const pricing = [
    {
      name: 'Starter',
      price: '£49',
      period: '/mo',
      desc: 'Perfect for solo traders and small businesses just getting started.',
      features: ['24/7 WhatsApp AI agent', 'Enquiry & FAQ handling', 'Class/appointment info', 'Up to 500 conversations/mo', 'Email support'],
      cta: 'Get Started',
      highlight: false,
    },
    {
      name: 'Growth',
      price: '£99',
      period: '/mo',
      desc: 'For growing businesses that need automation and bookings.',
      features: ['Everything in Starter', 'Automatic booking system', 'Customer registration', 'CRM integration', 'Unlimited conversations', 'Priority support'],
      cta: 'Most Popular',
      highlight: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      desc: 'Multi-location businesses and franchises with bespoke needs.',
      features: ['Everything in Growth', 'Multiple locations', 'Custom integrations', 'Dedicated account manager', 'SLA guarantee', 'White-label option'],
      cta: 'Contact Us',
      highlight: false,
    },
  ];

  const faqs = [
    { q: 'How quickly can my bot be set up?', a: 'Most bots are live within 48 hours of you providing your business details. We handle all the technical setup — you just need to answer a few questions about your business and we do the rest.' },
    { q: 'Do my customers need to download anything?', a: 'No. BusyBot works entirely within WhatsApp, which your customers already have. There\'s no app to download, no account to create, and no new platform to learn.' },
    { q: 'Can the bot handle bookings and registrations?', a: 'Yes — the Growth plan includes automatic booking and customer registration. New customers are registered directly into your management system (such as ClubManager, Mindbody, or a spreadsheet) without any manual work from you.' },
    { q: 'What happens if the bot can\'t answer a question?', a: 'The bot is trained on your specific business knowledge. For anything it can\'t handle, it escalates to you directly via WhatsApp notification, so no customer is ever left without a response.' },
    { q: 'How easy is it to produce a demo for a new customer?', a: 'Very easy. Once we have your business name, services, prices, and FAQs, we can produce a working demo bot in under 24 hours. You can share the WhatsApp number with a prospective customer and they can interact with it immediately — no setup required on their end.' },
    { q: 'Can I update the bot\'s knowledge base myself?', a: 'Yes. We provide a simple way to update your bot\'s information — prices, class times, FAQs — without any technical knowledge. Changes go live within minutes.' },
    { q: 'Is there a contract or minimum term?', a: 'No long-term contracts. All plans are month-to-month and you can cancel at any time. We\'re confident you\'ll stay because the results speak for themselves.' },
  ];

  return (
    <div className="min-h-screen" style={{ background: '#0A0F1E', fontFamily: 'DM Sans, sans-serif' }}>

      {/* ── NAV ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(10, 15, 30, 0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(0,230,118,0.1)' : 'none',
        }}
      >
        <div className="container flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 no-underline">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663205307184/6MSDLWabw8SebuAjciJMi4/busybot_logo_icon-RfqedNMKfEwy9poaRpFiY8.png"
              alt="BusyBot"
              className="w-8 h-8 object-contain"
            />
            <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.2rem', color: '#fff' }}>
              Busy<span style={{ color: '#00E676' }}>Bot</span>
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(l => (
              <a key={l.label} href={l.href} style={{ color: 'rgba(240,244,255,0.7)', fontSize: '0.9rem', fontWeight: 500, textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#00E676')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(240,244,255,0.7)')}
              >{l.label}</a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div className="live-dot" />
              <span style={{ color: '#00E676', fontSize: '0.78rem', fontWeight: 600 }}>Live Demo</span>
            </div>
            <a href="#contact" className="btn-primary" style={{ padding: '0.55rem 1.25rem', fontSize: '0.875rem' }}>
              Get Your Bot
            </a>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{ background: 'rgba(10,15,30,0.98)', borderTop: '1px solid rgba(0,230,118,0.1)' }}
            >
              <div className="container py-4 flex flex-col gap-3">
                {navLinks.map(l => (
                  <a key={l.label} href={l.href} onClick={() => setMobileMenuOpen(false)}
                    style={{ color: 'rgba(240,244,255,0.8)', padding: '0.5rem 0', textDecoration: 'none', fontWeight: 500 }}
                  >{l.label}</a>
                ))}
                <a href="#contact" className="btn-primary mt-2" style={{ justifyContent: 'center' }}>
                  Get Your Bot
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── HERO ── */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 60% 40%, rgba(0,230,118,0.08) 0%, transparent 70%), #0A0F1E`,
        }}
      >
        {/* Hero background image */}
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663205307184/6MSDLWabw8SebuAjciJMi4/busybot_hero_bg-Qme9ygKdw4ztMnEuTouFRt.webp"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container relative z-10 pt-24 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left — copy */}
            <div>
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 mb-6"
                style={{
                  background: 'rgba(0,230,118,0.1)',
                  border: '1px solid rgba(0,230,118,0.3)',
                  borderRadius: '2rem',
                  padding: '0.4rem 1rem',
                }}
              >
                <div className="live-dot" />
                <span style={{ color: '#00E676', fontSize: '0.8rem', fontWeight: 600 }}>WhatsApp AI Agent — Always On</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', lineHeight: 1.1, color: '#fff', marginBottom: '1.25rem' }}
              >
                Your Business,<br />
                <span className="gradient-text">Answering 24/7</span><br />
                on WhatsApp
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{ color: 'rgba(240,244,255,0.65)', fontSize: '1.1rem', lineHeight: 1.7, maxWidth: '480px', marginBottom: '2rem' }}
              >
                BusyBot gives your business a custom AI agent on WhatsApp that answers enquiries, books appointments, and registers customers — automatically. No app, no code, no hassle.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap gap-3 mb-8"
              >
                <a href="#contact" className="btn-primary">
                  <MessageCircle size={18} />
                  Get Your Bot Free Demo
                </a>
                <a href="#how-it-works" className="btn-outline">
                  See How It Works
                  <ArrowRight size={16} />
                </a>
              </motion.div>

              {/* Trust signals */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-wrap gap-5"
              >
                {[
                  { icon: <CheckCircle size={14} />, text: 'Live in 48 hours' },
                  { icon: <CheckCircle size={14} />, text: 'No contract' },
                  { icon: <CheckCircle size={14} />, text: '20+ industries' },
                ].map(item => (
                  <div key={item.text} className="flex items-center gap-1.5" style={{ color: 'rgba(240,244,255,0.55)', fontSize: '0.85rem' }}>
                    <span style={{ color: '#00E676' }}>{item.icon}</span>
                    {item.text}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right — animated phone mockup */}
            <div className="flex justify-center lg:justify-end relative">
              <div className="relative" style={{ width: '280px', height: '560px' }}>
                {/* Glow behind phone */}
                <div style={{
                  position: 'absolute', inset: '-20px',
                  background: 'radial-gradient(ellipse at center, rgba(0,230,118,0.18) 0%, transparent 70%)',
                  borderRadius: '50%',
                }} />

                {/* Industry label */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeMockup}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.4 }}
                    style={{
                      position: 'absolute', top: '-2.5rem', left: '50%', transform: 'translateX(-50%)',
                      background: 'rgba(0,230,118,0.12)', border: '1px solid rgba(0,230,118,0.3)',
                      borderRadius: '2rem', padding: '0.3rem 1rem', whiteSpace: 'nowrap',
                      color: '#00E676', fontSize: '0.8rem', fontWeight: 600,
                    }}
                  >
                    {MOCKUPS[activeMockup].label}
                  </motion.div>
                </AnimatePresence>

                {/* Phone mockup */}
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeMockup}
                    src={MOCKUPS[activeMockup].url}
                    alt={MOCKUPS[activeMockup].label}
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.5 }}
                    style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'drop-shadow(0 20px 60px rgba(0,0,0,0.6))' }}
                  />
                </AnimatePresence>

                {/* Dot indicators */}
                <div className="flex gap-1.5 justify-center mt-4" style={{ position: 'absolute', bottom: '-2rem', left: '50%', transform: 'translateX(-50%)' }}>
                  {MOCKUPS.slice(0, 8).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveMockup(i)}
                      style={{
                        width: i === activeMockup % 8 ? '20px' : '6px',
                        height: '6px',
                        borderRadius: '3px',
                        background: i === activeMockup % 8 ? '#00E676' : 'rgba(255,255,255,0.2)',
                        border: 'none',
                        transition: 'all 0.3s',
                        padding: 0,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '120px', background: 'linear-gradient(to bottom, transparent, #0A0F1E)' }} />
      </section>

      {/* ── STATS ── */}
      <section ref={statsRef} style={{ background: '#0D1322', borderTop: '1px solid rgba(0,230,118,0.1)', borderBottom: '1px solid rgba(0,230,118,0.1)' }}>
        <div className="container py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCard value={24} suffix="/7" label="Always Available" started={statsInView} />
            <StatCard value={48} suffix="hrs" label="Setup Time" started={statsInView} />
            <StatCard value={20} suffix="+" label="Industries Served" started={statsInView} />
            <StatCard value={90} suffix="%" label="Enquiries Handled Automatically" started={statsInView} />
          </div>
        </div>
      </section>

      {/* ── INDUSTRY TICKER ── */}
      <section style={{ background: '#0A0F1E', padding: '3rem 0', overflow: 'hidden' }}>
        <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
          <span style={{ color: 'rgba(240,244,255,0.4)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Works for every business</span>
        </div>
        <div style={{ overflow: 'hidden', position: 'relative' }}>
          {/* Fade edges */}
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '80px', background: 'linear-gradient(to right, #0A0F1E, transparent)', zIndex: 2 }} />
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '80px', background: 'linear-gradient(to left, #0A0F1E, transparent)', zIndex: 2 }} />
          <div className="ticker-track">
            {[...MOCKUPS, ...MOCKUPS].map((m, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1.5rem', flexShrink: 0 }}>
                <img src={m.url} alt={m.label} style={{ width: '36px', height: '72px', objectFit: 'contain', opacity: 0.7 }} />
                <span style={{ color: 'rgba(240,244,255,0.5)', fontSize: '0.85rem', fontWeight: 500, whiteSpace: 'nowrap' }}>{m.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" style={{ background: '#0D1322', padding: '6rem 0' }}>
        <div className="container">
          <div className="text-center mb-14">
            <span style={{ color: '#00E676', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Simple Process</span>
            <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: '#fff', marginTop: '0.75rem' }}>
              How BusyBot Works
            </h2>
            <p style={{ color: 'rgba(240,244,255,0.55)', maxWidth: '520px', margin: '1rem auto 0', lineHeight: 1.7 }}>
              From first message to confirmed booking — your bot handles everything automatically.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { step: '01', icon: <MessageCircle size={28} />, title: 'Customer Messages', desc: 'A potential customer sends a WhatsApp message to your business number — asking about prices, availability, or how to join.' },
              { step: '02', icon: <Bot size={28} />, title: 'AI Responds Instantly', desc: 'BusyBot replies within seconds with accurate, personalised information. It qualifies the lead, answers questions, and guides them to book.' },
              { step: '03', icon: <CheckCircle size={28} />, title: 'Booking Confirmed', desc: 'The customer is registered, the appointment is booked, and you\'re notified. All without lifting a finger.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="glass-card p-7 relative"
              >
                <div style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', fontFamily: 'Space Grotesk, sans-serif', fontSize: '3rem', fontWeight: 800, color: 'rgba(0,230,118,0.07)', lineHeight: 1 }}>
                  {item.step}
                </div>
                <div style={{ color: '#00E676', marginBottom: '1rem' }}>{item.icon}</div>
                <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.15rem', color: '#fff', marginBottom: '0.6rem' }}>{item.title}</h3>
                <p style={{ color: 'rgba(240,244,255,0.6)', fontSize: '0.9rem', lineHeight: 1.65 }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* How it works illustration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl overflow-hidden"
            style={{ border: '1px solid rgba(0,230,118,0.15)' }}
          >
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663205307184/6MSDLWabw8SebuAjciJMi4/busybot_how_it_works-8iugXLKuqDywxhMoPwPgNn.webp"
              alt="How BusyBot works"
              className="w-full"
              style={{ display: 'block' }}
            />
          </motion.div>
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section id="industries" style={{ background: '#0A0F1E', padding: '6rem 0' }}>
        <div className="container">
          <div className="text-center mb-14">
            <span style={{ color: '#00E676', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Every Industry</span>
            <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: '#fff', marginTop: '0.75rem' }}>
              Built for Your Business
            </h2>
            <p style={{ color: 'rgba(240,244,255,0.55)', maxWidth: '520px', margin: '1rem auto 0', lineHeight: 1.7 }}>
              Each bot is custom-built for your industry. Tap any industry to see a live demo.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {MOCKUPS.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i % 5) * 0.06 }}
                className="glass-card p-4 flex flex-col items-center gap-3 cursor-pointer"
                onClick={() => setActiveMockup(i)}
              >
                <img src={m.url} alt={m.label} style={{ width: '80px', height: '160px', objectFit: 'contain' }} />
                <span style={{ color: 'rgba(240,244,255,0.7)', fontSize: '0.78rem', fontWeight: 500, textAlign: 'center' }}>{m.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" style={{ background: '#0D1322', padding: '6rem 0' }}>
        <div className="container">
          <div className="text-center mb-14">
            <span style={{ color: '#00E676', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>What You Get</span>
            <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: '#fff', marginTop: '0.75rem' }}>
              Everything Your Business Needs
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                className="glass-card p-6"
              >
                <div style={{
                  width: '44px', height: '44px', borderRadius: '10px',
                  background: 'rgba(0,230,118,0.12)', border: '1px solid rgba(0,230,118,0.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#00E676', marginBottom: '1rem',
                }}>
                  {f.icon}
                </div>
                <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.05rem', color: '#fff', marginBottom: '0.5rem' }}>{f.title}</h3>
                <p style={{ color: 'rgba(240,244,255,0.58)', fontSize: '0.88rem', lineHeight: 1.65 }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DEMO SECTION ── */}
      <section style={{ background: '#0A0F1E', padding: '6rem 0' }}>
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span style={{ color: '#00E676', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Live Example</span>
              <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', color: '#fff', marginTop: '0.75rem', marginBottom: '1.25rem' }}>
                See It in Action — Train Taekwondo
              </h2>
              <p style={{ color: 'rgba(240,244,255,0.6)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                Train Taekwondo Schools uses BusyBot to handle all new student enquiries, book trial classes, and register members directly into their ClubManager system — 24 hours a day, 7 days a week.
              </p>
              <div className="flex flex-col gap-3 mb-8">
                {[
                  'Answers FAQs about classes, prices, and locations',
                  'Books trial lessons automatically',
                  'Registers new members into ClubManager',
                  'Sends pattern tutorial videos to existing students',
                  'Shows upcoming grading and competition dates',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle size={16} style={{ color: '#00E676', marginTop: '2px', flexShrink: 0 }} />
                    <span style={{ color: 'rgba(240,244,255,0.7)', fontSize: '0.9rem' }}>{item}</span>
                  </div>
                ))}
              </div>
              <a href="#contact" className="btn-primary">
                <Sparkles size={16} />
                Get a Demo Like This
              </a>
            </div>

            <div className="flex justify-center">
              <div style={{ position: 'relative', width: '260px' }}>
                <div style={{
                  position: 'absolute', inset: '-30px',
                  background: 'radial-gradient(ellipse at center, rgba(0,230,118,0.15) 0%, transparent 70%)',
                }} />
                <img
                  src={MOCKUPS[0].url}
                  alt="Train Taekwondo BusyBot"
                  style={{ width: '100%', objectFit: 'contain', filter: 'drop-shadow(0 20px 60px rgba(0,0,0,0.7))', position: 'relative' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" style={{ background: '#0D1322', padding: '6rem 0' }}>
        <div className="container">
          <div className="text-center mb-14">
            <span style={{ color: '#00E676', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Simple Pricing</span>
            <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: '#fff', marginTop: '0.75rem' }}>
              No Surprises. No Contracts.
            </h2>
            <p style={{ color: 'rgba(240,244,255,0.55)', maxWidth: '480px', margin: '1rem auto 0', lineHeight: 1.7 }}>
              Cancel any time. All plans include a free demo before you commit.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricing.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{
                  background: plan.highlight ? 'rgba(0,230,118,0.08)' : 'rgba(255,255,255,0.03)',
                  border: plan.highlight ? '1.5px solid rgba(0,230,118,0.5)' : '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '1.25rem',
                  padding: '2rem',
                  position: 'relative',
                  boxShadow: plan.highlight ? '0 0 40px rgba(0,230,118,0.12)' : 'none',
                }}
              >
                {plan.highlight && (
                  <div style={{
                    position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)',
                    background: '#00E676', color: '#0A0F1E', fontSize: '0.72rem', fontWeight: 800,
                    padding: '0.25rem 0.875rem', borderRadius: '2rem', letterSpacing: '0.05em',
                    fontFamily: 'Space Grotesk, sans-serif',
                  }}>
                    MOST POPULAR
                  </div>
                )}
                <div style={{ marginBottom: '0.5rem', color: 'rgba(240,244,255,0.6)', fontSize: '0.85rem', fontWeight: 600, fontFamily: 'Space Grotesk, sans-serif' }}>{plan.name}</div>
                <div style={{ marginBottom: '0.75rem' }}>
                  <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: '2.5rem', color: '#fff' }}>{plan.price}</span>
                  <span style={{ color: 'rgba(240,244,255,0.4)', fontSize: '0.9rem' }}>{plan.period}</span>
                </div>
                <p style={{ color: 'rgba(240,244,255,0.55)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>{plan.desc}</p>
                <div className="flex flex-col gap-2.5 mb-6">
                  {plan.features.map((f, j) => (
                    <div key={j} className="flex items-center gap-2">
                      <CheckCircle size={14} style={{ color: '#00E676', flexShrink: 0 }} />
                      <span style={{ color: 'rgba(240,244,255,0.7)', fontSize: '0.85rem' }}>{f}</span>
                    </div>
                  ))}
                </div>
                <a
                  href="#contact"
                  style={{
                    display: 'block', textAlign: 'center', padding: '0.75rem',
                    borderRadius: '0.5rem', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700,
                    fontSize: '0.9rem', textDecoration: 'none', transition: 'all 0.2s',
                    background: plan.highlight ? '#00E676' : 'transparent',
                    color: plan.highlight ? '#0A0F1E' : '#00E676',
                    border: plan.highlight ? 'none' : '1.5px solid rgba(0,230,118,0.4)',
                    boxShadow: plan.highlight ? '0 0 20px rgba(0,230,118,0.3)' : 'none',
                  }}
                >
                  {plan.cta}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" style={{ background: '#0A0F1E', padding: '6rem 0' }}>
        <div className="container max-w-3xl">
          <div className="text-center mb-12">
            <span style={{ color: '#00E676', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>FAQ</span>
            <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: '#fff', marginTop: '0.75rem' }}>
              Common Questions
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <FAQItem q={faq.q} a={faq.a} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA / CONTACT ── */}
      <section id="contact" style={{ background: '#0D1322', padding: '6rem 0', borderTop: '1px solid rgba(0,230,118,0.1)' }}>
        <div className="container max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.3)',
              borderRadius: '2rem', padding: '0.4rem 1rem', marginBottom: '1.5rem',
            }}>
              <div className="live-dot" />
              <span style={{ color: '#00E676', fontSize: '0.8rem', fontWeight: 600 }}>Free Demo — No Commitment</span>
            </div>

            <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: '#fff', marginBottom: '1rem' }}>
              Ready to Stop Missing Enquiries?
            </h2>
            <p style={{ color: 'rgba(240,244,255,0.6)', lineHeight: 1.7, marginBottom: '2.5rem' }}>
              Get a free working demo of your custom BusyBot in 24 hours. No technical knowledge required — just tell us about your business.
            </p>

            {/* Contact form */}
            <form
              onSubmit={e => { e.preventDefault(); alert('Thanks! We\'ll be in touch within 24 hours.'); }}
              style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label style={{ color: 'rgba(240,244,255,0.6)', fontSize: '0.82rem', fontWeight: 500, display: 'block', marginBottom: '0.4rem' }}>Your Name</label>
                  <input
                    type="text" required placeholder="Gavin Cook"
                    style={{
                      width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '0.5rem', padding: '0.75rem 1rem', color: '#fff', fontSize: '0.9rem',
                      outline: 'none', fontFamily: 'DM Sans, sans-serif',
                    }}
                    onFocus={e => e.target.style.borderColor = 'rgba(0,230,118,0.5)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                  />
                </div>
                <div>
                  <label style={{ color: 'rgba(240,244,255,0.6)', fontSize: '0.82rem', fontWeight: 500, display: 'block', marginBottom: '0.4rem' }}>Business Name</label>
                  <input
                    type="text" required placeholder="Train Taekwondo Schools"
                    style={{
                      width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '0.5rem', padding: '0.75rem 1rem', color: '#fff', fontSize: '0.9rem',
                      outline: 'none', fontFamily: 'DM Sans, sans-serif',
                    }}
                    onFocus={e => e.target.style.borderColor = 'rgba(0,230,118,0.5)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                  />
                </div>
              </div>
              <div>
                <label style={{ color: 'rgba(240,244,255,0.6)', fontSize: '0.82rem', fontWeight: 500, display: 'block', marginBottom: '0.4rem' }}>WhatsApp / Phone Number</label>
                <input
                  type="tel" required placeholder="+44 7700 900000"
                  style={{
                    width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '0.5rem', padding: '0.75rem 1rem', color: '#fff', fontSize: '0.9rem',
                    outline: 'none', fontFamily: 'DM Sans, sans-serif',
                  }}
                  onFocus={e => e.target.style.borderColor = 'rgba(0,230,118,0.5)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
              </div>
              <div>
                <label style={{ color: 'rgba(240,244,255,0.6)', fontSize: '0.82rem', fontWeight: 500, display: 'block', marginBottom: '0.4rem' }}>Industry / Business Type</label>
                <input
                  type="text" placeholder="e.g. Martial Arts, Hairdresser, Plumber..."
                  style={{
                    width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '0.5rem', padding: '0.75rem 1rem', color: '#fff', fontSize: '0.9rem',
                    outline: 'none', fontFamily: 'DM Sans, sans-serif',
                  }}
                  onFocus={e => e.target.style.borderColor = 'rgba(0,230,118,0.5)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
              </div>
              <button type="submit" className="btn-primary" style={{ justifyContent: 'center', marginTop: '0.5rem', fontSize: '1rem', padding: '1rem' }}>
                <MessageCircle size={18} />
                Request My Free Demo
              </button>
            </form>

            <p style={{ color: 'rgba(240,244,255,0.35)', fontSize: '0.78rem', marginTop: '1rem' }}>
              Or email us directly: <a href="mailto:hello@busybot.co.uk" style={{ color: '#00E676', textDecoration: 'none' }}>hello@busybot.co.uk</a>
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: '#080C18', borderTop: '1px solid rgba(0,230,118,0.08)', padding: '3rem 0 2rem' }}>
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663205307184/6MSDLWabw8SebuAjciJMi4/busybot_logo_icon-RfqedNMKfEwy9poaRpFiY8.png"
                  alt="BusyBot"
                  style={{ width: '28px', height: '28px', objectFit: 'contain' }}
                />
                <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, color: '#fff' }}>
                  Busy<span style={{ color: '#00E676' }}>Bot</span>
                </span>
              </div>
              <p style={{ color: 'rgba(240,244,255,0.4)', fontSize: '0.82rem', lineHeight: 1.65 }}>
                WhatsApp AI agents for busy UK businesses. Built in 48 hours. Always on.
              </p>
            </div>
            <div>
              <div style={{ color: 'rgba(240,244,255,0.6)', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.875rem' }}>Product</div>
              {['How It Works', 'Industries', 'Features', 'Pricing'].map(l => (
                <a key={l} href={`#${l.toLowerCase().replace(/ /g, '-')}`} style={{ display: 'block', color: 'rgba(240,244,255,0.45)', fontSize: '0.85rem', marginBottom: '0.5rem', textDecoration: 'none' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#00E676'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(240,244,255,0.45)'}
                >{l}</a>
              ))}
            </div>
            <div>
              <div style={{ color: 'rgba(240,244,255,0.6)', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.875rem' }}>Industries</div>
              {['Martial Arts', 'Personal Trainer', 'Hairdresser', 'Trades & Services'].map(l => (
                <div key={l} style={{ color: 'rgba(240,244,255,0.45)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>{l}</div>
              ))}
            </div>
            <div>
              <div style={{ color: 'rgba(240,244,255,0.6)', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.875rem' }}>Contact</div>
              <div className="flex flex-col gap-2.5">
                <a href="mailto:hello@busybot.co.uk" className="flex items-center gap-2" style={{ color: 'rgba(240,244,255,0.45)', fontSize: '0.85rem', textDecoration: 'none' }}>
                  <Mail size={13} style={{ color: '#00E676' }} /> hello@busybot.co.uk
                </a>
                <a href="https://wa.me/447700900000" className="flex items-center gap-2" style={{ color: 'rgba(240,244,255,0.45)', fontSize: '0.85rem', textDecoration: 'none' }}>
                  <MessageCircle size={13} style={{ color: '#00E676' }} /> WhatsApp Us
                </a>
                <div className="flex items-center gap-2" style={{ color: 'rgba(240,244,255,0.45)', fontSize: '0.85rem' }}>
                  <MapPin size={13} style={{ color: '#00E676' }} /> Kidderminster, UK
                </div>
              </div>
            </div>
          </div>
          <div className="section-divider mb-6" />
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <p style={{ color: 'rgba(240,244,255,0.3)', fontSize: '0.78rem' }}>
              © 2026 BusyBot. All rights reserved.
            </p>
            <div className="flex items-center gap-1.5">
              <div className="live-dot" style={{ width: '6px', height: '6px' }} />
              <span style={{ color: 'rgba(240,244,255,0.3)', fontSize: '0.78rem' }}>All systems operational</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
