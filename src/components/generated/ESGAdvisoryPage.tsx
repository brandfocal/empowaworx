import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, Users, Target, Zap, Globe, Award, ChevronDown, Linkedin, Instagram } from 'lucide-react';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { AfricaWatermark } from '../AfricaWatermark';

// ─── Brand Tokens ──────────────────────────────────────
const B = {
  crimson: '#FC3637',
  crimsonDark: '#E02F30',
  charcoal: '#1A1A1A',
  footerBg: '#0A0A0A',
  white: '#FFFFFF',
  offWhite: '#F8F8F8',
  gray: '#757575',
  lightGray: '#E5E5E5'
};

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

// ─── useWindowWidth ──────────────────────────────────────────
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

// ─── Constants & Data ───────────────────────────────────────
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
const TICKER_ITEMS = ['ESG STRATEGY', 'SUSTAINABILITY', 'INCLUSIVE GROWTH', 'ECONOMIC DEVELOPMENT', 'SOCIAL IMPACT', 'TRANSFORMATION', 'SHARED VALUE', 'IMPACT MEASUREMENT', 'ESG STRATEGY', 'SUSTAINABILITY', 'INCLUSIVE GROWTH', 'ECONOMIC DEVELOPMENT'];
const IMPACT_STATS = [{
  id: 'is1',
  number: '50,000+',
  label: 'Women Leaders Engaged'
}, {
  id: 'is2',
  number: '198,000+',
  label: 'Youth Mobilised'
}, {
  id: 'is3',
  number: 'R500M+',
  label: 'Funding Facilitated'
}, {
  id: 'is4',
  number: '200+',
  label: 'Years Collective Experience'
}];
const SERVICES = [{
  id: 's1',
  index: '01',
  title: 'ESG Strategy, Sustainability & Shared Value',
  teaser: 'Forward-thinking organisations understand that sustainability and shared value are strategic drivers of growth and resilience.',
  image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80',
  services: ['ESG Strategy & Advisory', 'Sustainability Programme Development', 'ESG Communications & Stakeholder Engagement', 'Shared Value Creation Strategies', 'ESG Impact Frameworks', 'Sustainability Positioning & Reporting']
}, {
  id: 's2',
  index: '02',
  title: 'Transformation, Inclusion & Economic Participation',
  teaser: 'Success is measured through contribution to economic inclusion, transformation, and long-term value creation.',
  image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80',
  services: ['Transformation Advisory', 'Inclusive Growth Strategies', 'Broad-Based Economic Participation Programmes', 'Supplier & Enterprise Development', 'Diversity, Equity & Inclusion Initiatives', 'Stakeholder Empowerment Strategies']
}, {
  id: 's3',
  index: '03',
  title: 'Enterprise, Entrepreneurship & SMME Development',
  teaser: 'Driving growth through robust supplier development and SMME acceleration programmes.',
  image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
  services: ['Enterprise & Supplier Development (ESD)', 'Entrepreneurship Development Programmes', 'SMME Growth & Acceleration', 'Business Incubation & Support', 'Market Access Facilitation', 'Funding & Investment Readiness Support']
}, {
  id: 's4',
  index: '04',
  title: 'Youth, Women & Community Development',
  teaser: 'Empowering future leaders and fostering community resilience through targeted impact programmes.',
  image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80',
  services: ['Youth Development Programmes', 'Women Economic Empowerment Initiatives', 'Employability & Work Readiness Programmes', 'Community Development Projects', 'Leadership Development Initiatives', 'Future Economy Skills Programmes']
}, {
  id: 's5',
  index: '05',
  title: 'Skills Development & Capacity Building',
  teaser: 'Building the workforce of tomorrow through strategic learning and development interventions.',
  image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80',
  services: ['Skills Development Initiatives', 'Learning & Development Programmes', 'Sector Skills Interventions', 'Workforce Readiness Programmes', 'Digital Skills & Innovation Programmes', 'Leadership & Entrepreneurship Training']
}, {
  id: 's6',
  index: '06',
  title: 'Impact Measurement, Reporting & Stakeholder Value Creation',
  teaser: 'Driving accountability and performance through intelligent impact measurement and strategic reporting.',
  image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
  services: ['Impact Measurement & Evaluation', 'ESG & Sustainability Reporting', 'Social Impact Reporting', 'Monitoring & Evaluation Frameworks', 'Stakeholder Value Assessments', 'Economic Impact Analysis', 'Performance Dashboards & Strategic Insights']
}];

// Secondary strip images for services section
const SERVICE_SECONDARY_IMAGES: Record<string, string> = {
  's1': 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80',
  's2': 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80',
  's3': 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80',
  's4': 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80',
  's5': 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80',
  's6': 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80'
};
const OUTCOMES = [{
  id: 'o1',
  title: 'Enhanced ESG Performance and Sustainability Outcomes',
  icon: <Target className="w-6 h-6" />,
  isImageCell: false,
  imageUrl: ''
}, {
  id: 'o2',
  title: 'Stronger Reputation, Trust and Social Licence to Operate',
  icon: <Globe className="w-6 h-6" />,
  isImageCell: false,
  imageUrl: ''
}, {
  id: 'o3',
  title: '',
  icon: null,
  isImageCell: true,
  imageUrl: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&q=85'
}, {
  id: 'o4',
  title: 'Improved Transformation, Inclusion and Economic Participation Outcomes',
  icon: <Zap className="w-6 h-6" />,
  isImageCell: false,
  imageUrl: ''
}, {
  id: 'o5',
  title: 'Greater Enterprise Growth, Job Creation and Skills Development',
  icon: <Award className="w-6 h-6" />,
  isImageCell: false,
  imageUrl: ''
}, {
  id: 'o6',
  title: '',
  icon: null,
  isImageCell: true,
  imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=85'
}, {
  id: 'o7',
  title: 'Measurable Social Return on Investment (SROI)',
  icon: <CheckCircle2 className="w-6 h-6" />,
  isImageCell: false,
  imageUrl: ''
}, {
  id: 'o8',
  title: 'Sustainable Growth Driven by Purpose, Inclusion and Shared Value Creation',
  icon: <Users className="w-6 h-6" />,
  isImageCell: false,
  imageUrl: ''
}];
const TEAM = [{
  id: 't1',
  name: 'Khanyi Mlambo, CISL Fellow',
  role: 'ESG, Sustainability, Shared Value & Impact Advisory',
  description: 'Khanyi Mlambo is one of Africa’s leading sustainability, ESG and shared value practitioners, with more than three decades of executive, board and advisory experience across financial services, infrastructure, construction and corporate sectors. She is the Managing Director of KM ESG Consulting and a Fellow and Ambassador of the University of Cambridge Institute for Sustainability Leadership (CISL). A former Head of Responsible Business at Old Mutual, executive leader at Standard Bank Group and board member across numerous public-interest and governance institutions, Khanyi advises organisations on embedding ESG, sustainability, responsible business, impact investing, ethical leadership and shared value principles into strategy, governance and operations. She helps organisations navigate complex sustainability challenges, accelerate climate and social impact ambitions, strengthen stakeholder trust and unlock long-term value creation through purpose-led leadership, inclusive growth and sustainable development. Her work is grounded in advancing resilient economies, responsible business practices and the achievement of the UN Sustainable Development Goals across Africa.',
  portrait: '/Khanyi-Mlambo.jpg'
}, {
  id: 't2',
  name: 'Thulisa Sosibo',
  role: 'Managing Executive & Economic Development Lead',
  description: 'Thulisa Sosibo is a strategic business leader and growth executive with extensive experience in programme management, stakeholder partnerships, enterprise development, economic inclusion and organisational transformation. She leads the design and execution of high-impact ESG, sustainability and economic development initiatives that align business performance with social value creation, stakeholder impact and long-term sustainable growth. Her expertise spans public-private partnerships, ecosystem development, community impact programmes, entrepreneurship support, skills development, inclusive economic participation and sustainability-driven growth strategies. Thulisa is passionate about building collaborative platforms that unlock opportunity, strengthen resilience and deliver measurable economic and social outcomes for organisations, communities, and future generations.',
  portrait: '/Thulisa-Bianca-Sosibo.jpg'
}];
const CREED = ['Building Trust', 'Building Brands', 'Shaping Narratives', 'Managing Reputations', 'Influencing Stakeholders', 'Accelerating Growth'];
const VALUE_PILLARS = [{
  id: 'vp1',
  label: 'Strategic Growth',
  description: 'Embedding ESG as a core commercial driver that unlocks long-term competitive advantage.'
}, {
  id: 'vp2',
  label: 'Reputation Management',
  description: 'Building the social licence that sustains trust across investors, communities, and regulators.'
}, {
  id: 'vp3',
  label: 'Stakeholder Trust',
  description: 'Creating measurable, verifiable outcomes that deepen institutional and community relationships.'
}, {
  id: 'vp4',
  label: 'Investment Readiness',
  description: 'Positioning organisations to attract responsible capital through credible ESG frameworks.'
}];
const HERO_LINE_1 = ['ESG,', 'Impact'];
const HERO_LINE_2 = ['&', 'Economic', 'Advisory.'];

// ─── Global Styles ──────────────────────────────────────
const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

  body {
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    color: #1A1A1A;
    background: #FFFFFF;
    -webkit-font-smoothing: antialiased;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
  }

  .no-scrollbar::-webkit-scrollbar { display: none; }
  .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

  @keyframes ticker { from { transform: translateX(0) } to { transform: translateX(-50%) } }
  .ticker-track { display: flex; width: max-content; animation: ticker 25s linear infinite; }
  .ticker-track:hover { animation-play-state: paused; }

  @keyframes grain {
    0%, 100% { transform:translate(0, 0) }
    10% { transform:translate(-5%, -10%) }
    20% { transform:translate(-15%, 5%) }
    30% { transform:translate(7%, -25%) }
    40% { transform:translate(-5%, 25%) }
    50% { transform:translate(-15%, 10%) }
    60% { transform:translate(15%, 0%) }
    70% { transform:translate(0%, 15%) }
    80% { transform:translate(3%, 35%) }
    90% { transform:translate(-10%, 10%) }
  }
  
  .grain-overlay::after {
    content: "";
    position: fixed;
    top: -100%;
    left: -100%;
    right: -100%;
    bottom: -100%;
    background-image: url("https://grainy-gradients.vercel.app/noise.svg");
    opacity: 0.04;
    pointer-events: none;
    z-index: 9999;
    animation: grain 8s steps(10) infinite;
  }

  .nav-link {
    position: relative;
    padding-bottom: 2px;
  }
  .nav-link::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 1px;
    background: #FC3637;
    transition: width 0.3s ease;
  }
  .nav-link:hover::after {
    width: 100%;
  }

  .service-row {
    border-top: 1px solid rgba(26,26,26,0.1);
  }
  .service-row-title {
    transition: transform 0.3s ease, color 0.3s ease;
  }
  .service-row:hover .service-row-title {
    transform: translateX(12px);
  }
  .service-row-arrow {
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  .service-row:hover .service-row-arrow {
    opacity: 1;
  }

  .bento-cell {
    transition: background 0.3s ease, border-color 0.3s ease;
  }
  .bento-cell:hover {
    background: rgba(252,54,55,0.07) !important;
    border-color: rgba(252,54,55,0.25) !important;
  }

  .bento-image-cell {
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }
  .bento-image-cell-overlay {
    position: absolute;
    inset: 0;
    background: rgba(252, 54, 55, 0.15);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  .bento-image-cell:hover .bento-image-cell-overlay {
    opacity: 1;
  }

  .faculty-panel-name {
    transition: color 0.4s ease;
  }
  .faculty-panel:hover .faculty-panel-name {
    color: #FC3637 !important;
  }
`;

// ─── HeroHeadline ─────────────────────────────────────────
const HeroHeadline = ({
  reducedMotion,
  inView
}: {
  reducedMotion: boolean;
  inView: boolean;
}) => {
  const line1Count = HERO_LINE_1.length;
  const headlineStyle: React.CSSProperties = {
    fontSize: 'clamp(2.5rem, 7vw, 6.5rem)',
    fontWeight: 700,
    color: '#ffffff',
    lineHeight: 0.92,
    letterSpacing: '-0.035em'
  };
  if (reducedMotion) {
    return <div className="flex flex-col">
      <h1 style={headlineStyle} className="flex flex-wrap gap-[0.18em]">
        <span>{HERO_LINE_1.join(' ')}</span>
      </h1>
      <h1 style={headlineStyle} className="flex flex-wrap gap-[0.18em]">
        <span>{HERO_LINE_2.slice(0, -1).join(' ')}</span>
        <span style={{
          color: B.crimson
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
          color: isLastWord ? B.crimson : undefined,
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

// ─── Eyebrow Component ──────────────────────────────────
const Eyebrow = ({
  children,
  light = false
}: {
  children: React.ReactNode;
  light?: boolean;
}) => <div className="mb-4">
    <p style={{
      color: light ? 'rgba(255,255,255,0.6)' : '#FC3637',
      fontSize: '11px',
      fontWeight: 700,
      letterSpacing: '0.25em',
      textTransform: 'uppercase'
    }}>
      {children}
    </p>
  </div>;

// ─── ImpactStatStrip ──────────────────────────────────────
const ImpactStatStrip = () => <section style={{
  background: '#0D0D0D',
  borderBottom: '1px solid rgba(255,255,255,0.06)'
}} className="w-full py-10 px-6 md:px-16 lg:px-24">
  <div className="max-w-[1600px] mx-auto">
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-6 sm:gap-0">
      {IMPACT_STATS.map((stat, i) => <React.Fragment key={stat.id}>
        <div className="flex flex-col gap-2 flex-1 px-0 sm:px-8 first:pl-0 last:pr-0">
          <span style={{
            fontSize: 'clamp(1.75rem,3.5vw,2.5rem)',
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: 1,
            letterSpacing: '-0.04em',
            display: 'block'
          }}>
            {stat.number}
          </span>
          <span style={{
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.15em',

            color: 'rgba(255,255,255,0.5)',
            display: 'block'
          }}>
            {stat.label}
          </span>
        </div>
        {i < IMPACT_STATS.length - 1 && <div style={{
          width: '1px',
          height: '48px',
          background: 'rgba(255,255,255,0.12)',
          alignSelf: 'center',
          flexShrink: 0,
          display: 'none'
        }} className="sm:block" />}
      </React.Fragment>)}
    </div>
  </div>
</section>;

// ─── ServicesSection ─────────────────────────────────────
const ServicesSection = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const activeService = SERVICES[activeIndex];
  const width = useWindowWidth();
  const isDesktop = width >= 1024;
  return <section className="px-6 md:px-16 lg:px-24 py-24 lg:py-32" style={{
    background: '#111111'
  }}>
    <div className="max-w-[1600px] mx-auto">
      {/* Section Header */}
      <div className="mb-20 flex flex-col lg:flex-row lg:items-start justify-between gap-12">
        <div className="max-w-3xl">
          <Eyebrow light={true}>Services Capability</Eyebrow>
          <h2 className="" style={{
            fontSize: 'clamp(2rem,4.5vw,3.5rem)',
            fontWeight: 600,
            letterSpacing: '-0.04em',
            lineHeight: 0.92,
            color: '#ffffff',
            marginTop: '8px'
          }}>
            Our practice <br /> areas.
          </h2>
        </div>
        <div className="lg:pb-4">
          <span className="px-6 py-3 rounded-full" style={{
            border: `1px solid rgba(255,255,255,0.12)`,
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.2em',
            color: '#ffffff'
          }}>
            6 Core Domains
          </span>
        </div>
      </div>

      {/* Magazine Layout */}
      <div className="flex flex-col lg:flex-row gap-0 lg:gap-16 items-start">
        {/* Left: Sticky Panel */}
        <div className="w-full lg:w-[38%] mb-16 lg:mb-0" style={{
          position: isDesktop ? 'sticky' : 'relative',
          top: isDesktop ? '120px' : undefined
        }}>
          {/* Background image layer */}
          <img src={activeService.image} alt="" aria-hidden="true" style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            zIndex: 0,
            opacity: 0.18,
            transition: 'opacity 0.4s ease'
          }} />
          {/* Gradient overlay for text legibility */}
          <div style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            background: 'linear-gradient(to bottom, rgba(17,17,17,0.92) 0%, rgba(17,17,17,0.82) 60%, rgba(17,17,17,0.95) 100%)'
          }} />
          {/* Text content sits above the background */}
          <div style={{
            position: 'relative',
            zIndex: 1
          }}>
            {/* Ghost number */}
            <div aria-hidden="true" style={{
              fontSize: 'clamp(8rem,15vw,12rem)',
              fontWeight: 700,
              letterSpacing: '-0.06em',
              color: 'rgba(255,255,255,0.06)',
              lineHeight: 1,
              marginBottom: '-0.1em',
              userSelect: 'none'
            }}>
              {activeService.index}
            </div>
            <h3 style={{
              fontSize: 'clamp(1.5rem,2.5vw,2.25rem)',
              fontWeight: 600,
              letterSpacing: '-0.04em',
              lineHeight: 0.95,
              color: '#ffffff',
              marginBottom: '20px'
            }}>
              {activeService.title}
            </h3>
            <p style={{
              fontSize: '17px',
              color: 'rgba(255,255,255,0.6)',
              lineHeight: 1.75,
              marginBottom: '32px'
            }}>
              {activeService.teaser}
            </p>
          </div>
        </div>

        {/* Right: Service Rows */}
        <div className="w-full lg:w-[62%]" style={{
          borderBottom: '1px solid rgba(255,255,255,0.06)'
        }}>
          {SERVICES.map((svc, i) => <div key={svc.id} className="service-row cursor-pointer" onMouseEnter={() => setActiveIndex(i)} onFocus={() => setActiveIndex(i)} tabIndex={0} role="button" aria-label={`View ${svc.title}`} style={{
            paddingTop: 'clamp(1.5rem,3vw,2.5rem)',
            paddingBottom: 'clamp(1.5rem,3vw,2.5rem)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '16px',
            borderTop: '1px solid rgba(255,255,255,0.06)'
          }}>
            <div className="flex items-center gap-6 flex-1 min-w-0">
              <span style={{
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.15em',
                color: B.crimson,
                flexShrink: 0
              }}>
                {svc.index}
              </span>
              <h4 className="service-row-title" style={{
                fontSize: 'clamp(1.25rem,2vw,1.75rem)',
                fontWeight: 600,
                letterSpacing: '-0.03em',
                color: activeIndex === i ? B.crimson : '#ffffff',
                lineHeight: 1.1
              }}>
                {svc.title}
              </h4>
            </div>
            <div className="service-row-arrow shrink-0">
              <ArrowUpRight size={22} style={{
                color: B.crimson
              }} />
            </div>
          </div>)}
        </div>
      </div>
    </div>
  </section>;
};

// ─── CommercialOutcomesSection ────────────────────────────
const CommercialOutcomesSection = () => {
  return <section className="px-6 md:px-16 lg:px-24 py-24 lg:py-32" style={{
    background: B.charcoal
  }}>
    <div className="max-w-[1600px] mx-auto">
      {/* Section Header */}
      <div className="mb-16">
        <div className="flex items-center gap-4 mb-4">
          <div style={{
            width: '40px',
            height: '2px',
            background: B.white,
            flexShrink: 0
          }} />
          <p style={{
            color: 'rgba(255,255,255,0.6)',
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.2em',

          }}>
            Commercial Outcomes
          </p>
        </div>
        <h2 style={{
          fontSize: 'clamp(2rem,4.5vw,3.5rem)',
          fontWeight: 600,
          letterSpacing: '-0.04em',
          lineHeight: 0.92,
          color: B.white,
          marginTop: '8px'
        }}>
          What You Gain
        </h2>
      </div>

      {/* Bento Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '1px',
        background: 'rgba(255,255,255,0.08)'
      }}>
        {OUTCOMES.map((outcome, i) => {
          const isFirstCell = i === 0;
          const isLastCell = i === OUTCOMES.length - 1;
          const spanTwo = isFirstCell || isLastCell;
          if (outcome.isImageCell) {
            return <div key={outcome.id} className="bento-image-cell" style={{
              gridColumn: 'span 1',
              border: '1px solid rgba(255,255,255,0.08)',
              minHeight: '200px',
              backgroundImage: `url(${outcome.imageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}>
              <div className="bento-image-cell-overlay" />
            </div>;
          }
          return <div key={outcome.id} className="bento-cell" style={{
            gridColumn: spanTwo ? 'span 2' : 'span 1',
            border: '1px solid rgba(255,255,255,0.08)',
            padding: 'clamp(2rem,3vw,2.5rem)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            minHeight: '200px',
            background: B.charcoal
          }}>
            <span style={{
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.12em',

              color: B.crimson
            }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <h4 style={{
              fontSize: isFirstCell ? 'clamp(1.5rem,2.5vw,2.25rem)' : 'clamp(1rem,1.5vw,1.35rem)',
              fontWeight: 600,
              letterSpacing: '-0.03em',
              color: B.white,
              lineHeight: 1.15,
              flex: 1
            }}>
              {outcome.title}
            </h4>
            <div style={{
              width: '32px',
              height: '2px',
              background: B.crimson,
              marginTop: 'auto',
              flexShrink: 0
            }} />
          </div>;
        })}
      </div>
    </div>
  </section>;
};

// ─── AdvisoryFacultySection ───────────────────────────────
const AdvisoryFacultySection = () => {
  return <section className="py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-12 lg:px-16" style={{
    backgroundColor: '#0D0D0D',
    display: 'none',
    borderBottom: '1px solid rgba(255,255,255,0.06)'
  }}>
    <div className="max-w-[1440px] mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 md:mb-16 gap-5 sm:gap-6 md:gap-8">
        <div className="max-w-2xl">
          <Eyebrow light={true}>EmpowaWorx™ ESG, Sustainability &amp; Economic Development Advisory</Eyebrow>
          <h2 className="font-semibold uppercase" style={{
            color: '#ffffff',
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
          color: 'rgba(255,255,255,0.65)',
          fontSize: 'clamp(14px, 1.5vw, 17px)',
          fontWeight: 400,
          lineHeight: 1.75
        }}>
          Our team combines data-driven insights with deep-rooted cultural connections across the African continent.
        </p>
      </div>

      {/* Member cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-7 w-full">
        {TEAM.map(member => <div key={member.id} className="group transition-all w-full overflow-hidden" style={{
          border: '1px solid rgba(255,255,255,0.06)'
        }} onMouseEnter={e => {
          (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(252,54,55,0.2)';
        }} onMouseLeave={e => {
          (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.06)';
        }}>
          <div className="flex flex-col sm:grid sm:grid-cols-5 h-full">
            <div className="sm:col-span-2 overflow-hidden aspect-square">
              <img src={member.portrait} alt={member.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0" style={{
                display: 'block'
              }} />
            </div>
            <div className="sm:col-span-3 p-5 sm:p-6 md:p-8 flex flex-col justify-start" style={{
              backgroundColor: '#161616'
            }}>
              <h3 className="font-semibold uppercase mb-1" style={{
                fontFamily: "'Inter', sans-serif",
                color: '#ffffff',
                fontSize: 'clamp(1rem, 2.5vw, 1.65rem)',
                letterSpacing: '-0.03em',
                lineHeight: 1.05
              }}>
                {member.name}
              </h3>
              <p className="pb-4 mb-4 sm:mb-5" style={{
                color: B.crimson,
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                borderBottom: '1px solid rgba(252,54,55,0.1)',
                lineHeight: 1.5
              }}>
                {member.role}
              </p>
              <p style={{
                color: 'rgba(255,255,255,0.6)',
                fontSize: 'clamp(13px, 1.5vw, 15px)',
                fontWeight: 400,
                lineHeight: 1.75,
                fontStyle: 'italic'
              }}>
                <span>&ldquo;</span><span>{member.description}</span><span>&rdquo;</span>
              </p>
              <div className="mt-5 sm:mt-6 flex gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer" style={{
                  background: 'rgba(255,255,255,0.05)',
                  color: '#ffffff'
                }} onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.background = B.crimson;
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
                  (e.currentTarget as HTMLDivElement).style.background = B.crimson;
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

      {/* Collective Value Proposition */}
      <div className="mt-12 md:mt-16 p-6 md:p-10 border-t border-white/5" style={{ background: '#161616' }}>
        <h4 style={{
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: B.crimson,
          marginBottom: '12px',
          fontFamily: 'Inter, sans-serif'
        }}>
          Collective Value Proposition
        </h4>
        <p style={{
          color: 'rgba(255,255,255,0.6)',
          fontSize: 'clamp(14px, 1.5vw, 16px)',
          lineHeight: 1.8,
          margin: 0,
          fontFamily: 'Inter, sans-serif',
          fontWeight: 400
        }}>
          The EmpowaWorx™ ESG, Sustainability &amp; Economic Development Advisory Practice brings together a multidisciplinary team of experienced sustainability, ESG and economic inclusion practitioners. Collectively, the team advises organisations on embedding ESG, sustainability, responsible business, ethical leadership and shared value principles into strategy, governance and operations, helping clients navigate complex challenges, accelerate climate and social impact ambitions, strengthen stakeholder trust and unlock long-term value creation.
        </p>
      </div>
    </div>
  </section>;
};

// ─── CTAStripSection ─────────────────────────────────────
const CTAStripSection = () => {
  return <section className="px-6 md:px-16 lg:px-24 py-20 lg:py-24" style={{
    backgroundImage: `url(https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1600&q=80)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative'
  }}>
    {/* Crimson gradient overlay */}
    <div style={{
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(135deg, rgba(252,54,55,0.92) 0%, rgba(224,47,48,0.88) 100%)',
      zIndex: 0
    }} />
    <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12" style={{
      position: 'relative',
      zIndex: 1
    }}>
      {/* Headline */}
      <h2 style={{
        fontSize: 'clamp(2rem,4vw,3.5rem)',
        fontWeight: 600,
        letterSpacing: '-0.04em',
        lineHeight: 0.92,
        color: B.white,
        maxWidth: '640px'
      }}>
        Ready To Build Your ESG Legacy?
      </h2>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 shrink-0">
        <a href="/contact" style={{
          background: B.white,
          color: B.crimson,
          padding: '18px 40px',
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.18em',
          border: `2px solid ${B.white}`,
          cursor: 'pointer',
          transition: 'background 0.25s ease, color 0.25s ease',
          textDecoration: 'none'
        }} onMouseEnter={e => {
          (e.currentTarget as HTMLAnchorElement).style.background = B.charcoal;
          (e.currentTarget as HTMLAnchorElement).style.color = B.white;
          (e.currentTarget as HTMLAnchorElement).style.borderColor = B.charcoal;
        }} onMouseLeave={e => {
          (e.currentTarget as HTMLAnchorElement).style.background = B.white;
          (e.currentTarget as HTMLAnchorElement).style.color = B.crimson;
          (e.currentTarget as HTMLAnchorElement).style.borderColor = B.white;
        }}>
          Partner With Us
        </a>
        <a href="#advisory-esg-services" style={{
          background: 'transparent',
          color: B.white,
          padding: '18px 40px',
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.18em',
          border: `2px solid ${B.white}`,
          cursor: 'pointer',
          transition: 'background 0.25s ease, color 0.25s ease',
          textDecoration: 'none'
        }} onMouseEnter={e => {
          (e.currentTarget as HTMLAnchorElement).style.background = B.white;
          (e.currentTarget as HTMLAnchorElement).style.color = B.crimson;
        }} onMouseLeave={e => {
          (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
          (e.currentTarget as HTMLAnchorElement).style.color = B.white;
        }}>
          Explore Services
        </a>
      </div>
    </div>
  </section>;
};

// ─── Main Component ──────────────────────────────────────

// ─── useScrollDirection ──────────────────────────────────────
function useScrollDirection() {
  const [scrollY, setScrollY] = React.useState(0);
  React.useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return scrollY;
}

export const ESGAdvisoryPage = () => {
  const reducedMotion = usePrefersReducedMotion();
  const scrollY = useScrollDirection();
  const heroParallaxY = reducedMotion ? 0 : scrollY * 0.4;

  const width = useWindowWidth();
  const isMobile = width < 1024;
  const isTablet = width >= 768 && width < 1024;

  const [introExpanded, setIntroExpanded] = React.useState(false);

  const {
    ref: heroRef,
    inView: heroInView
  } = useBidirectionalInView<HTMLDivElement>(0.1);
  const {
    ref: mandateRef,
    inView: mandateInView
  } = useBidirectionalInView<HTMLDivElement>(0.1);
  const {
    ref: valueBreakRef,
    inView: valueBreakInView
  } = useBidirectionalInView<HTMLDivElement>(0.1);

  const hPadWide = isMobile ? '16px' : isTablet ? '40px' : '96px';
  const vPadSm = isMobile ? '56px' : '80px';

  return <div className="grain-overlay relative min-h-screen overflow-x-clip" style={{
    fontFamily: "'Inter', system-ui, sans-serif"
  }}>
    <style>{GLOBAL_STYLES}</style>

    <Header />

    {/* ── Hero Section ──────────────────────────────────── */}
    <section ref={heroRef} className="relative flex items-start justify-end" style={{
      display: 'flex',
      alignItems: 'flex-start',
      minHeight: '100svh',
      background: '#0A0A0A',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      paddingBottom: 'clamp(48px, 6vw, 72px)'
    }}>
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/empowayouth-3.jpg"
          className="w-full h-full object-cover opacity-40 grayscale animate-[scaleUp_15s_ease-out_infinite_alternate]"
          alt="ESG Hero"
          style={{
            transform: `translateY(${heroParallaxY}px)`,
            willChange: 'transform'
          }}
        />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to top, #0A0A0A 0%, transparent 60%)'
        }} />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-12 w-full mt-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="mb-4">
          <Eyebrow light>Africa's Leading Growth, Reputation, Influence &amp; Impact Advisory Firm</Eyebrow>
        </motion.div>

        <div className="mb-6 sm:mb-8">
          <HeroHeadline reducedMotion={reducedMotion} inView={heroInView} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="flex flex-row flex-wrap items-center gap-5"
        >
          <a href="/contact" className="cta-primary group">
            <span>Partner With Us</span>
            <div className="cta-icon-container">
              <ArrowUpRight size={14} className="text-[#1E1E1E]" />
            </div>
          </a>
          <a href="#advisory-esg-services" className="cta-secondary group">
            <span>Explore Services</span>
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-12 right-12 hidden lg:block">
        <div className="flex items-center gap-4">
          <span style={{
            color: 'rgba(255,255,255,0.2)',
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.3em',
            writingMode: 'vertical-rl',
          }}>
            ADVISORY
          </span>
          <div className="w-[1px] h-32 relative" style={{
            background: 'rgba(255,255,255,0.1)'
          }}>
            <motion.div animate={{
              y: [0, 128, 0]
            }} transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut'
            }} className="absolute top-0 left-0 w-full h-8" style={{
              background: B.crimson
            }} />
          </div>
        </div>
      </div>
    </section>

    {/* ── Impact Stat Strip ─────────────────────────────── */}
    <ImpactStatStrip />

    {/* ── Ticker Strip ─────────────────────────────────── */}
    <div className="py-6 overflow-hidden" style={{
      background: B.crimson
    }}>
      <div className="ticker-track">
        {TICKER_ITEMS.map((item, i) => <div key={`tick-${i}`} className="flex items-center gap-12 px-12">
          <span style={{
            color: B.white,
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.2em',
            whiteSpace: 'nowrap',
          }}>
            {item}
          </span>
          <span className="w-2 h-2 shrink-0" style={{
            background: B.white
          }} />
        </div>)}
      </div>
    </div>

    {/* ── Practice Intro (collapsible overview section) ── */}
    <section style={{
      background: '#0D0D0D',
      paddingTop: vPadSm,
      paddingBottom: vPadSm,
      paddingLeft: hPadWide,
      paddingRight: hPadWide,
      borderBottom: '1px solid rgba(255,255,255,0.06)'
    }}>
      <div ref={mandateRef} style={{
        width: '100%',
        maxWidth: isMobile ? '100%' : isTablet ? '720px' : '860px',
        opacity: mandateInView || reducedMotion ? 1 : 0,
        transform: mandateInView || reducedMotion ? 'none' : 'translateY(30px)',
        transition: 'opacity 0.8s cubic-bezier(0.21, 0.47, 0.32, 0.98), transform 0.8s cubic-bezier(0.21, 0.47, 0.32, 0.98)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: isMobile ? '16px' : '32px',
          flexDirection: isMobile ? 'column' : 'row'
        }}>
          <div style={{
            width: '3px',
            height: '48px',
            background: B.crimson,
            flexShrink: 0,
            marginTop: isMobile ? 0 : '6px'
          }} />
          <div style={{
            flex: 1,
            minWidth: 0
          }}>
            <Eyebrow light={true}>Practice Overview</Eyebrow>
            <h3 style={{
              fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.3,
              marginBottom: '1rem',
              letterSpacing: '-0.02em'
            }}>
              EmpowaWorx™ ESG, Sustainability &amp; Economic Development Advisory
            </h3>
            <p style={{
              fontSize: 'clamp(1.05rem, 2.5vw, 1.25rem)',
              fontWeight: 300,
              color: '#ffffff',
              lineHeight: 1.6,
              letterSpacing: '-0.01em',
              marginBottom: '1.25rem'
            }}>
              EmpowaWorx™ partners with organisations, governments, development institutions, investors and industry leaders to advance sustainable growth, economic inclusion and responsible business practices that create long-term value for stakeholders, communities and society.
            </p>

            <div style={{
              maxHeight: introExpanded ? '1000px' : '0',
              overflow: 'hidden',
              transition: 'max-height 0.6s cubic-bezier(0.21,0.47,0.32,0.98)'
            }}>
              <div className="space-y-5" style={{
                fontSize: 'clamp(0.95rem, 2vw, 1.05rem)',
                fontWeight: 300,
                color: 'rgba(255,255,255,0.6)',
                lineHeight: 1.7,
                paddingTop: '0.5rem',
                paddingBottom: '0.5rem'
              }}>
                <p>
                  We design and deliver integrated, intelligence-led solutions that transform sustainability into strategy, ESG into competitive advantage, partnerships into impact, investment into development and economic participation into shared prosperity.
                </p>
                <p>
                  Combining ESG advisory, sustainability strategy, economic development, social impact, sustainable finance, stakeholder engagement and impact intelligence, we help organisations strengthen resilience, mobilise resources, accelerate inclusive growth and deliver measurable environmental, social and economic outcomes.
                </p>
                <p>
                  From strategy to execution, EmpowaWorx™ empowers organisations to lead responsibly, grow sustainably, create shared value and build enduring economic, environmental and societal impact.
                </p>
              </div>
            </div>

            <button
              onClick={() => setIntroExpanded(prev => !prev)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                marginTop: '1.5rem',
                background: 'none',
                border: 'none',
                padding: '0.5rem 0',
                cursor: 'pointer',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: B.crimson,
                minHeight: '44px'
              }}
            >
              <span>{introExpanded ? 'Read less' : 'Read more'}</span>
              <ChevronDown size={14} style={{
                transition: 'transform 0.3s ease',
                transform: introExpanded ? 'rotate(180deg)' : 'rotate(0deg)'
              }} />
            </button>
          </div>
        </div>
      </div>
    </section>

    {/* ── Value Proposition Break Section ─────────── */}
    <section ref={valueBreakRef} style={{
      background: B.charcoal,
      overflow: 'hidden'
    }}>
      <div className="max-w-[1600px] mx-auto px-6 md:px-16 lg:px-24 py-32 lg:py-40 flex flex-col lg:flex-row gap-16 lg:gap-24">
        {/* Left column: 60% — pull quote */}
        <div style={{
          width: '100%'
        }} className="lg:w-[60%]">
          <motion.div initial={{
            opacity: 0,
            x: -30
          }} animate={valueBreakInView ? {
            opacity: 1,
            x: 0
          } : {}} transition={{
            duration: 0.9
          }}>
            <Eyebrow light>The Strategic Driver</Eyebrow>
            <h2 style={{
              fontSize: 'clamp(1.75rem,3.5vw,3rem)',
              fontWeight: 600,
              lineHeight: 0.95,
              letterSpacing: '-0.04em',
              color: B.white,
              marginTop: '8px',
              marginBottom: '40px'
            }}>
              <span>ESG, sustainability, and economic development are no longer compliance obligations — they are </span>
              <span style={{
                color: B.crimson
              }}>strategic drivers of growth, competitiveness, and organisational resilience.</span>
            </h2>
          </motion.div>
        </div>

        {/* Right column: 40% — value pillars */}
        <div style={{
          width: '100%'
        }} className="lg:w-[40%]">
          <motion.div initial={{
            opacity: 0,
            x: -20
          }} animate={valueBreakInView ? {
            opacity: 1,
            x: 0
          } : {}} transition={{
            duration: 0.9,
            delay: 0.2
          }} className="flex flex-col gap-8">
            {VALUE_PILLARS.map(pillar => <div key={pillar.id} style={{
              borderLeft: `3px solid ${B.crimson}`,
              paddingLeft: '20px'
            }}>
              <p style={{
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.15em',

                color: B.white,
                marginBottom: '6px'
              }}>
                {pillar.label}
              </p>
              <p style={{
                fontSize: '14px',
                fontWeight: 400,
                lineHeight: 1.65,
                color: 'rgba(255,255,255,0.5)'
              }}>
                {pillar.description}
              </p>
            </div>)}
          </motion.div>
        </div>
      </div>
    </section>

    {/* ── Services Section ─────────────────── */}
    <div id="advisory-esg-services" style={{ scrollMarginTop: '150px' }}>
      <ServicesSection />
    </div>

    {/* ── Commercial Outcomes ──────────────── */}
    <CommercialOutcomesSection />

    {/* ── Advisory Faculty ─────────────────── */}
    <AdvisoryFacultySection />

    {/* ── CTA Strip ───────────────────────────────── */}
    <section className="px-6 md:px-16 lg:px-24 py-20 lg:py-24" style={{
      backgroundImage: `url(https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1600&q=80)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative'
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(135deg, rgba(252,54,55,0.92) 0%, rgba(224,47,48,0.88) 100%)',
        zIndex: 0
      }} />
      <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12" style={{
        position: 'relative',
        zIndex: 1
      }}>
        <h2 style={{
          fontSize: 'clamp(1.75rem,3.5vw,3rem)',
          fontWeight: 600,
          letterSpacing: '-0.04em',
          lineHeight: 0.92,
          color: B.white,
          maxWidth: '640px'
        }}>
          Ready To Build Your ESG Legacy?
        </h2>
        <div className="flex flex-wrap items-center gap-4 shrink-0">
          <a href="/contact" className="cta-primary group h-[56px] min-w-[180px] md:min-w-[200px]" style={{ background: B.white, color: B.crimson }}>
            <span>Partner With Us</span>
            <div className="cta-icon-container" style={{ background: B.crimson }}>
              <ArrowUpRight size={14} className="text-white" />
            </div>
          </a>
          <a href="#advisory-esg-services" className="cta-secondary group h-[56px] min-w-[160px] md:min-w-[180px]" style={{ borderColor: B.white, color: B.white }}>
            <span>Explore Services</span>
          </a>
        </div>
      </div>
    </section>

    {/* ── CLOSING CTA ─── */}
    <section style={{
      background: '#0F0F0F',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      padding: isMobile ? '64px 20px' : '96px 80px',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 2
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
          marginRight: 'auto',
          marginLeft: 'auto'
        }}>
          EmpowaWorx™ helps organisations capture their most critical milestones, share their narratives, and showcase their pan-African impact.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="/contact" className="cta-primary group h-[56px] min-w-[180px] md:min-w-[200px]">
            <span>Partner With Us</span>
            <div className="cta-icon-container">
              <ArrowUpRight size={14} className="text-[#1E1E1E]" />
            </div>
          </a>
          <a href="#advisory-esg-services" className="cta-secondary group h-[56px] min-w-[160px] md:min-w-[180px]">
            <span>Explore Services</span>
          </a>
        </div>
      </div>
      <AfricaWatermark isMobile={isMobile} />
    </section>

    <Footer />
  </div>;
};
