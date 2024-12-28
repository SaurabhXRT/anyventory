import { combineReducers } from '@reduxjs/toolkit';
import userlocationReducer from "./slices/location"
import weatherdataReducer from "./slices/weather"

const rootReducer = combineReducers({
    userlocation: userlocationReducer,
    weatherdata: weatherdataReducer,
});

export default rootReducer;
