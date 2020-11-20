import * as React from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from "react-native";
import { Text, Headline, TouchableRipple } from "react-native-paper";
import Global from "../../Styles/GlobalStyles";
import Carousel, {
  ParallaxImage,
  Pagination,
} from "react-native-snap-carousel";
import {
  Foundation,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const uri = {
  0: require(`../../../Assets/image/background1.jpg`),
  1: require(`../../../Assets/image/background2.jpg`),
  2: require(`../../../Assets/image/background3.jpg`),
  3: require(`../../../Assets/image/background4.jpg`),
  4: require(`../../../Assets/image/background5.jpg`),
  5: require(`../../../Assets/image/background6.jpg`),
};
const ENTRIES1 = [
  {
    title: "Beautiful and dramatic Antelope Canyon",
    subtitle: "Lorem ipsum dolor sit amet et nuncat mergitur",
    illustration: "https://i.imgur.com/UYiroysl.jpg",
  },
  {
    title: "Earlier this morning, NYC",
    subtitle: "Lorem ipsum dolor sit amet",
    illustration: "https://i.imgur.com/UPrs1EWl.jpg",
  },
  {
    title: "White Pocket Sunset",
    subtitle: "Lorem ipsum dolor sit amet et nuncat ",
    illustration: "https://i.imgur.com/MABUbpDl.jpg",
  },
  {
    title: "Acrocorinth, Greece",
    subtitle: "Lorem ipsum dolor sit amet et nuncat mergitur",
    illustration: "https://i.imgur.com/KZsmUi2l.jpg",
  },
  {
    title: "The lone tree, majestic landscape of New Zealand",
    subtitle: "Lorem ipsum dolor sit amet",
    illustration: "https://i.imgur.com/2nCt3Sbl.jpg",
  },
];

const Summuey = (props) => {
  const [entries, setEntries] = React.useState([]);
  const [index, setIndex] = React.useState(0);
  const carouselRef = React.useRef(null);
  const [itemScale, setItemScale] = React.useState({ width: 0, height: 0 });

  React.useEffect(() => {
    setEntries(props.entries);
  }, [props]);

  const renderItem = ({ item, index }, parallaxProps) => {
    return (
      <View style={styles.item} key={index}>
        <ParallaxImage
          source={uri[index]}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.5}
          blurRadius={1}
          {...parallaxProps}
        />

        <View style={propsStyle(itemScale).controls}>
          <View style={propsStyle(itemScale).cContainer}>
            <View>
              <View style={propsStyle(itemScale).moreContainer}>
                <TouchableRipple
                  onPress={() => console.log("Pressed")}
                  rippleColor="rgba(255, 255, 255, 0.5)"
                  style={styles.more}
                  borderless={true}
                >
                  <MaterialCommunityIcons
                    name="dots-vertical"
                    size={30}
                    color="white"
                  />
                </TouchableRipple>
              </View>
              <View style={propsStyle(index).titleBox}>
                <Headline style={styles.courseInfo}>{item.title}</Headline>
                <Text style={styles.courseInfo}>{item.instructor}</Text>
              </View>
            </View>
            <View></View>
          </View>
          <View style={styles.quickMenuBox}>
            <TouchableRipple
              onPress={() => console.log("Pressed")}
              rippleColor="rgba(255, 255, 255, 0.5)"
              style={styles.quickRipple}
              borderless={true}
            >
              <View style={{ alignItems: "center" }}>
                <Foundation name="play-video" size={24} color="white" />
                <Text style={styles.quickLabel}>강의</Text>
              </View>
            </TouchableRipple>
            <TouchableRipple
              onPress={() => console.log("Pressed")}
              rippleColor="rgba(255, 255, 255, 0.5)"
              style={styles.quickRipple}
              borderless={true}
            >
              <View style={{ alignItems: "center" }}>
                <AntDesign name="notification" size={24} color="white" />
                <Text style={styles.quickLabel}>공지</Text>
              </View>
            </TouchableRipple>
            <TouchableRipple
              onPress={() => console.log("Pressed")}
              rippleColor="rgba(255, 255, 255, 0.5)"
              style={styles.quickRipple}
              borderless={true}
            >
              <View style={{ alignItems: "center" }}>
                <MaterialCommunityIcons
                  name="progress-check"
                  size={24}
                  color="white"
                />
                <Text style={styles.quickLabel}>출석</Text>
              </View>
            </TouchableRipple>
            <TouchableRipple
              onPress={() => console.log("Pressed")}
              rippleColor="rgba(255, 255, 255, 0.5)"
              style={styles.quickRipple}
              borderless={true}
            >
              <View style={{ alignItems: "center" }}>
                <MaterialCommunityIcons
                  name="alpha-a-box-outline"
                  size={24}
                  color="white"
                />
                <Text style={styles.quickLabel}>점수</Text>
              </View>
            </TouchableRipple>
          </View>
        </View>
      </View>
    );
  };

  return (
    <ScrollView
      style={{ flex: 1, width: screenWidth }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.taskTracker}>
        <View style={styles.trackerTitle}>
          <Headline style={{ fontFamily: "Godo" }}>Task Tracker</Headline>
          <View style={styles.courseQucik}>
            <Text style={{ color: Global.Colors.sjgray, fontFamily: "Godo" }}>
              나의 코스
            </Text>
            <MaterialCommunityIcons
              name="chevron-right"
              size={24}
              color={Global.Colors.sjgray}
            />
          </View>
        </View>
        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            <View>
              <Text style={styles.nowCourse}>수강중인 강의</Text>
            </View>

            <Pagination
              dotsLength={entries.length}
              activeDotIndex={index}
              containerStyle={styles.pagContainer}
              dotStyle={styles.pagDot}
              inactiveDotStyle={{}}
              inactiveDotOpacity={0.7}
              inactiveDotScale={0.7}
              tappableDots={true}
              carouselRef={carouselRef}
            />
          </View>

          <ImageBackground
            source={require("../../../Assets/image/pattern.png")}
            style={{
              height: 200,
              backgroundColor: Global.Colors.sjsilver,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.27,
              shadowRadius: 4.65,

              elevation: 6,
            }}
            imageStyle={{
              resizeMode: "repeat",
            }}
            onLayout={(e) => {
              setItemScale({
                width: e.nativeEvent.layout.width,
                height: e.nativeEvent.layout.height,
              });
            }}
          >
            <Carousel
              ref={carouselRef}
              sliderWidth={screenWidth - 40}
              sliderHeight={200}
              itemWidth={screenWidth - 40}
              data={entries}
              renderItem={renderItem}
              hasParallaxImages={true}
              onSnapToItem={(i) => setIndex(i)}
              style={{
                shadowColor: "black",
                shadowOffset: { width: 0, height: 4 },
                shadowRadius: 6,
                shadowOpacity: 0.2,
                elevation: 5,
              }}
            />
          </ImageBackground>
        </View>
        <View style={styles.sumContainer}>
          <Text>
            간에 할지라도 그들은 같이, 것은 찾아다녀도, 가진 미묘한 교향악이다.
            것은 가진 그들에게 것이다. 실현에 남는 반짝이는 미묘한 것이다.
            웅대한 위하여, 대중을 가지에 있는 힘차게 피가 것이다. 가슴이 것은
            예수는 불어 위하여서, 가진 트고, 산야에 아니다. 노래하며 인간이 수
            가는 생명을 피가 안고, 그것은 같이 것이다. 청춘 더운지라 않는
            청춘에서만 것이다. 붙잡아 생명을 가진 봄바람이다. 열매를 용감하고
            설레는 교향악이다. 따뜻한 무엇을 없으면 스며들어 우는 그러므로
            보이는 가치를 황금시대다. 따뜻한 수 인생에 같은 찾아 역사를 아름답고
            용기가 위하여 것이다. 그들을 그것을 굳세게 부패뿐이다. 같이, 곳이
            가슴이 운다. 그러므로 트고, 무엇이 이 얼마나 않는 그들에게 시들어
            것이다. 것은 밝은 이상이 있다. 그들의 평화스러운 그들의 넣는 불어
            온갖 같은 끓는다. 있는 있으며, 심장의 들어 보이는 이것은 아니한
            현저하게 약동하다. 불어 피고, 대한 우리 위하여서, 이것이다. 그와 곧
            심장의 하였으며, 천지는 우리 이상 보이는 약동하다. 보배를 우리
            천자만홍이 심장은 구하기 두손을 있으랴? 속잎나고, 할지니, 가진 바로
            뿐이다. 것은 튼튼하며, 피어나는 소금이라 동산에는 용감하고 인생에
            있는 약동하다. 않는 수 무엇을 없는 안고, 위하여, 어디 끓는 발휘하기
            사막이다. 천지는 할지니, 못할 피고, 위하여서. 위하여 청춘 기쁘며,
            노래하며 커다란 부패를 인간의 작고 것이 힘있다. 노래하며 얼마나
            사랑의 이상의 온갖 것은 새가 못할 보라. 아니더면, 인도하겠다는
            가슴에 것이다.보라, 능히 이는 부패뿐이다. 방지하는 용감하고 무엇을
            있으랴? 이성은 우리 공자는 스며들어 뿐이다. 얼음 품었기 청춘에서만
            바이며, 청춘의 그들을 보라. 없으면 튼튼하며, 않는 같은 사랑의 새가
            투명하되 그들의 그들은 있는가? 생생하며, 위하여, 타오르고 지혜는
            어디 귀는 커다란 심장의 것이다. 이상의 어디 있을 것은 부패뿐이다. 새
            그들은 보는 사막이다. 피어나기 않는 천자만홍이 들어 따뜻한 얼음과
            관현악이며, 미묘한 아름다우냐? 아니한 천자만홍이 속에서 할지니,
            말이다. 투명하되 피고 황금시대의 것이다. 희망의 이는 오직 말이다.
            같으며, 끓는 품에 길지 있는가? 하는 어디 피는 얼음이 인간이 그들의
            발휘하기 하여도 뛰노는 있다. 같이, 풍부하게 시들어 봄바람이다.
            그러므로 예수는 피는 따뜻한 없으면, 않는 아름답고 위하여서. 구하기
            반짝이는 이상이 대한 밥을 것이다. 두손을 인간의 바이며, 이것이야말로
            아니다. 피에 소금이라 인간에 봄바람이다. 착목한는 풀이 없는 설산에서
            있는 어디 몸이 피부가 가치를 듣는다. 속에서 청춘의 이것이야말로 같은
            지혜는 인류의 천하를 위하여, 고행을 철환하였는가? 앞이 무엇을 사는가
            봄바람을 때문이다. 이상 있는 있는 커다란 얼마나 바로 것은 위하여
            있는가? 끝에 꽃이 바로 것이다. 아름답고 소금이라 바로 힘차게 이상
            그들은 청춘의 아름다우냐? 그들을 이상이 불어 예가 앞이 황금시대다.
            끓는 웅대한 얼음과 것이다.보라, 되려니와, 피가 그들의 이것이다. 피고
            가슴에 품에 행복스럽고 사막이다. 노년에게서 청춘 그림자는 커다란
            무한한 있는 뼈 때까지 사막이다. 불러 심장은 것은 미묘한 가지에
            봄바람이다. 새가 들어 위하여 꽃 발휘하기 방황하였으며, 용감하고
            얼마나 있으랴? 불어 예수는 인생의 불어 쓸쓸하랴? 목숨을 천고에
            가슴이 열매를 희망의 사라지지 있는 칼이다. 대고, 살았으며, 두기
            소담스러운 이상은 있다. 희망의 찾아 그들의 뿐이다. 우리의 그들의
            쓸쓸한 열락의 행복스럽고 무엇을 아니더면, 피가 있는가? 꽃이 실현에
            긴지라 황금시대의 얼마나 철환하였는가?
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    width: screenWidth - 40,
    height: 200,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: "white",
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
  },
  taskTracker: {
    margin: 20,
    borderRadius: 14,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  more: {
    height: 30,
    width: 30,
    borderRadius: 25,
  },
  courseInfo: { color: "white", fontFamily: "Godo" },
  quickMenuBox: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    marginBottom: 7,
  },
  quickRipple: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  quickLabel: { color: "white", fontFamily: "Godo" },
  trackerTitle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  courseQucik: {
    flexDirection: "row",
    alignItems: "center",
  },
  nowCourse: {
    fontFamily: "Godo",
    fontSize: 15,
    paddingHorizontal: 20,
  },
  pagContainer: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 0,
  },
  pagDot: {
    width: 15,
    height: 15,
    borderRadius: 7,
    marginHorizontal: 3,
    backgroundColor: Global.Colors.sjgray,
  },
  sumContainer: {
    paddingTop: 10,
    paddingBottom: 50,
    paddingHorizontal: 20,
  },
});

const propsStyle = (props) =>
  StyleSheet.create({
    controls: {
      position: "absolute",
      backgroundColor: "rgba(0,0,0,.5)",
      top: 0,
      left: 0,
      width: props.width,
      height: 200,
    },
    cContainer: { flex: 1, width: props.width - 100 },
    moreContainer: {
      width: props.width,
      alignItems: "flex-end",
      padding: 10,
    },
    titleBox: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRightColor: Global.Colors.course[props],
      borderBottomColor: Global.Colors.course[props],
      borderTopColor: Global.Colors.course[props],
      borderTopWidth: 3,
      borderBottomWidth: 3,
      borderRightWidth: 3,
      alignSelf: "flex-start",
    },
  });

export default Summuey;
