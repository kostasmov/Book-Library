import AsyncStorage from '@react-native-async-storage/async-storage';

let mockData = [
    {
        bookId: 1,
        status: '',
        numPages: 150,
        avgRating: 3.6,
        title: 'Bare title',
        imageUrl: 'https://www.texanerin.com/content/uploads/2019/06/nobake-chocolate-cookies-1-650x975.jpg',
        description: 'this is a good book',
        relatedIds: [],
        author: {
            name: 'David King',
            image_url: 'https://th.bing.com/th/id/OIP.p0a8fUSQQAd99wh0AZdPJAHaEo?w=155&h=182&c=7&r=0&o=5&pid=1.7',
            about: 'dwqnjkdwnqwjk 1223',
        },
    },
    {
        bookId: 2,
        status: 'Reading',
        title: 'Bare title',
        numPages: 350,
        avgRating: 4,
        imageUrl: 'https://th.bing.com/th/id/OIP.EYdT7l9cizAp4u7dRlA8ywHaD5?w=307&h=180&c=7&r=0&o=5&pid=1.7',
        description: 'this is a not bad book',
        relatedIds: [1, 2],
        author: {
            name: 'David King father',
            image_url: 'https://th.bing.com/th/id/OIP.p0a8fUSQQAd99wh0AZdPJAHaEo?w=155&h=182&c=7&r=0&o=5&pid=1.7',
            about: 'dwqnjkdwnqwjk 1223',
        }
    },
    {
        bookId: 3,
        status: 'Reading',
        title: 'Bare title',
        numPages: 50,
        avgRating: 5,
        imageUrl: 'https://th.bing.com/th/id/OIP.9-1-IWqS-RiC8QCiWBuaxgHaEo?w=223&h=180&c=7&r=0&o=5&pid=1.7',
        description: 'That is all right',
        relatedIds: [1, 2],
        author: {
            name: 'Tom',
            image_url: 'https://th.bing.com/th/id/OIP.X550xngH_XGXcgSogi1XLAHaEK?w=304&h=180&c=7&r=0&o=5&pid=1.7',
            about: 'dwqnjkdwnqwjk 1223',
        }
    },
    {
        bookId: 4,
        status: 'Reading',
        title: 'Bare title',
        numPages: 150,
        avgRating: 5,
        imageUrl: 'https://th.bing.com/th/id/OIP.ej6xO43EOubmidv01efXbgHaDx?w=319&h=178&c=7&r=0&o=5&pid=1.7',
        description: 'nothing is written',
        relatedIds: [],
        author: {
            name: 'Jerry',
            image_url: 'https://th.bing.com/th/id/OIP.X550xngH_XGXcgSogi1XLAHaEK?w=304&h=180&c=7&r=0&o=5&pid=1.7',
            about: 'dwqnjkdwnqwjk 1223',
        }
    },
    {
        bookId: 5,
        status: 'Reading',
        title: 'Bare title',
        numPages: 150,
        avgRating: 5,
        imageUrl: 'https://th.bing.com/th/id/OIP.il4Nq4ViBsylDuVRqRjYxwHaEo?w=287&h=180&c=7&r=0&o=5&pid=1.7',
        description: 'where are you?',
        relatedIds: [],
        author: {
            name: 'Kenin',
            image_url: 'https://th.bing.com/th/id/OIP.9Hc_BKrM_ONJ0wcxJ-liAAHaEK?w=278&h=180&c=7&r=0&o=5&pid=1.7',
            about: 'dwqnjkdwnqwjk 1223',
        }
    },
    {
        bookId: 6,
        status: 'Completed',
        title: 'Война и мир',
        numPages: 220,
        avgRating: 3,
        imageUrl: 'https://th.bing.com/th/id/OIP.il4Nq4ViBsylDuVRqRjYxwHaEo?w=287&h=180&c=7&r=0&o=5&pid=1.7',
        description: 'where are you?',
        relatedIds: [],
        author: {
            name: 'Kenin',
            image_url: 'https://th.bing.com/th/id/OIP.9Hc_BKrM_ONJ0wcxJ-liAAHaEK?w=278&h=180&c=7&r=0&o=5&pid=1.7',
            about: 'dwqnjkdwnqwjk 1223',
        }
    },
]

// Выгрузка книг в хранилище
export default async function setMockData() {
    return await AsyncStorage.setItem('@lists', JSON.stringify(mockData))
}