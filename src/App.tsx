import { useEffect, useState } from 'react';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { Portfolio } from './components/Portfolio';
import { MethodBlock } from './components/MethodBlock';
import { DailyProof } from './components/DailyProof';
import { PricingMatrix } from './components/PricingMatrix';
import { Estimator } from './components/InteractiveEstimator';
import { Comparison } from './components/Comparison';
import { Faq } from './components/FaqAccordion';
import { BookCall } from './components/BookCall';
import { BaseFooter } from './components/BaseFooter';
import { PrivacyPage, TermsPage } from './components/LegalPage';
import { AdminDashboard } from './components/AdminDashboard';
import { NotFoundPage, ServerErrorPage, ForbiddenPage } from './components/ErrorPage';
import {
  isBookRoute,
  isPrivacyRoute,
  isTermsRoute,
  isAdminRoute,
  isError500Route,
  isError403Route,
  isUnknownRoute,
} from './router';

/* 🔁 YOUR LOGO LIVES HERE — replace src/assets/logo.png with any image
   (png / jpg / webp / ...) and update the filename below if it differs. */
import logoImg from './assets/landtnoblogo.png';

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

  /* ---------- admin (unlisted) ---------- */
  if (isAdminRoute(route)) {
    return (
      <main className="min-h-screen bg-black">
        <AdminDashboard />
      </main>
    );
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

  /* ---------- error pages ---------- */
  if (isError500Route(route)) {
    return <main className="min-h-screen bg-black"><ServerErrorPage /></main>;
  }
  if (isError403Route(route)) {
    return <main className="min-h-screen bg-black"><ForbiddenPage /></main>;
  }
  /* unknown '#/...' routes → 404 (must be the LAST route check) */
  if (isUnknownRoute(route)) {
    return <main className="min-h-screen bg-black"><NotFoundPage /></main>;
  }

  /* ---------- main site ----------
     HYBRID responsive strategy:
     · Hero / Pricing / Estimator / Comparison / Footer reflow
       NATIVELY — full-size readable text and tappable controls on
       mobile (these are the conversion-critical sections).
     · Portfolio / Method / FAQ keep their exact pipeline geometry
       via their own internal ScaleFrames (with minScale floors so
       they never shrink into unreadability).
     · The root-link spine renders at 3.5px in native sections and
       scales modestly in framed ones — visually continuous. */
  return (
    <main className="min-h-screen bg-black pt-[96px]">
      <Nav logoSrc={logoImg} />
      <Hero />
      <Portfolio />
      <MethodBlock />
      <DailyProof />
      <PricingMatrix />
      <Estimator />
      <Comparison />
      <Faq />
      <BaseFooter />
    </main>
  );
}
