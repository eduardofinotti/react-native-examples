import React, { Component } from 'react';
import { TouchableOpacity, LinearGradient, StyleSheet, Image, View, Button, Text, TextInput, ImageBackground } from 'react-native';
import onboarding from './assets/onboarding.png'

export default function Onboarding({ navigation }) {

    return (
      <View style={styles.container}>
        <ImageBackground source={onboarding}  style={{width: '100%', height: '100%'}} >
         
          

             <TouchableOpacity style={styles.oi} onPress={() => navigation.replace('Main') }>
                                <Text>Vai</Text>
                        </TouchableOpacity>

        </ImageBackground>
      </View>
      );
  
}

const styles = StyleSheet.create({

  container: {

    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: "column-reverse"

  },

  oi: {
    padding: 90,
    // alignContent: 'flex-start',
    // alignItems: 'flex-start',
    // justifyContent: 'flex-start',
  },


});