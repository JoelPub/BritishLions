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
        overflow: 'visible',
        android: {
            paddingTop: -5,
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

        this._items = this.props.json
        this._currentID = this.props.data[0]
        this._route = this.props.data[1]
        this._isSub = this.props.data[2]? this.props.data[2] : false
	}

    _paginate() {
        let index = this._findID(this._items, this._currentID)
        let item = this._items[index + 1]
        let routeAdd = this._isSub? '' : 'Sub'

        if(item) {
            this.props.drillReplace(item, this._route + routeAdd, this._isSub)
        }
    }

    _findID(data, idToLookFor) {
        return data.findIndex((item) => {
            return item.id == idToLookFor
        })
    }

    _isButtonShow() {

        if(this._items) {
            let index = this._findID(this._items, this._currentID)

            if(this._items[index + 1]) {
                return true
            }

            return false
        }
    }

    render() {
        let otherStyles = this.props.style || {}
        let label = this.props.label || ' '
        let icon = this.props.next? <Icon name='md-arrow-forward' style={styles.buttonIcon} /> : null
        let isButtonShow = this._isButtonShow()

        return (
            isButtonShow === true?
                <ButtonFeedback rounded style={otherStyles} onPress={() => this._paginate()}>
                    <Text style={styles.buttonText}>{label} {icon}</Text>
                </ButtonFeedback>
            : null
        )
    }
}

function bindAction(dispatch) {
    return {
        drillReplace: (data, route, tpl)=>dispatch(drillReplace(data, route, tpl))
    }
}

export default connect((state) => {
    return {
        json: state.content.contentState
    }
}, bindAction)(PaginationButton)
