import * as React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  Dimensions,
  StyleSheet,
} from "react-native";
import Carousel, {
  Pagination,
} from "react-native-snap-carousel";
import Global from "../Styles/GlobalStyles"
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { SlackTabView } from "../Navigation/LectureTopTab"
import { CommonActions, useNavigation } from '@react-navigation/native';
import { Modalize } from 'react-native-modalize';
import { Entypo } from '@expo/vector-icons';


const ENTRIES1 = [
  {
    title: "알고리즘및실습 (001)",
    instructor: "국형준, 코스담당자A",
    score: {
      max: 244,
      now: 206.5,
    },
    attendance: {
      max: 20,
      now: 14,
    },
    learningTime: 800,
    notice: {
      0: "12주차 실습없음",
      1: "중간고사 마무리"
    },
    lecture: {
      0: "15장 1강",
      1: "15장 2강"
    }
  },
  {
    title: "알고리즘및실습 (002)",
    instructor: "국형준, 코스담당자A",
    score: {
      max: 244,
      now: 100.5,
    },
    attendance: {
      max: 20,
      now: 4,
    },
    learningTime: 800,
    notice: {
      0: "12주차 실습없음",
      1: "중간고사 마무리"
    },
    lecture: {
      0: "15장 1강 22020022002020202022020202020",
      1: "15장 2강"
    }
  },
  {
    title: "알고리즘및실습 (003)",
    instructor: "국형준, 코스담당자A",
    score: {
      max: 244,
      now: 100.5,
    },
    attendance: {
      max: 20,
      now: 4,
    },
    learningTime: 800,
    notice: {
      0: "12주차 실습없음",
      1: "중간고사 마무리"
    },
    lecture: {
      0: "15장 1강 22020022002020202022020202020",
      1: "15장 2강"
    }
  },
  {
    title: "알고리즘및실습 (004)",
    instructor: "국형준, 코스담당자A",
    score: {
      max: 244,
      now: 100.5,
    },
    attendance: {
      max: 20,
      now: 4,
    },
    learningTime: 800,
    notice: {
      0: "12주차 실습없음",
      1: "중간고사 마무리"
    },
    lecture: {
      0: "15장 1강 22020022002020202022020202020",
      1: "15장 2강"
    }
  },
  {
    title: "알고리즘및실습 (005)",
    instructor: "국형준, 코스담당자A",
    score: {
      max: 244,
      now: 100.5,
    },
    attendance: {
      max: 20,
      now: 4,
    },
    learningTime: 800,
    notice: {
      0: "12주차 실습없음",
      1: "중간고사 마무리"
    },
    lecture: {
      0: "15장 1강 22020022002020202022020202020",
      1: "15장 2강"
    }
  },
];

const { width: screenWidth } = Dimensions.get("window");
const { height: screenHeight } = Dimensions.get("window");

const MENU_HEIGHT = screenHeight - 200;

const CourseTracker = () => {
  const [entries, setEntries] = React.useState([]);
  const [activeSlide, setActiveSlide] = React.useState(0);
  const modalizeRef = React.useRef(null);
  const navigation = useNavigation();
  const carouselRef = React.useRef(null);

  React.useEffect(() => {
    setEntries(ENTRIES1);
    setActiveSlide(0);
  }, []);

  const onOpen = () => {
    modalizeRef.current?.open();
  };
  const onClose = () => {
    modalizeRef.current?.close();
  };

  const tintColorSet = (max, now) => {
    const score = now / max;
    if (score <= 0.25) {
      return Global.Colors.error;
    }
    else if (score <= 0.5) {
      return Global.Colors.warn;
    }
    else if (score <= 0.75) {
      return Global.Colors.fine;
    }
    else {
      return Global.Colors.well;
    }
  }

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.item}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <View style={{ flex: 1, backgroundColor: Global.Colors.course[index] }}></View>
          <View style={{ flex: 1 }} ></View>
          <View style={styles.taskContainer} >
            <View>
              <Text style={styles.itemtitle}>{item.title}</Text>
              <Text >{item.instructor}</Text>
            </View>
            <View>
            </View>
            <View style={styles.circleContainer}>
              <View>
                <Text style={styles.circleTitle}>학습 시간</Text>
                <Text style={styles.circleLearn}>{item.learningTime} 분</Text>
              </View>
              <View>
                <Text style={styles.circleTitle}>점수</Text>
                <AnimatedCircularProgress
                  size={80}
                  width={5}
                  fill={item.score.now / item.score.max * 100}
                  duration={index ? (0) : (1000)}
                  tintColor={tintColorSet(item.score.max, item.score.now)}
                  backgroundColor={Global.Colors.gray} >
                  {
                    (fill) => (
                      <>
                        <Text style={styles.circleContents}>
                          {item.score.now}
                        </Text>
                        <Text style={styles.circleSubContents}>
                          /{item.score.max}
                        </Text>
                      </>
                    )
                  }
                </AnimatedCircularProgress>
              </View>
              <View>
                <Text style={styles.circleTitle}>출석</Text>
                <AnimatedCircularProgress
                  size={80}
                  width={5}
                  fill={item.attendance.now / item.attendance.max * 100}
                  duration={index ? (0) : (1000)}
                  tintColor={tintColorSet(item.attendance.max, item.attendance.now)}
                  backgroundColor={Global.Colors.gray} >
                  {
                    (fill) => (
                      <>
                        <Text style={styles.circleContents}>
                          {item.attendance.now}
                        </Text>
                        <Text style={styles.circleSubContents}>
                          /{item.attendance.max}
                        </Text>
                      </>
                    )
                  }
                </AnimatedCircularProgress>
              </View>
            </View>
            <TouchableOpacity style={styles.plusBox} activeOpacity={0.9} onPress={onOpen}>
              <Entypo name="plus" size={27} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View
      style={styles.container}
      pagingEnabled
    >
      <View style={{ height: 300 }}>
        <Carousel
          ref={carouselRef}
          sliderWidth={screenWidth}
          itemWidth={screenWidth}
          data={entries}
          renderItem={renderItem}
          onSnapToItem={(index) => {
            setActiveSlide(index);

            // navigation.dispatch(
            //   CommonActions.navigate({
            //     name: 'Weekly',
            //   })
            // );
          }}
        />
        <Pagination
          dotsLength={entries.length}
          activeDotIndex={activeSlide}
          containerStyle={{
            marginTop: -10,
          }}
          dotStyle={{
            width: 15,
            height: 15,
            borderRadius: 10,
            marginHorizontal: 5,
            backgroundColor: "rgba(0, 0, 0, 0.92)",
          }}
          tappableDots={true}
          carouselRef={carouselRef}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
      </View>
      <View style={styles.contents}>
        <View style={{ flex: 1 }}>
          <View style={styles.contentsTitleBox}>
            <Text style={styles.contentsTitle}>
              최근 공지사항
            </Text>
            <Text style={styles.contentBottomLine}></Text>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <View style={styles.contentsTitleBox}>
            <Text style={styles.contentsTitle}>
              최근 업로드된 강의
            </Text>
            <Text style={styles.contentBottomLine}></Text>
          </View>
        </View>
      </View>
      <SlackTabView ref={el => (modalizeRef.current = el)} index={activeSlide} entry={entries[activeSlide]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flex: 1,
  },
  taskContainer: {
    width: screenWidth - 60,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: "white",
    elevation: 5,
    padding: 10,
    position: "absolute",
    alignSelf: "center",

  },
  titleContainer: {
    flexDirection: "row",
  },
  titleBox: {
    flex: 1
  },
  itemtitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  circleTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  circleLearn: {
    fontSize: 23,
    fontWeight: "bold",
    textAlignVertical: "center",
    textAlign: "center",
    flex: 1
  },
  circleContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 10,

  },
  circleContents: {
    fontSize: 17,
    fontWeight: "bold"
  },
  circleSubContents: {
    color: "gray",
  },
  contents: {
    flex: 1,
    paddingHorizontal: 20
  },
  contentsTitleBox: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  contentsTitle: {
    fontSize: 17,
    fontWeight: "bold",
    borderBottomColor: Global.Colors.red1,
    borderBottomWidth: 3
  },
  contentBottomLine: {
    borderBottomWidth: 3,
    flex: 1,
    borderBottomColor: Global.Colors.gray2
  },
  plusBox: {
    position: "absolute",
    top: -5,
    right: -5,
    height: 40,
    width: 40,
    backgroundColor: Global.Colors.blue,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

});

export default CourseTracker;
