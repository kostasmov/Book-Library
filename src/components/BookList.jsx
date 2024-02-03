import React from 'react';

import {
  View,
  StyleSheet,
  FlatList,
  Pressable,
} from 'react-native';

import Animated, { useSharedValue, useAnimatedScrollHandler } from 'react-native-reanimated';
import { useTheme, useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

import Text from './Text';
import Book from './Book';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

// Горизонтальный прокручиваемый список
function BookList({ books, title }) {
  const { width, margin, colors } = useTheme();
  const navigation = useNavigation();
  const scrollX = useSharedValue(0);

  // прокрутка по горизонтали
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: ({ contentOffset }) => {
      scrollX.value = contentOffset.x;
    },
  });

  // переход на страницу поиска
  const searchScreen = () => {
    navigation.push('BookSearch');
  };

  // стили
  const styles = StyleSheet.create({
    list: {
      backgroundColor: colors.card,
      paddingTop: (title === 'Читаю' ? margin : 0),
    },
    heading: {
      paddingTop: margin,
      paddingHorizontal: margin,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    listContainer: {
      padding: margin,
    },
    emptyContainer: {
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      width: width - margin * 2,
      paddingVertical: margin * 3,
      backgroundColor: colors.background,
    },
    emptyText: {
      padding: margin,
    },
  });

  // отображение пустого списка
  const EmptyList = () => (
    <Pressable onPress={searchScreen} style={styles.emptyContainer}>
      <AntDesign color={colors.text} size={27} name="book" />
      <Text size={16} center style={styles.emptyText}>
        {'Здесь ничего нет. \n Нажмите чтобы добавить книгу.'}
      </Text>
    </Pressable>
  );

  return (
    <View style={styles.list}>
      <View style={styles.heading}>
        <Text size={17} bold>{title}</Text>
        <Text size={17}>{books.length}</Text>
      </View>
      <AnimatedFlatList
        horizontal
        onScroll={scrollHandler}
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        data={books}
        keyExtractor={(i) => i.bookId}
        renderItem={({ item }) => (
          <Pressable>
            <Book book={item} />
          </Pressable>
        )}
        ListEmptyComponent={<EmptyList />}
      />
    </View>
  );
}

export default React.memo(BookList);
