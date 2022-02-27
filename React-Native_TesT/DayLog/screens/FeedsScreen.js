import React, {useContext} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import LogContext from '../contexts/LogContext';

function FeedsScreen() {
  const value = useContext(LogContext);

  return (
    <View style={styles.block}>
      <Text>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    borderWidth: 2,
    padding: 16,
    borderBottomColor: 'black',
    marginBottom: 16,
  },
});

export default FeedsScreen;
