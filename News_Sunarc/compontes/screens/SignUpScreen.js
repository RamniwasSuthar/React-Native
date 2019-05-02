import React, {Component} from 'react';
import {
    KeyboardAvoidingView,
    ScrollView,
    View,
    Image,
    StatusBar,
    TextInput,
    TouchableOpacity,
    Text,
} from 'react-native';
import {
    Icon, Button
} from 'native-base';
import  Colors from '../themes/Colors'
import  Style from '../themes/Style'
import Round_Button from '../themes/widget/Round_Button';
import FloatingInput from '../themes/widget/StackedLabel';
import MyStatusBar from '../themes/widget/MyStatusBar';

export default class SignUpScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fullname: '',
            email: '',
            mobileNumber: '',
            password: '',
        };
    }

    signUp = () => {
        // alert('You tapped the button!')
        this.props.navigation.navigate('LoginScreen')
    };

    onBackPress = () => {
        this.props.navigation.navigate('LoginScreen')
    };
    onHomePress = () => {

    };


    render() {
        return (

            <View style={{backgroundColor: Colors.offwhite, flex: 1}}>

                <MyStatusBar
                    showBackButton={true}
                    onBackPress={this.onBackPress.bind(this)}
                    showHomeButton={false}
                    onHomePress={this.onHomePress.bind(this)}
                    title='Sign In'
                />


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
                            <View style={{height: '20%', width: '100%', backgroundColor: Colors.Lightgray}}>

                                <View style={{flex: 1, flexDirection: 'row', alignSelf: 'center', marginTop: 30}}>
                                    <View style={{width: 45, height: 45, marginRight: 40}}>
                                        <Image style={{width: 45, height: 45}}
                                               source={require('../themes/image/icon_facebook.png')}/>
                                    </View>
                                    <View style={{width: 45, height: 45, marginLeft: 40}}>
                                        <Image style={{width: 45, height: 45}}
                                               source={require('../themes/image/icon_google.png')}/>
                                    </View>

                                </View>

                                <Text style={{
                                    color: Colors.gray,
                                    fontSize: 15,
                                    marginBottom: 20,
                                    marginTop: 10,
                                    alignSelf: 'center',
                                    fontFamily: 'Feather'
                                }}>
                                    Or Sign up Using
                                </Text>

                            </View>


                            <View style={{height: '65%', width: '100%', backgroundColor: Colors.white,paddingTop:'10%',paddingBottom:'8%'}}>

                                <FloatingInput
                                    placeholder="FullName"
                                    onChangeText={fullname => this.setState({fullname})}
                                    source={require('../themes/image/icon_fullname.png')}
                                    blurOnSubmit={ true }

                                    returnKeyType={ "next" }
                                />

                                <FloatingInput
                                    placeholder="Email"
                                    onChangeText={email => this.setState({email})}
                                    source={require('../themes/image/icon_email.png')}
                                    blurOnSubmit={ true }
                                    returnKeyType={ "next" }

                                />

                                <FloatingInput
                                    placeholder="Password"
                                    secureTextEntry={true}
                                    onChangeText={password => this.setState({password})}
                                    source={require('../themes/image/icon_password.png')}
                                    blurOnSubmit={ true }
                                    returnKeyType={ "next" }

                                />


                                <Round_Button
                                    title="Sign Up Now"
                                    customClick={
                                        this.signUp.bind(this)}/>


                            </View>


                            <View style={{height: '15%', width: '100%', backgroundColor: Colors.Lightgray}}>

                                <Text style={{
                                    color: Colors.gray,
                                    fontSize: 12, marginTop: 15, alignSelf: 'center', fontFamily: 'Feather'
                                }}>
                                    By creating anccouont, you agree to our
                                </Text>

                                <Text style={{
                                    color: Colors.appTheme,fontWeight:'bold',
                                    fontSize: 12, marginTop: 5, alignSelf: 'center', fontFamily: 'Feather'
                                }}>
                                    Terms of Service & Privacy Policy
                                </Text>


                            </View>


                        </View>


                    </KeyboardAvoidingView>
                </ScrollView>
            </View>



        );
    }

}

