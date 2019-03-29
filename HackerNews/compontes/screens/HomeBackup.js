import React, {Component} from "react";
import {Image, Alert, TouchableOpacity, StyleSheet, View, Dimensions, ActivityIndicator, FlatList} from 'react-native';
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


const ItemStories = [
    {
        filterId: "Stories",
        text: "All"
    },
    {
        filterId: "Stories",
        text: "Stories"
    },
    {
        filterId: "Stories",
        text: "Comments"
    }
];
const ItemDate = [
    {
        filterId: "Date",
        text: "Popularity"
    },
    {
        filterId: "Date",
        text: "Date"
    }
];
const ItemTime = [
    {
        filterId: "Time",
        text: "All Time"
    },
    {
        filterId: "Time",
        text: "Last 24h"
    },
    {
        filterId: "Time",
        text: "Past Week"
    },
    {
        filterId: "Time",
        text: "Past Month"
    },
    {
        filterId: "Time",
        text: "Past Year"
    },
    {
        filterId: "Time",
        text: "Custom range"
    }
];


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
                params: 'query=packet%20capture&hitsPerPage=20&minWordSizefor1Typo=4&minWordSizefor2Typos=8&advancedSyntax=true&ignorePlurals=false&clickAnalytics=true&tagFilters=%5B%22comment%22%5D&numericFilters=%5B%5D&page=0&queryType=prefixLast&typoTolerance=false&restrictSearchableAttributes=%5B%5D&getRankingInfo=true'
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

                <View style={{
                    height: 100,
                    backgroundColor: Colors.appTheme, position: 'absolute', width:
                    Dimensions.get('window').width, zIndex: 1, opacity: 1
                }}>

                    <Header searchBar rounded noLeft
                            style={{backgroundColor: Colors.appTheme}}
                            androidStatusBarColor={Colors.appTheme}
                            iosBarStyle="light-content">
                        <Left>

                            <Image style={{width: 50, height: 50}}
                                   source={require('../thems/image/logo_trans.png')}/>
                        </Left>

                        <Item style={Style.searchBarSize}>
                            <Icon active name="search"/>
                            <Input placeholder="Search"/>
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

                    </Header>

                    <List style={{backgroundColor: '#dedede', paddingLeft: 10, height: 45}}>
                        <ListItem>

                            <Image
                                Item style={{marginBottom: 1, marginRight: 5, width: 20, height: 20}}
                                source={require('../thems/image/icon_latest_storys.png')}/>
                            <PopoverTooltip
                                ref='tooltipStories'
                                buttonComponent={

                                    <Text style={{width: 100}}>{this.state.filterStory}</Text>


                                }

                                items={[
                                    {
                                        label: ItemStories[0].text,
                                        onPress: () => {
                                            this.setState({
                                                filterStoryPosition: 0,
                                                Publisher: ItemStories[0].text


                                            })
                                            this.showAlert(this.state.filterStoryPosition,
                                                this.state.filterDatePosition,
                                                this.state.filterTimePosition)
                                        }
                                    },
                                    {
                                        label: ItemStories[1].text,
                                        onPress: () => {
                                            this.setState({
                                                filterStoryPosition: 0,
                                                Publisher: ItemStories[1].text
                                            })
                                            this.showAlert(this.state.filterStoryPosition,
                                                this.state.filterDatePosition,
                                                this.state.filterTimePosition)
                                        }
                                    },
                                    {
                                        label: ItemStories[2].text,
                                        onPress: () => {
                                            this.setState({
                                                filterStoryPosition: 1,
                                                Publisher: ItemStories[2].text
                                            })
                                            this.showAlert(this.state.filterStoryPosition,
                                                this.state.filterDatePosition,
                                                this.state.filterTimePosition)
                                        }
                                    }
                                ]}
                            />

                            <Image
                                style={{marginBottom: 1, marginRight: 5, width: 20, height: 20}}
                                source={require('../thems/image/icon_date.png')}/>
                            <PopoverTooltip
                                ref='tooltipDate'
                                buttonComponent={
                                    <Text style={{width: 100}}>{this.state.filterDate}</Text>
                                }
                                items={[
                                    {
                                        label: ItemDate[0].text,
                                        onPress: () => {
                                            this.setState({
                                                filterDatePosition: 0,
                                                q: ItemDate[0].text
                                            })

                                            this.showAlert(this.state.filterStoryPosition,
                                                this.state.filterDatePosition,
                                                this.state.filterTimePosition)
                                        }
                                    },
                                    {
                                        label: ItemDate[1].text,
                                        onPress: () => {
                                            this.setState({
                                                filterDatePosition: 1,
                                                q: ItemDate[1].text
                                            })
                                            this.showAlert(this.state.filterStoryPosition,
                                                this.state.filterDatePosition,
                                                this.state.filterTimePosition)
                                        }
                                    }
                                ]}
                            />

                            <Image
                                style={{marginBottom: 1, marginRight: 5, width: 20, height: 20}}
                                source={require('../thems/image/icon_time.png')}/>

                            <PopoverTooltip
                                ref='tooltipTime'
                                buttonComponent={
                                    <Text style={{width: 100}}>{this.state.filterTime}</Text>
                                }
                                items={[
                                    {
                                        label: ItemTime[0].text,
                                        onPress: () => {
                                            this.setState({
                                                filterTimePosition: 0,
                                                from: ItemTime[0].text
                                            })
                                            this.showAlert(this.state.filterStoryPosition,
                                                this.state.filterDatePosition,
                                                this.state.filterTimePosition)
                                        }
                                    },
                                    {
                                        label: ItemTime[1].text,
                                        onPress: () => {
                                            this.setState({
                                                filterTimePosition: 1,
                                                from: ItemTime[1].text
                                            })
                                            this.showAlert(this.state.filterStoryPosition,
                                                this.state.filterDatePosition,
                                                this.state.filterTimePosition)
                                        }
                                    },
                                    {
                                        label: ItemTime[2].text,
                                        onPress: () => {
                                            this.setState({
                                                filterTimePosition: 2,
                                                from: ItemTime[2].text
                                            })
                                            this.showAlert(this.state.filterStoryPosition,
                                                this.state.filterDatePosition,
                                                this.state.filterTimePosition)
                                        }
                                    },
                                    {
                                        label: ItemTime[3].text,
                                        onPress: () => {
                                            this.setState({
                                                filterTimePosition: 3,
                                                from: ItemTime[3].text
                                            })
                                            this.showAlert(this.state.filterStoryPosition,
                                                this.state.filterDatePosition,
                                                this.state.filterTimePosition)
                                        }
                                    },
                                    {
                                        label: ItemTime[4].text,
                                        onPress: () => {
                                            this.setState({
                                                filterTimePosition: 4,
                                                from: ItemTime[4].text
                                            })
                                            this.showAlert(this.state.filterStoryPosition,
                                                this.state.filterDatePosition,
                                                this.state.filterTimePosition)
                                        }
                                    },
                                    {
                                        label: ItemTime[5].text,
                                        onPress: () => {
                                            this.setState({
                                                filterTimePosition: 5,
                                                from: ItemTime[5].text
                                            })
                                            this.showAlert(this.state.filterStoryPosition,
                                                this.state.filterDatePosition,
                                                this.state.filterTimePosition)
                                        }
                                    }
                                ]}
                            />


                        </ListItem>

                    </List>

                </View>

                <Content>

                    <View style={{flex: 1, paddingTop: 2, paddingLeft: 5, paddingRight: 5, marginTop: 100}}>
                        <FlatList
                            data={this.state.dataSource}
                            renderItem={({item}) =>

                                <TouchableOpacity onPress={() =>
                                    this.props.navigation.navigate('NewsDetail',
                                        {title:item.story_title,
                                        url:item.story_url})}>
                                    <Card>
                                        <CardItem>
                                            {/*<Left>
                                                <Thumbnail
                                                    source={{uri: 'https://facebook.github.io/react-native/img/favicon.png'}}/>

                                            </Left>*/}
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




                                // <Text>{item.title},{item.author},{item.author},{item.author},{item.author},{item.author},{item.author}</Text>

                            }
                            keyExtractor={({points}, index) => points}
                        />
                    </View>

                </Content>

            </Container>
        );
    }


}

