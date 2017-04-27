
'use strict'

import React, { Component ,PropTypes} from 'react'
import { connect } from 'react-redux'
import { Image, View, Text} from 'react-native'
import ButtonFeedback from '../../utility/buttonFeedback'
import { styleSheetCreate } from '../../../themes/lions-stylesheet'
import styleVar from '../../../themes/variable'
import Triangle from '../../../components/global/Triangle'


const styles = styleSheetCreate({ 
    tabs: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    tab: {
        marginHorizontal: 4
    },
    tabContainer:{
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabText:{
        fontFamily: styleVar.fontCondensed,
        fontSize: 24,
        lineHeight: 24,
        textAlign: 'center',
        color: 'white',
        android: {
            marginTop: -5
        },
        //backgroundColor: 'red',
    },
    tabTextView:{
        backgroundColor: styleVar.brandPrimary,
        height: 50,
        borderRadius: 25,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
    },
    tabTextViewActive: {
        backgroundColor: styleVar.colorText
    }
})

class TabBar extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={[styles.tabs, this.props.style]}>
                {
                    this.props.tabs.map((tab, i) => {
                        let tabTextViewStyle = this.props.activeTab === i ? [styles.tabTextView, styles.tabTextViewActive] : [styles.tabTextView] 

                        return (
                            <ButtonFeedback key={tab} onPress={() => this.props.goToPage(i)} style={styles.tab}>
                                <View style={styles.tabContainer}>
                                    <View style={tabTextViewStyle}>
                                        <Text style={styles.tabText}>
                                            {tab}
                                        </Text>
                                    </View>
                                    {
                                        this.props.activeTab === i &&
                                        <Triangle
                                            width={24}
                                            height={12}
                                            color={styleVar.colorText}
                                            direction={'down'}
                                            style={{marginTop:-1}}
                                        />
                                    }
                                </View>
                            </ButtonFeedback>
                        )
                    })
                }
            </View>
        )
    }
}

export default TabBar

TabBar.propTypes = {
  goToPage: React.PropTypes.func,
  activeTab: React.PropTypes.number,
  tabs: React.PropTypes.array,
}

TabBar.defaultProps = {}