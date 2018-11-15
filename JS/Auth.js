import {AsyncStorage} from "react-native";
import { Toast} from 'antd-mobile-rn';
import {Actions} from "react-native-router-flux";

let Auth = {
    checkAuth:function (res) {
        switch (res.id){
            case 2:
            case 3:
            case 4:
            case 5:

                Toast.info(res.msg);
                AsyncStorage.clear();
                Actions.Login();

                break;
            default:
                break;
        }
    }

};

export {
    Auth
}