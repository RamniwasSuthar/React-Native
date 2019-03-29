import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Alert, AsyncStorage } from 'react-native';
import firebase from 'react-native-firebase';

//AIzaSyCtqoI35jTtQbC-TF1m8AIKN78Pzs3pFHI


import Navigator from './Component/modules/setup/routes';
type Props = {};
export default class App extends Component<Props> {
    async componentDidMount() {
        this.checkPermission();
        this.createNotificationListeners(); //add this line
    }

    componentWillUnmount() {
        this.notificationListener;
        this.notificationOpenedListener;
    }

    //1
    async checkPermission() {
        const enabled = await firebase.messaging().hasPermission();
        if (enabled) {
            this.getToken();
        } else {
            this.requestPermission();
        }
    }

    async createNotificationListeners() {
      /*
       * Triggered when a particular notification has been received in foreground
       * */

        const channel = new firebase.notifications.Android.Channel(
            'channelId',
            'Channel Name',
            firebase.notifications.Android.Importance.Max
        ).setDescription('A natural description of the channel');
        firebase.notifications().android.createChannel(channel);

        // the listener returns a function you can use to unsubscribe
        this.notificationListener = firebase.notifications()
            .onNotification((notification) => {
                if (Platform.OS === 'android') {

                    const localNotification = new firebase.notifications.Notification({
                        sound: 'default',
                        show_in_foreground: true,
                    }).setNotificationId(notification.notificationId)
                        .setTitle(notification.title)
                        .setSubtitle(notification.subtitle)
                        .setBody(notification.body)
                        //   .setData(notification.data)
                        .android.setChannelId('channelId') // e.g. the id you chose above
                        .android.setSmallIcon('@mipmap/ic_launcher_round') // create this icon in Android Studio
                        .android.setColor('#000000') // you can set a color here
                        .android.setPriority(firebase.notifications.Android.Priority.High);

                    firebase.notifications()
                        .displayNotification(localNotification)
                        .catch(err => console.error(err));

                } else if (Platform.OS === 'ios') {

                    const localNotification = new firebase.notifications.Notification()
                        .setNotificationId(notification.notificationId)
                        .setTitle(notification.title)
                        .setSubtitle(notification.subtitle)
                        .setBody(notification.body)
                        .setData(notification.data)
                        .ios.setBadge(notification.ios.badge);

                    firebase.notifications()
                        .displayNotification(localNotification)
                        .catch(err => console.error(err));

                }
            });


      /*
       * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
       * */
        this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
            const { title, body } = notificationOpen.notification;
            console.log('onNotificationOpened:');
            this.showAlert(title, body);
        });

      /*
       * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
       * */
        const notificationOpen = await firebase.notifications().getInitialNotification();
        if (notificationOpen) {
            const { title, body } = notificationOpen.notification;
            console.log('getInitialNotification:');
            this.showAlert(title, body);
        }
      /*
       * Triggered for data only payload in foreground
       * */
        this.messageListener = firebase.messaging().onMessage((message) => {
            //process data message
            console.log(JSON.stringify(message));
        });
    }

    //3
    async getToken() {
        let fcmToken = await AsyncStorage.getItem('fcmToken');
        if (!fcmToken) {
            fcmToken = await firebase.messaging().getToken();
            if (fcmToken) {
                // user has a device token
                console.log('fcmToken:', fcmToken);
                await AsyncStorage.setItem('fcmToken', fcmToken);
            }
        }
        console.log('fcmToken:', fcmToken);
        //Alert.alert(fcmToken)
    }

    //2
    async requestPermission() {
        try {
            await firebase.messaging().requestPermission();
            // User has authorised
            this.getToken();
        } catch (error) {
            // User has rejected permissions
            console.log('permission rejected');
        }
    }

    render() {
        return (
            <Navigator/>
        );
    }

    showAlert(title, body) {
        Alert.alert("Title :- "+title+"\n body :- "+ body)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});