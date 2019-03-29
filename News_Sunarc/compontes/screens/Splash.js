import React, {Component} from 'react';
import {Container, Header, Left, Body, Right, Button, Icon, Title, Item, Input, Content, Text} from 'native-base';
import Colors from "../thems/Colors";
import Style from "../thems/Style";
import {StyleSheet, WebView, ActivityIndicator, View, Image, ImageBackground, StatusBar} from 'react-native';


export default class Splash extends Component {

    componentDidMount() {
        setTimeout(
            () => {
                {{this.props.navigation.navigate('Login')}}
            }, 4 * 1000
        );
    }

    render() {
        return (

            <View style={styles.container}>
                <StatusBar hidden={false}
                           backgroundColor={Colors.appTheme}
                           barStyle="light-content"/>
                <ImageBackground
                    source={require('../thems/image/bg.jpg')}
                    style={styles.backgroundImage}>


                    <Image style={{width: 100, height: 100}}
                           source={require('../thems/image/logo_trans.png')}/>
                    <Text
                        style={{
                            fontSize: 50, color: Colors.white,
                            fontWeight: 'bold',
                            alignSelf: 'center',
                            textShadowColor: Colors.white,
                            marginTop: 20,

                            marginRight: 10
                        }}>
                        Hacker News
                    </Text>





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
