import React from 'react';
import {ActivityIndicator, Text, TouchableOpacity} from 'react-native';

import {IButton} from './types';
import {styles} from './styles';

const Button = (props: IButton) => {
  const {disabled, loading, title, titleStyle, containerStyle, ...restProps} = props;

  const buttonContainerStyle = {...containerStyle, ...styles.container};
  const buttonTitleStyle = {...titleStyle, ...styles.label};

  return (
    <TouchableOpacity
      {...restProps}
      disabled={disabled}
      style={buttonContainerStyle}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Text style={buttonTitleStyle}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
