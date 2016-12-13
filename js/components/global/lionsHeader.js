'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { popRoute } from '../../actions/route'
import { openDrawer } from '../../actions/drawer'
import { Image } from 'react-native'
import { Header, Text, Icon } from 'native-base'
import { styleSheetCreate } from '../../themes/lions-stylesheet'
import styleVar from '../../themes/variable'
import ButtonFeedback from '../utility/buttonFeedback'

const styles = styleSheetCreate({
    btn: {
        marginRight: 12,
        marginTop: -22,
        android: {
            marginTop: -7,
            height: 32
        },
        paddingLeft:12,
        paddingRight:12,
    },
    headerIcon: {
        color: '#fff',
        fontSize: 38,
        lineHeight: 38,
        paddingLeft: 10,
        backgroundColor: 'transparent',
    },
    textHeader: {
        fontSize: 28,
        lineHeight: 28,
        alignSelf: 'center',
        fontFamily: styleVar.fontCondensed,
        marginTop: -13,
        backgroundColor: 'transparent',
        android: {
        	marginTop: -4
        }
    },
    logoHeader: {
        width: 27,
        height: 34,
        marginLeft: 10,
        marginTop: -12,
        backgroundColor: 'transparent',
        android: {
        	marginTop: -2
        }
    }
})

class LionsHeader extends Component {
	constructor(props){
		super(props)
	}

	popRoute() {
	    this.props.popRoute()
	}

	getBackArrowHTML() {
		return (
			<ButtonFeedback style={styles.btn} onPress={() => this.popRoute()}>
				<Icon name='md-arrow-back' style={styles.headerIcon} />
			</ButtonFeedback>
		)
	}

    getLogoHTML() {
        return (
            <Image
              	transparent
              	source={require('../../../images/header/logo.png')}
              	style={styles.logoHeader} />

        )
    }

    render() {
    	let title = this.props.title || ''
        let backArrowSwitch = this.props.back? this.getBackArrowHTML() : this.getLogoHTML()

        return (
            <Header>
                {backArrowSwitch}

                <Text style={styles.textHeader}>{title}</Text>

    			<ButtonFeedback style={styles.btn} onPress={this.props.openDrawer}>
    				<Icon name='md-menu' style={styles.headerIcon} />
    			</ButtonFeedback>
            </Header>
        )
    }
}

function bindAction(dispatch) {
    return {
        openDrawer: ()=>dispatch(openDrawer()),
        popRoute: ()=>dispatch(popRoute())
    }
}

export default connect(null, bindAction)(LionsHeader)
