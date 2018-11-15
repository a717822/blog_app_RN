import React , { ajax }from 'react';
import { View, Text , StyleSheet , ScrollView , Image , TouchableOpacity} from 'react-native';
import { Actions } from 'react-native-router-flux';

import { Carousel  , Toast} from 'antd-mobile-rn';

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#fff',
    },
    containerHorizontal: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 150,
    },

    contentWrap:{
        backgroundColor:'#fff',
        marginBottom:20,
    },

    firstContentWrap:{
        marginTop:20,
        backgroundColor:'#fff',
        marginBottom:20,
    },

    homeTitle:{
        borderBottomWidth:1,
        borderBottomColor:'#eee',
        paddingTop:10,
        paddingBottom:10
    },

    contentTitle:{
        borderLeftWidth:2,
        borderLeftColor:'#1890FF',
        marginLeft:10,
        paddingLeft:20
    },

    blogContent:{
        padding:10,
        minHeight:120
    },

    blogTitle:{
        color: '#000'
    },
    blogText:{
        color:'#333',
        fontSize:14,
        marginBottom:10
    }
});

class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            fronts:[],
            servers:[],
            news:[],
            hots:[],
            banners:[]
        }
    }

    componentDidMount(){
        this.getIndexMsg();
    }

    getIndexMsg = ()=>{
        Toast.loading('正在加载...' , 3 );

        ajax({
            url:'getIndexMsg',
            method:'post',
            dataType:'json',
            async:true,
            success:(data) =>{
                if(data.id === 10000){
                    this.setState({
                        fronts:data.list.front,
                        news:data.list.new,
                        servers:data.list.server,
                        hots:data.list.hots,
                        banners:data.list.banners
                    });
                }
            }
        })
    };

    goDetail = (id) =>{
        Actions.Detail({
            id: id
        })
    };

    render() {
        return (
            <ScrollView style={{
                backgroundColor:'#fafafa'
            }}>

                <View>
                    <Carousel
                        style={styles.wrapper}
                        selectedIndex={0}
                        autoplay
                        infinite
                    >
                        {
                            this.state.banners.map((banner)=>{

                                return <TouchableOpacity key={banner.id} onPress={()=>{
                                    this.goDetail(banner.id)
                                }}>
                                            <View style={styles.containerHorizontal}>
                                                <Image source={{ uri: banner.imgSrc }}
                                                       style={{width:'100%',height:'100%'}} />

                                            </View>

                                            <Text  style={{
                                                padding:5,
                                                position:'absolute',
                                                zIndex:100,
                                                bottom:0,
                                                backgroundColor:'#000',
                                                color:'#fff',
                                                fontSize:10,
                                                width:'100%'
                                            }}>{banner.title}</Text>
                                        </TouchableOpacity>
                            })
                        }
                    </Carousel>
                </View>

                <View>

                    <View style={styles.firstContentWrap}>
                        <View style={styles.homeTitle}>
                            <View style={styles.contentTitle}>
                                <Text style={styles.blogTitle}>最新发布</Text>
                            </View>
                        </View>


                        <View style={styles.blogContent}>

                            {
                                this.state.news.map((n) =>{
                                    return  <Text style={styles.blogText} key={n.id} onPress={
                                                ()=>{
                                                    this.goDetail(n.id)
                                                }}>
                                                {n.title}
                                            </Text>
                                })
                            }

                        </View>

                    </View>

                    <View style={styles.contentWrap}>
                        <View style={styles.homeTitle}>
                            <View style={styles.contentTitle}>
                                <Text style={styles.blogTitle}>服务器端</Text>
                            </View>
                        </View>

                        <View style={styles.blogContent}>

                            <View style={styles.blogContent}>

                                {
                                    this.state.servers.map((server) =>{
                                        return  <Text style={styles.blogText} key={server.id} onPress={
                                            ()=>{
                                                this.goDetail(server.id)
                                            }}>
                                            {server.title}
                                        </Text>
                                    })
                                }

                            </View>

                        </View>

                    </View>

                    <View style={styles.contentWrap}>
                        <View style={styles.homeTitle}>
                            <View style={styles.contentTitle}>
                                <Text style={styles.blogTitle}>前端</Text>
                            </View>
                        </View>

                        <View style={styles.blogContent}>

                            <View style={styles.blogContent}>

                                {
                                    this.state.fronts.map((front) =>{
                                        return  <Text style={styles.blogText} key={front.id} onPress={
                                            ()=>{
                                                this.goDetail(front.id)
                                            }}>
                                            {front.title}
                                        </Text>
                                    })
                                }

                            </View>

                        </View>
                    </View>

                    <View style={styles.contentWrap}>
                        <View style={styles.homeTitle}>
                            <View style={styles.contentTitle}>
                                <Text style={styles.blogTitle}>热门文章</Text>
                            </View>
                        </View>

                        <View style={styles.blogContent}>

                            <View style={styles.blogContent}>

                                {
                                    this.state.hots.map((hot) =>{
                                        return  <Text style={styles.blogText} key={hot.id} onPress={
                                            ()=>{
                                                this.goDetail(hot.id)
                                            }}>
                                            {hot.title}
                                        </Text>
                                    })
                                }

                            </View>

                        </View>
                    </View>

                    <View style={{
                        padding:30
                    }}>
                        <Text style={{
                            textAlign:'center',
                            fontSize:10,
                            color:'#ccc'
                        }}>已经到底了~</Text>
                    </View>

                </View>
            </ScrollView>
        )
    };
}

export default Home