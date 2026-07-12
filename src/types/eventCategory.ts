import type { SubCategory } from "./subCategory";

export interface EventCategory{
    id:number;
    name:string;
    slug:string;
    image:string;
    description:string;
    subcategories: SubCategory[];
}