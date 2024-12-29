import React from "react";
import { View, Image, Text, FlatList, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CalendarDaysIcon } from "react-native-heroicons/solid";
import { theme } from "../theme";
import { RootState } from "../redux/store";
import { RootStackParamList } from "../navigation/appNavigation"; 

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Detail">;

const ForecastCard = () => {
  const weatherdata = useSelector((state: RootState) => state.weatherdata.data);
  const navigation = useNavigation<NavigationProp>(); // Type the navigation hook

  const getDayName = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { weekday: "long" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const handleDetailScreen = (date: string) => {
    navigation.navigate("Detail", { date }); 
  };

  return (
    <View className="mb-10 mt-4">
      <View className="flex-row items-center mx-5 space-x-2 mb-2">
        <CalendarDaysIcon size={22} color={"white"} />
        <Text className="text-white text-base">Daily Forecast</Text>
      </View>
      <FlatList
        data={weatherdata?.forecast?.forecastday}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        contentContainerStyle={{ paddingHorizontal: 15 }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleDetailScreen(item.date)}>
            <View
              className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
              style={{ backgroundColor: theme.bgwhite(0.3) }}
            >
              <Image
                source={{ uri: "https:" + item?.day.condition.icon }}
                className="w-11 h-11"
              />
              <Text className="text-white">{getDayName(item.date)}</Text>
              <Text className="text-white text-xl font-semibold">
                {item?.day?.maxtemp_c}°C
              </Text>
              <Text className="text-slate-800 text-clip">more</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export { ForecastCard };
