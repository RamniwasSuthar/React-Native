/*Screen to update the user*/
import React from 'react';
import { View, YellowBox, ScrollView, KeyboardAvoidingView, Alert, } from 'react-native';
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
      user_name: '',
      user_contact: '',
      user_address: '',
    };
  }

    async searchUserById() {
        const result = await LocalDatabase.getAlluserByID(this.state.input_user_id);
        console.log("\n Getting All Data Inside class :-   - " + JSON.stringify(result));
        var len = result.length;
        console.log("Length :- "+len);
        if (len > 0) {
            this.setState({
                user_name:result[0].user_name,
                user_contact:result[0].user_contact,
                user_address:result[0].user_address,
            });
        }else{
            alert('No user found');
            this.setState({
                user_name:'',
                user_contact:'',
                user_address:'',
            });
        }
    }

    async updateUserData() {

        var that=this;
        const { input_user_id } = this.state;
        const { user_name } = this.state;
        const { user_contact } = this.state;
        const { user_address } = this.state;
        if (user_name){
            if (user_contact){
                if (user_address){
                    await LocalDatabase.updateUser(this,user_name,user_contact,user_address,input_user_id);
                }else{
                    alert('Please fill Address');
                }
            }else{
                alert('Please fill Contact Number');
            }
        }else{
            alert('Please fill Name');
        }


    }

  render() {
    return (
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView
            behavior="padding"
            style={{ flex: 1, justifyContent: 'space-between' }}>
            <Mytextinput
              placeholder="Enter User Id"
              style={{ padding:10 }}
              onChangeText={input_user_id => this.setState({ input_user_id })}
            />
            <Mybutton
              title="Search User"
              customClick={this.searchUserById.bind(this)}
            />
            <Mytextinput
              placeholder="Enter Name"
              value={this.state.user_name}
              style={{ padding:10 }}
              onChangeText={user_name => this.setState({ user_name })}
            />
            <Mytextinput
              placeholder="Enter Contact No"
              value={''+ this.state.user_contact}
              onChangeText={user_contact => this.setState({ user_contact })}
              maxLength={10}
              style={{ padding:10 }}
              keyboardType="numeric"
            />
            <Mytextinput
              value={this.state.user_address}
              placeholder="Enter Address"
              onChangeText={user_address => this.setState({ user_address })}
              maxLength={225}
              numberOfLines={5}
              multiline={true}
              style={{textAlignVertical : 'top', padding:10}}
            />
            <Mybutton
              title="Update User"
              customClick={this.updateUserData.bind(this)}
            />
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}