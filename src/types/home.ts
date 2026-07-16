export interface Show {
    id:number;
    title:string;
    city:string;
    location:string;
    date:string;
    tag:string;
    image:string;
}

export interface Team {
    id:number;
    name:string;
    role:string;
    accent:string;
    image:string;
    order:number;
}

export interface GalleryImage {
  id: number;
  sub_category: number;
  image: string;
  title: string;
  order: number;
  is_active: boolean;
  created_at: string;
}

export interface Reel {
  id: number;
  sub_category: number;
  title: string;
  thumbnail: string | null;
  platform: "youtube" | "instagram" | "facebook" | "tiktok";
  platform_display: string;
  embed_url: string;
  order: number;
  is_active: boolean;
  created_at: string;
}