import React, {Component} from 'react';
import {localDB} from '../Constant';
import {Platform, StyleSheet, Text, View, Alert} from 'react-native';

import {openDatabase} from 'react-native-sqlite-storage';
var db = openDatabase({name: 'UserDatabase.db'});


export default class UserDatabase extends Component {

    static register_user = (user_name, user_contact, user_address, context) => {
        var that = context;
        db.transaction(function (tx) {
            tx.executeSql(
                'INSERT INTO ' + localDB.tableName.tableUser + ' (user_name, user_contact, user_address) VALUES (?,?,?)',
                [user_name, user_contact, user_address],
                (tx, results) => {
                    console.log('Results', results.rowsAffected);
                    if (results.rowsAffected > 0) {

                        Alert.alert(
                            'Success',
                            'You are Registered Successfully',
                            [
                                {
                                    text: 'Ok',
                                    onPress: () =>
                                        that.props.navigation.navigate('HomeScreen'),
                                },
                            ],
                            {cancelable: false}
                        );
                    } else {
                        alert('Registration Failed');
                    }
                }
            );
        });
    };

    static getAlluserList() {
        return new Promise((resolve, reject) => {
            db.transaction(
                tx => {
                    tx.executeSql('SELECT * FROM ' + localDB.tableName.tableUser, [],
                        (tx, results) => {
                            var temp = [];
                            for (let i = 0; i < results.rows.length; ++i) {
                                temp.push(results.rows.item(i));
                                //console.log("Data - "+JSON.stringify(results.rows.item(i)));
                            }
                            console.log("\n Getting Database :- " + JSON.stringify(temp));

                            resolve(temp);
                        });
                }, null, null);
        });
    }

    static getAlluserByID(search_data_id) {
        console.log("\n Search ID :- " + search_data_id);
        return new Promise((resolve, reject) => {
            db.transaction(
                tx => {
                    tx.executeSql(
                        'SELECT * FROM ' + localDB.tableName.tableUser + ' where user_id = ?',
                        [search_data_id],
                        (tx, results) => {
                            var len = results.rows.length;
                            console.log('len', len);
                            console.log("\n Getting Database :- " + JSON.stringify(results.rows.item(0)));
                            if (len > 0) {
                                resolve([results.rows.item(0)]);
                            } else {
                                resolve([]);
                            }

                        }
                    );
                }, null, null);
        });
    }

    static updateUser(context, user_name, user_contact, user_address, input_user_id) {
        var that = context;
        return new Promise((resolve, reject) => {
            db.transaction(
                tx => {
                    tx.executeSql(
                        'UPDATE ' + localDB.tableName.tableUser + ' set user_name=?, user_contact=? , user_address=? where user_id=?',
                        [user_name, user_contact, user_address, input_user_id],
                        (tx, results) => {
                            console.log('Results', results.rowsAffected);
                            if (results.rowsAffected > 0) {
                                Alert.alert('Success', 'User updated successfully',
                                    [
                                        {text: 'Ok', onPress: () => that.props.navigation.navigate('HomeScreen')},
                                    ],
                                    {cancelable: false}
                                );
                            } else {
                                alert('Updation Failed');
                            }
                        }
                    );
                }, null, null);
        });
    }

    static deleteUserById(context, input_user_id) {
        console.log('input_user_id :- ', input_user_id);
        var that = context;
        return new Promise((resolve, reject) => {
            db.transaction(
                tx => {
                    tx.executeSql(
                        'DELETE FROM  ' + localDB.tableName.tableUser + ' where user_id=?',
                        [input_user_id],
                        (tx, results) => {
                            console.log('Results', results.rowsAffected);
                            if (results.rowsAffected > 0) {
                                Alert.alert(
                                    'Success',
                                    'User deleted successfully',
                                    [
                                        {
                                            text: 'Ok',
                                            onPress: () => that.props.navigation.navigate('HomeScreen'),
                                        },
                                    ],
                                    {cancelable: false}
                                );
                            } else {
                                alert('Please insert a valid User Id');
                            }
                        }
                    );
                }, null, null);
        });
    }
}
