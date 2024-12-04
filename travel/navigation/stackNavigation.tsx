import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AllPosts from "../screens/AllPosts";
import PostDetails from "../screens/PostDetails";
import { RootStackParamList } from "../types/type";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import NewPost from "../screens/NewPost";

const AllPostsStack = createNativeStackNavigator<RootStackParamList>();

export default function StackNav() {
  return (
    <AllPostsStack.Navigator>
      <AllPostsStack.Screen
        name="AllPosts"
        component={AllPosts}
        options={{
          headerShown: false,
        }}
      />
      <AllPostsStack.Screen
        name="PostDetails"
        component={PostDetails}
        options={{ title: "PostDetails" }}
      />
      <AllPostsStack.Screen
        name="Home"
        component={Home}
        options={{
          title: "",
        }}
      />
      <AllPostsStack.Screen
        name="Profile"
        component={Profile}
        options={{
          title: "Profile",
        }}
      />
        <AllPostsStack.Screen
        name="NewPost"
        component={NewPost}
        options={{
          title: "NewPost",
        }}
      />
    </AllPostsStack.Navigator>
  );
}
