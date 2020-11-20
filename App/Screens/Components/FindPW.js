import * as React from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { HelperText, TextInput } from "react-native-paper";

const FindPW = ({ navigation }) => {
  const [studentID, onChangeID] = React.useState("");

  return (
    <View style={{ flex: 1, alignItems: "center", paddingTop: 40 }}>
      <TextInput
        style={styles.input}
        onChangeText={(text) => onChangeID(text)}
        value={studentID}
        label="학번"
      />
      <HelperText type="error" visible={false}>
        Email address is invalid!
      </HelperText>
      <TouchableWithoutFeedback onPress={() => console.log("1")}>
        <View style={styles.findbutton}>
          <Text style={styles.findtext}>비밀번호찾기</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {},
  input: {
    width: 300,
    height: 50,
    backgroundColor: "white",
  },
  findbutton: {
    width: 300,
    height: 40,
    backgroundColor: "#DC143C",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  findtext: {
    fontSize: 17,
    color: "white",
    fontWeight: "bold",
  },
});

export default FindPW;
