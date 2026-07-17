import type { DurationOption } from "./duration";
import type { EventCategory } from "./eventCategory";
import type { Rule } from "./rule";

export interface SubCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;

  category: number;

  min_members: number;
  max_members: number;
  is_custom: boolean;
  rules: Rule[];
  duration: DurationOption[];
}

export interface SubCategoryState {
  subCategories: SubCategory[];
  selectedSubCategory: SubCategory | null;

  loading: boolean;
  error: string | null;
}