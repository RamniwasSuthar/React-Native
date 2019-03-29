import React from 'react';
import { Button, View, Text } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation'; // Version can be specified in package.json

import Home from "./screens/Home";
import NewsDetail from "./screens/NewsDetail";
import Splash from "./screens/Splash";
import Login from "./screens/Login";
import SearchQuery from "./screens/SearchQuery";


const RootStack = createStackNavigator(
    {
        Login: {
            screen:Login,
            navigationOptions: {
                header: null

            },

        },
        Splash: {
            screen:Splash,
            navigationOptions: {
                header: null
            }
        },
        Home: {
            screen:Home,
            navigationOptions: {
                header: null
            }
        },
        NewsDetail: {
            screen:NewsDetail,
            navigationOptions: {
                header: null
            }
        },
        SearchQuery: {
            screen:SearchQuery,
            navigationOptions: {
                header: null
            }
        },


       // NewsDetail: NewsDetail,

    },

    {
        initialRouteName: 'Splash',
    }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
    render() {
        return <AppContainer />;
    }
}
