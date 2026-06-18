export interface MovieDbMoviesResponse {
  page: number;
  results: Result[];
  total_pages: number;
  total_results: number;
  dates?: MovieDbDates;
}

export interface MovieDbDates {
  maximum: string;
  minimum: string;
}

export interface Result {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  softcore?: boolean;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
