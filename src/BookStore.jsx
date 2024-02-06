import { proxy, useSnapshot } from 'valtio';
import AsyncStorage from '@react-native-async-storage/async-storage';
import initialBooks from './data/books.json';
import initialAuthors from './data/authors.json';

// Реактивный объект с информацией о книгах
const state = proxy({
  books: [],
  authors: [],
  setBooks: (updatedBooks) => {
    state.books = updatedBooks;
    saveBooks();
  },
  setAuthors: (updatedAuthors) => {
    state.authors = updatedAuthors;
    saveBooks();
  },
});

// Загрузка данных
const loadData = async () => {
  try {
    const booksJSON = await AsyncStorage.getItem('books');
    const authorsJSON = await AsyncStorage.getItem('authors');

    if (booksJSON === null || authorsJSON === null) {
      state.books = initialBooks;
      state.authors = initialAuthors;
      saveBooks();
    } else {
      state.books = JSON.parse(booksJSON);
      state.authors = JSON.parse(authorsJSON);
    }
  } catch (error) {
    console.error(error);
  }
}

// Обновление данных в хранилище
const saveBooks = async () => {
  try {
    await AsyncStorage.setItem('books', JSON.stringify(state.books));
    await AsyncStorage.setItem('authors', JSON.stringify(state.authors));
  } catch (error) {
    console.error(error);
  }
}

// Глобальный экспорт данных из state
export const useBooksState = () => useSnapshot(state);

// Загрузка книг при запуске приложения
loadData();
