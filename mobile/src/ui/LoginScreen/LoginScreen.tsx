import { TouchableOpacity, View } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import React from "react";
import { Controller } from "react-hook-form";
import { Button } from "../components/Button/Button";
import { Logo } from "../components/Icons/Logo";
import { Text } from "../components/Text";
import { Container, Input } from "./styles";
import { useLoginController } from "./useLoginController";

export function LoginScreen({navigation}: NativeStackScreenProps) {
  const { handleSubmit, register, errors, isLoading, control } = useLoginController();

  return (
    <Container contentContainerStyle={{alignItems: "center", justifyContent: 'center', height: '100%'}}>
      <Logo color="#ADB5BD" />

      <View style={{marginTop: 64}}>
        <Text weight="600" size={24}>Entre em sua conta</Text>
      </View>  

        <View style={{marginTop: 16, marginBottom: 32, flexDirection: 'row'}}>
          <Text>Novo por aqui?</Text>

          <TouchableOpacity   
            onPress={() => navigation.navigate('Register') }
          >
            <Text 
              color="#087f5b" 
              weight="600" 
              style={{paddingHorizontal: 8}}
            >
              Crie uma conta
            </Text>
          </TouchableOpacity>
        </View>

      <Controller 
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="Email"
            placeholderTextColor='#343a40'
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        />

      <Controller 
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="Senha"
            placeholderTextColor='#343a40'
            secureTextEntry
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      <Button 
        onPress={handleSubmit}>
        Entrar
      </Button>
    </Container>
  )
}