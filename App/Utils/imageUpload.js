import React, { Component } from "react";
import {
  ActivityIndicator,
  Button,
  Clipboard,
  Image,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

export default class CommunityScreen extends Component {
  state = {
    image: null,
    uploading: false,
  };

  render() {
    let { image } = this.state;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="default" />

        <Text style={styles.exampleText}>
          Example: Upload ImagePicker result
        </Text>

        <Button
          onPress={this._pickImage}
          title="Pick an image from camera roll"
        />

        <Button onPress={this._takePhoto} title="Take a photo" />

        {this._maybeRenderImage()}
        {this._maybeRenderUploadingOverlay()}
      </View>
    );
  }

  _maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
      return (
        <View style={[StyleSheet.absoluteFill, styles.maybeRenderUploading]}>
          <ActivityIndicator color="#fff" size="large" />
        </View>
      );
    }
  };

  _maybeRenderImage = () => {
    let { image } = this.state;

    if (!image) {
      return;
    }

    return (
      <View style={styles.maybeRenderContainer}>
        <View style={styles.maybeRenderImageContainer}>
          <Image source={{ uri: image }} style={styles.maybeRenderImage} />
        </View>

        <Text
          onPress={this._copyToClipboard}
          onLongPress={this._share}
          style={styles.maybeRenderImageText}
        >
          {image}
        </Text>
      </View>
    );
  };

  _share = () => {
    Share.share({
      message: this.state.image,
      title: "Check out this photo",
      url: this.state.image,
    });
  };

  _copyToClipboard = () => {
    Clipboard.setString(this.state.image);
    alert("Copied image URL to clipboard");
  };

  _takePhoto = async () => {
    const { status: cameraPerm } = await Permissions.askAsync(
      Permissions.CAMERA
    );

    const { status: cameraRollPerm } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );

    // only if user allows permission to camera AND camera roll
    if (cameraPerm === "granted" && cameraRollPerm === "granted") {
      let pickerResult = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });

      this._handleImagePicked(pickerResult);
    }
  };

  _pickImage = async () => {
    const { status: cameraRollPerm } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );

    // only if user allows permission to camera roll
    if (cameraRollPerm === "granted") {
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });

      this._handleImagePicked(pickerResult);
    }
  };

  _handleImagePicked = async (pickerResult) => {
    let uploadResponse, uploadResult;

    try {
      this.setState({
        uploading: true,
      });

      if (!pickerResult.cancelled) {
        uploadResponse = await uploadImageAsync(pickerResult.uri);
        uploadResult = await uploadResponse.json();
        console.log(uploadResult);

        this.setState({
          image: uploadResult.location,
        });
      }
    } catch (e) {
      console.log({ uploadResponse });
      console.log({ uploadResult });
      console.log({ e });
      alert("Upload failed, sorry :(");
    } finally {
      this.setState({
        uploading: false,
      });
    }
  };
}

async function uploadImageAsync(uri) {
  let apiUrl =
    "http://freeimage.host/api/1/upload/?key=6d207e02198a847aa98d0a2a901485a5&source=http://somewebsite/someimage.jpg&format=json";

  // Note:
  // Uncomment this if you want to experiment with local server
  //
  // if (Constants.isDevice) {
  //   apiUrl = `https://your-ngrok-subdomain.ngrok.io/upload`;
  // } else {
  //   apiUrl = `http://localhost:3000/upload`
  // }

  let uriParts = uri.split(".");
  let fileType = uriParts[uriParts.length - 1];

  let formData = new FormData();
  formData.append("photo", {
    uri,
    name: `photo.${fileType}`,
    type: `image/${fileType}`,
  });

  let options = {
    method: "POST",
    body: formData,
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
  };

  return fetch(apiUrl, options);
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  exampleText: {
    fontSize: 20,
    marginBottom: 20,
    marginHorizontal: 15,
    textAlign: "center",
  },
  maybeRenderUploading: {
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
  },
  maybeRenderContainer: {
    borderRadius: 3,
    elevation: 2,
    marginTop: 30,
    shadowColor: "rgba(0,0,0,1)",
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 4,
      width: 4,
    },
    shadowRadius: 5,
    width: 250,
  },
  maybeRenderImageContainer: {
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    overflow: "hidden",
  },
  maybeRenderImage: {
    height: 250,
    width: 250,
  },
  maybeRenderImageText: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});
