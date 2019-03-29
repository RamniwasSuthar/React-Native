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
import {Container, Header, Content, Toast} from "native-base";
import  AppGlogal from '../../compontes/utils/AppGlogal'



export default {


    showToast(toastType: int, Message: String){

        console.log("Message : "+Message +"\n Toast type : "+toastType)

        switch (toastType) {
            case AppGlogal.TOAST_DANGER:  // toast type showing danger
                Toast.show({
                    text: Message,
                    buttonText: "Okay",
                    type: "danger",
                    duration: AppGlogal.duration,
                    position: AppGlogal.positiontop
                });
                break;
            case AppGlogal.TOAST_SUCCESS:   // toast type showing success
                Toast.show({
                    text: Message,
                    buttonText: "Okay",
                    type: "success",
                    duration: AppGlogal.duration,
                    position: AppGlogal.positionbottom,
                    textStyle: { color: "yellow" },
                    buttonTextStyle: { color: "#ffffff" },
                    buttonStyle: { backgroundColor: "#5b7093" }
                });
                break;

            case AppGlogal.TOAST_WARNING:  // toast type showing warning
                Toast.show({
                    text: Message,
                    buttonText: "Okay",
                    type: "warning",
                    duration: AppGlogal.duration,
                    position: AppGlogal.positiontop
                });
                break;

            case AppGlogal.TOAST_DEFULT:  // toast type showing defult
                Toast.show({
                    text: Message,
                    buttonText: "Okay",
                    duration: AppGlogal.duration,
                    position: AppGlogal.positiontop
                });
                break;

            default:  // toast type showing defult
                Toast.show({
                    text: Message,
                    buttonText: "Okay",
                    duration: AppGlogal.duration,
                    position: AppGlogal.positiontop
                });
                break;
        }
    },

}