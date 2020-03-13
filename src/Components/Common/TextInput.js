import React from "react";
import { Text, StyleSheet } from "react-native";
import { Item, Input } from "native-base";
import style from "./style/input";

export default ({
  form,
  formKey,
  ref,
  setRef,
  inlineValidation,
  containerStyle,
  ...rest
}) => {
  return (
    <Item style={containerStyle}>
      <Input
        placeholderTextColor="#000000"
        style={style.input}
        autoCorrect={false}
        autoCapitalize="none"
        returnKeyType="next"
        onChangeText={form.handleChange(formKey)}
        ref={(ref) => setRef(ref)}
        {...rest}
      />
      {inlineValidation && (
        <Text style={style.m_error_msg}>{form.errors[formKey.toString()]}</Text>
      )}
    </Item>
  );
};
