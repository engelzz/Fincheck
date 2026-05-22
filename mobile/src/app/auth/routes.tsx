import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Dashboard } from "../../ui/Dashboard/Dasboard";
import { LoginScreen } from "../../ui/LoginScreen/LoginScreen";
import { RegisterScreen } from "../../ui/RegisterScreen/RegisterScreen";

const Stack = createNativeStackNavigator();

export function Routes() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Dashboard"
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
