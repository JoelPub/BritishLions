import React, { Component, PropTypes } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../styles/SliderEntry.style';


export default class SliderEntry extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    illustration: PropTypes.string,
    even: PropTypes.bool
  };
  onPress = () => {
    if (this.props.itemPress) {
      if(__DEV__)console.log(this.props.itemPress)
      this.props.itemPress(this.props.page,this.props.title)
    }
  }
  render () {
    const { title, subtitle, illustration, even ,page} = this.props;

    const uppercaseTitle = title ? (
      <Text style={[styles.title]} numberOfLines={2}>{ title.toUpperCase() }</Text>
    ) : false;

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.slideInnerContainer}
        onPress={ this.onPress }
      >
        <View style={[styles.imageContainer, even ? styles.imageContainerEven : {}]}>
          <Image
            source={this.props.image}
            style={styles.image}
            resizeMode= 'stretch'
          />

        </View>
        <View style={[styles.textContainer]}>
          { uppercaseTitle }
          <Text style={[styles.subtitle]} numberOfLines={3}>{ subtitle }</Text>
        </View>
      </TouchableOpacity>
    );
  }
}
SliderEntry.propTypes = {
  itemPress: PropTypes.func,
  page: PropTypes.any,
}
SliderEntry.defaultProps = {
  page: 0,
}