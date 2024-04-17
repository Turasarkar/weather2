import { View, Text, Image } from "react-native";
import React from "react";

const SearchScreen = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <View className="h-[100] w-[80] items-center justify-between ml-[20] mr-[20] bg-slate-600 ">
        <Image
          style={{ height: 100, width: 100 }}
          source={require("../assets/images/icons/images/cloud.png")}
        />

        <Text className="font-bold" style={{ fontSize: 20 }}>
          13
        </Text>
        <Text>Thunder</Text>
      </View>
      <View className></View>
    </View>
  );
};

export default SearchScreen;
