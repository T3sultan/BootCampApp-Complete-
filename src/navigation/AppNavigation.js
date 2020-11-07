import React from "react";
import { Image, View, Text, Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/app/Home/Home";
import Bookmark from "../screens/app/Bookmark/Bookmark";
import Profile from "../screens/app/Profile/Profile";
import ProfileEdit from "../screens/app/Profile/ProfileEdit"
import HomeDetails from "../screens/app/Home/HomeDetails"
import Create from "../screens/app/Create/Create";
import { Images } from "../theme";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? Images.homeActive : Images.homeInactive;
          } else if (route.name === "Bookmark") {
            iconName = focused ? Images.heartActive : Images.heartInactive;
          } else if (route.name === "Profile") {
            iconName = focused ? Images.profileActive : Images.profileInactive;
          } else if (route.name === "Create") {
            iconName = Images.add;
          }

          return (
            <Image
              resizeMode="contain"
              style={{ width: 24, height: 24 }}
              source={iconName}
            />
          );
        },
        tabBarLabel: () => null,
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Bookmark" component={Bookmark} />
      <Tab.Screen name="Profile" component={Profile}/>
      <Tab.Screen name="Create" component={Create} />
      {/* <Tab.Screen name="stackScreens" component= {stackScreens} /> */}
    </Tab.Navigator>
  );
}

export default function AuthNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeTabs} options={{headerShown:false}} />
      <Stack.Screen name="ProfileEdit" component={ProfileEdit} options={{headerShown:false}} />
      <Stack.Screen name="HomeDetails" component={HomeDetails} options={{headerShown:false}}/>
    </Stack.Navigator>
  );
}
