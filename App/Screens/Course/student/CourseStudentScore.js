import * as React from "react";
import { ScrollView, View, Text, Dimensions } from "react-native";
import { DataTable } from "react-native-paper";
import faker from "faker";
import { useRoute } from "@react-navigation/native";

import Global from "../../../Styles/GlobalStyles";

const array = [
  { contents_type: "시험", contents_name: "시험1", score: 50, max_score: 50 },
  { contents_type: "과제", contents_name: "과제1", score: 50, max_score: 50 },
];
const itemsPerPage = 10;

const CourseStudentScore = () => {
  const [page, setPage] = React.useState(0);
  const from = page * itemsPerPage;
  const to = (page + 1) * itemsPerPage;

  return (
    <View>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>컨텐츠 타입</DataTable.Title>
          <DataTable.Title>컨텐츠 이름</DataTable.Title>
          <DataTable.Title>업로드 일자</DataTable.Title>
          <DataTable.Title>제출 상태</DataTable.Title>
          <DataTable.Title numeric>점수</DataTable.Title>
        </DataTable.Header>
        <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
          {array.slice(from, to - 1).map((item, index) => (
            <DataTable.Row key={index} onPress={() => console.log(1)}>
              <DataTable.Cell>{item.contents_type}</DataTable.Cell>
              <DataTable.Cell>{item.contents_name}</DataTable.Cell>
              <DataTable.Cell>2020.11.30</DataTable.Cell>
              <DataTable.Cell>채점완료</DataTable.Cell>
              <DataTable.Cell numeric>50/50</DataTable.Cell>
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

export default CourseStudentScore;
