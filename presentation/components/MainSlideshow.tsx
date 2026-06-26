import { View, useWindowDimensions } from 'react-native'
import React, { useRef } from 'react'
import { Movie } from '@/infrastructure/interfaces/movie.interface'
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import MoviePosters from './movies/MoviePosters';
import MoviePosterSkeleton from './movies/MoviePosterSkeleton';

interface Props {
    movies: Movie[];
    isLoading?: boolean;
}

const MainSlideshow = ({ movies, isLoading = false }: Props) => {
  const ref = useRef<ICarouselInstance>(null);
  const width = useWindowDimensions().width;

  if (isLoading) {
    return (
      <View style={{ height: 240, width, justifyContent: 'center', alignItems: 'center' }}>
        <MoviePosterSkeleton smallPoster={false} />
      </View>
    );
  }

  return (
    <View style={{ height: 240, width }}>
        <Carousel
            ref={ref}
            data={movies}
            width={200}
            height={260}
            renderItem={({ item }: { item: Movie }) => (
              <MoviePosters id={item.id} poster={item.poster} smallPoster={false} />
            )}
            style={{ width, height: 260, justifyContent: 'center', alignItems: 'center' }}
            mode="parallax"
            modeConfig={{
                parallaxScrollingScale: 0.9,
                parallaxScrollingOffset: 50
            }}
            autoPlay
            autoPlayInterval={3000}
            defaultIndex={1}
        />
    </View>
  )
}

export default MainSlideshow