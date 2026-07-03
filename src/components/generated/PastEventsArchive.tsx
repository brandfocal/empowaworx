import React, { useState, useRef, useMemo, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ArrowRight, X } from 'lucide-react';
import { cn } from '@/lib/utils';

// Brand Tokens
const COLORS = {
  RED: '#FC3637',
  DARK: '#0D0D0D',
  WHITE: '#FFFFFF'
};

// Global Styles Injection
const GLOBAL_STYLES = `
@keyframes ew-lightbox-in { 
  from { opacity: 0; transform: scale(0.92); } 
  to { opacity: 1; transform: scale(1); } 
}
`;

// Responsive Window Width Hook
function useWindowWidth() {
  const [width, setWidth] = useState(() => typeof window !== 'undefined' ? window.innerWidth : 1200);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return width;
}

// Types
interface ArchiveItem {
  id: string;
  src: string;
  size: 'sm' | 'md' | 'lg';
  platform: string;
}

// Data
const ARCHIVE_ITEMS: ArchiveItem[] = [
  {
    id: '1',
    src: '/ew_back_catalogue/empowa%20entrepreneurs/2023/2023%20flyer.jpg',
    size: 'sm',
    platform: 'EmpowaEntrepreneurs™'
  },
  {
    id: '2',
    src: '/ew_back_catalogue/empowa%20entrepreneurs/2023/2023%20flyer2.jpg',
    size: 'md',
    platform: 'EmpowaEntrepreneurs™'
  },
  {
    id: '3',
    src: '/ew_back_catalogue/empowa%20entrepreneurs/2024/invitation.jpg',
    size: 'lg',
    platform: 'EmpowaEntrepreneurs™'
  },
  {
    id: '4',
    src: '/ew_back_catalogue/empowamen/2023/save%20the%20date.jpg',
    size: 'md',
    platform: 'EmpowaMen™'
  },
  {
    id: '5',
    src: '/ew_back_catalogue/empowamen/2024/flyer3.jpg',
    size: 'sm',
    platform: 'EmpowaMen™'
  },
  {
    id: '6',
    src: '/ew_back_catalogue/empowamen/2024/postcard%20front.jpg',
    size: 'lg',
    platform: 'EmpowaMen™'
  },
  {
    id: '6',
    src: '/ew_back_catalogue/empowamen/2024/postcard%20front.jpg',
    size: 'lg',
    platform: 'EmpowaMen™'
  },
  {
    id: '7',
    src: '/ew_back_catalogue/empowamen/2025/invite2.jpg',
    size: 'md',
    platform: 'EmpowaMen™'
  },
  // EmpowaMen new items
  {
    id: 'men-new-1',
    src: '/empowamen/2019%20invite.jpg',
    size: 'md',
    platform: 'EmpowaMen™'
  },
  {
    id: 'men-new-2',
    src: '/empowamen/2020%20invite.jpg',
    size: 'sm',
    platform: 'EmpowaMen™'
  },
  {
    id: 'men-new-3',
    src: '/empowamen/2023%20invite.jpg',
    size: 'lg',
    platform: 'EmpowaMen™'
  },
  {
    id: 'men-new-4',
    src: '/empowamen/2024%20invite.jpg',
    size: 'md',
    platform: 'EmpowaMen™'
  },
  {
    id: 'men-new-5',
    src: '/empowamen/2024%20november%20invite.jpg',
    size: 'lg',
    platform: 'EmpowaMen™'
  },
  {
    id: 'men-new-6',
    src: '/empowamen/2024%20october%20flyer.jpg',
    size: 'sm',
    platform: 'EmpowaMen™'
  },
  {
    id: 'men-new-7',
    src: '/empowamen/2024%20whiskey%20invite.jpg',
    size: 'md',
    platform: 'EmpowaMen™'
  },
  {
    id: 'men-new-8',
    src: '/empowamen/2025%20invite2.jpg',
    size: 'lg',
    platform: 'EmpowaMen™'
  },
  {
    id: 'men-new-9',
    src: '/empowamen/2025%20invite3.jpg',
    size: 'sm',
    platform: 'EmpowaMen™'
  },
  {
    id: 'men-new-10',
    src: '/empowamen/2026%20invite.jpg',
    size: 'md',
    platform: 'EmpowaMen™'
  },
  {
    id: '8',
    src: '/ew_back_catalogue/empowawomen/2018/motheo%20invite.jpg',
    size: 'sm',
    platform: 'EmpowaWomen™'
  },
  {
    id: '9',
    src: '/ew_back_catalogue/empowawomen/2019/billion%20invite.jpg',
    size: 'lg',
    platform: 'EmpowaWomen™'
  },
  {
    id: '10',
    src: '/ew_back_catalogue/empowawomen/2021/women%20in%20energy/2021%20invite.jpg',
    size: 'md',
    platform: 'EmpowaWomen™'
  },
  {
    id: '11',
    src: '/ew_back_catalogue/empowawomen/2021/women%20in%20energy/invite.jpg',
    size: 'sm',
    platform: 'EmpowaWomen™'
  },
  {
    id: '12',
    src: '/ew_back_catalogue/empowawomen/2024/insta%20invite.jpg',
    size: 'lg',
    platform: 'EmpowaWomen™'
  },
  {
    id: '13',
    src: '/ew_back_catalogue/empowawomen/2024/invite.jpg',
    size: 'md',
    platform: 'EmpowaWomen™'
  },
  {
    id: '14',
    src: '/ew_back_catalogue/empowawomen/2024/media%20invite.jpg',
    size: 'sm',
    platform: 'EmpowaWomen™'
  },
  // EmpowaWomen new items
  {
    id: 'women-new-1',
    src: '/empowawomen/2023%20invite.jpg',
    size: 'md',
    platform: 'EmpowaWomen™'
  },
  {
    id: 'women-new-2',
    src: '/empowawomen/2024%20summit%20invite.jpg',
    size: 'lg',
    platform: 'EmpowaWomen™'
  },
  {
    id: 'women-new-3',
    src: '/empowawomen/2025%20invite.jpg',
    size: 'sm',
    platform: 'EmpowaWomen™'
  },
  {
    id: 'women-new-4',
    src: '/empowawomen/2026%20invite.jpg',
    size: 'md',
    platform: 'EmpowaWomen™'
  },
  {
    id: 'women-new-5',
    src: '/empowawomen/bubbles%20invite.jpg',
    size: 'lg',
    platform: 'EmpowaWomen™'
  },
  {
    id: 'women-new-6',
    src: '/empowawomen/wie%202022.jpg',
    size: 'sm',
    platform: 'EmpowaWomen™'
  },
  {
    id: 'women-new-7',
    src: '/empowawomen/wit%20mpumalanga%20invite.jpg',
    size: 'md',
    platform: 'EmpowaWomen™'
  },
  {
    id: 'women-new-8',
    src: '/empowawomen/wit%20rustenburg%20invite.jpg',
    size: 'lg',
    platform: 'EmpowaWomen™'
  },
  {
    id: '15',
    src: '/ew_back_catalogue/empowayouth/2019/2019%20youth%20postcard.jpg',
    size: 'lg',
    platform: 'EmpowaYouth™'
  },
  {
    id: '16',
    src: '/ew_back_catalogue/empowayouth/2019/2019%20youth%20poster%202.jpg',
    size: 'md',
    platform: 'EmpowaYouth™'
  },
  {
    id: '17',
    src: '/ew_back_catalogue/empowayouth/2020/gauteng%20invite.jpg',
    size: 'sm',
    platform: 'EmpowaYouth™'
  },
  {
    id: '18',
    src: '/ew_back_catalogue/empowayouth/2021/postcard%20back.jpg',
    size: 'lg',
    platform: 'EmpowaYouth™'
  },
  {
    id: '19',
    src: '/ew_back_catalogue/empowayouth/2022/A1%20poster.jpg',
    size: 'md',
    platform: 'EmpowaYouth™'
  },
  {
    id: '20',
    src: '/ew_back_catalogue/empowayouth/2024/final%20invite.jpg',
    size: 'sm',
    platform: 'EmpowaYouth™'
  },
  {
    id: '21',
    src: '/ew_back_catalogue/empowayouth/2024/freestate%20flyer4.jpg',
    size: 'lg',
    platform: 'EmpowaYouth™'
  },
  {
    id: '22',
    src: '/ew_back_catalogue/empowayouth/2024/wc%20media%20invite.jpg',
    size: 'md',
    platform: 'EmpowaYouth™'
  },
  // EmpowaYouth new items
  {
    id: 'youth-new-1',
    src: '/empowayouth/2019%20invite.jpg',
    size: 'md',
    platform: 'EmpowaYouth™'
  },
  {
    id: 'youth-new-2',
    src: '/empowayouth/2020%20invite.jpg',
    size: 'lg',
    platform: 'EmpowaYouth™'
  },
  {
    id: 'youth-new-3',
    src: '/empowayouth/20204%20bbk%20invite.jpg',
    size: 'sm',
    platform: 'EmpowaYouth™'
  },
  {
    id: 'youth-new-4',
    src: '/empowayouth/2023%20invite.jpg',
    size: 'md',
    platform: 'EmpowaYouth™'
  },
  {
    id: 'youth-new-5',
    src: '/empowayouth/2023%20invite2.jpg',
    size: 'lg',
    platform: 'EmpowaYouth™'
  },
  {
    id: 'youth-new-6',
    src: '/empowayouth/2023%20mpumalanga%20invite.jpg',
    size: 'sm',
    platform: 'EmpowaYouth™'
  },
  {
    id: 'youth-new-7',
    src: '/empowayouth/2023%20norther%20cape%20invite.jpg',
    size: 'md',
    platform: 'EmpowaYouth™'
  },
  {
    id: 'youth-new-8',
    src: '/empowayouth/2023%20orange%20farm%20invite.jpg',
    size: 'lg',
    platform: 'EmpowaYouth™'
  },
  {
    id: 'youth-new-9',
    src: '/empowayouth/2024%20fp%26mseta%20invite.jpg',
    size: 'sm',
    platform: 'EmpowaYouth™'
  },
  {
    id: 'youth-new-10',
    src: '/empowayouth/2024%20freestate%20invite.jpg',
    size: 'md',
    platform: 'EmpowaYouth™'
  },
  {
    id: 'youth-new-11',
    src: '/empowayouth/2024%20nw%20banner.jpg',
    size: 'lg',
    platform: 'EmpowaYouth™'
  },
  {
    id: 'youth-new-12',
    src: '/empowayouth/2024%20vaal%20invite.jpg',
    size: 'sm',
    platform: 'EmpowaYouth™'
  },
  {
    id: 'youth-new-13',
    src: '/empowayouth/2024%20wc%20invite.jpg',
    size: 'md',
    platform: 'EmpowaYouth™'
  },
  {
    id: 'youth-new-14',
    src: '/empowayouth/ekurhuleni%20flyer.jpg',
    size: 'lg',
    platform: 'EmpowaYouth™'
  },
  {
    id: '23',
    src: '/speakers-firm-roundtable/speakers%20firm/speakers%20firm/roundtable/invite3.jpg',
    size: 'sm',
    platform: 'The Speakers Firm™'
  },
  {
    id: '24',
    src: '/speakers-firm-roundtable/speakers%20firm/speakers%20firm/roundtable/lincoln.jpg',
    size: 'md',
    platform: 'The Speakers Firm™'
  },
  {
    id: '25',
    src: '/speakers-firm-roundtable/speakers%20firm/speakers%20firm/roundtable/mmamoloko.jpg',
    size: 'lg',
    platform: 'The Speakers Firm™'
  },
  {
    id: '26',
    src: '/speakers-firm-roundtable/speakers%20firm/speakers%20firm/roundtable/mohale.jpg',
    size: 'sm',
    platform: 'The Speakers Firm™'
  },
  {
    id: '27',
    src: '/ew_back_catalogue/ulp/2018/JPEG/barend.jpg',
    size: 'lg',
    platform: 'ULP'
  },
  {
    id: '28',
    src: '/ew_back_catalogue/ulp/2018/JPEG/mpho%20makwana.jpg',
    size: 'md',
    platform: 'ULP'
  },
  {
    id: 'ulp1',
    src: '/ULP/ULP1.jpg',
    size: 'sm',
    platform: 'ULP'
  },
  {
    id: 'ulp2',
    src: '/ULP/ULP2.jpg',
    size: 'md',
    platform: 'ULP'
  },
  {
    id: 'ulp3',
    src: '/ULP/ULP3.jpg',
    size: 'lg',
    platform: 'ULP'
  },
  {
    id: 'ulp4',
    src: '/ULP/ULP4.jpg',
    size: 'md',
    platform: 'ULP'
  },
  {
    id: '31',
    src: '/speakers-firm-roundtable/speakers%20firm/speakers%20firm/roundtable/mzamo.jpg',
    size: 'md',
    platform: 'The Speakers Firm™'
  },
  {
    id: '32',
    src: '/speakers-firm-roundtable/speakers%20firm/speakers%20firm/roundtable/nozipho2.jpg',
    size: 'lg',
    platform: 'The Speakers Firm™'
  },
  {
    id: '33',
    src: '/speakers-firm-roundtable/speakers%20firm/speakers%20firm/roundtable/reuel2.jpg',
    size: 'sm',
    platform: 'The Speakers Firm™'
  },
  {
    id: '34',
    src: '/speakers-firm-roundtable/speakers%20firm/speakers%20firm/roundtable/siphiwe%20invite.jpg',
    size: 'md',
    platform: 'The Speakers Firm™'
  },
  {
    id: '35',
    src: '/speakers-firm-roundtable/speakers%20firm/speakers%20firm/roundtable/thebe.jpg',
    size: 'lg',
    platform: 'The Speakers Firm™'
  },
  {
    id: '36',
    src: '/speakers-firm-roundtable/speakers%20firm/speakers%20firm/roundtable/tinyiko.jpg',
    size: 'md',
    platform: 'The Speakers Firm™'
  }
];

const Lightbox = ({
  src,
  onClose
}: {
  src: string;
  onClose: () => void;
}) => {
  if (!src) return null;
  return <div className="fixed inset-0 z-[9999] bg-black/92 flex items-center justify-center p-4 cursor-zoom-out" onClick={onClose}>
      <button onClick={e => {
      e.stopPropagation();
      onClose();
    }} className="absolute top-8 right-8 text-white p-2 hover:bg-white/10 transition-colors rounded-full">
        <X size={32} />
      </button>
      <img src={src} alt="Event Archive Detail" className="max-w-[90vw] max-h-[85vh] object-contain select-none" style={{
      animation: 'ew-lightbox-in 0.4s ease-out forwards'
    }} onClick={e => e.stopPropagation()} />
    </div>;
};

export const PastEventsArchive = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, {
    once: true,
    amount: 0.15
  });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<string>('All');
  const [visibleCount, setVisibleCount] = useState<number>(12);
  
  const width = useWindowWidth();
  const colsCount = width >= 1024 ? 4 : width >= 768 ? 3 : width >= 640 ? 2 : 1;

  const PLATFORMS = [
    'All',
    'EmpowaWomen™',
    'EmpowaYouth™',
    'EmpowaEntrepreneurs™',
    'EmpowaMen™',
    'The Speakers Firm™',
    'ULP'
  ];

  useEffect(() => {
    setVisibleCount(12);
  }, [selectedPlatform]);

  const filteredItems = useMemo(() => {
    return selectedPlatform === 'All'
      ? ARCHIVE_ITEMS
      : ARCHIVE_ITEMS.filter(item => item.platform === selectedPlatform);
  }, [selectedPlatform]);

  const displayedItems = useMemo(() => {
    return filteredItems.slice(0, visibleCount);
  }, [filteredItems, visibleCount]);

  // Dynamically distribute filtered items across stable columns for a smooth layout animation
  const columns = useMemo(() => {
    const cols: ArchiveItem[][] = Array.from({ length: colsCount }, () => []);
    displayedItems.forEach((item, index) => {
      cols[index % colsCount].push(item);
    });
    return cols;
  }, [displayedItems, colsCount]);

  return <section style={{
    backgroundColor: COLORS.DARK,
    borderTop: `3px solid ${COLORS.RED}`,
    padding: 'clamp(48px, 8vw, 100px) 0' // Set horizontal padding to 0 for fullwidth look
  }} className="w-full overflow-hidden min-h-screen flex flex-col">
      <style>{GLOBAL_STYLES}</style>
      
      <motion.div ref={containerRef} initial={{
      opacity: 0,
      y: 30
    }} animate={isInView ? {
      opacity: 1,
      y: 0
    } : {}} transition={{
      duration: 0.8,
      ease: "easeOut"
    }} className="w-full flex-1 flex flex-col justify-center">
        {/* Header Section */}
        <div className="flex flex-col mb-12 px-6 sm:px-12 md:px-24 w-full">
          <span style={{
          color: COLORS.RED,
          letterSpacing: '0.22em'
        }} className="text-[11px] font-semibold uppercase mb-4">
            Our History
          </span>
          
          <h2 className="font-semibold leading-none tracking-[-0.04em] mb-8" style={{
          fontSize: 'clamp(1.7rem, 4.5vw, 3.5rem)'
        }}>
            <div className="text-white">Past Events</div>
            <div style={{
            color: 'rgba(255,255,255,0.22)'
          }}>Archive</div>
          </h2>

          <p className="max-w-[500px] mb-10" style={{
          color: 'rgba(255,255,255,0.48)',
          fontSize: 'clamp(14px, 1.4vw, 16px)',
          lineHeight: 1.75
        }}>
            Explore our legacy of high-impact summits, awards galas, and executive forums that have shaped Africa's leadership landscape over the years.
          </p>

          {/* Platform Segment Tabs */}
          <div style={{
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
            scrollbarWidth: 'none',
            paddingBottom: '12px',
            marginBottom: '24px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            width: '100%'
          }} className="scrollbar-hide">
            {PLATFORMS.map(platform => {
              const isActive = selectedPlatform === platform;
              return (
                <button
                  key={platform}
                  onClick={() => setSelectedPlatform(platform)}
                  style={{
                    position: 'relative',
                    background: 'transparent',
                    border: isActive ? `1px solid ${COLORS.RED}` : '1px solid rgba(255, 255, 255, 0.08)',
                    color: isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.60)',
                    padding: '8px 16px',
                    fontSize: '11px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    cursor: 'pointer',
                    borderRadius: '9999px',
                    whiteSpace: 'nowrap',
                    transition: 'color 0.25s ease, border-color 0.25s ease',
                  }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activePlatformTab"
                      style={{
                        position: 'absolute',
                        inset: -1,
                        background: COLORS.RED,
                        borderRadius: '9999px',
                        zIndex: -1,
                        boxShadow: '0 4px 12px rgba(252, 54, 55, 0.25)'
                      }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span style={{ position: 'relative', zIndex: 1 }}>
                    {platform.replace('™', '')}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center group cursor-pointer w-fit">
            <span className="text-white font-bold uppercase mr-4 border-b-2 pb-[3px] transition-colors" style={{
            borderColor: COLORS.RED,
            fontSize: '12px',
            letterSpacing: '0.18em'
          }}>
              Browse Past Events Archive
            </span>
            <div style={{
            backgroundColor: COLORS.RED
          }} className="w-8 h-8 flex items-center justify-center group-hover:translate-x-1 transition-transform duration-300">
              <ArrowRight size={14} color="white" />
            </div>
          </div>
        </div>

        {/* Full-width Masonry Gallery Grid */}
        <div style={{ width: '100%', padding: '0 clamp(16px, 4vw, 48px)' }}>
          <div 
            className="grid gap-4"
            style={{
              gridTemplateColumns: `repeat(${colsCount}, 1fr)`
            }}
          >
            {columns.map((col, colIdx) => (
              <div key={colIdx} className="flex flex-col gap-4">
                <AnimatePresence mode="popLayout">
                  {col.map((item) => (
                    <motion.div
                      layout
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.92, y: 15 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.92, y: 15 }}
                      transition={{ 
                        duration: 0.5, 
                        ease: [0.16, 1, 0.3, 1]
                      }}
                      onClick={() => setSelectedImage(item.src)}
                      className="relative overflow-hidden bg-black/40 border border-white/5 cursor-zoom-in group rounded-[2px]"
                      style={{
                        display: 'block',
                        width: '100%'
                      }}
                    >
                      <img
                        src={item.src}
                        alt="Past Event Archive"
                        className="w-full h-auto object-contain block transition-transform duration-700"
                      />
                      {/* Overlay on hover to display platform indicator */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <span className="text-[10px] font-black tracking-widest text-[#FC3637] uppercase bg-[#0D0D0D] px-2.5 py-1.5 border-l-2 border-[#FC3637]">
                          {item.platform.replace('™', '')}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {visibleCount < filteredItems.length && (
            <div className="flex justify-center mt-12 w-full">
              <button
                onClick={() => setVisibleCount(prev => prev + 12)}
                className="group relative px-8 py-3.5 border border-[#FC3637] text-white text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:bg-[#FC3637] cursor-pointer"
              >
                Show More
              </button>
            </div>
          )}
          
          {filteredItems.length === 0 && (
            <div style={{
              padding: '80px 24px',
              textAlign: 'center',
              border: '1px dashed rgba(255, 255, 255, 0.15)',
              background: 'rgba(255, 255, 255, 0.01)',
              color: 'rgba(255, 255, 255, 0.35)',
              marginTop: '16px',
              width: '100%'
            }}>
              <p style={{ fontSize: '15px', fontWeight: 500, margin: 0 }}>
                No archived events found for this category.
              </p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Lightbox */}
      <Lightbox src={selectedImage || ''} onClose={() => setSelectedImage(null)} />
    </section>;
};
