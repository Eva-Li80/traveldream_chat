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
import ButtonNavigate from "../components/buttons/ButtonNavigate";
import travelImageMapping from "../utils/travelimg";

type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

type Props = {
  navigation: HomeNavigationProp;
};

const Home = ({ navigation }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.users);

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
        <View style={styles.con}>
          <Image
            style={styles.userImage}
            source={travelImageMapping["resa.jpg"]}
          />
          <Text style={styles.welcomeText}>Travel dream chat ! </Text>
          <Text style={{ color: "teal", fontSize: 22 }}>
            from drem to journey..
          </Text>
          <Text style={styles.text}>
            En app där du kan dela upplevelser och platser du besökt med bilder,
            tankar och tips. Andra kan få inspiration och en bättre uppfattning
            om platserna, samtidigt som du sparar dina minnen.{" "}
          </Text>
        </View>
      </ScrollView>

      <ButtonNavigate
        title="Choose profile"
        navigate={() => navigation.navigate("ChooseProfile")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  scroll: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 34,
    margin: 10,
    color: "#2C3E50",
    paddingVertical: 5,
  },
  con: {
    alignItems: "center",
    justifyContent: "center"
  },
  userImage: {
    width: 375,
    resizeMode: "cover",
    backgroundColor: "white",
    height: "100%",
    margin: 20,
  },
  text: {
    fontSize: 20,
    color: "#2C3E50",
    marginTop: 20,
  },
});

export default Home;
