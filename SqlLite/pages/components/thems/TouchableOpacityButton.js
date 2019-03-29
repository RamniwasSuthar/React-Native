/*Custom Button*/
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Colors from '../thems/styles/Colors'
const Mybutton = props => {
  return (
    <TouchableOpacity
        style={styles.button}
        onPress={props.customClick}>
      <Text style={styles.text}>{props.title}</Text>
    </TouchableOpacity>
  );
};
 
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#62aa7c',
    color: '#ffffff',
    padding: 10,
    marginTop: 25,
    marginLeft: 15,
    marginRight: 15,
  },
  text: {
    color: '#ffffff',
  },
});
export default Mybutton;