import React, { Component } from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import map from './assets/map.jpeg'
import AddPlace from './addPlace'

export default class Main extends Component {

  render() {
    return (
      
        <ImageBackground style={styles.map} source={map}>
          <AddPlace tamanho={500} register={false}/>
          <AddPlace tamanho={800} register={true}/>
        </ImageBackground>
      );
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 1, 
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    flexDirection: "row",
    paddingBottom: 30,
    paddingLeft: 140,
    paddingRight: 20
  },
});