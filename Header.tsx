import React, { Component } from 'react';
import {
  Text,
  View,

} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
const Header = () => {
  return (
    <View style={{ backgroundColor: '#ff0000', alignItems: 'center', height: 50, justifyContent: 'center', width: '100%', borderWidth: 1 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>Randomize me!</Text>
    </View>
  )
}
export default Header;