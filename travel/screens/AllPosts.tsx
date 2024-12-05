import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Pressable,
  Image,
  Alert
} from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/type";
import imageMapping from "../utils/ImgMapping";

type UserNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "AllPosts"
>;

type Props = {
  navigation: UserNavigationProp;
};

const AllPosts = ({ navigation }: Props) => {
  const activeUser = useSelector((state: RootState) => state.users.activeUser);
  const posts = useSelector((state: RootState) => state.posts.posts);

  
  useEffect(() => {
  if(!activeUser){
    Alert.alert("Logg in by choosing a profile first, go to choose profile!")
  }
  },[activeUser])
  return (
    <View style={styles.container}>
      {activeUser ? (
      <View >
         <Image style={{width: 80, height: 80, borderRadius: 50, borderWidth: 2, borderColor: "#FFC567"}}
            source={imageMapping[activeUser.avatar]}
          
          />
          <View style={styles.con}>
            <Text style={styles.title}> all users posts..</Text>
            <Pressable
              onPress={() => {
                navigation.navigate("AddProfile");
              }}
            >
              <Text style={styles.profile}>add a new post ➕</Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <Text style={styles.noUser}>No profile?</Text>
      )}

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.post}>
            <Text style={styles.postAuthor}>{item.title}</Text>
            <Text style={{color: "#2C3E50",}}>{item.text}</Text>
            <TouchableOpacity
              onPress={() => {
                if (item) {
                  navigation.navigate("PostDetail", { post: item });
                } else {
                  console.error("Post is undefined!");
                }
              }}
            >
              <Text style={styles.info}>see post..</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  con: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    marginTop: 60,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#2C3E50",
  },
  profile: {
    marginBottom: 70,
    marginRight: 0,
    fontSize: 18,
    color: "#1F8A8C",
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  activeUser: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  noUser: {
    fontSize: 16,
    color: "gray",
    marginBottom: 20,
  },
  userTitle: {
    fontSize: 20,
    marginBottom: 10,
    color: "#2C3E50",
  },
  post: {
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#CBD5E0",
    marginVertical: 15, 
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.2, 
    shadowOffset: { width: 0, height: 8 }, 
    shadowRadius: 8,
    elevation: 10, 
  },
  postAuthor: {
    fontWeight: "bold",
    fontSize: 20,
    color:"#2C3E50"
  },
  info: {
    fontSize: 20,
    paddingTop: 10,
    textAlign: "right",
    paddingRight: 10,
    color: "#FFC567",
    textDecorationLine: "underline"
  },
});

export default AllPosts;
