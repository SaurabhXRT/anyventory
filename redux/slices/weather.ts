import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WeatherState {
  data: any | null;
  databydate: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  data: null,
  databydate: null,
  loading: false,
  error: null,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    fetchWeatherStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchWeatherSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.data = action.payload;
    },
    fetchWeatherFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    fetchWeatherbydate(state,action:PayloadAction<any>){
      state.databydate = action.payload;
    }
  },
});

export const {
  fetchWeatherStart,
  fetchWeatherSuccess,
  fetchWeatherFailure,
  fetchWeatherbydate
} = weatherSlice.actions;

export default weatherSlice.reducer;
