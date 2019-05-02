import React, { Component } from 'react';
import { StyleSheet,BackHandler, View, ListView, Text, Dimensions, StatusBar, ActivityIndicator, TouchableOpacity, InteractionManager } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const {width, height} = Dimensions.get('window')

import Card from './WordDetail'
import  Colors from '../../../thems/Colors'

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class words extends Component { 

  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
        dataSource: ds,
        loaded: false,
        isAnimating: true,
        isRefreshing: true,
        feedURL: 'https://api.urbandictionary.com/v0/words_of_the_day'

    };
  }



    componentWillUnmount() {
        console.log('componentWillUnmount');
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton = () => {
        this.props.navigation.navigate('HomeSearch')
        return true;
    }

    componentDidMount() {
        console.log('componentDidMount');
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);


      console.log("Data for search : - "+this.props.navigation.state.params.searchWord);

        this.setState({feedURL: this.props.navigation.state.params.searchWord})
        
        InteractionManager.runAfterInteractions(() => {
            this.setState({renderPlaceholderOnly: false});
            this.fetchWordsOfTheDay()
        });

    }

    fetchWordsOfTheDay(){
        this.setState({isRefreshing: true})

        fetch(this.props.navigation.state.params.searchWord).then((response) => response.json()).then((newsItems) => {
            this.setState({
                dataSource: this
                    .state
                    .dataSource
                    .cloneWithRows(newsItems.list),
                loaded: true,
                isRefreshing: false,
                isAnimating: false
            })
        }).catch((error) => {
            console.error(error);
            this.setState({
                loaded: true,
                isRefreshing: false,
                isAnimating: false
            })
        });

    }
    _renderRows(data) {
            return (
                <Card style={styles.card} data={data} />
            );
    }
    
    renderLoadingIndicator() {
        return(
        <View style={{flexDirection: 'column', flex: 1, backgroundColor:'white'}}>
            <View style = {{ flexDirection: 'column', justifyContent: 'center', flex: 1, backgroundColor:'white'}} > 
                <ActivityIndicator
                    animating={this.state.animating}
                    color='#e67e22'
                    style={[ styles.centering, {height: 80}]}
                    size="large"/>
            </View>
            

        </View>
        );
    }

    renderWordsFeed() {
        return (

            <View style={styles.container}>
                <StatusBar
                    backgroundColor={Colors.headerBack}
                    barStyle="default"
                />
            <View style={styles.header}>

                <View style={{width: 50, height: 50}} >

                    <TouchableOpacity underlayColor='white' style={{padding:10, height:40,width:50}}
                                      onPress={() => this.props.navigation.navigate('HomeSearch')}>
                        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                            <Icon name="arrow-back" color={Colors.white} size={30}/>
                        </View>
                    </TouchableOpacity>

                </View>

                    <Text style={styles.title}> {this.props.navigation.state.params.title}</Text>







            </View>

            <ListView
                contentContainer = { styles.listContainer }
                dataSource={this.state.dataSource}
                renderRow={(rowData) => this._renderRows({...rowData})}
            />

            </View>
         );
    }

    render() {
        return this.state.isRefreshing? this.renderLoadingIndicator() : this.renderWordsFeed()
    }

}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#F4F4F4',
        alignItems: 'stretch',
        width:width
    },
    listContainer: {
        flex: 1,
        backgroundColor:'#F4F4F4',
        alignItems: 'center',
        overflow:'visible'
    },
    header: {
        backgroundColor:Colors.headerBack,
        marginTop:0,
        height:55,
        flexDirection:'row',
        width:width,
        borderBottomColor:'rgba(151,151,151,0.16)',
        borderBottomWidth:1
    },
    title:{
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Arial Rounded MT Bold',
        textAlign: 'center',
        color: Colors.white,
        marginTop:10,
        marginLeft:20
    },
    card:{
        alignItems: 'center',
        justifyContent: 'center',

    },
    closeButton:{
        marginTop:-60,
        padding:10, 
        margin:20,
        alignItems:'flex-end', 
        backgroundColor:'transparent', 
        height:50,
        borderRadius:4,
        marginTop: 44,
    },

});