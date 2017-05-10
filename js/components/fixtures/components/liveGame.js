'use strict'

import React, { Component ,PropTypes} from 'react'
import { Image, View, Text } from 'react-native'
import { Icon } from 'native-base'
import { styleSheetCreate } from '../../../themes/lions-stylesheet'
import styleVar from '../../../themes/variable'
import ButtonFeedback from '../../utility/buttonFeedback'
import GamedayTeam from './gamedayTeam'

const locStyle = styleSheetCreate({ 
    liveBox: {
        backgroundColor: 'transparent'
    },
    liveBoxTitle: {
        backgroundColor: '#FFF',
        paddingTop: 20,
        paddingBottom: 6,
    },
    liveBoxTitleText: {
        alignSelf: 'center',
        fontFamily: styleVar.fontCondensed,
        fontSize: 28,
        lineHeight: 28,
        color: styleVar.colorScarlet,
        backgroundColor: 'transparent',
        textAlign:'center',
        android: {
            paddingBottom: 5
        }
    },
    liveBoxInfo: {
        paddingHorizontal: 20,
        paddingTop: 25,
        paddingBottom: 35,
        backgroundColor: styleVar.colorText,
    },
    liveBoxDescText: {
        marginBottom: 20,
        fontFamily: styleVar.fontGeorgia,
        fontSize: 18,
        lineHeight: 22,
        textAlign: 'center',
        color: '#FFF',
    },

    roundButton: {
        height: 50,
        backgroundColor: styleVar.colorScarlet,
        flexDirection:'row',
        marginTop: 0,
        marginBottom: 0,
        paddingTop:5,
        android:{
            paddingTop: 0,
        }
    },
    roundButtonLabel: {
        backgroundColor: 'transparent',
        textAlign:'left',
        fontFamily: styleVar.fontCondensed,
        fontSize: 24,
        lineHeight: 24,
        paddingTop:5,
        marginLeft: 7,
        color: '#FFF',
        android: {
            paddingTop: 3
        }
    },
    logoIcon: {
        width: 21,
        height: 32,
        backgroundColor: 'transparent',
        marginTop: -5,
        android: {
            marginTop: 0
        }
    },
    pageText: {
        color: styleVar.colorText,
        fontSize: styleVar.textFontSize,
        lineHeight: styleVar.textLineHeight,
        fontFamily: styleVar.fontGeorgia,
        margin: 20
    }
})

export default class LiveGame extends Component {
    constructor(props){
        super(props)
    }

    coachBoxOnpress = () => {
        if(this.props.buttonOnPress){
            this.props.buttonOnPress('coachBox')
        }
    }
    render() {
        let details = this.props.details
        
        return (
            <View>
                <View style={locStyle.liveBox}>
                    <View style={locStyle.liveBoxTitle}>
                        <Text style={locStyle.liveBoxTitleText}>
                            GAME NOW LIVE
                        </Text>
                    </View>

                    <View style={locStyle.liveBoxInfo}>
                    <Text style={locStyle.liveBoxDescText}>
                        Visit the British & Irish Lions Coach’s Box for live match coverage and statistics.
                    </Text> 
                    <ButtonFeedback 
                        rounded 
                        style={[locStyle.roundButton]}
                        onPress={this.coachBoxOnpress}
                    >
                        <Image resizeMode='contain' source={require('../../../../contents/my-lions/squadLogo.png')}
                                        style={locStyle.logoIcon}/>
                        <Text ellipsizeMode='tail' numberOfLines={1} style={locStyle.roundButtonLabel} >
                            COACH'S BOX
                        </Text>
                    </ButtonFeedback>
                    </View>
                </View>
                {
                    details.live.description && <Text style={locStyle.pageText}>{details.live.description}</Text>
                }
                <GamedayTeam gameID={details.id} />
            </View>
        )
    }
}
LiveGame.propTypes = {
    buttonOnPress: PropTypes.func,
}
