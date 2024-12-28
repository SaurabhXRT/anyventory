import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  ScrollView,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import store, { AppDispatch, RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { theme } from "../theme";
import { CalendarDaysIcon } from "react-native-heroicons/solid";

const ForecastCard = () => {
  return (
    <View className="mb-2 space-y-3">
      <View className="flex-row items-center mx-5 space-x-2 mb-2">
        <CalendarDaysIcon size={22} color={"white"} />
        <Text className="text-white text-base">Daily Forecast</Text>
      </View>
      <ScrollView
        horizontal
        contentContainerStyle={{ paddingHorizontal: 15 }}
        showsHorizontalScrollIndicator={false}
      >
        <View
          className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
          style={{ backgroundColor: theme.bgwhite(0.3) }}
        >
          <Image
            source={require("../assets/partlycloudy.png")}
            className="w-11 h-11"
          />
          <Text className="text-white">monday</Text>
          <Text className="text-white text-xl font-semibold"></Text>
        </View>
      </ScrollView>
    </View>
  );
};
export { ForecastCard };
