import React , { ajax } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';

import { Toast} from 'antd-mobile-rn';
import {Actions} from "react-native-router-flux";

const Dimensions = require('Dimensions');
const width = Dimensions.get('window').width;

class Login extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            username:'',
            password:''
        }
    }

    login = () =>{
        if(this.state.username === ''){
            Toast.fail('用户名不得为空');

            return true;
        }
        if(this.state.password === ''){
            Toast.fail('密码不得为空');

            return true;
        }

        ajax({
            url:'login',
            method:'post',
            dataType:'json',
            async:true,
            data:this.state,
            success:(data) =>{
                if(data.id === 10000){
                    Toast.loading('正在登录,请稍后...', 1 , async()=>{
                        await AsyncStorage.setItem('token', data.token);
                        await AsyncStorage.setItem('page', 'my');

                        Actions.pop();
                        Actions.reset('Main');
                    })
                }else{
                    Toast.fail(data.msg)
                }
            }
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={{
                        textAlign:'center',
                        fontSize:20,
                        marginBottom:50
                    }}>我的博客</Text>
                </View>

                {/*账号和密码*/}
                <TextInput placeholder={'请输入账号'}
                           style={styles.textInputStyle}
                           underlineColorAndroid='transparent'
                           onChangeText={(text) =>{
                               this.setState({
                                   username:text
                               });
                           }}/>
                <TextInput placeholder={'请输入密码'}
                           style={styles.textInputStyle}
                           secureTextEntry={true}
                           underlineColorAndroid='transparent'
                           onChangeText={(text) =>{
                               this.setState({
                                   password:text
                               });
                           }}/>
                {/*登录*/}
                <TouchableOpacity style={styles.loginBtnStyle}
                                  onPress={()=>{
                                        this.login();
                                  }}>
                    <Text style={{
                        color:'#fff'
                    }}>登录</Text>
                </TouchableOpacity>
                {/*设置*/}
                <View style={styles.settingStyle}>
                    <Text onPress={()=>{
                        Toast.info('该功能未开发');
                    }}>记住密码</Text>
                    <Text  onPress={()=>{
                        Toast.info('暂不提供注册功能');
                    }}>新用户</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        paddingTop:100
    },
    textInputStyle:{
        backgroundColor:'white',
        width:width,
        height:40,
        marginBottom:1,
        textAlign:'center',
        paddingLeft:15,
    },
    loginBtnStyle:{
        height:40,
        width:width*0.8,
        backgroundColor:'#1890FF',
        marginTop:30,
        marginBottom:30,
        //flex布局
        justifyContent:'center',
        alignItems:'center',
        borderRadius:8
    },
    settingStyle:{
        flexDirection:'row',
        width:width*0.8,
        justifyContent:'space-between',
    },
    otherLoginStyle: {
        flexDirection:'row',
        alignItems:'center',
        position:'absolute',
        bottom:10,
        left:20
    },
    otherImageStyle:{
        width:50,
        height:50,
        borderRadius:25,
        marginLeft:10,
    },
});

export default Login;