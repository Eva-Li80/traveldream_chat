import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";

type ButtonProps = {
  title: string | any;
  onPress?: () => void
};

const Button = ({ title, onPress}: ButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.button} >
        <Text style={styles.text}>{title}</Text>
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {           
    alignItems: 'center',
},
button: {
      paddingHorizontal: 30,
      paddingVertical: 10,
    backgroundColor: "orange", 
    borderRadius: 5,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "teal",
  },
  text: {
    color: "white",
    fontSize: 20,
  },
});

export default Button;
