import * as React from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ArrowRight, MapPin, ArrowUpRight } from 'lucide-react';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { AfricaWatermark } from '../AfricaWatermark';
import { PastEventsArchive } from './PastEventsArchive';

// ─── Brand Tokens ───────────────────────────────────────────────────────────
const RED = '#FC3637';
const DARK = '#0D0D0D';
const FOOTER_BG = '#0A0A0A';
const WHITE = '#FFFFFF';

// ─── Types ───────────────────────────────────────────────────────────────────
interface TickerItemData {
  id: string;
  text: string;
}
interface EventData {
  id: string;
  day: string;
  month: string;
  year: string;
  title: string;
  location: string;
  description: string;
  category: string;
  isFeatured?: boolean;
  platform: string;
}
// ─── Data ─────────────────────────────────────────────────────────────────────
const TICKER_ITEMS: TickerItemData[] = [{
  id: 't1',
  text: 'CONNECT'
}, {
  id: 't2',
  text: 'LEARN'
}, {
  id: 't3',
  text: 'INFLUENCE'
}, {
  id: 't4',
  text: 'GROW'
}, {
  id: 't5',
  text: 'LEADERSHIP SUMMITS'
}, {
  id: 't6',
  text: 'CEO FORUMS'
}, {
  id: 't7',
  text: 'ENTREPRENEURSHIP PLATFORMS'
}, {
  id: 't8',
  text: 'AFRICA'
}];
const EVENTS_DATA: EventData[] = [{
  id: 'e1',
  day: '14',
  month: 'AUG',
  year: '2026',
  title: 'EmpowaWomen™ Leadership Summit 2026',
  location: 'Sandton Convention Centre, Johannesburg',
  description: 'Africa\'s premier women\'s leadership platform returns — an extraordinary gathering of women executives, policymakers, and change-makers driving inclusive growth across the continent.',
  category: 'Leadership Summit',
  isFeatured: true,
  platform: 'EmpowaWomen™'
}, {
  id: 'e2',
  day: '06',
  month: 'SEP',
  year: '2026',
  title: 'EmpowaWorx™ CEO Forum: Future of African Business',
  location: 'The Maslow Hotel, Sandton, Johannesburg',
  description: 'An exclusive closed-door dialogue convening Africa\'s top chief executives to explore strategic priorities, market opportunities, and leadership challenges shaping the continent\'s economic future.',
  category: 'CEO Forum',
  platform: 'EmpowaWorx™'
}, {
  id: 'e10',
  day: '18',
  month: 'SEP',
  year: '2026',
  title: 'The Speakers Firm™ Masterclass: Art of Executive Influence',
  location: 'Virtual Experience / Johannesburg Hub',
  description: 'Master the art of high-impact public speaking, executive communication, stakeholder influence, and media presence with Africa\'s top professional speakers and trainers.',
  category: 'Executive Roundtable',
  platform: 'The Speakers Firm™'
}, {
  id: 'e3',
  day: '25',
  month: 'SEP',
  year: '2026',
  title: 'Public Affairs & Stakeholder Engagement Forum',
  location: 'Radisson Blu Gautrain, Johannesburg',
  description: 'A senior-level forum exploring the evolving landscape of public affairs, government relations, regulatory intelligence, and stakeholder engagement in South Africa and across the continent.',
  category: 'Executive Roundtable',
  platform: 'EmpowaWorx™'
}, {
  id: 'e4',
  day: '15',
  month: 'OCT',
  year: '2026',
  title: 'EmpowaYouth™ Entrepreneurship Platform 2026',
  location: 'Cape Town International Convention Centre, Cape Town',
  description: 'Africa\'s premier youth entrepreneurship platform — connecting young entrepreneurs, innovators, and emerging leaders with capital, mentorship, market access, and strategic partnerships.',
  category: 'Entrepreneurship Platform',
  platform: 'EmpowaYouth™'
}, {
  id: 'e5',
  day: '07',
  month: 'NOV',
  year: '2026',
  title: 'Industry Dialogue: Energy, Infrastructure & Investment',
  location: 'Hyatt Regency, Johannesburg',
  description: 'A high-level sector dialogue convening leaders from energy, infrastructure, and investment to unlock collaboration, address barriers, and accelerate Africa\'s industrialisation agenda.',
  category: 'Industry Dialogue',
  platform: 'EmpowaGrowth™'
}, {
  id: 'e6',
  day: '20',
  month: 'NOV',
  year: '2026',
  title: 'Africa Funding & Impact Investment Engagement',
  location: 'Pan-African (Johannesburg Hub)',
  description: 'A strategic funding engagement platform connecting founders, SMEs, and enterprises with impact investors, development finance institutions, and venture capital across Africa.',
  category: 'Funding Engagement',
  platform: 'EmpowaEntrepreneurs™'
}, {
  id: 'e7',
  day: '28',
  month: 'NOV',
  year: '2026',
  title: 'EmpowaWorx™ Excellence Awards Programme 2026',
  location: 'The Galleria, Sandton, Johannesburg',
  description: 'An evening of recognition celebrating Africa\'s most impactful leaders, institutions, and brands driving transformation, inclusive growth, and purposeful change across the continent.',
  category: 'Awards Programme',
  platform: 'EmpowaWorx™'
}, {
  id: 'e8',
  day: '05',
  month: 'DEC',
  year: '2026',
  title: 'Pan-African Strategic Networking Experience',
  location: 'Cape Town, South Africa',
  description: 'An exclusive year-end strategic networking experience bringing together C-suite executives, investors, policymakers, and thought leaders to forge high-value relationships across Africa.',
  category: 'Strategic Networking Experience',
  platform: 'EmpowaGrowth™'
}, {
  id: 'e9',
  day: '12',
  month: 'DEC',
  year: '2026',
  title: 'EmpowaMen™ Leadership Indaba 2026',
  location: 'The Maslow Hotel, Sandton, Johannesburg',
  description: 'Empowering men to lead with purpose, accountability, and integrity. A gathering focusing on leadership, mental well-being, mentorship, and building sustainable enterprises.',
  category: 'Leadership Summit',
  platform: 'EmpowaMen™'
}, {
  id: 'e11',
  day: '15',
  month: 'AUG',
  year: '2026',
  title: 'EmpowaWomen™ Executive Dinner & Roundtable',
  location: 'Sandton, Johannesburg',
  description: 'An exclusive follow-up masterclass and networking dinner following the main summit, focusing on board-level readiness, leadership presence, and wealth creation for women executives.',
  category: 'Strategic Networking Experience',
  platform: 'EmpowaWomen™'
}];
// ─── Hero headline data ───────────────────────────────────────────────────────
const HERO_LINE_1 = ['Connect', '/', 'Learn', '/', 'Influence'];
const HERO_LINE_2 = ['And', 'Grow'];

// ─── Category color map ────────────────────────────────────────────────────────
const CATEGORY_COLORS: Record<string, string> = {
  'Leadership Summit': RED,
  'CEO Forum': '#1E1E1E',
  'Executive Roundtable': '#1E1E1E',
  'Entrepreneurship Platform': RED,
  'Industry Dialogue': '#1E1E1E',
  'Funding Engagement': RED,
  'Awards Programme': RED,
  'Strategic Networking Experience': '#1E1E1E'
};

// ─── Global Styles ─────────────────────────────────────────────────────────
const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');

  .ew-nav-link { position: relative; text-decoration: none; }
  .ew-nav-link::after {
    content: ''; position: absolute; bottom: -3px; left: 0;
    width: 0; height: 1.5px; background: #FC3637; transition: width 0.3s ease;
  }
  .ew-nav-link:hover::after { width: 100%; }
  .ew-nav-link-active::after { width: 100% !important; background: #FC3637; }

  @keyframes ew-ticker {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  .ew-ticker-track {
    display: flex;
    width: max-content;
    animation: ew-ticker 32s linear infinite;
  }
  .ew-ticker-track:hover { animation-play-state: paused; }

  .ew-footer-link { position: relative; text-decoration: none; }
  .ew-footer-link::after {
    content: ''; position: absolute; bottom: -2px; left: 0;
    width: 0; height: 1.5px; background: #FC3637; transition: width 0.3s ease;
  }
  .ew-footer-link:hover { color: #ffffff !important; }
  .ew-footer-link:hover::after { width: 100%; }
  .ew-social-btn {
    transition: background-color 0.25s, border-color 0.25s, color 0.25s;
  }
  .ew-social-btn:hover {
    background-color: #FC3637 !important;
    border-color: #FC3637 !important;
    color: #ffffff !important;
  }
  .ew-event-card {
    transition: box-shadow 0.35s ease, border-left-color 0.25s;
  }
  .ew-event-card:hover {
    box-shadow: 0 24px 48px rgba(0,0,0,0.14);
    border-left-color: #FC3637 !important;
  }

  /* Responsive event card layout */
  .ew-event-row {
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 0;
    align-items: center;
  }

  @media (max-width: 639px) {
    .ew-event-row {
      grid-template-columns: 1fr;
    }
    .ew-event-date-col {
      display: flex !important;
      flex-direction: row !important;
      align-items: baseline !important;
      gap: 8px !important;
      text-align: left !important;
      padding-right: 0 !important;
      padding-bottom: 12px !important;
      min-width: unset !important;
    }
    .ew-event-divider {
      border-left: none !important;
      border-top: 1px solid rgba(0,0,0,0.08) !important;
      padding-left: 0 !important;
      padding-top: 12px !important;
    }
    .ew-event-cta {
      padding-left: 0 !important;
      padding-top: 14px !important;
    }
  }

  @media (min-width: 640px) and (max-width: 1023px) {
    .ew-event-row {
      grid-template-columns: auto 1fr;
    }
    .ew-event-cta {
      grid-column: 2;
      grid-row: 2;
      padding-left: clamp(24px,3vw,48px) !important;
      padding-top: 12px !important;
    }
  }
`;

// ─── Utility ──────────────────────────────────────────────────────────────────
function useScrollY() {
  const [scrollY, setScrollY] = React.useState(0);
  React.useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, {
      passive: true
    });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return scrollY;
}

// ─── Eyebrow Label ────────────────────────────────────────────────────────────
const Eyebrow = ({
  children
}: {
  children: React.ReactNode;
}) => <div className="flex flex-col gap-3 mb-5">
    <p style={{
      color: RED,
      fontSize: '11px',
      fontWeight: 600,
      letterSpacing: '0.2em',
      textTransform: 'uppercase'
    }}>
      {children}
    </p>
    <div style={{
      width: '40px',
      height: '2px',
      background: RED
    }} />
  </div>;

// ─── HERO ─────────────────────────────────────────────────────────────────────
const Hero = () => {
  const scrollY = useScrollY();
  const parallaxY = scrollY * 0.3;
  return <section style={{
    position: 'relative',
    width: '100%',
    minHeight: '88vh',
    display: 'flex',
    alignItems: 'flex-end',
    overflow: 'hidden',
    background: DARK
  }}>
    {/* Background image */}
    <div aria-hidden="true" style={{
      position: 'absolute',
      inset: '-20%',
      pointerEvents: 'none',
      overflow: 'hidden'
    }}>
      <img src="/empowaworx-15.jpg" alt="" style={{
        width: '100%',
        height: '140%',
        objectFit: 'cover',
        objectPosition: 'center 30%',
        filter: 'grayscale(1) brightness(0.40)',
        transform: `translateY(${parallaxY}px)`,
        willChange: 'transform',
        display: 'block',
        maxWidth: '100%'
      }} />
    </div>

    {/* Gradient overlays */}
    <div aria-hidden="true" style={{
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(to right, rgba(13,13,13,0.96) 0%, rgba(13,13,13,0.72) 55%, rgba(13,13,13,0.28) 100%)',
      pointerEvents: 'none'
    }} />
    <div aria-hidden="true" style={{
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(to bottom, rgba(13,13,13,0.45) 0%, rgba(13,13,13,0.08) 40%, rgba(13,13,13,0.92) 100%)',
      pointerEvents: 'none'
    }} />
    <div aria-hidden="true" style={{
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(ellipse at 100% 100%, rgba(252,54,55,0.18) 0%, transparent 52%)',
      pointerEvents: 'none'
    }} />

    {/* Content */}
    <div className="relative w-full" style={{
      zIndex: 10,
      paddingTop: 'clamp(120px,18vw,180px)',
      paddingBottom: 'clamp(72px,8vw,100px)',
      paddingLeft: 'clamp(16px,6vw,96px)',
      paddingRight: 'clamp(16px,6vw,96px)'
    }}>
      {/* Eyebrow */}
      <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.7,
        delay: 0.2
      }} className="flex items-center gap-4 mb-8">
        <div style={{
          width: '32px',
          height: '2px',
          background: RED,
          flexShrink: 0
        }} />
        <span style={{
          color: 'rgba(255,255,255,0.60)',
          fontSize: 'clamp(9px,1.8vw,11px)',
          fontWeight: 500,
          letterSpacing: '0.22em',
          textTransform: 'uppercase'
        }}>
          Africa's Leading Growth, Reputation, Influence &amp; Impact Advisory Firm
        </span>
      </motion.div>

      {/* Headline */}
      <motion.div initial={{
        opacity: 0,
        y: 40
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.9,
        delay: 0.3,
        ease: [0.16, 1, 0.3, 1]
      }}>
        <h1 style={{
          fontSize: 'clamp(2.8rem, 9.5vw, 8.5rem)',
          fontWeight: 600,
          letterSpacing: '-0.04em',
          lineHeight: 0.9,
          textTransform: 'none',
          marginBottom: '32px'
        }}>
          <span style={{
            display: 'block',
            color: WHITE
          }}>
            {HERO_LINE_1.map((word, i) => <span key={`l1-${i}`} style={{
              color: word === '/' ? 'rgba(255,255,255,0.28)' : WHITE
            }}>
              {word}{i < HERO_LINE_1.length - 1 ? ' ' : ''}
            </span>)}
          </span>
          <span style={{
            display: 'block'
          }}>
            {HERO_LINE_2.map((word, i) => <span key={`l2-${i}`} style={{
              color: i === HERO_LINE_2.length - 1 ? RED : WHITE
            }}>
              {word}{i < HERO_LINE_2.length - 1 ? ' ' : ''}
            </span>)}
          </span>
        </h1>
      </motion.div>

      {/* Sub-header */}
      <motion.p initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.7,
        delay: 0.5
      }} style={{
        color: 'rgba(255,255,255,0.55)',
        fontSize: 'clamp(14px,1.5vw,18px)',
        maxWidth: '560px',
        lineHeight: 1.7,
        marginBottom: '36px',
        fontWeight: 400
      }}>
        Where Leaders Connect. Ideas Converge. Opportunities Emerge.
      </motion.p>

      {/* CTA */}
      <motion.div initial={{
        opacity: 0,
        y: 16
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.7,
        delay: 0.65
      }}>
        <a href="#events-section" className="group inline-flex items-center gap-3 transition-all duration-200" style={{
          background: RED,
          color: WHITE,
          padding: 'clamp(13px,2vw,16px) clamp(24px,4vw,36px)',
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          textDecoration: 'none'
        }}>
          <span>Explore Events</span>
          <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
        </a>
      </motion.div>
    </div>

    {/* Bottom bar */}
    <div style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: '12px 16px',
      background: 'rgba(0,0,0,0.55)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      zIndex: 10
    }}>
      <p style={{
        color: 'rgba(255,255,255,0.40)',
        fontSize: '10px',
        fontWeight: 500,
        letterSpacing: '0.18em',
        textTransform: 'uppercase'
      }}>
        <span>Pan-African Advisory</span>
      </p>
      <p style={{
        color: RED,
        fontSize: '10px',
        fontWeight: 700,
        letterSpacing: '0.18em',
        textTransform: 'uppercase'
      }} className="hidden sm:block">
        <span>100% Black-Owned</span>
      </p>
    </div>
  </section>;
};

// ─── TICKER ───────────────────────────────────────────────────────────────────
const TickerStrip = () => {
  const allItems = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return <div className="w-full overflow-hidden py-5" style={{
    background: '#111111',
    borderTop: `3px solid ${RED}`,
    borderBottom: '1px solid rgba(255,255,255,0.06)'
  }}>
    <div className="ew-ticker-track">
      {allItems.map((item, idx) => <div key={`${item.id}-${idx}`} className="flex items-center shrink-0 px-2">
        <span style={{
          fontSize: '12px',
          fontWeight: 700,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: idx % 2 === 0 ? WHITE : 'rgba(255,255,255,0.35)'
        }}>
          {item.text}
        </span>
        <span style={{
          color: RED,
          fontSize: '10px',
          marginLeft: '16px'
        }}>◆</span>
      </div>)}
    </div>
  </div>;
};

// ─── THEME STATEMENT STRIP ────────────────────────────────────────────────────
const ThemeStatement = () => {
  const ref = React.useRef<HTMLElement>(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.3
  });
  return <section ref={ref} style={{
    background: '#0D0D0D',
    padding: 'clamp(64px,10vw,140px) clamp(16px,6vw,96px)',
    borderBottom: '1px solid rgba(255,255,255,0.06)'
  }}>
    <div className="max-w-7xl mx-auto">
      <motion.div initial={{
        opacity: 0,
        y: 32
      }} animate={isInView ? {
        opacity: 1,
        y: 0
      } : {
        opacity: 0,
        y: 32
      }} transition={{
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1]
      }}>
        {/* Theme statement */}
        <p style={{
          fontSize: 'clamp(1.9rem,6vw,5.5rem)',
          fontWeight: 600,
          letterSpacing: '-0.04em',
          lineHeight: 0.92,
          color: '#ffffff',
          marginBottom: 'clamp(28px,4vw,56px)'
        }}>
          <span>Connect. Learn. Influence.</span>{' '}
          <span style={{
            color: RED
          }}>Grow.</span>
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
          <div>
            <p style={{
              color: 'rgba(255,255,255,0.70)',
              fontSize: 'clamp(14px,1.4vw,17px)',
              lineHeight: 1.85,
              marginBottom: '24px'
            }}>
              Stay informed and connected to Africa's leading leadership, entrepreneurship, economic development, influence, innovation, and stakeholder engagement platforms.
            </p>
            <p style={{
              color: 'rgba(255,255,255,0.50)',
              fontSize: 'clamp(13px,1.3vw,16px)',
              lineHeight: 1.85
            }}>
              The EmpowaWorx events calendar provides exclusive access to world-class conferences, leadership summits, executive forums, entrepreneurship platforms, industry dialogues, funding engagements, awards programmes, and strategic networking experiences designed to inspire action, unlock opportunity, strengthen partnerships, and accelerate growth.
            </p>
          </div>
          <div className="flex flex-col justify-center gap-6 lg:pl-8 lg:border-l lg:border-[rgba(255,255,255,0.08)]">
            <p style={{
              fontSize: 'clamp(1rem,2vw,1.5rem)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              lineHeight: 1.35,
              color: '#ffffff'
            }}>
              Where Leaders Connect. Ideas Converge. Opportunities Emerge.
            </p>
            <a href="#events-section" className="group inline-flex items-center gap-3 self-start transition-all duration-200" style={{
              background: RED,
              color: WHITE,
              padding: '14px 32px',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              textDecoration: 'none'
            }}>
              <span>View All Events</span>
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  </section>;
};

// ─── FEATURED NEXT EVENT ──────────────────────────────────────────────────────
const FeaturedEvent = () => {
  const featured = EVENTS_DATA.find(e => e.isFeatured) || EVENTS_DATA[0];
  const ref = React.useRef<HTMLElement>(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.2
  });
  return <section ref={ref} style={{
    background: DARK,
    padding: 'clamp(48px,8vw,120px) clamp(16px,6vw,96px)'
  }}>
    <div className="max-w-7xl mx-auto">
      <Eyebrow>Featured Next Event</Eyebrow>

      <motion.div initial={{
        opacity: 0,
        y: 32
      }} animate={isInView ? {
        opacity: 1,
        y: 0
      } : {
        opacity: 0,
        y: 32
      }} transition={{
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1]
      }} style={{
        border: '1px solid rgba(255,255,255,0.07)',
        overflow: 'hidden'
      }} className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left: content */}
        <div style={{
          background: '#141414',
          padding: 'clamp(28px,5vw,80px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          borderRight: '1px solid rgba(255,255,255,0.06)'
        }}>
          {/* Category badge */}
          <div style={{
            display: 'inline-flex',
            alignSelf: 'flex-start',
            background: RED,
            color: WHITE,
            padding: '6px 16px',
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: '24px'
          }}>
            {featured.category}
          </div>

          {/* Massive date number */}
          <div style={{
            fontWeight: 900,
            fontSize: 'clamp(72px,16vw,200px)',
            color: RED,
            letterSpacing: '-0.06em',
            lineHeight: 0.82,
            marginBottom: '4px'
          }}>
            {featured.day}
          </div>
          <div style={{
            color: 'rgba(255,255,255,0.35)',
            fontSize: '13px',
            fontWeight: 700,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            marginBottom: '28px'
          }}>
            {featured.month} {featured.year}
          </div>

          <h2 style={{
            fontSize: 'clamp(1.2rem,2.8vw,2.4rem)',
            fontWeight: 600,
            color: WHITE,
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            marginBottom: '16px'
          }}>
            {featured.title}
          </h2>

          <div className="flex items-start gap-2 mb-6">
            <MapPin size={13} style={{
              color: RED,
              flexShrink: 0,
              marginTop: '3px'
            }} />
            <span style={{
              color: 'rgba(255,255,255,0.45)',
              fontSize: '14px',
              lineHeight: 1.5
            }}>
              {featured.location}
            </span>
          </div>

          <p style={{
            color: 'rgba(255,255,255,0.60)',
            fontSize: 'clamp(13px,1.2vw,15px)',
            lineHeight: 1.8,
            marginBottom: '36px',
            maxWidth: '480px'
          }}>
            {featured.description}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a href="/contact" className="cta-primary group">
              <span>Register Now</span>
              <div className="cta-icon-container">
                <ArrowUpRight size={14} className="text-[#1E1E1E]" />
              </div>
            </a>
            <a href="#about" className="cta-secondary group">
              <span>Learn More</span>
            </a>
          </div>
        </div>

        {/* Right: visual panel — hidden on smallest screens, shown on md+ */}
        <div className="hidden md:block" style={{
          minHeight: '380px',
          overflow: 'hidden',
          position: 'relative',
          background: '#0A0A0A'
        }}>
          <img src="/Honoring-Felicia-Mabuza-Suttle-2.jpg" alt={featured.title} style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'brightness(0.55) saturate(0.6)',
            display: 'block',
            maxWidth: '100%'
          }} />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(252,54,55,0.22) 0%, transparent 55%)',
            pointerEvents: 'none'
          }} />
          <div style={{
            position: 'absolute',
            bottom: '24px',
            right: '32px',
            fontSize: 'clamp(60px,10vw,140px)',
            fontWeight: 900,
            color: 'rgba(255,255,255,0.07)',
            letterSpacing: '-0.06em',
            lineHeight: 1,
            userSelect: 'none',
            pointerEvents: 'none'
          }}>
            {featured.year}
          </div>
        </div>
      </motion.div>
    </div>
  </section>;
};

// ─── ALL UPCOMING EVENTS ──────────────────────────────────────────────────────
const AllEvents = () => {
  const [selectedPlatform, setSelectedPlatform] = React.useState('All');
  const regularEvents = EVENTS_DATA.filter(e => !e.isFeatured);

  const filteredEvents = selectedPlatform === 'All'
    ? regularEvents
    : regularEvents.filter(e => e.platform === selectedPlatform);

  const ref = React.useRef<HTMLElement>(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.1
  });

  const PLATFORMS = [
    'All',
    'EmpowaWomen™',
    'EmpowaMen™',
    'EmpowaYouth™',
    'EmpowaEntrepreneurs™',
    'EmpowaGrowth™',
    'The Speakers Firm™',
    'EmpowaWorx™'
  ];

  return <section id="events-section" ref={ref} style={{
    background: WHITE,
    padding: 'clamp(48px,8vw,120px) clamp(16px,6vw,96px)'
  }}>
    <div className="max-w-7xl mx-auto">
      {/* Section header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
        <div>
          <Eyebrow>Event Calendar</Eyebrow>
          <h2 style={{
            fontSize: 'clamp(1.8rem,5vw,4rem)',
            fontWeight: 600,
            letterSpacing: '-0.04em',
            lineHeight: 0.92,
            color: '#1E1E1E'
          }}>
            All Upcoming
            <br />
            <span style={{
              color: RED
            }}>Events</span>
          </h2>
        </div>
        <p style={{
          color: '#757575',
          fontSize: 'clamp(13px,1.4vw,15px)',
          lineHeight: 1.75,
          maxWidth: '360px'
        }}>
          Chronological listing of all confirmed events across Africa. Register early — places are limited and demand is high.
        </p>
      </div>

      {/* Category Pills Navigation */}
      <div style={{
        display: 'flex',
        gap: '8px',
        overflowX: 'auto',
        scrollbarWidth: 'none',
        padding: '12px 0 24px 0',
        width: '100%',
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        marginBottom: '32px'
      }} className="scrollbar-hide">
        {PLATFORMS.map(tab => {
          const isActive = selectedPlatform === tab;
          return (
            <button
              key={tab}
              onClick={() => setSelectedPlatform(tab)}
              style={{
                background: isActive
                  ? '#FC3637'
                  : 'rgba(13, 13, 13, 0.03)',
                border: isActive
                  ? '1px solid #FC3637'
                  : '1px solid rgba(13, 13, 13, 0.08)',
                color: isActive
                  ? '#FFFFFF'
                  : 'rgba(13, 13, 13, 0.60)',
                padding: '8px 18px',
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                borderRadius: '9999px',
                whiteSpace: 'nowrap',
                boxShadow: isActive ? '0 4px 12px rgba(252, 54, 55, 0.25)' : 'none'
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = '#0D0D0D';
                  e.currentTarget.style.backgroundColor = 'rgba(252, 54, 55, 0.08)';
                  e.currentTarget.style.borderColor = 'rgba(252, 54, 55, 0.25)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = 'rgba(13, 13, 13, 0.60)';
                  e.currentTarget.style.backgroundColor = 'rgba(13, 13, 13, 0.03)';
                  e.currentTarget.style.borderColor = 'rgba(13, 13, 13, 0.08)';
                }
              }}
            >
              {tab.replace('™', '')}
            </button>
          );
        })}
      </div>

      {/* Events list */}
      <div className="flex flex-col gap-0">
        <AnimatePresence mode="popLayout">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event, idx) => (
              <motion.div
                key={event.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="ew-event-card ew-event-row"
                style={{
                  borderBottom: '1px solid rgba(0,0,0,0.07)',
                  borderLeft: '3px solid transparent',
                  padding: 'clamp(18px,3vw,36px) 0',
                  cursor: 'pointer'
                }}
              >
                {/* Date column */}
                <div className="ew-event-date-col" style={{
                  paddingRight: 'clamp(16px,3vw,48px)',
                  textAlign: 'center',
                  minWidth: '72px'
                }}>
                  <div style={{
                    fontSize: 'clamp(2rem,5vw,4rem)',
                    fontWeight: 900,
                    color: RED,
                    letterSpacing: '-0.05em',
                    lineHeight: 0.85
                  }}>
                    {event.day}
                  </div>
                  <div style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    color: '#AAAAAA',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    marginTop: '4px'
                  }}>
                    {event.month}
                  </div>
                  <div style={{
                    fontSize: '11px',
                    fontWeight: 500,
                    color: '#CCCCCC',
                    letterSpacing: '0.1em'
                  }}>
                    {event.year}
                  </div>
                </div>

                {/* Content */}
                <div className="ew-event-divider" style={{
                  borderLeft: '1px solid rgba(0,0,0,0.08)',
                  paddingLeft: 'clamp(16px,3vw,48px)'
                }}>
                  <div style={{
                    display: 'inline-block',
                    background: CATEGORY_COLORS[event.category] || '#1E1E1E',
                    color: WHITE,
                    padding: '4px 12px',
                    fontSize: '9px',
                    fontWeight: 700,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    marginBottom: '10px'
                  }}>
                    {event.category}
                  </div>
                  <h3 style={{
                    fontSize: 'clamp(0.9rem,1.8vw,1.35rem)',
                    fontWeight: 600,
                    color: '#1E1E1E',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.25,
                    marginBottom: '8px'
                  }}>
                    {event.title}
                  </h3>
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin size={12} style={{
                      color: RED,
                      flexShrink: 0
                    }} />
                    <span style={{
                      fontSize: '13px',
                      color: '#888',
                      lineHeight: 1.4
                    }}>{event.location}</span>
                  </div>
                  <p style={{
                    fontSize: '14px',
                    color: '#666',
                    lineHeight: 1.7,
                    maxWidth: '620px',
                    marginTop: '8px'
                  }} className="hidden md:block">
                    {event.description}
                  </p>
                </div>

                {/* Register CTA */}
                <div className="ew-event-cta" style={{
                  paddingLeft: 'clamp(12px,2vw,36px)'
                }}>
                  <a href="/contact" className="cta-primary group">
                    <span>Register</span>
                    <div className="cta-icon-container">
                      <ArrowUpRight size={14} className="text-[#1E1E1E]" />
                    </div>
                  </a>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                textAlign: 'center',
                padding: '48px 0',
                color: '#888',
                fontSize: '14px'
              }}
            >
              No upcoming events scheduled for this platform at the moment.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  </section>;
};



// ─── Main Page ────────────────────────────────────────────────────────────────
export const UpcomingEventsPage = () => {
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    window.scrollTo(0, 0);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return <div style={{
    background: WHITE,
    minHeight: '100vh',
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    overflowX: 'clip'
  }}>
    <style dangerouslySetInnerHTML={{
      __html: GLOBAL_STYLES
    }} />

    <Header />

    <main>
      <Hero />
      <TickerStrip />
      <ThemeStatement />
      {/* <FeaturedEvent /> */}
      {/* <AllEvents /> */}
      <PastEventsArchive />
    </main>

    {/* ── CLOSING CTA SECTION ─── */}
    <section style={{
      position: 'relative',
      background: '#0D0D0D',
      padding: isMobile ? '80px 24px' : '140px 96px',
      overflow: 'hidden',
      borderTop: '1px solid rgba(255,255,255,0.06)'
    }}>
      <div style={{
        position: 'relative',
        zIndex: 2,
        textAlign: 'center',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <h2 style={{
          fontWeight: 600,
          color: '#ffffff',
          fontSize: isMobile ? '1.75rem' : 'clamp(2rem, 5vw, 3.5rem)',
          letterSpacing: '-0.03em',
          lineHeight: 1.1,
          marginBottom: '1.5rem'
        }}>
          {'Ready to Lead with '}
          <span style={{
            color: '#FC3637'
          }}>Influence and Impact?</span>
        </h2>
        <p style={{
          color: 'rgba(255,255,255,0.85)',
          fontSize: isMobile ? '1rem' : '1.125rem',
          fontWeight: 300,
          lineHeight: 1.7,
          marginBottom: '3rem',
          maxWidth: '660px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          Partner with us to create premium business summits, executive roundtables, and entrepreneurship platforms that mobilize capital and build ecosystems across Africa.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="/contact" className="cta-primary group h-[56px] min-w-[180px] md:min-w-[200px]">
            <span>Partner With Us</span>
            <div className="cta-icon-container">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '12px', height: '12px' }}><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
            </div>
          </a>
          <a href="#events-section" className="cta-secondary group h-[56px] min-w-[160px] md:min-w-[180px]">
            <span>Explore Events</span>
          </a>
        </div>
      </div>
      <AfricaWatermark isMobile={isMobile} />
    </section>

    <Footer />
  </div>;
};
