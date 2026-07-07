/* ------------------------------------------------------------------ */
/*  API configuration — single source of truth for the Flask backend.  */
/*                                                                     */
/*  Your setup (from index.py):                                        */
/*   · LOCAL DEV: Flask runs at http://127.0.0.1:5000 (app.run),       */
/*     Vite runs at :5173 → cross-origin, CORS already allows          */
/*     http://localhost:5173 ✅                                        */
/*   · PRODUCTION (Vercel): Flask lives in api/ and is served on the   */
/*     SAME domain as the frontend (luxandtaurus.com/api/...) →        */
/*     relative paths, no CORS needed ✅                               */
/*                                                                     */
/*  This resolves automatically:                                       */
/*   · `npm run dev`   → http://127.0.0.1:5000                         */
/*   · `npm run build` → '' (same-origin relative /api/...)            */
/*  Override either with a .env file: VITE_API_URL=https://...         */
/* ------------------------------------------------------------------ */

export const API_BASE: string =
  (import.meta.env.VITE_API_URL as string | undefined) ||
  (import.meta.env.DEV ? 'http://127.0.0.1:5000' : '');
