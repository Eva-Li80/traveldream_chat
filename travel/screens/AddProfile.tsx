import React, { useState } from "react";
import {
  Text,
  TextInput,
  Alert,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useDispatch } from "react-redux";
import imageMapping from "../utils/ImgMapping";
import ButtonNavigate from "../components/buttons/ButtonNavigate";
import { addUser } from "../redux/userSlice";
import { addUsers } from "../travelApi/travelApi";

const availableImages = Object.keys(imageMapping);

const AddProfile = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [country, setCountry] = useState("");

  const handleAddUser = async () => {
    if (
      !name.trim() ||
      !email.trim() ||
      !avatar ||
      !country
    ) {
      Alert.alert("fill inputs");
      return;
    }
    const newUser = {
      name,
      email,
      avatar,
      country,
    };

    try {
      const addedUser = await addUsers(newUser);
      dispatch(addUser(addedUser));

      Alert.alert("User added!");
      setName("");
      setEmail("");
      setAvatar("");
      setCountry("");
    } catch (error) {
      Alert.alert("Error adding user.");
    }
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <Text style={styles.txtimg}>Fill in the inputs and choose picure</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
           <TextInput
          style={styles.input}
          placeholder="Country"
          value={country}
          onChangeText={setCountry}
        />

        <Text style={styles.txtimg}>
          To see more profile picures.. ➡️➡️
        </Text>
        <ScrollView horizontal style={styles.imageSelector}>
          {availableImages.map((imageName) => (
            <TouchableOpacity
              key={imageName}
              onPress={() => setAvatar(imageName)}
            >
              <Image source={imageMapping[imageName]} style={styles.images} />
            </TouchableOpacity>
          ))}
        </ScrollView>

        {avatar && (
          <Image source={imageMapping[avatar]} style={styles.selectedImage} />
        )}
      <ButtonNavigate title="Add Profile" navigate={handleAddUser} />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#CBD5E0",
    marginVertical: 15, 
    marginHorizontal: 15,
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.2, 
    shadowOffset: { width: 0, height: 8 }, 
    shadowRadius: 8,
    elevation: 10, 
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 8,
    marginBottom: 20,
  },
  imageSelector: {
    marginBottom: 40,
    marginTop: 40,
  },
  images: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  selectedImage: {
    width: 150,
    height: 150,
    flex: 1,
    alignSelf: "center",
  },
  txtimg: {
    marginTop: 50,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 50,
  },
});

export default AddProfile;
