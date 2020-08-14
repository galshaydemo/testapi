import 'react-native-gesture-handler';
import * as React from 'react';
import { SafeAreaView, StyleSheet, View, Text, StatusBar } from "react-native"
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import List from './List';
import Detail from './Detail';
import About from './About';
import { Routes } from './Routes';

const App = () => {

  return <Routes />



};

export default App;