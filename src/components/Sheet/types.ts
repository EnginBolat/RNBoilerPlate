import {ViewStyle} from 'react-native';

export interface ISheet {
  children: React.JSX.Element;
  height?: string | number;
  panDownToClose?: boolean;
  onClose?: () => void;
  dynamicSizing?: boolean;
  portalName?: string;
  onTouchClose?: boolean;
  sheetStyle?: ViewStyle;
  containerStyle?: ViewStyle;
  sheetContentContainerStyle?: ViewStyle
}
