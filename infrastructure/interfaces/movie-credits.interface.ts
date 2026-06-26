export interface Cast {
  id: number;
  name: string;
  character: string;
  profilePath: string;
}

export interface Crew {
  id: number;
  name: string;
  job: string;
  department: string;
  profilePath: string;
}

export interface MovieCredits {
  cast: Cast[];
  crew: Crew[];
}
