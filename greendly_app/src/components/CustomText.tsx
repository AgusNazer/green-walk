import React from 'react';
import { Text as RNText, TextProps } from 'react-native';

const CustomText = ({ style, ...props }: TextProps) => (
  <RNText style={[{ fontFamily: 'jersey-25' }, style]} {...props} />
);

export default CustomText;
