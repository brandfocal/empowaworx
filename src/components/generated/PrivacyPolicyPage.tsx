import * as React from 'react';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { AfricaWatermark } from '../AfricaWatermark';

export const PrivacyPolicyPage = () => {
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
            <span className="block text-[#FC3637] text-[10px] font-black tracking-[0.3em] uppercase mb-4">LEGAL & COMPLIANCE</span>
            <h1 className="text-white font-semibold text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] tracking-tighter">
              Privacy Policy
            </h1>
            <p className="text-[#AAAAAA] text-[14px] md:text-[16px] font-light mt-6 max-w-xl leading-relaxed">
              Last Updated: June 21, 2026. EmpowaWorx™ is committed to protecting your privacy and ensuring your personal information is handled securely and responsibly.
            </p>
          </div>
          <AfricaWatermark className="absolute right-0 bottom-0 translate-x-[20%] translate-y-[20%] w-[50%] h-[120%] opacity-[0.03] text-white pointer-events-none" />
        </section>

        {/* Content Section */}
        <section className="py-16 md:py-28 bg-[#FFFFFF] px-6">
          <div className="max-w-4xl mx-auto flex flex-col gap-12 text-[#333333] leading-relaxed text-[15px]">
            
            <div className="flex flex-col gap-4">
              <h2 className="text-[#1E1E1E] font-semibold text-2xl tracking-tight border-l-2 border-[#FC3637] pl-4">1. Introduction</h2>
              <p>
                EmpowaWorx™ ("we", "us", or "our") respects your privacy and is committed to protecting it through compliance with this policy. This Privacy Policy describes the types of information we may collect from you or that you may provide when you visit our website, apply to join our Talent Network, or engage with our advisory services, and our practices for collecting, using, maintaining, protecting, and disclosing that information.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="text-[#1E1E1E] font-semibold text-2xl tracking-tight border-l-2 border-[#FC3637] pl-4">2. Information We Collect</h2>
              <p>
                We collect several types of information from and about users of our website, including:
              </p>
              <ul className="list-disc pl-6 flex flex-col gap-2">
                <li><strong>Personal Identity Information:</strong> Full name, job title, company name, industry, and country.</li>
                <li><strong>Contact Information:</strong> Email address, mobile phone number, and office telephone.</li>
                <li><strong>Professional Information:</strong> CV/Profile documents, portfolios, showreels, work samples, and LinkedIn profiles.</li>
                <li><strong>Technical Data:</strong> IP addresses, browser type, operating system, and routing data collected through cookies.</li>
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="text-[#1E1E1E] font-semibold text-2xl tracking-tight border-l-2 border-[#FC3637] pl-4">3. How We Use Your Information</h2>
              <p>
                We use information that we collect about you or that you provide to us:
              </p>
              <ul className="list-disc pl-6 flex flex-col gap-2">
                <li>To present our website, proprietary platforms, and their contents to you.</li>
                <li>To process and evaluate your applications to join the EmpowaWorx Talent Network.</li>
                <li>To contact you regarding relevant career, project, speaking, creator, or partnership opportunities.</li>
                <li>To provide you with information, products, or services that you request from us.</li>
                <li>To fulfill our obligations and enforce our rights arising from any contracts entered into between you and us.</li>
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="text-[#1E1E1E] font-semibold text-2xl tracking-tight border-l-2 border-[#FC3637] pl-4">4. POPIA and Data Protection Compliance</h2>
              <p>
                As a South African entity, EmpowaWorx™ complies with the Protection of Personal Information Act (POPIA). We implement appropriate technical, organizational, and security measures to prevent unauthorized access, loss, damage, or destruction of your personal data. We will not sell, rent, or trade your personal information to third parties.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="text-[#1E1E1E] font-semibold text-2xl tracking-tight border-l-2 border-[#FC3637] pl-4">5. Contact Information</h2>
              <p>
                To ask questions or comment about this privacy policy and our privacy practices, contact us at:
              </p>
              <p className="font-semibold text-[#1E1E1E]">
                EmpowaWorx™ Compliance Team<br />
                Email: info@empowaworx.co.za / privacy@empowaworx.co.za<br />
                Address: 364 Pine Avenue, Ferndale, Randburg, 2196
              </p>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
