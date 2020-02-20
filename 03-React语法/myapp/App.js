import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,//相当于div
  Text,
  Image,
  ImageBackground,
  StatusBar,
} from 'react-native';
//创建一个组价ShowMyName，返回 hello + 你的名字,名字在调用的时候传入
import ShowMyName from "./components/ShowMyName";

//写一个 Counter ，返回一个数字文本和一个按钮，点击按钮，数字加一
import Counter from './components/Counter';

//创建一个组件，名为Hello，返回Helloworld，在APP组件中来调用
const Hello = () => {
  return (
      <Text>hello world!</Text>
  )
}

//声明一个app组件，指定了React$Node类型
//const App: () => React$Node = () => {
//typescript 严谨，可以指定类型
//JS  动态弱类型 灵活
//RN（react-native）、angular、vue3  基于typescript语法的
const App = () => {
  // let style = {
  //   width:100,
  //   height:100,
  //   backgroundColor:'red'
  // }
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>{/* 安全区域 */}
        <View>
          <Hello />
          <ShowMyName name='lishuang'/>
          <Counter />
        </View>

        <View style={styles.box}>
          {/* text是不会继承view的样式，如果使用继承，要套用一个text */}
          <Text style={[styles.txt,styles.size]}>
            <Text>inner01</Text>
            <Text>inner02</Text>
          </Text>
          <Text style={[styles.txt,styles.size]}>
            <Text>inner01</Text>
            <Text>inner02</Text>
          </Text>
        </View>

        <View>
          {/* 本地图片直接显示图片默认大小 */}
          <Image source={require('./assets/icon/user.png')}/>
          {/* 网络图片必须设置图片大小，否则不显示 */}
          <Image resizeMode="center" style={{width:100,height:50}} source={{uri:'https://facebook.github.io/react-native/img/tiny_logo.png'}}/>
          <ImageBackground 
              source={require('./assets/icon/user.png')} 
              style={{width:100, height:100}}
          >
              <Text>Inside</Text>
          </ImageBackground>
        </View>
      </SafeAreaView>
    </>
  );
};

//style中没有加入背景图片的属性
const styles = StyleSheet.create({
  box:{
    // width:100,
    // height:100,
    backgroundColor:'blue'
  },
  txt:{
    color:'red'
  },
  size:{
    fontSize:20
  }
});

export default App;