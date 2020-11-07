import { Dimensions, Platform } from "react-native";
import { scale } from "react-native-size-matters";

const { width, height } = Dimensions.get("window");

const metrics = {
  header: scale(60),
  base: scale(20),
  halfBase: scale(10),
  doubleBase: scale(40),
  screenWidth: width,
  screenHeight: height,
  btnHeight: scale(40),
  btnBorderRadius: scale(30),
};

export default metrics;
