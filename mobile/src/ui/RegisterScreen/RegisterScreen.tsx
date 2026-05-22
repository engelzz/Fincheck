import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Controller } from "react-hook-form";
import { TouchableOpacity, View } from "react-native";
import { Button } from "../components/Button/Button";
import { Logo } from "../components/Icons/Logo";
import { Text } from "../components/Text";
import { Container, Input } from "./styles";
import { useRegisterController } from "./useRegisterController";

export function RegisterScreen() {
  const { handleSubmit, errors, isLoading, control } = useRegisterController();
  const navigation = useNavigation();

  return (
    <Container
      contentContainerStyle={{
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <Logo color="#ADB5BD" />

      <View style={{ marginTop: 64 }}>
        <Text weight="600" size={24}>
          Crie sua conta
        </Text>
      </View>

      <View style={{ marginTop: 16, marginBottom: 32, flexDirection: "row" }}>
        <Text>Já possui uma conta?</Text>

        <TouchableOpacity onPress={() => navigation.navigate("Login" as never)}>
          <Text color="#087f5b" weight="600" style={{ paddingHorizontal: 8 }}>
            Fazer login
          </Text>
        </TouchableOpacity>
      </View>

      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={{ width: "100%" }}>
            <Input
              placeholder="Nome"
              placeholderTextColor="#adb5bd"
              autoCapitalize="words"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={errors.name && { borderColor: "#e03131" }}
            />
            {errors.name && (
              <Text
                size={12}
                color="#e03131"
                style={{ marginTop: 4, marginLeft: 4 }}
              >
                {errors.name.message}
              </Text>
            )}
          </View>
        )}
      />

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={{ width: "100%" }}>
            <Input
              placeholder="E-mail"
              placeholderTextColor="#adb5bd"
              keyboardType="email-address"
              autoCapitalize="none"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={errors.email && { borderColor: "#e03131" }}
            />
            {errors.email && (
              <Text
                size={12}
                color="#e03131"
                style={{ marginTop: 4, marginLeft: 4 }}
              >
                {errors.email.message}
              </Text>
            )}
          </View>
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={{ width: "100%" }}>
            <Input
              placeholder="Senha"
              placeholderTextColor="#adb5bd"
              secureTextEntry
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={errors.password && { borderColor: "#e03131" }}
            />
            {errors.password && (
              <Text
                size={12}
                color="#e03131"
                style={{ marginTop: 4, marginLeft: 4 }}
              >
                {errors.password.message}
              </Text>
            )}
          </View>
        )}
      />

      <Button onPress={handleSubmit} loading={isLoading}>
        Criar conta
      </Button>
    </Container>
  );
}
