import { Image, Text, View } from 'react-native'
import React from 'react'
import { Cast } from '@/infrastructure/interfaces/movie-credits.interface'

interface Props {
  item: Cast;
}

const CastCard = ({ item }: Props) => {
  return (
    <View style={{ marginRight: 14, alignItems: 'center', width: 80 }}>

      {item.profilePath ? (
        <Image
          source={{ uri: item.profilePath }}
          style={{ width: 70, height: 70, borderRadius: 35, backgroundColor: '#e2e5e9' }}
          resizeMode="cover"
        />
      ) : (
        <View style={{ width: 70, height: 70, borderRadius: 35, backgroundColor: '#d1d5db', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 24 }}>👤</Text>
        </View>
      )}

      <Text style={{ fontSize: 12, fontWeight: '600', color: '#111', marginTop: 6, textAlign: 'center' }} numberOfLines={2}>
        {item.name}
      </Text>
      <Text style={{ fontSize: 11, color: '#888', textAlign: 'center', marginTop: 2 }} numberOfLines={2}>
        {item.character}
      </Text>

    </View>
  );
};

export default CastCard;
