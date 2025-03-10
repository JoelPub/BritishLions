'use strict';

var converter = {
  valueToPosition: function (value, valuesArray, sliderLength) {
    var arrLength;
    var index = valuesArray.indexOf(value);

    if (index === -1) {
      if (__DEV__)console.log('Invalid value, array does not contain: ', value)
      return null;
    } else {
      arrLength = valuesArray.length - 1;
      return sliderLength * index / arrLength;
    }
  },
  positionToValue: function (position, valuesArray, sliderLength) {
    var arrLength;
    var index;

    if ( position < 0 || sliderLength < position ) {
      if (__DEV__)console.log('invalid position: ', position);
      return null;
    } else {
      arrLength = valuesArray.length - 1;
      index = arrLength * position / sliderLength;
      return valuesArray[Math.round(index)];
    }
  },
  createArray: function (start, end, step) {
    var i;
    var length;
    var direction = start - end > 0 ? -1 : 1;
    var result = [];
    if (!step) {
      if (__DEV__)console.log('invalid step: ', step);
      return result;
    } else {
      length = Math.abs((start - end)/step) + 1;
      for (i=0 ; i<length ; i++){
        result.push(start + i * Math.abs(step)*direction);
      }
      return result;
    }
  }
};

module.exports = converter;