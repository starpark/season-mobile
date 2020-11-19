import * as React from "react";
import { View, Text, ScrollView, SafeAreaView } from "react-native";
import Actions from "../../Redux/Actions";
import Global from "../Styles/GlobalStyles";

const Messenger = () => {
  const [enabled, setEnabled] = React.useState(true);
  return (
    <SafeAreaView style={Global.Styles.container}>
      <ScrollView
        scrollEnabled={enabled}
      >
        <View style={{ height: 600, backgroundColor: 'violet' }}></View>
        <View style={{ height: 2000, backgroundColor: 'red' }} >
          <ScrollView
            pagingEnabled
            scrollEventThrottle={16}
            onTouchStart={(ev) => {
              setEnabled(false);
            }}
            onMomentumScrollEnd={(e) => { setEnabled(true); }}
            onScrollEndDrag={(e) => { setEnabled(true); }}
            style={{ margin: 10, maxHeight: 200 }} >
            <View style={{ height: 200, backgroundColor: 'blue' }} />
            <View style={{ height: 200, backgroundColor: 'pink' }} />
            <View style={{ height: 200, backgroundColor: 'blue' }} />
            <View style={{ height: 200, backgroundColor: 'pink' }} />
            <View style={{ height: 200, backgroundColor: 'blue' }} />
            <View style={{ height: 200, backgroundColor: 'pink' }} />
            <View style={{ height: 200, backgroundColor: 'blue' }} />
            <View style={{ height: 200, backgroundColor: 'pink' }} />
            <View style={{ height: 200, backgroundColor: 'blue' }} />
            <View style={{ height: 200, backgroundColor: 'pink' }} />
            <View style={{ height: 200, backgroundColor: 'blue' }} />
            <View style={{ height: 200, backgroundColor: 'pink' }} />
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Messenger;
