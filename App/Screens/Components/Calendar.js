import * as React from "react";
import { View, Text, Button } from "react-native";
import Actions from "../../Redux/Actions";
import { useDispatch } from "react-redux";
import Global from "../Styles/GlobalStyles";

const Calendar = () => {
  const dispatch = useDispatch();
  return (
    <View style={Global.Styles.container}>
      <Text>Calendar</Text>

      <Button
        onPress={() => {
          dispatch(Actions.AuthAction.LOGOUT());
        }}
        title="로그아웃"
      />
    </View>
  );
};

export default Calendar;