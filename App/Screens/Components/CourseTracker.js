import * as React from "react";
import {
  SafeAreaView,
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ImageBackground
} from "react-native";
import Carousel, {
  Pagination,
  ParallaxImage,
} from "react-native-snap-carousel";
import Global from "../Styles/GlobalStyles"
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { AntDesign } from '@expo/vector-icons';

const { width: screenWidth } = Dimensions.get("window");

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
    title: "알고리즘및실습 (001)",
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
    title: "알고리즘및실습 (001)",
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
    title: "알고리즘및실습 (001)",
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
    title: "알고리즘및실습 (001)",
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

const LectureCarousel = () => {
  const [entries, setEntries] = React.useState([]);
  const [activeSlide, setActiveSlide] = React.useState(0);
  const carouselRef = React.useRef(null);

  React.useEffect(() => {
    setEntries(ENTRIES1);
    setActiveSlide(0);
  }, []);

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


  const renderItem = ({ item, index }, parallaxProps) => {
    return (
      <View style={styles.item}>
        <View style={styles.titleContainer}>
          <View style={styles.titleBox}></View>
          <View>
            <Text style={styles.itemtitle}>{item.title}</Text>
            <Text>{item.instructor}</Text>
          </View>
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
              duration={1000}
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
              duration={1000}
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
        <View style={styles.contentsContainer}>
          <View style={styles.content}>
            <Text style={styles.contentTitle}>공지사항</Text>
            <Text numberOfLines={1}>{item.notice[0]}</Text>
            <Text numberOfLines={1}>{item.notice[1]}</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.contentTitle}>강의</Text>
            <Text numberOfLines={1}>{item.lecture[0]}</Text>
            <Text numberOfLines={1}>{item.lecture[1]}</Text>
          </View>
        </View>
        <View style={styles.plusBox}>
          <AntDesign name="arrowright" size={24} color="white" />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        sliderWidth={screenWidth}
        sliderHeight={200}
        itemWidth={screenWidth - 60}
        data={entries}
        renderItem={renderItem}
        hasParallaxImages={true}
        onSnapToItem={(index) => {
          setActiveSlide(index);
        }}
      />
      <Pagination
        dotsLength={ENTRIES1.length}
        activeDotIndex={activeSlide}
        containerStyle={{}}
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
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  item: {
    width: screenWidth - 60,
    height: 300,
    marginVertical: 10,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: "white",
    borderRadius: 10,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
  },
  titleContainer: {
    marginTop: 10,
    flexDirection: "row"
  },
  titleBox: {
    width: 5,
    backgroundColor: Global.Colors.red1,
    marginRight: 10,
  },
  itemtitle: {
    fontSize: 20,
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
  contentsContainer: {
    flex: 1,
    flexDirection: "row"
  },
  content: {
    flex: 1,
    paddingHorizontal: 10
  },
  contentTitle: {
    fontSize: 15,
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderBottomColor: Global.Colors.gray2,
    marginVertical: 2,
  },
  plusBox: {
    width: 40,
    height: 40,
    backgroundColor: Global.Colors.blue,
    position: "absolute",
    top: -5,
    right: -5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default LectureCarousel;
