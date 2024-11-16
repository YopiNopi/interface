export interface Market {
  id: string;
  question_text: string;
  description?: string;
  end_time: number;
  trading_end_time: number;
  outcomes: string[];
  extra_info?: {
    token?: string;
    uniswapv2_pair?: string;
    price_timestamp?: number;
    target_price?: string;
  };
} 