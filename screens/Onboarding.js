import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  StatusBar,
} from 'react-native'

import {
  Card,
  Header,
  NextButton,
  ContentContainer,
  GradientBackgrounds,
} from 'react-native-onboarding-component';

export default function Onboarding({ navigation }) {

  return (
      <View style={styles.container}>
        
            <View style={styles.page}>
              <Header>
                {/* <Card
                  style={styles.card}>
                </Card> */}
              </Header>

              {/* <ContentContainer> */}
                <Text style={styles.title}>TITLE</Text>
                <Text style={styles.description}>OLA</Text>
                
              {/* </ContentContainer> */}

              <NextButton
                title="Continue"
                style={{ color: 'black' }}
                
                onPress={() => {
                    navigation.replace('Main')
                  
                }}
              />
            </View>
          )}
      </View>
    );
}
  


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    width: 500,
    backgroundColor: 'transparent',
    flexDirection: 'column',
  },

  card: {
    borderRadius: 0,
  },

  title: {
    fontSize: 26,
    fontWeight: '300',
    marginBottom: 30,
    color: 'black',
  },
  description: {
    fontWeight: '300',
    color: 'black',
    textAlign: 'center',
  },
  gradientBackground: {
    height: '56%',
  },
});
