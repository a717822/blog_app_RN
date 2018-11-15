import React, {ajax} from 'react';
import {StyleSheet, View, Text, TouchableOpacity , ScrollView, AsyncStorage} from 'react-native';
import { Table , Row } from 'react-native-table-component';

import {Actions} from "react-native-router-flux";
import { Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome'

import { Toast} from 'antd-mobile-rn';

import {tableData} from "../JS/tableData"

class TableList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableHead: [],
            widthArr: [],
            table:[]
        }
    }

    componentDidMount(){
        this.getTableData(this.props.navigation.state.params.id);
    }

    getTableData = async(id) =>{
        let table = tableData(id)[0];

        let data = {
            token:await AsyncStorage.getItem('token')
        };

        if(id === 3){
            data.have = 1
        }

        const element = (index) => (
            <View style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <TouchableOpacity onPress={() =>{
                    this.showToast(index)
                }}>
                    <View style={styles.btnPrimary}>
                        <Text style={styles.btnText}>查看</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() =>{
                    this.showToast(index)
                }}>
                    <View style={styles.btnDelete}>
                        <Text style={styles.btnText}>删除</Text>
                    </View>
                </TouchableOpacity>
            </View>

        );

        ajax({
            url:table.url,
            method:'post',
            dataType:'json',
            async:true,
            data:data,
            success:(data) =>{
                if(data.id === 10000){

                    let arr1 = [];

                    data.list.forEach((obj)=>{
                        let arr = [];

                        for (let i in obj) {
                            if(i !== 'key' && i !== 'cate_id' && (typeof obj[i] === 'string' || typeof obj[i] === 'number')){
                                arr.push(obj[i]); //值
                            }
                        }

                        arr[arr.length] = element(obj.id);

                        arr1.push(arr);
                    });

                    this.setState({
                        table:arr1,
                        tableHead:table.tableHead,
                        widthArr:table.widthArr
                    })
                }
            }
        });
    };

    showToast = (index)=> {
        Toast.info('该版本不支持该类操作,请在Web端进行操作');
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
                        centerComponent={{ text: this.props.navigation.state.params.title, style: { color: '#fff', fontSize:20} }}
                        outerContainerStyles={{ backgroundColor: '#1890FF' }} />
                </View>

                <View style={styles.container}>
                    <ScrollView horizontal={true} style={{
                        height:'100%'
                    }}>
                        <View>
                            <Table borderStyle={{borderColor: 'transparent'}}>
                                <Row data={this.state.tableHead}
                                     widthArr={this.state.widthArr}
                                     style={styles.header}
                                     textStyle={styles.text}/>
                            </Table>
                            <ScrollView style={styles.dataWrapper}>
                                <Table borderStyle={{borderColor: 'transparent'}}>
                                    {
                                        this.state.table.map((rowData, index) => {
                                            return <Row
                                                key={index}
                                                data={rowData}
                                                widthArr={this.state.widthArr}
                                                style={[styles.row, index%2 && {backgroundColor: '#F7F6E7'}]}
                                                textStyle={styles.text}
                                            />
                                        })
                                    }
                                </Table>
                            </ScrollView>
                        </View>
                    </ScrollView>
                </View>


            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {padding: 10, paddingTop: 20,backgroundColor: '#fff' , paddingBottom:'30%'},
    header: { height: 50, backgroundColor: '#537791' },
    text: { textAlign: 'center', fontWeight: '100' },
    dataWrapper: { marginTop: -1 },
    row: { backgroundColor: '#E7E6E1' },
    btnPrimary:{ width: 58, height: 30, borderRadius: 2 , marginRight:20,backgroundColor: '#40a9ff'},
    btnDelete: { width: 58, height: 30, backgroundColor: '#78B7BB',  borderRadius: 2 , marginRight:20 },
    btnText: { textAlign: 'center', color: '#fff' , lineHeight:30 }
});

export default TableList