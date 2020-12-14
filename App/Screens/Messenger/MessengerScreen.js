import * as React from "react";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
} from "react-native";
import { TouchableRipple, Badge } from "react-native-paper";
import { useSelector } from "react-redux";
import SendBird from "sendbird";
import { useNavigation } from "@react-navigation/native";
import Global from "../../Styles/GlobalStyles";
import { APP_ID } from "../../Config";

const MessengerScreen = () => {
  const userInfo = useSelector((state) => state.Auth);
  const sb = new SendBird({ appId: APP_ID });
  const [channels, setChannels] = React.useState([]);
  const navigation = useNavigation();

  var channelHandler = new sb.ChannelHandler();

  channelHandler.onMessageReceived = function (channel, message) {
    let c = channels;
    c = c.filter((item) => item.url !== channel.url);
    c.unshift(channel);
    setChannels(c);
  };
  channelHandler.onMessageUpdated = function (channel, message) {};
  channelHandler.onMentionReceived = function (channel, message) {};
  channelHandler.onChannelChanged = function (channel) {
    let c = channels;
    c = c.filter((item) => item.url !== channel.url);
    c.unshift(channel);
    setChannels(c);
  };
  channelHandler.onChannelDeleted = function (channelUrl, channelType) {};
  channelHandler.onChannelFrozen = function (channel) {};
  channelHandler.onChannelUnfrozen = function (channel) {};
  channelHandler.onMetaDataCreated = function (channel, metaData) {};
  channelHandler.onMetaDataUpdated = function (channel, metaData) {};
  channelHandler.onMetaDataDeleted = function (channel, metaDataKeys) {};
  channelHandler.onMetaCountersCreated = function (channel, metaCounter) {};
  channelHandler.onMetaCountersUpdated = function (channel, metaCounter) {};
  channelHandler.onMetaCountersDeleted = function (channel, metaCounterKeys) {};
  channelHandler.onChannelHidden = function (groupChannel) {};
  channelHandler.onUserReceivedInvitation = function (
    groupChannel,
    inviter,
    invitees
  ) {};
  channelHandler.onUserDeclinedInvitation = function (
    groupChannel,
    inviter,
    invitee
  ) {};
  channelHandler.onUserJoined = function (groupChannel, user) {
    let c = channels;
    c.unshift(groupChannel);
    setChannels(c);
  };
  channelHandler.onUserLeft = function (groupChannel, user) {};
  channelHandler.onDeliveryReceiptUpdated = function (groupChannel) {};
  channelHandler.onReadReceiptUpdated = function (groupChannel) {};
  channelHandler.onTypingStatusUpdated = function (groupChannel) {};
  channelHandler.onUserEntered = function (openChannel, user) {};
  channelHandler.onUserExited = function (openChannel, user) {};
  channelHandler.onUserMuted = function (channel, user) {};
  channelHandler.onUserUnmuted = function (channel, user) {};
  channelHandler.onUserBanned = function (channel, user) {};
  channelHandler.onUserUnbanned = function (channel, user) {};

  // Add this channel event handler to the `SendBird` instance.
  sb.addChannelHandler("UNIQUE_HANDLER_ID", channelHandler);

  React.useEffect(() => {
    const list = sb.GroupChannel.createMyGroupChannelListQuery();
    list.includeEmpty = true;
    list.order = "latest_last_message";
    list.limit = 20;

    if (list.hasNext) {
      list.next((GroupChannels, error) => {
        if (error) {
          return;
        }
        setChannels(GroupChannels);
      });
    }
  }, []);

  const getLastMsgDate = (value) => {
    const today = new Date();
    const timeValue = new Date(value);

    let hours = timeValue.getHours();
    let minutes = timeValue.getMinutes();
    minutes = minutes >= 10 ? minutes : "0" + minutes;
    var ampm = hours >= 12 ? "오후" : "오전";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    if (today.getDay() - timeValue.getDay() === 0) {
      return `${ampm} ${hours}:${minutes}`;
    }

    var year = timeValue.getFullYear(); //yyyy
    var month = 1 + timeValue.getMonth(); //M
    month = month >= 10 ? month : "0" + month; //month 두자리로 저장
    var day = timeValue.getDate(); //d
    day = day >= 10 ? day : "0" + day;

    return `${year}-${month}-${day}`;
  };

  const lastMessageType = (msg) => {
    if (msg.type) {
      if (msg.type.includes("image")) {
        return "사진";
      }
      if (msg.type.includes("application")) {
        return "문서";
      }
    } else {
      return msg.message;
    }
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableRipple
        onPress={() =>
          navigation.navigate("MessengerDetail", {
            url: item.url,
            title: item.name,
          })
        }
      >
        <View
          style={{
            flexDirection: "row",
            height: 60,
            alignItems: "center",
            paddingHorizontal: 20,
          }}
        >
          <View>
            <Image
              style={{ height: 40, width: 40 }}
              source={{ uri: item.coverUrl }}
            />
            {item.unreadMessageCount > 0 && (
              <Badge
                size={25}
                style={{
                  position: "absolute",
                  bottom: -10,
                  right: -10,
                  borderWidth: 2,
                  borderColor: "white",
                }}
              >
                {item.unreadMessageCount}
              </Badge>
            )}
          </View>

          <View
            style={{
              marginLeft: 20,
              borderBottomWidth: 1,
              borderBottomColor: "#F0F0F0",
              height: 60,
              flex: 1,
              justifyContent: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{ fontFamily: "Square", fontSize: 17 }}
                numberOfLines={1}
              >
                {item.name}
              </Text>
              <Text style={{ fontFamily: "Square", fontSize: 13 }}>
                {item.lastMessage && getLastMsgDate(item.lastMessage.createdAt)}
              </Text>
            </View>

            <Text
              style={{ fontFamily: "Square", color: "#A0A0A0" }}
              numberOfLines={2}
            >
              {item.lastMessage && lastMessageType(item.lastMessage)}
            </Text>
          </View>
        </View>
      </TouchableRipple>
    );
  };

  const MemoItem = React.memo(renderItem);

  const _renderItem = ({ item }) => <MemoItem item={item} />;

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
        메신저
      </Text>

      <FlatList
        contentContainerStyle={{
          paddingBottom: 60,
          paddingTop: 20,
        }}
        data={channels}
        renderItem={_renderItem}
        keyExtractor={(item, index) => `${index}`}
      />
    </View>
  );
};

export default MessengerScreen;
