import React , { ajax }from 'react';
import { ScrollView , View , Text , Image} from 'react-native';

import { List , SearchBar} from 'antd-mobile-rn';
import {Actions} from "react-native-router-flux";


class SearchList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            list:[],
            display:'none'
        };
    }

    goBlogDetail = (id) =>{
        Actions.Detail({
            id: id
        })
    };

    getSearchList = (keyword) =>{
        ajax({
            url:'searchBlog',
            method:'post',
            dataType:'json',
            async:true,
            data:{
                title:keyword
            },
            success:(data) =>{
                if(data.id === 10000){
                    this.setState({
                        list:data.list,
                        display:'block'
                    })
                }
            }
        })
    };

    render() {
        return (
            <View style={{height:'100%'}}>
                <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
                    <SearchBar placeholder="Search" showCancelButton={false} onSubmit={(value)=>{
                        this.getSearchList(value)
                    }} />
                </View>

                <ScrollView style={{height:'100%',backgroundColor:'#fff'}}>
                    <List style={{
                        display:this.state.display
                    }}>
                        {
                            this.state.list.map((item) =>{
                                return  <List.Item extra={
                                    <Image source={{uri: item.imgsrc}}
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
                </ScrollView>
            </View>

        )
    }
}

export default SearchList;
