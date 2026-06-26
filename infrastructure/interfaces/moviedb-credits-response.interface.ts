export interface MovieDbCreditsResponse {
  id: number;
  cast: MovieDbCastMember[];
  crew: MovieDbCrewMember[];
}

export interface MovieDbCastMember {
  id: number;
  name: string;
  original_name: string;
  character: string;
  profile_path: string | null;
  order: number;
  known_for_department: string;
  popularity: number;
  gender: number;
  adult: boolean;
  cast_id: number;
  credit_id: string;
}

export interface MovieDbCrewMember {
  id: number;
  name: string;
  original_name: string;
  job: string;
  department: string;
  profile_path: string | null;
  known_for_department: string;
  popularity: number;
  gender: number;
  adult: boolean;
  credit_id: string;
}
