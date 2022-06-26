import React from "react";
import { StyleSheet, View } from "react-native";

import LottieView from "lottie-react-native";

export default function SimpleAnimation() {
  return (
    <View>
      <LottieView
        source={require("./girlani.json")}
        style={styles.animation}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  animation: {
    width: 100,
    height: 100,
  },
});