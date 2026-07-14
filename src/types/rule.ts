export interface Rule {
    id: number;
    text: string;
    order: number;
    sub_category: number;
    sub_category_name: string;
}

export interface RuleState {
    rules: Rule[];
    selectedRule: Rule | null;

    loading: boolean;
    error: string | null;
}