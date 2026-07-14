export interface DurationOption {
  id: number;

  title: string;
  minutes: number;

  sub_category: number;
  sub_category_name: string;
}

export interface DurationState {
  durations: DurationOption[];
  selectedDuration: DurationOption | null;

  loading: boolean;
  error: string | null;
}