/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component, useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import { ListItem } from 'react-native-elements';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    StatusBar,
    FlatList,
    ActivityIndicator,
    TouchableOpacity,
    ListRenderItem,
} from 'react-native';
import axios from 'axios';

import { Pill } from './Pill';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useNavigation } from '@react-navigation/native';
const FlatListItemSeparator = () => {
    return (
        <View
            style={{
                height: 1,
                width: "100%",
                backgroundColor: "#000",
            }}
        />
    );
}
const _renderItem = (result: { item: Pill, }, navigation: any) => {
    //const navigation = useNavigation(); // navigation hook
    console.log(navigation)
    return (<ListItem title={result.item.name}
        leftAvatar={{ source: { uri: 'http://10.0.2.2/images/' + result.item.pic } }}
        titleStyle={{ color: 'red' }}
        rightSubtitleStyle={{ fontSize: 10 }}
        rightSubtitle={result.item.pic}
        bottomDivider
        chevron={{ color: 'white' }}


        subtitle={<View><Text>{result.item.description}</Text>

        </View>}>


    </ListItem>
    )
};
const show = (data: Array<Pill>, navigation: any) => {
    console.log(data)
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <FlatList<Pill> data={data}
                keyExtractor={(item) => item.id.toString()}
                ItemSeparatorComponent={FlatListItemSeparator}
                renderItem={(item) => _renderItem(item, navigation)}
            >

            </FlatList>
            <SafeAreaView></SafeAreaView>
        </>

    );
}
const waiting = () => {
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator size="large" color="#00ff00" />
            </View>
            <SafeAreaView></SafeAreaView>
        </>);
}



const PillList = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(Array<Pill>());
    const loadData = async () => {
        let localData = [];
        const response = await axios.get('http://10.0.2.2:3000/pills');
        setData(response.data);
        setLoading(false)
    }

    useEffect(() => {
        console.log('load data' + loading)
        //if ( data.length )
        if (loading) loadData();
    }, [loading]);


    //return <View><Text>List</Text></View>
    return (loading ? waiting() : show(data, navigation))




}

//setData(_data);
//this.setState({ data: this._data, loading: false })















const styles = StyleSheet.create({
    text:
    {
        paddingRight: 4,
    },
    scrollView: {
        backgroundColor: Colors.lighter,
    },
    engine: {
        position: 'absolute',
        right: 0,
    },
    body: {
        backgroundColor: Colors.white,
    },



    container: {
        flex: 1,
        justifyContent: "center"
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    }

});

export default PillList;
