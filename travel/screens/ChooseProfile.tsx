import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScrollView } from "react-native-gesture-handler";
import { RootStackParamList, User } from "../types/type";
import { setActiveUser } from "../redux/userSlice";
import imageMapping from "../utils/ImgMapping";
import UserCard from "../components/userCard/UserCard";

type UsersNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ChooseProfile"
>;

type Props = {
  navigation: UsersNavigationProp;
};

const ChooseProfile = ({ navigation }: Props) => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users.users);
  
  const handleUser = (user: User | null) => {
    dispatch(setActiveUser(user));
    navigation.navigate("Profile", {user});
  };

  return (
    <ScrollView>
      <View style={styles.con}>
        <Text style={styles.title}>Choose profile</Text>
       <Pressable
        onPress={() => {
          navigation.navigate("AddProfile");
        }}
        >
        <Text style={styles.profile}>add a new profile  ➕</Text>
      </Pressable>
      </View>
      <View style={styles.container}>
        <View>
          {users.map((user) => (
            <TouchableOpacity key={user.id} onPress={() => handleUser(user)}>
    
              <UserCard name={user.name} email={user.email} avatar={imageMapping[user.avatar]} country={user.country}/>

            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  con:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', 
    padding: 10,
  },
  profile:{
  marginBottom: 40,
  marginRight: 10,
  fontSize: 18,
  color: "teal",
  textDecorationLine: "underline",
  fontWeight: "bold"
  },
  container: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
  },
  userName: {
    marginBottom: 40,
    fontSize: 20,
    textAlign: "center",
  },
  title: {
    textAlign: "center",
    marginTop: 60,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    marginLeft: 50,
    color: "orange"
  },
});

export default ChooseProfile;
