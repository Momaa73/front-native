import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import React from "react";
import { themeColors } from "../../theme/index";
import { useNavigation } from "@react-navigation/native";
import { StarIcon } from "react-native-heroicons/solid";
import { PlusIcon } from "react-native-heroicons/outline";
const { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";

export default function CoffeeCard({ item }) {
  const navigation = useNavigation();
  return (
    <View
      className="flex"
      style={{
        borderRadius: 30,
        backgroundColor: themeColors.bgDark,
        height: ios ? height * 0.4 : height * 0.5,
        width: width * 0.65,
      }}
    >
      <View className="flex items-center justify-center mt-4 ml-5 mr-5 bg-gray-100 h-40 rounded-2xl w-50">
        <View className="flex items-center justify-center overflow-hidden aspect-w-1 aspect-h-1">
          <Image
            source={{ uri: item.img }}
            style={{ height: 100, width: 100 }}
          />
        </View>
      </View>
      <View className={`px-5 py-5 flex-1 gap-2`}>
        <Text className="flex text-2xl text-black font-semibold">
          {item.name}
        </Text>
        <View className="flex-row items-center">
          <StarIcon size="15" color="red" />
          <Text className="text-base font-semibold text-black">
            {item.price}
          </Text>
        </View>
        <View className="flex-row "></View>
        <Text className="px-2 text-black font-bold text-2xl">
          $ {item.price}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Product", { ...item })}
        style={{
          backgroundColor: themeColors.bg1,
          borderTopLeftRadius: 30,
          borderBottomRightRadius: 30,
        }}
        className="absolute bottom-0 right-0 p-4 bg-white"
      >
        <PlusIcon size="35" strokeWidth={3} color={themeColors.bgDark} />
      </TouchableOpacity>
    </View>
  );
}
