import { Text, ScrollView } from 'react-native'
import React from 'react'
import useMovies from '@/presentation/hooks/useMovies'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MainSlideshow from '@/presentation/components/MainSlideshow';
import MoviesHorizontalList from '@/presentation/components/movies/MoviesHorizontalList';
import MoviesRatedList from '@/presentation/components/movies/TopRated';
import MoviesUpcomingList from '@/presentation/components/movies/MovieUpcomingMovies';
const HomeScreen = () => {
  const { nowPlayingQuery, popularQuery, popularMovies, topRatedQuery, topRatedMovies, upcomingQuery, upcomingMovies } = useMovies();
  const safeArea = useSafeAreaInsets();

  const isLoading = nowPlayingQuery.isLoading || popularQuery.isLoading || topRatedQuery.isLoading|| upcomingQuery.isLoading;

  return (
    <ScrollView style={{ marginTop: safeArea.top }}>
      <Text className="text-3xl font-bold px-4 mb-2">Movie App</Text>

      <MainSlideshow
        movies={nowPlayingQuery.data ?? []}
        isLoading={isLoading}
      />

      <MoviesHorizontalList
        movies={popularMovies}
        title="Populares"
        isLoading={isLoading}
        isFetchingNextPage={popularQuery.isFetchingNextPage}
        onEndReached={() => {
          if (popularQuery.hasNextPage && !popularQuery.isFetchingNextPage) {
            popularQuery.fetchNextPage();
          }
        }}
      />
            <MoviesRatedList
        movies={topRatedMovies}
        title="Top Rated"
        isLoading={isLoading}
        isFetchingNextPage={topRatedQuery.isFetchingNextPage}
        onEndReached={() => {
          if (topRatedQuery.hasNextPage && !topRatedQuery.isFetchingNextPage) {
            topRatedQuery.fetchNextPage();
          }
        }}
      />
                  <MoviesUpcomingList
        movies={upcomingMovies}
        title="Próximamente"
        isLoading={isLoading}
        isFetchingNextPage={upcomingQuery.isFetchingNextPage}
        onEndReached={() => {
          if (upcomingQuery.hasNextPage && !upcomingQuery.isFetchingNextPage) {
            upcomingQuery.fetchNextPage();
          }
        }}
      />
    </ScrollView>
  );
}

export default HomeScreen
