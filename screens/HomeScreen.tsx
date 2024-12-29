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
import * as Location from "expo-location";
import { setuserLocation } from "../redux/slices/location";
import store, { AppDispatch, RootState } from "../redux/store";
import WeatherAPIService from "../services/WeatherAPIService";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { MapIcon } from "react-native-heroicons/solid";
import {
  fetchWeatherStart,
  fetchWeatherSuccess,
  fetchWeatherFailure,
} from "../redux/slices/weather";
import { useSelector } from "react-redux";
import { debounce } from "lodash";
import { WeatherCard } from "../components/weathercard";
import { ForecastCard } from "../components/ForecastCard";
interface LocationType {
  name: string;
  region: string;
}

const HomeScreen = () => {
  const dispatch: AppDispatch = store.dispatch;
  const userlocation = useSelector((state: RootState) => state.userlocation);
  const [locations, setLocations] = useState([]);
 
  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Permission to access location was denied");
          return;
        }
        const location = await Location.getCurrentPositionAsync({});
        //console.log(location);
        const { latitude, longitude } = location.coords;
        dispatch(setuserLocation({ latitude, longitude }));
      } catch (error) {
        console.error("Error fetching user location:", error);
        Alert.alert("Error", "Unable to fetch location.");
      }
    };
    fetchUserLocation();
  }, []);

  useEffect(() => {
    const getWeather = async () => {
      try {
        if (userlocation.userLocation) {
          const { latitude, longitude } = userlocation.userLocation;
          const query = `${latitude},${longitude}`;
          dispatch(fetchWeatherStart());
          const weatherData = await WeatherAPIService.fetchForecastWeather(
            query
          );
          //console.log(weatherData);
          dispatch(fetchWeatherSuccess(weatherData));
        }
      } catch (error: any) {
        dispatch(fetchWeatherFailure(error.message));
      }
    };
    getWeather();
  }, [userlocation, dispatch]);
  const handleSearch = async (value: string) => {
    if (value.trim().length > 1) {
      const locations = await WeatherAPIService.searchCity(value.trim());
      setLocations(locations);
    } else {
      setLocations([]);
    }
  };

  const handleTextDebaounce = useCallback(debounce(handleSearch, 500), []);

  useEffect(() => {
    return () => handleTextDebaounce.cancel();
  }, [handleTextDebaounce]);

  const handleLocation = async (loc: string) => {
    try {
      dispatch(fetchWeatherStart());
      const weatherData = await WeatherAPIService.fetchForecastWeather(loc);
      dispatch(fetchWeatherSuccess(weatherData));
    } catch (error: any) {
      console.log(error);
      dispatch(fetchWeatherFailure(error.message));
    } finally {
      setLocations([]);
    }
  };
  return (
    <ScrollView className="flex-1 relative">
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
        <SafeAreaView className="flex flex-1 ">
          <View
            style={{ height: "7%", marginHorizontal: 10 }}
            className="mx-4 relative z-50"
          >
            <View
              className="flex-row justify-end "
              style={{
                backgroundColor: theme.bgwhite(0.2),
                borderRadius: 10,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TextInput
                onChangeText={handleTextDebaounce}
                placeholder="search city"
                placeholderTextColor={"lightgray"}
                style={{ paddingLeft: 10 }}
                className="text-white"
              />
              <TouchableOpacity
                style={{
                  backgroundColor: theme.bgwhite(0.3),
                  // borderRadius: 10,
                  // margin: 5,
                }}
                className="p-2 m-1 rounded-full"
              >
                <MagnifyingGlassIcon size={25} color={"white"} />
              </TouchableOpacity>
            </View>
            {locations?.length > 0 ? (
              <View className="absolute w-full top-16 bg-gray-300 rounded-2xl">
                {locations?.map((loc: LocationType, index: number) => {
                  let showborder = index + 1 !== locations.length;
                  let borderclass = showborder
                    ? "border-b-2 border-b-gray-400"
                    : "";
                  return (
                    <TouchableOpacity
                      onPress={() => handleLocation(loc.name)}
                      key={index}
                      className={`flex-row items-center border-0 p-3 px-4 ${borderclass}`}
                    >
                      <MapIcon size={20} color={"white"} />
                      <Text className="text-black text-lg ml-2">
                        {loc.name}, {loc.region}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ) : null}
          </View>
          <WeatherCard />
          <ForecastCard />
        </SafeAreaView>
      </View>
    </ScrollView>
  );
};

export { HomeScreen };
