import React from 'react';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

import StartScreen from './screens/StartScreen';
import BookListScreen from './screens/BookListScreen';
import BookDetailsScreen from './screens/BookDetailsScreen';
import BookSearchScreen from './screens/BookSearchScreen';

// Навигация между экранами приложения
function RootNavigator() {
  const BookStack = createSharedElementStackNavigator();

  return (
    <BookStack.Navigator
      initialRouteName="Books"
      screenOptions={{
        headerShown: false,
        cardOverlayEnabled: true,
        cardStyle: { backgroundColor: 'transparent' },
      }}
      detachInactiveScreens={false}
    >
      <BookStack.Screen name="StartScreen" component={StartScreen} />
      <BookStack.Screen name="BookList" component={BookListScreen} />
      <BookStack.Screen
        name="BookDetails"
        component={BookDetailsScreen}
      />
      <BookStack.Screen
        name="BookSearch"
        component={BookSearchScreen}
      />
    </BookStack.Navigator>
  );
}

export default React.memo(RootNavigator);
