import { RouteProp } from '@react-navigation/native';
import React from 'react';
import { View, Text } from 'react-native';
import { RootStackParamList } from '../types/type';

type PostDetailsRouteProp = RouteProp<RootStackParamList, 'PostDetails'>;

type PostDetailsProps = {
  route: PostDetailsRouteProp;
};

const PostDetails = ({ route }: PostDetailsProps) => {
  const { id } = route.params;

  return (
    <View>
      <Text>Post Details for ID: {id}</Text>
    </View>
  );
};

export default PostDetails;
