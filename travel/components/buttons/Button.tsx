import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";

type ButtonProps = {
  title: string | any;
  onPress?: () => void;
  style?: Object;
};

const Button = ({ title, onPress, style }: ButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <Text style={styles.button}>
        <Text style={styles.text}>{title}</Text>
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    backgroundColor: "#FFC567",
    borderRadius: 5,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#2C3E50",
  },
  text: {
    color: "#2C3E50",
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default Button;
