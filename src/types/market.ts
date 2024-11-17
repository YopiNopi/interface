export interface Market {
  id: string;
  question_text: string;
  description?: string;
  end_time: string;
  extra_info?: {
    token?: string;
  };
  yes_odds?: string;
  no_odds?: string;
  total_votes?: number;
} 