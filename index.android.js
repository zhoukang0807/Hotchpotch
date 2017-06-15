import {
    AppRegistry
} from 'react-native'; //AppRegistry是JS运行所有React Native应用的入口
import Root from './app/root'; //自定义的root组件为应用入口

AppRegistry.registerComponent('Hotchpotch', () => Root); //reading 为应用的名称需要和项目名一样
