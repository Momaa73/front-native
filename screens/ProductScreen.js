import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  Dimensions,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ArrowLeftCircleIcon,
  MinusIcon,
  PlusIcon,
} from "react-native-heroicons/outline";
import { HeartIcon, StarIcon } from "react-native-heroicons/solid";
import { themeColors } from "../theme";
import { ShoppingBag } from "react-native-feather";
const { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";

export default function FavouriteScreen(props) {
  const item = props.route.params;
  const [size, setSize] = useState("small");
  const navigation = useNavigation();
  const [quantity, setQuantity] = useState(0); // Initialize quantity state here

  // Define function to increase quantity
  const increaseQuantity = () => setQuantity(prevQuantity => prevQuantity + 1);

  // Define function to decrease quantity, ensuring it doesn't go below 0
  const decreaseQuantity = () => {
    setQuantity(prevQuantity => (prevQuantity > 0 ? prevQuantity - 1 : 0));
  };

  return (
    <ImageBackground
      source={require("../assets/images/bgimg.png")}
      style={{ flex: 1, resizeMode: "cover", justifyContent: "center" }}
    >
      <View className="flex-1">
        <SafeAreaView className="space-y-4 flex-1">
          <View className="mx-4 flex-row justify-between items-center">
            <TouchableOpacity
              className=" rounded-full "
              onPress={() => navigation.goBack()}
            >
              <ArrowLeftCircleIcon size="50" strokeWidth={1.2} color="white" />
            </TouchableOpacity>

            <TouchableOpacity className=" rounded-full border-2 border-white p-2">
              <HeartIcon size="24" color="white" />
            </TouchableOpacity>
          </View>
          <View
            style={{
              shadowColor: themeColors.bgDark,
              shadowRadius: 30,
              shadowOffset: { width: 0, height: 30 },
              shadowOpacity: 0.9,
            }}
            className="flex-row justify-center"
          >
            <View className="flex items-center justify-center mt-4 ml-5 mr-5 bg-gray-100 h-40 rounded-2xl w-800">
              <View className="flex items-center justify-center overflow-hidden aspect-w-1 aspect-h-1">
                <Image
                  source={{ uri: item.img }}
                  style={{ height: 100, width: 100 }}
                />
              </View>
            </View>
          </View>

          <View
            style={{ backgroundColor: themeColors.bgLight }}
            className="flex-row justify-center items-center mx-4 rounded-3xl p-1 px-2 space-x-1 opacity-90 w-16"
          >
            <StarIcon size="15" color="white" />
            <Text className="text-base font-semibold text-white">
              {item.stars}
            </Text>
          </View>
          <View className="px-4 flex-row justify-between items-center">
            <Text
              style={{ color: themeColors.text }}
              className="text-3xl font-semibold"
            >
              {item.name}
            </Text>
            <Text
              style={{ color: themeColors.text }}
              className="text-lg font-semibold"
            >
              $ {item.price}
            </Text>
          </View>
          <View className="px-4 space-y-2">
            <Text
              style={{ color: themeColors.text }}
              className="text-lg font-bold"
            >
              Coffee size
            </Text>
            <View className="flex-row justify-between">
              <TouchableOpacity
                onPress={() => setSize("small")}
                style={{
                  backgroundColor:
                    size == "small" ? themeColors.bgLight : "rgba(0,0,0,0.07)",
                }}
                className="p-3 px-8 rounded-full"
              >
                <Text
                  className={size == "small" ? "text-white" : "text-gray-700"}
                >
                  Small
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSize("medium")}
                style={{
                  backgroundColor:
                    size == "medium" ? themeColors.bgLight : "rgba(0,0,0,0.07)",
                }}
                className="p-3 px-8 rounded-full"
              >
                <Text
                  className={size == "medium" ? "text-white" : "text-gray-700"}
                >
                  Medium
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSize("large")}
                style={{
                  backgroundColor:
                    size == "large" ? themeColors.bgLight : "rgba(0,0,0,0.07)",
                }}
                className="p-3 px-8 rounded-full"
              >
                <Text
                  className={size == "large" ? "text-white" : "text-gray-700"}
                >
                  Large
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className="px-4 space-y-2">
          <Text
            style={{ color: themeColors.text }}
            className="text-lg font-bold"
          >
            About
          </Text>
          <Text className="text-gray-600">{item.description}</Text>
        </View>
      </SafeAreaView>
      <View className={`space-y-3 ${ios ? "mb-6" : "mb-3"}`}>
        <View className="flex-row justify-between items-center px-4 mb-2">
          {/* Your existing code for displaying volume or other information remains unchanged */}

          {/* Updated section for quantity management */}
          <View className="flex-row items-center space-x-4 border-gray-500 border rounded-full p-1 px-4">
            <TouchableOpacity onPress={decreaseQuantity}>
              <MinusIcon size="20" strokeWidth={3} color={themeColors.text} />
            </TouchableOpacity>
            <Text
              style={{ color: themeColors.text }}
              className="font-extrabold text-lg"
            >
              {quantity}
            </Text>
            <TouchableOpacity onPress={increaseQuantity}>
              <PlusIcon size="20" strokeWidth={3} color={themeColors.text} />
            </TouchableOpacity>
          </View>
        </View>
          {/* buy now button */}
          <View className="flex-row justify-between px-4">
            <TouchableOpacity className="p-4 rounded-full border border-gray-400">
              <ShoppingBag size="30" color="gray" />
            </TouchableOpacity>
            <TouchableOpacity
            onPress={() => navigation.navigate("Home", { ...item })}

              style={{ backgroundColor: themeColors.bgLight }}
              className="p-4 rounded-full flex-1 ml-4"
            >
              <Text className="text-center text-white text-base font-semibold">
                Buy now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}