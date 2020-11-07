import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Metrics, Colors, Fonts } from "../../theme/";
import { scale } from "react-native-size-matters";
import Text from "./Text";

export default function Button({
  title,
  onPress,
  style,
  outlinePrimary,
  outlineSecondary,
  secondary,
  width,
  height,
  color,
  noBorder,
  captionText,
  disabled,
  fullWidth = false,
}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          styles.container,
          outlinePrimary && styles.outlinePrimary,
          fullWidth && styles.fullWidth,
          width && { width },
          height && { height },
          secondary && { backgroundColor: "#FFF9C0" },
          noBorder && { borderWidth: 0 },
          style,
        ]}
      >
        <Text
          fwBold
          body
          centered
          caption={captionText}
          primaryColor={outlinePrimary}
          style={[styles.text]}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: Colors.secondary,
    borderColor: "#EDD81F",
    borderRadius: Metrics.btnBorderRadius,
    height: Metrics.btnHeight,
    alignItems: "center",
    borderWidth: 1,
  },

  text: {
    width: "100%",
  },

  outlinePrimary: {
    borderColor: Colors.primary,
    backgroundColor: "transparent",
    borderWidth: 1,
  },

  fullWidth: {
    width: "100%",
  },
});
