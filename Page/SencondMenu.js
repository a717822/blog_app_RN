import React , { ajax } from 'react';
import {View, Text, ScrollView, AsyncStorage} from 'react-native';
import { List} from 'antd-mobile-rn';
import { Actions } from "react-native-router-flux";

import { Header } from 'react-native-elements';

import Icon from 'react-native-vector-icons/FontAwesome'

class SencondMenu extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            menuList:[],
            pid:this.props.navigation.state.params.id,
            name:'菜单'
        }
    }


    componentDidMount(){
        this.getAdminMenu();
    }

    // 得到对应权限的菜单
    getAdminMenu = async() =>{

        ajax({
            url:'getAdminMenu',
            method:'post',
            dataType:'json',
            async:true,
            data:{
                token:await AsyncStorage.getItem('token')
            },
            success:(data) =>{
                if(data.id === 10000){
                    let childMenu = [];
                    let name = '';

                    data.list.forEach((cate) =>{
                        cate.menu.forEach((parent)=>{
                            if(parent.id === this.state.pid){
                                name = parent.title
                            }

                            if(parent.child){
                                parent.child.forEach((c)=>{
                                    if(c.pid === this.state.pid){
                                        childMenu.push(c);
                                    }
                                })
                            }
                        });
                    });

                    this.setState({
                        menuList:childMenu,
                        name:name
                    });
                }
            }
        });
    };

    render() {
        return (
            <View>
                <View>
                    <Header
                        leftComponent={<Icon name='long-arrow-left' color='#fff' size={20}
                                             onPress={()=>{
                                                 Actions.pop()
                                             }} />}
                        centerComponent={{ text: this.state.name , style: { color: '#fff', fontSize:20} }}
                        outerContainerStyles={{ backgroundColor: '#1890FF' }} />
                </View>

                <ScrollView style={{height:'100%', backgroundColor:'#fff'}}>
                    <View>
                        <List>
                            {
                                this.state.menuList.map((m) =>{
                                    return  <List.Item key={m.id}
                                                       arrow="horizontal"
                                                       onClick={()=>{
                                                           Actions.TableList({
                                                               id:m.id,
                                                               title:m.title
                                                           })
                                                       }}>{m.title}</List.Item>
                                })
                            }

                        </List>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

export default SencondMenu