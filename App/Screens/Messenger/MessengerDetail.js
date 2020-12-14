import * as React from "react";
import { Text, View, FlatList, TextInput, RefreshControl } from "react-native";
import { useRoute } from "@react-navigation/native";
import { IconButton } from "react-native-paper";
import SendBird from "sendbird";
import { APP_ID } from "../../Config";

import Global from "../../Styles/GlobalStyles";
let loading = true;
let query = null;

const MessengerDetail = () => {
  const sb = new SendBird({ appId: APP_ID });
  const [textHeight, setTextHeight] = React.useState(0);
  const [messages, setMessages] = React.useState([]);
  const route = useRoute();
  const [text, setText] = React.useState("");

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const loadPrevMessage = (init) => {
    if ((query === null && loading === true) || query.hasMore === false) {
      return;
    }
    loading = true;
    setTimeout(() => {
      loading = false;
    }, 1000);

    query.load(30, true, (message, error) => {
      if (error) {
        return;
      }

      if (init) {
        setMessages(message);
      } else {
        setMessages((prev) => [...prev, ...message]);
      }
    });
  };

  const sendMesssage = (msg) => {
    if (msg.length === 0) {
      return;
    }
    const params = new sb.UserMessageParams();
    params.message = msg;

    sb.GroupChannel.getChannel(
      route.params.url,
      function (groupChannel, error) {
        if (error) {
          return;
        }

        groupChannel.sendUserMessage(params, (message, error) => {
          if (error) {
            return;
          }
          setMessages((prev) => [message, ...prev]);
        })
      }
    );


    setText("");
    setTextHeight(0);
  }


  const tagInputEnterEventHandler = React.useCallback(e => {
    sendMesssage(e.nativeEvent.text);
  }, []);

  const getMsgDate = (value) => {
    const today = new Date();
    const timeValue = new Date(value);

    let hours = timeValue.getHours();
    let minutes = timeValue.getMinutes();
    minutes = minutes >= 10 ? minutes : "0" + minutes;
    var ampm = hours >= 12 ? '오후' : '오전';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    const betweenTime = Math.floor(
      (today.getTime() - timeValue.getTime()) / 1000 / 60
    );

    if (today.getDay() - timeValue.getDay() === 0) {
      return `${ampm} ${hours}:${minutes}`
    }

    var year = timeValue.getFullYear(); //yyyy
    var month = 1 + timeValue.getMonth(); //M
    month = month >= 10 ? month : "0" + month; //month 두자리로 저장
    var day = timeValue.getDate(); //d
    day = day >= 10 ? day : "0" + day;

    return `${year}-${month}-${day}`;
  };

  React.useEffect(() => {
    sb.GroupChannel.getChannel(
      route.params.url,
      function (groupChannel, error) {
        if (error) {
          return;
        }

        query = groupChannel.createPreviousMessageListQuery();
        loadPrevMessage(true);
        groupChannel.markAsRead();
      }
    );

    let channelHandler = new sb.ChannelHandler();

    channelHandler.onMessageReceived = function (channel, message) {
      setMessages((prev) => [message, ...prev]);
      channel.markAsRead();
    };
    channelHandler.onMessageUpdated = function (channel, message) {
    };
    channelHandler.onMessageDeleted = function (channel, messageId) { };
    channelHandler.onMentionReceived = function (channel, message) { };
    channelHandler.onChannelChanged = function (channel) { };
    channelHandler.onChannelDeleted = function (channelUrl, channelType) { };
    channelHandler.onChannelFrozen = function (channel) { };
    channelHandler.onChannelUnfrozen = function (channel) { };
    channelHandler.onMetaDataCreated = function (channel, metaData) { };
    channelHandler.onMetaDataUpdated = function (channel, metaData) { };
    channelHandler.onMetaDataDeleted = function (channel, metaDataKeys) { };
    channelHandler.onMetaCountersCreated = function (channel, metaCounter) { };
    channelHandler.onMetaCountersUpdated = function (channel, metaCounter) { };
    channelHandler.onMetaCountersDeleted = function (
      channel,
      metaCounterKeys
    ) { };
    channelHandler.onChannelHidden = function (groupChannel) { };
    channelHandler.onUserReceivedInvitation = function (
      groupChannel,
      inviter,
      invitees
    ) { };
    channelHandler.onUserDeclinedInvitation = function (
      groupChannel,
      inviter,
      invitee
    ) { };
    channelHandler.onUserJoined = function (groupChannel, user) { };
    channelHandler.onUserLeft = function (groupChannel, user) { };
    channelHandler.onDeliveryReceiptUpdated = function (groupChannel) { };
    channelHandler.onReadReceiptUpdated = function (groupChannel) { };
    channelHandler.onTypingStatusUpdated = function (groupChannel) { };
    channelHandler.onUserEntered = function (openChannel, user) { };
    channelHandler.onUserExited = function (openChannel, user) { };
    channelHandler.onUserMuted = function (channel, user) { };
    channelHandler.onUserUnmuted = function (channel, user) { };
    channelHandler.onUserBanned = function (channel, user) { };
    channelHandler.onUserUnbanned = function (channel, user) { };

    // Add this channel event handler to the `SendBird` instance.
    sb.addChannelHandler("CHANNEL_", channelHandler);
    return () => {
      sb.removeChannelHandler("CHANNEL_");
    };
  }, []);

  const renderItem = ({ item, index }) => {
    if (item.messageType === "admin") {
      return <View style={{ transform: [{ scaleY: -1 }], backgroundColor: Global.Colors.sjgray }}>
        <Text style={{ color: "white", marginHorizontal: 20, marginVertical: 7 }}>{item.message} {getMsgDate(item.createdAt)}</Text>

      </View>
    }

    if (sb.currentUser.userId === item._sender.userId) {
      return (
        <View style={{ transform: [{ scaleY: -1 }], marginVertical: 5, alignItems: "flex-end", paddingHorizontal: 20 }}>
          <View style={{
            flexDirection: "row-reverse",
            flex: 1,
            flexWrap: 'wrap'
          }}>
            <View style={{
              backgroundColor: "white",
              maxWidth: 200,
              borderRadius: 10,
              padding: 10,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.20,
              shadowRadius: 1.41,

              elevation: 2,

            }}>
              <Text>{item.message}</Text>
            </View>
            <View style={{ justifyContent: "flex-end", margin: 5 }}>
              <Text style={{ fontFamily: "Square", fontSize: 14, color: "gray" }}>{getMsgDate(item.createdAt)}</Text>
            </View>
          </View>

        </View>
      );
    }
    else {
      return (
        <View style={{ transform: [{ scaleY: -1 }], marginVertical: 5, alignItems: "flex-start", paddingHorizontal: 20 }}>
          <Text style={{ fontFamily: "Square", marginBottom: 5 }}>{item._sender.nickname}</Text>
          <View style={{
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap'
          }}>
            <View style={{
              backgroundColor: "white",
              maxWidth: 200,
              borderRadius: 10,
              padding: 10,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.20,
              shadowRadius: 1.41,

              elevation: 2,

            }}>
              <Text>{item.message}</Text>
            </View>
            <View style={{ justifyContent: "flex-end", margin: 5 }}>
              <Text style={{ fontFamily: "Square", fontSize: 14, color: "gray" }}>{getMsgDate(item.createdAt)}</Text>
            </View>
          </View>
        </View>
      );
    }

  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "#FAFAFA" }}>
        <FlatList
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${index}`}
          style={{ flex: 1, transform: [{ scaleY: -1 }] }}
          onEndReached={() => loadPrevMessage(false)}
          onEndReachedThreshold={0.01}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          padding: 5,
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <TextInput
          onSubmitEditing={tagInputEnterEventHandler}
          value={text}
          blurOnSubmit={true}
          onChangeText={setText}
          style={{ flex: 1, backgroundColor: "#F0F0F0", borderRadius: 15, marginLeft: 20, marginRight: 5, paddingHorizontal: 10, height: Math.max(30, textHeight) }}
          multiline={true}
          onContentSizeChange={e => {
            setTextHeight(e.nativeEvent.contentSize.height);
          }}
          numberOfLines={5}
          returnKeyType="send"
        />
        <IconButton
          icon="send"
          size={20}
          color={Global.Colors.sjred}
          onPress={() => sendMesssage(text)}
          disabled={text.length === 0}
        />
      </View>
    </View>
  );
};

export default MessengerDetail;
