import { TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'



interface Props {
  id: number
  poster: string;
  smallPoster?: boolean;
  className?: string;
}
const MoviePosters = ({ id, poster, smallPoster = false, className }: Props) => {
  const router = useRouter();
  return (
    <TouchableOpacity activeOpacity={0.7} style={{ paddingHorizontal: 8 }} className={className} onPress={() => router.push(`/movie/${id}` as any)}>
      <Image
        source={{ uri: poster }}
        style={{
            width: smallPoster ? 85 : 150,
            height: smallPoster ? 130 : 220,
            borderRadius: 10,
            backgroundColor: 'gray'
        }}
        resizeMode='cover'
      />
    </TouchableOpacity>
  )
}

export default MoviePosters