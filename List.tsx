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

import { Result, Name } from './User';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Detail from './Detail';
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
const _renderItem = (result: { item: Result, }, navigation: any) => {
    //const navigation = useNavigation(); // navigation hook
    console.log(navigation)
    return (<ListItem title={result.item.name.title + ' ' + result.item.name.first + ' ' + result.item.name.last}
        leftAvatar={{ source: { uri: result.item.picture.thumbnail } }}
        titleStyle={{ color: 'red' }}
        rightSubtitle={result.item.phone}
        rightSubtitleStyle={{ fontSize: 10 }}
        onPress={() => { navigation.navigate('Detail', { data: result.item }) }}
        bottomDivider
        chevron={{ color: 'white' }}


        subtitle={<View><Text>{result.item.location.city}</Text>
            <Text>{result.item.location.country}</Text>
        </View>}>


    </ListItem>
    )
};
const show = (data: Array<Result>, navigation: any) => {

    return (
        <>
            <StatusBar barStyle="dark-content" />
            <FlatList<Result> data={data}
                keyExtractor={(item) => item.login.uuid}
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



const List = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(Array<Result>());
    const loadData = async () => {
        let localData = [];
        for (var i: number = 0; localData.length < 10; i++) {
            const response = await axios.get('https://randomuser.me/api');
            localData.push(response.data.results[0])
        }
        setData(localData);
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

export default List;
