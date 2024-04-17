import React, { useEffect, useState } from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import Card from "../components/card";
import axios from "axios";
import { api_key, conditionicons } from "../constant";
import { useStore } from "../store";

const apikey = api_key;

const HomeScreen = () => {
  const [weather, setWeather] = useState();
  const [forecast, setForecast] = useState({});
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState([]);
  const [query, setQuery] = useState("");
  const { city, setCity } = useStore();

  const getCurrentWeather = async () => {
    try {
      setLoading(true);
      const data = await axios.get(
        `http://api.weatherapi.com/v1/current.json?key=${apikey}&q=${city}&aqi=no`
      );
      setWeather(data.data);
      setLoading(false);
    } catch (e) {}
  };
  const getForecast = async () => {
    try {
      const data = await axios.get(
        `http://api.weatherapi.com/v1/forecast.json?key=${apikey}&q=${city}&days=1&aqi=no&alerts=no`
      );
      setForecast(data.data);
    } catch (e) {}
  };
  const getSearch = async () => {
    try {
      const data = await axios.get(
        `http://api.weatherapi.com/v1/search.json?key=${apikey}&q=${query}`
      );
      setSearch(data.data);
    } catch (e) {}
  };
  useEffect(() => {
    getCurrentWeather();
    getForecast();
  }, [city]);
  useEffect(() => {
    console.log(weather);
  }, [weather]);
  useEffect(() => {
    if (query != "") {
      getSearch();
      console.log(search);
    }
  }, [query]);
  return (
    <View className="flex-1 w-full relative">
      {loading ? (
        <View className="flex-row justify-center items-center flex-1">
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View className="flex-1 w-full bg-white ">
          <SafeAreaView>
            <View className="mt-[10] ml-[24] mr-[24] flex-row justify-between items-center ">
              <View></View>
              <Text className="text-center font-bold " style={{ fontSize: 22 }}>
                Search For City
              </Text>
              <View></View>
            </View>
            <View>
              <View className="mt-[30] ml-[20] mr-[20]">
                <View className="flex-row items-center bg-[#F6F6F6] rounded-full h-[40] p-3 ">
                  <TextInput
                    value={query}
                    placeholder="Search...."
                    onChangeText={(e) => {
                      setQuery(e);
                    }}
                  />
                </View>
              </View>
              {search.length > 0 ? (
                <View className="absolute flex z-50 top-[90] w-full bg-white rounded-md ">
                  {search?.map((data) => (
                    <TouchableOpacity
                      key={data.id}
                      onPress={() => {
                        setCity(data.name);
                        setQuery("");
                        setSearch([]);
                      }}
                    >
                      <View className="border-b border-gray-100 p-3">
                        <Text>
                          {data.name}, {data.country}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              ) : (
                <View></View>
              )}

              <View className="mt-[20] mb-[20] flex-row justify-center">
                <Text className>
                  {weather?.location?.name}, {weather?.location?.country}
                </Text>
              </View>
              <View className="mt-[20] flex-row justify-center items-center">
                {weather?.current?.condition?.code != null ? (
                  <Image
                    className="h-[200] w-[200]"
                    source={
                      conditionicons.find(
                        (condition) =>
                          condition.code == weather?.current?.condition?.code
                      )?.icon ||
                      require("../assets/images/icons/images/heavyrain.png")
                    }
                  />
                ) : (
                  <Image
                    className="h-[200] w-[200]"
                    source={require("../assets/images/icons/images/heavyrain.png")}
                  />
                )}
              </View>
              <TouchableOpacity
                onPress={() => {
                  getCurrentWeather();
                }}
              >
                <View className="mt-[20] flex-row justify-center items-center ">
                  <Text className="font-normal" style={{ fontSize: 20 }}>
                    {weather?.current?.condition?.text}
                  </Text>
                </View>
                <View className="mt-[5] flex-row justify-center items-start">
                  <Text className="font-extrabold" style={{ fontSize: 80 }}>
                    {weather?.current?.temp_c}
                  </Text>
                  <Image
                    className="h-[10] w-[10] p-[15]"
                    source={require("../assets/images/icons/apple.png")}
                  ></Image>
                </View>
              </TouchableOpacity>

              <View className="flex-row justify-between items-center ml-[24] mr-[24]">
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                >
                  {forecast?.forecast?.forecastday[0]?.hour?.map((weather) => (
                    <Card
                      key={weather.time_epoch}
                      condition={weather?.condition?.text}
                      temp={weather?.temp_c}
                      icon={weather?.condition?.code}
                      time={weather?.time}
                    />
                  ))}
                </ScrollView>
              </View>
            </View>
          </SafeAreaView>
        </View>
      )}
    </View>
  );
};

export default HomeScreen;
