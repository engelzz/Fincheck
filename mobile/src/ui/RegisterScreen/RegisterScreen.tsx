import { TouchableOpacity, View } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import React from "react";
import { Controller } from "react-hook-form";
import { Button } from "../components/Button/Button";
import { Logo } from "../components/Icons/Logo";
import { Text } from "../components/Text";
import { Container, Input } from "./styles";
import { useRegisterController } from "./useRegisterController";

export function RegisterScreen({navigation}: NativeStackScreenProps) {
  const { handleSubmit, register, errors, isLoading, control } = useRegisterController();

  return (
    <Container contentContainerStyle={{alignItems: "center", justifyContent: 'center', height: '100%'}}>
      <Logo color="#ADB5BD" />

      <View style={{marginTop: 64}}>
        <Text weight="600" size={24}>Crie sua conta</Text>
      </View>  

        <View style={{marginTop: 16, marginBottom: 32, flexDirection: 'row'}}>
          <Text>Já possui uma conta ?</Text>
          
          <TouchableOpacity   
            onPress={() => navigation.navigate('Login') }
          >
            <Text
              color="#087f5b"
              weight="600"
              style={{paddingHorizontal:8}}
            >
              Fazer Login
            </Text>
          </TouchableOpacity>
        </View>
      
      <Controller 
        control={control}
        name="name"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="Nome"
            placeholderTextColor='#343a40'
            secureTextEntry
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      <Controller 
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="Email"
            placeholderTextColor='#343a40'
            keyboardType='email-address'
            secureTextEntry
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

      <Button onPress={() => navigation.navigate('Dashboard') }>        
        Criar conta
      </Button>
    </Container>
  )
}