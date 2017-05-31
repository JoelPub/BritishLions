
'use strict'

import { StyleSheet } from "react-native"
var React = require('react-native')
var { Dimensions } = React

var deviceHeight = Dimensions.get('window').height
var deviceWidth = Dimensions.get('window').width
module.exports = StyleSheet.create({
    galleryPoster: {
        height: deviceWidth*0.72,
        position: 'relative',
        resizeMode: 'contain'
    },
    slide: {
        flex: 1,
        width: null,
        backgroundColor: 'transparent'
    },
    swiperDot: {
        backgroundColor:'rgba(0,0,0,.8)',
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 0,
    },
    swiperActiveDot: {
        backgroundColor: '#fff',
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 0,
    },
    fullscreen: {
        backgroundColor: 'rgb(0, 0, 0)',
        position: 'absolute',
        justifyContent: 'center',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0
    },
    fullscreenImage: {
        width: null
    }
})
