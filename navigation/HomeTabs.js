import {
  ImageBackground,
  TouchableOpacity,
  Platform,
  Text,
  View,
} from "react-native";
import HomeScreen from "../screens/HomeScreen";
import Profile from "../screens/ProfileSreen";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { themeColors } from "../theme";
import CartScreen from "../screens/CartBagScreen";
import HistoryScreen from "../screens/HistoryOrdersScreen";

import {
  HomeIcon as HomeOutline,
  ShoppingBagIcon as BagOutline,
  Bars3BottomLeftIcon as ListOutline,
  UserCircleIcon as UserOutline,
} from "react-native-heroicons/outline";
import {
  HomeIcon as HomeSolid,
  ShoppingBagIcon as BagSolid,
  Bars3BottomLeftIcon as ListSolid,
  UserCircleIcon as UserSolid,
} from "react-native-heroicons/solid";

const Tab = createBottomTabNavigator();
const ios = Platform.OS == "ios";

export default function AppNavigation() {
  return (
    <ImageBackground
      source={require("../assets/images/bgimg.png")}
      style={{
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
      }}
    >
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => menuIcons(route, focused),
          tabBarStyle: {
            marginBottom: 20,
            height: 75,
            alignItems: "center",

            borderRadius: 100,
            marginHorizontal: 20,
            backgroundColor: themeColors.bgLight,
          },
          tabBarItemStyle: {
            marginTop: ios ? 30 : 0,
          },
        })}
      >
        <Tab.Screen name="home" component={HomeScreen} />
        <Tab.Screen name="cart" component={HomeScreen} /> {/*to change to CartScreen when the page is ready*/}
        <Tab.Screen name="history" component={HistoryScreen} />
        {/* .
        <Tab.Screen name="profile" component={Profile} />
      */}
      </Tab.Navigator>
    </ImageBackground>
  );
}

const menuIcons = (route, focused) => {
  let icon;

  if (route.name === "home") {
    icon = focused ? (
      <HomeSolid size="30" color={themeColors.bgLight} />
    ) : (
      <HomeOutline size="30" strokeWidth={2} color="white" />
    );
  } else if (route.name === "cart") {
    icon = focused ? (
      <BagSolid size="30" color={themeColors.bgLight} />
    ) : (
      <BagOutline size="30" strokeWidth={2} color="white" />
    );
  } else if (route.name === "history") {
    icon = focused ? (
      <ListSolid size="30" color={themeColors.bgLight} />
    ) : (
      <ListOutline size="30" strokeWidth={2} color="white" />
    );
  } else if (route.name === "profile") {
    icon = focused ? (
      <UserSolid size="30" color={themeColors.bgLight} />
    ) : (
      <UserOutline size="30" strokeWidth={2} color="white" />
    );
  }

  let buttonClass = focused ? "bg-white" : "";
  return (
    <View
      className={"flex items-center rounded-full p-3 shadow " + buttonClass}
    >
      {icon}
    </View>
  );
};