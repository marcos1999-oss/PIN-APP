import React from "react";
import { View, Text, Button, ActivityIndicator } from "react-native";

import { scale } from "../../Utils/scaling";

export default (props) => {
  if (!props.submit) {
    return <View />;
  }

  if (props.isSubmitting) {
    return (
      <View style={{ marginRight: 10 }}>
        <ActivityIndicator size="small" color="#fff" />
      </View>
    );
  }

  return (
    <Button
      transparent
      onPress={props.submit}
      title="Save"
      color="white"
    />
  );
};
