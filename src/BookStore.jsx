import { proxy, useSnapshot } from 'valtio';
import AsyncStorage from '@react-native-async-storage/async-storage';
import initialBooks from './data.json';

// Реактивный объект с информацией о книгах
const state = proxy({
  books: [],
  setBooks: (updatedBooks) => {
    state.books = updatedBooks;
    saveBooks();
  },
});

// Загрузка книг из хранилища
async function loadBooks() {
  try {
    const json = await AsyncStorage.getItem('books');
    if (json !== null) {
      const data = JSON.parse(json);
      state.setBooks(data);
    }
  } catch (error) {
    console.error(error);
  }
}

// Обновление данных в хранилище
const saveBooks = async () => {
  try {
    const json = JSON.stringify(state.books);
    await AsyncStorage.setItem('books', json);
  } catch (error) {
    console.error(error);
  }
}

// Глобальный экспорт данных из books
export const useBooksState = () => useSnapshot(state);

// Запись начальных данных в AsyncStorage
const setInitialData = async () => {
  try {
    const json = await AsyncStorage.getItem('books');
    if (json === null) {
      await AsyncStorage.setItem('books', JSON.stringify(initialBooks));
    }
  } catch (error) {
    console.error(error);
  }
}

// Запуск функции при инициализации приложения
setInitialData();

// Загрузка книг при запуске приложения
loadBooks();
