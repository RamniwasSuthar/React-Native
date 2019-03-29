/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {AppRegistry} from 'react-native';
import App from './App';
import mainScene from './Component/modules/screens/Dictionary/HomeSearch';
import bgMessaging from './Component/notification/bgMessaging';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);












// New task registration for firbase push notification
AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => bgMessaging); // <-- Add this line
