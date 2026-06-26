import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import { nowPlayingActions } from '@/core/actions/movies/now-playing.actions'
import { popularActions } from '@/core/actions/movies/popular.actions'

const useMovies = () => {

  const nowPlayingQuery = useQuery({
    queryKey: ['movies', 'now-playing'],
    queryFn: nowPlayingActions,
    staleTime: 1000 * 60 * 60 * 24,
  })

  const popularQuery = useInfiniteQuery({
    queryKey: ['movies', 'popular'],
    queryFn: ({ pageParam }) => popularActions(pageParam as number),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
    staleTime: 1000 * 60 * 60 * 24,
  })

  const seenIds = new Set<number>();
  const popularMovies = (popularQuery.data?.pages.flatMap((page) => page.movies) ?? [])
    .filter((movie) => {
      if (seenIds.has(movie.id)) return false;
      seenIds.add(movie.id);
      return true;
    });

  return {
    nowPlayingQuery,
    popularQuery,
    popularMovies,
  }

}

export default useMovies
