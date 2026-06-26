import { View, Text, Animated, ScrollView, Image, TouchableOpacity, FlatList, useWindowDimensions } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import useMovie from '@/presentation/hooks/useMovie'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import CastCard from '@/presentation/components/movies/CastCard'

const CARD_RADIUS = 24;
const CARD_OVERLAP = 28;

const MovieScreen = () => {
  const { id } = useLocalSearchParams();
  const { movie, isLoading, cast } = useMovie(id as string);
  const router = useRouter();
  const { top } = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const [bounces, setBounces] = useState(false);

  const pulse = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 800, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0.3, duration: 800, useNativeDriver: true }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, []);

  const sk = (w: number | string, h: number, extra?: object) => (
    <Animated.View style={[{ width: w as number, height, borderRadius: 8, backgroundColor: '#d1d5db', opacity: pulse }, extra]} />
  );

  if (isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Stack.Screen options={{ headerShown: false, animation: 'none' }} />

        <ScrollView style={{ flex: 1 }} scrollEnabled={false}>
          <Animated.View style={{ width, height: height * 0.62, backgroundColor: '#d1d5db', opacity: pulse }} />

          <View style={{
            backgroundColor: '#fff',
            borderTopLeftRadius: CARD_RADIUS,
            borderTopRightRadius: CARD_RADIUS,
            marginTop: -CARD_OVERLAP,
            paddingHorizontal: 20,
            paddingTop: 24,
          }}>
            {sk(110, 13, { marginBottom: 10 })}
            {sk(220, 28, { marginBottom: 10 })}
            {sk(160, 14, { marginBottom: 24 })}

            {sk(80, 20, { marginBottom: 12 })}
            {sk('100%', 14, { marginBottom: 8 })}
            {sk('100%', 14, { marginBottom: 8 })}
            {sk('75%', 14, { marginBottom: 28 })}

            {sk(90, 20, { marginBottom: 16 })}
            <View style={{ flexDirection: 'row', gap: 14 }}>
              {[1, 2, 3, 4].map((i) => (
                <View key={i} style={{ alignItems: 'center' }}>
                  <Animated.View style={{ width: 70, height: 70, borderRadius: 35, backgroundColor: '#d1d5db', opacity: pulse }} />
                  {sk(52, 10, { marginTop: 8 })}
                  {sk(38, 8, { marginTop: 5 })}
                </View>
              ))}
            </View>
          </View>
        </ScrollView>

        <TouchableOpacity
          onPress={() => router.back()}
          activeOpacity={0.7}
          style={{ position: 'absolute', top: top + 10, left: 18 }}
        >
          <Text style={{ color: 'white', fontSize: 32, fontWeight: '300', textShadowColor: 'rgba(0,0,0,0.6)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 4 }}>←</Text>
        </TouchableOpacity>
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
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <Stack.Screen options={{ headerShown: false, animation: 'none' }} />

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

        {/* Tarjeta blanca con bordes redondeados superpuesta al poster */}
        <View style={{
          backgroundColor: '#fff',
          borderTopLeftRadius: CARD_RADIUS,
          borderTopRightRadius: CARD_RADIUS,
          marginTop: -CARD_OVERLAP,
          paddingBottom: 40,
        }}>

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
                renderItem={({ item }) => <CastCard item={item} />}
              />
            </View>
          )}

          {/* Presupuesto y producción */}
          <View style={{ paddingHorizontal: 20 }}>
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
