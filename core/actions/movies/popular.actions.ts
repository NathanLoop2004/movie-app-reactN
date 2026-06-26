import { movieApi } from "@/core/API/movieAPI"
import { MovieDbMoviesResponse } from "@/infrastructure/interfaces/moviedb-response.actions"
import { MovieMapper } from "@/infrastructure/mappers/movie.mapper"

export const popularActions = async () => {
   try {
    const { data } = await movieApi.get<MovieDbMoviesResponse>('/popular')
    const movies = data.results.map((movie) => MovieMapper.fromTheMovieDBToMovie(movie))
    return movies;
   } catch(error) {
    throw "Cannot load popular movies"
   }
}
