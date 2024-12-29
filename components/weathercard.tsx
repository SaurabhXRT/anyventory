import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import store, { AppDispatch, RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { theme } from "../theme";
const WeatherCard = () => {
  const weatherdata = useSelector((state: RootState) => state.weatherdata.data);
  //console.log(weatherdata);
  return (
    <View className="mx-4 flex-1 justify-around mb-2">
      <Text className="text-white text-center text-2xl font-bold">
        {weatherdata?.location?.name}{" "}
        <Text className="text-lg font-semibold text-gray-300">
          {weatherdata?.location?.region}
        </Text>
      </Text>
      <Text className="text-lg text-center font-semibold text-gray-50">
        {weatherdata?.location?.localtime}
      </Text>
      <View
        className="flex-row justify-center rounded-3xl"
        style={{ backgroundColor: theme.bgwhite(0.3) }}
      >
        <Image
          //source={require("../assets/partlycloudy.png")}
          source={{ uri: "https:" + weatherdata?.current.condition.icon }}
          className="w-52 h-52"
        />
      </View>
      <View className="flex-row justify-center items-center mx-4 space-y-2">
        <Text className="text-center font-bold text-white text-6xl ml-5">
          {weatherdata?.current.feelslike_c} &#176;
        </Text>
        <Text className="text-center font-semibold text-white text-2xl ml-5">
          {weatherdata?.current.condition.text}
        </Text>
      </View>
      <View className="flex-row justify-between mb-2">
        <View
          className="flex items-center space-x-2 p-8 px-12 rounded-3xl"
          style={{ backgroundColor: theme.bgwhite(0.3) }}
        >
          <Image source={require("../assets/wind.png")} className="h-6 w-6" />
          <Text className="text-white font-semibold text-base">UV Index</Text>
          <Text className="text-white font-semibold text-base">
            {weatherdata?.current.uv}
          </Text>
        </View>
        <View
          className="flex items-center space-x-2 p-8 px-12 rounded-3xl"
          style={{ backgroundColor: theme.bgwhite(0.3) }}
        >
          <Image source={require("../assets/wind.png")} className="h-6 w-6" />
          <Text className="text-white font-semibold text-base">Humidity</Text>
          <Text className="text-white font-semibold text-base">
            {weatherdata?.current.humidity}
          </Text>
        </View>
      </View>
      <View className="flex-row justify-between  mb-2">
        <View
          className="flex items-center space-x-2 p-8 px-12 rounded-3xl"
          style={{ backgroundColor: theme.bgwhite(0.3) }}
        >
          <Image source={require("../assets/wind.png")} className="h-6 w-6" />
          <Text className="text-white font-semibold text-base">Wind</Text>
          <Text className="text-white font-semibold text-base">
            {weatherdata?.current.wind_kph} km/h
          </Text>
        </View>
        <View
          className="flex items-center space-x-2 p-8 px-12 rounded-3xl"
          style={{ backgroundColor: theme.bgwhite(0.3) }}
        >
          <Image source={require("../assets/wind.png")} className="h-6 w-6" />
          <Text className="text-white font-semibold text-base">Sunset</Text>
          <Text className="text-white font-semibold text-base">
            {weatherdata?.forecast.forecastday[0].astro.sunset}
          </Text>
        </View>
      </View>
    </View>
  );
};
export { WeatherCard };
