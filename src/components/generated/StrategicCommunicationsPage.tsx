import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Menu, X, ChevronRight, Youtube, Twitter, Facebook, Instagram, Linkedin, ChevronDown, ShieldCheck, Eye, TrendingUp, MessageSquare, Globe, Users, AlertTriangle, BarChart2, Megaphone, Radio, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { AfricaWatermark } from '../AfricaWatermark';

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
  label: 'Strategic Communications',
  href: '#'
}, {
  id: 'fa2',
  label: 'Public Relations',
  href: '#'
}, {
  id: 'fa3',
  label: 'Reputation Management',
  href: '#'
}, {
  id: 'fa4',
  label: 'Brand Influence',
  href: '#'
}, {
  id: 'fa5',
  label: 'Thought Leadership',
  href: '#'
}, {
  id: 'fa6',
  label: 'Crisis Communications',
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
  category: 'Strategic Communications & Corporate Affairs',
  services: ['Strategic Communications Advisory', 'Corporate Communications Strategy', 'Executive Communications', 'Leadership Communications', 'Internal Communications', 'Change Communications', 'Crisis Communications & Preparedness', 'Issues Management', 'Corporate Affairs Strategy', 'Stakeholder Communications', 'Public Affairs Communications', 'Government Relations Communications', 'Policy Communications', 'Advocacy Campaigns', 'Corporate Narrative Development', 'Messaging Architecture', 'Communication Audits', 'Reputation Risk Assessments', 'Trust & Credibility Programmes'],
  featured: true,
  description: 'Helping organisations build trust, shape perception, strengthen stakeholder confidence and navigate increasingly complex business, social and reputational environments.'
}, {
  id: 'svc2',
  category: 'Public Relations & Media Relations',
  services: ['Public Relations Strategy', 'Media Relations', 'Media Engagement Programmes', 'National Media Campaigns', 'International Media Campaigns', 'Press Office Management', 'Media Briefings & Roundtables', 'Press Conferences', 'Media Training', 'Executive Media Coaching', 'Thought Leadership Campaigns', 'News Generation & Story Development', 'Feature Placement Programmes', 'Editorial Engagement', 'Broadcast Relations', 'Podcast Relations', 'Media Partnerships', 'Crisis Media Management'],
  featured: false,
  description: ''
}, {
  id: 'svc3',
  category: 'Reputation Management & Trust Building',
  services: ['Reputation Strategy Development', 'Corporate Reputation Management', 'Executive Reputation Management', 'Brand Reputation Enhancement', 'Reputation Audits', 'Trust Building Programmes', 'Stakeholder Trust Assessments', 'Reputation Risk Management', 'Crisis Reputation Recovery', 'Online Reputation Management', 'Digital Reputation Monitoring', 'Social Reputation Management', 'Reputation Intelligence', 'Trust & Transparency Initiatives', 'Corporate Citizenship Communications', 'ESG & Sustainability Communications', 'Purpose-Led Reputation Programmes'],
  featured: false,
  description: ''
}, {
  id: 'svc4',
  category: 'Media Strategy, Planning & Intelligence',
  services: ['Media Strategy & Planning', 'Media Buying Advisory', 'Media Partnerships', 'Broadcast Strategy', 'Content Distribution Strategy', 'Audience Reach Optimisation', 'Cross-Platform Media Campaigns', 'Media Intelligence', 'Media Monitoring', 'Media Analytics', 'Share of Voice Analysis', 'Competitive Media Intelligence', 'Audience Insights', 'Campaign Effectiveness Measurement', 'Media ROI Assessment'],
  featured: false,
  description: ''
}, {
  id: 'svc5',
  category: 'Brand Influence & Thought Leadership',
  services: ['Thought Leadership Strategy', 'Executive Positioning', 'CEO Branding & Visibility', 'Personal Branding', 'Industry Authority Building', 'Market Influence Programmes', 'Leadership Profiling', 'Speaker Positioning', 'Industry Commentary Programmes', 'Opinion Editorial Development', 'Content-Led Influence Campaigns', 'Strategic Narrative Development', 'Brand Storytelling', 'Authority Marketing', 'Influence Measurement & Analytics'],
  featured: false,
  description: ''
}, {
  id: 'svc6',
  category: 'Stakeholder Engagement, Public Affairs & Partnerships',
  services: ['Stakeholder Engagement Strategy', 'Stakeholder Mapping & Analysis', 'Public Affairs Strategy', 'Government Relations', 'Policy Advocacy', 'Regulatory Engagement', 'Investor Communications', 'Community Engagement', 'Social Impact Communications', 'Strategic Partnerships Development', 'Ecosystem Building', 'Industry Association Engagement', 'Multi-Stakeholder Platforms', 'Consensus Building Programmes', 'Social Licence & Trust Programmes'],
  featured: false,
  description: ''
}, {
  id: 'svc7',
  category: 'Crisis, Risk & Issues Management',
  services: ['Crisis Communications Strategy', 'Reputation Risk Management', 'Issues Mapping & Monitoring', 'Crisis Preparedness Programmes', 'Executive Crisis Coaching', 'Crisis Simulation Exercises', 'Crisis Response Centres', 'Incident Communications', 'Media Crisis Management', 'Stakeholder Crisis Communications', 'Recovery & Reputation Rebuilding', 'Business Continuity Communications', 'Strategic Response Planning'],
  featured: false,
  description: ''
}, {
  id: 'svc8',
  category: 'Intelligence, Analytics & Insights',
  services: ['Reputation Intelligence', 'Media Intelligence', 'Stakeholder Intelligence', 'Sentiment Analysis', 'Perception Studies', 'Brand Trust Measurement', 'Share of Voice Analysis', 'Competitive Intelligence', 'Communications Effectiveness Measurement', 'Campaign Analytics', 'Executive Visibility Tracking', 'Stakeholder Insights', 'Impact Measurement', 'Reputation Dashboards', 'Strategic Recommendations'],
  featured: false,
  description: ''
}];
const PREMIUM_OFFERINGS = [{
  id: 'po1',
  title: 'Strategic Communications & Corporate Affairs',
  summary: 'Strategic Communications, Corporate Communications, Executive Communications, Change Communications, Corporate Affairs, Stakeholder Communications, Public Affairs, Messaging Architecture, Reputation Risk Assessments and Trust Building Programmes.'
}, {
  id: 'po2',
  title: 'Public Relations & Media Influence',
  summary: 'Public Relations, Media Relations, Press Office Management, Media Campaigns, Broadcast Relations, Media Training, Thought Leadership Campaigns, Media Partnerships, Story Development and Editorial Engagement.'
}, {
  id: 'po3',
  title: 'Reputation, Trust & Corporate Influence',
  summary: 'Corporate Reputation Management, Executive Reputation, Brand Reputation, Trust Building, ESG Communications, Purpose-Led Communications, Reputation Recovery, Stakeholder Trust Programmes and Reputation Intelligence.'
}, {
  id: 'po4',
  title: 'Media Strategy, Planning & Intelligence',
  summary: 'Media Strategy, Media Planning, Media Partnerships, Broadcast Strategy, Media Intelligence, Audience Insights, Media Monitoring, Share of Voice Analysis and Media ROI Measurement.'
}, {
  id: 'po5',
  title: 'Brand Influence & Thought Leadership',
  summary: 'Thought Leadership Platforms, Executive Positioning, CEO Branding, Personal Branding, Industry Authority Building, Market Influence Programmes, Strategic Narratives, Brand Storytelling and Influence Analytics.'
}, {
  id: 'po6',
  title: 'Stakeholder Engagement & Public Affairs',
  summary: 'Stakeholder Engagement, Government Relations, Public Affairs, Policy Advocacy, Investor Communications, Regulatory Engagement, Community Relations, Strategic Partnerships and Ecosystem Development.'
}, {
  id: 'po7',
  title: 'Crisis Communications & Reputation Protection',
  summary: 'Crisis Communications, Issues Management, Reputation Risk Management, Crisis Preparedness, Executive Coaching, Media Crisis Management, Incident Communications and Reputation Recovery Programmes.'
}, {
  id: 'po8',
  title: 'Reputation Intelligence & Insights',
  summary: 'Reputation Intelligence, Stakeholder Intelligence, Sentiment Analysis, Brand Trust Measurement, Communications Analytics, Competitive Intelligence, Executive Visibility Tracking and Strategic Insights.'
}, {
  id: 'po9',
  title: 'Corporate Influence & Advocacy',
  summary: 'Advocacy Campaigns, Public Affairs Programmes, Policy Communications, Social Impact Communications, Industry Engagement, Consensus Building and Stakeholder Mobilisation Campaigns.'
}, {
  id: 'po10',
  title: 'Executive Visibility & Market Leadership',
  summary: 'Executive Profiling, CEO Positioning, Leadership Communications, Speaker Positioning, Thought Leadership Platforms, Authority Marketing, Trust Building and Market Influence Strategies.'
}];
const SIGNATURE_SOLUTIONS = [{
  id: 'ss1',
  name: 'ReputationInfluence™',
  description: 'Building trusted brands, respected leaders and influential organisations that command credibility, confidence and market leadership.'
}, {
  id: 'ss2',
  name: 'MediaInfluence™',
  description: 'Leveraging strategic media engagement and content platforms to amplify visibility, strengthen reputation and shape public discourse.'
}, {
  id: 'ss3',
  name: 'TrustCapital™',
  description: 'Transforming trust, credibility and stakeholder confidence into strategic assets that drive growth, influence and long-term value creation.'
}, {
  id: 'ss4',
  name: 'BrandInfluence™',
  description: 'Positioning organisations and leaders as authoritative voices that shape industries, influence stakeholders and drive meaningful change.'
}, {
  id: 'ss5',
  name: 'StakeholderCapital™',
  description: 'Building powerful stakeholder ecosystems that strengthen partnerships, enhance legitimacy and create sustainable competitive advantage.'
}, {
  id: 'ss6',
  name: 'PublicAffairsInfluence™',
  description: 'Connecting business, government and society through strategic engagement, policy influence and constructive stakeholder dialogue.'
}, {
  id: 'ss7',
  name: 'ReputationIntelligence™',
  description: 'Converting reputation, media and stakeholder insights into actionable intelligence that informs leadership decisions and protects organisational value.'
}, {
  id: 'ss8',
  name: 'LegacyInfluence™',
  description: 'Creating enduring reputational, social and leadership impact that extends beyond organisations, brands and individuals to shape industries and communities.'
}];
const OUTCOMES_DATA = [{
  id: 'o1',
  title: 'Enhanced Reputation, Trust and Brand Equity',
  descriptor: 'Build enduring credibility that sets you apart',
  IconComponent: ShieldCheck
}, {
  id: 'o2',
  title: 'Increased Visibility, Share of Voice and Market Relevance',
  descriptor: 'Dominate conversations that matter in your market',
  IconComponent: Eye
}, {
  id: 'o3',
  title: 'Stronger Executive Credibility and Leadership Influence',
  descriptor: 'Position leaders as authoritative voices',
  IconComponent: TrendingUp
}, {
  id: 'o4',
  title: 'Greater Stakeholder Confidence, Engagement and Advocacy',
  descriptor: 'Turn stakeholders into active brand champions',
  IconComponent: MessageSquare
}, {
  id: 'o5',
  title: 'Improved Investor, Partner and Market Perceptions',
  descriptor: 'Shape how the market sees and values you',
  IconComponent: Globe
}, {
  id: 'o6',
  title: 'Increased Thought Leadership and Industry Authority',
  descriptor: 'Own the narrative in your sector',
  IconComponent: Users
}, {
  id: 'o7',
  title: 'Enhanced Crisis Preparedness and Reputation Resilience',
  descriptor: 'Protect and recover your reputation under pressure',
  IconComponent: AlertTriangle
}, {
  id: 'o8',
  title: 'Measurable Communications Impact Supporting Growth, Influence and Enterprise Value',
  descriptor: 'Drive quantifiable business outcomes through communications',
  IconComponent: BarChart2
}];
const STATS_DATA = [{
  id: 'st1',
  label: 'Practice Disciplines',
  descriptor: 'Spanning the full spectrum of communications',
  value: 8,
  prefix: '',
  suffix: ''
}, {
  id: 'st2',
  label: 'Clients Served',
  descriptor: 'Across Africa and global markets',
  value: 48,
  prefix: '',
  suffix: '+'
}, {
  id: 'st3',
  label: 'Years of Experience',
  descriptor: 'Building reputations that endure',
  value: 15,
  prefix: '',
  suffix: '+'
}, {
  id: 'st4',
  label: 'Campaigns Delivered',
  descriptor: 'From crisis response to brand launches',
  value: 50,
  prefix: '',
  suffix: '+'
}];
const TICKER_ITEMS = [{
  id: 't1',
  text: 'STRATEGIC COMMUNICATIONS'
}, {
  id: 't2',
  text: 'PUBLIC RELATIONS'
}, {
  id: 't3',
  text: 'MEDIA RELATIONS'
}, {
  id: 't4',
  text: 'REPUTATION MANAGEMENT'
}, {
  id: 't5',
  text: 'BRAND INFLUENCE'
}, {
  id: 't6',
  text: 'THOUGHT LEADERSHIP'
}, {
  id: 't7',
  text: 'STAKEHOLDER ENGAGEMENT'
}, {
  id: 't8',
  text: 'PUBLIC AFFAIRS'
}, {
  id: 't9',
  text: 'CRISIS MANAGEMENT'
}, {
  id: 't10',
  text: 'MEDIA INTELLIGENCE'
}, {
  id: 't11',
  text: 'TRUST BUILDING'
}, {
  id: 't12',
  text: 'ADVOCACY'
}, {
  id: 't13',
  text: 'EXECUTIVE POSITIONING'
}, {
  id: 't14',
  text: 'MARKET LEADERSHIP'
}];
const HERO_TAGS = [{
  id: 'ht1',
  label: 'STRATEGIC COMMUNICATIONS'
}, {
  id: 'ht2',
  label: 'PR & REPUTATION MANAGEMENT'
}, {
  id: 'ht3',
  label: 'BRAND INFLUENCE'
}];
const HERO_LINE_1 = ['Strategic', 'Communications,'];
const HERO_LINE_2 = ['PR,', 'Reputation,'];
const HERO_LINE_3 = ['Media', '&'];
const HERO_LINE_4 = ['Brand', 'Influence™'];
const FACULTY_MEMBERS = [{
  id: 'fac1',
  name: 'Sechaba Motsieloa',
  title: 'Managing Executive & Strategic Communications Lead',
  description: "Sechaba Motsieloa is a highly respected strategic communications, brand, reputation and transformation leader with over 25 years of executive experience across leading organisations including McDonald's South Africa, Magna Carta Reputation Management Consultants, SAB and Kimberly-Clark. A former Chairman of the Marketing Association of South Africa (MASA), Chartered Marketer (CM(SA)) and Managing Partner of KANSY, he advises executives and organisations on strategic communications, reputation leadership, stakeholder influence, brand positioning and organisational transformation. Sechaba is recognised for helping leaders and institutions navigate complexity, align purpose with performance and build enduring trust in an increasingly connected world.",
  image: '/Sechaba-Motsieloa.jpg'
}, {
  id: 'fac2',
  name: 'Milton Nkosi',
  title: 'Media Strategy, Public Affairs & Crisis Communications Advisor',
  description: "Milton Nkosi is an award-winning journalist, former BBC Africa Bureau Chief, international correspondent and trusted media advisor with more than three decades of experience covering some of Africa's most defining political, economic and social developments. As Chairman of MMN International Consulting and a leading commentator on geopolitics, media and reputation, he advises organisations on crisis communications, media strategy, public affairs, executive positioning and stakeholder engagement. His global perspective and deep understanding of narrative influence help leaders communicate with credibility, authority and impact.",
  image: '/Milton-Nkosi.jpg'
}, {
  id: 'fac3',
  name: 'Simphiwe Majola',
  title: 'PR, Reputation & Stakeholder Influence Lead',
  description: 'Simphiwe Majola is a strategic communications and public relations specialist with expertise in reputation management, executive profiling, stakeholder engagement and thought leadership positioning. He works with organisations, executives and brands to strengthen visibility, build stakeholder confidence and enhance organisational influence through integrated communication strategies that align reputation with business objectives and sustainable growth.',
  image: '/Simphiwe-Majola.jpg'
}, {
  id: 'fac4',
  name: 'Mika Chauke',
  title: 'Corporate Communications & Executive Communications Specialist',
  description: 'Mika Chauke is a corporate communications professional specialising in executive communications, internal communications, stakeholder engagement and organisational storytelling. She helps organisations communicate with clarity, consistency and purpose while strengthening employee engagement, leadership visibility and corporate reputation. Her work enables organisations to translate strategy into compelling narratives that drive alignment and trust.',
  image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80'
}, {
  id: 'fac5',
  name: 'Gugu Maqethuka',
  title: 'Public Affairs, Government Relations & Reputation Advisor',
  description: 'Gugu Maqethuka is a seasoned communications strategist with extensive experience in public affairs, stakeholder relations, policy engagement and reputation management. She advises organisations on navigating complex stakeholder environments, strengthening institutional credibility and building trusted relationships with government, industry, media and communities. Her expertise helps organisations secure legitimacy, influence and long-term reputational resilience.',
  image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80'
}, {
  id: 'fac6',
  name: 'Mmatshikhidi Rebecca Phala',
  title: 'Publicity, Media Relations & Content Influence Specialist',
  description: 'Mmatshikhidi Rebecca Phala is a media relations and publicity specialist with a strong track record in securing strategic media coverage, developing compelling storylines and amplifying organisational visibility across traditional and digital media platforms. She works closely with executives, brands and institutions to transform media engagement into influence, credibility and measurable reputation outcomes.',
  image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80'
}, {
  id: 'fac7',
  name: 'Tshepo Sefotlhelo',
  title: 'Chief Reputation Architect',
  description: 'Tshepo Sefotlhelo is a reputation strategist and trusted advisor who helps organisations build, protect and leverage reputation as a strategic business asset. His expertise spans reputation intelligence, executive influence, thought leadership, stakeholder trust and corporate positioning. He works with leadership teams to develop reputation-led growth strategies that strengthen market leadership, organisational resilience and long-term value creation.',
  image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=80'
}, {
  id: 'fac8',
  name: 'Rams Mabote',
  title: 'Executive Media Training, Broadcasting & Brand Influence Advisor',
  description: 'Rams Mabote is a respected South African media veteran, broadcaster, public relations coach and entrepreneur with extensive experience in media engagement, executive profiling and communication effectiveness. He specialises in media training, spokesperson development, broadcast communications and executive visibility. Through his work with leaders, executives and public figures, he equips organisations with the skills required to communicate confidently, engage the media effectively and strengthen reputation through authentic leadership narratives.',
  image: '/Rams-Mabote.jpg'
}, {
  id: 'fac9',
  name: 'Khuthalani Khumalo',
  title: 'Crisis Communications, PR & Media Relations Specialist',
  description: 'Khuthalani Khumalo is a strategic crisis communications, public relations and media relations specialist with a strong track record of helping organisations protect reputation, manage complex issues and sustain stakeholder trust during periods of heightened scrutiny and change. She advises executives and organisations on crisis preparedness, issues management, media engagement, reputation recovery and strategic communications, ensuring responses are timely, credible and aligned with organisational objectives.',
  image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=800&q=80'
}];
const PREMIUM_ICONS = [Megaphone, Radio, ShieldCheck, BarChart2, Star, Users, AlertTriangle, Eye, Globe, TrendingUp];
const CAPABILITY_ICONS = [Megaphone, Radio, ShieldCheck, Eye, Star, Users, AlertTriangle, BarChart2];
const EASE_SMOOTH = [0.21, 0.47, 0.32, 0.98] as [number, number, number, number];
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
    .brand-pulse { animation: brand-pulse 2s ease-in-out 2; }

    @keyframes ticker { from { transform: translateX(0) } to { transform: translateX(-50%) } }
    .ticker-track { display: flex; width: max-content; animation: ticker 40s linear infinite; }

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

    .outcome-card {
      transition: transform 0.3s cubic-bezier(0.21,0.47,0.32,0.98), box-shadow 0.3s cubic-bezier(0.21,0.47,0.32,0.98), border-color 0.3s ease;
    }
    .outcome-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 0 0 1px rgba(252,54,55,0.4), 0 8px 32px rgba(252,54,55,0.12);
      border-color: rgba(252,54,55,0.4) !important;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .ticker-track { animation: none; }
    .brand-pulse  { animation: none; }
    .nav-link-animated::after { display: none; }
    .outcome-card:hover { transform: none; }
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

  /* Prevent all potential horizontal overflow sources */
  html, body { max-width: 100%; overflow-x: hidden; }
`;

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
      color: light ? 'rgba(255,255,255,0.6)' : RED,
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

// ─── HeroHeadline ─────────────────────────────────────────
const HeroHeadline = ({
  reducedMotion,
  inView,
  isMobile
}: {
  reducedMotion: boolean;
  inView: boolean;
  isMobile: boolean;
}) => {
  const headlineClass = isMobile ? 'text-[clamp(28px,8.5vw,52px)] font-semibold text-white leading-[0.95] tracking-[-0.045em] whitespace-normal' : 'text-[clamp(36px,5.5vw,76px)] font-semibold text-white leading-[0.95] tracking-[-0.05em]';
  const lines = [HERO_LINE_1, HERO_LINE_2, HERO_LINE_3, HERO_LINE_4];
  const coloredLineIdx = 3;
  if (reducedMotion) {
    return <div className="flex flex-col">
      {lines.map((line, li) => <h1 key={`rm-l${li}`} className={headlineClass}>
        {line.map((word, wi) => <span key={`rm-l${li}-w${wi}`} style={{
          color: li === coloredLineIdx ? RED : undefined
        }}>
          {word}
          {wi < line.length - 1 ? ' ' : ''}
        </span>)}
      </h1>)}
    </div>;
  }
  let globalIdx = 0;
  return <div className="flex flex-col">
    {lines.map((line, li) => <h1 key={`l${li}`} className={cn(headlineClass, 'flex flex-wrap gap-[0.18em]')}>
      {line.map(word => {
        const idx = globalIdx++;
        return <span key={`l${li}-w${idx}`} style={{
          display: 'inline-block',
          color: li === coloredLineIdx ? RED : undefined,
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(40px)',
          transition: `opacity 0.7s cubic-bezier(0.25,0.46,0.45,0.94) ${idx * 70}ms, transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94) ${idx * 70}ms`
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
  return <div className="w-full bg-[#111111] overflow-hidden py-5 border-t border-white/5">
    <div className="ticker-track">
      {allItems.map(item => <div key={item.uid} className="flex items-center shrink-0 px-6 sm:px-8">
        <span className="text-[12px] sm:text-[14px] font-bold tracking-[0.2em] uppercase text-white/90">{item.text}</span>
        <span className="ml-6 sm:ml-8 text-[#FC3637] text-[10px]">◆</span>
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
  suffix,
  isMobile
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
    paddingTop: isMobile ? '1.5rem' : '3rem',
    paddingBottom: isMobile ? '1.5rem' : '3rem',
    paddingLeft: isMobile ? '1rem' : '2.5rem',
    paddingRight: isMobile ? '1rem' : '2.5rem'
  }} className="overflow-hidden">
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      height: '3px',
      background: RED,
      width: isVisible ? '100%' : '0%',
      transition: 'width 0.9s cubic-bezier(0.21,0.47,0.32,0.98)'
    }} />
    <div className="text-[10px] sm:text-[11px] font-black text-[#FC3637] uppercase tracking-[0.25em] sm:tracking-[0.3em] mb-2 sm:mb-3">{label}</div>
    <div style={{
      fontSize: 'clamp(32px, 7vw, 88px)',
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
  idx,
  delay,
  isMobile,
  isTablet
}: {
  item: typeof SERVICES_DATA[0];
  idx: number;
  delay: number;
  isMobile: boolean;
  isTablet: boolean;
}) => {
  const {
    ref,
    inView
  } = useBidirectionalInView<HTMLDivElement>(0.15);
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const IconComponent = CAPABILITY_ICONS[idx] || ShieldCheck;
  const reducedMotion = usePrefersReducedMotion();
  const visibleCount = 5;
  const hasHidden = item.services.length > visibleCount;
  const visibleServices = item.services.slice(0, visibleCount);
  const hiddenServices = item.services.slice(visibleCount);

  return (
    <motion.div
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      whileHover={reducedMotion ? {} : { y: -6, scale: 1.01 }}
      transition={{
        duration: 0.6,
        ease: [0.21, 0.47, 0.32, 0.98],
        delay: delay / 1000
      }}
      className="w-full relative overflow-hidden rounded-lg p-6 md:p-8 transition-all duration-300"
      style={{
        background: isHovered ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.01)',
        border: '1px solid',
        borderColor: isHovered ? 'rgba(252,54,55,0.3)' : 'rgba(255,255,255,0.04)',
        boxShadow: isHovered ? '0 12px 40px rgba(252,54,55,0.06)' : 'none',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '340px'
      }}
    >
      {/* Top glowing accent bar */}
      <div
        className={cn(
          "absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#FC3637] to-transparent transition-transform duration-300 origin-left",
          isHovered ? "scale-x-100" : "scale-x-0"
        )}
      />

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '18px'
      }}>
        <div style={{
          width: '44px',
          height: '44px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: isHovered ? '#FC3637' : 'rgba(252,54,55,0.1)',
          color: isHovered ? '#FFFFFF' : RED,
          borderRadius: '6px',
          transition: 'all 0.3s ease',
          boxShadow: isHovered ? '0 0 16px rgba(252,54,55,0.4)' : 'none'
        }}>
          <IconComponent size={22} strokeWidth={1.5} />
        </div>
        <span style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.16em',
          color: isHovered ? '#FC3637' : 'rgba(255,255,255,0.2)',
          textTransform: 'uppercase',
          transition: 'color 0.3s ease'
        }}>
          0{idx + 1}
        </span>
      </div>

      <div style={{
        height: '1px',
        background: isHovered ? 'rgba(252,54,55,0.2)' : 'rgba(255,255,255,0.06)',
        marginBottom: '18px',
        transition: 'background 0.3s ease'
      }} />

      <h3 style={{
        color: '#FFFFFF',
        fontSize: '17px',
        fontWeight: 600,
        letterSpacing: '-0.02em',
        lineHeight: 1.3,
        fontFamily: 'Inter, sans-serif',
        marginBottom: '16px'
      }}>
        {item.category}
      </h3>

      <ul style={{
        listStyle: 'none',
        padding: 0,
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.65rem',
        flex: 1
      }}>
        {visibleServices.map((service, i) => (
          <li key={`v-svc-${item.id}-${i}`} style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.5rem',
            color: 'rgba(255,255,255,0.55)',
            fontSize: isMobile ? '13px' : '14px',
            lineHeight: 1.6
          }}>
            <span style={{
              marginTop: '8px',
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              background: '#FC3637',
              flexShrink: 0,
              display: 'inline-block'
            }} />
            <span>{service}</span>
          </li>
        ))}
      </ul>

      {hasHidden && (
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ overflow: 'hidden' }}
            >
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: '0.65rem 0 0 0',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.65rem'
              }}>
                {hiddenServices.map((service, i) => (
                  <li key={`h-svc-${item.id}-${i}`} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.5rem',
                    color: 'rgba(255,255,255,0.55)',
                    fontSize: isMobile ? '13px' : '14px',
                    lineHeight: 1.6
                  }}>
                    <span style={{
                      marginTop: '8px',
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      background: '#FC3637',
                      flexShrink: 0,
                      display: 'inline-block'
                    }} />
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {hasHidden && (
        <button
          onClick={() => setIsExpanded(prev => !prev)}
          style={{
            marginTop: '1.25rem',
            background: 'none',
            border: 'none',
            padding: '0.5rem 0',
            minHeight: '44px',
            cursor: 'pointer',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#FC3637',
            alignSelf: 'flex-start',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <span>{isExpanded ? 'Show less ↑' : 'View all capabilities →'}</span>
        </button>
      )}

      <div style={{
        marginTop: '18px',
        paddingTop: '12px',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        flexShrink: 0
      }}>
        <div style={{
          width: '4px',
          height: '4px',
          background: RED,
          flexShrink: 0
        }} />
        <span style={{
          fontSize: '9px',
          fontWeight: 700,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.2)',
          fontFamily: 'Inter, sans-serif'
        }}>
          Strategic Advisory
        </span>
      </div>
    </motion.div>
  );
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
  padding: isMobile ? '1.25rem 16px' : '1.75rem 80px',
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

// ─── Main Page ────────────────────────────────────────────

// ─── Main Page ────────────────────────────────────────────
export const StrategicCommunicationsPage = () => {
  const [heroInView, setHeroInView] = React.useState(true);
  const [introExpanded, setIntroExpanded] = React.useState(false);
  const scrollY = useScrollDirection();
  const windowWidth = useWindowWidth();
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
    ref: signatureRef,
    inView: signatureInView
  } = useBidirectionalInView<HTMLDivElement>(0.05);
  const {
    ref: facultyRef,
    inView: facultyInView
  } = useBidirectionalInView<HTMLDivElement>(0.1);
  React.useEffect(() => {
    const t = setTimeout(() => setHeroInView(true), 300);
    return () => clearTimeout(t);
  }, []);

  // Keep facultyInView used to suppress lint warnings — it drives the header animation
  void facultyInView;
  const heroParallaxY = reducedMotion ? 0 : scrollY * 0.4;
  const S = (inView: boolean, delay: number = 0) => ({
    opacity: inView || reducedMotion ? 1 : 0,
    transform: inView || reducedMotion ? 'none' : 'translateY(30px)',
    transition: `opacity 0.8s cubic-bezier(0.21, 0.47, 0.32, 0.98) ${delay}ms, transform 0.8s cubic-bezier(0.21, 0.47, 0.32, 0.98) ${delay}ms`
  }) as React.CSSProperties;

  // Responsive padding helpers
  const hPad = isMobile ? '16px' : isTablet ? '40px' : '80px';
  const hPadWide = isMobile ? '16px' : isTablet ? '40px' : '96px';
  const vPadSm = isMobile ? '56px' : '80px';
  const vPadMd = isMobile ? '56px' : '96px';
  const vPadLg = isMobile ? '56px' : '128px';
  const servicesGridCols = isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)';
  return <div className="w-full bg-[#080808] font-sans selection:bg-[#FC3637] selection:text-white" style={{
    overflowX: 'hidden',
    maxWidth: '100vw'
  }}>
    <style>{GLOBAL_STYLES}</style>

    {/* ── Grain texture overlay ── */}
    <div aria-hidden="true" className="noise-overlay" style={{
      position: 'fixed',
      inset: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 9999,
      opacity: 0.04
    }} />

    {/* ── Navigation ── */}
    <Header />

    {/* ── Hero ── */}
    <section style={{
      position: 'relative',
      width: '100%',
      minHeight: '100svh',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'flex-end',
      background: '#080808'
    }}>
      <div aria-hidden="true" style={{
        position: 'absolute',
        inset: '-20%',
        overflow: 'hidden',
        pointerEvents: 'none'
      }}>
        <img src="/strategic-comms-3.jpg" alt="" style={{
          width: '100%',
          height: '110%',
          objectFit: 'cover',
          objectPosition: 'center 10%',
          display: 'block',
          filter: 'grayscale(1) brightness(0.5)',
          transform: `translateY(${heroParallaxY}px)`,
          willChange: 'transform'
        }} />
      </div>
      <div aria-hidden="true" style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.50) 40%, rgba(0,0,0,0.88) 100%)',
        pointerEvents: 'none'
      }} />
      <div aria-hidden="true" style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.25) 60%, transparent 100%)',
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
        paddingLeft: isMobile ? '16px' : isTablet ? '40px' : '96px',
        paddingRight: isMobile ? '16px' : isTablet ? '40px' : '96px',
        paddingTop: 'clamp(80px, 8vh, 120px)',
        paddingBottom: 'clamp(40px, 5vh, 60px)',
        marginTop: 'auto'
      }}>
        <div style={S(heroInView, 80)} className="mb-4">
          <Eyebrow light>Strategic Advisory Capability — Flagship Practice</Eyebrow>
        </div>

        <div className="mb-6 sm:mb-8">
          <HeroHeadline reducedMotion={reducedMotion} inView={heroInView} isMobile={isMobile} />
        </div>

        <div className="flex flex-row flex-wrap items-center gap-5" style={S(heroInView, 200)}>
          <a href="/contact" className="cta-primary group">
            <span>Partner With Us</span>
            <div className="cta-icon-container">
              <ArrowUpRight size={14} className="text-[#1E1E1E]" />
            </div>
          </a>
          <a href="#capabilities" className="cta-secondary group">
            <span>Our Advisory Work</span>
          </a>
        </div>

        <div style={{
          ...S(heroInView, 320),
          marginTop: isMobile ? '1.25rem' : '2.5rem',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? '8px' : '10px',
          flexWrap: 'wrap'
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
            borderRadius: 0,
            background: 'transparent',
            cursor: 'default',
            transition: 'border-color 0.2s ease, color 0.2s ease',
            width: isMobile ? '100%' : undefined,
            justifyContent: isMobile ? 'center' : undefined,
            minHeight: '44px'
          }} onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.borderColor = '#FC3637';
            (e.currentTarget as HTMLElement).style.color = '#FC3637';
          }} onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.3)';
            (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.85)';
          }}>
            {tag.label}
          </span>)}
        </div>
      </div>
    </section>

    {/* ── Ticker ── */}
    <TickerStrip />

    {/* ── Practice Intro (collapsible, Dark Theme) ── */}
    <section style={{
      background: '#0D0D0D',
      paddingTop: vPadSm,
      paddingBottom: vPadSm,
      paddingLeft: hPadWide,
      paddingRight: hPadWide,
      borderBottom: '1px solid rgba(255,255,255,0.05)'
    }}>
      <div ref={mandateRef as React.RefObject<HTMLDivElement>} style={{
        width: '100%',
        maxWidth: isMobile ? '100%' : isTablet ? '720px' : '860px',
        ...S(mandateInView, 0)
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
            background: RED,
            flexShrink: 0,
            marginTop: isMobile ? 0 : '6px'
          }} />
          <div style={{
            flex: 1,
            minWidth: 0
          }}>
            <Eyebrow light>Practice Overview</Eyebrow>
            <p style={{
              fontSize: 'clamp(1.05rem, 3.5vw, 1.9rem)',
              fontWeight: 300,
              color: '#ffffff',
              lineHeight: 1.6,
              letterSpacing: '-0.01em'
            }}>
              Helping organisations build trust, shape perception, strengthen stakeholder confidence and navigate
              increasingly complex business, social and reputational environments.
            </p>
            <div style={{
              maxHeight: introExpanded ? '600px' : '0',
              overflow: 'hidden',
              transition: 'max-height 0.5s cubic-bezier(0.21,0.47,0.32,0.98)'
            }}>
              <p style={{
                marginTop: '1.25rem',
                fontSize: 'clamp(0.9rem, 2vw, 1.15rem)',
                fontWeight: 300,
                color: 'rgba(255,255,255,0.65)',
                lineHeight: 1.7,
                letterSpacing: '-0.005em'
              }}>
                Reputation is increasingly shaped by what organisations say, how they engage, how quickly they respond,
                and the narratives that define them. Through integrated communications capabilities spanning strategic
                communications, public relations, media engagement, reputation management, brand influence, public
                affairs and stakeholder engagement, we help organisations win the narrative, build lasting credibility
                and influence the stakeholders that matter most.
              </p>
            </div>
            <button onClick={() => setIntroExpanded(prev => !prev)} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              marginTop: '1rem',
              background: 'none',
              border: 'none',
              padding: '0.5rem 0',
              cursor: 'pointer',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: RED,
              minHeight: '44px'
            }}>
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

    {/* ── Core Capabilities (Services) ── */}
    <section id="capabilities" ref={servicesSectionRef as React.RefObject<HTMLElement>} style={{
      borderTop: `3px solid ${RED}`,
      paddingTop: vPadMd,
      paddingBottom: vPadLg,
      paddingLeft: hPad,
      paddingRight: hPad,
      background: '#0E0E0E'
    }}>
      <div style={S(servicesSectionInView, 0)} className="mb-10 md:mb-16">
        <Eyebrow light>Core Capabilities</Eyebrow>
        <h2 style={{
          fontWeight: 600,
          letterSpacing: '-0.04em',
          lineHeight: 0.95,
          color: '#ffffff',
          fontSize: 'clamp(1.75rem, 5vw, 4.5rem)'
        }}>
          {'Our Service '}
          <span style={{
            color: RED
          }}>Capabilities</span>
        </h2>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: servicesGridCols,
        gap: isMobile ? '1rem' : '1.5rem'
      }}>
        {SERVICES_DATA.map((item, idx) => <ServiceCard key={item.id} item={item} idx={idx} delay={idx * 50} isMobile={isMobile} isTablet={isTablet} />)}
      </div>
    </section>

    {/* ── Mid-page CTA ── */}
    <MidPageCtaBar message="Protect your reputation before a crisis strikes." cta="Book a Reputation Audit" isMobile={isMobile} />

    {/* ── Stats ── */}
    <div className="stats-diagonal-texture" style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      width: '100%'
    }}>
      {STATS_DATA.map((stat, idx) => <div key={stat.id} style={{
        borderBottom: idx < 2 ? '1px solid rgba(255,255,255,0.10)' : undefined,
        borderRight: idx % 2 === 0 ? '1px solid rgba(255,255,255,0.10)' : undefined
      }}>
        <StatItem label={stat.label} descriptor={stat.descriptor} value={stat.value} prefix={stat.prefix} suffix={stat.suffix} isMobile={isMobile} />
      </div>)}
    </div>



    {/* ── Mid-page CTA 2 ── */}
    <MidPageCtaBar message="Is your organisation crisis-ready?" cta="Request a Crisis Readiness Assessment" isMobile={isMobile} />

    {/* ── Outcomes ── */}
    <section style={{
      paddingTop: vPadMd,
      paddingBottom: vPadMd,
      paddingLeft: hPad,
      paddingRight: hPad,
      background: '#0D0D0D',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div aria-hidden="true" className="noise-overlay" style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.03,
        pointerEvents: 'none'
      }} />

      <div ref={outcomesHeaderRef as React.RefObject<HTMLDivElement>} style={{
        ...S(outcomesHeaderInView, 0),
        marginBottom: isMobile ? '2rem' : '4rem',
        position: 'relative'
      }}>
        <Eyebrow light>Commercial Outcomes</Eyebrow>
        <h2 style={{
          fontWeight: 600,
          letterSpacing: '-0.04em',
          lineHeight: 0.95,
          color: '#ffffff',
          fontSize: 'clamp(1.75rem, 5vw, 4.5rem)',
          marginBottom: '1rem'
        }}>
          {'What We Help You '}
          <span style={{
            color: RED
          }}>Achieve</span>
        </h2>
        <p style={{
          color: 'rgba(255,255,255,0.55)',
          fontSize: isMobile ? '0.9375rem' : '1.0625rem',
          lineHeight: 1.7,
          maxWidth: '560px'
        }}>
          We focus on delivering tangible results that enhance enterprise value and market standing through strategic
          communications.
        </p>
      </div>

      {/* Icon card grid */}
      <div ref={outcomesGridRef as React.RefObject<HTMLDivElement>} style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : isTablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
        gap: isMobile ? '0.75rem' : '1.5rem',
        position: 'relative'
      }}>
        {OUTCOMES_DATA.map((item, idx) => <div key={item.id} className="outcome-card" style={{
          background: '#161616',
          borderTop: `3px solid ${RED}`,
          padding: isMobile ? '1rem' : '1.75rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          cursor: 'default',
          border: '1px solid rgba(255,255,255,0.06)',
          opacity: outcomesGridInView ? 1 : 0,
          transform: outcomesGridInView ? 'translateY(0)' : 'translateY(24px)',
          transition: `opacity 0.7s cubic-bezier(0.21,0.47,0.32,0.98) ${idx * 60}ms, transform 0.7s cubic-bezier(0.21,0.47,0.32,0.98) ${idx * 60}ms`
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            background: RED,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            {React.createElement(item.IconComponent, {
              size: 15,
              color: '#ffffff'
            })}
          </div>
          <div>
            <h3 style={{
              fontSize: isMobile ? '12px' : '14px',
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.35,
              marginBottom: '0.35rem',
              letterSpacing: '-0.01em'
            }}>
              {item.title}
            </h3>
            <p style={{
              fontSize: '12px',
              color: 'rgba(255,255,255,0.45)',
              lineHeight: 1.5,
              margin: 0
            }}>
              {item.descriptor}
            </p>
          </div>
        </div>)}
      </div>
    </section>

    {/* ── Signature Solutions ── */}
    <section style={{
      display: 'none',
      background: '#F4F4F4',
      borderTop: `3px solid ${RED}`,
      paddingTop: vPadMd,
      paddingBottom: vPadMd,
      paddingLeft: hPad,
      paddingRight: hPad,
      overflow: 'hidden'
    }}>
      <div ref={signatureRef as React.RefObject<HTMLDivElement>} style={S(signatureInView, 0)} className="mb-10 md:mb-16">
        <Eyebrow>Signature Solutions</Eyebrow>
        <h2 style={{
          fontWeight: 600,
          letterSpacing: '-0.04em',
          lineHeight: 0.95,
          color: CHARCOAL,
          fontSize: 'clamp(1.75rem, 5vw, 4.5rem)'
        }}>
          {'Proprietary '}
          <span style={{
            color: RED
          }}>Platforms™</span>
        </h2>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
        gap: '1px',
        background: 'rgba(30,30,30,0.10)',
        overflow: 'hidden'
      }}>
        {SIGNATURE_SOLUTIONS.map((sol, idx) => <div key={sol.id} className="offering-card" style={{
          background: '#ffffff',
          padding: isMobile ? '1.25rem' : '2rem',
          borderLeft: `3px solid ${RED}`,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.65rem',
          opacity: signatureInView ? 1 : 0,
          transform: signatureInView ? 'translateY(0)' : 'translateY(24px)',
          transition: `opacity 0.7s cubic-bezier(0.21,0.47,0.32,0.98) ${idx * 60}ms, transform 0.7s cubic-bezier(0.21,0.47,0.32,0.98) ${idx * 60}ms`
        }}>
          <span style={{
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: RED
          }}>
            {String(idx + 1).padStart(2, '0')}
          </span>
          <h3 style={{
            fontSize: isMobile ? '15px' : '16px',
            fontWeight: 700,
            color: CHARCOAL,
            letterSpacing: '-0.02em',
            lineHeight: 1.2
          }}>
            {sol.name}
          </h3>
          <p style={{
            fontSize: '13px',
            color: 'rgba(30,30,30,0.55)',
            lineHeight: 1.65
          }}>{sol.description}</p>
        </div>)}
      </div>
    </section>

    {/* ── Mid-page CTA 3 ── */}
    <MidPageCtaBar message="Ready to build influence that lasts?" cta="Start a Conversation" isMobile={isMobile} />

    {/* ── Faculty Section ── */}
    <section style={{
      display: 'none',
      background: '#ffffff',
      paddingTop: isMobile ? '56px' : isTablet ? '80px' : '112px',
      paddingBottom: isMobile ? '56px' : isTablet ? '80px' : '112px',
      paddingLeft: hPad,
      paddingRight: hPad
    }}>
      <div ref={facultyRef as React.RefObject<HTMLDivElement>} className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 gap-5 md:gap-8">
        <div>
          <Eyebrow>Strategic Communications, PR, Reputation, Media &amp; Brand Influence Practice™</Eyebrow>
          <h2 className="font-semibold uppercase" style={{
            fontSize: 'clamp(1.6rem, 4.5vw, 3.75rem)',
            letterSpacing: '-0.04em',
            lineHeight: 0.92,
            color: '#1A1A1A',
            fontFamily: 'Inter, sans-serif'
          }}>
            Principal Leadership &amp; Delivery Team
          </h2>
        </div>
        <p className="md:text-right md:max-w-sm" style={{
          color: '#757575',
          fontSize: 'clamp(14px, 1.5vw, 17px)',
          fontWeight: 400,
          lineHeight: 1.75
        }}>
          Our team brings deep expertise across communications, reputation management, media strategy and stakeholder
          engagement.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-7 w-full">
        {FACULTY_MEMBERS.map(member => <div key={member.id} className="group transition-all w-full overflow-hidden" style={{
          border: '1px solid rgba(26,26,26,0.06)'
        }} onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.borderColor = 'rgba(252,54,55,0.2)';
        }} onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.borderColor = 'rgba(26,26,26,0.06)';
        }}>
          <div className="flex flex-col sm:grid sm:grid-cols-5 h-full">
            {/* Image column */}
            <div className="sm:col-span-2 overflow-hidden aspect-square">
              <img src={member.image} alt={`Portrait of ${member.name}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0" style={{
                display: 'block'
              }} />
            </div>
            {/* Content column */}
            <div className="sm:col-span-3 flex flex-col justify-start" style={{
              background: '#ffffff',
              padding: isMobile ? '1.25rem' : '2rem'
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
              <p style={{
                color: RED,
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase' as const,
                borderBottom: '1px solid rgba(252,54,55,0.1)',
                paddingBottom: '14px',
                marginBottom: '16px',
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
              <div style={{
                marginTop: '20px',
                display: 'flex',
                gap: '10px'
              }}>
                <a href="https://linkedin.com/company/empowaworx" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" style={{
                  width: '36px',
                  height: '36px',
                  minWidth: '36px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(0,0,0,0.05)',
                  color: '#1A1A1A',
                  transition: 'background 0.2s ease, color 0.2s ease'
                }} onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = RED;
                  el.style.color = '#ffffff';
                }} onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = 'rgba(0,0,0,0.05)';
                  el.style.color = '#1A1A1A';
                }}>
                  <Linkedin size={14} />
                </a>
                <a href="https://instagram.com/empowaworx" target="_blank" rel="noopener noreferrer" aria-label="Instagram profile" style={{
                  width: '36px',
                  height: '36px',
                  minWidth: '36px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(0,0,0,0.05)',
                  color: '#1A1A1A',
                  transition: 'background 0.2s ease, color 0.2s ease'
                }} onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = RED;
                  el.style.color = '#ffffff';
                }} onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = 'rgba(0,0,0,0.05)';
                  el.style.color = '#1A1A1A';
                }}>
                  <Instagram size={14} />
                </a>
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
          color: RED,
          marginBottom: '12px',
          fontFamily: 'Inter, sans-serif'
        }}>
          Practice Positioning Statement™
        </h4>
        <p style={{
          color: '#555',
          fontSize: 'clamp(14px, 1.5vw, 16px)',
          lineHeight: 1.8,
          margin: 0,
          fontFamily: 'Inter, sans-serif',
          fontWeight: 400
        }}>
          The Strategic Communications, PR, Reputation, Media &amp; Brand Influence Practice™ helps organisations build trust, shape narratives, influence stakeholders and protect reputation in an era defined by transparency, complexity and heightened public scrutiny. Our multidisciplinary team of communication strategists, public affairs advisors, journalists, reputation experts and media specialists partners with leaders to transform communication into influence, reputation into competitive advantage and visibility into sustainable organisational value.
        </p>
      </div>
    </section>


    {/* ── CTA Strip — Flagship Practice Closing ── */}
    <section style={{
      position: 'relative',
      overflow: 'hidden',
      paddingTop: isMobile ? '56px' : '8rem',
      paddingBottom: isMobile ? '56px' : '8rem',
      paddingLeft: hPad,
      paddingRight: hPad,
      background: '#080808',
      borderTop: '1px solid rgba(255,255,255,0.06)'
    }}>
      {/* Decorative geometric — clipped within overflow:hidden */}
      <div aria-hidden="true" style={{
        position: 'absolute',
        top: '-20%',
        right: '-10%',
        width: isMobile ? '240px' : '500px',
        height: isMobile ? '240px' : '500px',
        background: 'rgba(255,255,255,0.02)',
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
      }} className="max-w-4xl mx-auto text-center" style={{
        position: 'relative',
        zIndex: 1
      }}>
        <Eyebrow light>Flagship Practice</Eyebrow>
        <h2 style={{
          fontWeight: 600,
          color: '#ffffff',
          fontSize: isMobile ? 'clamp(1.25rem, 5vw, 1.75rem)' : 'clamp(1.75rem, 4vw, 3rem)',
          letterSpacing: '-0.03em',
          lineHeight: 1.15,
          marginBottom: '1.25rem'
        }}>
          <span>EmpowaWorx Strategic Communications, Reputation, Media </span>
          <span style={{
            color: '#FC3637'
          }}>&amp; Brand Influence Advisory</span>
        </h2>
        <p style={{
          color: 'rgba(255,255,255,0.75)',
          fontSize: isMobile ? '0.9rem' : '1.0625rem',
          fontWeight: 300,
          lineHeight: 1.75,
          marginBottom: '2.5rem',
          maxWidth: '760px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          Helping organisations build trust, shape perception, strengthen reputation, influence stakeholders and lead
          meaningful conversations through world-class strategic communications, public relations, media engagement,
          public affairs and thought leadership solutions that deliver measurable business, societal and reputational
          impact.
        </p>
        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: '14px',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <a href="/contact" className="cta-primary group">
            <span>Partner With Us</span>
            <div className="cta-icon-container">
              <ArrowUpRight size={14} className="text-[#1E1E1E]" />
            </div>
          </a>
          <a href="#advisory" className="cta-secondary group">
            <span>Explore All Advisory Capabilities</span>
          </a>
        </div>
      </motion.div>
    </section>

    {/* ── Footer ── */}
    <Footer />
  </div>;
};
