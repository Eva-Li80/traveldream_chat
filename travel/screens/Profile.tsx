import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScrollView } from "react-native-gesture-handler";
import { RootStackParamList, User } from "../types/type";
import { setActiveUser } from "../redux/userSlice";
import imageMapping from "../utils/ImgMapping";


type UsersNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Profile"
>;

type Props = {
  navigation: UsersNavigationProp;
};

const Profile = ({ navigation }: Props) => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users.users);
  
  

  const handleUser = (user: User | null) => {
    dispatch(setActiveUser(user));
    navigation.navigate("AllPosts", {user});
  };

  return (
    <ScrollView>
      <Text style={styles.title}>Choose your profile</Text>
      <View style={styles.container}>
        <View>
          {users.map((u) => (
            <TouchableOpacity key={u.id} onPress={() => handleUser(u)}>
              <View style={styles.container}>
                <Image
                  style={styles.userImage}
                  source={imageMapping[u.avatar]}
                />
              </View>
             <Text style={styles.userName}>{`Choose ${u.name}`} ⬆️</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
  },
  userImage: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  userName: {
    marginBottom: 40,
    fontSize: 20,
    textAlign: "center",
  },
  title: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 30,
  },

});

export default Profile;
