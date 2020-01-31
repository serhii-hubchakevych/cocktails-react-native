import React from 'react';
import {
  FlatList,
  AsyncStorage,
  Text,
  View,
  Image,
  ActivityIndicator,
} from 'react-native';
import {NavigationEvents} from 'react-navigation';

import {CocktailsService} from '../../../services/cocktails-service/cocktails-service';
import homeScreenStyles from './styles-home-screen';

export default class HomeScreen extends React.Component {
  cocktailsService = new CocktailsService();

  state = {
    cocktailsFromAPI: [],
    filtersSettings: [],
    counterForFiltersSettings: 0,
    currentCategory: null,
    loaderStatus: true,
  };

  componentDidMount() {
    this.getCocktailsFromCategory();
  }

  getCocktailsFromCategory = async () => {
    let selectedFilters = await AsyncStorage.getItem('filtersSettings');
    
    if (selectedFilters !== undefined && selectedFilters !== null) {
      selectedFilters = JSON.parse(selectedFilters);
    } else {
      selectedFilters = await this.cocktailsService.getAllCategory();
      selectedFilters.map(item => {
        item.checkBoxStatus = true;
      });
      AsyncStorage.setItem('filtersSettings', JSON.stringify(selectedFilters));
    }

    let selectedFiltersArray = [];
    selectedFilters.map(item => {
      if (item.checkBoxStatus) {
        selectedFiltersArray.push(item.strCategory);
      }
    });
    const cocktails = await this.cocktailsService.getDrinksListFromCategory(
      selectedFiltersArray[this.state.counterForFiltersSettings],
    );

    this.setState({
      cocktailsFromAPI: this.state.cocktailsFromAPI.concat(cocktails),
      filtersSettings: selectedFiltersArray,
      currentCategory: selectedFiltersArray[this.state.counterForFiltersSettings],
    });
  };

  loadMore = () => {
    const { counterForFiltersSettings, filtersSettings } = this.state;

    this.setState({
      counterForFiltersSettings: counterForFiltersSettings + 1,
    });
    if ( counterForFiltersSettings < filtersSettings.length - 1) {
      this.getCocktailsFromCategory();
    } else {
      alert('CHANGE YOUR FILTERS TO LOAD MORE COCKTAILS :)');
      this.setState({
        currentCategory: null,
      });
    }
  };

  clearOldData() {
    this.setState(
      {
        cocktailsFromAPI: [],
        counterForFiltersSettings: 0,
      },
      () => this.getCocktailsFromCategory(),
    );
  }

  renderRow = ({item}) => {
    return (
      <View style={homeScreenStyles.itemListContainer}>
        <Image
          style={homeScreenStyles.itemListImage}
          source={{uri: item.strDrinkThumb}}
        />
        <Text style={homeScreenStyles.itemListText}>{item.strDrink}</Text>
      </View>
    );
  };

  render() {
    const { currentCategory, cocktailsFromAPI } = this.state;
    const { categoryText, actIndicator, flatList} = homeScreenStyles;

    return (
      <>
        { currentCategory != null ? (
          <Text style={categoryText}>
            { currentCategory }
          </Text>
        ) : null}
        { cocktailsFromAPI.length > 0 ? (
          <FlatList
            data={cocktailsFromAPI}
            renderItem={this.renderRow}
            keyExtractor={(item, index) => index.toString()}
            onEndReached={this.loadMore}
            onEndReachedThreshold={0.1}
            style={flatList}
          />
        ) : (
           <ActivityIndicator size="large" color="#0000ff" style={actIndicator} />
        )}
        <NavigationEvents onDidFocus={() => this.clearOldData()} />
      </>
    );
  }
}
