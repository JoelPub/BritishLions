'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { replaceOrPushRoute, resetRoute } from '../../actions/route'
import { closeDrawer } from '../../actions/drawer'
import { Container, Content, Footer, View, Text, Button, Icon } from 'native-base'
import { styleSheetCreate } from '../../themes/lions-stylesheet'
import styleVar from '../../themes/variable'
import ButtonFeedback from '../utility/buttonFeedback'
import  { Grid, Col, Row } from 'react-native-easy-grid'

const styles = styleSheetCreate({
    background: {
        flex: 1,
        width: null,
        height: null,
        backgroundColor: styleVar.colorText
    },
    drawerContent: {
        flex: 1
    },
    links: {
        flexDirection: 'row',
        height: 70,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderBottomColor: '#000',
        borderTopColor: '#3a3a3a',
        paddingTop: 4
    },
    linkText: {
        flex: 1,
        fontSize: 28,
        lineHeight: 28,
        fontFamily: styleVar.fontCondensed,
        textAlign: 'right',
        color: '#FFF',
        paddingTop: 12,
        paddingRight: 18,
        android: {
            paddingTop: 0
        }
    },
    icon:{
        width: 44,
        color: 'rgb(175,0,30)'
    },
    footer: {
        height: 50,
        backgroundColor: '#000'
    },
    footerWrapper: {
        paddingLeft:10,
        height: 50
    },
    footerLink: {
        flexDirection:'row',
        paddingLeft: 2,
        height:50
    },
    linkLogin: {
        justifyContent: 'flex-end',
        borderLeftWidth:1,
        borderLeftColor:'rgba(255,255,255,0.15)'
    },
    footerLinkText: {
        textAlign: 'right',
        color: '#FFF',
        paddingTop: 17,
        fontSize: 24,
        fontFamily: styleVar.fontCondensed
    },
    footerLinkIcon: {
        width: 34,
        paddingLeft: 5,
        alignSelf: 'center',
        color: styleVar.colorScarlet,
        fontSize: 24
    }
})

class LionsSidebar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isAccessGranted: false
        }
    }
    navigateTo(route) {
        setTimeout(() => {
          this.props.replaceOrPushRoute(route)
        }, 400)
        this.props.closeDrawer()
    }
    resetRoute(route) {
        setTimeout(() => {
          this.props.resetRoute(route)
        }, 400)
        this.props.closeDrawer()
    }
    _signOutHandler = () => {

    }
    render(){
        return (
            <Container style={styles.background}>
                <Content style={styles.drawerContent}>
                    <ButtonFeedback onPress={() => this.navigateTo('news')} style={styles.links}>
                        <Text style={styles.linkText}>NEWS</Text>
                        <Icon name='md-planet' style={styles.icon} />
                    </ButtonFeedback>
                    <ButtonFeedback onPress={() => this.navigateTo('fixtures')} style={styles.links}>
                        <Text style={styles.linkText}>FIXTURES</Text>
                        <Icon name='md-american-football' style={styles.icon} />
                    </ButtonFeedback>
                    <ButtonFeedback onPress={() => this.navigateTo('lionsTv')} style={styles.links}>
                        <Text style={styles.linkText}>LIONS TV</Text>
                        <Icon name='md-play' style={styles.icon} />
                    </ButtonFeedback>
                    <ButtonFeedback onPress={() => this.navigateTo('galleries')} style={styles.links}>
                        <Text style={styles.linkText}>GALLERIES</Text>
                        <Icon name='md-image' style={styles.icon} />
                    </ButtonFeedback>
                    <ButtonFeedback onPress={() => this.navigateTo('myLions')} style={styles.links}>
                        <Text style={styles.linkText}>MY LIONS</Text>
                        <Icon name='md-heart' style={styles.icon} />
                    </ButtonFeedback>
                    <ButtonFeedback onPress={() => this.navigateTo('lionsStore')} style={styles.links}>
                        <Text style={styles.linkText}>OFFICIAL STORE</Text>
                        <Icon name='md-ribbon' style={styles.icon} />
                    </ButtonFeedback>
                    <ButtonFeedback onPress={() => this.navigateTo('tours')} style={styles.links}>
                        <Text style={styles.linkText}>SUPPORTER TOURS</Text>
                        <Icon name='md-people' style={styles.icon} />
                    </ButtonFeedback>
                    <ButtonFeedback onPress={() => this.navigateTo('competition')} style={styles.links}>
                        <Text style={styles.linkText}>COMPETITIONS</Text>
                        <Icon name='md-trophy' style={styles.icon} />
                    </ButtonFeedback>
                    <ButtonFeedback onPress={() => this.navigateTo('sponsors')} style={styles.links}>
                        <Text style={styles.linkText}>SPONSORS</Text>
                        <Icon name='md-flag' style={styles.icon} />
                    </ButtonFeedback>
                    <ButtonFeedback onPress={() => this.navigateTo('unions')} style={styles.links}>
                        <Text style={styles.linkText}>UNIONS</Text>
                        <Icon name='md-globe' style={styles.icon} />
                    </ButtonFeedback>
                    <ButtonFeedback onPress={() => this.navigateTo('contact')} style={styles.links}>
                        <Text style={styles.linkText}>CONTACT US</Text>
                        <Icon name='md-mail' style={styles.icon} />
                    </ButtonFeedback>
                </Content>
                <Footer style={styles.footer}>
                    <View style={styles.footerWrapper}>
                          { !this.state.isAccessGranted
                          ?
                              <Grid>
                                  <Col size={100}>
                                      <ButtonFeedback style={[styles.footerLink,styles.linkLogin]} onPress={() => this.navigateTo('login')}>
                                          <Text style={styles.footerLinkText}>SIGN IN</Text>
                                          <Icon name='md-log-in' style={styles.footerLinkIcon} />
                                      </ButtonFeedback>
                                  </Col>
                              </Grid>
                          :
                              <Grid>
                                  <Col size={60}>
                                      <ButtonFeedback style={styles.footerLink} onPress={() => this.navigateTo('myAccount')}>
                                          <Icon name='md-contact' style={styles.footerLinkIcon} />
                                          <Text style={styles.footerLinkText}>MY ACCOUNT</Text>
                                      </ButtonFeedback>
                                  </Col>
                                  <Col size={40}>
                                      <ButtonFeedback style={[styles.footerLink,styles.linkLogin]} onPress={() => this._signOutHandler}>
                                          <Text style={styles.footerLinkText}>SIGN OUT</Text>
                                          <Icon name='md-log-in' style={styles.footerLinkIcon} />
                                      </ButtonFeedback>
                                  </Col>
                              </Grid>
                          }
                    </View>
                </Footer>
            </Container>
        )
    }
}

function bindAction(dispatch) {
    return {
        closeDrawer: ()=>dispatch(closeDrawer()),
        replaceOrPushRoute:(route)=>dispatch(replaceOrPushRoute(route)),
        resetRoute:(route)=>dispatch(resetRoute(route))
    }
}

export default connect(null, bindAction)(LionsSidebar)
