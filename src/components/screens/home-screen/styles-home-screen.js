import { StyleSheet } from 'react-native';

const homeScreenStyles = StyleSheet.create({
  itemListContainer: {
    flexDirection: 'row', 
    margin: 20
  },
  itemListImage: {
    width: 100, 
    height: 100
  },
  itemListText:{
    marginTop: 35, 
    marginLeft: 20, 
    fontSize: 20
  },
  categoryText: {
    fontSize:20, 
    paddingLeft:20, 
    backgroundColor:'white'
  },
  flatList:{
    backgroundColor: 'white'
  },
  actIndicator:{
    position:'absolute', 
    top: '45%', 
    left:'45%'
  }
});

export default homeScreenStyles;