'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { popRoute, pushNewRoute } from '../../actions/route'
import { openDrawer } from '../../actions/drawer'
import { Image } from 'react-native'
import { Header, Text, Icon } from 'native-base'
import { styleSheetCreate } from '../../themes/lions-stylesheet'
import styleVar from '../../themes/variable'
import ButtonFeedback from '../utility/buttonFeedback'

const styles = styleSheetCreate({
    btn: {
        marginTop: -22,
        android: {
            marginTop: -7,
            height: 32
        },
        paddingLeft:12,
        paddingRight:12,
    },
    btnArrow: {
        marginTop: -22,
        android: {
            marginTop: -7,
            height: 32
        },
        paddingLeft:0,
        paddingRight:24,
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
    textHeader2: {
        android: {
            marginTop: 0,
        }
    },
    textHeaderBtn: {
        android: {
            height: 28,
            marginTop: -4
        }
    },
    logoHeaderLink: {
        width: 27,
        height: 34,
        marginLeft: 10,
        marginTop: -12,
        android: {
            marginTop: -2
        }
    },
    logoHeader: {
        width: 27,
        height: 34,
        backgroundColor: 'transparent'
    }
})

class LionsHeader extends Component {
	constructor(props){
		super(props)
	}

	popRoute() {
        if (this.props.backRoute) 
            this.props.pushNewRoute(this.props.backRoute)
        else
            this.props.popRoute()
	}

    pushNewRoute(route) {
        this.props.pushNewRoute(route)
    }

    scrollToTop = () => {
        if (this.props.contentLoaded)
            this.props.scrollToTop()
    }

    onpressLogo = () => {
        if (this.props.title === 'LANDING') {
            this.scrollToTop()
        } else {
            this.pushNewRoute('landing')
        }
    }

	getBackArrowHTML() {
		return (
			<ButtonFeedback style={styles.btnArrow} onPress={() => this.popRoute()}>
				<Icon name='md-arrow-back' style={styles.headerIcon} />
			</ButtonFeedback>
		)
	}

    getLogoHTML() {
        return (
            <ButtonFeedback onPress={this.onpressLogo} style={styles.logoHeaderLink}>
                <Image
                    resizeMode='contain'
                  	transparent
                  	source={require('../../../images/header/logo.png')}
                  	style={styles.logoHeader} />
            </ButtonFeedback>
        )
    }

    getTitleHTMl(title) {
        if (this.props.scrollToTop && this.props.contentLoaded) {
            return (
                <ButtonFeedback style={styles.textHeaderBtn} onPress={this.scrollToTop}>
                    <Text style={[styles.textHeader, styles.textHeader2]}>{title}</Text>
                </ButtonFeedback>
            )
        }

        return (
            <Text style={styles.textHeader}>{title}</Text>
        )
    }

    render() {
    	let title = this.props.title || ''
        title = title === 'LANDING'? '' : title
        let backArrowSwitch = this.props.back? this.getBackArrowHTML() : this.getLogoHTML()

        return (
            <Header>
                {backArrowSwitch}

                {this.getTitleHTMl(title)}

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
        pushNewRoute: (route)=>dispatch(pushNewRoute(route)),
        popRoute: ()=>dispatch(popRoute())
    }
}

export default connect(null, bindAction)(LionsHeader)
