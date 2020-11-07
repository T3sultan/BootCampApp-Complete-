import React from "react";
import { View, Text, Image } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/auth/Login";
import Signup from "../screens/auth/Signup";
import { Images, Metrics } from "../theme";

const Stack = createStackNavigator();

export default function AuthNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{
          headerStyle: {
            shadowOffset: {
              height: 0,
            },
          },
          headerTitleAlign: "left",
          headerBackTitleVisible: false,
          headerBackImage: () => {
            return (
              <Image
                source={Images.back}
                style={{ marginLeft: Metrics.base }}
              />
            );
          },
        }}
      />
    </Stack.Navigator>
  );
}
