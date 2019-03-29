/**
 * Created by RN Suthar on 07-march-2019.
 */


import {AsyncStorage, Text, View, TextInput, StyleSheet} from 'react-native'


export default {

    LoginType: "LoginType",
    UserID: "userID",
    UserName: "UserName",
    Email: "Email",
    ProfileImage: "ProfileImage",
    Token: "Token",
    LoginTime: "LoginTime",
    Result: "",


    createLoginSesion(loginType, userID, userName, email, profileImage, token) {

        AsyncStorage.setItem(this.LoginType, loginType);
        AsyncStorage.setItem(this.UserID, userID);
        AsyncStorage.setItem(this.UserName, userName);
        AsyncStorage.setItem(this.Email, email);
        AsyncStorage.setItem(this.ProfileImage, profileImage);
        AsyncStorage.setItem(this.Token, token);
        AsyncStorage.setItem(this.LoginTime,  new Date());
        console.log("createLoginSesion");
    },


    // Set value in session single single

    setLoginType(){
        return AsyncStorage.getItem(this.LoginType)
    },
    setUserID(){
        return AsyncStorage.getItem(this.UserID)
    },
    setUserName(){
        return AsyncStorage.getItem(this.UserName)
    },
    setEmail(){
        return AsyncStorage.getItem(this.Email)
    },
    setProfileImage(){
        return AsyncStorage.getItem(this.ProfileImage)
    },


    // Get value from session

    getLoginType(){
        return AsyncStorage.getItem(this.LoginType)
    },
    getUserID(){
        return AsyncStorage.getItem(this.UserID)
    },
    getUserName(){
        return AsyncStorage.getItem(this.UserName)
    },
    getEmail(){
        return AsyncStorage.getItem(this.Email)
    },
    getProfileImage(){
        return AsyncStorage.getItem(this.ProfileImage)
    },
    getLastLoginTime(){
        return AsyncStorage.getItem(this.LoginTime)
    },


    getData(key) {

        try {
            console.log("Session value for key : " + key);
            AsyncStorage.getItem(key, (err, item) => {
                console.log("Session value  : " + item);
                return item
            });

        } catch (error) {
            // Handle errors here
        }
    },


    logout() {
        console.log("logout");
        return AsyncStorage.clear();

    },

    removeItem(keyName){
        AsyncStorage.removeItem(keyName);
    }

};
