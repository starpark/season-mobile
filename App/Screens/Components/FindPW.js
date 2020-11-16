import * as React from "react";
import {
  View,
  Button,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";

const FindPW = ({ navigation }) => {
  const [studentID, onChangeID] = React.useState("");

  return (
    <View style={{ flex: 1, alignItems: "center", paddingTop: 40 }}>
      <TextInput
        style={styles.input}
        onChangeText={(text) => onChangeID(text)}
        value={studentID}
        placeholder="학번"
      />
      <TouchableWithoutFeedback onPress={() => console.log("1")}>
        <View style={styles.loginbutton}>
          <Text style={styles.logintext}>비밀번호찾기</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {},
  input: {
    width: 300,
    height: 40,
    backgroundColor: "#efeff1",
    borderRadius: 20,
    paddingLeft: 20,
    marginBottom: 50,
  },
  loginbutton: {
    width: 300,
    height: 40,
    backgroundColor: "#DC143C",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  logintext: {
    fontSize: 17,
    color: "white",
    fontWeight: "bold",
  },
});

export default FindPW;
