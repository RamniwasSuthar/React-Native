/*Custom TextInput*/
import { View, TextInput,Image } from 'react-native';
import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label } from 'native-base';
import  Colors from '../Colors'
const RegularInput = props => {
  return (

      <View  style={{flex: 1, flexDirection: 'row',marginLeft:'10%',marginRight:'10%',marginTop:10}}>



          <View style={{flex: 1}}>
              <Item regular style={{borderColor:'rgba(255, 255, 255, 0.3)',backgroundColor:"rgba(52, 52, 52, 0.1)"}}>
                 {/* <Label  style={{fontSize:14, color: Colors.floatingLabel,fontFamily:'Feather' ,paddingLeft:10}}>{props.placeholder}</Label>*/}
                  <Input
                      underlineColorAndroid="transparent"
                      placeholderTextColor={Colors.white}
                      placeholder={props.placeholder}
                      keyboardType={props.keyboardType}
                      onChangeText={props.onChangeText}
                      returnKeyType={props.returnKeyType}
                      numberOfLines={props.numberOfLines}
                      multiline={props.multiline}
                      onSubmitEditing={props.onSubmitEditing}
                      style={{padding: 5,color:Colors.white,fontFamily:'Feather',fontSize:16,opacity:1}}
                      blurOnSubmit={props.blurOnSubmit}
                      autoFocus={false}
                      secureTextEntry={props.secureTextEntry}
                      ref={props.ref}
                      value={props.value}
                  />
              </Item>
          </View>

      </View>
  );
};
export default RegularInput;

