'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { drillReplace } from '../../actions/content'
import { Text, Icon } from 'native-base'
import { styleSheetCreate } from '../../themes/lions-stylesheet'
import styleVar from '../../themes/variable'
import ButtonFeedback from './buttonFeedback'

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
    },
    buttonIcon: {
        fontSize: 24,
        lineHeight: 22,
        color: '#FFF',
    }
})

// Note: No previous functionality for now,
// we will be added that in the future since all button now is only 'next'

class PaginationButton extends Component {
	constructor(props){
		super(props)
	}

    _paginate(data) {
        let items = data[0]
        let currentID = data[1]
        let route = data[2]


        let index = this._findID(items, currentID)
        let item = items[index + 1]

        if(item) {
            this._drillReplace(item, route)
        }
    }

    _findID(data, idToLookFor) {
        return data.findIndex((item) => {
            return item.id == idToLookFor
        })
    }

    _drillReplace(item, route) {
        let data = Object.assign(item, {'json': this.props.data[0]})
        this.props.drillReplace(data, route)
    }

    _isButtonShow(data) {
        if(data[0]) {
            let index = this._findID(data[0], data[1])

            if(data[0][index + 1]) {
                return true
            }

            return false
        }
    }

    render() {
        let otherStyles = this.props.style || {}
        let label = this.props.label || ' '
        let icon = this.props.next? <Icon name='md-arrow-forward' style={styles.buttonIcon} /> : null
        let data = this.props.data? this.props.data : []
        let isButtonShow = this._isButtonShow(data)

        return (
            isButtonShow === true?
                <ButtonFeedback rounded style={otherStyles} onPress={() => this._paginate(data)}>
                    <Text style={styles.buttonText}>{label} {icon}</Text>
                </ButtonFeedback>
            : null
        )
    }
}

function bindAction(dispatch) {
    return {
        drillReplace: (data, route)=>dispatch(drillReplace(data, route))
    }
}

export default connect(null, bindAction)(PaginationButton)
