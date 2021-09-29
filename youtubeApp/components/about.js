import React, { Component } from 'react';
import {
  StyleSheet, View, Text, Image,
} from 'react-native';

class About extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{ uri: 'https://facebook.github.io/react/logo-og.png' }}
        />
        <Text>
          This app was written in React-Native.
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'grey',
  },
  image: {
    width: 200,
    height: 150,
  },
});

export default About;
