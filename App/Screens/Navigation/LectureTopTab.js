import React, { useState, useRef, forwardRef, memo, useEffect } from 'react';
import {
    TouchableOpacity,
    Animated,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Dimensions,
    Image,
    Platform,
} from 'react-native';
import { Modalize } from 'react-native-modalize';
import { TabView, SceneMap } from 'react-native-tab-view';
import faker from 'faker';
import Global from "../Styles/GlobalStyles"

import { useCombinedRefs } from '../../Utils/use-combined-refs';

const { width } = Dimensions.get('window');
const isAndroid = Platform.OS === 'android';
const HEADER_COLLAPSE = 32;
const HEADER_LIST = 60;
const HEADER_HEIGHT = HEADER_LIST + HEADER_COLLAPSE;

const ROUTES = [
    { key: 'first', title: '강의정보' },
    { key: 'second', title: '메뉴' },
];

const Item = memo(({ active, title, onPress }) => (
    <TouchableOpacity style={s.item} onPress={onPress} activeOpacity={0.75}>
        <Text style={s.item_title}>{title}</Text>
        {active && <View style={s.item__line} />}
    </TouchableOpacity>
));

const Row = memo(() => (
    <View style={s.row}>
        <Image style={s.row__avatar} source={{ uri: faker.image.avatar() }} />

        <View style={s.row__info}>
            <Text style={s.row__name}>{faker.name.firstName()}</Text>
            <Text style={s.row__position}>{faker.name.jobTitle()}</Text>
        </View>
    </View>
));

const Route = ({ route }) => {
    return (
        <View style={s.route}>
            {Array(20)
                .fill(0)
                .map((_, index) => (
                    <Row key={index} />
                ))}
        </View>
    );
};

const Tabs = memo(({ active, onIndexChange }) => {
    const renderScene = SceneMap({
        first: Route,
        second: Route,
    });

    return (
        <TabView
            navigationState={{ index: active, routes: ROUTES }}
            renderTabBar={() => null}
            renderScene={renderScene}
            onIndexChange={onIndexChange}
            initialLayout={{ width }}
            sceneContainerStyle={{ top: HEADER_HEIGHT }}
        />
    );
});

export const SlackTabView = forwardRef((props, ref) => {
    const modalizeRef = useRef(null);
    const contentRef = useRef(null);
    const combinedRef = useCombinedRefs(ref, modalizeRef);
    const [index, setIndex] = useState(0);
    const scrollY = useRef(new Animated.Value(0)).current;
    const [entry, setEntry] = useState([]);
    const [idx, setIdx] = useState(0);

    useEffect(() => {
        setEntry(props.entry);
        setIdx(props.index)
    }, [props])

    const handleIndexChange = i => {
        const w = 55; // item width
        const m = 25; // item margin
        const x = (w + m) * i;

        setIndex(i);

        if (contentRef.current) {
            contentRef.current.scrollTo({ y: 0, animated: true });
        }
    };

    const renderTabBar = (
        <View style={s.tabbar}>
            <Animated.View
                style={[
                    s.tabbar__wrapper,
                    {
                        transform: [
                            {
                                translateY: scrollY.interpolate({
                                    inputRange: [0, 100],
                                    outputRange: [0, -HEADER_COLLAPSE],
                                    extrapolate: 'clamp',
                                }),
                            },
                        ],
                    },
                ]}
            >
                <View style={[s.tabbar__heading, { backgroundColor: Global.Colors.course[idx] }]}>
                    <Text style={s.tabbar__headingText}>{entry && entry.title}</Text>
                </View>

                <View
                    style={s.tabbar__list}
                >
                    {ROUTES.map(({ title }, i) => (
                        <Item
                            key={i}
                            active={index === i}
                            title={title}
                            onPress={() => handleIndexChange(i)}
                        />
                    ))}
                </View>
            </Animated.View>
        </View>
    );

    return (
        <Modalize
            ref={combinedRef}
            contentRef={contentRef}
            HeaderComponent={renderTabBar}
            modalStyle={{ backgroundColor: 'gray' }}
            handleStyle={{ width: 35, backgroundColor: '#75777a' }}
            childrenStyle={{ borderTopLeftRadius: 12, borderTopRightRadius: 12, overflow: 'hidden' }}
            scrollViewProps={{
                onScroll: Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
                    useNativeDriver: true,
                }),
                scrollEventThrottle: 16,
            }}
        >
            <Tabs active={index} onIndexChange={handleIndexChange} />
        </Modalize>
    );
});

const s = StyleSheet.create({
    tabbar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9000,

        height: HEADER_HEIGHT,

        overflow: 'hidden',

        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },

    tabbar__wrapper: {
        position: 'absolute',

        width: '100%',
        height: '100%',
    },

    tabbar__heading: {
        height: HEADER_COLLAPSE,
        justifyContent: "center"
    },

    tabbar__headingText: {
        marginLeft: 20,

        fontSize: 15,
        letterSpacing: 0.25,
        fontWeight: "bold",

        color: 'white',
    },

    tabbar__list: {
        height: HEADER_LIST,
        flexDirection: "row",
        flex: 1,
        borderBottomColor: '#d1d2d2',
        borderBottomWidth: 1,

        backgroundColor: '#1a1d21',
    },

    tabbar__listContent: {
        flexDirection: 'row',
        alignItems: 'center',

        paddingLeft: 20,
    },

    item: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: "white"
    },
    item_title: {
        fontSize: 18,
        fontWeight: "bold",
    },
    item__line: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: -1,

        height: 3,

        backgroundColor: '#1d9bd0',
    },

    route: {
        flex: 1,

        paddingTop: 12,
        paddingBottom: isAndroid ? 100 : 40,

        backgroundColor: 'white',
    },

    row: {
        flexDirection: 'row',

        paddingHorizontal: 20,
        paddingVertical: 12,
    },

    row__avatar: {
        width: 36,
        height: 36,

        borderRadius: 8,
        backgroundColor: '#3b4149',
    },

    row__info: {
        marginLeft: 20,
    },

    row__name: {
        marginBottom: 2,

        fontSize: 16,
        fontWeight: '500',

        color: '#d1d2d2',
    },

    row__position: {
        fontSize: 14,

        color: '#9a9c9d',
    },
});