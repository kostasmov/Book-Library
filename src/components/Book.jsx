import React, { useEffect } from 'react';

import {
  View,
  Image,
  StyleSheet,
  LayoutAnimation,
  Pressable,
} from 'react-native';

import {
  useTheme,
  useNavigation
} from '@react-navigation/native';

import { SharedElement } from 'react-navigation-shared-element';

import Text from './Text';

// Компонент книги из списка
function Book({ book}) {
  const navigation = useNavigation();
  const { margin, normalize } = useTheme();

  // Переход на страницу информации о книге
  const openBookDetails = () => {
    navigation.push('BookDetails', { book });
  };

  // Стили
  const styles = StyleSheet.create({
    imgBox: {
      marginRight: margin,
      borderRadius: 10,
      elevation: 6,
      shadowRadius: 6,
      shadowOpacity: 0.3,
      shadowOffset: { width: 0, height: 6 },
    },
    bookImg: {
      width: normalize(120, 150),
      height: normalize(120, 150) * 1.5,
      borderRadius: 10,
    },
    bookText: {
      width: normalize(120, 150),
      marginRight: margin,
      marginTop: margin / 2,
    },
  });

  return (
    <Pressable onPress={openBookDetails}>
      <SharedElement id={book.bookId}>
        <View style={styles.imgBox}>
          <Image style={styles.bookImg} source={{ uri: book.imageUrl }} />
        </View>
      </SharedElement>
      <Text size={13} numberOfLines={1} center style={styles.bookText}>
        {book.title}
      </Text>
    </Pressable>
  );
}

export default React.memo(Book);
