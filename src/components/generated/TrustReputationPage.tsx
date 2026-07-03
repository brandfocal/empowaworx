import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Menu, X, Linkedin, Instagram, Facebook, Youtube, Twitter, Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AfricaWatermark } from '../AfricaWatermark';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

// ─── Reduced-motion detection ────────────────────────────
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

// ─── Eyebrow Component ──────────────────────────────────
const Eyebrow = ({
  children,
  light = false
}: {
  children: React.ReactNode;
  light?: boolean;
}) => (
  <div className="mb-4">
    <p style={{
      color: light ? 'rgba(255,255,255,0.6)' : '#E63329',
      fontSize: '11px',
      fontWeight: 700,
      letterSpacing: '0.25em',
      textTransform: 'uppercase',
      fontFamily: 'Inter, sans-serif',
      margin: 0
    }}>
      {children}
    </p>
  </div>
);

// ─── Bidirectional InView hook ──────────────────────────────────────
function useBidirectionalInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = React.useRef<T>(null);
  const [inView, setInView] = React.useState(false);
  const prevScrollY = React.useRef(0);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY >= prevScrollY.current;
      prevScrollY.current = currentScrollY;
      if (entry.isIntersecting) {
        setInView(true);
      } else {
        const rect = entry.boundingClientRect;
        const isAboveViewport = rect.bottom < 0;
        if (!scrollingDown || isAboveViewport) {
          setInView(false);
        }
      }
    }, {
      threshold
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return {
    ref,
    inView
  };
}

// ─── useScrollDirection ──────────────────────────────────────
function useScrollDirection() {
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

// ─── useWindowWidth ──────────────────────────────────────────
function useWindowWidth() {
  const [width, setWidth] = React.useState(() => typeof window !== 'undefined' ? window.innerWidth : 1280);
  React.useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', onResize, {
      passive: true
    });
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return width;
}

// ─── Bidirectional Count-Up Hook ───────────────────────────────────────
function useBidirectionalCountUp(target: number, duration: number = 1500) {
  const [count, setCount] = React.useState(0);
  const [done, setDone] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const rafRef = React.useRef<number>(0);
  const reducedMotion = usePrefersReducedMotion();
  const prevScrollY = React.useRef(0);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reducedMotion) {
      setCount(target);
      setDone(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY >= prevScrollY.current;
      prevScrollY.current = currentScrollY;
      if (entry.isIntersecting) {
        setIsVisible(true);
      } else {
        const rect = entry.boundingClientRect;
        const isAboveViewport = rect.bottom < 0;
        if (!scrollingDown || isAboveViewport) {
          setIsVisible(false);
        }
      }
    }, {
      threshold: 0.4
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, reducedMotion]);
  React.useEffect(() => {
    if (reducedMotion) return;
    if (isVisible) {
      setDone(false);
      cancelAnimationFrame(rafRef.current);
      const start = performance.now();
      const step = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - (1 - progress) * (1 - progress);
        const current = Math.round(eased * target);
        setCount(current);
        if (progress < 1) {
          rafRef.current = requestAnimationFrame(step);
        } else {
          setCount(target);
          setDone(true);
        }
      };
      rafRef.current = requestAnimationFrame(step);
    } else {
      cancelAnimationFrame(rafRef.current);
      setCount(0);
      setDone(false);
    }
    return () => cancelAnimationFrame(rafRef.current);
  }, [isVisible, target, duration, reducedMotion]);
  return {
    ref,
    count,
    done,
    isVisible
  };
}

// ─── Types ───────────────────────────────────────────────
interface NavItemData {
  id: string;
  label: string;
  href: string;
  active?: boolean;
}
interface FooterLinkData {
  id: string;
  label: string;
  href: string;
}
interface TickerItemData {
  id: string;
  text: string;
}
interface StatData {
  id: string;
  label: string;
  value: number;
  prefix: string;
  suffix: string;
}
interface ServiceCategoryData {
  id: string;
  title: string;
  teaser: string;
  image: string;
  services: string[];
}
interface OutcomeItemData {
  id: string;
  number: string;
  title: string;
  descriptor: string;
  image: string;
}
interface CreedItemData {
  id: string;
  text: string;
}
interface SocialItemData {
  icon: React.ReactNode;
  label: string;
  href: string;
}

// ─── Data ────────────────────────────────────────────────
const NAV_ITEMS: NavItemData[] = [{
  id: 'n1',
  label: 'Home',
  href: '#'
}, {
  id: 'n2',
  label: 'Who We Are',
  href: '#'
}, {
  id: 'n3',
  label: 'Advisory',
  href: '#',
  active: true
}, {
  id: 'n4',
  label: 'Platforms',
  href: '#'
}, {
  id: 'n5',
  label: 'Legacy Events',
  href: '#'
}, {
  id: 'n6',
  label: 'Media',
  href: '#'
}, {
  id: 'n7',
  label: 'Careers',
  href: '#'
}];
const FOOTER_NAV_LINKS: FooterLinkData[] = [{
  id: 'f1',
  label: 'Home',
  href: '#'
}, {
  id: 'f2',
  label: 'Who We Are',
  href: '#'
}, {
  id: 'f3',
  label: 'Advisory',
  href: '#'
}, {
  id: 'f4',
  label: 'Platforms',
  href: '#'
}, {
  id: 'f5',
  label: 'Legacy Events',
  href: '#'
}, {
  id: 'f6',
  label: 'Media',
  href: '#'
}, {
  id: 'f7',
  label: 'Careers',
  href: '#'
}];
const FOOTER_PLATFORM_LINKS: FooterLinkData[] = [{
  id: 'fp1',
  label: 'EmpowaWomen™',
  href: '#'
}, {
  id: 'fp2',
  label: 'EmpowaYouth™',
  href: '#'
}, {
  id: 'fp3',
  label: 'EmpowaEntrepreneurs™',
  href: '#'
}, {
  id: 'fp4',
  label: 'EmpowaGrowth™',
  href: '#'
}, {
  id: 'fp5',
  label: 'EmpowaHER™',
  href: '#'
}, {
  id: 'fp6',
  label: 'EmpowaMen™',
  href: '#'
}, {
  id: 'fp7',
  label: 'The Speakers Firm™',
  href: '#'
}];
const FOOTER_LEGAL_LINKS: FooterLinkData[] = [{
  id: 'fl1',
  label: 'Privacy Policy',
  href: '#'
}, {
  id: 'fl2',
  label: 'Terms of Use',
  href: '#'
}, {
  id: 'fl3',
  label: 'Cookie Policy',
  href: '#'
}];
const OFFICE_CITIES = ['Johannesburg', 'Cape Town', 'Nairobi', 'Lagos'];

interface FacultyMemberData {
  id: string;
  name: string;
  title: string;
  description: string;
  image: string;
}

const FACULTY_MEMBERS: FacultyMemberData[] = [{
  id: 'f1',
  name: 'Mika Chauke',
  title: 'Lead Advisor: Trust, Reputation & Corporate Affairs',
  description: 'Supports trust building, reputation strategy, corporate affairs, stakeholder trust mapping, and executive reputation advisory.',
  image: '/team_faculty/Mika-Chauke.jpg'
}, {
  id: 'f2',
  name: '[To Be Announced]',
  title: 'Director: Trust, Reputation & Corporate Affairs',
  description: 'Leads reputation protection, corporate affairs strategy, crisis response, risk mitigation, and institutional trust building.',
  image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80'
}];

const TICKER_ITEMS_BASE: TickerItemData[] = [{
  id: 't1',
  text: 'TRUST'
}, {
  id: 't2',
  text: 'REPUTATION'
}, {
  id: 't3',
  text: 'CORPORATE AFFAIRS'
}, {
  id: 't4',
  text: 'EXECUTIVE COUNSEL'
}, {
  id: 't5',
  text: 'CRISIS RESILIENCE'
}, {
  id: 't6',
  text: 'STAKEHOLDER CONFIDENCE'
}, {
  id: 't7',
  text: 'INSTITUTIONAL CREDIBILITY'
}, {
  id: 't8',
  text: 'THOUGHT LEADERSHIP'
}];
const STATS: StatData[] = [{
  id: 's1',
  label: 'Years of Advisory',
  value: 15,
  prefix: '',
  suffix: '+'
}, {
  id: 's2',
  label: 'Executives Counselled',
  value: 500,
  prefix: '',
  suffix: '+'
}, {
  id: 's3',
  label: 'Reputations Protected',
  value: 200,
  prefix: '',
  suffix: '+'
}, {
  id: 's4',
  label: 'Crisis Mandates',
  value: 120,
  prefix: '',
  suffix: '+'
}];
const SERVICES: ServiceCategoryData[] = [{
  id: 'sv1',
  title: 'Reputation Strategy, Advisory & Executive Counsel',
  teaser: 'Building enduring reputations through strategic counsel at the highest level.',
  image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
  services: ['Reputation Strategy Development', 'Executive & Board Advisory', 'C-Suite Reputation Counsel', 'Government & Public Sector Advisory', 'Corporate Positioning & Brand Trust', 'Reputation Enhancement Strategies', 'Strategic Advisory & Counsel']
}, {
  id: 'sv2',
  title: 'Corporate Affairs, Stakeholder Trust & Institutional Credibility',
  teaser: 'Strengthening institutional credibility and deepening stakeholder trust.',
  image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&q=80',
  services: ['Corporate Affairs Advisory', 'Stakeholder Trust Programmes', 'Stakeholder Engagement Strategies', 'Institutional Reputation Management', 'Corporate Narrative Development', 'Stakeholder Confidence Building', 'Corporate Affairs Intelligence']
}, {
  id: 'sv3',
  title: 'Public Relations, Strategic Influence & Media Positioning',
  teaser: 'Shaping narratives and commanding media presence with precision.',
  image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&q=80',
  services: ['Public Relations Strategy', 'Strategic Communications', 'Media Relations', 'Narrative Architecture & Messaging', 'Share of Voice Strategies', 'Stakeholder Influence Campaigns', 'Media & Public Positioning']
}, {
  id: 'sv4',
  title: 'Executive Visibility, CEO Positioning & Leadership Influence',
  teaser: 'Elevating leadership authority and amplifying executive influence.',
  image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80',
  services: ['CEO Positioning', 'Executive Visibility Programmes', 'Executive Reputation Management', 'Leadership Communications', 'Board & Leadership Profiling', 'Executive Influence Strategies', 'Executive Media Profiling']
}, {
  id: 'sv5',
  title: 'Thought Leadership, Market Authority & Policy Influence',
  teaser: 'Establishing your voice as the definitive authority in your field.',
  image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&q=80',
  services: ['Thought Leadership Development', 'Industry Authority Positioning', 'Executive Content & Insights Strategy', 'Opinion Editorial Development', 'Industry Commentary Programmes', 'Policy Positioning & Influence', 'Knowledge Leadership Campaigns']
}, {
  id: 'sv6',
  title: 'Crisis, Issues & Reputation Resilience',
  teaser: 'Protecting reputation and restoring confidence when it matters most.',
  image: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=800&q=80',
  services: ['Crisis Communications Strategy', 'Crisis & Issues Management', 'Reputation Risk Assessments', 'Executive Crisis Counsel', 'Government & Public Sector Crisis Advisory', 'Reputation Recovery Strategies', 'Stakeholder Risk Management', 'Scenario Planning & Crisis Simulations']
}, {
  id: 'sv7',
  title: 'Internal Communications, Change & Organisational Alignment',
  teaser: 'Aligning organisations through purposeful internal communication.',
  image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&q=80',
  services: ['Internal Communications', 'Employee Engagement Programmes', 'Change Communications', 'Organisational Transformation Communications', 'Leadership Alignment Initiatives', 'Culture & Trust Building Programmes']
}, {
  id: 'sv8',
  title: 'Trust Intelligence, Governance & Reputation Risk',
  teaser: 'Providing intelligence-led insights to govern and protect reputation.',
  image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
  services: ['Trust Audits', 'Reputation Audits', 'Stakeholder Perception Studies', 'Reputation Intelligence', 'Risk & Vulnerability Assessments', 'Governance Communications', 'Reputation Governance Frameworks']
}];
const OUTCOMES: OutcomeItemData[] = [{
  id: 'o1',
  number: '01',
  title: 'Stronger Reputation, Trust and Institutional Credibility',
  descriptor: 'Build a reputation that commands respect from every stakeholder.',
  image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80'
}, {
  id: 'o2',
  number: '02',
  title: 'Increased Investor, Stakeholder and Market Confidence',
  descriptor: 'Drive measurable confidence in markets, boardrooms, and beyond.',
  image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=600&q=80'
}, {
  id: 'o3',
  number: '03',
  title: 'Enhanced Executive Influence and Leadership Authority',
  descriptor: 'Amplify leadership presence with authority that shapes industries.',
  image: 'https://images.unsplash.com/photo-1497366858526-0766cadbe8fa?w=600&q=80'
}, {
  id: 'o4',
  number: '04',
  title: 'Greater Regulatory, Government and Public Trust',
  descriptor: 'Strengthen your position with governments and regulatory bodies.',
  image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80'
}, {
  id: 'o5',
  number: '05',
  title: 'Improved Organisational Resilience During Change and Crisis',
  descriptor: 'Navigate disruption and emerge stronger with strategic resilience.',
  image: 'https://images.unsplash.com/photo-1447968954315-3f0c44f7313c?w=600&q=80'
}, {
  id: 'o6',
  number: '06',
  title: 'Reduced Reputation, Stakeholder and Communications Risk',
  descriptor: 'Identify and mitigate risk before it threatens your standing.',
  image: 'https://images.unsplash.com/photo-1509822929063-6b6cfc9b42f2?w=600&q=80'
}, {
  id: 'o7',
  number: '07',
  title: 'Stronger Competitive Positioning and Enterprise Value Creation',
  descriptor: 'Turn reputation into a lasting competitive advantage.',
  image: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=600&q=80'
}, {
  id: 'o8',
  number: '08',
  title: 'Sustainable Growth Powered by Trust, Influence and Strategic Leadership',
  descriptor: 'Fuel long-term growth through trust as a strategic asset.',
  image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=600&q=80'
}];
const CREED_ITEMS: CreedItemData[] = [{
  id: 'cr1',
  text: 'Building Trust'
}, {
  id: 'cr2',
  text: 'Protecting Reputations'
}, {
  id: 'cr3',
  text: 'Shaping Narratives'
}, {
  id: 'cr4',
  text: 'Managing Crises'
}, {
  id: 'cr5',
  text: 'Influencing Stakeholders'
}, {
  id: 'cr6',
  text: 'Counselling Leaders'
}, {
  id: 'cr7',
  text: 'Driving Credibility'
}, {
  id: 'cr8',
  text: 'Accelerating Growth'
}];
const HERO_LINE_1 = ['Trust,', 'Reputation'];
const HERO_LINE_2 = ['&', 'Corporate', 'Affairs.'];
const EASE_SMOOTH = [0.21, 0.47, 0.32, 0.98] as [number, number, number, number];
const SOCIAL_ITEMS: SocialItemData[] = [{
  icon: <Facebook size={15} />,
  label: 'Facebook',
  href: '#'
}, {
  icon: <Instagram size={15} />,
  label: 'Instagram',
  href: '#'
}, {
  icon: <Linkedin size={15} />,
  label: 'LinkedIn',
  href: '#'
}, {
  icon: <Twitter size={15} />,
  label: 'X / Twitter',
  href: '#'
}, {
  icon: <Youtube size={15} />,
  label: 'YouTube',
  href: '#'
}];



// ─── AfricaWatermark ──────────────────────────────────────


// ─── HeroHeadline ─────────────────────────────────────────
const HeroHeadline = ({
  reducedMotion,
  inView
}: {
  reducedMotion: boolean;
  inView: boolean;
}) => {
  const line1Count = HERO_LINE_1.length;
  // Fluid headline: clamp(36px, 8vw, 143px) across all breakpoints
  const headlineStyle: React.CSSProperties = {
    fontSize: 'clamp(32px, 5.5vw, 80px)',
    fontWeight: 600,
    color: '#ffffff',
    lineHeight: 0.95,
    letterSpacing: '-0.05em'
  };
  if (reducedMotion) {
    return <div className="flex flex-col">
      <h1 style={headlineStyle} className="flex flex-wrap gap-[0.18em]">
        <span>{HERO_LINE_1.join(' ')}</span>
      </h1>
      <h1 style={headlineStyle} className="flex flex-wrap gap-[0.18em]">
        <span>{HERO_LINE_2.slice(0, -1).join(' ')}</span>
        <span style={{
          color: '#FC3637'
        }}>{' ' + HERO_LINE_2[HERO_LINE_2.length - 1]}</span>
      </h1>
    </div>;
  }
  return <div className="flex flex-col">
    <h1 style={headlineStyle} className="flex flex-wrap gap-[0.18em]">
      {HERO_LINE_1.map((word, i) => <span key={`l1-${word}-${i}`} style={{
        display: 'inline-block',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.7s cubic-bezier(0.25,0.46,0.45,0.94) ${i * 80}ms, transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94) ${i * 80}ms`
      }}>
        {word}
      </span>)}
    </h1>
    <h1 style={headlineStyle} className="flex flex-wrap gap-[0.18em]">
      {HERO_LINE_2.map((word, i) => {
        const globalIdx = line1Count + i;
        const isLastWord = i === HERO_LINE_2.length - 1;
        return <span key={`l2-${word}-${i}`} style={{
          display: 'inline-block',
          color: isLastWord ? '#FC3637' : undefined,
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(40px)',
          transition: `opacity 0.7s cubic-bezier(0.25,0.46,0.45,0.94) ${globalIdx * 80}ms, transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94) ${globalIdx * 80}ms`
        }}>
          {word}
        </span>;
      })}
    </h1>
  </div>;
};

// ─── TickerStrip ──────────────────────────────────────────
const TickerStrip = () => {
  const itemsA = TICKER_ITEMS_BASE.map(item => ({
    ...item,
    uid: `a-${item.id}`
  }));
  const itemsB = TICKER_ITEMS_BASE.map(item => ({
    ...item,
    uid: `b-${item.id}`
  }));
  const allItems = [...itemsA, ...itemsB];
  return <div className="w-full bg-[#111111] border-t border-white/5" style={{
    overflow: 'hidden',
    paddingTop: '20px',
    paddingBottom: '20px'
  }}>
    <div className="ticker-track">
      {allItems.map(item => <div key={item.uid} className="flex items-center shrink-0" style={{
        paddingLeft: '24px',
        paddingRight: '24px'
      }}>
        <span style={{
          fontSize: 'clamp(10px, 1.5vw, 14px)',
          fontWeight: 700,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.9)',
          whiteSpace: 'nowrap'
        }}>
          {item.text}
        </span>
        <span style={{
          marginLeft: '24px',
          color: '#FC3637',
          fontSize: '10px'
        }}>◆</span>
      </div>)}
    </div>
  </div>;
};

// ─── StatItem ─────────────────────────────────────────────
const StatItem = ({
  label,
  value,
  prefix,
  suffix
}: {
  label: string;
  value: number;
  prefix: string;
  suffix: string;
}) => {
  const {
    ref,
    count,
    done,
    isVisible
  } = useBidirectionalCountUp(value, 2000);
  return <div ref={ref} style={{
    position: 'relative',
    padding: 'clamp(1.25rem, 3vw, 3rem) clamp(1rem, 2.5vw, 2.5rem)',
    overflow: 'hidden'
  }} className="border-r border-white/10 last:border-r-0">
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      height: '3px',
      background: '#FC3637',
      width: isVisible ? '100%' : '0%',
      transition: 'width 0.9s cubic-bezier(0.21,0.47,0.32,0.98)'
    }} />
    <div style={{
      fontSize: '10px',
      fontWeight: 800,
      color: '#FC3637',
      letterSpacing: '0.3em',
      textTransform: 'uppercase',
      marginBottom: '10px'
    }}>
      {label}
    </div>
    <div style={{
      fontSize: 'clamp(36px, 6vw, 88px)',
      fontWeight: 600,
      color: '#ffffff',
      letterSpacing: '-0.04em',
      lineHeight: 1
    }}>
      <span>{prefix}</span>
      <span>{count.toLocaleString()}</span>
      <span>{done ? suffix : ''}</span>
    </div>
  </div>;
};

// ─── ServiceCard ──────────────────────────────────────────
const ServiceCard = ({
  category,
  idx,
  reducedMotion,
  inView,
  isMobile
}: {
  category: ServiceCategoryData;
  idx: number;
  reducedMotion: boolean;
  inView: boolean;
  isMobile: boolean;
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return <div className="svc-card-wrap" style={{
    opacity: inView || reducedMotion ? 1 : 0,
    transform: inView || reducedMotion ? 'none' : 'translateY(28px)',
    transition: `opacity 0.7s cubic-bezier(0.21,0.47,0.32,0.98) ${idx * 60}ms, transform 0.7s cubic-bezier(0.21,0.47,0.32,0.98) ${idx * 60}ms`,
    background: '#FAFAFA',
    borderTop: '3px solid #FC3637',
    display: 'flex',
    flexDirection: 'column'
  }} onClick={() => setIsOpen(!isOpen)}>
    {/* Image */}
    <div className="svc-card-img" style={{
      height: isMobile ? '160px' : '200px',
      flexShrink: 0,
      position: 'relative'
    }}>
      <img src={category.image} alt={category.title} style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'block',
        filter: 'brightness(0.88)',
        maxWidth: '100%'
      }} />
      <div aria-hidden="true" style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(0,0,0,0.30)',
        pointerEvents: 'none'
      }} />
    </div>

    {/* Card body */}
    <div style={{
      flex: 1,
      position: 'relative',
      padding: '18px 18px 18px 18px',
      overflow: 'hidden'
    }}>
      {/* Ghost outline number */}
      <span aria-hidden="true" style={{
        position: 'absolute',
        top: '-8px',
        right: '10px',
        fontSize: 'clamp(44px, 5vw, 80px)',
        fontWeight: 900,
        color: 'transparent',
        WebkitTextStroke: '1px rgba(252,54,55,0.15)',
        lineHeight: 1,
        userSelect: 'none',
        pointerEvents: 'none',
        zIndex: 0
      }}>
        {String(idx + 1).padStart(2, '0')}
      </span>

      {/* Toggle icon */}
      <div style={{
        position: 'absolute',
        top: '14px',
        right: '12px',
        color: '#FC3637',
        zIndex: 2
      }}>
        {isOpen ? <Minus size={16} /> : <Plus size={16} />}
      </div>

      {/* Text content */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        paddingRight: '24px'
      }}>
        <h3 style={{
          fontSize: 'clamp(11px, 1.1vw, 15px)',
          fontWeight: 800,
          letterSpacing: '0.01em',
          color: '#1E1E1E',
          lineHeight: 1.3,
          margin: '0 0 6px 0',
          textTransform: 'uppercase'
        }}>
          {category.title}
        </h3>
        <p style={{
          fontSize: '12px',
          fontWeight: 400,
          color: 'rgba(30,30,30,0.55)',
          lineHeight: 1.55,
          margin: 0
        }}>
          {category.teaser}
        </p>
        {!isOpen && <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          marginTop: '10px',
          fontSize: '10px',
          fontWeight: 800,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: '#FC3637'
        }}>
          <span>View Services</span>
          <ArrowUpRight size={10} />
        </span>}
      </div>
    </div>

    {/* Expanded state */}
    <AnimatePresence>
      {isOpen && <motion.div initial={{
        height: 0,
        opacity: 0
      }} animate={{
        height: 'auto',
        opacity: 1
      }} exit={{
        height: 0,
        opacity: 0
      }} transition={{
        duration: 0.4,
        ease: 'easeInOut'
      }} style={{
        overflow: 'hidden',
        background: '#ffffff',
        borderLeft: '3px solid #FC3637'
      }}>
        <ul style={{
          padding: '14px 18px 18px 18px',
          margin: 0,
          listStyle: 'none',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          {category.services.map((service, i) => <li key={`${category.id}-svc-${i}`} style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px',
            fontSize: '12px',
            color: 'rgba(30,30,30,0.65)',
            lineHeight: 1.6
          }}>
            <span style={{
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              background: '#FC3637',
              flexShrink: 0,
              marginTop: '6px'
            }} />
            <span>{service}</span>
          </li>)}
        </ul>
      </motion.div>}
    </AnimatePresence>
  </div>;
};

// ─── Main Component ───────────────────────────────────────
export const TrustReputationPage = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [heroInView, setHeroInView] = React.useState(true);
  const scrollY = useScrollDirection();
  const windowWidth = useWindowWidth();
  const isScrolled = scrollY > 80;
  const reducedMotion = usePrefersReducedMotion();
  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;
  const {
    ref: footerColsRef,
    inView: footerColsInView
  } = useBidirectionalInView<HTMLDivElement>(0.1);
  const {
    ref: heroSubRef,
    inView: heroSubInView
  } = useBidirectionalInView<HTMLDivElement>(0.3);
  const {
    ref: servicesRef,
    inView: servicesInView
  } = useBidirectionalInView<HTMLDivElement>(0.05);
  const {
    ref: outcomesRef,
    inView: outcomesInView
  } = useBidirectionalInView<HTMLDivElement>(0.1);
  const {
    ref: whyRef,
    inView: whyInView
  } = useBidirectionalInView<HTMLDivElement>(0.15);
  const {
    ref: closingCtaRef,
    inView: closingCtaInView
  } = useBidirectionalInView<HTMLDivElement>(0.15);
  React.useEffect(() => {
    const t = setTimeout(() => setHeroInView(true), 300);
    return () => clearTimeout(t);
  }, []);
  const heroParallaxY = reducedMotion ? 0 : scrollY * 0.4;
  const S = (inView: boolean, delay: number = 0) => ({
    opacity: inView || reducedMotion ? 1 : 0,
    transform: inView || reducedMotion ? 'none' : 'translateY(30px)',
    transition: `opacity 0.8s cubic-bezier(0.21, 0.47, 0.32, 0.98) ${delay}ms, transform 0.8s cubic-bezier(0.21, 0.47, 0.32, 0.98) ${delay}ms`
  }) as React.CSSProperties;
  const creedAll = [...CREED_ITEMS.map(i => ({
    ...i,
    uid: `ca-${i.id}`
  })), ...CREED_ITEMS.map(i => ({
    ...i,
    uid: `cb-${i.id}`
  }))];

  // Fluid horizontal padding used throughout sections
  const sectionPx: React.CSSProperties = {
    paddingLeft: 'clamp(16px, 5vw, 80px)',
    paddingRight: 'clamp(16px, 5vw, 80px)'
  };

  // Fluid vertical padding for section blocks
  const sectionPy = (base: number = 64, max: number = 128): React.CSSProperties => ({
    paddingTop: `clamp(${base}px, 8vw, ${max}px)`,
    paddingBottom: `clamp(${base}px, 8vw, ${max}px)`
  });
  return <div className="w-full bg-white font-sans selection:bg-[#FC3637] selection:text-white" style={{
    overflowX: 'clip'
  }}>

    {/* ── GRAIN TEXTURE OVERLAY ─── */}
    <div aria-hidden="true" style={{
      position: 'fixed',
      inset: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 9999,
      opacity: 0.04,
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
      backgroundRepeat: 'repeat',
      backgroundSize: '200px 200px'
    }} />

    <Header />

    {/* ── HERO SECTION ─── */}
    <section style={{
      position: 'relative',
      width: '100%',
      minHeight: '100svh',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'flex-end',
      background: '#111111'
    }}>
      <div aria-hidden="true" style={{
        position: 'absolute',
        inset: '-4%',
        overflow: 'hidden',
        pointerEvents: 'none'
      }}>
        <img src="/empowaworx-9.jpg" alt="" style={{
          width: '100%',
          height: '108%',
          objectFit: 'cover',
          objectPosition: 'center 20%',
          display: 'block',
          filter: 'grayscale(1) brightness(0.55)',
          transform: `translateY(${heroParallaxY}px)`,
          willChange: 'transform',
          maxWidth: 'none'
        }} />
      </div>

      {/* Gradient overlays */}
      <div aria-hidden="true" style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.93) 0%, rgba(0,0,0,0.58) 40%, rgba(0,0,0,0.18) 72%, rgba(0,0,0,0.35) 100%)',
        pointerEvents: 'none'
      }} />
      <div aria-hidden="true" style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to right, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.20) 60%, transparent 100%)',
        pointerEvents: 'none'
      }} />
      <div aria-hidden="true" style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 100% 100%, rgba(252,54,55,0.12) 0%, transparent 50%)',
        pointerEvents: 'none'
      }} />

      <div style={{
        position: 'relative',
        zIndex: 10,
        width: '100%',
        paddingLeft: 'clamp(16px, 5vw, 96px)',
        paddingRight: 'clamp(16px, 5vw, 96px)',
        paddingTop: 'clamp(80px, 8vh, 120px)',
        paddingBottom: 'clamp(40px, 5vh, 60px)',
        marginTop: 'auto'
      }}>
        {/* Eyebrow */}
        <div ref={heroSubRef as React.RefObject<HTMLDivElement>} className="hidden md:flex items-center gap-4" style={{
          ...S(heroSubInView, 150),
          marginBottom: '32px'
        }}>
          <div style={{
            width: '40px',
            height: '1.5px',
            background: '#FC3637',
            flexShrink: 0
          }} />
          <p style={{
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.6)',
            margin: 0
          }}>
            TRUST · REPUTATION · CORPORATE AFFAIRS
          </p>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(16px, 3vw, 28px)'
        }}>
          <div>
            <HeroHeadline reducedMotion={reducedMotion} inView={heroInView} />
          </div>

          {/* Subheadline */}
          <div style={{
            ...S(heroInView, 500),
            maxWidth: '600px'
          }}>
            <p style={{
              fontSize: 'clamp(14px, 1.8vw, 18px)',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.8)',
              lineHeight: 1.75,
              margin: 0
            }}>
              <span>
                In today's hyperconnected world, reputation is one of the most valuable drivers of enterprise value and
                institutional credibility.{' '}
              </span>
              <strong style={{
                color: '#ffffff',
                fontWeight: 600
              }}>
                EmpowaWorx™ provides trusted counsel to boards, C-suite executives, government leaders, policymakers, and
                institutions across Africa.
              </strong>
            </p>
          </div>

          {/* CTA buttons — stacked on mobile, side-by-side on desktop */}
          <div style={{
            ...S(heroInView, 650),
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: isMobile ? '12px' : '24px',
            flexDirection: isMobile ? 'column' : 'row'
          }}>
            <a href="/contact" className="cta-primary group w-full md:w-auto">
              <span>Partner With Us</span>
              <div className="cta-icon-container">
                <ArrowUpRight size={14} className="text-[#1E1E1E]" />
              </div>
            </a>
            <a
              href="#services"
              className="cta-secondary group w-full md:w-auto"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('services');
                if (el) {
                  const headerOffset = 90;
                  const elementPosition = el.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.scrollY - headerOffset;
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                  });
                }
              }}
            >
              <span>Explore Services</span>
            </a>
          </div>

          {/* Hero bottom row — now in flow to prevent overlap */}
          <div style={{
            ...S(heroInView, 750),
            marginTop: 'clamp(32px, 5vh, 60px)',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            width: '100%',
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? '20px' : undefined
          }}>
            <div className="hero-location-text" style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              alignSelf: isMobile ? 'flex-start' : 'auto'
            }}>
              <span style={{
                fontSize: 'clamp(8px, 1vw, 9px)',
                fontWeight: 700,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.60)'
              }}>
                PRESENT IN
              </span>
              <span style={{
                fontSize: 'clamp(9px, 1.2vw, 10px)',
                fontWeight: 500,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.90)',
                whiteSpace: 'nowrap'
              }}>
                JOHANNESBURG · CAPE TOWN · NAIROBI · LAGOS
              </span>
            </div>
            {!isMobile && (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px'
              }}>
                <div className="scroll-line-pulse" style={{
                  width: '2px',
                  height: '40px',
                  background: '#FC3637'
                }} />
                <span style={{
                  fontSize: '9px',
                  fontWeight: 700,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.50)'
                }}>
                  SCROLL
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>

    {/* ── TICKER STRIP ─── */}
    <TickerStrip />

    {/* ── ADVISORY OVERVIEW ─── */}
    <div style={{
      width: '100%',
      height: '1px',
      background: 'rgba(0,0,0,0.10)'
    }} />
    <section style={{
      ...sectionPx,
      ...sectionPy(56, 128),
      background: '#ffffff'
    }}>
      <div className="grid lg:grid-cols-[1fr_1px_1fr] gap-0 items-start">
        <div className="flex flex-col">
          <span style={{
            fontSize: '11px',
            fontWeight: 900,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#FC3637',
            marginBottom: '20px',
            display: 'block'
          }}>
            ADVISORY OVERVIEW
          </span>
          <div style={{
            width: '100%',
            height: '1px',
            background: 'rgba(0,0,0,0.10)',
            marginBottom: '20px'
          }} />
          <h2 style={{
            fontSize: 'clamp(32px, 5vw, 80px)',
            fontWeight: 600,
            letterSpacing: '-0.04em',
            lineHeight: 0.95,
            color: '#1E1E1E',
            marginBottom: '24px',
            marginTop: 0
          }}>
            Trusted Counsel for Africa's Leaders
          </h2>
        </div>

        <div aria-hidden="true" className="hidden lg:block" style={{
          width: '1px',
          alignSelf: 'stretch',
          background: 'linear-gradient(to bottom, transparent, #FC3637, transparent)',
          margin: '0 2rem'
        }} />

        <div className="flex flex-col" style={{
          marginTop: isMobile || isTablet ? '32px' : 0,
          paddingLeft: !isMobile && !isTablet ? '64px' : 0
        }}>
          <p style={{
            color: 'rgba(30,30,30,0.70)',
            fontSize: 'clamp(15px, 1.5vw, 18px)',
            fontWeight: 500,
            lineHeight: 1.75,
            marginBottom: '20px',
            marginTop: 0
          }}>
            In today's stakeholder-driven world, reputation has become one of the most valuable drivers of enterprise value,
            institutional credibility, investor confidence, and long-term organisational resilience. Success is shaped by trust,
            leadership credibility, stakeholder relationships, and the ability to navigate complexity.
          </p>
          <div style={{
            width: '100%',
            height: '1px',
            background: 'rgba(0,0,0,0.10)',
            marginBottom: '20px'
          }} />
          <blockquote style={{
            borderLeft: '3px solid #FC3637',
            padding: 'clamp(16px, 2vw, 24px) clamp(16px, 2vw, 28px)',
            margin: 0,
            background: 'rgba(252,54,55,0.03)',
            fontFamily: "'Playfair Display', serif",
            fontStyle: 'italic',
            fontSize: 'clamp(0.95rem, 1.6vw, 1.25rem)',
            color: '#1E1E1E',
            lineHeight: 1.6
          }}>
            EmpowaWorx™ provides trusted counsel to boards, C-suite executives, government leaders, policymakers, and institutions
            across Africa — driving reputation, trust, and institutional credibility.
          </blockquote>
        </div>
      </div>
    </section>

    {/* ── STATS BAND ─── */}
    <div className="stats-diagonal-texture w-full" style={{
      display: 'grid',
      gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
      width: '100%',
      overflowX: 'hidden'
    }}>
      {STATS.map((stat, idx) => <div key={stat.id} style={{
        borderBottom: isMobile && idx < 2 ? '1px solid rgba(255,255,255,0.10)' : undefined,
        borderRight: isMobile && idx % 2 === 0 ? '1px solid rgba(255,255,255,0.10)' : undefined
      }}>
        <StatItem label={stat.label} value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
      </div>)}
    </div>

    {/* ── SERVICES SECTION ─── */}
    <section id="services" style={{
      ...sectionPy(56, 112),
      background: '#ffffff'
    }}>
      {/* Section header */}
      <div style={{
        ...sectionPx,
        marginBottom: '40px',
        display: 'flex',
        alignItems: isMobile ? 'flex-start' : 'flex-end',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between',
        gap: isMobile ? '12px' : undefined,
        borderBottom: '1px solid rgba(30,30,30,0.07)',
        paddingBottom: '28px'
      }}>
        <div>
          <span style={{
            fontSize: '10px',
            fontWeight: 800,
            letterSpacing: '0.3em',
            textTransform: 'uppercase' as const,
            color: '#FC3637',
            display: 'block',
            marginBottom: '10px'
          }}>
            SERVICES INCLUDE
          </span>
          <h2 style={{
            fontSize: 'clamp(22px, 3.5vw, 52px)',
            fontWeight: 600,
            letterSpacing: '-0.03em',
            color: '#1E1E1E',
            lineHeight: 1.1,
            margin: 0
          }}>
            <span>Our Service </span>
            <span style={{
              color: '#FC3637'
            }}>Capabilities.</span>
          </h2>
        </div>
        <div style={{
          border: '1px solid rgba(30,30,30,0.12)',
          padding: '6px 14px',
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.15em',
          textTransform: 'uppercase' as const,
          color: 'rgba(30,30,30,0.5)',
          whiteSpace: 'nowrap' as const,
          alignSelf: 'flex-start',
          marginTop: '4px',
          minHeight: '44px',
          display: 'flex',
          alignItems: 'center'
        }}>
          8 Practice Areas
        </div>
      </div>

      {/* Service card grid: 1 col mobile / 2 col tablet / 4 col desktop */}
      <div ref={servicesRef as React.RefObject<HTMLDivElement>} style={{
        ...sectionPx,
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
        gap: '2px'
      }}>
        {SERVICES.map((item, idx) => <ServiceCard key={item.id} category={item} idx={idx} reducedMotion={reducedMotion} inView={servicesInView} isMobile={isMobile} />)}
      </div>
    </section>

    {/* ── COMMERCIAL OUTCOMES ─── */}
    <section className="stats-diagonal-texture" style={{
      ...sectionPx,
      ...sectionPy(56, 128)
    }}>
      <div ref={outcomesRef as React.RefObject<HTMLDivElement>} style={{
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {/* Section header */}
        <div style={{
          marginBottom: isMobile ? '36px' : '64px'
        }}>
          <span style={{
            fontSize: '11px',
            fontWeight: 900,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#FC3637',
            display: 'block',
            marginBottom: '20px'
          }}>
            COMMERCIAL OUTCOMES
          </span>
          <h2 style={{
            fontSize: 'clamp(32px, 5vw, 60px)',
            fontWeight: 600,
            letterSpacing: '-0.04em',
            color: '#ffffff',
            lineHeight: 1.05,
            margin: 0
          }}>
            <span style={{
              display: 'block'
            }}>What We</span>
            <span style={{
              display: 'block',
              color: '#FC3637'
            }}>Deliver.</span>
          </h2>
        </div>

        {/* 2 col desktop / 1 col mobile */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: '2px'
        }}>
          {OUTCOMES.map((outcome, idx) => <div key={outcome.id} className="outcome-card-wrap" style={{
            background: '#1E1E1E',
            opacity: outcomesInView || reducedMotion ? 1 : 0,
            transform: outcomesInView || reducedMotion ? 'none' : 'translateY(32px)',
            transition: `opacity 0.7s cubic-bezier(0.21,0.47,0.32,0.98) ${idx * 70}ms, transform 0.7s cubic-bezier(0.21,0.47,0.32,0.98) ${idx * 70}ms`,
            display: 'flex',
            flexDirection: 'column'
          }}>
            {/* Image */}
            <div className="outcome-card-img" style={{
              height: isMobile ? '140px' : '180px',
              position: 'relative',
              flexShrink: 0
            }}>
              <img src={outcome.image} alt={outcome.title} style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                maxWidth: '100%'
              }} />
              <div aria-hidden="true" style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '80px',
                background: 'linear-gradient(to top, rgba(30,30,30,0.95) 0%, transparent 100%)',
                pointerEvents: 'none'
              }} />
            </div>

            {/* Content */}
            <div style={{
              padding: isMobile ? '16px 16px 24px' : '24px 28px 32px',
              flex: 1
            }}>
              {/* Ghost number */}
              <span aria-hidden="true" style={{
                display: 'block',
                fontSize: 'clamp(40px, 6vw, 96px)',
                fontWeight: 800,
                color: 'transparent',
                WebkitTextStroke: '1px rgba(252,54,55,0.4)',
                lineHeight: 1,
                userSelect: 'none',
                marginBottom: '8px'
              }}>
                {outcome.number}
              </span>

              <h3 style={{
                fontSize: 'clamp(14px, 1.6vw, 22px)',
                fontWeight: 600,
                color: '#ffffff',
                letterSpacing: '-0.02em',
                lineHeight: 1.2,
                margin: '0 0 10px 0',
                textTransform: 'uppercase'
              }}>
                {outcome.title}
              </h3>

              <p style={{
                fontSize: 'clamp(13px, 1.2vw, 14px)',
                fontWeight: 400,
                color: 'rgba(255,255,255,0.60)',
                lineHeight: 1.6,
                margin: 0
              }}>
                {outcome.descriptor}
              </p>

              <div style={{
                marginTop: '16px',
                width: outcomesInView ? '36px' : '0px',
                height: '2px',
                background: '#FC3637',
                transition: `width 0.6s cubic-bezier(0.21,0.47,0.32,0.98) ${idx * 70 + 400}ms`
              }} />
            </div>
          </div>)}
        </div>
      </div>
    </section>

    {/* ── CREED MARQUEE ─── */}
    <div style={{
      background: '#111111',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      paddingTop: 'clamp(48px, 6vw, 80px)',
      paddingBottom: 'clamp(48px, 6vw, 80px)',
      overflow: 'hidden'
    }}>
      <div style={{
        width: '100%',
        height: '1px',
        background: '#FC3637',
        marginBottom: '2.5rem'
      }} />
      <div style={{
        overflow: 'hidden',
        width: '100%'
      }}>
        <div className="creed-track">
          {creedAll.map(item => <div key={item.uid} className="flex items-center shrink-0" style={{
            paddingLeft: '40px',
            paddingRight: '40px'
          }}>
            <span style={{
              fontSize: 'clamp(12px, 1.5vw, 18px)',
              fontWeight: 300,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.70)',
              whiteSpace: 'nowrap'
            }}>
              {item.text}
            </span>
            <span style={{
              color: '#FC3637',
              fontSize: '10px',
              marginLeft: '2.5rem'
            }}>◆</span>
          </div>)}
        </div>
      </div>
    </div>

    {/* ── WHY EMPOWAWORX ─── */}
    <section style={{
      ...sectionPx,
      ...sectionPy(56, 128),
      background: '#ffffff'
    }}>
      <div ref={whyRef as React.RefObject<HTMLDivElement>} style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: isMobile || isTablet ? '1fr' : '1fr 1fr',
        gap: isMobile ? '40px' : '96px',
        alignItems: 'start'
      }}>
        <div style={S(whyInView, 0)}>
          <span style={{
            fontSize: '11px',
            fontWeight: 900,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#FC3637',
            display: 'block',
            marginBottom: '28px'
          }}>
            WHY EMPOWAWORX
          </span>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 64px)',
            fontWeight: 600,
            letterSpacing: '-0.04em',
            color: '#1E1E1E',
            lineHeight: 1.05,
            margin: 0
          }}>
            <span style={{
              display: 'block'
            }}>Why</span>
            <span style={{
              color: '#FC3637'
            }}>EmpowaWorx™</span>
          </h2>
        </div>

        <div style={{
          ...S(whyInView, 160),
          display: 'flex',
          flexDirection: 'column',
          gap: '36px'
        }}>
          {[{
            heading: "Africa's Trusted Reputation Authority",
            body: "With over 15 years of experience counselling boards, executives, and governments, we are Africa's most trusted reputation and corporate affairs advisory firm."
          }, {
            heading: 'Integrated Advisory Across All Fronts',
            body: 'From strategic reputation management to crisis resilience and executive visibility, our integrated approach delivers measurable impact across all stakeholder fronts.'
          }, {
            heading: 'Proven Results Under Pressure',
            body: "We have successfully navigated over 120 crisis mandates, protected 200+ reputations, and counselled 500+ executives across Africa's most complex and high-stakes environments."
          }, {
            heading: '100% Black-Owned, Pan-African',
            body: "A proudly Black-owned Pan-African advisory firm with deep understanding of Africa's complex stakeholder landscape, regulatory environment, and cultural context."
          }].map(item => <div key={item.heading}>
            <div style={{
              width: '32px',
              height: '2px',
              background: '#FC3637',
              marginBottom: '12px'
            }} />
            <h4 style={{
              fontSize: 'clamp(14px, 1.4vw, 16px)',
              fontWeight: 600,
              color: '#1E1E1E',
              letterSpacing: '-0.02em',
              margin: '0 0 8px 0'
            }}>
              {item.heading}
            </h4>
            <p style={{
              fontSize: 'clamp(14px, 1.3vw, 15px)',
              color: 'rgba(30,30,30,0.65)',
              lineHeight: 1.7,
              margin: 0
            }}>
              {item.body}
            </p>
          </div>)}
        </div>
      </div>
    </section>

    {/* ── TEAM FACULTY ─── */}
    <section className="py-12 md:py-20 lg:py-32 px-4 md:px-8 lg:px-12 w-full overflow-hidden" style={{
      display: 'none',
      background: '#ffffff'
    }}>
      <div className="max-w-[1440px] mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-14 gap-5 md:gap-8">
          <div className="w-full md:max-w-xl">
            <Eyebrow>The Faculty</Eyebrow>
            <h2 className="font-semibold uppercase" style={{
              color: '#1A1A1A',
              fontSize: 'clamp(1.6rem, 4.5vw, 3.75rem)',
              letterSpacing: '-0.04em',
              lineHeight: 0.92,
              fontFamily: 'Inter, sans-serif',
              margin: 0
            }}>
              Strategic Advisors &amp; Lead Experts
            </h2>
          </div>
          <p className="md:text-right" style={{
            color: '#757575',
            fontSize: 'clamp(14px, 1.4vw, 16px)',
            fontWeight: 400,
            lineHeight: 1.8,
            fontFamily: 'Inter, sans-serif',
            maxWidth: '340px'
          }}>
            Our team combines data-driven insights with deep-rooted cultural connections across the African continent.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-7 w-full">
          {FACULTY_MEMBERS.map(member => <div key={member.id} className="group transition-all w-full overflow-hidden" style={{
            border: '1px solid rgba(26,26,26,0.06)'
          }} onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(252,54,55,0.2)'} onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(26,26,26,0.06)'}>
            <div className="flex flex-col sm:grid sm:grid-cols-5 h-full">
              <div className="sm:col-span-2 overflow-hidden aspect-square">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0" style={{
                  display: 'block'
                }} />
              </div>
              {/* Content */}
              <div className="sm:col-span-3 p-5 md:p-7 flex flex-col justify-start" style={{
                background: '#ffffff'
              }}>
                <h3 className="font-semibold uppercase mb-1" style={{
                  color: '#1A1A1A',
                  fontSize: 'clamp(1rem, 2.5vw, 1.65rem)',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.05,
                  fontFamily: 'Inter, sans-serif'
                }}>
                  {member.name}
                </h3>
                <p className="pb-4 mb-4 md:mb-5" style={{
                  color: '#E63329',
                  fontSize: '10px',
                  fontWeight: 600,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  fontFamily: 'Inter, sans-serif',
                  borderBottom: '1px solid rgba(252,54,55,0.1)',
                  lineHeight: 1.5
                }}>
                  {member.title}
                </p>
                <p style={{
                  color: '#757575',
                  fontSize: '14px',
                  fontWeight: 400,
                  lineHeight: 1.75,
                  fontStyle: 'italic',
                  fontFamily: 'Inter, sans-serif'
                }}>
                  <span>&ldquo;</span><span>{member.description}</span><span>&rdquo;</span>
                </p>
                <div className="mt-5 sm:mt-6 flex gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer" style={{
                    background: 'rgba(0,0,0,0.05)',
                    color: '#1A1A1A'
                  }} onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.background = '#E63329';
                    (e.currentTarget as HTMLDivElement).style.color = '#ffffff';
                  }} onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.background = 'rgba(0,0,0,0.05)';
                    (e.currentTarget as HTMLDivElement).style.color = '#1A1A1A';
                  }}>
                    <Linkedin size={14} />
                  </div>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer" style={{
                    background: 'rgba(0,0,0,0.05)',
                    color: '#1A1A1A'
                  }} onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.background = '#E63329';
                    (e.currentTarget as HTMLDivElement).style.color = '#ffffff';
                  }} onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.background = 'rgba(0,0,0,0.05)';
                    (e.currentTarget as HTMLDivElement).style.color = '#1A1A1A';
                  }}>
                    <Instagram size={14} />
                  </div>
                </div>
              </div>
            </div>
          </div>)}
        </div>
      </div>
    </section>

    {/* ── CLOSING CTA ─── */}
    <section style={{
      background: '#0F0F0F',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      padding: `clamp(48px, 6vw, 80px) clamp(16px, 5vw, 96px)`
    }}>
      <div ref={closingCtaRef as React.RefObject<HTMLDivElement>} style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'flex',
        alignItems: isMobile ? 'flex-start' : 'center',
        justifyContent: 'space-between',
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? '32px' : '48px'
      }}>
        <div style={S(closingCtaInView, 0)}>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 64px)',
            fontWeight: 600,
            letterSpacing: '-0.04em',
            lineHeight: 1.0,
            margin: 0,
            color: '#ffffff'
          }}>
            <span style={{ display: 'block' }}>Ready to Protect</span>
            <span style={{ display: 'block', color: '#FC3637' }}>What Matters Most?</span>
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-4" style={S(closingCtaInView, 160)}>
          <a href="/contact" className="cta-primary group">
            <span>Partner With Us</span>
            <div className="cta-icon-container">
              <ArrowUpRight size={14} className="text-[#1E1E1E]" />
            </div>
          </a>
          <a href="#services" className="cta-secondary group">
            <span>Explore Services</span>
          </a>
        </div>
      </div>
    </section>

    <Footer />
  </div>;
};
