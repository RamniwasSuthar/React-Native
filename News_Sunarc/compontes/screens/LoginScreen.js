import React, {Component} from 'react';
import {
    KeyboardAvoidingView,
    ScrollView,
    View,
    Image,
    StatusBar,
    TextInput,
    TouchableOpacity, ImageBackground,
    Text,AsyncStorage,
    StyleSheet,
    WebView,
    ActivityIndicator,TouchableHighlight,
} from 'react-native';
import {    Button } from 'native-base';
import  Colors from '../themes/Colors'
import  Style from '../themes/Style'
import Rect_Button from '../themes/widget/Rect_Button';
import RegularInput from '../themes/widget/RegularInput';
import MyStatusBar from '../themes/widget/MyStatusBar';




import {
    LoginManager, LoginButton, AccessToken, GraphRequest, GraphRequestManager,
    ShareDialog
} from 'react-native-fbsdk';
import {GoogleSignin, GoogleSigninButton, statusCodes} from 'react-native-google-signin';
import type {User} from 'react-native-google-signin';
import config from '../config';
import SessionManager from '../utils/SessionManager';
import Validation from '../utils/Validation';
import DailogHelper from '../utils/DailogHelper';
import AppGlogal from '../utils/AppGlogal';



export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.requestManager = new GraphRequestManager()
        this.state = {
            userInfo: null,
            error: null,
            email: '',
            emailError: '',
            password: '',
            passwordError: '',
            mobileNumber: '',
        };
    }

    onBackPress = () => {
        this.props.navigation.navigate('LoginScreen')
    };

    onHomePress = () => {

    };

    onshowMorePress = () => {

    };

    onSearchPress = () => {

    };

    login = () => {
        //this.props.navigation.navigate('BottomTabNavigator')

        if (Validation.isEmpty(this.state.email, "Please fill email") && Validation.isEmpty(this.state.password, "Please fill password")) {

            if (this.state.email==="sunarc" && this.state.password==="sun123ARC") {
                SessionManager.createLoginSesion("Login", "0", "Developer Account", "developer.account@gmail.com", "https://reactnativecode.com/wp-content/uploads/2018/01/2_img.png", "")

                this.props.navigation.navigate('BottomTabNavigator')

            }else {
                DailogHelper.showToast(AppGlogal.TOAST_WARNING, "Password is wrong !")
            }

        }

    };

    signUp = () => {
        this.props.navigation.navigate('SignUpNew')
    };

    async componentDidMount() {
        SessionManager.logout();
        this._configureGoogleSignIn();
    }

    _configureGoogleSignIn() {
        GoogleSignin.configure({
            webClientId: config.webClientId,
            offlineAccess: false,
        });
    }

    render() {
        return (

            <View style={{backgroundColor: Colors.white, flex: 1,}}>


                <StatusBar hidden={false}
                           backgroundColor={Colors.appTheme}
                           barStyle="light-content"/>
                <ImageBackground
                    source={require('../themes/image/bg.jpg')}
                    style={Style.backgroundImage}>


                    <ScrollView  keyboardShouldPersistTaps="handled" contentContainerStyle={{flexGrow: 1}}>
                        <KeyboardAvoidingView
                            behavior="padding"
                            style={{flex: 1, justifyContent: 'space-between',width:'100%'}}>

                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',width:'100%',paddingTop:40}}>

                                <View>
                                    <Image style={[Style.logoPostion,{tintColor:Colors.appLogo}]}
                                           source={require('../themes/image/logo_trans.png')}
                                           resizeMode="contain"/>
                                </View>

                                <View style={{ width: '100%',marginTop:40}}>

                                    <RegularInput
                                        placeholder="Email"
                                        onChangeText={value => this.setState({email:value.trim()})}
                                        source={require('../themes/image/icon_email.png')}
                                    />

                                    <RegularInput
                                        placeholder="Password"
                                        secureTextEntry={true}
                                        onChangeText={value => this.setState({password:value.trim()})}
                                        source={require('../themes/image/icon_password.png')}
                                    />


                                    <Rect_Button
                                        title="Log in"
                                        customClick={this.login.bind(this)}/>
                                </View>

                                <View style={{ paddingBottom: 20,width:'100%'}}>

                                    <View style={{marginLeft:'10%',marginRight:'10%',flex: 1, flexDirection: 'row',  marginTop: 10}}>

                                        <View style={{width: '50%'}}>


                                            <Button transparent
                                                    onPress={() => {
                                                        //alert("dhsfhgse");
                                                        this.signUp();
                                                    }}>
                                                <Text style={{
                                                    color: Colors.white, fontWeight: 'bold',
                                                    fontSize: 15,
                                                    fontFamily: 'Feather'
                                                }}>Create New Account</Text>
                                            </Button>



                                        </View>

                                        <View style={{width: '50%',alignItems: 'flex-end'}}>

                                            <Button transparent style={{alignSelf:'flex-end'}}>
                                                <Text style={{
                                                    color: Colors.white, fontWeight: 'bold',
                                                    fontSize: 15, textAlign: 'right',
                                                    fontFamily: 'Feather'
                                                }}>Forgot Password ?</Text>
                                            </Button>


                                        </View>

                                    </View>

                                    <Text style={{
                                        color: Colors.white,
                                        fontSize: 13, marginTop: 20, alignSelf: 'center', fontFamily: 'Feather'
                                    }}>OR</Text>

                                    <View style={{flex: 1, flexDirection: 'row', alignSelf: 'center', marginTop: 15}}>




                                        <TouchableHighlight underlayColor={Colors.appTheme} style={{marginRight:20}} onPress={() => {

                                            LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
                                                function (result) {
                                                    if (result.isCancelled) {
                                                        console.log('LoginScreen cancelled')
                                                    } else {

                                                        AccessToken.getCurrentAccessToken().then(
                                                            (data) => {

                                                                // Create a graph request asking for user information
                                                                console.log("accessTokenSource : " + data.accessToken)
                                                                facebookAccessToken = data.accessToken;


                                                                const responseInfoCallback = (error, result) => {


                                                                    if (error) {
                                                                        alert('Error fetching data: ' + error.toString());
                                                                    } else {
                                                                        console.log(JSON.stringify(result))

                                                                        SessionManager.createLoginSesion("FACEBOOBK", result.id, result.name, result.email, result.picture.data.url, facebookAccessToken)

                                                                        this.props.navigation.navigate('BottomTabNavigator')

                                                                    }
                                                                }


                                                                const infoRequest = new GraphRequest('/me', {
                                                                    accessToken: data.accessToken,
                                                                    parameters: {
                                                                        fields: {
                                                                            string: 'email,name,first_name,middle_name,last_name,picture.type(large),gender',
                                                                        }
                                                                    }
                                                                }, responseInfoCallback);

                                                                new GraphRequestManager().addRequest(infoRequest).start();

                                                            }
                                                        )

                                                    }
                                                }.bind(this),
                                                function (error) {
                                                    console.log('LoginScreen fail with error: ' + error)
                                                }
                                            )


                                        }}>
                                            <Image style={{width: 60, height: 60}}
                                                   source={require('../themes/image/icon_facebook.png')}/>
                                        </TouchableHighlight>



                                        <TouchableHighlight underlayColor={Colors.appTheme} style={{marginLeft:20}} onPress={this._signIn}>
                                            <Image style={{width: 60, height: 60}}
                                                   source={require('../themes/image/icon_google.png')}/>
                                        </TouchableHighlight>



                                    </View>


                                </View>

                            </View>


                        </KeyboardAvoidingView>
                    </ScrollView>


                </ImageBackground>


            </View>



        );
    }




    //Create response callback for Google.
    _signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            this.setState({userInfo, error: null});

            console.log(" Success : " + JSON.stringify(userInfo))
            this._showGetingAllInfo("Google", userInfo.user.id, userInfo.user.name, userInfo.user.email, userInfo.user.photo, userInfo.accessToken);

        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // sign in was cancelled
                alert('cancelled');
                console.log("cancelled")
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation in progress already
                alert('in progress');
                console.log("in progress")
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                alert('play services not available or outdated');
                console.log("play services not available or outdated")
            } else {
                alert('Something went wrong', error.toString());
                console.log('Something went wrong', error.toString())
                this.setState({
                    error,
                });
            }
        }
    };




    //Showing all facebook and google data in alert
    _showGetingAllInfo(_loginType, _id, _name, _email, _image, _token) {

        console.log("_loginType : " + _loginType)
        console.log("_id : " + _id)
        console.log("_name : " + _name)
        console.log("_email : " + _email)
        console.log("_image : " + _image)
        console.log("_token : " + _token)

        SessionManager.createLoginSesion(_loginType, _id, _name, _email, _image, _token)

        this.props.navigation.navigate('BottomTabNavigator')
        /* alert('You are login with : ' + _loginType + "\n" +
         'Result id: ' + _id + "\n" +
         'Result name: ' + _name + "\n" +
         'Result email: ' + _email + "\n" +
         'Result email: ' + _image + "\n \n \n" +
         'Result Token: ' + _token + "\n");*/
    }


}

