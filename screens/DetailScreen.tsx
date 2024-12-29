import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../theme";
import store, { AppDispatch, RootState } from "../redux/store";
import WeatherAPIService from "../services/WeatherAPIService";
import {
  fetchWeatherStart,
  fetchWeatherSuccess,
  fetchWeatherFailure,
  fetchWeatherbydate,
} from "../redux/slices/weather";
import { useSelector } from "react-redux";
import { RootStackParamList } from "../navigation/appNavigation";
import { RouteProp, useRoute } from "@react-navigation/native";
type DetailRouteProp = RouteProp<RootStackParamList, "Detail">;
interface Astro {
  sunrise: string;
  sunset: string;
}
interface Condition {
  icon: string;
}
interface Hour {
  temp_c: string;
  time: string;
  condition: Condition;
}
interface Day{
    condition: {
        icon : string;
        text: string;
    }
    maxtemp_c: string;
    air_quality: {
        co: string;
        no2: string;
        o3: string;

    }
}
interface ForecastDay {
  date: string;
  astro: Astro;
  hour: Hour[];
  day: Day;
}

type SelectedDateData = ForecastDay[];
const DetailScreen = () => {
  const [selecteddateData, setSelectedDateData] = useState<SelectedDateData>(
    []
  );
  const dispatch: AppDispatch = store.dispatch;
  const route = useRoute<DetailRouteProp>();
  const { date } = route.params;
  console.log(date);
  const query = useSelector(
    (state: RootState) => state.weatherdata?.data?.location?.name
  );
  console.log(date, query);
  //weatherdata of the selected is not provided by the weatherapi
  //only between 14 days and 300 days from today in the future.
  const weatherdata = useSelector(
    (state: RootState) => state.weatherdata?.data
  );
  useEffect(() => {
    const getdata = async () => {
      const data = await weatherdata.forecast.forecastday.filter(
        (it: any) => it.date === date
      );
      console.log(data);
      setSelectedDateData(data);
    };
    getdata();
  }, [date]);
  useEffect(() => {
    const getWeather = async (query: string, dt: string) => {
      try {
        dispatch(fetchWeatherStart());
        console.log(query, dt);
        const weatherData = await WeatherAPIService.fetchSelectedDateWeather(
          query,
          dt
        );
        console.log(weatherData);
        dispatch(fetchWeatherbydate(weatherData));
      } catch (error: any) {
        dispatch(fetchWeatherFailure(error.message));
      }
    };
    if (query) {
      getWeather(query, date);
    }
  }, [dispatch, query, date]);

  return (
    <View className="flex-1 relative">
      <StatusBar style="light" />
      <Image
        source={require("../assets/appbg-1.jpeg")}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          resizeMode: "cover",
        }}
      />
      <SafeAreaView className="flex flex-1 mx-4 mt-4">
        <View className="flex-row justify-between  mb-2">
          <View
            className="flex items-center space-x-2 p-8 px-12 rounded-3xl"
            style={{ backgroundColor: theme.bgwhite(0.3) }}
          >
            <Image source={require("../assets/images/sun.png")} className="h-8 w-8" />
            <Text className="text-white font-semibold text-base">Sunrise</Text>
            <Text className="text-white font-semibold text-base">
              {selecteddateData[0]?.astro?.sunrise}
            </Text>
          </View>
          <View
            className="flex items-center space-x-2 p-8 px-12 rounded-3xl"
            style={{ backgroundColor: theme.bgwhite(0.3) }}
          >
            <Image source={require("../assets/images/sun.png")} className="h-8 w-8" />
            <Text className="text-white font-semibold text-base">Sunset</Text>
            <Text className="text-white font-semibold text-base">
              {selecteddateData[0]?.astro?.sunset}
            </Text>
          </View>
        </View>
        <View
          className="flex items-center space-x-2 py-4 mt-4 rounded-3xl"
          style={{ backgroundColor: theme.bgwhite(0.3) }}
        >
          <ScrollView
            horizontal
            contentContainerStyle={{ paddingHorizontal: 15 }}
            showsHorizontalScrollIndicator={false}
          >
            {selecteddateData[0]?.hour.map((item, index) => {
              return (
                <View key={index} className="flex items-center mr-2">
                  <Image
                    source={{ uri: "https:" + item?.condition.icon }}
                    className="w-11 h-11"
                  />
                  <Text className="text-white mb-2">{item.temp_c}</Text>
                  <Text className="text-white">{item.time.split(" ")[1]}</Text>
                </View>
              );
            })}
          </ScrollView>
        </View>
        <View
          className="flex items-center space-x-2 py-4 mt-4 rounded-3xl"
          style={{ backgroundColor: theme.bgwhite(0.3) }}
        >
          <View
            className="flex-row justify-center rounded-3xl"
          >
            <Image
              //source={require("../assets/partlycloudy.png")}
              source={{ uri: "https:" + selecteddateData[0]?.day.condition.icon }}
              className="w-40 h-40"
            />
          </View>
          <Text className="text-white font-semibold text-2xl">{selecteddateData[0]?.day.condition.text}</Text>
          <Text className="text-white font-semibold text-2xl">{selecteddateData[0]?.day.maxtemp_c}°C</Text>
        </View>
        <View
          className="flex px-4 space-x-2 py-4 mt-4 rounded-3xl"
          style={{ backgroundColor: theme.bgwhite(0.3) }}
        >
            <Text className="text-white text-left text-2xl font-bold">Air Quality</Text>
            <Text className="text-white text-left text-1xl font-semibold mt-2 mb-2">co: {" "} {selecteddateData[0]?.day.air_quality.co}</Text>
            <Text className="text-white text-left text-1xl font-semibold mt-2 mb-2">no2: {" "} {selecteddateData[0]?.day.air_quality.no2}</Text>
            <Text className="text-white text-left text-1xl font-semibold mt-2 mb-2">o3: {" "} {selecteddateData[0]?.day.air_quality.o3}</Text>
        </View>
      </SafeAreaView>
    </View>
  );
};
export { DetailScreen };
