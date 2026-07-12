import type { DurationOption } from "./duration";
import type { Rule } from "./rule";

export interface SubCategory {
    id: number;
    name: string;
    slug: string;
    description: string;
    image: string;

    min_members: number;
    max_members: number;

    rules: Rule[];
    duration: DurationOption[];
}