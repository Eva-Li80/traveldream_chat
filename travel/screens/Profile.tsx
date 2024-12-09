import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchPosts } from "../redux/postSlice";
import { RootStackParamList } from "../types/type";
import imageMapping from "../utils/ImgMapping";
import postImageMapping from "../utils/postImgMappinf";

type UserRouteProp = RouteProp<RootStackParamList, "Profile">;
type UserNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Profile"
>;

type Props = {
  navigation: UserNavigationProp;
};

const Profile = ({ navigation }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, loading, error } = useSelector(
    (state: RootState) => state.posts
  );

  const route = useRoute<UserRouteProp>();
  const { user } = route.params || {};

  //hämtar inlägg när användaren är inloggad
  useEffect(() => {
    if (user) {
      dispatch(fetchPosts());
    } else {
      Alert.alert("Logg in by choosing a profile first, go to choose profile!");
    }
  }, [user, dispatch]);

  if (loading) {
    return <ActivityIndicator size="large" color="blue" />;
  }

  if (error) {
    return <Text style={{ color: "red" }}>Error: {error}</Text>;
  }

  return (
    <FlatList
      style={styles.container}
      ListHeaderComponent={() => (
        <>
          <View style={styles.contitle}>
            <View>
              {user && (
                <Image
                  style={styles.userImage}
                  source={imageMapping[user?.avatar]}
                />
              )}
            </View>
            <View>
              <Text style={styles.title}>Welcome {user?.name}</Text>
              <Pressable onPress={() => navigation.navigate("NewPost")}>
                <Text style={styles.postnew}>add a new post ➕</Text>
              </Pressable>
            </View>
          </View>
          <Text style={{ color: "#2C3E50", fontSize: 18 }}> your posts..</Text>
        </>
      )}
      data={posts.filter((post) => String(post.authorId) === user?.id)}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.post}>
          <Text style={styles.postTitle}>{item.title}</Text>
          <Text style={styles.postTitle}>{item.country} (city: {item.city} )</Text>
          <View style={styles.conpost}>
            <Image
              source={postImageMapping[item.image]}
              style={styles.postImage}
            />
            <Text style={styles.postContent}>{item.text}</Text>
            <Text style={styles.num}> {item.likes}</Text>
            <Text style={styles.likeButton}>
              Likes: 
            </Text>
          </View>
          <Text style={{ fontSize: 18, margin: 5 }}>Comments: </Text>
          <FlatList
            data={item.comments}
            keyExtractor={(comment) => comment.id}
            renderItem={({ item }) => (
              <Text style={styles.comment}>- {item.text}</Text>
            )}
            nestedScrollEnabled
          />
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  contitle: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 20,
    paddingTop: 20,
  },
  conpost: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
    paddingTop: 20,
  },
  postnew: {
    fontSize: 20,
    color: "#1F8A8C",
    textDecorationLine: "underline",
    fontWeight: "bold",
    paddingTop: 10,
  },
  title: {
    fontSize: 22,
    color: "#2C3E50",
  },
  container: {
    paddingHorizontal: 20,
    backgroundColor: "#f4f4f4",
  },
  postImage: {
    width: "80%",
    height: 150,
  },
  userImage: {
    maxWidth: 120,
    height: 120,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#CBD5E0",
    marginBottom: 25,
    marginTop: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 8,
    elevation: 10,
  },
  post: {
    flex: 1,
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
  postTitle: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#2C3E50",
  },
  postContent: {
    fontSize: 18,
    color: "#2C3E50",
    marginBottom: 5,
    marginTop: 20,
    justifyContent:"center",
    alignItems: "center"
  },
  likeButton: {
    fontSize: 22,
    color: "teal",
    textAlign: "center",
    paddingTop: 5,
  },
  num: {
    backgroundColor: "teal", 
    width: 50, 
    height: 50, 
    textAlign: "center", 
    lineHeight: 50, 
    borderRadius: 25, 
    color: "white", 
    fontWeight: "bold", 
    fontSize: 18,
    marginTop: 20
  },
  
  comment: {
    fontSize: 18,
    color: "#2C3E50",
    marginBottom: 5,
    backgroundColor:  "#F9F9F9",
  },
});

export default Profile;
