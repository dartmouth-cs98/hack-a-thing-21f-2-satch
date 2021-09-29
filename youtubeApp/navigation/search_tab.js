/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// import { Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import VideoList from '../components/video_list';
import VideoDetail from '../components/video_detail';
import Upload from '../components/upload';
import UploadHeader from '../components/header';

const Stack = createStackNavigator();

const SearchUploadNavigator = () => {
  return (
    <Stack.Navigator mode="modal" initialRouteName="SearchScreen">
      <Stack.Screen name="SearchScreen"
        component={VideoList}
        options={{
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitle: (props) => <UploadHeader {...props} title="YouTube Search" />,
        }}
      />
      <Stack.Screen name="Upload"
        component={Upload}
        options={{
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitle: (props) => <UploadHeader {...props} title="Upload a Video" />,
        }}
      />
    </Stack.Navigator>
  );
};

const SearchTab = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Search"
        component={SearchUploadNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Detail" component={VideoDetail} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default SearchTab;
