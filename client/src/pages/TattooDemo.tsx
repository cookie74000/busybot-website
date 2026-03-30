// BusyBot — Neon Signal Design System
// Tattoo Studio WhatsApp Bot Demo — animated conversation playback
// =============================================================

import { useState, useEffect, useRef } from "react";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { Link } from "wouter";

// Conversation script for Ink & Iron Tattoo Studio
const TATTOO_SCRIPT = [
  { from: "bot", text: "👋 Hey! Welcome to *Ink & Iron Tattoo Studio*. I'm your virtual assistant — here to help you book a consultation, get pricing info, or answer any questions.\n\nTap below to get started 👇", delay: 800 },
  {
    from: "menu",
    options: ["📅 Book a Consultation", "💰 Pricing & Styles", "🎨 View Our Work", "📍 Location & Hours", "❓ Aftercare Advice"],
    delay: 1200,
  },
  { from: "user", text: "📅 Book a Consultation", delay: 2000 },
  { from: "bot", text: "Great choice! 🎨 Let's get you booked in.\n\nFirst — what's your *first name*?", delay: 2800 },
  { from: "user", text: "Sophie", delay: 4200 },
  { from: "bot", text: "Nice to meet you, Sophie! 😊\n\nWhat *style of tattoo* are you interested in?\n\n• Black & Grey Realism\n• Traditional / Old School\n• Fine Line\n• Neo-Traditional\n• Japanese\n• Geometric\n• Custom / Not Sure Yet", delay: 5000 },
  { from: "user", text: "Fine Line", delay: 6800 },
  { from: "bot", text: "Lovely choice — fine line is one of our specialities! ✨\n\nCan you give me a *rough idea of the design* you have in mind? (e.g. floral, script, portrait, animal — anything helps!)", delay: 7600 },
  { from: "user", text: "A small floral piece on my wrist, maybe roses and leaves", delay: 9500 },
  { from: "bot", text: "That sounds beautiful! 🌹\n\nApprox *how large* would you like it?\n\n• Small (matchbox size)\n• Medium (palm size)\n• Large (half sleeve+)", delay: 10400 },
  { from: "user", text: "Small — matchbox size", delay: 12000 },
  { from: "bot", text: "Perfect. Small fine line florals typically start from *£80–£120* depending on detail.\n\nWhat's the *best way to reach you* to confirm your consultation? Drop your phone number or email 📱", delay: 12900 },
  { from: "user", text: "sophie@email.com", delay: 14800 },
  { from: "bot", text: "Brilliant! ✅ Here's a summary of your enquiry:\n\n🎨 *Style:* Fine Line\n🌹 *Design:* Small floral (roses & leaves)\n📍 *Placement:* Wrist\n📏 *Size:* Small\n💰 *Est. price:* £80–£120\n📧 *Contact:* sophie@email.com\n\nOne of our artists will be in touch within *24 hours* to confirm your consultation slot. We can't wait to work with you! 🖤", delay: 15700 },
  {
    from: "menu",
    options: ["📅 Book Another", "💰 Pricing & Styles", "📍 Find Us"],
    delay: 17000,
  },
];

const NAIL_SCRIPT = [
  { from: "bot", text: "💅 Hi there! Welcome to *Gloss & Glam Nail Studio*. I'm your virtual assistant — ready to help you book an appointment, check availability, or answer any questions!\n\nWhat can I help you with today? 👇", delay: 800 },
  {
    from: "menu",
    options: ["📅 Book an Appointment", "💅 Services & Prices", "🎨 Nail Inspo Gallery", "📍 Location & Parking", "⏰ Opening Hours"],
    delay: 1200,
  },
  { from: "user", text: "📅 Book an Appointment", delay: 2000 },
  { from: "bot", text: "Lovely! Let's get you booked in 💅\n\nWhat's your *first name*?", delay: 2800 },
  { from: "user", text: "Emma", delay: 4000 },
  { from: "bot", text: "Hi Emma! 😊 What *service* are you looking for?\n\n• Gel Manicure — from £35\n• Acrylic Full Set — from £45\n• Infills — from £30\n• Pedicure — from £40\n• Nail Art (add-on) — from £10\n• Removal — from £15", delay: 4800 },
  { from: "user", text: "Gel Manicure", delay: 6500 },
  { from: "bot", text: "Great choice! 💅 Gel manicures last 2–3 weeks and start from *£35*.\n\nWould you like to add *nail art* to your appointment? (from £10 extra)", delay: 7400 },
  { from: "user", text: "Yes please — something simple like flowers", delay: 9200 },
  { from: "bot", text: "Gorgeous! 🌸 Floral nail art is always a winner.\n\nWhat *day* works best for you this week or next?", delay: 10100 },
  { from: "user", text: "Saturday afternoon if possible", delay: 11800 },
  { from: "bot", text: "Let me check... ✅ We have availability *this Saturday at 2pm and 3:30pm*.\n\nWhich works best for you?", delay: 12700 },
  { from: "user", text: "2pm please!", delay: 14200 },
  { from: "bot", text: "Perfect! 🎉 Here's your booking summary:\n\n💅 *Service:* Gel Manicure + Floral Nail Art\n💰 *Price:* £35 + £10 = *£45*\n📅 *Date:* This Saturday at 2:00pm\n📍 *Location:* 14 High Street, York\n\nWe'll send you a reminder the day before. See you Saturday, Emma! 💕\n\nA *£10 deposit* secures your slot — tap below to pay 👇", delay: 15200 },
  {
    from: "menu",
    options: ["💳 Pay £10 Deposit", "📅 Book Another", "📍 Get Directions"],
    delay: 16600,
  },
];

interface Message {
  from: "bot" | "user" | "menu";
  text?: string;
  options?: string[];
  id: number;
}

function DemoPhone({ script, businessName, avatar, accentColor }: {
  script: typeof TATTOO_SCRIPT;
  businessName: string;
  avatar: string;
  accentColor: string;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [step, setStep] = useState(0);
  const [running, setRunning] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const reset = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setMessages([]);
    setStep(0);
    setIsTyping(false);
    setRunning(false);
  };

  const start = () => {
    reset();
    setTimeout(() => setRunning(true), 100);
  };

  useEffect(() => {
    if (!running) return;
    if (step >= script.length) return;

    const item = script[step];
    const isBot = item.from === "bot" || item.from === "menu";

    if (isBot) {
      setIsTyping(true);
      timerRef.current = setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, { ...item, id: Date.now() } as Message]);
        setStep(s => s + 1);
      }, item.delay);
    } else {
      timerRef.current = setTimeout(() => {
        setMessages(prev => [...prev, { ...item, id: Date.now() } as Message]);
        setStep(s => s + 1);
      }, item.delay);
    }

    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [running, step, script]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const formatText = (text: string) => {
    return text
      .replace(/\*(.*?)\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br/>');
  };

  return (
    <div style={{
      width: '320px',
      background: '#111',
      borderRadius: '2rem',
      overflow: 'hidden',
      boxShadow: '0 30px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.08)',
      fontFamily: 'DM Sans, sans-serif',
      position: 'relative',
    }}>
      {/* Status bar */}
      <div style={{ background: '#1a1a1a', padding: '0.5rem 1.25rem 0.3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: '#fff', fontSize: '0.72rem', fontWeight: 600 }}>9:41</span>
        <div style={{ display: 'flex', gap: '0.3rem', alignItems: 'center' }}>
          <div style={{ width: '14px', height: '7px', border: '1px solid rgba(255,255,255,0.6)', borderRadius: '2px', position: 'relative' }}>
            <div style={{ position: 'absolute', left: '1px', top: '1px', bottom: '1px', width: '70%', background: '#4CAF50', borderRadius: '1px' }} />
          </div>
        </div>
      </div>

      {/* WhatsApp header */}
      <div style={{ background: '#1f2c34', padding: '0.6rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: accentColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 }}>{avatar}</div>
        <div>
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.9rem' }}>{businessName}</div>
          <div style={{ color: '#25D366', fontSize: '0.72rem', fontWeight: 500 }}>● Online</div>
        </div>
      </div>

      {/* Chat area */}
      <div style={{
        background: '#0b141a',
        height: '420px',
        overflowY: 'auto',
        padding: '1rem 0.75rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.02\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
      }}>
        {messages.length === 0 && !isTyping && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', opacity: 0.5 }}>
            <div style={{ fontSize: '2rem' }}>{avatar}</div>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.82rem', textAlign: 'center' }}>Press Play to start the demo</div>
          </div>
        )}

        {messages.map((msg) => (
          <div key={msg.id}>
            {msg.from === "bot" && msg.text && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{
                  background: '#1f2c34',
                  color: '#e9edef',
                  borderRadius: '0 12px 12px 12px',
                  padding: '0.5rem 0.75rem',
                  maxWidth: '85%',
                  fontSize: '0.82rem',
                  lineHeight: 1.5,
                  boxShadow: '0 1px 2px rgba(0,0,0,0.3)',
                }}>
                  <span dangerouslySetInnerHTML={{ __html: formatText(msg.text) }} />
                  <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.65rem', textAlign: 'right', marginTop: '0.2rem' }}>
                    {new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            )}
            {msg.from === "user" && msg.text && (
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{
                  background: '#005c4b',
                  color: '#e9edef',
                  borderRadius: '12px 0 12px 12px',
                  padding: '0.5rem 0.75rem',
                  maxWidth: '75%',
                  fontSize: '0.82rem',
                  lineHeight: 1.5,
                  boxShadow: '0 1px 2px rgba(0,0,0,0.3)',
                }}>
                  {msg.text}
                  <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.65rem', textAlign: 'right', marginTop: '0.2rem' }}>
                    {new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })} ✓✓
                  </div>
                </div>
              </div>
            )}
            {msg.from === "menu" && msg.options && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginTop: '0.25rem' }}>
                {msg.options.map((opt, i) => (
                  <div key={i} style={{
                    background: '#1f2c34',
                    border: `1px solid ${accentColor}40`,
                    borderRadius: '8px',
                    padding: '0.45rem 0.75rem',
                    color: accentColor,
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'default',
                    textAlign: 'center',
                  }}>
                    {opt}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div style={{ background: '#1f2c34', borderRadius: '0 12px 12px 12px', padding: '0.6rem 0.9rem', display: 'flex', gap: '4px', alignItems: 'center' }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{
                  width: '6px', height: '6px', borderRadius: '50%', background: 'rgba(255,255,255,0.4)',
                  animation: 'typing-dot 1.2s infinite',
                  animationDelay: `${i * 0.2}s`,
                }} />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <div style={{ background: '#1f2c34', padding: '0.6rem 0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <div style={{ flex: 1, background: '#2a3942', borderRadius: '1.5rem', padding: '0.45rem 0.9rem', color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem' }}>
          Message
        </div>
        <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>➤</div>
      </div>

      {/* Controls */}
      <div style={{ background: '#111', padding: '0.75rem', display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
        {!running || step >= script.length ? (
          <button
            onClick={start}
            style={{ background: accentColor, color: '#000', border: 'none', borderRadius: '2rem', padding: '0.5rem 1.5rem', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'Space Grotesk, sans-serif' }}
          >
            {step >= script.length ? '↺ Replay' : '▶ Play Demo'}
          </button>
        ) : (
          <button
            onClick={reset}
            style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: 'none', borderRadius: '2rem', padding: '0.5rem 1.25rem', fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <RotateCcw size={13} /> Reset
          </button>
        )}
      </div>
    </div>
  );
}

export default function DemoShowcase() {
  return (
    <div style={{ minHeight: '100vh', background: '#0A0F1E', fontFamily: 'DM Sans, sans-serif' }}>
      <style>{`
        @keyframes typing-dot {
          0%, 60%, 100% { opacity: 0.3; transform: scale(1); }
          30% { opacity: 1; transform: scale(1.3); }
        }
      `}</style>

      {/* Nav */}
      <div style={{ borderBottom: '1px solid rgba(0,230,118,0.1)', padding: '1rem 2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Link href="/">
          <a style={{ color: '#00E676', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem', fontWeight: 600 }}>
            <ArrowLeft size={16} /> Back to BusyBot
          </a>
        </Link>
        <span style={{ color: 'rgba(240,244,255,0.3)', fontSize: '0.85rem' }}>/ Demo Showcase</span>
      </div>

      {/* Header */}
      <div style={{ textAlign: 'center', padding: '4rem 1rem 3rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(0,230,118,0.1)', border: '1px solid rgba(0,230,118,0.3)', borderRadius: '2rem', padding: '0.4rem 1rem', marginBottom: '1.5rem' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00E676', boxShadow: '0 0 8px #00E676', animation: 'pulse 2s infinite' }} />
          <span style={{ color: '#00E676', fontSize: '0.8rem', fontWeight: 600 }}>Interactive Demo</span>
        </div>
        <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#fff', marginBottom: '1rem' }}>
          See BusyBot in Action
        </h1>
        <p style={{ color: 'rgba(240,244,255,0.6)', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7, fontSize: '1rem' }}>
          Watch two real-world examples of BusyBot handling customer enquiries and bookings — completely automatically.
        </p>
      </div>

      {/* Two demos side by side */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', justifyContent: 'center', padding: '0 2rem 6rem' }}>
        {/* Tattoo demo */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
          <div>
            <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, color: '#fff', fontSize: '1.3rem', textAlign: 'center', marginBottom: '0.4rem' }}>🎨 Tattoo Studio</h2>
            <p style={{ color: 'rgba(240,244,255,0.5)', fontSize: '0.85rem', textAlign: 'center', maxWidth: '280px' }}>Consultation booking, style preferences, pricing — all handled in WhatsApp.</p>
          </div>
          <DemoPhone
            script={TATTOO_SCRIPT}
            businessName="Ink & Iron Tattoo"
            avatar="🎨"
            accentColor="#FF6B35"
          />
        </div>

        {/* Nail demo */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
          <div>
            <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, color: '#fff', fontSize: '1.3rem', textAlign: 'center', marginBottom: '0.4rem' }}>💅 Nail Technician</h2>
            <p style={{ color: 'rgba(240,244,255,0.5)', fontSize: '0.85rem', textAlign: 'center', maxWidth: '280px' }}>Appointment booking, service selection, availability check and deposit collection.</p>
          </div>
          <DemoPhone
            script={NAIL_SCRIPT}
            businessName="Gloss & Glam Nails"
            avatar="💅"
            accentColor="#FF69B4"
          />
        </div>
      </div>

      {/* CTA */}
      <div style={{ textAlign: 'center', padding: '0 1rem 6rem' }}>
        <p style={{ color: 'rgba(240,244,255,0.6)', marginBottom: '1.5rem', fontSize: '1rem' }}>
          Want a bot like this for your business?
        </p>
        <Link href="/#contact">
          <a style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#00E676', color: '#0A0F1E', padding: '0.85rem 2rem', borderRadius: '0.6rem', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, fontSize: '1rem', textDecoration: 'none', boxShadow: '0 0 30px rgba(0,230,118,0.3)' }}>
            Get Your Free Demo →
          </a>
        </Link>
      </div>
    </div>
  );
}
