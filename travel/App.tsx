import { StyleSheet, View } from "react-native";
import TabNav from "./navigation/tabNavigation";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <GestureHandlerRootView>
    <Provider store={store}>
      <NavigationContainer>
        <TabNav />
      </NavigationContainer>
    </Provider>
  </GestureHandlerRootView>
  );
}

