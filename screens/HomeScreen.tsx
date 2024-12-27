import { View, Image , TextInput, TouchableOpacity, Text} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../theme";

const HomeScreen = () => {
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
      <SafeAreaView className="flex flex-1 ">
        <View 
        style={{height: "7%", marginHorizontal: 10}} 
        className="mx-4 relative z-50"
        >
          <View 
          className="flex-row justify-end " 
          style={{backgroundColor: theme.bgwhite(0.2), borderRadius: 10, flexDirection: "row", justifyContent: "space-between"}}
          >
            <TextInput 
            placeholder="search city" 
            placeholderTextColor={"lightgray"}
            style={{paddingLeft: 10}} 
            className="pl-8 h-10 text-base text-white" />
            <TouchableOpacity
            style={{backgroundColor: theme.bgwhite(0.3)}}
            className="p-3 m-1 rounded-full"
            >
              <Text>icon</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export { HomeScreen };
