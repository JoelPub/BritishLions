
'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, Modal, ScrollView, ActivityIndicator } from 'react-native'
import { fetchContent, drillDown } from '../../actions/content'
import { Container, Content, Text, Button, Icon, Input } from 'native-base'
import { Grid, Col, Row } from 'react-native-easy-grid'
import theme from '../../themes/base-theme'
import styles from './styles'
import shapes from '../../themes/shapes'
import LionsHeader from '../global/lionsHeader'
import EYSFooter from '../global/eySponsoredFooter'
import LionsFooter from '../global/lionsFooter'
import ImagePlaceholder from '../utility/imagePlaceholder'
import ButtonFeedback from '../utility/buttonFeedback'
import ImageCircle from '../utility/imageCircle'
import styleVar from '../../themes/variable'
import FilterListingModal from '../global/filterListingModal'
import loader from '../../themes/loader-position'

class MyLionsPlayerList extends Component {

    constructor(props){
        super(props)
        this.url = `https://f3k8a7j4.ssl.hwcdn.net/tools/feeds?id=401&team=${this.props.unionFeed.id}`
        this.id = this.props.unionFeed.id
        this.logo=this.props.unionFeed.logo
        this.personallogo=this.props.unionFeed.image
        this.name=this.props.unionFeed.displayname.toUpperCase()
        this.playerFeed=[]
        this.state = {
            isLoaded: false,
            modalVisible: false,
            transparent: true,
            resultVisible: false
        }
    
    }

    _drillDown(item, route) {
        this.props.drillDown(item,route)       
        this.setState({
            isLoaded: false
        })
   }
    componentDidMount() {
        this.props.fetchContent(this.url)
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.playerFeed!== undefined&&nextProps.playerFeed[this.id]!== undefined) {
        
                this.playerFeed=nextProps.playerFeed[this.id]
               this.setState({
                    isLoaded: true
                })
           }
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
    _mapJSON(data, colMax = 2) {
        let i = 0
        let k = 0
        let newData = []
        let items = []
        let length = data.length

        for( i = 0; i <data.length; (i += colMax)) {
            for( k = 0; k < colMax; k++ ) {
                if(data[i + k])
                    items.push(data[i + k])
            }

            newData.push(items)
            items = []
        }
        return newData
    }

    render() {
        return (
            <Container theme={theme}>
                <View style={styles.container}>
                    <LionsHeader back={true} title='MY LIONS' />
                    {this.state.isLoaded&&
                    <Image resizeMode='cover' source={require('../../../images/gradient-bg.jpg')} style={styles.header}>
                        <ImageCircle
                            size={100}
                            containerStyle={styles.imageCircle}
                            containerBgColor='#fff'
                            containerPadding={20}
                            src={this.logo} />

                        <Text style={styles.headerTitle}>{this.name}</Text>

                        <ButtonFeedback onPress={()=>this._setModalVisible(true)} style={styles.btnSearchPlayer}>
                            <Icon name='md-search' style={styles.searchIcon}/>
                        </ButtonFeedback>
                    </Image>
                    }
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
                                                resizeMode='stretch'
                                                source={require('../../../contents/my-lions/players/jameshaskell-135h.png')}
                                                style={styles.playerImg}
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
                                                resizeMode='stretch'
                                                source={require('../../../contents/my-lions/players/jameshaskell-135h.png')}
                                                style={styles.playerImg}
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
                                                resizeMode='stretch'
                                                source={require('../../../contents/my-lions/players/jameshaskell-135h.png')}
                                                style={styles.playerImg}
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
                                                resizeMode='stretch'
                                                source={require('../../../contents/my-lions/players/jameshaskell-135h.png')}
                                                style={styles.playerImg}
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
                {
                    this.state.isLoaded?
                    <Content>
                    {
                            this._mapJSON(this.playerFeed).map((rowData, index) => {
                                return (
                                    <Grid key={index}>
                                        {
                                            rowData.map((item, key) => {
                                                let stylesArr = (key === 0)? [styles.gridBoxTouchable, styles.gridBoxTouchableLeft] : [styles.gridBoxTouchable]
                                                Object.assign(item,{logo:this.personallogo,country:this.name,isFav:false})
                                                return (
                                                    <Col style={styles.gridBoxCol} key={key}>
                                                        <ButtonFeedback style={[styles.gridBoxTouchable, styles.gridBoxTouchableLeft]} onPress={() => this._drillDown(item,'myLionsPlayerDetails')}>
                                                            <View style={styles.gridBoxTouchableView}>
                                                                <View style={styles.gridBoxImgWrapper}>
                                                                    <ImagePlaceholder 
                                                                        width = {styleVar.deviceWidth / 2 - 1}
                                                                        height = {styleVar.deviceWidth / 2}>
                                                                        <Image transparent
                                                                            resizeMode='contain'
                                                                            source={{uri:item.image}}
                                                                            style={styles.gridBoxImg} />
                                                                    </ImagePlaceholder>
                                                                </View>
                                                                <View style={styles.gridBoxDescWrapper}>
                                                                    <View style={[shapes.triangle]} />
                                                                    <View style={styles.gridBoxTitle}>
                                                                        <Text style={styles.gridBoxTitleText}>{item.name}</Text>
                                                                        <Text style={styles.gridBoxTitleSupportText}>{item.position}</Text>
                                                                    </View>
                                                                </View>
                                                            </View>
                                                        </ButtonFeedback>
                                                    </Col>
                                                )
                                            }, this)
                                        }
                                    </Grid>
                                )
                            }, this)
                        }
                        
                        <LionsFooter isLoaded={true} />
                    </Content>:
                        <ActivityIndicator style={loader.centered} size='large' />
                    }
                    < EYSFooter />
                </View>
            </Container>
        )
    }
}

function bindAction(dispatch) {
    return {
        fetchContent: (url)=>dispatch(fetchContent(url)),
        drillDown: (data, route)=>dispatch(drillDown(data, route)),
    }
}

export default connect((state) => {
    return {
        unionFeed: state.content.drillDownItem,
        playerFeed: state.content.contentState,
        isLoaded: state.content.isLoaded
    }
}, bindAction)(MyLionsPlayerList)
