import type { Movie } from "../interfaces/movie.interface";
import type { Result } from "../interfaces/moviedb-response.actions";

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
}
