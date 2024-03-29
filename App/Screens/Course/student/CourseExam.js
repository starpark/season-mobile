import * as React from "react";
import { ScrollView, View, Text, Dimensions, Alert } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { List, TextInput, Button } from "react-native-paper";
import Global from "../../../Styles/GlobalStyles";

const { width: screenWidth } = Dimensions.get("window");

const test = `청춘의 꽃이 그것을 같으며, 인생의 철환하였는가? 눈에 봄바람을 현저하게 힘있다. 가장 오아이스도 가치를 날카로우나 사랑의 바이며, 교향악이다. 자신과 피어나기 두손을 이성은 불어 부패뿐이다. 고행을 그들은 착목한는 시들어 것이다. 그들에게 우리 영락과 같이 생의 것이다. 뛰노는 생의 이것을 있으랴? 밥을 인간이 가슴이 용감하고 싶이 크고 이것이다. 이상은 그들은 그들의 따뜻한 것이다.

있으며, 동력은 속에서 인간의 이성은 곳이 안고, 천하를 노년에게서 그리하였는가? 같지 가슴에 열락의 원질이 용기가 쓸쓸하랴? 이상을 불어 가치를 봄날의 사막이다. 보이는 듣기만 할지라도 바로 있으며, 뿐이다. 청춘은 가치를 오아이스도 열락의 힘있다. 창공에 곧 생명을 오직 열락의 부패뿐이다. 있는 무한한 따뜻한 풍부하게 것이다. 위하여, 그와 열락의 부패뿐이다. 예가 천고에 같으며, 있으랴?

이것이야말로 위하여 실로 살았으며, 오직 수 것이다. 그들은 인간이 피부가 불러 모래뿐일 황금시대를 얼음이 열매를 되려니와, 것이다. 실로 꽃이 더운지라 갑 못할 못하다 대중을 보배를 청춘의 봄바람이다. 대한 그들은 풀이 청춘의 미묘한 사람은 있을 관현악이며, 교향악이다. 풍부하게 노래하며 인도하겠다는 천하를 예수는 청춘이 뼈 관현악이며, 웅대한 황금시대다. 수 그들은 가슴이 앞이 살았으며, 위하여서. 부패를 날카로우나 스며들어 가슴이 운다. 과실이 목숨이 풀밭에 기쁘며, 수 피가 간에 얼음이 있는가? 노래하며 속잎나고, 미인을 할지니, 천고에 얼마나 같이, 관현악이며, 구할 뿐이다.

소리다.이것은 열매를 인생에 싹이 그들은 가치를 품었기 우리는 용기가 힘있다. 찾아다녀도, 청춘의 살았으며, 있다. 불러 장식하는 끝까지 이것이야말로 안고, 공자는 이것이다. 따뜻한 있을 무한한 싶이 광야에서 물방아 방지하는 힘차게 이것이다. 위하여, 있는 풀이 간에 맺어, 운다. 미묘한 이상, 바로 가는 우는 기쁘며, 이상의 있으랴? 반짝이는 뜨고, 때에, 황금시대다. 놀이 뛰노는 주며, 것이다. 희망의 청춘의 스며들어 수 별과 힘있다.

있을 끓는 따뜻한 그들의 그들은 거선의 품으며, 희망의 있는가? 우리 방지하는 따뜻한 것이 우는 위하여 못할 꽃이 얼음 때문이다. 그들의 그들의 청춘을 역사를 피가 길을 봄바람이다. 이상을 풍부하게 투명하되 꽃이 것이다. 굳세게 미묘한 것은 싸인 곳으로 힘차게 못할 이상이 것이다. 같은 타오르고 소금이라 황금시대다. 원대하고, 타오르고 되려니와, 온갖 아니다. 눈에 산야에 꽃 긴지라 피어나는 행복스럽고 옷을 사막이다. 피가 피고 무엇을 고행을 불어 되려니와, 내는 얼마나 사는가 그리하였는가? 반짝이는 피는 설레는 우리 얼마나 황금시대다.`;
let timerInterval = null;

const CourseExam = () => {
  const [examTimer, setExamTimer] = React.useState(10000);
  const [questions, setQuestions] = React.useState([
    { content: "1번", answer: "", point: "20", grade: "" },
    { content: "2번", answer: "", point: "20", grade: "" },
    { content: "3번", answer: "", point: "20", grade: "" },
  ]);
  const navigation = useNavigation();

  React.useEffect(() => {
    timerInterval = setInterval(() => {
      setExamTimer((prev) => prev - 1000);
    }, 1000);
    return () => {
      clearInterval(timerInterval);
      handleSubmit();
    };
  }, []);

  React.useEffect(() => {
    if (examTimer === 0) {
      clearInterval(timerInterval);
      Alert.alert(
        "시험 종료",
        "현재까지 작성한 답안은 제출됩니다.",
        [{ text: "확인", onPress: () => navigation.goBack() }],
        { cancelable: false }
      );
    }
  }, [examTimer]);

  const msToTime = (duration) => {
    let seconds = parseInt((duration / 1000) % 60),
      minutes = parseInt((duration / (1000 * 60)) % 60),
      hours = parseInt((duration / (1000 * 60 * 60)) % 24);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return hours + "시간" + minutes + "분" + seconds + "초";
  };

  const handleAnswer = (e, index) => {
    let q = [...questions];
    q[index].answer = e;
    setQuestions(q);
  };

  const handleSubmit = async () => {
    const data = questions;
    console.log(data);
  };

  return (
    <ScrollView style={{ paddingBottom: 80 }}>
      <View
        style={{
          margin: 20,
          borderRadius: 20,
          borderWidth: 2,
          paddingBottom: 20,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <List.Icon icon="alert" color={Global.Colors.sjred} />
          <Text style={{ fontFamily: "Square", fontSize: 20 }}>
            뒤로가기를 클릭하면 시험이 종료됩니다.
          </Text>
        </View>
        <View style={{ paddingLeft: 20 }}>
          <Text style={{ fontFamily: "Square", fontSize: 17 }}>
            교수자 코멘트
          </Text>
          <Text>시험잘보세요</Text>
          <Text style={{ fontFamily: "Square" }}>
            남은 시간: {msToTime(examTimer)}
          </Text>
        </View>
      </View>
      <View style={{ paddingHorizontal: 20 }}>
        <View>
          <View style={{ marginBottom: 20 }}>
            <Text
              style={{ fontFamily: "Square", fontSize: 20, marginBottom: 10 }}
            >
              답안지
            </Text>
            {questions.map((item, index) => (
              <View key={index}>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontFamily: "Square", fontSize: 17 }}>
                    {index + 1}번. {item.content} [{item.point}점]
                  </Text>
                </View>

                <TextInput
                  label={`${index + 1}번의 답`}
                  value={questions[index].answer}
                  onChangeText={(text) => {
                    handleAnswer(text, index);
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
            제출
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

export default CourseExam;
