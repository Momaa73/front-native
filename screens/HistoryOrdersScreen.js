import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage

import axios from "axios";

const ShowOrders = () => {
  const fetchPosts = async (url, token) => {
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      };
      const res = await axios.get(url, config);
      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userAuthString = await AsyncStorage.getItem("userAuthDetails");
        if (userAuthString) {
          const userAuth = JSON.parse(userAuthString);
          const token = userAuth.user.token;
          const userId = userAuth.user.user.id;
          fetchPosts(
            "https://cofee-shop-7170efe7f047.herokuapp.com/api/orders/" +
              userId,
            token
          );
        }
      } catch (error) {
        console.error(
          "Error retrieving userAuthDetails from AsyncStorage:",
          error
        );
      }
    };

    fetchData();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Order Details:</Text>
      <FlatList
        data={ShowOrders}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item: user }) => (
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontWeight: "bold" }}>
              Customer Name: {user.user.name}
            </Text>
            <Text>Email: {user.user.email}</Text>
            <FlatList
              data={user.order}
              keyExtractor={(order) => order.id.toString()}
              renderItem={({ item: order }) => (
                <View style={{ marginVertical: 5 }}>
                  <Text>
                    Item name: {order.name}, Price: ${order.price}, Units
                    Bought: {order.units}
                  </Text>
                </View>
              )}
            />
            <View style={{ marginVertical: 5 }}>
              <Text style={{ fontWeight: "bold" }}>
                Total Quantity: {user.orderTotalQuantity}, Total Amount: $
                {user.orderTotalAmount}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default ShowOrders;
