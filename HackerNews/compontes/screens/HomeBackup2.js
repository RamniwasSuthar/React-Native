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
    StatusBar
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

import Colors from "../thems/Colors";
import PopoverTooltip from 'react-native-popover-tooltip';
import Style from "../thems/Style";
import Example from "./Example";


export default class Home extends Component {


    constructor(props) {
        super(props);
        this.state = {isLoading: true}
    }

    componentDidMount() {


        console.log('Start');

        return fetch('https://uj5wyc0l7x-dsn.algolia.net/1/indexes/Item_production_sort_date/query?x-algolia-agent=Algolia%20for%20vanilla%20JavaScript%203.32.0&x-algolia-application-id=UJ5WYC0L7X&x-algolia-api-key=8ece23f8eb07cd25d40262a1764599b1', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                params: 'query=packet capture&' +
                    'hitsPerPage=20&' +
                    'minWordSizefor1Typo=4&' +
                    'minWordSizefor2Typos=8&' +
                    'advancedSyntax=true&' +
                    'ignorePlurals=false&' +
                    'clickAnalytics=true&' +
                    'tagFilters=%5B%22comment%22%5D&' +
                    'numericFilters=%5B%5D&' +
                    'page=0&' +
                    'queryType=prefixLast&' +
                    'typoTolerance=false&' +
                    'restrictSearchableAttributes=%5B%5D&' +
                    'getRankingInfo=true'
            }),
        })
            .then((response) => response.json())
            .then((responseJson) => {

                //Alert.alert("" + responseJson);
                //console.log(responseJson);
                this.setState({
                    isLoading: false,
                    dataSource: responseJson.hits,
                }, function () {

                });

            })
            .catch((error) => {
                console.log('Error');
                //console.log(error);
            });
    }

    state = {
        filterStoryPosition: 0,
        filterDatePosition: 0,
        filterTimePosition: 0,
        Publisher: 'Store',
        q: 'Date',
        from: 'Time',
    };

    showAlert(Story, Date, Time) {
        Alert.alert("Value is :"
            + '\n Story :' + this.state.filterStoryPosition
            + '\n Date :' + this.state.filterDatePosition
            + '\n Time :' + this.state.filterTimePosition);
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
                        searchBar rounded noLeft
                        style={{backgroundColor: Colors.appTheme}}
                        androidStatusBarColor={Colors.appTheme}
                        iosBarStyle="light-content">
                    <Left>

                        <Image style={{width: 40, height: 40}}
                               source={require('../thems/image/logo_trans.png')}/>
                    </Left>

                    <Body children>
                    <Item style={Style.searchBarSize}>
                        <Icon style={{marginLeft: 10}} active name="search"/>
                        <Input placeholder="Search"/>

                        <Text style={{
                            fontSize: 18, color: '#4f7335',
                            fontWeight: 'bold', marginRight: 10
                        }}>Go</Text>
                        <Icon active name="refresh"
                              onPress={() => {
                                  this.setState({
                                      Publisher: 'Store',
                                      q: 'Date',
                                      from: 'Time',
                                      filterStoryPosition: 'Store',
                                      filterDatePosition: 'Date',
                                      filterTimePosition: 'Time'
                                  })
                              }}/>


                    </Item>
                    </Body>

                    <Right>

                        <TouchableOpacity

                            onPress={() => this.props.navigation.navigate('SearchQuery')}>
                            <Image style={{width: 30, height: 30}}
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
                                            title: item.story_title,
                                            url: item.story_url})}>

                                    <Card style={Style.cardStyle}>
                                        <CardItem>
                                            <Body>
                                            <Text note>{item.author}</Text>

                                            <Text numberOfLines={2}
                                                  style={{fontWeight: 'bold'}}>{item.story_title}</Text>
                                            <Text numberOfLines={3}>{item.comment_text}</Text>
                                            <Text numberOfLines={1} style={{
                                                marginTop: 10,
                                                fontFamily: 'Cochin',
                                                color: Colors.appTheme,
                                                fontSize: 15
                                            }}>{item.created_at} </Text>
                                            </Body>
                                        </CardItem>

                                        <CardItem>
                                            <Left/>
                                            <Body>
                                            <Text
                                                numberOfLines={1} style={{
                                                marginLeft: 60,
                                                fontFamily: 'Cochin',
                                                color: Colors.green,
                                                fontSize: 15
                                            }}>
                                                Points :{item.points}
                                            </Text>
                                            </Body>

                                            <Right>
                                                <Text
                                                    numberOfLines={1}
                                                    style={{fontFamily: 'Cochin', color: Colors.green, fontSize: 15}}>
                                                    Comment :{item.num_comments}
                                                </Text>
                                            </Right>
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

