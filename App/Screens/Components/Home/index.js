import * as React from "react";
import { SafeAreaView, View, StyleSheet, Image } from "react-native";
import Global from "../../Styles/GlobalStyles";
import { Text } from "react-native-paper";
import { useDispatch } from "react-redux";
import Action from "../../../Redux/Actions";
import UserInfo from "./UserInfo";
import Summury from "./Summury";

const Home = () => {
  const [entries, setEntries] = React.useState([]);
  const dispatch = useDispatch();

  React.useEffect(() => {
    // async function fetchData() {
    //
    //   await
    //
    // }
    // fetchData();
    dispatch(Action.APIAction.API_CALL());
    setEntries(require("../json").ENTRIES1);
    dispatch(Action.APIAction.API_END());
    return () => {};
  }, []);
  return (
    <SafeAreaView style={Global.Styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../../Assets/image/sjlogo.png")}
          style={styles.logo}
        />
        <View style={{ flex: 1, alignItems: "flex-end" }}>
          <Text style={styles.slogan}>창조하라! 세종처럼!</Text>
        </View>
      </View>
      <UserInfo />
      <Summury entries={entries} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    resizeMode: "contain",
    height: 40,
    width: 130,
    marginHorizontal: 20,
  },
  icons: {
    flex: 1,
    alignItems: "flex-end",
    marginRight: 10,
  },
  courseTracker: {
    backgroundColor: "white",
    flex: 1,
  },
  slogan: {
    fontFamily: "Nanum",
    color: Global.Colors.sjgray,
    fontSize: 25,
    paddingRight: 20,
  },
});

export default Home;
