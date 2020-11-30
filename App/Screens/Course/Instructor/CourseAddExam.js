import * as React from "react";
import {
  ScrollView,
  View,
  Text,
  Dimensions,
  Alert,
  Picker,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import * as DocumentPicker from "expo-document-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRoute, useNavigation } from "@react-navigation/native";
import Global from "../../../Styles/GlobalStyles";

const CourseAddExam = () => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [date, setDate] = React.useState("start");
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const [examTime, setExamTime] = React.useState();
  const [questions, setQuestions] = React.useState([
    { question: "", point: "" },
  ]);
  const [mode, setMode] = React.useState("date");
  const [show, setShow] = React.useState(false);
  const navigation = useNavigation();

  React.useEffect(() => {
    setEndDate(new Date(Date.parse(endDate) + 7 * 1000 * 60 * 60 * 24)); // 마감시간 일주일 후로 변경
    endDate.setSeconds(0);
    startDate.setSeconds(0);
  }, []);

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
      Alert.alert("", "제목을 입력해주세요.");
      return;
    }
    if (startDate === endDate) {
      Alert.alert("", "시작과 종료 날짜는 같을 수 없습니다.");
      return;
    }
    if (examTime === "") {
      Alert.alert("", "시험 시간을 입력해주세요.");
    }
    {
      questions.map((q, index) => {
        if (q.question === "") {
          Alert.alert("", "문제는 공란으로 출제할 수 없습니다.");
          return;
        }
      });
    }

    const data = [title, description, startDate, endDate, questions, examTime];
    console.log(data);
  };

  const handleChangeQuestion = (e, index) => {
    let q = [...questions];
    q[index].question = e;
    setQuestions(q);
  };
  const handleChangePoint = (e, index) => {
    let q = [...questions];
    q[index].point = e.replace(/[^0-9]/g, "");
    setQuestions(q);
  };

  const addQuestion = () => {
    let q = [...questions];
    q.push({ question: "", point: "" });
    setQuestions(q);
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
        style={{ backgroundColor: "white" }}
        multiline={true}
      />

      <View style={{ padding: 20 }}>
        <View style={{ padding: 20 }}>
          <View style={{ marginBottom: 20 }}>
            <Text
              style={{ fontFamily: "Square", fontSize: 20, marginBottom: 10 }}
            >
              문제
            </Text>
            {questions.map((item, index) => (
              <View key={index} style={{ flexDirection: "row" }}>
                <TextInput
                  label={`${index + 1}번.`}
                  value={questions[index].question}
                  onChangeText={(text) => {
                    handleChangeQuestion(text, index);
                  }}
                  theme={{
                    colors: { primary: Global.Colors.sjgray },
                  }}
                  style={{ marginVertical: 3, flex: 1, marginRight: 5 }}
                  multiline={true}
                />
                <TextInput
                  label={`${index + 1}번 배점`}
                  value={questions[index].point}
                  keyboardType="numeric"
                  onChangeText={(text) => {
                    handleChangePoint(text, index);
                  }}
                  theme={{
                    colors: { primary: Global.Colors.sjgray },
                  }}
                  style={{ marginVertical: 3, width: 100 }}
                  multiline={true}
                />
              </View>
            ))}
          </View>

          <Button
            icon="plus"
            mode="contained"
            onPress={addQuestion}
            theme={{ colors: { primary: Global.Colors.sjgray } }}
          >
            문제 추가
          </Button>
        </View>
        <View style={{ marginBottom: 10 }}>
          <TextInput
            label="시험 시간(분)"
            value={examTime}
            keyboardType="numeric"
            onChangeText={(examTime) =>
              setExamTime(examTime.replace(/[^0-9]/g, ""))
            }
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
          <View>
            <Text>총 문제 수 {questions.length}</Text>
            <Text>
              총점{" "}
              {questions.reduce((pre, val) => {
                return pre + Number(val.point);
              }, 0)}
            </Text>
          </View>
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

export default CourseAddExam;
