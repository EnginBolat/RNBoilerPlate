import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  Dimensions,
  LayoutChangeEvent,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import {initialWindowMetrics} from 'react-native-safe-area-context';

import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {Portal, PortalHost} from '@gorhom/portal';

import {ISheet} from './types';
import {rawStyles} from './styles';

const {height: screenHeight} = Dimensions.get('window');

const Sheet = forwardRef<BottomSheet, ISheet>((props, outRef) => {
  const {
    dynamicSizing = true,
    panDownToClose = true,
    onTouchClose = true,
    onClose,
    children,
    height,
    portalName = 'bottom_sheet_host',
    sheetStyle,
    containerStyle,
    sheetContentContainerStyle,
  } = props;

  const ref = useRef<BottomSheet>(null);
  const [isHaveMaxHeight, setIsHaveMaxHeight] = useState(false);

  const safeAreaInsets = initialWindowMetrics?.insets;
  const windowInsets = initialWindowMetrics?.insets;
  const styles = rawStyles({bottomInsets: windowInsets?.bottom ?? 0});

  const handleLayout = (event: LayoutChangeEvent) => {
    const {height: measuredHeight} = event.nativeEvent.layout;
    setIsHaveMaxHeight(measuredHeight > screenHeight * 0.85);
  };

  const maxDynamicContentSize = useCallback(
    () => (isHaveMaxHeight ? screenHeight * 0.8 : screenHeight),
    [isHaveMaxHeight],
  );

  useImperativeHandle(outRef, () => ({
    close: handleTouchClose,
    snapPoints: height ? [height] : ['30%'],
    snapToIndex: (index: number) => ref.current?.snapToIndex(index),
    snapToPosition: (position: number | string) =>
      ref.current?.snapToPosition(position),
    expand: () => ref.current?.expand(),
    collapse: () => ref.current?.collapse(),
    forceClose: () => ref.current?.forceClose(),
    ...ref.current,
  }));

  const handleTouchClose = () => {
    if (onTouchClose && onClose) {
      ref.current?.close();
      return;
    }
    ref.current?.close();
  };

  const sheetViewStyle: ViewStyle = {...sheetStyle};
  const sheetContainerStyle: ViewStyle = {
    ...styles.container,
    ...containerStyle,
  };
  const sheetContentContainerSt: ViewStyle = {
    ...sheetContentContainerStyle,
    ...styles.sheetView,
    marginBottom: safeAreaInsets?.bottom,
  };

  return (
    <Portal>
      <TouchableWithoutFeedback onPress={handleTouchClose} disabled={onTouchClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>
      <BottomSheet
        ref={ref}
        maxDynamicContentSize={maxDynamicContentSize()}
        animateOnMount={true}
        snapPoints={height ? [height] : []}
        onClose={onClose}
        style={sheetViewStyle}
        enableDynamicSizing={dynamicSizing}
        containerStyle={sheetContainerStyle}
        enablePanDownToClose={panDownToClose}
        keyboardBehavior="fillParent">
        <BottomSheetView
          onLayout={handleLayout}
          style={sheetContentContainerSt}>
          {children}
        </BottomSheetView>
      </BottomSheet>
      <PortalHost name={portalName} />
    </Portal>
  );
});

export default Sheet;
