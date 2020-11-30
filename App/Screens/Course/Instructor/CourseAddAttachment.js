import * as React from "react";
import { ScrollView, View, Dimensions, Alert, Picker } from "react-native";
import { Button, TextInput, List } from "react-native-paper";
import { useRoute, useNavigation } from "@react-navigation/native";
import * as DocumentPicker from "expo-document-picker";
import Global from "../../../Styles/GlobalStyles";

const { width: screenWidth } = Dimensions.get("window");

const CourseAddAttachment = () => {
  const [week, setWeek] = React.useState("1");
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [attachment, setAttatchment] = React.useState([]);
  const navigation = useNavigation();

  const pickAttachment = async () => {
    const pickResponse = await DocumentPicker.getDocumentAsync({
      multiple: true,
      type: "application/*",
    });

    if (pickResponse.type === "success") {
      setAttatchment(pickResponse);
    }

    console.log(pickResponse);
  };

  const byteToSize = (bytes) => {
    var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes == 0) return "0 Byte";
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
  };

  const handleSubmit = async () => {
    if (title === "") {
      Alert.alert("", "제목을 입력해주세요.");
      return;
    }
    if (attachment.name === 0) {
      Alert.alert("", "영상을 선택해 주세요,");
      return;
    }

    const data = [week, title, description, attachment];
    console.log(data);
  };

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ paddingBottom: 80 }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Picker
          selectedValue={week}
          onValueChange={(itemValue, itemIndex) => setWeek(itemValue)}
          style={{ width: 120 }}
        >
          <Picker.Item label="1 주차" value="1" />
          <Picker.Item label="2 주차" value="2" />
          <Picker.Item label="3 주차" value="3" />
          <Picker.Item label="4 주차" value="4" />
          <Picker.Item label="5 주차" value="5" />
          <Picker.Item label="6 주차" value="6" />
          <Picker.Item label="7 주차" value="7" />
          <Picker.Item label="8 주차" value="8" />
          <Picker.Item label="9 주차" value="9" />
          <Picker.Item label="10 주차" value="10" />
          <Picker.Item label="11 주차" value="11" />
          <Picker.Item label="12 주차" value="12" />
          <Picker.Item label="13 주차" value="13" />
          <Picker.Item label="14 주차" value="14" />
          <Picker.Item label="15 주차" value="15" />
          <Picker.Item label="16 주차" value="16" />
        </Picker>
        <TextInput
          label="제목"
          value={title}
          onChangeText={(title) => setTitle(title)}
          multiline={true}
          theme={{
            colors: { primary: Global.Colors.sjgray },
            fonts: { regular: { fontFamily: "Square_L" } },
          }}
          style={{ backgroundColor: "white", flex: 1 }}
        />
      </View>
      <TextInput
        label="내용"
        value={description}
        onChangeText={(description) => setDescription(description)}
        theme={{
          colors: { primary: Global.Colors.sjgray },
          fonts: { regular: { fontFamily: "Square_L" } },
        }}
        style={{ backgroundColor: "white" }}
        multiline={true}
      />
      <View style={{ padding: 20 }}>
        <Button
          icon="attachment"
          mode="contained"
          onPress={pickAttachment}
          theme={{ colors: { primary: Global.Colors.sjgray } }}
        >
          첨부파일 선택
        </Button>
        {attachment.name && (
          <List.Item
            title={attachment.name}
            description={byteToSize(attachment.size)}
            left={(props) => <List.Icon {...props} icon="file" />}
          />
        )}
      </View>
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

export default CourseAddAttachment;
