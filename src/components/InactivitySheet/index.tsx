import React, {forwardRef} from 'react';
import {Text, View} from 'react-native';

import Sheet from '@components/Sheet';
import Button from '@components/Button';
import {useLocalization} from '@providers/index';
import BottomSheet from '@gorhom/bottom-sheet';

import {styles} from './styles';
import {InactivitySheetProps} from './types';

const InactivitySheet = forwardRef<BottomSheet, InactivitySheetProps>(({onPress}, ref) => {
    const {translate} = useLocalization();

    return (
      <Sheet ref={ref} panDownToClose={false}>
        <View style={styles.inativeSheetInnerContainer}>
          <Text style={styles.inativeSheetTitle}>
            {translate('app.inActivity.noMotionDetectedTitle')}
          </Text>
          <Text style={styles.inativeSheetDescription}>
            {translate('app.inActivity.noMotionDetectedDesc')}
          </Text>
          <Button title={translate('app.common.tryAgain')} onPress={onPress} />
        </View>
      </Sheet>
    );
  },
);

export default InactivitySheet;
