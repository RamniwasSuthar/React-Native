/*Home Screen With buttons to navigate to diffrent options*/
import React from 'react';
import { View } from 'react-native';
import Mybutton from './components/thems/TouchableOpacityButton';
import NormallButton from './components/thems/NormallButton';
import Mytext from './components/thems/Mytext';
import Colors from './components/thems/styles/Colors';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'UserDatabase.db' });
import  CreateTable from '../res/ConfigTable';
 
export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
      CreateTable.createTable();
  }
 
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          flexDirection: 'column',
        }}>
        <Mytext text="SQLite Example" />
        <Mybutton
          title="Register"
          customClick={() => this.props.navigation.navigate('Register')}/>

        <Mybutton
          title="Update"
          customClick={() => this.props.navigation.navigate('Update')}/>

        <Mybutton
          title="View"
          customClick={() => this.props.navigation.navigate('View')}/>

        <Mybutton
          title="View All"
          customClick={() => this.props.navigation.navigate('ViewAll')}/>

        <Mybutton
          title="Delete"
          customClick={() => this.props.navigation.navigate('Delete')}/>

      </View>
    );
  }
}