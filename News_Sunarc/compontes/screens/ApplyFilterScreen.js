import React, {Component} from 'react';
import {
    Container, Header, Left, Body, Right, Button, Icon, Title, Item, Input, Content, Text, Card,
    CardItem, Thumbnail, Radio, List, ListItem
} from 'native-base';
import {
    StyleSheet, WebView, ActivityIndicator, View, Image, ImageBackground, StatusBar,
    TouchableOpacity, Alert, BackHandler,FlatList,TouchableHighlight
} from 'react-native';
import Colors from "../themes/Colors";
import Style from "../themes/Style";
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'
import DateTimePicker from 'react-native-modal-datetime-picker';
import Moment from 'moment';
import Home from './HomeScreen';
import AppGlogal from "../utils/AppGlogal";


const publishersList = [
    { id: 'abc-news', name: 'ABC News', image: ''},
    { id: 'al-jazeera-english', name: 'Al Jazeera English', image: ''},
    { id: 'ars-technica', name: 'Ars Technica', image: ''},
    { id: 'associated-press', name: 'Associated Press', image: ''},
    { id: 'axios', name: 'Axios', image: ''},
    { id: 'bleacher-report', name: 'Bleacher Report', image: ''},
    { id: 'bloomberg', name: 'Bloomberg', image: ''},
    { id: 'breitbart-news', name: 'Breitbart News', image: ''},
    { id: 'business-insider', name: 'Business Insider', image: ''},
    { id: 'buzzfeed', name: 'Buzzfeed', image: ''},
    { id: 'cbs-news', name: 'CBS News', image: ''},
    { id: 'cnbc', name: 'CNBC', image: ''},
    { id: 'cnn', name: 'CNN', image: ''},
    { id: 'crypto-coins-news', name: 'Crypto Coins News', image: ''},
    { id: 'engadget', name: 'Engadget', image: ''},
    { id: 'entertainment-weekly', name: 'Entertainment Weekly', image: ''},
    { id: 'espn', name: 'ESPN', image: ''},
    { id: 'espn-cric-info', name: 'ESPN Cric Info', image: ''},
    { id: 'fortune', name: 'Fortune', image: ''},
    { id: 'fox-news', name: 'Fox News', image: ''},
    { id: 'fox-sports', name: 'Fox Sports', image: ''},
    { id: 'google-news', name: 'Google News', image: ''},
    { id: 'hacker-news', name: 'Hacker News', image: ''},
    { id: 'ign', name: 'IGN', image: ''},
    { id: 'mashable', name: 'Mashable', image: ''},
    { id: 'medical-news-today', name: 'Medical News Today', image: ''},
    { id: 'msnbc', name: 'MSNBC', image: ''},
    { id: 'mtv-news', name: 'MTV News', image: ''},
    { id: 'national-geographic', name: 'National Geographic', image: ''},
    { id: 'national-review', name: 'National Review', image: ''},
    { id: 'nbc-news', name: 'NBC News', image: ''},
    { id: 'new-scientist', name: 'New Scientist', image: ''},
    { id: 'newsweek', name: 'Newsweek', image: ''},
    { id: 'new-york-magazine', name: 'New York Magazine', image: ''},
    { id: 'next-big-future', name: 'Next Big Future', image: ''},
    { id: 'nfl-news', name: 'NFL News', image: ''},
    { id: 'nhl-news', name: 'NHL News', image: ''},
    { id: 'politico', name: 'Politico', image: ''},
    { id: 'polygon', name: 'Polygon', image: ''},
    { id: 'recode', name: 'Recode', image: ''},
    { id: 'reddit-r-all', name: 'Reddit /r/all', image: ''},
    { id: 'reuters', name: 'Reuters', image: ''},
    { id: 'techcrunch', name: 'TechCrunch', image: ''},
    { id: 'techradar', name: 'TechRadar', image: ''},
    { id: 'the-american-conservative', name: 'The American Conservative', image: ''},
    { id: 'the-hill', name: 'The Hill', image: ''},
    { id: 'the-huffington-post', name: 'The Huffington Post', image: ''},
    { id: 'the-new-york-times', name: 'The New York Times', image: ''},
    { id: 'the-next-web', name: 'The Next Web', image: ''},
    { id: 'the-verge', name: 'The Verge', image: ''},
    { id: 'the-wall-street-journal', name: 'The Wall Street Journal', image: ''},
    { id: 'the-washington-post', name: 'The Washington Post', image: ''},
    { id: 'the-washington-times', name: 'The Washington Times', image: ''},
    { id: 'time', name: 'Time', image: ''},
    { id: 'usa-today', name: 'USA Today', image: ''},
    { id: 'vice-news', name: 'Vice News', image: ''},
    { id: 'wired', name: 'Wired', image: ''},

];

const categoryList = [
    {  name: 'entertainment', image: ''},
    {  name: 'general', image: ''},
    {  name: 'health', image: ''},
    {  name: 'science', image: ''},
    {  name: 'sports', image: ''},
    {  name: 'technology', image: ''},

];

const languageList = [
    {  id:'ar',name: 'ar', image: ''},
    {  id:'de',name: 'de', image: ''},
    {  id:'en',name: 'en', image: ''},
    {  id:'es',name: 'es', image: ''},
    {  id:'fr',name: 'fr', image: ''},
    {  id:'he',name: 'he', image: ''},
    {  id:'it',name: 'it', image: ''},
    {  id:'nl',name: 'nl', image: ''},
    {  id:'no',name: 'no', image: ''},
    {  id:'pt',name: 'pt', image: ''},
    {  id:'ru',name: 'ru', image: ''},
    {  id:'se',name: 'se', image: ''},
    {  id:'ud',name: 'ud', image: ''},
    {  id:'zh',name: 'zh', image: ''},

];countryList = [
    {  id:'ae',name: 'ae', image: ''},
    {  id:'ar',name: 'ar', image: ''},
    {  id:'at',name: 'at', image: ''},
    {  id:'au',name: 'au', image: ''},
    {  id:'be',name: 'be', image: ''},
    {  id:'bg',name: 'bg', image: ''},
    {  id:'br',name: 'br', image: ''},
    {  id:'ca',name: 'ca', image: ''},
    {  id:'ch',name: 'ch', image: ''},
    {  id:'cn',name: 'cn', image: ''},
    {  id:'co',name: 'co', image: ''},
    {  id:'cu',name: 'cu', image: ''},
    {  id:'cz',name: 'cz', image: ''},
    {  id:'de',name: 'de', image: ''},
    {  id:'eg',name: 'eg', image: ''},
    {  id:'fr',name: 'fr', image: ''},
    {  id:'gb',name: 'gb', image: ''},
    {  id:'gr',name: 'gr', image: ''},
    {  id:'hk',name: 'hk', image: ''},
    {  id:'hu',name: 'hu', image: ''},
    {  id:'id',name: 'id', image: ''},
    {  id:'ie',name: 'ie', image: ''},
    {  id:'il',name: 'il', image: ''},
    {  id:'in',name: 'in', image: ''},
    {  id:'it',name: 'it', image: ''},
    {  id:'jp',name: 'jp', image: ''},
    {  id:'kr',name: 'kr', image: ''},
    {  id:'lt',name: 'lt', image: ''},
    {  id:'lv',name: 'lv', image: ''},
    {  id:'ma',name: 'ma', image: ''},
    {  id:'mx',name: 'mx', image: ''},
    {  id:'my',name: 'my', image: ''},
    {  id:'ng',name: 'ng', image: ''},
    {  id:'nl',name: 'nl', image: ''},
    {  id:'no',name: 'no', image: ''},
    {  id:'nz',name: 'nz', image: ''},
    {  id:'ph',name: 'ph', image: ''},
    {  id:'pl',name: 'pl', image: ''},
    {  id:'pt',name: 'pt', image: ''},
    {  id:'ro',name: 'ro', image: ''},
    {  id:'rs',name: 'rs', image: ''},
    {  id:'ru',name: 'ru', image: ''},
    {  id:'sa',name: 'sa', image: ''},
    {  id:'se',name: 'se', image: ''},
    {  id:'sg',name: 'sg', image: ''},
    {  id:'si',name: 'si', image: ''},
    {  id:'sk',name: 'sk', image: ''},
    {  id:'th',name: 'th', image: ''},
    {  id:'tr',name: 'tr', image: ''},
    {  id:'tw',name: 'tw', image: ''},
    {  id:'ua',name: 'ua', image: ''},
    {  id:'us',name: 'us', image: ''},
    {  id:'ve',name: 've', image: ''},
    {  id:'za',name: 'za', image: ''},


];

const domainsList = [
    {  id:'wsj.com',name: 'wsj.com', image: ''},
    {  id:'nytimes.com',name: 'nytimes.com', image: ''},


];countryList = [
    {  id:'ae',name: 'ae', image: ''},
    {  id:'ar',name: 'ar', image: ''},
    {  id:'at',name: 'at', image: ''},
    {  id:'au',name: 'au', image: ''},
    {  id:'be',name: 'be', image: ''},
    {  id:'bg',name: 'bg', image: ''},
    {  id:'br',name: 'br', image: ''},
    {  id:'ca',name: 'ca', image: ''},
    {  id:'ch',name: 'ch', image: ''},
    {  id:'cn',name: 'cn', image: ''},
    {  id:'co',name: 'co', image: ''},
    {  id:'cu',name: 'cu', image: ''},
    {  id:'cz',name: 'cz', image: ''},
    {  id:'de',name: 'de', image: ''},
    {  id:'eg',name: 'eg', image: ''},
    {  id:'fr',name: 'fr', image: ''},
    {  id:'gb',name: 'gb', image: ''},
    {  id:'gr',name: 'gr', image: ''},
    {  id:'hk',name: 'hk', image: ''},
    {  id:'hu',name: 'hu', image: ''},
    {  id:'id',name: 'id', image: ''},
    {  id:'ie',name: 'ie', image: ''},
    {  id:'il',name: 'il', image: ''},
    {  id:'in',name: 'in', image: ''},
    {  id:'it',name: 'it', image: ''},
    {  id:'jp',name: 'jp', image: ''},
    {  id:'kr',name: 'kr', image: ''},
    {  id:'lt',name: 'lt', image: ''},
    {  id:'lv',name: 'lv', image: ''},
    {  id:'ma',name: 'ma', image: ''},
    {  id:'mx',name: 'mx', image: ''},
    {  id:'my',name: 'my', image: ''},
    {  id:'ng',name: 'ng', image: ''},
    {  id:'nl',name: 'nl', image: ''},
    {  id:'no',name: 'no', image: ''},
    {  id:'nz',name: 'nz', image: ''},
    {  id:'ph',name: 'ph', image: ''},
    {  id:'pl',name: 'pl', image: ''},
    {  id:'pt',name: 'pt', image: ''},
    {  id:'ro',name: 'ro', image: ''},
    {  id:'rs',name: 'rs', image: ''},
    {  id:'ru',name: 'ru', image: ''},
    {  id:'sa',name: 'sa', image: ''},
    {  id:'se',name: 'se', image: ''},
    {  id:'sg',name: 'sg', image: ''},
    {  id:'si',name: 'si', image: ''},
    {  id:'sk',name: 'sk', image: ''},
    {  id:'th',name: 'th', image: ''},
    {  id:'tr',name: 'tr', image: ''},
    {  id:'tw',name: 'tw', image: ''},
    {  id:'ua',name: 'ua', image: ''},
    {  id:'us',name: 'us', image: ''},
    {  id:'ve',name: 've', image: ''},
    {  id:'za',name: 'za', image: ''},


];



export default class ApplyFilterScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sortBy: '',//
            FilterPublisher: '',//
            isDateTimePickerVisible: false,
            FromDate: Moment().format('DD MMM YYYY'),
            SelectFoormDateFormated: Moment().format('YYYY-MM-DD'),
            publishersList: publishersList,
            categoryList: categoryList,
            languageList: languageList,
            domainsList: domainsList,
            SelectPublPostion: 0,
            SelectCatPostion: 0,
            SelectLangPostion: 0,
            SelectDomainsPostion: 0,
        }
    }

    onSelect(index, value) {
        this.setState({
            sortBy: `${value} `
        })
    }

    onSelectSort(index, value) {
        this.setState({
            FilterPublisher: `${value}`
        })
    }

    _handleDatePickedFrom = (date) => {
        console.log('A date has been picked: ', date);
        Moment.locale('en');

        this.setState({
            FromDate: "" + Moment(date).format('DD MMM YYYY'),
            SelectFoormDateFormated: "" + Moment(date).format('YYYY-MM-DD'),
        })
        this._hideDateTimePicker();
    };

    _showDateTimePicker = () => this.setState({isDateTimePickerVisible: true});

    _hideDateTimePicker = () => this.setState({isDateTimePickerVisible: false});


    render() {
        return (

            <Container>
                <Header style={{backgroundColor: Colors.appTheme}}
                        androidStatusBarColor={Colors.appTheme}
                        iosBarStyle="light-content">
                    <Left>
                        <Button transparent
                                onPress={() => this.props.navigation.navigate('BottomTabNavigator')}>
                            <Icon name='arrow-back'/>

                        </Button>
                    </Left>

                    <Body>
                    <Title>Apply Filter</Title>

                    </Body>

                    <Right/>

                </Header>

                <Content>

                    <Card style={[Style.cardStyle,{marginLeft:10,marginRight:10,marginTop:10}]}>

                        <CardItem>

                            <View style={{width: '100%'}}>


                                <View style={{flex: 1, flexDirection: 'row'}}>

                                    <View style={{width: '80%', height: 40}} >
                                        <Text numberOfLines={1} style={{
                                            marginTop: 10,
                                            fontWeight: 'bold',
                                            fontFamily: 'Cochin',
                                            marginLeft: 10,
                                            color: Colors.appTheme,
                                            fontSize: 18
                                        }}>Search From Date :</Text>
                                    </View>
                                    <View style={{width: '20%', height: 40,justifyContent: 'center',alignItems: "flex-end"}} >
                                        <Image style={{width: 25, height: 25,tintColor:Colors.appTheme}}
                                               source={require('../themes/image/icon_date.png')}/>
                                    </View>

                                </View>


                                <TouchableOpacity onPress={this._showDateTimePicker}>
                                    <Text numberOfLines={1} style={{
                                        marginTop: 10,
                                        fontFamily: 'Cochin',
                                        marginLeft: 10,
                                        color: Colors.black,
                                        fontSize: 18
                                    }}>{this.state.FromDate}</Text>
                                </TouchableOpacity>

                                <DateTimePicker


                                    isVisible={this.state.isDateTimePickerVisible}
                                    onConfirm={this._handleDatePickedFrom}
                                    onCancel={this._hideDateTimePicker}
                                />

                                <View style={{flex: 1, flexDirection: 'row'}}>

                                    <View style={{width: '80%', height: 40}} >
                                        <Text numberOfLines={1} style={{
                                            marginTop: 10,
                                            fontWeight: 'bold',
                                            fontFamily: 'Cochin',
                                            marginLeft: 10,
                                            color: Colors.appTheme,
                                            fontSize: 18
                                        }}>Sort By :</Text>
                                    </View>
                                    <View style={{width: '20%', height: 40,justifyContent: 'center',alignItems: "flex-end"}} >
                                        <Image style={{width: 25, height: 25,tintColor:Colors.appTheme}}
                                               source={require('../themes/image/icon_latest_storys.png')}/>
                                    </View>

                                </View>

                                <RadioGroup
                                    size={18}
                                    thickness={1.5}
                                    color={Colors.black}
                                    /*selectedIndex={0}*/
                                    onSelect={(index, value) =>
                                        this.onSelect(index, value)}>


                                    <RadioButton value={'popularity'}>
                                        <Text>popularity</Text>
                                    </RadioButton>

                                    <RadioButton value={'publishedAt'}>
                                        <Text>publishedAt</Text>
                                    </RadioButton>
                                </RadioGroup>


                                <Text numberOfLines={2} style={{
                                    marginTop: 2,
                                    fontWeight: 'bold',
                                    fontFamily: 'Cochin',
                                    marginLeft: 10,
                                    color: Colors.mainHeading,
                                    fontSize: 16
                                }}>Selected Sort By : {this.state.sortBy}</Text>



                            </View>


                        </CardItem>

                    </Card>

                    <Card style={[Style.cardStyle,{marginLeft:10,marginRight:10,marginTop:10}]}>

                        <CardItem>

                            <View style={{width: '100%'}}>


                                <View style={{flex: 1, flexDirection: 'row'}}>

                                    <View style={{width: '80%', height: 40}} >
                                        <Text numberOfLines={1} style={{
                                            marginTop: 10,
                                            fontWeight: 'bold',
                                            fontFamily: 'Cochin',
                                            marginLeft: 10,
                                            color: Colors.appTheme,
                                            fontSize: 18
                                        }}>Publishers :</Text>
                                    </View>
                                    <View style={{width: '20%', height: 40,justifyContent: 'center',alignItems: "flex-end"}} >
                                        <Image style={{width: 25, height: 25,tintColor:Colors.appTheme}}
                                               source={require('../themes/image/icon_publisher.png')}/>
                                    </View>

                                </View>


                                <FlatList
                                    ref={(ref) => { this.flatListRef = ref; }}
                                    horizontal = {true}
                                    data={this.state.publishersList}
                                    onScroll={this.handleScroll}
                                    renderItem={({ item: rowData ,index}) => {
                                        return (
                                            <TouchableOpacity
                                                onPress={ () =>
                                                this.setState({
                                                    SelectPublPostion:index})}>

                                                <Card
                                                title={null}
                                                image={{ uri: rowData.imageUrl }}
                                                containerStyle={{ padding: 0, width: 160 }}>
                                                <Text style={{ padding: 10,backgroundColor: index===this.state.SelectPublPostion?Colors.cardNormal:Colors.cardNormal }}>
                                                    {rowData.name}
                                                </Text>
                                            </Card>
                                            </TouchableOpacity>
                                        );
                                    }}
                                    keyExtractor={(item, index) => index}
                                />

                                <Text numberOfLines={1} style={{
                                    marginTop: 2,
                                    fontWeight: 'bold',
                                    fontFamily: 'Cochin',
                                    marginLeft: 10,
                                    color: Colors.appTheme,
                                    fontSize: 16
                                }}>Selected Publishers : {this.state.publishersList[this.state.SelectPublPostion].name} </Text>


                                <View style={{flex: 1, flexDirection: 'row'}}>

                                    <View style={{width: '80%', height: 40}} >
                                        <Text numberOfLines={1} style={{
                                            marginTop: 10,
                                            fontWeight: 'bold',
                                            fontFamily: 'Cochin',
                                            marginLeft: 10,
                                            color: Colors.appTheme,
                                            fontSize: 18
                                        }}>Domains :</Text>
                                    </View>
                                    <View style={{width: '20%', height: 40,justifyContent: 'center',alignItems: "flex-end"}} >
                                        <Image style={{width: 25, height: 25,tintColor:Colors.appTheme}}
                                               source={require('../themes/image/icon_domain.png')}/>
                                    </View>

                                </View>

                                <FlatList
                                    ref={(ref) => { this.flatListRef = ref; }}
                                    horizontal = {true}
                                    data={this.state.domainsList}
                                    onScroll={this.handleScroll}
                                    renderItem={({ item: rowData ,index}) => {
                                        return (
                                            <TouchableOpacity
                                                onPress={ () =>
                                                    this.setState({
                                                        SelectDomainsPostion:index})}>

                                                <Card
                                                    title={null}
                                                    image={{ uri: rowData.imageUrl }}
                                                    containerStyle={{ padding: 0, width: 160 }}>
                                                    <Text style={{ paddingLeft:20,paddingRight:20,paddingTop:10,paddingBottom:10,backgroundColor: index===this.state.SelectPublPostion?Colors.cardNormal:Colors.cardNormal }}>
                                                        {rowData.name}
                                                    </Text>
                                                </Card>
                                            </TouchableOpacity>
                                        );
                                    }}
                                    keyExtractor={(item, index) => index}
                                />

                                <Text numberOfLines={1} style={{
                                    marginTop: 2,
                                    fontWeight: 'bold',
                                    fontFamily: 'Cochin',
                                    marginLeft: 10,
                                    color: Colors.appTheme,
                                    fontSize: 16
                                }}>Selected Domain : {this.state.domainsList[this.state.SelectDomainsPostion].name} </Text>



                            </View>

                        </CardItem>

                    </Card>

                    <Button block
                            style={{
                                marginRight: 20,
                                marginLeft: 20,
                                marginTop: 20,
                                marginBottom: 10,
                                backgroundColor:Colors.appTheme,
                            }}
                            onPress={() => {

                                if (Moment().diff(this.state.SelectFoormDateFormated, 'days') < 28) {

                                    AppGlogal.SortBy = this.state.sortBy === "" ? "publishedAt" : this.state.sortBy,
                                        AppGlogal.Publisher = this.state.publishersList[this.state.SelectPublPostion].id,
                                        AppGlogal.Domains = ""+this.state.domainsList[this.state.SelectDomainsPostion].id,
                                        AppGlogal.FromDate = this.state.SelectFoormDateFormated === "" ? Moment().format('DD MMM YYYY') : this.state.SelectFoormDateFormated,
                                        this.props.navigation.navigate('BottomTabNavigator')

                                    const {params} = this.props.navigation.state;
                                    params.CallHome();

                                } else {
                                    Alert.alert("You are trying to request results too far in the past. Your plan permits you to request articles as far back. To extend this please upgrade your subscription" + Moment().diff(this.state.SelectFoormDateFormated, 'days'))
                                    // Alert.alert("" +Moment().diff(this.state.SelectFoormDateFormated, 'days'))
                                }


                            }
                            }>
                        <Text>Apply</Text>
                    </Button>

                </Content>

            </Container>
        );
    }


    componentDidMount() {

        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        console.log('Start');
        // Alert.alert("" + AppGlogal.SortBy)
    }

    componentWillUnmount() {

        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton = () => {
        this.props.navigation.navigate('HomeScreen')
        return true;
    }

}

