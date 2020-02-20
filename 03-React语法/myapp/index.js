/**
 * @format
 */

import {AppRegistry} from 'react-native'; //注册APP所用
import App from './App';
//入口名称 appName
import {name as appName} from './app.json';

//注册根组件，第二个传递的是一个函数不是组件
AppRegistry.registerComponent(appName, () => App);
