import React, { Suspense, lazy } from 'react';
import { Theme } from './settings/types';

const EmpowaWorxHomePage = lazy(() => import('./components/generated/EmpowaWorxHomePage').then(m => ({ default: m.EmpowaWorxHomePage })));
const ProprietaryPlatformsPage = lazy(() => import('./components/generated/ProprietaryPlatforms').then(m => ({ default: m.ProprietaryPlatformsPage })));
const WhoWeArePage = lazy(() => import('./components/generated/WhoWeArePage').then(m => ({ default: m.WhoWeArePage })));
const StrategicCommunicationsPage = lazy(() => import('./components/generated/StrategicCommunicationsPage').then(m => ({ default: m.StrategicCommunicationsPage })));
const BrandExperiencePage = lazy(() => import('./components/generated/BrandExperiencePage').then(m => ({ default: m.BrandExperiencePage })));
const MediaGalleryPage = lazy(() => import('./components/generated/MediaGalleryPage').then(m => ({ default: m.MediaGalleryPage })));
const LegacyEventsPage = lazy(() => import('./components/generated/LegacyEventsPage').then(m => ({ default: m.LegacyEventsPage })));
const CareersPage = lazy(() => import('./components/generated/CareersPage').then(m => ({ default: m.CareersPage })));
const UpcomingEventsPage = lazy(() => import('./components/generated/UpcomingEventsPage').then(m => ({ default: m.UpcomingEventsPage })));
const ESGAdvisoryPage = lazy(() => import('./components/generated/ESGAdvisoryPage').then(m => ({ default: m.ESGAdvisoryPage })));
const DigitalMarketingPage = lazy(() => import('./components/generated/DigitalMarketingPage').then(m => ({ default: m.DigitalMarketingPage })));
const ExecutiveInfluencePage = lazy(() => import('./components/generated/ExecutiveInfluencePage').then(m => ({ default: m.ExecutiveInfluencePage })));
const InfluencerMarketingPage = lazy(() => import('./components/generated/InfluencerMarketingPage').then(m => ({ default: m.InfluencerMarketingPage })));
const EcosystemBuildingPage = lazy(() => import('./components/generated/EcosystemBuildingPage').then(m => ({ default: m.EcosystemBuildingPage })));
const MarketingBrandAdvertisingPage = lazy(() => import('./components/generated/MarketingBrandAdvertisingPage').then(m => ({ default: m.MarketingBrandAdvertisingPage })));
const TrustReputationPage = lazy(() => import('./components/generated/TrustReputationPage').then(m => ({ default: m.TrustReputationPage })));
const ContactUsPage = lazy(() => import('./components/generated/ContactUsPage').then(m => ({ default: m.ContactUsPage })));
const PrivacyPolicyPage = lazy(() => import('./components/generated/PrivacyPolicyPage').then(m => ({ default: m.PrivacyPolicyPage })));
const TermsPage = lazy(() => import('./components/generated/TermsPage').then(m => ({ default: m.TermsPage })));

let theme: Theme = 'light';

const LoadingFallback = () => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#0D0D0D',
    color: '#FFFFFF',
    fontFamily: 'Inter, sans-serif'
  }}>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
      <div style={{
        width: '40px',
        height: '40px',
        border: '3px solid rgba(255, 255, 255, 0.05)',
        borderTop: '3px solid #FC3637',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }} />
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>
        Loading
      </span>
    </div>
  </div>
);

function App() {
  const [currentPath, setCurrentPath] = React.useState(window.location.pathname || '/');

  React.useEffect(() => {
    let prevPath = window.location.pathname || '/';

    const handleLocationChange = () => {
      const newPath = window.location.pathname || '/';
      setCurrentPath(newPath);

      // Base paths representing distinct pages
      const basePaths = [
        '/platforms',
        '/about',
        '/advisory-trust',
        '/advisory-marketing',
        '/advisory-comms',
        '/advisory-brand',
        '/advisory-esg',
        '/advisory-digital',
        '/advisory-influencer',
        '/advisory-influence',
        '/advisory-ecosystem',
        '/gallery',
        '/legacy',
        '/careers',
        '/upcoming',
        '/contact',
        '/privacy',
        '/terms'
      ];
      const getPageBase = (path: string) => basePaths.find(base => path.startsWith(base)) || '/';

      // Only scroll to top if we switched base pages
      if (getPageBase(newPath) !== getPageBase(prevPath)) {
        window.scrollTo(0, 0);
      }
      prevPath = newPath;
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('pushstate-changed', handleLocationChange);

    // Global click listener to intercept clean path internal navigations
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (
        anchor &&
        anchor.href &&
        anchor.host === window.location.host &&
        !anchor.getAttribute('download') &&
        anchor.getAttribute('target') !== '_blank'
      ) {
        const path = anchor.pathname;
        const hash = anchor.hash;
        
        // If it starts with # (hash-only like in-page scroll links), let the browser handle it locally
        if (anchor.getAttribute('href')?.startsWith('#')) {
          return;
        }

        e.preventDefault();
        window.history.pushState({}, '', path + hash);
        window.dispatchEvent(new Event('pushstate-changed'));
        
        // Handle scroll to element if hash is present
        if (hash) {
          setTimeout(() => {
            const el = document.getElementById(hash.slice(1));
            if (el) {
              el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 50);
        }
      }
    };

    document.addEventListener('click', handleGlobalClick);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('pushstate-changed', handleLocationChange);
      document.removeEventListener('click', handleGlobalClick);
    };
  }, []);

  function setTheme(theme: Theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  setTheme(theme);

  return (
    <div className="w-full min-h-screen">
      {/* JSON-LD Structured Data Schema for AEO/SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "EmpowaWorx",
          "url": "https://www.empowaworx.co.za",
          "logo": "https://www.empowaworx.co.za/logo/Empowaworx-logo-png-bigger.png",
          "description": "Africa's leading growth, reputation, influence, and impact advisory firm.",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "364 Pine Avenue, Ferndale",
            "addressLocality": "Randburg",
            "postalCode": "2196",
            "addressCountry": "ZA"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+27-11-482-7210",
            "contactType": "customer service",
            "email": "info@empowaworx.co.za"
          }
        })}
      </script>

      <Suspense fallback={<LoadingFallback />}>
        {currentPath.startsWith('/platforms') ? (
          <ProprietaryPlatformsPage />
        ) : currentPath.startsWith('/about') ? (
          <WhoWeArePage />
        ) : currentPath.startsWith('/advisory-trust') ? (
          <TrustReputationPage />
        ) : currentPath.startsWith('/advisory-marketing') ? (
          <MarketingBrandAdvertisingPage />
        ) : currentPath.startsWith('/advisory-comms') ? (
          <StrategicCommunicationsPage />
        ) : currentPath.startsWith('/advisory-brand') ? (
          <BrandExperiencePage />
        ) : currentPath.startsWith('/advisory-esg') ? (
          <ESGAdvisoryPage />
        ) : currentPath.startsWith('/advisory-digital') ? (
          <DigitalMarketingPage />
        ) : currentPath.startsWith('/advisory-influencer') ? (
          <InfluencerMarketingPage />
        ) : currentPath.startsWith('/advisory-influence') ? (
          <ExecutiveInfluencePage />
        ) : currentPath.startsWith('/advisory-ecosystem') ? (
          <EcosystemBuildingPage />
        ) : currentPath.startsWith('/gallery') ? (
          <MediaGalleryPage />
        ) : currentPath.startsWith('/legacy') ? (
          <LegacyEventsPage />
        ) : currentPath.startsWith('/careers') ? (
          <CareersPage />
        ) : currentPath.startsWith('/upcoming') ? (
          <UpcomingEventsPage />
        ) : currentPath.startsWith('/contact') ? (
          <ContactUsPage />
        ) : currentPath.startsWith('/privacy') ? (
          <PrivacyPolicyPage />
        ) : currentPath.startsWith('/terms') ? (
          <TermsPage />
        ) : (
          <EmpowaWorxHomePage />
        )}
      </Suspense>
    </div>
  );
}

export default App;

