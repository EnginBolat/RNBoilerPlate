import React from 'react';
import {PortalProvider} from '@gorhom/portal';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {store} from '@store/index';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';

const CommonProvider = ({children}: {children: React.JSX.Element}) => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <PortalProvider>
        <BottomSheetModalProvider>
          <Provider store={store}>
            <NavigationContainer>{children}</NavigationContainer>
          </Provider>
        </BottomSheetModalProvider>
      </PortalProvider>
    </GestureHandlerRootView>
  );
};

export default CommonProvider;
