import * as React from "react";
import { ScrollView, View, Text, Alert } from "react-native";
import { TextInput, Button } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRoute, useNavigation } from "@react-navigation/native";
import Global from "../../../Styles/GlobalStyles";

const GradeAssignmentDetail = () => {
  const [questions, setQuestions] = React.useState([
    { content: "과제1", answer: "제출내용", point: "20", grade: "" },
  ]);
  const navigation = useNavigation();
  const route = useRoute();

  React.useEffect(() => {}, []);

  const handleSubmit = async () => {
    {
      questions.map((q, index) => {
        if (q.grade === "") {
          Alert.alert("", "채점을 진행하여야 합니다.");
          return;
        }
      });
    }

    const data = questions;
    console.log(data);
  };

  const handleGrade = (e, index) => {
    let q = [...questions];
    if (e > q[index].point) {
      Alert.alert("", "배점보다 점수가 높을 수 없습니다.");
      return;
    }
    q[index].grade = e.replace(/[^0-9]/g, "");
    setQuestions(q);
  };

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ paddingBottom: 80, paddingHorizontal: 20 }}
    >
      <View
        style={{
          padding: 10,
          borderRadius: 20,
          borderWidth: 1,
          marginBottom: 20,
        }}
      >
        <Text>학번: {route.params.id}</Text>
        <Text>이름: {route.params.name}</Text>
        <Text>과제: {route.params.examid}</Text>
      </View>

      <View>
        <View>
          <View style={{ marginBottom: 20 }}>
            <Text
              style={{ fontFamily: "Square", fontSize: 20, marginBottom: 10 }}
            >
              제출된 과제
            </Text>
            {questions.map((item, index) => (
              <View key={index}>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontFamily: "Square", fontSize: 17 }}>
                    {index + 1}번. {item.content} [{item.point}점]
                  </Text>
                  <Text>{item.answer}</Text>
                </View>

                <TextInput
                  label={`${index + 1}번 점수`}
                  value={questions[index].grade}
                  keyboardType="numeric"
                  onChangeText={(text) => {
                    handleGrade(text, index);
                  }}
                  theme={{
                    colors: { primary: Global.Colors.sjgray },
                  }}
                  style={{ marginVertical: 3 }}
                  multiline={true}
                />
              </View>
            ))}
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
            채점
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

export default GradeAssignmentDetail;
