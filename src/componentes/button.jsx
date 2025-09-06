import React from "react";
import { Pressable, Text } from "react-native";

//
export const Boton = ({ text, onPress, style, textStyle, disabled }) => {
  return (
    <Pressable disabled={disabled} onPress={onPress} style={style}>
      <Text style={textStyle}>{text}</Text>
    </Pressable>
  );
};
