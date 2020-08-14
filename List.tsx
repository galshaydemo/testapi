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
} from 'react-native';
import axios from 'axios';

import { Result } from './User';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Detail from './Detail';
import { useNavigation } from '@react-navigation/native';

export interface Props {
    navigation: any;
    //nav:Nav

}

interface State {
    loading: boolean;
    data: Array<Result>
}
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

const show = (data: Array<Result>) => {
    const navigation = useNavigation();
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <FlatList<Result> data={data}
                keyExtractor={(item) => item.login.uuid}
                ItemSeparatorComponent={FlatListItemSeparator}
                renderItem={({ item }) =>
                    <TouchableOpacity onPress={() => {

                        navigation.navigate('Detail',
                            { data: item, title: item.name.first + ' ' + item.name.last });


                    }}>


                        <View style={{ flexDirection: 'row', height: 30, marginVertical: 5, paddingLeft: 10, backgroundColor: '#E0E0E0' }} >
                            <Text style={styles.text}>{item.name.title}</Text>
                            <Text style={styles.text}>{item.name.first}</Text>
                            <Text style={styles.text}>{item.name.last}</Text>
                        </View>
                    </TouchableOpacity>}
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
const oneCall = async (): Promise<Result | undefined> => {
    let p = undefined;
    await axios.get('https://randomuser.me/api')
        .then((response) => {
            console.log(response.data.results[0])
            p = response.data.results[0] as Result;

        }, (error) => {
            console.log("error " + error);
            return undefined
        });

    return p

}



const List = () => {

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
        loadData();
    }, [loading]);


    //return <View><Text>List</Text></View>
    return (loading ? waiting() : show(data))




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
