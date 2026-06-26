const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// react-native-reanimated-carousel v4 exposes raw TypeScript via its "react-native"
// field, which Metro can't resolve. Force the compiled lib output instead.
const originalResolveRequest = config.resolver.resolveRequest;
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === "react-native-reanimated-carousel") {
    return {
      filePath: require.resolve(
        "react-native-reanimated-carousel/lib/commonjs/index.js"
      ),
      type: "sourceFile",
    };
  }
  if (moduleName === "react-native-gesture-handler") {
    return {
      filePath: require.resolve(
        "react-native-gesture-handler/lib/module/index.js"
      ),
      type: "sourceFile",
    };
  }
  if (originalResolveRequest) {
    return originalResolveRequest(context, moduleName, platform);
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = withNativeWind(config, { input: "./global.css" });
