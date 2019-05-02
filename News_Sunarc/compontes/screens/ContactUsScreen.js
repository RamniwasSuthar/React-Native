import React, {Component} from 'react';
import {
    KeyboardAvoidingView,
    ScrollView,
    View,
    Image,
    StatusBar,
    TextInput,
    TouchableOpacity,
    Text, BackHandler,
} from 'react-native';
import {
    Icon ,Container,Button
} from 'native-base';
import  Colors from '../themes/Colors'
import  Style from '../themes/Style'
import Round_Button from '../themes/widget/Round_Button';
import FloatingInput from '../themes/widget/StackedLabel';
import MyStatusBar from '../themes/widget/MyStatusBar';
import Validation from '../utils/Validation';
import DailogHelper from '../utils/DailogHelper';
import AppGlogal from '../utils/AppGlogal';

export default class ContactUsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fullname: '',
            email: '',
            query: '',

        };
    }

    signUp = () => {
        alert("Team will contact shortly");
    };

    onBackPress = () => {
        this.props.navigation.navigate('HomeScreen')
    };

    onHomePress = () => {

    };

    contactUS = () => {


        if (Validation.isEmpty(this.state.fullname, "Please fill full name") &&
            Validation.isEmpty(this.state.email, "Please fill email") &&
            Validation.isEmpty(this.state.query, "Please fill your query")) {

            DailogHelper.showToast(AppGlogal.TOAST_SUCCESS, "We will contact you shortly ")

            this.props.navigation.navigate('HomeScreen')

        } else {
            DailogHelper.showToast(AppGlogal.TOAST_WARNING, "Please fill all filed !")
        }

    };


    render() {
        return (
            <Container>

                <MyStatusBar
                    showBackButton={true}
                    onBackPress={this.onBackPress.bind(this)}
                    showHomeButton={false}
                    onHomePress={this.onHomePress.bind(this)}
                    title='Contact Us'
                />


                <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{flexGrow: 1}}>
                        <KeyboardAvoidingView
                            behavior="padding"
                            style={{flex: 1, justifyContent: 'space-between'}}>

                            <View style={{
                                flex: 1,
                                alignItems: 'center',
                                backgroundColor: Colors.white
                            }}>


                                <View style={{
                                    height: '65%',
                                    width: '100%',
                                    backgroundColor: Colors.white,
                                    paddingTop: '20%',
                                    paddingBottom: '8%'
                                }}>

                                    <FloatingInput
                                        placeholder="FullName"
                                        onChangeText={value => this.setState({fullname: value})}
                                        source={require('../themes/image/icon_fullname.png')}
                                        blurOnSubmit={ true }

                                        returnKeyType={ "next" }
                                    />

                                    <FloatingInput
                                        placeholder="Email"
                                        onChangeText={value => this.setState({email: value})}
                                        source={require('../themes/image/icon_email.png')}
                                        blurOnSubmit={ true }
                                        returnKeyType={ "next" }

                                    />

                                    <FloatingInput
                                        placeholder="Query"
                                        onChangeText={value => this.setState({query: value})}
                                        source={require('../themes/image/icon_password.png')}
                                        blurOnSubmit={ true }
                                        returnKeyType={ "next" }

                                    />





                                </View>

                                <Button block
                                        style={{
                                            marginRight: 30,
                                            marginLeft: 30,
                                            marginTop: 30,
                                            marginBottom: 10,
                                            backgroundColor: Colors.appTheme,
                                        }}
                                        onPress={() => {
                                            this.contactUS();
                                        }
                                        }>
                                    <Text uppercase={true} style={{
                                        color: Colors.white,
                                        fontSize: 18

                                    }}>Submit</Text>
                                </Button>

                            </View>


                        </KeyboardAvoidingView>
                    </ScrollView>


            </Container>




        );
    }

    componentDidMount() {

        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

    }

    componentWillUnmount() {

        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton = () => {
        this.props.navigation.navigate('HomeScreen')
        return true;
    }
}

