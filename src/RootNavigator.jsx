import React from 'react';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

import StartScreen from './screens/StartScreen';
import BookListScreen from './screens/BookListScreen';
import BookDetailsScreen from './screens/BookDetailsScreen';
import BookSearchScreen from './screens/BookSearchScreen';

// Навигация между экранами приложения
function RootNavigator() {
  const BookStack = createSharedElementStackNavigator();

  const fadeScreen = ({ current }) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });

  const bookTransition = {
    animation: 'spring',
    config: {
      mass: 3,
      damping: 300,
      stiffness: 1000,
      overshootClamping: false,
      restDisplacementThreshold: 10,
      restSpeedThreshold: 10,
    },
  };

  const searchTranstion = {
    animation: 'spring',
    config: {
      mass: 3,
      damping: 300,
      stiffness: 1000,
      overshootClamping: false,
      restDisplacementThreshold: 10,
      restSpeedThreshold: 10,
    },
  };

  return (
    <BookStack.Navigator
      initialRouteName="Books"
      screenOptions={{
        headerShown: true,
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
        sharedElements={(route, otherRoute) => {
          if (['BookList', 'BookSearch'].includes(otherRoute.name)) {
            return [route.params.book.bookId];
          }
          return [];
        }}
        options={{
          gestureEnabled: false,
          cardStyleInterpolator: fadeScreen,
          transitionSpec: {
            open: bookTransition,
            close: bookTransition,
          },
        }}
      />
      <BookStack.Screen
        name="BookSearch"
        component={BookSearchScreen}
        sharedElements={(_, otherRoute) => (otherRoute.name === 'BookList' ? [{
          id: 'search',
          animation: 'fade',
          resize: 'clip',
          align: 'left-top',
        }] : [])}
        options={{
          cardStyleInterpolator: fadeScreen,
          transitionSpec: {
            open: searchTranstion,
            close: searchTranstion,
          },
        }}
      />
    </BookStack.Navigator>
  );
}

export default React.memo(RootNavigator);
