import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyTabs from './tabNavigation';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import AllPosts from '../screens/AllPosts';
import NewPost from '../screens/NewPost';
import Profiles from '../screens/Profiles';


const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Tabs" 
        component={MyTabs} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Home" 
        component={Home} 
        options={{
          title: 'Home', 
          headerBackVisible: true,
          headerBackTitle: 'Back', 
        }}
      />
      <Stack.Screen 
        name="Profiles" 
        component={Profiles} 
        options={{
          title: 'Profiles',
          headerBackVisible: true,
          headerBackTitle: 'Back', 
        }}
      />
       <Stack.Screen 
        name="Profile" 
        component={Profile} 
        options={{
          title: 'Profile',
          headerBackVisible: true,
          headerBackTitle: 'Back', 
        }}
      />
       <Stack.Screen 
        name="AllPosts" 
        component={AllPosts} 
        options={{
          title: 'AllPosts',
          headerBackVisible: true,
          headerBackTitle: 'Back', 
        }}
      />
       <Stack.Screen 
        name="NewPost" 
        component={NewPost} 
        options={{
          title: 'NewPost',
          headerBackVisible: true,
          headerBackTitle: 'Back', 
        }}
      />
    </Stack.Navigator>
  );
};

export default MyStack;
