import * as React from "react";
import { ScrollView, View, Text, Dimensions } from "react-native";
import { DataTable } from "react-native-paper";
import faker from "faker";
import { useRoute } from "@react-navigation/native";

import Global from "../../../Styles/GlobalStyles";

const array = [];
for (let i = 0; i < 50; i++) {
  array.push({ name: faker.name.findName(), id: faker.random.number() });
}
array.sort((a, b) => {
  return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
});

const itemsPerPage = 10;

const CourseInstructorAttendance = () => {
  const [page, setPage] = React.useState(0);
  const [sort, setSort] = React.useState("ascending");
  const from = page * itemsPerPage;
  const to = (page + 1) * itemsPerPage;

  const reSort = () => {
    if (sort === "ascending") {
      array.sort((a, b) => {
        return a.id > b.id ? -1 : a.id < b.id ? 1 : 0;
      });

      setSort("descending");
    } else {
      array.sort((a, b) => {
        return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
      });
      setSort("ascending");
    }
  };

  return (
    <View>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title sortDirection={sort} onPress={reSort}>
            학생 학번
          </DataTable.Title>
          <DataTable.Title>학생 이름</DataTable.Title>
          <DataTable.Title numeric>출석 횟수</DataTable.Title>
          <DataTable.Title numeric>총 횟수</DataTable.Title>
          <DataTable.Title numeric>현재 점수</DataTable.Title>
        </DataTable.Header>
        <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
          {array.slice(from, to - 1).map((item, index) => (
            <DataTable.Row key={item.id} onPress={() => console.log(1)}>
              <DataTable.Cell>{item.id}</DataTable.Cell>
              <DataTable.Cell>{item.name}</DataTable.Cell>
              <DataTable.Cell numeric>15</DataTable.Cell>
              <DataTable.Cell numeric>15</DataTable.Cell>
              <DataTable.Cell numeric>100</DataTable.Cell>
            </DataTable.Row>
          ))}

          <DataTable.Pagination
            page={page}
            numberOfPages={Math.floor(array.length / itemsPerPage)}
            onPageChange={(page) => {
              setPage(page);
            }}
            label={`${array.length}명의 학생 중 ${from + 1}-${to}`}
          />
        </ScrollView>
      </DataTable>
    </View>
  );
};

export default CourseInstructorAttendance;
