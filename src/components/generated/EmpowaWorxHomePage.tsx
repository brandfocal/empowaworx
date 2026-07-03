import React from 'react';
import { usePageMeta } from '../../hooks/usePageMeta';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Star, Menu, X, Phone, Mail, MapPin, Linkedin, Instagram, Twitter, Plus, Minus, ZoomIn, ExternalLink, Facebook, Youtube, Play } from 'lucide-react';
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
function useBidirectionalInView(threshold = 0.15) {
  const ref = React.useRef<HTMLElement>(null);
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

// ─── Types ───────────────────────────────────────────────
interface NavItem {
  id: string;
  label: string;
  href: string;
}
interface StatItem {
  id: string;
  value: string;
  numericValue: number;
  suffix: string;
  prefix: string;
  label: string;
}
interface CapabilityItem {
  id: string;
  number: string;
  title: string;
  description: string;
}
interface ProcessPhase {
  id: string;
  number: string;
  tag: string;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
}
interface WorkCard {
  id: string;
  client: string;
  category: string;
  year: string;
  description: string;
  accent: string;
  bg: string;
  imageUrl: string;
}
interface PlatformItem {
  id: string;
  number: string;
  name: string;
  description: string;
  imageUrl: string;
  logoImage: string;
  websiteUrl: string;
}
interface CreedCard {
  id: string;
  quote: string;
  source: string;
  initials: string;
}
interface EditorialPhoto {
  id: string;
  url: string;
  alt: string;
  caption: string;
  span?: string;
}
interface TickerItem {
  id: string;
  text: string;
}
interface LegacyHonoree {
  id: string;
  name: string;
  title: string;
  year: string;
  quote: string;
  theme: string;
  tribute: string;
  values: string[];
  imageUrl: string;
}
interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  caption: string;
  span?: string;
}
interface SocialPost {
  id: string;
  imageUrl: string;
  alt: string;
  caption: string;
  platform: string;
  handle: string;
  likes: string;
}

// ─── Data ────────────────────────────────────────────────
const NAV_ITEMS: NavItem[] = [{
  id: 'n1',
  label: 'Home',
  href: '#'
}, {
  id: 'n2',
  label: 'Who We Are',
  href: '#about'
}, {
  id: 'n3',
  label: 'Advisory',
  href: '#advisory'
}, {
  id: 'n4',
  label: 'Platforms',
  href: '#platforms'
}, {
  id: 'n5',
  label: 'Legacy Events',
  href: '#legacy'
}, {
  id: 'n6',
  label: 'Media',
  href: '#gallery'
}, {
  id: 'n7',
  label: 'Careers',
  href: '#'
}];
const HERO_STATS: StatItem[] = [{
  id: 'hs1',
  value: '50,000+',
  numericValue: 50000,
  suffix: '+',
  prefix: '',
  label: 'Women Leaders Engaged'
}, {
  id: 'hs2',
  value: '198,000+',
  numericValue: 198000,
  suffix: '+',
  prefix: '',
  label: 'Youth Mobilised'
}, {
  id: 'hs3',
  value: 'R500M+',
  numericValue: 500,
  suffix: 'M+',
  prefix: 'R',
  label: 'Investment Facilitated'
}, {
  id: 'hs4',
  value: '200+',
  numericValue: 200,
  suffix: '+',
  prefix: '',
  label: 'Years Collective Experience'
}];
const ADVISORY_CAPABILITIES: CapabilityItem[] = [{
  id: 'c1',
  number: '01',
  title: 'Strategic Communications, PR, Reputation & Media',
  description: 'Shaping multi-channel corporate narratives, managing media engagement, and driving strategic PR campaigns to build brand credibility and command market share of voice.'
}, {
  id: 'c2',
  number: '02',
  title: 'Experiential Marketing, Events & Activations Practice',
  description: 'Conceptualising and delivering high-impact corporate activations, brand experiences, and multi-stakeholder forums that drive action, engagement, and emotional alignment.'
}, {
  id: 'c3',
  number: '03',
  title: 'Executive Influence, Thought Leadership & Speaker Bureau',
  description: 'Positioning executives and thought leaders to shape critical industry conversations, publish authoritative insights, and leverage Africa\'s premier speaker bureau to command authority.'
}, {
  id: 'c4',
  number: '04',
  title: 'Influencer Marketing, Creator Economy & Cultural Influence',
  description: 'Uniting trusted creator voices, cultural movements, and organic community networks to craft authentic influencer campaigns that drive consumer engagement and brand trust at scale.'
}, {
  id: 'c5',
  number: '05',
  title: 'Strategic Creative Marketing, Brand & Advertising',
  description: 'Crafting high-impact brand identities, breakthrough creative campaigns, and multi-channel advertising strategies that connect emotionally and drive market conversion.'
}, {
  id: 'c7',
  number: '06',
  title: 'ESG, Impact & Economic Development Advisory',
  description: 'Advising on strategic ESG integration, economic development modeling, sustainability frameworks, and transformation mandates that drive shared value and continental growth.'
}, {
  id: 'c8',
  number: '07',
  title: 'Digital, AI, Content & Performance Marketing',
  description: 'Harnessing predictive AI tools, performance marketing analytics, data-driven content engines, and digital platforms to optimize brand visibility, customer acquisition, and market leadership.'
}];
const PROCESS_PHASES: ProcessPhase[] = [{
  id: 'pp1',
  number: '/001/',
  tag: '/Advisory',
  title: 'We listen and advise first.',
  description: 'This phase sets the foundation for everything that follows — clarifying goals, uncovering opportunities, and identifying potential challenges early on.',
  imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&q=80',
  imageAlt: 'Advisory consultation session with executive'
}, {
  id: 'pp2',
  number: '/002/',
  tag: '/Strategy',
  title: 'We create a comprehensive roadmap.',
  description: 'From positioning and stakeholder mapping to narrative architecture and content strategy, we define how your reputation and influence will grow — and win.',
  imageUrl: 'https://images.unsplash.com/photo-1542626991-cbc4e32524cc?w=600&q=80',
  imageAlt: 'Strategic planning session with whiteboard'
}, {
  id: 'pp3',
  number: '/003/',
  tag: '/Execution',
  title: 'We deliver with precision.',
  description: 'Our advisory and communications teams bring the strategy to life with disciplined execution, powerful storytelling, and coordinated stakeholder engagement.',
  imageUrl: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80',
  imageAlt: 'Professional team executing communications strategy'
}, {
  id: 'pp4',
  number: '/004/',
  tag: '/Impact',
  title: 'We measure real results.',
  description: 'We track and report against clear KPIs — from media coverage and stakeholder sentiment to commercial outcomes, funding secured, and ecosystem growth.',
  imageUrl: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?w=600&q=80',
  imageAlt: 'Data analysis and results measurement'
}, {
  id: 'pp5',
  number: '/005/',
  tag: '/Growth',
  title: 'We build for the long term.',
  description: 'After delivering immediate impact, we shift into a growth mindset — continuously refining strategies, deepening relationships, and scaling influence across Africa.',
  imageUrl: 'https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?w=600&q=80',
  imageAlt: 'Long-term partnership and ecosystem growth'
}];
const IMPACT_WORKS: WorkCard[] = [{
  id: 'w1',
  client: 'EmpowaWomen',
  category: "Women's Leadership Platform",
  year: '2024',
  description: '50,000+ women leaders engaged across Africa through transformative leadership summits, mentorship ecosystems, and entrepreneurship programmes.',
  accent: '#FC3637',
  bg: '#F5F5F5',
  imageUrl: '/DSC_2597.JPG'
}, {
  id: 'w2',
  client: 'EmpowaEntrepreneurs',
  category: 'Enterprise Development',
  year: '2024',
  description: 'R500M+ in funding and investment facilitated for African entrepreneurs through strategic partnerships, investor networks, and funding platforms.',
  accent: '#9B1B30',
  bg: '#EFEFEF',
  imageUrl: '/DSC_0263.JPG'
}, {
  id: 'w3',
  client: 'Legacy Events Series',
  category: 'Leadership Legacy',
  year: '2023',
  description: 'Celebrating African icons and preserving legacies — honouring remarkable leaders who broke barriers and created lasting social and economic impact.',
  accent: '#9B1B30',
  bg: '#F2F2F2',
  imageUrl: '/Honoring-Felicia-Mabuza-Suttle-16.jpg'
}];
const LOGO_URLS = ['https://empowaworx.co.za/wp-content/uploads/2024/12/EmpowaYouthWeek-icon-2.png', 'https://empowaworx.co.za/wp-content/uploads/2024/12/empowaentrepreneurs_logo-2.png', 'https://empowaworx.co.za/wp-content/uploads/2024/11/Empowamen-logo-3.png'];
const BG_URLS = ['https://empowaworx.co.za/wp-content/uploads/2024/12/empowayouth.jpg', 'https://empowaworx.co.za/wp-content/uploads/2023/08/DSC_7029-1.jpg', 'https://empowaworx.co.za/wp-content/uploads/2024/12/343138865_954008469286626_2003909949551333985_n-1.jpg'];

const PLATFORMS: PlatformItem[] = [{
  id: 'pl1',
  number: '01',
  name: 'EmpowaWomen',
  description: "Africa's Leading Women's Leadership, Entrepreneurship & Economic Empowerment Platform",
  imageUrl: '/empowawomen2.JPG',
  logoImage: '/propriety_logos/empowawomen-logo.png',
  websiteUrl: 'https://www.empowawomen.co.za/'
}, {
  id: 'pl2',
  number: '02',
  name: 'EmpowaYouth',
  description: "Africa's Premier Youth Development, Employability & Future Economy Platform",
  imageUrl: '/empowayouth.jpg',
  logoImage: '/propriety_logos/empowayouth-logo-2.png',
  websiteUrl: 'https://empowayouth.co.za/'
}, {
  id: 'pl3',
  number: '03',
  name: 'EmpowaEntrepreneurs',
  description: "Africa's Premier Funding, Enterprise Development & Entrepreneurial Growth Platform",
  imageUrl: '/empowaentrepreneurs.JPG',
  logoImage: '/propriety_logos/ee-logo-wh.png',
  websiteUrl: 'https://www.empowaentrepreneurs.co.za/'
}, {
  id: 'pl4',
  number: '04',
  name: 'EmpowaGrowth',
  description: "Africa's Executive Growth, Leadership & Business Performance Platform",
  imageUrl: '/empowagrowth.jpg',
  logoImage: '/propriety_logos/empowagrowth-logo.png',
  websiteUrl: 'https://www.empowagrowth.co.za/'
}, {
  id: 'pl5',
  number: '05',
  name: 'EmpowaHER',
  description: "Africa's Women's Health, Wellness, Beauty & Lifestyle Platform",
  imageUrl: '/empowawomen.JPG',
  logoImage: '/propriety_logos/empowaher-logo.png',
  websiteUrl: 'https://www.empowawomen.co.za/'
}, {
  id: 'pl6',
  number: '06',
  name: 'EmpowaHIM',
  description: "Africa's Men's Health, Wellness & Lifestyle Platform",
  imageUrl: '/empowaworx-2.jpg',
  logoImage: '/propriety_logos/empowamen_logo_alternate.png',
  websiteUrl: 'https://www.empowamen.co.za/'
}, {
  id: 'pl8',
  number: '07',
  name: 'The Speakers Firm',
  description: "Africa's Premier Speakers Bureau, Thought Leadership & Knowledge Platform",
  imageUrl: '/the-speakers-firm.jpg',
  logoImage: '/propriety_logos/the_speakers_firm_logo.png',
  websiteUrl: 'https://thespeakersfirm.co.za/'
}];
const CREED_CARDS: CreedCard[] = [{
  id: 'cc1',
  quote: 'In an era defined by disruption, declining trust, and heightened public scrutiny, organisations require more than visibility. They require trusted advisors capable of shaping perceptions, protecting reputations, and creating sustainable value.',
  source: 'EmpowaWorx™ Founding Principle',
  initials: 'EW'
}, {
  id: 'cc2',
  quote: "We combine world-class advisory expertise, deep African market intelligence, extensive stakeholder networks, and execution excellence to help organisations build competitive advantage through trust, reputation, influence, and impact.",
  source: 'EmpowaWorx™ Advisory Creed',
  initials: 'EW'
}, {
  id: 'cc3',
  quote: 'Sustainable growth is built through ecosystems, not isolated interventions. Our integrated model unifies strategic advisory, communications, corporate affairs, public affairs, marketing, and economic development into one growth architecture.',
  source: 'EmpowaWorx™ Growth Philosophy',
  initials: 'EW'
}];
const EDITORIAL_PHOTOS = [{
  id: 'ev1',
  youtubeId: 'bjcHrXaccTY',
  alt: "Lincoln Mali - Lesaka Technologies CEO | Author of 'Blazing A Trial' Extended",
  caption: 'Lincoln Mali Executive Dialogue',
  description: "Lincoln Mali, CEO of Lesaka Technologies and author of 'Blazing A Trail', shares insights on leadership, technology, and economic transformation at The Speakers Firm Executive Dialogue.",
  span: 'md:col-span-2 md:row-span-2'
}, {
  id: 'ev2',
  youtubeId: 'TpAM47m8v2E',
  alt: 'EmpowaWomen Experience Video 2024',
  caption: 'EmpowaWomen Experience Video 2024',
  description: "Highlighting the transformative energy, networking, and leadership insights from the 2024 EmpowaWomen experience. Unlocking potential and driving impact across sectors.",
  span: ''
}, {
  id: 'ev3',
  youtubeId: '9GQaaOlowW0',
  alt: "Mteto Nyati - Chairman of Eskom at the 'Blazing A Trail' Book Roundtable",
  caption: 'Mteto Nyati Book Roundtable',
  description: "Mteto Nyati, Chairman of Eskom, discusses critical leadership principles, institutional turnaround, and resilience at the 'Blazing A Trail' Book Roundtable dialogue.",
  span: ''
}, {
  id: 'ev4',
  youtubeId: 'tZ-ick_bEGw',
  alt: 'Experience Reel - Orange Farm EmpowaMen Programme',
  caption: 'Orange Farm EmpowaMen Programme',
  description: "A showcase of key moments, community impact, and empowerment initiatives from the Orange Farm EmpowaMen program, fostering local growth and development.",
  span: ''
}, {
  id: 'ev5',
  youtubeId: 't_D0YtTAjC0',
  alt: 'Ekurhuleni EmpowaYouth - Full Version',
  caption: 'Ekurhuleni EmpowaYouth',
  description: "The complete, inspiring story of the Ekurhuleni EmpowaYouth activation. Connecting thousands of young people with jobs, skills, and entrepreneurial opportunities.",
  span: ''
}, {
  id: 'ev6',
  youtubeId: '2s5CXK-w0AQ',
  alt: 'Prof Bonang Mohale | 4th Annual TUT Future of Work Dialogue',
  caption: 'Prof Bonang Mohale at TUT Dialogue',
  description: "Professor Bonang Mohale addresses key opportunities and challenges in building an inclusive economic future during the 4th Annual TUT Future of Work Dialogue.",
  span: ''
}, {
  id: 'ev7',
  youtubeId: 'dn4DuJtt7mI',
  alt: 'Tebogo Mekgoe - EmpowaGrowth Workshop | Business Model Innovation Through Systemic Alignment',
  caption: 'Tebogo Mekgoe EmpowaGrowth',
  description: "Tebogo Mekgoe leads a powerful masterclass on business model innovation and driving growth through systemic alignment in the organization.",
  span: ''
}, {
  id: 'ev8',
  youtubeId: 'KaDKu8ChKYs',
  alt: "Lincoln Mali - Lesaka Technologies CEO | Author of 'Blazing A Trail'",
  caption: 'Lincoln Mali Dialogue',
  description: "Lincoln Mali, CEO of Lesaka Technologies and author of 'Blazing A Trail', shares insights on leadership, technology, and economic transformation at The Speakers Firm.",
  span: ''
}, {
  id: 'ev9',
  youtubeId: 'UcACoBam75o',
  alt: "Official Experience Reel | 'Blazing a Trail' Exclusive Book Roundtable 2025",
  caption: 'Blazing a Trail Experience Reel',
  description: "Official Experience Reel from the 'Blazing a Trail' Exclusive Book Roundtable. Highlighting the key moments and insights from the event.",
  span: ''
}, {
  id: 'ev10',
  youtubeId: '0ij-23dNHvM',
  alt: "The 2025 Book Roundtable Series - Dr Reuel Khoza | Legacy Beyond Leadership",
  caption: 'Dr Reuel Khoza Roundtable',
  description: "The 2025 Book Roundtable Series featuring Dr Reuel Khoza. A deep dive into legacy beyond leadership and institutional governance.",
  span: ''
}, {
  id: 'ev11',
  youtubeId: 'vCOArqmtLXk',
  alt: "The 2025 Book Roundtable Series - Dr Reuel Khoza | Prof Mervyn King",
  caption: 'Dr Reuel Khoza & Prof Mervyn King Dialogue',
  description: "The 2025 Book Roundtable Series featuring Dr Reuel Khoza and Prof Mervyn King, discussing corporate governance, legacy, and ethical leadership.",
  span: ''
}];
const LEGACY_HONOREES: LegacyHonoree[] = [{
  id: 'lh1',
  name: 'Felicia Mabuza-Suttle',
  title: 'Media Pioneer & Trailblazing Entrepreneur',
  year: '2024 Legacy Award',
  quote: 'Celebrating a Media Pioneer. A Trailblazing Entrepreneur. A Legacy of Impact.',
  theme: 'Celebrating a Media Pioneer. A Trailblazing Entrepreneur. A Legacy of Impact.',
  tribute: "Few individuals have shaped South Africa's media landscape and inspired social transformation as profoundly as Felicia Mabuza-Suttle. As a pioneering broadcaster, entrepreneur, philanthropist, and influential business leader, she broke barriers at a time when opportunities for women — particularly Black women — in mainstream media and business were limited. Through her courage, vision, and determination, she redefined what was possible.",
  values: ['Visionary Leadership', 'Entrepreneurial Excellence', 'Courageous Innovation', 'Media Influence & Impact', 'Social Transformation', "Women's Empowerment", 'Resilience & Perseverance', 'Legacy Building'],
  imageUrl: '/Honoring-Felicia-Mabuza-Suttle/Honoring-Felicia-Mabuza-Suttle.jpg'
}, {
  id: 'lh2',
  name: 'Dr John Kani',
  title: 'Cultural Icon & Freedom Voice',
  year: '2024 Cultural Legacy Award',
  quote: 'Celebrating a Cultural Icon. Honouring a Freedom Voice. Preserving a Legacy of Courage, Creativity and Impact.',
  theme: 'Celebrating a Cultural Icon. Honouring a Freedom Voice. Preserving a Legacy of Courage, Creativity and Impact.',
  tribute: 'Few individuals have used the power of storytelling, culture, and the arts to shape national consciousness and inspire social transformation as profoundly as Dr John Kani. A globally acclaimed playwright, actor, author, director, and activist, Dr John Kani has dedicated his life to using the arts as a powerful instrument for justice, dialogue, reconciliation, and the celebration of African identity.',
  values: ['Cultural Leadership & Excellence', 'Courageous Activism & Social Justice', 'Creative Innovation & Storytelling', 'Nation-Building & Social Cohesion', 'Preservation of African Identity & Heritage', 'Artistic Excellence & Global Recognition'],
  imageUrl: '/Honoring-Dr-John-Kani/Honoring-Dr-John-Kani.jpg'
}, {
  id: 'lh3',
  name: 'Dr Richard Maponya',
  title: 'Business Pioneer & Economic Empowerment Icon',
  year: '2024 Leadership Legacy Award',
  quote: 'Celebrating a Business Pioneer. Honouring a Legacy of Enterprise, Resilience and Economic Empowerment.',
  theme: 'Celebrating a Business Pioneer. Honouring a Legacy of Enterprise, Resilience and Economic Empowerment.',
  tribute: "Few individuals have had a greater impact on Black entrepreneurship, economic participation, and business leadership in South Africa than Dr Richard Maponya. Widely regarded as one of South Africa's most influential entrepreneurs and business pioneers, Dr Maponya built an extraordinary business empire during one of the most challenging periods in the nation's history.",
  values: ['Entrepreneurial Excellence', 'Economic Empowerment & Wealth Creation', 'Visionary Leadership', 'Business Innovation & Enterprise Development', 'Courage, Resilience & Determination', 'Legacy Building Through Enterprise'],
  imageUrl: '/dr-richard-maponya.jpg'
}];
const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: 'gi1',
    url: '/speakers-firm-roundtable/speakers%20firm/speakers%20firm/roundtable/invite3.jpg',
    alt: 'The Speakers Firm - Roundtable Invite',
    caption: 'The Speakers Firm Roundtable Invite'
  },
  {
    id: 'gi2',
    url: '/speakers-firm-roundtable/speakers%20firm/speakers%20firm/roundtable/lincoln.jpg',
    alt: 'The Speakers Firm - Lincoln Mali',
    caption: 'Lincoln Mali Executive Dialogue'
  },
  {
    id: 'gi3',
    url: '/speakers-firm-roundtable/speakers%20firm/speakers%20firm/roundtable/mmamoloko.jpg',
    alt: 'The Speakers Firm - Mmamoloko Kubayi',
    caption: 'Minister Mmamoloko Kubayi Roundtable'
  },
  {
    id: 'gi4',
    url: '/speakers-firm-roundtable/speakers%20firm/speakers%20firm/roundtable/mohale.jpg',
    alt: 'The Speakers Firm - Prof Bonang Mohale',
    caption: 'Prof Bonang Mohale Executive Roundtable'
  },
  {
    id: 'gi9',
    url: '/speakers-firm-roundtable/speakers%20firm/speakers%20firm/roundtable/mzamo.jpg',
    alt: 'The Speakers Firm - Mzamo Masito',
    caption: 'Mzamo Masito Roundtable'
  },
  {
    id: 'gi10',
    url: '/speakers-firm-roundtable/speakers%20firm/speakers%20firm/roundtable/nozipho2.jpg',
    alt: 'The Speakers Firm - Nozipho Tshabalala',
    caption: 'Nozipho Tshabalala Roundtable'
  },
  {
    id: 'gi11',
    url: '/speakers-firm-roundtable/speakers%20firm/speakers%20firm/roundtable/reuel2.jpg',
    alt: 'The Speakers Firm - Dr Reuel Khoza',
    caption: 'Dr Reuel Khoza Roundtable Dialogue'
  },
  {
    id: 'gi12',
    url: '/speakers-firm-roundtable/speakers%20firm/speakers%20firm/roundtable/siphiwe%20invite.jpg',
    alt: 'The Speakers Firm - Siphiwe Moyo',
    caption: 'Siphiwe Moyo Book Launch'
  },
  {
    id: 'gi13',
    url: '/speakers-firm-roundtable/speakers%20firm/speakers%20firm/roundtable/thebe.jpg',
    alt: 'The Speakers Firm - Thebe Ikalafeng',
    caption: 'Thebe Ikalafeng Executive Dialogue'
  },
  {
    id: 'gi14',
    url: '/speakers-firm-roundtable/speakers%20firm/speakers%20firm/roundtable/tinyiko.jpg',
    alt: 'The Speakers Firm - Tinyiko Ngwenya',
    caption: 'Tinyiko Ngwenya Roundtable'
  }
];
const TICKER_ITEMS: TickerItem[] = [{
  id: 't1',
  text: 'Trust'
}, {
  id: 't2',
  text: 'Reputation'
}, {
  id: 't3',
  text: 'Influence'
}, {
  id: 't4',
  text: 'Impact'
}, {
  id: 't5',
  text: 'Growth'
}, {
  id: 't6',
  text: 'Advisory'
}, {
  id: 't7',
  text: 'Africa'
}, {
  id: 't8',
  text: 'Leadership'
}, {
  id: 't9',
  text: 'Strategy'
}, {
  id: 't10',
  text: 'Ecosystems'
}];
const SOCIAL_POSTS: SocialPost[] = [{
  id: 'sp1',
  imageUrl: 'https://images.unsplash.com/photo-1573164713347-df18e5b07e35?w=600&q=80',
  alt: 'EmpowaWomen Summit Cape Town 2024',
  caption: 'Over 5,000 women leaders gathered in Cape Town for the EmpowaWomen Summit. The energy was electric. #EmpowaWomen #AfricanLeadership',
  platform: 'Instagram',
  handle: '@empowaworx',
  likes: '2.4K'
}, {
  id: 'sp2',
  imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80',
  alt: 'Annual Impact Forum Johannesburg',
  caption: 'A historic moment at the Annual Impact Forum, Johannesburg. Conversations that move the needle. #ImpactAfrica',
  platform: 'Instagram',
  handle: '@empowaworx',
  likes: '1.8K'
}, {
  id: 'sp3',
  imageUrl: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&q=80',
  alt: 'Pan-African Leaders Assembly',
  caption: 'Africa speaks with one voice. The Pan-African Leaders Assembly united 40 nations. #PanAfrica #Leadership',
  platform: 'Instagram',
  handle: '@empowaworx',
  likes: '3.1K'
}, {
  id: 'sp4',
  imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80',
  alt: 'Board Advisory Forum session',
  caption: 'Senior advisors. Senior conversations. The EmpowaWorx™ Board Advisory Forum — shaping the future of African enterprise.',
  platform: 'LinkedIn',
  handle: 'EmpowaWorx™',
  likes: '892'
}, {
  id: 'sp5',
  imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80',
  alt: 'EmpowaYouth Summit Nairobi',
  caption: '198,000 young Africans mobilised. The EmpowaYouth Summit in Nairobi proved the continent\'s next generation is ready. #EmpowaYouth',
  platform: 'Instagram',
  handle: '@empowaworx',
  likes: '4.2K'
}, {
  id: 'sp6',
  imageUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&q=80',
  alt: 'The Speakers Firm forum keynote',
  caption: 'Africa\'s most powerful voices on one stage. The Speakers Firm Forum brought together Africa\'s leading thought leaders. #SpeakersFirm',
  platform: 'Instagram',
  handle: '@empowaworx',
  likes: '1.5K'
}];
const FOOTER_NAV_LINKS = [{
  id: 'f1',
  label: 'Home',
  href: '#'
}, {
  id: 'f2',
  label: 'Who We Are',
  href: '#about'
}, {
  id: 'f3',
  label: 'Advisory',
  href: '#advisory'
}, {
  id: 'f4',
  label: 'Platforms',
  href: '#platforms'
}, {
  id: 'f5',
  label: 'Legacy Events',
  href: '#legacy'
}, {
  id: 'f6',
  label: 'Media',
  href: '#gallery'
}, {
  id: 'f7',
  label: 'Careers',
  href: '#'
}];
const OFFICE_CITIES: string[] = [];
const HERO_LINE_1 = ['Build', 'Trust', '/'];
const HERO_LINE_2 = ['Shape', 'Africa.'];

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

// ─── SCROLL TRANSITION EASING ───────────────────────────────────────
const EASE = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];
const EASE_SMOOTH = [0.21, 0.47, 0.32, 0.98] as [number, number, number, number];



// ─── Sub-components ──────────────────────────────────────
const RatingStars = () => <div className="flex gap-0.5">
  {[0, 1, 2, 3, 4].map(i => <Star key={i} size={10} className={cn('fill-[#C9963A] text-[#C9963A]', i === 4 && 'opacity-40')} />)}
</div>;
const RedCrossIcon = () => <svg viewBox="0 0 31 31" className="w-[22px] h-[22px] mt-2 shrink-0 brand-pulse" aria-hidden="true">
  <path d="M 12.119 31 L 12.119 0 L 18.881 0 L 18.881 31 Z M 0 18.881 L 0 12.056 L 31 12.056 L 31 18.881 Z" fill="rgb(252,54,55)" />
</svg>;
const ArrowMaskIcon = () => <div className="w-[21px] h-[21px] bg-[#FC3637] shrink-0 arrow-hover-slide" style={{
  maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M 0 10 L 10 0' fill='transparent' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' stroke='black' transform='translate(7 7)'/%3E%3Cpath d='M 0 0 L 10 0 L 10 10' fill='transparent' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' stroke='black' transform='translate(7 7)'/%3E%3C/svg%3E")`,
  WebkitMaskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M 0 10 L 10 0' fill='transparent' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' stroke='black' transform='translate(7 7)'/%3E%3Cpath d='M 0 0 L 10 0 L 10 10' fill='transparent' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' stroke='black' transform='translate(7 7)'/%3E%3C/svg%3E")`,
  maskRepeat: 'no-repeat',
  WebkitMaskRepeat: 'no-repeat',
  maskPosition: '50% 50%',
  WebkitMaskPosition: '50% 50%'
}} />;

const StatCell = ({
  stat,
  isLast,
  staggerIdx
}: {
  stat: StatItem;
  isLast: boolean;
  staggerIdx: number;
}) => {
  const {
    ref,
    count,
    done
  } = useBidirectionalCountUp(stat.numericValue, 1500);
  const displayCount = React.useMemo(() => {
    if (stat.numericValue >= 1000) return count.toLocaleString();
    return count.toString();
  }, [count, stat.numericValue]);
  return <div ref={ref} className={cn('flex flex-col gap-2 pl-4 border-l-2 border-[#FC3637]', !isLast && 'md:border-r md:border-r-[#1E1E1E]/8')} style={{
    opacity: count > 0 || done ? 1 : 0,
    transform: count > 0 || done ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity 0.5s ${EASE_SMOOTH} ${staggerIdx * 80}ms, transform 0.5s ${EASE_SMOOTH} ${staggerIdx * 80}ms`
  }}>
    <span className="text-4xl md:text-5xl font-semibold text-[#1E1E1E] tracking-[-0.04em] leading-none tabular-nums">
      {stat.prefix}{displayCount}{done ? stat.suffix : ''}
    </span>
    <span className="text-[#9B1B30]/60 font-medium" style={{
      fontFamily: "'Playfair Display', serif",
      fontStyle: 'italic',
      letterSpacing: '0.02em',
      fontSize: '13px'
    }}>
      {stat.label}
    </span>
  </div>;
};
const CAPABILITY_HASHES: Record<string, string> = {
  c1: '/advisory-comms',
  c2: '/advisory-brand',
  c3: '/advisory-influence',
  c4: '/advisory-influencer',
  c5: '/advisory-marketing',
  c7: '/advisory-esg',
  c8: '/advisory-digital',
};

const CapabilityRow = ({
  cap,
  idx,
  isOpen,
  onToggle
}: {
  cap: CapabilityItem;
  idx: number;
  isOpen: boolean;
  onToggle: () => void;
}) => {
  const isEven = idx % 2 === 1;
  return <motion.div initial={{
    opacity: 0,
    y: 12
  }} whileInView={{
    opacity: 1,
    y: 0
  }} viewport={{
    once: false,
    amount: 0.15
  }} transition={{
    duration: 0.6,
    delay: idx * 0.04,
    ease: EASE_SMOOTH
  }} className={cn('capability-row-accent group border-b border-[#1E1E1E]/8 -mx-4 px-4', isEven ? 'bg-[#9B1B30]/[0.04]' : 'bg-white', isOpen && 'capability-row-open')}>
    <button onClick={onToggle} className="w-full flex items-center gap-8 py-7 md:py-9 text-left cursor-pointer" aria-expanded={isOpen}>
      <span className="text-[11px] font-bold text-[#9B1B30]/40 tracking-widest w-8 shrink-0">{cap.number}</span>
      <h3 className={cn('flex-1 text-xl md:text-2xl font-semibold tracking-[-0.03em] leading-none transition-colors', isOpen ? 'text-[#FC3637]' : 'text-[#1E1E1E] group-hover:text-[#FC3637]')}>
        {cap.title}
      </h3>
      <div className={cn('hidden md:flex w-8 h-8 items-center justify-center border transition-all shrink-0', isOpen ? 'border-[#FC3637] bg-[#FC3637]' : 'border-[#1E1E1E]/10 group-hover:border-[#FC3637] group-hover:bg-[#FC3637]')}>
        {isOpen ? <Minus size={13} className="text-white" /> : <Plus size={13} className="text-[#1E1E1E]/40 group-hover:text-white transition-colors" />}
      </div>
    </button>
    <AnimatePresence initial={false}>
      {isOpen && <motion.div key="content" initial={{
        height: 0,
        opacity: 0
      }} animate={{
        height: 'auto',
        opacity: 1
      }} exit={{
        height: 0,
        opacity: 0
      }} transition={{
        duration: 0.38,
        ease: EASE_SMOOTH
      }} style={{
        overflow: 'hidden'
      }}>
        <div className="pl-16 pb-8 flex flex-col gap-4 items-start">
          <p className="text-[15px] text-[#1E1E1E]/60 leading-relaxed font-medium max-w-[560px]">{cap.description}</p>
          <a href={CAPABILITY_HASHES[cap.id] || '#'} className="group inline-flex items-center gap-1.5 text-[12px] font-bold text-[#FC3637] uppercase tracking-wider hover:opacity-85 transition-opacity">
            <span>Explore Capability</span>
            <ArrowUpRight size={12} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </motion.div>}
    </AnimatePresence>
  </motion.div>;
};
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
const HeroHeadline = ({
  reducedMotion,
  inView
}: {
  reducedMotion: boolean;
  inView: boolean;
}) => {
  const line1Count = HERO_LINE_1.length;
  if (reducedMotion) {
    return <div className="flex flex-col">
      <h1 className="text-[clamp(56px,10vw,143px)] font-semibold text-white leading-[0.95] tracking-[-0.06em] whitespace-nowrap">
        {HERO_LINE_1.join(' ')}
      </h1>
      <h1 className="text-[clamp(56px,10vw,143px)] font-semibold text-white leading-[0.95] tracking-[-0.06em] whitespace-nowrap">
        {HERO_LINE_2.join(' ')}
      </h1>
    </div>;
  }
  return <div className="flex flex-col">
    <h1 className="text-[clamp(56px,10vw,143px)] font-semibold text-white leading-[0.95] tracking-[-0.06em] whitespace-nowrap flex gap-[0.18em]">
      {HERO_LINE_1.map((word, i) => <span key={`l1-${i}`} style={{
        display: 'inline-block',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.7s cubic-bezier(0.25,0.46,0.45,0.94) ${i * 80}ms, transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94) ${i * 80}ms`
      }}>
        {word}
      </span>)}
    </h1>
    <h1 className="text-[clamp(56px,10vw,143px)] font-semibold text-white leading-[0.95] tracking-[-0.06em] whitespace-nowrap flex gap-[0.18em]">
      {HERO_LINE_2.map((word, i) => {
        const globalIdx = line1Count + i;
        const isAccent = word === 'Africa.';
        return <span key={`l2-${i}`} style={{
          display: 'inline-block',
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(40px)',
          transition: `opacity 0.7s cubic-bezier(0.25,0.46,0.45,0.94) ${globalIdx * 80}ms, transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94) ${globalIdx * 80}ms`
        }}>
          {isAccent ? <span style={{
            color: '#FC3637'
          }}>{word}</span> : word}
        </span>;
      })}
    </h1>
  </div>;
};

const PlatformCard: React.FC<{ platform: PlatformItem; idx: number }> = ({ platform, idx }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  return <a href={platform.websiteUrl} target="_blank" rel="noopener noreferrer" style={{
    minHeight: 'clamp(280px, 22vw, 340px)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '32px 24px 28px 24px',
    position: 'relative'
  }} className="relative overflow-hidden cursor-pointer w-full group" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
    {/* Crimson accent bar */}
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '3px',
      backgroundColor: '#FC3637',
      zIndex: 10
    }} />

    {/* Full-bleed background */}
    <div style={{
      backgroundImage: `url(${platform.imageUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      transform: isHovered ? 'scale(1.08)' : 'scale(1)',
      transition: 'transform 700ms ease-out, filter 700ms ease-out',
      filter: isHovered ? 'grayscale(0) brightness(0.82)' : 'grayscale(1) brightness(0.6)',
      position: 'absolute',
      inset: 0,
      zIndex: 0
    }} />

    {/* Dark overlay */}
    <div style={{
      backgroundColor: isHovered ? 'rgba(0,0,0,0.85)' : 'rgba(0,0,0,0.72)',
      transition: 'background-color 300ms ease',
      position: 'absolute',
      inset: 0,
      zIndex: 1
    }} />

    {/* Red gradient overlay */}
    <div aria-hidden="true" style={{
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(ellipse at 100% 100%, rgba(252,54,55,0.15) 0%, transparent 55%)',
      pointerEvents: 'none',
      zIndex: 1
    }} />

    {/* Top Indicator */}
    <div style={{
      position: 'absolute',
      top: '32px',
      zIndex: 2,
      fontSize: '10px',
      fontWeight: 800,
      color: 'rgba(255,255,255,0.4)',
      letterSpacing: '0.2em',
      textTransform: 'uppercase'
    }}>
      Platform {platform.number || `0${idx + 1}`}
    </div>

    {/* Centered logo container */}
    <div style={{
      zIndex: 2,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      maxHeight: '80px',
      margin: 'auto'
    }}>
      <img src={platform.logoImage} alt={platform.name} style={{
        maxWidth: '65%',
        maxHeight: '100%',
        objectFit: 'contain',
        filter: 'brightness(0) invert(1)',
        transform: isHovered ? 'scale(1.03)' : 'scale(1)',
        transition: 'transform 300ms ease'
      }} />
    </div>

    {/* Premium Underlined CTA consistent with Legacy Events */}
    <div style={{
      position: 'absolute',
      bottom: '28px',
      zIndex: 2,
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      color: '#FC3637',
      borderBottom: isHovered ? '1.5px solid #FC3637' : '1.5px solid rgba(252, 54, 55, 0.4)',
      paddingBottom: '2px',
      fontSize: '12px',
      fontWeight: 600,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      transition: 'border-color 300ms ease',
      cursor: 'pointer'
    }}>
      <span>Visit Website</span>
      <ArrowUpRight size={14} style={{
        transform: isHovered ? 'translate(2px, -2px)' : 'none',
        transition: 'transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1)'
      }} />
    </div>
  </a>;
};

// ─── Main Component ───────────────────────────────────────
export const EmpowaWorxHomePage = () => {
  usePageMeta({
    title: "EmpowaWorx - Growth, Reputation & Impact Advisory Firm",
    description: "Africa's leading growth, reputation, influence, and impact advisory firm. Partnering with top brands to drive sustainable socio-economic growth across Africa."
  });
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [heroInView, setHeroInView] = React.useState(false);
  const [openCapability, setOpenCapability] = React.useState<string | null>(null);
  const [lightboxImage, setLightboxImage] = React.useState<GalleryImage | null>(null);
  const [playingVideoId, setPlayingVideoId] = React.useState<string | null>(null);
  const [bannerIndex, setBannerIndex] = React.useState(0);
  const banners = React.useMemo(() => [
    {
      src: '/empowawomen-desktop.jpg',
      url: 'https://www.quicket.co.za/events/344315-empowawomen-leadership-summit-2026/#/',
      alt: 'EmpowaWomen Leadership Summit',
      caption: 'EmpowaWomen™ Leadership Summit'
    },
    {
      src: '/empowamen-banner.jpg',
      url: 'https://www.quicket.co.za/events/370734-empowamen-2026/',
      alt: 'EmpowaMen Showcase',
      caption: 'EmpowaMen™ Showcase'
    }
  ], []);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [banners.length]);

  const reducedMotion = usePrefersReducedMotion();
  const scrollY = useScrollDirection();

  const width = useWindowWidth();
  const colsCount = width >= 1024 ? 3 : width >= 768 ? 2 : 1;

  const galleryColumns = React.useMemo(() => {
    const cols: GalleryImage[][] = Array.from({ length: colsCount }, () => []);
    GALLERY_IMAGES.forEach((item, index) => {
      cols[index % colsCount].push(item);
    });
    return cols;
  }, [colsCount]);
  React.useEffect(() => {
    const t = setTimeout(() => setHeroInView(true), 300);
    return () => clearTimeout(t);
  }, []);
  React.useEffect(() => {
    setIsScrolled(scrollY > 60);
  }, [scrollY]);
  React.useEffect(() => {
    if (lightboxImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightboxImage]);
  const handleCapabilityToggle = (id: string) => {
    setOpenCapability(prev => prev === id ? null : id);
  };

  // Bidirectional section hooks
  const {
    ref: statsRef,
    inView: statsInView
  } = useBidirectionalInView(0.15);
  const {
    ref: aboutRef,
    inView: aboutInView
  } = useBidirectionalInView(0.08);
  const {
    ref: aboutHeadingRef,
    inView: aboutHeadingInView
  } = useBidirectionalInView(0.2);
  const {
    ref: aboutBodyRef,
    inView: aboutBodyInView
  } = useBidirectionalInView(0.2);
  const {
    ref: aboutImgRef,
    inView: aboutImgInView
  } = useBidirectionalInView(0.15);
  const {
    ref: capRef,
    inView: capInView
  } = useBidirectionalInView(0.08);
  const {
    ref: processRef,
    inView: processInView
  } = useBidirectionalInView(0.08);
  const {
    ref: impactRef,
    inView: impactInView
  } = useBidirectionalInView(0.08);
  const {
    ref: platformsRef,
    inView: platformsInView
  } = useBidirectionalInView(0.08);
  const {
    ref: creedRef,
    inView: creedInView
  } = useBidirectionalInView(0.08);
  const {
    ref: legacyRef,
    inView: legacyInView
  } = useBidirectionalInView(0.06);
  const {
    ref: editorialRef,
    inView: editorialInView
  } = useBidirectionalInView(0.08);
  const {
    ref: galleryRef,
    inView: galleryInView
  } = useBidirectionalInView(0.06);
  const {
    ref: socialRef,
    inView: socialInView
  } = useBidirectionalInView(0.06);
  const {
    ref: footerRef,
    inView: footerInView
  } = useBidirectionalInView(0.06);
  const {
    ref: footerColsRef,
    inView: footerColsInView
  } = useBidirectionalInView(0.1);
  const {
    ref: heroSubRef,
    inView: heroSubInView
  } = useBidirectionalInView(0.3);
  const S = (inView: boolean, delay: number = 0, duration: number = 0.6) => ({
    opacity: inView || reducedMotion ? 1 : 0,
    transform: inView || reducedMotion ? 'none' : 'translateY(30px)',
    transition: `opacity ${duration}s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}ms, transform ${duration}s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}ms`
  }) as React.CSSProperties;
  const SX = (inView: boolean, x: number, delay: number = 0) => ({
    opacity: inView || reducedMotion ? 1 : 0,
    transform: inView || reducedMotion ? 'none' : `translateX(${x}px)`,
    transition: `opacity 0.7s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}ms, transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}ms`
  }) as React.CSSProperties;
  const SCALE = (inView: boolean, delay: number = 0) => ({
    opacity: inView || reducedMotion ? 1 : 0,
    transform: inView || reducedMotion ? 'scale(1)' : 'scale(1.05)',
    transition: `opacity 0.7s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}ms, transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}ms`
  }) as React.CSSProperties;

  // Parallax offset for hero background image (40% of scroll speed)
  const heroParallaxY = reducedMotion ? 0 : scrollY * 0.4;
  return <div className="w-full bg-white font-sans relative selection:bg-[#FC3637] selection:text-white overflow-x-clip">


    {/* ── GRAIN TEXTURE OVERLAY ─── */}
    <div aria-hidden="true" style={{
      position: 'fixed',
      inset: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 9999,
      opacity: 0.04,
      backgroundImage: `url("'/empowaworx-7.jpg' width='200' height='200'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
      backgroundRepeat: 'repeat',
      backgroundSize: '200px 200px'
    }} />

    {/* ── LIGHTBOX ─── */}
    <AnimatePresence>
      {lightboxImage && <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} transition={{
        duration: 0.25
      }} className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8" style={{
        background: 'rgba(0,0,0,0.92)'
      }} onClick={() => setLightboxImage(null)}>
        <motion.div initial={{
          scale: 0.92,
          opacity: 0
        }} animate={{
          scale: 1,
          opacity: 1
        }} exit={{
          scale: 0.92,
          opacity: 0
        }} transition={{
          duration: 0.3,
          ease: EASE_SMOOTH
        }} className="relative max-w-5xl w-full" onClick={e => e.stopPropagation()}>
          <img src={lightboxImage.url.replace('w=800', 'w=1600')} alt={lightboxImage.alt} className="w-full object-cover block" style={{
            maxHeight: '82vh',
            objectFit: 'contain',
            display: 'block'
          }} />
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '1.5rem',
            background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)'
          }}>
            <p className="text-[12px] font-semibold text-white/75 uppercase tracking-[0.14em]">{lightboxImage.caption}</p>
          </div>
          <button onClick={() => setLightboxImage(null)} className="absolute top-4 right-4 w-10 h-10 bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors" aria-label="Close lightbox">
            <X size={18} className="text-white" />
          </button>
        </motion.div>
      </motion.div>}
    </AnimatePresence>

    {/* ── NAVIGATION ─── */}
    <Header />

    {/* ── HERO SECTION — full-bleed background image with parallax ─── */}
    <section style={{
      position: 'relative',
      width: '100%',
      minHeight: '100vh',
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
        <img src="/DSC_9644.JPG" alt="Nelson Mandela Bridge, Johannesburg" style={{
          width: '100%',
          height: '140%',
          objectFit: 'cover',
          objectPosition: 'bottom',
          display: 'block',
          filter: 'grayscale(1) brightness(0.55)',
          transform: `translateY(${heroParallaxY}px)`,
          willChange: 'transform'
        }} />
      </div>
      {/* Dark gradient overlay — top-to-bottom and left-to-right for legibility */}
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
      {/* Subtle crimson vignette */}
      <div aria-hidden="true" style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 100% 100%, rgba(252,54,55,0.15) 0%, transparent 55%)',
        pointerEvents: 'none'
      }} />

      <div className="relative w-full px-6 md:px-24 pt-36 md:pt-48 pb-16 md:pb-24" style={{
        zIndex: 10
      }}>
        {/* Hero subtext */}
        <div ref={heroSubRef as React.RefObject<HTMLDivElement>} className="max-w-[500px] mb-10" style={S(heroSubInView, 150, 0.7)}>
          <p className="text-lg md:text-xl font-medium text-white/70 leading-tight tracking-tight">
            <span>Africa's leading growth, reputation, influence &amp; impact advisory firm. 100% Black-owned. 200+ years collective experience.</span>
          </p>
        </div>

        <div className="flex flex-col gap-12 md:gap-16">
          <div>
            <HeroHeadline reducedMotion={reducedMotion} inView={heroInView} />
          </div>

          <div className="flex flex-wrap items-center gap-10 md:gap-14">
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
            }} className="flex flex-wrap items-center gap-6 md:gap-9">
              <a href="#contact" className="cta-primary group">
                <span>Partner With Us</span>
                <div className="cta-icon-container">
                  <ArrowUpRight size={14} className="text-[#1E1E1E]" />
                </div>
              </a>
              <a href="#advisory" className="cta-secondary group">
                <span>Explore Services</span>
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
              <div className="flex flex-col text-[13px] font-medium leading-tight">
                <span className="text-white">50,000+ women leaders engaged</span>
                <span className="text-white/40">across Africa through our platforms.</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

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
        <p className="text-white/50 font-medium text-[12px] uppercase tracking-[0.18em]">Pan-African Advisory</p>
        <p className="text-[#FC3637] font-bold text-[11px] uppercase tracking-[0.18em] hidden md:block">100% Black-Owned</p>
      </div>
    </section>

    {/* ── TICKER STRIP ─── */}
    <TickerStrip />

    {/* ── STATS BAR ─── */}
    <section ref={statsRef as React.RefObject<HTMLElement>} className="w-full border-b border-[#1E1E1E]/8 px-6 md:px-24 py-12 grid grid-cols-2 md:grid-cols-4 gap-8" style={S(statsInView, 0, 0.6)}>
      {HERO_STATS.map((stat, idx) => <StatCell key={stat.id} stat={stat} isLast={idx === HERO_STATS.length - 1} staggerIdx={idx} />)}
    </section>

    {/* ── ABOUT SECTION — clean editorial two-column, no image, teal accent ─── */}
    <section id="about" ref={aboutRef as React.RefObject<HTMLElement>} className="w-full" style={{
      background: '#FFFFFF',
      position: 'relative'
    }}>
      {/* Teal decorative top rule */}
      <div style={{
        width: '100%',
        height: '3px',
        background: '#0D5C63',
        opacity: 0.18
      }} />

      <div className="px-6 md:px-24 py-[120px] md:py-[160px]" style={{
        position: 'relative'
      }}>
        <div aria-hidden="true" style={{
          position: 'absolute',
          right: '-4%',
          top: '5%',
          width: '40%',
          maxWidth: '480px',
          height: 'auto',
          pointerEvents: 'none',
          zIndex: 0
        }}>
          <AfricaWatermark fill="#0D5C63" opacity={0.03} />
        </div>

        <div className="max-w-[1600px] mx-auto" style={{
          position: 'relative',
          zIndex: 1
        }}>
          {/* Top eyebrow */}
          <div className="mb-16 md:mb-20" style={S(aboutInView, 0, 0.6)}>
            <span className="text-[11px] font-bold uppercase tracking-[0.25em]" style={{
              color: '#0D5C63'
            }}>Who We Are</span>
          </div>

          {/* Two-column editorial layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 md:gap-x-12 lg:gap-x-16 gap-y-12 items-start">
            {/* Left column — large bold all-caps section heading */}
            <div className="md:col-span-5 lg:col-span-4" ref={aboutHeadingRef as React.RefObject<HTMLDivElement>} style={SX(aboutHeadingInView, -60)}>
              <h2 className="text-[clamp(32px,4.5vw,72px)] font-bold text-[#1E1E1E] leading-[0.88] tracking-[-0.05em] uppercase">
                200+<br />Years.<br />One<br />Purpose.
              </h2>
              {/* Teal horizontal rule below heading */}
              <div style={{
                width: '48px',
                height: '3px',
                background: '#0D5C63',
                marginTop: '2rem'
              }} />
            </div>

            {/* Right column — body copy */}
            <div className="md:col-span-7 lg:col-span-8 flex flex-col gap-10 pt-2 md:pt-4" ref={aboutBodyRef as React.RefObject<HTMLDivElement>} style={SX(aboutBodyInView, 60, 120)}>
              {/* Left border accent in teal */}
              <div className="flex gap-6">
                <div className="w-[2px] shrink-0 mt-1 self-stretch" style={{
                  background: '#0D5C63',
                  minHeight: '100%',
                  opacity: 0.55
                }} />
                <h3 className="text-[clamp(22px,3vw,32px)] font-medium text-[#1E1E1E] leading-[1.15] tracking-[-0.04em]">
                  Africa's integrated growth partner helping organisations navigate complexity, build trusted brands, strengthen reputations, and deliver measurable impact.
                </h3>
              </div>

              <p className="text-[17px] font-medium text-[#1E1E1E]/45 leading-[1.6] tracking-[-0.01em] max-w-[560px]">
                With more than 200 years of collective leadership experience, we partner with governments, multinationals, DFIs, state-owned entities, and purpose-driven organisations across the African continent.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-8 py-8 border-t border-b border-[#1E1E1E]/8">
                {[{
                  value: '50,000+',
                  label: 'Women Engaged'
                }, {
                  value: 'R500M+',
                  label: 'Investment Facilitated'
                }, {
                  value: '198,000+',
                  label: 'Youth Mobilised'
                }].map(item => <div key={item.label} className="flex flex-col gap-1.5">
                  <span className="text-3xl font-bold text-[#1E1E1E] tracking-[-0.05em] leading-none">{item.value}</span>
                  <span className="text-[12px] font-medium uppercase tracking-[0.12em]" style={{
                    color: '#0D5C63'
                  }}>{item.label}</span>
                </div>)}
              </div>

              <div className="flex items-center gap-6">
                <a href="#about" className="cta-secondary cta-secondary-dark-border group">
                  <span>Who We Are</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Large image below — converted to a scrolling banner (Full Width) */}
      <div ref={aboutImgRef as React.RefObject<HTMLDivElement>} style={{
        position: 'relative',
        width: '100%',
        ...SCALE(aboutImgInView, 0)
      }}>
        <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '2.8 / 1', background: '#000000', width: '100%' }}>
          <AnimatePresence>
            <motion.a
              key={bannerIndex}
              href={banners[bannerIndex].url}
              target="_blank"
              rel="noopener noreferrer"
              className="block absolute inset-0 w-full h-full flex items-center justify-center"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', ease: [0.21, 0.47, 0.32, 0.98], duration: 0.85 }}
            >
              <img src={banners[bannerIndex].src} alt={banners[bannerIndex].alt} className="w-full h-full object-cover object-center" />
            </motion.a>
          </AnimatePresence>

          {/* Navigation Indicators */}
          <div style={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '8px',
            zIndex: 10
          }}>
            {banners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setBannerIndex(idx)}
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: bannerIndex === idx ? '#FC3637' : 'rgba(255, 255, 255, 0.4)',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'background 0.3s'
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="px-6 md:px-24 pb-[120px] md:pb-[160px]" style={{
        position: 'relative'
      }}>
        <div className="max-w-[1600px] mx-auto" style={{
          position: 'relative',
          zIndex: 1
        }}>
          <p className="text-[9px] tracking-widest uppercase text-neutral-400 mt-2">
            {banners[bannerIndex].caption}
          </p>
          {/* Bottom stat accent row */}
          <div className="mt-16 flex items-start gap-0" style={S(aboutImgInView, 200, 0.6)}>
            <span className="font-bold text-[#1E1E1E] leading-none" style={{
              fontSize: 'clamp(64px, 8vw, 108px)',
              letterSpacing: '-0.06em'
            }}>
              /200+
            </span>
            <RedCrossIcon />
          </div>
          <p className="text-[14px] font-medium text-[#1E1E1E]/40 leading-[1.5] mt-3 max-w-[220px]" style={S(aboutImgInView, 240, 0.6)}>
            Years of collective leadership and industry experience across Africa.
          </p>
        </div>
      </div>
    </section>

    {/* ── CAPABILITIES SECTION ─── */}
    <section id="advisory" ref={capRef as React.RefObject<HTMLElement>} className="w-full px-6 md:px-24 py-24 md:py-32" style={{
      position: 'relative',
      ...S(capInView, 0, 0.7)
    }}>
      <div aria-hidden="true" style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        zIndex: 0,
        pointerEvents: 'none'
      }}>
        <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=2000&q=60" alt="" style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          display: 'block',
          filter: 'saturate(0) brightness(0.94)',
          opacity: 0.06
        }} />
      </div>

      <div style={{
        position: 'relative',
        zIndex: 1
      }}>
        <motion.div initial={{
          opacity: 0,
          y: 16
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: false,
          amount: 0.2
        }} transition={{
          duration: 0.9,
          ease: EASE
        }} className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="flex flex-col gap-3">
            <span className="text-[11px] font-bold text-[#FC3637] uppercase tracking-[0.2em]">Our Capabilities</span>
            <h2 className="text-4xl md:text-6xl font-semibold text-[#1E1E1E] leading-[1] tracking-[-0.04em]">
              Nine Capabilities.<br />One Growth Architecture.
            </h2>
          </div>
          <p className="max-w-sm text-[15px] text-[#1E1E1E]/40 leading-relaxed font-medium">
            We partner with organisations to build trust, reputation, influence, and impact across Africa.
          </p>
        </motion.div>

        <motion.div initial={{
          opacity: 0,
          y: 12
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: false,
          amount: 0.15
        }} transition={{
          duration: 0.8,
          ease: EASE_SMOOTH
        }} className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-0 overflow-hidden">
          <div className="md:col-span-2 flex flex-col">
            <div className="img-zoom-wrap" style={{
              position: 'relative',
              boxShadow: '0 8px 32px rgba(0,0,0,0.18)'
            }}>
              <img src="/empowaworx-18.jpg" alt="EmpowaWorx team collaborating in a strategic capabilities advisory workshop" className="w-full object-cover block" style={{
                aspectRatio: '16/9',
                filter: 'saturate(0.75)',
                display: 'block'
              }} />
              <div aria-hidden="true" style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(0,0,0,0.20)',
                pointerEvents: 'none'
              }} />
              <div aria-hidden="true" style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(255,38,38,0.10)',
                mixBlendMode: 'multiply',
                pointerEvents: 'none'
              }} />
              <div aria-hidden="true" style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, rgba(30,20,10,0.12) 0%, rgba(0,0,0,0.32) 100%)',
                pointerEvents: 'none'
              }} />
              <div aria-hidden="true" style={{
                position: 'absolute',
                inset: '12px',
                border: '1px solid rgba(201,150,58,0.30)',
                pointerEvents: 'none'
              }} />
            </div>
            <p className="text-[9px] tracking-widest uppercase text-neutral-400 mt-2 px-1">EmpowaWorx™ Growth & Transformation Advisory, 2026</p>
          </div>
          <div className="md:col-span-1 bg-[#1E1E1E] flex flex-col justify-between p-10 md:p-12">
            <div className="flex flex-col gap-5">
              <span className="text-[11px] font-bold text-[#FC3637] uppercase tracking-[0.2em]">Advisory Excellence</span>
              <p className="text-[clamp(22px,2.2vw,28px)] font-semibold text-white leading-[1.15] tracking-[-0.04em]">World-class counsel. African intelligence.</p>
              <p className="text-[14px] text-white/45 leading-relaxed font-medium">Every engagement is led by senior advisors with direct executive access, deep sector knowledge, and a track record of delivering impact at scale.</p>
            </div>
            <div className="flex items-center gap-4 mt-10 pt-8 border-t border-white/10">
              <div className="w-10 h-10 bg-[#FC3637] flex items-center justify-center shrink-0">
                <span className="text-[12px] font-bold text-white">EW</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[13px] font-semibold text-white leading-none">EmpowaWorx™</span>
                <span className="text-[12px] text-white/40 font-medium leading-none mt-0.5">Advisory Division</span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col border-t border-[#1E1E1E]/8">
          {ADVISORY_CAPABILITIES.map((cap, idx) => <CapabilityRow key={cap.id} cap={cap} idx={idx} isOpen={openCapability === cap.id} onToggle={() => handleCapabilityToggle(cap.id)} />)}
        </div>
      </div>
    </section>

    {/* ── PROCESS SECTION — DARK ─── */}
    <section ref={processRef as React.RefObject<HTMLElement>} className="w-full px-6 md:px-20 py-24 md:py-[140px] bg-[#111111] border-t border-white/5" style={S(processInView, 0, 0.7)}>
      <div className="max-w-[1600px] mx-auto flex flex-col gap-[90px]">
        <div className="flex flex-col gap-[50px]">
          <motion.p initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: false,
            amount: 0.4
          }} transition={{
            duration: 0.6,
            ease: EASE
          }} className="text-[15px] font-medium text-[#FC3637] tracking-[-0.01em] leading-[21px]">
            <span>/The Approach/</span>
          </motion.p>
          <motion.h2 initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: false,
            amount: 0.2
          }} transition={{
            duration: 0.9,
            ease: EASE
          }} className="text-[clamp(48px,7vw,86px)] font-semibold text-white leading-[0.9] tracking-[-0.05em] max-w-[950px]">
            <span>How we guide every partnership to /lasting impact.</span>
          </motion.h2>
        </div>

        <div className="flex flex-col md:flex-row gap-0">
          <div className="hidden md:flex flex-1 items-start pb-[180px]">
            <div className="sticky top-[100px] flex flex-col gap-[38px] max-w-[380px]">
              <svg viewBox="0 0 50 43" width="50" height="43" aria-hidden="true" className="shrink-0">
                <path d="M 0 43 L 0 22.36 C 0 9.677 7.453 2.581 22.36 0 L 25 4.721 C 17.38 6.288 13.226 10.108 12.527 16.129 L 20.43 16.129 L 20.43 43 Z M 24.57 43 L 24.57 22.36 C 24.57 9.677 32.022 2.581 46.929 0 L 49.57 4.721 C 41.95 6.288 37.796 10.108 37.097 16.129 L 45 16.129 L 45 43 Z" fill="rgba(255,255,255,0.15)" />
              </svg>
              <p className="text-[24px] font-medium text-white/80 leading-[1.2] tracking-[-0.04em]" style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: 'italic'
              }}>
                <span>Each phase is handled by specialist advisors who work together seamlessly, ensuring measurable outcomes.</span>
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#FC3637] flex items-center justify-center shrink-0">
                  <span className="text-[14px] font-bold text-white">EW</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[15px] font-semibold text-white tracking-[-0.01em] leading-[18px]">/EmpowaWorx™</span>
                  <span className="text-[13px] font-medium text-white/40 leading-[16.8px]">Pan-African Advisory Firm</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col">
            {PROCESS_PHASES.map((phase, idx) => <motion.div key={phase.id} initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: false,
              amount: 0.2
            }} transition={{
              duration: 0.7,
              delay: idx * 0.06,
              ease: EASE
            }} className="relative flex flex-col gap-[28px] pl-[60px] pb-[80px] last:pb-[140px]">
              <span className="absolute left-0 top-0 text-[11px] font-semibold text-white/40 tracking-[-0.01em] leading-[14.4px] whitespace-nowrap">{phase.number}</span>
              <div className="absolute top-0 w-[10px] h-[10px] bg-[#FC3637] z-10 brand-pulse" style={{
                left: '-4px'
              }} />
              <div className="absolute top-0 bottom-0 w-[2px] bg-white/10" style={{
                left: '0px'
              }} />
              <div className="flex flex-col gap-[23px]">
                <div className="inline-flex items-center bg-[#FC3637] rounded-full px-2 py-1 self-start">
                  <span className="text-[11px] font-semibold text-white tracking-[-0.01em] leading-[13.2px] whitespace-nowrap">{phase.tag}</span>
                </div>
                <p className="text-[24px] font-medium text-white leading-[1.2] tracking-[-0.04em] max-w-[312px]">{phase.title}</p>
              </div>
              <p className="text-[15px] font-medium text-white/40 leading-[21px] tracking-[-0.01em] max-w-[415px]">{phase.description}</p>
              <div className="img-zoom-wrap" style={{
                position: 'relative',
                width: '260px',
                height: '220px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.35)'
              }}>
                <img src={phase.imageUrl} alt={phase.imageAlt} className="w-full h-full object-cover block" style={{
                  display: 'block',
                  filter: 'saturate(0.5) brightness(0.78)'
                }} />
                <div aria-hidden="true" style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(255,38,38,0.12)',
                  mixBlendMode: 'multiply',
                  pointerEvents: 'none'
                }} />
                <div aria-hidden="true" style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to bottom right, rgba(30,15,5,0.15) 0%, rgba(0,0,0,0.42) 100%)',
                  pointerEvents: 'none'
                }} />
                <div aria-hidden="true" style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '40%',
                  background: 'linear-gradient(to top, rgba(252,54,55,0.25) 0%, transparent 100%)',
                  pointerEvents: 'none'
                }} />
              </div>
            </motion.div>)}
          </div>
        </div>

        <div className="flex md:hidden flex-col gap-[38px]">
          <svg viewBox="0 0 50 43" width="50" height="43" aria-hidden="true" className="shrink-0">
            <path d="M 0 43 L 0 22.36 C 0 9.677 7.453 2.581 22.36 0 L 25 4.721 C 17.38 6.288 13.226 10.108 12.527 16.129 L 20.43 16.129 L 20.43 43 Z M 24.57 43 L 24.57 22.36 C 24.57 9.677 32.022 2.581 46.929 0 L 49.57 4.721 C 41.95 6.288 37.796 10.108 37.097 16.129 L 45 16.129 L 45 43 Z" fill="rgba(255,255,255,0.15)" />
          </svg>
          <p className="text-[22px] font-medium text-white/80 leading-[1.2] tracking-[-0.04em]" style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: 'italic'
          }}>
            <span>Each phase is handled by specialist advisors who work together seamlessly, ensuring measurable outcomes.</span>
          </p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#FC3637] flex items-center justify-center shrink-0">
              <span className="text-[14px] font-bold text-white">EW</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[15px] font-semibold text-white leading-[18px]">/EmpowaWorx™</span>
              <span className="text-[13px] font-medium text-white/40 leading-[16.8px]">Pan-African Advisory Firm</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ── IMPACT SECTION ─── */}
    <section ref={impactRef as React.RefObject<HTMLElement>} className="w-full px-6 md:px-24 py-24 md:py-32 bg-[#F8F8F8]" style={S(impactInView, 0, 0.7)}>
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
        duration: 0.9,
        ease: EASE
      }} className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div className="flex flex-col gap-3">
          <span className="text-[11px] font-bold text-[#FC3637] uppercase tracking-[0.2em]">Our Impact</span>
          <h2 className="text-4xl md:text-6xl font-semibold text-[#1E1E1E] leading-[1] tracking-[-0.04em]">
            Measurable Impact<br />Across Africa.
          </h2>
        </div>
        <a href="#gallery" className="group inline-flex items-center gap-2 text-[14px] font-semibold text-[#1E1E1E] border-b border-[#1E1E1E]/20 pb-0.5 hover:border-[#FC3637] hover:text-[#FC3637] transition-colors self-end">
          <span>View all impact stories</span>
          <ArrowUpRight size={14} className="arrow-hover-slide" />
        </a>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#1E1E1E]/8">
        {IMPACT_WORKS.map((work, idx) => <motion.article key={work.id} initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: false,
          amount: 0.15
        }} transition={{
          duration: 0.6,
          delay: idx * 0.1,
          ease: EASE
        }} className="bg-white flex flex-col" style={{
          transitionProperty: 'background-color, transform, box-shadow',
          boxShadow: '0 8px 32px rgba(0,0,0,0.06)'
        }}>
          <div className="img-zoom-wrap" style={{
            position: 'relative',
            overflow: 'hidden'
          }}>
            <img src={work.imageUrl} alt={work.client} style={{
              width: '100%',
              aspectRatio: '16/9',
              objectFit: 'cover',
              display: 'block',
              filter: 'saturate(0.7) brightness(0.78)'
            }} />
            <div aria-hidden="true" style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(252,54,55,0.12)',
              mixBlendMode: 'multiply',
              pointerEvents: 'none'
            }} />
            <div aria-hidden="true" style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%)',
              pointerEvents: 'none'
            }} />
            <div style={{
              position: 'absolute',
              bottom: '1rem',
              left: '1rem',
              zIndex: 10
            }}>
              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/70">{work.category}</span>
            </div>
          </div>
          <div className="flex flex-col p-8 md:p-10 gap-6 flex-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#1E1E1E]/35">{work.category}</span>
              <span className="text-[11px] font-medium text-[#1E1E1E]/25">{work.year}</span>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-3xl md:text-4xl font-semibold text-[#1E1E1E] tracking-[-0.04em] leading-none">{work.client}</h3>
              <p className="text-[14px] text-[#1E1E1E]/40 leading-relaxed font-medium">{work.description}</p>
            </div>
          </div>
        </motion.article>)}
      </div>
    </section>

    {/* ── PLATFORMS SECTION ─── */}
    <section id="platforms" ref={platformsRef as React.RefObject<HTMLElement>} className="w-full bg-white">
      {/* Section heading — standard padding, white background */}
      <div className="px-6 md:px-24 pt-24 md:pt-32 pb-16 md:pb-20" style={S(platformsInView, 0, 0.7)}>
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
          duration: 0.9,
          ease: EASE
        }} className="flex flex-col gap-6 max-w-[1600px] mx-auto">
          <div className="flex flex-col gap-3">
            <span className="text-[11px] font-bold text-[#FC3637] uppercase tracking-[0.2em]">Our Platforms</span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-semibold text-[#1E1E1E] leading-[0.92] tracking-[-0.05em]">
              Proprietary platforms
            </h2>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mt-2">
            <p className="max-w-[720px] text-[16px] md:text-[18px] font-medium text-[#1E1E1E]/45 leading-[1.6] tracking-[-0.01em]">
              At EmpowaWorx™, we believe that sustainable growth is built through ecosystems, not isolated interventions. Our proprietary platforms provide organisations with direct access to influential decision-makers, policymakers, investors, entrepreneurs, executives, professionals, media leaders, emerging talent, and communities shaping Africa's future.
            </p>
            <a href="#platforms" className="group inline-flex items-center gap-2 text-[14px] font-semibold text-[#1E1E1E] border-b border-[#1E1E1E]/20 pb-0.5 hover:border-[#FC3637] hover:text-[#FC3637] transition-colors self-end shrink-0">
              <span>Explore all platforms</span>
              <ArrowUpRight size={14} className="arrow-hover-slide" />
            </a>
          </div>
        </motion.div>
      </div>
      <style>
        {`
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .marquee-container:hover .marquee-track {
              animation-play-state: paused;
            }
          `}
      </style>
      <div className="marquee-container w-full overflow-hidden border-t border-[#1E1E1E]/8">
        <div
          className="marquee-track flex"
          style={{
            width: 'max-content',
            animation: 'marquee 40s linear infinite'
          }}
        >
          {[...PLATFORMS, ...PLATFORMS].map((platform, idx) => (
            <div key={`${platform.id}-${idx}`} style={{ width: 'clamp(280px, 22vw, 340px)', flexShrink: 0 }}>
              <PlatformCard platform={platform} idx={idx} />
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ── CREED / VALUES SECTION ─── */}
    <section ref={creedRef as React.RefObject<HTMLElement>} className="w-full px-6 md:px-24 py-24 md:py-32 bg-[#1E1E1E]" style={S(creedInView, 0, 0.7)}>
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
        duration: 0.9,
        ease: EASE
      }} className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div className="flex flex-col gap-3">
          <span className="text-[11px] font-bold text-[#FC3637] uppercase tracking-[0.2em]">Our Creed</span>
          <h2 className="text-4xl md:text-6xl font-semibold text-white leading-[1] tracking-[-0.04em]">What We Believe.</h2>
        </div>
        <p className="max-w-xs text-[15px] text-white/40 leading-relaxed font-medium self-end">
          The principles that guide every advisory engagement and client relationship.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/8">
        {CREED_CARDS.map((card, idx) => <motion.div key={card.id} initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: false,
          amount: 0.2
        }} transition={{
          duration: 0.6,
          delay: idx * 0.1,
          ease: EASE
        }} className="flex flex-col gap-8 bg-[#272727] p-8 md:p-10 card-lift">
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4].map(si => <Star key={si} size={12} className="fill-[#FC3637] text-[#FC3637]" />)}
          </div>
          <p className="text-[18px] font-medium text-white/85 leading-[1.55] flex-1" style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: 'italic'
          }}>
            <span>"{card.quote}"</span>
          </p>
          <div className="flex items-center gap-4 pt-2 border-t border-white/10">
            <div className="w-10 h-10 bg-[#9B1B30] flex items-center justify-center shrink-0">
              <span className="text-[12px] font-bold text-white tracking-tight">{card.initials}</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[14px] font-semibold text-white tracking-[-0.01em] leading-none">EmpowaWorx™</span>
              <span className="text-[12px] font-medium text-white/40 leading-none mt-1">{card.source}</span>
            </div>
          </div>
        </motion.div>)}
      </div>
    </section>

    {/* ── LEGACY EVENTS SECTION ─── */}
    <section id="legacy" ref={legacyRef as React.RefObject<HTMLElement>} className="w-full bg-[#0A0A0A]" style={S(legacyInView, 0, 0.7)}>
      <div className="px-6 md:px-24 pt-24 md:pt-32 pb-16">
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
          duration: 0.9,
          ease: EASE
        }} className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="flex flex-col gap-3">
            <span className="text-[11px] font-bold text-[#FC3637] uppercase tracking-[0.2em]">Legacy Events Series</span>
            <h2 className="text-4xl md:text-6xl font-semibold text-white leading-[1] tracking-[-0.04em]">
              Honouring Africa's<br />Greatest Icons.
            </h2>
          </div>
          <p className="max-w-sm text-[15px] text-white/40 leading-relaxed font-medium">
            Celebrating the legacies of extraordinary African leaders who shaped history and inspired generations.
          </p>
        </motion.div>
      </div>

      <div className="flex flex-col">
        {LEGACY_HONOREES.map((honoree, idx) => {
          const xDir = idx % 2 === 0 ? -100 : 100;
          return <motion.div key={honoree.id} initial={{
            opacity: 0,
            x: xDir
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: false,
            amount: 0.2
          }} transition={{
            duration: 0.85,
            delay: idx * 0.08,
            ease: EASE
          }} className="legacy-card group" style={{
            position: 'relative',
            overflow: 'hidden',
            minHeight: 'clamp(320px, 42vw, 520px)',
            display: 'flex',
            alignItems: 'flex-end',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            cursor: 'default'
          }}>
            <div style={{
              position: 'absolute',
              inset: 0,
              overflow: 'hidden'
            }}>
              <img src={honoree.imageUrl} alt={honoree.name} className="legacy-img w-full h-full object-cover block" style={{
                display: 'block',
                objectPosition: honoree.id === 'lh3' ? 'center 55%' : 'center',
                filter: honoree.id === 'lh3' ? 'grayscale(1)' : undefined
              }} />
              <div className="legacy-overlay" aria-hidden="true" style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to right, rgba(5,3,3,0.85) 0%, rgba(5,3,3,0.4) 60%, transparent 100%)',
                pointerEvents: 'none'
              }} />
              <div aria-hidden="true" style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(ellipse at 100% 100%, rgba(252,54,55,0.15) 0%, transparent 55%)',
                pointerEvents: 'none'
              }} />
            </div>

            <motion.div initial={{
              opacity: 0,
              y: 30
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: false,
              amount: 0.25
            }} transition={{
              duration: 0.7,
              delay: idx * 0.08 + 0.2,
              ease: EASE
            }} className="relative px-6 md:px-24 py-8 md:py-12 w-full md:w-3/4 lg:w-[58%]" style={{
              zIndex: 10
            }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-[3px] h-8 bg-[#FC3637]" />
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-bold text-[#FC3637] uppercase tracking-[0.25em]">{honoree.year}</span>
                  <span className="text-[13px] font-semibold text-white/50 tracking-[-0.01em]">{honoree.title}</span>
                </div>
              </div>
              <h3 className="text-3xl md:text-5xl font-bold text-white leading-[0.92] tracking-[-0.04em] mb-5" style={{
                textShadow: '0 2px 24px rgba(0,0,0,0.4)'
              }}>{honoree.name}</h3>
              <a href={honoree.id === 'lh1' ? '/legacy#felicia' : honoree.id === 'lh2' ? '/legacy#kani' : '/legacy#maponya'} className="inline-flex items-center gap-2 border-b border-[#FC3637]/40 pb-0.5 group-hover:border-[#FC3637] transition-colors cursor-pointer">
                <span className="text-[12px] font-semibold text-[#FC3637] uppercase tracking-[0.14em]">Read Legacy</span>
                <ArrowUpRight size={13} className="text-[#FC3637] arrow-hover-slide" />
              </a>
            </motion.div>

            <div aria-hidden="true" style={{
              position: 'absolute',
              right: '3vw',
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: 'clamp(80px, 14vw, 200px)',
              fontWeight: 900,
              letterSpacing: '-0.08em',
              lineHeight: 1,
              color: 'transparent',
              WebkitTextStroke: '1px rgba(255,255,255,0.06)',
              userSelect: 'none',
              pointerEvents: 'none'
            }}>
              {String(idx + 1).padStart(2, '0')}
            </div>
          </motion.div>;
        })}
      </div>

      <div className="px-6 md:px-24 py-12 border-t border-white/8 flex items-center justify-between">
        <span className="text-[12px] font-bold text-white/30 uppercase tracking-[0.2em]">Legacy Events Series · 2023 — 2026</span>
      </div>
    </section>

    {/* ── EDITORIAL PHOTO GRID ─── */}
    <section ref={editorialRef as React.RefObject<HTMLElement>} className="w-full bg-[#F2F2F2] py-24 md:py-32 px-6 md:px-24" style={S(editorialInView, 0, 0.7)}>
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
        duration: 0.9,
        ease: EASE
      }} className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div className="flex flex-col gap-2">
          <span className="text-[11px] font-bold text-[#FC3637] uppercase tracking-[0.2em]">In the Field</span>
          <h2 className="text-3xl md:text-5xl font-semibold text-[#1E1E1E] tracking-[-0.04em] leading-[1]">Advisory at work.</h2>
        </div>
        <p className="max-w-xs text-[14px] text-[#1E1E1E]/40 font-medium leading-relaxed">
          Real moments from summits, boardrooms, and strategic sessions across the continent.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-3" style={{
        gridAutoRows: '280px'
      }}>
        {EDITORIAL_PHOTOS.map((video, idx) => {
          const isPlaying = playingVideoId === video.id;
          const thumbnailUrl = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
          return (
            <motion.figure key={video.id} initial={{
              opacity: 0,
              y: 14
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: false,
              amount: 0.15
            }} transition={{
              duration: 0.65,
              delay: idx * 0.08,
              ease: EASE
            }} className={cn('editorial-figure overflow-hidden cursor-pointer group', video.span || '')} style={{
              position: 'relative',
              boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
              background: '#000'
            }} onClick={() => !isPlaying && setPlayingVideoId(video.id)}>
              {isPlaying ? (
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&mute=1`}
                  title={video.alt}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  style={{
                    width: '100%',
                    height: '100%',
                    border: 'none'
                  }}
                />
              ) : (
                <>
                  <img src={thumbnailUrl} alt={video.alt} className="editorial-img w-full h-full object-cover block transition-transform duration-500 group-hover:scale-105" style={{
                    filter: 'saturate(0.7) brightness(0.82)',
                    display: 'block'
                  }} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 group-hover:bg-black/85 transition-colors duration-300 p-4 text-center">
                    <div className="w-14 h-14 rounded-full bg-[#FC3637] flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 transition-all duration-300 mb-1">
                      <Play size={20} className="fill-white translate-x-0.5" />
                    </div>
                    {video.description && (
                      <p className="text-white text-[11px] leading-relaxed max-w-[95%] opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-2 font-medium">
                        {video.description}
                      </p>
                    )}
                  </div>
                  <div aria-hidden="true" style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(252,54,55,0.06)',
                    mixBlendMode: 'multiply',
                    pointerEvents: 'none'
                  }} />
                  <div aria-hidden="true" style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(10,5,5,0.62) 0%, transparent 55%)',
                    pointerEvents: 'none'
                  }} />
                  <figcaption style={{
                    position: 'absolute',
                    bottom: '1rem',
                    left: '1rem',
                    zIndex: 10
                  }}>
                    <span className="text-[12px] font-semibold text-white/80 uppercase tracking-[0.12em]">{video.caption}</span>
                  </figcaption>
                </>
              )}
            </motion.figure>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, ease: EASE_SMOOTH }}
        style={{
          marginTop: '5rem',
          padding: '3rem 2.5rem',
          background: 'linear-gradient(135deg, #0D0D0D 0%, #1A1A1A 100%)',
          borderRadius: '8px',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '2rem'
        }}
        className="md:flex-row md:items-center md:justify-between md:gap-12 group/callout"
      >
        {/* Blended background image */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url("/slider-img-3-bw.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.18,
          mixBlendMode: 'luminosity',
          pointerEvents: 'none',
          zIndex: 1
        }} />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, rgba(13,13,13,0.95) 0%, rgba(13,13,13,0.45) 50%, rgba(26,26,26,0.95) 100%)',
          pointerEvents: 'none',
          zIndex: 1
        }} />

        {/* Subtle decorative glowing background blur */}
        <div style={{
          position: 'absolute',
          top: '-50%',
          right: '-10%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(252,54,55,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 1
        }} />

        {/* Left red accent line */}
        <div style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: '4px',
          backgroundColor: '#FC3637',
          zIndex: 2
        }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '800px', zIndex: 2, position: 'relative' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '11px',
            fontWeight: 800,
            color: '#FC3637',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: '4px'
          }}>
            <span>Collaborate for Impact</span>
            <span style={{ width: '12px', height: '1px', backgroundColor: '#FC3637' }} />
          </div>

          <h4 style={{
            color: '#FFFFFF',
            fontSize: 'clamp(24px, 3.5vw, 36px)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            margin: 0
          }}>
            Partner. <span style={{ color: '#FC3637' }}>Influence.</span> Grow. <span style={{ color: '#FC3637' }}>Impact.</span>
          </h4>

          <p style={{
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: 'clamp(14px, 1.6vw, 16px)',
            lineHeight: 1.6,
            fontWeight: 400,
            margin: 0,
            marginTop: '4px'
          }}>
            Partner with <strong style={{ color: '#FFFFFF', fontWeight: 600 }}>EmpowaWorx</strong> to unlock growth, reputation, stakeholder trust and measurable impact across Africa.
          </p>
        </div>

        <a
          href="/contact"
          style={{
            zIndex: 2,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            backgroundColor: '#FC3637',
            color: '#FFFFFF',
            padding: '16px 36px',
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'all 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            textDecoration: 'none',
            flexShrink: 0,
            boxShadow: '0 4px 14px rgba(252, 54, 55, 0.2)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#FFFFFF';
            e.currentTarget.style.color = '#0D0D0D';
            e.currentTarget.style.boxShadow = '0 12px 24px rgba(255, 255, 255, 0.15)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#FC3637';
            e.currentTarget.style.color = '#FFFFFF';
            e.currentTarget.style.boxShadow = '0 4px 14px rgba(252, 54, 55, 0.2)';
            e.currentTarget.style.transform = 'none';
          }}
        >
          <span>Become a Partner</span>
          <ArrowUpRight size={15} />
        </a>
      </motion.div>
    </section>

    {/* ── GALLERY / MEDIA SECTION ─── */}
    <section id="gallery" ref={galleryRef as React.RefObject<HTMLElement>} className="w-full bg-white py-24 md:py-32 px-6 md:px-24" style={S(galleryInView, 0, 0.7)}>
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
        duration: 0.9,
        ease: EASE
      }} className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div className="flex flex-col gap-2">
          <span className="text-[11px] font-bold text-[#FC3637] uppercase tracking-[0.2em]">Media Gallery</span>
          <h2 className="text-3xl md:text-5xl font-semibold text-[#1E1E1E] tracking-[-0.04em] leading-[1]">Moments That Matter.</h2>
        </div>
        <p className="max-w-xs text-[14px] text-[#1E1E1E]/40 font-medium leading-relaxed">
          A visual record of Africa's most powerful leadership gatherings. Click any image to expand.
        </p>
      </motion.div>

      <div
        className="grid gap-4"
        style={{
          gridTemplateColumns: `repeat(${colsCount}, 1fr)`
        }}
      >
        {galleryColumns.map((col, colIdx) => (
          <div key={colIdx} className="flex flex-col gap-4">
            <AnimatePresence mode="popLayout">
              {col.map((image) => (
                <motion.div
                  layout
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.92, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: 15 }}
                  transition={{
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  onClick={() => setLightboxImage(image)}
                  className="gallery-item group cursor-pointer relative overflow-hidden bg-black/40 border border-white/5 rounded-[2px]"
                  style={{
                    display: 'block',
                    width: '100%',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.12)'
                  }}
                >
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="gallery-img w-full h-auto object-contain block transition-transform duration-700"
                  />
                  <div className="gallery-crimson" aria-hidden="true" style={{
                    position: 'absolute',
                    inset: 0,
                    background: '#FC3637',
                    pointerEvents: 'none'
                  }} />
                  <div aria-hidden="true" style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)',
                    pointerEvents: 'none'
                  }} />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                    zIndex: 10
                  }}>
                    <div className="w-12 h-12 bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/30">
                      <ZoomIn size={18} className="text-white" />
                    </div>
                  </div>
                  <div style={{
                    position: 'absolute',
                    bottom: '0.75rem',
                    left: '0.75rem',
                    zIndex: 10
                  }}>
                    <span className="text-[11px] font-semibold text-white/75 uppercase tracking-[0.1em]">{image.caption}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>

    {/* ── SOCIAL MEDIA FEED SECTION ─── */}
    {false && (
      <section ref={socialRef as React.RefObject<HTMLElement>} className="w-full bg-[#0A0A0A] py-24 md:py-32 px-6 md:px-24 border-t border-white/5" style={S(socialInView, 0, 0.7)}>
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
          duration: 0.9,
          ease: EASE
        }} className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="flex flex-col gap-3">
            <span className="text-[11px] font-bold text-[#FC3637] uppercase tracking-[0.2em]">Social Feed</span>
            <h2 className="text-3xl md:text-5xl font-semibold text-white tracking-[-0.04em] leading-[1]">
              Follow the Conversation.
            </h2>
          </div>
          <div className="flex flex-col gap-3 md:items-end">
            <p className="max-w-xs text-[14px] text-white/40 font-medium leading-relaxed md:text-right">
              Join Africa's most vibrant leadership community on social media.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://instagram.com/empowaworx" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-icon flex items-center gap-2 text-white/40 hover:text-[#FC3637] text-[13px] font-semibold tracking-[-0.01em]">
                <Instagram size={15} />
                <span>@empowaworx</span>
              </a>
              <span className="text-white/20 text-[10px]">◆</span>
              <a href="https://linkedin.com/company/empowaworx" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-icon flex items-center gap-2 text-white/40 hover:text-[#FC3637] text-[13px] font-semibold tracking-[-0.01em]">
                <Linkedin size={15} />
                <span>EmpowaWorx™</span>
              </a>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {SOCIAL_POSTS.map((post, idx) => <motion.div key={post.id} initial={{
            opacity: 0,
            y: 16
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: false,
            amount: 0.15
          }} transition={{
            duration: 0.6,
            delay: idx * 0.07,
            ease: EASE
          }} className="social-feed-item group cursor-pointer" style={{
            position: 'relative',
            overflow: 'hidden',
            aspectRatio: '1/1'
          }}>
            <img src={post.imageUrl} alt={post.alt} className="social-feed-img w-full h-full object-cover block" style={{
              display: 'block',
              filter: 'saturate(0.75) brightness(0.82)'
            }} />
            {/* Hover overlay */}
            <div className="social-feed-overlay" aria-hidden="true" style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0,0,0,0.72)',
              pointerEvents: 'none'
            }} />
            {/* Platform badge */}
            <div style={{
              position: 'absolute',
              top: '0.75rem',
              left: '0.75rem',
              zIndex: 10
            }}>
              <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-2 py-1">
                {post.platform === 'Instagram' ? <Instagram size={10} className="text-white/70" /> : <Linkedin size={10} className="text-white/70" />}
                <span className="text-[10px] font-semibold text-white/70 tracking-[0.06em]">{post.handle}</span>
              </div>
            </div>
            {/* Likes count */}
            <div style={{
              position: 'absolute',
              bottom: '0.75rem',
              right: '0.75rem',
              zIndex: 10
            }}>
              <span className="text-[11px] font-bold text-white/50">♥ {post.likes}</span>
            </div>
            {/* Caption — revealed on hover */}
            <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
              zIndex: 20
            }}>
              <p className="text-[12px] font-medium text-white/85 leading-[1.5] line-clamp-4">{post.caption}</p>
              <div className="flex items-center gap-1.5 mt-3">
                <ExternalLink size={11} className="text-[#FC3637]" />
                <span className="text-[11px] font-bold text-[#FC3637] uppercase tracking-[0.1em]">View Post</span>
              </div>
            </div>
          </motion.div>)}
        </div>

        <motion.div initial={{
          opacity: 0,
          y: 16
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: false,
          amount: 0.5
        }} transition={{
          duration: 0.7,
          ease: EASE
        }} className="mt-10 flex flex-col md:flex-row items-center justify-between gap-6 pt-10 border-t border-white/8">
          <p className="text-[13px] font-medium text-white/30 tracking-[-0.01em]">
            <span>Connecting 198,000+ young Africans, 50,000+ women leaders, and Africa's top executives — daily.</span>
          </p>
          <a href="#contact" className="cta-primary group">
            <span>Follow EmpowaWorx™</span>
            <div className="cta-icon-container">
              <ArrowUpRight size={14} className="text-[#1E1E1E]" />
            </div>
          </a>
        </motion.div>
      </section>
    )}

    {/* ── FOOTER ─── */}
    <Footer />
  </div>;
};