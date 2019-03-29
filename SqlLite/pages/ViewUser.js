/*Screen to view single user*/
import React from 'react';
import {Text, View, Button} from 'react-native';
import Mytextinput from './components/thems/Mytextinput';
import Mybutton from './components/thems/TouchableOpacityButton';
import {openDatabase} from 'react-native-sqlite-storage';
var db = openDatabase({name: 'UserDatabase.db'});
import  LocalDatabase from '../res/database/UserDatabase';

export default class ViewUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input_user_id: '',
            userData: '',
        };
    }

    async fetchUserDataById() {
        const result = await LocalDatabase.getAlluserByID(this.state.input_user_id);
        console.log("\n Getting All Data Inside class :-   - " + JSON.stringify(result));

        var len = result.length;
        console.log("Length :- "+len);
        if (len > 0) {
            this.setState({
                userData: result[0],
            });
        }else{
            alert('No user found');
            this.setState({
                userData: {},
            });
        }


    }

    render() {
        return (
            <View>
                <Mytextinput
                    placeholder="Enter User Id"
                    onChangeText={input_user_id => this.setState({input_user_id})}
                    style={{padding: 10}}
                />
                <Mybutton
                    title="Search User"
                    customClick={this.fetchUserDataById.bind(this)}
                />
                <View style={{marginLeft: 35, marginRight: 35, marginTop: 10}}>
                    <Text>User Id: {this.state.userData.user_id}</Text>
                    <Text>User Name: {this.state.userData.user_name}</Text>
                    <Text>User Contact: {this.state.userData.user_contact}</Text>
                    <Text>User Address: {this.state.userData.user_address}</Text>
                </View>
            </View>
        );
    }
}