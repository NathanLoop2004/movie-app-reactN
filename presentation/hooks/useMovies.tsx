
import { useQuery } from '@tanstack/react-query'
import { nowPlayingActions } from '@/core/actions/movies/now-playing.actions'

const useMovies = () => {
  const nowPlayingQuery = useQuery({
    queryKey: ['movies', 'now-playing'],
    queryFn: nowPlayingActions,
    staleTime: 1000 * 60 * 60 * 24,
  })

  return {
    nowPlayingQuery,
  }

}

export default useMovies