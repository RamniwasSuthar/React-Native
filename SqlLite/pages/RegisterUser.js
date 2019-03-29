/*Screen to register the user*/
import React from 'react';
import {View, ScrollView, KeyboardAvoidingView, Alert} from 'react-native';
import Mytextinput from './components/thems/Mytextinput';
import Mybutton from './components/thems/TouchableOpacityButton';
import CreateTabels from '../res/database/UserDatabase';
import {openDatabase} from 'react-native-sqlite-storage';
var db = openDatabase({name: 'UserDatabase.db'});

export default class RegisterUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_name: '',
            user_contact: '',
            user_address: '',
        };
    }

    register_user = () => {

        if (this.state.user_name) {
            if (this.state.user_contact) {
                if (this.state.user_address) {
                    CreateTabels.register_user(this.state.user_name, this.state.user_contact,
                        this.state.user_address, this)
                } else {
                    alert('Please fill Address');
                }
            } else {
                alert('Please fill Contact Number');
            }
        } else {
            alert('Please fill Name');
        }
    };

render()
{
    return (
        <View style={{backgroundColor: 'white', flex: 1}}>
            <ScrollView keyboardShouldPersistTaps="handled">
                <KeyboardAvoidingView
                    behavior="padding"
                    style={{flex: 1, justifyContent: 'space-between'}}>
                    <Mytextinput
                        placeholder="Enter Name"
                        onChangeText={user_name => this.setState({user_name})}
                        style={{padding: 10}}
                    />
                    <Mytextinput
                        placeholder="Enter Contact No"
                        onChangeText={user_contact => this.setState({user_contact})}
                        maxLength={10}
                        keyboardType="numeric"
                        style={{padding: 10}}
                    />
                    <Mytextinput
                        placeholder="Enter Address"
                        onChangeText={user_address => this.setState({user_address})}
                        maxLength={225}
                        numberOfLines={5}
                        multiline={true}
                        style={{textAlignVertical: 'top', padding: 10}}
                    />
                    <Mybutton
                        title="Submit"
                        customClick={

                            this.register_user.bind(this)
                        }
                    />
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    );
}
}