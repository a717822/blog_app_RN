import React from 'react'
import { Router, Scene , Stack} from 'react-native-router-flux'
import {yangAjax} from "./JS/yangAjax";

import Main from './Page/Main'
import Detail from './Page/Detail'
import BlogList from './Page/BlogList'
import Login from './Page/Login'
import SearchList from './Page/SearchList'
import SencondMenu from './Page/SencondMenu'
import TableList from './Page/TableList'

React.ajax = yangAjax;

class App extends React.Component{
    render() {
        return (
            <Router>
                <Stack key="root">
                    <Scene key="Main" component={Main} initial={true}  hideNavBar={true} />
                    <Scene key="Detail" component={Detail} hideNavBar={true}  />
                    <Scene key="BlogList" component={BlogList} hideNavBar={true}  />
                    <Scene key="Login" component={Login} hideNavBar={true}  />
                    <Scene key="SearchList" component={SearchList} hideNavBar={true}  />
                    <Scene key="SencondMenu" component={SencondMenu} hideNavBar={true}  />
                    <Scene key="TableList" component={TableList} hideNavBar={true}  />
                </Stack>
            </Router>
        )
    }
}

export default App