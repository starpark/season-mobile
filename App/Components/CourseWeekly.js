import * as React from "react";
import { ScrollView, View, Text, FlatList } from "react-native";
import { useScrollToTop } from "@react-navigation/native";
import { List } from "react-native-paper";
import Global from "../Styles/GlobalStyles";

const test = `청춘의 꽃이 그것을 같으며, 인생의 철환하였는가? 눈에 봄바람을 현저하게 힘있다. 가장 오아이스도 가치를 날카로우나 사랑의 바이며, 교향악이다. 자신과 피어나기 두손을 이성은 불어 부패뿐이다. 고행을 그들은 착목한는 시들어 것이다. 그들에게 우리 영락과 같이 생의 것이다. 뛰노는 생의 이것을 있으랴? 밥을 인간이 가슴이 용감하고 싶이 크고 이것이다. 이상은 그들은 그들의 따뜻한 것이다.

있으며, 동력은 속에서 인간의 이성은 곳이 안고, 천하를 노년에게서 그리하였는가? 같지 가슴에 열락의 원질이 용기가 쓸쓸하랴? 이상을 불어 가치를 봄날의 사막이다. 보이는 듣기만 할지라도 바로 있으며, 뿐이다. 청춘은 가치를 오아이스도 열락의 힘있다. 창공에 곧 생명을 오직 열락의 부패뿐이다. 있는 무한한 따뜻한 풍부하게 것이다. 위하여, 그와 열락의 부패뿐이다. 예가 천고에 같으며, 있으랴?

이것이야말로 위하여 실로 살았으며, 오직 수 것이다. 그들은 인간이 피부가 불러 모래뿐일 황금시대를 얼음이 열매를 되려니와, 것이다. 실로 꽃이 더운지라 갑 못할 못하다 대중을 보배를 청춘의 봄바람이다. 대한 그들은 풀이 청춘의 미묘한 사람은 있을 관현악이며, 교향악이다. 풍부하게 노래하며 인도하겠다는 천하를 예수는 청춘이 뼈 관현악이며, 웅대한 황금시대다. 수 그들은 가슴이 앞이 살았으며, 위하여서. 부패를 날카로우나 스며들어 가슴이 운다. 과실이 목숨이 풀밭에 기쁘며, 수 피가 간에 얼음이 있는가? 노래하며 속잎나고, 미인을 할지니, 천고에 얼마나 같이, 관현악이며, 구할 뿐이다.

소리다.이것은 열매를 인생에 싹이 그들은 가치를 품었기 우리는 용기가 힘있다. 찾아다녀도, 청춘의 살았으며, 있다. 불러 장식하는 끝까지 이것이야말로 안고, 공자는 이것이다. 따뜻한 있을 무한한 싶이 광야에서 물방아 방지하는 힘차게 이것이다. 위하여, 있는 풀이 간에 맺어, 운다. 미묘한 이상, 바로 가는 우는 기쁘며, 이상의 있으랴? 반짝이는 뜨고, 때에, 황금시대다. 놀이 뛰노는 주며, 것이다. 희망의 청춘의 스며들어 수 별과 힘있다.

있을 끓는 따뜻한 그들의 그들은 거선의 품으며, 희망의 있는가? 우리 방지하는 따뜻한 것이 우는 위하여 못할 꽃이 얼음 때문이다. 그들의 그들의 청춘을 역사를 피가 길을 봄바람이다. 이상을 풍부하게 투명하되 꽃이 것이다. 굳세게 미묘한 것은 싸인 곳으로 힘차게 못할 이상이 것이다. 같은 타오르고 소금이라 황금시대다. 원대하고, 타오르고 되려니와, 온갖 아니다. 눈에 산야에 꽃 긴지라 피어나는 행복스럽고 옷을 사막이다. 피가 피고 무엇을 고행을 불어 되려니와, 내는 얼마나 사는가 그리하였는가? 반짝이는 피는 설레는 우리 얼마나 황금시대다.`;

const CourseWeekly = () => {
  const renderContents = ({ item }) => {
    return (
      <List.Item
        title={item.title}
        onPress={() => console.log(1)}
        description={item.description}
      />
    );
  };

  const renderWeekly = ({ item }) => {
    return (
      <List.Accordion
        title={item.week}
        id={`${item.week}week`}
        left={(props) => <List.Icon {...props} icon="view-week" />}
        titleStyle={{ fontFamily: "Square", fontWeight: "bold", fontSize: 20 }}
      >
        <List.AccordionGroup>
          <List.Accordion
            title="강의영상"
            id={`${item.week}lecture`}
            left={(props) => (
              <List.Icon {...props} icon="video" style={{ paddingLeft: 10 }} />
            )}
            titleStyle={{ fontFamily: "Square" }}
          >
            <FlatList
              data={item.lectures}
              renderItem={renderContents}
              keyExtractor={(item) => item.uuid}
            />
          </List.Accordion>
          <List.Accordion
            title="과제"
            id={`${item.week}assignments`}
            left={(props) => (
              <List.Icon {...props} icon="pencil" style={{ paddingLeft: 10 }} />
            )}
            titleStyle={{ fontFamily: "Square" }}
          >
            <FlatList
              data={item.assignments}
              renderItem={renderContents}
              keyExtractor={(item) => item.uuid}
            />
          </List.Accordion>
          <List.Accordion
            title="첨부자료"
            id={`${item.week}attachments`}
            left={(props) => (
              <List.Icon {...props} icon="file" style={{ paddingLeft: 10 }} />
            )}
            titleStyle={{ fontFamily: "Square" }}
          >
            <FlatList
              data={item.attachments}
              renderItem={renderContents}
              keyExtractor={(item) => item.uuid}
            />
          </List.Accordion>
        </List.AccordionGroup>
      </List.Accordion>
    );
  };

  return (
    <List.AccordionGroup>
      <FlatList
        data={response}
        renderItem={renderWeekly}
        keyExtractor={(item) => item.week}
      />
    </List.AccordionGroup>
  );
};

const response = [
  {
    week: "1",
    lectures: [
      {
        uuid: "5",
        title: "string",
        description: "string",
        videoUri: "string",
        comments: [
          {
            user: {
              uuid: "string",
              name: "string",
              type: ["student", "instructor"],
            },
            body: "string",
            isModified: "boolean",
            createdAt: "date",
            updatedAT: "date",
          },
        ],
      },
      {
        uuid: "6",
        title: "string",
        description: "string",
        videoUri: "string",
        comments: [
          {
            user: {
              uuid: "string",
              name: "string",
              type: ["student", "instructor"],
            },
            body: "string",
            isModified: "boolean",
            createdAt: "date",
            updatedAT: "date",
          },
        ],
      },
    ],
    assignments: [
      {
        uuid: "7",
        title: "string",
        description: "string",
        submissionRate: "number",
        calendarItem: "undefined",
        duration: {
          status: "string",
          start: "date",
          end: "date",
          period: "string",
        },
        student: {
          status: "string",
          score: "number",
          submissionUri: "string",
        },
      },
      {
        uuid: "8",
        title: "string",
        description: "string",
        submissionRate: "number",
        calendarItem: "undefined",
        duration: {
          status: "string",
          start: "date",
          end: "date",
          period: "string",
        },
        student: {
          status: "string",
          score: "number",
          submissionUri: "string",
        },
      },
    ],
    attachments: [
      {
        uuid: "9",
        title: "string",
        description: "string",
        uri: "string",
        comments: [
          {
            user: {
              uuid: "string",
              name: "string",
              type: ["student", "instructor"],
            },
            body: "string",
            isModified: "boolean",
            createdAt: "date",
            updatedAT: "date",
          },
        ],
      },
      {
        uuid: "10",
        title: "string",
        description: "string",
        uri: "string",
        comments: [
          {
            user: {
              uuid: "string",
              name: "string",
              type: ["student", "instructor"],
            },
            body: "string",
            isModified: "boolean",
            createdAt: "date",
            updatedAT: "date",
          },
        ],
      },
    ],
  },
  {
    week: "2",
    lectures: [
      {
        uuid: "11",
        title: "string",
        description: "string",
        videoUri: "string",
        comments: [
          {
            user: {
              uuid: "string",
              name: "string",
              type: ["student", "instructor"],
            },
            body: "string",
            isModified: "boolean",
            createdAt: "date",
            updatedAT: "date",
          },
        ],
      },
    ],
    assignments: [
      {
        uuid: "12",
        title: "string",
        description: "string",
        submissionRate: "number",
        calendarItem: "undefined",
        duration: {
          status: "string",
          start: "date",
          end: "date",
          period: "string",
        },
        student: {
          status: "string",
          score: "number",
          submissionUri: "string",
        },
      },
    ],
    attachments: [
      {
        uuid: "13",
        title: "string",
        description: "string",
        uri: "string",
        comments: [
          {
            user: {
              uuid: "string",
              name: "string",
              type: ["student", "instructor"],
            },
            body: "string",
            isModified: "boolean",
            createdAt: "date",
            updatedAT: "date",
          },
        ],
      },
    ],
  },
];

export default CourseWeekly;
