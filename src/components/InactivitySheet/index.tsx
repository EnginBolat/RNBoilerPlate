import React from 'react';
import {Text, View} from 'react-native';

import Sheet from '@components/Sheet';
import Button from '@components/Button';
import {useLocalization} from '@providers/index';

import {styles} from './styles';
import {InactivitySheetProps} from './types';

const InactivitySheet = ({onPress}: InactivitySheetProps) => {
  const {translate} = useLocalization();

  return (
    <Sheet panDownToClose={false}>
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
};

export default InactivitySheet;
