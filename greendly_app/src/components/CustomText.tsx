import React from 'react';
import { Text as RNText, TextProps } from 'react-native';

const CustomText = ({ style, ...props }: TextProps) => (
  // <RNText style={[{ fontFamily: 'jersey-25' }, style]} {...props} />
  // <RNText style={[{ fontFamily: 'Roboto-Regular' }, style]} {...props} />
  // <RNText style={[{ fontFamily: 'Montserrat-VariableFont_wght' }, style]} {...props} />
  <RNText style={[{ fontFamily: 'Roboto-Regular' }, style]} {...props} />
  // <RNText style={[{ fontFamily: 'Montserrat-Italic-VariableFont_wght' }, style]} {...props} />

);

export default CustomText;
