import { ActivityIndicator, View } from "react-native";
import React from "react";

import { container } from "../../styles/styles";

const Loading = () => {
  return (
    <View style={[container, { justifyContent: "center" }]}>
      <ActivityIndicator size={"large"} color="#19ece8" />
    </View>
  );
};

export default Loading;
