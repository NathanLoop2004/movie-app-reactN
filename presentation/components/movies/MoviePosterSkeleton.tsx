import { Animated, View } from 'react-native'
import React, { useEffect, useRef } from 'react'

interface Props {
  smallPoster?: boolean;
}

const MoviePosterSkeleton = ({ smallPoster = false }: Props) => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 700, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.3, duration: 700, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <View style={{ paddingHorizontal: 8 }}>
      <Animated.View
        style={{
          width: smallPoster ? 85 : 150,
          height: smallPoster ? 130 : 220,
          borderRadius: 10,
          backgroundColor: '#4B5563',
          opacity,
        }}
      />
    </View>
  );
};

export default MoviePosterSkeleton;
