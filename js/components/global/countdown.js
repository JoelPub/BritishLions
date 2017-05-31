'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setCountDownTimerEnd } from '../../actions/timer'
import { View, Text,Platform } from 'react-native'
import { styleSheetCreate } from '../../themes/lions-stylesheet'
import styleVar from '../../themes/variable'

const styles = styleSheetCreate({
    wrapper: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 13,
        paddingBottom: 13,
        flexDirection: 'row'
    },
    col: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderLeftWidth: 1,
        borderLeftColor: styleVar.colorGrey2,
        paddingTop: 7,
        android: {
            paddingTop: 2,
            paddingBottom: 2
        }
    },
    borderOff: {
        borderLeftWidth: 0
    },
    value: {
        fontFamily: styleVar.fontCondensed,
        fontSize: 28,
        lineHeight: 28,
        color: styleVar.colorScarlet
    },
    label: {
        fontFamily: styleVar.fontCondensed,
        fontSize: 18,
        lineHeight: 18,
        color: styleVar.colorGrey3,
        marginTop: -5,
        android: {
            marginTop: -2,
        }
    }
})

class Countdown extends Component {
	constructor(props){
		super(props)

        this.state = {
            isCountDownEnd: true,
            days: 0, 
            hours: 0,
            minutes: 0,
            seconds: 0
        }

        this._distance = 0
        this._timer = null
        this._dateNow = null
        this._dateEnd = null
        this._second = 1000
        this._minute = this._second * 60
        this._hour = this._minute * 60
        this._day = this._hour * 24
	}

    _tick(){
        this._distance = this._dateEnd - this._dateNow
        this._dateNow += 1000

        if (this._distance < 0) {
            this._expired()
            return
        }
        this.setState({
            days: Math.floor(this._distance / this._day), 
            hours: Math.floor((this._distance % this._day) / this._hour),
            minutes: Math.floor((this._distance % this._hour) / this._minute),
            seconds: Math.floor((this._distance % this._minute) / this._second)
        })
    }

    _expired() {
        clearInterval(this._timer)

        this.setState({
            isCountDownEnd: true
        })

        this._onCountDownEnd()

        this.props.setCountDownTimerEnd(true)
    }

    _onCountDownEnd() {
        if (this.props.onCountDownEnd) {
            this.props.onCountDownEnd()
        }
    }

    componentDidMount() {
        let dateNow = new Date
        //dateNow = '10 June 2017 15:34:57' // intercept
        let dateEnd = new Date(this.props.endDate? this.props.endDate : dateNow)
        //dateNow = '27 October 2016 22:50:00'
        //dateEnd = '28 October 2016 22:50:03'

        this._dateNow = Date.parse(dateNow)
        this._dateEnd = Date.parse(dateEnd)
        let distance = this._dateEnd - this._dateNow

        if (distance > 0) {
            this.props.setCountDownTimerEnd(false)

            this._timer = setInterval(() => {
                this._tick()
            }, 1000)

            this.setState({
                isCountDownEnd: false
            })
        } else {
            this.setState({
                isCountDownEnd: true
            })

            this._onCountDownEnd()
        }
    }

    componentWillUnmount () {
        clearInterval(this._timer)
    }
    
    shouldComponentUpdate() {
        return true
    }

    render() {
        let isShowUI = false

        if (this.state.isCountDownEnd === false) {
            isShowUI = true
        }

        if (this.props.isHideUI) {
            isShowUI = false
        }

        return (
            isShowUI &&
                <View style={styles.wrapper}>
                    <View style={[styles.col, styles.borderOff]}>
                        <Text style={styles.value}>{this.state.days}</Text>
                        <Text style={styles.label}>DAYS</Text>
                    </View>
                    <View style={styles.col}>
                        <Text style={styles.value}>{this.state.hours}</Text>
                        <Text style={styles.label}>HOURS</Text>
                    </View>
                    <View style={styles.col}>
                        <Text style={styles.value}>{this.state.minutes}</Text>
                        <Text style={styles.label}>MINUTES</Text>
                    </View>
                    <View style={styles.col}>
                        <Text style={styles.value}>{this.state.seconds}</Text>
                        <Text style={styles.label}>SECONDS</Text>
                    </View>
                </View>
        )
    }
}


function bindAction(dispatch) {
    return {
        setCountDownTimerEnd: (isEnd) => dispatch(setCountDownTimerEnd(isEnd))
    }
}

export default connect(null, bindAction)(Countdown)