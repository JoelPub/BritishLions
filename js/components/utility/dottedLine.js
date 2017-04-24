'use strict'

import React, { Component } from 'react'
import { View } from 'react-native'
import { styleSheetCreate } from '../../themes/lions-stylesheet'
import styleVar from '../../themes/variable'

const styles = styleSheetCreate({
})

export default class DottedLine extends Component {
	constructor(props){
		super(props)
	}
    
    render() {
        let {cLeft,fLeft,radius,isFirst}=this.props
        let w=Math.sqrt(Math.pow(cLeft-fLeft,2)+Math.pow(100,2))-2*radius
        // if (__DEV__)console.log('w',w)
        let t=isFirst?100/2+radius:100/2
        let l=(cLeft+fLeft)/2-w/2+radius
        // if (__DEV__)console.log('t',t)
        // if (__DEV__)console.log('l',l)
        let r=360*Math.atan((cLeft-fLeft)/100)/(2*Math.PI)+90+'deg'
        // if (__DEV__)console.log('r',r)
        let d=[]
        for(let i=0;i*4<w;i++) {
            d.push(i*4)
        }

        return (
                <View style={{height:4,width:w,position:'absolute',backgroundColor:'transparent',top:t,left:l,transform:[{rotateZ:r}]}}>
                    {
                        d.map((value,index)=>{
                            return(
                                    <View key={index} style={{height:2,width:2,backgroundColor:'yellow',position:'absolute',left:value}} />
                                )
                        })
                    }
                </View>
        )
    }
}
