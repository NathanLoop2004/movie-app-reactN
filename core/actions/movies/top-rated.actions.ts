import { movieApi } from "@/core/API/movieAPI"
import { MovieDbMoviesResponse } from "@/infrastructure/interfaces/moviedb-response.actions"
import { MovieMapper } from "@/infrastructure/mappers/movie.mapper"

export const topRatedActions = async (page: number = 1) => {
   try {
    const { data } = await movieApi.get<MovieDbMoviesResponse>('/top_rated', { params: { page } })
    const movies = data.results.map((movie) => MovieMapper.fromTheMovieDBToMovie(movie))
    return { movies, nextPage: page + 1 };
   } catch(error) {
    throw "Cannot load popular movies"
   }
}
