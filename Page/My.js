import React , { ajax } from 'react';
import { View, Text , ScrollView , AsyncStorage } from 'react-native';
import { List , Toast} from 'antd-mobile-rn';
import {Actions} from "react-native-router-flux";

class My extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            menuList:[]
        }
    }


    componentDidMount(){
        this.getAdminMenu();
    }

    // 得到对应权限的菜单
    getAdminMenu = async() =>{
        const AdminMenu = await AsyncStorage.getItem('AdminMenu');
        if(AdminMenu !== null){
            this.setState({
                menuList:JSON.parse(AdminMenu)
            });
        }else{
            ajax({
                url:'getAdminMenu',
                method:'post',
                dataType:'json',
                async:true,
                data:{
                    token:await AsyncStorage.getItem('token')
                },
                success:async(data) =>{
                    if(data.id === 10000){
                        await AsyncStorage.setItem('AdminMenu' , JSON.stringify(data.list));
                        this.setState({
                            menuList:data.list
                        });
                    }
                }
            });
        }

    };

    render() {
        return (
            <ScrollView style={{
                flex: 1,
                backgroundColor: '#eee'
            }}
                        automaticallyAdjustContentInsets={false}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}>

                <View style={{
                    padding:50,
                    backgroundColor:'#1890FF'
                }}>
                    <Text style={{
                        color:'#fff'
                    }}>Admin,欢迎你</Text>
                </View>

                <View style={{
                    paddingBottom:50
                }}>
                    {
                        this.state.menuList.map((cate) =>{
                            return <List key={cate.id}
                                         renderHeader={
                                             () => {
                                                 return cate.title
                                             }
                                         }>
                                    {
                                        cate.menu.map((parent)=>{
                                            if(parent.pid === 0){
                                                return <List.Item  key={parent.id}
                                                                   arrow="horizontal"
                                                                   thumb={parent.img_url}
                                                                   onClick={() => {
                                                                       if(parent.id === 1){
                                                                           alert('数据显示')
                                                                       }else{
                                                                           if(parent.url){
                                                                               Actions.TableList({
                                                                                   id:parent.id,
                                                                                   title:parent.title
                                                                               });
                                                                           }else{
                                                                               Actions.SencondMenu({
                                                                                   id:parent.id
                                                                               });
                                                                           }
                                                                       }

                                                                   }}>
                                                            {parent.title}
                                                        </List.Item>
                                            }
                                        })
                                    }
                                    </List>
                        })
                    }
                    <List renderHeader={
                              () => '系统设置'
                          }>

                        <List.Item arrow="horizontal"
                                   onClick={() => {
                                       AsyncStorage.clear();


                                       Toast.success('退出登录成功');

                                       Actions.pop();
                                       Actions.reset('Main');
                                   }}>退出登录
                        </List.Item>
                    </List>


                </View>

            </ScrollView>
        )
    }
}

export default My