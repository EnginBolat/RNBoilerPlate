import React from 'react';

import MainNavigationStack from '@stacks/MainNavigationStack';
import {
  setInacitivitySheet,
  useAppDispatch,
  useAppSelector,
} from '@store/index';
import {UserInactivityProvider} from '@providers/index';
import {InactivitySheet} from '@components/index';
import { TIME_FOR_INACTIVITY } from '@constants/AppConstants';

const Router = () => {
  const dispatch = useAppDispatch();
  const inactivitySheetVisible = useAppSelector(
    state => state.global.inactivitySheetVisible,
  );

  const onInactivityTimeout = () => {
    console.log('User Inactive');
    dispatch(setInacitivitySheet(!inactivitySheetVisible));
  };

  const handleInacivitySheetOnPress = () => {
    console.log('User Active');
    dispatch(setInacitivitySheet(!inactivitySheetVisible));
  };

  return (
    <>
      <UserInactivityProvider
        isLogin={true}
        timeForInactivity={TIME_FOR_INACTIVITY}
        onInactivityTimeout={onInactivityTimeout}>
        <MainNavigationStack />
      </UserInactivityProvider>
      {inactivitySheetVisible && (
        <InactivitySheet onPress={handleInacivitySheetOnPress} />
      )}
    </>
  );
};

export default Router;
