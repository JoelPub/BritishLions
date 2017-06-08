'use strict'

import React, { Component ,PropTypes} from 'react'

class ratingPopUp entends Component{
    constructor(props) {
        super(props)
        this.state = {
              modalVisible: false,
        }
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    buttonClick(name){
        switch(name){
            case 'rate':
            return

            case 'dismiss':
            return

            case 'later':
            return

            default:
            return

        }
    }
    render(){
        return(
            <View>
                <Modal
                animationType={"slide"}
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose={() => {alert("Modal has been closed.")}}
                >
                    <View>

                    </View>
                    <View style={{marginTop: 22}}>
                        <ButtonFeedback onPress={()=>this.buttonClick('rate')}>
                            <Text style={styles.btnText}> OKAY, SURE</Text>
                        </ButtonFeedback>
                        <ButtonFeedback onPress={()=>this.setState('dismiss')}>
                            <Text style={styles.btnText}> NO, THANK YOU</Text>
                        </ButtonFeedback>
                        <ButtonFeedback onPress={()=>this.setState('later')}>
                            <Text style={styles.btnText}> MAYBE LATER</Text>
                        </ButtonFeedback>
                    </View>
                </Modal>
            </View>
        )
    }
}