import { View, Text, useWindowDimensions } from 'react-native'
import React, { useRef } from 'react'
import { Movie } from '@/infrastructure/interfaces/movie.interface'
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import MoviePosters from './movies/MoviePosters';

interface Props {
    movies: Movie[];
}



const MainSlideshow = ({ movies }: Props) => {
  const ref = useRef<ICarouselInstance>(null);
  const  width  = useWindowDimensions().width;

  return (
    <View style={{ height: 350, width }}>
        <Carousel
        
            ref={ref}
            data={movies}
            width={200}
            height={350}
            renderItem={({ item }: { item: Movie }) => (
              <MoviePosters id={item.id} poster={item.poster} smallPoster={false} />
            )}
            style={{
                width: width, height: 350, justifyContent: 'center', alignItems: 'center'}}
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