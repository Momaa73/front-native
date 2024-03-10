// OrderCard.js
import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const OrderCard = ({ order, onChangeStatus }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.orderName}>Order: {order.name}</Text>
      <Button title="Change Status" onPress={() => onChangeStatus(order.id)} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 16,
    margin: 8,
  },
  orderName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
});

export default OrderCard;
