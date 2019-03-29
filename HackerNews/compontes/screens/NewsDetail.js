import React, {Component} from 'react';
import {Container, Header, Left, Body, Right, Button, Icon, Title, Item, Input, Content} from 'native-base';
import Colors from "../thems/Colors";
import Style from "../thems/Style";
import {StyleSheet, WebView, ActivityIndicator, View, BackHandler} from 'react-native';

export default class NewsDetail extends Component {

    ActivityIndicatorLoadingView() {
        //making a view to show to while loading the webpage
        return (
            <ActivityIndicator
                color="#009688"
                size="large"
                style={styles.ActivityIndicatorStyle}
            />
        );
    }

    render() {
        return (
            <Container>
                <Header style={{backgroundColor: Colors.appTheme}}
                        androidStatusBarColor={Colors.appTheme}
                        iosBarStyle="light-content">
                    <Left>
                        <Button transparent
                                onPress={() => this.props.navigation.navigate('Home')}>
                            <Icon name='arrow-back'/>

                        </Button>
                    </Left>

                    <Body>
                    <Title>{this.props.navigation.state.params.title}</Title>

                    </Body>

                    <Right>
                        <Icon name='heart'/>
                    </Right>

                </Header>


                <WebView
                    style={styles.WebViewStyle}
                    source={{uri: this.props.navigation.state.params.url}}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    renderLoading={this.ActivityIndicatorLoadingView}
                    startInLoadingState={true}
                />


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
        this.props.navigation.navigate('Home')
        return true;
    }
}

const styles = StyleSheet.create({
    WebViewStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,

    },
    ActivityIndicatorStyle: {
        flex: 1,
        justifyContent: 'center',
    },
});
