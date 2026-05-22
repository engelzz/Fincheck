import { BlurView } from "expo-blur";
import { StyleSheet, View } from "react-native";

interface BlurredValueProps {
  visible: boolean;
  children: React.ReactNode;
  tint?: "light" | "dark" | "default" | "prominent" | "systemChromeMaterial";
  intensity?: number;
}

export function BlurredValue({
  visible,
  children,
  tint = "default",
  intensity = 10,
}: BlurredValueProps) {
  return (
    <View style={styles.container}>
      {children}
      {!visible && (
        <BlurView
          intensity={intensity}
          tint={tint}
          style={StyleSheet.absoluteFillObject}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    borderRadius: 4,
  },
});
