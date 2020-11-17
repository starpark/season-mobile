import React from "react";
import RootScreen from "./App/Screens/RootScreen";
import { Provider as StoreProvider } from "react-redux";
import { Provider as PaperProvider } from "react-native-paper";
import rootReducer from "./App/Redux/Reducers";
import { createStore } from "redux";

export default function App() {
  return (
    <StoreProvider store={createStore(rootReducer)}>
      <PaperProvider>
        <RootScreen />
      </PaperProvider>
    </StoreProvider>
  );
}
