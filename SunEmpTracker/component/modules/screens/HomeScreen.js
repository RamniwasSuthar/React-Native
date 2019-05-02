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
    BackHandler, Platform, SectionList
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

import  Colors from '../../thems/Colors'


export default class HomeScreen extends Component {


    componentWillUnmount() {

        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton = () => {
        Alert.alert(
            'Emp Treacker',
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

        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        console.log('Start');
        // Alert.alert("" + AppGlogal.SortBy)

        return true
    }


    GetSectionListItem = (item) => {
        Alert.alert(item)
    }

    render() {


        return (
            <Container>


                <Header style={{backgroundColor: '#8e2910'}}
                        androidStatusBarColor={'#8e2910'}
                        iosBarStyle="light-content">

                </Header>


                <Content>

                    <View style={styles.container}>
                        <SectionList
                            sections={[
                                {title: 'Bestsellers', data: ['Masala Dosa', 'Testy', 'Raj Kachori']},
                                {title: 'Thali and Platter', data: ['Bikash', 'Bingo', 'Baby']},
                                {title: 'Soups and Salads', data: ['cat', 'cathy', 'Charan']},
                                {title: 'Main Course', data: ['Deepak', 'Deepti', 'Dhananjay']},
                                {title: 'Breads', data: ['Fatay', 'Fanny', 'Fresher']},
                                {title: 'Rice', data: ['Fatay', 'Fanny', 'Fresher']},
                                {title: 'Fried Rice and Noodless', data: ['Fatay', 'Fanny', 'Fresher']},
                                {title: 'Sount India Dishes', data: ['Fatay', 'Fanny', 'Fresher']},
                                {title: 'Chinese Dishes', data: ['Fatay', 'Fanny', 'Fresher']},
                                {title: 'Fast Food', data: ['Fatay', 'Fanny', 'Fresher']},
                                {title: 'Bakery Dishes', data: ['Fatay', 'Fanny', 'Fresher']},
                                {title: 'Pizza and Pasta', data: ['Fatay', 'Fanny', 'Fresher']},
                                {title: 'Burger and Sandwich', data: ['Fatay', 'Fanny', 'Fresher']},
                                {title: 'Namkeens', data: ['Fatay', 'Fanny', 'Fresher']},
                                {title: 'Sweets', data: ['Fatay', 'Fanny', 'Fresher']},
                                {title: 'Accompaniments', data: ['Fatay', 'Fanny', 'Fresher']},
                                {title: 'Sesserts and Beverages', data: ['Fatay', 'Fanny', 'Fresher']},
                                {title: 'Meals', data: ['Fatay', 'Fanny', 'Fresher']},
                            ]}
                            renderSectionHeader={ ({section}) =>

                                <View>
                                    <Text style={styles.SectionHeader}> { section.title }</Text>
                                    <View style={{backgroundColor: Colors.sectionHeaderDivder, height: 1}}/>

                                </View>

                            }
                            renderItem={ ({item}) =>

                            <View style={{
                                flex: 1,
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'stretch',}}>

                                <View style={{flex: 1, flexDirection: 'row'}}>

                                    <View style={{width: '75%',  backgroundColor: Colors.white}} >

                                        <Item style={{borderBottomWidth:0}}>

                                            <Image style={{width: 15, height: 15,marginLeft:5,marginRight:5}}
                                                   source={require('../images/icon_veg.png')}/>
                                            <Text style={{ fontSize: 16, padding: 2, color: '#000',fontWeight:'bold'}}>
                                                { item }
                                            </Text>


                                        </Item>

                                        <Text style={{ fontSize: 15, color: Colors.grayText,marginLeft:30}}>
                                            In south Indian Dishes
                                        </Text>



                                        <Item style={{borderBottomWidth:0,marginLeft:30}}>

                                            <Icon name='star' size={10} style={{color:"#ffcc3b"}}/>
                                            <Icon name='star' size={10} style={{color:"#ffcc3b"}}/>
                                            <Icon name='star' size={10} style={{color:"#ffcc3b"}}/>
                                            <Icon name='star-half' size={10} style={{color:"#ffcc3b"}}/>
                                            <Icon name='star-half' size={10} style={{color:"#ffcc3b"}}/>





                                            <Text style={{ fontSize: 16,  color: Colors.grayText}}>
                                                1457 votes
                                            </Text>
                                        </Item>

                                        <Text style={{ marginLeft:30,fontSize: 16,  color: '#000',fontWeight:'bold'}}>
                                            ₹ 80
                                        </Text>

                                        <Text style={{ marginLeft:30,fontSize: 12,color: '#ff342f', backgroundColor: Colors.sectionHeaderBack}}> customizations available
                                        </Text>


                                    </View>


                                    <View style={{width: '25%',backgroundColor:Colors.white}} >

                                        <View style={{height:30,width:80,marginTop:30,borderColor:Colors.appTheme,borderWidth:1,overflow:'hidden',borderRadius:10,flexDirection:'row',flexWrap:'wrap',justifyContent:'space-around',justifyContent:'center',alignItems:'center'}} >


                                            <Text style={{fontSize: 14,color:Colors.appTheme, backgroundColor: Colors.sectionHeaderBack,fontWeight:'bold'}}>

                                                ADD
                                            </Text>



                                            <Text style={{marginLeft:16,fontSize: 14,color: Colors.appTheme, backgroundColor: Colors.sectionHeaderBack,fontWeight:'bold'}}>
                                                +
                                            </Text>
                                        </View>

                                    </View>
                                </View>




                                <View style={{height: 8, backgroundColor: Colors.sectionHeaderBack}} />
                            </View>





                            }
                            keyExtractor={ (item, index) => index }
                        />

                    </View>

                </Content>

            </Container>
        );
    }


}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#e5e5e5"
    },
    SectionHeader: {
        backgroundColor: Colors.sectionHeaderBack,
        fontSize: 20,
        padding: 5,
        color: Colors.black,
        fontWeight: 'bold'
    },
    SectionListItemS: {
        fontSize: 16,
        padding: 6,
        color: '#000',
        backgroundColor: '#F5F5F5'
    }
});
