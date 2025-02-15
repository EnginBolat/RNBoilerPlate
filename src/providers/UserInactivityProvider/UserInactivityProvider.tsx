/* eslint-disable react-hooks/exhaustive-deps */
// import {useAppDispatch} from '@store/index';
import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {PanResponder, View} from 'react-native';
import BackgroundTimer, {IntervalId} from 'react-native-background-timer';
import {IUserInactivityContext, IUserInactivityProvider} from './types';
import {useAppSelector} from '@store/index';

const UserInactivityContext = createContext<IUserInactivityContext>({
  resetTimer: () => {},
});

export const UserInactivityProvider = ({
  children,
  timeForInactivity,
  isLogin,
  onInactivityTimeout,
}: IUserInactivityProvider) => {
  const globalState = useAppSelector(state => state.global);
  const {inactivitySheetVisible} = globalState;

  const [lastInteraction, setLastInteraction] = useState(Date.now());

  const [panResponder] = useState(
    PanResponder.create({
      onMoveShouldSetPanResponderCapture: resetTimerForPanResponder,
      onPanResponderTerminationRequest: resetTimerForPanResponder,
      onStartShouldSetPanResponderCapture: resetTimerForPanResponder,
    }),
  );
  const {
    onMoveShouldSetResponderCapture,
    onResponderTerminationRequest,
    onStartShouldSetResponderCapture,
  } = panResponder.panHandlers;

  function resetTimerForPanResponder() {
    resetTimer();
    return false;
  }

  const resetTimer = useCallback(() => {
    setLastInteraction(Date.now());
  }, []);

  useEffect(() => {
    let interval: IntervalId | null = null;

    if (!inactivitySheetVisible && isLogin) {
      interval = BackgroundTimer.setInterval(() => {
        const now = Date.now();
        if (now - lastInteraction > timeForInactivity) {
          onInactivityTimeout();
        }
      }, 1000);
    }

    return () => {
      if (interval) {BackgroundTimer.clearInterval(interval);}
    };
  }, [isLogin, lastInteraction, timeForInactivity, inactivitySheetVisible, onInactivityTimeout]);


  const value = useMemo(() => ({resetTimer}), [resetTimer]);

  return (
    <UserInactivityContext.Provider value={value}>
      <View
        style={{flex: 1}}
        collapsable={false}
        onMoveShouldSetResponderCapture={onMoveShouldSetResponderCapture}
        onResponderTerminationRequest={onResponderTerminationRequest}
        onStartShouldSetResponder={onStartShouldSetResponderCapture}>
        {children}
      </View>
    </UserInactivityContext.Provider>
  );
};

export const useUserInactivity = () => React.useContext(UserInactivityContext);
