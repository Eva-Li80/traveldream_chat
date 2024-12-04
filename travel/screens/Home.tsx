import React, { useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { RootStackParamList } from "../types/type";
import { fetchUsers } from "../redux/userSlice";
import imageMapping from "../utils/ImgMapping";
import ButtonNavigate from "../components/buttons/ButtonNavigate";

type HomeNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

type Props = {
  navigation: HomeNavigationProp;
};

const Home = ({ navigation }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error } = useSelector(
    (state: RootState) => state.users
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) {
    return <ActivityIndicator size="large" color="blue" />;
  }

  if (error) {
    return <Text style={{ color: "red" }}>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        <Text style={styles.welcomeText}>Travel dream chat.. ( from drem to journy )</Text>
        <View style={styles.imageRow}>
          {users.map((user) => (
            <View style={styles.imageContainer} key={user.id}>
              <Image
                style={styles.userImage}
                source={imageMapping[user.avatar]}
              />
            </View>
          ))}
        </View>
      </ScrollView>

      <ButtonNavigate
        title="Choose profile"
        navigate={() => navigation.navigate("Profiles")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    margin:20
  },
  scroll:{
    flexGrow: 1,

  },
  welcomeText: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    marginTop: 20,
    color: "white",
    backgroundColor: "gray",
    padding: 20,
    borderWidth: 2,
    borderColor: "orange",
  },
  imageRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  imageContainer: {
    width: "48%",
    marginBottom: 10,
    alignContent: "center",
    alignItems: "center",
  },
  userImage: {
    width: 120,
    borderRadius: 75,
    resizeMode: "contain",
    backgroundColor: "white",
    height: 120,
    margin: 10,
  },
});

export default Home;
