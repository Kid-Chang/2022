import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Greeting = ({name}) => {
  return (
    <View>
      <Text>HELLO {name} </Text>
    </View>
  );
};

Greeting.defaultProps = {
  name: 'asf',
};

export default Greeting;

const styles = StyleSheet.create({});
