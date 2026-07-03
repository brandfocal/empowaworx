import * as React from 'react';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { AfricaWatermark } from '../AfricaWatermark';

export const TermsPage = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-[#FFFFFF] overflow-x-hidden font-sans text-[#1E1E1E] selection:bg-[#FC3637] selection:text-white">
      {/* Film grain overlay */}
      <div aria-hidden="true" style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9999,
        opacity: 0.035,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '200px 200px'
      }} />

      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-[#111111] overflow-hidden flex items-center">
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 pointer-events-none" />
          <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12">
            <span className="block text-[#FC3637] text-[10px] font-black tracking-[0.3em] uppercase mb-4">TERMS of SERVICE</span>
            <h1 className="text-white font-semibold text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] tracking-tighter">
              Terms & Conditions
            </h1>
            <p className="text-[#AAAAAA] text-[14px] md:text-[16px] font-light mt-6 max-w-xl leading-relaxed">
              Last Updated: June 21, 2026. Please read these terms carefully before accessing or using the advisory platforms and websites of EmpowaWorx™.
            </p>
          </div>
          <AfricaWatermark className="absolute right-0 bottom-0 translate-x-[20%] translate-y-[20%] w-[50%] h-[120%] opacity-[0.03] text-white pointer-events-none" />
        </section>

        {/* Content Section */}
        <section className="py-16 md:py-28 bg-[#FFFFFF] px-6">
          <div className="max-w-4xl mx-auto flex flex-col gap-12 text-[#333333] leading-relaxed text-[15px]">
            
            <div className="flex flex-col gap-4">
              <h2 className="text-[#1E1E1E] font-semibold text-2xl tracking-tight border-l-2 border-[#FC3637] pl-4">1. Agreement to Terms</h2>
              <p>
                By accessing or using the website of EmpowaWorx™ ("we", "us", or "our"), you agree to be bound by these Terms & Conditions and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this website are protected by applicable copyright and trademark law.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="text-[#1E1E1E] font-semibold text-2xl tracking-tight border-l-2 border-[#FC3637] pl-4">2. Intellectual Property Rights</h2>
              <p>
                Unless otherwise indicated, the site and its design, source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="text-[#1E1E1E] font-semibold text-2xl tracking-tight border-l-2 border-[#FC3637] pl-4">3. User Representation</h2>
              <p>
                By using the site, including submitting forms to join our Talent Network or request advisory support, you represent and warrant that:
              </p>
              <ul className="list-disc pl-6 flex flex-col gap-2">
                <li>All registration or application information you submit will be true, accurate, current, and complete.</li>
                <li>You will maintain the accuracy of such information and promptly update it as necessary.</li>
                <li>You have the legal capacity and agree to comply with these Terms & Conditions.</li>
                <li>You will not use the site for any illegal or unauthorized purpose.</li>
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="text-[#1E1E1E] font-semibold text-2xl tracking-tight border-l-2 border-[#FC3637] pl-4">4. Limitation of Liability</h2>
              <p>
                In no event shall EmpowaWorx™ or its directors, employees, or partners be liable for any direct, indirect, incidental, special, or consequential damages whatsoever resulting from your use of the site, our advisory services, or the content provided herein.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="text-[#1E1E1E] font-semibold text-2xl tracking-tight border-l-2 border-[#FC3637] pl-4">5. Governing Law</h2>
              <p>
                These terms and conditions are governed by and construed in accordance with the laws of the Republic of South Africa, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
              </p>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
