import { movieApi } from "@/core/API/movieAPI"
import { MovieDbMoviesResponse } from "@/infrastructure/interfaces/moviedb-response.actions"
import { MovieMapper } from "@/infrastructure/mappers/movie.mapper"





export const nowPlayingActions = async() => {

   try{
     
    const {data} = await movieApi.get<MovieDbMoviesResponse>('/now_playing')
    console.log(JSON.stringify(data, null, 2))
    
    const movies = data.results.map((movie) => MovieMapper.fromTheMovieDBToMovie(movie))
  
    console.log(movies)
     return movies;
   } catch(error) {
    console.log(error)
    throw "Cannot load now playing movies"
   }

}