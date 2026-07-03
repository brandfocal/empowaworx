import * as React from 'react';
import { usePageMeta } from '../../hooks/usePageMeta';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Users, Target, Heart, Award, MapPin, ChevronDown, Upload, Send, Briefcase, CheckCircle, ArrowUpRight, AlertCircle } from 'lucide-react';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { AfricaWatermark } from '../AfricaWatermark';
import { cn } from '@/lib/utils';
import { submitToGravityForm } from '../../services/gravityForms';

// --- Brand Tokens ---
const RED = '#FC3637';
const DARK = '#0D0D0D';
const FOOTER_BG = '#0A0A0A';
const WHITE = '#FFFFFF';
const CHARCOAL = '#1E1E1E';
const GRAY60 = 'rgba(30,30,30,0.60)';

// --- Global CSS ---
const GLOBAL_STYLES = `
  @media (prefers-reduced-motion: no-preference) {
    .nav-link-ew { position: relative; text-decoration: none; }
    .nav-link-ew::after {
      content: ''; position: absolute; bottom: -2px; left: 0;
      width: 0; height: 1.5px; transition: width 0.3s ease;
    }
    .nav-link-light::after { background: #ffffff; }
    .nav-link-dark::after  { background: ${RED}; }
    .nav-link-ew:hover::after { width: 100%; }

    @keyframes brand-pulse {
      0%   { transform: scale(1);    opacity: 1; }
      40%  { transform: scale(1.15); opacity: 0.7; }
      100% { transform: scale(1);    opacity: 1; }
    }
    .brand-pulse { animation: brand-pulse 2s ease-in-out 2; }

    @keyframes ew-ticker {
      from { transform: translateX(0); }
      to   { transform: translateX(-50%); }
    }
    .ew-ticker-track { display: flex; width: max-content; animation: ew-ticker 30s linear infinite; }

    .footer-nav-link-ew { position: relative; text-decoration: none; }
    .footer-nav-link-ew::after {
      content: ''; position: absolute; bottom: -2px; left: 0;
      width: 0; height: 1.5px; background: ${RED}; transition: width 0.3s ease;
    }
    .footer-nav-link-ew:hover { color: #ffffff !important; }
    .footer-nav-link-ew:hover::after { width: 100%; }
    .footer-social-ew { transition: background-color 0.25s ease, border-color 0.25s ease; }
    .footer-social-ew:hover { background-color: ${RED} !important; border-color: ${RED} !important; }

    .value-card-ew { transition: border-color 0.3s, box-shadow 0.3s; }
    .value-card-ew:hover { border-color: ${RED} !important; }
  }

  @media (prefers-reduced-motion: reduce) {
    .ew-ticker-track { animation: none; }
    .nav-link-ew::after { display: none; }
  }

  /* Responsive helpers */
  .ew-form-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 24px;
  }
  @media (max-width: 767px) {
    .ew-form-grid {
      grid-template-columns: 1fr;
    }
    .ew-culture-header-grid {
      grid-template-columns: 1fr !important;
    }
    .ew-footer-cta-row {
      flex-direction: column !important;
      align-items: stretch !important;
      text-align: center !important;
    }
    .ew-footer-cta-row h3 {
      text-align: center !important;
    }
    .ew-footer-cta-row a {
      width: 100% !important;
      justify-content: center !important;
    }
    .ew-submit-row {
      justify-content: stretch !important;
    }
    .ew-submit-row button {
      width: 100% !important;
      justify-content: center !important;
    }
    .ew-availability-wrapper {
      max-width: 100% !important;
    }
    .ew-hero-status-bar-right {
      display: none !important;
    }
    .ew-footer-bottom-bar {
      flex-direction: column !important;
      align-items: center !important;
    }
  }
  @media (min-width: 768px) and (max-width: 1132px) {
    .ew-culture-header-grid {
      grid-template-columns: 1fr !important;
    }
    .ew-footer-cta-row {
      flex-direction: row !important;
      align-items: center !important;
    }
  }
`;

// --- Types ---
interface TickerItem {
  id: string;
  text: string;
}
interface CultureValue {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}
interface AreaOfInterestOption {
  id: string;
  value: string;
  label: string;
}
interface OpportunityTypeOption {
  id: string;
  value: string;
  label: string;
}
interface AvailabilityOption {
  id: string;
  value: string;
  label: string;
}
interface CultureCard {
  id: string;
  num: string;
  title: string;
  description: string;
  tall?: boolean;
}

const TICKER_ITEMS: TickerItem[] = [{
  id: 't1',
  text: 'BUILD YOUR CAREER'
}, {
  id: 't2',
  text: 'IMPACT LEADERS'
}, {
  id: 't3',
  text: 'GROWTH MINDSET'
}, {
  id: 't4',
  text: 'PURPOSE DRIVEN'
}, {
  id: 't5',
  text: 'EMPOWA YOUR FUTURE'
}, {
  id: 't6',
  text: 'JOIN THE TEAM'
}, {
  id: 't7',
  text: 'AFRICA FIRST'
}, {
  id: 't8',
  text: 'MAKE YOUR MARK'
}];
const CULTURE_VALUES: CultureValue[] = [{
  id: 'v1',
  icon: <Users size={20} color={RED} />,
  title: 'Collaborative Spirit',
  description: 'We believe in the power of collective intelligence. At EmpowaWorx, your voice matters, and our flat hierarchy ensures innovation can come from anywhere.'
}, {
  id: 'v2',
  icon: <Target size={20} color={RED} />,
  title: 'Purpose Driven',
  description: 'Every project we undertake is designed to make a tangible impact. We empower communities and brands through strategic excellence that matters.'
}, {
  id: 'v3',
  icon: <Heart size={20} color={RED} />,
  title: 'Integrity & Excellence',
  description: 'Our reputation is built on trust. We maintain the highest ethical standards while delivering world-class results for our global clientele.'
}, {
  id: 'v4',
  icon: <Award size={20} color={RED} />,
  title: 'Growth Mindset',
  description: 'Continuous learning is part of our DNA. We invest in our people through mentorship, advanced training, and rapid career progression opportunities.'
}];
const AREAS_OF_INTEREST: AreaOfInterestOption[] = [{
  id: 'ai1',
  value: 'strategic-communications',
  label: 'Strategic Communications'
}, {
  id: 'ai2',
  value: 'public-relations-media',
  label: 'Public Relations and Media Relations'
}, {
  id: 'ai3',
  value: 'corporate-affairs',
  label: 'Corporate Affairs'
}, {
  id: 'ai4',
  value: 'public-affairs-stakeholder',
  label: 'Public Affairs and Stakeholder Engagement'
}, {
  id: 'ai5',
  value: 'brand-marketing',
  label: 'Brand Marketing'
}, {
  id: 'ai6',
  value: 'digital-social-media',
  label: 'Digital and Social Media'
}, {
  id: 'ai7',
  value: 'content-creation',
  label: 'Content Creation'
}, {
  id: 'ai8',
  value: 'photography-videography',
  label: 'Photography Videography'
}, {
  id: 'ai9',
  value: 'graphic-design',
  label: 'Graphic Design'
}, {
  id: 'ai10',
  value: 'event-production',
  label: 'Event Production'
}, {
  id: 'ai11',
  value: 'project-management',
  label: 'Project Management'
}, {
  id: 'ai12',
  value: 'brand-activations',
  label: 'Brand Activations'
}, {
  id: 'ai13',
  value: 'influencer-creator-campaigns',
  label: 'Influencer Creator Campaigns'
}, {
  id: 'ai14',
  value: 'speaker-facilitator-mc',
  label: 'Speaker Facilitator MC'
}, {
  id: 'ai15',
  value: 'research-data-analytics',
  label: 'Research Data and Analytics'
}, {
  id: 'ai16',
  value: 'esg-impact-economic-development',
  label: 'ESG Impact Economic Development'
}, {
  id: 'ai17',
  value: 'internships-graduate',
  label: 'Internships Graduate Opportunities'
}, {
  id: 'ai18',
  value: 'freelance-project-based',
  label: 'Freelance Project-Based Work'
}];
const OPPORTUNITY_TYPES: OpportunityTypeOption[] = [{
  id: 'ot1',
  value: 'permanent',
  label: 'Permanent'
}, {
  id: 'ot2',
  value: 'freelance',
  label: 'Freelance'
}, {
  id: 'ot3',
  value: 'internship',
  label: 'Internship'
}, {
  id: 'ot4',
  value: 'graduate-programme',
  label: 'Graduate Programme'
}, {
  id: 'ot5',
  value: 'project-based',
  label: 'Project-Based'
}, {
  id: 'ot6',
  value: 'speaker-facilitator-mc',
  label: 'Speaker Facilitator MC'
}, {
  id: 'ot7',
  value: 'brand-ambassador-promoter',
  label: 'Brand Ambassador Promoter'
}, {
  id: 'ot8',
  value: 'consultant-advisor',
  label: 'Consultant Advisor'
}];
const AVAILABILITY_OPTIONS: AvailabilityOption[] = [{
  id: 'av1',
  value: 'immediately',
  label: 'Immediately'
}, {
  id: 'av2',
  value: '1-2-weeks',
  label: '1-2 Weeks'
}, {
  id: 'av3',
  value: '1-month',
  label: '1 Month'
}, {
  id: 'av4',
  value: 'project-dependent',
  label: 'Project Dependent'
}];
const CULTURE_CARDS: CultureCard[] = [{
  id: 'cc1',
  num: '01',
  title: 'Excellence',
  description: 'We set and hold the highest bar — always. World-class thinking, executed with precision and delivered with unrelenting standard.',
  tall: true
}, {
  id: 'cc2',
  num: '02',
  title: 'Impact',
  description: 'Everything we do moves the needle. We build brands, shape narratives, and deliver outcomes that are felt long after the brief is closed.'
}, {
  id: 'cc3',
  num: '03',
  title: 'Integrity',
  description: 'Our reputation is the business. We operate with transparency, honour our word, and earn trust with every client, partner and team member.'
}, {
  id: 'cc4',
  num: '04',
  title: 'Boldness',
  description: 'Incremental thinking doesn\'t change Africa. We take calculated, courageous risks — and we back our people to do the same.',
  tall: true
}, {
  id: 'cc5',
  num: '05',
  title: 'Innovation',
  description: 'We are constantly interrogating the status quo. New ideas, fresh lenses, and adaptive strategy keep us ahead of the curve.'
}, {
  id: 'cc6',
  num: '06',
  title: 'Inclusion',
  description: 'Pan-African by design. We celebrate diverse talent, lived experience, and the richness of perspective that builds truly global advisory work.'
}];

// --- Hooks ---
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
function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}
function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return isMobile;
}
const useBidirectionalInView = (options = {
  amount: 0.15
}) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, {
    once: false,
    amount: options.amount
  });
  return {
    ref,
    isInView
  };
};

// --- FadeSlideUp ---
const FadeSlideUp = ({
  children,
  className,
  delay = 0
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => {
  const {
    ref,
    isInView
  } = useBidirectionalInView();
  return <motion.div ref={ref} initial={{
    opacity: 0,
    y: 40
  }} animate={isInView ? {
    opacity: 1,
    y: 0
  } : {
    opacity: 0,
    y: 40
  }} transition={{
    duration: 0.8,
    ease: [0.22, 1, 0.36, 1],
    delay
  }} className={className}>
    {children}
  </motion.div>;
};

// ─── HERO ──────────────────────────────────────────────────────────────────────
const Hero = () => {
  const reducedMotion = usePrefersReducedMotion();
  const scrollY = useScrollY();
  const [heroInView, setHeroInView] = React.useState(false);
  const heroParallaxY = reducedMotion ? 0 : scrollY * 0.32;
  React.useEffect(() => {
    const t = setTimeout(() => setHeroInView(true), 200);
    return () => clearTimeout(t);
  }, []);
  const {
    ref: heroSubRef,
    isInView: heroSubInView
  } = useBidirectionalInView({
    amount: 0.3
  });
  const S = (inView: boolean, delay = 0, duration = 0.6): React.CSSProperties => ({
    opacity: inView || reducedMotion ? 1 : 0,
    transform: inView || reducedMotion ? 'none' : 'translateY(30px)',
    transition: `opacity ${duration}s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}ms, transform ${duration}s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}ms`
  });
  const LINE1_WORDS = ['Careers', '/', 'Talent'];
  const LINE2_WORDS = ['Applications'];
  return <section style={{
    position: 'relative',
    width: '100%',
    minHeight: '80vh',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    background: DARK
  }}>
    {/* Bg image with parallax */}
    <div aria-hidden="true" style={{
      position: 'absolute',
      inset: '-20%',
      overflow: 'hidden',
      pointerEvents: 'none'
    }}>
      <img src="/empowaworx-8.jpg" alt="" style={{
        width: '100%',
        height: '140%',
        objectFit: 'cover',
        objectPosition: 'center top',
        display: 'block',
        maxWidth: '100%',
        filter: 'grayscale(1) brightness(0.45)',
        transform: `translateY(${heroParallaxY}px)`,
        willChange: 'transform'
      }} />
    </div>

    {/* Gradient overlays */}
    <div aria-hidden="true" style={{
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(to right, rgba(13,13,13,0.95) 0%, rgba(13,13,13,0.72) 45%, rgba(13,13,13,0.22) 100%)',
      pointerEvents: 'none'
    }} />
    <div aria-hidden="true" style={{
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(to bottom, rgba(13,13,13,0.50) 0%, rgba(13,13,13,0.12) 40%, rgba(13,13,13,0.88) 100%)',
      pointerEvents: 'none'
    }} />
    <div aria-hidden="true" style={{
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(ellipse at 100% 100%, rgba(252,54,55,0.18) 0%, transparent 55%)',
      pointerEvents: 'none'
    }} />

    {/* Content */}
    <div ref={heroSubRef} style={{
      position: 'relative',
      zIndex: 10,
      width: '100%',
      paddingLeft: 'clamp(16px, 5vw, 96px)',
      paddingRight: 'clamp(16px, 5vw, 96px)',
      paddingTop: 'clamp(120px, 18vw, 220px)',
      paddingBottom: 'clamp(56px, 8vw, 112px)'
    }}>
      {/* Eyebrow */}
      <div style={{
        ...S(heroSubInView, 100, 0.7),
        marginBottom: '28px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}>
          <div style={{
            width: '4px',
            height: '48px',
            background: RED,
            borderRadius: '2px',
            flexShrink: 0
          }} />
          <p style={{
            fontSize: 'clamp(13px, 1.5vw, 19px)',
            fontWeight: 500,
            color: 'rgba(255,255,255,0.70)',
            lineHeight: 1.4,
            maxWidth: '500px',
            margin: 0
          }}>
            <span>Build Africa's Leading Talent, Influence, Communications And Impact Advisory Ecosystem.</span>
          </p>
        </div>
      </div>

      {/* Headline */}
      <h1 style={{
        fontSize: 'clamp(36px, 9vw, 148px)',
        fontWeight: 600,
        lineHeight: 0.93,
        letterSpacing: '-0.06em',
        margin: '0 0 40px',
        display: 'flex',
        flexDirection: 'column',
        gap: '0'
      }}>
        {/* Line 1: Careers / Talent */}
        <span style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.18em',
          alignItems: 'baseline'
        }}>
          {LINE1_WORDS.map((word, i) => <span key={`l1-${i}`} style={{
            display: 'inline-block',
            color: word === '/' ? RED : WHITE,
            fontSize: word === '/' ? 'clamp(28px, 7vw, 112px)' : undefined,
            opacity: heroInView || reducedMotion ? 1 : 0,
            transform: heroInView || reducedMotion ? 'translateY(0)' : 'translateY(48px)',
            transition: `opacity 0.7s cubic-bezier(0.25,0.46,0.45,0.94) ${i * 90}ms, transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94) ${i * 90}ms`
          }}>
            {word}
          </span>)}
        </span>
        {/* Line 2: Applications (in red) */}
        <span style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.18em'
        }}>
          {LINE2_WORDS.map((word, i) => <span key={`l2-${i}`} style={{
            display: 'inline-block',
            color: RED,
            opacity: heroInView || reducedMotion ? 1 : 0,
            transform: heroInView || reducedMotion ? 'translateY(0)' : 'translateY(48px)',
            transition: `opacity 0.7s cubic-bezier(0.25,0.46,0.45,0.94) ${(LINE1_WORDS.length + i) * 90}ms, transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94) ${(LINE1_WORDS.length + i) * 90}ms`
          }}>
            {word}
          </span>)}
        </span>
      </h1>

      {/* CTAs */}
      <motion.div initial={{
        opacity: 0,
        scale: 0.95
      }} animate={{
        opacity: 1,
        scale: 1
      }} transition={{
        delay: 0.75,
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }} style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '12px'
      }}>
        <button onClick={() => {
          window.dispatchEvent(new CustomEvent('open-talent-form'));
          setTimeout(() => {
            document.getElementById('talent-form')?.scrollIntoView({ behavior: 'smooth' });
          }, 50);
        }} className="group flex items-center gap-3 overflow-hidden transition-transform active:scale-95" style={{
          background: RED,
          color: WHITE,
          padding: '0 clamp(18px, 3vw, 28px)',
          height: 'clamp(48px, 6vw, 56px)',
          fontSize: 'clamp(13px, 1.5vw, 15px)',
          fontWeight: 600,
          letterSpacing: '-0.01em',
          border: 'none',
          cursor: 'pointer'
        }}>
          <span style={{
            color: WHITE
          }}>Join Our Talent Network</span>
          <div className="w-5 h-5 bg-white flex items-center justify-center transform transition-transform group-hover:rotate-45">
            <ArrowUpRight size={13} style={{
              color: CHARCOAL
            }} />
          </div>
        </button>
        <button onClick={() => {
          window.dispatchEvent(new CustomEvent('open-talent-form'));
          setTimeout(() => {
            document.getElementById('talent-form')?.scrollIntoView({ behavior: 'smooth' });
          }, 50);
        }} className="group relative overflow-hidden flex items-center justify-center transition-transform active:scale-95" style={{
          border: '1px solid rgba(255,255,255,0.25)',
          background: 'transparent',
          color: WHITE,
          padding: '0 clamp(18px, 3vw, 28px)',
          height: 'clamp(48px, 6vw, 56px)',
          fontSize: 'clamp(13px, 1.5vw, 15px)',
          fontWeight: 600,
          letterSpacing: '-0.01em',
          cursor: 'pointer'
        }}>
          <div className="absolute inset-0 bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
          <span className="relative z-10 group-hover:text-[#1E1E1E] transition-colors duration-300">Apply Now</span>
        </button>
      </motion.div>
    </div>

    {/* Bottom status bar */}
    <div style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 10,
      padding: '14px clamp(16px, 5vw, 96px)',
      background: 'rgba(0,0,0,0.50)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <p style={{
        color: 'rgba(255,255,255,0.50)',
        fontSize: '11px',
        fontWeight: 500,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        margin: 0
      }}>
        <span>Pan-African Advisory</span>
      </p>
      <p className="ew-hero-status-bar-right" style={{
        color: RED,
        fontSize: '11px',
        fontWeight: 700,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        margin: 0
      }}>
        <span>Join Our Talent Network</span>
      </p>
    </div>
  </section>;
};

// ─── TICKER ────────────────────────────────────────────────────────────────────
const Ticker = () => {
  const [isPaused, setIsPaused] = React.useState(false);
  const allItems = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return <div style={{
    width: '100%',
    background: '#111111',
    overflow: 'hidden',
    paddingTop: '20px',
    paddingBottom: '20px',
    borderTop: `1px solid rgba(252,54,55,0.20)`,
    borderBottom: `1px solid rgba(255,255,255,0.05)`
  }} onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
    <div className="ew-ticker-track" style={{
      animationPlayState: isPaused ? 'paused' : 'running'
    }}>
      {allItems.map((item, idx) => <div key={`${item.id}-${idx}`} style={{
        display: 'flex',
        alignItems: 'center',
        flexShrink: 0,
        paddingLeft: '8px',
        paddingRight: '8px'
      }}>
        <span style={{
          fontSize: 'clamp(11px, 1.5vw, 13px)',
          fontWeight: 600,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: idx % 2 === 0 ? '#ffffff' : '#737373',
          whiteSpace: 'nowrap'
        }}>
          {item.text}
        </span>
        <span style={{
          color: idx % 2 === 0 ? RED : '#C9963A',
          marginLeft: '16px',
          marginRight: '8px',
          fontSize: '10px'
        }}>◆</span>
      </div>)}
    </div>
  </div>;
};

// ─── LIFE AT EMPOWAWORX SECTION ─────────────────────────────────────────────
const LifeSection = () => {
  const sectionRef = React.useRef<HTMLElement>(null);
  const headerRef = React.useRef<HTMLDivElement>(null);
  const cardsRef = React.useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, {
    once: false,
    amount: 0.2
  });
  const cardsInView = useInView(cardsRef, {
    once: false,
    amount: 0.1
  });
  return <section ref={sectionRef} style={{
    position: 'relative',
    background: DARK,
    overflow: 'hidden',
    padding: 'clamp(64px, 9vw, 136px) 0 0'
  }}>
    {/* Full-bleed background image with dark overlay */}
    <div aria-hidden="true" style={{
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      overflow: 'hidden'
    }}>
      <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1800&q=75" alt="" style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center 30%',
        display: 'block',
        maxWidth: '100%',
        filter: 'saturate(0.20) brightness(0.18)'
      }} />
      {/* Dark gradient on top of image */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, rgba(13,13,13,0.70) 0%, rgba(13,13,13,0.55) 40%, rgba(13,13,13,0.88) 85%, rgba(13,13,13,1) 100%)'
      }} />
      {/* Red radial glow — bottom left */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 60% 55% at 8% 85%, rgba(252,54,55,0.22) 0%, transparent 70%)'
      }} />
      {/* Subtle red radial glow — top right */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 45% 40% at 92% 10%, rgba(252,54,55,0.10) 0%, transparent 65%)'
      }} />
    </div>

    {/* Content wrapper */}
    <div style={{
      position: 'relative',
      zIndex: 10,
      maxWidth: '1400px',
      margin: '0 auto',
      paddingLeft: 'clamp(16px, 5vw, 96px)',
      paddingRight: 'clamp(16px, 5vw, 96px)'
    }}>
      {/* Section header */}
      <div ref={headerRef}>
        {/* Eyebrow */}
        <motion.span initial={{
          opacity: 0,
          y: 16
        }} animate={headerInView ? {
          opacity: 1,
          y: 0
        } : {
          opacity: 0,
          y: 16
        }} transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1]
        }} style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          color: RED,
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          marginBottom: '28px'
        }}>
          <span style={{
            width: '28px',
            height: '1.5px',
            background: RED,
            display: 'inline-block',
            flexShrink: 0
          }} />
          <span>Our Culture</span>
        </motion.span>

        {/* Headline — two-line editorial */}
        <motion.h2 initial={{
          opacity: 0,
          y: 32
        }} animate={headerInView ? {
          opacity: 1,
          y: 0
        } : {
          opacity: 0,
          y: 32
        }} transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
          delay: 0.07
        }} style={{
          fontSize: 'clamp(36px, 8vw, 120px)',
          fontWeight: 600,
          lineHeight: 0.92,
          letterSpacing: '-0.05em',
          color: WHITE,
          margin: '0 0 32px'
        }}>
          <span style={{
            display: 'block'
          }}>A Culture</span>
          <span style={{
            display: 'block'
          }}>
            <span>Built On </span>
            <span style={{
              color: RED
            }}>Impact.</span>
          </span>
        </motion.h2>

        {/* Responsive layout: paragraph + decorative rule — stacks on mobile/tablet */}
        <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={headerInView ? {
          opacity: 1,
          y: 0
        } : {
          opacity: 0,
          y: 20
        }} transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
          delay: 0.15
        }} className="ew-culture-header-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'clamp(280px, 50%, 640px) 1fr',
          gap: '40px',
          alignItems: 'flex-start',
          marginBottom: 'clamp(48px, 7vw, 96px)'
        }}>
          <p style={{
            fontSize: 'clamp(14px, 1.4vw, 18px)',
            color: 'rgba(255,255,255,0.62)',
            lineHeight: 1.75,
            margin: 0,
            fontWeight: 400
          }}>
            We are passionate, purpose-driven, Pan-African thinkers who refuse to settle for ordinary. At EmpowaWorx, we build trust at scale, shape narratives that shift power, and deliver measurable impact across every brief we take on. This isn't just a workplace — it's a movement of bold individuals who believe Africa's story deserves to be told by Africa's best.
          </p>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            paddingTop: '6px',
            opacity: 0.35
          }} className="hidden md:flex">
            <div style={{
              flex: 1,
              height: '1px',
              background: 'rgba(255,255,255,0.20)'
            }} />
            <span style={{
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.25em',
              color: WHITE,
              textTransform: 'uppercase',
              whiteSpace: 'nowrap'
            }}>
              EMPOWAWORX™
            </span>
          </div>
        </motion.div>
      </div>

      {/* Cards grid — staggered asymmetric layout */}
      <div ref={cardsRef} style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))',
        gap: '2px'
      }}>
        {CULTURE_CARDS.map((card, idx) => <motion.div key={card.id} initial={{
          opacity: 0,
          y: 48
        }} animate={cardsInView ? {
          opacity: 1,
          y: 0
        } : {
          opacity: 0,
          y: 48
        }} transition={{
          duration: 0.75,
          ease: [0.22, 1, 0.36, 1],
          delay: 0.06 * idx
        }} style={{
          position: 'relative',
          background: 'rgba(255,255,255,0.033)',
          border: '1px solid rgba(255,255,255,0.07)',
          padding: card.tall ? 'clamp(32px, 4vw, 60px) clamp(20px, 3vw, 44px)' : 'clamp(24px, 3.5vw, 48px) clamp(20px, 3vw, 44px)',
          overflow: 'hidden',
          cursor: 'default',
          transition: 'background 0.3s ease, border-color 0.3s ease'
        }} whileHover={{
          backgroundColor: 'rgba(252,54,55,0.07)',
          borderColor: 'rgba(252,54,55,0.30)'
        }}>
          {/* Large background number */}
          <span aria-hidden="true" style={{
            position: 'absolute',
            top: '-10px',
            right: '16px',
            fontSize: 'clamp(64px, 9vw, 128px)',
            fontWeight: 800,
            letterSpacing: '-0.06em',
            lineHeight: 1,
            color: 'rgba(255,255,255,0.025)',
            userSelect: 'none',
            pointerEvents: 'none'
          }}>
            {card.num}
          </span>

          {/* Red number badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px',
            background: RED,
            marginBottom: '24px',
            flexShrink: 0
          }}>
            <span style={{
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '0.04em',
              color: WHITE,
              lineHeight: 1
            }}>
              {card.num}
            </span>
          </div>

          {/* Title */}
          <h3 style={{
            fontSize: 'clamp(22px, 3vw, 38px)',
            fontWeight: 600,
            letterSpacing: '-0.04em',
            lineHeight: 1,
            color: WHITE,
            margin: '0 0 16px',
            textTransform: 'uppercase'
          }}>
            {card.title}
          </h3>

          {/* Divider */}
          <div style={{
            width: '32px',
            height: '2px',
            background: RED,
            marginBottom: '16px'
          }} />

          {/* Description */}
          <p style={{
            fontSize: '14px',
            lineHeight: 1.72,
            color: 'rgba(255,255,255,0.55)',
            margin: 0,
            fontWeight: 400
          }}>
            {card.description}
          </p>
        </motion.div>)}
      </div>
    </div>

    {/* Bottom fade-to-white transition */}
    <div aria-hidden="true" style={{
      height: 'clamp(48px, 5vw, 72px)',
      background: 'linear-gradient(to bottom, rgba(13,13,13,1) 0%, #ffffff 100%)',
      marginTop: 'clamp(64px, 8vw, 112px)'
    }} />
  </section>;
};

// ─── VACANCIES SECTION ──────────────────────────────────────────────────────
const MOCK_VACANCIES = [
  {
    id: 'v-1',
    title: 'Strategic Communications Lead',
    department: 'Advisory & PR',
    location: 'Johannesburg, GP',
    type: 'Full-Time (Hybrid)',
    experience: '6+ Years',
    description: 'Lead client accounts, craft narrative architectures, and oversee public relations campaigns for global and pan-African corporate clients.'
  },
  {
    id: 'v-2',
    title: 'Senior Event Producer',
    department: 'Legacy Events & Production',
    location: 'Johannesburg, GP',
    type: 'Full-Time (On-site)',
    experience: '5+ Years',
    description: 'Conceptualize, budget, and execute high-profile legacy tribute events, corporate forums, and experiential brand activations across Africa.'
  },
  {
    id: 'v-3',
    title: 'Multimedia Content Creator',
    department: 'Digital & Creative',
    location: 'Johannesburg, GP',
    type: 'Full-Time (Hybrid)',
    experience: '3+ Years',
    description: 'Direct video and photo production, design high-quality graphic assets, and develop social media content for our ecosystem\'s primary channels.'
  }
];

const VacanciesSection = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, amount: 0.1 });

  const handleApplyClick = () => {
    window.dispatchEvent(new CustomEvent('open-talent-form'));
    setTimeout(() => {
      document.getElementById('talent-form')?.scrollIntoView({
        behavior: 'smooth'
      });
    }, 50);
  };

  return (
    <section id="vacancies" style={{
      background: '#FFFFFF',
      padding: 'clamp(64px, 8vw, 120px) clamp(16px, 5vw, 96px)',
      borderTop: '1px solid rgba(30,30,30,0.06)'
    }}>
      <div ref={containerRef} style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '56px', textAlign: 'center' }}>
          <span style={{
            display: 'block',
            color: RED,
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: '16px'
          }}>
            Current Openings
          </span>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 56px)',
            fontWeight: 600,
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            color: CHARCOAL,
            margin: '0 auto 20px',
            maxWidth: '800px'
          }}>
            Join Us in Shaping the <span style={{ color: RED }}>African Narrative</span>
          </h2>
          <p style={{
            fontSize: 'clamp(14px, 1.2vw, 17px)',
            color: GRAY60,
            lineHeight: 1.7,
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            We are always looking for visionary thinkers, designers, communicators, and builders. Explore our active roles below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {MOCK_VACANCIES.map((job, idx) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              whileHover={{ y: -6, boxShadow: '0 12px 30px rgba(0,0,0,0.08)' }}
              style={{
                background: '#FAFAFA',
                border: '1px solid rgba(30, 30, 30, 0.08)',
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'border-color 0.3s, background 0.3s',
                minHeight: '360px'
              }}
              className="group hover:border-[#FC3637]"
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                  <span style={{
                    fontSize: '10px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: RED,
                    letterSpacing: '0.12em',
                    background: 'rgba(252,54,55,0.08)',
                    padding: '4px 10px',
                    borderRadius: '2px'
                  }}>
                    {job.department}
                  </span>
                  <div style={{ display: 'flex', gap: '8px', color: GRAY60, fontSize: '11px', fontWeight: 600 }}>
                    <span>{job.experience}</span>
                  </div>
                </div>

                <h3 style={{
                  fontSize: '20px',
                  fontWeight: 600,
                  color: CHARCOAL,
                  marginBottom: '12px',
                  lineHeight: 1.25
                }} className="group-hover:text-[#FC3637] transition-colors duration-200">
                  {job.title}
                </h3>

                <p style={{
                  fontSize: '14px',
                  color: GRAY60,
                  lineHeight: 1.6,
                  marginBottom: '24px'
                }}>
                  {job.description}
                </p>
              </div>

              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  fontSize: '12px',
                  color: 'rgba(30, 30, 30, 0.5)',
                  marginBottom: '24px',
                  borderTop: '1px solid rgba(30,30,30,0.05)',
                  paddingTop: '16px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin size={13} style={{ color: RED }} />
                    <span>{job.location}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Briefcase size={13} style={{ color: RED }} />
                    <span>{job.type}</span>
                  </div>
                </div>

                <button
                  onClick={handleApplyClick}
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: '1px solid rgba(30,30,30,0.15)',
                    color: CHARCOAL,
                    padding: '12px 20px',
                    fontSize: '12px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'all 0.25s ease'
                  }}
                  className="group-hover:bg-[#FC3637] group-hover:border-[#FC3637] group-hover:text-white"
                >
                  <span>Apply Now</span>
                  <ArrowUpRight size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── FormField Component (consistent with Contact page) ───
const FormField = ({
  label,
  id,
  type = 'text',
  placeholder = '',
  required = false,
  isTextArea = false,
  options = [],
  error,
  value,
  onChange,
  disabled = false
}: {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  isTextArea?: boolean;
  options?: string[];
  error?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  disabled?: boolean;
}) => {
  const [isFocused, setIsFocused] = React.useState(false);
  // Enhanced visibility: font-normal, higher contrast border (#A3A099), darker placeholder (#666666)
  const inputBase = cn(
    'w-full bg-white border rounded-[2px] px-4 h-12 text-base md:text-[15px] font-normal text-[#111111] focus:outline-none',
    'transition-all duration-200 ease-in-out',
    'placeholder:text-[#666666] disabled:opacity-50 disabled:cursor-not-allowed',
    error ? 'border-[#CC0000]' : isFocused ? 'border-[#FC3637]' : 'border-[#A3A099] hover:border-[#444444]'
  );
  const inputStyle: React.CSSProperties = error ? {
    boxShadow: '0 0 0 3px rgba(204,0,0,0.16)'
  } : isFocused ? {
    boxShadow: '0 0 0 3px rgba(252,54,55,0.16)'
  } : {
    boxShadow: 'none'
  };
  const selectColor: React.CSSProperties = {
    color: value ? '#111111' : '#666666'
  };
  return (
    <div className="flex flex-col w-full">
      <div className="w-5 h-[1px] mb-2" style={{
        background: 'rgba(252,54,55,0.65)'
      }} />
      <label htmlFor={id} className={cn('uppercase text-[11px] font-bold tracking-[0.15em] mb-2.5 transition-colors duration-200 ease-in-out leading-snug', isFocused || error ? 'text-[#FC3637]' : 'text-[#333333]')}>
        <span>{label}</span>
        {required && <span className="ml-1 text-[#FC3637]">*</span>}
      </label>

      {isTextArea ? (
        <textarea
          id={id}
          name={id}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          className={cn('w-full bg-white border rounded-[2px] px-4 py-3.5 text-base md:text-[15px] font-normal text-[#111111] focus:outline-none', 'transition-all duration-200 ease-in-out placeholder:text-[#666666] min-h-[140px] resize-none', error ? 'border-[#CC0000]' : isFocused ? 'border-[#FC3637]' : 'border-[#A3A099] hover:border-[#444444]')}
          style={{
            ...inputStyle,
            scrollbarColor: '#E0E0E0 #FFFFFF'
          }}
        />
      ) : options.length > 0 ? (
        <div className="relative">
          <select
            id={id}
            name={id}
            required={required}
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={disabled}
            className={cn(inputBase, 'appearance-none cursor-pointer pr-10')}
            style={{
              ...inputStyle,
              ...selectColor
            }}
          >
            <option value="" disabled style={{ color: '#666666' }}>
              {placeholder || 'Select an option'}
            </option>
            {options.map(opt => (
              <option key={opt} value={opt} style={{ color: '#111111', background: '#FFFFFF' }}>
                {opt}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-[#FC3637]" />
        </div>
      ) : (
        <input
          type={type}
          id={id}
          name={id}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          className={inputBase}
          style={inputStyle}
        />
      )}

      {error && (
        <div className="flex items-center gap-2 mt-2 mb-1 bg-red-50 border-l-2 border-red-500 pl-2.5 py-1.5 rounded-r-[2px]">
          <AlertCircle className="w-4 h-4 text-[#CC0000] flex-shrink-0" />
          <span className="text-[#CC0000] text-[12px] font-semibold uppercase tracking-[0.08em]">{error}</span>
        </div>
      )}
    </div>
  );
};

// ─── TALENT APPLICATION FORM ────────────────────────────────────────────────
const TalentFormSection = () => {
  const [showForm, setShowForm] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [cvFileName, setCvFileName] = React.useState('');
  const [portfolioFileName, setPortfolioFileName] = React.useState('');
  const [consent, setConsent] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState('');

  React.useEffect(() => {
    const handleOpenForm = () => setShowForm(true);
    window.addEventListener('open-talent-form', handleOpenForm);
    return () => window.removeEventListener('open-talent-form', handleOpenForm);
  }, []);

  const [formFields, setFormFields] = React.useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    links: '',
    areaOfInterest: '',
    opportunityType: '',
    about: '',
    whyWork: '',
    experience: '',
    availability: ''
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    fieldName: string
  ) => {
    setFormFields(prev => ({
      ...prev,
      [fieldName]: e.target.value
    }));
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: '#777777',
    display: 'block',
    marginBottom: '10px'
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    const payload = {
      "input_8": formFields.fullName,
      "input_10": formFields.email,
      "input_11": formFields.phone,
      "input_12": formFields.location,
      "input_13": formFields.links || '',
      "input_14": formFields.areaOfInterest,
      "input_15": formFields.opportunityType,
      "input_16": cvFileName,
      "input_17": portfolioFileName || '',
      "input_18": formFields.about,
      "input_19": formFields.whyWork,
      "input_20": formFields.experience,
      "input_21": formFields.availability,
      "input_22": consent ? "1" : ""
    };

    const res = await submitToGravityForm('talent', payload);
    setIsSubmitting(false);

    if (res.isSuccess) {
      setSubmitted(true);
      window.scrollTo({
        top: document.getElementById('talent-form')?.offsetTop ?? 0,
        behavior: 'smooth'
      });
    } else {
      setSubmitError(res.message || 'Failed to submit application. Please try again.');
    }
  };
  return <section id="talent-form" style={{
    background: WHITE,
    padding: 'clamp(48px, 8vw, 120px) clamp(16px, 5vw, 96px)',
    borderTop: '1px solid rgba(30,30,30,0.06)'
  }}>
    <div style={{
      maxWidth: '900px',
      margin: '0 auto'
    }}>
      <FadeSlideUp>
        <span style={{
          display: 'block',
          color: RED,
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          marginBottom: '16px'
        }}>
          Talent Network
        </span>
      </FadeSlideUp>
      <FadeSlideUp delay={0.05}>
        <h2 style={{
          fontSize: 'clamp(28px, 5vw, 64px)',
          fontWeight: 600,
          letterSpacing: '-0.04em',
          lineHeight: 0.95,
          color: CHARCOAL,
          margin: '0 0 16px'
        }}>
          <span>Join The</span>{' '}
          <span style={{
            color: RED
          }}>Talent Network</span>
        </h2>
      </FadeSlideUp>
      <FadeSlideUp delay={0.1}>
        <p style={{
          fontSize: 'clamp(14px, 1.5vw, 18px)',
          color: GRAY60,
          lineHeight: 1.7,
          margin: '0 0 40px',
          maxWidth: '600px'
        }}>
          Submit your profile and let us find the right opportunity for you across our growing advisory ecosystem.
        </p>
      </FadeSlideUp>

      <AnimatePresence mode="wait">
        {!showForm ? (
          <motion.div
            key="join-btn"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            style={{ marginTop: '8px' }}
          >
            <button
              onClick={() => setShowForm(true)}
              className="group flex items-center gap-3 overflow-hidden transition-transform active:scale-95"
              style={{
                background: RED,
                color: WHITE,
                padding: '0 36px',
                height: '56px',
                fontSize: '14px',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <span>Join Network</span>
              <div className="w-5 h-5 bg-white flex items-center justify-center transform transition-transform group-hover:rotate-45">
                <ArrowUpRight size={13} style={{ color: CHARCOAL }} />
              </div>
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="careers-form-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{
              position: 'relative',
              background: WHITE,
              border: '1px solid rgba(30,30,30,0.10)'
            }}
          >
          {/* Red top accent bar */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: RED
          }} />

          <AnimatePresence mode="wait">
            {submitted ? <motion.div key="confirmation" initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1]
            }} style={{
              padding: 'clamp(40px, 6vw, 80px) clamp(20px, 5vw, 64px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: '24px',
              paddingTop: 'clamp(48px, 6vw, 88px)'
            }}>
              <div style={{
                width: '72px',
                height: '72px',
                background: 'rgba(252,54,55,0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <CheckCircle size={36} style={{
                  color: RED
                }} />
              </div>
              <div>
                <h3 style={{
                  fontSize: 'clamp(20px, 3vw, 32px)',
                  fontWeight: 600,
                  letterSpacing: '-0.03em',
                  color: CHARCOAL,
                  margin: '0 0 16px'
                }}>
                  Application Received
                </h3>
                <p style={{
                  fontSize: 'clamp(14px, 1.4vw, 18px)',
                  color: GRAY60,
                  lineHeight: 1.7,
                  maxWidth: '540px',
                  margin: '0 auto'
                }}>
                  Thank you for applying to join the EmpowaWorx Talent Network. Your profile has been received. Should your skills, experience or interests align with current or future opportunities, our team will be in touch.
                </p>
              </div>
              <div style={{
                marginTop: '8px',
                padding: '14px 20px',
                background: 'rgba(30,30,30,0.04)',
                border: '1px solid rgba(30,30,30,0.08)'
              }}>
                <span style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'rgba(30,30,30,0.45)'
                }}>
                  EMPOWAWORX™ — BUILDING AFRICA'S LEADING ADVISORY ECOSYSTEM
                </span>
              </div>
            </motion.div> : <motion.form key="form" onSubmit={handleSubmit} style={{
              padding: 'clamp(24px, 5vw, 64px)',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              paddingTop: 'clamp(36px, 5vw, 72px)'
            }}>
              {/* Row: Full Name + Email */}
              <div className="ew-form-grid">
                <FormField
                  label="Full Name"
                  id="fullName"
                  placeholder="e.g. Simphiwe Masiza"
                  required
                  value={formFields.fullName}
                  onChange={e => handleInputChange(e, 'fullName')}
                  disabled={isSubmitting}
                />
                <FormField
                  label="Email Address"
                  id="email"
                  type="email"
                  placeholder="e.g. hello@empowaworx.co.za"
                  required
                  value={formFields.email}
                  onChange={e => handleInputChange(e, 'email')}
                  disabled={isSubmitting}
                />
              </div>

              {/* Row: Mobile Number + City/Province/Country */}
              <div className="ew-form-grid">
                <FormField
                  label="Mobile Number"
                  id="phone"
                  type="tel"
                  placeholder="e.g. 082 000 0000"
                  required
                  value={formFields.phone}
                  onChange={e => handleInputChange(e, 'phone')}
                  disabled={isSubmitting}
                />
                <FormField
                  label="City / Province / Country"
                  id="location"
                  placeholder="e.g. Johannesburg, Gauteng, South Africa"
                  required
                  value={formFields.location}
                  onChange={e => handleInputChange(e, 'location')}
                  disabled={isSubmitting}
                />
              </div>

              {/* LinkedIn / Website / Portfolio Link */}
              <FormField
                label="LinkedIn Profile / Website / Portfolio Link"
                id="links"
                type="url"
                placeholder="e.g. https://linkedin.com/in/yourname"
                value={formFields.links}
                onChange={e => handleInputChange(e, 'links')}
                disabled={isSubmitting}
              />

              {/* Row: Area of Interest + Type of Opportunity */}
              <div className="ew-form-grid">
                <FormField
                  label="Area of Interest"
                  id="areaOfInterest"
                  placeholder="Select an area"
                  required
                  options={AREAS_OF_INTEREST.map(opt => opt.label)}
                  value={formFields.areaOfInterest}
                  onChange={e => handleInputChange(e, 'areaOfInterest')}
                  disabled={isSubmitting}
                />
                <FormField
                  label="Type of Opportunity"
                  id="opportunityType"
                  placeholder="Select opportunity type"
                  required
                  options={OPPORTUNITY_TYPES.map(opt => opt.label)}
                  value={formFields.opportunityType}
                  onChange={e => handleInputChange(e, 'opportunityType')}
                  disabled={isSubmitting}
                />
              </div>

              {/* Upload CV */}
              <div className="flex flex-col w-full mb-6">
                <div className="w-5 h-[1px] mb-2" style={{
                  background: 'rgba(252,54,55,0.45)'
                }} />
                <label style={labelStyle}>
                  Upload CV or Profile <span style={{
                    color: RED
                  }}>*</span>
                </label>
                <label style={{
                  border: '2px dashed #E0E0E0',
                  padding: 'clamp(20px, 3vw, 32px) 20px',
                  textAlign: 'center',
                  background: '#FFFFFF',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '10px',
                  transition: 'all 0.2s ease-in-out'
                }} onMouseEnter={e => {
                  if (!isSubmitting) {
                    (e.currentTarget as HTMLLabelElement).style.borderColor = RED;
                    (e.currentTarget as HTMLLabelElement).style.background = 'rgba(252,54,55,0.03)';
                  }
                }} onMouseLeave={e => {
                  if (!isSubmitting) {
                    (e.currentTarget as HTMLLabelElement).style.borderColor = '#E0E0E0';
                    (e.currentTarget as HTMLLabelElement).style.background = '#FFFFFF';
                  }
                }}>
                  <Upload size={24} style={{
                    color: 'rgba(30,30,30,0.30)'
                  }} />
                  <span style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: GRAY60
                  }}>
                    {cvFileName ? cvFileName : 'Click to upload CV or Profile'}
                  </span>
                  <span style={{
                    fontSize: '12px',
                    color: 'rgba(30,30,30,0.40)'
                  }}>PDF, DOCX up to 10MB</span>
                  <input type="file" accept=".pdf,.docx,.doc" style={{
                    display: 'none'
                  }} onChange={e => setCvFileName(e.target.files?.[0]?.name ?? '')} disabled={isSubmitting} />
                </label>
              </div>

              {/* Upload Portfolio */}
              <div className="flex flex-col w-full mb-6">
                <div className="w-5 h-[1px] mb-2" style={{
                  background: 'rgba(252,54,55,0.45)'
                }} />
                <label style={labelStyle}>
                  Upload Portfolio / Showreel / Work Samples
                </label>
                <label style={{
                  border: '2px dashed #E0E0E0',
                  padding: 'clamp(20px, 3vw, 32px) 20px',
                  textAlign: 'center',
                  background: '#FFFFFF',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '10px',
                  transition: 'all 0.2s ease-in-out'
                }} onMouseEnter={e => {
                  if (!isSubmitting) {
                    (e.currentTarget as HTMLLabelElement).style.borderColor = RED;
                    (e.currentTarget as HTMLLabelElement).style.background = 'rgba(252,54,55,0.03)';
                  }
                }} onMouseLeave={e => {
                  if (!isSubmitting) {
                    (e.currentTarget as HTMLLabelElement).style.borderColor = '#E0E0E0';
                    (e.currentTarget as HTMLLabelElement).style.background = '#FFFFFF';
                  }
                }}>
                  <Briefcase size={24} style={{
                    color: 'rgba(30,30,30,0.30)'
                  }} />
                  <span style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: GRAY60
                  }}>
                    {portfolioFileName ? portfolioFileName : 'Click to upload Portfolio, Showreel or Work Samples'}
                  </span>
                  <span style={{
                    fontSize: '12px',
                    color: 'rgba(30,30,30,0.40)'
                  }}>PDF, MP4, ZIP, Images up to 50MB</span>
                  <input type="file" accept=".pdf,.mp4,.mov,.zip,.jpg,.jpeg,.png" style={{
                    display: 'none'
                  }} onChange={e => setPortfolioFileName(e.target.files?.[0]?.name ?? '')} disabled={isSubmitting} />
                </label>
              </div>

              {/* Briefly Tell Us About Yourself */}
              <FormField
                label="Briefly Tell Us About Yourself"
                id="about"
                isTextArea
                placeholder="A short summary of who you are, your background and what you bring to the table…"
                required
                value={formFields.about}
                onChange={e => handleInputChange(e, 'about')}
                disabled={isSubmitting}
              />

              {/* Why EmpowaWorx */}
              <FormField
                label="Why Would You Like to Work With EmpowaWorx"
                id="whyWork"
                isTextArea
                placeholder="Tell us what excites you about EmpowaWorx and why you'd be a great fit for our ecosystem…"
                required
                value={formFields.whyWork}
                onChange={e => handleInputChange(e, 'whyWork')}
                disabled={isSubmitting}
              />

              {/* Relevant Experience / Key Achievements */}
              <FormField
                label="Relevant Experience or Key Achievements"
                id="experience"
                isTextArea
                placeholder="Highlight your most relevant experience, notable projects or key career achievements…"
                required
                value={formFields.experience}
                onChange={e => handleInputChange(e, 'experience')}
                disabled={isSubmitting}
              />

              {/* Availability */}
              <div className="ew-availability-wrapper" style={{
                position: 'relative',
                maxWidth: '320px'
              }}>
                <FormField
                  label="Availability"
                  id="availability"
                  placeholder="Select availability"
                  required
                  options={AVAILABILITY_OPTIONS.map(opt => opt.label)}
                  value={formFields.availability}
                  onChange={e => handleInputChange(e, 'availability')}
                  disabled={isSubmitting}
                />
              </div>

              {/* Consent */}
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '14px',
                padding: '20px',
                background: '#FAFAFA',
                border: '1px solid rgba(30,30,30,0.10)'
              }}>
                <div style={{
                  position: 'relative',
                  flexShrink: 0,
                  marginTop: '2px'
                }}>
                  <input id="consent" type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} required style={{
                    width: '18px',
                    height: '18px',
                    accentColor: RED,
                    cursor: isSubmitting ? 'not-allowed' : 'pointer'
                  }} disabled={isSubmitting} />
                </div>
                <label htmlFor="consent" style={{
                  fontSize: '13px',
                  lineHeight: 1.65,
                  color: GRAY60,
                  cursor: isSubmitting ? 'not-allowed' : 'pointer'
                }}>
                  I consent to EmpowaWorx storing my information and contacting me regarding relevant career, freelance, project, speaking, creator, or partnership opportunities.
                </label>
              </div>

              {/* Submit */}
              <div className="ew-submit-row" style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                gap: '12px',
                paddingTop: '8px'
              }}>
                <button type="submit" disabled={isSubmitting} className="group flex items-center gap-3 transition-transform active:scale-95" style={{
                  background: RED,
                  color: WHITE,
                  padding: '18px clamp(20px, 4vw, 40px)',
                  fontSize: '13px',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  border: 'none',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  opacity: isSubmitting ? 0.75 : 1
                }} onMouseEnter={e => {
                  if (!isSubmitting) {
                    (e.currentTarget as HTMLButtonElement).style.background = '#d42f30';
                  }
                }} onMouseLeave={e => {
                  if (!isSubmitting) {
                    (e.currentTarget as HTMLButtonElement).style.background = RED;
                  }
                }}>
                  {isSubmitting ? (
                    <>
                      <style>{`
                        @keyframes dot-bounce {
                          0%, 100% { transform: translateY(0); opacity: 0.3; }
                          50% { transform: translateY(-3px); opacity: 1; }
                        }
                        .loading-dot {
                          display: inline-block;
                          width: 4px;
                          height: 4px;
                          border-radius: 50%;
                          background-color: currentColor;
                          animation: dot-bounce 1.4s infinite ease-in-out both;
                        }
                        .loading-dot:nth-child(1) { animation-delay: -0.32s; }
                        .loading-dot:nth-child(2) { animation-delay: -0.16s; }
                      `}</style>
                      <span className="flex items-center gap-1">
                        Submitting
                        <span className="loading-dot ml-1" />
                        <span className="loading-dot" />
                        <span className="loading-dot" />
                      </span>
                    </>
                  ) : (
                    <span>Join The EmpowaWorx Talent Network</span>
                  )}
                  <Send size={15} style={{
                    color: WHITE
                  }} />
                </button>
                {submitError && (
                  <span style={{ color: RED, fontSize: '12px', fontWeight: 600, marginTop: '4px' }}>{submitError}</span>
                )}
              </div>
            </motion.form>}
          </AnimatePresence>
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  </section>;
};

// ─── MAIN PAGE COMPONENT ─────────────────────────────────────────────────────
export const CareersPage = () => {
  usePageMeta({
    title: "Careers - Join Our Advisory Ecosystem",
    description: "Join the EmpowaWorx Talent Network. Explore opportunities to grow, influence, and drive socio-economic impact across Africa."
  });
  const isMobile = useIsMobile();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <div style={{
    background: WHITE,
    minHeight: '100vh',
    overflowX: 'clip'
  }} className="selection:bg-[#FC3637] selection:text-white">
    <style>{GLOBAL_STYLES}</style>
    {/* Film grain overlay */}
    <div aria-hidden="true" style={{
      position: 'fixed',
      inset: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 9999,
      opacity: 0.035,
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
      backgroundRepeat: 'repeat',
      backgroundSize: '200px 200px'
    }} />
    <Header />
    <main>
      <Hero />
      <Ticker />
      {/* <LifeSection /> */}
      {/* <VacanciesSection /> */}
      <TalentFormSection />
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
          textTransform: 'uppercase',
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
          Join our talent network and discover opportunities to shape narratives, build public trust, and drive meaningful outcomes across the African continent.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="/contact" className="cta-primary group h-[56px] min-w-[180px] md:min-w-[200px]">
            <span>Partner With Us</span>
            <div className="cta-icon-container">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '12px', height: '12px' }}><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
            </div>
          </a>
          <button onClick={() => {
            window.dispatchEvent(new CustomEvent('open-talent-form'));
            setTimeout(() => {
              document.getElementById('talent-form')?.scrollIntoView({ behavior: 'smooth' });
            }, 50);
          }} className="cta-secondary group h-[56px] min-w-[160px] md:min-w-[180px] border-none cursor-pointer" style={{ background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span>Join Network</span>
          </button>
        </div>
      </div>
      <AfricaWatermark isMobile={isMobile} />
    </section>

    <Footer />
  </div>;
};