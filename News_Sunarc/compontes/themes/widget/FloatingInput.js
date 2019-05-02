/*Custom TextInput*/
import { View, TextInput,Image } from 'react-native';
import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label } from 'native-base';
import  Colors from '../Colors'
const FloatingInput = props => {
  return (

      <View  style={{flex: 1, flexDirection: 'row',marginLeft:35,marginRight:35,marginTop:5,marginBottom:5}}>

          <View style={{width: 20, height: 20,
              alignSelf: 'center'}}>
              <Image style={{width: 20, height: 20,tintColor: Colors.floatingLabel}} source={props.source}/>
          </View>

          <View style={{ marginLeft: 5,flex: 1}}>
              <Item floatingLabel style={{borderColor:Colors.floatingLabel}}>
                  <Label  style={{fontSize:14, color: Colors.floatingLabel,fontFamily:'Feather' }}>{props.placeholder}</Label>
                  <Input
                      underlineColorAndroid="transparent"
                      placeholderTextColor={Colors.floatingLabel}
                      keyboardType={props.keyboardType}
                      onChangeText={props.onChangeText}
                      returnKeyType={props.returnKeyType}
                      numberOfLines={props.numberOfLines}
                      multiline={props.multiline}
                      onSubmitEditing={props.onSubmitEditing}
                      style={{padding: 5,color:Colors.black,fontFamily:'Feather',fontSize:14}}
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
export default FloatingInput;

