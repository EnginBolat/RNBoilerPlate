import React from 'react';
import {TextInput as RNTextInput} from 'react-native';
import {ITextInput} from './types';
import {styles} from './style';

const TextInput = (props: ITextInput) => (
  <RNTextInput
    placeholderTextColor={'rgba(0,0,0,0.2)'}
    style={styles.container}
    {...props}
  />
);
export default TextInput;
