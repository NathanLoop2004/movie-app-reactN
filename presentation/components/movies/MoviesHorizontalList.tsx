import { View, Text, FlatList, ScrollView } from 'react-native'
import React from 'react'
import { Movie } from '@/infrastructure/interfaces/movie.interface'
import MoviePosters from './MoviePosters';
import MoviePosterSkeleton from './MoviePosterSkeleton';

const SKELETON_COUNT = 6;

interface Props {
    movies: Movie[];
    title?: string;
    isLoading?: boolean;
}

const MoviesHorizontalList = ({ movies, title = 'Populares', isLoading = false }: Props) => {

  return (
    <View className="mt-4">
      {title && <Text className="text-2xl font-bold px-4 mb-2">{title}</Text>}

      {isLoading ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ height: 150 }}>
          {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <MoviePosterSkeleton key={i} smallPoster />
          ))}
        </ScrollView>
      ) : (
        <FlatList
          horizontal
          data={movies}
          showsHorizontalScrollIndicator={false}
          style={{ height: 150 }}
          renderItem={({ item }: { item: Movie }) => (
            <MoviePosters id={item.id} poster={item.poster} smallPoster={true} />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  )
}

export default MoviesHorizontalList
