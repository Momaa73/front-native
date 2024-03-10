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
const { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";

export default function smallCoffeeCard({ item }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Product", { ...item })}
    >
      <View
        className="flex"
        style={{
          borderRadius: 30,
          backgroundColor: themeColors.bgDark,
          height: height * 0.2,
          width: width * 0.4,
        }}
      >
        <View className="flex items-center justify-center overflow-hidden aspect-w-1 aspect-h-1">
          <Image
            source={{ uri: item.img }}
            style={{ height: 100, width: 100 }}
          />
        </View>
        <View className={`px-5 py-5 flex-1 gap-2`}>
          <Text className="flex text-xl text-black font-semibold">
            {item.name}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
