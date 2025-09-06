import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  ImageBackground,
  View,
  _Text,
  TextInput,
} from "react-native";
import { useAuth } from "../Hooks/useAuth";

export const Perfil = ({ navigation }) => {
  const Image = { uri: "https://i.ibb.co/cYLP9z9/prueba.png>" };
  const { cerrarSesion, authStatus } = useAuth();

  return (
    <View style={style.modadl}>
      <ImageBackground source={Image} resizeMode="cover" style={style.image}>
        <Text style={style.txt2}>Perfil</Text>
        <Text style={style.txt4}>Usuario/Email:</Text>
        <Text style={style.txt3}>{authStatus.user.email}</Text>
        <Pressable onPress={cerrarSesion} style={style.btn}>
          <Text style={style.txt}>Cerrar sesión</Text>
        </Pressable>
      </ImageBackground>
    </View>
  );
};

const style = StyleSheet.create({
  modadl: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  txt3: {
    top: 25,
    fontSize: 20,
    textAlign: "center",
    color: "#fff",
  },
  btn: {
    backgroundColor: "#008f39",
    padding: 15,
    width: 170,
    height: 60,
    top: 400,
    left: 100,
    borderRadius: 10,
  },
  txt: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
  },
  txt4: {
    color: "#fff",
    fontSize: 20,
    top: 53,
    left: 12,
  },
  txt2: {
    top: 15,
    color: "#fff",
    fontSize: 30,
    textAlign: "center",
  },
});
