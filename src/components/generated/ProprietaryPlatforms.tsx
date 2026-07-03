import React from 'react';
import { usePageMeta } from '../../hooks/usePageMeta';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Star, Menu, X, Linkedin, Instagram, Facebook, Youtube, Twitter } from 'lucide-react';
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

// ─── Data ────────────────────────────────────────────────
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
  label: 'Advisory',
  href: '#'
}, {
  id: 'n4',
  label: 'Platforms',
  href: '#',
  active: true
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
const FOOTER_PLATFORM_LINKS = [{
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
  label: 'EmpowaHIM™',
  href: '#'
}, {
  id: 'fp7',
  label: 'EmpowaMen™',
  href: '#'
}, {
  id: 'fp8',
  label: 'The Speakers Firm™',
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
const TICKER_ITEMS_BASE = [{
  id: 't1',
  text: 'GROWTH ENGINE'
}, {
  id: 't2',
  text: 'STAKEHOLDER ENGAGEMENT'
}, {
  id: 't3',
  text: 'MARKET ACCESS'
}, {
  id: 't4',
  text: 'LEADERSHIP DEVELOPMENT'
}, {
  id: 't5',
  text: 'WOMEN IN BUSINESS'
}, {
  id: 't6',
  text: 'REPUTATION'
}, {
  id: 't7',
  text: 'IMPACT'
}, {
  id: 't8',
  text: 'ENTERPRISE GROWTH'
}, {
  id: 't9',
  text: 'PAN-AFRICAN ECOSYSTEMS'
}, {
  id: 't10',
  text: 'THOUGHT LEADERSHIP'
}];
const STATS = [{
  id: 's1',
  label: 'Platforms',
  value: 8,
  prefix: '',
  suffix: ''
}, {
  id: 's2',
  label: 'Women Engaged',
  value: 50000,
  prefix: '',
  suffix: '+'
}, {
  id: 's3',
  label: 'Youth Mobilised',
  value: 198000,
  prefix: '',
  suffix: '+'
}, {
  id: 's4',
  label: 'Facilitated',
  value: 500,
  prefix: 'R',
  suffix: ''
}];

const isLightLogo = (logoUrl: string) => {
  const url = logoUrl.toLowerCase();
  return url.includes('wh') || url.includes('empowamen_logo_alternate') || url.includes('empowamen-logo') || url.includes('the_speakers_firm_logo');
};

const getLogoBg = (name: string, isDarkRow: boolean): string => {
  const normName = name.toLowerCase();
  if (normName.includes('entrepreneur')) {
    return '#161616';
  }
  if (normName.includes('men') && !normName.includes('women')) {
    return '#161616';
  }
  if (normName.includes('growth')) {
    return '#ffffff';
  }
  if (normName.includes('speaker')) {
    return '#ffffff';
  }
  return isDarkRow ? '#161616' : '#ffffff';
};

const PLATFORMS = [{
  id: '01',
  name: 'EmpowaWomen™',
  tagline: "Africa's Leading Women's Leadership, Entrepreneurship & Economic Empowerment Platform",
  description: 'Convening influential women leaders, entrepreneurs, executives, investors, policymakers, and changemakers to accelerate leadership, economic participation, enterprise growth, governance excellence, and wealth creation.',
  imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&q=80',
  logoUrl: '/propriety_logos/empowawomen-logo.png',
  websiteUrl: 'https://www.empowawomen.co.za/'
}, {
  id: '02',
  name: 'EmpowaYouth™',
  tagline: "Africa's Premier Youth Development, Employability & Future Economy Platform",
  description: "Connecting young people to opportunities, skills, employment pathways, entrepreneurship, innovation, funding, technology, and leadership development to build Africa's future workforce and economic contributors.",
  imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900&q=80',
  logoUrl: '/propriety_logos/empowayouth-logo-2.png',
  websiteUrl: 'https://empowayouth.co.za/'
}, {
  id: '03',
  name: 'EmpowaGrowth™',
  tagline: "Africa's Executive Growth, Leadership & Business Performance Platform",
  description: 'Designed for executives, business leaders, entrepreneurs, and organisations seeking to strengthen leadership capability, improve competitiveness, accelerate growth, drive innovation, and build future-ready enterprises.',
  imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=80',
  logoUrl: '/propriety_logos/empowagrowth-logo.png',
  websiteUrl: 'https://www.empowagrowth.co.za/'
}, {
  id: '04',
  name: 'EmpowaEntrepreneurs™',
  tagline: "Africa's Premier Funding, Enterprise Development & Entrepreneurial Growth Platform",
  description: 'Connecting entrepreneurs, SMEs, startups, corporates, investors, funders, and ecosystem partners to capital, markets, strategic partnerships, business support, and growth opportunities.',
  imageUrl: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=900&q=80',
  logoUrl: '/propriety_logos/ee-logo-wh.png',
  websiteUrl: 'https://www.empowaentrepreneurs.co.za/'
}, {
  id: '05',
  name: 'EmpowaHER™',
  tagline: "Developing Africa's Next Generation of Women Leaders",
  description: 'A high-impact leadership, mentorship, entrepreneurship, employability, and personal development platform empowering young women to unlock their potential, build confidence, access opportunities, and participate meaningfully in the future economy.',
  imageUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=900&q=80',
  logoUrl: '/propriety_logos/empowaher-logo.png',
  websiteUrl: 'https://www.empowawomen.co.za/'
}, {
  id: '06',
  name: 'EmpowaHIM™',
  tagline: 'Developing Purpose-Driven Men for a Changing World',
  description: 'Equipping young men and emerging leaders with the tools, networks, mindset, leadership capability, financial literacy, entrepreneurial skills, and social awareness required to thrive in a rapidly evolving society and economy.',
  imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=900&q=80',
  logoUrl: '/propriety_logos/empowamen_logo_alternate.png',
  websiteUrl: 'https://www.empowamen.co.za/'
}, {
  id: '07',
  name: 'The Speakers Firm™',
  tagline: "Africa's Leading Speaker Management & Thought Leadership Agency",
  description: 'Connecting organisations with world-class keynote speakers, moderators, facilitators, industry experts, authors, business leaders, innovators, and influential voices capable of shaping conversations, inspiring action, and delivering impact.',
  imageUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=900&q=80',
  logoUrl: '/propriety_logos/the_speakers_firm_logo.png',
  websiteUrl: 'https://thespeakersfirm.co.za/'
}, {
  id: '08',
  name: 'EmpowaMen™',
  tagline: "Africa's Leading Men's Leadership, Growth & Impact Platform",
  description: 'Advancing positive masculinity, leadership excellence, entrepreneurship, wellness, fatherhood, financial empowerment, workplace performance, and social impact among men across the continent.',
  imageUrl: '/empowamen.jpg',
  logoUrl: '/propriety_logos/empowamen_logo_alternate.png',
  websiteUrl: 'https://www.empowamen.co.za/'
}];
const PARTNER_CHIPS = [{
  id: 'pc1',
  label: 'EmpowaWomen'
}, {
  id: 'pc2',
  label: 'EmpowaYouth'
}, {
  id: 'pc3',
  label: 'The Speakers Firm'
}, {
  id: 'pc4',
  label: '5 More'
}];
const CREED_ITEMS = [{
  id: 'cr1',
  text: 'Building Trust'
}, {
  id: 'cr2',
  text: 'Building Brands'
}, {
  id: 'cr3',
  text: 'Shaping Narratives'
}, {
  id: 'cr4',
  text: 'Managing Reputations'
}, {
  id: 'cr5',
  text: 'Influencing Stakeholders'
}, {
  id: 'cr6',
  text: 'Accelerating Growth'
}];
const HERO_LINE_1 = ['Our', 'Proprietary', '/'];
const HERO_LINE_2 = ['Platforms.'];
const EASE_SMOOTH = [0.21, 0.47, 0.32, 0.98] as [number, number, number, number];
const EASE = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];
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


// ─── Sub-components ──────────────────────────────────────
const RatingStars = () => <div className="flex gap-0.5">
  {[0, 1, 2, 3, 4].map(i => <Star key={i} size={10} className={cn('fill-[#C9963A] text-[#C9963A]', i === 4 && 'opacity-40')} />)}
</div>;
const HeroHeadline = ({
  reducedMotion,
  inView,
  isMobile
}: {
  reducedMotion: boolean;
  inView: boolean;
  isMobile: boolean;
}) => {
  const line1Count = HERO_LINE_1.length;
  const headlineClass = isMobile ? 'text-[clamp(48px,14vw,80px)] font-semibold text-white leading-[0.95] tracking-[-0.05em] whitespace-normal' : 'text-[clamp(44px,5.5vw,80px)] font-semibold text-white leading-[0.95] tracking-[-0.05em] whitespace-nowrap';
  if (reducedMotion) {
    return <div className="flex flex-col">
      <h1 className={headlineClass}>{HERO_LINE_1.join(' ')}</h1>
      <h1 className={headlineClass}>
        <span style={{
          color: '#FC3637'
        }}>{HERO_LINE_2.join(' ')}</span>
      </h1>
    </div>;
  }
  return <div className="flex flex-col">
    <h1 className={cn(headlineClass, 'flex flex-wrap gap-[0.18em]')}>
      {HERO_LINE_1.map((word, i) => <span key={`l1-${i}`} style={{
        display: 'inline-block',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.7s cubic-bezier(0.25,0.46,0.45,0.94) ${i * 80}ms, transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94) ${i * 80}ms`
      }}>
        {word}
      </span>)}
    </h1>
    <h1 className={cn(headlineClass, 'flex flex-wrap gap-[0.18em]')}>
      {HERO_LINE_2.map((word, i) => {
        const globalIdx = line1Count + i;
        const isLastWord = i === HERO_LINE_2.length - 1;
        return <span key={`l2-${i}`} style={{
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
  return <div className="w-full bg-[#111111] overflow-hidden py-6 border-t border-white/5">
    <div className="ticker-track">
      {allItems.map(item => <div key={item.uid} className="flex items-center shrink-0 px-8">
        <span className="text-[14px] font-bold tracking-[0.2em] uppercase text-white/90">{item.text}</span>
        <span className="ml-8 text-[#FC3637] text-[10px]">◆</span>
      </div>)}
    </div>
  </div>;
};

// ─── StatItem ─────────────────────────────────────────
const StatItem = ({
  label,
  value,
  prefix,
  suffix,
  isMobile
}: {
  label: string;
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
    paddingTop: isMobile ? '2rem' : '3rem',
    paddingBottom: isMobile ? '2rem' : '3rem',
    paddingLeft: isMobile ? '1.5rem' : '2.5rem',
    paddingRight: isMobile ? '1.5rem' : '2.5rem'
  }} className="border-r border-white/10 last:border-r-0 overflow-hidden">
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      height: '3px',
      background: '#FC3637',
      width: isVisible ? '100%' : '0%',
      transition: 'width 0.9s cubic-bezier(0.21,0.47,0.32,0.98)'
    }} />
    <div className="text-[11px] font-black text-[#FC3637] uppercase tracking-[0.3em] mb-3">{label}</div>
    <div style={{
      fontSize: isMobile ? 'clamp(36px,9vw,56px)' : 'clamp(48px,6vw,88px)',
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

// ─── Africa Watermark SVG ─────────────────────────────────


// ─── Main Component ───────────────────────────────────────
export const ProprietaryPlatformsPage = () => {
  usePageMeta({
    title: "Proprietary Platforms - Empowering African Ecosystems",
    description: "Explore EmpowaWorx's ecosystem platforms including EmpowaYouth, EmpowaWomen, EmpowaMen, EmpowaEntrepreneurs, and The Speakers Firm."
  });
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
  const [hoveredPlatform, setHoveredPlatform] = React.useState<string | null>(null);
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

  // Platform row layout based on breakpoint
  const platformArticleStyle = (isHovered: boolean, isDarkRow: boolean): React.CSSProperties => {
    const defaultBg = isDarkRow ? '#111111' : '#ffffff';
    const hoverBg = isDarkRow ? '#1c1c1c' : '#f5f5f5';
    const borderCol = isDarkRow ? 'rgba(255,255,255,0.06)' : 'rgba(30,30,30,0.07)';
    if (isMobile) {
      return {
        backgroundColor: defaultBg,
        borderBottom: `1px solid ${borderCol}`,
        display: 'flex',
        flexDirection: 'column',
        cursor: 'default'
      };
    }
    return {
      backgroundColor: isHovered ? hoverBg : defaultBg,
      borderBottom: `1px solid ${borderCol}`,
      display: 'flex',
      alignItems: 'stretch',
      minHeight: isTablet ? '220px' : '280px',
      boxShadow: isHovered ? '0 4px 40px rgba(0,0,0,0.2)' : 'none',
      transition: 'background-color 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease',
      cursor: 'default'
    };
  };
  return <div className="w-full bg-white font-sans selection:bg-[#FC3637] selection:text-white overflow-x-clip">

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

    {/* ── HEADER ─── */}
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
      {/* Full-bleed parallax background image */}
      <div aria-hidden="true" style={{
        position: 'absolute',
        inset: '-20%',
        overflow: 'hidden',
        pointerEvents: 'none'
      }}>
        <img src="/empowayouth.jpg" alt="" style={{
          width: '100%',
          height: '140%',
          objectFit: 'cover',
          objectPosition: 'center top',
          display: 'block',
          filter: 'grayscale(1) brightness(0.55)',
          transform: `translateY(${heroParallaxY}px)`,
          willChange: 'transform'
        }} />
      </div>

      {/* Gradient overlays */}
      <div aria-hidden="true" style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, rgba(10,8,8,0.55) 0%, rgba(10,8,8,0.30) 40%, rgba(10,8,8,0.78) 100%)',
        pointerEvents: 'none'
      }} />
      <div aria-hidden="true" style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to right, rgba(10,8,8,0.65) 0%, rgba(10,8,8,0.20) 60%, transparent 100%)',
        pointerEvents: 'none'
      }} />
      <div aria-hidden="true" style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 100% 100%, rgba(252,54,55,0.12) 0%, transparent 50%)',
        pointerEvents: 'none'
      }} />

      <div className="relative w-full" style={{
        zIndex: 10,
        paddingLeft: isMobile ? '20px' : isTablet ? '40px' : '96px',
        paddingRight: isMobile ? '20px' : isTablet ? '40px' : '96px',
        paddingTop: 'clamp(80px, 8vh, 120px)',
        paddingBottom: 'clamp(40px, 5vh, 60px)'
      }}>
        {/* Hero subtext — hidden on mobile */}
        <div ref={heroSubRef as React.RefObject<HTMLDivElement>} className="hidden md:block max-w-[500px] mb-10" style={S(heroSubInView, 150)}>
          <p className="text-lg md:text-xl font-medium text-white/70 leading-tight tracking-tight">
            <span>Africa's leading growth, reputation, influence &amp; impact advisory firm. 100% Black-owned. 200+ years collective experience.</span>
          </p>
        </div>

        <div className="flex flex-col gap-8 md:gap-12 lg:gap-16">
          <div>
            <HeroHeadline reducedMotion={reducedMotion} inView={heroInView} isMobile={isMobile} />
          </div>

          <div className={cn('flex items-start', isMobile ? 'flex-col gap-4' : 'flex-wrap items-center gap-10 md:gap-14')}>
            <motion.div initial={{
              opacity: 0,
              scale: 0.95
            }} animate={{
              opacity: 1,
              scale: 1
            }} transition={{
              delay: 0.7,
              duration: 0.6,
              ease: EASE
            }} className={cn('flex items-center gap-4', isMobile ? 'flex-col w-full' : 'flex-wrap gap-6 md:gap-9')}>
              <a href="#platforms-list" className="cta-primary group w-full md:w-auto">
                <span>Explore Platforms</span>
                <div className="cta-icon-container">
                  <ArrowUpRight size={14} className="text-[#1E1E1E]" />
                </div>
              </a>
              <a href="/contact" className="cta-secondary group w-full md:w-auto">
                <span>Partner With Us</span>
              </a>
            </motion.div>

            <motion.div initial={{
              opacity: 0
            }} animate={{
              opacity: 1
            }} transition={{
              delay: 0.9,
              duration: 0.6
            }} className={cn('flex flex-col gap-3', isMobile ? 'mt-4' : '')}>
              <div className="flex items-center gap-2">
                <RatingStars />
                <span className="text-[11px] font-bold text-white tracking-tight">4.9 / 5</span>
              </div>
              <div className="flex flex-col text-[13px] font-medium leading-tight">
                <span className="text-white">50,000+ women leaders engaged</span>
                <span className="text-white/40">across Africa through our platforms.</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom ticker strip inside hero */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        padding: '1rem 1.5rem',
        background: 'rgba(0,0,0,0.5)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <p className="text-white/50 font-medium text-[12px] uppercase tracking-[0.18em]">Pan-African Proprietary Platforms</p>
        <p className="text-[#FC3637] font-bold text-[11px] uppercase tracking-[0.18em] hidden md:block">8 Platforms · 50,000+ Women Leaders</p>
      </div>
    </section>

    {/* ── TICKER STRIP ─── */}
    <TickerStrip />

    {/* ── SECTION 2: ECOSYSTEM OVERVIEW ─── */}
    <section style={{
      paddingTop: isMobile ? '64px' : isTablet ? '80px' : '128px',
      paddingBottom: isMobile ? '64px' : isTablet ? '80px' : '128px',
      paddingLeft: isMobile ? '20px' : isTablet ? '40px' : '80px',
      paddingRight: isMobile ? '20px' : isTablet ? '40px' : '80px',
      background: '#0D0D0D',
      borderBottom: '1px solid rgba(255,255,255,0.06)'
    }}>
      <div className="grid lg:grid-cols-[1fr_1px_1fr] gap-0 items-start">
        {/* Left column */}
        <div className="flex flex-col">
          <span className="text-[#FC3637] text-[11px] font-black uppercase tracking-[0.3em] mb-6">ECOSYSTEM OVERVIEW</span>
          <h2 className="font-semibold tracking-tight leading-[1.1] mb-8" style={{
            color: '#ffffff',
            fontSize: isMobile ? '1.875rem' : isTablet ? '2.25rem' : 'clamp(2.25rem, 5vw, 3.75rem)'
          }}>
            Proprietary Platforms That Drive Africa Forward
          </h2>
        </div>

        {/* Vertical 1px divider — desktop only */}
        <div aria-hidden="true" className="hidden lg:block" style={{
          width: '1px',
          alignSelf: 'stretch',
          background: 'linear-gradient(to bottom, transparent, #FC3637, transparent)',
          margin: '0 2rem'
        }} />

        {/* Right column */}
        <div className="flex flex-col mt-8 lg:mt-0 lg:pl-16">
          <p className="text-white/60 text-lg leading-relaxed mb-6 font-medium">
            At EmpowaWorx™, we believe that sustainable growth is built through ecosystems, not isolated interventions. Our proprietary platforms provide organisations with direct access to influential decision-makers, policymakers, investors, entrepreneurs, executives, professionals, media leaders, emerging talent, and communities shaping Africa's future.
          </p>
          <blockquote style={{
            borderLeft: '3px solid #FC3637',
            paddingLeft: '1.5rem',
            margin: '0',
            fontFamily: "'Playfair Display', serif",
            fontStyle: 'italic',
            fontSize: isMobile ? '1rem' : 'clamp(1.05rem, 1.6vw, 1.25rem)',
            color: 'rgba(255, 255, 255, 0.85)',
            lineHeight: 1.6
          }}>
            Collectively, these platforms serve as engines for stakeholder engagement, market access, thought leadership, partnership development, talent acceleration, economic inclusion, and impact creation.
          </blockquote>
        </div>
      </div>
    </section>

    {/* ── STATS BAND ─── */}
    <div className="stats-diagonal-texture w-full" style={{
      display: 'grid',
      gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
      width: '100%'
    }}>
      {STATS.map((stat, idx) => <div key={stat.id} style={{
        borderBottom: isMobile && idx < 2 ? '1px solid rgba(255,255,255,0.10)' : undefined,
        borderRight: isMobile && idx % 2 === 0 ? '1px solid rgba(255,255,255,0.10)' : undefined
      }}>
        <StatItem label={stat.label} value={stat.value} prefix={stat.prefix || ''} suffix={stat.suffix || ''} isMobile={isMobile} />
      </div>)}
    </div>

    {/* ── SECTION 3: PLATFORM PROFILES ─── */}
    <section id="platforms-list" className="bg-white">
      {/* Section header */}
      <div style={{
        padding: isMobile ? '32px 20px' : isTablet ? '40px 40px 28px' : '48px 80px 32px',
        background: '#ffffff',
        borderBottom: '1px solid rgba(30,30,30,0.07)',
        display: 'flex',
        alignItems: isMobile ? 'flex-start' : 'flex-end',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between',
        gap: isMobile ? '12px' : undefined
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
            OUR PLATFORMS
          </span>
          <h2 style={{
            fontSize: isMobile ? '1.5rem' : 'clamp(28px,3.5vw,52px)',
            fontWeight: 600,
            letterSpacing: '-0.03em',
            color: '#1E1E1E',
            lineHeight: 1.1,
            margin: 0
          }}>
            Eight Engines for Growth &amp; Impact
          </h2>
        </div>
        <div style={{
          border: '1px solid rgba(30,30,30,0.12)',
          padding: '6px 16px',
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.15em',
          textTransform: 'uppercase' as const,
          color: 'rgba(30,30,30,0.5)',
          whiteSpace: 'nowrap' as const,
          alignSelf: 'flex-start',
          marginTop: '4px'
        }}>
          8 Platforms
        </div>
      </div>

      {/* Platform rows */}
      {PLATFORMS.map((platform, idx) => {
        const isHovered = !isMobile && hoveredPlatform === platform.id;
        const rowBg = getLogoBg(platform.name, idx % 2 === 1);
        const isDarkRow = rowBg === '#161616';
        return <article key={platform.id} onMouseEnter={() => !isMobile && setHoveredPlatform(platform.id)} onMouseLeave={() => !isMobile && setHoveredPlatform(null)} style={platformArticleStyle(isHovered, isDarkRow)}>
          {isMobile ?
            // ── MOBILE LAYOUT ───────────────────────────────────
            <div style={{
              display: 'flex',
              flexDirection: 'column'
            }}>
              {/* Mobile: number + eyebrow row */}
              <div style={{
                width: '100%',
                height: '48px',
                borderBottom: isDarkRow ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(30,30,30,0.07)',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: '12px',
                padding: '0 20px'
              }}>
                <span style={{
                  fontSize: '28px',
                  fontWeight: 900,
                  color: 'transparent',
                  WebkitTextStroke: isDarkRow ? '1.5px rgba(255,255,255,0.15)' : '1.5px rgba(30,30,30,0.15)',
                  lineHeight: 1,
                  userSelect: 'none',
                  flexShrink: 0
                }}>
                  {platform.id}
                </span>
                <span style={{
                  fontSize: '10px',
                  fontWeight: 800,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase' as const,
                  color: '#FC3637'
                }}>
                  {platform.name}
                </span>
              </div>

              {/* Mobile: image */}
              <div style={{
                width: '100%',
                height: '220px',
                overflow: 'hidden',
                flexShrink: 0,
                backgroundColor: getLogoBg(platform.name, isDarkRow),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '24px'
              }}>
                <img src={platform.logoUrl} alt={platform.name} style={{
                  maxWidth: '80%',
                  maxHeight: '80%',
                  objectFit: 'contain',
                  display: 'block'
                }} />
              </div>

              {/* Mobile: content — description always visible */}
              <div style={{
                padding: '24px 20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: 600,
                  letterSpacing: '-0.03em',
                  color: isDarkRow ? '#ffffff' : '#1E1E1E',
                  marginBottom: '8px',
                  lineHeight: 1.1,
                  margin: '0 0 8px 0'
                }}>
                  {platform.name}
                </h3>
                <p style={{
                  fontSize: '14px',
                  fontStyle: 'italic',
                  fontFamily: "'Playfair Display', serif",
                  color: isDarkRow ? 'rgba(255,255,255,0.55)' : 'rgba(30,30,30,0.5)',
                  marginBottom: '16px',
                  lineHeight: 1.5,
                  margin: '0 0 16px 0'
                }}>
                  {platform.tagline}
                </p>
                <p style={{
                  fontSize: '13px',
                  color: isDarkRow ? 'rgba(255,255,255,0.5)' : 'rgba(30,30,30,0.6)',
                  lineHeight: 1.7,
                  margin: 0
                }}>
                  {platform.description}
                </p>
              </div>

              {/* Mobile: CTA row */}
              <div style={{
                width: '100%',
                height: '52px',
                borderTop: isDarkRow ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(30,30,30,0.07)',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 20px'
              }}>
                <a href={platform.websiteUrl} target="_blank" rel="noopener noreferrer" style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#FC3637',
                  textDecoration: 'none'
                }}>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 800,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase' as const
                  }}>
                    Learn More
                  </span>
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </div> :
            // ── TABLET / DESKTOP LAYOUT ──────────────────────────
            <div style={{
              display: 'flex',
              alignItems: 'stretch',
              width: '100%',
              flex: 1
            }}>
              {/* A. Number column */}
              <div style={{
                width: isTablet ? '60px' : '100px',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRight: isDarkRow 
                  ? (isHovered ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(255,255,255,0.06)')
                  : (isHovered ? '1px solid rgba(30,30,30,0.07)' : '1px solid rgba(30,30,30,0.07)'),
                padding: '0 12px',
                backgroundColor: isDarkRow 
                  ? (isHovered ? '#1c1c1c' : '#111111')
                  : (isHovered ? '#f5f5f5' : '#ffffff'),
                transition: 'background-color 0.4s ease, border-color 0.4s ease'
              }}>
                <span style={{
                  fontSize: isTablet ? 'clamp(28px,3vw,44px)' : 'clamp(40px,5vw,72px)',
                  fontWeight: 900,
                  color: 'transparent',
                  WebkitTextStroke: isHovered 
                    ? '1.5px #FC3637' 
                    : (isDarkRow ? '1.5px rgba(255,255,255,0.15)' : '1.5px rgba(30,30,30,0.15)'),
                  transition: 'all 0.3s ease',
                  lineHeight: 1,
                  userSelect: 'none'
                }}>
                  {platform.id}
                </span>
              </div>

              {/* B. Image column */}
              <div style={{
                width: isTablet ? '220px' : '340px',
                flexShrink: 0,
                overflow: 'hidden',
                position: 'relative',
                backgroundColor: getLogoBg(platform.name, isDarkRow),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '32px'
              }}>
                <img src={platform.logoUrl} alt={platform.name} style={{
                  maxWidth: '80%',
                  maxHeight: '60%',
                  objectFit: 'contain',
                  transform: isHovered ? 'scale(1.04)' : 'scale(1)',
                  transition: 'all 0.6s ease',
                  display: 'block'
                }} />
                <div style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  height: '100%',
                  width: '3px',
                  background: '#FC3637',
                  transform: isHovered ? 'scaleY(1)' : 'scaleY(0)',
                  transformOrigin: 'top',
                  transition: 'transform 0.35s ease'
                }} />
              </div>

              {/* C. Content column */}
              <div style={{
                flex: 1,
                padding: isTablet ? '28px 32px' : '40px 48px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}>
                <span style={{
                  fontSize: '10px',
                  fontWeight: 800,
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase' as const,
                  color: '#FC3637',
                  marginBottom: '12px',
                  display: 'block'
                }}>
                  {platform.id} — {platform.name}
                </span>
                <h3 style={{
                  fontSize: isTablet ? 'clamp(18px,2vw,26px)' : 'clamp(22px,2.5vw,36px)',
                  fontWeight: 600,
                  letterSpacing: '-0.03em',
                  color: isDarkRow ? '#ffffff' : '#1E1E1E',
                  lineHeight: 1.1,
                  margin: '0 0 8px 0',
                  transition: 'color 0.4s ease'
                }}>
                  {platform.name}
                </h3>
                <p style={{
                  fontSize: isTablet ? '14px' : 'clamp(14px,1.2vw,17px)',
                  fontStyle: 'italic',
                  fontFamily: "'Playfair Display', serif",
                  color: isDarkRow ? 'rgba(255,255,255,0.55)' : 'rgba(30,30,30,0.5)',
                  maxWidth: '560px',
                  lineHeight: 1.5,
                  margin: '0 0 20px 0',
                  transition: 'color 0.4s ease'
                }}>
                  {platform.tagline}
                </p>
                <p style={{
                  fontSize: '14px',
                  color: isDarkRow ? 'rgba(255,255,255,0.5)' : 'rgba(30,30,30,0.6)',
                  lineHeight: 1.7,
                  maxWidth: '600px',
                  maxHeight: isHovered ? '120px' : '0px',
                  overflow: 'hidden',
                  opacity: isHovered ? 1 : 0,
                  transition: 'max-height 0.4s ease, opacity 0.35s ease, color 0.4s ease',
                  margin: 0
                }}>
                  {platform.description}
                </p>
              </div>

              {/* D. CTA column */}
              <div style={{
                width: isTablet ? '120px' : '160px',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderLeft: isHovered 
                  ? '1px solid transparent' 
                  : (isDarkRow ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(30,30,30,0.07)'),
                padding: '0 24px',
                backgroundColor: isHovered 
                  ? '#FC3637' 
                  : (isDarkRow ? '#111111' : '#ffffff'),
                transition: 'background-color 0.4s ease, border-color 0.4s ease'
              }}>
                <a href={platform.websiteUrl} target="_blank" rel="noopener noreferrer" style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '12px',
                  color: isHovered 
                    ? '#ffffff' 
                    : (isDarkRow ? 'rgba(255,255,255,0.3)' : 'rgba(30,30,30,0.3)'),
                  transition: 'color 0.3s ease',
                  textDecoration: 'none'
                }}>
                  <ArrowUpRight size={20} />
                  <span style={{
                    fontSize: '10px',
                    fontWeight: 800,
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase' as const,
                    writingMode: 'vertical-rl' as const,
                    transform: 'rotate(180deg)',
                    whiteSpace: 'nowrap' as const
                  }}>
                    Learn More
                  </span>
                </a>
              </div>
            </div>}
        </article>;
      })}
    </section>

    {/* ── SECTION 5: PARTNERSHIP CTA ─── */}
    <section style={{
      position: 'relative',
      overflow: 'hidden',
      paddingTop: isMobile ? '64px' : '8rem',
      paddingBottom: isMobile ? '64px' : '8rem',
      paddingLeft: isMobile ? '20px' : isTablet ? '48px' : '80px',
      paddingRight: isMobile ? '20px' : isTablet ? '48px' : '80px'
    }} className="bg-[#1E1E1E] text-center">
      {/* Geometric accent */}
      <div aria-hidden="true" style={{
        position: 'absolute',
        top: isMobile ? '-10%' : '-20%',
        right: isMobile ? '-15%' : '-10%',
        width: isMobile ? '300px' : '500px',
        height: isMobile ? '300px' : '500px',
        background: 'rgba(252,54,55,0.04)',
        transform: 'rotate(35deg)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <motion.div initial={{
        opacity: 0,
        scale: 0.95
      }} whileInView={{
        opacity: 1,
        scale: 1
      }} viewport={{
        once: false
      }} transition={{
        duration: 1,
        ease: EASE_SMOOTH
      }} className="max-w-4xl mx-auto" style={{
        position: 'relative',
        zIndex: 1
      }}>
        <h2 style={{
          marginBottom: '2rem',
          lineHeight: 1.1,
          letterSpacing: '-0.03em'
        }} className={cn('tracking-tight', isMobile ? 'text-3xl' : 'text-4xl md:text-6xl')}>
          <span className="block font-bold text-white">Partner With Our</span>
          <span className="block" style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: 'italic',
            color: '#FC3637',
            fontWeight: 700
          }}>
            Platforms.
          </span>
        </h2>
        <p className="text-white/60 text-lg md:text-xl leading-relaxed mb-8 font-medium">
          Gain direct access to Africa's most influential ecosystems for stakeholder engagement, leadership development, capital mobilisation, and impact creation.
        </p>

        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {PARTNER_CHIPS.map(chip => <span key={chip.id} style={{
            border: '1px solid rgba(255,255,255,0.12)',
            color: 'rgba(255,255,255,0.40)',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            padding: '6px 14px'
          }}>
            {chip.label}
          </span>)}
        </div>

        <div className={cn('flex gap-4 justify-center', isMobile ? 'flex-col w-full' : 'flex-col sm:flex-row')}>
          <a href="/contact" className="cta-primary group w-full sm:w-auto">
            <span>Become a Platform Partner</span>
            <div className="cta-icon-container">
              <ArrowUpRight size={14} className="text-[#1E1E1E]" />
            </div>
          </a>
          <a href="/contact" className="cta-secondary group w-full sm:w-auto">
            <span>Contact Us</span>
          </a>
        </div>
      </motion.div>
    </section>

    {/* ── FOOTER ─── */}
    <Footer />
  </div>;
};
