import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  FlatList,
  ActivityIndicator,
  Alert,
  TextInput,
} from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchPosts, addLike, addComment } from "../redux/postSlice";
import { RootStackParamList } from "../types/type";
import imageMapping from "../utils/ImgMapping";

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
  const { user } = route.params;

  const [commentText, setCommentText] = useState<string>("");
  const [currentPostId, setCurrentPostId] = useState<number | string | null>(
    null
  );

  useEffect(() => {
    if (user) {
      dispatch(fetchPosts());
    }
  }, [user, dispatch]);

  if (loading) {
    return <ActivityIndicator size="large" color="blue" />;
  }

  if (error) {
    return <Text style={{ color: "red" }}>Error: {error}</Text>;
  }

  const handleLike = (postId: string) => {
    const post = posts.find(post => post.id === postId); 
    if (post) {
      dispatch(addLike(postId));
    }
  };
  

  const handleAddComment = () => {
    if (commentText && currentPostId) {
      dispatch(addComment({
        postId: String(currentPostId), 
        comment: {
          text: commentText,
          authorId: user?.id || "unknown-author", 
        },
      }));
      setCommentText(''); 
    } else {
      Alert.alert("Error", "comment or post!");
    }
  };
  
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          navigation.navigate("NewPost");
        }}
      >
        <Text>add a new post ➕</Text>
      </Pressable>

      {user && (
        <>
          <Text style={styles.userName}>Välkommen, {user.name}!</Text>
          <Image style={styles.userImage} source={imageMapping[user?.avatar]}/>
        </>
      )}

      <FlatList
        data={posts.filter((post) => String(post.authorId) === user?.id)}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.post}>
            <Text style={styles.postTitle}>{item.title}</Text>
            <Text style={styles.postContent}>{item.text}</Text>

            <Pressable onPress={() => handleLike(item.id)}>
              <Text style={styles.likeButton}>
                Like {item.likes }
              </Text>
            </Pressable>

            <FlatList
              data={item.comments}
              keyExtractor={(comment) => comment.id}
              renderItem={({ item }) => (
                <Text style={styles.comment}>
                  Comment:{" "}
                  {typeof item === "string" ? item : JSON.stringify(item)}
                </Text>
              )}
            />

            {currentPostId === item.id && (
              <View>
                <TextInput
                  placeholder="comment..."
                  value={commentText}
                  onChangeText={setCommentText}
                />
                <Pressable onPress={handleAddComment}>
                  <Text>Send</Text>
                </Pressable>
              </View>
            )}

            <Pressable onPress={() => setCurrentPostId(item.id)}>
              <Text style={styles.addComment}>Add comment</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  userImage: {
    width: "100%",
    height: 100,
    resizeMode: "contain",
    marginBottom: 20,
  },
  post: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    marginBottom: 15,
    borderRadius: 5,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  postContent: {
    fontSize: 16,
    color: "#333",
  },
  likeButton: {
    color: "blue",
    marginTop: 10,
  },
  comment: {
    fontSize: 14,
    color: "gray",
  },
  addComment: {
    fontSize: 14,
    color: "blue",
    marginTop: 10,
  },
});

export default Profile;
