import { useState } from "react";
import { View, TextInput, Text } from "react-native";

//constante duelo
export const Duelo = ({ id, textE1, textE2, onChangeText }) => {
  const [equipo1, setEquipo1] = useState("");
  const [equipo2, setEquipo2] = useState("");

  return (
    <View style={{ gap: 20, marginBottom: 20 }}>
      <Text style={{ color: "white" }}>Partido #{id + 1}</Text>
      <TextInput
        placeholder="Equipo 1"
        placeholderTextColor="gray"
        style={{
          backgroundColor: "white",
          color: "black",
          borderRadius: 10,
          padding: 10,
        }}
        value={equipo1}
        onChangeText={(t) => {
          setEquipo1(t);
          const text = t;
          onChangeText(id, text, textE2);
        }}
      />
      <TextInput
        placeholder="Equipo 2"
        placeholderTextColor="gray"
        style={{
          backgroundColor: "white",
          color: "black",
          borderRadius: 10,
          padding: 10,
        }}
        value={equipo2}
        onChangeText={(t) => {
          setEquipo2(t);
          const text = t;
          onChangeText(id, textE1, text);
        }}
        typ
      />
    </View>
  );
};
