'use strict'

import React, { Component } from 'react'
import { TouchableOpacity, Linking, Text } from 'react-native'
import computeProps from 'native-base/Utils/computeProps'
import { styleSheetCreate } from '../../themes/lions-stylesheet'
import styleVar from '../../themes/variable'

const styles = styleSheetCreate({
    buttonText: {
        color: '#FFF',
        fontSize: 22,
        lineHeight: 22,
        paddingTop: 9,
        fontFamily: styleVar.fontCondensed,
        android: {
            paddingTop: 0,
        }
    }
})

export default class ButtonFeedback extends Component {
	constructor(props){
		super(props)
	}

    getInitialStyle() {
        return {
            button: {
                height: 45,
                backgroundColor: styleVar.brandLightColor,
                marginTop: 5,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 45/2
            }
        }
    }

    prepareRootProps() {
        let props = this.props
        let defaultProps = {
            activeOpacity : props.opacity? props.opacity : 0.7
        }

        if(props.rounded) {
            defaultProps = Object.assign(defaultProps, {style : this.getInitialStyle().button})
        }

        return computeProps(props, defaultProps)
    }

    render() {
        let label = this.props.label || label
        let children = this.props.children || <Text style={styles.buttonText}>{label}</Text>

        return (
            <TouchableOpacity {...this.prepareRootProps()}>
                {children}
            </TouchableOpacity>
        )
    }
}
