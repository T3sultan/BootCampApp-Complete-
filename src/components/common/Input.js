import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Input, Label, Item, Icon } from "native-base";
import { Colors, Metrics, Fonts } from "../../theme/";

export default function FormInput({
  placeholder,
  formikProps,
  formikKey,
  autoCapitalize,
  secureTextEntry,
  autoCompleteType,
  style,
  maxChar,
  hint,
  multiline,
  textStyle,
}) {
  const [borderColor, setBorderColor] = useState(Colors.lightGrey);

  const onFocus = () => {
    setBorderColor(Colors.darkGrey);
  };

  return (
    <View style={styles.wrapper}>
      <Item style={[{ borderColor }]} floatingLabel>
        <Label style={styles.label}>{placeholder}</Label>
        <Input
          onChangeText={formikProps.handleChange(formikKey)}
          autoCapitalize={autoCapitalize}
          autoCompleteType={autoCompleteType}
          autoCorrect={false}
          secureTextEntry={secureTextEntry}
          value={formikProps.values[formikKey]}
          style={[styles.label, { color: Colors.darkGrey }, textStyle]}
          multiline={multiline}
          onFocus={onFocus}
          onBlur={() => {
            formikProps.setFieldTouched(formikKey, true);
            setBorderColor(Colors.lightGrey);
          }}
        />
      </Item>

      {formikProps.touched[formikKey] && formikProps.errors[formikKey] && (
        <Text style={[styles.label, styles.error]}>
          {formikProps.errors[formikKey]}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: Metrics.doubleBase,
  },

  label: {
    color: Colors.lightGrey,
    fontSize: Fonts.size.body,
    fontFamily: Fonts.type.base,
  },

  error: {
    color: Colors.error,
    fontSize: Fonts.size.caption,
  },
});
