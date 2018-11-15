import React , { ajax }from 'react';
import { ScrollView , View , Text , Image} from 'react-native';

import { Header } from 'react-native-elements';

import { List} from 'antd-mobile-rn';

import Icon from 'react-native-vector-icons/FontAwesome'
import {Actions} from "react-native-router-flux";


class BlogList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            list:[],
            title:'列表'
        };
    }

    componentDidMount(){
        this.getBlogList();
    }

    goBlogDetail = (id) =>{
        Actions.pop();
        Actions.Detail({
            id: id
        })
    };

    getBlogList = () =>{
        ajax({
            url:'getBlogList',
            method:'post',
            dataType:'json',
            async:true,
            data:{
                id:this.props.navigation.state.params.id
            },
            success:(data) =>{
                if(data.id === 10000){
                    this.setState({
                        list:data.list,
                        title:data.name
                    })
                }
            }
        })
    };

    render() {
        return (
            <View style={{height:'100%'}}>
                <View>
                    <Header
                        leftComponent={<Icon name='long-arrow-left' color='#fff' size={20}
                                             onPress={()=>{
                                                 Actions.pop()
                                             }} />}
                        centerComponent={{
                            text: this.state.title,
                            style: {
                                color: '#fff',
                                fontSize:20
                            }
                        }}
                        outerContainerStyles={{ backgroundColor: '#1890FF' }} />
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

export default BlogList;
