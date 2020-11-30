import * as React from "react";
import { ScrollView, View, Dimensions, Text } from "react-native";
import { Button, TextInput, List } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import * as DocumentPicker from "expo-document-picker";
import Global from "../../../Styles/GlobalStyles";

const { width: screenWidth } = Dimensions.get("window");

const CourseSubmitAssignment = () => {
  const [description, setDescription] = React.useState("");
  const [document, setDocument] = React.useState([]);
  const navigation = useNavigation();

  const startDate = new Date("2020-11-30T13:16:00.788Z");
  const endDate = new Date("2021-02-01T13:16:51.000Z");

  const pickDocument = async () => {
    const pickResponse = await DocumentPicker.getDocumentAsync({
      type: "*/*",
    });

    if (pickResponse.type === "success") {
      setDocument(pickResponse);
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
    const data = [description, document];
    console.log(data);
  };

  const yyyymmddhhmmss = (date) => {
    const timeValue = new Date(date);

    let year = timeValue.getFullYear(); //yyyy
    let month = 1 + timeValue.getMonth(); //mm
    month = month >= 10 ? month : "0" + month; //month 두자리로 저장
    let day = timeValue.getDate(); //dd
    day = day >= 10 ? day : "0" + day;
    let hour = timeValue.getHours(); //hh
    hour = hour >= 10 ? hour : "0" + hour;
    let minutes = timeValue.getMinutes(); //mm
    minutes = minutes >= 10 ? minutes : "0" + minutes;

    return `${year}년 ${month}월 ${day}일 ${hour}시 ${minutes}분`;
  };

  const timeForToday = (value) => {
    const today = new Date();
    const timeValue = new Date(value);

    const betweenTime = Math.floor(
      (timeValue.getTime() - today.getTime()) / 1000 / 60
    );

    if (betweenTime < 0) return "종료";

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
      return `D - DAY`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    return `D - ${betweenTimeDay}`;
  };

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ paddingBottom: 80 }}
    >
      <View style={{ padding: 20 }}>
        <View
          style={{
            borderWidth: 1,
            borderColor: Global.Colors.gray,
            borderRadius: 20,
            padding: 20,
          }}
        >
          <View style={{ marginBottom: 10 }}>
            <Text
              style={{ fontFamily: "Square", fontSize: 20, marginBottom: 10 }}
            >
              교수자 코멘트
            </Text>
            <Text>과제는 제출하세요 제발...</Text>
          </View>

          <View style={{ marginBottom: 10 }}>
            <Text
              style={{ fontSize: 19, fontFamily: "Square", marginBottom: 5 }}
            >
              시작 날짜
            </Text>
            <Text>{yyyymmddhhmmss(startDate)}</Text>
          </View>
          <View style={{ marginBottom: 10 }}>
            <Text
              style={{
                fontSize: 19,
                fontFamily: "Square",
                marginBottom: 5,
              }}
            >
              종료 날짜
            </Text>
            <View style={{ flexWrap: "wrap" }}>
              <Text
                style={{
                  backgroundColor: Global.Colors.red1,
                  borderRadius: 5,
                  paddingHorizontal: 3,
                  color: "white",
                  marginBottom: 5,
                }}
              >
                {timeForToday(endDate)}
              </Text>
            </View>

            <Text>{yyyymmddhhmmss(endDate)}</Text>
          </View>
        </View>
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
          onPress={pickDocument}
          theme={{ colors: { primary: Global.Colors.sjgray } }}
        >
          첨부파일 선택
        </Button>
        {document.name && (
          <List.Item
            title={document.name}
            description={byteToSize(document.size)}
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
          제출
        </Button>
      </View>
    </ScrollView>
  );
};

export default CourseSubmitAssignment;
