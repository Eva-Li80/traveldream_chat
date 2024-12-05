import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, Pressable, Alert } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { addLike, addComment } from '../redux/postSlice';
import { RootStackParamList } from '../types/type';
import postImageMapping from '../utils/postImgMappinf';
import { RootState } from '../redux/store';
import Button from '../components/buttons/Button';

type PostDetailRouteProp = RouteProp<RootStackParamList, 'PostDetail'>;

const PostDetail = () => {
  const route = useRoute<PostDetailRouteProp>();
  const dispatch = useDispatch();
  const { post } = route.params;
  const posts = useSelector((state: RootState) => state.posts.posts);
  const activeUser = useSelector((state: RootState) => state.users.activeUser);
  const [commentText, setCommentText] = useState<string>('');
  const currentPost = posts.find((item) => item.id === post.id);

  useEffect(() => {
    if (!currentPost) {
      Alert.alert('Error', 'Post not found');
    }
  }, [currentPost]);

 
  const handleLike = (postId: string) => {
    if(currentPost?.authorId === activeUser?.id){
      Alert.alert("you can not like your own post!")
      return;
    }
    dispatch(addLike(postId)); 
  };

  const handleAddComment = () => {
    if (commentText.trim()) {
      dispatch(
        addComment({
          postId: post.id,
          comment: { text: commentText, authorId: 'unknown-author' },
        })
      );
      setCommentText(''); 
    } else {
      Alert.alert('Error', 'Please enter a comment before submitting!');
    }
  };

  if (!currentPost) {
    return <Text>Loading...</Text>; 
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{currentPost.title}</Text>
      <Image
        style={styles.postImage}
        source={postImageMapping[currentPost.image]}
      />
      <Text style={styles.content}>{currentPost.text}</Text>
      <Text style={styles.author}>Country: {currentPost.country}</Text>
      <Text style={styles.author}>City: {currentPost.city}</Text>
      <Pressable onPress={() => handleLike(currentPost.id)}>
        <Text style={styles.likeButton}>Like: {currentPost.likes}</Text> 
      </Pressable>
      <Text style={styles.commentTitle}>Comments</Text>
       <View style={styles.commentsContainer}>
        {currentPost.comments.length > 0 ? (
          currentPost.comments.map((comment) => (
            <Text key={comment.id} style={styles.comment}>- {comment.text}</Text>
          ))
        ) : (
          <Text style={styles.comment}>No comments yet!</Text>
        )}
      </View>
      <TextInput
        style={styles.commentInput}
        placeholder="Add a comment..."
        value={commentText}
        onChangeText={setCommentText}
      />
      <Button title="Add" onPress={handleAddComment}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
    fontWeight: 'bold',
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
    color: 'teal',
    marginBottom: 10,
    textDecorationLine: "underline",
  },
  commentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    color: "#2C3E50",
  },
  commentsContainer: {
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
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.2, 
    shadowOffset: { width: 0, height: 8 }, 
    shadowRadius: 8,
    elevation: 10, 
  },
  postImage: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
});

export default PostDetail;
