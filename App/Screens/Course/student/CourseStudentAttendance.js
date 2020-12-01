import * as React from "react";
import { ScrollView, View, Text, Dimensions } from "react-native";
import { DataTable } from "react-native-paper";
import faker from "faker";
import { useRoute } from "@react-navigation/native";

import Global from "../../../Styles/GlobalStyles";

const array = [];
for (let i = 0; i < 50; i++) {
  array.push({ contents_name: faker.name.findName() });
}

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
              <DataTable.Cell>1주차</DataTable.Cell>
              <DataTable.Cell>{item.contents_name}</DataTable.Cell>
              <DataTable.Cell>30분</DataTable.Cell>
              <DataTable.Cell>30분</DataTable.Cell>
              <DataTable.Cell>P</DataTable.Cell>
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
