import { movieApi } from "@/core/API/movieAPI"
import { MovieDetails } from "@/infrastructure/interfaces/movie.interface"
import { MovieDbMovieDetailResponse } from "@/infrastructure/interfaces/moviedb-response.actions"
import { MovieMapper } from "@/infrastructure/mappers/movie.mapper"





export const getMovieByIdActions = async(id: number| string): Promise<MovieDetails> => {

   try{
     
    const {data} = await movieApi.get<MovieDbMovieDetailResponse>(`/${id}`)
    console.log(JSON.stringify(data, null, 2))
    
    const movie = MovieMapper.fromMovieDBDetailToMovie(data)
  
    console.log(movie)
     return movie;
   } catch(error) {
    console.log(error)
    throw "Cannot load movie"
   }

}