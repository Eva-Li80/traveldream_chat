import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faHome,
  faUser,
  faUserPlus,
  faPlusCircle,
  faList,
} from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import AddProfile from "../screens/AddProfile";
import NewPost from "../screens/NewPost";
import StackNav from "./stackNavigation";

const Tab = createBottomTabNavigator();

export default function TabNav() {
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let icon: IconProp;

            switch (route.name) {
              case "Home":
                icon = faHome;
                break;
              case "Profile":
                icon = faUser;
                break;
              case "AddProfile":
                icon = faUserPlus;
                break;
              case "NewPost":
                icon = faPlusCircle;
                break;
              case "Posts":
                icon = faList;
                break;
              default:
                icon = faHome;
            }

            return (
              <FontAwesomeIcon icon={icon} size={size || 24} color={color} />
            );
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
            backgroundColor: "#fff",
          },
          headerShown: true,
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Profile" component={Profile} />
        <Tab.Screen name="AddProfile" component={AddProfile} />
        <Tab.Screen name="NewPost" component={NewPost} />
        <Tab.Screen name="AllPosts" component={StackNav} options={{
        headerShown: false,
      }} />
      </Tab.Navigator>
  );
}
