import * as React from "react";
import { View, Text, Button } from "react-native";
import Actions from "../../Redux/Actions";

const Community = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Community</Text>

      <Button
        onPress={() => {
          dispatch(Actions.AuthAction.LOGOUT());
          console.log(user);
        }}
        title="로그아웃"
      />
    </View>
  );
};

export default Community;
