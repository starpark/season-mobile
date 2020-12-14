import * as React from "react";
import { ScrollView, View, Text, FlatList, Image } from "react-native";
import { IconButton, Colors, TextInput } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import Global from "../Styles/GlobalStyles";

const CommunityScreen = () => {
  const [text, setText] = React.useState("");
  const [isFocus, setIsFocus] = React.useState(false);
  const renderItem = ({ item, index }) => {
    return (
      <View style={{ width: 170, marginRight: 15 }}>
        <Image
          style={{
            height: 100,
            width: 170,
            resizeMode: "cover",
            marginBottom: 5,
          }}
          source={item.thumbnail}
        />
        <View>
          <Text style={{ fontFamily: "Square" }}>{item.name}</Text>
          <Text style={{ fontFamily: "Square", fontSize: 13, color: "gray" }}>
            {item.instructor}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <StarRating rate={item.rate} />
            <Text
              style={{
                marginLeft: 4,
                fontFamily: "Square",
                fontSize: 12,
                color: "gray",
              }}
            >
              ({item.participants})
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const StarFull = () => (
    <MaterialCommunityIcons
      name="star"
      size={17}
      color={Global.Colors.sjyellow}
    />
  );
  const StarHalf = () => (
    <MaterialCommunityIcons
      name="star-half"
      size={17}
      color={Global.Colors.sjyellow}
    />
  );
  const StarEmpty = () => (
    <MaterialCommunityIcons
      name="star-outline"
      size={17}
      color={Global.Colors.sjyellow}
    />
  );
  const StarSet = (rate) => {
    const fields = [];
    for (let i = 1; i <= rate; i++) {
      fields.push(<StarFull key={i} />);
    }
    if (rate % 1 === 0.5) {
      fields.push(<StarHalf />);
    }
    for (let i = 1; i <= 5 - rate; i++) {
      fields.push(<StarEmpty key={i + 6} />);
    }

    return fields;
  };

  const StarRating = ({ rate }) => {
    return <View style={{ flexDirection: "row" }}>{StarSet(rate)}</View>;
  };

  return (
    <View style={Global.Styles.container}>
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
        커뮤니티
      </Text>
      <ScrollView style={{ paddingTop: 20, paddingBottom: 60 }}>
        <TextInput
          label="검색"
          placeholder="검색어를 입력해주세요."
          value={text}
          onChangeText={setText}
          mode="outlined"
          style={{ marginHorizontal: 20, marginBottom: 10 }}
          theme={{
            colors: { primary: Global.Colors.sjgray },
          }}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          focus
          left={
            <TextInput.Icon
              name="magnify"
              color={isFocus ? Global.Colors.sjgray : "gray"}
            />
          }
          right={
            <TextInput.Icon
              name="arrow-right-circle"
              color={isFocus ? Global.Colors.sjgray : "gray"}
            />
          }
        />

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            marginHorizontal: 20,
          }}
        >
          <View
            style={{
              borderBottomWidth: 3,
              borderBottomColor: Global.Colors.sjred,
              justifyContent: "flex-end",
            }}
          >
            <Text
              style={{ fontFamily: "Square", fontSize: 20, marginBottom: 10 }}
            >
              인기 오픈 코스
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              borderBottomWidth: 3,
              borderBottomColor: Global.Colors.gray,
              alignItems: "flex-end",
            }}
          >
            <IconButton
              icon="plus"
              color={Colors.red500}
              size={20}
              onPress={() => console.log("Pressed")}
              theme={{}}
            />
          </View>
        </View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={popular}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${index}`}
          style={{ paddingHorizontal: 20, marginVertical: 20 }}
          contentContainerStyle={{ paddingRight: 80 }}
        />

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            marginHorizontal: 20,
          }}
        >
          <View
            style={{
              borderBottomWidth: 3,
              borderBottomColor: Global.Colors.sjred,
              justifyContent: "flex-end",
            }}
          >
            <Text
              style={{ fontFamily: "Square", fontSize: 20, marginBottom: 10 }}
            >
              최근 업로드된 오픈 코스
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              borderBottomWidth: 3,
              borderBottomColor: Global.Colors.gray,
              alignItems: "flex-end",
            }}
          >
            <IconButton
              icon="plus"
              color={Colors.red500}
              size={20}
              onPress={() => console.log("Pressed")}
              theme={{}}
            />
          </View>
        </View>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={newUpload}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${index}`}
          style={{ paddingHorizontal: 20, marginVertical: 20 }}
          contentContainerStyle={{ paddingRight: 80 }}
        />
      </ScrollView>
    </View>
  );
};

const popular = [
  {
    name: "Node.js 서버프로그래밍 과정",
    instructor: "차재윤",
    rate: 5.0,
    participants: 351,
    thumbnail: require("../Assets/image/t3.jpg"),
  },
  {
    name: "React with TypeScript",
    instructor: "이찬형",
    rate: 5.0,
    participants: 279,
    thumbnail: require("../Assets/image/t2.png"),
  },
  {
    name: "Expo를 이용한 모바일 앱 개발",
    instructor: "박별",
    rate: 5.0,
    participants: 246,
    thumbnail: require("../Assets/image/t1.png"),
  },
  {
    name: "TOEIC 900↑ 달성을 위한 로드맵",
    instructor: "김태원",
    rate: 4.0,
    participants: 172,
    thumbnail: require("../Assets/image/t4.jpg"),
  },
  {
    name: "Adobe Premiere를 이용한 영상 편집 기초",
    instructor: "조진규",
    rate: 4.5,
    participants: 351,
    thumbnail: require("../Assets/image/t5.jpg"),
  },
];

const newUpload = [
  {
    name: "따라하며 배우는 MySQL on Docker",
    instructor: "김영헌",
    rate: 0,
    participants: 0,
    thumbnail: require("../Assets/image/t6.jpg"),
  },
  {
    name: "Java 디자인 패턴",
    instructor: "오준석",
    rate: 5.0,
    participants: 5,
    thumbnail: require("../Assets/image/t7.jpg"),
  },
  {
    name: "TEPS 고득점 공략 가이드",
    instructor: "이시원",
    rate: 4.0,
    participants: 9,
    thumbnail: require("../Assets/image/t8.jpg"),
  },
  {
    name: "누구나 쉽게 배우는 기초 일본어",
    instructor: "서재원",
    rate: 4.0,
    participants: 8,
    thumbnail: require("../Assets/image/t9.jpg"),
  },
  {
    name: "이모티콘 작가되기",
    instructor: "이진우",
    rate: 3.5,
    participants: 15,
    thumbnail: require("../Assets/image/t10.jpg"),
  },
];

export default CommunityScreen;
