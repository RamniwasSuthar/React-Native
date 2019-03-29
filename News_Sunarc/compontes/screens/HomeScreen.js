import React, {Component} from "react";
import {
    Image,
    Alert,
    TouchableOpacity,
    TouchableHighlight,
    StyleSheet,
    View,
    Dimensions,
    ActivityIndicator,
    FlatList,
    StatusBar,
    BackHandler
} from 'react-native';
import {
    Container,
    Header,
    Title,
    Content,
    Button,
    Icon,
    Left,
    Right,
    Body,
    Text,
    ListItem,
    Subtitle, List, Thumbnail, CardItem, Card, Item, Input
} from "native-base";

import Moment from 'moment';
import Colors from "../thems/Colors";
import Style from "../thems/Style";

import AppGlogal from "../utils/AppGlogal";
import {ShareDialog, ShareLinkContent as contentType} from 'react-native-fbsdk';

const shareLinkContent = {
    contentType: 'link',
    contentUrl: "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
    contentDescription: 'This tells Webpack to include that file in the bundle. Unlike CSS imports',
};

export default class Home extends Component {


    constructor(props) {
        super(props);

        this.state = {
            Publisher: 'abc-news',
            Domains: 'wsj.com',
            q: 'bitcoin',  //bitcoin
            from: Moment().format('YYYY-MM-DD'),
            to: '',
            sortBy: 'publishedAt',  //publishedAt
            isLoading: true,
        }

    }

    proFun() {

        this.setState({
            Publisher: AppGlogal.Publisher,
            from: AppGlogal.FromDate,
            sortBy: AppGlogal.SortBy,
            Domains: AppGlogal.Domains,
            isLoading: true,
        });
        this.getDataList(AppGlogal.Publisher, AppGlogal.FromDate, AppGlogal.SortBy, AppGlogal.Domains);


    }

    componentWillUnmount() {

        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton = () => {
        Alert.alert(
            'Hacker News',
            "Are you sure you want to exit from app ?", [{
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
            }, {
                text: 'OK',
                onPress: () => BackHandler.exitApp()
            },], {
                cancelable: false
            }
        )
        return true;
    }

    shouldComponentUpdate(props, state) {
        //Alert.alert(" test")
        return true;
    }

    componentDidMount() {
        console.log('Start Start Start Start');
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        console.log('Start');
        // Alert.alert("" + AppGlogal.SortBy)

        return this.getDataList(this.state.Publisher, this.state.from, this.state.sortBy, this.state.Domains)
    }

    getDataList(_publisher, _from, _srorBy, _domains) {
        /* Alert.alert('Publisher=' + _domain +
         'from=' + _from +
         'sortBy=' + _srorBy)*/


        console.log("\n \n sources : - " + _publisher +
            "\n domains : - " + _domains +
            "\n from : - " + _from +
            "\n sortBy : - " + _srorBy);

        fetch('https://newsapi.org/v2/everything?' +
            'sources=' + _publisher +
            '&domains=' + _domains +
            '&from=' + _from +
            '&sortBy=' + _srorBy +
            '&apiKey=488cea46e28c4e9ca39cee2183b6083a')
            .then((response) => response.json())
            .then((responseJson) => {

                if (!responseJson.totalResults > 0) {
                    Alert.alert("No Recored Found !")
                }


                this.setState({
                    isLoading: false,

                    dataSource: responseJson.articles,
                }, function () {

                });

            })
            .catch((error) => {
                console.log('Error');
                //console.log(error);
            });
    }


    render() {

        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, padding: 20}}>
                    <ActivityIndicator/>
                </View>
            )
        }

        return (
            <Container>


                <Header hidden={false}
                        style={{backgroundColor: Colors.appTheme}}
                        androidStatusBarColor={Colors.appTheme}
                        iosBarStyle="light-content">
                    <Left>
                        <Image style={{width: 40, height: 40}}
                               source={require('../thems/image/logo_trans.png')}/>
                    </Left>
                    <Body>
                    <Title>Hacker News</Title>
                    </Body>

                    <Right>

                        <TouchableOpacity onPress={() => {


                            /*this.props.navigation.navigate('ProfleScreen')*/
                            AppGlogal.SortBy = '';
                            AppGlogal.Publisher = '';
                            AppGlogal.FromDate = '';
                            AppGlogal.Domains = '';


                            this.setState({
                                Publisher: 'abc-news',
                                from: Moment().format('YYYY-MM-DD'),
                                sortBy: 'publishedAt',
                                Domains: 'wsj.com',
                                isLoading: true,
                            });
                            this.getDataList(this.state.Publisher,this.state.from, this.state.sortBy, this.state.Domains);
                        }}>
                            <Image style={{width: 30, height: 30}}
                                   source={require('../thems/image/icon_refresh.png')}/>
                        </TouchableOpacity>

                        <TouchableOpacity

                            onPress={() => this.props.navigation.navigate('SearchQuery',
                                {CallHome: this.proFun.bind(this)})}>
                            <Image style={{width: 30, height: 30, marginLeft: 15, marginRight: 15}}
                                   source={require('../thems/image/icon_filter.png')}/>
                        </TouchableOpacity>

                    </Right>

                </Header>

                <Content>

                    <View style={{flex: 1, paddingTop: 2, paddingLeft: 5, paddingRight: 5, marginTop: 3}}>
                        <FlatList
                            data={this.state.dataSource}
                            renderItem={({item}) =>

                                <TouchableOpacity onPress={() => this.props.navigation.navigate('NewsDetail', {
                                    title: item.author,
                                    url: item.url
                                })}>

                                    <Card style={Style.cardStyle}>
                                        <CardItem>


                                            <Body>

                                            <Item style={{borderBottomWidth: 0}}>
                                                <Left>
                                                    <Thumbnail style={{height: 60, width: 60}}
                                                               source={{
                                                                   uri: item.urlToImage != null ? item.urlToImage :
                                                                       "https://facebook.github.io/react-native/docs/assets/favicon.png"
                                                               }}/>

                                                </Left>

                                                <Body>
                                                <View style={{flex: 1, flexDirection: 'row', alignSelf: 'flex-end'}}>

                                                    <Text numberOfLines={1} style={{
                                                        fontFamily: 'Cochin',
                                                        fontWeight: 'bold',
                                                        color: Colors.mainHeading,
                                                        fontSize: 20,

                                                        textAlign: 'right',
                                                    }}>{item.author != null ? item.author : "Author Name"} </Text>
                                                </View>

                                                <View style={{flex: 1, flexDirection: 'row', alignSelf: 'flex-end'}}>
                                                    <Text numberOfLines={1} style={{
                                                        fontFamily: 'Cochin',
                                                        fontWeight: 'bold',
                                                        color: Colors.subString,
                                                        fontSize: 14,
                                                        textAlign: 'right',
                                                    }}>{item.source.name != null ? item.source.name : "source name"} </Text>
                                                </View>
                                                </Body>


                                            </Item>


                                            <Text numberOfLines={2} style={{
                                                marginTop: 10,
                                                fontWeight: 'bold',
                                                fontFamily: 'Cochin',
                                                color: Colors.titleText,
                                                fontSize: 15
                                            }}>{item.title} </Text>

                                            <Text numberOfLines={3} style={{
                                                marginTop: 10,
                                                fontFamily: 'Cochin',
                                                color: Colors.descriptionText,
                                                fontSize: 15
                                            }}>{item.description} </Text>

                                            <Text numberOfLines={3} style={{
                                                marginTop: 10,
                                                fontFamily: 'Cochin',
                                                color: Colors.contentText,
                                                fontSize: 15
                                            }}>{item.content} </Text>


                                            <Item style={{borderBottomWidth: 0}}>
                                                <Text numberOfLines={1} style={{
                                                    marginTop: 10,
                                                    color: Colors.mainHeading,
                                                    fontSize: 15,
                                                    height: 45
                                                }}>{Moment("" + item.publishedAt).format('DD MMM YYYY HH:MM:SS')} </Text>

                                                <View style={Style.itemWithIconBoder}>
                                                    <Item style={{
                                                        borderBottomWidth: 0,
                                                        height: 30,
                                                        backgroundColor: Colors.facebookButton
                                                    }}
                                                          onPress={() => {

                                                              let shareOptions = {
                                                                  contentType: 'link',
                                                                  contentDescription: item.title,
                                                                  contentUrl: item.urlToImage !== null ? item.urlToImage :
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
                                                          }}>
                                                        <Image style={{
                                                            width: 20,
                                                            height: 20,
                                                            marginRight: 1,
                                                            marginLeft: 10
                                                        }}
                                                               source={require('../thems/image/icon_facebook.png')}/>


                                                        <Text
                                                            style={{fontSize: 12, color: Colors.white, marginLeft: 10}}>
                                                            Share on Facebook
                                                        </Text>

                                                    </Item>
                                                </View>

                                            </Item>


                                            </Body>
                                        </CardItem>

                                    </Card>

                                </TouchableOpacity>

                            }
                            keyExtractor={({points}, index) => points}
                        />
                    </View>

                </Content>

            </Container>
        );
    }


}

