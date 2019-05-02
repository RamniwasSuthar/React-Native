import React from 'react';
import {Button, View, Text, Image,Alert} from 'react-native';
import {createStackNavigator, createAppContainer, createBottomTabNavigator} from 'react-navigation'; // Version can be specified in package.json
import {Icon, Root} from 'native-base'; // 6.2.2
import  Colors from '../compontes/themes/Colors'
import SessionManager from '../compontes/utils/SessionManager'
import HomeScreen from "./screens/HomeScreen";
import NewsDetail from "./screens/NewsReadMore";
import Splash from "./screens/Splash";
import SearchQuery from "./screens/ApplyFilterScreen";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import ProfleScreen from "./screens/ProfleScreen";
import NewsDetailScreen from "./screens/NewsDetailScreen";
import ContactUsScreen from "./screens/ContactUsScreen";
const tabIconSize = 30;

class IconWithBadge extends React.Component {
    render() {
        const {name, badgeCount, color, size} = this.props;
        return (
            <View style={{width: 24, height: 24, margin: 5}}>
                <Icon name={name} size={size} color={color}/>
                {badgeCount > 0 && (
                    <View
                        style={{
                            position: 'absolute',
                            right: -6,
                            top: -3,
                            backgroundColor: Colors.green,

                            borderRadius: 6,
                            width: 15,
                            height: 15,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Text style={{color: 'white', fontSize: 12, fontWeight: 'bold'}}>
                            {badgeCount}
                        </Text>
                    </View>
                )}
            </View>
        );
    }
}

const HomeIconWithBadge = props => {
    return <IconWithBadge {...props} badgeCount={3}/>;
};

const getTabBarIcon = (navigation, focused, tintColor) => {
    const {routeName} = navigation.state;
    switch (routeName) {
        case 'Home':
            return (<Image source={require('./themes/image/menu_home.png')}
                           style={{
                               height: tabIconSize,
                               width: tabIconSize,
                               tintColor: focused ? Colors.red : Colors.appTheme
                           }}/>)


        case 'Profle':
            return (<Image source={require('./themes/image/menu_profile.png')}
                           style={{
                               height: tabIconSize,
                               width: tabIconSize,
                               tintColor: focused ? Colors.red : Colors.appTheme
                           }}/>)

        case 'ContactUS':
            return (<Image source={require('./themes/image/menu_contact_us.png')}
                           style={{
                               height: tabIconSize,
                               width: tabIconSize,
                               tintColor: focused ? Colors.red : Colors.appTheme
                           }}/>)
        case 'Logout':
            return (<Image source={require('./themes/image/menu_logout.png')}
                           style={{
                               height: tabIconSize,
                               width: tabIconSize,
                               tintColor: focused ? Colors.red : Colors.appTheme
                           }}/>)


    }

};


const HomeTab = createStackNavigator({

    HomeScreen: {
        screen: HomeScreen,
        navigationOptions: {
            header: null

        },

    },

    NewsDetailScreen: {
        screen: NewsDetailScreen,
        navigationOptions: {
            header: null

        },

    },
}, {
    initialRouteName: 'HomeScreen',
});


const BottomTabNavigator = createBottomTabNavigator({
        Home: {screen: HomeTab},
        Profle: {screen: ProfleScreen},
        ContactUS: {screen: ContactUsScreen},
        // Logout: {screen: LoginScreen},

        Logout: {
            screen: HomeTab     // Empty screen, useless in this specific case
            , navigationOptions: ({navigation}) => ({
                tabBarOnPress: (scene, jumpToIndex) => {
                    return Alert.alert(   // Shows up the alert without redirecting anywhere
                        'Confirmation required'
                        , 'Do you really want to logout?'
                        , [
                            {
                                text: 'Accept', onPress: () => {
                                SessionManager.logout();
                                navigation.navigate('LoginScreen')

                               // navigation.dispatch(NavigationActions.navigate({routeName: 'LoginScreen'}))
                            }
                            },
                            {text: 'Cancel'}
                        ]
                    );
                },
            })
        },

    }, {
        defaultNavigationOptions: ({navigation}) => ({
            tabBarIcon: ({focused, tintColor}) =>
                getTabBarIcon(navigation, focused, tintColor),
        }), tabBarOptions: {
            swipeEnabled: true,
            animationEnabled: true,
            tabBarPosition: 'bottom',
            showLabel: false,
            activeTintColor: Colors.red,
            inactiveTintColor: Colors.appTheme,
            activeborderTop: Colors.appTheme,
            inactiveborderTop: Colors.offwhite,
            pressColor: Colors.offwhite,
            rippleColor: Colors.red,
            overflow: 'hidden',

            style: {
                height: 56,
                elevation: 50,
                left: 0,
                bottom: 0,
                right: 0,
                paddingVertical: 1,
                backgroundColor: Colors.Lightgray,
                borderTopColor: Colors.appTheme,
                borderTopWidth: 0.3,
            },
            labelStyle: {
                fontSize: 14,
                lineHeight: 15,
                fontFamily: "CircularStd-Book"
            },
            indicatorStyle: {
                borderTopColor: '#D3D3D3',
                borderTopWidth: 3,
                // borderBottomColor:"#fafffb",
                //borderBottomWidth: 17,
            }
        },
    },
);

const RootStack = createStackNavigator({
        BottomTabNavigator: {
            screen: BottomTabNavigator,
            navigationOptions: {
                header: null

            },

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
        NewsDetail: {
            screen: NewsDetail,
            navigationOptions: {
                header: null
            }
        },
        SearchQuery: {
            screen: SearchQuery,
            navigationOptions: {
                header: null
            }
        },


        LoginScreen: {
            screen: LoginScreen,
            navigationOptions: {
                header: null
            }
        },

        SignUpNew: {
            screen: SignUpScreen,
            navigationOptions: {
                header: null
            }
        },
        ProfleScreenNew: {
            screen: ProfleScreen,
            navigationOptions: {
                header: null
            }
        },

        NewsDetailNew: {
            screen: NewsDetailScreen,
            navigationOptions: {
                header: null
            }
        },


    }, {
        initialRouteName: 'Splash',
        // initialRouteName: 'BottomTabNavigator',
    }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
    render() {
        return <Root><AppContainer /></Root>;
    }
}
