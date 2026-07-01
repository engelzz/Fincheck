import { useFonts } from "expo-font";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthNavigation } from "./src/app/auth/AuthNavigation";
import { ToastContainer } from "./src/ui/components/Toast/Toast";

if (__DEV__) {
  require("./ReactotronConfig");
}

export default function App() {
  const [isFontsLoaded] = useFonts({
    "GeneralSans-400": require("./src/assets/fonts/GeneralSans-Regular.otf"),
    "GeneralSans-600": require("./src/assets/fonts/GeneralSans-Semibold.otf"),
    "GeneralSans-700": require("./src/assets/fonts/GeneralSans-Bold.otf"),
  });

  if (!isFontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <AuthNavigation />
      <ToastContainer />
    </SafeAreaProvider>
  );
}
