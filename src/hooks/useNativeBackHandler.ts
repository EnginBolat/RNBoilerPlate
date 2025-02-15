import {useEffect} from 'react';
import {BackHandler} from 'react-native';

/**
 * Custom hook to handle the Android hardware back button.
 *
 * @param handler A callback function that executes when the back button is pressed.
 * @param dependencies An array of dependencies that will trigger the effect when changed.
 */
export const useBackHandler = (handler: () => void, dependencies: any[] = []) => {
  useEffect(() => {
    const backAction = () => {
      if (handler) {
        handler();
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [handler, dependencies]);
};

export default useBackHandler;


//! USAGE

// useBackHandler(() => {
//     console.log("Geri tuşuna basıldı!");
//   }, [navigation]);
