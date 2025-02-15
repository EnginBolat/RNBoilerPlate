import React from 'react';
import Sheet from '@components/Sheet';
import {Text} from 'react-native';
import {useLocalization} from '@providers/index';

interface IWelcomeSheet {
  onClose: () => void;
}

const WelcomeSheet = ({onClose}: IWelcomeSheet) => {
  const {translate} = useLocalization();

  return (
    <Sheet onClose={onClose}>
      <>
        <Text>1th {translate('app.greeting')}</Text>
        <Text>2th {translate('app.greeting')}</Text>
        <Text>3th {translate('app.greeting')}</Text>
        <Text>4th {translate('app.greeting')}</Text>
        <Text>5th {translate('app.greeting')}</Text>
      </>
    </Sheet>
  );
};

export default WelcomeSheet;
