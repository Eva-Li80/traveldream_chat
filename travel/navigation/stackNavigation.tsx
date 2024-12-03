import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AllPosts from "../screens/AllPosts";
import PostDetails from "../screens/PostDetails";
import { RootStackParamList } from "../types/type";
import Home from "../screens/Home";
import Profile from "../screens/Profile";

const AllPostsStack = createNativeStackNavigator<RootStackParamList>();

export default function StackNav() {
  return (
    <AllPostsStack.Navigator>
      <AllPostsStack.Screen name="AllPosts" 
      component={AllPosts} 
      options={{
        headerShown: false,
      }} />
      <AllPostsStack.Screen
        name="PostDetails"
        component={PostDetails}
        options={{ title: "Post Details" }}
      />
      <AllPostsStack.Screen 
        name="Home" 
        component={Home} 
        options={{
          title: 'Home'
        }}
      />
      <AllPostsStack.Screen 
        name="Profile" 
        component={Profile} 
        options={{
          title: 'Profile',
        }}
      />
    </AllPostsStack.Navigator>
  );
}
