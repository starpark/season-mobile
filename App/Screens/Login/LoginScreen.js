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
import SendBird from "sendbird";
import { APP_ID } from "../../Config";
import * as SecureStore from "expo-secure-store";

const Login = ({ navigation }) => {
  const sb = new SendBird({ appId: APP_ID });
  const [studentID, onChangeID] = React.useState("");
  const [studentPW, onChangePW] = React.useState("");
  const dispatch = useDispatch();

  React.useEffect(() => {
    // dispatch(Actions.APIAction.API_CALL());
    // setTimeout(() => {
    //   dispatch(Actions.APIAction.API_END());
    // }, 3000);
  }, []);

  const handleLogin = async () => {
    console.log(`학번: ${studentID}/비밀번호: ${studentPW}`);
    const userInfo = {
      studentID,
      studentPW,
    };
    const response = {
      // 서버측 응답 예시
      name: "박별",
      id: studentID,
      role: "student",
      token: "token123",
    };
    SecureStore.setItemAsync("myToken", response.token);
    dispatch(Actions.AuthAction.LOGIN(response));
    sb.connect(response.id, (user, error) => {
      if (error) {
        console.error(error);
      } else {
        sb.updateCurrentUserInfo(response.name, null, (user, error) => {
          if (error) {
            console.error(error);
          } else {
          }
        });
      }
    });
  };

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
          fonts: { regular: { fontFamily: "Square" } },
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
          fonts: { regular: { fontFamily: "Square" } },
        }}
      />
      <HelperText type="error" visible={false}>
        학번/아이디 또는 비밀번호가 일치하지 않습니다.
      </HelperText>

      <TouchableWithoutFeedback onPress={handleLogin}>
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
