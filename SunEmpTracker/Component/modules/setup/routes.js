import React, {Component} from 'react';
import {
    createStackNavigator,
    createDrawerNavigator,
    createMaterialTopTabNavigator,
    createAppContainer
} from 'react-navigation';
import {DrawerActions} from 'react-navigation';
import {Icon} from 'native-base';
import {AppRegistry, View, Text, StyleSheet, Platform, TouchableOpacity, Image, StatusBar} from 'react-native';

import Home from '../screens/Home/index';
import About from '../screens/About/index';
import Contact from '../screens/Contact/index';
import DrawerScreen from '../screens/Common/DrawerScreen';
import Splash from '../screens/Splash';
import HomeScreen from '../screens/HomeScreen';
import SavePreferences from '../screens/SavePreferences';
import TimoutScreen from '../screens/TimoutScreen';
import HomeSearch from '../screens/Dictionary/HomeSearch';
import ListWords from '../screens/Dictionary/ListWords';
import VoiceTest from '../screens/Dictionary/VoiceTest';
import Example from '../screens/Dictionary/Example';

const Tabs = createMaterialTopTabNavigator({
    Home: Home,
    About: About,
    Contact: Contact
}, {
    tabBarOptions: {
        activeTintColor: '#000',
        inactiveTintColor: 'gray',
        style: {
            backgroundColor: '#fff',
        },
        indicatorStyle: {
            backgroundColor: '#000',
        },
    }
});


const DrawerNavigator = createDrawerNavigator({
    Home: {
        screen: Tabs,
        defaultNavigationOptions: {
            headerTintColor: '#000',
            headerStyle: {
                backgroundColor: '#000',
            },
        },
        navigationOptions: {
            // tabBarLabel: 'Home!',
            header: null
        },
    }
}, {
    initialRouteName: 'Home',
    contentComponent: DrawerScreen,
    drawerWidth: 300,
    drawerBackgroundColor: '#ffffff'
});

const MenuImage = ({navigation}) => {
    if (!navigation.state.isDrawerOpen) {
        return<Icon name="menu" size={30}
                    style={{marginLeft:20}}
                    onPress={() => { navigation.dispatch(DrawerActions.openDrawer()); }} />
    } else {
        return<Icon name="close" size={30}
                    style={{marginLeft:20}}
                    onPress={() => { navigation.dispatch(DrawerActions.closeDrawer()); }} />
    }
}


const StackNavigator = createStackNavigator({

    //important: key and screen name (i.e. DrawerNavigator) should be same while using the drawer navigator inside stack navigator.

    DrawerNavigator: {
        screen: DrawerNavigator,
        navigationOptions: ({navigation}) => ({

            title: 'ReactNavigation',  // Title to appear in status bar
            headerLeft:
                <TouchableOpacity onPress={() => {
                navigation.dispatch(DrawerActions.toggleDrawer())} }>

                <MenuImage navigation={navigation}/>
            </TouchableOpacity>,
            headerStyle: {
                backgroundColor: '#8e2910',
            },

            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },

        })

    },
    Splash: {
        screen: Splash,
        navigationOptions: {
            header: null
        }
    },
    HomeScreen: {
        screen: HomeScreen,
        navigationOptions: {
            header: null
        }
    },
    SavePreferences: {
        screen: SavePreferences,
        navigationOptions: {
            header: null
        }
    },

    ListWords: {
        screen: ListWords,
        navigationOptions: {
            header: null
        }
    },

    HomeSearch: {
        screen: HomeSearch,
        navigationOptions: {
            header: null
        }
    },




    VoiceTest: {
        screen: VoiceTest,
        navigationOptions: {
            header: null
        }
    },
    Example: {
        screen: Example,
        navigationOptions: {
            header: null
        }
    },

    TimoutScreen: {
        screen: TimoutScreen,
        navigationOptions: {
            header: null
        }
    },
}, {
    initialRouteName: 'HomeSearch',
}, {
    navigationOptions: ({navigation}) => ({

        title: 'ReactNavigation',  // Title to appear in status bar
        headerLeft: <TouchableOpacity onPress={() => {
            navigation.dispatch(DrawerActions.toggleDrawer())
        } }>
            <MenuImage navigation={navigation}/>
        </TouchableOpacity>,
        headerStyle: {
            backgroundColor: '#8e2910',
        },

        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },

    })
});


const App = createAppContainer(StackNavigator);

export default App;