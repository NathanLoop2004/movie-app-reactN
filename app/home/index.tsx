import { Text, ScrollView } from 'react-native'
import React from 'react'
import useMovies from '@/presentation/hooks/useMovies'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MainSlideshow from '@/presentation/components/MainSlideshow';
import MoviesHorizontalList from '@/presentation/components/movies/MoviesHorizontalList';

const HomeScreen = () => {
  const { nowPlayingQuery, popularQuery } = useMovies();
  const safeArea = useSafeAreaInsets();

  const isLoading = nowPlayingQuery.isLoading || popularQuery.isLoading;

  return (
    <ScrollView style={{ marginTop: safeArea.top }}>
      <Text className="text-3xl font-bold px-4 mb-2">Movie App</Text>

      <MainSlideshow
        movies={nowPlayingQuery.data ?? []}
        isLoading={isLoading}
      />

      <MoviesHorizontalList
        movies={popularQuery.data ?? []}
        title="Populares"
        isLoading={isLoading}
      />
    </ScrollView>
  );
}

export default HomeScreen
