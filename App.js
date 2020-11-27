import * as React from "react";
import RootScreen from "./App/Screens/RootScreen";
import { Provider as StoreProvider } from "react-redux";
import rootReducer from "./App/Redux/Reducers";
import { createStore } from "redux";

export default function App() {
  return (
    <StoreProvider store={createStore(rootReducer)}>
      <RootScreen />
    </StoreProvider>
  );
}
