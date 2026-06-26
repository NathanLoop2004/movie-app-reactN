import { View, Text, ActivityIndicator, ScrollView, Image, TouchableOpacity, FlatList, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import useMovie from '@/presentation/hooks/useMovie'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const MovieScreen = () => {
  const { id } = useLocalSearchParams();
  const { movie, isLoading, cast } = useMovie(id as string);
  const router = useRouter();
  const { top } = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const [bounces, setBounces] = useState(false);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!movie) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Película no encontrada</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView
        style={{ flex: 1 }}
        bounces={bounces}
        overScrollMode="never"
        scrollEventThrottle={16}
        onScroll={(e) => setBounces(e.nativeEvent.contentOffset.y > 0)}
      >
        {/* Poster */}
        <Image
          source={{ uri: movie.poster }}
          style={{ width, height: height * 0.62 }}
          resizeMode="cover"
        />

        {/* Título, rating, historia */}
        <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
          <Text style={{ color: '#888', fontSize: 14 }}>{movie.originalTitle}</Text>
          <Text style={{ fontSize: 26, fontWeight: 'bold', color: '#111', marginTop: 2 }}>{movie.title}</Text>
          <Text style={{ color: '#555', marginTop: 6, fontSize: 14 }}>
            {movie.rating.toFixed(3)} · {movie.genres.join(', ')}
          </Text>

          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#111', marginTop: 24 }}>Historia</Text>
          <Text style={{ color: '#444', marginTop: 8, lineHeight: 22, fontSize: 15 }}>{movie.description}</Text>
        </View>

        {/* Reparto edge-to-edge */}
        {cast.length > 0 && (
          <View style={{ marginTop: 24 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#111', marginBottom: 12, paddingHorizontal: 20 }}>Reparto</Text>
            <FlatList
              horizontal
              data={cast}
              keyExtractor={(item) => item.id.toString()}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 20 }}
              renderItem={({ item }) => (
                <View style={{ marginRight: 14, alignItems: 'center', width: 80 }}>
                  {item.profilePath ? (
                    <Image
                      source={{ uri: item.profilePath }}
                      style={{ width: 70, height: 70, borderRadius: 35, backgroundColor: '#e5e7eb' }}
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
              )}
            />
          </View>
        )}

        {/* Presupuesto y producción */}
        <View style={{ paddingHorizontal: 20, paddingBottom: 40 }}>
          {movie.budget > 0 && (
            <View style={{ marginTop: 24 }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#111' }}>Presupuesto</Text>
              <Text style={{ color: '#444', marginTop: 8, fontSize: 15 }}>
                ${movie.budget.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </Text>
            </View>
          )}

          {movie.productionCompanies.length > 0 && (
            <View style={{ marginTop: 24 }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#111' }}>Producción</Text>
              <Text style={{ color: '#444', marginTop: 8, fontSize: 15 }}>{movie.productionCompanies.join(', ')}</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Botón fijo sobre la pantalla */}
      <TouchableOpacity
        onPress={() => router.back()}
        activeOpacity={0.7}
        style={{ position: 'absolute', top: top + 10, left: 18 }}
      >
        <Text style={{ color: 'white', fontSize: 32, fontWeight: '300', textShadowColor: 'rgba(0,0,0,0.6)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 4 }}>
          ←
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default MovieScreen
