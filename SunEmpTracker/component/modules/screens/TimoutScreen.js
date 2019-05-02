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


export default class TimoutScreen extends Component {


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


    render() {
        return (
            <Container>


                <Header style={{backgroundColor: '#7c898e'}}
                        androidStatusBarColor={'#5f6a6f'}
                        iosBarStyle="light-content">

                    <Body>

                    <Text style={{color: Colors.white, marginLeft: 20}}>
                        Timeout Screen
                    </Text>


                    </Body>
                    <Right/>


                </Header>


                <Content>



                    <Text style={{
                        fontSize: 18,
                        color: Colors.appTheme,
                        textAlign:'right',
                        marginRight:10,
                        backgroundColor: Colors.sectionHeaderBack,
                        fontWeight: 'bold'
                    }}>

                        Count Down
                    </Text>


                    <View style={{backgroundColor: Colors.white,marginTop: 3,
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        marginLeft:220,
                        justifyContent: 'center',
                        alignItems: 'center'}}>



                        <View style={{
                            height: 50,
                            width: 50,
                            borderColor: Colors.appTheme,
                            borderWidth: 1,
                            overflow: 'hidden',
                            borderRadius: 0,
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            justifyContent: 'space-around',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginLeft:5
                        }}>


                            <Text style={{
                                fontSize: 14,
                                color: Colors.appTheme,
                                backgroundColor: Colors.sectionHeaderBack,
                                fontWeight: 'bold'
                            }}>

                                ADD
                            </Text>


                        </View>

                        <View style={{
                            height: 50,
                            width: 50,
                            borderColor: Colors.appTheme,
                            borderWidth: 1,
                            overflow: 'hidden',
                            borderRadius: 0,
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            justifyContent: 'space-around',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginLeft:5
                        }}>


                            <Text style={{
                                fontSize: 14,
                                color: Colors.appTheme,
                                backgroundColor: Colors.sectionHeaderBack,
                                fontWeight: 'bold'
                            }}>

                                ADD
                            </Text>


                        </View>

                        <View style={{
                            height: 50,
                            width: 50,
                            borderColor: Colors.appTheme,
                            borderWidth: 1,
                            overflow: 'hidden',
                            borderRadius: 0,
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            justifyContent: 'space-around',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginLeft:5



                        }}>


                            <Text style={{
                                fontSize: 14,
                                color: Colors.appTheme,
                                backgroundColor: Colors.sectionHeaderBack,
                                fontWeight: 'bold'
                            }}>

                                ADD
                            </Text>


                        </View>

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
