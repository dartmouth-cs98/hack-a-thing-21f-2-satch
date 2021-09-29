import React, { useState, useEffect } from 'react';
import {
  View, TouchableOpacity, Text, StyleSheet,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { stat } from 'react-native-fs';
import axios from 'axios';
import BackgroundUpload from 'react-native-background-upload';

GoogleSignin.configure({
  webClientId: '933953379260-pc6gj1t37vpe7prk6pgeavo6d2duntqb.apps.googleusercontent.com',
  scopes: ['https://www.googleapis.com/auth/youtube.upload'],
});

const Upload = (props) => {
  const [initializing, setInitializing] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState();
  const [progress, setProgress] = useState(0);

  function onAuthStateChanged(newUser) {
    setUser(newUser);
    console.log(newUser);
    if (initializing) setInitializing(false);
  }

  async function onGoogleButtonPress() {
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential);
  }

  async function signInOnStart() {
    await GoogleSignin.signInSilently();
  }

  // eslint-disable-next-line consistent-return
  async function retrieveVideo() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === 'granted') {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: false,
        quality: 1,
      });
      if (!result.cancelled) {
        return result;
      }
    }
  }

  async function upload() {
    const video = await retrieveVideo();
    console.log(video?.uri);
    if (video) {
      const { accessToken } = await GoogleSignin.getTokens();
      const { size } = await stat(video.uri);
      console.log('access Token ', accessToken);

      const uploadData = await axios({
        method: 'POST',
        url: 'https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status,contentDetails',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'content-type': 'application/json; charset=UTF-8',
          'x-upload-content-type': 'video/*',
          'x-upload-content-length': size,
        },
        data: {
          snippet: {
            title: 'RN Video Upload',
            categoryId: 24,
          },
          status: {
            privacyStatus: 'private',
          },
        },
      });

      console.log(uploadData);

      const uploadUrl = uploadData?.headers?.location;
      const uploadOptions = {
        url: uploadUrl,
        path: video.uri,
        method: 'PUT',
        type: 'raw',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'content-type': 'video/*',
          'content-length': size,
        },
      };

      BackgroundUpload.startUpload(uploadOptions).then((uploadId) => {
        BackgroundUpload.addListener('progress', uploadId, (data) => {
          console.log(data.progress);
          setProgress(data.progress);

          if (progress === 100) {
            setProgress(0);
          }
        });
        BackgroundUpload.addListener('error', uploadId, (data) => {
          console.log(`Error: ${data.error}`);
        });
      }).catch((err) => {
        console.log(err);
      });
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    signInOnStart();
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  const signInButton = (onPress) => {
    return (
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={{ color: 'white' }}>Sign in with Google</Text>
      </TouchableOpacity>
    );
  };

  const uploadButton = (onPress) => {
    return (
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={{ color: 'white' }}>Upload Video</Text>
      </TouchableOpacity>
    );
  };

  const progressBar = () => {
    return (
      <>
        <View style={styles.progressBar}>
          <View style={[styles.progress, { width: `${progress}%` }]} />
        </View>
        <Text style={{ marginTop: 20 }}>{`${Math.floor(progress)}%`}</Text>
      </>
    );
  };

  return (
    <View style={styles.background}>
      {progress > 0 && progressBar()}
      {progress === 0 && (user ? uploadButton(upload) : signInButton(onGoogleButtonPress))}
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    flex: -1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#f4511e',
    borderRadius: 5,
  },
});

export default Upload;
