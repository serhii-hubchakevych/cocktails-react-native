import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import React from 'react';

import HomeScreen from './src/components/screens/home-screen/home-screen';
import FilterScreen from './src/components/screens/filters-screen/filter-screen';
import HeaderRightButton from './src/components/header-right/header-right';

const MainNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: (navigation) => ({
      title: 'Drinks',
      headerRight: ()=> <HeaderRightButton navigationOptions={ navigation }/>,
    }),
  },
  Filters: {
    screen: FilterScreen,
  },
});

const App = createAppContainer(MainNavigator);

export default App;
