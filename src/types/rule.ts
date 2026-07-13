export interface Rule {
    id: number;
    text: string;
    order: number;
}

export interface RuleState {
    rules: Rule[];
    selectedRule: Rule | null;

    loading: boolean;
    error: string | null;
}