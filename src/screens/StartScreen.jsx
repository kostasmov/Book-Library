import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

import Text from '../components/Text';
import Button from '../components/Button';

// Заглавная анимация
const lottie = require('../anims/reading.json');

// Начальный экран приложения
function StartScreen({ navigation }) {
  const { colors, margin, normalize } = useTheme();

  // Стили
  const styles = StyleSheet.create({
    screen: {
      backgroundColor: colors.background,
      margin: 55,
      marginTop: 70,
    },
    lottie: {
      alignSelf: 'center',
      marginRight: margin / 1,
      width: normalize(320, 400),
    },
    title: {
      fontSize: 50,
      lineHeight: 60,
      fontWeight: '700',
      marginTop: margin * 2,
    },
    subTitle: {
      fontSize: 17,
      fontWeight: '500',
      marginTop: margin,
      marginBottom: margin * 2,
      textAlign: "center",
      lineHeight: 24,
    },
  });

  return (
    <View style={styles.screen} centerContent>
      <LottieView autoPlay loop style={styles.lottie} source={lottie} />
      <Text bold center style={styles.title}>
        {'Библиотека'}
      </Text>
      <Text style={styles.subTitle}>
        {'Приложение на React Native. \n Выполнил Мовенко Константин \n ИС/б-21-2-о'}
      </Text>
      <Button onPress={() => navigation.push('BookList')}>
        Начать работу
      </Button>
    </View>
  );
}

export default React.memo(StartScreen);
