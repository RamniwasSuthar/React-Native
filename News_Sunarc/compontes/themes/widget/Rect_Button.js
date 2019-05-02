
import React, { Component } from 'react';
import Colors from '../Colors'
import {    Button, Text } from 'native-base';

import Style from '../Style'
const RoundButton = props => {
  return (
    <Button  danger
        style={Style.RactButton}
        onPress={props.customClick}>
      <Text style={[Style.ButtonText,{color:Colors.appTheme,fontWeight:'bold'}]}>{props.title}</Text>
    </Button>
  );
};
 

export default RoundButton;