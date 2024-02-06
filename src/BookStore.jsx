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

// Запись начальных данных в AsyncStorage
const setInitialData = async () => {
  try {
    const json1 = await AsyncStorage.getItem('books');
    if (json1 === null) {
      await AsyncStorage.setItem('books', JSON.stringify(initialBooks));
    }

    await AsyncStorage.setItem('authors', JSON.stringify(initialAuthors));
  } catch (error) {
    console.error(error);
  }
}

// Загрузка данных из хранилища в state
async function loadBooks() {
  try {
    const booksJSON = await AsyncStorage.getItem('books');
    state.setBooks(JSON.parse(booksJSON));

    const authorsJSON = await AsyncStorage.getItem('authors');
    state.authors = JSON.parse(authorsJSON);
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
setInitialData();
loadBooks();
