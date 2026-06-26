import { movieApi } from "@/core/API/movieAPI"
import { MovieDbCreditsResponse } from "@/infrastructure/interfaces/moviedb-credits-response.interface"
import { MovieMapper } from "@/infrastructure/mappers/movie.mapper"

export const getMovieCreditsActions = async (id: number | string) => {
  try {
    const { data } = await movieApi.get<MovieDbCreditsResponse>(`/${id}/credits`)
    return MovieMapper.fromMovieDBCreditsToCredits(data);
  } catch (error) {
    throw "Cannot load movie credits"
  }
}
