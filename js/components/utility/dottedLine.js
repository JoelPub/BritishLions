'use strict'

import React, { Component } from 'react'
import { View } from 'react-native'
import { styleSheetCreate } from '../../themes/lions-stylesheet'
import styleVar from '../../themes/variable'


export default class DottedLine extends Component {
	constructor(props){
		super(props)
	}
    
    render() {
        let {cLeft,fLeft,radius,isFirst,h,headerHeight,dotLen,dotWidth,num,index,sRadius,integrity,gridHeight}=this.props
        let w=(index<num-1)?Math.sqrt(Math.pow(cLeft-fLeft,2)+Math.pow(h,2)):0
        // if (__DEV__)console.log('w',w)
        let t=(index)*h+(integrity&&index===0?(headerHeight*0.5+gridHeight):(headerHeight+gridHeight))-(integrity?0:h)
        let l=(cLeft+fLeft)/2-w/2+sRadius
        // if (__DEV__)console.log('t',t)
        // if (__DEV__)console.log('l',l)
        let r=360*Math.atan((cLeft-fLeft)/h)/(2*Math.PI)+90+'deg'
        // if (__DEV__)console.log('r',r)
        let d=[]
        for(let i=0;i*2*dotLen<w;i++) {
            d.push(i*2*dotLen)
        }

        return (
                <View style={{height:4,width:w,position:'absolute',backgroundColor:'transparent',top:t,left:l,transform:[{rotateZ:r}]}}>
                    {
                        d.map((value,index)=>{
                            return(
                                    <View key={index} style={{height:dotWidth,width:dotLen,backgroundColor:'rgb(255,204,40)',position:'absolute',left:value}} />
                                )
                        })
                    }
                </View>
        )
    }
}
