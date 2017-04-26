'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import ManOfTheMatchLanding from './landing'
import ManOfTheMatchPostSubission from './postSubmission'
import ManOfTheMatchFinal from './final'

class ManOfTheMatch extends Component {

    constructor(props) {
         super(props)
    }
    
    
    render() {
        return (
            <View>
                {/*<ManOfTheMatchLanding />*/}
                <ManOfTheMatchPostSubission />
                {/*<ManOfTheMatchFinal />*/}
            </View>
        )
    }
}



export default connect(null, null)(ManOfTheMatch)