import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface UserLocation {
  latitude: number;
  longitude: number;
}

interface UserLocationState {
  userLocation: UserLocation | null;
}

const initialState: UserLocationState = {
  userLocation: null,
};

const userLocationSlice = createSlice({
  name: "userlocation",
  initialState,
  reducers: {
    setuserLocation(state, action: PayloadAction<UserLocation>) {
      state.userLocation = action.payload;
      AsyncStorage.setItem("userLocation", JSON.stringify(action.payload));
    },
  },
});

export const { setuserLocation } = userLocationSlice.actions;
export default userLocationSlice.reducer;
