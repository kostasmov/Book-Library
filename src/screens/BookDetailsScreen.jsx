import React, { useState } from 'react';

import {
  View,
  Image,
  Pressable,
  StyleSheet,
} from 'react-native';

import Animated, {
  withTiming,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import { ScrollView } from 'react-native-gesture-handler';
import { useTheme } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

import Text from '../components/Text';
import List from '../components/BookList';
import BookHeader from '../components/BookHeader';
import { useBooksState } from '../BookStore';

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

// Преобразование статуса книги на русский
const getStatus = (stat) => {
  switch (stat) {
    case 'Reading':
      return 'Читаю';
    case 'Completed':
      return 'Прочитано';
    case 'Wishlist':
      return 'Буду читать';
    default:
      return '-';
  }
};

// Страница с информацией о книге
function BookDetailsScreen({ navigation, route }) {
  const { book } = route.params;
  const { books: bookList, authors, setBooks } = useBooksState();
  const [bookStatus, setStatus] = useState(book.status);
  const author = authors.find(a => a.authorId === book.authorId);

  const closing = useSharedValue(0.9);
  const scrollY = useSharedValue(0);

  const {
    margin, width, dark, colors, normalize, status,
  } = useTheme();
  const HEADER = normalize(width + status, 500) + margin;

  // Возврат на предыдущую страницу
  const goBack = () => {
    navigation.goBack();
  };

  // Изменение статуса книги
  const changeStatus = () => {
    const newStatus = (() => {
      switch (bookStatus) {
        case 'Wishlist':
          return 'None';
        case 'Reading':
          return 'Completed';
        case 'Completed':
          return 'Wishlist';
        default:
          return 'Reading';
      }
    })();

    setStatus(newStatus);

    // Обновление статуса в массиве книг
    const updatedBooks = bookList.map(b => {
      if (b.bookId === book.bookId) {
        return {
          ...book,
          status: newStatus
        };
      }
      return b;
    });

    setBooks(updatedBooks);
  };

  // Стили анимации
  const anims = {
    screen: useAnimatedStyle(() => ({
      flex: 1,
      opacity: withTiming(closing.value < 0.9 ? 0 : 1),
      overflow: 'hidden',
    })),
  };

  // Стили
  const styles = StyleSheet.create({
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0,0,0,.25)',
    },
    scrollView: {
      flex: 1,
      backgroundColor: colors.background,
    },
    closeIcon: {
      zIndex: 10,
      top: margin + 20,
      right: margin,
      opacity: 0.75,
      color: colors.text,
      position: 'absolute',
    },
    scrollContainer: {
      paddingTop: HEADER,
    },
    detailsBox: {
      borderRadius: 10,
      flexDirection: 'row',
      marginHorizontal: margin,
      backgroundColor: colors.card,
    },
    detailsRow: {
      flex: 1,
      paddingVertical: margin / 2,
    },
    detailsRowBorder: {
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderColor: dark ? '#ffffff22' : '#00000011',
    },
    subDetails: {
      fontSize: 15,
      textAlign: 'center',
      marginTop: margin / 4,
    },
    authorBox: {
      marginTop: margin,
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: margin,
    },
    authorImage: {
      width: 65,
      height: 65,
      borderRadius: 65,
      marginRight: margin,
    },
    authorDetails: {
      marginTop: 5,
      opacity: 0.75,
      width: width - 120,
    },
    aboutBook: {
      margin,
      lineHeight: 25,
      textAlign: 'justify',
    },
  });

  return (
    <View style={styles.overlay}>
      <Animated.View style={anims.screen}>
        <View style={styles.scrollView}>
          <AnimatedScrollView
            scrollEventThrottle={1}
            contentContainerStyle={styles.scrollContainer}
          >
            <BookHeader scrollY={scrollY} book={book} />
            <AntDesign size={27} name="close" onPress={goBack} style={styles.closeIcon} />

            <View style={styles.detailsBox}>
              <View style={styles.detailsRow}>
                <Text center size={13}>РЕЙТИНГ</Text>
                <Text bold style={styles.subDetails}>{book.avgRating}</Text>
              </View>
              <View style={[styles.detailsRow, styles.detailsRowBorder]}>
                <Text center size={13}>СТРАНИЦЫ</Text>
                <Text bold style={styles.subDetails}>{book.numPages}</Text>
              </View>
              <Pressable onPress={changeStatus} style={styles.detailsRow}>
                <Text center size={13}>СТАТУС</Text>
                <Text bold color={colors.primary} style={styles.subDetails}>
                  {getStatus(bookStatus)}
                </Text>
              </Pressable>
            </View>

            <View>
              <View style={styles.authorBox}>
                <Image source={{ uri: author.image_url }} style={styles.authorImage} />
                <View>
                  <Text bold size={17}>{author.name}</Text>
                  <Text numberOfLines={2} style={styles.authorDetails}>
                    {author.about}
                  </Text>
                </View>
              </View>
              <Text size={16} numberOfLines={10} style={styles.aboutBook}>
                {book.description}
              </Text>
              <List books={bookList.filter(el => book.relatedIds && book.relatedIds.includes(el.bookId))} title="Связанное" navigation={navigation} />
            </View>
          </AnimatedScrollView>
        </View>
      </Animated.View>
    </View>
  );
}

export default React.memo(BookDetailsScreen);
