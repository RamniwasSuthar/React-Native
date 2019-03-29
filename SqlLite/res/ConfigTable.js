import React, {Component} from 'react';
import {localDB} from './Constant';
import {Platform, StyleSheet, Text, View, Alert} from 'react-native';

import {openDatabase} from 'react-native-sqlite-storage';
var db = openDatabase({name: 'UserDatabase.db'});


export default class CreateTable extends Component {

    static createTable() {
        return new Promise((resolve, reject) => {
            db.transaction(function (txn) {
                txn.executeSql(
                    "SELECT name FROM sqlite_master WHERE type='table' AND name='${localDB.tableName.tableUser}'",
                    [],
                    function (tx, res) {
                        console.log('item:', res.rows.length);
                        if (res.rows.length === 0) {

                            //create table user

                            txn.executeSql('DROP TABLE IF EXISTS '+localDB.tableName.tableUser, []);
                            txn.executeSql(
                                'CREATE TABLE IF NOT EXISTS '+localDB.tableName.tableUser+'(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_contact INT(10), user_address VARCHAR(255))',
                                []
                            );


                            //create table login

                            txn.executeSql('DROP TABLE IF EXISTS '+localDB.tableName.tableLogin, []);
                            txn.executeSql(
                                'CREATE TABLE IF NOT EXISTS '+localDB.tableName.tableLogin+'(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_password INT(10))',
                                []
                            );

                        }
                    }
                );
            });
        });
    }

}