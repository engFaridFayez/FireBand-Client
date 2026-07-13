export interface DurationOption {
    id: number;
    title: string;
    minutes: number;
}


export interface DurationState {
  durations: DurationOption[];
  selectedDuration: DurationOption | null;

  loading: boolean;
  error: string | null;
}