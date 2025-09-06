import React, { Fragment, useState } from "react";
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

export const RegistroVista = ({ navigation }) => {
  //imagen de fondo
  const Image = { uri: "https://i.ibb.co/cYLP9z9/prueba.png>" };
  // useStates de lo necesario para el registro
  const [email, setEmail] = useState("");
  const [contra, setContra] = useState("");
  const [contra2, setContra2] = useState("");
  const [error, setError] = useState("");
  // la constante registro del useAuth
  const { registro } = useAuth();

  //funcion enviar los datos a la BD ademas del realizar el registro con los valores de email y la contra
  async function enviar() {
    if (email.length < 1) return Alert.alert("Error", "Email vacio");
    if (contra.length < 1 || contra2.length < 1)
      return Alert.alert("Error", "Alguna contraseña esta vacia");

    if (contra.length < 6)
      return Alert.alert(
        "Error",
        "La contraseña debe ser minimo de 6 caracteres"
      );
    if (contra !== contra2)
      return Alert.alert("Error", "Las contraseñas no son iguales");

    const { loged, mensaje, user } = await registro(email, contra);
    Alert.alert(mensaje);
  }

  return (
    <View style={style.view}>
      <ImageBackground source={Image} resizeMode="cover" style={style.image}>
        <Text style={style.txt}>SIGN UP</Text>
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
          <View>
            <Text style={style.label}>Confirmar Contraseña</Text>
            <TextInput
              style={style.input}
              placeholderTextColor={"black"}
              value={contra2}
              onChangeText={setContra2}
            />
          </View>
        </View>
        {/* texto del error, que si no se da la validacion aparecerá  */}
        <Text style={style.txt5}>{error} </Text>
        {/* boton para realizar el registro */}
        <Pressable onPress={enviar} style={style.btnagg}>
          <Text style={style.txt3}>SIGN UP</Text>
        </Pressable>
      </ImageBackground>
      <View></View>
    </View>
  );
};

const style = StyleSheet.create({
  txt: {
    fontFamily: "popins",
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    width: 200,
    height: 48,
    left: 27,
    top: 70,
  },
  txt2: {
    textAlign: "center",
    fontSize: 15,
    color: "white",
    width: 284,
    height: 34,
    left: 0,
    top: 120,
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
  txt5: {
    color: "white",
    textAlign: "center",
    top: 190,
    fontWeight: "bold",
  },
  view: {
    flex: 1,
  },
  btnagg: {
    backgroundColor: "#008f39",
    padding: 5,
    paddingTop: 10,
    marginLeft: 20,
    marginRight: 20,
    width: 315,
    height: 39,
    left: 23,
    top: 220,
    borderRadius: 7,
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
    top: 160,
  },
});
