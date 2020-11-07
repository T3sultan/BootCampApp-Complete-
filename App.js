import React from "react";
import { StyleSheet } from "react-native";
import { useFonts } from "@use-expo/font";
import { AppLoading } from "expo";
import RootNavigation from "./src/navigation/RootNavigation";

export default function App() {
  const [fontsLoaded] = useFonts({
    EncodeSansRegular: require("./assets/fonts/EncodeSans-Regular.ttf"),
    EncodeSansBold: require("./assets/fonts/EncodeSans-Bold.ttf"),
    MontserratRegular: require("./assets/fonts/Montserrat-Regular.ttf"),
    MontserratBold: require("./assets/fonts/Montserrat-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return <RootNavigation />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
