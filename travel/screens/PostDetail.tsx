import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { Post, RootStackParamList } from "../types/type";
import postImageMapping from "../utils/postImgMappinf";
import { RootState } from "../redux/store";
import Button from "../components/buttons/Button";
import { ScrollView } from "react-native-gesture-handler";
import { updatePost } from "../travelApi/travelApi";

type PostDetailRouteProp = RouteProp<RootStackParamList, "PostDetail">;

const PostDetail = () => {
  const route = useRoute<PostDetailRouteProp>();
  const { post } = route.params;
  const activeUser = useSelector((state: RootState) => state.users.activeUser);
  const [currentPost, setCurrentPost] = useState<Post | null>(post);
  const [commentText, setCommentText] = useState<string>("");

  useEffect(() => {
    if (!currentPost) {
      Alert.alert("Error", "Post not found");
    }
  }, [currentPost]);

  const handleLike = async () => {
    if (currentPost?.authorId === activeUser?.id) {
      Alert.alert("You cannot like your own post!");
      return;
    }

    if (currentPost) {
      const updatedPost = { ...currentPost, likes: currentPost.likes + 1 };
      try {
        const result = await updatePost(updatedPost);
        setCurrentPost(result);
      } catch (error) {
        console.error("Error liking post:", error);
      }
    }
  };

  const handleAddComment = async () => {
    if (commentText.trim()) {
      if (currentPost) {
        const newComment = {
          id: String(Date.now()),
          text: commentText,
          authorId: activeUser?.id || "unknown-author",
        };
        const updatedPost = {
          ...currentPost,
          comments: [...currentPost.comments, newComment],
        };

        try {
          const result = await updatePost(updatedPost);
          setCurrentPost(result);
          setCommentText("");
        } catch (error) {
          console.error("Error adding comment:", error);
        }
      }
    } else {
      Alert.alert("Error", "Please enter a comment before submitting!");
    }
  };

  if (!currentPost) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{currentPost.title}</Text>
      <Image
        style={styles.postImage}
        source={postImageMapping[currentPost.image]}
      />
      <Text style={styles.content}>{currentPost.text}</Text>
      <Text style={styles.author}>Country: {currentPost.country}</Text>
      <Text style={styles.author}>City: {currentPost.city}</Text>
      <Pressable onPress={handleLike}>
        <Text style={styles.likeButton}>Like: {currentPost.likes}</Text>
      </Pressable>
      <Text style={styles.commentTitle}>Comments</Text>
      <ScrollView style={styles.commentsContainer}>
        {currentPost.comments.length > 0 ? (
          currentPost.comments.map((comment) => (
            <Text key={comment.id} style={styles.comment}>
              - {comment.text}
            </Text>
          ))
        ) : (
          <Text style={styles.comment}>No comments yet!</Text>
        )}
      </ScrollView>
      <TextInput
        style={styles.commentInput}
        placeholder="Add a comment..."
        value={commentText}
        onChangeText={setCommentText}
      />
      <Button title="Add" onPress={handleAddComment} style={styles.button} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#2C3E50",
  },
  content: {
    fontSize: 16,
    marginBottom: 20,
    color: "#2C3E50",
  },
  author: {
    fontSize: 16,
    color: "#2C3E50",
  },
  likeButton: {
    marginTop: 20,
    fontSize: 20,
    color: "teal",
    marginBottom: 10,
    textDecorationLine: "underline",
  },
  commentTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    color: "#2C3E50",
  },
  commentsContainer: {
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#CBD5E0",
    marginVertical: 15,
    padding: 10,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 8,
    elevation: 10,
  },
  comment: {
    fontSize: 16,
    color: "#2C3E50",
    marginLeft: 10,
    marginBottom: 5,
  },
  commentInput: {
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#CBD5E0",
    marginVertical: 0,
    padding: 10,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 8,
    elevation: 10,
  },
  postImage: {
    width: "100%",
    height: 200,
    marginBottom: 10,
  },
  button: {
    paddingBottom: 50,
    marginTop: 10,
    alignSelf: "center",
  },
});

export default PostDetail;
