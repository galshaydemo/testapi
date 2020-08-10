import 'react-native-gesture-handler';
import * as React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import List from './List';
import Detail from './Detail';
const Stack = createStackNavigator();
const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="List"
          component={List}
          options={{ title: 'Randomize Me!' }}
        />
        <Stack.Screen name="Detail" component={Detail} options={Detail.navigationOptions} />
      </Stack.Navigator>
      {/* Rest of your app code */}
    </NavigationContainer>
  );
};

export default App;