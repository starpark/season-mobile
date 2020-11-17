import * as React from "react";
import { View, Text, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Actions from "../../Redux/Actions";

const Home = () => {
  const user = useSelector((state) => state.Auth);
  const api = useSelector((state) => state.API);
  const dispatch = useDispatch();

  React.useEffect(() => {
    // dispatch(Actions.APIAction.API_CALL());
    // setTimeout(() => {
    //   dispatch(Actions.APIAction.API_END());
    // }, 3000);
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home</Text>

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

export default Home;
