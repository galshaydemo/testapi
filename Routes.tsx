import React, { PureComponent } from 'react'
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import About from './About';
import List from './List';
import Detail from './Detail';
import PillList from './Pills/List';
interface RoutesProps {

}
const Stack = createStackNavigator();
export const Routes: React.FC<RoutesProps> = ({ }) => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Pills">
                <Stack.Screen name="about" component={About}></Stack.Screen>
                <Stack.Screen name="list" component={List}></Stack.Screen>
                <Stack.Screen name="Detail" component={Detail}></Stack.Screen>
                <Stack.Screen name="Pills" component={PillList}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    )
}