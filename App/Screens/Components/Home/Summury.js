import * as React from "react";
import { View, Dimensions, StyleSheet, ImageBackground } from "react-native";
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

const { width: screenWidth } = Dimensions.get("window");
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
      <View style={styles.item}>
        <ParallaxImage
          source={uri[index]}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.5}
          blurRadius={1}
          {...parallaxProps}
        />
        <View
          style={{
            position: "absolute",
            backgroundColor: "rgba(0,0,0,.5)",
            top: 0,
            left: 0,
            width: itemScale.width,
            height: 200,
          }}
        >
          <View style={{ flex: 1, width: itemScale.width - 100 }}>
            <View>
              <View
                style={{
                  width: itemScale.width,
                  alignItems: "flex-end",
                  padding: 10,
                }}
              >
                <TouchableRipple
                  onPress={() => console.log("Pressed")}
                  rippleColor="rgba(255, 255, 255, .8)"
                  style={{
                    height: 30,
                    width: 30,
                    borderRadius: 25,
                  }}
                  borderless={true}
                >
                  <MaterialCommunityIcons
                    name="dots-vertical"
                    size={30}
                    color="white"
                  />
                </TouchableRipple>
              </View>
              <View
                style={{
                  padding: 10,
                  borderRightColor: Global.Colors.course[index],
                  borderBottomColor: Global.Colors.course[index],
                  borderTopColor: Global.Colors.course[index],
                  borderTopWidth: 3,
                  borderBottomWidth: 3,
                  borderRightWidth: 3,
                }}
              >
                <Headline style={{ color: "white", fontFamily: "Godo" }}>
                  {item.title}
                </Headline>
                <Text style={{ color: "white", fontFamily: "Godo" }}>
                  {item.instructor}
                </Text>
              </View>
            </View>
            <View></View>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "flex-end",
              marginBottom: 7,
            }}
          >
            <TouchableRipple
              onPress={() => console.log("Pressed")}
              rippleColor="rgba(255, 255, 255, .8)"
              style={{
                height: 50,
                width: 50,
                borderRadius: 25,
              }}
              borderless={true}
            >
              <View
                style={{
                  alignItems: "center",
                }}
              >
                <Foundation name="play-video" size={24} color="white" />
                <Text style={{ color: "white", fontFamily: "Godo" }}>강의</Text>
              </View>
            </TouchableRipple>
            <TouchableRipple
              onPress={() => console.log("Pressed")}
              rippleColor="rgba(255, 255, 255, .8)"
              style={{
                height: 50,
                width: 50,
                borderRadius: 25,
              }}
              borderless={true}
            >
              <View style={{ alignItems: "center" }}>
                <AntDesign name="notification" size={24} color="white" />
                <Text style={{ color: "white", fontFamily: "Godo" }}>공지</Text>
              </View>
            </TouchableRipple>
            <TouchableRipple
              onPress={() => console.log("Pressed")}
              rippleColor="rgba(255, 255, 255, .8)"
              style={{
                height: 50,
                width: 50,
                borderRadius: 25,
              }}
              borderless={true}
            >
              <View style={{ alignItems: "center" }}>
                <MaterialCommunityIcons
                  name="progress-check"
                  size={24}
                  color="white"
                />
                <Text style={{ color: "white", fontFamily: "Godo" }}>출석</Text>
              </View>
            </TouchableRipple>
            <TouchableRipple
              onPress={() => console.log("Pressed")}
              rippleColor="rgba(255, 255, 255, .8)"
              style={{
                height: 50,
                width: 50,
                borderRadius: 25,
              }}
              borderless={true}
            >
              <View style={{ alignItems: "center" }}>
                <MaterialCommunityIcons
                  name="alpha-a-box-outline"
                  size={24}
                  color="white"
                />
                <Text style={{ color: "white", fontFamily: "Godo" }}>점수</Text>
              </View>
            </TouchableRipple>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, width: screenWidth }}>
      <View
        style={{
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
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginVertical: 10,
            paddingHorizontal: 20,
          }}
        >
          <Headline style={{ fontFamily: "Godo" }}>Task Tracker</Headline>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
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
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View>
              <Text
                style={{
                  fontFamily: "Godo",
                  fontSize: 15,
                  paddingHorizontal: 20,
                }}
              >
                수강중인 강의
              </Text>
            </View>

            <Pagination
              dotsLength={entries.length}
              activeDotIndex={index}
              containerStyle={{
                flex: 1,
                paddingVertical: 10,
                paddingHorizontal: 0,
              }}
              dotStyle={{
                width: 15,
                height: 15,
                borderRadius: 7,
                marginHorizontal: 3,
                backgroundColor: Global.Colors.sjgray,
              }}
              inactiveDotStyle={{}}
              inactiveDotOpacity={0.7}
              inactiveDotScale={0.7}
              tappableDots={true}
              carouselRef={carouselRef}
            />
          </View>

          <ImageBackground
            source={require("../../../Assets/image/pattern.png")}
            style={{ height: 200, backgroundColor: Global.Colors.sjsilver }}
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
            />
          </ImageBackground>

          <Text>dasdasdas</Text>
        </View>
      </View>
    </View>
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
});

export default Summuey;
