import React from "react";
import { View, Text as RNText, StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { Colors, Fonts } from "../../theme";

const styles = StyleSheet.create({
  text: {
    fontSize: Fonts.size.body, //14,
    fontFamily: Fonts.type.base,
    color: Colors.text,
  },
});

export default function Text(props) {
  const {
    children,
    mega,
    jumbo,
    display,
    headline,
    title,
    subheader,
    caption,
    small,
    bold,
    semiBold,
    lightGrey,
    midGrey,
    darkGrey,
    underline,
    fwNormal,
    fw500,
    fw600,
    fwBold,
    color,
    error,
    white,
    primaryColor,
    centered,
    alignRight,
    lh,
    style,
    numberOfLines
  } = props;

  return (
    <RNText
      style={[
        styles.text,
        bold && { fontFamily: Fonts.type.bold },
        semiBold && { fontFamily: Fonts.type.boldRegular },
        small && { fontSize: moderateScale(Fonts.size.small) },
        caption && { fontSize: moderateScale(Fonts.size.caption) },
        subheader && { fontSize: moderateScale(Fonts.size.subheader) },
        title && { fontSize: moderateScale(Fonts.size.title) },
        headline && { fontSize: moderateScale(Fonts.size.headline) },
        jumbo && { fontSize: moderateScale(Fonts.size.jumbo) },
        display && { fontSize: moderateScale(Fonts.size.display) },
        mega && { fontSize: moderateScale(Fonts.size.mega) },
        error && { color: Colors.error },
        lightGrey && { color: Colors.lightGrey },
        midGrey && { color: Colors.midGrey },
        darkGrey && { color: Colors.darkGrey },
        white && { color: Colors.white },
        color && { color: color },
        primaryColor && { color: Colors.primary },
        underline && { textDecorationLine: "underline" },
        centered && { textAlign: "center" },
        alignRight && { textAlign: "right" },
        fwNormal && { fontWeight: "normal" },
        fw500 && { fontWeight: "500" },
        fw600 && { fontWeight: "600" },
        fwBold && { fontWeight: "bold" },
        lh && { lineHeight: lh },
        style,
      ]}
      numberOfLines={numberOfLines}
    >
      {children}
    </RNText>
  );
}
