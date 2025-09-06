import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  ImageBackground,
  View,
  TextInput,
} from "react-native";
import { Boton } from "../componentes/button";
import { useTorneos } from "../Hooks/useTorneos";

export const AddResultadoDuelo = ({ navigation, route }) => {
  const Image = { uri: "https://i.ibb.co/cYLP9z9/prueba.png>" };
  const { torneo, duelo } = route.params;

  const [Goles1, setGoles1] = useState("0");
  const [Goles2, setGoles2] = useState("0");

  const { UpdateTorneo, GetTorneos } = useTorneos();

  // funcion enviar
  async function enviar() {
    if (Goles1.length < 1 || Goles2.length < 1) return;

    //goles de cada equipo
    const resultados = {
      equipo1: parseInt(Goles1),
      equipo2: parseInt(Goles2),
      id: duelo.id,
    };
    // filtro de resultados para tomar los otros excepto el editado

    const Resultados = torneo.resultados.filter((res) => res.id !== duelo.id);

    torneo.resultados = [...Resultados, resultados];

    //se actualiza
    await UpdateTorneo(torneo);
    // //se obtienen los nuevos datos
    await GetTorneos();
    // //se regresa a la pantalla anterior
    navigation.goBack();
  }

  return (
    <ImageBackground source={Image} resizeMode="cover" style={style.image}>
      <View style={{ gap: 10 }}>
        <View style={style.duelo_container}>
          <Text style={style.duelo} children={duelo.equipo1} />
          <TextInput
            style={style.input}
            placeholder="Goles"
            value={Goles1}
            onChangeText={setGoles1}
            keyboardType="number-pad"
          />
        </View>
        <Text style={style.duelo} children="VS" />
        <View style={style.duelo_container}>
          <Text style={style.duelo} children={duelo.equipo2} />
          <TextInput
            style={style.input}
            placeholder="Goles"
            value={Goles2}
            onChangeText={setGoles2}
            keyboardType="number-pad"
          />
        </View>
      </View>
      <Boton
        text="Añadir resultados"
        style={[
          style.btnUpdateResultatos,
          {
            opacity: Goles1.length < 1 || Goles2.length < 1 ? 0.75 : 1,
          },
        ]}
        textStyle={style.txt3}
        onPress={enviar}
        disabled={Goles1.length < 1 || Goles2.length < 1}
      />
    </ImageBackground>
  );
};

const style = StyleSheet.create({
  image: {
    flex: 1,
    padding: 24,
    gap: 20,
    justifyContent: "center",
  },
  duelo_container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  duelo: {
    color: "white",
    width: "50%",
    textAlignVertical: "center",
    fontSize: 20,
  },
  input: {
    backgroundColor: "white",
    color: "black",
    borderRadius: 10,
    padding: 10,
    width: "50%",
  },
  btnUpdateResultatos: {
    backgroundColor: "#008f39",
    padding: 10,
    paddingTop: 12,
    width: 315,
    height: 50,
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 40,
  },
  txt3: {
    fontSize: 17,
    color: "white",
    textAlign: "center",
  },
});
