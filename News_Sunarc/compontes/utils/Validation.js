/**
 * Created by sunarcsarita on 6/3/19.
 */
import {
    StyleSheet,
    View,
    Alert, Text,
    TextInput,
    Button,
} from "react-native";
import  DailogHelper from '../../compontes/utils/DailogHelper';
import  AppGlogal from '../../compontes/utils/AppGlogal';

export default {
    validatePhoneNo(phoneNumber) {
        const reg = /^[0]?[789]\d{9}$/;
        if (reg.test(phoneNumber) === false) {
            alert("Phone is Not Correct")
            return false;
        } else {
            alert("Phone is Correct")
            return true;

        }
    },

    checkEmailNdPasswordEmptyString(emailAddress, passWord){
        if (emailAddress.trim() === "" || passWord.trim() === "")
            return true;
    },


    isEmpty(inputValue, error: String){

        console.log(inputValue + "\n" +
            error)
        if (inputValue.trim() !== "")
            return true;
        else {
            DailogHelper.showToast(AppGlogal.TOAST_WARNING, error)
            return false;
        }

    },


    validateEmail(email) {
        console.log();
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(email) === false) {
            console.log("Email is Not Correct");

            alert("Email is Not Correct")

            //    this.setState({email:text})
            return false;
        }
        else {
            alert("Email is Correct")
            // this.setState({email:text})
            console.log("Email is Correct");
        }
    }
}