import React, {Component} from 'react';
import {Container, Header, Left, Body, Right, Text, Button, Icon, Title, Item, Input, Content} from 'native-base';
import Colors from "../themes/Colors";
import Style from "../themes/Style";
import {
    StyleSheet,
    WebView,
    ActivityIndicator,
    View,
    TouchableOpacity,
    BackHandler,
    ScrollView,
    Image
} from 'react-native';
import {ShareDialog, ShareLinkContent as contentType} from 'react-native-fbsdk';

export default class NewsDetailScreen extends Component {

    render() {
        return (
            <Container>


                <Header hidden={false}
                        style={{backgroundColor: Colors.appTheme}}
                        androidStatusBarColor={Colors.appTheme}
                        iosBarStyle='light-content'>


                    <View style={{flex: 1, flexDirection: 'row'}}>

                        <View style={{width: '10%', height: 50, justifyContent: 'center',}}>

                            <TouchableOpacity
                                hide={true}
                                onPress={() => this.onBackPress()}>
                                <Image style={{width: 30, height: 30, tintColor: Colors.white}}
                                       source={require('../themes/image/icon_back.png')}/>
                            </TouchableOpacity>


                        </View>


                        <View style={{
                            width: '80%', height: 50, justifyContent: 'center',

                        }}>

                            <Title style={{
                                color: Colors.white, fontFamily: 'Roboto',
                                paddingLeft:10,paddingRight:10,
                                fontWeight: 'bold'
                            }}>
                                {this.props.navigation.state.params.author ?
                                    this.props.navigation.state.params.author.toUpperCase() :
                                    this.props.navigation.state.params.title ?
                                        this.props.navigation.state.params.title.toUpperCase()
                                        :"News Detail"}
                            </Title>
                        </View>


                        <View style={{width: '20%', height: 50, justifyContent: 'center',}}>

                            <TouchableOpacity
                                hide={true}
                                onPress={() => {

                                    let shareOptions = {
                                        contentType: 'link',
                                        contentDescription:  this.props.navigation.state.params.title+"\n "+ this.props.navigation.state.params.description,
                                        contentUrl:  this.props.navigation.state.params.urlToImage !== null ?  this.props.navigation.state.params.urlToImage :
                                            "https://facebook.github.io/react-native/docs/assets/favicon.png",
                                    };


                                    ShareDialog.canShow(shareOptions).then(
                                        function (canShow) {
                                            if (canShow) {
                                                return ShareDialog.show(shareOptions);
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
                                }}
                            >
                                <Image style={{width: 25, height: 25, tintColor: Colors.white}}
                                       source={require('../themes/image/icon_share.png')}/>
                            </TouchableOpacity>


                        </View>


                    </View>


                </Header>


                <ScrollView contentContainerStyle={{flexGrow: 1}}>

                    <View>

                        { this.props.navigation.state.params.urlToImage !== null ?
                            <Image style={{height: 200, width: '100%'}}
                                   source={{
                                       uri: this.props.navigation.state.params.urlToImage
                                   }}/> :
                            <Image style={{height: 200, width: '100%',resizeMode: 'contain'}}
                                   source={require('../themes/image/noimage.jpg')}/>}




                        <Text style={{
                            marginTop: 10,
                            color: Colors.appTheme,
                            fontSize: 20,
                            paddingLeft: 15,
                            textAlign: 'left',

                        }}>  { this.props.navigation.state.params.title !== null ? this.props.navigation.state.params.title.trim() : "Title"} </Text>

                        <Text style={{
                            marginTop: 10,
                            fontFamily: 'Cochin',
                            color: Colors.black,
                            fontSize: 18,
                            paddingLeft: 15,
                            textAlign: 'left',

                        }}>  { this.props.navigation.state.params.description !== null ? this.props.navigation.state.params.description.trim() : "source name"} </Text>

                        <Text style={{
                            marginTop: 10,
                            fontFamily: 'Cochin',
                            color: Colors.black,
                            fontSize: 16,
                            marginLeft: 15,
                        }}> { this.props.navigation.state.params.content !== null ? this.props.navigation.state.params.content.trim() : ""}} </Text>


                        <Text style={{
                            marginTop: 10,
                            color: Colors.gray,
                            fontSize: 16,
                            paddingLeft: 15,
                            marginRight: 10,
                            alignSelf: 'flex-end',

                        }}>  { this.props.navigation.state.params.name !== null ? this.props.navigation.state.params.name.trim() : ""} </Text>

                        <Text style={{
                            marginTop: 1,
                            fontFamily: 'Cochin',
                            color: Colors.gray,
                            fontSize: 16,
                            marginLeft: 15,
                            marginRight: 10,
                            alignSelf: 'flex-end',
                        }}>{ this.props.navigation.state.params.publishedAt} </Text>




                        <Button transparent style={{alignSelf: 'flex-end'}}
                                onPress={() => this.props.navigation.navigate('NewsDetail', {
                                    title: this.props.navigation.state.params.title,
                                    url: this.props.navigation.state.params.url,
                                })}>
                            <Text style={{
                                color: Colors.appTheme, fontWeight: 'bold',
                                fontSize: 18, marginBottom: 20,
                                fontFamily: 'Feather'
                            }}>Read more...</Text>
                        </Button>

                    </View>


                </ScrollView>

            </Container>
        );
    }

    onBackPress() {
        this.props.navigation.goBack();
    }

    componentDidMount() {

        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

    }

    componentWillUnmount() {

        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton = () => {
        this.props.navigation.navigate('HomeScreen')
        return true;
    }
}

