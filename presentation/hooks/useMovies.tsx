import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import { nowPlayingActions } from '@/core/actions/movies/now-playing.actions'
import { popularActions } from '@/core/actions/movies/popular.actions'
import { topRatedActions } from '@/core/actions/movies/top-rated.actions'
import { upcomingActions } from '@/core/actions/movies/upcoming-playing'

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

  const topRatedQuery = useInfiniteQuery({
    queryKey: ['movies', 'top-rated'],
    queryFn: ({ pageParam }) => topRatedActions(pageParam as number),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
    staleTime: 1000 * 60 * 60 * 24,
  })

  const upcomingQuery = useInfiniteQuery({
    queryKey: ['movies', 'upcoming'],
    queryFn: ({ pageParam }) => upcomingActions(pageParam as number),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
    staleTime: 1000 * 60 * 60 * 24,
  })

  const seenPopularIds = new Set<number>();
  const popularMovies = (popularQuery.data?.pages.flatMap((page) => page.movies) ?? [])
    .filter((movie) => {
      if (seenPopularIds.has(movie.id)) return false;
      seenPopularIds.add(movie.id);
      return true;
    });

  const seenTopRatedIds = new Set<number>();
  const topRatedMovies = (topRatedQuery.data?.pages.flatMap((page) => page.movies) ?? [])
    .filter((movie) => {
      if (seenTopRatedIds.has(movie.id)) return false;
      seenTopRatedIds.add(movie.id);
      return true;
    });

  const seenUpcomingIds = new Set<number>();
  const upcomingMovies = (upcomingQuery.data?.pages.flatMap((page) => page.movies) ?? [])
    .filter((movie) => {
      if (seenUpcomingIds.has(movie.id)) return false;
      seenUpcomingIds.add(movie.id);
      return true;
    });

  return {
    nowPlayingQuery,
    popularQuery,
    popularMovies,
    topRatedQuery,
    topRatedMovies,
    upcomingQuery,
    upcomingMovies,
  }

}

export default useMovies
