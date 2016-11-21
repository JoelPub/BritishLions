
'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, Modal, ScrollView } from 'react-native'
import { Container, Content, Text, Button, Icon, Input } from 'native-base'
import { Grid, Col, Row } from 'react-native-easy-grid'
import theme from '../../themes/base-theme'
import styles from './styles'
import shapes from '../../themes/shapes'
import LionsHeader from '../global/lionsHeader'
import EYSFooter from '../global/eySponsoredFooter'
import LionsFooter from '../global/lionsFooter'
import ButtonFeedback from '../utility/buttonFeedback'
import ImageCircle from '../utility/imageCircle'
import { pushNewRoute } from '../../actions/route'
import FilterListingModal from '../global/filterListingModal'

class MyLionsPlayerList extends Component {

    constructor(props){
        super(props)
        this.state = {
            modalVisible: false,
            transparent: true,
            resultVisible: false
        }
    
    }

    _drillDown(route, index) {
        this.props.pushNewRoute('myLionsPlayerDetails')
    }

    _setModalVisible=(visible) => {
        this.setState({
            modalVisible:visible,
            resultVisible:!visible,
            transparent:visible
        })
    }

    onCloseFilter = () => {
        this.setState({
            modalVisible:false,
            transparent: true,
            resultVisible: false
        })
    }

    searchPlayer = (keywords) => {
        this.setState({
            resultVisible:true,
            transparent:false
        })
    }

    render() {
        return (
            <Container theme={theme}>
                <View style={styles.container}>
                    <LionsHeader back={true} title='MY LIONS' />
                    <Image resizeMode='cover' source={require('../../../images/gradient-bg.jpg')} style={styles.header}>
                        <ImageCircle
                            size={100}
                            containerStyle={styles.imageCircle}
                            containerBgColor='#fff'
                            containerPadding={20}
                            src={require('../../../contents/my-lions/nations/england.png')} />

                        <Text style={styles.headerTitle}>ENGLAND</Text>

                        <ButtonFeedback onPress={()=>this._setModalVisible(true)} style={styles.btnSearchPlayer}>
                            <Icon name='md-search' style={styles.searchIcon}/>
                        </ButtonFeedback>
                    </Image>
                    
                    <FilterListingModal 
                        modalVisible={this.state.modalVisible} 
                        resultVisible={this.state.resultVisible} 
                        transparent={this.state.transparent}  
                        callbackParent={this.onCloseFilter}>
                        <View style={styles.resultContainer}>
                            <View style={styles.searchContainer}>
                                <View style={styles.searchBox}>
                                    <Input placeholder='Search for Player' onChangeText={(text) =>this.searchPlayer(text)} placeholderTextColor='rgb(128,127,131)' style={styles.searchInput}/>
                                </View>
                                <View style={{flex:1}}>
                                    <ButtonFeedback onPress={()=>this._setModalVisible(false)} style={styles.btnCancel}>
                                        <Icon name='md-close' style={styles.rtnIcon}/>
                                    </ButtonFeedback>
                                </View>
                            </View>
                            {this.state.resultVisible&&
                            <ScrollView>
                                <View style={styles.resultRow}>
                                    <ButtonFeedback style={styles.resultRowBtn} onPress={() => {this._setModalVisible(false),this._drillDown(1)}}>
                                        <View style={styles.searchImg}>
                                            <Image transparent
                                                resizeMode='contain'
                                                source={require('../../../contents/my-lions/players/jameshaskell-135h.png')}
                                                 />
                                        </View>
                                        <View style={styles.resultDesc}>
                                            <Text style={styles.resultRowTitleText}>JAMES HASKELL</Text>
                                            <Text style={styles.resultRowSubtitleText}>Flanker</Text>
                                        </View>
                                    </ButtonFeedback>
                                </View>
                                <View style={styles.resultRow}>
                                    <ButtonFeedback style={styles.resultRowBtn} onPress={() => {this._setModalVisible(false),this._drillDown(1)}}>
                                        <View style={styles.searchImg}>
                                            <Image transparent
                                                resizeMode='contain'
                                                source={require('../../../contents/my-lions/players/jameshaskell-135h.png')}
                                                 />
                                        </View>
                                        <View style={styles.resultDesc}>
                                            <Text style={styles.resultRowTitleText}>ELLIS GENGE</Text>
                                            <Text style={styles.resultRowSubtitleText}>Scrum Half</Text>
                                        </View>
                                    </ButtonFeedback>
                                </View>
                                <View style={styles.resultRow}>
                                    <ButtonFeedback style={styles.resultRowBtn} onPress={() => {this._setModalVisible(false),this._drillDown(1)}}>
                                        <View style={styles.searchImg}>
                                            <Image transparent
                                                resizeMode='contain'
                                                source={require('../../../contents/my-lions/players/jameshaskell-135h.png')}
                                                 />
                                        </View>
                                        <View style={styles.resultDesc}>
                                            <Text style={styles.resultRowTitleText}>ROY THOMPSON</Text>
                                            <Text style={styles.resultRowSubtitleText}>Main</Text>
                                        </View>
                                    </ButtonFeedback>
                                </View>
                                <View style={styles.resultRow}>
                                    <ButtonFeedback style={styles.resultRowBtn} onPress={() => {this._setModalVisible(false),this._drillDown(1)}}>
                                        <View style={styles.searchImg}>
                                            <Image transparent
                                                resizeMode='contain'
                                                source={require('../../../contents/my-lions/players/jameshaskell-135h.png')}
                                                 />
                                        </View>
                                        <View style={styles.resultDesc}>
                                            <Text style={styles.resultRowTitleText}>JAY WOLLISH</Text>
                                            <Text style={styles.resultRowSubtitleText}>BRIDA</Text>
                                        </View>
                                    </ButtonFeedback>
                                </View>
                            </ScrollView>
                        }
                        </View>
                    </FilterListingModal >

                    <Content>
                        <Grid>
                            <Col style={styles.gridBoxCol}>
                                <ButtonFeedback style={[styles.gridBoxTouchable, styles.gridBoxTouchableLeft]} onPress={() => this._drillDown(1)}>
                                    <View style={styles.gridBoxTouchableView}>
                                        <View style={styles.gridBoxImgWrapper}>
                                            <Image transparent
                                                resizeMode='contain'
                                                source={require('../../../contents/my-lions/players/jameshaskell.png')}
                                                style={styles.gridBoxImg} />
                                        </View>

                                        <View style={[shapes.triangle]} />
                                        <View style={styles.gridBoxTitle}>
                                            <Text style={styles.gridBoxTitleText}>JAMES</Text>
                                            <Text style={styles.gridBoxTitleText}>HASKELL</Text>
                                            <Text style={styles.gridBoxTitleSupportText}>Flanker</Text>
                                        </View>
                                    </View>
                                </ButtonFeedback>
                            </Col>
                            <Col style={styles.gridBoxCol}>
                                <ButtonFeedback style={styles.gridBoxTouchable} onPress={() => this._drillDown(2)}>
                                    <View style={styles.gridBoxTouchableView}>
                                        <View style={styles.gridBoxImgWrapper}>
                                            <Image transparent
                                                resizeMode='contain'
                                                source={require('../../../contents/my-lions/players/jameshaskell.png')}
                                                style={styles.gridBoxImg} />
                                        </View>

                                        <View style={[shapes.triangle]} />

                                        <View style={styles.gridBoxTitle}>
                                            <Text style={styles.gridBoxTitleText}>ELLIS</Text>
                                            <Text style={styles.gridBoxTitleText}>GENGE</Text>
                                            <Text style={styles.gridBoxTitleSupportText}>Scrum Half</Text>
                                        </View>
                                    </View>
                                </ButtonFeedback>
                            </Col>
                        </Grid>
                        <Grid>
                            <Col style={styles.gridBoxCol}>
                                <ButtonFeedback
                                    style={[styles.gridBoxTouchable, styles.gridBoxTouchableLeft]}
                                    onPress={() => this._drillDown(3)}>

                                    <View style={styles.gridBoxTouchableView}>
                                        <View style={styles.gridBoxImgWrapper}>
                                            <Image transparent
                                                resizeMode='contain'
                                                source={require('../../../contents/my-lions/players/jameshaskell.png')}
                                                style={styles.gridBoxImg} />
                                        </View>

                                        <View style={[shapes.triangle]} />

                                        <View style={styles.gridBoxTitle}>
                                            <Text style={styles.gridBoxTitleText}>ROY</Text>
                                            <Text style={styles.gridBoxTitleText}>THOMPSON</Text>
                                            <Text style={styles.gridBoxTitleSupportText}>Main</Text>
                                        </View>
                                    </View>
                                </ButtonFeedback>
                            </Col>
                            <Col style={styles.gridBoxCol}>
                                <ButtonFeedback style={styles.gridBoxTouchable} onPress={() => this._drillDown(4)}>
                                    <View style={styles.gridBoxTouchableView}>
                                        <View style={styles.gridBoxImgWrapper}>
                                            <Image transparent
                                                resizeMode='contain'
                                                source={require('../../../contents/my-lions/players/jameshaskell.png')}
                                                style={styles.gridBoxImg} />
                                        </View>

                                        <View style={[shapes.triangle]} />

                                        <View style={styles.gridBoxTitle}>
                                            <Text style={styles.gridBoxTitleText}>JAY</Text>
                                            <Text style={styles.gridBoxTitleText}>WOLLISH</Text>
                                            <Text style={styles.gridBoxTitleSupportText}>BRIDA</Text>
                                        </View>
                                    </View>
                                </ButtonFeedback>
                            </Col>
                        </Grid>
                        <LionsFooter isLoaded={true} />
                    </Content>
                    < EYSFooter />
                </View>
            </Container>
        )
    }
}

function bindAction(dispatch) {
    return {
        pushNewRoute: (route)=>dispatch(pushNewRoute(route)),
        pushNewsItem: (index)=>dispatch(pushNewsItem(index))
    }
}

export default connect(null, bindAction)(MyLionsPlayerList)
