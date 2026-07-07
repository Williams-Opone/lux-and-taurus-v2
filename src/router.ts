/* ------------------------------------------------------------------ */
/*  Micro hash-router — the site is a single-file build, so pages are  */
/*  driven by location.hash: ''/'#' → main site, '#/book' → booking.   */
/* ------------------------------------------------------------------ */

export const BOOK_ROUTE = '#/book';

/* booking intent — carried from pricing / estimator into the book page */
export type BookingIntent = {
  package?: string;   // 'Launch Sprint' | 'Core MVP' | 'Pro MVP'
  price?: number;     // finalized estimator quote
  duration?: string;  // 'SHIP IN 14 DAYS'
  scope?: string[];   // scoped feature list from the estimator
  building?: string;  // what they're building
  timeline?: string;  // how soon
};

const INTENT_KEY = 'lt_booking_intent';

export const goToBook = (intent?: BookingIntent) => {
  try {
    if (intent) sessionStorage.setItem(INTENT_KEY, JSON.stringify(intent));
    else sessionStorage.removeItem(INTENT_KEY);
  } catch { /* private mode — proceed without prefill */ }
  window.location.hash = BOOK_ROUTE;
};

export const readBookingIntent = (): BookingIntent | null => {
  try {
    const raw = sessionStorage.getItem(INTENT_KEY);
    return raw ? (JSON.parse(raw) as BookingIntent) : null;
  } catch {
    return null;
  }
};

export const goHome = () => {
  window.location.hash = '';
};

export const isBookRoute = (hash: string) => hash.startsWith(BOOK_ROUTE);

/* -------- legal pages -------- */
export const PRIVACY_ROUTE = '#/privacy';
export const TERMS_ROUTE = '#/terms';

export const isPrivacyRoute = (hash: string) => hash.startsWith(PRIVACY_ROUTE);
export const isTermsRoute = (hash: string) => hash.startsWith(TERMS_ROUTE);
/* -------- admin (unlisted — no links point here) -------- */
export const ADMIN_ROUTE = '#/admin';
export const isAdminRoute = (hash: string) => hash.startsWith(ADMIN_ROUTE);