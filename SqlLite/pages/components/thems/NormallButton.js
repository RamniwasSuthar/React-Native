/*Custom Button*/
import React from 'react';
import { Button, Text, StyleSheet } from 'react-native';
const Mybutton = props => {
  return (
    <Button
        color="#841584"

        onPress={props.customClick}
        title={props.title}/>


  );
};
 
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#62aa7c',
    color: '#ffffff',
    padding: 10,
    marginTop: 25,
    marginLeft: 105,
    marginRight: 15,
  },
  text: {
    color: '#ffffff',
  },
});
export default Mybutton;