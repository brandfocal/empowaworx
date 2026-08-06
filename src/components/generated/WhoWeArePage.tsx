import * as React from 'react';
import { usePageMeta } from '../../hooks/usePageMeta';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Menu, X, Linkedin, Instagram, Twitter, Facebook, Youtube, ArrowUpRight, Star, ShieldCheck, BadgeCheck, Megaphone, Users, Landmark, TrendingUp, BarChart3, Leaf } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AfricaWatermark } from '../AfricaWatermark';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

// --- Types & Constants ---

interface FacultyMember {
  name: string;
  role: string;
  description: string;
  image: string;
  hideLabel?: boolean;
}
interface FacultyGroup {
  category: string;
  members: FacultyMember[];
}
interface ValuePillar {
  title: string;
  description: string;
  icon: React.ReactNode;
}
interface NavItem {
  id: string;
  label: string;
  href: string;
}
interface FooterNavLink {
  id: string;
  label: string;
  href: string;
}
interface OfficeSocial {
  icon: React.ReactNode;
  label: string;
  href: string;
}
interface TickerItemData {
  id: string;
  text: string;
}
const NAV_ITEMS: NavItem[] = [{
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
const FOOTER_NAV_LINKS: FooterNavLink[] = [{
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
const FOOTER_SERVICES_LINKS: FooterNavLink[] = [{
  id: 's1',
  label: 'Strategic Communications',
  href: '#'
}, {
  id: 's2',
  label: 'Public Affairs & Policy',
  href: '#'
}, {
  id: 's3',
  label: 'Brand Experience',
  href: '#'
}, {
  id: 's4',
  label: 'ESG & Impact Advisory',
  href: '#'
}, {
  id: 's5',
  label: 'Digital & Performance',
  href: '#'
}, {
  id: 's6',
  label: 'Executive Influence',
  href: '#'
}];
const FOOTER_LEGAL_LINKS: FooterNavLink[] = [{
  id: 'l1',
  label: 'Privacy Policy',
  href: '#'
}, {
  id: 'l2',
  label: 'Terms of Service',
  href: '#'
}, {
  id: 'l3',
  label: 'Cookie Policy',
  href: '#'
}, {
  id: 'l4',
  label: 'POPIA Compliance',
  href: '#'
}];
const OFFICE_CITIES = ['Johannesburg', 'Cape Town', 'Nairobi', 'Lagos'];
const TICKER_ITEMS: TickerItemData[] = [{
  id: 't1',
  text: 'GROWTH'
}, {
  id: 't2',
  text: 'REPUTATION'
}, {
  id: 't3',
  text: 'INFLUENCE'
}, {
  id: 't4',
  text: 'IMPACT'
}, {
  id: 't5',
  text: 'ADVISORY'
}, {
  id: 't6',
  text: 'AFRICA'
}, {
  id: 't7',
  text: 'LEADERSHIP'
}, {
  id: 't8',
  text: 'STRATEGY'
}, {
  id: 't9',
  text: 'TRUST'
}, {
  id: 't10',
  text: 'ECOSYSTEMS'
}];
const VALUE_PILLARS: ValuePillar[] = [{
  title: 'Trust Capital',
  description: 'The confidence of stakeholders, investors, customers, employees, regulators, and communities.',
  icon: <ShieldCheck size={20} color="#FC3637" />
}, {
  title: 'Reputation Resilience',
  description: 'The ability to build, protect, and strengthen reputation in an increasingly transparent and scrutinised environment.',
  icon: <BadgeCheck size={20} color="#FC3637" />
}, {
  title: 'Strategic Influence',
  description: 'The capacity to shape conversations, influence decisions, mobilise stakeholders, and drive meaningful outcomes.',
  icon: <Megaphone size={20} color="#FC3637" />
}, {
  title: 'Stakeholder Alignment',
  description: 'Stronger relationships with government, industry, investors, media, communities, and strategic partners.',
  icon: <Users size={20} color="#FC3637" />
}, {
  title: 'Policy Intelligence',
  description: 'Insight and foresight to navigate regulatory environments, emerging risks, and shifting policy landscapes.',
  icon: <Landmark size={20} color="#FC3637" />
}, {
  title: 'Market Relevance',
  description: 'The ability to remain visible, credible, differentiated, and connected to evolving customer and stakeholder expectations.',
  icon: <TrendingUp size={20} color="#FC3637" />
}, {
  title: 'Economic Impact',
  description: 'Measurable contributions to growth, enterprise development, job creation, transformation, and inclusive economic participation.',
  icon: <BarChart3 size={20} color="#FC3637" />
}, {
  title: 'Sustainable Growth',
  description: 'Long-term value creation built on trust, innovation, partnerships, resilience, and responsible leadership.',
  icon: <Leaf size={20} color="#FC3637" />
}];
const FACULTY_GROUPS: FacultyGroup[] = [{
  category: 'EXECUTIVE LEADERSHIP',
  members: [{
    name: 'Simphiwe Masiza',
    role: 'Founder & Chief Executive Officer',
    description: 'Simphiwe Masiza is a growth strategist, organisational transformation advisor and ecosystem builder specialising in leadership, organisational development, strategic partnerships, governance and enterprise growth. He works with organisations to build future-fit businesses, strengthen leadership capability, unlock new markets, accelerate innovation and create high-performing organisations that deliver measurable commercial, economic and societal impact. Through the EmpowaWorx Group, he has established an integrated ecosystem that connects business, government, investors, development institutions and communities to solve complex challenges and unlock sustainable growth across Africa.',
    image: '/simphiwe-masiza.jpg'
  }, {
    name: 'Bonnie Maponya',
    role: 'Acting Managing Executive – EmpowaWomen',
    description: 'Bonnie Maponya is an organisational performance and programme leadership executive specialising in strategic execution, programme governance, operational excellence, stakeholder management and organisational effectiveness. She partners with organisations to strengthen execution capability, optimise operating performance, enhance leadership delivery and build resilient systems that transform strategy into measurable business outcomes. Her work enables organisations to improve organisational agility, elevate stakeholder value and deliver sustainable impact through disciplined execution.',
    image: '/team_faculty/Bonnie-Maponya.jpg'
  }, {
    name: 'Sechaba Motsieloa CM(SA)',
    role: 'Senior Marketing Strategist & Managing Executive – EmpowaGrowth',
    description: 'Sechaba Motsieloa CM(SA) is a strategic marketing, reputation and growth advisor specialising in brand strategy, executive positioning, stakeholder engagement, strategic communications and market growth. He helps organisations strengthen competitive positioning, build trusted brands, enhance corporate reputation and align marketing, communications and stakeholder strategies with business transformation, organisational performance and sustainable commercial growth.',
    image: '/team_faculty/Sechaba-Motsieloa.jpeg'
  }, {
    name: 'Neo Mathebe',
    role: 'Head of The Speakers Firm & Acting Managing Executive – EmpowaMen',
    description: 'Neo Mathebe is an executive engagement, strategic partnerships and leadership influence specialist with expertise in thought leadership, talent management, stakeholder engagement, executive experiences and commercial relationship management. He works with organisations, executives and industry leaders to strengthen influence, develop strategic partnerships, amplify leadership visibility and create high-value engagement platforms that advance organisational growth, stakeholder trust and long-term business impact.',
    image: '/team_faculty/Neo-Mathebe.JPG'
  }, {
    name: 'Thulisa Bianca Sosibo',
    role: 'Managing Executive – EmpowaEntrepreneurs',
    description: 'Thulisa Bianca Sosibo is a commercial growth and strategic partnerships executive specialising in sponsorship and funding mobilisation, investment facilitation, stakeholder ecosystems and enterprise development. She works with corporations, government, development finance institutions and investors to mobilise capital, unlock strategic partnerships, accelerate entrepreneurship and strengthen inclusive economic participation. Her work enables organisations to expand market reach, create shared value and drive sustainable enterprise growth across Africa.',
    image: '/team_faculty/Thulisa-Bianca-Sosibo.jpg'
  }]
}, {
  category: 'STRATEGIC COMMUNICATIONS, PR, MEDIA, PUBLIC AFFAIRS & REPUTATION',
  members: [{
    name: 'Milton Nkosi',
    role: 'Senior Advisor: Media Strategy, Broadcast Relations & Executive Communications',
    description: "Milton Nkosi is an award-winning journalist, former BBC Africa Bureau Chief, international correspondent and trusted media advisor with more than three decades of experience covering some of Africa's most defining political, economic and social developments. As Chairman of MMN International Consulting and a leading commentator on geopolitics, media and reputation, he advises organisations on crisis communications, media strategy, public affairs, executive positioning and stakeholder engagement. His global perspective and deep understanding of narrative influence help leaders communicate with credibility, authority and impact.",
    image: '/team_faculty/Milton-Nkosi.jpg'
  }, {
    name: 'Tshepo Sefotlhelo',
    role: 'Chief Reputation Architect',
    description: 'Tshepo Sefotlhelo is a reputation architecture and executive influence strategist specialising in corporate reputation, stakeholder trust, executive advisory, strategic positioning and organisational influence. He advises boards and executive leadership teams on leveraging reputation as a strategic enterprise asset that strengthens market leadership, builds resilient organisations, enhances stakeholder confidence and creates enduring commercial, reputational and societal value.',
    image: '/Tshepo-Sefotlhelo.png'
  }]
}, {
  category: 'DIGITAL, AI, CONTENT & PERFORMANCE MARKETING',
  members: [{
    name: 'Carshiefa Sissing',
    role: 'Digital Marketing, Social Media & Community Growth',
    description: 'Carshiefa Sissing is a digital growth and brand engagement strategist specialising in digital transformation, audience development, content strategy, social media and community ecosystems. She helps organisations build future-ready digital brands by creating integrated engagement strategies that strengthen market relevance, deepen stakeholder relationships, accelerate audience growth and convert digital influence into measurable commercial and organisational impact.',
    image: '/team_faculty/Carshiefa-Sissing.jpg'
  }, {
    name: 'Miyelani Baloyi',
    role: 'Performance Marketing, Growth & Demand Generation',
    description: 'Miyelani Baloyi is a performance marketing and growth strategist specialising in customer acquisition, demand generation, digital intelligence, marketing analytics and revenue optimisation. He works with organisations to design data-driven growth strategies that accelerate market expansion, optimise commercial performance, strengthen customer engagement and transform marketing investment into measurable business growth and sustainable competitive advantage.',
    image: '/Miyelani-Baloyi.jpg'
  }]
}, {
  category: 'EVENTS, EXPERIENCES, ACTIVATIONS & COMMERCIAL PARTNERSHIPS',
  members: [{
    name: 'Anita Tirkey',
    role: 'Talent, Speakers & Executive Relations',
    description: 'Anita Tirkey is an executive engagement and leadership experiences specialist with expertise in speaker strategy, executive relations, stakeholder engagement, protocol and high-impact programme delivery. She partners with global thought leaders, industry experts and executive teams to curate world-class leadership platforms that strengthen organisational influence, elevate stakeholder experiences and create meaningful conversations that inspire transformation, innovation and growth.',
    image: '/team_faculty/Anita-Tirkey.jpg'
  }]
}, {
  category: 'ESG, IMPACT & ECONOMIC DEVELOPMENT ADVISORY',
  members: [{
    name: 'Khanyi Mlambo',
    role: 'ESG, Sustainability & Shared Value',
    description: 'Khanyi Mlambo is an ESG, sustainability and shared value strategist specialising in responsible business, organisational resilience, stakeholder value creation and sustainable transformation. She advises organisations on embedding environmental, social and governance principles into business strategy to strengthen long-term competitiveness, build stakeholder trust, accelerate transformation and create sustainable value for business, communities and society.',
    image: '/team_faculty/Khanyi-Mlambo.jpg'
  }]
}];
const IMPACT_STATS = [{
  value: '50,000+',
  label: 'Women Leaders Engaged'
}, {
  value: '198,000+',
  label: 'Youth Mobilised'
}, {
  value: 'R500M+',
  label: 'Investment Facilitated'
}, {
  value: '200+',
  label: 'Years Collective Experience'
}];
const CREED_PHRASES = [{
  id: 'c1',
  text: 'Building Trust'
}, {
  id: 'c2',
  text: 'Building Brands'
}, {
  id: 'c3',
  text: 'Shaping Narratives'
}, {
  id: 'c4',
  text: 'Managing Reputations'
}, {
  id: 'c5',
  text: 'Influencing Stakeholders'
}, {
  id: 'c6',
  text: 'Accelerating Growth'
}];
const EASE_SMOOTH = [0.21, 0.47, 0.32, 0.98] as [number, number, number, number];
const WHO_WE_ARE_LINE_1 = ['Who', 'We', 'Are', '/'];
const WHO_WE_ARE_LINE_2 = ['Our', 'Story.'];


// --- Custom Hooks ---

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

// --- Sub-components ---

const RatingStars = () => <div className="flex gap-0.5">
  {[0, 1, 2, 3, 4].map(i => <Star key={i} size={10} className={cn('fill-[#C9963A] text-[#C9963A]', i === 4 && 'opacity-40')} />)}
</div>;
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

const HeroHeadline = ({
  reducedMotion,
  inView
}: {
  reducedMotion: boolean;
  inView: boolean;
}) => {
  const line1Count = WHO_WE_ARE_LINE_1.length;
  if (reducedMotion) {
    return <div className="flex flex-col">
      <h1 className="text-[clamp(38px,8vw,143px)] font-semibold text-white leading-[0.95] tracking-[-0.06em]">
        {WHO_WE_ARE_LINE_1.join(' ')}
      </h1>
      <h1 className="text-[clamp(38px,8vw,143px)] font-semibold text-white leading-[0.95] tracking-[-0.06em]">
        <span>{WHO_WE_ARE_LINE_2.slice(0, -1).join(' ')}{WHO_WE_ARE_LINE_2.length > 1 ? ' ' : ''}</span>
        <span style={{
          color: '#FC3637'
        }}>{WHO_WE_ARE_LINE_2[WHO_WE_ARE_LINE_2.length - 1]}</span>
      </h1>
    </div>;
  }
  return <div className="flex flex-col">
    <h1 className="text-[clamp(38px,8vw,143px)] font-semibold text-white leading-[0.95] tracking-[-0.06em] flex flex-wrap gap-x-[0.18em]">
      {WHO_WE_ARE_LINE_1.map((word, i) => <span key={`l1-${i}`} style={{
        display: 'inline-block',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.7s cubic-bezier(0.25,0.46,0.45,0.94) ${i * 80}ms, transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94) ${i * 80}ms`
      }}>
        {word}
      </span>)}
    </h1>
    <h1 className="text-[clamp(38px,8vw,143px)] font-semibold text-white leading-[0.95] tracking-[-0.06em] flex flex-wrap gap-x-[0.18em]">
      {WHO_WE_ARE_LINE_2.map((word, i) => {
        const globalIdx = line1Count + i;
        const isLast = i === WHO_WE_ARE_LINE_2.length - 1;
        return <span key={`l2-${i}`} style={{
          display: 'inline-block',
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(40px)',
          transition: `opacity 0.7s cubic-bezier(0.25,0.46,0.45,0.94) ${globalIdx * 80}ms, transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94) ${globalIdx * 80}ms`,
          color: isLast ? '#FC3637' : undefined
        }}>
          {word}
        </span>;
      })}
    </h1>
  </div>;
};



// --- HERO ---
const Hero = () => {
  const reducedMotion = usePrefersReducedMotion();
  const scrollY = useScrollY();
  const [heroInView, setHeroInView] = React.useState(true);
  const heroParallaxY = reducedMotion ? 0 : scrollY * 0.35;
  React.useEffect(() => {
    const t = setTimeout(() => setHeroInView(true), 300);
    return () => clearTimeout(t);
  }, []);
  const {
    ref: heroSubRef,
    isInView: heroSubInView
  } = useBidirectionalInView({
    amount: 0.3
  });
  const S = (inView: boolean, delay: number = 0, duration: number = 0.6): React.CSSProperties => ({
    opacity: inView || reducedMotion ? 1 : 0,
    transform: inView || reducedMotion ? 'none' : 'translateY(30px)',
    transition: `opacity ${duration}s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}ms, transform ${duration}s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}ms`
  });
  return <section style={{
    position: 'relative',
    width: '100%',
    minHeight: '80vh',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    background: '#0D0D0D'
  }}>
    {/* Background image */}
    <div aria-hidden="true" style={{
      position: 'absolute',
      inset: '-10%',
      overflow: 'hidden',
      pointerEvents: 'none'
    }}>
      <img src="/who-we-are.JPG" alt="" style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center 70%',
        display: 'block',
        filter: 'grayscale(1) brightness(0.5)',
        transform: `translateY(${heroParallaxY}px)`,
        willChange: 'transform'
      }} />
    </div>

    {/* Gradient overlays */}
    <div aria-hidden="true" style={{
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(to right, rgba(13,13,13,0.92) 0%, rgba(13,13,13,0.72) 45%, rgba(13,13,13,0.20) 100%)',
      pointerEvents: 'none'
    }} />
    <div aria-hidden="true" style={{
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(to bottom, rgba(13,13,13,0.50) 0%, rgba(13,13,13,0.15) 40%, rgba(13,13,13,0.82) 100%)',
      pointerEvents: 'none'
    }} />
    <div aria-hidden="true" style={{
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(ellipse at 100% 100%, rgba(252,54,55,0.15) 0%, transparent 55%)',
      pointerEvents: 'none'
    }} />

    {/* Content */}
    <div className="relative w-full px-4 md:px-8 lg:px-16 xl:px-24 pt-32 md:pt-44 lg:pt-52 pb-16 md:pb-24 lg:pb-28" style={{
      zIndex: 10
    }}>
      {/* Eyebrow */}
      <div ref={heroSubRef} className="mb-8 md:mb-10" style={S(heroSubInView, 100, 0.7)}>
        <div className="flex items-center gap-4 mb-5">
          <div style={{
            width: '4px',
            height: '48px',
            background: '#FC3637',
            borderRadius: '2px',
            flexShrink: 0
          }} />
          <p className="text-base md:text-lg lg:text-xl font-medium text-white/70 leading-tight tracking-tight max-w-[500px]">
            <span>Africa's leading growth, reputation, influence &amp; impact advisory firm. 100% Black-owned. 200+ years collective experience.</span>
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-10 md:gap-14 lg:gap-16">
        <div>
          <HeroHeadline reducedMotion={reducedMotion} inView={heroInView} />
        </div>

        <div className="flex flex-wrap items-center gap-8 md:gap-10 lg:gap-14">
          <motion.div initial={{
            opacity: 0,
            scale: 0.95
          }} animate={{
            opacity: 1,
            scale: 1
          }} transition={{
            delay: 0.7,
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94]
          }} className="flex flex-wrap items-center gap-4 md:gap-6 lg:gap-9">
            <a
              href="#value-prop"
              className="cta-primary group"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('value-prop');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            >
              <span>Learn More</span>
              <div className="cta-icon-container">
                <ArrowUpRight size={14} className="text-[#1E1E1E]" />
              </div>
            </a>
            <a
              href="#faculty"
              className="cta-secondary group"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('faculty');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            >
              <span>Meet The Team</span>
            </a>
          </motion.div>

          <motion.div initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            delay: 0.9,
            duration: 0.6
          }} className="flex flex-col gap-3">
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

    {/* Bottom status bar */}
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
      <p className="text-white/50 font-medium text-[12px] uppercase tracking-[0.18em]"><span>Pan-African Advisory</span></p>
      <p className="text-[#FC3637] font-bold text-[11px] uppercase tracking-[0.18em] hidden md:block"><span>100% Black-Owned</span></p>
    </div>
  </section>;
};

// --- TICKER ---
const TickerStrip = () => {
  const [isPaused, setIsPaused] = React.useState(false);
  const allItems = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return <div className="w-full bg-[#111111] overflow-hidden py-5 border-t border-white/5" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
    <div className="ticker-track" style={{
      animationPlayState: isPaused ? 'paused' : 'running'
    }}>
      {allItems.map((item, idx) => <div key={`${item.id}-${idx}`} className="flex items-center shrink-0 px-2">
        <span className="text-[13px] font-semibold tracking-[0.18em] uppercase" style={{
          color: idx % 2 === 0 ? '#ffffff' : '#737373'
        }}>
          {item.text}
        </span>
        <span className="ml-4 text-[10px]" style={{
          color: '#C9963A'
        }}>◆</span>
      </div>)}
    </div>
  </div>;
};

// --- VALUE PROPOSITION ---
const ValueProposition = () => {
  const [hoveredIdx, setHoveredIdx] = React.useState<number>(0);

  const activePillar = VALUE_PILLARS[hoveredIdx];

  return <section id="value-prop" className="relative bg-[#080808] py-20 lg:py-32 overflow-hidden border-y border-white/5">
    {/* Background glow effects */}
    <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#FC3637]/5 blur-[120px] pointer-events-none" />
    <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#FC3637]/5 blur-[120px] pointer-events-none" />

    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-16 xl:px-[100px]">
      {/* Header */}
      <div className="mb-16 md:mb-24 max-w-4xl">
        <FadeSlideUp>
          <p style={{
            color: '#FC3637',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            fontFamily: 'Inter, sans-serif',
            margin: 0
          }} className="mb-4">
            OUR VALUE PROPOSITION
          </p>
        </FadeSlideUp>
        <FadeSlideUp delay={0.1}>
          <h2 className="text-white font-semibold text-[clamp(1.8rem,4vw,3rem)] leading-[1.05] tracking-tighter mb-8">
            Strategic Assets Driving Long-Term Resilience, Influence, and Growth
          </h2>
          <p className="text-[#888888] font-light text-[15px] md:text-[17px] leading-relaxed">
            In a world defined by disruption, declining trust, stakeholder activism, digital influence, regulatory complexity, and increasing accountability, organisations require far more than visibility. They require the strategic assets that drive resilience, influence, competitiveness, and sustainable growth.
          </p>
        </FadeSlideUp>
      </div>

      {/* Split Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

        {/* Left Column: Interactive Visualizer (Sticky on Desktop, Hidden on Mobile/Tablet) */}
        <div className="hidden lg:flex lg:col-span-5 lg:sticky lg:top-[120px] flex-col items-center justify-center">

          {/* Visualizer Container */}
          <div className="relative w-full max-w-[360px] aspect-square flex items-center justify-center mb-8">
            {/* Spinning decorative background rings */}
            <div className="absolute inset-0 rounded-full border border-white/5 animate-[spin_80s_linear_infinite]" />
            <div className="absolute inset-4 rounded-full border border-dashed border-white/10 animate-[spin_120s_linear_infinite_reverse]" />
            <style>{`
              @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }
            `}</style>

            {/* Core Ecosystem SVG */}
            <svg viewBox="0 0 400 400" className="w-full h-full relative z-10">
              {VALUE_PILLARS.map((pillar, idx) => {
                const angle = (idx * 45 - 90) * Math.PI / 180;
                const x1 = 200;
                const y1 = 200;
                const x2 = 200 + 130 * Math.cos(angle);
                const y2 = 200 + 130 * Math.sin(angle);
                const isActive = hoveredIdx === idx;

                return (
                  <g key={idx}>
                    {/* Connecting Line */}
                    <motion.line
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke={isActive ? '#FC3637' : 'rgba(255,255,255,0.08)'}
                      strokeWidth={isActive ? 2.5 : 1}
                      initial={false}
                      animate={{
                        stroke: isActive ? '#FC3637' : 'rgba(255,255,255,0.08)',
                        strokeWidth: isActive ? 2.5 : 1
                      }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Outer Node */}
                    <motion.g
                      initial={false}
                      animate={{
                        scale: isActive ? 1.25 : 1
                      }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className="cursor-pointer"
                      onMouseEnter={() => setHoveredIdx(idx)}
                    >
                      <circle
                        cx={x2}
                        cy={y2}
                        r={18}
                        fill={isActive ? 'rgba(252,54,55,0.2)' : '#111111'}
                        stroke={isActive ? '#FC3637' : 'rgba(255,255,255,0.2)'}
                        strokeWidth={isActive ? 2 : 1}
                        style={{
                          filter: isActive ? 'drop-shadow(0 0 8px rgba(252,54,55,0.5))' : 'none'
                        }}
                      />
                      <text
                        x={x2}
                        y={y2 + 4}
                        textAnchor="middle"
                        fill={isActive ? '#FC3637' : '#FFFFFF'}
                        fontSize="10px"
                        fontWeight="800"
                      >
                        {String(idx + 1).padStart(2, '0')}
                      </text>
                    </motion.g>
                  </g>
                );
              })}

              {/* Center Circle */}
              <circle
                cx={200}
                cy={200}
                r={38}
                fill="#0D0D0D"
                stroke={hoveredIdx !== null ? '#FC3637' : 'rgba(255,255,255,0.1)'}
                strokeWidth={2}
                style={{
                  filter: hoveredIdx !== null ? 'drop-shadow(0 0 12px rgba(252,54,55,0.4))' : 'none'
                }}
              />
            </svg>

            {/* Center Icon Overlay */}
            <div className="absolute w-12 h-12 flex items-center justify-center rounded-full bg-black/40 z-20 pointer-events-none">
              <AnimatePresence mode="wait">
                <motion.div
                  key={hoveredIdx}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.2 }}
                >
                  {activePillar.icon}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Detailed Info Card */}
          <div className="w-full bg-[#121212]/80 backdrop-blur-md border border-white/5 rounded-lg p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#FC3637] to-transparent" />
            <span className="text-[10px] font-black uppercase tracking-widest text-[#FC3637] mb-2 block">
              HIGHLIGHTED PILLAR — {String(hoveredIdx + 1).padStart(2, '0')}
            </span>
            <AnimatePresence mode="wait">
              <motion.div
                key={hoveredIdx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-white font-bold text-lg mb-2">
                  {activePillar.title}
                </h3>
                <p className="text-[#AAAAAA] text-sm leading-relaxed">
                  {activePillar.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right Column: Sleek Cards Stack */}
        <div className="lg:col-span-7 flex flex-col gap-4 w-full">
          {VALUE_PILLARS.map((pillar, idx) => {
            const isActive = hoveredIdx === idx;
            return (
              <FadeSlideUp key={pillar.title} delay={0.05 * idx}>
                <div
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onClick={() => setHoveredIdx(idx)}
                  className="group relative flex flex-col sm:flex-row gap-4 sm:gap-6 p-6 md:p-8 rounded-lg cursor-pointer transition-all duration-300"
                  style={{
                    background: isActive ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.01)',
                    border: '1px solid',
                    borderColor: isActive ? 'rgba(252,54,55,0.3)' : 'rgba(255,255,255,0.03)',
                    boxShadow: isActive ? '0 10px 30px rgba(252,54,55,0.05)' : 'none'
                  }}
                >
                  {/* Accent Highlight Bar */}
                  <div
                    className={cn(
                      "absolute top-0 left-0 w-[3px] h-full bg-[#FC3637] transition-transform duration-300 origin-top",
                      isActive ? "scale-y-100" : "scale-y-0"
                    )}
                  />

                  {/* Icon Container */}
                  <div
                    className={cn(
                      "w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 flex-shrink-0 z-10",
                      isActive ? "bg-[#FC3637] text-white scale-110 shadow-lg shadow-[#FC3637]/25" : "bg-[#181818] border border-white/5"
                    )}
                  >
                    {React.cloneElement(pillar.icon as React.ReactElement<{ color?: string; size?: number }>, {
                      color: isActive ? '#FFFFFF' : '#FC3637',
                      size: 22
                    })}
                  </div>

                  {/* Text Details */}
                  <div className="z-10 flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-lg text-white group-hover:text-[#FC3637] transition-colors duration-200">
                        {pillar.title}
                      </h3>
                      <span
                        className={cn(
                          "text-xs font-black tracking-widest transition-colors duration-200",
                          isActive ? "text-[#FC3637]" : "text-white/20"
                        )}
                      >
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <p className="text-white/60 text-[14px] md:text-[15px] leading-relaxed font-light">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </FadeSlideUp>
            );
          })}
        </div>

      </div>
    </div>
  </section>;
};

// --- FACULTY SECTION ---
const FacultySection = () => {
  const [activeCategory, setActiveCategory] = React.useState('All');
  const [showAll, setShowAll] = React.useState(false);
  const CATEGORY_LABELS: Record<string, string> = {
    'EXECUTIVE LEADERSHIP': 'Executive Leadership',
    'STRATEGIC COMMUNICATIONS, PR, MEDIA, PUBLIC AFFAIRS & REPUTATION': 'Comms & Reputation',
    'DIGITAL, AI, CONTENT & PERFORMANCE MARKETING': 'Digital & AI',
    'EVENTS, EXPERIENCES, ACTIVATIONS & COMMERCIAL PARTNERSHIPS': 'Events & Experiences',
    'INFLUENCER MARKETING, CREATOR ECONOMY & CULTURAL INFLUENCE': 'Influencer & Culture',
    'ESG, IMPACT & ECONOMIC DEVELOPMENT ADVISORY': 'ESG & Impact',
    'EXECUTIVE INFLUENCE, THOUGHT LEADERSHIP & SPEAKER BUREAU': 'Executive Influence'
  };
  const desiredOrder = [
    'Simphiwe Masiza',
    'Sechaba Motsieloa CM(SA)',
    'Milton Nkosi',
    'Bonnie Maponya'
  ];
  const rawMembers: FacultyMember[] = FACULTY_GROUPS.flatMap(g => g.members.map(m => ({
    ...m,
    _category: g.category
  }) as FacultyMember & {
    _category: string;
  })).filter(m => m.name !== 'Mmatshikhidi Rebecca Phala');

  const orderedSelected: typeof rawMembers = [];
  desiredOrder.forEach(name => {
    const found = rawMembers.find(m => m.name === name);
    if (found) {
      orderedSelected.push(found);
    }
  });

  const remaining = rawMembers.filter(m => !desiredOrder.includes(m.name));
  const allMembers = [...orderedSelected, ...remaining];
  const filteredMembers = activeCategory === 'All' ? allMembers : allMembers.filter(m => (m as FacultyMember & {
    _category: string;
  })._category === activeCategory);
  const visibleMembers = showAll ? filteredMembers : filteredMembers.slice(0, 4);
  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setShowAll(false);
  };
  const categoryList = ['All', ...FACULTY_GROUPS.map(g => g.category)] as string[];
  return <section id="faculty" className="bg-[#1E1E1E] py-20 lg:py-32 px-4 md:px-8 lg:px-16 xl:px-24">
    <FadeSlideUp>
      <span className="block text-[#FC3637] text-xs font-semibold tracking-widest uppercase mb-4">
        OUR TEAM
      </span>
    </FadeSlideUp>
    <FadeSlideUp delay={0.05}>
      <h2 className="text-white text-3xl md:text-4xl lg:text-6xl font-semibold mb-6 md:mb-8">
        Leadership, Advisory &amp; Delivery Faculty<span className="text-xl align-top">™</span>
      </h2>
    </FadeSlideUp>
    <FadeSlideUp delay={0.1}>
      <p className="text-white/60 text-base md:text-lg lg:text-xl max-w-4xl mb-8 md:mb-10 leading-relaxed">
        A multidisciplinary team of senior advisors, strategists, communications practitioners, industry leaders, creatives, facilitators, and impact specialists with more than 200 years of collective experience delivering complex, multi-stakeholder programmes across Africa.
      </p>
    </FadeSlideUp>

    {/* Category filter pills — flex-wrap so they wrap on mobile */}
    <div className="flex flex-wrap gap-2 mb-8 md:mb-10">
      {categoryList.map(cat => {
        const isActive = cat === activeCategory;
        const label = cat === 'All' ? 'All' : CATEGORY_LABELS[cat] ?? cat;
        return <button key={cat} onClick={() => handleCategoryChange(cat)} style={{
          backgroundColor: isActive ? '#FC3637' : 'transparent',
          color: isActive ? '#ffffff' : 'rgba(255,255,255,0.75)',
          border: isActive ? '1px solid #FC3637' : '1px solid rgba(252,54,55,0.3)',
          cursor: 'pointer',
          transition: 'border-color 0.2s ease, color 0.2s ease, background-color 0.2s ease'
        }} className="px-4 md:px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider" onMouseEnter={e => {
          if (!isActive) {
            (e.currentTarget as HTMLButtonElement).style.borderColor = '#FC3637';
            (e.currentTarget as HTMLButtonElement).style.color = '#FC3637';
          }
        }} onMouseLeave={e => {
          if (!isActive) {
            (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(252,54,55,0.3)';
            (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.75)';
          }
        }}>
          <span>{label}</span>
        </button>;
      })}
    </div>

    {/* Grid */}
    <div key={activeCategory} className="faculty-tab-content">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {visibleMembers.map((member, mIdx) => {
          const memberKey = `${activeCategory}-${member.name}-${mIdx}`;
          const initials = member.name.split(' ').slice(0, 2).map((w: string) => w[0]).join('');
          return <FadeSlideUp key={memberKey} delay={0.05 + mIdx * 0.06}>
            <div className="faculty-portrait-card group w-full" style={{
              position: 'relative',
              overflow: 'hidden',
              background: '#1A1A1A',
              cursor: 'default',
              aspectRatio: '3/4'
            }}>
              {member.image ? <img src={member.image} alt={member.name} style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                display: 'block',
                filter: 'grayscale(0.15)'
              }} /> : <div style={{
                width: '100%',
                height: '100%',
                background: '#1E1E1E',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{
                  fontSize: '72px',
                  fontWeight: 700,
                  color: '#FC3637',
                  letterSpacing: '-0.04em'
                }}>{initials}</span>
              </div>}

              {/* Static bottom identity strip */}
              <div className="transition-all duration-300 opacity-100 group-hover:opacity-0" style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '20px 16px 20px',
                background: 'linear-gradient(to top, rgba(13,13,13,0.98) 0%, rgba(13,13,13,0.60) 70%, transparent 100%)',
                zIndex: 2
              }}>
                {!(member as any).hideLabel && (
                  <p style={{
                    fontSize: '9px',
                    fontWeight: 700,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: '#FC3637',
                    marginBottom: '4px'
                  }}>
                    {member.role.includes(':') ? member.role.split(':')[0] : 'Leadership'}
                  </p>
                )}
                <h4 style={{
                  fontSize: 'clamp(14px, 1.2vw, 19px)',
                  fontWeight: 600,
                  letterSpacing: '-0.02em',
                  color: '#ffffff',
                  lineHeight: 1.2,
                  marginBottom: '4px'
                }}>
                  {member.name}
                </h4>
                <p style={{
                  fontSize: '11px',
                  fontWeight: 500,
                  color: 'rgba(255,255,255,0.7)',
                  lineHeight: 1.3
                }}>
                  {member.role.includes(':') ? member.role.split(':').slice(1).join(':').trim() : member.role}
                </p>
              </div>

              {/* Hover overlay */}
              <div className="faculty-overlay opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0" style={{
                position: 'absolute',
                inset: 0,
                zIndex: 3,
                background: 'linear-gradient(to top, rgba(13,13,13,0.97) 50%, rgba(13,13,13,0.90) 100%)',
                padding: '24px 20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                boxSizing: 'border-box'
              }}>
                {!(member as any).hideLabel && (
                  <p style={{
                    fontSize: '9px',
                    fontWeight: 700,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: '#FC3637',
                    marginBottom: '6px'
                  }}>
                    {member.role.includes(':') ? member.role.split(':')[0] : 'Leadership'}
                  </p>
                )}
                <h4 style={{
                  fontSize: 'clamp(14px, 1.2vw, 19px)',
                  fontWeight: 600,
                  letterSpacing: '-0.02em',
                  color: '#ffffff',
                  marginBottom: '4px',
                  lineHeight: 1.2
                }}>
                  {member.name}
                </h4>
                <p style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#FC3637',
                  letterSpacing: '0.04em',
                  marginBottom: '12px',
                  lineHeight: 1.3
                }}>
                  {member.role.includes(':') ? member.role.split(':').slice(1).join(':').trim() : member.role}
                </p>
                <p style={{
                  fontSize: '11.5px',
                  lineHeight: 1.6,
                  color: 'rgba(255,255,255,0.7)',
                  margin: 0
                }}>
                  {member.description}
                </p>
              </div>
            </div>
          </FadeSlideUp>;
        })}
      </div>

      {/* Show More / Show Less */}
      {filteredMembers.length > 4 && <div className="flex justify-center mt-8 md:mt-10">
        <button onClick={() => setShowAll(prev => !prev)} style={{
          background: 'transparent',
          border: '1px solid rgba(252,54,55,0.5)',
          color: 'rgba(255,255,255,0.70)',
          cursor: 'pointer',
          transition: 'border-color 0.2s ease, color 0.2s ease'
        }} className="px-8 py-3 text-xs font-semibold uppercase tracking-wider rounded-full" onMouseEnter={e => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = '#FC3637';
          (e.currentTarget as HTMLButtonElement).style.color = '#FC3637';
        }} onMouseLeave={e => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(252,54,55,0.5)';
          (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.70)';
        }}>
          <span>{showAll ? 'Show Less' : `Show More (${filteredMembers.length - 4} more)`}</span>
        </button>
      </div>}
    </div>
  </section>;
};

// --- IMPACT STATS ---
const ImpactStats = () => {
  return <section style={{
    background: '#FAFAFA',
    borderTop: '1px solid rgba(252,54,55,0.15)'
  }}>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-0 px-4 md:px-8 lg:px-16 xl:px-24">
      {IMPACT_STATS.map((stat, idx) => <FadeSlideUp key={stat.label} delay={idx * 0.1}>
        <div className="py-8 px-6" style={{
          borderTop: '2px solid #FC3637',
          borderRight: idx < IMPACT_STATS.length - 1 ? '1px solid rgba(30,30,30,0.08)' : undefined
        }}>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-semibold" style={{
            letterSpacing: '-0.04em',
            lineHeight: 1,
            color: '#FC3637',
            marginBottom: '10px'
          }}>
            {stat.value}
          </h3>
          <p className="text-xs md:text-sm" style={{
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'rgba(30,30,30,0.60)'
          }}>
            {stat.label}
          </p>
        </div>
      </FadeSlideUp>)}
    </div>
  </section>;
};

// --- CTA CLOSER ---
const CTACloser = () => {
  return <section className="bg-white py-20 lg:py-32 px-4 md:px-8 lg:px-16 xl:px-24 flex flex-col items-center text-center">
    <FadeSlideUp>
      <span className="block text-[#FC3637] text-xs font-semibold tracking-widest uppercase mb-6">
        GET STARTED
      </span>
    </FadeSlideUp>
    <FadeSlideUp delay={0.05}>
      <h2 className="text-[#1E1E1E] text-3xl md:text-4xl lg:text-6xl font-semibold mb-6 max-w-4xl leading-tight">
        Ready to Build Trust, Influence &amp; Lasting Impact?
      </h2>
    </FadeSlideUp>
    <FadeSlideUp delay={0.1}>
      <p className="text-[#1E1E1E]/60 text-base md:text-lg lg:text-xl mb-10 md:mb-12 max-w-2xl">
        Partner with Africa's leading growth, reputation, influence and impact advisory firm.
      </p>
    </FadeSlideUp>
    <FadeSlideUp delay={0.2} className="flex flex-wrap justify-center gap-4">
      <a href="/contact" className="cta-primary group h-[56px] md:h-[60px] min-w-[180px] md:min-w-[200px]">
        <span>Partner With Us</span>
        <div className="cta-icon-container">
          <ArrowUpRight size={14} className="text-[#1E1E1E]" />
        </div>
      </a>
    </FadeSlideUp>
  </section>;
};

// --- Main Page Component ---

export const WhoWeArePage = () => {
  usePageMeta({
    title: "Who We Are - Leadership & Group Advisory Faculty",
    description: "Meet the senior leaders, strategists, and executive advisors of EmpowaWorx group delivering economic and societal transformation across Africa."
  });
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <div className="bg-white min-h-screen selection:bg-[#FC3637] selection:text-white overflow-x-clip">
    {/* Film grain overlay */}
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
    <main>
      <Hero />
      <TickerStrip />
      <ValueProposition />
      <FacultySection />
      <ImpactStats />
      <CTACloser />
    </main>
    <Footer />
  </div>;
};
