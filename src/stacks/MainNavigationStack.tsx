import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home} from '@screens/index';

export type MainNavigationStackType = {
  Home: undefined;
};

const MainNavigationStack = () => {
  const MainNavigation = createNativeStackNavigator<MainNavigationStackType>();

  return (
    <MainNavigation.Navigator screenOptions={{headerShown: false}}>
      <MainNavigation.Screen name="Home" component={Home} />
    </MainNavigation.Navigator>
  );
};

export default MainNavigationStack;
