import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Linkedin, Instagram, Facebook, Youtube, Twitter, Plus, Minus, Mic, Globe, Star, Award, BarChart3, Zap, Eye, BookOpen, Radio, Network } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { AfricaWatermark } from '../AfricaWatermark';

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
function useBidirectionalInView(threshold = 0.15) {
  const ref = React.useRef<HTMLDivElement>(null);
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

// ─── useScrollY ───────────────────────────────────────────────────
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

// ─── Types ───────────────────────────────────────────────────────
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
  icon: React.ReactNode;
  category: string;
}
interface SignatureSolutionData {
  id: string;
  name: string;
  namePlain: string;
  descriptor: string;
}
interface FacultyMemberData {
  id: string;
  name: string;
  title: string;
  description: string;
  image: string;
}
interface SocialItemData {
  icon: React.ReactNode;
  label: string;
  href: string;
}
interface HeroTagData {
  id: string;
  label: string;
}

// ─── Data ────────────────────────────────────────────────────────
const HERO_LINE_1: string[] = ['Executive', 'Influence,'];
const HERO_LINE_2: string[] = ['/', 'Thought', 'Leadership'];
const HERO_LINE_3: string[] = ['& Speaker Bureau.'];
const HERO_TAGS: HeroTagData[] = [{
  id: 'tag1',
  label: 'Executive Positioning'
}, {
  id: 'tag2',
  label: 'Thought Leadership'
}, {
  id: 'tag3',
  label: 'Speaker Bureau'
}];
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
const TICKER_ITEMS_BASE: TickerItemData[] = [{
  id: 't1',
  text: 'EXECUTIVE INFLUENCE'
}, {
  id: 't2',
  text: 'THOUGHT LEADERSHIP'
}, {
  id: 't3',
  text: 'SPEAKER BUREAU'
}, {
  id: 't4',
  text: 'LEADERSHIP NARRATIVE'
}, {
  id: 't5',
  text: 'MARKET AUTHORITY'
}, {
  id: 't6',
  text: 'CEO POSITIONING'
}, {
  id: 't7',
  text: 'INDUSTRY INFLUENCE'
}, {
  id: 't8',
  text: 'GLOBAL VOICES'
}];
const SERVICE_CARD_STYLES: {
  gradient: string;
  shape: string;
  image: string;
}[] = [{
  gradient: 'linear-gradient(135deg, rgba(26,0,0,0.88) 0%, rgba(45,5,5,0.82) 40%, rgba(13,0,0,0.92) 100%)',
  shape: 'triangle',
  image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80'
}, {
  gradient: 'linear-gradient(135deg, rgba(0,8,24,0.88) 0%, rgba(0,21,53,0.82) 40%, rgba(0,13,32,0.92) 100%)',
  shape: 'square',
  image: 'https://images.unsplash.com/photo-1519085185758-2ed33c5e6f6a?auto=format&fit=crop&w=800&q=80'
}, {
  gradient: 'linear-gradient(135deg, rgba(0,18,8,0.88) 0%, rgba(0,39,21,0.82) 40%, rgba(0,14,6,0.92) 100%)',
  shape: 'slash',
  image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=800&q=80'
}, {
  gradient: 'linear-gradient(135deg, rgba(16,0,32,0.88) 0%, rgba(32,0,64,0.82) 40%, rgba(10,0,24,0.92) 100%)',
  shape: 'triangle',
  image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=800&q=80'
}, {
  gradient: 'linear-gradient(135deg, rgba(26,8,0,0.88) 0%, rgba(46,16,0,0.82) 40%, rgba(14,5,0,0.92) 100%)',
  shape: 'square',
  image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80'
}, {
  gradient: 'linear-gradient(135deg, rgba(0,20,26,0.88) 0%, rgba(0,37,53,0.82) 40%, rgba(0,13,20,0.92) 100%)',
  shape: 'slash',
  image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80'
}, {
  gradient: 'linear-gradient(135deg, rgba(10,0,24,0.88) 0%, rgba(24,0,48,0.82) 40%, rgba(6,0,16,0.92) 100%)',
  shape: 'triangle',
  image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80'
}, {
  gradient: 'linear-gradient(135deg, rgba(0,16,8,0.88) 0%, rgba(0,28,16,0.82) 40%, rgba(0,12,6,0.92) 100%)',
  shape: 'square',
  image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80'
}];
const SERVICES: ServiceCategoryData[] = [{
  id: 'sv1',
  title: 'Executive Influence, Positioning & Leadership Visibility',
  teaser: 'Helping executives, founders, CEOs, board members and industry leaders build influence, strengthen credibility and position themselves as trusted voices shaping industries, organisations and society.',
  image: 'https://images.unsplash.com/photo-1519085185758-2ed33c5e6f6a?w=800&q=80',
  services: ['Executive Influence Strategy', 'Executive Positioning & Profiling', 'CEO Branding & Visibility', 'Leadership Brand Development', 'Executive Reputation Management', 'Industry Authority Building', 'Executive Communications Advisory', 'Leadership Narrative Development', 'Executive Presence Enhancement', 'Personal Brand Strategy', 'Market Leadership Positioning', 'Influence Mapping & Stakeholder Engagement', 'Board & Governance Positioning', 'Executive Media Positioning', 'Legacy & Impact Positioning', 'Executive Influence Audits']
}, {
  id: 'sv2',
  title: 'Thought Leadership Strategy & Intellectual Capital Development',
  teaser: 'Transforming expertise, insights and experience into powerful thought leadership platforms that shape conversations, influence decisions and drive market leadership.',
  image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80',
  services: ['Thought Leadership Strategy', 'Intellectual Capital Development', 'Industry Authority Platforms', 'Executive Content Strategy', 'Research & Insights Development', 'White Papers & Industry Reports', 'Opinion Editorial Development', 'Leadership Articles & Publications', 'Executive Podcasts & Video Series', 'Trend & Foresight Reports', 'Industry Commentary Platforms', 'Knowledge Leadership Programmes', 'Leadership Books & Publishing Advisory', 'Thought Leadership Campaigns', 'Influence Content Programmes', 'Knowledge Commercialisation Strategies']
}, {
  id: 'sv3',
  title: 'Speaker Bureau, Talent Representation & Procurement',
  teaser: 'Connecting organisations with influential speakers, industry experts, executives, policymakers, academics, celebrities and changemakers who inspire, educate and influence audiences.',
  image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80',
  services: ['Speaker Bureau Management', 'Speaker Procurement & Booking', 'Executive Speaker Representation', 'Keynote Speaker Management', 'Leadership Speaker Programmes', 'Celebrity Talent Procurement', 'Moderator & Facilitator Procurement', 'Industry Expert Sourcing', 'Conference Speaker Management', 'Speaker Contracting & Negotiation', 'Speaker Relationship Management', 'International Speaker Acquisition', 'Virtual Speaker Programmes', 'Speaker Advisory Services', 'Speaker Talent Development']
}, {
  id: 'sv4',
  title: 'Executive Content, Storytelling & Influence Platforms',
  teaser: 'Building content ecosystems that amplify executive visibility, strengthen authority and position leaders at the centre of industry conversations.',
  image: 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=800&q=80',
  services: ['Executive Content Strategy', 'Leadership Storytelling', 'Executive Video Content', 'Podcast Development & Production', 'LinkedIn Thought Leadership Programmes', 'Executive Newsletters', 'Content Studio Development', 'Leadership Interviews & Profiles', 'Fireside Chats & Leadership Conversations', 'Executive Ghostwriting Services', 'Digital Influence Platforms', 'Multi-Channel Content Distribution', 'Influence Amplification Campaigns', 'Executive Brand Journalism', 'Content Performance Intelligence']
}, {
  id: 'sv5',
  title: 'Media, Public Relations & Executive Visibility',
  teaser: 'Enhancing executive visibility and influence through strategic media engagement, thought leadership profiling and reputation-building initiatives.',
  image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80',
  services: ['Executive Media Relations', 'Executive PR Campaigns', 'Media Training & Coaching', 'Broadcast & Television Placements', 'Print & Digital Media Profiling', 'Executive Interviews', 'Opinion Editorial Placements', 'Industry Commentary Programmes', 'Media Partnership Development', 'Leadership Feature Programmes', 'Executive Reputation Building', 'Earned Media Campaigns', 'Media Visibility Measurement', 'Executive Influence Tracking']
}, {
  id: 'sv6',
  title: 'Leadership Platforms, Summits & Influence Experiences',
  teaser: 'Creating high-impact platforms and experiences that connect leaders with influential audiences, strategic stakeholders and decision-makers.',
  image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=80',
  services: ['Leadership Summit Development', 'Executive Forums', 'CEO Roundtables', 'Leadership Breakfasts', 'Fireside Conversations', 'Industry Leadership Platforms', 'Knowledge Exchange Forums', 'Executive Networking Experiences', 'Stakeholder Engagement Platforms', 'C-Suite Communities', 'Leadership Awards Programmes', 'Influence & Recognition Platforms', 'Strategic Dialogue Platforms', 'Thought Leadership Events', 'Executive Masterclasses']
}, {
  id: 'sv7',
  title: 'Influence Partnerships, Stakeholder Capital & Ecosystem Building',
  teaser: 'Building strategic relationships and influence ecosystems that amplify reach, strengthen credibility and unlock new opportunities.',
  image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&q=80',
  services: ['Strategic Partnership Development', 'Influence Ecosystem Design', 'Stakeholder Capital Strategies', 'Industry Association Engagement', 'Strategic Alliance Development', 'Investor & Board Positioning', 'Government & Policy Engagement', 'Academic & Research Partnerships', 'Corporate Partnership Programmes', 'Executive Network Development', 'Influence Community Building', 'Stakeholder Mapping & Intelligence', 'Relationship Capital Development', 'Cross-Sector Collaboration Platforms']
}, {
  id: 'sv8',
  title: 'Influence Intelligence, Analytics & Measurement',
  teaser: 'Measuring influence, visibility, authority and stakeholder engagement through robust intelligence and performance frameworks.',
  image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80',
  services: ['Executive Influence Intelligence', 'Thought Leadership Analytics', 'Media Visibility Tracking', 'Reputation & Authority Measurement', 'Share of Voice Analysis', 'Stakeholder Perception Studies', 'Influence Benchmarking', 'Audience Engagement Analytics', 'Content Performance Measurement', 'Brand Authority Assessments', 'Competitive Positioning Analysis', 'Impact Measurement & Reporting', 'Executive Dashboard Reporting', 'Strategic Influence Insights']
}];
const OUTCOMES: OutcomeItemData[] = [{
  id: 'o1',
  number: '01',
  title: 'Executive Influence & Leadership Positioning',
  descriptor: 'Executive Positioning, CEO Branding, Leadership Visibility, Executive Communications, Personal Branding, Authority Building, Executive Reputation Management and Legacy Positioning.',
  icon: <Star size={18} />,
  category: 'Positioning'
}, {
  id: 'o2',
  number: '02',
  title: 'Thought Leadership & Intellectual Capital',
  descriptor: 'Thought Leadership Strategy, Intellectual Capital Development, Industry Authority Platforms, Research Reports, White Papers, Publishing Advisory, Executive Content and Knowledge Leadership Programmes.',
  icon: <BookOpen size={18} />,
  category: 'Strategy'
}, {
  id: 'o3',
  number: '03',
  title: 'Speaker Bureau & Talent Management',
  descriptor: 'Speaker Bureau Management, Speaker Procurement, Executive Representation, Keynote Speakers, Celebrity Talent, Moderators, Industry Experts and International Speaker Acquisition.',
  icon: <Mic size={18} />,
  category: 'Talent'
}, {
  id: 'o4',
  number: '04',
  title: 'Executive Content & Influence Platforms',
  descriptor: 'Executive Content Strategy, Leadership Storytelling, Podcasts, Video Series, LinkedIn Programmes, Executive Newsletters, Ghostwriting and Influence Amplification Campaigns.',
  icon: <Radio size={18} />,
  category: 'Content'
}, {
  id: 'o5',
  number: '05',
  title: 'Media Relations & Executive Visibility',
  descriptor: 'Executive PR, Media Relations, Media Training, Broadcast Placements, Editorial Features, Industry Commentary, Earned Media Campaigns and Visibility Measurement.',
  icon: <Eye size={18} />,
  category: 'Media'
}, {
  id: 'o6',
  number: '06',
  title: 'Leadership Platforms & Executive Experiences',
  descriptor: 'Leadership Summits, CEO Forums, Executive Roundtables, Knowledge Platforms, Leadership Awards, Networking Experiences, Strategic Dialogues and Executive Masterclasses.',
  icon: <Globe size={18} />,
  category: 'Events'
}, {
  id: 'o7',
  number: '07',
  title: 'Strategic Partnerships & Influence Ecosystems',
  descriptor: 'Partnership Development, Stakeholder Capital, Ecosystem Building, Executive Networks, Strategic Alliances, Investor Positioning and Relationship Capital Development.',
  icon: <Network size={18} />,
  category: 'Partnerships'
}, {
  id: 'o8',
  number: '08',
  title: 'Influence Intelligence & Performance Measurement',
  descriptor: 'Executive Influence Intelligence, Thought Leadership Analytics, Reputation Measurement, Stakeholder Insights, Share of Voice Analysis, Benchmarking and Impact Reporting.',
  icon: <BarChart3 size={18} />,
  category: 'Analytics'
}, {
  id: 'o9',
  number: '09',
  title: 'Authority Building & Market Leadership',
  descriptor: 'Industry Authority Development, Executive Visibility, Market Leadership Positioning, Influence Campaigns, Brand Authority Programmes and Leadership Recognition Platforms.',
  icon: <Award size={18} />,
  category: 'Authority'
}, {
  id: 'o10',
  number: '10',
  title: 'Legacy, Impact & Leadership Influence',
  descriptor: 'Legacy Positioning, Leadership Impact Programmes, Social Influence Platforms, Governance Visibility, Purpose-Led Leadership and Enduring Influence Strategies.',
  icon: <Zap size={18} />,
  category: 'Legacy'
}];
const SIGNATURE_SOLUTIONS: SignatureSolutionData[] = [{
  id: 'ss1',
  name: 'ExecutiveInfluence',
  namePlain: 'ExecutiveInfluence',
  descriptor: 'Positioning leaders as trusted authorities who shape industries, influence decisions and inspire meaningful action.'
}, {
  id: 'ss2',
  name: 'ThoughtLeadership',
  namePlain: 'ThoughtLeadership',
  descriptor: 'Transforming expertise, insights and intellectual capital into influential platforms that drive credibility, relevance and market leadership.'
}, {
  id: 'ss3',
  name: 'SpeakerCapital',
  namePlain: 'SpeakerCapital',
  descriptor: 'Connecting organisations and audiences with world-class speakers, thought leaders and industry experts who educate, inspire and influence.'
}, {
  id: 'ss4',
  name: 'InfluenceCapital',
  namePlain: 'InfluenceCapital',
  descriptor: 'Building strategic influence ecosystems that strengthen visibility, credibility, stakeholder trust and leadership impact.'
}, {
  id: 'ss5',
  name: 'AuthorityCapital',
  namePlain: 'AuthorityCapital',
  descriptor: 'Establishing executives and organisations as recognised authorities that lead conversations, shape markets and influence the future.'
}, {
  id: 'ss6',
  name: 'LeadershipVisibility',
  namePlain: 'LeadershipVisibility',
  descriptor: 'Amplifying executive presence across media, digital, industry and stakeholder platforms to maximise influence and opportunity.'
}, {
  id: 'ss7',
  name: 'ReputationCapital',
  namePlain: 'ReputationCapital',
  descriptor: 'Leveraging reputation, credibility and trust as strategic assets that accelerate growth, leadership positioning and long-term value creation.'
}, {
  id: 'ss8',
  name: 'LegacyInfluence',
  namePlain: 'LegacyInfluence',
  descriptor: 'Creating enduring leadership, societal and organisational impact that extends beyond individual careers to shape industries, institutions and future generations.'
}];
const CARD_COLORS: {
  bg: string;
  border: string;
  bgImage: string;
}[] = [{
  bg: '#1A0A0A',
  border: '#8B1A1A',
  bgImage: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80'
}, {
  bg: '#0A0A1A',
  border: '#1A1A8B',
  bgImage: 'https://images.unsplash.com/photo-1519085185758-2ed33c5e6f6a?auto=format&fit=crop&w=800&q=80'
}, {
  bg: '#0A1410',
  border: '#1A5A3A',
  bgImage: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=800&q=80'
}, {
  bg: '#1A100A',
  border: '#8B5A1A',
  bgImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80'
}, {
  bg: '#10001A',
  border: '#5A1A8B',
  bgImage: 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?auto=format&fit=crop&w=800&q=80'
}, {
  bg: '#001A18',
  border: '#1A6B60',
  bgImage: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80'
}, {
  bg: '#1A1A0A',
  border: '#6B6B1A',
  bgImage: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80'
}, {
  bg: '#0A0F1A',
  border: '#1A3A6B',
  bgImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80'
}];
const FACULTY_MEMBERS: FacultyMemberData[] = [{
  id: 'f1',
  name: 'Neo Mathebe',
  title: 'Head: Executive Influence, Thought Leadership & Speaker Bureau',
  description: "Neo Mathebe leads Executive Influence, Thought Leadership and Speaker Bureau services, helping executives, entrepreneurs, policymakers, industry experts and changemakers build visibility, credibility and influence across boardrooms, conferences, media platforms and leadership forums. She is responsible for positioning leaders as trusted voices who shape conversations, influence decision-making and drive meaningful impact. Her expertise spans executive profiling, thought leadership strategy, speaker representation, platform positioning, stakeholder engagement, keynote placement, content-driven influence and reputation building. Neo works at the intersection of ideas, influence and opportunity, ensuring that the right voices are strategically positioned to inspire audiences, shape industries and create lasting value. Her approach aligns with The Speakers Firm's philosophy of deploying influential thinkers, not simply speakers, to drive leadership, transformation and institutional impact.",
  image: '/Neo-Mathebe.JPG'
}, {
  id: 'f2',
  name: 'Anita Tirkey',
  title: 'Lead: Speaker Management, Client Relations & Talent Development',
  description: "Anita is a speaker management and talent relations specialist responsible for identifying, positioning and managing high-impact speakers, thought leaders, moderators and subject matter experts. She works closely with clients, conference organisers and industry partners to align influential voices with strategic business, leadership and stakeholder engagement objectives. Her expertise includes speaker management, executive representation, client advisory, commercial negotiations, programme curation, talent development and strategic platform placement. Anita ensures every speaker engagement delivers measurable value, audience impact and meaningful outcomes while strengthening the visibility, authority and market influence of the leaders represented by The Speakers Firm. Guided by a client-centric and outcomes-driven approach, she helps transform expertise into influence and speaking engagements into strategic opportunities.",
  image: '/team_faculty/Anita-Tirkey.jpg'
}];
const SOCIAL_ITEMS: SocialItemData[] = [{
  icon: <Facebook size={16} />,
  label: 'Facebook',
  href: '#'
}, {
  icon: <Instagram size={16} />,
  label: 'Instagram',
  href: '#'
}, {
  icon: <Linkedin size={16} />,
  label: 'LinkedIn',
  href: '#'
}, {
  icon: <Twitter size={16} />,
  label: 'Twitter',
  href: '#'
}, {
  icon: <Youtube size={16} />,
  label: 'YouTube',
  href: '#'
}];

// ─── Advisory Stats ─────────────────────────────────────────────
const ADVISORY_STATS = [{
  label: 'Experience',
  value: '20+ Years'
}, {
  label: 'Focus Area',
  value: 'C-Suite Leaders'
}, {
  label: 'Reach',
  value: 'Pan-African'
}];

// ─── Global Styles ───────────────────────────────────────────────
const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');

  :root {
    --radius: 0rem;
    --accent: #E63329;
    --charcoal: #1A1A1A;
  }

  *, h1, h2, h3, h4, h5, h6, p, span, a, button, li {
    font-family: 'Inter', system-ui, -apple-system, sans-serif !important;
  }

  @keyframes ticker {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }
  .ticker-track {
    display: flex;
    width: max-content;
    animation: ticker 30s linear infinite;
  }
  .ticker-track:hover {
    animation-play-state: paused;
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
    background: #E63329;
    transition: width 0.3s ease;
  }
  .nav-link-animated:hover::after {
    width: 100%;
  }

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
  .grain {
    position: fixed;
    top: -300%;
    left: -150%;
    height: 600%;
    width: 300%;
    background-image: url('https://grainy-gradients.vercel.app/noise.svg');
    opacity: 0.05;
    pointer-events: none;
    z-index: 100;
    animation: grain 8s steps(10) infinite;
  }

  .solutions-carousel {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  .solutions-carousel::-webkit-scrollbar { display: none; }

  .solution-card-new {
    scroll-snap-align: start;
    flex-shrink: 0;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 2px;
    overflow: hidden;
    cursor: default;
    transition: border-color 300ms ease;
  }
  .solution-card-new:hover { border-color: rgba(230,51,41,0.4); }
  .solution-card-new:hover .sol-ghost-num { opacity: 0.10 !important; }

  .outcome-row { position: relative; }
  .outcome-row-border {
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 3px;
    background: #E63329;
    transform: scaleY(0);
    transform-origin: bottom;
    transition: transform 250ms ease;
  }
  .outcome-row:hover .outcome-row-border { transform: scaleY(1); }

  .svc-accordion-content {
    overflow: hidden;
    transition: max-height 400ms cubic-bezier(0.4, 0, 0.2, 1), opacity 300ms ease;
  }

  .cta-primary { transition: background 0.25s ease, transform 0.15s ease; }
  .cta-primary:hover { background: #C42D24 !important; transform: translateY(-1px); }
  .cta-primary:active { transform: translateY(0); }

  /* Prevent any horizontal overflow */
  html, body { max-width: 100%; overflow-x: hidden; }
`;

// ─── SectionHeader ───────────────────────────────────────────────
const SectionHeader = ({
  label,
  title,
  light = false
}: {
  label: string;
  title: string;
  light?: boolean;
}) => {
  const {
    ref,
    inView
  } = useBidirectionalInView(0.2);
  return <div ref={ref} className="mb-8 md:mb-16 lg:mb-20">
    <motion.span initial={{
      opacity: 0,
      y: 20
    }} animate={inView ? {
      opacity: 1,
      y: 0
    } : {
      opacity: 0,
      y: 20
    }} transition={{
      duration: 0.6
    }} className={cn('inline-block mb-4 uppercase', light ? 'text-white/50' : 'text-[#E63329]')} style={{
      fontSize: '11px',
      fontWeight: 700,
      letterSpacing: '0.25em',
      fontFamily: 'Inter, sans-serif'
    }}>
      {label}
    </motion.span>
    <motion.h2 initial={{
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
      delay: 0.1
    }} className={cn('uppercase leading-none', light ? 'text-white' : 'text-[#1A1A1A]')} style={{
      fontSize: 'clamp(1.6rem, 5vw, 4rem)',
      fontWeight: 600,
      letterSpacing: '-0.03em',
      lineHeight: 0.92
    }}>
      {title}
    </motion.h2>
    <motion.div initial={{
      scaleX: 0
    }} animate={inView ? {
      scaleX: 1
    } : {
      scaleX: 0
    }} transition={{
      duration: 0.8,
      delay: 0.2,
      ease: 'circOut'
    }} className={cn('h-[1.5px] w-full mt-6 md:mt-10 origin-left', light ? 'bg-white/10' : 'bg-[#1A1A1A]/10')} />
  </div>;
};

// ─── ServiceAccordionItem ────────────────────────────────────────
const ServiceAccordionItem = ({
  category,
  index,
  dark = false
}: {
  category: ServiceCategoryData;
  index: number;
  dark?: boolean;
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const {
    ref,
    inView
  } = useBidirectionalInView(0.1);
  const cardStyle = SERVICE_CARD_STYLES[index % SERVICE_CARD_STYLES.length];
  const serviceCount = category.services.length;
  return <motion.div ref={ref} initial={{
    opacity: 0,
    y: 30
  }} animate={inView ? {
    opacity: 1,
    y: 0
  } : {
    opacity: 0,
    y: 30
  }} transition={{
    duration: 0.6,
    delay: index * 0.05
  }} className={cn("border-b", dark ? "border-white/10" : "border-[#1A1A1A]/10")}>
    <button onClick={() => setIsOpen(!isOpen)} className="w-full py-5 md:py-10 lg:py-12 flex flex-col sm:flex-row items-start sm:items-center text-left group gap-3 sm:gap-6" style={{
      minHeight: '44px'
    }}>
      <span className="w-10 sm:w-12 shrink-0 text-[#E63329]" style={{
        fontSize: '11px',
        fontWeight: 700,
        letterSpacing: '0.16em'
      }}>
        {(index + 1).toString().padStart(2, '0')}
      </span>
      <div className="flex-1 min-w-0">
        <h3 className="group-hover:text-[#E63329] transition-colors duration-300" style={{
          fontSize: 'clamp(0.95rem, 2.5vw, 1.75rem)',
          fontWeight: 600,
          letterSpacing: '-0.03em',
          lineHeight: 0.95,
          color: dark ? '#ffffff' : undefined
        }}>
          {category.title}
        </h3>
        <p className={cn("mt-2 md:mt-3", dark ? "text-white/60" : "text-[#757575]")} style={{
          fontSize: 'clamp(13px, 2vw, 17px)',
          fontWeight: 400,
          lineHeight: 1.75,
          maxWidth: '36rem'
        }}>
          {category.teaser}
        </p>
      </div>
      <div className="shrink-0 flex items-center gap-3">
        <span style={{
          fontSize: '10px',
          fontWeight: 700,
          letterSpacing: '0.1em',
          color: '#E63329',
          background: 'rgba(230,51,41,0.08)',
          padding: '3px 8px',
          borderRadius: '2px'
        }}>
          {serviceCount} Services
        </span>
        <div className={cn("flex items-center justify-center border rounded-full group-hover:bg-[#E63329] group-hover:border-[#E63329] group-hover:text-white transition-all duration-300", dark ? "border-white/10 text-white" : "border-[#1A1A1A]/10 text-[#1A1A1A]")} style={{
          width: '44px',
          height: '44px',
          flexShrink: 0
        }}>
          {isOpen ? <Minus size={20} /> : <Plus size={20} />}
        </div>
      </div>
    </button>

    <div className="svc-accordion-content" style={{
      maxHeight: isOpen ? '1400px' : '0px',
      opacity: isOpen ? 1 : 0
    }}>
      {/* On mobile: stack vertically. On md+: side by side */}
      <div className={cn("flex flex-col md:flex-row gap-0 pb-8 md:pb-14 border overflow-hidden", dark ? "border-white/10" : "border-[#1A1A1A]/10")} style={{
        borderRadius: '2px'
      }}>
        {/* LEFT ZONE: gradient card — full width mobile (200px tall), md: 35% */}
        <div className="w-full md:w-[35%] flex flex-col items-center justify-center relative overflow-hidden shrink-0" style={{
          minHeight: '200px',
          backgroundImage: `${cardStyle.gradient}, url(${cardStyle.image})`,
          backgroundSize: 'cover, cover',
          backgroundPosition: 'center, center',
          backgroundRepeat: 'no-repeat, no-repeat'
        }}>
          <span style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 'clamp(2rem, 5vw, 4.5rem)',
            fontWeight: 900,
            color: 'rgba(255,255,255,0.15)',
            letterSpacing: '-0.04em',
            lineHeight: 1,
            padding: '24px',
            textAlign: 'center',
            userSelect: 'none',
            pointerEvents: 'none',
            wordBreak: 'break-word'
          }}>
            {category.title.split(' ').slice(0, 2).join(' ')}
          </span>
          {cardStyle.shape === 'triangle' && <div style={{
            width: 0,
            height: 0,
            borderLeft: '18px solid transparent',
            borderRight: '18px solid transparent',
            borderBottom: '32px solid #E63329',
            position: 'relative',
            zIndex: 2,
            flexShrink: 0
          }} />}
          {cardStyle.shape === 'square' && <div style={{
            width: '32px',
            height: '32px',
            background: '#E63329',
            position: 'relative',
            zIndex: 2,
            flexShrink: 0
          }} />}
          {cardStyle.shape === 'slash' && <div style={{
            width: '4px',
            height: '48px',
            background: '#E63329',
            transform: 'rotate(30deg)',
            position: 'relative',
            zIndex: 2,
            flexShrink: 0
          }} />}
        </div>

        {/* CONTENT ZONE */}
        <div className="flex-1 p-5 md:p-8 lg:p-10 flex flex-col" style={{
          background: dark ? '#161616' : '#fafafa',
          borderTop: dark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(26,26,26,0.06)'
        }}>
          <p style={{
            color: dark ? 'rgba(255,255,255,0.7)' : '#444',
            fontSize: 'clamp(13px, 1.4vw, 15px)',
            fontWeight: 400,
            lineHeight: 1.75,
            marginBottom: '16px'
          }}>
            {category.teaser}
          </p>
          <ul className="flex flex-col gap-2 flex-1">
            {category.services.map(svc => <li key={svc} style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
              fontSize: '13px',
              fontWeight: 500,
              lineHeight: 1.45,
              color: dark ? 'rgba(255,255,255,0.85)' : '#333'
            }}>
              <span style={{
                color: '#E63329',
                fontWeight: 700,
                flexShrink: 0,
                marginTop: '1px'
              }}>—</span>
              <span>{svc}</span>
            </li>)}
          </ul>
          <div className="mt-6 flex justify-end">
            <a href="/contact" style={{
              color: '#E63329',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              borderBottom: '1px solid #E63329',
              paddingBottom: '2px',
              textDecoration: 'none',
              transition: 'opacity 0.2s'
            }} onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.opacity = '0.7';
            }} onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.opacity = '1';
            }}>
              Learn More
            </a>
          </div>
        </div>
      </div>
    </div>
  </motion.div>;
};

// ─── Main Component ──────────────────────────────────────────────
export const ExecutiveInfluencePage = () => {
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 768;
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const scrollY = useScrollY();
  const isScrolled = scrollY > 50;
  const {
    ref: heroRef,
    inView: heroInView
  } = useBidirectionalInView(0.1);
  const tickerItems = React.useMemo(() => [...TICKER_ITEMS_BASE, ...TICKER_ITEMS_BASE], []);


  return <div className="relative w-full overflow-x-hidden" style={{
    fontFamily: 'Inter, system-ui, sans-serif'
  }}>
    <style>{GLOBAL_STYLES}</style>
    <div className="grain" />

    <Header />

    {/* ── HERO ─────────────────────────────────────────────────── */}
    <section ref={heroRef} className="relative w-full flex flex-col justify-end items-start bg-[#111111]" style={{
      minHeight: '100vh',
      paddingLeft: 'clamp(20px, 4vw, 64px)',
      paddingRight: 'clamp(20px, 4vw, 64px)',
      paddingBottom: 'clamp(40px, 5vw, 80px)'
    }}>
      <div className="absolute inset-0 z-0">
        <img src="/executive-influence.JPG" alt="Hero Background" className="w-full h-full object-cover opacity-30 grayscale" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-[#111111]/60" />
      </div>

      <div className="relative z-10 w-full max-w-5xl" style={{
        paddingTop: 'clamp(80px, 12vw, 120px)',
        marginTop: 'auto'
      }}>
        <motion.div initial={{
          opacity: 0,
          y: 16
        }} animate={heroInView ? {
          opacity: 1,
          y: 0
        } : {}} transition={{
          duration: 0.6
        }}>
          <Eyebrow light>Strategic Advisory Capability</Eyebrow>
        </motion.div>

        <div className="flex flex-col items-start mb-5 md:mb-7">
          <h1 style={{
            fontSize: 'clamp(36px, 7.5vw, 96px)',
            fontWeight: 600,
            lineHeight: 0.95,
            letterSpacing: '-0.05em',
            margin: 0,
            padding: 0,
            color: '#ffffff',
            textAlign: 'left'
          }}>
            <span className="block">
              {HERO_LINE_1.map((word, wi) => <motion.span key={`l1-${word}`} initial={{
                opacity: 0,
                y: 40
              }} animate={heroInView ? {
                opacity: 1,
                y: 0
              } : {
                opacity: 0,
                y: 40
              }} transition={{
                duration: 0.7,
                delay: wi * 0.08,
                ease: [0.25, 0.46, 0.45, 0.94]
              }} style={{
                display: 'inline-block',
                marginRight: wi < HERO_LINE_1.length - 1 ? '0.22em' : 0
              }}>
                {word}
              </motion.span>)}
            </span>
            <span className="block">
              {HERO_LINE_2.map((word, wi) => <motion.span key={`l2-${word}`} initial={{
                opacity: 0,
                y: 40
              }} animate={heroInView ? {
                opacity: 1,
                y: 0
              } : {
                opacity: 0,
                y: 40
              }} transition={{
                duration: 0.7,
                delay: 0.16 + wi * 0.08,
                ease: [0.25, 0.46, 0.45, 0.94]
              }} style={{
                display: 'inline-block',
                marginRight: wi < HERO_LINE_2.length - 1 ? '0.22em' : 0,
                color: wi === 0 ? 'rgba(255,255,255,0.6)' : '#ffffff'
              }}>
                {word}
              </motion.span>)}
            </span>
            <span className="block">
              {HERO_LINE_3.map((word, wi) => <motion.span key={`l3-${word}`} initial={{
                opacity: 0,
                y: 40
              }} animate={heroInView ? {
                opacity: 1,
                y: 0
              } : {
                opacity: 0,
                y: 40
              }} transition={{
                duration: 0.7,
                delay: 0.32 + wi * 0.08,
                ease: [0.25, 0.46, 0.45, 0.94]
              }} style={{
                display: 'inline-block',
                marginRight: wi < HERO_LINE_3.length - 1 ? '0.22em' : 0,
                color: '#E63329'
              }}>
                {word}
              </motion.span>)}
            </span>
          </h1>
        </div>

        {/* CTA buttons: stack on mobile, row on sm+ */}
        <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={heroInView ? {
          opacity: 1,
          y: 0
        } : {}} transition={{
          duration: 0.8,
          delay: 0.5
        }} className="flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-3 sm:gap-6">
          <a href="/contact" className="cta-primary group">
            <span>Partner With Us</span>
            <div className="cta-icon-container">
              <ArrowUpRight size={14} className="text-[#1E1E1E]" />
            </div>
          </a>
          <a href="#services" className="cta-secondary group">
            <span>Our Advisory Work</span>
          </a>
        </motion.div>

        <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={heroInView ? {
          opacity: 1,
          y: 0
        } : {}} transition={{
          duration: 0.8,
          delay: 0.7
        }} className="flex flex-wrap items-center justify-start gap-2 sm:gap-3" style={{
          marginTop: '1.5rem'
        }}>
          {HERO_TAGS.map(tag => <span key={tag.id} style={{
            border: '1px solid rgba(255,255,255,0.2)',
            paddingLeft: '12px',
            paddingRight: '12px',
            paddingTop: '7px',
            paddingBottom: '7px',
            color: 'rgba(255,255,255,0.7)',
            fontSize: '10px',
            letterSpacing: '0.12em',
            fontWeight: 500,
            textTransform: 'uppercase',
            whiteSpace: 'nowrap'
          }}>
            {tag.label}
          </span>)}
        </motion.div>
      </div>
    </section>

    {/* ── TICKER ───────────────────────────────────────────────── */}
    <div className="overflow-hidden relative z-20" style={{
      background: '#E63329'
    }}>
      <div className="py-3 md:py-5 overflow-hidden">
        <div className="ticker-track">
          {tickerItems.map((item, idx) => <div key={`${item.id}-fwd-${idx}`} className="flex items-center gap-6 md:gap-10 px-6 md:px-10">
            <span className="text-white uppercase whitespace-nowrap" style={{
              fontSize: 'clamp(0.6rem, 1.2vw, 0.95rem)',
              fontWeight: 800,
              letterSpacing: '0.25em'
            }}>
              {item.text}
            </span>
            <div style={{
              width: '6px',
              height: '6px',
              background: 'rgba(255,255,255,0.5)',
              transform: 'rotate(45deg)',
              flexShrink: 0
            }} />
          </div>)}
        </div>
      </div>
    </div>

    {/* ── SERVICES ACCORDION ───────────────────────────────────── */}
    <section id="services" style={{
      background: '#0D0D0D',
      paddingTop: 'clamp(40px, 6vw, 160px)',
      paddingBottom: 'clamp(40px, 6vw, 160px)',
      paddingLeft: 'clamp(20px, 4vw, 64px)',
      paddingRight: 'clamp(20px, 4vw, 64px)',
      borderBottom: '1px solid rgba(255,255,255,0.06)'
    }}>
      <div className="max-w-[1440px] mx-auto">
        <SectionHeader label="Premium Service Offerings" title="Shaping the Voices that Shape the World" light={true} />
        <div className="flex flex-col gap-0">
          {SERVICES.map((category, idx) => <ServiceAccordionItem key={category.id} category={category} index={idx} dark={true} />)}
        </div>
      </div>
    </section>

    {/* ── OUTCOMES ─────────────────────────────────────────────── */}
    <section style={{
      background: '#111111',
      paddingTop: 'clamp(40px, 6vw, 176px)',
      paddingBottom: 'clamp(40px, 6vw, 176px)',
      paddingLeft: 'clamp(20px, 4vw, 64px)',
      paddingRight: 'clamp(20px, 4vw, 64px)',
      borderBottom: '1px solid rgba(255,255,255,0.06)'
    }}>
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-24 gap-6">
          <div>
            <div className="flex items-center gap-4 mb-5 md:mb-6">
              <div style={{
                width: '32px',
                height: '2px',
                background: '#E63329'
              }} />
              <span style={{
                color: 'rgba(255,255,255,0.5)',
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.28em',
                textTransform: 'uppercase'
              }}>
                Delivering Results That Matter
              </span>
            </div>
            <h2 className="uppercase" style={{
              fontSize: 'clamp(1.6rem, 5vw, 4rem)',
              fontWeight: 600,
              letterSpacing: '-0.03em',
              lineHeight: 0.92,
              color: '#ffffff'
            }}>
              Measurable Impact.
              <br />
              Enduring Legacy.
            </h2>
          </div>
          <a href="/contact" style={{
            color: '#E63329',
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            borderBottom: '1px solid #E63329',
            paddingBottom: '2px',
            textDecoration: 'none',
            alignSelf: 'flex-start',
            whiteSpace: 'nowrap'
          }} onMouseEnter={e => {
            (e.currentTarget as HTMLAnchorElement).style.opacity = '0.65';
          }} onMouseLeave={e => {
            (e.currentTarget as HTMLAnchorElement).style.opacity = '1';
          }}>
            View All Outcomes
          </a>
        </div>

        {/* Outcome rows — all single column on mobile, alternating layout on md+ */}
        <div className="flex flex-col">
          {OUTCOMES.map((outcome, idx) => {
            const isOdd = idx % 2 === 0;
            return <div key={outcome.id} className="outcome-row" style={{
              paddingLeft: '12px'
            }}>
              <div className="outcome-row-border" />

              {/* MOBILE: always single-column stacked list */}
              <div className="flex md:hidden flex-row items-start gap-4 py-7" style={{
                borderBottom: '1px solid rgba(255,255,255,0.06)'
              }}>
                <span style={{
                  fontSize: '80px',
                  fontWeight: 900,
                  color: 'rgba(230,51,41,0.08)',
                  letterSpacing: '-0.05em',
                  lineHeight: 0.85,
                  flexShrink: 0,
                  userSelect: 'none',
                  minWidth: '70px'
                }}>
                  {outcome.number}
                </span>
                <div className="flex-1 min-w-0 pt-2">
                  <h3 style={{
                    fontSize: 'clamp(1rem, 4vw, 1.25rem)',
                    fontWeight: 600,
                    letterSpacing: '-0.03em',
                    lineHeight: 1.05,
                    color: '#ffffff',
                    marginBottom: '10px'
                  }}>
                    {outcome.title}
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    fontWeight: 400,
                    lineHeight: 1.75,
                    color: 'rgba(255,255,255,0.6)'
                  }}>
                    {outcome.descriptor}
                  </p>
                  <span style={{
                    display: 'inline-block',
                    marginTop: '10px',
                    background: '#E63329',
                    color: '#ffffff',
                    fontSize: '9px',
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    padding: '4px 10px',
                    borderRadius: '99px'
                  }}>
                    {outcome.category}
                  </span>
                </div>
              </div>

              {/* DESKTOP: alternating editorial layout */}
              {isOdd ? <div className="hidden md:flex flex-row items-start gap-12 py-14" style={{
                borderBottom: '1px solid rgba(255,255,255,0.06)'
              }}>
                <span style={{
                  fontSize: 'clamp(6rem, 12vw, 10rem)',
                  fontWeight: 900,
                  color: 'rgba(230,51,41,0.08)',
                  letterSpacing: '-0.05em',
                  lineHeight: 0.85,
                  flexShrink: 0,
                  userSelect: 'none',
                  minWidth: 'clamp(80px, 14vw, 140px)'
                }}>
                  {outcome.number}
                </span>
                <div className="flex-1 min-w-0">
                  <h3 style={{
                    fontSize: 'clamp(1.2rem, 2.5vw, 1.75rem)',
                    fontWeight: 600,
                    letterSpacing: '-0.03em',
                    lineHeight: 1.05,
                    color: '#ffffff',
                    marginBottom: '14px'
                  }}>
                    {outcome.title}
                  </h3>
                  <p style={{
                    fontSize: '15px',
                    fontWeight: 400,
                    lineHeight: 1.75,
                    color: 'rgba(255,255,255,0.6)'
                  }}>
                    {outcome.descriptor}
                  </p>
                </div>
              </div> : <div className="hidden md:grid grid-cols-2 gap-12 py-14" style={{
                borderBottom: '1px solid rgba(255,255,255,0.06)'
              }}>
                <div className="flex items-start gap-6">
                  <span style={{
                    fontSize: 'clamp(4.5rem, 8vw, 7rem)',
                    fontWeight: 900,
                    color: 'rgba(230,51,41,0.08)',
                    letterSpacing: '-0.05em',
                    lineHeight: 0.85,
                    flexShrink: 0,
                    userSelect: 'none'
                  }}>
                    {outcome.number}
                  </span>
                  <h3 style={{
                    fontSize: 'clamp(1.1rem, 2.2vw, 1.5rem)',
                    fontWeight: 600,
                    letterSpacing: '-0.03em',
                    lineHeight: 1.1,
                    color: '#ffffff',
                    paddingTop: '8px'
                  }}>
                    {outcome.title}
                  </h3>
                </div>
                <div className="flex flex-col justify-between gap-4">
                  <p style={{
                    fontSize: '15px',
                    fontWeight: 400,
                    lineHeight: 1.75,
                    color: 'rgba(255,255,255,0.6)'
                  }}>
                    {outcome.descriptor}
                  </p>
                  <div>
                    <span style={{
                      display: 'inline-block',
                      background: '#E63329',
                      color: '#ffffff',
                      fontSize: '9px',
                      fontWeight: 700,
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      padding: '4px 10px',
                      borderRadius: '99px'
                    }}>
                      {outcome.category}
                    </span>
                  </div>
                </div>
              </div>}
            </div>;
          })}
        </div>

        {/* CTA bottom */}
        <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: false,
          amount: 0.3
        }} transition={{
          duration: 0.7,
          delay: 0.3
        }} className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mt-12 md:mt-20 pt-8 md:pt-12" style={{
          borderTop: '1px solid rgba(255,255,255,0.06)'
        }}>
          <div className="max-w-lg">
            <p style={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: 'clamp(15px, 2vw, 19px)',
              fontWeight: 300,
              lineHeight: 1.65,
              letterSpacing: '-0.01em'
            }}>
              <span style={{
                color: '#ffffff',
                fontWeight: 600
              }}>Every engagement</span>{' '}
              is designed to produce measurable outcomes that strengthen your position, amplify your voice, and compound your influence over time.
            </p>
          </div>
          <a href="#services" className="cta-primary group">
            <span>Explore Advisory Work</span>
            <div className="cta-icon-container">
              <ArrowUpRight size={14} className="text-[#1E1E1E]" />
            </div>
          </a>
        </motion.div>
      </div>
    </section>



    {/* ── ADVISORY STATEMENT ──────────────────────────────────────── */}
    <section style={{
      background: '#111111',
      paddingTop: 'clamp(40px, 6vw, 100px)',
      paddingBottom: 'clamp(40px, 6vw, 100px)'
    }} className="overflow-hidden">
      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row" style={{
        minHeight: '0'
      }}>

        {/* LEFT — full width mobile, 40% desktop */}
        <div className="w-full lg:w-[40%] shrink-0 relative overflow-hidden" style={{
          paddingLeft: 'clamp(20px, 4vw, 64px)',
          paddingRight: 'clamp(20px, 4vw, 64px)',
          paddingTop: 'clamp(32px, 4vw, 0px)',
          paddingBottom: 'clamp(32px, 4vw, 64px)'
        }}>
          {/* glow */}
          <div style={{
            position: 'absolute',
            top: '-80px',
            left: '-60px',
            width: '340px',
            height: '340px',
            background: 'radial-gradient(ellipse at center, rgba(230,51,41,0.18) 0%, rgba(230,51,41,0.04) 55%, transparent 75%)',
            pointerEvents: 'none'
          }} />
          {/* right border line — visible on desktop only */}
          <div className="hidden lg:block" style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            width: '1px',
            background: 'linear-gradient(to bottom, transparent 0%, rgba(230,51,41,0.25) 30%, rgba(230,51,41,0.25) 70%, transparent 100%)',
            pointerEvents: 'none'
          }} />

          {/* Content: vertical label hidden on mobile, inline on mobile */}
          <div className="flex items-start gap-5 md:gap-8">
            {/* Vertical label — hidden on mobile, visible on sm+ */}
            <div className="hidden sm:block" style={{
              writingMode: 'vertical-rl',
              textOrientation: 'mixed',
              transform: 'rotate(180deg)',
              color: 'rgba(255,255,255,0.06)',
              fontSize: 'clamp(2.5rem, 5vw, 5rem)',
              fontWeight: 900,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              userSelect: 'none',
              lineHeight: 1,
              flexShrink: 0
            }}>
              ADVISORY
            </div>
            <div className="flex flex-col justify-start pt-1">
              <Eyebrow light>Advisory</Eyebrow>
              <div style={{
                fontSize: 'clamp(64px, 10vw, 120px)',
                fontWeight: 900,
                color: '#E63329',
                lineHeight: 0.75,
                marginBottom: '20px',
                userSelect: 'none',
                opacity: 0.9
              }}>
                <span>"</span>
              </div>
              <p style={{
                color: '#ffffff',
                fontSize: 'clamp(1.4rem, 3vw, 2.6rem)',
                fontWeight: 900,
                lineHeight: 1.1,
                letterSpacing: '-0.04em',
                maxWidth: '18rem'
              }}>
                We transform expertise into influence, leaders into authorities.
              </p>
            </div>
          </div>

          <div style={{
            width: '48px',
            height: '2px',
            background: '#E63329',
            marginTop: '32px'
          }} />
        </div>

        {/* RIGHT — full width mobile, 60% desktop */}
        <div className="w-full lg:w-[60%] flex flex-col justify-center" style={{
          paddingLeft: 'clamp(20px, 4vw, 64px)',
          paddingRight: 'clamp(20px, 4vw, 64px)',
          paddingTop: 'clamp(32px, 4vw, 0px)',
          paddingBottom: 'clamp(32px, 4vw, 64px)'
        }}>
          <p style={{
            color: 'rgba(255,255,255,0.75)',
            fontSize: '16px',
            fontWeight: 400,
            lineHeight: 1.8,
            marginBottom: '28px'
          }}>
            <span style={{
              color: '#ffffff',
              fontWeight: 600
            }}>EmpowaWorx™</span> partners with executives, organisations, institutions and industry leaders to build influence, strengthen credibility, amplify visibility and establish enduring market authority.
          </p>
          <div style={{
            width: '100%',
            height: '1px',
            background: 'rgba(230,51,41,0.35)',
            marginBottom: '28px'
          }} />
          <p style={{
            color: 'rgba(255,255,255,0.75)',
            fontSize: '16px',
            fontWeight: 400,
            lineHeight: 1.8,
            marginBottom: '28px'
          }}>
            We design and deliver integrated, intelligence-led solutions that transform expertise into thought leadership, leaders into trusted authorities, insights into influence, platforms into opportunities and reputation into strategic advantage.
          </p>
          <div style={{
            width: '100%',
            height: '1px',
            background: 'rgba(230,51,41,0.35)',
            marginBottom: '28px'
          }} />
          <p style={{
            color: 'rgba(255,255,255,0.75)',
            fontSize: '16px',
            fontWeight: 400,
            lineHeight: 1.8,
            marginBottom: '36px'
          }}>
            From strategy to execution, EmpowaWorx™ empowers leaders and organisations to lead markets, inspire audiences, influence decisions and create enduring personal, organisational and societal legacy across the African continent and beyond.
          </p>

          {/* Stat row — 2 cols on mobile, 3 on sm+ */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-0 mb-10" style={{
            borderTop: '1px solid rgba(255,255,255,0.08)',
            paddingTop: '32px'
          }}>
            {ADVISORY_STATS.map((stat, i) => <div key={stat.value} style={{
              borderTop: '2px solid #E63329',
              paddingTop: '16px',
              paddingRight: i < 2 ? 'clamp(0px, 3vw, 32px)' : '0'
            }}>
              <p style={{
                color: '#ffffff',
                fontSize: 'clamp(1.1rem, 2.5vw, 1.75rem)',
                fontWeight: 900,
                letterSpacing: '-0.03em',
                lineHeight: 1,
                marginBottom: '6px'
              }}>
                {stat.value}
              </p>
              <p style={{
                color: 'rgba(255,255,255,0.4)',
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase'
              }}>
                {stat.label}
              </p>
            </div>)}
          </div>

          <div>
            <a href="/contact" className="cta-primary group">
              <span>Engage The Advisory</span>
              <div className="cta-icon-container">
                <ArrowUpRight size={14} className="text-[#1E1E1E]" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>

    {/* ── FACULTY ──────────────────────────────────────────────── */}
    <section style={{
      backgroundColor: '#ffffff',
      paddingTop: 'clamp(40px, 6vw, 128px)',
      paddingBottom: 'clamp(40px, 6vw, 128px)',
      paddingLeft: 'clamp(20px, 4vw, 64px)',
      paddingRight: 'clamp(20px, 4vw, 64px)',
      display: 'none'
    }}>
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 gap-6 md:gap-8">
          <div className="max-w-2xl">
            <Eyebrow>The Faculty</Eyebrow>
            <h2 className="font-semibold uppercase" style={{
              color: '#1A1A1A',
              fontSize: 'clamp(1.6rem, 5vw, 4rem)',
              letterSpacing: '-0.035em',
              lineHeight: 0.92
            }}>
              Strategic Advisors &amp; Lead Experts
            </h2>
          </div>
          <p className="md:text-right md:max-w-sm" style={{
            color: '#757575',
            fontSize: 'clamp(14px, 1.5vw, 17px)',
            fontWeight: 400,
            lineHeight: 1.75
          }}>
            Our team combines data-driven insights with deep-rooted cultural connections across the African continent.
          </p>
        </div>

        {/* Grid: 1 col mobile, 2 col tablet+ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
          {FACULTY_MEMBERS.map(member => <div key={member.id} className="group transition-all" style={{
            border: '1px solid rgba(26,26,26,0.05)'
          }} onMouseEnter={e => {
            (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(230,51,41,0.2)';
          }} onMouseLeave={e => {
            (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(26,26,26,0.05)';
          }}>
            <div className="grid grid-cols-1 sm:grid-cols-5 h-full">
              <div className="sm:col-span-2 overflow-hidden aspect-square">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" />
              </div>
              <div className="sm:col-span-3 p-5 md:p-8 flex flex-col justify-start" style={{
                backgroundColor: '#ffffff'
              }}>
                <h3 className="font-semibold uppercase mb-1" style={{
                  color: '#1A1A1A',
                  fontSize: 'clamp(1.05rem, 2.5vw, 1.75rem)',
                  letterSpacing: '-0.03em',
                  lineHeight: 0.95
                }}>
                  {member.name}
                </h3>
                <p className="pb-4 mb-4 md:mb-5" style={{
                  color: '#E63329',
                  fontSize: '10px',
                  fontWeight: 600,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  borderBottom: '1px solid rgba(230,51,41,0.1)'
                }}>
                  {member.title}
                </p>
                <p style={{
                  color: '#757575',
                  fontSize: '14px',
                  fontWeight: 400,
                  lineHeight: 1.75,
                  fontStyle: 'italic'
                }}>
                  <span>&ldquo;</span><span>{member.description}</span><span>&rdquo;</span>
                </p>
                <div className="mt-5 flex gap-3">
                  <div className="rounded-full flex items-center justify-center transition-all cursor-pointer" style={{
                    width: '36px',
                    height: '36px',
                    background: 'rgba(0,0,0,0.05)',
                    color: '#1A1A1A',
                    minWidth: '36px'
                  }} onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.background = '#E63329';
                    (e.currentTarget as HTMLDivElement).style.color = '#ffffff';
                  }} onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.background = 'rgba(0,0,0,0.05)';
                    (e.currentTarget as HTMLDivElement).style.color = '#1A1A1A';
                  }}>
                    <Linkedin size={14} />
                  </div>
                  <div className="rounded-full flex items-center justify-center transition-all cursor-pointer" style={{
                    width: '36px',
                    height: '36px',
                    background: 'rgba(0,0,0,0.05)',
                    color: '#1A1A1A',
                    minWidth: '36px'
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

    <Footer />
  </div>;
};
