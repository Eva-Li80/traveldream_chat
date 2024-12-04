import React from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FontAwesome } from "@expo/vector-icons";
import { RootStackParamList } from "../types/type";

type UserNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AllPosts'>;

type Props = {
  navigation: UserNavigationProp;
};


const Feed = ({navigation}: Props) => {
  const activeUser = useSelector((state: RootState) => state.users.activeUser);
  const posts = useSelector((state: RootState) => state.posts.posts);

  return (
    <View style={styles.container}>
      {activeUser ? (
        <View style={styles.activeUser}>
          <Text style={styles.userName}> Welcome {activeUser.name}</Text>
          <TouchableOpacity onPress={() => navigation.navigate("NewPost")}>
              <Text style={styles.addbtn}>
                Add new post <FontAwesome name="plus" size={30} color={"orange"} />
              </Text>
            </TouchableOpacity>
        </View>
      ) : (
        <Text style={styles.noUser}>No profile?</Text>
      )}
      <Text style={styles.userTitle}>All users posts:</Text>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.post}>
            <Text style={styles.postAuthor}>{item.title}</Text>
            <Text>{item.text}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  activeUser: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  userImage: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    marginRight: 10,
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
    borderColor: "#ccc",
    borderRadius: 8,
  },
  postAuthor: {
    fontWeight: "bold",
  },
  addbtn:{
    fontSize: 24,
    marginLeft: 50,
    color: "green"
  }
});

export default Feed;
