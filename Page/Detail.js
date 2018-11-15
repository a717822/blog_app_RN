import React , { ajax }from 'react';
import { ScrollView , View , Text , WebView , Dimensions , AsyncStorage} from 'react-native';

import { Header } from 'react-native-elements';

const deviceW = Dimensions.get('window').width;

import { WhiteSpace, WingBlank } from 'antd-mobile-rn';

import Icon from 'react-native-vector-icons/FontAwesome'
import {Actions} from "react-native-router-flux";


class Detail extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            blog:'',
            height:20
        };
    }

    componentDidMount(){
        this.getBlogMsg();
    }

    getBlogMsg = () =>{
        ajax({
            url:'getBlogDetail',
            method:'post',
            dataType:'json',
            async:true,
            data:{
                id:this.props.navigation.state.params.id
            },
            success:(data) =>{
                if(data.id === 10000){
                    this.setState({
                        blog:data.list[0]
                    },async()=>{
                        await AsyncStorage.setItem('keyName' , data.list[0].tags);
                    })
                }
            }
        })
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
                        centerComponent={{ text: '详情', style: { color: '#fff', fontSize:20} }}
                        outerContainerStyles={{ backgroundColor: '#1890FF' }} />
                </View>

                <ScrollView style={{height:'100%', backgroundColor:'#fff'}}>
                    <WhiteSpace />
                    <WingBlank>
                        <View>
                            <Text style={{
                                color:'#000',
                                fontSize:16,
                                marginBottom:20
                            }}>{this.state.blog.title}</Text>
                            <Text style={{
                                color:'#999',
                                fontSize:10
                            }}>{this.state.blog.description}</Text>
                        </View>

                        <View style={{width:deviceW * 0.9, height:this.state.height}}>
                            <WebView  source={{html: `<!DOCTYPE html>
                                                    <html>
                                                    <style>
                                                        h2{
                                                            font-size: 14px;
                                                        }
                                                        p, span , div{
                                                           font-size: 10px;
                                                        }
                                                        pre{
                                                            margin: 0 0 10px;
                                                            padding: 8px 16px 4px 10px;
                                                            background-color: #f6f8fa;
                                                            border: none;
                                                            overflow: auto;
                                                            font-size: 10px;
                                                        }
                                                         pre code{
                                                            display: block;
                                                            font-size: 10px;
                                                            line-height: 22px;
                                                            overflow-x: auto;
                                                            padding: 0;
                                                            color: #000;
                                                            white-space: pre;
                                                            word-wrap: normal;
                                                            background-color: #f6f8fa;
                                                            border-radius: 4px;
                                                        }
                                                        table tr ,table tr th ,table tr td  {
                                                            border: 1px solid #333;
                                                        }
                                                    </style>
                                                    <body>
                                                        ${this.state.blog.content?this.state.blog.content:'正在加载中'}
                                                    <script>
                                                        window.onload=function(){
                                                            window.location.hash = 1;
                                                            document.title = document.body.clientHeight;
                                                        }
                                                    </script>
                                                    </body>
                                                    </html>`,  baseUrl: ''}}
                                      style={{flex:1}}
                                      bounces={false}
                                      scrollEnabled={false}
                                      automaticallyAdjustContentInsets={true}
                                      contentInset={{top:0,left:0}}
                                      startInLoadingState={true}
                                      onNavigationStateChange={(title)=>{
                                          if(title.title !== undefined) {
                                              this.setState({
                                                  height:(parseInt(title.title)+200)
                                              });
                                          }
                                      }} />

                        </View>
                    </WingBlank>
                </ScrollView>
            </View>

        )
    }
}

export default Detail;
