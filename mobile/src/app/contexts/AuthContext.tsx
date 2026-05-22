import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, useCallback, useEffect, useState } from "react";
import { localStorageKeys } from "../../config/localStorageKeys";
import { LaunchScreen } from "../../ui/components/LaunchScreen/LaunchScreen";
import { User } from "../entities/User";
import { usersService } from "../services/UsersService/usersService";

export interface AuthContextValue {
  signedIn: boolean;
  user: User | undefined;
  signin(accessToken: string): void;
  signout(): void;
}

export const AuthContext = createContext({} as AuthContextValue);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();

  const [signedIn, setSignedIn] = useState(false);
  const [isCheckingStorage, setIsCheckingStorage] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(localStorageKeys.ACCESS_TOKEN).then((token) => {
      setSignedIn(!!token);
      setIsCheckingStorage(false);
    });
  }, []);

  const { isError, isSuccess, isFetching, data } = useQuery({
    queryKey: ["loggedUser"],
    queryFn: () => usersService.me(),
    enabled: signedIn,
    staleTime: Infinity,
  });

  const signin = useCallback(async (accessToken: string) => {
    await AsyncStorage.setItem(localStorageKeys.ACCESS_TOKEN, accessToken);
    setSignedIn(true);
  }, []);

  const signout = useCallback(async () => {
    await AsyncStorage.removeItem(localStorageKeys.ACCESS_TOKEN);
    queryClient.removeQueries({ queryKey: ["loggedUser"] });
    setSignedIn(false);
  }, [queryClient]);

  useEffect(() => {
    if (isError) {
      console.error("Sua sessão expirou!");
      signout();
    }
  }, [isError, signout]);

  const isLoading = isCheckingStorage || isFetching;

  return (
    <AuthContext.Provider
      value={{
        signedIn: isSuccess && signedIn,
        user: data,
        signin,
        signout,
      }}
    >
      <LaunchScreen isLoading={isLoading} />

      {!isLoading && children}
    </AuthContext.Provider>
  );
}
