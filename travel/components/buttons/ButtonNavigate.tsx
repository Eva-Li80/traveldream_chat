import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";

type ButtonProps = {
  title: string | any;
  navigate: () => void;
};

const ButtonNavigate = ({ title, navigate }: ButtonProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={navigate}>
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {           
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#2C3E50", 
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFC567"
  },
  text: {
    color: "#FFC567", 
    fontSize: 24,
  },
});

export default ButtonNavigate;
