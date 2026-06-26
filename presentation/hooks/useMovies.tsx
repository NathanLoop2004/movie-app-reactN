
import { useQuery } from '@tanstack/react-query'
import { nowPlayingActions } from '@/core/actions/movies/now-playing.actions'
import { popularActions } from '@/core/actions/movies/popular.actions'

const useMovies = () => {

  const nowPlayingQuery = useQuery({
    queryKey: ['movies', 'now-playing'],
    queryFn: nowPlayingActions,
    staleTime: 1000 * 60 * 60 * 24,
  })

  const popularQuery = useQuery({
    queryKey: ['movies', 'popular'],
    queryFn: popularActions,
    staleTime: 1000 * 60 * 60 * 24,
  })

  return {
    nowPlayingQuery,
    popularQuery,
  }

}

export default useMovies
