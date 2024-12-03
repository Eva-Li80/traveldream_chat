import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AllPosts from "../screens/AllPosts";
import PostDetails from "../screens/PostDetails";
import { RootStackParamList } from "../types/type";

const AllPostsStack = createStackNavigator<RootStackParamList>();

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
    </AllPostsStack.Navigator>
  );
}
