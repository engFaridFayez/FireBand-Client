import type { SubCategory } from "./subCategory";

export interface EventCategory{
    id:number;
    name:string;
    slug:string;
    image:string;
    description:string;
    subcategories: SubCategory[];
}

export interface CategoryState {
  categories: EventCategory[];
  selectedCategory: EventCategory | null;

  loading: boolean;
  error: string | null;
}