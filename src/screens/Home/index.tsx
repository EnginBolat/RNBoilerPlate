import React, {useEffect, useState} from 'react';
import {Button, Text, View} from 'react-native';

import {useBackHandler, useDebounce} from '@hooks/index';
import {useLocalization} from '@providers/index';
import { TextInput } from '@components/index';

import {styles} from './styles';
import {WelcomeSheet} from './components';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [welcomeSheetVisible, setWelcomeSheetVisible] = useState(false);

  const debounceSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debounceSearchTerm) {
      console.log('Arama yapılıyor: ', debounceSearchTerm);
    }
  }, [debounceSearchTerm]);

  const {translate, locale, setLocale} = useLocalization();
  useBackHandler(() => console.log('Geri tuşuna basıldı!'), []);

  const isEnglish = locale === 'en';
  const handleSheetVisible = () => setWelcomeSheetVisible(prev => !prev);
  const handleChangeLanguage = () => setLocale(isEnglish ? 'tr' : 'en');

  return (
    <View style={styles.container}>
      <Text>{translate('app.greeting')}</Text>
      <TextInput
        value={searchTerm}
        onChangeText={setSearchTerm}
        placeholderTextColor={'rgba(0,0,0,0.2)'}
        placeholder={translate('app.home.searchTerm')}
      />
      <Button
        title={translate('app.home.showSheet')}
        onPress={handleSheetVisible}
      />
      <Button
        title={translate(
          'app.home.updateLanguageAs',
          isEnglish ? 'app.languages.turkish' : 'app.languages.english',
        )}
        onPress={handleChangeLanguage}
      />
      {welcomeSheetVisible && <WelcomeSheet onClose={handleSheetVisible} />}
    </View>
  );
};

export default Home;
