import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Plus, Minus, ChevronDown, Linkedin, Instagram } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { AfricaWatermark } from '../AfricaWatermark';

// ─── Custom Hooks ────────────────────────────────────────────────────────────

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
function useWindowWidth() {
  const [width, setWidth] = React.useState(() => typeof window !== 'undefined' ? window.innerWidth : 1440);
  React.useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', onResize, {
      passive: true
    });
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return width;
}

// ─── Constants & Data ─────────────────────────────────────────────────────────

const ACCENT = '#FC3637';
const ACCENT_HOVER = '#E02F30';
const FOREGROUND = '#1A1A1A';
const BODY_MUTED = '#757575';

const TICKER_TEXT = 'Digital Strategy → AI Innovation → Content Leadership → Performance Marketing → Social Media → Community Building → MarTech → Automation → Search & SEO → Reputation Management → Data Analytics → Growth Intelligence → Demand Generation → Executive Influence → Market Leadership · ';
const SERVICES = [{
  title: 'Digital Strategy, Transformation & Growth',
  teaser: 'Empowering organisations to build future-ready digital enterprises that accelerate growth, unlock new revenue streams, enhance customer experiences and create sustainable competitive advantage.',
  items: ['Digital Strategy & Growth Advisory', 'Enterprise Digital Transformation', 'Growth Marketing Strategy', 'Customer Acquisition & Retention Strategy', 'Digital Business Model Innovation', 'Digital Ecosystem Design & Development', 'Digital Maturity & Capability Assessments', 'Omnichannel Customer Experience Strategy', 'Customer Journey Design & Optimisation', 'Conversion & Revenue Growth Strategy', 'Market Expansion & Go-To-Market Strategy', 'Digital Innovation & Emerging Technologies Advisory', 'Future of Marketing & Customer Engagement Consulting', 'Digital Commerce & Platform Strategy', 'Business Growth Acceleration Programmes'],
  contextualCta: null
}, {
  title: 'Artificial Intelligence (AI) Strategy, Innovation & Enablement',
  teaser: 'Harnessing the power of Artificial Intelligence to drive efficiency, personalisation, customer intelligence, decision-making, innovation and business performance at scale.',
  items: ['AI Strategy & Transformation Roadmaps', 'AI Readiness Governance & Adoption Frameworks', 'Generative AI Integration & Enablement', 'AI-Powered Marketing & Customer Engagement', 'Intelligent Content Creation & Automation', 'Hyper-Personalisation Solutions', 'Predictive Analytics & Forecasting', 'AI-Powered Customer Experience Platforms', 'Conversational AI & Intelligent Assistants', 'AI Search & Discoverability Optimisation', 'Intelligent Lead Scoring & Qualification', 'AI Audience Intelligence & Segmentation', 'AI Campaign Optimisation & Performance Enhancement', 'Marketing & Workflow Automation', 'Knowledge Management & AI Productivity Solutions', 'Responsible AI & Governance Programmes'],
  contextualCta: 'Book an AI Discovery Call'
}, {
  title: 'Content Strategy, Thought Leadership & Content Intelligence',
  teaser: 'Designing strategic content ecosystems that position brands, executives and organisations as trusted authorities, market leaders and influential voices.',
  items: ['Content Strategy & Editorial Architecture', 'Thought Leadership Platforms', 'Executive Positioning & Personal Branding Content', 'Corporate Storytelling & Brand Narratives', 'Brand Journalism & Reputation Content', 'Research Reports White Papers & Industry Insights', 'Case Studies & Impact Narratives', 'Podcasts & Audio Content Programmes', 'Video Content Strategy & Production', 'Social Media Content Ecosystems', 'Content Studios & Production Hubs', 'Multi-Platform Content Distribution', 'Content Repurposing & Amplification Strategies', 'Content Governance Frameworks', 'Audience Engagement & Content Communities', 'Content Intelligence & Performance Insights', 'Knowledge Management Platforms'],
  contextualCta: 'Download Capabilities Deck'
}, {
  title: 'Performance Marketing & Demand Generation',
  teaser: 'Driving measurable growth through data-led marketing strategies that accelerate customer acquisition, pipeline growth, conversion and revenue performance.',
  items: ['Performance Marketing Strategy', 'Demand Generation & Pipeline Development', 'Lead Generation & Customer Acquisition', 'Revenue Marketing Programmes', 'Conversion Rate Optimisation (CRO)', 'Search Engine Marketing (SEM)', 'Paid Search & Google Advertising', 'Paid Social Media Advertising', 'Programmatic Media Buying', 'Retargeting & Audience Re-Engagement', 'Marketing Funnel Design & Optimisation', 'Landing Page Strategy & Conversion Design', 'Growth Marketing Programmes', 'Account-Based Marketing (ABM)', 'B2B & B2C Demand Generation', 'Customer Lifetime Value Optimisation', 'Marketing ROI Acceleration'],
  contextualCta: 'Accelerate Your Growth'
}, {
  title: 'Social Media, Community Building & Creator Economy',
  teaser: 'Building influential digital communities, trusted brand advocates and creator ecosystems that drive engagement, relevance, loyalty and commercial value.',
  items: ['Social Media Strategy & Governance', 'Community Building & Audience Development', 'Influencer & Creator Economy Programmes', 'Strategic Influencer Partnerships', 'Social Commerce Strategies', 'Executive Social Media Positioning', 'Employee Advocacy Programmes', 'Audience Growth & Engagement Campaigns', 'Digital Advocacy & Brand Ambassador Programmes', 'Community Intelligence & Insights', 'Social Listening & Trend Analysis', 'Digital Reputation Management', 'Online Community Management', 'Creator-Led Campaign Development', 'Stakeholder Engagement Communities'],
  contextualCta: null
}, {
  title: 'Marketing Technology (MarTech) & Automation',
  teaser: 'Connecting technology, data and customer engagement to create intelligent, scalable and high-performing marketing ecosystems.',
  items: ['Marketing Technology Strategy', 'Marketing Automation Platforms', 'CRM Strategy & Integration', 'Customer Data Platforms (CDPs)', 'Customer Lifecycle Marketing', 'Lead Nurturing & Automation', 'Personalisation Platforms', 'Workflow Automation & Productivity Solutions', 'Marketing Operations Optimisation', 'Sales & Marketing Alignment', 'Lead Management Systems', 'Customer Experience Platforms', 'Martech Audits & Transformation', 'Data Integration & Marketing Infrastructure', 'Revenue Operations (RevOps)'],
  contextualCta: null
}, {
  title: 'Search, Visibility & Digital Reputation',
  teaser: 'Strengthening digital authority, discoverability and trust through search intelligence, reputation management and executive visibility strategies.',
  items: ['Search Engine Optimisation (SEO)', 'AI Search Optimisation (AISO)', 'Technical SEO & Search Architecture', 'Content SEO & Authority Building', 'Local Search & Location Visibility', 'Digital Reputation Management', 'Online Reputation Monitoring', 'Search Visibility & Authority Strategies', 'Executive Digital Presence', 'Knowledge Panel Development', 'Trust & Credibility Programmes', 'Online Review & Reputation Management', 'Search Intelligence & Competitive Analysis', 'Organic Growth & Visibility Programmes'],
  contextualCta: null
}, {
  title: 'Data, Analytics & Marketing Intelligence',
  teaser: 'Transforming data into actionable intelligence that drives strategic decision-making, growth, performance optimisation and competitive advantage.',
  items: ['Marketing Intelligence & Insights', 'Audience Intelligence & Segmentation', 'Customer Insights & Behavioural Analysis', 'Digital Analytics & Measurement', 'Campaign Performance Intelligence', 'Attribution Modelling', 'Predictive Analytics & Forecasting', 'Customer Lifetime Value Analysis', 'Business Intelligence Dashboards', 'Marketing Data Visualisation', 'Performance Benchmarking', 'Growth Analytics & Opportunity Mapping', 'ROI Measurement & Optimisation', 'Executive Reporting Dashboards', 'Strategic Insights & Recommendations'],
  contextualCta: null
}];

// Visual break cards inserted into the accordion at specific positions (after index 1, 4)
const ACCORDION_BREAKS = [{
  afterIndex: 1,
  stat: '8×',
  label: 'Average ROI Multiplier',
  quote: 'Organisations that invest in integrated digital and AI strategies consistently outperform competitors by a factor of eight in measurable growth metrics.',
  image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1600'
}, {
  afterIndex: 4,
  stat: '94%',
  label: 'Client Retention Rate',
  quote: 'Our advisory relationships are built on trust, rigour and results — the reason nine in ten clients return to deepen their engagement with EmpowaWorx.',
  image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1600'
}];
const PREMIUM_OFFERINGS = [{
  id: 'offering-1',
  title: 'Digital Growth & Transformation',
  description: 'Digital Strategy, Digital Transformation, Growth Marketing, Customer Acquisition, Revenue Growth Optimisation, Customer Experience Design, Marketing Technology, Digital Ecosystem Development, Demand Generation, Business Intelligence, Data Analytics and ROI Measurement.'
}, {
  id: 'offering-2',
  title: 'AI Innovation & Intelligence',
  description: 'AI Strategy, Generative AI, Intelligent Automation, AI-Powered Marketing, Predictive Analytics, Conversational AI, AI Search Optimisation, Customer Intelligence, Lead Scoring, Campaign Optimisation, Responsible AI and Enterprise AI Adoption.'
}, {
  id: 'offering-3',
  title: 'Content Leadership & Influence',
  description: 'Thought Leadership Platforms, Executive Positioning, Content Strategy, Corporate Storytelling, Brand Journalism, Research Reports, White Papers, Podcasts, Video Content, Knowledge Platforms, Content Studios and Audience Engagement Programmes.'
}, {
  id: 'offering-4',
  title: 'Performance Marketing & Revenue Acceleration',
  description: 'Performance Marketing, Demand Generation, Paid Media, Search Marketing, Programmatic Advertising, Lead Generation, Conversion Optimisation, Revenue Marketing, Funnel Optimisation, Pipeline Acceleration and Growth Analytics.'
}, {
  id: 'offering-5',
  title: 'Community, Creator & Influence Economy',
  description: 'Social Media Strategy, Community Building, Influencer Marketing, Creator Economy Campaigns, Social Commerce, Employee Advocacy, Digital Advocacy, Audience Growth, Social Intelligence and Reputation Management.'
}, {
  id: 'offering-6',
  title: 'Marketing Technology & Customer Engagement',
  description: 'Marketing Automation, CRM Integration, Customer Data Platforms, Lifecycle Marketing, Personalisation, Workflow Automation, Martech Transformation, Revenue Operations and Customer Experience Optimisation.'
}, {
  id: 'offering-7',
  title: 'Search, Authority & Digital Reputation',
  description: 'SEO, AI Search Optimisation, Search Intelligence, Digital Reputation Management, Executive Visibility, Authority Building, Online Reputation Monitoring and Organic Growth Strategies.'
}, {
  id: 'offering-8',
  title: 'Data Intelligence & Growth Analytics',
  description: 'Audience Intelligence, Customer Insights, Predictive Analytics, Attribution Modelling, Business Intelligence, Performance Analytics, Growth Measurement, Data Visualisation and Strategic Decision Intelligence.'
}, {
  id: 'offering-9',
  title: 'Integrated Campaigns & Market Growth',
  description: 'Integrated Marketing Campaigns, Brand Awareness, Product Launches, Customer Engagement, Demand Creation, Market Expansion, Omnichannel Experiences and Growth Acceleration Programmes.'
}, {
  id: 'offering-10',
  title: 'Executive Influence & Market Leadership',
  description: 'CEO Positioning, Executive Branding, Thought Leadership Platforms, Corporate Influence Programmes, Stakeholder Engagement, Authority Marketing, Trust Building and Digital Influence Strategies.'
}];
const SIGNATURE_SOLUTIONS = [{
  id: 'sig-1',
  name: 'AIInfluence',
  description: 'Transforming Artificial Intelligence into a strategic advantage that amplifies visibility, influence, stakeholder engagement and market leadership.',
  accent: ACCENT
}, {
  id: 'sig-2',
  name: 'AIGrowth',
  description: 'Harnessing AI, automation and predictive intelligence to accelerate revenue growth, customer acquisition and business performance.',
  accent: '#ffffff'
}, {
  id: 'sig-3',
  name: 'ContentInfluence',
  description: 'Building high-impact content ecosystems that establish authority, strengthen reputation and shape industry conversations.',
  accent: ACCENT
}, {
  id: 'sig-4',
  name: 'PerformanceGrowth',
  description: 'Driving measurable business outcomes through data-driven customer acquisition, conversion optimisation and revenue acceleration.',
  accent: '#ffffff'
}, {
  id: 'sig-5',
  name: 'DigitalReputation',
  description: 'Protecting, strengthening and elevating brand and executive reputation in an increasingly connected and transparent world.',
  accent: ACCENT
}, {
  id: 'sig-6',
  name: 'MarketingIntelligence',
  description: 'Converting customer, audience and market data into actionable intelligence, strategic insight and competitive advantage.',
  accent: '#ffffff'
}, {
  id: 'sig-7',
  name: 'CommunityCapital',
  description: 'Building thriving digital communities, creator networks and stakeholder ecosystems that generate influence, advocacy and commercial value.',
  accent: ACCENT
}, {
  id: 'sig-8',
  name: 'DigitalLegacy',
  description: 'Creating enduring digital assets, knowledge platforms and content ecosystems that continue delivering value, relevance and impact long into the future.',
  accent: '#ffffff'
}];
const EASE_SMOOTH = [0.21, 0.47, 0.32, 0.98] as [number, number, number, number];
const HERO_LINE_1 = [{
  word: 'Digital,',
  red: false
}, {
  word: 'AI,',
  red: false
}];
const HERO_LINE_2 = [{
  word: '/',
  red: false,
  white: true
}, {
  word: 'Content',
  red: false
}, {
  word: '&',
  red: false
}];
const HERO_LINE_3 = [{
  word: 'Growth.',
  red: true
}, {
  word: 'advisory',
  red: false
}];
const HERO_LINES = [HERO_LINE_1, HERO_LINE_2, HERO_LINE_3];
const HERO_TAGS = [{
  id: 'tag-digital',
  label: 'Digital Strategy'
}, {
  id: 'tag-ai',
  label: 'AI Innovation'
}, {
  id: 'tag-perf',
  label: 'Performance Marketing'
}];
const HERO_INTRO = 'EmpowaWorx partners with ambitious organisations to harness the power of Digital, Artificial Intelligence, Content and Performance Marketing to accelerate growth, strengthen reputation, deepen stakeholder engagement and unlock sustainable competitive advantage.';

const ACCORDION_IMAGES = [
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800', // Digital Strategy
  'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&q=80&w=800', // AI Strategy
  'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=800', // Content Strategy
  'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=800', // Performance Marketing
  'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=800', // Social Media
  'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800', // MarTech
  'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800', // Search & Visibility
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800'  // Data & Analytics
];

// ─── Faculty Data ─────────────────────────────────────────────────────────────

const FACULTY_MEMBERS = [{
  id: 'f1',
  name: 'Dr Mzamo Masito',
  title: 'Strategic Advisor | Digital Transformation, Brand Growth & Marketing Leadership',
  description: 'Dr Mzamo Masito is a highly respected marketing, digital transformation and business growth executive with extensive experience leading large-scale brand, customer experience, digital innovation and commercial transformation initiatives across leading African and global organisations. He provides strategic leadership on digital transformation, customer-centric growth strategies, AI-enabled marketing innovation, brand leadership and organisational digital maturity, helping clients accelerate growth, strengthen competitiveness and unlock measurable business value.',
  image: '/Mzamo-Masito.jpg'
}, {
  id: 'f2',
  name: 'Mushambi Mutuma',
  title: 'Digital Strategy, Innovation & Emerging Technologies',
  description: 'Mushambi Mutuma is a recognised digital strategist, innovation leader and future-focused marketing specialist with extensive experience in digital transformation, emerging technologies, innovation ecosystems and growth acceleration. He leads the development of intelligence-driven digital strategies, AI adoption frameworks, innovation programmes and technology-enabled business models that help organisations remain competitive in an increasingly digital economy.',
  image: '/Mushambi Mutuma.png'
}, {
  id: 'f3',
  name: 'Miyelani Baloyi',
  title: 'Performance Marketing, Growth & Demand Generation',
  description: 'Miyelani Baloyi is a performance marketing and growth specialist with expertise in customer acquisition, lead generation, digital advertising, conversion optimisation and revenue growth. He designs and executes data-driven marketing campaigns across digital channels that transform audience engagement into measurable business outcomes, customer growth and commercial performance.',
  image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80'
}, {
  id: 'f4',
  name: 'Carshiefa Sissing',
  title: 'Digital Marketing, Social Media & Community Engagement',
  description: 'Carshiefa Sissing is a digital marketing and social media professional with extensive experience in content marketing, community management, social media strategy, stakeholder engagement and digital brand building. She leads the development and execution of integrated digital campaigns that strengthen audience engagement, increase visibility, grow online communities and enhance brand influence across multiple platforms.',
  image: '/Carshiefa-Sissing.jpg'
}, {
  id: 'f5',
  name: 'Thapelo',
  title: 'Digital Operations, Campaign Coordination & Marketing Support',
  description: 'Thapelo is a digital operations and campaign coordination professional responsible for supporting the seamless execution of digital marketing initiatives, stakeholder communications, campaign administration, content scheduling and operational delivery. He plays a critical role in ensuring efficient project coordination, workflow management and execution excellence across digital programmes and campaigns.',
  image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=80'
}, {
  id: 'f6',
  name: 'Dr Puleng Mokhoalibe',
  title: 'AI Strategy, Research & Digital Intelligence',
  description: 'Dr Puleng Mokhoalibe is an accomplished technology, artificial intelligence and research specialist with expertise in AI strategy, digital innovation, data-driven decision-making and emerging technology ecosystems. She advises organisations on the responsible adoption of artificial intelligence, digital intelligence frameworks, innovation strategy and future workforce readiness, enabling sustainable transformation and competitive advantage.',
  image: '/Dr-Puleng-Mokhoalibe.jpg'
}];

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
      color: light ? 'rgba(255,255,255,0.6)' : ACCENT,
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

// ─── Shared Components ───────────────────────────────────────────────────────

const SectionHeader = ({
  title,
  subtitle,
  dark = false
}: {
  title: string;
  subtitle?: string;
  dark?: boolean;
}) => {
  const {
    ref,
    inView
  } = useBidirectionalInView<HTMLDivElement>(0.2);
  return <div ref={ref} className="mb-10 md:mb-16">
    <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={inView ? {
      opacity: 1,
      y: 0
    } : {
      opacity: 0,
      y: 20
    }} transition={{
      duration: 0.8,
      ease: EASE_SMOOTH
    }}>
      <div className="flex items-center gap-4 mb-6">
        <div className="h-[2px] w-12 shrink-0" style={{
          backgroundColor: ACCENT
        }} />
        <span style={{
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: dark ? 'rgba(255,255,255,0.5)' : ACCENT
        }}>
          {title}
        </span>
      </div>
      {subtitle && <h2 style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: 'clamp(1.75rem, 5vw, 4rem)',
        fontWeight: 700,
        letterSpacing: '-0.033em',
        lineHeight: 1.1,
        color: dark ? '#ffffff' : FOREGROUND
      }}>
        {subtitle}
      </h2>}
    </motion.div>
  </div>;
};

// ─── Main Page Component ─────────────────────────────────────────────────────

export const DigitalMarketingPage = () => {
  const scrollY = useScrollDirection();
  const windowWidth = useWindowWidth();
  const reducedMotion = usePrefersReducedMotion();
  const heroParallaxY = reducedMotion ? 0 : scrollY * 0.4;
  const [expandedService, setExpandedService] = React.useState<number | null>(null);
  const [hoveredService, setHoveredService] = React.useState<number | null>(null);
  const [hoveredOutcome, setHoveredOutcome] = React.useState<number | null>(null);
  const [hoveredCta, setHoveredCta] = React.useState<'secondary' | null>(null);
  const [introExpanded, setIntroExpanded] = React.useState(false);
  const serviceRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  void windowWidth;
  const globalStyles = `
    .dm-page *, .dm-page *::before, .dm-page *::after {
      box-sizing: border-box;
      border-radius: 0 !important;
      font-family: 'Inter', system-ui, sans-serif !important;
    }

    @keyframes ticker {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    .ticker-animate {
      display: flex;
      width: fit-content;
      animation: ticker 30s linear infinite;
      will-change: transform;
    }

    .custom-scrollbar::-webkit-scrollbar { width: 6px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: ${ACCENT}; }

    .hero-cta-primary:hover { background-color: ${ACCENT_HOVER} !important; }
    .hero-cta-secondary:hover { border-color: #ffffff !important; }

    /* Progressive intro expansion */
    .intro-extra {
      overflow: hidden;
      transition: max-height 0.55s cubic-bezier(0.21, 0.47, 0.32, 0.98), opacity 0.45s ease;
    }
    .intro-extra.collapsed { max-height: 0; opacity: 0; }
    .intro-extra.expanded  { max-height: 600px; opacity: 1; }

    /* Signature solutions learn-more CTA arrow transition */
    .sig-learn-more-arrow {
      display: inline-block;
      transition: transform 0.25s ease;
    }
    .sig-learn-more-arrow {
      transform: translateX(0);
    }
    .sig-card-learn-more:hover .sig-learn-more-arrow {
      transform: translateX(4px);
    }
    .sig-card-learn-more:hover span {
      text-decoration: underline;
    }

    /* Mobile-specific overrides */
    @media (max-width: 767px) {
      .accordion-btn { min-height: 64px; padding: 16px !important; }
      .mobile-body-text { font-size: 15px !important; line-height: 1.7 !important; }
      .hero-cta-row { flex-direction: column !important; align-items: stretch !important; }
      .hero-cta-row > button { width: 100% !important; justify-content: center !important; }
      .final-cta-buttons { flex-direction: column !important; width: 100% !important; }
      .final-cta-buttons > button { width: 100% !important; }
    }

    /* Tablet-specific overrides */
    @media (min-width: 768px) and (max-width: 1023px) {
      .accordion-btn { min-height: 56px; }
    }
  `;
  return <div className="dm-page bg-white min-h-screen overflow-x-clip w-full" style={{
    fontFamily: "'Inter', system-ui, sans-serif",
    WebkitFontSmoothing: 'antialiased'
  }}>
    <style>{globalStyles}</style>
    <Header />      {/* ── HERO SECTION ── */}
    <section className="relative w-full overflow-hidden" style={{
      backgroundColor: '#111111',
      minHeight: '100svh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'flex-start'
    }}>
      <div className="absolute inset-0 z-0">
        <motion.div className="absolute inset-[-10%] z-0" style={{
          y: heroParallaxY
        }}>
          <img src="/digital.jpg" alt="Digital Abstract Background" className="w-full h-full object-cover grayscale brightness-[0.4] contrast-[1.1]" style={{ objectPosition: 'center 30%' }} />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />
      </div>



      <div className="relative z-10 w-full" style={{
        paddingLeft: 'clamp(16px, 5vw, 96px)',
        paddingRight: 'clamp(16px, 5vw, 96px)',
        paddingTop: 'clamp(80px, 8vh, 120px)',
        paddingBottom: 'clamp(40px, 5vh, 60px)',
        marginTop: 'auto'
      }}>
        <div className="max-w-7xl">
          {/* Eyebrow */}
          <motion.div initial={{
            opacity: 0,
            y: 16
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.7,
            ease: EASE_SMOOTH
          }} className="mb-4 sm:mb-5">
            <span style={{
              color: ACCENT,
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '6px'
            }}>
              Digital, AI, Content &amp; Performance Marketing Practice
            </span>
            <div style={{
              width: '48px',
              height: '2px',
              backgroundColor: ACCENT
            }} />
          </motion.div>

          {/* Headline */}
          <div className="flex flex-col mb-6 sm:mb-8">
            {HERO_LINES.map((lineWords, lineIdx) => <div key={`line-${lineIdx}`} className="flex flex-wrap gap-x-[0.2em] capitalize">
              {lineWords.map((wordDef, wordIdx) => {
                const globalIdx = HERO_LINES.slice(0, lineIdx).reduce((acc, l) => acc + l.length, 0) + wordIdx;
                return <motion.span key={`${lineIdx}-${wordIdx}`} initial={{
                  opacity: 0,
                  y: 40
                }} animate={{
                  opacity: 1,
                  y: 0
                }} transition={{
                  duration: 0.7,
                  delay: globalIdx * 0.08,
                  ease: EASE_SMOOTH
                }} style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 'clamp(32px, 5.5vw, 80px)',
                  fontWeight: 700,
                  letterSpacing: '-0.04em',
                  lineHeight: 0.95,
                  color: (wordDef as {
                    word: string;
                    red: boolean;
                    white?: boolean;
                  }).white ? 'rgba(255,255,255,0.6)' : wordDef.red ? ACCENT : '#ffffff',
                  display: 'inline-block'
                }}>
                  {wordDef.word}
                </motion.span>;
              })}
            </div>)}
          </div>            {/* CTAs ── stack on mobile, row on sm+ */}
          <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8,
            delay: 0.5,
            ease: EASE_SMOOTH
          }} className="hero-cta-row flex flex-col sm:flex-row gap-3 sm:gap-6">
            <a href="/contact" className="cta-primary group h-[56px] min-w-[200px]">
              <span>Partner With Us</span>
              <div className="cta-icon-container">
                <ArrowUpRight size={14} className="text-[#1E1E1E]" />
              </div>
            </a>

            <a href="#advisory-capabilities" className="cta-secondary group h-[56px] min-w-[180px]">
              <span>Our Advisory Work</span>
            </a>
          </motion.div>

          {/* Editorial Tag Pills */}
          <motion.div initial={{
            opacity: 0,
            y: 16
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8,
            delay: 0.7,
            ease: EASE_SMOOTH
          }} className="flex flex-wrap gap-2 sm:gap-3" style={{
            marginTop: '1.25rem',
            overflowX: 'hidden'
          }}>
            {HERO_TAGS.map(tag => <span key={tag.id} style={{
              border: '1px solid rgba(255,255,255,0.2)',
              paddingLeft: '12px',
              paddingRight: '12px',
              paddingTop: '7px',
              paddingBottom: '7px',
              color: 'rgba(255,255,255,0.7)',
              textTransform: 'uppercase',
              fontSize: '9px',
              letterSpacing: '0.1em',
              fontWeight: 500
            }}>
              {tag.label}
            </span>)}
          </motion.div>
        </div>
      </div>
    </section>

    {/* ── TICKER STRIP ── */}
    <div className="relative w-full py-4 sm:py-5 md:py-6 overflow-hidden z-20" style={{
      backgroundColor: ACCENT
    }}>
      <div className="ticker-animate">
        {[1, 2].map(i => <div key={i} className="flex items-center shrink-0">
          <span className="whitespace-nowrap" style={{
            color: '#ffffff',
            fontSize: 'clamp(0.6rem, 1.5vw, 1.1rem)',
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase'
          }}>
            {TICKER_TEXT}
          </span>
        </div>)}
      </div>
    </div>

    {/* ── VALUE PROPOSITION ── */}
    <section className="px-4 sm:px-6 md:px-12 lg:px-16 py-12 sm:py-16 md:py-24 lg:py-32 bg-[#0D0D0D] border-b border-white/5 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 -translate-y-1/2 rounded-full bg-[#FC3637]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 items-stretch">

        {/* Left Column: Context & Headline */}
        <div className="lg:w-[45%] flex flex-col justify-between gap-8">
          <div>
            <SectionHeader title="Digital, AI, Content &amp; Growth Advisory" subtitle="The engine of modern growth" dark />
            <p className="mt-6 text-[15px] sm:text-[17px] font-light leading-relaxed text-white/50">
              We help organisations navigate the complex intersection of technology, narrative, and demand. Our advisory services translate digital capabilities into sustainable market leadership.
            </p>
          </div>

          <div className="relative bg-white/[0.02] border border-white/5 p-8 rounded-xl overflow-hidden group">
            {/* Soft border gradient or accent */}
            <div className="absolute top-0 left-0 w-[3px] h-full bg-[#FC3637]" />
            <p className="text-[15px] sm:text-[17px] font-normal leading-relaxed text-white/85 italic">
              &ldquo;{HERO_INTRO}&rdquo;
            </p>
            <div className="mt-6 text-white/40 text-[13px] leading-relaxed">
              We design and deliver integrated, intelligence-led solutions that transform data into insight, content into influence, audiences into communities, engagement into revenue, and innovation into measurable business outcomes.
            </div>
          </div>
        </div>

        {/* Right Column: Key Focus Cards Grid */}
        <div className="lg:w-[55%] flex flex-col justify-center gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            {/* Card 1 */}
            <div className="bg-white/[0.02] border border-white/5 p-6 rounded-xl hover:border-[#FC3637]/35 transition-all duration-300 flex flex-col gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#FC3637]/10 flex items-center justify-center text-[#FC3637]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-white text-[16px] font-bold tracking-tight">AI &amp; Automation</h3>
              <p className="text-white/50 text-[13px] leading-relaxed">
                Deploying intelligent algorithms, generative AI platforms, and automated workflow pipelines to scale productivity and ROI.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white/[0.02] border border-white/5 p-6 rounded-xl hover:border-[#FC3637]/35 transition-all duration-300 flex flex-col gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#FC3637]/10 flex items-center justify-center text-[#FC3637]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2m0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-white text-[16px] font-bold tracking-tight">Performance Growth</h3>
              <p className="text-white/50 text-[13px] leading-relaxed">
                Applying analytical frameworks, conversion optimisation (CRO), and search intelligence to build high-converting growth engines.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white/[0.02] border border-white/5 p-6 rounded-xl hover:border-[#FC3637]/35 transition-all duration-300 flex flex-col gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#FC3637]/10 flex items-center justify-center text-[#FC3637]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
              <h3 className="text-white text-[16px] font-bold tracking-tight">Content Leadership</h3>
              <p className="text-white/50 text-[13px] leading-relaxed">
                Crafting targeted editorial platforms, digital communities, and executive thought leadership programs to secure market voice.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white/[0.02] border border-white/5 p-6 rounded-xl hover:border-[#FC3637]/35 transition-all duration-300 flex flex-col gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#FC3637]/10 flex items-center justify-center text-[#FC3637]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-white text-[16px] font-bold tracking-tight">MarTech Advisory</h3>
              <p className="text-white/50 text-[13px] leading-relaxed">
                Auditing, architecting, and integrating unified CRM, CDP, and marketing automation solutions for seamless delivery.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>

    {/* ── CORE CAPABILITIES ACCORDION ── */}
    <section id="advisory-capabilities" className="px-4 sm:px-6 md:px-12 lg:px-16 py-12 sm:py-16 md:py-24 lg:py-32" style={{
      backgroundColor: '#0D0D0D',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      borderBottom: '1px solid rgba(255,255,255,0.06)'
    }}>
      <div className="max-w-7xl mx-auto">
        <SectionHeader title="Core Capabilities" subtitle="Integrated advisory solutions" dark />

        <div className="flex flex-col" style={{
          gap: '10px'
        }}>
          {SERVICES.map((service, idx) => {
            const breakAfterThis = ACCORDION_BREAKS.find(b => b.afterIndex === idx);
            return <React.Fragment key={service.title}>
              <motion.div ref={el => {
                serviceRefs.current[idx] = el;
              }} className="overflow-hidden" style={{
                border: '1px solid rgba(255,255,255,0.06)',
                backgroundColor: expandedService === idx ? '#161616' : hoveredService === idx ? '#222222' : 'transparent',
                boxShadow: expandedService === idx ? '0 20px 60px rgba(0,0,0,0.3)' : 'none',
                transform: expandedService === idx ? 'scale(1.005)' : 'scale(1)',
                transition: 'background-color 0.25s ease, color 0.25s ease, transform 0.3s ease'
              }} onMouseEnter={() => setHoveredService(idx)} onMouseLeave={() => setHoveredService(null)}>
                <button className="accordion-btn w-full flex items-center justify-between text-left" style={{
                  padding: 'clamp(14px, 3vw, 48px)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }} onClick={() => {
                  const next = expandedService === idx ? null : idx;
                  setExpandedService(next);
                  if (next !== null) {
                    setTimeout(() => {
                      serviceRefs.current[next]?.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                      });
                    }, 50);
                  }
                }}>
                  <div className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-12 flex-1 min-w-0 pr-3 sm:pr-4">
                    <span style={{
                      color: ACCENT,
                      fontWeight: 700,
                      fontSize: 'clamp(1rem, 3vw, 2.5rem)',
                      fontFamily: "'Inter', sans-serif",
                      opacity: 0.35,
                      letterSpacing: '-0.03em',
                      fontVariantNumeric: 'tabular-nums',
                      transition: 'color 0.25s ease',
                      flexShrink: 0
                    }}>
                      {(idx + 1).toString().padStart(2, '0')}
                    </span>
                    <div className="min-w-0">
                      <h3 style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 'clamp(0.95rem, 2.5vw, 2rem)',
                        fontWeight: 600,
                        letterSpacing: '-0.03em',
                        lineHeight: 1.1,
                        color: '#ffffff',
                        marginBottom: '0.4rem',
                        transition: 'color 0.25s ease'
                      }}>
                        {service.title}
                      </h3>
                      <p className="mobile-body-text" style={{
                        fontSize: '14px',
                        fontWeight: 400,
                        lineHeight: 1.6,
                        color: 'rgba(255,255,255,0.6)',
                        maxWidth: '600px'
                      }}>
                        {service.teaser}
                      </p>
                    </div>
                  </div>
                  <div className="shrink-0" style={{
                    padding: '10px',
                    backgroundColor: expandedService === idx ? ACCENT : hoveredService === idx ? '#333333' : '#1A1A1A',
                    color: '#ffffff',
                    transform: expandedService === idx ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'background-color 0.25s ease, color 0.25s ease, transform 0.3s ease',
                    minWidth: '44px',
                    minHeight: '44px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {expandedService === idx ? <Minus size={20} /> : <Plus size={20} />}
                  </div>
                </button>

                <AnimatePresence>
                  {expandedService === idx && <motion.div initial={{
                    height: 0,
                    opacity: 0
                  }} animate={{
                    height: 'auto',
                    opacity: 1
                  }} exit={{
                    height: 0,
                    opacity: 0
                  }} transition={{
                    duration: 0.5,
                    ease: EASE_SMOOTH
                  }}>
                    <div style={{
                      padding: 'clamp(14px, 3vw, 48px)',
                      paddingTop: 0,
                      borderTop: '1px solid rgba(255,255,255,0.06)'
                    }}>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3 md:gap-y-4">
                        {service.items.map(item => <li key={item} className="flex items-start gap-3 sm:gap-4 group" style={{
                          color: 'rgba(255,255,255,0.6)'
                        }}>
                          <span className="mt-[9px] shrink-0" style={{
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            backgroundColor: ACCENT,
                            display: 'inline-block'
                          }} />
                          <span className="mobile-body-text transition-colors" style={{
                            fontSize: '15px',
                            fontWeight: 500,
                            lineHeight: 1.7,
                            color: 'rgba(255,255,255,0.65)'
                          }}>
                            {item}
                          </span>
                        </li>)}
                      </ul>
                    </div>

                    {service.contextualCta && <div style={{
                      padding: 'clamp(14px, 3vw, 48px)',
                      paddingTop: 0
                    }}>
                      <a href="/contact" className="cta-primary group h-[56px] min-w-[200px]">
                        <span>{service.contextualCta}</span>
                        <div className="cta-icon-container">
                          <ArrowUpRight size={14} className="text-[#1E1E1E]" />
                        </div>
                      </a>
                    </div>}
                  </motion.div>}
                </AnimatePresence>
              </motion.div>                  {breakAfterThis && <div className="relative overflow-hidden" style={{
                minHeight: 'clamp(220px, 22vw, 280px)'
              }}>
                <img src={breakAfterThis.image} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover grayscale" style={{
                  opacity: 0.4
                }} />
                <div className="absolute inset-0" style={{
                  background: 'linear-gradient(135deg, #111111 0%, #1A1A1A 100%)'
                }} />
                <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6 md:gap-16 h-full p-6 sm:p-8 md:p-12 lg:p-16">
                  <div className="shrink-0">
                    <div style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 'clamp(3.5rem, 10vw, 8rem)',
                      fontWeight: 700,
                      letterSpacing: '-0.05em',
                      lineHeight: 1,
                      color: ACCENT
                    }}>
                      {breakAfterThis.stat}
                    </div>
                    <div style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.4)',
                      marginTop: '0.5rem'
                    }}>
                      {breakAfterThis.label}
                    </div>
                  </div>
                  <div style={{
                    height: '1px',
                    width: '48px',
                    backgroundColor: ACCENT,
                    flexShrink: 0
                  }} className="hidden md:block" />
                  <div style={{
                    width: '1px',
                    height: '40px',
                    backgroundColor: ACCENT,
                    flexShrink: 0
                  }} className="md:hidden" />
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 'clamp(0.9rem, 2vw, 1.4rem)',
                    fontWeight: 300,
                    lineHeight: 1.65,
                    color: 'rgba(255,255,255,0.65)',
                    maxWidth: '640px',
                    fontStyle: 'italic'
                  }}>
                    <span>&ldquo;</span><span>{breakAfterThis.quote}</span><span>&rdquo;</span>
                  </p>
                </div>
              </div>}
            </React.Fragment>;
          })}
        </div>
      </div>
    </section>

    {/* ── PREMIUM OFFERINGS GRID ── */}
    <section className="px-4 sm:px-6 md:px-12 lg:px-16 py-12 sm:py-16 md:py-24 lg:py-32 overflow-hidden relative" style={{
      backgroundColor: '#1A1A1A',
      color: '#ffffff'
    }}>
      <AfricaWatermark />
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeader title="Premium Offerings" subtitle="Driving real-world impact" dark />

        <div className="sm:hidden flex flex-col" style={{
          gap: '1px',
          backgroundColor: 'rgba(255,255,255,0.08)'
        }}>
          {PREMIUM_OFFERINGS.map((offering, capturedIdx) => <motion.div key={offering.id} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6,
            delay: capturedIdx * 0.05
          }} className="group flex flex-col justify-between" style={{
            backgroundColor: '#1A1A1A',
            padding: '1.5rem',
            minHeight: '180px',
            transition: 'background-color 0.5s ease'
          }} onMouseEnter={e => {
            (e.currentTarget as HTMLDivElement).style.backgroundColor = ACCENT;
            setHoveredOutcome(capturedIdx);
          }} onMouseLeave={e => {
            (e.currentTarget as HTMLDivElement).style.backgroundColor = '#1A1A1A';
            setHoveredOutcome(null);
          }}>
            <div className="flex flex-col gap-4">
              <span style={{
                color: hoveredOutcome === capturedIdx ? '#ffffff' : ACCENT,
                fontSize: '2.5rem',
                fontWeight: 700,
                letterSpacing: '-0.04em',
                lineHeight: 1,
                opacity: 0.35,
                fontFamily: "'Inter', sans-serif"
              }} className="group-hover:opacity-60 transition-opacity">
                {(capturedIdx + 1).toString().padStart(2, '0')}
              </span>
              <div className="h-[2px] w-8" style={{
                backgroundColor: hoveredOutcome === capturedIdx ? '#ffffff' : ACCENT
              }} />
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <h4 style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '1rem',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                lineHeight: 1.2,
                color: '#ffffff',
                marginBottom: '0.2rem'
              }}>
                {offering.title}
              </h4>
              <p style={{
                fontSize: '12px',
                fontWeight: 400,
                lineHeight: 1.6,
                color: hoveredOutcome === capturedIdx ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.45)',
                transition: 'color 0.3s ease'
              }}>
                {offering.description}
              </p>
            </div>
          </motion.div>)}
        </div>

        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4" style={{
          gap: '1px',
          backgroundColor: 'rgba(255,255,255,0.08)'
        }}>
          {(() => {
            const cells: React.ReactNode[] = [];
            let offeringIdx = 0;
            for (let cellIdx = 0; cellIdx < 12; cellIdx++) {
              if (cellIdx === 2) {
                cells.push(<div key="img-cell-2" style={{
                  position: 'relative',
                  backgroundImage: 'url(https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  minHeight: 'clamp(180px, 25vw, 320px)',
                  backgroundColor: '#1A1A1A'
                }}>
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(252,54,55,0.2)'
                  }} />
                </div>);
              } else if (cellIdx === 7) {
                cells.push(<div key="img-cell-7" style={{
                  position: 'relative',
                  backgroundImage: 'url(https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  minHeight: 'clamp(180px, 25vw, 320px)',
                  backgroundColor: '#1A1A1A'
                }}>
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(252,54,55,0.2)'
                  }} />
                </div>);
              } else {
                if (offeringIdx < PREMIUM_OFFERINGS.length) {
                  const offering = PREMIUM_OFFERINGS[offeringIdx];
                  const displayNum = offeringIdx + 1;
                  const capturedIdx = offeringIdx;
                  cells.push(<motion.div key={offering.id} initial={{
                    opacity: 0,
                    y: 20
                  }} whileInView={{
                    opacity: 1,
                    y: 0
                  }} viewport={{
                    once: true
                  }} transition={{
                    duration: 0.6,
                    delay: capturedIdx * 0.08
                  }} className="group flex flex-col justify-between" style={{
                    backgroundColor: '#1A1A1A',
                    padding: 'clamp(1.5rem, 3vw, 3rem)',
                    minHeight: 'clamp(180px, 25vw, 320px)',
                    transition: 'background-color 0.5s ease'
                  }} onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.backgroundColor = ACCENT;
                    setHoveredOutcome(capturedIdx);
                  }} onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.backgroundColor = '#1A1A1A';
                    setHoveredOutcome(null);
                  }}>
                    <div className="flex flex-col gap-6">
                      <span style={{
                        color: hoveredOutcome === capturedIdx ? '#ffffff' : ACCENT,
                        fontSize: '3rem',
                        fontWeight: 700,
                        letterSpacing: '-0.04em',
                        lineHeight: 1,
                        opacity: 0.35,
                        fontFamily: "'Inter', sans-serif"
                      }} className="group-hover:opacity-60 transition-opacity">
                        {displayNum.toString().padStart(2, '0')}
                      </span>
                      <div className="h-[2px] w-8" style={{
                        backgroundColor: hoveredOutcome === capturedIdx ? '#ffffff' : ACCENT
                      }} />
                    </div>
                    <div className="flex flex-col gap-3">
                      <h4 style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 'clamp(0.9rem, 1.4vw, 1.1rem)',
                        fontWeight: 700,
                        letterSpacing: '-0.02em',
                        lineHeight: 1.2,
                        color: '#ffffff',
                        marginBottom: '0.25rem'
                      }}>
                        {offering.title}
                      </h4>
                      <p style={{
                        fontSize: '12px',
                        fontWeight: 400,
                        lineHeight: 1.6,
                        color: hoveredOutcome === capturedIdx ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.45)',
                        transition: 'color 0.3s ease'
                      }}>
                        {offering.description}
                      </p>
                    </div>
                  </motion.div>);
                  offeringIdx++;
                }
              }
            }
            return cells;
          })()}
        </div>
      </div>
    </section>      {/* ── FINAL CTA BAND ── */}
    <section className="px-4 sm:px-6 md:px-12 lg:px-16 py-14 sm:py-20 md:py-28" style={{
      backgroundColor: '#0D0D0D',
      borderTop: '1px solid rgba(255,255,255,0.06)'
    }}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-8 md:gap-10">
        <div>
          <h2 style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(1.75rem, 5vw, 3.5rem)',
            fontWeight: 700,
            letterSpacing: '-0.035em',
            lineHeight: 1.1,
            color: '#ffffff'
          }}>
            Ready to lead your market?
          </h2>
          <p className="mt-4" style={{
            color: 'rgba(255,255,255,0.7)',
            fontSize: 'clamp(14px, 1.5vw, 16px)',
            lineHeight: 1.7,
            maxWidth: '400px'
          }}>
            <span>Partner with EmpowaWorx and unlock a complete suite of digital, AI and marketing growth capabilities.</span>
          </p>
        </div>
        <div className="final-cta-buttons flex flex-col sm:flex-row gap-3 sm:gap-4 shrink-0 w-full sm:w-auto">
          <a href="/contact" className="cta-primary group h-[56px] min-w-[200px]">
            <span>Start Your Digital Transformation</span>
            <div className="cta-icon-container">
              <ArrowUpRight size={14} className="text-[#1E1E1E]" />
            </div>
          </a>
          <a href="#advisory-capabilities" className="cta-secondary group h-[56px] min-w-[180px]">
            <span>View All Services</span>
          </a>
        </div>
      </div>
    </section>

    {/* ── THE FACULTY ── */}
    <section className="py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-12 lg:px-16" style={{
      backgroundColor: '#ffffff',
      display: 'none'
    }}>
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 md:mb-16 gap-5 sm:gap-6 md:gap-8">
          <div className="max-w-2xl">
            <Eyebrow>EmpowaWorx™ Digital, AI, Content &amp; Performance Marketing Practice</Eyebrow>
            <h2 className="font-semibold uppercase" style={{
              color: FOREGROUND,
              fontSize: 'clamp(1.6rem, 4.5vw, 3.75rem)',
              letterSpacing: '-0.04em',
              lineHeight: 0.92,
              fontFamily: 'Inter, sans-serif',
              margin: 0
            }}>
              Principal Leadership &amp; Delivery Team
            </h2>
          </div>
          <p className="md:text-right md:max-w-sm" style={{
            color: BODY_MUTED,
            fontSize: 'clamp(14px, 1.5vw, 17px)',
            fontWeight: 400,
            lineHeight: 1.75
          }}>
            Our team combines data-driven insights with deep-rooted cultural connections across the African continent.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-7 w-full">
          {FACULTY_MEMBERS.map(member => <div key={member.id} className="group transition-all w-full overflow-hidden" style={{
            border: '1px solid rgba(26,26,26,0.06)'
          }} onMouseEnter={e => {
            (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(252,54,55,0.2)';
          }} onMouseLeave={e => {
            (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(26,26,26,0.06)';
          }}>
            <div className="flex flex-col sm:grid sm:grid-cols-5 h-full">
              <div className="sm:col-span-2 overflow-hidden aspect-square">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0" style={{
                  display: 'block'
                }} />
              </div>
              <div className="sm:col-span-3 p-5 sm:p-6 md:p-8 flex flex-col justify-start" style={{
                backgroundColor: '#ffffff'
              }}>
                <h3 className="font-semibold uppercase mb-1" style={{
                  fontFamily: "'Inter', sans-serif",
                  color: FOREGROUND,
                  fontSize: 'clamp(1rem, 2.5vw, 1.65rem)',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.05
                }}>
                  {member.name}
                </h3>
                <p className="pb-4 mb-4 sm:mb-5" style={{
                  color: ACCENT,
                  fontSize: '10px',
                  fontWeight: 600,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  borderBottom: '1px solid rgba(252,54,55,0.1)',
                  lineHeight: 1.5
                }}>
                  {member.title}
                </p>
                <p style={{
                  color: BODY_MUTED,
                  fontSize: 'clamp(13px, 1.5vw, 15px)',
                  fontWeight: 400,
                  lineHeight: 1.75,
                  fontStyle: 'italic'
                }}>
                  <span>&ldquo;</span><span>{member.description}</span><span>&rdquo;</span>
                </p>
                <div className="mt-5 sm:mt-6 flex gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer" style={{
                    background: 'rgba(0,0,0,0.05)',
                    color: FOREGROUND
                  }} onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.background = ACCENT;
                    (e.currentTarget as HTMLDivElement).style.color = '#ffffff';
                  }} onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.background = 'rgba(0,0,0,0.05)';
                    (e.currentTarget as HTMLDivElement).style.color = FOREGROUND;
                  }}>
                    <Linkedin size={14} />
                  </div>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer" style={{
                    background: 'rgba(0,0,0,0.05)',
                    color: FOREGROUND
                  }} onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.background = ACCENT;
                    (e.currentTarget as HTMLDivElement).style.color = '#ffffff';
                  }} onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.background = 'rgba(0,0,0,0.05)';
                    (e.currentTarget as HTMLDivElement).style.color = FOREGROUND;
                  }}>
                    <Instagram size={14} />
                  </div>
                </div>
              </div>
            </div>
          </div>)}
        </div>

        <div className="mt-12 md:mt-16 p-6 md:p-10 border-t border-[#1A1A1A]/10" style={{ background: '#F9F9F9' }}>
          <h4 style={{
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: ACCENT,
            marginBottom: '12px',
            fontFamily: 'Inter, sans-serif'
          }}>
            Collective Value Proposition
          </h4>
          <p style={{
            color: '#555',
            fontSize: 'clamp(14px, 1.5vw, 16px)',
            lineHeight: 1.8,
            margin: 0,
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400
          }}>
            The EmpowaWorx™ Digital, AI, Content &amp; Performance Marketing Practice brings together a multidisciplinary team of experienced strategists, marketers, technologists, content specialists, innovators and growth professionals with expertise spanning digital transformation, artificial intelligence, performance marketing, content strategy, social media, innovation, customer acquisition and digital intelligence. Collectively, the team helps organisations harness the power of digital technologies, data, artificial intelligence and strategic content to accelerate growth, strengthen reputation, deepen stakeholder engagement, improve customer experience and unlock sustainable competitive advantage. The practice transforms data into insight, content into influence, audiences into communities, engagement into revenue, and innovation into measurable business outcomes.
          </p>
        </div>
      </div>
    </section>

    <Footer />
  </div>;
};
