import React from 'react';
import { View , Text , ScrollView , AsyncStorage} from 'react-native';

import { Header , Icon } from 'react-native-elements';

import Home from './Home'
import My from './My'
import Finder from './Find'

import { TabBar , Drawer , List } from 'antd-mobile-rn';
import { Actions } from "react-native-router-flux";

export default class BasicTabBarExample extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            selectedTab:'home',
        };
    }

    componentDidMount(){
        this.getStorage()
    }

    getStorage = async()=>{
        const page =  await AsyncStorage.getItem('page');

        if(page !== null){
            this.setState({
                selectedTab:page
            })
        }

    };

    onChangeTab(tabName) {
        this.setState({
            selectedTab: tabName,
        });
    }

    render() {
        const sidebar = (
            <ScrollView
                style={{ flex: 1, backgroundColor: '#fff' }}
                automaticallyAdjustContentInsets={false}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                <List renderHeader={() => '类别'}>
                    <List.Item arrow={'horizontal'} onClick={()=>{
                        this.drawer && this.drawer.closeDrawer();
                        Actions.BlogList({
                            id:3
                        })
                    }}>
                        <View>
                            <Text>Node.js</Text>
                        </View>
                    </List.Item>
                </List>
                <List>
                    <List.Item arrow={'horizontal'}  onClick={()=>{
                        this.drawer && this.drawer.closeDrawer()
                        Actions.BlogList({
                            id:1
                        })
                    }}>
                        <View>
                            <Text>PHP</Text>
                        </View>
                    </List.Item>
                </List>
                <List>
                    <List.Item arrow={'horizontal'}  onClick={()=>{
                        this.drawer && this.drawer.closeDrawer()
                        Actions.BlogList({
                            id:4
                        })
                    }}>
                        <View>
                            <Text>React & Vue</Text>
                        </View>
                    </List.Item>
                </List>
                <List>
                    <List.Item arrow={'horizontal'}  onClick={()=>{
                        this.drawer && this.drawer.closeDrawer()
                        Actions.BlogList({
                            id: 2
                        })
                    }}>
                        <View>
                            <Text>前端</Text>
                        </View>
                    </List.Item>
                </List>
            </ScrollView>
        );
        return (
            <View style={{
                height:'100%'
            }}>
                <Drawer
                    sidebar={sidebar}
                    position="left"
                    open={false}
                    drawerRef={(el) => (this.drawer = el)}
                    drawerBackgroundColor="#ccc"
                    drawerWidth={200}
                >
                    <TabBar
                        unselectedTintColor="#333"
                        tintColor="#1890FF"
                        barTintColor="#fff"
                    >
                        <TabBar.Item
                            title="主页"
                            icon={require('../images/home.png')}
                            selectedIcon={require('../images/select_home.png')}
                            selected={this.state.selectedTab === 'home'}
                            onPress={() => this.onChangeTab('home')}
                        >

                            <View>
                                <Header
                                    leftComponent={<Icon name="menu" color='#fff' onPress={
                                        () => this.drawer && this.drawer.openDrawer()
                                    } />}
                                    centerComponent={{ text: '我的博客', style: { color: '#fff', fontSize:20} }}
                                    rightComponent={<Icon name="search" color='#fff'  onPress={
                                        () => {
                                            Actions.SearchList();
                                        }
                                    } />}
                                    outerContainerStyles={{ backgroundColor: '#1890FF' }} />
                            </View>

                            <Home />


                        </TabBar.Item>
                        <TabBar.Item
                            title="推荐"
                            icon={require('../images/find.png')}
                            selectedIcon={require('../images/select_find.png')}
                            selected={this.state.selectedTab === 'find'}
                            onPress={() => this.onChangeTab('find')}
                        >
                            <Finder />

                        </TabBar.Item>
                        <TabBar.Item
                            title="我的"
                            icon={require('../images/my.png')}
                            selectedIcon={require('../images/select_my.png')}
                            selected={this.state.selectedTab === 'my'}
                            onPress={async() => {
                                const value = await AsyncStorage.getItem('token');
                                if(value === null){
                                    Actions.Login()
                                }else{
                                    this.onChangeTab('my')
                                }
                            }}
                        >
                            <My />
                        </TabBar.Item>
                    </TabBar>
                </Drawer>

            </View>
        );
    }
}