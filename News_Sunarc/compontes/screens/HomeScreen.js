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
    BackHandler, RefreshControl
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
import Colors from "../themes/Colors";
import Style from "../themes/Style";

import AppGlogal from "../utils/AppGlogal";
import {ShareDialog, ShareLinkContent as contentType} from 'react-native-fbsdk';

const shareLinkContent = {
    contentType: 'link',
    contentUrl: "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
    contentDescription: 'This tells Webpack to include that file in the bundle. Unlike CSS imports',
};

export default class HomeScreen extends Component {


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
            'HN Pro',
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

        /*
         Alert.alert('_domains=' + _domains +
         'from=' + _publisher +
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

    onRefresh() {
        console.log('refreshing')

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
            dataSource: [],
        });
        this.getDataList(this.state.Publisher, this.state.from, this.state.sortBy, this.state.Domains);

    }


    render() {
        if (this.state.refreshing) {
            return (
                //loading view while data is loading
                <View style={{flex: 1, paddingTop: 20}}>
                    <ActivityIndicator />
                </View>
            );
        }
        return (
            //Returning the ListView
            <View style={styles.MainContainer}>

                <Header hidden={false}
                        style={{backgroundColor: Colors.appTheme}}
                        androidStatusBarColor={Colors.appTheme}
                        iosBarStyle="light-content">
                    <Left>
                        <Image style={{width: 40, height: 40}}
                               source={require('../themes/image/logo_trans.png')}/>
                    </Left>
                    <Body>
                    <Title>Hacker News</Title>
                    </Body>

                    <Right>

                        <TouchableOpacity

                            onPress={() => this.props.navigation.navigate('SearchQuery',
                                {CallHome: this.proFun.bind(this)})}>
                            <Image style={{width: 30, height: 30, marginLeft: 15, marginRight: 15}}
                                   source={require('../themes/image/icon_filter.png')}/>
                        </TouchableOpacity>

                    </Right>

                </Header>

                <FlatList
                    data={this.state.dataSource}
                    enableEmptySections={true}
                    renderItem={({item}) => (
                        <Card style={Style.cardStyle}>
                            <CardItem button onPress={() => this.props.navigation.navigate('NewsDetailScreen', {
                                author: item.author,
                                title: item.title,
                                description: item.description,
                                url: item.url,
                                urlToImage: item.urlToImage,
                                publishedAt: item.publishedAt,
                                content: item.content,
                                name: item.source.name,
                            })}>

                                <Body>

                                <View style={{flex: 1, flexDirection: 'row'}}>

                                    <View style={{width: '25%', height: 60}}>

                                        { item.urlToImage !== null ?
                                            <Image style={{flex: 1, height: 60, width: '100%'}}
                                                   source={{
                                                       uri: item.urlToImage
                                                   }}/> :
                                            <Image style={{flex: 1, height: 60, width: '100%'}}
                                                   source={require('../themes/image/noimage.jpg')}/>}


                                    </View>
                                    <View style={{
                                        width: '75%',
                                        height: 60,
                                        justifyContent: 'center',
                                        alignItems: "flex-end"
                                    }}>
                                        <View style={{
                                            flex: 1,
                                            flexDirection: 'row',
                                            alignSelf: 'flex-end',
                                            paddingLeft: 20
                                        }}>

                                            <Text numberOfLines={1} style={{
                                                fontWeight: 'bold',
                                                color: Colors.appTheme,
                                                fontSize: 20,
                                                textAlign: 'right',

                                            }}>  {item.author !== null ? item.author : "Author Name"} </Text>
                                        </View>

                                        <View style={{
                                            flex: 1,
                                            flexDirection: 'row',
                                            alignSelf: 'flex-end',
                                            paddingLeft: 20
                                        }}>
                                            <Text numberOfLines={1} style={{
                                                fontFamily: 'Cochin',
                                                fontWeight: 'bold',
                                                color: Colors.gray,
                                                fontSize: 14,
                                                textAlign: 'right',

                                            }}>  {item.source.name !== null ? item.source.name : "source name"} </Text>
                                        </View>
                                    </View>

                                </View>

                                <Text numberOfLines={2} style={{
                                    marginTop: 10,
                                    fontFamily: 'Cochin',
                                    color: Colors.black,
                                    fontSize: 15
                                }}>{item.title} </Text>
                                </Body>
                            </CardItem>

                        </Card>
                    )}
                    refreshControl={
                        <RefreshControl
                            //refresh control used for the Pull to Refresh
                            refreshing={this.state.isLoading}
                            onRefresh={this.onRefresh.bind(this)}
                        />
                    }
                />
            </View>
        );
    }


}

const styles = StyleSheet.create({
    MainContainer: {
        justifyContent: 'center',
        flex: 1,
    },
    rowViewContainer: {
        fontSize: 20,
        padding: 10,
    },
});