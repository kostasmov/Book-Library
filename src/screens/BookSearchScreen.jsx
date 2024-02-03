import React, { useState, useEffect } from 'react';

import {
  View,
  TextInput,
  StyleSheet,
  Pressable,
} from 'react-native';

import Animated from 'react-native-reanimated';
import { SharedElement } from 'react-navigation-shared-element';
import { useTheme } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';

import Text from '../components/Text';
import SearchBook from '../components/SearchBook';
import { useBooksState } from '../BookStore';

const lottie = require('../anims/stack.json');

// Страница поиска книг
function BookSearchScreen({ navigation }) {
  const {
    colors, height, margin, status, navbar,
  } = useTheme();
  const { books: bookList } = useBooksState();
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);

  // вернуться на главный экран
  const goBack = () => {
    navigation.goBack();
  };

  // переход на страницу книги
  const onBookDetails = (book) => {
    navigation.push('BookDetails', { book });
  };

  // поиск книг по запросу
  useEffect(() => {
    if (query.length > 1) {
      const matchList = bookList.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.author.name.toLowerCase().includes(query.toLowerCase())
      );
      setBooks(matchList);
    }
  }, [query]);

  // стили
  const styles = StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.background,
    },
    search: {
      zIndex: 10,
      height: navbar,
      alignItems: 'flex-end',
      flexDirection: 'row',
      paddingTop: status,
      paddingBottom: 6,
      paddingHorizontal: margin / 2,
      justifyContent: 'space-between',
      backgroundColor: colors.background,
    },
    sharedElement: {
      flex: 1,
      height: 38,
    },
    searchIcon: {
      width: 30,
      opacity: 0.3,
    },
    closeIcon: {
      margin: 5,
      opacity: 0.3,
    },
    searchInput: {
      flex: 1,
      height: 38,
      fontSize: 15,
      borderRadius: 20,
      color: colors.text,
      paddingHorizontal: margin,
      backgroundColor: colors.card,
      flexDirection: 'row',
      alignItems: 'center',
    },
    textInput: {
      height: 38,
      width: '100%',
      fontSize: 16,
      color: '#A9A9A9',
    },
    saveButton: {
      width: 60,
      height: 38,
      lineHeight: 38,
      textAlign: 'right',
      color: '#888888',
    },
    placeholderBox: {
      alignItems: 'center',
      marginTop: margin * 2,
      justifyContent: 'center',
    },
    placeholderImg: {
      opacity: 0.95,
      height: height / 3.5,
      marginBottom: margin,
    },
    placeholderText: {
      fontSize: 15,
      paddingHorizontal: margin * 3,
    },
    scrollContainer: {
      padding: margin,
    },
  });

  // Заполнение при пустом экране
  const PlaceHolder = () => (
    <View style={styles.placeholderBox}>
      <LottieView
        autoPlay
        loop={false}
        speed={0.8}
        source={lottie}
        style={styles.placeholderImg}
      />
      <Text center style={styles.placeholderText}>
        Ищите книги по названию или имени автора.
      </Text>
    </View>
  );

  return (
    <View style={styles.screen}>
      <Animated.View style={styles.search}>
        <SharedElement style={styles.sharedElement}>
          <View size={15} style={styles.searchInput}>
            <View style={styles.searchIcon}>
              <AntDesign color={colors.text} name="search1" size={15} />
            </View>
            <TextInput
              autoFocus
              width="100%"
              value={query}
              autoCorrect={false}
              style={styles.textInput}
              onChangeText={(text) => setQuery(text)}
              placeholder="Поиск книг"
            />
          </View>
        </SharedElement>
        <Pressable style={styles.closeIcon} onPress={goBack}>
          <AntDesign color={colors.text} name="close" size={30} />
        </Pressable>
      </Animated.View>

      <Animated.ScrollView
        scrollEventThrottle={1}
        contentContainerStyle={styles.scrollContainer}
      >
        {!books.length && <PlaceHolder />}
        {books.map((book) => (
          <Pressable
            key={book.bookId}
            onPress={() => onBookDetails(book)}
          >
            <SearchBook book={book} />
          </Pressable>
        ))}
      </Animated.ScrollView>
    </View>
  );
}

export default React.memo(BookSearchScreen);
