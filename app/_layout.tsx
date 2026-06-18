import { nowPlayingActions } from "@/core/actions/movies/now-playing.actions";
import "../global.css";

import { Stack } from "expo-router";

export default function RootLayout() {

   

  return <Stack screenOptions={{ headerShown: false }} />;
}
