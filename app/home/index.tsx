import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
import React from 'react'
import useMovies from '@/presentation/hooks/useMovies'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MainSlideshow from '@/presentation/components/MainSlideshow';


const HomeScreen = () => {

   const { nowPlayingQuery} = useMovies();
   const safeArea = useSafeAreaInsets();

   if( nowPlayingQuery.isLoading) {
        return (
            <View className= "justify-center items-center flex-1">
                <ActivityIndicator color='purple' size={40} />
            </View>
        )
   }


    return (
        <View className= "mt-2 " style={{marginTop: safeArea.top}}>
            <Text className="text-3xl font-bold px-4 mb-2 ">Movie App</Text>

            {/* Carousel de imagenes */}
            <MainSlideshow movies={nowPlayingQuery.data ?? []}/>

        </View>
    )

}

export default HomeScreen