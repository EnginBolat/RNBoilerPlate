import React from 'react';
import Router from './src/Router';

import {Provider} from 'react-redux';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {PortalProvider} from '@gorhom/portal';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {store} from '@store/index';
import {LocalizationProvider} from '@providers/index';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{flex: 1}}>
        <PortalProvider>
          <BottomSheetModalProvider>
            <NavigationContainer>
              <LocalizationProvider>
                <Router />
              </LocalizationProvider>
            </NavigationContainer>
          </BottomSheetModalProvider>
        </PortalProvider>
      </GestureHandlerRootView>
    </Provider>
  );
};

export default App;
