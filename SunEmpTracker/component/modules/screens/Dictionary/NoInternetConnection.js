import React, { Component } from 'react';
import { StyleSheet, View, Image,ImageBackground, Dimensions } from 'react-native';
 const {width, height} = Dimensions.get('window')

export default class noInternet extends Component { 
    render() {
        return (
            <View style={ styles.container }>

                <ImageBackground style={styles.noInternetBackground} source={require('../../../thems/bgimage.png')} >

                    <Image style={{resizeMode:'contain'}} source={require('../../../thems/tombstone.png')}/>
                    <Image style={{width:width*0.8, resizeMode:'contain'}} source={require('../../../thems/no_internet_text.png')}/>

                </ImageBackground>

            </View>

         );
    }
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'column',
    },

    noInternet: {
        flex: 1,
        resizeMode: 'cover',
    },

    noInternetBackground: {
        width: width,
        height:height,
        resizeMode: 'stretch',
        flexDirection:'column',
        justifyContent: 'center',
        alignItems: 'center'       
    },

});