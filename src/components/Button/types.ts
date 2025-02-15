import {TextStyle, TouchableOpacityProps, ViewStyle} from 'react-native';

export interface IButton extends TouchableOpacityProps {
  loading?: boolean;
  title: string;
  titleStyle?: TextStyle;
  containerStyle?: ViewStyle;
}
