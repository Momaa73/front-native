// OrdersByStatusScreen.js
import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import OrderCard from "./orderCard";
import axios from "axios";

const OrdersByStatusScreen = ({ status }) => {
  const [orders, setOrders] = useState([]);

  const fetchOrdersByStatus = async () => {
    try {
      const response = await axios.get(
        `https://cofee-shop-7170efe7f047.herokuapp.com/api/admin/orders?status=${status}`
      );
      setOrders(response.data);
    } catch (error) {
      console.error(`Error fetching ${status} orders:`, error);
    }
  };

  useEffect(() => {
    fetchOrdersByStatus();
  }, [status]);

  /*const handleChangeStatus = async (orderId) => {
    try {
      // Implement logic to change the status of the order with orderId
      // This might involve making another axios request to update the server
      // and then fetching the updated orders again.
    } catch (error) {
      console.error(`Error changing ${status} order status:`, error);
    }
  };*/

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>{status} Orders</Text>
      {orders.map((order) => (
        <OrderCard
          key={order.id}
          order={order}
          onChangeStatus={handleChangeStatus}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
});
export default OrdersByStatusScreen;
