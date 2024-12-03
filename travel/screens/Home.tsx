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
import img from "../assets/images/user2.jpg"

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
    return <Text style={{ color: "red" }}>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        <Text style={styles.welcomeText}>Travel dream chat... 
        <Text style={styles.txt}>( from dream to journey )</Text>
        </Text>
        <Text style={styles.descriptionText}>An app where you can share your travel experiences, photos, tips and thoughts.
          By sharing your experiences, others can gain a better understanding of them
          places you visit. At the same time, you can preserve your own memories. Choose
          if you want to share with others or keep the posts private.</Text>
        <View style={styles.imageRow}>

            <View style={styles.imageContainer}>
              <Image
                style={styles.monsterImage}
                source={imageMapping["user1.jpg"]}
              />
            </View>
          
        </View>
      </ScrollView>

      <ButtonNavigate
        title="Choose profile"
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
    fontSize: 33,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    marginTop: 20,
    color: "white",
    backgroundColor: "gray",
    padding: 10,
    borderWidth: 2,
    borderColor: "orange",
    marginLeft: 15,
    marginRight: 15
  },
  txt:{
    fontSize: 22
  },
  descriptionText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
    paddingHorizontal: 15,
    color: "gray",
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
