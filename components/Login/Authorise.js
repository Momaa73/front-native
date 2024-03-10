import React, { useState, useEffect } from "react";
import { View, Text, AsyncStorage } from "react-native";
import SignIn from "../../screens/LoginScreen"; // Update this path according to your file structure
import axios from "axios";

export default function Authorize(props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");

  const authenticateUser = async ({ email, password }) => {
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
      };
      const response = await axios.post(
        "https://cofee-shop-7170efe7f047.herokuapp.com/api/auth/",
        { email, password },
        config
      );

      const data = { user: response.data, isAuthorised: true };
      setIsAuthenticated(true);
      await AsyncStorage.setItem("userAuthDetails", JSON.stringify(data));
      if (props.authUser) {
        props.authUser(data);
      }
    } catch (err) {
      console.error("Authentication error:", err.response ? err.response.data : err);
      setError("Invalid Credentials");
    }
  };

  const checkUserAuthentication = async () => {
    try {
      const userAuthDetails = await AsyncStorage.getItem("userAuthDetails");
      if (userAuthDetails) {
        const parsedUserAuth = JSON.parse(userAuthDetails);
        if (parsedUserAuth.isAuthorised) {
          setIsAuthenticated(true);
        }
      }
    } catch (error) {
      console.error("Error reading user authentication details:", error);
    }
  };

  useEffect(() => {
    checkUserAuthentication();
  }, []);

  if (isAuthenticated) {
    return (
      <View>
        <Text>User is authenticated</Text>
      </View>
    );
  }

  return (
    <View style={{ margin: 100 }}>
      {error && <Text style={{ color: "red", marginVertical: 10 }}>{error}</Text>}
      <SignIn authenticateUser={authenticateUser} />
    </View>
  );
}