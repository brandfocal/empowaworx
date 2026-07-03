import React from 'react';
import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Menu, X, Youtube, Twitter, Facebook, Instagram, Linkedin, ShieldCheck, TrendingUp, MessageSquare, Target, Zap, Award, Brain, BarChart2, Megaphone, Star, Users, Globe, ChevronRight, Download } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { AfricaWatermark } from '../AfricaWatermark';
import { CoreCapabilities } from './CoreCapabilities';

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

// ─── Bidirectional InView hook ────────────────────────────
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
        if (!scrollingDown || isAboveViewport) setInView(false);
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

// ─── useScrollDirection ────────────────────────────────────
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

// ─── useWindowWidth ────────────────────────────────────────
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

// ─── useScrollProgress hook ────────────────────────────────
function useScrollProgress() {
  const [progress, setProgress] = React.useState(0);
  React.useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total = document.body.scrollHeight - window.innerHeight;
      if (total <= 0) {
        setProgress(1);
        return;
      }
      setProgress(Math.min(scrolled / total, 1));
    };
    window.addEventListener('scroll', onScroll, {
      passive: true
    });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return progress;
}

// ─── Bidirectional Count-Up Hook ──────────────────────────
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
        if (!scrollingDown || isAboveViewport) setIsVisible(false);
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
        const p = Math.min(elapsed / duration, 1);
        const eased = 1 - (1 - p) * (1 - p);
        setCount(Math.round(eased * target));
        if (p < 1) {
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

// ─── Brand tokens ─────────────────────────────────────────
const RED = '#FC3637';
const CHARCOAL = '#1E1E1E';

// ─── Data ─────────────────────────────────────────────────
const NAV_ITEMS = [{
  id: 'n1',
  label: 'Home',
  href: '#'
}, {
  id: 'n2',
  label: 'Who We Are',
  href: '#'
}, {
  id: 'n3',
  label: 'Strategic Advisory',
  href: '#'
}, {
  id: 'n4',
  label: 'Proprietary Platforms',
  href: '#'
}, {
  id: 'n5',
  label: 'Legacy Events',
  href: '#'
}, {
  id: 'n6',
  label: 'Media & Gallery',
  href: '#'
}, {
  id: 'n7',
  label: 'Upcoming Events',
  href: '#'
}, {
  id: 'n8',
  label: 'Careers',
  href: '#'
}];
const FOOTER_NAV_LINKS = [{
  id: 'f1',
  label: 'Home',
  href: '#'
}, {
  id: 'f2',
  label: 'Who We Are',
  href: '#'
}, {
  id: 'f3',
  label: 'Strategic Advisory',
  href: '#'
}, {
  id: 'f4',
  label: 'Proprietary Platforms',
  href: '#'
}, {
  id: 'f5',
  label: 'Legacy Events',
  href: '#'
}, {
  id: 'f6',
  label: 'Media & Gallery',
  href: '#'
}, {
  id: 'f7',
  label: 'Careers',
  href: '#'
}];
const FOOTER_ADVISORY_LINKS = [{
  id: 'fa1',
  label: 'Strategic Marketing',
  href: '#'
}, {
  id: 'fa2',
  label: 'Brand Strategy',
  href: '#'
}, {
  id: 'fa3',
  label: 'Creative Strategy',
  href: '#'
}, {
  id: 'fa4',
  label: 'Advertising',
  href: '#'
}, {
  id: 'fa5',
  label: 'Digital Marketing',
  href: '#'
}, {
  id: 'fa6',
  label: 'Marketing Intelligence',
  href: '#'
}];
const FOOTER_LEGAL_LINKS = [{
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
const SOCIAL_ITEMS = [{
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
const SERVICES_DATA = [{
  id: 'svc1',
  category: 'Strategic Marketing, Growth & Commercial Advisory',
  services: ['Strategic Marketing Advisory', 'Integrated Marketing Strategy', 'Growth Strategy Development', 'Go-to-Market Strategy', 'Demand Generation Strategy', 'Market Expansion Strategy', 'Customer Acquisition Strategy', 'Customer Retention & Loyalty Strategy', 'Product & Service Marketing Strategy', 'Customer Journey Strategy', 'Market Research & Consumer Insights', 'Marketing Transformation Programmes', 'Commercial Growth Strategy', 'Revenue Acceleration Programmes', 'Marketing Operating Model Design'],
  featured: true,
  description: 'Helping organisations identify growth opportunities, unlock new markets, strengthen customer acquisition and accelerate revenue performance through intelligence-led marketing and growth strategies.'
}, {
  id: 'svc2',
  category: 'Brand Strategy, Positioning & Market Leadership',
  services: ['Brand Strategy Development', 'Brand Purpose & Vision Development', 'Brand Architecture & Portfolio Strategy', 'Brand Positioning & Differentiation', 'Brand Identity Systems', 'Corporate Brand Development', 'Employer Branding Strategy', 'Executive & Personal Branding', 'Brand Repositioning Programmes', 'Customer Value Proposition Development', 'Brand Equity Development', 'Brand Governance Frameworks', 'Category Leadership Strategy', 'Market Positioning Strategy', 'Brand Growth Programmes'],
  featured: false,
  description: ''
}, {
  id: 'svc3',
  category: 'Creative Strategy, Storytelling & Campaign Innovation',
  services: ['Creative Strategy Development', 'Creative Direction', 'Integrated Campaign Strategy', 'Campaign Concept Development', 'Strategic Narrative Development', 'Brand Storytelling', 'Content Strategy Development', 'Consumer Engagement Campaigns', 'Behaviour Change Campaigns', 'Purpose-Led Campaigns', 'Public Awareness Campaigns', 'Creative Content Production', 'Campaign Innovation Programmes', 'Marketing Communications Campaigns', 'Multi-Channel Campaign Development'],
  featured: false,
  description: ''
}, {
  id: 'svc4',
  category: 'Digital Marketing, AI & Marketing Intelligence',
  services: ['Digital Marketing Strategy', 'AI-Powered Marketing Solutions', 'Marketing Automation Solutions', 'Customer Data Strategy', 'Marketing Analytics & Intelligence', 'Predictive Audience Intelligence', 'Conversion Rate Optimisation (CRO)', 'Lead Generation Systems', 'Marketing Technology Advisory', 'Campaign Attribution & Measurement', 'Performance Dashboards', 'Customer Analytics', 'Audience Intelligence', 'Marketing Intelligence Reporting', 'Marketing ROI Optimisation'],
  featured: false,
  description: ''
}, {
  id: 'svc5',
  category: 'Commercial Growth, Customer Experience & Loyalty',
  services: ['Commercial Growth Strategy', 'Customer Experience Strategy', 'Customer Experience Optimisation', 'Customer Retention Programmes', 'Loyalty & Advocacy Programmes', 'Customer Value Enhancement', 'Sales Enablement Programmes', 'Partner Marketing Programmes', 'Channel Marketing Strategy', 'Market Penetration Strategy', 'Commercialisation Strategy', 'Lead Nurturing Systems', 'Cross-Selling & Upselling Strategies', 'Revenue Optimisation Programmes', 'Growth Acceleration Initiatives'],
  featured: false,
  description: ''
}, {
  id: 'svc6',
  category: 'Marketing Intelligence, Analytics & Insights',
  services: ['Marketing Intelligence', 'Consumer Intelligence', 'Customer Insights', 'Market Research', 'Competitive Intelligence', 'Audience Sentiment Analysis', 'Brand Health Measurement', 'Campaign Effectiveness Measurement', 'Market Share Analysis', 'Customer Experience Measurement', 'Marketing Analytics', 'Performance Dashboards', 'Impact Measurement & Reporting', 'Strategic Recommendations', 'Continuous Improvement Programmes'],
  featured: false,
  description: ''
}];
const PREMIUM_OFFERINGS = [{
  id: 'po1',
  title: 'Strategic Marketing & Growth Advisory',
  summary: 'Strategic Marketing, Growth Strategy, Go-to-Market Planning, Demand Generation, Customer Acquisition, Market Expansion, Revenue Acceleration and Commercial Growth Programmes.'
}, {
  id: 'po2',
  title: 'Brand Strategy & Market Leadership',
  summary: 'Brand Strategy, Brand Architecture, Positioning, Differentiation, Brand Identity, Employer Branding, Brand Equity Development and Category Leadership.'
}, {
  id: 'po3',
  title: 'Creative Strategy & Campaign Innovation',
  summary: 'Creative Strategy, Campaign Development, Strategic Narratives, Brand Storytelling, Consumer Engagement Campaigns and Integrated Marketing Communications.'
}, {
  id: 'po4',
  title: 'Advertising, Media & Performance Marketing',
  summary: 'Advertising Strategy, Media Planning, Media Buying, Performance Marketing, Digital Advertising, Programmatic Media and Marketing ROI Optimisation.'
}, {
  id: 'po5',
  title: 'Digital Marketing, AI & Marketing Intelligence',
  summary: 'Digital Marketing, AI-Powered Marketing, Marketing Automation, Customer Data Strategy, Predictive Analytics, Lead Generation and Marketing Technology.'
}, {
  id: 'po6',
  title: 'Commercial Growth & Customer Experience',
  summary: 'Customer Experience Optimisation, Customer Retention, Loyalty Programmes, Sales Enablement, Channel Marketing, Revenue Optimisation and Growth Acceleration.'
}, {
  id: 'po7',
  title: 'Marketing Intelligence & Strategic Insights',
  summary: 'Marketing Intelligence, Consumer Insights, Competitive Intelligence, Brand Health Measurement, Campaign Analytics and Strategic Advisory.'
}, {
  id: 'po8',
  title: 'Market Influence & Category Leadership',
  summary: 'Market Positioning, Category Leadership, Competitive Differentiation, Brand Authority Building and Market Influence Programmes.'
}, {
  id: 'po9',
  title: 'Revenue Growth & Business Performance',
  summary: 'Revenue Growth Strategy, Demand Generation, Customer Acquisition, Customer Lifetime Value Optimisation and Business Performance Enhancement.'
}, {
  id: 'po10',
  title: 'Marketing Transformation & Future Growth',
  summary: 'Marketing Transformation, Digital Enablement, AI Adoption, Capability Development, Operating Model Design and Future Growth Readiness.'
}];
const SIGNATURE_SOLUTIONS = [{
  id: 'ss1',
  name: 'BrandCapital™',
  description: 'Building powerful brands that command trust, relevance, preference and sustainable market leadership.'
}, {
  id: 'ss2',
  name: 'MarketInfluence™',
  description: 'Positioning organisations, products and services to shape markets, influence decisions and drive competitive advantage.'
}, {
  id: 'ss3',
  name: 'GrowthEngine™',
  description: 'Transforming marketing investment into measurable growth, customer acquisition and revenue acceleration.'
}, {
  id: 'ss4',
  name: 'CreativeImpact™',
  description: 'Combining strategy, creativity and innovation to deliver campaigns that inspire engagement and action.'
}, {
  id: 'ss5',
  name: 'DemandCapital™',
  description: 'Building scalable demand-generation ecosystems that strengthen pipeline performance and accelerate conversion.'
}, {
  id: 'ss6',
  name: 'CustomerCapital™',
  description: 'Transforming customer relationships, loyalty and advocacy into strategic assets that create long-term value.'
}, {
  id: 'ss7',
  name: 'MarketingIntelligence™',
  description: 'Converting customer, market and performance data into actionable intelligence that informs strategic decision-making.'
}, {
  id: 'ss8',
  name: 'BrandLegacy™',
  description: 'Creating enduring brands, meaningful customer relationships and sustainable market impact that outlast trends and market cycles.'
}];
const OUTCOMES_DATA = [{
  id: 'o1',
  title: 'Iconic Brand Equity, Trust and Market Leadership',
  descriptor: 'Build enduring brand capital that sets you apart',
  IconComponent: ShieldCheck
}, {
  id: 'o2',
  title: 'Accelerated Revenue Growth and Commercial Performance',
  descriptor: 'Transform marketing investment into measurable business outcomes',
  IconComponent: TrendingUp
}, {
  id: 'o3',
  title: 'Enhanced Market Influence, Relevance and Competitive Advantage',
  descriptor: 'Shape markets and own your category',
  IconComponent: Target
}, {
  id: 'o4',
  title: 'Stronger Customer Engagement, Loyalty and Advocacy',
  descriptor: 'Turn customers into passionate brand advocates',
  IconComponent: MessageSquare
}, {
  id: 'o5',
  title: 'Greater Demand Generation and Pipeline Performance',
  descriptor: 'Build sustainable demand that drives consistent revenue',
  IconComponent: Zap
}, {
  id: 'o6',
  title: 'Increased Creative Impact, Campaign Effectiveness and ROI',
  descriptor: 'Deliver campaigns that inspire action and results',
  IconComponent: Megaphone
}, {
  id: 'o7',
  title: 'Deeper Customer Intelligence and Marketing Insights',
  descriptor: 'Know your customers better than your competitors',
  IconComponent: Brain
}, {
  id: 'o8',
  title: 'Sustainable Growth, Market Influence and Category Leadership',
  descriptor: 'Build long-term market leadership that endures',
  IconComponent: Award
}];
const STATS_DATA = [{
  id: 'st1',
  label: 'Premium Offerings',
  descriptor: 'Spanning integrated marketing and brand disciplines',
  value: 10,
  prefix: '',
  suffix: ''
}, {
  id: 'st2',
  label: 'Signature Solutions',
  descriptor: 'Purpose-built to accelerate growth and market leadership',
  value: 8,
  prefix: '',
  suffix: ''
}, {
  id: 'st3',
  label: 'Practice Disciplines',
  descriptor: 'From strategy to creative to performance',
  value: 6,
  prefix: '',
  suffix: ''
}, {
  id: 'st4',
  label: 'Campaigns Delivered',
  descriptor: 'From brand launches to performance campaigns',
  value: 50,
  prefix: '',
  suffix: '+'
}];
const TICKER_ITEMS = [{
  id: 't1',
  text: 'STRATEGIC MARKETING'
}, {
  id: 't2',
  text: 'BRAND STRATEGY'
}, {
  id: 't3',
  text: 'CREATIVE DIRECTION'
}, {
  id: 't4',
  text: 'ADVERTISING'
}, {
  id: 't5',
  text: 'CAMPAIGN INNOVATION'
}, {
  id: 't6',
  text: 'DIGITAL MARKETING'
}, {
  id: 't7',
  text: 'AI MARKETING'
}, {
  id: 't8',
  text: 'GROWTH STRATEGY'
}, {
  id: 't9',
  text: 'BRAND LEADERSHIP'
}, {
  id: 't10',
  text: 'MARKETING INTELLIGENCE'
}, {
  id: 't11',
  text: 'CUSTOMER EXPERIENCE'
}, {
  id: 't12',
  text: 'MARKET INFLUENCE'
}];
const HERO_TAGS = [{
  id: 'ht1',
  label: 'STRATEGIC MARKETING'
}, {
  id: 'ht2',
  label: 'BRAND LEADERSHIP'
}, {
  id: 'ht3',
  label: 'CREATIVE EXCELLENCE'
}];
const HERO_LINES = [['Strategic', 'Creative'], ['Marketing,', 'Brand'], ['&', 'Advertising™']];
const FACULTY_MEMBERS = [{
  id: 'fac1',
  name: '[To Be Announced]',
  title: 'Director: Strategic Marketing & Brand Strategy',
  description: 'Leads strategic marketing, brand leadership, growth strategy and commercial advisory programmes.',
  image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80'
}, {
  id: 'fac2',
  name: '[To Be Announced]',
  title: 'Director: Creative Strategy, Advertising & Campaign Innovation',
  description: 'Leads creative strategy, advertising, campaign development and storytelling programmes.',
  image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80'
}];
const PREMIUM_ICONS = [TrendingUp, Target, Megaphone, BarChart2, Star, Users, Globe, Zap, Award, Brain];
const EASE_SMOOTH = [0.21, 0.47, 0.32, 0.98] as [number, number, number, number];
const EASE_MEDIUM_OUT = [0.4, 0, 0.2, 1] as [number, number, number, number];
const GLOBAL_STYLES = `
  @media (prefers-reduced-motion: no-preference) {
    .nav-link-animated { position: relative; }
    .nav-link-animated::after {
      content: ''; position: absolute; bottom: -2px; left: 0;
      width: 0; height: 1.5px; transition: width 0.3s ease;
    }
    .nav-link-animated.nav-light::after { background: #ffffff; }
    .nav-link-animated.nav-dark::after  { background: #FC3637; }
    .nav-link-animated:hover::after { width: 100%; }

    @keyframes brand-pulse {
      0%   { transform: scale(1);    opacity: 1; }
      40%  { transform: scale(1.15); opacity: 0.7; }
      100% { transform: scale(1);    opacity: 1; }
    }
    .brand-pulse { animation: brand-pulse 2s ease-in-out infinite; }

    @keyframes ticker { from { transform: translateX(0) } to { transform: translateX(-50%) } }
    .ticker-track { display: flex; width: max-content; animation: ticker 50s linear infinite; }

    @keyframes hero-cta-pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.03); }
    }
    .hero-cta-idle { animation: hero-cta-pulse 2.5s ease-in-out infinite; }
    .hero-cta-idle:hover { animation: none; }

    .footer-nav-link { position: relative; text-decoration: none; }
    .footer-nav-link::after {
      content: ''; position: absolute; bottom: -2px; left: 0;
      width: 0; height: 1.5px; background: #FC3637; transition: width 0.3s ease;
    }
    .footer-nav-link:hover { color: #ffffff !important; }
    .footer-nav-link:hover::after { width: 100%; }

    .footer-social-btn { transition: background-color 0.25s ease, border-color 0.25s ease, color 0.25s ease; }
    .footer-social-btn:hover { background-color: #FC3637 !important; border-color: #FC3637 !important; color: #ffffff !important; }

    .img-reveal { overflow: hidden; }
    .img-reveal img { transition: transform 0.6s cubic-bezier(0.21, 0.47, 0.32, 0.98); }
    .img-reveal:hover img { transform: scale(1.05); }

    .offering-card { transition: border-color 0.25s ease, background-color 0.25s ease; }
    .offering-card:hover { border-color: #FC3637 !important; }

    .outcome-card {
      transition: transform 0.3s cubic-bezier(0.21,0.47,0.32,0.98), box-shadow 0.3s cubic-bezier(0.21,0.47,0.32,0.98), border-color 0.3s ease;
    }
    .outcome-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 0 0 1px rgba(252,54,55,0.4), 0 8px 32px rgba(252,54,55,0.12);
      border-color: rgba(252,54,55,0.4) !important;
    }

    .faculty-card-item { transition: border-color 0.25s ease; }
    .faculty-card-item:hover { border-color: rgba(252,54,55,0.2) !important; }

    button.group\/toggle:hover .toggle-underline { transform: scaleX(1); }

    @keyframes cta2-chevron-pulse {
      0%, 100% { transform: translateX(0); }
      50% { transform: translateX(6px); }
    }
    .cta2-chevron-pulse { animation: cta2-chevron-pulse 1.5s ease-in-out infinite; }

    .cta4-contact-link { position: relative; text-decoration: none; }
    .cta4-contact-link::after {
      content: ''; position: absolute; bottom: -2px; left: 0;
      width: 100%; height: 1px; background: rgba(255,255,255,0.4);
      transform: scaleX(0); transform-origin: left center;
      transition: transform 0.3s ease;
    }
    .cta4-contact-link:hover::after { transform: scaleX(1); }
    .cta4-contact-link:hover { color: #ffffff !important; }
  }

  @media (prefers-reduced-motion: reduce) {
    .ticker-track { animation: none; }
    .brand-pulse  { animation: none; }
    .hero-cta-idle { animation: none; }
    .nav-link-animated::after { display: none; }
    .outcome-card:hover { transform: none; }
    .cta2-chevron-pulse { animation: none; }
  }

  .stats-diagonal-texture {
    background-color: #1E1E1E;
    background-image: repeating-linear-gradient(
      -45deg,
      transparent,
      transparent 8px,
      rgba(255,255,255,0.015) 8px,
      rgba(255,255,255,0.015) 9px
    );
  }

  .noise-overlay {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
    background-repeat: repeat;
    background-size: 200px 200px;
  }

  /* Asymmetric intro section */
  .intro-split-section { background: #0a0a0a; }

  /* Faculty image wrap */
  .faculty-img-wrap { min-height: 220px; height: 100%; }
  @media (max-width: 767px) {
    .faculty-img-wrap { min-height: 260px; max-height: 320px; height: 260px; }
  }

  html, body { max-width: 100%; overflow-x: hidden; }
`;



// ─── HeroHeadline ─────────────────────────────────────────
const HeroHeadline = ({
  reducedMotion,
  inView
}: {
  reducedMotion: boolean;
  inView: boolean;
  isMobile: boolean;
}) => {
  const headlineClass = 'font-semibold text-white leading-[0.95] tracking-[-0.05em]';
  const headlineStyle: React.CSSProperties = {
    fontSize: 'clamp(2.2rem, 8vw, 6rem)'
  };
  const lines = HERO_LINES;
  const coloredLineIdx = 2;
  if (reducedMotion) {
    return <div className="flex flex-col">
      {lines.map((line, li) => <h1 key={`rm-l${li}`} className={headlineClass} style={headlineStyle}>
        {line.map((word, wi) => <span key={`rm-l${li}-w${wi}`} style={{
          color: li === coloredLineIdx ? RED : undefined
        }}>
          {word}{wi < line.length - 1 ? ' ' : ''}
        </span>)}
      </h1>)}
    </div>;
  }
  let globalIdx = 0;
  return <div className="flex flex-col">
    {lines.map((line, li) => <h1 key={`l${li}`} className={cn(headlineClass, 'flex flex-wrap gap-[0.18em]')} style={headlineStyle}>
      {line.map(word => {
        const idx = globalIdx++;
        return <span key={`l${li}-w${idx}`} style={{
          display: 'inline-block',
          color: li === coloredLineIdx ? RED : undefined,
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.95)',
          transition: `opacity 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${idx * 60}ms, transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${idx * 60}ms`
        }}>
          {word}
        </span>;
      })}
    </h1>)}
  </div>;
};

// ─── TickerStrip ─────────────────────────────────────────
const TickerStrip = () => {
  const itemsA = TICKER_ITEMS.map(item => ({
    ...item,
    uid: `a-${item.id}`
  }));
  const itemsB = TICKER_ITEMS.map(item => ({
    ...item,
    uid: `b-${item.id}`
  }));
  const allItems = [...itemsA, ...itemsB];
  return <div className="w-full bg-[#111111] overflow-hidden py-4 border-t border-white/5">
    <div className="ticker-track">
      {allItems.map(item => <div key={item.uid} className="flex items-center shrink-0 px-5 sm:px-8">
        <span style={{
          fontSize: 'clamp(10px, 1.5vw, 13px)',
          fontWeight: 700,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.9)',
          whiteSpace: 'nowrap'
        }}>
          {item.text}
        </span>
        <span className="ml-5 sm:ml-8 text-[#FC3637] text-[10px]">◆</span>
      </div>)}
    </div>
  </div>;
};

// ─── StatItem ─────────────────────────────────────────────
const StatItem = ({
  label,
  descriptor,
  value,
  prefix,
  suffix
}: {
  label: string;
  descriptor: string;
  value: number;
  prefix: string;
  suffix: string;
  isMobile: boolean;
}) => {
  const {
    ref,
    count,
    done,
    isVisible
  } = useBidirectionalCountUp(value, 2000);
  return <div ref={ref} style={{
    position: 'relative',
    padding: 'clamp(1.5rem, 4vw, 3rem) clamp(1rem, 3vw, 2.5rem)',
    transition: 'opacity 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
    overflow: 'hidden'
  }}>
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      height: '3px',
      background: RED,
      width: isVisible ? '100%' : '0%',
      transition: 'width 0.55s cubic-bezier(0.34, 1.56, 0.64, 1)'
    }} />
    <div className="text-[10px] sm:text-[11px] font-black text-[#FC3637] uppercase tracking-[0.25em] sm:tracking-[0.3em] mb-2 sm:mb-3">{label}</div>
    <div style={{
      fontSize: 'clamp(2.5rem, 8vw, 5rem)',
      fontWeight: 600,
      color: '#ffffff',
      letterSpacing: '-0.04em',
      lineHeight: 1
    }}>
      <span>{prefix}</span>
      <span>{count.toLocaleString()}</span>
      <span>{done ? suffix : ''}</span>
    </div>
    <p style={{
      marginTop: '0.5rem',
      fontSize: '12px',
      color: 'rgba(255,255,255,0.5)',
      fontStyle: 'italic',
      lineHeight: 1.5
    }}>
      {descriptor}
    </p>
  </div>;
};

// ─── ServiceCard ─────────────────────────────────────────
const ServiceCard = ({
  item,
  delay,
  isMobile,
  isTablet
}: {
  item: typeof SERVICES_DATA[number];
  delay: number;
  isMobile: boolean;
  isTablet: boolean;
}) => {
  const {
    ref,
    inView
  } = useBidirectionalInView<HTMLDivElement>(0.1);
  const [isExpanded, setIsExpanded] = React.useState(false);
  const VISIBLE_COUNT = 3;
  const visibleServices = item.services.slice(0, VISIBLE_COUNT);
  const hiddenServices = item.services.slice(VISIBLE_COUNT);
  const hasHidden = hiddenServices.length > 0;
  const gridColSpan = item.featured && !isMobile ? isTablet ? 'span 2' : 'span 2' : undefined;
  const cardBackground = item.featured ? '#222222' : 'linear-gradient(to bottom, #1E1E1E 0%, #111111 100%)';
  return <div ref={ref} style={{
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(30px)',
    transition: `opacity 0.8s cubic-bezier(0.21,0.47,0.32,0.98) ${delay}ms, transform 0.8s cubic-bezier(0.21,0.47,0.32,0.98) ${delay}ms`,
    background: cardBackground,
    border: 'none',
    borderLeft: `4px solid ${RED}`,
    boxShadow: 'none',
    padding: 'clamp(20px, 3vw, 36px)',
    display: 'flex',
    flexDirection: 'column' as const,
    gridColumn: gridColSpan
  }}>
    <h3 style={{
      fontWeight: 700,
      textTransform: 'uppercase' as const,
      fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
      letterSpacing: item.featured ? '-0.01em' : '0.02em',
      color: '#ffffff',
      marginBottom: '1.25rem',
      lineHeight: 1.3
    }}>
      {item.category}
    </h3>
    <ul style={{
      listStyle: 'none',
      padding: 0,
      margin: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: '0.65rem'
    }}>
      {visibleServices.map((service, i) => <li key={`v-svc-${item.id}-${i}`} style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.5rem',
        color: 'rgba(255,255,255,0.82)',
        fontSize: isMobile ? '13px' : '14px',
        lineHeight: 1.6
      }}>
        <span style={{
          marginTop: '7px',
          width: '4px',
          height: '4px',
          borderRadius: '50%',
          background: RED,
          flexShrink: 0,
          display: 'inline-block'
        }} />
        <span>{service}</span>
      </li>)}
    </ul>
    {hasHidden && <div style={{
      maxHeight: isExpanded ? '800px' : '0',
      overflow: 'hidden',
      transition: 'max-height 0.4s ease-in-out'
    }}>
      <ul style={{
        listStyle: 'none',
        padding: 0,
        margin: '0.65rem 0 0 0',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.65rem'
      }}>
        {hiddenServices.map((service, i) => <li key={`h-svc-${item.id}-${i}`} style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '0.5rem',
          color: 'rgba(255,255,255,0.82)',
          fontSize: isMobile ? '13px' : '14px',
          lineHeight: 1.6
        }}>
          <span style={{
            marginTop: '7px',
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            background: RED,
            flexShrink: 0,
            display: 'inline-block'
          }} />
          <span>{service}</span>
        </li>)}
      </ul>
    </div>}
    {hasHidden && <button onClick={() => setIsExpanded(prev => !prev)} style={{
      marginTop: '1rem',
      background: 'none',
      border: 'none',
      padding: '0.5rem 0',
      minHeight: '44px',
      cursor: 'pointer',
      fontSize: '11px',
      fontWeight: 700,
      letterSpacing: '0.18em',
      textTransform: 'uppercase' as const,
      color: '#ffffff',
      alignSelf: 'flex-start'
    }} className="group/toggle">
      <span style={{
        color: RED
      }}>{isExpanded ? '↑' : '→'}</span>
      <span style={{
        marginLeft: '0.4em',
        position: 'relative' as const,
        display: 'inline-block'
      }}>
        <span>{isExpanded ? 'Show less' : 'View all capabilities'}</span>
        <span style={{
          position: 'absolute' as const,
          bottom: '-2px',
          left: 0,
          height: '1.5px',
          width: '100%',
          background: RED,
          transform: 'scaleX(0)',
          transformOrigin: 'left center',
          transition: 'transform 250ms ease'
        }} className="toggle-underline" />
      </span>
    </button>}
    {item.featured && item.description && <p style={{
      marginTop: '1.5rem',
      paddingTop: '1.25rem',
      borderTop: '1px solid rgba(255,255,255,0.08)',
      fontSize: isMobile ? '14px' : '15px',
      color: 'rgba(255,255,255,0.45)',
      lineHeight: 1.7,
      fontStyle: 'italic'
    }}>
      {item.description}
    </p>}
  </div>;
};

// ─── MidPageCtaBar ───────────────────────────────────────
const MidPageCtaBar = ({
  message,
  cta,
  isMobile
}: {
  message: string;
  cta: string;
  isMobile: boolean;
}) => <div style={{
  background: '#1A1A1A',
  padding: isMobile ? 'clamp(1rem,4vw,1.25rem) clamp(16px,5vw,40px)' : 'clamp(1.25rem,3vw,1.75rem) clamp(40px,8vw,80px)',
  display: 'flex',
  flexDirection: isMobile ? 'column' : 'row',
  alignItems: isMobile ? 'stretch' : 'center',
  justifyContent: 'space-between',
  gap: isMobile ? '1rem' : '2rem',
  borderTop: `1px solid rgba(252,54,55,0.2)`,
  borderBottom: `1px solid rgba(252,54,55,0.2)`
}}>
    <p style={{
      fontSize: isMobile ? '0.9rem' : '1.0625rem',
      fontWeight: 600,
      color: '#ffffff',
      lineHeight: 1.4,
      margin: 0
    }}>
      {message}
    </p>
    <a href="/contact" className="cta-primary group">
      <span>{cta}</span>
      <div className="cta-icon-container">
        <ArrowUpRight size={14} className="text-[#1E1E1E]" />
      </div>
    </a>
  </div>;

// ─── Scroll Progress Bar ─────────────────────────────────
const ScrollProgressBar = () => {
  const progress = useScrollProgress();
  const springProgress = useSpring(progress, {
    stiffness: 200,
    damping: 30
  });
  const width = useTransform(springProgress, (v: number) => `${v * 100}%`);
  return <motion.div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    height: '3px',
    background: RED,
    width,
    zIndex: 99999,
    transformOrigin: 'left',
    pointerEvents: 'none'
  }} />;
};

// ─── CTA 1: Full-width red after Core Capabilities ───────
const CtaAfterCapabilities = ({
  inView,
  isMobile,
  hPad
}: {
  inView: boolean;
  isMobile: boolean;
  hPad: string;
}) => {
  const S = (delay: number = 0): React.CSSProperties => ({
    opacity: inView ? 1 : 0,
    transform: inView ? 'none' : 'translateY(28px)',
    transition: `opacity 0.8s cubic-bezier(0.21,0.47,0.32,0.98) ${delay}ms, transform 0.8s cubic-bezier(0.21,0.47,0.32,0.98) ${delay}ms`
  });
  const [hovered, setHovered] = React.useState(false);
  return <section style={{
    background: 'linear-gradient(135deg, #C41E1F 0%, #A01010 100%)',
    paddingLeft: hPad,
    paddingRight: hPad,
    paddingTop: 'clamp(48px, 8vw, 108px)',
    paddingBottom: 'clamp(48px, 8vw, 108px)',
    position: 'relative',
    overflow: 'hidden'
  }}>
    <div aria-hidden="true" style={{
      position: 'absolute',
      inset: 0,
      backgroundImage: 'repeating-linear-gradient(45deg, rgba(0,0,0,0.06) 1px, transparent 1px, transparent 8px)',
      pointerEvents: 'none'
    }} />
    {/* Large typographic watermark — hidden on mobile */}
    {!isMobile && <div aria-hidden="true" style={{
      position: 'absolute',
      right: '-2%',
      top: '50%',
      transform: 'translateY(-50%)',
      fontSize: '28vw',
      fontWeight: 900,
      color: '#ffffff',
      opacity: 0.04,
      letterSpacing: '-0.06em',
      lineHeight: 1,
      fontFamily: 'Inter, sans-serif',
      userSelect: 'none',
      pointerEvents: 'none',
      overflow: 'hidden',
      whiteSpace: 'nowrap'
    }}>
      BRAND
    </div>}
    <div className="max-w-[1100px]" style={{
      position: 'relative',
      zIndex: 1,
      ...S(0)
    }}>
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        border: '1px solid rgba(255,255,255,0.35)',
        padding: '7px 16px',
        marginBottom: '1.25rem',
        background: 'rgba(255,255,255,0.08)'
      }}>
        <span style={{
          fontSize: '10px',
          fontWeight: 700,
          letterSpacing: '0.28em',
          textTransform: 'uppercase' as const,
          color: '#ffffff'
        }}>TAKE THE NEXT STEP</span>
      </div>
      <div style={{
        width: '60px',
        height: '1px',
        background: 'rgba(255,255,255,0.15)',
        marginBottom: '1.5rem'
      }} />
      <h2 style={{
        fontSize: 'clamp(1.8rem, 6vw, 4rem)',
        fontWeight: 900,
        color: '#ffffff',
        textTransform: 'uppercase' as const,
        letterSpacing: '-0.035em',
        lineHeight: 1,
        marginBottom: '1.5rem',
        fontFamily: 'Inter, sans-serif'
      }}>
        Ready to build an iconic brand?
      </h2>
      <p style={{
        ...S(120),
        fontSize: 'clamp(14px, 1.5vw, 17px)',
        color: 'rgba(255,255,255,0.85)',
        lineHeight: 1.7,
        maxWidth: '640px',
        marginBottom: '2.5rem'
      }}>
        Our strategic marketing and brand experts are ready to help you unlock growth, market influence and competitive advantage.
      </p>
      <div style={S(220)}>
        <a href="/contact" className="cta-primary group" style={{ background: '#ffffff', color: '#FC3637' }}>
          <span>Start a Conversation</span>
          <div className="cta-icon-container" style={{ background: '#FC3637' }}>
            <ArrowUpRight size={14} className="text-white" />
          </div>
        </a>
      </div>
    </div>
  </section>;
};

// ─── CTA 2: Inline strip between Premium Offerings & Signature Solutions ──
const CtaStripPremiumToSignature = ({
  inView,
  isMobile,
  hPad
}: {
  inView: boolean;
  isMobile: boolean;
  hPad: string;
}) => {
  const [hovered, setHovered] = React.useState(false);
  return <div style={{
    opacity: inView ? 1 : 0,
    transition: 'opacity 0.8s cubic-bezier(0.21,0.47,0.32,0.98)',
    background: 'linear-gradient(135deg, #1E1E1E 0%, #111111 100%)',
    borderTop: '1px solid rgba(252,54,55,0.2)',
    borderBottom: '1px solid rgba(252,54,55,0.2)',
    position: 'relative',
    display: 'flex',
    flexDirection: isMobile ? 'column' as const : 'row' as const,
    alignItems: isMobile ? 'stretch' : 'center',
    justifyContent: 'space-between',
    gap: 0
  }}>
    <div aria-hidden="true" style={{
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      width: '4px',
      background: RED,
      flexShrink: 0
    }} />
    <div style={{
      paddingTop: 'clamp(24px, 5vw, 48px)',
      paddingBottom: isMobile ? '1rem' : 'clamp(24px, 5vw, 48px)',
      paddingLeft: `calc(${isMobile ? hPad : 'clamp(2rem,6vw,3rem)'} + 12px)`,
      paddingRight: isMobile ? hPad : '1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      flex: 1
    }}>
      <div className="cta2-chevron-pulse" style={{
        color: RED,
        display: 'flex',
        alignItems: 'center',
        flexShrink: 0
      }}>
        <ChevronRight size={20} />
      </div>
      <p style={{
        fontSize: 'clamp(1rem, 2.2vw, 1.5rem)',
        fontWeight: 800,
        color: '#ffffff',
        lineHeight: 1.4,
        margin: 0,
        letterSpacing: '-0.02em'
      }}>
        <span>Explore the full suite of </span>
        <span style={{
          color: RED
        }}>EmpowaWorx solutions</span>
        <span> built for market leaders.</span>
      </p>
    </div>
    <div style={{
      paddingTop: isMobile ? 0 : 'clamp(24px, 5vw, 48px)',
      paddingBottom: 'clamp(24px, 5vw, 48px)',
      paddingLeft: isMobile ? hPad : '1rem',
      paddingRight: isMobile ? hPad : 'clamp(2rem,6vw,3rem)'
    }}>
      <a href="#services" className="cta-primary group">
        <span>View All Solutions</span>
        <div className="cta-icon-container">
          <ArrowUpRight size={14} className="text-[#1E1E1E]" />
        </div>
      </a>
    </div>
  </div>;
};

// ─── CTA 3: After Signature Solutions, before Outcomes ───
const CtaMarketAdvantage = ({
  inView,
  isMobile,
  hPad
}: {
  inView: boolean;
  isMobile: boolean;
  hPad: string;
}) => {
  const CTA3_WORDS = ['Let', 'us', 'build', 'your', 'market', 'advantage'];
  const [btn1Hovered, setBtn1Hovered] = React.useState(false);
  const [btn2Hovered, setBtn2Hovered] = React.useState(false);
  return <section style={{
    background: '#111111',
    backgroundImage: 'radial-gradient(ellipse at 50% 60%, rgba(252,54,55,0.2) 0%, rgba(252,54,55,0.06) 35%, transparent 65%), radial-gradient(ellipse at 50% 40%, rgba(252,54,55,0.12) 0%, transparent 45%)',
    paddingLeft: hPad,
    paddingRight: hPad,
    paddingTop: 'clamp(48px, 10vw, 128px)',
    paddingBottom: 'clamp(48px, 10vw, 128px)',
    textAlign: 'center',
    position: 'relative'
  }}>
    <div aria-hidden="true" className="noise-overlay" style={{
      position: 'absolute',
      inset: 0,
      opacity: 0.025,
      pointerEvents: 'none'
    }} />
    <div className="max-w-[900px] mx-auto" style={{
      position: 'relative',
      zIndex: 1
    }}>
      <div style={{
        width: '64px',
        height: '1px',
        background: 'rgba(252,54,55,0.4)',
        margin: '0 auto 1.75rem'
      }} />
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        background: 'rgba(252,54,55,0.12)',
        border: '1px solid rgba(252,54,55,0.4)',
        padding: '7px 18px',
        marginBottom: '1.75rem',
        filter: 'drop-shadow(0 0 8px rgba(252,54,55,0.5))'
      }}>
        <span style={{
          opacity: inView ? 1 : 0,
          transition: 'opacity 0.7s cubic-bezier(0.21,0.47,0.32,0.98)',
          fontSize: '10px',
          fontWeight: 700,
          letterSpacing: '0.28em',
          textTransform: 'uppercase' as const,
          color: RED
        }}>
          YOUR MARKET ADVANTAGE AWAITS
        </span>
      </div>
      <h2 style={{
        fontSize: 'clamp(1.8rem, 6vw, 4.5rem)',
        fontWeight: 900,
        textTransform: 'uppercase' as const,
        letterSpacing: '-0.04em',
        lineHeight: 0.95,
        color: '#ffffff',
        marginBottom: '1.75rem',
        display: 'flex',
        flexWrap: 'wrap' as const,
        justifyContent: 'center',
        gap: '0 0.28em',
        fontFamily: 'Inter, sans-serif'
      }}>
        {CTA3_WORDS.map((word, wi) => <motion.span key={`cta3-w-${wi}`} initial={{
          opacity: 0,
          y: 50
        }} animate={inView ? {
          opacity: 1,
          y: 0
        } : {
          opacity: 0,
          y: 50
        }} transition={{
          duration: 0.6,
          delay: wi * 0.1,
          ease: [0.22, 1, 0.36, 1]
        }} style={{
          display: 'inline-block'
        }}>
          {word}
        </motion.span>)}
      </h2>
      <p style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : 'translateY(20px)',
        transition: 'opacity 0.7s cubic-bezier(0.21,0.47,0.32,0.98) 600ms, transform 0.7s cubic-bezier(0.21,0.47,0.32,0.98) 600ms',
        fontSize: 'clamp(14px, 1.5vw, 17px)',
        color: 'rgba(255,255,255,0.7)',
        lineHeight: 1.7,
        maxWidth: '540px',
        margin: '0 auto 2.5rem'
      }}>
        Partner with EmpowaWorx to transform your brand, accelerate growth and lead your market.
      </p>
      <div style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : 'translateY(20px)',
        transition: 'opacity 0.7s cubic-bezier(0.21,0.47,0.32,0.98) 720ms, transform 0.7s cubic-bezier(0.21,0.47,0.32,0.98) 720ms',
        display: 'flex',
        flexDirection: isMobile ? 'column' as const : 'row' as const,
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        flexWrap: 'wrap' as const
      }}>
        <a href="/contact" className="cta-primary group">
          <span>Start a Conversation</span>
          <div className="cta-icon-container">
            <ArrowUpRight size={14} className="text-[#1E1E1E]" />
          </div>
        </a>
        <a href="/contact" className="cta-secondary group">
          <Download size={14} className="mr-2 text-white" />
          <span>Download Capabilities Deck</span>
        </a>
      </div>
    </div>
  </section>;
};

// ─── CTA 4: Pre-footer high-impact section ──
const CtaPreFooter = ({
  inView,
  isMobile,
  hPad
}: {
  inView: boolean;
  isMobile: boolean;
  hPad: string;
}) => {
  const CTA4_WORDS = ['Build.', 'Lead.', 'Dominate.'];
  const [btnHovered, setBtnHovered] = React.useState(false);
  return <section className="noise-overlay" style={{
    background: '#0D0D0D',
    paddingLeft: hPad,
    paddingRight: hPad,
    paddingTop: 'clamp(48px, 10vw, 160px)',
    paddingBottom: 'clamp(48px, 10vw, 160px)',
    textAlign: 'center',
    position: 'relative',
    borderTop: '2px solid rgba(252,54,55,0.3)'
  }}>
    <div className="max-w-[1100px] mx-auto">
      <h2 style={{
        fontWeight: 900,
        textTransform: 'uppercase' as const,
        letterSpacing: '-0.05em',
        lineHeight: 0.88,
        marginBottom: '0',
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '0',
        fontFamily: 'Inter, sans-serif'
      }}>
        {CTA4_WORDS.map((word, wi) => {
          const isDominate = wi === 2;
          return <motion.span key={`cta4-word-${wi}`} initial={{
            opacity: 0,
            y: 80
          }} animate={inView ? {
            opacity: 1,
            y: 0
          } : {
            opacity: 0,
            y: 80
          }} transition={{
            type: 'spring',
            stiffness: 80,
            damping: 15,
            delay: wi * 0.15
          }} style={{
            display: 'block',
            fontSize: 'clamp(3rem, 12vw, 11rem)',
            ...(isDominate ? {
              backgroundImage: 'linear-gradient(90deg, #FC3637, #C41E1F)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              WebkitTextFillColor: 'transparent'
            } : {
              color: '#ffffff'
            })
          }}>
            {word}
          </motion.span>;
        })}
      </h2>

      <motion.div initial={{
        width: 0
      }} animate={inView ? {
        width: '80px'
      } : {
        width: 0
      }} transition={{
        duration: 0.8,
        delay: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }} style={{
        height: '1px',
        background: RED,
        margin: '2.5rem auto'
      }} />

      <p style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : 'translateY(20px)',
        transition: 'opacity 0.7s cubic-bezier(0.21,0.47,0.32,0.98) 600ms, transform 0.7s cubic-bezier(0.21,0.47,0.32,0.98) 600ms',
        fontSize: 'clamp(13px, 1.3vw, 16px)',
        color: 'rgba(255,255,255,0.5)',
        lineHeight: 1.7,
        maxWidth: '600px',
        margin: '0 auto 2.5rem'
      }}>
        EmpowaWorx Strategic Creative Marketing, Brand and Advertising Advisory.
      </p>

      <div style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : 'translateY(20px)',
        transition: 'opacity 0.7s cubic-bezier(0.21,0.47,0.32,0.98) 700ms, transform 0.7s cubic-bezier(0.21,0.47,0.32,0.98) 700ms'
      }}>
        <a href="/contact" className="cta-primary group">
          <span>Begin Your Growth Journey</span>
          <div className="cta-icon-container">
            <ArrowUpRight size={14} className="text-[#1E1E1E]" />
          </div>
        </a>
      </div>

      <div style={{
        opacity: inView ? 1 : 0,
        transition: 'opacity 0.7s cubic-bezier(0.21,0.47,0.32,0.98) 850ms',
        marginTop: '2.5rem',
        display: 'flex',
        flexDirection: isMobile ? 'column' as const : 'row' as const,
        justifyContent: 'center',
        alignItems: 'center',
        gap: isMobile ? '0.6rem' : '1.5rem',
        flexWrap: 'wrap' as const
      }}>
        <a href="mailto:info@empowaworx.co.za" className="cta4-contact-link" style={{
          fontSize: '14px',
          color: 'rgba(255,255,255,0.4)',
          textDecoration: 'none',
          letterSpacing: '0.02em',
          minHeight: '44px',
          display: 'flex',
          alignItems: 'center'
        }}>
          info@empowaworx.co.za
        </a>
        {!isMobile && <span style={{
          color: RED,
          fontSize: '10px'
        }}>◆</span>}
        <a href="tel:+27114827210" className="cta4-contact-link" style={{
          fontSize: '14px',
          color: 'rgba(255,255,255,0.4)',
          textDecoration: 'none',
          letterSpacing: '0.02em',
          minHeight: '44px',
          display: 'flex',
          alignItems: 'center'
        }}>
          +27 (0) 11 482 7210
        </a>
      </div>
    </div>
  </section>;
};

// ─── Main Page ────────────────────────────────────────────
export const MarketingBrandAdvertisingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [heroInView, setHeroInView] = React.useState(true);
  const scrollY = useScrollDirection();
  const windowWidth = useWindowWidth();
  const isScrolled = scrollY > 80;
  const reducedMotion = usePrefersReducedMotion();
  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;
  const {
    ref: heroSubRef,
    inView: heroSubInView
  } = useBidirectionalInView<HTMLDivElement>(0.3);
  const {
    ref: mandateRef,
    inView: mandateInView
  } = useBidirectionalInView<HTMLDivElement>(0.2);
  const {
    ref: introSplitRef,
    inView: introSplitInView
  } = useBidirectionalInView<HTMLDivElement>(0.15);
  const {
    ref: footerColsRef,
    inView: footerColsInView
  } = useBidirectionalInView<HTMLDivElement>(0.1);
  const {
    ref: servicesSectionRef,
    inView: servicesSectionInView
  } = useBidirectionalInView<HTMLDivElement>(0.05);
  const {
    ref: outcomesHeaderRef,
    inView: outcomesHeaderInView
  } = useBidirectionalInView<HTMLDivElement>(0.2);
  const {
    ref: outcomesGridRef,
    inView: outcomesGridInView
  } = useBidirectionalInView<HTMLDivElement>(0.05);
  const {
    ref: premiumRef,
    inView: premiumInView
  } = useBidirectionalInView<HTMLDivElement>(0.1);
  const {
    ref: signatureRef,
    inView: signatureInView
  } = useBidirectionalInView<HTMLDivElement>(0.05);
  const {
    ref: facultyRef,
    inView: facultyInView
  } = useBidirectionalInView<HTMLDivElement>(0.1);
  const {
    ref: cta1Ref,
    inView: cta1InView
  } = useBidirectionalInView<HTMLDivElement>(0.15);
  const {
    ref: cta2Ref,
    inView: cta2InView
  } = useBidirectionalInView<HTMLDivElement>(0.2);
  const {
    ref: cta3Ref,
    inView: cta3InView
  } = useBidirectionalInView<HTMLDivElement>(0.15);
  const {
    ref: cta4Ref,
    inView: cta4InView
  } = useBidirectionalInView<HTMLDivElement>(0.1);
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

  // Fluid horizontal padding
  const hPad = isMobile ? 'clamp(16px, 5vw, 24px)' : isTablet ? 'clamp(24px, 5vw, 40px)' : 'clamp(40px, 6vw, 80px)';
  const hPadWide = isMobile ? 'clamp(16px, 5vw, 24px)' : isTablet ? 'clamp(24px, 5vw, 40px)' : 'clamp(48px, 7vw, 96px)';
  // Fluid vertical padding
  const vPadMd = 'clamp(40px, 8vw, 96px)';
  const vPadLg = 'clamp(40px, 8vw, 128px)';
  return <div className="w-full bg-[#0D0D0D] font-sans selection:bg-[#FC3637] selection:text-white" style={{
    overflowX: 'hidden',
    maxWidth: '100vw'
  }}>
    <style>{GLOBAL_STYLES}</style>

    <ScrollProgressBar />

    {/* Grain texture overlay */}
    <div aria-hidden="true" className="noise-overlay" style={{
      position: 'fixed',
      inset: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 9999,
      opacity: 0.04
    }} />

    <Header />

    {/* ── Hero ── */}
    <section style={{
      position: 'relative',
      width: '100%',
      minHeight: '100vh',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'flex-end',
      background: '#080808',
      zIndex: 1
    }}>
      <div aria-hidden="true" style={{
        position: 'absolute',
        inset: '-20%',
        overflow: 'hidden',
        pointerEvents: 'none'
      }}>
        <img src="/empowaentrepreneurs.JPG" alt="" style={{
          width: '100%',
          height: '110%',
          objectFit: 'cover',
          objectPosition: 'center 50%',
          display: 'block',
          filter: 'grayscale(1) brightness(0.4)',
          transform: `translateY(${heroParallaxY}px)`,
          willChange: 'transform'
        }} />
      </div>
      <div aria-hidden="true" style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.95) 100%)',
        pointerEvents: 'none'
      }} />
      <div aria-hidden="true" style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)',
        pointerEvents: 'none'
      }} />
      <div aria-hidden="true" style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 100% 100%, rgba(252,54,55,0.15) 0%, transparent 50%)',
        pointerEvents: 'none'
      }} />

      <div className="relative w-full" style={{
        zIndex: 10,
        paddingLeft: hPadWide,
        paddingRight: hPadWide,
        paddingBottom: 'clamp(40px, 8vw, 80px)',
        marginTop: 'auto'
      }}>
        <div ref={heroSubRef} style={S(heroSubInView, 80)} className="mb-4">
          <p style={{
            color: RED,
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            marginBottom: '10px'
          }}>
            Strategic Advisory Capability — Flagship Practice
          </p>
          <div style={{
            width: '40px',
            height: '2px',
            background: RED
          }} />
        </div>

        <div className="mb-6 sm:mb-8">
          <HeroHeadline reducedMotion={reducedMotion} inView={heroInView} isMobile={isMobile} />
        </div>

        {/* Hero CTA — fit-content */}
        <div style={{
          ...S(heroSubInView, 160),
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          width: 'fit-content'
        }}>
          <a href="#services" className="cta-primary group">
            <span>Explore Our Solutions</span>
            <div className="cta-icon-container">
              <ArrowUpRight size={14} className="text-[#1E1E1E]" />
            </div>
          </a>
        </div>

        {/* Hero tag pills — wrap on mobile */}
        <div style={{
          ...S(heroSubInView, 240),
          marginTop: isMobile ? '1.5rem' : '3rem',
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: '8px'
        }}>
          {HERO_TAGS.map(tag => <span key={tag.id} style={{
            display: 'inline-flex',
            alignItems: 'center',
            border: '1px solid rgba(255,255,255,0.3)',
            padding: '8px 16px',
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.22em',
            color: 'rgba(255,255,255,0.85)',
            minHeight: '44px',
            whiteSpace: 'nowrap'
          }}>
            {tag.label}
          </span>)}
        </div>
      </div>


    </section>

    <TickerStrip />

    {/* ── Stats Section — 2 cols on mobile, 4 on desktop ── */}
    <section className="stats-diagonal-texture relative border-b border-white/5" style={{
      paddingLeft: 0,
      paddingRight: 0
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
        gap: 0
      }}>
        {STATS_DATA.map(stat => <StatItem key={stat.id} {...stat} isMobile={isMobile} />)}
      </div>
    </section>

    {/* ── Asymmetric 2-column intro split section ── */}
    <section ref={introSplitRef} className="intro-split-section" style={{
      paddingLeft: hPad,
      paddingRight: hPad,
      paddingTop: vPadMd,
      paddingBottom: vPadMd
    }}>
      <div className="max-w-[1400px] mx-auto">
        {/* Stack to single column on mobile AND tablet */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile || isTablet ? '1fr' : '7fr 5fr',
          gap: isMobile || isTablet ? '2.5rem' : '0',
          alignItems: 'center'
        }}>
          {/* Left: body text */}
          <div style={{
            ...S(introSplitInView, 0),
            paddingRight: isMobile || isTablet ? 0 : '3rem'
          }}>
            <div className="flex items-center gap-3 mb-6">
              <div style={{
                width: '32px',
                height: '1.5px',
                background: RED
              }} />
              <span style={{
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.22em',
                color: RED,
                textTransform: 'uppercase'
              }}>Our Approach</span>
            </div>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 'clamp(16px, 1.6vw, 20px)',
              fontWeight: 400,
              color: '#ffffff',
              lineHeight: 1.8,
              marginBottom: '1.5rem'
            }}>
              EmpowaWorx™ helps ambitious organisations build iconic brands, accelerate growth, strengthen market influence and unlock sustainable competitive advantage through integrated Strategic Creative Marketing, Brand &amp; Advertising™ solutions.
            </p>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 'clamp(15px, 1.4vw, 18px)',
              fontWeight: 400,
              color: 'rgba(255,255,255,0.65)',
              lineHeight: 1.85
            }}>
              We combine strategy, creativity, data, technology, customer intelligence, and commercial insight to transform brands into market leaders, customers into advocates, engagement into revenue, and marketing investment into measurable business outcomes.
            </p>
          </div>
          {/* Right: large typographic accent — desktop only */}
          {!isMobile && !isTablet && <div style={{
            ...S(introSplitInView, 180),
            paddingLeft: '2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            justifyContent: 'center'
          }}>
            <div style={{
              textAlign: 'right',
              lineHeight: 1
            }}>
              <div style={{
                fontSize: 'clamp(8rem, 18vw, 22rem)',
                fontWeight: 900,
                color: CHARCOAL,
                opacity: 0.12,
                letterSpacing: '-0.06em',
                lineHeight: 0.85,
                fontFamily: 'Inter, sans-serif',
                userSelect: 'none'
              }} aria-hidden="true">
                50+
              </div>
              <p style={{
                marginTop: '1.5rem',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.25)',
                textAlign: 'right'
              }}>
                Campaigns Delivered
              </p>
            </div>
          </div>}
        </div>
      </div>
    </section>

    {/* ── Mandate / Intro Section ── */}
    <section ref={mandateRef} style={{
      paddingLeft: hPad,
      paddingRight: hPad,
      paddingTop: vPadMd,
      paddingBottom: vPadMd,
      background: '#0D0D0D',
      borderBottom: '1px solid rgba(255,255,255,0.06)'
    }}>
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          <div className="lg:col-span-5" style={S(mandateInView, 0)}>
            <div className="flex items-center gap-4 mb-6">
              <div style={{
                width: '40px',
                height: '1.5px',
                background: RED
              }} />
              <span style={{
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.25em',
                color: RED,
                textTransform: 'uppercase'
              }}>Our Mandate</span>
            </div>
            <h2 style={{
              fontSize: 'clamp(1.8rem, 4vw, 3.5rem)',
              fontWeight: 600,
              color: '#ffffff',
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              marginBottom: '1.5rem'
            }}>
              Building Brands that <span style={{
                color: RED
              }}>Influence Markets</span>.
            </h2>
          </div>
          <div className="lg:col-span-7 flex flex-col gap-6" style={S(mandateInView, 150)}>
            <p style={{
              fontSize: isMobile ? '16px' : '18px',
              color: '#ffffff',
              lineHeight: 1.6,
              fontWeight: 500
            }}>
              In a rapidly evolving global economy, the brands that win are those that combine strategic depth with creative impact.
            </p>
            <div style={{
              fontSize: isMobile ? '15px' : '16px',
              color: 'rgba(255,255,255,0.7)',
              lineHeight: 1.8,
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem'
            }}>
              <p>
                At EmpowaWorx™, our Strategic Creative Marketing, Brand &amp; Advertising practice is purpose-built to navigate this complexity. We don't just create campaigns; we build enduring brand capital and scalable growth engines.
              </p>
              <p>
                Our advisory approach integrates the commercial rigour of management consulting with the disruptive creativity of a world-class agency, ensuring that every strategic decision and creative output is anchored in measurable business objectives and sustainable competitive advantage.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ── Core Capabilities ── */}
    <CoreCapabilities />

    {/* ── CTA 1: After Core Capabilities ── */}
    <div ref={cta1Ref}>
      <CtaAfterCapabilities inView={cta1InView} isMobile={isMobile} hPad={hPad} />
    </div>

    {/* ── Premium Offerings ── */}
    <section ref={premiumRef} style={{
      paddingLeft: hPad,
      paddingRight: hPad,
      paddingTop: vPadLg,
      paddingBottom: vPadLg,
      background: '#111111'
    }}>
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-12 sm:mb-20" style={S(premiumInView)}>
          <span style={{
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.3em',
            color: RED,
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '1.25rem'
          }}>
            Premium Offerings
          </span>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 5vw, 3.5rem)',
            fontWeight: 600,
            color: '#ffffff',
            lineHeight: 1,
            letterSpacing: '-0.03em',
            marginBottom: '1.5rem'
          }}>
            Strategic Disciplines &amp; <span style={{
              color: RED
            }}>Specialisms</span>
          </h2>
          <div className="w-16 h-0.5 bg-red-500 mx-auto" />
        </div>

        {/* 1 col on mobile, 2 cols on tablet and desktop */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: isMobile ? '16px' : 'clamp(16px, 3vw, 32px)'
        }}>
          {PREMIUM_OFFERINGS.map((offering, idx) => {
            const IconComp = PREMIUM_ICONS[idx % PREMIUM_ICONS.length];
            const isOdd = idx % 2 !== 0;
            return <div key={offering.id} className="offering-card bg-[#1a1a1a] border-l-4 border-transparent flex flex-col" style={{
              ...S(premiumInView, idx * 60),
              transition: `opacity 0.4s cubic-bezier(${EASE_MEDIUM_OUT.join(',')}) ${idx * 60}ms, transform 0.4s cubic-bezier(${EASE_MEDIUM_OUT.join(',')}) ${idx * 60}ms, border-color 0.25s ease`,
              padding: 'clamp(20px, 3vw, 32px)',
              marginTop: !isMobile && isOdd ? '2.5rem' : 0,
              position: 'relative' as const,
              overflow: 'hidden'
            }}>
              <span aria-hidden="true" style={{
                position: 'absolute',
                top: '-0.5rem',
                right: '1rem',
                fontSize: 'clamp(3rem, 8vw, 7rem)',
                fontWeight: 900,
                color: '#ffffff',
                opacity: 0.07,
                lineHeight: 1,
                letterSpacing: '-0.05em',
                fontFamily: 'Inter, sans-serif',
                userSelect: 'none',
                pointerEvents: 'none'
              }}>
                {String(idx + 1).padStart(2, '0')}
              </span>
              <div className="flex items-center justify-between mb-6" style={{
                position: 'relative' as const,
                zIndex: 1
              }}>
                <span className="text-white/30 text-sm font-black tracking-widest uppercase">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <IconComp size={22} style={{
                  color: RED
                }} />
              </div>
              <div style={{
                position: 'relative' as const,
                zIndex: 1
              }}>
                <h3 className="text-white font-bold uppercase tracking-tight mb-4" style={{
                  fontSize: 'clamp(1rem, 1.5vw, 1.2rem)'
                }}>
                  {offering.title}
                </h3>
                <p className="leading-relaxed font-light" style={{
                  color: 'rgba(255,255,255,0.55)',
                  fontSize: isMobile ? '14px' : '15px'
                }}>
                  {offering.summary}
                </p>
              </div>
            </div>;
          })}
        </div>
      </div>
    </section>

    {/* ── CTA 2: Strip between Premium Offerings and Signature Solutions ── */}
    <div ref={cta2Ref}>
      <CtaStripPremiumToSignature inView={cta2InView} isMobile={isMobile} hPad={hPad} />
    </div>

    {/* ── Signature Solutions — 1 col mobile, 2 col tablet, 4 col desktop ── */}
    <section ref={signatureRef} style={{
      display: 'none',
      paddingLeft: hPad,
      paddingRight: hPad,
      paddingTop: vPadLg,
      paddingBottom: vPadLg,
      background: '#0D0D0D',
      borderBottom: '1px solid rgba(255,255,255,0.06)'
    }}>
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-12 sm:mb-20" style={S(signatureInView)}>
          <div className="flex items-center gap-3 mb-4">
            <div style={{
              width: '40px',
              height: '2.5px',
              background: RED
            }} />
            <span style={{
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.25em',
              color: RED,
              textTransform: 'uppercase'
            }}>Proprietary Frameworks</span>
          </div>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 4.5vw, 3.5rem)',
            fontWeight: 600,
            color: '#ffffff',
            lineHeight: 1,
            letterSpacing: '-0.03em'
          }}>
            Signature Strategic Solutions™
          </h2>
        </div>

        <motion.div variants={{
          hidden: {
            opacity: 0
          },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1
            }
          }
        }} initial="hidden" animate={signatureInView ? 'visible' : 'hidden'} style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
          gap: 'clamp(16px, 2vw, 24px)'
        }}>
          {SIGNATURE_SOLUTIONS.map(sol => <motion.div key={sol.id} variants={{
            hidden: {
              opacity: 0,
              y: 40
            },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1]
              }
            }
          }} className="bg-[#161616] border-l-4 border-[#FC3637] shadow-sm flex flex-col gap-4" style={{
            padding: 'clamp(20px, 3vw, 32px)',
            overflow: 'hidden'
          }}>
            <h3 style={{
              color: '#ffffff',
              fontWeight: 900,
              fontSize: 'clamp(1rem, 2.2vw, 1.6rem)',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              textTransform: 'uppercase',
              wordBreak: 'break-word',
              overflowWrap: 'break-word',
              whiteSpace: 'normal'
            }}>
              {sol.name}
            </h3>
            <p style={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: '14px',
              lineHeight: 1.7
            }}>{sol.description}</p>
          </motion.div>)}
        </motion.div>
      </div>
    </section>

    {/* ── CTA 3: After Signature Solutions, before Outcomes ── */}
    <div ref={cta3Ref}>
      <CtaMarketAdvantage inView={cta3InView} isMobile={isMobile} hPad={hPad} />
    </div>

    {/* ── Outcomes Grid — 1 col mobile, 2 col tablet, 4 col desktop ── */}
    <section style={{
      paddingLeft: hPad,
      paddingRight: hPad,
      paddingTop: vPadLg,
      paddingBottom: vPadLg,
      background: '#111111',
      borderBottom: '1px solid rgba(255,255,255,0.06)'
    }}>
      <div className="max-w-[1400px] mx-auto">
        <div ref={outcomesHeaderRef} className="text-center mb-12 sm:mb-20" style={S(outcomesHeaderInView)}>
          <span style={{
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.3em',
            color: RED,
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '1.25rem'
          }}>
            Strategic Impact
          </span>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 5vw, 3.5rem)',
            fontWeight: 600,
            color: '#ffffff',
            lineHeight: 1,
            letterSpacing: '-0.03em'
          }}>
            The EmpowaWorx <span style={{
              color: RED
            }}>Advantage</span>
          </h2>
          <p style={{
            marginTop: '1.5rem',
            color: 'rgba(255,255,255,0.6)',
            fontSize: isMobile ? '15px' : '18px',
            maxWidth: '800px',
            margin: '1.5rem auto 0',
            lineHeight: 1.6
          }}>
            We deliver measurable business value and sustainable market influence through our integrated strategic approach.
          </p>
        </div>

        <div ref={outcomesGridRef} style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
          gap: 'clamp(16px, 2vw, 24px)'
        }}>
          {OUTCOMES_DATA.map((outcome, idx) => <div key={outcome.id} className="outcome-card bg-[#161616] border border-white/5 flex flex-col gap-6" style={{
            ...S(outcomesGridInView, idx * 60),
            padding: 'clamp(20px, 3vw, 32px)'
          }}>
            <div className="w-12 h-12 flex items-center justify-center" style={{
              background: 'rgba(252,54,55,0.05)',
              color: RED
            }}>
              <outcome.IconComponent size={24} />
            </div>
            <div>
              <h4 style={{
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '15px',
                marginBottom: '0.5rem',
                lineHeight: 1.4
              }}>{outcome.title}</h4>
              <p style={{
                color: 'rgba(255,255,255,0.5)',
                fontSize: '13px',
                fontWeight: 500
              }}>{outcome.descriptor}</p>
            </div>
          </div>)}
        </div>
      </div>
    </section>

    {/* ── Faculty / Expert Leadership ── */}
    <section ref={facultyRef} style={{
      paddingLeft: hPad,
      paddingRight: hPad,
      paddingTop: vPadLg,
      paddingBottom: vPadLg,
      background: '#0D0D0D',
      display: 'none'
    }}>
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 md:gap-8" style={{
          ...S(facultyInView, 0),
          marginBottom: isMobile ? '2rem' : '3.5rem'
        }}>
          <div className="w-full md:max-w-xl">
            <div className="flex items-center gap-4 mb-4">
              <div style={{
                width: '48px',
                height: '2px',
                background: RED,
                flexShrink: 0
              }} />
              <p style={{
                color: RED,
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                fontFamily: 'Inter, sans-serif',
                margin: 0
              }}>
                The Faculty
              </p>
            </div>
            <h2 className="font-black uppercase" style={{
              color: '#ffffff',
              fontSize: 'clamp(1.6rem, 5vw, 3.75rem)',
              letterSpacing: '-0.035em',
              lineHeight: 0.92,
              fontFamily: 'Inter, sans-serif'
            }}>
              Strategic Advisors &amp; Lead Experts
            </h2>
          </div>
          <p className="md:text-right" style={{
            color: 'rgba(255,255,255,0.6)',
            fontSize: 'clamp(14px, 1.4vw, 16px)',
            fontWeight: 400,
            lineHeight: 1.8,
            fontFamily: 'Inter, sans-serif',
            maxWidth: '340px'
          }}>
            Our team combines strategic marketing expertise with deep commercial insight and creative excellence across African and global markets.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: 'clamp(16px, 2vw, 28px)',
          width: '100%'
        }}>
          {FACULTY_MEMBERS.map((member, idx) => <div key={member.id} className="faculty-card-item group transition-all w-full overflow-hidden" style={{
            border: '1px solid rgba(255,255,255,0.06)',
            opacity: facultyInView ? 1 : 0,
            transform: facultyInView ? 'translateY(0)' : 'translateY(30px)',
            transition: `opacity 0.8s cubic-bezier(0.21,0.47,0.32,0.98) ${idx * 150}ms, transform 0.8s cubic-bezier(0.21,0.47,0.32,0.98) ${idx * 150}ms`
          }}>
            {/* Stack image on top on mobile; 5-col grid on tablet+ */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '2fr 3fr',
              height: isMobile ? 'auto' : '100%'
            }}>
              <div className="overflow-hidden aspect-square">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0" style={{
                  display: 'block',
                  maxWidth: '100%'
                }} />
              </div>
              <div className="p-5 md:p-7 flex flex-col justify-start" style={{
                background: '#161616'
              }}>
                <h3 className="font-black uppercase mb-1" style={{
                  color: '#ffffff',
                  fontSize: 'clamp(1rem, 2.5vw, 1.65rem)',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.05,
                  fontFamily: 'Inter, sans-serif'
                }}>
                  {member.name}
                </h3>
                <p className="pb-4 mb-4 md:mb-5" style={{
                  color: RED,
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
                  color: 'rgba(255,255,255,0.6)',
                  fontSize: '14px',
                  fontWeight: 400,
                  lineHeight: 1.75,
                  fontStyle: 'italic',
                  fontFamily: 'Inter, sans-serif'
                }}>
                  <span>&#8220;</span><span>{member.description}</span><span>&#8221;</span>
                </p>
                <div className="mt-5 flex gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer" style={{
                    background: 'rgba(255,255,255,0.05)',
                    color: '#ffffff'
                  }} onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.background = RED;
                    (e.currentTarget as HTMLDivElement).style.color = '#ffffff';
                  }} onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.05)';
                    (e.currentTarget as HTMLDivElement).style.color = '#ffffff';
                  }}>
                    <Linkedin size={14} />
                  </div>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer" style={{
                    background: 'rgba(255,255,255,0.05)',
                    color: '#ffffff'
                  }} onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.background = RED;
                    (e.currentTarget as HTMLDivElement).style.color = '#ffffff';
                  }} onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.05)';
                    (e.currentTarget as HTMLDivElement).style.color = '#ffffff';
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

    {/* ── CTA 4: Pre-footer high-impact section ── */}
    <div ref={cta4Ref}>
      <CtaPreFooter inView={cta4InView} isMobile={isMobile} hPad={hPad} />
    </div>

    <MidPageCtaBar message="Ready to accelerate your brand's growth and market influence?" cta="Partner With Us" isMobile={isMobile} />

    <Footer />
  </div>;
};
