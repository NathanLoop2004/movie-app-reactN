import "../global.css";
import { NativeModules } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Polyfill: gesture handler v3 llama métodos nativos que Expo Go no tiene (v2.28)
const ghNative = NativeModules.RNGestureHandlerModule;
if (ghNative) {
  if (!ghNative.installUIRuntimeBindings) ghNative.installUIRuntimeBindings = () => {};
  if (!ghNative.setGestureHandlerConfig)  ghNative.setGestureHandlerConfig  = () => {};
}

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <Stack screenOptions={{ headerShown: false }} />
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
