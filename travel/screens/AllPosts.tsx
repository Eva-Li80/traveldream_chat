import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Pressable,
  Image
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

  return (
    <View style={styles.container}>
      {activeUser ? (
      <View >
         <Image style={{width: 80, height: 80, borderRadius: 50, borderWidth: 2, borderColor: "orange"}}
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
            <Text>{item.text}</Text>
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
  },
  profile: {
    marginBottom: 70,
    marginRight: 0,
    fontSize: 16,
    color: "teal",
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
  },
  post: {
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: "teal",
    borderRadius: 8,
  },
  postAuthor: {
    fontWeight: "bold",
    fontSize: 20
  },
  info: {
    fontSize: 20,
    paddingTop: 10,
    textAlign: "right",
    paddingRight: 10,
    color: "orange",
    textDecorationLine: "underline"
  },
});

export default AllPosts;
