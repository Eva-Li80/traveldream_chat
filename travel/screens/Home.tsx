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
import { RootStackParamList } from "../types/type";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchUsers } from "../redux/userSlice";
import imageMapping from "../utils/ImgMapping";
import ButtonNavigate from "../components/buttons/ButtonNavigate";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

type Props = {
  navigation: HomeScreenNavigationProp;
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
    return <Text style={{ color: "red" }}>Fel vid hämtning: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        <Text style={styles.welcomeText}>Välkommen till user appen!</Text>
        <View style={styles.imageRow}>
          {users.map((user) => (
            <View style={styles.imageContainer} key={user.id}>
              <Image
                style={styles.monsterImage}
                source={imageMapping[user.image]}
              />
            </View>
          ))}
        </View>
      </ScrollView>

      <ButtonNavigate
        title="Visa alla users"
        navigate={() => navigation.navigate("Profile")}
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
    fontSize: 28,
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
  monsterImage: {
    width: 120,
    borderRadius: 75,
    resizeMode: "contain",
    backgroundColor: "white",
    height: 120,
    margin: 10,
  },
});

export default Home;
