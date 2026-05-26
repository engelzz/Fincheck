import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Dashboard } from "../../ui/Dashboard/Dasboard";
import { LoginScreen } from "../../ui/LoginScreen/LoginScreen";
import { RegisterScreen } from "../../ui/RegisterScreen/RegisterScreen";
import { AuthProvider } from "../contexts/AuthContext";

const Stack = createNativeStackNavigator();

function AuthStack() {
  const { signedIn } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {signedIn ? (
        <Stack.Screen name="Dashboard" component={Dashboard} />
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

export function AuthNavigation() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <NavigationContainer>
          <AuthStack />
        </NavigationContainer>
      </AuthProvider>
    </QueryClientProvider>
  );
}
