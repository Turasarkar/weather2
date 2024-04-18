import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useStore } from "../store";
import { api_key, conditionicons } from "../constant";
import axios from "axios";

const SearchScreen = () => {
  const { city, setCity } = useStore();
  const [weather, setWeather] = useState();
  const [loading, setLoading] = useState(false);
  const apikey = api_key;

  const getCurrentWeather = async () => {
    try {
      setLoading(true);
      const data = await axios.get(
        `http://api.weatherapi.com/v1/current.json?key=${apikey}&q=${city}&aqi=no`
      );
      setWeather(data.data);
      console.log(data.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    console.log(weather);
  }, [weather]);
  useEffect(() => {
    getCurrentWeather();
  }, [city]);
  return (
    <View className="flex-1 items-center justify-center bg-white pl-[20] pr-[20]">
      <View className="h-[150]  items-center justify-between ml-[20] mr-[20] bg-white p-[20] border border-gray-200 rounded-lg">
        <Text>{weather?.location?.name}</Text>

        {weather?.current?.condition?.code != null ? (
          <Image
            className="h-[80] w-[80]"
            source={
              conditionicons.find(
                (condition) =>
                  condition.code == weather?.current?.condition?.code
              )?.icon || require("../assets/images/icons/images/heavyrain.png")
            }
          />
        ) : (
          <Image
            className="h-[200] w-[200]"
            source={require("../assets/images/icons/images/heavyrain.png")}
          />
        )}

        <View className="flex-row items-center gap-3">
          <Text className="font-bold" style={{ fontSize: 20 }}>
            {weather?.current?.temp_c}
          </Text>
          <Text>{weather?.current?.condition?.text}</Text>
        </View>
      </View>

      <View className="w-full m-[50] border border-gray-200 rounded-lg p-[20] flex-row">
        <View className="flex-1 justify-center items-center border-r border-gray-200">
          <Text>precipation</Text>
          <Text className="font-bold text-xl ">
            {weather?.current?.precip_mm}mm
          </Text>
          <Text className="mt-5">humidity</Text>
          <Text className="font-bold text-xl ">
            {weather?.current?.humidity}%
          </Text>
        </View>
        <View className="flex-1 justify-center items-center">
          <Text>wind</Text>
          <Text className="font-bold text-xl ">
            {weather?.current?.wind_kph}km/h
          </Text>
          <Text className="mt-5">presure</Text>
          <Text className="font-bold text-xl ">
            {weather?.current?.pressure_in}in
          </Text>
        </View>
      </View>
    </View>
  );
};

export default SearchScreen;
