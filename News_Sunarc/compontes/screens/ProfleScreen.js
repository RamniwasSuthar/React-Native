import React, {Component} from 'react';
import {
    Container, Header, Left, Body, Right, Button, Icon, Title, Item, Input, Content, Text, Card,
    CardItem, Thumbnail, Radio, List, ListItem,
} from 'native-base';
import {
    StyleSheet, WebView, ActivityIndicator, View, Image, ImageBackground, StatusBar,
    TouchableOpacity, Alert, BackHandler, FlatList, TouchableHighlight, AsyncStorage
} from 'react-native';
import Colors from "../thems/Colors";
import Style from "../thems/Style";
import SessionManager from '../../compontes/utils/SessionManager';
import Home from './HomeScreen';
import DailogHelper from '../utils/DailogHelper';
import AppGlogal from '../utils/AppGlogal';


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
                <Header style={{backgroundColor: Colors.profileBanner}}
                        androidStatusBarColor={Colors.profileBanner}
                        iosBarStyle="light-content">
                    {/*  <Left>
                     <Button transparent
                     onPress={() => this.props.navigation.navigate('Home')}>
                     <Icon name='arrow-back'/>

                     </Button>
                     </Left>*/}

                    <Title style={{fontSize: 20}}>Profile</Title>

                </Header>

                <Content>


                    <View style={{
                        flex: 1,
                        backgroundColor: Colors.profileBanner,
                        height: 180,
                        alignItems: 'center',
                        paddingTop: 30
                    }}>
                        {/*  justifyContent: 'center'*/}
                        <Thumbnail
                            large
                            source={{uri: this.state.ProfileImage/*"https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"*/}}/>

                        <Text numberOfLines={1} style={{
                            fontFamily: 'Cochin',
                            color: Colors.white,
                            fontSize: 29,
                            marginTop: 15
                        }}>{this.state.UserName}</Text>
                    </View>


                    <Card style={Style.cardStyle2}>
                        <CardItem>

                            <View style={{width: '100%'}}>

                                <Item style={{borderBottomWidth: 0, width: '100%'}}>

                                    <Image style={{width: 25, height: 25, tintColor: Colors.profileDivder}}
                                           source={require('../thems/image/icon_user.png')}/>

                                    <Text numberOfLines={1} style={{
                                        fontFamily: 'Cochin',
                                        marginLeft: 5,
                                        marginLeft: 10,
                                        width: 300,
                                        color: Colors.mainHeading,
                                        fontSize: 18
                                    }}>{this.state.FirstName}</Text>

                                    <Image style={{width: 25, height: 25}}
                                           source={require('../thems/image/icon_arrow_right.png')}/>


                                </Item>

                                <View style={{
                                    width: '100%',
                                    height: 1,
                                    backgroundColor: Colors.profileDivder,
                                    marginTop: 15
                                }}/>

                                <Item style={{borderBottomWidth: 0, width: '100%', marginTop: 20}}>

                                    <Image style={{width: 25, height: 25, tintColor: Colors.profileDivder}}
                                           source={require('../thems/image/icon_user.png')}/>

                                    <Text numberOfLines={1} style={{
                                        fontFamily: 'Cochin',
                                        marginLeft: 5,
                                        marginLeft: 10,
                                        width: 300,
                                        color: Colors.mainHeading,
                                        fontSize: 18
                                    }}>{this.state.LastName}</Text>

                                    <Image style={{width: 25, height: 25}}
                                           source={require('../thems/image/icon_arrow_right.png')}/>


                                </Item>

                                <View style={{
                                    width: '100%',
                                    height: 1,
                                    backgroundColor: Colors.profileDivder,
                                    marginTop: 15
                                }}/>

                                <Item style={{borderBottomWidth: 0, width: '100%', marginTop: 20}}>

                                    <Image style={{width: 25, height: 25, tintColor: Colors.profileDivder}}
                                           source={require('../thems/image/icon_email.png')}/>

                                    <Text numberOfLines={1} style={{
                                        fontFamily: 'Cochin',
                                        marginLeft: 5,
                                        marginLeft: 10,
                                        width: 300,
                                        color: Colors.mainHeading,
                                        fontSize: 18
                                    }}>{this.state.Email}</Text>

                                    <Image style={{width: 25, height: 25}}
                                           source={require('../thems/image/icon_arrow_right.png')}/>


                                </Item>

                                <View style={{
                                    width: '100%',
                                    height: 1,
                                    backgroundColor: Colors.profileDivder,
                                    marginTop: 15
                                }}/>

                                <Item style={{borderBottomWidth: 0, width: '100%', marginTop: 20}}>

                                    <Image style={{width: 25, height: 25, tintColor: Colors.profileDivder}}
                                           source={require('../thems/image/icon_date.png')}/>

                                    <Text numberOfLines={1} style={{
                                        fontFamily: 'Cochin',
                                        marginLeft: 5,
                                        marginLeft: 10,
                                        width: 300,
                                        color: Colors.mainHeading,
                                        fontSize: 18
                                    }}>Date of Birth : {this.state.DateofBirth}</Text>

                                    <Image style={{width: 25, height: 25}}
                                           source={require('../thems/image/icon_arrow_right.png')}/>


                                </Item>

                                <View style={{
                                    width: '100%',
                                    height: 1,
                                    backgroundColor: Colors.profileDivder,
                                    marginTop: 15
                                }}/>

                                <Item style={{borderBottomWidth: 0, width: '100%', marginTop: 20}}>

                                    <Image style={{width: 25, height: 25, tintColor: Colors.profileDivder}}
                                           source={require('../thems/image/icon_latest_storys.png')}/>


                                    <Text numberOfLines={1} style={{
                                        fontFamily: 'Cochin',
                                        marginLeft: 5,
                                        marginLeft: 10,
                                        width: 300,
                                        color: Colors.mainHeading,
                                        fontSize: 18
                                    }}>{this.state.Gender}</Text>

                                    <Image style={{width: 25, height: 25}}
                                           source={require('../thems/image/icon_arrow_right.png')}/>


                                </Item>

                                <View style={{
                                    width: '100%',
                                    height: 1,
                                    backgroundColor: Colors.profileDivder,
                                    marginTop: 15
                                }}/>

                                <Item style={{borderBottomWidth: 0, width: '100%', marginTop: 20}}
                                      onPress={() =>

                                          DailogHelper.showToast(AppGlogal.TOAST_SUCCESS, "First toast message Ram")

                                      }>

                                    <Image style={{width: 25, height: 25, tintColor: Colors.profileDivder}}
                                           source={require('../thems/image/icon_time.png')}/>

                                    <Text numberOfLines={1} style={{
                                        fontFamily: 'Cochin',
                                        marginLeft: 5,
                                        marginLeft: 10,
                                        width: 300,
                                        color: Colors.mainHeading,
                                        fontSize: 15
                                    }}>Last login : {this.state.LastLoginTime}</Text>

                                    <Image style={{width: 25, height: 25}}
                                           source={require('../thems/image/icon_arrow_right.png')}/>


                                </Item>


                            </View>

                        </CardItem>
                    </Card>

                </Content>

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

            if (words.length>1){
                this.setState({
                    UserName: value,
                    FirstName: words[0],
                    LastName: words[1]
                })

            }else {
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
        // Alert.alert("" + AppGlogal.SortBy)
    }


    componentWillUnmount() {

        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton = () => {
        this.props.navigation.navigate('Home')
        return true;
    }


}

