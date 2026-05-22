import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { useAuth } from "../../../hooks/useAuth";
import { Text } from "../Text";

export function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { signout, user } = useAuth();
  const navigation = useNavigation();

  const initials = user!.name.slice(0, 2).toUpperCase();

  return (
    <View>
      <TouchableOpacity
        onPress={() => setIsOpen((prev) => !prev)}
        activeOpacity={0.7}
        style={{
          backgroundColor: "#E6FCF5",
          borderRadius: 9999,
          width: 44,
          height: 44,
          alignItems: "center",
          justifyContent: "center",
          borderWidth: 1,
          borderColor: "#c3fae8",
        }}
      >
        <Text weight="600" size={14} color="#087f5b">
          {initials}
        </Text>
      </TouchableOpacity>

      {isOpen && (
        <>
          <TouchableOpacity
            onPress={() => setIsOpen(false)}
            style={{
              position: "absolute",
              top: 0,
              left: -9999,
              right: -9999,
              bottom: -9999,
              zIndex: 10,
            }}
            activeOpacity={1}
          />
          <View
            style={{
              position: "absolute",
              top: 52,
              right: 0,
              backgroundColor: "#fff",
              borderRadius: 12,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 8,
              zIndex: 20,
              minWidth: 120,
              overflow: "hidden",
            }}
          >
            <TouchableOpacity
              onPress={signout}
              activeOpacity={0.7}
              style={{ paddingVertical: 14, paddingHorizontal: 16 }}
            >
              <Text weight="600" size={14} color="#e03131">
                Sair
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}
