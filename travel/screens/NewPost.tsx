import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity , Image} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { addPost } from '../redux/postSlice';
import { Post } from '../types/type';
import { addPoster } from '../travelApi/travelApi';
import postImageMapping from '../utils/postImgMappinf';
import Button from '../components/buttons/Button';

const availableImages = Object.keys(postImageMapping);

const NewPost = () => {
  const dispatch = useDispatch();
  const activeUser = useSelector((state: RootState) => state.users.activeUser);
  const [text, setText] = useState(''); 
  const [title, setTitle] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setError(null);

    if (!activeUser) {
      setError("Please select a user before creating a post.");
      return;
    }
    if (!text.trim() || !title.trim()) {
      setError("Both title and content are required.");
      return;
    }

    const newPost: Post = {
      id: Date.now().toString(),
      title,
      text, 
      authorId: activeUser.id,
      comments: [],
      likes: 0,
      country,
      city,
      image
    };

    try {
      const addedPost = await addPoster(newPost); 
      dispatch(addPost(addedPost)); 
      setText(''); 
      setTitle(''); 
      setCountry("");
      setCity("");
      setImage("")
    } catch (err) {
      setError('Failed to create the post. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a new post</Text>
      <Text style={styles.subtitle}>
        Posting as {activeUser?.name || "No user selected"}
      </Text>
      {error && <Text style={styles.error}>{error}</Text>}

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Content"
          value={text} 
          onChangeText={setText}
          multiline
        />
         <TextInput
          style={styles.input}
          placeholder="Country"
          value={country}
          onChangeText={setCountry}
        />
         <TextInput
          style={styles.input}
          placeholder="City"
          value={city}
          onChangeText={setCity}
        />
           <Text style={{fontSize: 18}}>Coose picture..⬇️</Text>
         <ScrollView horizontal style={styles.imageSelector}>
          {availableImages.map((imageName) => (
            <TouchableOpacity
              key={imageName}
              onPress={() => setImage(imageName)}
            >
              <Image source={postImageMapping[imageName]} style={styles.images} />
            </TouchableOpacity>
          ))}
        </ScrollView>


        {image && (
          <Image source={postImageMapping[image]} style={styles.selectedImage} />
        )}
        <Button onPress={handleSubmit} title="Post" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f1f1f1',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
    color: "teal"
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 15,
  },
  form: {
    width: '100%',
  }
  ,
  imageSelector: {
    marginBottom: 40,
    marginTop: 40,
  },
  images: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  selectedImage: {
    width: 150,
    height: 150,
    flex: 1,
    alignSelf: "center",
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 2,
    marginBottom: 25,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "white"
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
});

export default NewPost;
