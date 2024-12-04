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
  const [commentText, setCommentText] = useState<string>('');
  const currentPost = posts.find((item) => item.id === post.id);

  useEffect(() => {
    if (!currentPost) {
      Alert.alert('Error', 'Post not found');
    }
  }, [currentPost]);

 
  const handleLike = (postId: string) => {
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
        <Text style={styles.likeButton}>Likes: {currentPost.likes}</Text> 
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
      <Button title="Add Comment" onPress={handleAddComment}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    marginBottom: 20,
  },
  author: {
    fontSize: 14,
    color: 'gray',
  },
  likeButton: {
    marginTop: 20,
    fontSize: 18,
    color: 'teal',
    marginBottom: 10,
  },
  commentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  commentsContainer: {
    marginTop: 10,
  },
  comment: {
    fontSize: 14,
    color: '#444',
    marginLeft: 10,
    marginBottom: 5,
  },
  commentInput: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 14,
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  postImage: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
});

export default PostDetail;
