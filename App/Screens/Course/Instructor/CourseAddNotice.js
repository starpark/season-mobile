import * as React from "react";
import { ScrollView, View, Text, Dimensions, Alert } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Global from "../../../Styles/GlobalStyles";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const CourseAddNotice = () => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const navigation = useNavigation();

  const handleSubmit = async () => {
    if (title === "") {
      Alert.alert("제목을 입력해주세요.");
      return;
    }
    if (description === "") {
      Alert.alert("내용을 입력해주세요.");
    }

    const data = {
      title,
      description,
    };

    console.log(data);
    navigation.goBack();
  };

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ paddingBottom: 80 }}
    >
      <TextInput
        label="제목"
        value={title}
        onChangeText={(title) => setTitle(title)}
        multiline={true}
        theme={{
          colors: { primary: Global.Colors.sjgray },
          fonts: { regular: { fontFamily: "Square_L" } },
        }}
        style={{ backgroundColor: "white" }}
      />
      <TextInput
        label="내용"
        value={description}
        onChangeText={(description) => setDescription(description)}
        theme={{
          colors: { primary: Global.Colors.sjgray },
          fonts: { regular: { fontFamily: "Square_L" } },
        }}
        style={{ backgroundColor: "white", height: screenWidth }}
        multiline={true}
      />
      <View
        style={{
          flexDirection: "row",
          padding: 20,
          justifyContent: "flex-end",
        }}
      >
        <Button
          icon="close"
          mode="outlined"
          onPress={() => navigation.goBack()}
          theme={{ colors: { primary: Global.Colors.sjgray } }}
          style={{ marginHorizontal: 10 }}
        >
          취소
        </Button>
        <Button
          icon="note-plus"
          mode="contained"
          onPress={handleSubmit}
          theme={{ colors: { primary: Global.Colors.sjgray } }}
        >
          작성
        </Button>
      </View>
    </ScrollView>
  );
};

export default CourseAddNotice;
