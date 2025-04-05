import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, TodoDetails, TodoList } from '@screens/index';

import React from 'react';

export type MainNavigationStackType = {
  Home: undefined;
  TodoList: undefined;
  TodoDetails: {
    id: string;
  };
};

const MainNavigationStack = () => {
  const MainNavigation = createNativeStackNavigator<MainNavigationStackType>();

  return (
    <MainNavigation.Navigator screenOptions={{ headerShown: false }} initialRouteName="TodoList">
      <MainNavigation.Screen name="Home" component={Home} />
      <MainNavigation.Screen name="TodoList" component={TodoList} />
      <MainNavigation.Screen
        name="TodoDetails"
        component={TodoDetails}
        options={{ headerShown: true, headerBackTitle: undefined }}
      />
    </MainNavigation.Navigator>
  );
};

export default MainNavigationStack;
