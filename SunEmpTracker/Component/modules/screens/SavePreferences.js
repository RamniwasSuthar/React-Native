import React, {Component} from "react";
import {Image, Alert, TouchableOpacity, TouchableHighlight, StyleSheet, View, Dimensions, ActivityIndicator, FlatList, StatusBar, BackHandler} from 'react-native';
import {Container, Header, Title, Content, Button, Icon, Left, Right, Body, Text, ListItem, Subtitle, List, Thumbnail, CardItem, Card, Item, Input} from "native-base";
import Colors from '../../thems/Colors'
import Style from '../../thems/Style'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import CheckboxFormX from 'react-native-checkbox-form';

var radio_props = [
    {label: 'Male', value: "Male" },
    {label: 'Female', value: "Female" },
    {label: 'Other', value: "Other" }
];
const mockData = [
    {
        label: 'MCA',
        value: 'Mca'
    },
    {
        label: 'M.Tech',
        value: 'mTech'
    },
    {
        label: 'Phd',
        value: 'Phd'
    },
];



export default class SavePreferences extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: radio_props[0].value,
            selectedCheckBox: '',
        };
    }

    _onSelect = ( item ) => {
        console.warn(item);

    };

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton = () => {
        Alert.alert(
            'Emp Tracker',
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
                <Header style={{backgroundColor: Colors.appTheme}}
                           androidStatusBarColor={Colors.appThemeStatusbar}
                           iosBarStyle="light-content" >

                    <Left>

                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('DrawerNavigator')}>
                            <Image style={{width: 30, height: 30,marginLeft:10,marginRight:20}}
                                   source={require('../images/nav_back.png')}/>

                        </TouchableOpacity>
                    </Left>
                    <Body>
                    <Text style={{
                        fontSize: 18, color: Colors.white,
                        fontWeight: 'bold', marginRight: 10
                    }}>Save Preference</Text>
                    </Body>
                    <Right>

                    </Right>
                </Header>
                <Content style={Style.DefultContentPaddingColor}>

                    <View  style={Style.itemWithIconBoder}>
                        <Item>
                            <Icon active name='home' />
                            <Input placeholder='Enter first name'/>
                        </Item>
                    </View>
                    <View  style={Style.itemWithIconBoder}>
                        <Item>
                            <Icon active name='home' />
                            <Input placeholder='Enter last name'/>
                        </Item>
                    </View>
                    <View style={{marginLeft:10}}>
                        <Text style={{marginTop:20,marginBottom:10,color:Colors.green}}>
                            Gender
                        </Text>

                        <RadioForm
                            radio_props={radio_props}
                            labelHorizontal={true}
                            labelColor={Colors.black}
                            initial={0} // you can set as per requirement, initial i set here 0 for male
                            // initial={-1} // you can set as per requirement, initial i set here 0 for male
                            buttonSize={10} // size of radiobutton
                            buttonOuterSize={20}
                            selectedButtonColor={Colors.black}
                            selectedLabelColor={Colors.black}//text color
                            buttonColor={Colors.black}
                            animation={true}
                            formHorizontal={true}//flexdirection row
                            labelStyle={{marginRight: 10,fontSize:20}}//this command is used to style on texts
                            onPress={(value) => {this.setState({
                                value:value,
                                selectedOption:value
                            })}}
                        />
                    </View>


                    <View style={{ marginLeft:10,marginTop:2}} >

                        <Text style={{marginTop:15,marginBottom:10,color:Colors.green}}>
                            Education Qualification
                        </Text>
                        <CheckboxFormX
                            style={{ width: 350,marginLeft:5  }}
                            dataSource={mockData}
                            itemShowKey="label"
                            checkedImage={<Icon name="check-circle" type="solid" color="#84E17F" size={45} />}
                            itemCheckedKey="checked"
                            iconSize={30}
                            iconColor={Colors.black}
                            formHorizontal={true}
                            labelHorizontal={true}
                            o
                            onChecked={(item) => this._onSelect(item)}
                        />
                    </View>


                    <Text style={{marginTop:15,marginBottom:10,color:Colors.green}}>
                        {this.state.selectedCheckBox}
                    </Text>

                </Content>

            </Container>
        );
    }

}
