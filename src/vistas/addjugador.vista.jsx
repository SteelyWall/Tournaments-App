import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  ImageBackground,
  View,
  TextInput,
} from "react-native";
import { BD } from "../componentes/firebase.config";

export const AddJugador = ({ navigation }) => {
  const Image = { uri: "https://i.ibb.co/cYLP9z9/prueba.png>" };
  const [Nombre, setNombre] = useState("");
  const [Numero, setNumero] = useState("");

  async function enviar() {
    const Jugador = {
      nombre: Nombre,
      número: Numero,
    };
    console.log(Jugador);
    const data = await addDoc(collection(BD, "jugador"), Jugador);
    console.log(data);
  }

  return (
    <View style={style.modal}>
      <ImageBackground source={Image} resizeMode="cover" style={style.image}>
        <View>
          <Text style={style.titulo}>Añadir Jugador</Text>
        </View>
        <View style={style.contenedor1}>
          <Text style={style.txt1}>Nombre</Text>
          <Text style={style.txt2}>Número</Text>
        </View>
        <View tyle={style.contenedor2}>
          <TextInput
            style={style.input}
            placeholderTextColor={"black"}
            value={Nombre}
            onChangeText={setNombre}
          />
          <TextInput
            style={style.input}
            placeholderTextColor={"black"}
            value={Numero}
            onChangeText={setNumero}
            keyboardType="numeric"
          />
        </View>
        <Pressable onPress={enviar} style={style.btn}>
          <Text style={style.txt3}>AGREGAR</Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate("home")}
          style={style.btn2}
        >
          <Text style={style.txt3}>CANCELAR</Text>
        </Pressable>
      </ImageBackground>
    </View>
  );
};

const style = StyleSheet.create({
  titulo: {
    top: 15,
    color: "#fff",
    fontSize: 25,
    textAlign: "center",
  },
  image: {
    flex: 1,
  },
  modal: {
    flex: 1,
  },
  contenedor1: {},
  contenedor2: {},
  txt1: {
    color: "#fff",
    fontSize: 20,
    top: 55,
  },
  txt2: {
    color: "#fff",
    fontSize: 20,
    top: 70,
  },
  txt3: {
    color: "#fff",
    fontSize: 15,
    textAlign: "center",
  },
  input: {
    backgroundColor: "white",
    color: "black",
    marginLeft: 100,
    marginRight: 20,
    marginBottom: 15,
    paddingTop: 1,
    paddingBottom: 1,
    borderRadius: 10,
  },
  btn: {
    backgroundColor: "#008f39",
    textAlign: "center",
    padding: 13,
    height: 50,
    width: 100,
    borderRadius: 7,
    top: 50,
    left: 200,
  },
  btn2: {
    backgroundColor: "#008f39",
    textAlign: "center",
    paddingTop: 13,
    height: 50,
    width: 100,
    borderRadius: 7,
    left: 70,
  },
});
