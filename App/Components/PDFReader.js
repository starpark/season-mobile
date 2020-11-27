import * as React from "react";
import { View } from "react-native";
import PDFReader from "rn-pdf-reader-js";
import { useRoute, useNavigation } from "@react-navigation/native";

const PDFView = () => {
  const route = useRoute();

  return (
    <View style={{ flex: 1, paddingBottom: 60 }}>
      <PDFReader
        source={{
          uri: route.params.uri,
        }}
      />
    </View>
  );
};

export default PDFView;
