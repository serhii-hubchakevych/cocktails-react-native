import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faFilter} from '@fortawesome/free-solid-svg-icons';
import {View} from 'react-native';

import headerRightStyles from './styles-header-right';


const HeaderRightButton = props => {
const { navigationOptions: { navigation } } = props;
  return (
    <View onTouchStart={() => navigation.navigate('Filters')}>
      <FontAwesomeIcon
        icon={faFilter}
        size={30}
        style={headerRightStyles.filterIcon}
      />
    </View>
  );
};

export default HeaderRightButton;
