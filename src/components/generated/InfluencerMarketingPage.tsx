import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Menu, X, Linkedin, Instagram, Facebook, Youtube, Twitter, Plus, Minus, Eye, ShieldCheck, Users, Globe, Megaphone, TrendingUp, Target, BarChart2, ShoppingCart, Star, LineChart, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { AfricaWatermark } from '../AfricaWatermark';

// ─── Brand tokens ─────────────────────────────────────────
const B = {
  crimson: '#FC3637',
  crimsonDark: '#E02F30',
  charcoal: '#1A1A1A',
  footerBg: '#0A0A0A',
  gray: '#757575',
  offWhite: '#F8F8F8',
  lightGray: '#E5E5E5',
  white: '#FFFFFF'
};

// ─── Reduced-motion detection ─────────────────────────────
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

// ─── Bidirectional InView hook ─────────────────────────────
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

// ─── useScrollDirection ───────────────────────────────────
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

// ─── Types ────────────────────────────────────────────────
interface NavItemData {
  id: string;
  label: string;
  href: string;
  active?: boolean;
}
interface ServiceCategoryData {
  id: string;
  title: string;
  teaser: string;
  services: string[];
  pillLabel: string;
}
interface OutcomeItemData {
  id: string;
  title: string;
}
interface FacultyMemberData {
  id: string;
  name: string;
  title: string;
  description: string;
  image?: string;
}
interface PremiumOfferingData {
  id: string;
  number: string;
  title: string;
  description: string;
}
interface SignatureSolutionData {
  id: string;
  name: string;
  description: string;
}
interface OutcomeIconData {
  id: string;
  icon: React.ReactNode;
  stat: string;
  label: string;
}

// ─── Data ─────────────────────────────────────────────────
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
  label: 'Strategic Advisory',
  href: '#',
  active: true
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
const TICKER_ITEMS = ['INFLUENCER MARKETING', 'CREATOR ECONOMY', 'CULTURAL INFLUENCE', 'TALENT STRATEGY', 'BRAND PARTNERSHIPS', 'COMMUNITY BUILDING', 'SOCIAL COMMERCE', 'INFLUENCE INTELLIGENCE'];
const SERVICES: ServiceCategoryData[] = [{
  id: 's1',
  pillLabel: 'Influencer Strategy',
  title: 'Influencer Strategy, Brand Partnerships & Influence Marketing',
  teaser: 'Helping brands harness the power of trusted voices, creator communities and digital influence to drive awareness, credibility, engagement and commercial growth.',
  services: ['Influencer Marketing Strategy', 'Influence-Led Brand Growth Programmes', 'Brand Partnership Strategy', 'Influencer Ecosystem Development', 'Creator Partnership Programmes', 'Influencer Identification & Mapping', 'Audience Influence Analysis', 'Influencer Campaign Architecture', 'Brand Ambassador Programmes', 'Key Opinion Leader (KOL) Engagement', 'Celebrity Partnerships & Endorsements', 'Executive Influencer Programmes', 'B2B Influencer Marketing', 'Industry Influencer Engagement', 'Influence Marketing Audits', 'Influencer Governance Frameworks']
}, {
  id: 's2',
  pillLabel: 'Creator Economy',
  title: 'Creator Economy Strategy & Commercialisation',
  teaser: 'Enabling brands, creators and organisations to unlock new growth opportunities through creator-led ecosystems, digital entrepreneurship and audience monetisation.',
  services: ['Creator Economy Strategy', 'Creator Ecosystem Development', 'Creator Partnership Programmes', 'Creator Commercialisation Strategies', 'Creator Network Management', 'Creator Talent Development', 'Creator Brand Collaborations', 'Digital Creator Platforms', 'Creator Revenue Models', 'Creator Marketplace Development', 'Content Monetisation Strategies', 'Creator Community Building', 'Social Commerce Integration', 'Creator-Led Business Growth Programmes', 'Creator Economy Intelligence']
}, {
  id: 's3',
  pillLabel: 'Cultural Intelligence',
  title: 'Cultural Intelligence, Trends & Consumer Influence',
  teaser: 'Helping organisations understand, shape and participate in cultural conversations that influence consumer behaviour, brand relevance and market leadership.',
  services: ['Cultural Intelligence Research', 'Consumer Trend Analysis', 'Cultural Insights & Foresight', 'Trendspotting & Market Signals', 'Youth Culture Intelligence', 'Audience Behaviour Analysis', 'Cultural Relevance Strategies', 'Community Insights & Listening', 'Cultural Positioning Programmes', 'Lifestyle & Passion Point Mapping', 'Generational Insights', 'Market Sentiment Analysis', 'Consumer Influence Studies', 'Cultural Impact Assessments', 'Future Consumer Trends Advisory']
}, {
  id: 's4',
  pillLabel: 'Creator Content',
  title: 'Creator Content, Storytelling & Brand Narratives',
  teaser: 'Developing authentic content ecosystems that connect brands with audiences through trusted creators, compelling stories and meaningful engagement.',
  services: ['Creator Content Strategy', 'Influencer Content Programmes', 'Content Co-Creation Initiatives', 'Brand Storytelling Campaigns', 'Social Media Content Development', 'Short-Form Video Strategies', 'Long-Form Content Programmes', 'Podcast & Audio Content Partnerships', 'Live Content Experiences', 'User-Generated Content (UGC) Programmes', 'Content Amplification Strategies', 'Content Distribution & Syndication', 'Community-Led Content Programmes', 'Creator-Led Storytelling Platforms', 'Content Performance Intelligence']
}, {
  id: 's5',
  pillLabel: 'Social Commerce',
  title: 'Social Commerce, Community & Audience Growth',
  teaser: 'Building communities and commerce ecosystems that convert attention, engagement and influence into measurable business outcomes.',
  services: ['Social Commerce Strategy', 'Community Building & Management', 'Audience Growth Programmes', 'Creator Commerce Campaigns', 'Influencer Commerce Activations', 'Brand Community Development', 'Loyalty & Advocacy Programmes', 'Customer Engagement Strategies', 'Digital Community Platforms', 'Community Intelligence & Analytics', 'Audience Acquisition Campaigns', 'Advocacy & Referral Programmes', 'Consumer Engagement Programmes', 'Community-Led Growth Strategies']
}, {
  id: 's6',
  pillLabel: 'Talent Management',
  title: 'Talent Management, Representation & Partnerships',
  teaser: 'Connecting brands with influential voices, creators, celebrities and cultural leaders through strategic partnerships and talent engagement programmes.',
  services: ['Talent Strategy & Advisory', 'Influencer Talent Management', 'Creator Representation', 'Celebrity Talent Procurement', 'Ambassador Recruitment & Management', 'Partnership Negotiations', 'Talent Contracting & Governance', 'Sponsorship Integration', 'Brand Alignment Assessments', 'Talent Relationship Management', 'Speaker & Personality Partnerships', 'Creator Collaboration Management', 'Influencer Portfolio Development', 'Talent Performance Evaluation']
}, {
  id: 's7',
  pillLabel: 'Campaigns & Activations',
  title: 'Campaign Management, Activations & Experiences',
  teaser: 'Designing and executing integrated influence campaigns that drive awareness, engagement, conversion and cultural impact.',
  services: ['Influencer Campaign Management', 'Creator-Led Marketing Campaigns', 'Product Launch Activations', 'Experiential Influence Campaigns', 'Digital Activations', 'Social Media Campaigns', 'Community Engagement Campaigns', 'Cultural Marketing Campaigns', 'Lifestyle Marketing Activations', 'Retail & Shopper Influence Programmes', 'Brand Experience Integration', 'Multi-Platform Campaign Delivery', 'Sponsorship Activations', 'Advocacy Campaigns', 'Cause-Driven Influence Programmes']
}, {
  id: 's8',
  pillLabel: 'Intelligence & Analytics',
  title: 'Influence Intelligence, Analytics & Measurement',
  teaser: 'Transforming creator, audience and campaign data into actionable insights that optimise performance and demonstrate measurable impact.',
  services: ['Influencer Intelligence', 'Creator Performance Analytics', 'Audience Intelligence', 'Campaign Measurement & Evaluation', 'Engagement Analytics', 'Sentiment Analysis', 'Brand Affinity Measurement', 'Share of Influence Analysis', 'Community Insights', 'Creator Benchmarking', 'Consumer Behaviour Analytics', 'ROI & ROE Measurement', 'Impact Reporting', 'Influence Dashboards', 'Strategic Insights & Recommendations']
}];
const OUTCOMES: OutcomeItemData[] = [{
  id: 'o1',
  title: 'Increased Brand Awareness, Visibility and Share of Voice'
}, {
  id: 'o2',
  title: 'Enhanced Reputation, Trust and Consumer Credibility'
}, {
  id: 'o3',
  title: 'Stronger Audience Engagement, Loyalty and Community Growth'
}, {
  id: 'o4',
  title: 'Greater Cultural Relevance and Market Influence'
}, {
  id: 'o5',
  title: 'Increased Brand Advocacy, Demand and Consumer Action'
}, {
  id: 'o6',
  title: 'Improved Campaign Performance and Marketing ROI'
}, {
  id: 'o7',
  title: 'Stronger Connections with Target Audiences and Emerging Markets'
}, {
  id: 'o8',
  title: 'Measurable Commercial, Brand, Reputation and Social Impact'
}];
const FACULTY: FacultyMemberData[] = [{
  id: 'f1',
  name: 'Neo Mathebe',
  title: 'Acting Managing Executive | Influencer Marketing, Creator Economy & Cultural Influence Lead',
  description: "Neo Mathebe is a strategic influence, creator partnerships and audience engagement specialist with expertise in influencer marketing, creator economy strategy, talent management and cultural influence. He advises brands, organisations and leaders on how to harness the power of creators, communities and culture to build relevance, strengthen reputation, accelerate engagement and drive measurable business impact. His expertise spans influencer strategy, creator partnerships, talent representation, thought leadership positioning, digital influence campaigns, community building, cultural intelligence and platform growth. Neo works at the intersection of influence, content, culture and commerce, helping organisations transform audiences into communities, creators into brand advocates and influence into sustainable commercial value.",
  image: '/Neo-Mathebe.JPG'
}];
const SOCIAL_ITEMS = [{
  icon: <Linkedin size={18} />,
  label: 'LinkedIn',
  href: '#'
}, {
  icon: <Instagram size={18} />,
  label: 'Instagram',
  href: '#'
}, {
  icon: <Facebook size={18} />,
  label: 'Facebook',
  href: '#'
}, {
  icon: <Youtube size={18} />,
  label: 'YouTube',
  href: '#'
}, {
  icon: <Twitter size={18} />,
  label: 'Twitter',
  href: '#'
}];
const HERO_LINE_1 = ['Influencer', 'Marketing,'];
const HERO_LINE_2 = ['/', 'Creator', 'Economy'];
const HERO_LINE_3 = ['& Cultural Influence.'];
const HERO_TAGS_DATA = [{
  id: 'ht1',
  label: 'Influencer Campaigns'
}, {
  id: 'ht2',
  label: 'Creator Economy'
}, {
  id: 'ht3',
  label: 'Cultural Influence'
}];
const OUTCOME_ICONS: OutcomeIconData[] = [{
  id: 'oi1',
  icon: <Eye size={22} strokeWidth={1.4} />,
  stat: '01',
  label: 'Brand Awareness'
}, {
  id: 'oi2',
  icon: <ShieldCheck size={22} strokeWidth={1.4} />,
  stat: '02',
  label: 'Reputation & Trust'
}, {
  id: 'oi3',
  icon: <Users size={22} strokeWidth={1.4} />,
  stat: '03',
  label: 'Audience Engagement'
}, {
  id: 'oi4',
  icon: <Globe size={22} strokeWidth={1.4} />,
  stat: '04',
  label: 'Cultural Relevance'
}, {
  id: 'oi5',
  icon: <Megaphone size={22} strokeWidth={1.4} />,
  stat: '05',
  label: 'Brand Advocacy'
}, {
  id: 'oi6',
  icon: <TrendingUp size={22} strokeWidth={1.4} />,
  stat: '06',
  label: 'Campaign ROI'
}, {
  id: 'oi7',
  icon: <Target size={22} strokeWidth={1.4} />,
  stat: '07',
  label: 'Target Audiences'
}, {
  id: 'oi8',
  icon: <BarChart2 size={22} strokeWidth={1.4} />,
  stat: '08',
  label: 'Measurable Impact'
}];
const PREMIUM_OFFERINGS: PremiumOfferingData[] = [{
  id: 'po1',
  number: '01',
  title: 'Influencer Marketing & Brand Partnerships',
  description: 'Influencer Strategy, Brand Partnerships, Influencer Campaigns, Ambassador Programmes, Celebrity Engagement, Key Opinion Leaders, B2B Influence Programmes, Influence Governance and Audience Influence Strategies.'
}, {
  id: 'po2',
  number: '02',
  title: 'Creator Economy & Commercial Growth',
  description: 'Creator Economy Strategy, Creator Networks, Content Monetisation, Creator Partnerships, Creator Commercialisation, Social Commerce, Creator Communities, Digital Entrepreneurship and Revenue Growth Programmes.'
}, {
  id: 'po3',
  number: '03',
  title: 'Cultural Intelligence & Consumer Insights',
  description: 'Cultural Intelligence, Consumer Trends, Audience Behaviour Analysis, Market Sentiment, Youth Culture Insights, Generational Research, Cultural Positioning and Future Trends Advisory.'
}, {
  id: 'po4',
  number: '04',
  title: 'Creator Content & Brand Storytelling',
  description: 'Content Strategy, Content Co-Creation, Creator-Led Storytelling, Social Media Content, Video Programmes, Podcast Partnerships, User-Generated Content and Content Amplification.'
}, {
  id: 'po5',
  number: '05',
  title: 'Community Building & Audience Growth',
  description: 'Community Development, Audience Growth, Brand Communities, Loyalty Programmes, Advocacy Campaigns, Community Intelligence, Consumer Engagement and Community-Led Growth Strategies.'
}, {
  id: 'po6',
  number: '06',
  title: 'Talent, Creator & Celebrity Management',
  description: 'Talent Management, Creator Representation, Celebrity Partnerships, Ambassador Programmes, Talent Procurement, Sponsorship Integration, Partnership Negotiation and Talent Performance Management.'
}, {
  id: 'po7',
  number: '07',
  title: 'Campaigns, Activations & Experiences',
  description: 'Influencer Campaigns, Creator-Led Marketing, Product Launches, Experiential Activations, Cultural Marketing, Social Media Campaigns, Community Engagement and Sponsorship Activations.'
}, {
  id: 'po8',
  number: '08',
  title: 'Influence Intelligence & Performance Analytics',
  description: 'Influencer Intelligence, Creator Analytics, Audience Insights, Engagement Measurement, Sentiment Analysis, Brand Affinity Studies, Campaign Analytics and Strategic Reporting.'
}, {
  id: 'po9',
  number: '09',
  title: 'Social Commerce & Consumer Influence',
  description: 'Social Commerce, Influencer Commerce, Creator Commerce, Consumer Engagement, Audience Conversion, Loyalty Strategies, Community Commerce and Revenue Optimisation.'
}, {
  id: 'po10',
  number: '10',
  title: 'Influence, Reputation & Cultural Leadership',
  description: 'Executive Influence, Thought Leadership Amplification, Cultural Relevance Strategies, Brand Authority Building, Trust-Based Influence, Market Leadership Positioning and Influence Measurement.'
}];
const SIGNATURE_SOLUTIONS: SignatureSolutionData[] = [{
  id: 'ss1',
  name: 'InfluenceCapital',
  description: 'Transforming influence into a strategic asset that drives awareness, credibility, stakeholder engagement and commercial growth.'
}, {
  id: 'ss2',
  name: 'CreatorCapital',
  description: 'Building creator ecosystems, strategic partnerships and monetisation opportunities that unlock sustainable value for brands and creators.'
}, {
  id: 'ss3',
  name: 'CulturalInfluence',
  description: 'Helping brands shape and participate in cultural conversations that drive relevance, affinity and long-term market leadership.'
}, {
  id: 'ss4',
  name: 'CommunityCapital',
  description: 'Building thriving communities that strengthen engagement, advocacy, loyalty and sustainable business growth.'
}, {
  id: 'ss5',
  name: 'CreatorCommerce',
  description: 'Leveraging creators, content and communities to accelerate social commerce, customer acquisition and revenue generation.'
}, {
  id: 'ss6',
  name: 'InfluenceIntelligence',
  description: 'Converting creator, audience and cultural data into actionable intelligence that informs strategy and optimises performance.'
}, {
  id: 'ss7',
  name: 'ReputationInfluence',
  description: 'Aligning creators, influencers and brand narratives to strengthen trust, credibility and reputation.'
}, {
  id: 'ss8',
  name: 'LegacyInfluence',
  description: 'Creating enduring influence ecosystems that deliver long-term cultural, commercial and societal impact.'
}];
const SOLUTION_ICONS: React.ReactNode[] = [<TrendingUp size={22} strokeWidth={1.5} />, <Users size={22} strokeWidth={1.5} />, <Globe size={22} strokeWidth={1.5} />, <Megaphone size={22} strokeWidth={1.5} />, <ShoppingCart size={22} strokeWidth={1.5} />, <LineChart size={22} strokeWidth={1.5} />, <ShieldCheck size={22} strokeWidth={1.5} />, <Star size={22} strokeWidth={1.5} />];
const FOOTER_PRACTICE_AREAS = ['Influencer Marketing', 'Creator Economy', 'Cultural Influence', 'Social Commerce', 'Talent Management'];
const FOOTER_LEGAL_LINKS = ['Privacy Policy', 'Terms of Use'];

// ─── Global Styles ─────────────────────────────────────────
const GLOBAL_STYLES = `
  @keyframes ticker {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }
  .ticker-track {
    display: flex;
    width: max-content;
    animation: ticker 30s linear infinite;
  }
  .nav-link-animated {
    position: relative;
  }
  .nav-link-animated::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 1.5px;
    background: #FC3637;
    transition: width 0.3s ease;
  }
  .nav-link-animated:hover::after {
    width: 100%;
  }
  .outcome-card {
    position: relative;
    display: flex;
    flex-direction: column;
    background: #111111;
    border: 1px solid rgba(255,255,255,0.06);
    transition: transform 0.4s cubic-bezier(0.21,0.47,0.32,0.98),
                box-shadow 0.4s cubic-bezier(0.21,0.47,0.32,0.98),
                border-color 0.4s ease;
    cursor: default;
    overflow: hidden;
  }
  @media (hover: hover) {
    .outcome-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 32px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(252,54,55,0.35), 0 8px 32px rgba(252,54,55,0.18);
      border-color: rgba(252,54,55,0.35);
    }
    .outcome-card:hover .outcome-icon-wrap {
      background: rgba(252,54,55,0.15) !important;
      color: #FC3637 !important;
    }
    .outcome-card:hover .outcome-stat-line {
      width: 100%;
    }
  }
  .outcome-card-noise {
    position: absolute;
    top: 0;
    left: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
    background-repeat: repeat;
    background-size: 128px 128px;
    opacity: 0.04;
    pointer-events: none;
    width: 100%;
    height: 100%;
  }
  .outcome-icon-wrap {
    transition: background 0.3s ease, color 0.3s ease;
  }
  .outcome-stat-line {
    transition: width 0.6s cubic-bezier(0.21,0.47,0.32,0.98) 0.1s;
    width: 0;
  }
  .sig-card {
    transition: transform 0.35s cubic-bezier(0.21,0.47,0.32,0.98),
                box-shadow 0.35s cubic-bezier(0.21,0.47,0.32,0.98),
                border-color 0.35s ease;
    cursor: default;
  }
  @media (hover: hover) {
    .sig-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 24px 56px rgba(0,0,0,0.6), 0 0 0 1px rgba(252,54,55,0.3);
      border-color: rgba(252,54,55,0.3) !important;
    }
    .sig-card:hover .sig-icon {
      background: rgba(252,54,55,0.2) !important;
      color: #FC3637 !important;
    }
  }
  .sig-icon {
    transition: background 0.3s ease, color 0.3s ease;
  }
  .page-root {
    max-width: 100vw;
    overflow-x: hidden;
  }
  .pill-filter {
    display: inline-flex;
    align-items: center;
    padding: 7px 14px;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    font-family: Inter, sans-serif;
    cursor: pointer;
    border: 1.5px solid;
    transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
    white-space: nowrap;
    flex-shrink: 0;
    touch-action: manipulation;
  }
  @media (min-width: 768px) {
    .pill-filter {
      padding: 8px 18px;
    }
  }
  .pill-filter.active {
    background: #FC3637;
    color: #ffffff;
    border-color: #FC3637;
  }
  .pill-filter.inactive {
    background: transparent;
    color: rgba(255,255,255,0.55);
    border-color: rgba(255,255,255,0.15);
  }
  .pill-filter.inactive:hover {
    border-color: #FC3637;
    color: #FC3637;
  }
  /* Pill scroll container */
  .pill-scroll-container {
    display: flex;
    flex-wrap: nowrap;
    gap: 8px;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    padding-bottom: 4px;
  }
  .pill-scroll-container::-webkit-scrollbar {
    display: none;
  }
  @media (min-width: 1024px) {
    .pill-scroll-container {
      flex-wrap: wrap;
      overflow-x: visible;
    }
  }
  /* Faculty image responsive */
  .faculty-img-wrap {
    min-height: 220px;
    height: 100%;
  }
  @media (max-width: 639px) {
    .faculty-img-wrap {
      min-height: 260px;
      max-height: 320px;
      height: 300px;
    }
  }
  /* Prevent text overflow on small screens */
  .hero-cta-btn {
    min-width: 0;
    flex: 1 1 auto;
    max-width: 100%;
  }
  @media (min-width: 480px) {
    .hero-cta-btn {
      flex: 0 0 auto;
    }
  }
`;



// ─── Eyebrow label ─────────────────────────────────────────
const Eyebrow = ({
  children,
  light = false
}: {
  children: React.ReactNode;
  light?: boolean;
}) => <div className="flex items-center gap-4 mb-4">
    <div style={{
      width: '48px',
      height: '2px',
      background: light ? 'rgba(252,54,55,0.7)' : B.crimson,
      flexShrink: 0
    }} />
    <p style={{
      color: light ? 'rgba(252,54,55,0.85)' : B.crimson,
      fontSize: '11px',
      fontWeight: 500,
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      fontFamily: 'Inter, sans-serif',
      margin: 0
    }}>
      {children}
    </p>
  </div>;

const ServiceAccordionItem = ({
  item,
  index,
  highlighted
}: {
  item: ServiceCategoryData;
  index: number;
  highlighted: boolean;
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const {
    ref,
    inView
  } = useBidirectionalInView<HTMLDivElement>(0.1);
  const itemRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (highlighted && itemRef.current) {
      itemRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }, [highlighted]);
  return <motion.div ref={ref} initial={{
    opacity: 0,
    y: 20
  }} animate={inView ? {
    opacity: 1,
    y: 0
  } : {
    opacity: 0,
    y: 20
  }} transition={{
    duration: 0.6,
    delay: index * 0.07
  }} className="border-b group overflow-hidden" style={{
    borderColor: highlighted ? 'rgba(252,54,55,0.35)' : 'rgba(255,255,255,0.06)',
    transition: 'border-color 0.3s ease'
  }}>
    <div ref={itemRef}>
      <button onClick={() => setIsOpen(!isOpen)} className="w-full py-5 md:py-7 flex items-start justify-between text-left px-3 md:px-4 transition-colors gap-3" style={{
        background: highlighted ? 'rgba(252,54,55,0.03)' : 'transparent'
      }} onMouseEnter={e => {
        if (!highlighted) (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.02)';
      }} onMouseLeave={e => {
        (e.currentTarget as HTMLButtonElement).style.background = highlighted ? 'rgba(252,54,55,0.03)' : 'transparent';
      }}>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 md:gap-4 mb-2 flex-wrap">
            <span style={{
              color: B.crimson,
              fontSize: '10px',
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              fontFamily: 'Inter, sans-serif'
            }}>
              Category {index + 1}
            </span>
            <div style={{
              height: '1px',
              width: '24px',
              background: 'rgba(252,54,55,0.3)',
              flexShrink: 0
            }} />
          </div>
          <h3 className="mb-2" style={{
            color: B.white,
            fontSize: 'clamp(0.875rem, 2.5vw, 1.3rem)',
            fontWeight: 600,
            letterSpacing: '-0.03em',
            lineHeight: 1.15,
            fontFamily: 'Inter, sans-serif'
          }}>
            {item.title}
          </h3>
          <p style={{
            color: 'rgba(255,255,255,0.6)',
            fontSize: 'clamp(13px, 1.5vw, 16px)',
            fontWeight: 400,
            lineHeight: 1.75,
            marginTop: '8px',
            fontFamily: 'Inter, sans-serif'
          }}>
            {item.teaser}
          </p>
        </div>
        <div className="shrink-0 w-8 h-8 md:w-11 md:h-11 flex items-center justify-center transition-all mt-1" style={{
          border: '1px solid rgba(255,255,255,0.1)',
          color: isOpen ? B.crimson : B.white
        }}>
          {isOpen ? <Minus size={14} /> : <Plus size={14} />}
        </div>
      </button>
    </div>

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
        ease: [0.21, 0.47, 0.32, 0.98]
      }} className="overflow-hidden" style={{
        background: 'rgba(255,255,255,0.02)'
      }}>
        <div className="p-4 md:p-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 md:gap-5">
          {item.services.map((service, i) => <div key={`${item.id}-svc-${i}`} className="flex items-start gap-3">
            <div className="mt-1.5 shrink-0" style={{
              width: '5px',
              height: '5px',
              background: B.crimson
            }} />
            <span style={{
              fontSize: '13px',
              fontWeight: 500,
              color: 'rgba(255,255,255,0.8)',
              fontFamily: 'Inter, sans-serif',
              lineHeight: 1.5
            }}>
              {service}
            </span>
          </div>)}
        </div>
      </motion.div>}
    </AnimatePresence>
  </motion.div>;
};

// ─── HeroHeadline ─────────────────────────────────────────
const HeroHeadline = ({
  inView
}: {
  inView: boolean;
}) => {
  const line1Count = HERO_LINE_1.length;
  const line2Count = HERO_LINE_2.length;
  const headlineClass = 'flex flex-wrap leading-[0.95] tracking-[-0.045em]';
  const headlineStyle = {
    fontSize: 'clamp(26px, 5.5vw, 76px)',
    fontWeight: 600,
    gap: '0.12em',
    color: B.white
  };
  return <div className="flex flex-col gap-0">
    <h1 className={headlineClass} style={headlineStyle}>
      {HERO_LINE_1.map((word, i) => <span key={`l1-${word}-${i}`} style={{
        display: 'inline-block',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.7s cubic-bezier(0.25,0.46,0.45,0.94) ${i * 80}ms, transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94) ${i * 80}ms`
      }}>
        {word}
      </span>)}
    </h1>
    <h1 className={headlineClass} style={headlineStyle}>
      {HERO_LINE_2.map((word, i) => {
        const globalIdx = line1Count + i;
        const isSlash = word === '/';
        return <span key={`l2-${word}-${i}`} style={{
          display: 'inline-block',
          color: isSlash ? 'rgba(255,255,255,0.45)' : B.white,
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(40px)',
          transition: `opacity 0.7s cubic-bezier(0.25,0.46,0.45,0.94) ${globalIdx * 80}ms, transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94) ${globalIdx * 80}ms`
        }}>
          {word}
        </span>;
      })}
    </h1>
    <h1 className={headlineClass} style={headlineStyle}>
      {HERO_LINE_3.map((word, i) => {
        const globalIdx = line1Count + line2Count + i;
        return <span key={`l3-${word}-${i}`} style={{
          display: 'inline-block',
          color: '#FC3637',
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

// ─── Main Component ────────────────────────────────────────
export const InfluencerMarketingPage = () => {
  const [activeFilter, setActiveFilter] = React.useState<string>('all');
  const tickerItemsAll = [...TICKER_ITEMS, ...TICKER_ITEMS];
  usePrefersReducedMotion();
  const {
    ref: heroRef,
    inView: heroInView
  } = useBidirectionalInView<HTMLDivElement>(0.1);
  const servicesSectionRef = React.useRef<HTMLDivElement>(null);
  const handlePillClick = (id: string) => {
    setActiveFilter(id);
    if (servicesSectionRef.current) {
      servicesSectionRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };
  return <div className="page-root w-full font-sans selection:text-white" style={{
    background: B.white,
    color: B.charcoal,
    fontFamily: 'Inter, sans-serif'
  }}>
    <style>{GLOBAL_STYLES}</style>
    <Header />

    {/* ── HERO SECTION ─── */}
    <header className="relative flex flex-col justify-end items-start overflow-hidden" style={{
      background: '#111111',
      minHeight: '100svh'
    }}>
      <div className="absolute inset-0 z-0">
        <img src="/influencer-marketing.jpg" alt="Hero Background" className="w-full h-full object-cover opacity-30 grayscale" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/40 to-transparent" />

      </div>

      <div ref={heroRef} className="relative z-10 w-full px-4 md:px-8 lg:px-16 pb-6 md:pb-8 lg:pb-10" style={{
        maxWidth: '100%',
        marginTop: 'auto'
      }}>
        {/* Eyebrow */}
        <div className="mb-4">
          <p style={{
            color: '#FC3637',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            marginBottom: '8px',
            fontFamily: 'Inter, sans-serif'
          }}>
            Premium Service Offerings
          </p>
          <div style={{
            width: '48px',
            height: '2px',
            background: '#FC3637'
          }} />
        </div>

        {/* Headline */}
        <div className="mb-6 md:mb-8">
          <HeroHeadline inView={heroInView} />
        </div>

        {/* CTA buttons — side-by-side */}
        <div className="flex flex-row flex-wrap items-center justify-start gap-4 mb-5">
          <a href="/contact" className="cta-primary group">
            <span>Partner With Us</span>
            <div className="cta-icon-container">
              <ArrowUpRight size={14} className="text-[#1E1E1E]" />
            </div>
          </a>
          <a href="#services" className="cta-secondary group">
            <span>Our Advisory Work</span>
          </a>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap justify-start gap-2">
          {HERO_TAGS_DATA.map(tag => <span key={tag.id} style={{
            display: 'inline-flex',
            alignItems: 'center',
            border: '1px solid rgba(255,255,255,0.18)',
            paddingLeft: '10px',
            paddingRight: '10px',
            paddingTop: '5px',
            paddingBottom: '5px',
            fontSize: '10px',
            fontWeight: 500,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.65)',
            background: 'transparent',
            fontFamily: 'Inter, sans-serif',
            whiteSpace: 'nowrap'
          }}>
            {tag.label}
          </span>)}
        </div>
      </div>

      {/* Scroll indicator — only desktop */}
      <div className="hidden lg:flex absolute bottom-6 right-12 flex-col items-center gap-3">
        <div className="w-[1px] h-10" style={{
          background: `linear-gradient(to bottom, ${B.crimson}, transparent)`
        }} />
        <span style={{
          fontSize: '10px',
          color: 'rgba(255,255,255,0.4)',
          fontWeight: 600,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          writingMode: 'vertical-lr',
          fontFamily: 'Inter, sans-serif'
        }}>
          Scroll
        </span>
      </div>
    </header>

    {/* ── TICKER STRIP ─── */}
    <div className="py-2.5 md:py-3 overflow-hidden" style={{
      background: B.crimson,
      borderTop: '1px solid rgba(255,255,255,0.1)',
      borderBottom: '1px solid rgba(255,255,255,0.1)'
    }}>
      <div className="ticker-track">
        {tickerItemsAll.map((text, i) => <div key={`tick-${i}`} className="flex items-center mx-5 md:mx-8">
          <span className="whitespace-nowrap font-semibold" style={{
            color: B.white,
            fontSize: 'clamp(0.6rem, 1.5vw, 0.85rem)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            fontFamily: 'Inter, sans-serif'
          }}>
            {text}
          </span>
          <div className="ml-8 md:ml-14 rotate-45" style={{
            width: '6px',
            height: '6px',
            background: B.white,
            flexShrink: 0
          }} />
        </div>)}
      </div>
    </div>

    {/* ── ADVISORY SCOPE ─── */}
    <section id="services" className="px-4 md:px-8 lg:px-12 w-full" style={{
      background: '#0D0D0D',
      overflow: 'hidden',
      position: 'relative',
      borderBottom: '1px solid rgba(255,255,255,0.06)'
    }}>
      <div className="max-w-[1440px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-20 xl:gap-28">

          {/* Left: heading column */}
          <div className="lg:col-span-5 pt-10 pb-6 md:pt-14 md:pb-8 lg:py-28 xl:py-36">
            <Eyebrow light={true}>Advisory Scope</Eyebrow>
            <h2 className="font-bold uppercase mb-5 md:mb-7" style={{
              color: B.white,
              fontSize: 'clamp(1.6rem, 4.5vw, 3.75rem)',
              letterSpacing: '-0.04em',
              lineHeight: 0.92,
              fontFamily: 'Inter, sans-serif',
              margin: 0
            }}>
              Reshaping Brands through Cultural Relevance
            </h2>
            <div className="space-y-4 md:space-y-5">
              <p style={{
                color: 'rgba(255,255,255,0.7)',
                fontSize: 'clamp(14px, 1.4vw, 16px)',
                fontWeight: 400,
                lineHeight: 1.8,
                fontFamily: 'Inter, sans-serif'
              }}>
                The rapid growth of the Creator Economy has fundamentally reshaped how brands build awareness, earn trust, influence purchasing decisions, drive engagement, and remain culturally relevant.
              </p>
              <p style={{
                color: 'rgba(255,255,255,0.7)',
                fontSize: 'clamp(14px, 1.4vw, 16px)',
                fontWeight: 400,
                lineHeight: 1.8,
                fontFamily: 'Inter, sans-serif'
              }}>
                Our strategic advisory service bridges the gap between traditional corporate objectives and the nuanced dynamics of modern influence, ensuring your brand isn't just present, but resonant.
              </p>
            </div>
          </div>

          {/* Right: filter + accordion */}
          <div className="lg:col-span-7 pb-10 md:pb-14 lg:py-28 xl:py-36 w-full min-w-0">
            {/* Pill filters */}
            <div ref={servicesSectionRef} className="mb-5 pb-4 border-b w-full" style={{
              borderColor: 'rgba(255,255,255,0.1)'
            }}>
              <div className="pill-scroll-container">
                <button onClick={() => handlePillClick('all')} className={cn('pill-filter', activeFilter === 'all' ? 'active' : 'inactive')}>
                  All
                </button>
                {SERVICES.map(service => <button key={service.id} onClick={() => handlePillClick(service.id)} className={cn('pill-filter', activeFilter === service.id ? 'active' : 'inactive')}>
                  {service.pillLabel}
                </button>)}
              </div>
            </div>

            <div className="border-t w-full" style={{
              borderColor: 'rgba(255,255,255,0.06)'
            }}>
              {SERVICES.map((item, i) => {
                const isVisible = activeFilter === 'all' || activeFilter === item.id;
                if (!isVisible) return null;
                return <ServiceAccordionItem key={item.id} item={item} index={i} highlighted={activeFilter === item.id} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </section>



    {/* ── TEAM FACULTY ─── */}
    <section className="py-12 md:py-20 lg:py-32 px-4 md:px-8 lg:px-12 w-full overflow-hidden" style={{
      background: B.white,
      display: 'none'
    }}>
      <div className="max-w-[1440px] mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-14 gap-5 md:gap-8">
          <div className="w-full md:max-w-xl">
            <Eyebrow>The Faculty</Eyebrow>
            <h2 className="font-bold uppercase" style={{
              color: B.charcoal,
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
            color: B.gray,
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
          {FACULTY.map(member => <div key={member.id} className="group transition-all w-full overflow-hidden" style={{
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
                background: B.white
              }}>
                <h3 className="font-bold uppercase mb-1" style={{
                  color: B.charcoal,
                  fontSize: 'clamp(1rem, 2.5vw, 1.65rem)',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.05,
                  fontFamily: 'Inter, sans-serif'
                }}>
                  {member.name}
                </h3>
                <p className="pb-4 mb-4 md:mb-5" style={{
                  color: B.crimson,
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
                  color: B.gray,
                  fontSize: '14px',
                  fontWeight: 400,
                  lineHeight: 1.75,
                  fontStyle: 'italic',
                  fontFamily: 'Inter, sans-serif'
                }}>
                  <span>"</span><span>{member.description}</span><span>"</span>
                </p>
                <div className="mt-5 flex gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer" style={{
                    background: 'rgba(0,0,0,0.05)',
                    color: B.charcoal
                  }} onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.background = B.crimson;
                    (e.currentTarget as HTMLDivElement).style.color = B.white;
                  }} onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.background = 'rgba(0,0,0,0.05)';
                    (e.currentTarget as HTMLDivElement).style.color = B.charcoal;
                  }}>
                    <Linkedin size={14} />
                  </div>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer" style={{
                    background: 'rgba(0,0,0,0.05)',
                    color: B.charcoal
                  }} onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.background = B.crimson;
                    (e.currentTarget as HTMLDivElement).style.color = B.white;
                  }} onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.background = 'rgba(0,0,0,0.05)';
                    (e.currentTarget as HTMLDivElement).style.color = B.charcoal;
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

    {/* ── CALL TO ACTION ─── */}
    <section className="relative overflow-hidden py-14 md:py-28 lg:py-40 px-4 md:px-8 lg:px-12 w-full" style={{
      background: B.crimson
    }}>
      {/* Texture overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")",
        backgroundRepeat: 'repeat',
        backgroundSize: '200px 200px',
        opacity: 0.06,
        pointerEvents: 'none'
      }} />
      {/* Ghost text — only desktop */}
      <div className="hidden md:block" style={{
        position: 'absolute',
        right: '-2%',
        top: '50%',
        transform: 'translateY(-50%)',
        fontFamily: 'Inter, sans-serif',
        fontSize: 'clamp(80px, 18vw, 280px)',
        fontWeight: 900,
        letterSpacing: '-0.07em',
        color: 'rgba(255,255,255,0.06)',
        lineHeight: 0.85,
        userSelect: 'none',
        pointerEvents: 'none',
        whiteSpace: 'nowrap'
      }}>
        <span>INFLUENCE</span>
      </div>

      <div className="max-w-[1440px] mx-auto text-center w-full" style={{
        position: 'relative',
        zIndex: 1
      }}>
        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-4 mb-5 md:mb-7">
          <div style={{
            width: '36px',
            height: '2px',
            background: 'rgba(255,255,255,0.5)'
          }} />
          <span style={{
            color: 'rgba(255,255,255,0.8)',
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            fontFamily: 'Inter, sans-serif'
          }}>
            Get Started
          </span>
          <div style={{
            width: '36px',
            height: '2px',
            background: 'rgba(255,255,255,0.5)'
          }} />
        </div>

        {/* Headline */}
        <h2 className="font-bold uppercase mb-5 md:mb-7 mx-auto" style={{
          color: B.white,
          fontSize: 'clamp(1.6rem, 7vw, 6rem)',
          letterSpacing: '-0.04em',
          lineHeight: 0.93,
          fontFamily: 'Inter, sans-serif',
          maxWidth: '16ch'
        }}>
          Ready to Harness the Power of Influence?
        </h2>

        {/* Sub-line */}
        <p className="mb-8 md:mb-12 mx-auto" style={{
          color: 'rgba(255,255,255,0.75)',
          fontSize: 'clamp(15px, 1.8vw, 20px)',
          fontWeight: 400,
          lineHeight: 1.65,
          maxWidth: '520px',
          fontFamily: 'Inter, sans-serif'
        }}>
          Let's build your creator strategy, grow your audience and drive real cultural impact.
        </p>

        {/* CTAs */}
        <a href="/contact" className="cta-primary group" style={{ background: '#ffffff', color: '#FC3637' }}>
          <span>Start a Conversation</span>
          <div className="cta-icon-container" style={{ background: '#FC3637' }}>
            <ArrowUpRight size={14} className="text-white" />
          </div>
        </a>
        <a href="#services" className="cta-secondary group">
          <span>Explore Our Services</span>
        </a>
      </div>
    </section>

    {/* ── FOOTER ─── */}
    <Footer />
  </div>;
};
