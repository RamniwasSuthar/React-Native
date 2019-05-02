/*Custom TextInput*/
import { View, TextInput,Image } from 'react-native';
import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label } from 'native-base';
import  Colors from '../Colors'
const StackedLabel = props => {
  return (

      <View  style={{flex: 1, flexDirection: 'row',marginLeft:35,marginRight:35,marginTop:5,marginBottom:5}}>

        {/*  <View style={{width: 20, height: 20,
              alignSelf: 'center'}}>
              <Image style={{width: 20, height: 20,tintColor: Colors.floatingLabel}} source={props.source}/>
          </View>*/}

          <View style={{ marginLeft: 5,flex: 1}}>
              <Item stackedLabel style={{borderColor:Colors.gray}}>
                  <Label  style={{fontSize:14, color: Colors.black,fontFamily:'Feather' }}>{props.placeholder}</Label>

                  <Input
                      underlineColorAndroid="transparent"
                      placeholderTextColor={Colors.gray}
                      placeholder={"Enter "+props.placeholder}
                      keyboardType={props.keyboardType}
                      onChangeText={props.onChangeText}
                      returnKeyType={props.returnKeyType}
                      numberOfLines={props.numberOfLines}
                      multiline={props.multiline}
                      onSubmitEditing={props.onSubmitEditing}
                      style={{padding: 1,color:Colors.black,fontFamily:'Feather',fontSize:16}}
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
export default StackedLabel;

