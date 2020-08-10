/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import 'react-native-gesture-handler';

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

export interface Props {
    navigation: any;
    //nav:Nav

}

interface State {
    loading: boolean;
    data: Array<Result>
}
class List extends Component<Props, State> {
    _data = Array<Result>();
    constructor(props: any) {
        super(props);
        this.state = {
            data: [],
            loading: true
        }
    }
    async oneCall(i: number) {
        try {

            await axios.get('https://randomuser.me/api')
                .then((response) => {
                    this._data.push(response.data.results[0])
                    //this.setState({ data: this.state.data })
                    //console.log(myData.length)
                }, (error) => {
                    console.log("error " + error);
                });


            //Assign the promise unresolved first then get the data using the json method. 

            //this.setState({pokeList: pokemon, loading: false});
        } catch (err) {
            console.log("Error fetching data-----------", err);
        }

    }
    async componentDidMount() {
        var myData = new Array();
        for (let i: number = 0; this._data.length < 10; i++) {
            await this.oneCall(i);

        }
        this.setState({ data: this._data, loading: false })
    }
    FlatListItemSeparator = () => {
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
    render() {
        if (this.state.loading) {
            return (
                <>
                    <StatusBar barStyle="dark-content" />
                    <View style={[styles.container, styles.horizontal]}>
                        <ActivityIndicator size="large" color="#00ff00" />
                    </View>
                    <SafeAreaView></SafeAreaView>
                </>);
        }
        return (
            <>
                <StatusBar barStyle="dark-content" />
                <FlatList<Result> data={this.state.data}
                    keyExtractor={(item) => item.login.uuid}
                    ItemSeparatorComponent={this.FlatListItemSeparator}
                    renderItem={({ item }) =>
                        <TouchableOpacity onPress={() => {
                            this.props.navigation.navigate('Detail', { data: item, title: item.name.first + ' ' + item.name.last });

                            //console.log('Tap me' + this.props.navigation);
                        }}>
                            <View style={{ flexDirection: 'row', height: 30, marginVertical: 5, paddingLeft: 10, backgroundColor: '#E0E0E0' }} >
                                <Text style={styles.text}>{item.name.title}</Text>
                                <Text style={styles.text}>{item.name.first}</Text>
                                <Text style={styles.text}>{item.name.last}</Text>
                            </View></TouchableOpacity>}
                >

                </FlatList>
                <SafeAreaView></SafeAreaView>
            </>

        );
    }


};

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
