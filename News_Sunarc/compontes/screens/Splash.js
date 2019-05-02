import React, {Component} from 'react';
import {Container, Header, Left, Body, Right, Button, Icon, Title, Item, Input, Content, Text} from 'native-base';
import Colors from "../themes/Colors";
import SessionManager from '../utils/SessionManager';
import {
    StyleSheet,
    WebView,
    ActivityIndicator,
    AsyncStorage,
    View,
    Image,
    ImageBackground,
    StatusBar
} from 'react-native';


export default class Splash extends Component {

    componentDidMount() {
        AsyncStorage.getItem(SessionManager.IsLogin).then((value) => {
            value ?
                setTimeout(
                    () => {
                        {
                            {
                                this.props.navigation.navigate('BottomTabNavigator')
                            }
                        }
                    }, 3 * 1000
                )
            :
            setTimeout(
                () => {
                    {
                        {
                            this.props.navigation.navigate('LoginScreen')
                        }
                    }
                }, 3 * 1000
            );
        });


    }

    render() {
        return (

            <View style={styles.container}>
                <StatusBar hidden={false}
                           backgroundColor={Colors.appTheme}
                           barStyle="light-content"/>
                <ImageBackground
                    source={require('../themes/image/bg.jpg')}
                    style={styles.backgroundImage}>


                    <View>

                        <View style={{width: '100%', height: '50%', justifyContent: 'flex-end'}}>


                            <Image style={{width: 120, height: 120, position: "absolute",}}
                                   source={require('../themes/image/logo_trans.png')}/>


                        </View>

                        <View style={{width: '100%', height: '50%', justifyContent: 'flex-end', paddingBottom: 50}}>

                            <Text
                                style={{
                                    fontSize: 40, color: Colors.white,
                                    fontWeight: 'bold',
                                    textShadowColor: Colors.white,
                                    marginRight: 10
                                }}>
                                HN PRO
                            </Text>

                        </View>

                    </View>


                </ImageBackground>


            </View>


        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        width: undefined,
        height: undefined,
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'cover', // or 'stretch','cover',contain
    },
});
