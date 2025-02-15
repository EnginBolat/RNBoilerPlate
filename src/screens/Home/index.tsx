import React, {useState} from 'react';
import {Button, Text, View} from 'react-native';

import {useBackHandler} from '@hooks/index';
import {useLocalization} from '@providers/LocalizationProvider';

import {styles} from './styles';
import {WelcomeSheet} from './components';

const Home = () => {
  const [welcomeSheetVisible, setWelcomeSheetVisible] = useState(false);

  const {translate} = useLocalization();
  useBackHandler(() => console.log('Geri tuşuna basıldı!'), []);

  const handleSheetVisible = () => setWelcomeSheetVisible(prev => !prev);

  return (
    <View style={styles.container}>
      <Text>{translate('app.greeting')}</Text>
      <Button title="Show Sheet Expand" onPress={handleSheetVisible} />
      {welcomeSheetVisible && <WelcomeSheet onClose={handleSheetVisible} />}
    </View>
  );
};

export default Home;
