import React from 'react';
import {CheckBox, Text, View, Button, AsyncStorage} from 'react-native';

import filtersScreenStyles from './styles-filter-screen';

export default class FilterScreen extends React.Component {

  state = {
    categoriesFromAPI: [],
  };

  async componentDidMount() {
      let cocktailsCategories = await AsyncStorage.getItem('filtersSettings');
      cocktailsCategories = JSON.parse(cocktailsCategories);

      this.setState({categoriesFromAPI: cocktailsCategories});
  }

  changeFilterStatus(id) {
    let newCocktailsCategoryStatus = this.state.categoriesFromAPI;

    newCocktailsCategoryStatus.map((item, index) => {
      if (id == index) {
        item.checkBoxStatus = !item.checkBoxStatus;
      }
    });

    this.setState({
      categoriesFromAPI: newCocktailsCategoryStatus,
    });
  }

  saveFilterSettings() {
    const {categoriesFromAPI} = this.state;
    const {navigation} = this.props;

    let simpleValidation = false;
    categoriesFromAPI.map(item => {
      if ( simpleValidation !== item.checkBoxStatus){
        return simpleValidation = true;
      }
    })
    if ( simpleValidation ){
      AsyncStorage.setItem('filtersSettings', JSON.stringify(categoriesFromAPI));
      navigation.navigate('Home');
    } else {
      alert('PLEASE, SELECT AT LEAST ONE FILTER')
    }
    
  }

  render() {
    return (
      <View style={filtersScreenStyles.container}>
        {this.state.categoriesFromAPI.map((item, index) => {
          return (
            <View style={filtersScreenStyles.containerItem} key={index}>
              <Text style={filtersScreenStyles.containerItemFont}>
                {item.strCategory}
              </Text>
              <CheckBox
                value={item.checkBoxStatus}
                onValueChange={() => this.changeFilterStatus(index)}
              />
            </View>
          );
        })}
        <Button
          title="APPLY"
          color="black"
          onPress={() => this.saveFilterSettings()}></Button>
      </View>
    );
  }
}
