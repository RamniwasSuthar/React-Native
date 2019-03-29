/*Example of SQLite Database in React Native*/
import React from 'react';
import {createStackNavigator,createAppContainer} from 'react-navigation';
import Colors from './pages/components/thems/styles/Colors';
import HomeScreen from './pages/HomeScreen';
import RegisterUser from './pages/RegisterUser';
import UpdateUser from './pages/UpdateUser';
import ViewUser from './pages/ViewUser';
import ViewAllUser from './pages/ViewAllUser';
import DeleteUser from './pages/DeleteUser';

const App = createStackNavigator({
    HomeScreen: {
        screen: HomeScreen,
        navigationOptions: {
            title: 'HomeScreen',
            headerStyle: { backgroundColor: '#62aa7c' },
            headerTintColor: '#ffffff',
        },
    },
    View: {
        screen: ViewUser,
        navigationOptions: {
            title: 'View User',
            headerStyle: { backgroundColor: '#62aa7c' },
            headerTintColor: '#ffffff',
        },
    },
    ViewAll: {
        screen: ViewAllUser,
        navigationOptions: {
            title: 'View All User',
            headerStyle: { backgroundColor: '#62aa7c' },
            headerTintColor: '#ffffff',
        },
    },
    Update: {
        screen: UpdateUser,
        navigationOptions: {
            title: 'Update User',
            headerStyle: { backgroundColor: '#f05555' },
            headerTintColor: '#ffffff',
        },
    },
    Register: {
        screen: RegisterUser,
        navigationOptions: {
            title: 'Register User',
            headerStyle: { backgroundColor: '#62aa7c' },
            headerTintColor: '#ffffff',
        },
    },
    Delete: {
        screen: DeleteUser,
        navigationOptions: {
            title: 'Delete User',
            headerStyle: { backgroundColor: '#62aa7c' },
            headerTintColor: '#ffffff',
        },
    },
});
export default createAppContainer(App);