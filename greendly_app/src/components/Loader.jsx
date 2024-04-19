import React from 'react';
import { View, StyleSheet } from 'react-native';

const Spinner = () => {
  return (
    <View style={styles.spinner}>
      <View style={[styles.spinnerItem, styles.item1]} />
      <View style={[styles.spinnerItem, styles.item2]} />
      <View style={[styles.spinnerItem, styles.item3]} />
      <View style={[styles.spinnerItem, styles.item4]} />
      <View style={[styles.spinnerItem, styles.item5]} />
      <View style={[styles.spinnerItem, styles.item6]} />
    </View>
  );
};

const styles = StyleSheet.create({
  spinner: {
    width: 44,
    height: 44,
    transformStyle: 'preserve-3d',
    position: 'relative',
    animationDuration: '2s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'ease',
  },
  spinnerItem: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderColor: '#004dff',
    borderWidth: 2,
    backgroundColor: 'rgba(0,77,255,0.2)',
  },
  item1: {
    transform: [{ translateZ: -22 }, { rotateY: '180deg' }],
  },
  item2: {
    transform: [{ rotateY: '-270deg' }, { translateX: '50%' }],
    transformOrigin: 'top right',
  },
  item3: {
    transform: [{ rotateY: '270deg' }, { translateX: '-50%' }],
    transformOrigin: 'center left',
  },
  item4: {
    transform: [{ rotateX: '90deg' }, { translateY: '-50%' }],
    transformOrigin: 'top center',
  },
  item5: {
    transform: [{ rotateX: '-90deg' }, { translateY: '50%' }],
    transformOrigin: 'bottom center',
  },
  item6: {
    transform: [{ translateZ: 22 }],
  },
});

export default Spinner;
