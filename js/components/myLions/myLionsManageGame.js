
'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { pushNewRoute } from '../../actions/route'
import { Image, Text, View, ScrollView, ListView } from 'react-native'
import { Container, Icon } from 'native-base'
import theme from '../../themes/base-theme'
import { Grid, Col, Row } from 'react-native-easy-grid'
import LoginRequire from '../global/loginRequire'
import LionsHeader from '../global/lionsHeader'
import EYSFooter from '../global/eySponsoredFooter'
import LionsFooter from '../global/lionsFooter'
import ImagePlaceholder from '../utility/imagePlaceholder'
import ButtonFeedback from '../utility/buttonFeedback'
import Versus from './components/versus'
import SquadModal from '../global/squadModal'
import shapes from '../../themes/shapes'
import styles from './styles'
import { styleSheetCreate } from '../../themes/lions-stylesheet'
import styleVar from '../../themes/variable'

const locStyle = styleSheetCreate({
    header: {
        backgroundColor: styleVar.colorText,
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 10
    },
    headerText: {
        color: '#FFF',
        fontSize: 18,
        lineHeight: 20,
        textAlign: 'center',
        fontFamily: styleVar.fontGeorgia
    },
    gridBoxTitle: {
        position: 'relative',
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: styleVar.colorGrey2,
        paddingTop: 25,
        paddingBottom: 5,
        paddingHorizontal: 12,
        
    },
    gridBoxTitleText: {
        textAlign: 'center',
        fontFamily: styleVar.fontCondensed,
        color: styleVar.colorScarlet,
        fontSize: 24,
        lineHeight: 24
    },
    headerText2: {
        fontFamily: styleVar.fontCondensed,
        marginBottom: -8
    }
})


const dummyData = [
    {
        image: 'https://cdn.soticservers.net/tools/images/players/photos/2015/lions/125/250x250/114146.jpg',
        headerLabel: 'WEATHER'     

    },
    {
        image: 'https://cdn.soticservers.net/tools/images/players/photos/2015/lions/125/250x250/19930.jpg',
        headerLabel: 'REFEREE'    
    }
]


class MyLionsCompetitionGameResults extends Component {

    constructor(props) {
        super(props)
        this.isUnMounted = false
        this.state = {
            modalResults: false
        }
    }

    componentWillUnmount() {
        this.isUnMounted = true
    }

    render() {
        return (
            <Container theme={theme}>
                <View style={styles.container}>
                    <LionsHeader 
                        back={true}
                        title='MY LIONS'
                        contentLoaded={true}
                        scrollToTop={ ()=> { this._scrollView.scrollTo({ y: 0, animated: true }) }} />
                    
                    <View style={styles.pageTitle}>
                        <Text style={styles.pageTitleText}>MANAGE GAME</Text>
                        <ButtonFeedback 
                            style={styles.pageTitleBtnIconRight} 
                            onPress={() => { this.setState({modalResults: true}) }}>
                            <Icon name='ios-information-circle-outline' style={styles.pageTitleBtnIcon} />
                        </ButtonFeedback>
                    </View>

                    <ScrollView ref={(scrollView) => { this._scrollView = scrollView }}>
                        <View style={[locStyle.header]}>
                            <Text style={locStyle.headerText}>Rotura International Stadium, Roturaa.</Text>
                        </View>

                        <Versus data={[]} />
                        
                        <Grid>
                            <Row>
                                {
                                    dummyData.map((item, key) => {
                                        let styleGridBoxImgWrapper = (key === 0)? [styles.gridBoxImgWrapper, styles.gridBoxImgWrapperRight] : [styles.gridBoxImgWrapper]
                                        let gridBoxTouchable = (key ===  0)?[styles.gridBoxTouchable, styles.gridBoxTitleRight, locStyle.gridBoxWrapper] : [styles.gridBoxTouchable, locStyle.gridBoxWrapper]

                                        return (
                                            <Col key={key}>
                                                <View style={gridBoxTouchable}>
                                                    <View style={[locStyle.header]}>
                                                        <Text style={[locStyle.headerText, locStyle.headerText2]}>
                                                            {item.headerLabel}
                                                        </Text>
                                                    </View>
                                                    <View style={[styles.gridBoxTouchableView, locStyle.gridBoxWrapper, ]}>
                                                        <View style={styleGridBoxImgWrapper}>
                                                            <ImagePlaceholder 
                                                                width = {styleVar.deviceWidth / 2}
                                                                height = {styleVar.deviceWidth / 2}>
                                                                <Image transparent
                                                                    resizeMode='contain'
                                                                    source={{uri: item.image}}
                                                                    style={styles.gridBoxImg} />
                                                            </ImagePlaceholder>
                                                        </View>
                                                        <View style={locStyle.gridBoxTitle}>
                                                            <Text style={locStyle.gridBoxTitleText} numberOfLines={1}>
                                                                FIRSTNAME
                                                            </Text>
                                                            <Text style={locStyle.gridBoxTitleText} numberOfLines={1}>
                                                                LASTNAME
                                                            </Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </Col>
                                        )
                                    }, this)
                                }
                            </Row>
                        </Grid>
                    </ScrollView>

                    <SquadModal 
                        modalVisible={this.state.modalResults}
                        callbackParent={() => {}}>
                            <View style={[styles.modalContent]}>
                                <Text style={styles.modalContentTitleText}>MANAGE GAME</Text>
                                <Text style={styles.modalContentText}>Lorem ipsum doloramet, conse tetur adipiscing elit. Vestibulum in elit quam. Etiam ullamcorper neque eu lorem elementum, a sagittis sem ullamcorper. Suspendisse ut dui diam.</Text>
                            </View>
                    </SquadModal>
                        
                    <EYSFooter mySquadBtn={true}/>
                    <LoginRequire/>
                </View>
            </Container>
        )
    }
}

function bindAction(dispatch) {
    return {
        pushNewRoute:(route)=>dispatch(pushNewRoute(route))
    }
}

export default connect(null,  bindAction)(MyLionsCompetitionGameResults)