import React, {useEffect, useState} from 'react';

import Sheet from '@components/Sheet';
import {dequeueSheet, useAppDispatch, useAppSelector} from '@store/index';
import {Text, View} from 'react-native';

const BottomSheetManager = () => {
  const dispatch = useAppDispatch();
  const {activeSheet} = useAppSelector(state => state.sheet);
  const [sheetVisiblity, setSheetVisiblity] = useState(false);

  useEffect(() => {
    if (activeSheet) {
      setSheetVisiblity(true);
    } else {
      setSheetVisiblity(false);
    }
  }, [activeSheet]);

  // ? Neden Timeout veriyoruz*
  // handleSheetClose fonksiyonu sheetin kapanma süresince işlemine devam eder
  // bu sebepten yeni eklenen sheetlerde kapanma fonksiyonu devam ederken geleceği için
  // kapanma loopuna girer
  const handleSheetClose = () => {
    console.log(handleSheetClose);
    setSheetVisiblity(false);
    setTimeout(() => {
      dispatch(dequeueSheet());
    }, 50);
  };

  const renderContent = () => {
    if (!activeSheet) {
      return null;
    }

    switch (activeSheet.id) {
      case 'profile':
        return <Text>Profil Sheet İçeriği</Text>;
      case 'settings':
        return <Text>Ayarlar Sheet İçeriği</Text>;
      default:
        return activeSheet.metadata?.content ? (
          <Text>{activeSheet.metadata?.content}</Text>
        ) : null;
    }
  };

  return sheetVisiblity && renderContent != null ? (
    <Sheet
      onClose={handleSheetClose}
      sheetContentContainerStyle={{
        padding: 32,
        marginBottom: 0,
        alignItems: 'center',
      }}>
      <View>{renderContent()}</View>
    </Sheet>
  ) : null;
};

export default BottomSheetManager;
