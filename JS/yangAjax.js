import { Toast} from 'antd-mobile-rn';
import {Auth} from "./Auth.js";
import {AsyncStorage} from "react-native";

/**
 * 原生ajax请求
 * @param config
 */
let yangAjax = (config) =>{
    let hostUrl = 'https://api.yangzilong.cn:58888/';

    config = config || {};
    config.method = (config.method || "GET").toUpperCase();
    config.dataType = config.dataType || "json";
    config.async = config.async || true;
    config.headers = config.headers || {};
    config.data = config.data || {};

    let xhr = new XMLHttpRequest();

    let params = [];
    let postData;

    if(!isFormData(config.data)){
        for (let key in config.data){
            let param = config.data[key]?config.data[key]:'';
            params.push(encodeURIComponent(key) + '=' + encodeURIComponent(param));
        }
        postData = params.join('&');
    }else {
        postData = config.data
    }

    if (config.method === 'POST'){
        xhr.open('POST',hostUrl +  config.url, config.async );

        if(!isFormData(config.data)){
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
        }

        if(config.headers){
            for (let key in config.headers){
                xhr.setRequestHeader(key,config.headers[key]);
            }
        }

        xhr.send(postData);
    } else {
        xhr.open('GET', hostUrl + config.url + '?' + postData, config.async);
        if(config.headers){
            for (let key in config.headers){
                xhr.setRequestHeader(key,config.headers[key]);
            }
        }
        xhr.send(null);
    }


    xhr.onreadystatechange = async() => {
        let res = xhr.responseText;
        let ret = {};

        if(xhr.readyState === 4){
            if(xhr.status === 200){
                ret.msg = 'The request is successful';
                ret.data = JSON.parse(res);
                ret.statusText = xhr.statusText;
                ret.status = xhr.status;



                const page =  await AsyncStorage.getItem('page');
                if(page === 'my'){
                    Auth.checkAuth(ret.data);
                }

                config.success && config.success(ret.data , ret.msg , ret.status);
            } else {
                ret.msg = 'The request failed';
                ret.statusText = xhr.statusText;
                ret.status = xhr.status;

                Toast.offline('网络连接失败,请检查网路!!!',1);

                config.fail && config.fail(ret.status , ret.statusText);
            }
        }
    };
};

function isFormData(v) {
    return Object.prototype.toString.call(v) === '[object FormData]';
}

export {
    yangAjax
}
