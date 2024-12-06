import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import AllPosts from "../screens/AllPosts";
import AddProfile from "../screens/AddProfile";
import ChooseProfile from "../screens/ChooseProfile";
import { faHome, faList, faPlusCircle, faUser, faUserCircle, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const Tab = createBottomTabNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "#2C3E50",
        tabBarInactiveTintColor: "gray", 
        tabBarIcon: ({ color, size }) => {
          let icon;
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
            case "AllPosts":
              icon = faList;
              break;
              case "ChooseProfile":
                icon = faUserCircle;
                break;
            default:
              icon = faHome;
          }
          return <FontAwesomeIcon icon={icon} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="AllPosts" component={AllPosts} />
      <Tab.Screen name="AddProfile" component={AddProfile} />
      <Tab.Screen name="ChooseProfile" component={ChooseProfile} />
    </Tab.Navigator>
  );
};

export default MyTabs;
