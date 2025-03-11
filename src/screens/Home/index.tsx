/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from 'react';
import { Button, Text, View } from 'react-native';

import { useBackHandler, useDebounce, useOrientation } from '@hooks/index';
import { useLocalization } from '@providers/index';
import { BottomSheetManager, TextInput } from '@components/index';

import { styles } from './styles';
import { WelcomeSheet } from './components';
import { useAppDispatch, useAppSelector } from '@store/store';
import { dequeueSheet, enqueueSheetList, setActivePage } from '@store/index';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [welcomeSheetVisible, setWelcomeSheetVisible] = useState(false);

  const debounceSearchTerm = useDebounce(searchTerm, 500);
  const { orientation } = useOrientation();

  useEffect(() => {
    dispatch(setActivePage('home'));
    if (debounceSearchTerm) {
      console.log('Arama yapılıyor: ', debounceSearchTerm);
    }
    if (debounceSearchTerm) console.log('Arama yapılıyor: ', debounceSearchTerm);
  }, [debounceSearchTerm]);

  const { translate, locale, setLocale } = useLocalization();
  useBackHandler(() => console.log('Geri tuşuna basıldı!'), []);

  const isEnglish = locale === 'en';
  const dispatch = useAppDispatch();
  const { activeSheet, queue, activePage } = useAppSelector(state => state.sheet);
  const handleRenderBottomSheet = useMemo(() => {
    console.log(queue);
    return activePage === 'home' ? (queue?.length ?? 0) > 0 : false;
  }, [activePage, queue?.length]);

  const handleSheetVisible = () => {
    if (activeSheet) {
      dispatch(dequeueSheet());
    }
  };

  const handleChangeLanguage = () => setLocale(isEnglish ? 'tr' : 'en');
  const handleAddSheets = () => {
    const sheets = [
      {
        id: 'profile',
        page: 'home',
        metadata: { content: 'Profile' },
      },
      {
        id: 'settings',
        page: 'home',
        metadata: { content: 'settings' },
      },
      {
        id: 'profile3',
        page: 'home',
        metadata: { content: 'Profile3 içeriği' },
      },
    ];
    dispatch(enqueueSheetList(sheets));
  };

  return (
    <View style={styles.container}>
      <Text>{translate('app.greeting')}</Text>
      <TextInput
        value={searchTerm}
        onChangeText={setSearchTerm}
        placeholderTextColor={'rgba(0,0,0,0.2)'}
        placeholder={translate('app.home.searchTerm')}
      />
      <Button title={translate('app.home.showSheet')} onPress={handleSheetVisible} />
      <Button
        title={translate('app.home.updateLanguageAs', isEnglish ? 'app.languages.turkish' : 'app.languages.english')}
        onPress={handleChangeLanguage}
      />
      <Button title={'Add Sheets'} onPress={handleAddSheets} />
      {welcomeSheetVisible && <WelcomeSheet onClose={handleSheetVisible} />}
      {handleRenderBottomSheet && <BottomSheetManager />}
    </View>
  );
};

export default Home;
