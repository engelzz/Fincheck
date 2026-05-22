import { Modal, StyleSheet, View } from "react-native";
import { Logo } from "../Icons/Logo";
import { Spinner } from "../Icons/Spinner";

interface LaunchScreenProps {
  isLoading: boolean;
}

export function LaunchScreen({ isLoading }: LaunchScreenProps) {
  return (
    <Modal visible={isLoading} statusBarTranslucent animationType="fade">
      <View style={styles.container}>
        <View style={styles.content}>
          <Logo />
          <Spinner />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#087f5b",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 24,
  },
});
