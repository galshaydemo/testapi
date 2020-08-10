import React, { Component } from 'react';
import 'react-native-gesture-handler';

import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native';
import { Result } from './User';
import { NavigationScreenProp, NavigationState, NavigationRoute } from 'react-navigation';

export interface Props {
    navigation: NavigationScreenProp<Navigation>;
    route: NavigationRoute,
    data: Result

}
interface NavigationParams {
    data: Result;
}

type Navigation = NavigationScreenProp<NavigationState, NavigationParams>;

interface State {
    loading: boolean;
    data: Array<Result>
}
class Detail extends Component<Props, State> {
    componentDidMount() {

        const user: Result = this.props.route.params.data;

        this.props.navigation.setOptions({ title: 'Randomize me! ' + user.name.first + ' ' + user.name.last })
    }

    render() {

        console.log('detail2')
        const user: Result = this.props.route.params.data;

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
    line:
    {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    }
});
export default Detail