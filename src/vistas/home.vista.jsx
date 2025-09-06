import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  ImageBackground,
  View,
  ScrollView,
  Alert,
} from "react-native";
import { useTorneos } from "../Hooks/useTorneos";
import { Boton } from "../componentes/button";

export const HomeVista = ({ navigation }) => {
  const Image = { uri: "https://i.ibb.co/cYLP9z9/prueba.png>" };

  const { Torneos, GetTorneos, DeleteTorneo } = useTorneos();

  useEffect(() => {
    const main = async () => await GetTorneos();
    main();
  }, []);

  return (
    <ImageBackground source={Image} resizeMode="cover" style={style.image}>
      <View
        style={{
          position: "relative",
        }}
      >
        <Boton
          text="Perfil"
          style={style.profileBtn}
          textStyle={style.txt3}
          onPress={() => navigation.navigate("perfil")}
        />
        <Text style={style.txt}>Torneos</Text>
      </View>

      <View style={{ height: "75%" }}>
        {/* Scroll view de las jorndas/torneos */}
        <ScrollView style={{ gap: 20 }}>
          {/* funcion map para realizar cambios en el arreglo*/}
          {Torneos.map((torneo) => (
            <View key={torneo.id} style={style.jornada}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={style.txt}>{torneo.nombre}</Text>
                <Text style={style.txt3}>Jornada #{torneo.jornada}</Text>
                <Boton
                  text="Borrar"
                  style={[style.addbtn, { backgroundColor: "#a4133c", top: 7 }]}
                  textStyle={style.txt2}
                  onPress={() => {
                    //alerta de confirmacion para eliminar
                    Alert.alert(
                      "¿Estas seguro?",
                      "Estas a punto de elminar este torneo",
                      [
                        { text: "Volver", style: "cancel", onPress: () => {} },
                        {
                          text: "Eliminar",
                          style: "destructive",
                          onPress: async () => await DeleteTorneo(torneo.id),
                        },
                      ]
                    );
                  }}
                />
              </View>

              {torneo.duelos.map((duelo) => (
                <View
                  key={duelo.id}
                  style={{
                    borderRadius: 5,
                    borderWidth: 2,
                    borderColor: "rgba(255, 255, 255, 0.5)",
                    padding: 5,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: 50,
                  }}
                >
                  <Text style={style.txt3}>
                    {duelo.equipo1} vs {duelo.equipo2}
                  </Text>

                  <Text style={style.txt3}>
                    {torneo.resultados[duelo.id].equipo1 === null ? (
                      <Boton
                        text="Añadir resultado"
                        style={style.addbtn}
                        textStyle={style.txt2}
                        onPress={() =>
                          navigation.navigate("addResultado", { torneo, duelo })
                        }
                      />
                    ) : (
                      <Text style={style.txt3}>
                        {torneo.resultados[duelo.id].equipo1}
                        <> - </>
                        {torneo.resultados[duelo.id].equipo2}
                      </Text>
                    )}
                  </Text>
                </View>
              ))}
            </View>
          ))}
        </ScrollView>
      </View>

      <Boton
        onPress={() => navigation.navigate("addTorneo")}
        style={style.btnAddTorneo}
        textStyle={style.txt3}
        text="Crear Jornada"
      />
    </ImageBackground>
  );
};

const style = StyleSheet.create({
  txt: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    textAlignVertical: "center",
  },
  addbtn: {
    backgroundColor: "#008f39",
    paddingHorizontal: 5,
    paddingVertical: 8,
    borderRadius: 5,
    // width: 90,
  },
  txt2: {
    color: "white",
    textAlign: "center",
  },
  profileBtn: {
    backgroundColor: "#008f39",
    padding: 11,
    width: 70,
    height: 40,
    position: "absolute",
    right: 0,
    zIndex: 3,
  },
  image: {
    flex: 1,
    padding: 24,
    gap: 20,
  },
  btnAddTorneo: {
    backgroundColor: "#008f39",
    padding: 10,
    paddingTop: 12,
    width: 315,
    height: 50,
    borderRadius: 10,
    alignSelf: "center",
    position: "absolute",
    bottom: 30,
  },
  txt3: {
    fontSize: 17,
    color: "white",
    textAlign: "center",
  },
  jornada: {
    gap: 15,
  },
});
