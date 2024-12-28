import "./global.css";
import AppNavigation from "./navigation/appNavigation";
import { Provider, useDispatch } from "react-redux";
import store from "./redux/store";
export default function App() {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
}
