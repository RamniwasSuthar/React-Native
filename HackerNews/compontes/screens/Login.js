import React, {Component} from 'react';
import {Container, Header, Left, Body, Right, Button, Icon, Title, Item, Input, Content, Text} from 'native-base';
import Colors from "../thems/Colors";
import Style from "../thems/Style";
import {StyleSheet, WebView, ActivityIndicator, View, Image, ImageBackground, StatusBar} from 'react-native';


export default class Login extends Component {


    render() {
        return (

            <View style={styles.container}>
                <StatusBar hidden
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
                        Login
                    </Text>

                    <Item>
                        <Icon active name='home' />
                        <Input placeholder='Icon Textbox'/>
                    </Item>

                    <Item>
                        <Icon active name='home' />
                        <Input placeholder='Icon Textbox'/>
                    </Item>

                    <Button block success  style={{marginRight: 10, marginLeft: 10}}>
                        <Text>Login</Text>
                    </Button>

                </ImageBackground>


            </View>


        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inputButton: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        width: undefined,
        height: undefined,
        paddingTop: 100,
        alignItems: 'center',
        resizeMode: 'cover', // or 'stretch','cover',contain
    },
});
