import AsyncStorage from '@react-native-async-storage/async-storage';
import { proxy, useSnapshot } from 'valtio';
import setMockData from './mock.js'

// Реактивный объект с информацией о книгах
const state = proxy({
  books: [],
});

// Загрузка книг из хранилища
async function loadBooks() {
  const json = await AsyncStorage.getItem('@lists');
  const data = json ? JSON.parse(json) : [];
  state.books = data;
}

// Связывание mock.js и books через хранилище
setMockData().then(() => {
  setTimeout(() => {
    loadBooks();
  }, 100)
})

// Обновление данных в хранилище
/*async function saveBooks() {
  AsyncStorage.setItem('@lists', JSON.stringify(state.books));
}*/

// Глобальный экспорт данных из books
export const useBooksState = () => useSnapshot(state);

// ???
/*export const setBookState = () => ({
  addBook: (book, status) => {
    state.books.unshift({ ...book, status });
    saveBooks();
    console.log('addBooks');
  },
  updateBook: (book, status) => {
    const index = state.books.findIndex((b) => b.bookId === book.bookId);
    if (index !== -1) state.books[index] = { ...book, status };
    saveBooks();
    console.log('updateBooks');
  },
  removeBook: (book) => {
    const index = state.books.findIndex((b) => b.bookId === book.bookId);
    if (index !== -1) state.books.splice(index, 1);
    saveBooks();
    console.log('removeBooks');
  },
});*/
