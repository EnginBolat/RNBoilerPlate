import React, { useRef } from 'react';

import MainNavigationStack from '@stacks/MainNavigationStack';
import {
  setInacitivitySheet,
  useAppDispatch,
  useAppSelector,
} from '@store/index';
import {UserInactivityProvider} from '@providers/index';
import {InactivitySheet} from '@components/index';
import AppConstants from '@constants/AppConstants';
import {Keyboard} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

const Router = () => {
  const dispatch = useAppDispatch();
  const inacitivitySheetRef = useRef<BottomSheet>(null);
  const inactivitySheetVisible = useAppSelector(
    state => state.global.inactivitySheetVisible,
  );

  const onInactivityTimeout = () => {
    console.info('User Inactive');

    Keyboard.dismiss();
    dispatch(setInacitivitySheet(!inactivitySheetVisible));
  };

  const handleInacivitySheetOnPress = () => {
    console.info('User Active');
    inacitivitySheetRef.current?.close();
    setTimeout(() => dispatch(setInacitivitySheet(!inactivitySheetVisible)), 300);
  };

  return (
    <>
      <UserInactivityProvider
        isLogin={false}
        timeForInactivity={AppConstants.TIME_FOR_INACTIVITY}
        onInactivityTimeout={onInactivityTimeout}>
        <MainNavigationStack />
      </UserInactivityProvider>
      {inactivitySheetVisible && (
        <InactivitySheet ref={inacitivitySheetRef} onPress={handleInacivitySheetOnPress} />
      )}
    </>
  );
};

export default Router;
