import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  ImageBackground,
  View,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { Boton } from "../componentes/button";
import { Duelo } from "../componentes/duelos";
import { useTorneos } from "../Hooks/useTorneos";

export const AddTorneo = ({ navigation }) => {
  //useState para realizar el registro del torneo
  const [nombre, setNombre] = useState("");
  const [jornada, setJornada] = useState("0");
  const [duelos, setDuelos] = useState([]);
  const [ids, setids] = useState(0);

  const { CrearTorneo, GetTorneos } = useTorneos();

  //imagen de fondo
  const Image = { uri: "https://i.ibb.co/cYLP9z9/prueba.png>" };

  //funcion agregar partidos
  function addDuelo() {
    const id = ids;
    //se le coloca un id y se le suma 1 para que no sea el mismo
    setids(id + 1);
    setDuelos([
      //convierte el array en en el valor solamente
      ...duelos,
      {
        id: id,
        equipo1: "",
        equipo2: "",
      },
    ]);
  }

  function onChageTextDuelo(id, tE1, tE2) {
    //se filtra los otros duelo que ya hayan sido escrito para ignorarlos
    //cuando se este crean otro texto en algun otro input del array
    const otrosDuelos = duelos.filter((duelo) => duelo.id !== id);
    const duelo = {
      id,
      equipo1: tE1,
      equipo2: tE2,
    };
    //se crea un nuevo array de duelos con los anteriores y el nuevo,
    const newD = [...otrosDuelos, duelo];
    //se ordena de manera descendente con respecto al id
    newD.sort((equipo1, equipo2) => {
      return equipo1.id - equipo2.id;
    });
    setDuelos(newD);
  }

  //funcion asincrona enviar, esta lleva los datos de los inputs a la base de datos alojada en Firebase
  async function enviar() {
    const resultados = [];
    //resultados aun vacios, pero se crean
    duelos.forEach((duelo) => {
      resultados.push({
        equipo1: null,
        equipo2: null,
        id: duelo.id,
      });
    });

    const torneo = {
      duelos,
      nombre,
      resultados,
      jornada: parseInt(jornada),
    };
    const data = await CrearTorneo(torneo);
    if (data) {
      Alert.alert("Agregado");

      await GetTorneos();

      navigation.goBack();
    }
  }

  return (
    <ImageBackground source={Image} resizeMode="cover" style={style.image}>
      <View style={style.contenedor}>
        <Text style={style.label} children="Nombre del torneo" />
        <TextInput
          placeholder="Nombre del torneo"
          placeholderTextColor="gray"
          style={{
            backgroundColor: "white",
            color: "black",
            borderRadius: 10,
            padding: 10,
          }}
          value={nombre}
          onChangeText={setNombre}
        />
        <Text style={style.label} children="Jornada" />
        <TextInput
          placeholder="# de jornada"
          placeholderTextColor="gray"
          style={{
            backgroundColor: "white",
            color: "black",
            borderRadius: 10,
            padding: 10,
          }}
          keyboardType="number-pad"
          value={jornada}
          onChangeText={setJornada}
        />
        <ScrollView
          style={{
            height: 320,
            width: "100%",
          }}
        >
          {duelos.map((duelo, i) => (
            <Duelo
              key={duelo.id}
              id={duelo.id}
              textE1={duelo.equipo1}
              textE2={duelo.equipo2}
              onChangeText={onChageTextDuelo}
            />
          ))}
        </ScrollView>
        <Boton
          text="Añadir Partido"
          onPress={addDuelo}
          style={style.btnagg}
          textStyle={style.txt3}
        />
        <Boton
          text="Siguiente"
          onPress={enviar}
          style={style.btnagg}
          textStyle={style.txt3}
        />
      </View>
    </ImageBackground>
  );
};

//ESTILOS
const style = StyleSheet.create({
  btnz: {
    top: 60,
    alignItems: "center",
  },
  input3: {
    borderRadius: 7,
    backgroundColor: "white",
    color: "black",
    marginBottom: 10,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
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
    width: "100%",
    height: 39,
    borderRadius: 7,
  },
  btnagg2: {
    backgroundColor: "#008f39",
    paddingHorizontal: 7,
    height: "70%",
    borderRadius: 7,
    paddingTop: 3,
  },
  btnagg3: {
    backgroundColor: "#008f39",
    padding: 10,
    width: 200,
    height: 39,
    borderRadius: 10,
    alignItems: "center",
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
    top: 30,
  },
  label: {
    fontSize: 15,
    color: "#fff",
  },
  label2: {
    marginHorizontal: 5,
    marginBottom: 10,
    fontSize: 20,
    color: "#fff",
    left: 20,
    top: 30,
  },
  contenedor: {
    padding: 24,
    gap: 20,
  },
  input2: {
    backgroundColor: "white",
    color: "red",
    marginLeft: 20,
    marginRight: 300,
    marginBottom: 15,
    paddingTop: 1,
    paddingBottom: 1,
    borderRadius: 10,
  },
});
