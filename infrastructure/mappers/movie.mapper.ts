import type { Movie, MovieDetails } from "../interfaces/movie.interface";
import type { Cast, Crew, MovieCredits } from "../interfaces/movie-credits.interface";
import type { MovieDbMovieDetailResponse, Result } from "../interfaces/moviedb-response.actions";
import type { MovieDbCreditsResponse } from "../interfaces/moviedb-credits-response.interface";

export class MovieMapper {
  static fromTheMovieDBToMovie(movie: Result): Movie {
    return {
      id: movie.id,
      title: movie.title,
      description: movie.overview,
      releaseDate: new Date(movie.release_date),
      rating: movie.vote_average,
      poster: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "",
      backdrop: movie.backdrop_path
        ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`
        : "",
    };
  }

  static fromMovieDBDetailToMovie(movie: MovieDbMovieDetailResponse): MovieDetails {
    return {
      id: movie.id,
      title: movie.title,
      description: movie.overview,
      releaseDate: new Date(movie.release_date),
      rating: movie.vote_average,
      poster: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "",
      backdrop: movie.backdrop_path
        ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`
        : "",
      genres: movie.genres.map((g) => g.name),
      duration: movie.runtime,
      budget: movie.budget,
      originalTitle: movie.original_title,
      productionCompanies: movie.production_companies.map((c) => c.name),
    };
  }

  static fromMovieDBCreditsToCredits(credits: MovieDbCreditsResponse): MovieCredits {
    const cast: Cast[] = credits.cast.map((member) => ({
      id: member.id,
      name: member.name,
      character: member.character,
      profilePath: member.profile_path
        ? `https://image.tmdb.org/t/p/w185${member.profile_path}`
        : "",
    }));

    const crew: Crew[] = credits.crew.map((member) => ({
      id: member.id,
      name: member.name,
      job: member.job,
      department: member.department,
      profilePath: member.profile_path
        ? `https://image.tmdb.org/t/p/w185${member.profile_path}`
        : "",
    }));

    return { cast, crew };
  }
}
