import React, {Component} from 'react';
import {
    Container, Header, Left, Body, Right, Button, Icon, Title, Item, Input, Content, Text, Card,
    CardItem, Thumbnail, Radio, List, ListItem,
} from 'native-base';
import {
    StyleSheet, KeyboardAvoidingView, ScrollView, WebView, ActivityIndicator, View, Image, ImageBackground, StatusBar,
    TouchableOpacity, Alert, BackHandler, FlatList, TouchableHighlight, AsyncStorage
} from 'react-native';
import Colors from "../themes/Colors";
import SessionManager from '../utils/SessionManager';


export default class ProfleScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            UserName: '',
            FirstName: '',
            LastName: '',
            Email: '',
            ProfileImage: '',
            DateofBirth: '06-09-1992',
            Gender: 'Male',
            LastLoginTime: '',
        }

    }

    render() {
        return (

            <Container>
                <StatusBar hidden={false}
                           backgroundColor={Colors.appTheme}
                           barStyle="light-content"/>

                <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{flexGrow: 1}}>
                    <KeyboardAvoidingView
                        behavior="padding"
                        style={{flex: 1, justifyContent: 'space-between'}}>

                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: Colors.white
                        }}>


                            <Image style={{width: '100%', height: 260, marginRight: 1, opacity: 0.5}}
                                   source={require('../themes/image/header_bg.jpg')}/>


                            <View style={{marginTop: -180}}>

                                <Text numberOfLines={1} style={{
                                    fontFamily: 'Cochin',
                                    color: Colors.white,
                                    fontSize: 28,
                                    fontWeight: 'bold',
                                    marginTop: 15,
                                    alignSelf: 'center'
                                }}>{this.state.FirstName + " " + this.state.LastName}</Text>


                                <Text numberOfLines={1} style={{
                                    fontFamily: 'Cochin',
                                    marginLeft: 5,
                                    color: Colors.white,
                                    fontSize: 18, marginTop: 10,
                                    alignSelf: 'center'
                                }}>Android</Text>

                                <Image
                                    source={{uri: this.state.ProfileImage ? this.state.ProfileImage : 'https://reactnativecode.com/wp-content/uploads/2018/01/2_img.png'}}
                                    style={{
                                        marginTop: 20,
                                        width: 160,
                                        height: 160,
                                        borderRadius: 160 / 2,
                                        alignSelf: 'center',
                                        borderWidth: 5,
                                        borderColor: Colors.white
                                    }}/>


                            </View>

                            <View style={{flexDirection: 'row', alignSelf: 'center', marginTop: 10}}>

                                <View style={{width: 120}}>

                                    <Text uppercase numberOfLines={1} style={{
                                        fontFamily: 'Cochin',
                                        color: Colors.black,
                                        fontSize: 16,
                                        fontWeight: 'bold',
                                        alignSelf: 'center'
                                    }}>Like</Text>


                                    <Text numberOfLines={1} style={{
                                        fontFamily: 'Cochin',
                                        color: Colors.black,
                                        fontSize: 16, marginTop: 1,
                                        alignSelf: 'center'
                                    }}>92</Text>


                                </View>

                                <View style={{width: 120}}>

                                    <Text uppercase numberOfLines={1} style={{
                                        fontFamily: 'Cochin',
                                        color: Colors.black,
                                        fontSize: 16,
                                        fontWeight: 'bold',
                                        alignSelf: 'center'
                                    }}>Share</Text>


                                    <Text numberOfLines={1} style={{
                                        fontFamily: 'Cochin',
                                        color: Colors.black,
                                        fontSize: 16, marginTop: 1,
                                        alignSelf: 'center'
                                    }}>36</Text>


                                </View>

                                <View style={{width: 120}}>

                                    <Text uppercase numberOfLines={1} style={{
                                        fontFamily: 'Cochin',
                                        color: Colors.black,
                                        fontSize: 16,
                                        fontWeight: 'bold',
                                        alignSelf: 'center'
                                    }}>Last Login</Text>


                                    <Text numberOfLines={1} style={{
                                        fontFamily: 'Cochin',
                                        color: Colors.black,
                                        fontSize: 16, marginTop: 1,
                                        alignSelf: 'center'
                                    }}>23-09-2015</Text>


                                </View>

                            </View>

                            <Button
                                onPress={() => {

                                    this.props.navigation.navigate('HomeScreen')
                                }}


                                style={{marginLeft: '15%', marginRight: '15%', marginTop: 20}} block success>
                                <Text uppercase={true}>Go to News</Text>
                            </Button>

                            <View style={{
                                width: '100%',
                                height: 0.7,
                                backgroundColor: Colors.gray,
                                marginTop: 30
                            }}/>

                            <View style={{flexDirection: 'row', marginTop: 20, width: '100%', paddingLeft: '10%'}}>

                                <Image style={{width: 25, height: 25, tintColor: Colors.appTheme}}
                                       source={require('../themes/image/icon_user.png')}/>

                                <Text numberOfLines={1} style={{
                                    fontFamily: 'Cochin',
                                    marginLeft: 10,
                                    width: '60%',
                                    color: Colors.black,
                                    fontSize: 18
                                }}>{this.state.FirstName + " " + this.state.LastName}</Text>


                            </View>

                            <View style={{
                                flexDirection: 'row',
                                marginTop: 5,
                                width: '100%',
                                marginBottom: 20,
                                paddingLeft: '10%'
                            }}>

                                <Image style={{width: 25, height: 25, tintColor: Colors.appTheme}}
                                       source={require('../themes/image/icon_email.png')}/>

                                <Text numberOfLines={1} style={{
                                    fontFamily: 'Cochin',
                                    marginLeft: 10,
                                    width: '60%',
                                    color: Colors.black,
                                    fontSize: 18
                                }}>{this.state.Email}</Text>


                            </View>


                        </View>


                    </KeyboardAvoidingView>
                </ScrollView>


            </Container>
        );
    }

    componentDidMount() {


        SessionManager.getUserName().then((value) => {

            var words = value.split(' ');


            console.log(words.length)
            console.log(words[0])
            console.log(words[1])
            console.log(value)

            if (words.length > 1) {
                this.setState({
                    UserName: value,
                    FirstName: words[0],
                    LastName: words[1]
                })

            } else {
                this.setState({
                    UserName: value,
                    FirstName: words[0],
                    LastName: ''
                })
            }
            console.log(firstname)
            console.log(lastnamename)
            console.log(value)


        });
        SessionManager.getEmail().then((value) => this.setState({Email: value}));
        SessionManager.getLastLoginTime().then((value) => this.setState({LastLoginTime: value}));
        SessionManager.getProfileImage().then((value) => this.setState({ProfileImage: value}));
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        console.log('Start');

    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton = () => {
        this.props.navigation.navigate('HomeScreen')
        return true;
    }

}

