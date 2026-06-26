import { useQuery } from '@tanstack/react-query'
import { getMovieByIdActions } from '@/core/actions/movies/get-movie-by-id.actions'
import { getMovieCreditsActions } from '@/core/actions/movies/get-movie-credits.actions'

const useMovie = (id: number | string) => {

  const movieQuery = useQuery({
    queryKey: ['movie', id],
    queryFn: () => getMovieByIdActions(id),
    staleTime: 1000 * 60 * 60 * 24,
  })

  const creditsQuery = useQuery({
    queryKey: ['movie', id, 'credits'],
    queryFn: () => getMovieCreditsActions(id),
    staleTime: 1000 * 60 * 60 * 24,
  })

  const seenCastIds = new Set<number>();
  const cast = (creditsQuery.data?.cast ?? []).filter((c) => {
    if (seenCastIds.has(c.id)) return false;
    seenCastIds.add(c.id);
    return true;
  });

  return {
    movieQuery,
    movie: movieQuery.data,
    isLoading: movieQuery.isLoading,
    cast,
    crew: creditsQuery.data?.crew ?? [],
  }

}

export default useMovie
