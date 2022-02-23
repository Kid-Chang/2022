import React from 'react';
import {SafeAreaView, View, Text} from 'react-native';
import Box from './components/Box';
import Greeting from './components/Greeting';

const App = () => {
  return (
    <SafeAreaView>
      <Box size={'large'} color="yellow" />
      <Box size={'medium'} />
      <Box size={'small'} />
    </SafeAreaView>
  );
};

export default App;
