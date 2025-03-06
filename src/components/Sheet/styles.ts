import {StyleSheet} from 'react-native';

export const rawStyles = ({bottomInsets}: {bottomInsets: number}) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingBottom: bottomInsets,
    },
    containerStyle: {
      backgroundColor: 'rgba(0,0,0,0.3)',
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    sheetView: {
      // paddingHorizontal: 20,
      paddingVertical: 32,
      // alignItems: 'center',
      // justifyContent: 'center',
    },
  });
