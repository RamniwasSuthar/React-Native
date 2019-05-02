import React, {Component} from 'react';
import {Button, Text} from 'native-base';

import Style from '../Style'
const RoundButton = props => {
    return (
        <Button rounded danger
                style={Style.RoundButton}
                onPress={props.customClick}>
            <Text style={Style.ButtonText}>{props.title}</Text>
        </Button>
    );
};


export default RoundButton;