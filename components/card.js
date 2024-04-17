import { View, Text, Image } from "react-native";
import React from "react";
import { conditionicons } from "../constant";

const Card = ({ condition, temp, icon, time }) => {
  function tConvert(time) {
    // Check correct time format and split into components
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? "AM" : "PM"; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(""); // return adjusted time or original string
  }
  return (
    <View className="mr-[40] ">
      <View className="mt-[20] flex-row justify-center items-center">
        {icon != null ? (
          <Image
            className="h-[50] w-[50]"
            source={
              conditionicons.find((condition) => condition.code == icon)
                ?.icon || require("../assets/images/icons/images/heavyrain.png")
            }
          />
        ) : (
          <Image
            className="h-[50] w-[50]"
            source={require("../assets/images/icons/images/heavyrain.png")}
          />
        )}
      </View>

      <View className="mt-[20] flex-row justify-center items-center ">
        <Text className="font-normal" style={{ fontSize: 10 }}>
          {tConvert(time.split(" ")[1])}
        </Text>
      </View>
      <View className="mt-[20] flex-row justify-center items-center ">
        <Text className="font-normal" style={{ fontSize: 10 }}>
          {condition}
        </Text>
      </View>
      <View className="mt-[5] flex-row justify-center items-start">
        <Text className="font-normal" style={{ fontSize: 20 }}>
          {temp}
        </Text>
        <Image
          className="h-[5] w-[5] p-[5]"
          source={require("../assets/images/icons/apple.png")}
        ></Image>
      </View>
    </View>
  );
};

export default Card;
