import * as React from "react";
import { View, Dimensions, Text, ScrollView } from "react-native";
import { Calendar, LocaleConfig, Agenda } from "react-native-calendars";
import Global from "../Styles/GlobalStyles";

const { width: screenWidth } = Dimensions.get("window");

LocaleConfig.locales["ko"] = {
  monthNames: [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ],
  monthNamesShort: [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ],
  dayNames: [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ],
  dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
  today: "오늘",
};
LocaleConfig.defaultLocale = "ko";

const CalendarScreen = () => {
  const [pickDate, setPickDate] = React.useState({});

  return (
    <View style={[Global.Styles.container, { backgroundColor: "#F5F5F5" }]}>
      <Text
        style={{
          fontFamily: "Square",
          fontSize: 25,
          marginLeft: 20,
          marginTop: 20,
          elevation: 10,
          zIndex: 10,
        }}
      >
        캘린더
      </Text>
      <View
        style={{
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          overflow: "hidden",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
          backgroundColor: "white",
          position: "absolute",
          top: 0,
          right: 0,
          left: 0,
          paddingTop: 40,
          zIndex: 9,
        }}
      >
        <Calendar
          style={{ marginVertical: 30 }}
          calendarWidth={screenWidth - 20}
          markedDates={{
            "2020-12-14": {
              periods: [
                {
                  startingDay: true,
                  endingDay: true,
                  color: Global.Colors.course[0],
                },
                {
                  startingDay: true,
                  endingDay: true,
                  color: Global.Colors.course[1],
                },
                {
                  startingDay: true,
                  endingDay: false,
                  color: Global.Colors.course[2],
                },
              ],
            },
            "2020-12-15": {
              periods: [
                { startingDay: true, endingDay: true, color: "#ffa500" },
                { color: "transparent" },
                {
                  startingDay: false,
                  endingDay: true,
                  color: Global.Colors.course[2],
                },
              ],
            },
          }}
          monthFormat={"yy년 MM월"}
          markingType="multi-period"
          onDayPress={(e) => {
            setPickDate(e);
          }}
        />
      </View>
      {pickDate.timestamp && (
        <ScrollView
          contentContainerStyle={{
            paddingTop: 400,
            paddingBottom: 60,
            paddingHorizontal: 20,
          }}
        >
          <View>
            <Text
              style={{ fontFamily: "Square", fontWeight: "bold", fontSize: 25 }}
            >
              {pickDate.month}월 {pickDate.day}일
            </Text>
            <View>
              <View
                style={{
                  flexDirection: "row",
                  height: 100,
                  marginVertical: 7,
                  backgroundColor: "white",
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.2,
                  shadowRadius: 1.41,

                  elevation: 2,
                }}
              >
                <View
                  style={{
                    backgroundColor: Global.Colors.course[0],
                    width: 3,
                  }}
                />
                <View style={{ padding: 5 }}>
                  <Text style={{ fontFamily: "Square", fontSize: 17 }}>
                    자기주도창의전공 I
                  </Text>
                  <Text>과제1</Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  height: 100,
                  marginVertical: 7,
                  backgroundColor: "white",
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.2,
                  shadowRadius: 1.41,

                  elevation: 2,
                }}
              >
                <View
                  style={{
                    backgroundColor: Global.Colors.course[0],
                    width: 3,
                  }}
                />
                <View style={{ padding: 5 }}>
                  <Text style={{ fontFamily: "Square", fontSize: 17 }}>
                    자기주도창의전공 I
                  </Text>
                  <Text>영상1</Text>
                </View>
              </View>
              {/* <View
                style={{
                  flexDirection: "row",
                  height: 100,
                  marginVertical: 7,
                  backgroundColor: "white",
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.2,
                  shadowRadius: 1.41,

                  elevation: 2,
                }}
              >
                <View
                  style={{
                    backgroundColor: Global.Colors.course[1],
                    width: 3,
                  }}
                />
                <View style={{ padding: 5 }}>
                  <Text style={{ fontFamily: "Square", fontSize: 17 }}>
                    자기주도창의전공 II (002)
                  </Text>
                  <Text>시험1</Text>
                </View>
              </View> */}
              {/* <View
                style={{
                  flexDirection: "row",
                  height: 100,
                  marginVertical: 7,
                  backgroundColor: "white",
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.2,
                  shadowRadius: 1.41,

                  elevation: 2,
                }}
              >
                <View
                  style={{
                    backgroundColor: Global.Colors.course[2],
                    width: 3,
                  }}
                />
                <View style={{ padding: 5 }}>
                  <Text style={{ fontFamily: "Square", fontSize: 17 }}>
                    자기주도창의전공 I
                  </Text>
                  <Text>15장 1강</Text>
                </View>
              </View> */}
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default CalendarScreen;
