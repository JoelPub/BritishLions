'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, ScrollView } from 'react-native'
import { drillDown } from '../../actions/content'
import { Container, Text } from 'native-base'
import theme from '../../themes/base-theme'
import styles from './styles'
import shapes from '../../themes/shapes'
import LionsHeader from '../global/lionsHeader'
import LionsFooter from '../global/lionsFooter'
import ImagePlaceholder from '../utility/imagePlaceholder'
import ButtonFeedback from '../utility/buttonFeedback'
import EYSFooter from '../global/eySponsoredFooter'

// For mapping a static image only, since require() is not working with concatenating a dynamic variable
// should be delete this code once api is ready.
import data from '../../../contents/fixtures/data.json'
import images from '../../../contents/fixtures/images'

class Fixtures extends Component {
    constructor(props) {
         super(props)
         this._scrollView = ScrollView
    }

    _drillDown(data) {
        this.props.drillDown(data, 'fixtureDetails')
    }

    render() {
        return (
            <Container theme={theme} style={styles.container}>
                <View style={styles.background}>
                    <LionsHeader 
                        title='FIXTURES'
                        contentLoaded={true}
                        scrollToTop={ ()=> { this._scrollView.scrollTo({ y: 0, animated: true }) }} />
                    <ScrollView ref={(scrollView) => { this._scrollView = scrollView }}>
                          {
                             data.map(function(item) {
                                return (
                                    <ButtonFeedback key={item.id}
                                        style={styles.btn}
                                        onPress={() => this._drillDown(item)}>
                                        <ImagePlaceholder height={170}>
                                            <Image
                                                resizeMode='cover' 
                                                style={styles.fixtureImg}
                                                source={images[item.id]} />
                                        </ImagePlaceholder>
                                        <View style={[shapes.triangle, {marginTop: -11}]} />
                                        <View style={styles.fixtureBanner} >
                                          <Text style={styles.dateText}>{item.date.toUpperCase()}</Text>
                                          <Text style={styles.teamText}>{item.title}</Text>
                                        </View>
                                    </ButtonFeedback>
                                  )
                              }, this)
                          }
                          <Image
                             source={require('../../../images/footer/fixturesfooter.png')}
                             style={styles.imgSponsor}
                             resizeMode='cover'
                             />
                          <LionsFooter isLoaded={true} />
                    </ScrollView>
                    <EYSFooter />
                </View>
            </Container>
       )
    }
}

function bindAction(dispatch) {
    return {
        drillDown: (data, route)=>dispatch(drillDown(data, route))
    }
}

export default connect(null, bindAction)(Fixtures)
