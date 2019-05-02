import {View, StatusBar, Platform, StyleSheet, Image, TouchableOpacity, Text} from 'react-native';
import React, {Component} from 'react';
import {
    Container, Header, Content, Form, Item, Input, Label, Title,
    Left,
    Right,
    Body,
} from 'native-base';

import  Colors from '../Colors'


const MyStatusBar = props => (
    <View >


        <Header hidden={false}
                style={{backgroundColor: Colors.appTheme}}
                androidStatusBarColor={Colors.appTheme}
                iosBarStyle='dark-content'>


            <View style={{flex: 1, flexDirection: 'row'}}>

                {props.showBackButton ?
                    <View style={{width: '20%', height: 50, justifyContent: 'center',}}>

                        <TouchableOpacity
                            hide={true}
                            onPress={props.onBackPress}>
                            <Image style={{width: 30, height: 30, tintColor: Colors.white}}
                                   source={require('../image/icon_back.png')}/>
                        </TouchableOpacity>


                    </View>
                    : null}


                {props.showHomeButton ?
                    <View style={{width: '20%', height: 50, justifyContent: 'center',}}>

                        <TouchableOpacity
                            hide={true}
                            onPress={props.customClick}>
                            <Image style={{width: 30, height: 30, tintColor: Colors.white}}
                                   source={require('../image/logo_trans.png')}/>
                        </TouchableOpacity>


                    </View>
                    : null}


                <View style={{
                    width: '60%', height: 50, justifyContent: 'center',
                    alignItems: 'center',
                }}>

                    <Title style={{
                        color: Colors.white, fontFamily: 'Roboto',
                        fontWeight: 'bold'
                    }}>
                        {props.title.toUpperCase()}
                    </Title>
                </View>




            </View>


        </Header>

        {/*<StatusBar translucent backgroundColor={Colors.statusBar} {...props} />*/}
    </View>
);

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    statusBar: {
        height: STATUSBAR_HEIGHT,
    },
    appBar: {
        backgroundColor: '#79B45D',
        height: APPBAR_HEIGHT,
    },
    content: {
        flex: 1,
        backgroundColor: '#33373B',
    },
});

export default MyStatusBar;