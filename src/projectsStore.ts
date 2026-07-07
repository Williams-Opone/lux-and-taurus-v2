import { API_BASE } from './config';

/* ------------------------------------------------------------------ */
/*  Projects store v2 — subscription-based, cold-start resilient.      */
/*                                                                     */
/*  Why v1 made things worse: the eager fetch hit the backend even     */
/*  colder, its 3 retries burned out in ~3s of fast 502s, and the      */
/*  one-shot promise never tried again for the whole session.          */
/*                                                                     */
/*  v2:                                                                */
/*   · long retry campaign: 6 attempts over ~30s (real cold starts     */
/*     on Vercel+Neon can take 10s+) with 10s timeout per attempt      */
/*   · restartable: Portfolio re-triggers a campaign on mount if the   */
/*     eager one already failed — no more "gave up forever"            */
/*   · subscription API: components get data whenever it lands, even   */
/*     minutes later                                                   */
/*   · localStorage cache: repeat visits render real projects          */
/*     instantly, refresh silently in background                       */
/*   · auto-retry when the browser comes back online                   */
/* ------------------------------------------------------------------ */

export type ApiProject = {
  id: number;
  title: string;
  description: string;
  tech_stack: string;
  live_link: string;
  image_url: string;
};

const CACHE_KEY = 'lt_projects_v1';

/* ----------------------------- cache ----------------------------- */

export const readProjectsCache = (): ApiProject[] | null => {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : null;
  } catch {
    return null;
  }
};

const writeProjectsCache = (projects: ApiProject[]) => {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(projects));
  } catch {
    /* best-effort */
  }
};

/* ------------------------------ store ------------------------------ */

type Listener = (projects: ApiProject[]) => void;

let data: ApiProject[] | null = null;
let listeners: Listener[] = [];
let campaignRunning = false;
let campaignSucceeded = false;

const notify = () => {
  if (data) listeners.forEach((l) => l(data!));
};

/** Subscribe to project data. Fires immediately if data already
    arrived; fires later whenever it lands. Returns unsubscribe. */
export const subscribeProjects = (cb: Listener): (() => void) => {
  listeners.push(cb);
  if (data) cb(data);
  return () => {
    listeners = listeners.filter((l) => l !== cb);
  };
};

/* ------------------------- fetch machinery ------------------------- */

const attempt = async (timeoutMs: number): Promise<ApiProject[]> => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(`${API_BASE}/api/projects`, { signal: controller.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    if (!Array.isArray(json) || json.length === 0) throw new Error('empty payload');
    return json as ApiProject[];
  } finally {
    clearTimeout(timer);
  }
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/* 6 attempts spread over ~30s — enough for the worst cold starts */
const DELAYS = [0, 1000, 2500, 5000, 8000, 13000];

const runCampaign = async () => {
  if (campaignRunning || campaignSucceeded) return;
  campaignRunning = true;
  try {
    for (const delay of DELAYS) {
      if (delay) await sleep(delay);
      try {
        const projects = await attempt(10000);
        data = projects;
        campaignSucceeded = true;
        writeProjectsCache(projects);
        notify();
        return;
      } catch {
        /* next attempt */
      }
    }
  } finally {
    campaignRunning = false;
  }
};

/** Idempotent kick. Called eagerly at module load AND by Portfolio on
    mount — if the eager campaign already failed, this starts a new one
    instead of giving up forever (the v1 bug). */
export const ensureProjectsFetch = () => {
  void runCampaign();
};

/* eager start — overlaps the network wait with the hero animation */
ensureProjectsFetch();

/* if the user was offline / flaky connection, try again when back */
if (typeof window !== 'undefined') {
  window.addEventListener('online', ensureProjectsFetch);
}
