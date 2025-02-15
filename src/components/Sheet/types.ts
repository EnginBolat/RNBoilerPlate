// type.ts
import {ViewStyle} from 'react-native';

/**
 * ISheet interface represents the structure of a Sheet component in a React Native app.
 * A Sheet typically appears as a sliding panel or modal that can be interacted with.
 */

export interface ISheet {
  //* @property The content to be rendered inside the Sheet.
  children: React.JSX.Element;

  //* @property Specifies the height of the Sheet. Can be a string (like '50%') or a number (e.g. 300).
  height?: string | number;

  //* @property If true, the user can swipe down to close the Sheet.
  panDownToClose?: boolean;

  //* @property Callback function that gets triggered when the Sheet is closed.
  onClose?: () => void;

  //* @property If true, the Sheet adjusts its size dynamically based on content or screen size.
  dynamicSizing?: boolean;

  //* @property An optional name for the portal where the Sheet is rendered (useful for modals and portals).
  portalName?: string;

  //* @property If true, the Sheet can be closed by touching the area outside of it.
  onTouchClose?: boolean;

  //* @property Custom styles for the Sheet itself.
  sheetStyle?: ViewStyle;

  //* @property Custom styles for the container wrapping the Sheet.
  containerStyle?: ViewStyle;

  //* @property Custom styles for the content inside the Sheet.
  sheetContentContainerStyle?: ViewStyle;
}
