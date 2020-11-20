import * as React from "react";
import { View, StyleSheet, ImageBackground, Dimensions } from "react-native";
import { Text } from "react-native-paper";
import Global from "../../Styles/GlobalStyles";

const { width: screenWidth } = Dimensions.get("window");

const UserInfo = (props) => {
  return (
    <ImageBackground
      source={require("../../../Assets/image/sejongi.jpg")}
      style={styles.infobg}
      imageStyle={styles.infobgimg}
      blurRadius={1}
    >
      <View style={styles.infoblackbg} />
      <View
        style={{
          flex: 1,
          flexDirection: "row",
        }}
      >
        <View style={styles.labelbox}></View>
        <View style={{ justifyContent: "center", alignItems: "flex-start" }}>
          <Text style={[styles.infouser, { fontFamily: "Godo" }]}>박별</Text>
          <Text style={[styles.infosub, { fontFamily: "Godo" }]}>17011589</Text>
          <Text style={[styles.infosub, { fontFamily: "Godo" }]}>
            소프트웨어융합대학 컴퓨터공학과
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

export default UserInfo;

const styles = StyleSheet.create({
  infobg: { width: screenWidth, height: 100 },
  infobgimg: { resizeMode: "cover" },
  infoblackbg: {
    width: screenWidth,
    height: 100,
    backgroundColor: "rgba(0,0,0,0.5)",
    position: "absolute",
    top: 0,
    left: 0,
  },
  infouser: {
    color: "white",
    fontSize: 25,
  },
  infosub: {
    color: Global.Colors.sjsilver,
    fontSize: 15,
  },
  labelbox: {
    width: 7,
    backgroundColor: Global.Colors.sjred,
    marginRight: 13,
  },
});
