import React, {Component} from 'react';
import {Container, Header, Left, Body, Right, Button, Icon, Title, Item, Input, Content, Text} from 'native-base';
import Colors from "../thems/Colors";
import Style from "../thems/Style";
import {StyleSheet, WebView, ActivityIndicator, View, Image, ImageBackground, StatusBar} from 'react-native';
import {
    LoginManager, LoginButton, AccessToken, GraphRequest, GraphRequestManager,
    ShareDialog, ShareApi, ShareLinkContent as contentType
} from 'react-native-fbsdk';


const shareLinkContent = {
    contentType: 'link',
    contentUrl: "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
    contentDescription: 'This tells Webpack to include that file in the bundle. Unlike CSS imports',
};

const photoUri = 'file://' + '/path/of/photo.png'


const sharePhotoContent = {
    contentType: 'photo',
    photos: [{imageUrl: photoUri}],
}

const videoUri = 'file://' + '/path/of/video.mp4'

const shareVideoContent = {
    contentType: 'video',
    video: {localUrl: videoUri},
}

export default class FacebookSharing extends Component {
    constructor() {
        super();
        this.requestManager = new GraphRequestManager()
    }


    render() {


        return (

            <View style={styles.container}>
                <StatusBar hidden
                           backgroundColor={Colors.appTheme}
                           barStyle="light-content"/>
                <ImageBackground
                    source={require('../thems/image/bg.jpg')}
                    style={styles.backgroundImage}>

                    <Content style={Style.DefultContentPaddingColor}>

                        <View style={{marginTop: 2, marginLeft: 10}}>

                            <LoginButton
                                readPermissions={['email', 'public_profile']}
                                onLoginFinished={
                                    (error, result) => {
                                        if (error) {
                                            alert("login has error: " + result.error);
                                        } else if (result.isCancelled) {
                                            alert("login is cancelled.");
                                        } else {
                                            AccessToken.getCurrentAccessToken().then(
                                                (data) => {

                                                    // Create a graph request asking for user information
                                                    const infoRequest = new GraphRequest('/me', {
                                                        accessToken: data.accessToken,
                                                        parameters: {
                                                            fields: {
                                                                string: 'email,name,first_name,middle_name,last_name,picture.type(large),gender',
                                                            }
                                                        }
                                                    }, this._responseInfoCallback);

                                                    console.log("infoRequest : " + infoRequest.accessToken)
                                                    console.log("infoRequest : " + JSON.stringify(infoRequest))
                                                    new GraphRequestManager().addRequest(infoRequest).start();
                                                }
                                            )
                                        }
                                    }
                                }
                                onLogoutFinished={() => alert("logout.")}/>
                        </View>


                        <Button block success style={{
                            marginRight: 10, marginLeft: 10, marginTop: 10, height: 40,
                            backgroundColor: Colors.normalButton, marginBottom: 50
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

                                                        const  responseInfoCallback = (error, result) => {

                                                            console.log("Callback")
                                                            if (error) {
                                                                alert('Error fetching data: ' + error.toString());
                                                            } else {
                                                                console.log(JSON.stringify(result))
                                                                alert('Result Name: ' + result.name + "\n" +
                                                                    'Result id: ' + result.id + "\n" +
                                                                    'Result first_name: ' + result.first_name + "\n" +
                                                                    'Result middle_name: ' + result.middle_name + "\n" +
                                                                    'Result last_name: ' + result.middle_namemiddle_name + "\n" +
                                                                    'Result email: ' + result.email + "\n" +
                                                                    'Result gender: ' + result.gender + "\n" +
                                                                    'Result picture: ' + result.picture.data.url + "\n");
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

                                                        console.log("infoRequest : " + infoRequest.accessToken)
                                                        console.log("infoRequest : " + JSON.stringify(infoRequest))

                                                        new GraphRequestManager().addRequest(infoRequest).start();

                                                    }
                                                )

                                            }
                                        },
                                        function (error) {
                                            console.log('Login fail with error: ' + error)
                                        }
                                    )


                                }}>
                            <Text>Login With Facebook new</Text>
                        </Button>


                        <Button block success style={{
                            marginRight: 10,
                            marginLeft: 10,
                            marginTop: 10,
                            height: 40,
                            backgroundColor: Colors.normalButton
                        }}
                                onPress={() => {
                                    ShareDialog.canShow(shareLinkContent).then(
                                        function (canShow) {
                                            if (canShow) {
                                                return ShareDialog.show(shareLinkContent);
                                            }
                                        }
                                    ).then(
                                        function (result) {
                                            if (result.isCancelled) {
                                                console.log('Share cancelled');
                                            } else {
                                                console.log('Share success with postId: '
                                                    + result.postId);
                                            }
                                        },
                                        function (error) {
                                            console.log('Share fail with error: ' + error);
                                        }
                                    );
                                }}>
                            <Text>Share Link Content Facebook</Text>
                        </Button>

                        <Button block success style={{
                            marginRight: 10,
                            marginLeft: 10,
                            marginTop: 10,
                            height: 40,
                            backgroundColor: Colors.normalButton
                        }}
                                onPress={() => {

                                    ShareDialog.show(sharePhotoContent);
                                }}>
                            <Text>Share Photo Content Facebook</Text>
                        </Button>


                        <Button block success style={{
                            marginRight: 10,
                            marginLeft: 10,
                            marginTop: 10,
                            height: 40,
                            backgroundColor: Colors.normalButton
                        }}
                                onPress={() => {

                                    ShareDialog.show(shareVideoContent);
                                }}>
                            <Text>Share Video Content Facebook</Text>
                        </Button>

                    </Content>


                </ImageBackground>


            </View>


        )
            ;


    }


    //Create response callback.
    _responseInfoCallback = (error, result) => {

        console.log("Callback")
        if (error) {
            alert('Error fetching data: ' + error.toString());
        } else {
            console.log(JSON.stringify(result))
            alert('Result Name: ' + result.name + "\n" +
                'Result id: ' + result.id + "\n" +
                'Result first_name: ' + result.first_name + "\n" +
                'Result middle_name: ' + result.middle_name + "\n" +
                'Result last_name: ' + result.middle_namemiddle_name + "\n" +
                'Result email: ' + result.email + "\n" +
                'Result gender: ' + result.gender + "\n" +
                'Result picture: ' + result.picture.data.url + "\n");
        }
    }


    initUser(token) {
        fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + token)
            .then((response) => response.json())
            .then((json) => {

                log("" + json)
                // Some user object has been set up somewhere, build that user here
                user.name = json.name
                user.id = json.id
                user.user_friends = json.friends
                user.email = json.email
                user.username = json.name
                user.loading = false
                user.loggedIn = true
                user.avatar = setAvatar(json.id)
            })
            .catch(() => {
                reject('ERROR GETTING DATA FROM FACEBOOK')
            })
    }


}

const afterLoginComplete = async (token) => {
    const response = await fetch(
        `https://graph.facebook.com/me?fields=id,name,first_name,last_name,gender,picture,cover&access_token=${token}`);
    let result = await response.json();

    console.log("" + result)
    // use this result as per the requirement
};

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
