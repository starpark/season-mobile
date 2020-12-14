import * as React from "react";
import {
  ScrollView,
  View,
  Text,
  Dimensions,
  Alert,
  Picker,
} from "react-native";
import { TextInput, Button, List } from "react-native-paper";
import * as DocumentPicker from "expo-document-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRoute, useNavigation } from "@react-navigation/native";
import Global from "../../../Styles/GlobalStyles";

const { width: screenWidth } = Dimensions.get("window");

const CourseAddAssignment = () => {
  const [week, setWeek] = React.useState("1");
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [date, setDate] = React.useState("start");
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const [mode, setMode] = React.useState("date");
  const [show, setShow] = React.useState(false);
  const [attachment, setAttatchment] = React.useState([]);
  const [point, setPoint] = React.useState();
  const navigation = useNavigation();

  React.useEffect(() => {
    setEndDate(new Date(Date.parse(endDate) + 7 * 1000 * 60 * 60 * 24)); // 마감시간 일주일 후로 변경
    endDate.setSeconds(0);
    startDate.setSeconds(0);
  }, []);

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

  const onChange = (event, selectedDate) => {
    if (event.type === "dismissed") {
      return;
    }

    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    if (date === "start") {
      setStartDate(currentDate);
    } else {
      setEndDate(currentDate);
    }
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
  const showDatepicker = (select) => {
    setDate(select);
    showMode("date");
  };

  const showTimepicker = (select) => {
    setDate(select);
    showMode("time");
  };

  const yyyymmdd = (date) => {
    const timeValue = new Date(date);

    let year = timeValue.getFullYear(); //yyyy
    let month = 1 + timeValue.getMonth(); //mm
    month = month >= 10 ? month : "0" + month; //month 두자리로 저장
    let day = timeValue.getDate(); //dd
    day = day >= 10 ? day : "0" + day;

    return `${year}년 ${month}월 ${day}일`;
  };

  const hhmmss = (date) => {
    const timeValue = new Date(date);

    let hour = timeValue.getHours(); //hh
    hour = hour >= 10 ? hour : "0" + hour;
    let minutes = timeValue.getMinutes(); //mm
    minutes = minutes >= 10 ? minutes : "0" + minutes;

    return `${hour}시 ${minutes}분`;
  };

  const handleSubmit = async () => {
    if (title === "") {
      Alert.alert("제목을 입력해주세요.");
      return;
    }
    if (startDate === endDate) {
      Alert.alert("시작과 종료 날짜는 같을 수 없습니다.");
      return;
    }
    if (attachment.name === 0) {
      Alert.alert("영상을 선택해 주세요,");
      return;
    }

    const data = [
      week,
      title,
      description,
      startDate,
      endDate,
      attachment,
      point,
    ];
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
        style={{ backgroundColor: "white", height: 100 }}
        multiline={true}
      />

      <View style={{ padding: 20 }}>
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
        <View style={{ marginBottom: 10 }}>
          <TextInput
            label="배점"
            value={point}
            keyboardType="numeric"
            onChangeText={(point) => setPoint(point.replace(/[^0-9]/g, ""))}
            theme={{
              colors: { primary: Global.Colors.sjgray },
              fonts: { regular: { fontFamily: "Square_L" } },
            }}
            style={{ backgroundColor: "white" }}
            multiline={true}
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1, alignItems: "center", padding: 5 }}>
            <Text
              style={{ fontFamily: "Square", fontSize: 20, marginBottom: 10 }}
            >
              시작 날짜
            </Text>
            <View style={{ flexDirection: "row", marginBottom: 10 }}>
              <Text style={{ fontFamily: "Square", marginRight: 5 }}>
                {yyyymmdd(startDate)}
              </Text>
              <Text style={{ fontFamily: "Square" }}>{hhmmss(startDate)}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Button
                onPress={() => showDatepicker("start")}
                title="Show date picker!"
                mode="outlined"
                theme={{
                  colors: { primary: Global.Colors.sjgray },
                  fonts: { regular: { fontFamily: "Square" } },
                }}
                style={{ marginHorizontal: 3 }}
              >
                날짜 변경
              </Button>
              <Button
                onPress={() => showTimepicker("start")}
                title="Show time picker!"
                mode="outlined"
                theme={{
                  colors: { primary: Global.Colors.sjgray },
                  fonts: { regular: { fontFamily: "Square" } },
                }}
                style={{ marginHorizontal: 3 }}
              >
                시간 변경
              </Button>
            </View>
          </View>
          <View
            style={{
              width: 2,
              height: "100%",
              backgroundColor: Global.Colors.gray,
              marginHorizontal: 3,
            }}
          />
          <View style={{ flex: 1, alignItems: "center", padding: 5 }}>
            <Text
              style={{ fontFamily: "Square", fontSize: 20, marginBottom: 10 }}
            >
              종료 날짜
            </Text>
            <View style={{ flexDirection: "row", marginBottom: 10 }}>
              <Text style={{ fontFamily: "Square", marginRight: 5 }}>
                {yyyymmdd(endDate)}
              </Text>
              <Text style={{ fontFamily: "Square" }}>{hhmmss(endDate)}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Button
                onPress={() => showDatepicker("end")}
                title="Show date picker!"
                mode="outlined"
                theme={{
                  colors: { primary: Global.Colors.sjgray },
                  fonts: { regular: { fontFamily: "Square" } },
                }}
                style={{ marginHorizontal: 3 }}
              >
                날짜 변경
              </Button>
              <Button
                onPress={() => showTimepicker("end")}
                title="Show time picker!"
                mode="outlined"
                theme={{
                  colors: { primary: Global.Colors.sjgray },
                  fonts: { regular: { fontFamily: "Square" } },
                }}
                style={{ marginHorizontal: 3 }}
              >
                시간 변경
              </Button>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginVertical: 20,
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
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date === "start" ? startDate : endDate}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </ScrollView>
  );
};

export default CourseAddAssignment;
