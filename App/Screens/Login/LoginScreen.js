import * as React from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
  Text,
  SafeAreaView,
  Platform,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Actions from "../../Redux/Actions";
import { HelperText, TextInput } from "react-native-paper";
import Global from "../../Styles/GlobalStyles";

const Login = ({ navigation }) => {
  const [studentID, onChangeID] = React.useState("");
  const [studentPW, onChangePW] = React.useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.Auth);

  React.useEffect(() => {
    // dispatch(Actions.APIAction.API_CALL());
    // setTimeout(() => {
    //   dispatch(Actions.APIAction.API_END());
    // }, 3000);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../../Assets/image/sejong1.png")}
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => onChangeID(text)}
        value={studentID}
        label="학번/아이디(ID)"
        theme={{
          colors: { primary: Global.Colors.sjred },
          fonts: { regular: { fontFamily: "Square_L" } },
        }}
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => onChangePW(text)}
        value={studentPW}
        secureTextEntry={true}
        label="비밀번호(Password)"
        theme={{
          colors: { primary: Global.Colors.sjred },
          fonts: { regular: { fontFamily: "Square_L" } },
        }}
      />
      <HelperText type="error" visible={true}>
        학번/아이디 또는 비밀번호가 일치하지 않습니다.
      </HelperText>

      <TouchableWithoutFeedback
        onPress={() => {
          console.log(`학번: ${studentID}/비밀번호: ${studentPW}`);
          const userInfo = {
            studentID,
            studentPW,
          };
          dispatch(Actions.AuthAction.LOGIN(userInfo));
        }}
      >
        <View style={styles.loginbutton}>
          <Text style={styles.logintext}>로그인</Text>
        </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={() => navigation.navigate("FindPW")}>
        <Text style={styles.findpw}>비밀번호찾기</Text>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? Expo.Constants.statusBarHeight : 0,
  },
  text: {
    color: "black",
    fontWeight: "bold",
  },
  now: {
    color: "gray",
    paddingTop: 100,
  },
  logoarea: {
    flex: 1,
  },
  inputarea: {
    flex: 2,
  },
  logo: {
    resizeMode: "contain",
    height: 150,
    marginTop: 20,
    marginBottom: 30,
  },
  input: {
    width: 300,
    height: 50,
    backgroundColor: "white",
    marginBottom: 30,
  },
  loginbutton: {
    width: 300,
    height: 40,
    backgroundColor: "#DC143C",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    overflow: "hidden",
  },
  logintext: {
    fontSize: 17,
    color: "white",
    fontWeight: "bold",
    fontFamily: "Square",
  },
  findpw: {
    fontSize: 15,
    color: "gray",
    fontFamily: "Square",
  },
  autocheck: {
    width: 300,
    flexDirection: "row",
    marginBottom: 8,
  },
  autotext: {
    fontSize: 15,
    marginTop: 7,
  },
});

export default Login;
