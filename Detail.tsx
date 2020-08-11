import React, { Component, useEffect } from 'react';
import 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native';
import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native';
import { Result, Name } from './User';
import { NavigationScreenProp, NavigationState, NavigationRoute } from 'react-navigation';

export interface Props {
    navigation: NavigationScreenProp<Navigation>;
    route: NavigationRoute,
    data: Result,
    title: string;

}
interface NavigationParams {
    data: Result;
    title: string;
}

type Navigation = NavigationScreenProp<NavigationState, NavigationParams>;

interface State {
    loading: boolean;
    data: Array<Result>
}
export interface logoProps {
    name: string;

}
const logo = (name: string) => {

    return (<View style={{ flexDirection: 'row' }}>
        <Text style={styles.titleConst}>Randomize Me!</Text>
        <Text style={{}}>{name}</Text>

    </View>)
}

const Detail = ({ navigation }) => {
    const route = useRoute();
    const user: Result = route.params.data;

    useEffect(() => {
        // Update the document title using the browser API
        navigation.setOptions({ title: logo(user.name.first + ' ' + user.name.last) });
    });

    return (
        <View style={styles.container}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image style={styles.logo} source={{ uri: user.picture.large }}
                ></Image>
            </View>
            <View style={styles.line}>
                <Text style={styles.text}>{user.name.first + ' ' + user.name.last}</Text>

            </View>
            <View style={styles.line}>
                <Text style={styles.text}>{user.location.street.number + ' ' + user.location.street.name}</Text>
                <Text style={styles.text}>{user.location.city + ' ' + user.location.country}</Text>

            </View>
            <View style={styles.line}>
                <Text style={styles.text}>{user.email}</Text>


            </View>
            <View style={styles.line}>
                <Text style={styles.text}>{user.cell}</Text>


            </View>
        </View>
    )

}
const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
    },

    logo: {
        width: 128,
        height: 128,
    },
    text:
    {
        fontSize: 18,
        fontWeight: '500',
    },
    titleConst:
    {
        color: 'blue',
        paddingHorizontal: 10,
    },
    line:
    {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    }
});

export default Detail