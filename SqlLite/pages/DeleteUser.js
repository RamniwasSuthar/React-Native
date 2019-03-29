/*Screen to delete the user*/
import React from 'react';
import { Button, Text, View, Alert } from 'react-native';
import Mytextinput from './components/thems/Mytextinput';
import Mybutton from './components/thems/TouchableOpacityButton';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'UserDatabase.db' });
import  LocalDatabase from '../res/database/UserDatabase';

export default class UpdateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input_user_id: '',
    };
  }
    async updateUserData() {
        var that=this;
        const { input_user_id } = this.state;
        if (input_user_id){
            await LocalDatabase.deleteUserById(this,input_user_id);
        }else{
            alert('Please fill Delete ID');
        }


    }
 
  render() {
    return (
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        <Mytextinput
          placeholder="Enter User Id"
          onChangeText={input_user_id => this.setState({ input_user_id })}
          style={{ padding:10 }}
        />
        <Mybutton
          title="Delete User"
          customClick={this.updateUserData.bind(this)}
        />
      </View>
    );
  }
}