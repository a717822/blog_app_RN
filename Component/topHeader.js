import React from 'react'

import { Header } from 'react-native-elements';

class topHeader extends React.Component{
    render() {
        return (
            <Header
                leftComponent={{ icon: 'menu', color: '#fff' }}
                centerComponent={{ text: '我的博客', style: { color: '#fff', fontSize:20} }}
                rightComponent={{ icon: 'search', color: '#fff' }}
                outerContainerStyles={{ backgroundColor: '#1890FF' }} />
        )
    }
}

export default topHeader