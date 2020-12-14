import * as React from "react";
import { View, Text, Button, ScrollView } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import Actions from "../../Redux/Actions";
import Global from "../../Styles/GlobalStyles";
import { TouchableRipple, List } from "react-native-paper";

const SettingScreen = () => {
  const dispatch = useDispatch();
  return (
    <ScrollView style={Global.Styles.container}>
      <Text
        style={{
          fontFamily: "Square",
          fontSize: 25,
          marginLeft: 20,
          marginTop: 20,
        }}
      >
        내정보
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderRadius: 20,
          borderWidth: 1,
          padding: 10,
          borderColor: Global.Colors.gray2,
          margin: 20,
        }}
      >
        <AntDesign name="user" size={50} color={Global.Colors.sjgray} />
        <View
          style={{
            marginHorizontal: 10,
          }}
        >
          <Text style={{ fontFamily: "Square", fontSize: 20 }}>
            박 별 17011589
          </Text>
          <Text
            style={{
              fontFamily: "Square",
              fontSize: 15,
              color: Global.Colors.gray3,
            }}
          >
            소프트웨어융합대학 컴퓨터공학과 2학년
          </Text>
        </View>
      </View>

      <List.Section style={{ paddingBottom: 120 }}>
        <List.Subheader
          style={{
            fontFamily: "Square",
          }}
        >
          내 정보
        </List.Subheader>
        <List.Item
          title="개인정보수정"
          titleStyle={{ fontFamily: "Square" }}
          right={() => <List.Icon icon="chevron-right" />}
          onPress={() => {}}
        />
        <List.Item
          title="로그아웃"
          titleStyle={{ fontFamily: "Square" }}
          right={() => <List.Icon icon="chevron-right" />}
          onPress={() => {
            dispatch(Actions.AuthAction.LOGOUT());
          }}
        />
        <List.Subheader
          style={{
            fontFamily: "Square",
          }}
        >
          이용
        </List.Subheader>
        <List.Item
          title="공지사항"
          titleStyle={{ fontFamily: "Square" }}
          right={() => <List.Icon icon="chevron-right" />}
          onPress={() => {}}
        />
        <List.Item
          title="FAQ"
          titleStyle={{ fontFamily: "Square" }}
          right={() => <List.Icon icon="chevron-right" />}
          onPress={() => {}}
        />
        <List.Subheader
          style={{
            fontFamily: "Square",
          }}
        >
          앱
        </List.Subheader>
        <List.Item
          title="오픈소스 라이센스"
          titleStyle={{ fontFamily: "Square" }}
          right={() => <List.Icon icon="chevron-right" />}
          onPress={() => {}}
        />
        <List.Item
          title="버전"
          titleStyle={{ fontFamily: "Square" }}
          right={() => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{ fontFamily: "Square", color: Global.Colors.gray3 }}
              >
                1.0
              </Text>
              <List.Icon icon="chevron-right" />
            </View>
          )}
          onPress={() => {}}
        />
      </List.Section>
    </ScrollView>
  );
};

export default SettingScreen;
