/**
 * @format
 */
import 'react-native-gesture-handler'
import {AppRegistry} from 'react-native';
// import Navigator from './src/Navigator';
import App from './src/App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
