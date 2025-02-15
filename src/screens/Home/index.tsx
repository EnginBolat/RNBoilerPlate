import React, {useState} from 'react';
import {Button, Text, View} from 'react-native';

import {useBackHandler} from '@hooks/index';
import {useLocalization} from '@providers/index';

import {styles} from './styles';
import {WelcomeSheet} from './components';

const Home = () => {
  const [welcomeSheetVisible, setWelcomeSheetVisible] = useState(false);

  const {translate, locale, setLocale} = useLocalization();
  useBackHandler(() => console.log('Geri tuşuna basıldı!'), []);

  const isEnglish = locale === 'en';
  const handleSheetVisible = () => setWelcomeSheetVisible(prev => !prev);
  const handleChangeLanguage = () => setLocale(isEnglish ? 'tr' : 'en');

  return (
    <View style={styles.container}>
      <Text>{translate('app.greeting')}</Text>
      <Button title={translate('app.home.showSheet')} onPress={handleSheetVisible} />
      <Button
        title={translate('app.home.updateLanguageAs', isEnglish ? 'app.languages.turkish' : 'app.languages.english')}
        onPress={handleChangeLanguage}
      />
      {welcomeSheetVisible && <WelcomeSheet onClose={handleSheetVisible} />}
    </View>
  );
};

export default Home;
