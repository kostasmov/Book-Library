import React from 'react';
import { View, Image } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import { useTheme } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

import Text from './Text';
import { useBooksState } from '../BookStore';

// Рейтинг в виде звёзд
const Rating = React.memo(({ rating }) => (
  <View style={{ width: 90, flexDirection: 'row', justifyContent: 'space-between' }}>
    <FontAwesome size={16} name={rating < 0.5 ? 'star-o' : rating < 0.8 ? 'star-half-o' : 'star'} color="#f39c12" />
    <FontAwesome size={16} name={rating < 1.5 ? 'star-o' : rating < 1.8 ? 'star-half-o' : 'star'} color="#f39c12" />
    <FontAwesome size={16} name={rating < 2.5 ? 'star-o' : rating < 2.8 ? 'star-half-o' : 'star'} color="#f39c12" />
    <FontAwesome size={16} name={rating < 3.5 ? 'star-o' : rating < 3.8 ? 'star-half-o' : 'star'} color="#f39c12" />
    <FontAwesome size={16} name={rating < 4.5 ? 'star-o' : rating < 4.8 ? 'star-half-o' : 'star'} color="#f39c12" />
  </View>
));

// Иконка книги при поиске
function Book({ book }) {
  const { margin, colors, normalize } = useTheme();
  const BOOKW = normalize(120, 150);
  const BOOKH = BOOKW * 1.5;

  const { authors } = useBooksState();
  const author = authors.find(a => a.authorId === book.authorId);

  // стили
  const styles = {
    bookBox: {
      flexDirection: 'row',
      marginBottom: margin * 1.5,
    },
    imgBox: {
      borderRadius: 10,
      shadowRadius: 6,
      shadowOpacity: 0.3,
      shadowOffset: { width: 0, height: 6 },
    },
    bookImg: {
      width: BOOKW,
      height: BOOKH,
      borderRadius: 10,
    },
    bookDetails: {
      flex: 1,
      justifyContent: 'center',
      paddingLeft: margin * 1.5,
    },
    bookAuthor: {
      marginVertical: margin / 3,
    },
    bookTitle: {
      marginTop: margin,
      fontSize: 17,
      numberOfLines: 2,
      fontWeight: "bold",
    },
  };

  return (
    <View style={styles.bookBox}>
      <SharedElement id={book.bookId}>
        <View style={styles.imgBox}>
          <Image style={styles.bookImg} source={{ uri: book.imageUrl }} />
        </View>
      </SharedElement>

      <View style={styles.bookDetails}>
        {book?.status && (
          <Text bold color={colors.primary}>
            {(() => {
              switch (book.status) {
                case 'Reading':
                  return 'Читаю';
                case 'Completed':
                  return 'Прочитано';
                case 'Wishlist':
                  return 'Буду читать';
                default:
                  return '';
              }
            })()}
          </Text>
        )}
        <Text style={styles.bookTitle}>
          {book.title}
        </Text>
        <Text style={styles.bookAuthor}>
          {author.name}
        </Text>
        <Rating rating={book.avgRating} />
      </View>
    </View>
  );
}

export default React.memo(Book);
