import React from 'react';
import {Button, View, Text} from 'react-native';
import {createStackNavigator, createAppContainer, createBottomTabNavigator} from 'react-navigation'; // Version can be specified in package.json
import {Icon,Root} from 'native-base'; // 6.2.2

import HomeScreen from "./screens/HomeScreen";
import NewsDetail from "./screens/NewsDetail";
import Splash from "./screens/Splash";
import Login from "./screens/Login";
import SearchQuery from "./screens/SearchQuery";
import ProfleScreen from "./screens/ProfleScreen";
import FacebookSharing from "./screens/FacebookSharing";
import GoogleSigninSampleApp from "./screens/GoogleSigninSampleApp";
import Colors from "../compontes/thems/Colors";


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
    let IconComponent = Icon;
    let iconName;

    if (routeName === 'HomeScreen') {
        //iconName = `wine${focused ? '' : '-outline'}`;
        iconName ='home';
       // IconComponent = HomeIconWithBadge;

    } else if (routeName === 'ProfleScreen') {

        iconName ='person';
       // IconComponent = HomeIconWithBadge;
    }

    return <IconComponent name={iconName} size={10} color={tintColor}/>;
};




const BottomTabNavigator = createBottomTabNavigator({
        HomeScreen: {screen: HomeScreen},
        ProfleScreen: {screen: ProfleScreen},
    }, {
        defaultNavigationOptions: ({navigation}) => ({
            tabBarIcon: ({focused, tintColor}) =>
                getTabBarIcon(navigation, focused, tintColor),
        }), tabBarOptions: {
            swipeEnabled: true,
            animationEnabled: true,
            tabBarPosition: 'top',
            showLabel: true, // hide labels
            activeTintColor: Colors.white,
            inactiveTintColor: Colors.black,
            activeborderTop: Colors.appTheme,
            inactiveborderTop: Colors.offwhite,
            activeBackgroundColor: Colors.appTheme,
            inactiveBackgroundColor: Colors.offwhite,
            pressColor: Colors.offwhite,


        style: {
                height: 55,
                paddingVertical: 1,
                backgroundColor: Colors.offwhite,
                borderTopColor: Colors.appTheme,
                borderTopWidth: 0.3,
            },
            labelStyle: {
                fontSize: 14,
                lineHeight:15,
                fontFamily: "CircularStd-Book"
            },
            indicatorStyle: {
                borderTopColor: '#D3D3D3',
                borderTopWidth: 3,
                // borderBottomColor:"#fafffb",
                //borderBottomWidth: 17,
            }
        },
    }, {
        lazy: false
    },
);

const RootStack = createStackNavigator({
        BottomTabNavigator: {
            screen: BottomTabNavigator,
            navigationOptions: {
                header: null

            },

        },

        Login: {
            screen: Login,
            navigationOptions: {
                header: null

            },

        },

        FacebookSharing: {
            screen: FacebookSharing,
            navigationOptions: {
                header: null

            },

        },

        GoogleSigninSampleApp: {
            screen: GoogleSigninSampleApp,
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
        ProfleScreen: {
            screen: ProfleScreen,
            navigationOptions: {
                header: null
            }
        },}, {
        initialRouteName: 'Splash',
    }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
    render() {
        return <Root><AppContainer /></Root>;
    }
}
