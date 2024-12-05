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
import { fetchPosts} from "../redux/postSlice";
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

  useEffect(() => {
    
    if (user) {
      dispatch(fetchPosts());
    }
    else{
      Alert.alert("Logg in by choosing a profile first, go to choose profile!")
    }
  }, [user, dispatch]);

  if (loading) {
    return <ActivityIndicator size="large" color="blue" />;
  }

  if (error) {
    return <Text style={{ color: "red" }}>Error: {error}</Text>;
  }

  return (
    <FlatList style={styles.container}
      ListHeaderComponent={() => (
        <View>
          <View style={styles.contitle}>
            <Text style={styles.title}>Welcome {user?.name}</Text>
            <Pressable onPress={() => navigation.navigate("NewPost")}>
              <Text style={styles.postnew}>add a new post ➕</Text>
            </Pressable>
          </View>
          {user && (
            <Image
              style={styles.userImage}
              source={imageMapping[user?.avatar]}
            />
          )}
          <Text style={{color: "#2C3E50"}}> your posts..</Text>
        </View>
      )}
      data={posts.filter((post) => String(post.authorId) === user?.id)}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.post}>
          <Text style={styles.postTitle}>{item.title}</Text>
          <Text style={styles.postContent}>{item.text}</Text>
          <Image
            source={postImageMapping[item.image]}
            style={styles.postImage}
          />
            <Text style={styles.likeButton}>Likes: {item.likes}</Text>
          <Text>Comments: </Text>
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
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  con:{
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#CBD5E0",
    marginVertical: 15, 
    marginHorizontal: 15,
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.2, 
    shadowOffset: { width: 0, height: 8 }, 
    shadowRadius: 8,
    elevation: 10, 
  },
  postnew: {
    fontSize: 18,
    color: "#1F8A8C",
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
  title: {
    textAlign: "center",
    marginTop: 2,
    fontSize: 18,
    color:  "#2C3E50",
  },
  container: {
    padding: 20,
    backgroundColor: "#f4f4f4",
  },
  postImage: {
    maxWidth: "50%",
    height: 120,
    marginLeft: 20,
    marginBottom: 40,
  },
  userImage: {
    maxWidth: 120,
    height: 120,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#CBD5E0",
    marginLeft: 10,
    marginBottom: 25,
    shadowColor: "#000",
    shadowOpacity: 0.2, 
    shadowOffset: { width: 0, height: 8 }, 
    shadowRadius: 8,
    elevation: 10, 
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
  postTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color:  "#2C3E50",
  },
  postContent: {
    fontSize: 16,
    color:  "#2C3E50",
    marginBottom: 10,
  },
  likeButton: {
    fontSize: 18,
    color: "teal",
    marginBottom: 10,
  },
  comment: {
    fontSize: 16,
    color:  "#2C3E50",
    marginLeft: 10,
    marginBottom: 5,
  },
  commentInput: {
    flex: 1,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 14,
    backgroundColor: "#fff",
  },
});

export default Profile;
