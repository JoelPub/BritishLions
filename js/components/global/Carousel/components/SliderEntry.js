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

  render () {
    const { title, subtitle, illustration, even } = this.props;

    const uppercaseTitle = title ? (
      <Text style={[styles.title]} numberOfLines={2}>{ title.toUpperCase() }</Text>
    ) : false;

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.slideInnerContainer}
        onPress={() => { alert(`You've clicked '${title}'`); }}
      >
        <View style={[styles.imageContainer, even ? styles.imageContainerEven : {}]}>
          <Image
            source={{ uri: illustration }}
            style={styles.image}
          />
          <View style={[styles.radiusMask, even ? styles.radiusMaskEven : {}]} />
        </View>
        <View style={[styles.textContainer]}>
          { uppercaseTitle }
          <Text style={[styles.subtitle]} numberOfLines={2}>{ subtitle }</Text>
        </View>
      </TouchableOpacity>
    );
  }
}