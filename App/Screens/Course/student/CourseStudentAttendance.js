import * as React from "react";
import { ScrollView, View, Text, Dimensions } from "react-native";
import { DataTable } from "react-native-paper";
import faker from "faker";
import { useRoute } from "@react-navigation/native";

import Global from "../../../Styles/GlobalStyles";

const array = [
  {
    week: 1,
    contents_name: "1-1 번째 강의입니다.",
    contents_time: 1,
    learn_time: 1,
    status: "P",
  },
  {
    week: 1,
    contents_name: "1-2 번째 강의입니다.",
    contents_time: 10,
    learn_time: 10,
    status: "P",
  },
  {
    week: 1,
    contents_name: "1-3 번째 강의입니다.",
    contents_time: 9,
    learn_time: 9,
    status: "P",
  },
  {
    week: 2,
    contents_name: "2-1 번째 강의입니다.",
    contents_time: 10,
    learn_time: 10,
    status: "P",
  },
  {
    week: 2,
    contents_name: "2-2 번째 강의입니다.",
    contents_time: 15,
    learn_time: 15,
    status: "F",
  },
  {
    week: 2,
    contents_name: "2-3 번째 강의입니다.",
    contents_time: 7,
    learn_time: 7,
    status: "F",
  },
  {
    week: 3,
    contents_name: "3-1 번째 강의입니다.",
    contents_time: 6,
    learn_time: 6,
    status: "F",
  },
  {
    week: 3,
    contents_name: "3-2 번째 강의입니다.",
    contents_time: 1,
    learn_time: 1,
    status: "F",
  },
  {
    week: 3,
    contents_name: "3-3 번째 강의입니다.",
    contents_time: 1,
    learn_time: 1,
    status: "F",
  },
  {
    week: 4,
    contents_name: "4-1 번째 강의입니다.",
    contents_time: 1,
    learn_time: 1,
    status: "F",
  },
  {
    week: 4,
    contents_name: "4-2 번째 강의입니다.",
    contents_time: 1,
    learn_time: 1,
    status: "P",
  },
  {
    week: 4,
    contents_name: "1-3 번째 강의입니다.",
    contents_time: 1,
    learn_time: 1,
    status: "P",
  },
  {
    week: 5,
    contents_name: "1-3 번째 강의입니다.",
    contents_time: 1,
    learn_time: 1,
    status: "P",
  },
  {
    week: 5,
    contents_name: "1-3 번째 강의입니다.",
    contents_time: 1,
    learn_time: 1,
    status: "P",
  },
  {
    week: 5,
    contents_name: "1-3 번째 강의입니다.",
    contents_time: 1,
    learn_time: 1,
    status: "P",
  },
  {
    week: 6,
    contents_name: "1-3 번째 강의입니다.",
    contents_time: 1,
    learn_time: 1,
    status: "P",
  },
  {
    week: 6,
    contents_name: "1-3 번째 강의입니다.",
    contents_time: 1,
    learn_time: 1,
    status: "P",
  },
  {
    week: 6,
    contents_name: "1-3 번째 강의입니다.",
    contents_time: 1,
    learn_time: 1,
    status: "P",
  },
  {
    week: 15,
    contents_name: "15장 1강",
    contents_time: 37,
    learn_time: 37,
    status: "P",
  },
  {
    week: 15,
    contents_name: "15장 2강",
    contents_time: 50,
    learn_time: 50,
    status: "P",
  },
];

const itemsPerPage = 10;

const CourseStudentAttendance = () => {
  const [page, setPage] = React.useState(0);
  const from = page * itemsPerPage;
  const to = (page + 1) * itemsPerPage;

  return (
    <View>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>영상 소속</DataTable.Title>
          <DataTable.Title>영상 이름</DataTable.Title>
          <DataTable.Title>학습 시간</DataTable.Title>
          <DataTable.Title>컨텐츠 시간</DataTable.Title>
          <DataTable.Title>출석 상태(P/F)</DataTable.Title>
        </DataTable.Header>
        <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
          {array.slice(from, to - 1).map((item, index) => (
            <DataTable.Row key={index} onPress={() => console.log(1)}>
              <DataTable.Cell>{item.week}주차</DataTable.Cell>
              <DataTable.Cell>{item.contents_name}</DataTable.Cell>
              <DataTable.Cell>{item.learn_time}</DataTable.Cell>
              <DataTable.Cell>{item.contents_time}</DataTable.Cell>
              <DataTable.Cell>{item.status}</DataTable.Cell>
            </DataTable.Row>
          ))}

          <DataTable.Pagination
            page={page}
            numberOfPages={Math.floor(array.length / itemsPerPage)}
            onPageChange={(page) => {
              setPage(page);
            }}
            label={`${array.length}개의 강의 중 ${from + 1}-${to}`}
          />
        </ScrollView>
      </DataTable>
    </View>
  );
};

export default CourseStudentAttendance;
