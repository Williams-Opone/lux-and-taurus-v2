import { useEffect, useState } from 'react';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { Portfolio } from './components/Portfolio';
import { MethodBlock } from './components/MethodBlock';
import { PricingMatrix } from './components/PricingMatrix';
import { Estimator } from './components/InteractiveEstimator';
import { Comparison } from './components/Comparison';
import { Faq } from './components/FaqAccordion';
import { BookCall } from './components/BookCall';
import { BaseFooter } from './components/BaseFooter';
import { PrivacyPage, TermsPage } from './components/LegalPage';
import { AdminDashboard } from './components/AdminDashboard';
import { isBookRoute, isPrivacyRoute, isTermsRoute, isAdminRoute } from './router';

/* 🔁 YOUR LOGO LIVES HERE — replace src/assets/logo.png with any image
   (png / jpg / webp / ...) and update the filename below if it differs. */
import logoImg from './assets/landtlogo2.png';

export default function App() {
  const [route, setRoute] = useState(window.location.hash);

  useEffect(() => {
    const onHash = () => {
      setRoute(window.location.hash);
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  /* ---------- dedicated booking page ---------- */
  if (isBookRoute(route)) {
    return (
      <main className="min-h-screen bg-black">
        <BookCall />
        <BaseFooter />
      </main>
    );
  }
  if (isAdminRoute(route)) {
    return <main className="min-h-screen bg-black"><AdminDashboard /></main>;
  }
  /* ---------- legal pages ---------- */
  if (isPrivacyRoute(route)) {
    return (
      <main className="min-h-screen bg-black">
        <PrivacyPage />
        <BaseFooter />
      </main>
    );
  }
  if (isTermsRoute(route)) {
    return (
      <main className="min-h-screen bg-black">
        <TermsPage />
        <BaseFooter />
      </main>
    );
  }

  /* ---------- main site ---------- */
  return (
    <main className="min-h-screen bg-black pt-[96px]">
      <Nav logoSrc={logoImg} />
      <Hero />
      <Portfolio />
      <MethodBlock />
      <PricingMatrix />
      <Estimator />
      <Comparison />
      <Faq />
      <BaseFooter />
    </main>
  );
}
