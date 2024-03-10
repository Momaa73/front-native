// MainScreen.js
import React from "react";
import { View, StyleSheet } from "react-native";
import OrdersByStatusScreen from "../../components/barista/OrdersByStatusScreen";

const BaristaScreen = () => {
  return (
    <View style={styles.container}>
      <OrdersByStatusScreen status="new" />
      <OrdersByStatusScreen status="in-progress" />
      <OrdersByStatusScreen status="ready" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default BaristaScreen;
