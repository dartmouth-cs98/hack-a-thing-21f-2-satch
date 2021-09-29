import React from 'react';
// eslint-disable-next-line no-unused-vars
import { Text, View } from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/FontAwesome';
import About from '../components/about';
import SearchTab from './search_tab';

const Tab = createBottomTabNavigator();

const MainTabBar = () => {
  return (
    <NavigationContainer theme={DarkTheme}>
      <Tab.Navigator
        initialRouteName="Search"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            let iconName;

            // Customize the icon we display based on the tab route
            if (route.name === 'About') {
              iconName = 'info-circle';
            // eslint-disable-next-line brace-style
            }
            // Adding the search icon
            else if (route.name === 'Search') {
              iconName = 'search';
            }

            // Return the respective icon
            return <Ionicons name={iconName} size={26} color={focused ? '#58AADA' : 'grey'} />;
          },
        })}
      >
        <Tab.Screen name="Search" component={SearchTab} options={{ headerShown: false }} />
        <Tab.Screen name="About" component={About} options={{ headerShown: false }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MainTabBar;
