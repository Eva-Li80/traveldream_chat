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
    marginBottom: 30,
  },
  button: {
    backgroundColor: "orange", 
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "gray",
  },
  text: {
    color: "black",
    fontWeight: "bold",
    fontSize: 24,
  },
});

export default ButtonNavigate;
