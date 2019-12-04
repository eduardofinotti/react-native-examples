
import React, { Component } from 'react';
import { View, Platform, StyleSheet, Text } from 'react-native';
import {createAppContainer, createNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack'
import Main from './screens/Main'
import Onboarding from './screens/Onboarding'

export default createAppContainer (
  createStackNavigator({
    // Onboarding: {
    //   name: 'Onboarding',
    //   screen: Onboarding,
    //   navigationOptions: { headerTransparent: true}
    // },

    Main: {
      name: 'Main',
      screen: Main,
      navigationOptions: { headerTransparent: true, headerLeft: null}
    },
  
  })
);