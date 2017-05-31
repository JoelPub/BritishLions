'use strict'

import React, { Component } from 'react'
import { ActivityIndicator, Modal, Platform } from 'react-native'
import { styleSheetCreate } from '../../themes/lions-stylesheet'
import styleVar from '../../themes/variable'

const styles = styleSheetCreate({
    loader: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 500,
        flex: 1,
        width: styleVar.deviceWidth,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        marginTop: -50
    }
})

export default class OverlayLoader extends Component {
	constructor(props){
		super(props)
	}
    
    render() {
        let isShow = Platform.OS === 'ios'? false : true

        isShow = this.props.showBothPlatform || isShow

        return (
            isShow?
                <Modal visible={this.props.visible} transparent={true} onRequestClose={()=>{}}>
                    <ActivityIndicator style={styles.loader} size='large' />
                </Modal>
            : null
        )
    }
}
