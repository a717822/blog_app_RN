import React , { ajax }from 'react';
import { ScrollView , View , Text , Image , AsyncStorage} from 'react-native';

import { List} from 'antd-mobile-rn';
import {Actions} from "react-native-router-flux";

import { NoticeBar, WhiteSpace } from 'antd-mobile-rn'

class Find extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            list:[],
        };
    }

    componentDidMount(){
        this.getFindList();
    }

    goBlogDetail = (id) =>{
        Actions.pop();
        Actions.Detail({
            id: id
        })
    };

    getFindList = async() =>{
        let keyName = await AsyncStorage.getItem('keyName');
        let name = '';

        if(keyName !== null){
            name = keyName
        }

        ajax({
            url:'getFindList',
            method:'post',
            dataType:'json',
            async:true,
            data:{
                keyName:name
            },
            success:(data) =>{
                if(data.id === 10000){
                    this.setState({
                        list:data.list
                    })
                }
            }
        })
    };

    render() {
        return (
            <View style={{height:'100%'}}>

                <View style={{
                    marginBottom:20
                }}>
                    <WhiteSpace size="lg" />
                    <NoticeBar
                        onPress={() => alert('click')}
                        marqueeProps={{ loop: true, style: { fontSize: 12, color: 'red' } }}
                        mode="closable"
                        action={<Text style={{ color: '#a1a1a1' }}>不再提示</Text>}>
                        通知：推荐您最近浏览同一类型的文章
                    </NoticeBar>
                </View>


                <ScrollView style={{height:'100%',backgroundColor:'#fff'}}>
                    <List>
                        {
                            this.state.list.map((item) =>{
                                return  <List.Item extra={
                                    <Image source={{uri: item.imgsrc,}}
                                           style={{ width: 120, height: 80 }} />}
                                                   arrow="empty"
                                                   multipleLine={true}
                                                   wrap={true}
                                                   align='top'
                                                   key={item.id}
                                                   onClick={() => {
                                                       this.goBlogDetail(item.id)
                                                   }}>
                                    <View style={{marginBottom:5}}>
                                        <Text style={{
                                            color:'#333',
                                            fontSize:12
                                        }}>{item.title}</Text>
                                    </View>
                                    <View>
                                        <Text  style={{
                                            color:'#999',
                                            fontSize:10
                                        }}>{item.description}</Text>
                                    </View>
                                </List.Item>
                            })
                        }
                    </List>
                    <View style={{
                        padding:30
                    }}>
                        <Text style={{
                            textAlign:'center',
                            fontSize:10,
                            color:'#ccc'
                        }}>已经到底了~</Text>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

export default Find