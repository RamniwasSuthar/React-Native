import React, {Component} from 'react';
import {Container, Header, Left, Body, Right, Button, Icon, Title, Item, Input, Content, Text} from 'native-base';
import Colors from "../thems/Colors";
import Style from "../thems/Style";
import {
    AsyncStorage,
    StyleSheet,
    WebView,
    ActivityIndicator,
    View,
    Image,
    ImageBackground,
    StatusBar
} from 'react-native';
import {
    LoginManager, LoginButton, AccessToken, GraphRequest, GraphRequestManager,
    ShareDialog
} from 'react-native-fbsdk';
import {GoogleSignin, GoogleSigninButton, statusCodes} from 'react-native-google-signin';
import type {User} from 'react-native-google-signin';
import config from '../config';
import SessionManager from '../../compontes/utils/SessionManager';
import Validation from '../../compontes/utils/Validation';
import DailogHelper from '../../compontes/utils/DailogHelper';
import AppGlogal from '../../compontes/utils/AppGlogal';

/*onPress={Validation.validatePhoneNo.bind(this.state.phoneNumber)}

 onPress={Validation.validateEmail.bind(this.state.email)}*/

export default class Login extends Component {
    static facebookAccessToken="";
    constructor() {
        super();
        this.requestManager = new GraphRequestManager()
        this.state = {
            userInfo: null,
            error: null,

            email: '',
            emailError: '',
            password: '',
            passwordError: '',
        };
    }


    async componentDidMount() {
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
            <View style={styles.container}>
                <StatusBar
                    backgroundColor={Colors.appTheme}
                    barStyle="light-content"/>

                <ImageBackground
                    source={require('../thems/image/bg.jpg')}
                    style={styles.backgroundImage}>

                    <Image style={{width: 80, height: 80}}
                           source={require('../thems/image/logo_trans.png')}/>

                    <Text
                        style={{
                            fontSize: 40, color: Colors.white,
                            fontWeight: 'bold',
                            alignSelf: 'center',
                            textShadowColor: Colors.white,
                            marginTop: 20,
                            marginRight: 10
                        }}>
                        Login
                    </Text>

                    <Content style={Style.DefultContentPaddingColor}>
                        <View style={Style.itemWithIconBoder}>
                            <Item style={{borderBottomWidth: 0, height: 45}}>
                                <Image style={{width: 20, height: 20, marginRight: 1}}
                                       source={require('../thems/image/icon_username.png')}/>
                                <Input onChangeText={value => this.setState({email: value.trim()})}
                                    placeholder='Username'/>
                            </Item>
                        </View>

                        <View style={Style.itemWithIconBoder}>
                            <Item style={{borderBottomWidth: 0, height: 45}}>
                                <Image style={{width: 20, height: 20, marginRight: 1}}
                                       source={require('../thems/image/icon_password.png')}/>
                                <Input secureTextEntry={true}
                                    onChangeText={value => this.setState({password: value.trim()})}
                                    placeholder='Password'/>
                            </Item>
                        </View>



                        <Button block success style={{
                            marginRight: 10,
                            marginLeft: 10,
                            marginTop: 20,
                            height: 40,
                            backgroundColor: Colors.normalButton
                        }}
                                onPress={() => {

                                    if (Validation.isEmpty(this.state.email,"Please fill username") && Validation.isEmpty(this.state.password,"Please fill password")){

                                        SessionManager.createLoginSesion("Login with App", "0", this.state.email, "", "","")

                                        this.props.navigation.navigate('BottomTabNavigator')

                                       /* DailogHelper.showToast("Value is "+AppGlogal.TOAST_SUCCESS,this.state.email+"\n"+
                                            AppGlogal.TOAST_SUCCESS,this.state.password)*/
                                    }


                                }}>
                            <Text>Login</Text>
                        </Button>

                        <Item style={{borderBottomWidth: 0, marginTop: 20, marginRight: 10, marginLeft: 10}}>

                            <Left>
                                <View style={{backgroundColor: Colors.divderColor, height: 1, width: '100%'}}/>
                            </Left>
                            <Body>
                            <Text style={{fontSize: 16, width: 30, color: Colors.divderColor}}>OR</Text>
                            </Body>

                            <Right>
                                <View style={{backgroundColor: Colors.divderColor, height: 1, width: '100%'}}/>
                            </Right>


                        </Item>

                        <Button block success style={{
                            height: 40,
                            marginTop:10,
                            width:'100%',
                            marginLeft:10,
                            marginRight:10,
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            backgroundColor: Colors.googleButtonColor
                        }}
                                onPress={this._signIn}>

                            <Image style={{width: 20, height: 20,marginLeft:30}}
                                   source={require('../thems/image/icon_google.png')}/>
                            <Text style={{fontSize: 12}}>Google Sign In</Text>
                        </Button>

                        <Button block success style={{
                            height: 40,
                            marginTop:10,
                            width:'100%',
                            marginLeft:10,
                            marginRight:10,
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            backgroundColor: Colors.facebookButton
                        }}
                                onPress={() => {

                                    LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
                                        function (result) {
                                            if (result.isCancelled) {
                                                console.log('Login cancelled')
                                            } else {

                                                AccessToken.getCurrentAccessToken().then(
                                                    (data) => {

                                                        // Create a graph request asking for user information
                                                        console.log("accessTokenSource : " + data.accessToken)
                                                        facebookAccessToken=data.accessToken;




                                                        const responseInfoCallback = (error, result) => {


                                                            if (error) {
                                                                alert('Error fetching data: ' + error.toString());
                                                            } else {
                                                                console.log(JSON.stringify(result))

                                                                SessionManager.createLoginSesion("FACEBOOBK", result.id, result.name, result.email,  result.picture.data.url,facebookAccessToken)

                                                                this.props.navigation.navigate('BottomTabNavigator')



                                                                //this.props.navigation.navigate('Home')
                                                              /*  alert('You are login with : ' + "FACEBOOBK" + "\n" +
                                                                    'Result id: ' + result.id + "\n" +
                                                                    'Result name: ' + result.name + "\n" +
                                                                    'Result email: ' + result.email + "\n" +
                                                                    'Result email: ' +  result.picture.data.url + "\n \n \n" +
                                                                    'Result Token: ' + facebookAccessToken + "\n");*/


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
                                            console.log('Login fail with error: ' + error)
                                        }
                                    )


                                }}>

                            <Image style={{width: 20, height: 20,marginLeft:30}}
                                   source={require('../thems/image/icon_facebook.png')}/>
                            <Text style={{fontSize: 12}}>Login with Facebook</Text>
                        </Button>

                    </Content>

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

        SessionManager.createLoginSesion(_loginType, _id, _name, _email, _image,_token)

        this.props.navigation.navigate('BottomTabNavigator')
        /* alert('You are login with : ' + _loginType + "\n" +
         'Result id: ' + _id + "\n" +
         'Result name: ' + _name + "\n" +
         'Result email: ' + _email + "\n" +
         'Result email: ' + _image + "\n \n \n" +
         'Result Token: ' + _token + "\n");*/
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerGoggle: {
        justifyContent: 'center',
        alignItems: 'center',

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

    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
