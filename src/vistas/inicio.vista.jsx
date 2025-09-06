import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  ImageBackground,
  View,
  _Text,
  TextInput,
  Alert,
} from "react-native";
import { useAuth } from "../Hooks/useAuth";

export const InicioVista = ({ navigation }) => {
  //imagen de fondo
  const Image = { uri: "https://i.ibb.co/cYLP9z9/prueba.png>" };
  //useStates del inicio de sesion
  const [email, setEmail] = useState("");
  const [contra, setContra] = useState("");
  //la constante iniciar sesion del hook de useAuth
  const { iniciarSesion } = useAuth();

  // funcion enviar para realizar el logeo
  async function enviar() {
    if (contra.length < 6 && email.length < 3) return;
    const { loged, mensaje, user } = await iniciarSesion(email, contra);
    Alert.alert(mensaje);
  }
  return (
    <View style={style.view}>
      <ImageBackground source={Image} resizeMode="cover" style={style.image}>
        <Text style={style.txt}>LOGIN</Text>
        <Text style={style.txt2}>Bienvenido a Tournament Manager. </Text>
        <View style={style.contenedor}>
          <View>
            <Text style={style.label}>Email</Text>
            <TextInput
              style={style.input}
              placeholderTextColor={"black"}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          </View>
          <View>
            <Text style={style.label}>Contraseña</Text>
            <TextInput
              style={style.input}
              placeholderTextColor={"black"}
              value={contra}
              onChangeText={setContra}
            />
          </View>
        </View>
        <Pressable>
          <Text
            onPress={() => navigation.navigate("registro")}
            style={style.txt4}
          >
            Registrate aqui
          </Text>
        </Pressable>
        <Pressable onPress={enviar} style={style.btnagg}>
          <Text style={style.txt3}>Login</Text>
        </Pressable>
      </ImageBackground>
      <View></View>
    </View>
  );
};

//estilos

const style = StyleSheet.create({
  txt: {
    fontFamily: "popins",
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    width: 97,
    height: 48,
    left: 27,
    top: 91,
  },
  txt2: {
    textAlign: "center",
    fontSize: 15,
    color: "white",
    width: 284,
    height: 34,
    left: 0,
    top: 200,
  },
  txt3: {
    color: "white",
    textAlign: "center",
  },
  txt4: {
    color: "white",
    textAlign: "center",
    top: 400,
  },
  view: {
    flex: 1,
  },
  btnagg: {
    backgroundColor: "#008f39",
    padding: 10,
    paddingTop: 10,
    marginLeft: 20,
    marginRight: 20,
    width: 315,
    height: 39,
    borderRadius: 7,
    left: 23,
    top: 300,
  },
  image: {
    flex: 1,
  },
  input: {
    backgroundColor: "white",
    color: "black",
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    paddingTop: 1,
    paddingBottom: 10,
    borderRadius: 10,
  },
  label: {
    marginHorizontal: 5,
    marginBottom: 10,
    fontSize: 15,
    color: "#fff",
    left: 20,
  },
  contenedor: {
    top: 250,
  },
});
