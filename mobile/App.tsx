import { useFonts } from "expo-font";
import Toast from "react-native-toast-message";
import { AuthNavigation } from "./src/app/auth/AuthNavigation";
import { toastConfig } from "./src/ui/components/Toasts/toastConfig";

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
    <>
      <AuthNavigation />
      <Toast config={toastConfig} visibilityTime={2500} />
    </>
  );
}
