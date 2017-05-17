'use strict'

import React, { Component } from 'react'
import { View } from 'react-native'
import { styleSheetCreate } from '../../themes/lions-stylesheet'
import styleVar from '../../themes/variable'
const h=310

const styles = styleSheetCreate({
})

export default class DottedLine extends Component {
	constructor(props){
		super(props)
	}
    
    render() {
        let {cLeft,fLeft,radius,isFirst,isLast}=this.props
        let w=Math.sqrt(Math.pow(cLeft-fLeft,2)+Math.pow(h,2))-radius
        // if (__DEV__)console.log('w',w)
        let t=isLast?h/2+radius:h/2+radius
        let l=(cLeft+fLeft)/2-w/2+radius
        // if (__DEV__)console.log('t',t)
        // if (__DEV__)console.log('l',l)
        let r=360*Math.atan((cLeft-fLeft)/h)/(2*Math.PI)+90+'deg'
        // if (__DEV__)console.log('r',r)
        let d=[]
        for(let i=0;i*8<w;i++) {
            d.push(i*8)
        }

        return (
                <View style={{height:4,width:w,position:'absolute',backgroundColor:'transparent',top:t,left:l,transform:[{rotateZ:r}]}}>
                    {
                        d.map((value,index)=>{
                            return(
                                    <View key={index} style={{height:2,width:4,backgroundColor:'rgb(255,204,40)',position:'absolute',left:value}} />
                                )
                        })
                    }
                </View>
        )
    }
}
