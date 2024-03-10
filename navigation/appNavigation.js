import React, { useState, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeTabs from "./HomeTabs";
import Authorize from "../components/Login/Authorise";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LogBox } from "react-native";
import { themeColors } from "../theme";
import ProductScreen from "../screens/ProductScreen"  //new
import HomeScreen from "../screens/HomeScreen"  //new
import LoginScreen from "../screens/LoginScreen"

const Stack = createNativeStackNavigator();

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

export default function AppNavigation() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const getUserAuthentication = async (authDetails) => {
    try {
      if (authDetails.isAuthorised) {
        await AsyncStorage.setItem(
          "userAuthDetails",
          JSON.stringify(authDetails)
        );
      } else {
        await AsyncStorage.removeItem("userAuthDetails");
      }
      setIsLoggedIn(authDetails.isAuthorised);
    } catch (error) {
      console.error("Error managing user authentication details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Load authentication state
    const checkUserAuthentication = async () => {
      try {
        const userAuth = await AsyncStorage.getItem("userAuthDetails");
        if (userAuth) {
          const parsedUserAuth = JSON.parse(userAuth);
          console.log("userAuth", userAuth);

          setIsLoggedIn(parsedUserAuth.isAuthorised);
        }
      } catch (error) {
        console.error("Error reading user authentication details", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUserAuthentication();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <ActivityIndicator size="large" color="#0000ff" />
      <Stack.Navigator
        screenOptions={{
          cardStyle: { backgroundColor: "white" },
        }}
        initialRouteName={isLoggedIn ? "Home" : "Login"}
      >
        <Stack.Screen
          name="Home"
          options={{ headerShown: false }}
          component={HomeScreen}
        />
        <Stack.Screen
          name="Product"
          options={{ headerShown: false }}
          component={ProductScreen}
        />
        <Stack.Screen
          name="Login"
          options={{ headerShown: false }}
          component={LoginScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const LoadingScreen = () => <ActivityIndicator size="large" color="#0000ff" />;
