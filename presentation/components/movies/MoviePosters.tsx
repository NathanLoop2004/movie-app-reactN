import { TouchableOpacity, Image } from 'react-native'
import React from 'react'



interface Props {
  id: number
  poster: string;
  smallPoster?: boolean;
}
const MoviePosters = ({ id, poster, smallPoster = false }: Props) => {
  return (
    <TouchableOpacity activeOpacity={0.7} style={{ paddingHorizontal: 8 }}>
      <Image
        source={{ uri: poster }}
        style={{
            width: smallPoster ? 85 : 150,
            height: smallPoster ? 130 : 250,
            borderRadius: 10,
            backgroundColor: 'gray'
        }}
        resizeMode='cover'
      />
    </TouchableOpacity>
  )
}

export default MoviePosters