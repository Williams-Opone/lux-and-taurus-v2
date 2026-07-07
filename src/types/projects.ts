export interface DBProject {
    id: number | string;
    title: string;
    subtitle?: string;
    badge?: string;
    description: string;
    tech_stack: string | string[];
    live_link: string;
    image_url?: string;
    metrics?: string;
    quote?: string;
    author?: string;
  }