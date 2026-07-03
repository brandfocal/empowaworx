import { Header } from "../Header";
import { Footer } from "../Footer";
import { AfricaWatermark } from "../AfricaWatermark";
import { cn } from "@/lib/utils";
import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Facebook, Instagram, Linkedin, Twitter, Youtube, ZoomIn, Play } from "lucide-react";

// --- Types ---
interface NavItem {
  label: string;
  href: string;
}
interface OfferingItem {
  id: string;
  title: string;
}
interface IconTribute {
  id: string;
  name: string;
  theme: string;
  tribute: string;
  values: string[];
  image: string;
}
interface SocialItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}
interface HeroWord {
  id: string;
  text: string;
}
interface StatChip {
  id: string;
  value: string;
  label: string;
}
interface TickerItemBase {
  id: string;
  text: string;
}
interface TickerItemResolved extends TickerItemBase {
  uid: string;
}
interface MarqueeItem {
  id: string;
  text: string;
}

// --- Data ---
const NAV_ITEMS: NavItem[] = [{
  label: "Home",
  href: "#"
}, {
  label: "Who We Are",
  href: "#"
}, {
  label: "Strategic Advisory",
  href: "#"
}, {
  label: "Proprietary Platforms",
  href: "#"
}, {
  label: "Legacy Events",
  href: "#"
}, {
  label: "Media & Gallery",
  href: "#"
}, {
  label: "Upcoming Events",
  href: "#"
}, {
  label: "Careers",
  href: "#"
}];
const OFFERINGS: OfferingItem[] = [{
  id: "o1",
  title: "Legacy Conversations & Fireside Chats"
}, {
  id: "o2",
  title: "Lifetime Achievement Celebrations"
}, {
  id: "o3",
  title: "Tribute Events & Legacy Dinners"
}, {
  id: "o4",
  title: "Leadership Masterclasses"
}, {
  id: "o5",
  title: "Biography & Book Launch Platforms"
}, {
  id: "o6",
  title: "Legacy Documentary Productions"
}, {
  id: "o7",
  title: "Thought Leadership Forums"
}, {
  id: "o8",
  title: "Intergenerational Leadership Dialogues"
}, {
  id: "o9",
  title: "Hall of Fame & Recognition Programmes"
}, {
  id: "o10",
  title: "Leadership Awards & Honours"
}, {
  id: "o11",
  title: "Corporate Founder Legacy Celebrations"
}, {
  id: "o12",
  title: "Public Sector & National Icon Tributes"
}];
const HONOURED_ICONS: IconTribute[] = [{
  id: "felicia",
  name: "Felicia Mabuza-Suttle",
  theme: "Celebrating a Media Pioneer. A Trailblazing Entrepreneur. A Legacy of Impact.",
  tribute: "Few individuals have shaped South Africa's media landscape and inspired social transformation as profoundly as Felicia Mabuza-Suttle. As a pioneering broadcaster, entrepreneur, philanthropist, and influential business leader, Felicia Mabuza-Suttle broke barriers at a time when opportunities for women, particularly Black women, in mainstream media and business were limited. Through her courage, vision, and determination, she redefined what was possible.",
  values: ["Visionary Leadership", "Entrepreneurial Excellence", "Courageous Innovation", "Media Influence and Impact", "Social Transformation", "Women's Empowerment", "Resilience and Perseverance", "Legacy Building"],
  image: "/Honoring-Felicia-Mabuza-Suttle/Honoring-Felicia-Mabuza-Suttle.jpg"
}, {
  id: "kani",
  name: "Dr John Kani™",
  theme: "Celebrating a Cultural Icon. Honouring a Freedom Voice. Preserving a Legacy of Courage.",
  tribute: "Few individuals have used the power of storytelling, culture, and the arts to shape national consciousness as profoundly as Dr John Kani. A globally acclaimed playwright, actor, author, director, and activist, Dr John Kani has dedicated his life to using the arts as a powerful instrument for justice, dialogue, reconciliation, and the celebration of African identity. For decades, his work has transcended stages, borders, and generations.",
  values: ["Cultural Leadership & Excellence", "Courageous Activism & Social Justice", "Creative Innovation & Storytelling", "Nation-Building & Social Cohesion", "Preservation of African Identity", "Artistic Excellence", "Mentorship & Generational Impact", "Legacy Creation Through Service"],
  image: "/Honoring-Dr-John-Kani/Honoring-Dr-John-Kani.jpg"
}, {
  id: "maponya",
  name: "Dr Richard Maponya",
  theme: "Celebrating a Business Pioneer. Honouring a Legacy of Enterprise & Empowerment.",
  tribute: "Few individuals have had a greater impact on Black entrepreneurship, economic participation, and business leadership in South Africa than Dr Richard Maponya. Widely regarded as one of South Africa's most influential entrepreneurs and business pioneers, Dr Maponya built an extraordinary business empire during one of the most challenging periods in the nation's history. Through vision, courage, and determination, he transformed obstacles into opportunities.",
  values: ["Entrepreneurial Excellence", "Economic Empowerment", "Visionary Leadership", "Business Innovation", "Courage & Resilience", "Job Creation", "Community Development", "Legacy Building Through Enterprise"],
  image: "/dr-richard-maponya.jpg"
}];
const STAT_CHIPS: StatChip[] = [{
  id: "sc1",
  value: "3",
  label: "Tribute Icons"
}, {
  id: "sc2",
  value: "12",
  label: "Event Formats"
}, {
  id: "sc3",
  value: "1",
  label: "Legacy Series"
}];
const TICKER_ITEMS_BASE: TickerItemBase[] = [{
  id: "t1",
  text: "CELEBRATING ICONS"
}, {
  id: "t2",
  text: "PRESERVING LEGACIES"
}, {
  id: "t3",
  text: "INSPIRING GENERATIONS"
}, {
  id: "t4",
  text: "HONOURING EXCELLENCE"
}, {
  id: "t5",
  text: "BUILDING LEGACIES"
}, {
  id: "t6",
  text: "SHAPING FUTURES"
}];
const MARQUEE_ITEMS_BASE: MarqueeItem[] = [{
  id: "m1",
  text: "CELEBRATING ICONS"
}, {
  id: "m2",
  text: "PRESERVING LEGACIES"
}, {
  id: "m3",
  text: "INSPIRING GENERATIONS"
}, {
  id: "m4",
  text: "HONOURING EXCELLENCE"
}];
const SOCIAL_ITEMS: SocialItem[] = [{
  id: "fb",
  label: "Facebook",
  icon: <Facebook size={16} />
}, {
  id: "ig",
  label: "Instagram",
  icon: <Instagram size={16} />
}, {
  id: "li",
  label: "LinkedIn",
  icon: <Linkedin size={16} />
}, {
  id: "tw",
  label: "X / Twitter",
  icon: <Twitter size={16} />
}, {
  id: "yt",
  label: "YouTube",
  icon: <Youtube size={16} />
}];
const HERO_LINE_1_WORDS: HeroWord[] = [{
  id: "w-legacy",
  text: "Legacy"
}, {
  id: "w-slash",
  text: "/"
}, {
  id: "w-events",
  text: "Events"
}];
const HERO_LINE_2_WORDS: HeroWord[] = [{
  id: "w-series",
  text: "Series."
}];
const FOOTER_NAV_EXPLORE: NavItem[] = NAV_ITEMS.slice(0, 4);
const FOOTER_NAV_PLATFORMS: NavItem[] = NAV_ITEMS.slice(4);
const OFFERING_IMAGES: string[] = [
  "/empowaworx-11.jpg",
  "/empowaworx-5.jpg",
  "/empowaworx-6.jpg",
  "/empowaworx-14.jpg",
  "/book-launches.jpg",
  "/Honoring-Felicia-Mabuza-Suttle-18.jpg",
  "/empowaworx-2.jpg",
  "/Honoring-Dr-John-Kani-14.jpg",
  "/awards.JPG",
  "/leadership-award.JPG",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
  "/public-sector.JPG"
];

// Manifesto marquee items
const MANIFESTO_MARQUEE_ITEMS = [{
  id: "pm-a1",
  text: "Legacy Events Series"
}, {
  id: "pm-a2",
  text: "Celebrating Icons"
}, {
  id: "pm-a3",
  text: "Preserving Legacies"
}, {
  id: "pm-a4",
  text: "Inspiring Generations"
}, {
  id: "pm-b1",
  text: "Legacy Events Series"
}, {
  id: "pm-b2",
  text: "Celebrating Icons"
}, {
  id: "pm-b3",
  text: "Preserving Legacies"
}, {
  id: "pm-b4",
  text: "Inspiring Generations"
}];

// Philosophy headline lines
const PHIL_LINES = [{
  id: "ph-l1",
  text: "THE GREATEST MEASURE",
  color: "#FFFFFF"
}, {
  id: "ph-l2",
  text: "OF SUCCESS IS NOT",
  color: "rgba(255,255,255,0.4)"
}, {
  id: "ph-l3",
  text: "THE LEGACY WE LEAVE.",
  color: "#FC3637"
}];

// Offerings header lines
const OFFER_HEADER_LINES = [{
  id: "oh-l1",
  text: "OUR",
  color: "#1A1A1A"
}, {
  id: "oh-l2",
  text: "EVENT FORMATS",
  color: "#FC3637"
}];

// --- Brand Tokens ---
const B = {
  crimson: "#FC3637",
  crimsonDark: "#C42829",
  charcoal: "#1A1A1A",
  footerBg: "#0A0A0A",
  black: "#000000",
  white: "#FFFFFF",
  offWhite: "#F8F8F8",
  gray: "#757575",
  lightGray: "#E5E5E5"
};

// --- Ease Constants ---
const EASE_SMOOTH = [0.21, 0.47, 0.32, 0.98] as [number, number, number, number];
const EASE = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

// --- GLOBAL STYLES ---


// --- usePrefersReducedMotion hook ---
function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

// --- useScrollY hook ---
function useScrollY() {
  const [scrollY, setScrollY] = React.useState(0);
  React.useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, {
      passive: true
    });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return scrollY;
}

// --- useWindowWidth hook ---
function useWindowWidth() {
  const [width, setWidth] = React.useState(() => typeof window !== "undefined" ? window.innerWidth : 1280);
  React.useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize, {
      passive: true
    });
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return width;
}

// --- useBidirectionalInView hook ---
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

// --- useBidirectionalCountUp hook ---
function useBidirectionalCountUp(target: number, duration = 1500) {
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
        setCount(Math.round(eased * target));
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

// --- Sub-components ---

const Logo = ({
  isScrolled = false
}: {
  isScrolled?: boolean;
}) => <div className="text-2xl md:text-3xl font-black tracking-tighter uppercase flex items-baseline leading-none" style={{
  color: isScrolled ? B.charcoal : B.white,
  letterSpacing: "-0.03em"
}}>
    <span>EMPOWA</span>
    <span style={{
      color: B.crimson
    }}>WORX</span>
  </div>;
const LogoDark = () => <div className="text-2xl md:text-3xl font-black tracking-tighter uppercase flex items-baseline leading-none" style={{
  color: B.white,
  letterSpacing: "-0.03em"
}}>
  <span>EMPOWA</span>
  <span style={{
    color: B.crimson
  }}>WORX</span>
  <span style={{
    color: B.crimson
  }}>™</span>
</div>;

// --- AfricaWatermark SVG ---


// TickerStrip sub-component
const TickerStrip = () => {
  const itemsA: TickerItemResolved[] = TICKER_ITEMS_BASE.map(item => ({
    ...item,
    uid: `a-${item.id}`
  }));
  const itemsB: TickerItemResolved[] = TICKER_ITEMS_BASE.map(item => ({
    ...item,
    uid: `b-${item.id}`
  }));
  const allItems = [...itemsA, ...itemsB];
  return <div className="w-full bg-[#111111] overflow-hidden py-6 border-t border-white/5">
    <div className="ticker-track">
      {allItems.map(item => <div key={item.uid} className="flex items-center shrink-0 px-8">
        <span className="text-[14px] font-bold tracking-[0.2em] uppercase text-white/90">
          {item.text}
        </span>
        <span className="ml-8 text-[#FC3637] text-[10px]">◆</span>
      </div>)}
    </div>
  </div>;
};

// HeroHeadline sub-component
const HeroHeadline = ({
  reducedMotion,
  inView,
  isMobile
}: {
  reducedMotion: boolean;
  inView: boolean;
  isMobile: boolean;
}) => {
  const line1Count = HERO_LINE_1_WORDS.length;
  const headlineClass = isMobile ? "text-[clamp(48px,14vw,80px)] font-semibold text-white leading-[0.95] tracking-[-0.05em] whitespace-normal" : "text-[clamp(56px,10vw,143px)] font-semibold text-white leading-[0.95] tracking-[-0.06em] whitespace-nowrap";
  if (reducedMotion) {
    return <div className="flex flex-col">
      <h1 className={headlineClass}>{HERO_LINE_1_WORDS.map(w => w.text).join(" ")}</h1>
      <h1 className={headlineClass}>
        <span style={{
          color: "#FC3637"
        }}>{HERO_LINE_2_WORDS.map(w => w.text).join(" ")}</span>
      </h1>
    </div>;
  }
  return <div className="flex flex-col">
    <h1 className={`${headlineClass} flex flex-wrap gap-[0.18em]`}>
      {HERO_LINE_1_WORDS.map((word, i) => <span key={word.id} style={{
        display: "inline-block",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.7s cubic-bezier(${EASE.join(",")}) ${i * 80}ms, transform 0.7s cubic-bezier(${EASE.join(",")}) ${i * 80}ms`
      }}>
        {word.text}
      </span>)}
    </h1>
    <h1 className={`${headlineClass} flex flex-wrap gap-[0.18em]`}>
      {HERO_LINE_2_WORDS.map((word, i) => {
        const globalIdx = line1Count + i;
        const isLastWord = i === HERO_LINE_2_WORDS.length - 1;
        return <span key={word.id} style={{
          display: "inline-block",
          color: isLastWord ? "#FC3637" : undefined,
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(40px)",
          transition: `opacity 0.7s cubic-bezier(${EASE.join(",")}) ${globalIdx * 80}ms, transform 0.7s cubic-bezier(${EASE.join(",")}) ${globalIdx * 80}ms`
        }}>
          {word.text}
        </span>;
      })}
    </h1>
  </div>;
};

// StatBandBlock — count-up stat for the stats band
const StatBandBlock = ({
  chip,
  target,
  isFirst
}: {
  chip: StatChip;
  target: number;
  isFirst: boolean;
}) => {
  const {
    ref,
    count,
    done
  } = useBidirectionalCountUp(target, 1200);
  return <div ref={ref} style={{
    flex: "1 1 auto",
    minWidth: "120px",
    paddingTop: "48px",
    paddingBottom: "48px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    borderLeft: isFirst ? "none" : "1px solid rgba(255,255,255,0.08)"
  }}>
    <div className={done ? "brand-pulse" : ""} style={{
      fontSize: "clamp(2.2rem,5vw,5rem)",
      fontWeight: 900,
      color: "rgba(255,255,255,0.9)",
      letterSpacing: "-0.05em",
      lineHeight: 1
    }}>
      {count}
    </div>
    <div style={{
      marginTop: "8px",
      fontSize: "10px",
      fontWeight: 700,
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      color: B.crimson
    }}>
      {chip.label}
    </div>
  </div>;
};

const GALLERY_IMGS_BY_HONOREE: Record<string, string[]> = {
  kani: [
    "/Honoring-Dr-John-Kani/Honoring-Dr-John-Kani-2.jpg",
    "/Honoring-Dr-John-Kani/Honoring-Dr-John-Kani-3.jpg",
    "/Honoring-Dr-John-Kani/Honoring-Dr-John-Kani-4.jpg",
    "/Honoring-Dr-John-Kani/Honoring-Dr-John-Kani-5.jpg",
    "/Honoring-Dr-John-Kani/Honoring-Dr-John-Kani-6.jpg",
    "/Honoring-Dr-John-Kani/Honoring-Dr-John-Kani-7.jpg",
    "/Honoring-Dr-John-Kani/Honoring-Dr-John-Kani-8.jpg",
    "/Honoring-Dr-John-Kani/Honoring-Dr-John-Kani-9.jpg",
    "/Honoring-Dr-John-Kani/Honoring-Dr-John-Kani-10.jpg",
    "/Honoring-Dr-John-Kani/Honoring-Dr-John-Kani-11.jpg",
    "/Honoring-Dr-John-Kani/Honoring-Dr-John-Kani-12.jpg",
    "/Honoring-Dr-John-Kani/Honoring-Dr-John-Kani-13.jpg",
    "/Honoring-Dr-John-Kani/Honoring-Dr-John-Kani-14.jpg",
    "/Honoring-Dr-John-Kani/Honoring-Dr-John-Kani-15.jpg",
    "/Honoring-Dr-John-Kani/Honoring-Dr-John-Kani-16.jpg",
    "/Honoring-Dr-John-Kani/Honoring-Dr-John-Kani-17.jpg",
  ],
  felicia: [
    "/Honoring-Felicia-Mabuza-Suttle/Honoring-Felicia-Mabuza-Suttle-2.jpg",
    "/Honoring-Felicia-Mabuza-Suttle/Honoring-Felicia-Mabuza-Suttle-3.jpg",
    "/Honoring-Felicia-Mabuza-Suttle/Honoring-Felicia-Mabuza-Suttle-4.jpg",
    "/Honoring-Felicia-Mabuza-Suttle/Honoring-Felicia-Mabuza-Suttle-5.jpg",
    "/Honoring-Felicia-Mabuza-Suttle/Honoring-Felicia-Mabuza-Suttle-6.jpg",
    "/Honoring-Felicia-Mabuza-Suttle/Honoring-Felicia-Mabuza-Suttle-7.jpg",
    "/Honoring-Felicia-Mabuza-Suttle/Honoring-Felicia-Mabuza-Suttle-8.jpg",
    "/Honoring-Felicia-Mabuza-Suttle/Honoring-Felicia-Mabuza-Suttle-9.jpg",
    "/Honoring-Felicia-Mabuza-Suttle/Honoring-Felicia-Mabuza-Suttle-10.jpg",
    "/Honoring-Felicia-Mabuza-Suttle/Honoring-Felicia-Mabuza-Suttle-11.jpg",
    "/Honoring-Felicia-Mabuza-Suttle/Honoring-Felicia-Mabuza-Suttle-12.jpg",
    "/Honoring-Felicia-Mabuza-Suttle/Honoring-Felicia-Mabuza-Suttle-13.jpg",
    "/Honoring-Felicia-Mabuza-Suttle/Honoring-Felicia-Mabuza-Suttle-14.jpg",
    "/Honoring-Felicia-Mabuza-Suttle/Honoring-Felicia-Mabuza-Suttle-15.jpg",
    "/Honoring-Felicia-Mabuza-Suttle/Honoring-Felicia-Mabuza-Suttle-16.jpg",
    "/Honoring-Felicia-Mabuza-Suttle/Honoring-Felicia-Mabuza-Suttle-17.jpg",
  ],
  maponya: [
    "/Honoring-Dr-Richard-Maponya/Honoring-Dr-Richard-Maponya-2.jpg",
    "/Honoring-Dr-Richard-Maponya/Honoring-Dr-Richard-Maponya-3.jpg",
    "/Honoring-Dr-Richard-Maponya/Honoring-Dr-Richard-Maponya-4.jpg",
    "/Honoring-Dr-Richard-Maponya/Honoring-Dr-Richard-Maponya-5.jpg",
    "/Honoring-Dr-Richard-Maponya/Honoring-Dr-Richard-Maponya-6.jpg",
    "/Honoring-Dr-Richard-Maponya/Honoring-Dr-Richard-Maponya-7.jpg",
    "/Honoring-Dr-Richard-Maponya/Honoring-Dr-Richard-Maponya-8.jpg",
    "/Honoring-Dr-Richard-Maponya/Honoring-Dr-Richard-Maponya-9.jpg",
    "/Honoring-Dr-Richard-Maponya/Honoring-Dr-Richard-Maponya-10.jpg",
    "/Honoring-Dr-Richard-Maponya/Honoring-Dr-Richard-Maponya-11.jpg",
    "/Honoring-Dr-Richard-Maponya/Honoring-Dr-Richard-Maponya-12.jpg",
    "/Honoring-Dr-Richard-Maponya/Honoring-Dr-Richard-Maponya-13.jpg",
    "/Honoring-Dr-Richard-Maponya/Honoring-Dr-Richard-Maponya-14.jpg",
    "/Honoring-Dr-Richard-Maponya/Honoring-Dr-Richard-Maponya-15.jpg",
    "/Honoring-Dr-Richard-Maponya/Honoring-Dr-Richard-Maponya-16.jpg",
    "/Honoring-Dr-Richard-Maponya/Honoring-Dr-Richard-Maponya-17.jpg",
    "/Honoring-Dr-Richard-Maponya/Honoring-Dr-Richard-Maponya-18.jpg",
  ]
};

const VIDEOS_BY_HONOREE: Record<string, { id: string; title: string }[]> = {
  felicia: [
    { id: "o91qXKbcKEI", title: "Felicia Mabuza-Suttle Tribute - Part 1" },
    { id: "m_Lo36oCwbY", title: "Felicia Mabuza-Suttle Tribute - Part 2" },
    { id: "WLvLyojYx5g", title: "Felicia Mabuza-Suttle Tribute - Part 3" },
    { id: "7doCA0Byly4", title: "Felicia Mabuza-Suttle Tribute - Part 4" }
  ],
  maponya: [
    { id: "chCMdFBQiVg", title: "Dr Richard Maponya Tribute - Part 1" },
    { id: "Pu-itj_2V9M", title: "Dr Richard Maponya Tribute - Part 3" }
  ],
  kani: [
    { id: "zfiCB6AOPmg", title: "Dr John Kani Tribute Dialogue" }
  ]
};


// --- Main Page Component ---
export const LegacyEventsPage = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [heroInView, setHeroInView] = React.useState(false);
  const [openGallery, setOpenGallery] = React.useState<string | null>(null);
  const [lightboxImage, setLightboxImage] = React.useState<string | null>(null);
  const [activeTributeVideos, setActiveTributeVideos] = React.useState<Record<string, { videoId: string; isPlaying: boolean }>>({});
  const reducedMotion = usePrefersReducedMotion();
  const windowWidth = useWindowWidth();
  // FIX 1: Updated breakpoints — mobile < 640, tablet 640–1023, desktop >= 1024
  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;
  const scrollYValue = useScrollY();
  const isScrolled = scrollYValue > 60;
  React.useEffect(() => {
    const timer = setTimeout(() => setHeroInView(true), 80);
    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    if (openGallery) {
      const timer = setTimeout(() => {
        try {
          const el = document.getElementById(`gallery-${openGallery}`);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        } catch (err) {
          console.warn("scrollIntoView failed: ", err);
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [openGallery]);

  React.useEffect(() => {
    const hash = window.location.hash;
    if (hash && hash.includes('/')) {
      const parts = hash.split('/');
      const targetId = parts[parts.length - 1];
      const timer = setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 350);
      return () => clearTimeout(timer);
    }
  }, []);

  const heroParallaxY = reducedMotion ? 0 : scrollYValue * 0.4;

  // Bidirectional in-view refs
  const {
    ref: philosophyRef,
    inView: isPhilosophyInView
  } = useBidirectionalInView<HTMLElement>(0.08);
  const {
    ref: offeringsRef,
    inView: isOfferingsInView
  } = useBidirectionalInView<HTMLElement>(0.04);
  const {
    ref: iconsHeaderRef,
    inView: isIconsHeaderInView
  } = useBidirectionalInView<HTMLDivElement>(0.1);
  const {
    ref: icon0Ref,
    inView: isIcon0InView
  } = useBidirectionalInView<HTMLElement>(0.08);
  const {
    ref: icon1Ref,
    inView: isIcon1InView
  } = useBidirectionalInView<HTMLElement>(0.08);
  const {
    ref: icon2Ref,
    inView: isIcon2InView
  } = useBidirectionalInView<HTMLElement>(0.08);
  const {
    ref: heroSubRef,
    inView: heroSubInView
  } = useBidirectionalInView<HTMLDivElement>(0.3);
  const iconRefs = [icon0Ref, icon1Ref, icon2Ref];
  const iconInViews = [isIcon0InView, isIcon1InView, isIcon2InView];
  const S = (inView: boolean, delay = 0): React.CSSProperties => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "none" : "translateY(30px)",
    transition: `opacity 0.8s cubic-bezier(${EASE_SMOOTH.join(",")}) ${delay}ms, transform 0.8s cubic-bezier(${EASE_SMOOTH.join(",")}) ${delay}ms`
  });

  // Marquee items duplicated for loop
  const marqueeA: MarqueeItem[] = MARQUEE_ITEMS_BASE.map(m => ({
    ...m,
    id: `ma-${m.id}`
  }));
  const marqueeB: MarqueeItem[] = MARQUEE_ITEMS_BASE.map(m => ({
    ...m,
    id: `mb-${m.id}`
  }));
  const allMarqueeItems = [...marqueeA, ...marqueeB];

  // Responsive padding helpers
  const philPadding = isMobile ? "64px 24px" : isTablet ? "80px 40px" : "112px 64px";
  const offerHeaderPadding = isMobile ? "60px 24px 0" : isTablet ? "60px 32px 0" : "80px 64px 0";
  const offerFeaturePadding = isMobile ? "40px 24px 0" : isTablet ? "40px 32px 0" : "40px 64px 0";
  const offerCompactPadding = isMobile ? "16px 24px 48px" : isTablet ? "16px 32px 48px" : "16px 64px 48px";
  const iconsOuterPadding = isMobile ? "64px 24px 0" : isTablet ? "72px 32px 0" : "96px 0 0";
  const iconsInnerPadding = isMobile ? "0 0 40px" : isTablet ? "0 32px 48px" : "0 64px 64px";
  const featureCardMinHeight = isMobile ? "280px" : "420px";
  const compactCardMinHeight = isMobile ? "240px" : isTablet ? "300px" : "420px";
  const iconCardMinHeight = isMobile ? "60vh" : isTablet ? "75vh" : "90vh";
  const iconBottomPadding = isMobile ? "32px 24px" : isTablet ? "48px 32px" : "64px 64px";
  const offerGridCols = isMobile ? "1fr" : isTablet ? "repeat(2,1fr)" : "repeat(3,1fr)";
  return <div className="relative w-full font-sans bg-white selection:bg-[#FC3637] selection:text-white" style={{
    overflowX: "clip"
  }}>
    <Header />

    {/* GRAIN TEXTURE OVERLAY */}
    <div aria-hidden="true" style={{
      position: "fixed",
      inset: 0,
      width: "100%",
      height: "100%",
      pointerEvents: "none",
      zIndex: 9999,
      opacity: 0.04,
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
      backgroundRepeat: "repeat",
      backgroundSize: "200px 200px"
    }} />



    <section className="relative w-full overflow-hidden" style={{
      background: "#111111",
      minHeight: '100svh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'flex-start'
    }}>
      <div aria-hidden="true" style={{
        position: "absolute",
        inset: "-20%",
        overflow: "hidden",
        pointerEvents: "none"
      }}>
        <img src="/Honoring-Dr-John-Kani/Honoring-Dr-John-Kani-13.jpg" alt="" style={{
          width: "100%",
          height: "140%",
          objectFit: "cover",
          objectPosition: "center top",
          display: "block",
          filter: "grayscale(1) brightness(0.55)",
          transform: `translateY(${heroParallaxY}px)`,
          willChange: "transform"
        }} />
      </div>
      <div aria-hidden="true" style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(to bottom, rgba(10,8,8,0.55) 0%, rgba(10,8,8,0.30) 40%, rgba(10,8,8,0.78) 100%)",
        pointerEvents: "none"
      }} />
      <div aria-hidden="true" style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(to right, rgba(10,8,8,0.65) 0%, rgba(10,8,8,0.20) 60%, transparent 100%)",
        pointerEvents: "none"
      }} />
      <div aria-hidden="true" style={{
        position: "absolute",
        inset: 0,
        background: "radial-gradient(ellipse at 100% 100%, rgba(252,54,55,0.12) 0%, transparent 50%)",
        pointerEvents: "none"
      }} />
      <div className="relative" style={{
        width: '100%',
        zIndex: 10,
        paddingLeft: isMobile ? '24px' : isTablet ? '32px' : '96px',
        paddingRight: isMobile ? '24px' : isTablet ? '32px' : '96px',
        paddingTop: 'clamp(80px, 8vh, 120px)',
        paddingBottom: isMobile ? '40px' : '80px',
        marginTop: 'auto'
      }}>
        <motion.div initial={{
          opacity: 0,
          y: 48
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 1.1,
          ease: [0.16, 1, 0.3, 1]
        }} className="max-w-5xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-[2px]" style={{
              background: B.crimson
            }} />
            <span style={{
              color: "rgba(255,255,255,0.8)",
              fontSize: "10px",
              fontWeight: 500,
              letterSpacing: "0.2em",
              textTransform: "uppercase"
            }}>
              EMPOWAWORX™ LEGACY EVENTS SERIES
            </span>
          </div>

          <div ref={heroSubRef as React.RefObject<HTMLDivElement>} className="hidden md:block max-w-[500px] mb-10" style={S(heroSubInView, 150)}>
            <p className="text-lg md:text-xl font-medium text-white/70 leading-tight tracking-tight">
              <span>
                Celebrating extraordinary African icons whose courage, leadership and legacy
                continue to inspire generations.
              </span>
            </p>
          </div>

          <HeroHeadline reducedMotion={reducedMotion} inView={heroInView} isMobile={isMobile} />

          {/* FIX 9: Hero buttons responsive layout */}
          <div style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "flex-start",
            gap: "16px",
            marginTop: "40px"
          }}>
            <motion.a
              href="#honoured-icons"
              initial={{
                opacity: 0,
                y: 20
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                duration: 0.8,
                delay: 0.6,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="cta-primary group"
              style={{
                width: isMobile ? "100%" : "auto"
              }}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('honoured-icons');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            >
              <span>Explore Events</span>
              <div className="cta-icon-container">
                <ArrowUpRight size={14} className="text-[#1E1E1E]" />
              </div>
            </motion.a>
            <motion.a
              href="/contact"
              initial={{
                opacity: 0,
                y: 20
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                duration: 0.8,
                delay: 0.75,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="cta-secondary group"
              style={{
                width: isMobile ? "100%" : "auto"
              }}
            >
              <span>Partner With Us</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>

    {/* ── Ticker Band ── */}
    <TickerStrip />

    {/* ══════════════════════════════════════════════
          SECTION 1 — OUR PHILOSOPHY (REMIXED)
       ══════════════════════════════════════════════ */}
    <section ref={philosophyRef} style={{
      position: "relative",
      width: "100%",
      overflow: "hidden"
    }}>

      {/* PART A — STATEMENT BAND */}
      {/* FIX 2: Philosophy statement band responsive padding */}
      <div style={{
        position: "relative",
        overflow: "hidden",
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        background: "#050505"
      }}>
        {/* Background image */}
        <img src="/Honoring-Dr-John-Kani/Honoring-Dr-John-Kani-8.jpg" alt="" aria-hidden="true" style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center 30%",
          filter: "brightness(0.22) saturate(0.5)",
          zIndex: 0,
          display: "block"
        }} />
        {/* Overlay 1 */}
        <div aria-hidden="true" style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to right, rgba(5,5,5,0.96) 0%, rgba(5,5,5,0.70) 55%, rgba(5,5,5,0.30) 100%)",
          zIndex: 1,
          pointerEvents: "none"
        }} />
        {/* Overlay 2 */}
        <div aria-hidden="true" style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 100% 100%, rgba(252,54,55,0.07) 0%, transparent 55%)",
          zIndex: 1,
          pointerEvents: "none"
        }} />

        {/* Foreground content */}
        <div className="relative w-full max-w-7xl mx-auto" style={{
          padding: philPadding,
          zIndex: 10
        }}>
          {/* Eyebrow */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "48px"
          }}>
            <div style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: B.crimson,
              flexShrink: 0
            }} />
            <span style={{
              color: B.crimson,
              fontSize: "9px",
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase"
            }}>
              OUR PHILOSOPHY
            </span>
          </div>

          {/* Headline */}
          <h2 style={{
            fontWeight: 600,
            fontSize: "clamp(3rem,5.5vw,5rem)",
            letterSpacing: "-0.045em",
            lineHeight: 0.92,
            textTransform: "uppercase",
            maxWidth: isMobile || isTablet ? "100%" : "680px",
            margin: 0
          }}>
            {PHIL_LINES.map((line, idx) => <span key={line.id} style={{
              display: "block",
              color: line.color,
              opacity: isPhilosophyInView ? 1 : 0,
              transform: isPhilosophyInView ? "translateY(0)" : "translateY(40px)",
              transition: `opacity 0.7s cubic-bezier(${EASE_SMOOTH.join(",")}) ${idx * 80}ms, transform 0.7s cubic-bezier(${EASE_SMOOTH.join(",")}) ${idx * 80}ms`
            }}>
              {line.text}
            </span>)}
          </h2>

          {/* Crimson rule */}
          <div style={{
            marginTop: "32px",
            height: "3px",
            background: B.crimson,
            width: isPhilosophyInView ? "56px" : "0px",
            transition: "width 0.6s cubic-bezier(0.21,0.47,0.32,0.98) 400ms"
          }} />

          {/* Body copy */}
          <p style={{
            margin: "32px 0 0 0",
            color: "rgba(255,255,255,0.5)",
            fontSize: "16px",
            lineHeight: 1.7,
            maxWidth: isMobile ? "100%" : "520px",
            opacity: isPhilosophyInView ? 1 : 0,
            transform: isPhilosophyInView ? "translateY(0)" : "translateY(16px)",
            transition: `opacity 0.8s cubic-bezier(${EASE_SMOOTH.join(",")}) 500ms, transform 0.8s cubic-bezier(${EASE_SMOOTH.join(",")}) 500ms`
          }}>
            <span>
              Through the EmpowaWorx™ Legacy Events Series, we honour and celebrate remarkable
              men and women who have overcome adversity, broken barriers, and created lasting
              impact through leadership, courage, and unwavering commitment to excellence.
            </span>
          </p>
        </div>
      </div>

      {/* PART B — STATS BAND */}
      {/* FIX 3: Stats band responsive layout */}
      <div style={{
        background: "#111111",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        width: "100%"
      }}>
        <div className="max-w-7xl mx-auto px-8 md:px-16" style={{
          display: isMobile ? "grid" : "flex",
          gridTemplateColumns: isMobile ? "repeat(3,1fr)" : undefined,
          flexWrap: isMobile ? undefined : "wrap"
        }}>
          {STAT_CHIPS.map((chip, idx) => <StatBandBlock key={chip.id} chip={chip} target={parseInt(chip.value, 10)} isFirst={idx === 0} />)}
        </div>
      </div>

      {/* MANIFESTO MARQUEE */}
      <div style={{
        width: "100%",
        background: B.crimson,
        paddingTop: "56px",
        paddingBottom: "56px",
        overflow: "hidden"
      }}>
        <div className="creed-track">
          {MANIFESTO_MARQUEE_ITEMS.map(item => <div key={item.id} style={{
            display: "flex",
            alignItems: "center",
            flexShrink: 0,
            paddingLeft: "40px",
            paddingRight: "40px"
          }}>
            <span style={{
              color: B.white,
              fontWeight: 900,
              fontSize: "clamp(1.4rem,3vw,2.5rem)",
              letterSpacing: "-0.03em",
              textTransform: "uppercase",
              whiteSpace: "nowrap"
            }}>
              {item.text}
            </span>
            <span style={{
              color: "rgba(255,255,255,0.4)",
              marginLeft: "40px",
              fontSize: "14px"
            }}>◆</span>
          </div>)}
        </div>
      </div>
    </section>


    {/* ══════════════════════════════════════════════
          SECTION 3 — HONOURED ICONS (MAGAZINE PORTRAIT GALLERY)
       ══════════════════════════════════════════════ */}
    <section id="honoured-icons" style={{
      background: "white",
      position: "relative",
      width: "100%"
    }}>
      {/* SECTION HEADER */}
      {/* FIX 7: Icons section header responsive padding and layout */}
      <div style={{
        background: "#050505",
        width: "100%",
        padding: iconsOuterPadding
      }}>
        <div ref={iconsHeaderRef as React.RefObject<HTMLDivElement>} className="max-w-7xl mx-auto" style={{
          padding: iconsInnerPadding,
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: isMobile ? "flex-start" : "flex-end",
          gap: "40px",
          borderBottom: "1px solid rgba(255,255,255,0.05)"
        }}>
          {/* Left */}
          <div>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "20px"
            }}>
              <div style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: B.crimson,
                flexShrink: 0
              }} />
              <span style={{
                color: B.crimson,
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase"
              }}>
                Honoured Icons &amp; Tributes
              </span>
            </div>
            <h2 style={{
              fontWeight: 600,
              color: B.white,
              fontSize: "clamp(2.4rem,8vw,7rem)",
              letterSpacing: "-0.06em",
              lineHeight: 0.85,
              textTransform: "uppercase",
              margin: 0,
              opacity: isIconsHeaderInView ? 1 : 0,
              transform: isIconsHeaderInView ? "translateY(0)" : "translateY(50px)",
              transition: `opacity 0.8s cubic-bezier(${EASE_SMOOTH.join(",")}) 0ms, transform 0.8s cubic-bezier(${EASE_SMOOTH.join(",")}) 0ms`
            }}>
              <span>Icons</span>
              <br />
              <span style={{
                color: B.crimson
              }}>we</span>
              <br />
              <span style={{
                color: B.crimson
              }}>honour</span>
            </h2>
          </div>
          {/* Right */}
          <p style={{
            color: "rgba(255,255,255,0.40)",
            fontSize: "16px",
            lineHeight: 1.65,
            maxWidth: "300px",
            margin: 0,
            opacity: isIconsHeaderInView ? 1 : 0,
            transform: isIconsHeaderInView ? "translateY(0)" : "translateY(30px)",
            transition: `opacity 0.8s cubic-bezier(${EASE_SMOOTH.join(",")}) 120ms, transform 0.8s cubic-bezier(${EASE_SMOOTH.join(",")}) 120ms`
          }}>
            <span>
              We celebrate extraordinary Africans whose courage, creativity and unwavering
              commitment to excellence continue to shape the world.
            </span>
          </p>
        </div>
      </div>

      {/* ICON CARDS */}
      {/* FIX 8: Icon cards responsive layout */}
      {HONOURED_ICONS.map((icon, idx) => {
        const cardRef = iconRefs[idx] || null;
        const cardInView = iconInViews[idx] !== undefined ? iconInViews[idx] : true;
        const parallaxOffset = reducedMotion ? 0 : scrollYValue * 0.12;
        return <React.Fragment key={`icon-fr-${icon.id}`}>
          <section id={icon.id} ref={cardRef as React.RefObject<HTMLElement>} className="icon-card" style={{
            position: "relative",
            overflow: "hidden",
            minHeight: iconCardMinHeight,
            background: "#050505"
          }}>
            {/* Background image */}
            <img src={icon.image} alt={icon.name} className="icon-card-bg" style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: icon.id === "maponya" ? "center 55%" : "center top",
              filter: icon.id === "maponya" ? "grayscale(1) brightness(0.6)" : "brightness(0.7)",
              display: "block",
              willChange: "transform",
              zIndex: 1
            }} />
            {/* Overlay 1: bottom-to-top gradient */}
            <div aria-hidden="true" style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(5,5,5,0.85) 0%, rgba(5,5,5,0.3) 50%, transparent 100%)",
              pointerEvents: "none",
              zIndex: 2
            }} />
            {/* Overlay 2: left gradient */}
            <div aria-hidden="true" style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to right, rgba(5,5,5,0.45) 0%, transparent 70%)",
              pointerEvents: "none",
              zIndex: 3
            }} />
            {/* Overlay 3: crimson radial */}
            <div aria-hidden="true" style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(ellipse at 0% 100%, rgba(252,54,55,0.08) 0%, transparent 65%)",
              pointerEvents: "none",
              zIndex: 4
            }} />

            {/* Ghost name watermark */}
            <div aria-hidden="true" style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: isMobile ? "0 24px" : isTablet ? "0 32px" : "0 clamp(32px,4vw,64px)",
              zIndex: 4,
              fontWeight: 900,
              fontSize: "clamp(60px,10vw,130px)",
              color: "transparent",
              WebkitTextStroke: "1px rgba(255,255,255,0.04)",
              letterSpacing: "-0.06em",
              lineHeight: 1,
              userSelect: "none",
              pointerEvents: "none",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              overflow: "hidden"
            }}>
              {icon.name}
            </div>

            {/* BOTTOM CONTENT */}
            <div style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: iconBottomPadding,
              zIndex: 10
            }}>
              <div className="max-w-7xl mx-auto">
                {/* Animated crimson bar */}
                <div style={{
                  height: "3px",
                  background: B.crimson,
                  width: cardInView ? "320px" : "0px",
                  transition: "width 0.7s cubic-bezier(0.21,0.47,0.32,0.98) 300ms"
                }} />

                {/* Flex layout: left (name/theme) + right (tribute/values) */}
                <div style={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  gap: isMobile ? "24px" : "64px",
                  flexWrap: "nowrap",
                  marginTop: isMobile ? "16px" : "0"
                }}>
                  {/* Left: index + name + theme */}
                  <div style={{
                    maxWidth: "560px",
                    flex: "0 0 auto",
                    opacity: cardInView ? 1 : 0,
                    transform: cardInView ? "translateY(0)" : "translateY(40px)",
                    transition: `opacity 0.8s cubic-bezier(${EASE_SMOOTH.join(",")}) 100ms, transform 0.8s cubic-bezier(${EASE_SMOOTH.join(",")}) 100ms`
                  }}>
                    <p style={{
                      color: B.crimson,
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.25em",
                      textTransform: "uppercase",
                      margin: "24px 0 0 0"
                    }}>
                      {String(idx + 1).padStart(2, "0")}
                    </p>
                    <h2 style={{
                      fontWeight: 600,
                      color: B.white,
                      fontSize: "clamp(2rem,7vw,7rem)",
                      letterSpacing: "-0.055em",
                      lineHeight: 0.88,
                      textTransform: "uppercase",
                      margin: "12px 0 16px 0"
                    }}>
                      {icon.name}
                    </h2>
                    <p style={{
                      color: B.crimson,
                      fontSize: "13px",
                      fontWeight: 600,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      maxWidth: "480px",
                      margin: 0,
                      lineHeight: 1.5
                    }}>
                      {icon.theme}
                    </p>
                    <div style={{ marginTop: "24px", position: "relative", zIndex: 50 }}>
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          setOpenGallery(openGallery === icon.id ? null : icon.id);
                        }}
                        className="cta-primary group"
                        style={{ cursor: "pointer", pointerEvents: "auto", position: "relative", zIndex: 50 }}
                      >
                        <span>{openGallery === icon.id ? "Hide Media" : "Show More Media"}</span>
                        <div className="cta-icon-container">
                          <ArrowUpRight size={14} className="text-[#1E1E1E]" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: tribute + values */}
                  {!isMobile && <div style={{
                    maxWidth: isTablet ? "280px" : "380px",
                    flex: "0 0 auto",
                    opacity: cardInView ? 1 : 0,
                    transform: cardInView ? "translateY(0)" : "translateY(40px)",
                    transition: `opacity 0.8s cubic-bezier(${EASE_SMOOTH.join(",")}) 220ms, transform 0.8s cubic-bezier(${EASE_SMOOTH.join(",")}) 220ms`
                  }}>
                    <p style={{
                      color: "rgba(255,255,255,0.90)",
                      fontSize: "15px",
                      lineHeight: 1.75,
                      margin: 0
                    }}>
                      {icon.tribute}
                    </p>
                  </div>}
                </div>
              </div>
            </div>
          </section>
          <AnimatePresence initial={false}>
            {openGallery === icon.id && (
              <motion.div
                id={`gallery-${icon.id}`}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  background: "#090909",
                  borderTop: "1px solid rgba(255,255,255,0.08)",
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                  overflow: "hidden"
                }}
              >
                <div style={{
                  maxWidth: "1280px",
                  margin: "0 auto",
                  padding: isMobile ? "40px 20px" : "80px 48px"
                }}>
                  {/* Tribute Videos Block */}
                  {VIDEOS_BY_HONOREE[icon.id] !== undefined && VIDEOS_BY_HONOREE[icon.id].length > 0 && (
                    <div style={{ marginBottom: "56px" }}>
                      <div style={{ marginBottom: "24px" }}>
                        <span style={{
                          fontSize: "10px",
                          fontWeight: 800,
                          letterSpacing: "0.3em",
                          textTransform: "uppercase",
                          color: B.crimson,
                          display: "block",
                          marginBottom: "8px"
                        }}>
                          TRIBUTE VIDEOS
                        </span>
                        <h3 style={{
                          fontSize: "clamp(24px, 3.5vw, 40px)",
                          fontWeight: 600,
                          color: B.white,
                          letterSpacing: "-0.03em",
                          margin: 0
                        }}>
                          Video Highlights &amp; Features
                        </h3>
                      </div>

                      {(() => {
                        const videos = VIDEOS_BY_HONOREE[icon.id] || [];
                        if (videos.length === 0) return null;

                        const activeState = activeTributeVideos[icon.id];
                        const currentVideoId = activeState ? activeState.videoId : videos[0].id;
                        const isPlaying = activeState ? activeState.isPlaying : false;

                        const mainVideo = videos.find(v => v.id === currentVideoId) || videos[0];
                        const otherVideos = videos.filter(v => v.id !== mainVideo.id);

                        return (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                            {/* Main Featured Video */}
                            <div>
                              <div
                                id={`tribute-video-player-${icon.id}`}
                                className="group"
                                style={{
                                  background: '#111',
                                  position: 'relative',
                                  display: 'block',
                                  borderRadius: '4px',
                                  overflow: 'hidden',
                                  width: '100%',
                                  maxWidth: '1000px',
                                  margin: '0 auto 24px',
                                  border: '1px solid rgba(255, 255, 255, 0.08)',
                                  boxShadow: '0 0 0 0px #FC3637',
                                  transition: 'box-shadow 0.35s ease',
                                  cursor: isPlaying ? 'default' : 'pointer'
                                }}
                                onClick={!isPlaying ? () => {
                                  setActiveTributeVideos(prev => ({
                                    ...prev,
                                    [icon.id]: { videoId: mainVideo.id, isPlaying: true }
                                  }));
                                } : undefined}
                                onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 0 3px #FC3637'}
                                onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 0 0 0px #FC3637'}
                              >
                                {isPlaying ? (
                                  <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9' }}>
                                    <iframe
                                      width="100%"
                                      height="100%"
                                      src={`https://www.youtube.com/embed/${mainVideo.id}?autoplay=1`}
                                      title={mainVideo.title}
                                      frameBorder="0"
                                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                      allowFullScreen
                                      style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        border: 'none'
                                      }}
                                    />
                                  </div>
                                ) : (
                                  <>
                                    <img
                                      src={`https://img.youtube.com/vi/${mainVideo.id}/hqdefault.jpg`}
                                      alt={mainVideo.title}
                                      style={{
                                        width: '100%',
                                        aspectRatio: '16/9',
                                        objectFit: 'cover',
                                        display: 'block',
                                        filter: 'brightness(0.60) saturate(0.75)',
                                        transition: 'transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)'
                                      }}
                                      className="group-hover:scale-105"
                                    />
                                    <div
                                      style={{
                                        position: 'absolute',
                                        inset: 0,
                                        background: 'linear-gradient(to top, rgba(13,13,13,0.95) 0%, rgba(13,13,13,0.30) 55%, rgba(13,13,13,0.05) 100%)'
                                      }}
                                    />
                                    <div
                                      style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        zIndex: 2
                                      }}
                                    >
                                      <div
                                        style={{
                                          width: '64px',
                                          height: '64px',
                                          borderRadius: '50%',
                                          background: B.crimson,
                                          display: 'flex',
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                          transition: 'transform 0.3s ease, background-color 0.3s ease'
                                        }}
                                        className="group-hover:scale-112 group-hover:bg-white"
                                      >
                                        <Play
                                          size={20}
                                          fill={B.white}
                                          style={{
                                            color: B.white,
                                            marginLeft: '3px',
                                            transition: 'color 0.3s ease, fill 0.3s ease'
                                          }}
                                          className="group-hover:text-[#FC3637] group-hover:fill-[#FC3637]"
                                        />
                                      </div>
                                    </div>
                                    <div
                                      style={{
                                        position: 'absolute',
                                        bottom: 0,
                                        left: 0,
                                        right: 0,
                                        padding: '24px clamp(16px, 3vw, 40px)',
                                        zIndex: 2
                                      }}
                                    >
                                      <span
                                        style={{
                                          display: 'inline-block',
                                          background: B.crimson,
                                          color: B.white,
                                          fontSize: '9px',
                                          fontWeight: 800,
                                          letterSpacing: '0.20em',
                                          textTransform: 'uppercase',
                                          padding: '4px 10px',
                                          marginBottom: '10px'
                                        }}
                                      >
                                        Featured tribute
                                      </span>
                                      <h3
                                        style={{
                                          fontSize: 'clamp(18px, 2.5vw, 32px)',
                                          fontWeight: 600,
                                          color: B.white,
                                          letterSpacing: '-0.03em',
                                          lineHeight: 1.2,
                                          margin: 0
                                        }}
                                      >
                                        {mainVideo.title}
                                      </h3>
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>

                            {isPlaying && (
                              <div
                                style={{
                                  width: '100%',
                                  maxWidth: '1000px',
                                  margin: '-12px auto 24px',
                                  padding: '0 16px'
                                }}
                              >
                                <span
                                  style={{
                                    display: 'inline-block',
                                    background: B.crimson,
                                    color: B.white,
                                    fontSize: '9px',
                                    fontWeight: 800,
                                    letterSpacing: '0.20em',
                                    textTransform: 'uppercase',
                                    padding: '4px 10px',
                                    marginBottom: '10px'
                                  }}
                                >
                                  Featured tribute
                                </span>
                                <h3
                                  style={{
                                    fontSize: 'clamp(18px, 2.5vw, 32px)',
                                    fontWeight: 600,
                                    color: B.white,
                                    letterSpacing: '-0.03em',
                                    lineHeight: 1.2,
                                    margin: 0
                                  }}
                                >
                                  {mainVideo.title}
                                </h3>
                              </div>
                            )}

                            {/* Other Videos */}
                            {otherVideos.length > 0 && (
                              <div>
                                <h4
                                  style={{
                                    fontSize: '11px',
                                    fontWeight: 800,
                                    letterSpacing: '0.25em',
                                    textTransform: 'uppercase',
                                    color: 'rgba(255, 255, 255, 0.4)',
                                    marginBottom: '24px',
                                    textAlign: 'center'
                                  }}
                                >
                                  More Videos
                                </h4>
                                <div
                                  style={{
                                    display: 'grid',
                                    gap: '16px',
                                    gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)'
                                  }}
                                >
                                  {otherVideos.map((video) => (
                                    <div
                                      key={video.id}
                                      onClick={() => {
                                        setActiveTributeVideos(prev => ({
                                          ...prev,
                                          [icon.id]: { videoId: video.id, isPlaying: true }
                                        }));
                                        const playerEl = document.getElementById(`tribute-video-player-${icon.id}`);
                                        if (playerEl) {
                                          playerEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                        }
                                      }}
                                      className="group"
                                      style={{
                                        background: '#111',
                                        position: 'relative',
                                        display: 'block',
                                        borderRadius: '4px',
                                        overflow: 'hidden',
                                        border: '1px solid rgba(255, 255, 255, 0.08)',
                                        boxShadow: '0 0 0 0px #FC3637',
                                        transition: 'box-shadow 0.35s ease',
                                        cursor: 'pointer'
                                      }}
                                      onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 0 3px #FC3637'}
                                      onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 0 0 0px #FC3637'}
                                    >
                                      <img
                                        src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                                        alt={video.title}
                                        style={{
                                          width: '100%',
                                          aspectRatio: '16/9',
                                          objectFit: 'cover',
                                          display: 'block',
                                          filter: 'brightness(0.55) saturate(0.70)',
                                          transition: 'transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)'
                                        }}
                                        className="group-hover:scale-105"
                                      />
                                      <div
                                        style={{
                                          position: 'absolute',
                                          inset: 0,
                                          background: 'linear-gradient(to top, rgba(13,13,13,0.95) 0%, rgba(13,13,13,0.30) 55%, rgba(13,13,13,0.05) 100%)'
                                        }}
                                      />
                                      <div
                                        style={{
                                          position: 'absolute',
                                          top: '50%',
                                          left: '50%',
                                          transform: 'translate(-50%, -50%)',
                                          zIndex: 2
                                        }}
                                      >
                                        <div
                                          style={{
                                            width: '38px',
                                            height: '38px',
                                            borderRadius: '50%',
                                            background: B.crimson,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            transition: 'transform 0.3s ease, background-color 0.3s ease'
                                          }}
                                          className="group-hover:scale-112 group-hover:bg-white"
                                        >
                                          <Play
                                            size={13}
                                            fill={B.white}
                                            style={{
                                              color: B.white,
                                              marginLeft: '1px',
                                              transition: 'color 0.3s ease, fill 0.3s ease'
                                            }}
                                            className="group-hover:text-[#FC3637] group-hover:fill-[#FC3637]"
                                          />
                                        </div>
                                      </div>
                                      <div
                                        style={{
                                          position: 'absolute',
                                          bottom: 0,
                                          left: 0,
                                          right: 0,
                                          padding: '14px 16px',
                                          zIndex: 2
                                        }}
                                      >
                                        <h3
                                          style={{
                                            fontSize: '13px',
                                            fontWeight: 600,
                                            color: B.white,
                                            letterSpacing: '-0.02em',
                                            lineHeight: 1.3,
                                            margin: 0
                                          }}
                                        >
                                          {video.title}
                                        </h3>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })()}
                    </div>
                  )}

                  {/* Photo Gallery Block */}
                  <div style={{ marginTop: VIDEOS_BY_HONOREE[icon.id] && VIDEOS_BY_HONOREE[icon.id].length > 0 ? "56px" : "0" }}>
                    <div style={{ marginBottom: "32px" }}>
                      <span style={{
                        fontSize: "10px",
                        fontWeight: 800,
                        letterSpacing: "0.3em",
                        textTransform: "uppercase",
                        color: B.crimson,
                        display: "block",
                        marginBottom: "8px"
                      }}>
                        PHOTO GALLERY
                      </span>
                      <h3 style={{
                        fontSize: "clamp(24px, 3.5vw, 40px)",
                        fontWeight: 600,
                        color: B.white,
                        letterSpacing: "-0.03em",
                        margin: 0
                      }}>
                        Honouring {icon.name}
                      </h3>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {GALLERY_IMGS_BY_HONOREE[icon.id]?.map((imgUrl, imgIdx) => (
                        <motion.div
                          key={imgIdx}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: imgIdx * 0.05 }}
                          className="group cursor-pointer relative overflow-hidden aspect-video border border-white/5"
                          onClick={() => setLightboxImage(imgUrl)}
                        >
                          <img
                            src={imgUrl}
                            alt={`${icon.name} Tribute`}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            style={{ filter: "brightness(0.85) contrast(1.05)" }}
                          />
                          <div aria-hidden="true" style={{
                            position: "absolute",
                            inset: 0,
                            background: "rgba(252,54,55,0.15)",
                            mixBlendMode: "multiply",
                            opacity: 0,
                            transition: "opacity 0.3s ease"
                          }} className="group-hover:opacity-100" />
                          <div aria-hidden="true" style={{
                            position: "absolute",
                            inset: 0,
                            background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)",
                            pointerEvents: "none"
                          }} />
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ zIndex: 10 }}>
                            <div className="w-10 h-10 bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                              <ZoomIn size={16} className="text-white" />
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </React.Fragment>;
      })}

      {/* Divider */}
      <div style={{
        height: "1px",
        background: "rgba(255,255,255,0.05)",
        width: "100%"
      }} />
    </section>

    <Footer />

    {/* ── LIGHTBOX ─── */}
    <AnimatePresence>
      {lightboxImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
          style={{ background: "rgba(0,0,0,0.92)" }}
          onClick={() => setLightboxImage(null)}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-w-5xl w-full"
            onClick={e => e.stopPropagation()}
          >
            <img
              src={lightboxImage}
              alt="Tribute Gallery"
              className="w-full object-cover block"
              style={{ maxHeight: "82vh", objectFit: "contain", display: "block" }}
            />
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 w-10 h-10 bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors border-none cursor-pointer"
              aria-label="Close lightbox"
            >
              <X size={18} className="text-white" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>;
};
