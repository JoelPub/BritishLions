'use strict'

import React, { Component } from 'react'
import { Image, View, Text } from 'react-native'
import { Icon } from 'native-base'
import { styleSheetCreate } from '../../../themes/lions-stylesheet'
import styleVar from '../../../themes/variable'
import PlayerListSlider from '../../global/playerListSlider'

const locStyle = styleSheetCreate({    
    subject: {
    	backgroundColor: styleVar.colorText,
        paddingTop: 20,
        paddingBottom: 6,
    },
    subjectText: {
    	alignSelf: 'center',
        fontFamily: styleVar.fontCondensed,
        fontSize: 28,
        lineHeight: 28,
        color: '#FFF',
        backgroundColor: 'transparent',
        textAlign:'center',
        android: {
            paddingBottom: 5
        }
    }
})

// please remove this dummy data when api is availble
let dummyPlayerData = [
    {
        id: '1',
        name: 'Rory Best',
        image: 'https://cdn.soticservers.net/tools/images/players/photos/2016/lions/4136/250x250/750.jpg'
    },
    {
        id: '2',
        name: 'Moren Ipsum Aber',
        image: 'https://cdn.soticservers.net/tools/images/players/photos/2016/lions/4136/250x250/68811.jpg'
    },
    {
        id: '3',
        name: 'Lerom Dolor',
        image: 'https://cdn.soticservers.net/tools/images/players/photos/2016/lions/4136/250x250/90373.jpg'
    },
    {
        id: '4',
        name: 'Rory Best',
        image: 'https://cdn.soticservers.net/tools/images/players/photos/2016/lions/4136/250x250/750.jpg'
    },
    {
        id: '5',
        name: 'Moren Ipsum Aber',
        image: 'https://cdn.soticservers.net/tools/images/players/photos/2016/lions/4136/250x250/68811.jpg'
    },
    {
        id: '6',
        name: 'Lerom Dolor',
        image: 'https://cdn.soticservers.net/tools/images/players/photos/2016/lions/4136/250x250/90373.jpg'
    },
    {
        id: '7',
        name: 'Rory Best',
        image: 'https://cdn.soticservers.net/tools/images/players/photos/2016/lions/4136/250x250/750.jpg'
    },
    {
        id: '8',
        name: 'Moren Ipsum Aber',
        image: 'https://cdn.soticservers.net/tools/images/players/photos/2016/lions/4136/250x250/68811.jpg'
    },
    {
        id: '9',
        name: 'Lerom Dolor',
        image: 'https://cdn.soticservers.net/tools/images/players/photos/2016/lions/4136/250x250/90373.jpg'
    },
]

export default class GamedayTeam extends Component {
	constructor(props){
        super(props)
    }

    _onPressPlayer(item) {
        if (__DEV__)console.log('Callback: ', item)
    }

	render() {
		return (
			<View>
				<View style={locStyle.subject}>
                    <Text style={locStyle.subjectText}>GAME-DAY TEAM</Text>
			    </View>
				
                <View>
                    <PlayerListSlider data={dummyPlayerData} callbackPress={this._onPressPlayer.bind(this)} title="FORWARDS" />
                    <PlayerListSlider data={dummyPlayerData} callbackPress={this._onPressPlayer.bind(this)} title="BACKS" />
                    <PlayerListSlider data={dummyPlayerData} callbackPress={this._onPressPlayer.bind(this)} title="RESERVES" />
                </View>
	         </View>
        )
	}
}

function bindAction(dispatch) {
    return {
        drillDown: (data, route)=>dispatch(drillDown(data, route)),
    }
}
