import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, View, Text, TextInput } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Search extends Component {

    state={
        lat: null,
        lon: null,
        searchFocused: false,
        useLocation: false
    }

    changeLocation = (lat, lon) => {
        this.setState({lat, lon})
        const data = { ...this.state }
        this.props.onSearch(data)
    }

  render() {

    return (
            <GooglePlacesAutocomplete
                placeholder = "Onde você está?"
                placeholderTextColor='#333'
                onPress={(data, details) => {this.changeLocation(details.geometry.location.lat, details.geometry.location.lng)}}
                query={{ 
                    key: 'AIzaSyA1NU7mhmeM_XzhfAlzrzknUQkJ7Vpgep0',
                    language: 'pt'
                }}
                textInputProps={{
                    autoCapitalize: 'none',
                    autoCorrect: false,
                    onFocus: () => { this.setState({ searchFocused: true })},
                    onBlur: () => { this.setState({ searchFocused: false })}
                }}
                listViewDisplayed={this.state.searchFocused}
                fetchDetails
                enablePoweredByContainer={false}
                styles={{ flex: 1,
                    container:{
                        // position: 'absolute',
                        // top: Platform.select({ ios: 90, android: 40 }),
                        top: '20%',
                        width: '90%',
                    },
                    textInputContainer:{
                        flex: 1,
                        backgroundColor: 'transparent',
                        height: 54,
                        marginHorizontal: 20,
                        borderTopWidth: 0,
                        borderBottonWidth: 0,

                    },
                    textInput:{
                        height: 54,
                        margin: 0,
                        borderRadius: 30,
                        paddingTop: 0,
                        paddingBottom: 0,
                        paddingLeft: 20,
                        paddingRight: 0,
                        padding: 0,
                        marginTop: 0,
                        marginLeft: 0,
                        marginRight: 0,
                        elevation: 5,
                        shadowColor: '#000',
                        shadowOpacity: 0.1,
                        shadowOffset: {x:0, y:0},
                        shadowRadius: 15,
                        borderWidth: 1,
                        borderColor: '#DDD',
                        fontSize: 18,
                        color: 'black'
                    },
                    listView: {
                        borderWidth: 1,
                        borderColor: '#DDD',
                        backgroundColor: '#FFF',
                        marginHorizontal: 20,
                        elevation: 5,
                        shadowColor: '#000',
                        shadowOpacity: 0.1,
                        shadowOffset: {x:0, y:0},
                        shadowRadius: 15,
                        borderRadius: 20,
                        // marginTop: 20,
                    },
                    discription: {
                        fontSize: 16
                    },
                    row:{
                        padding: 20,
                        height: 55
                    }
                }}>

               </GooglePlacesAutocomplete>
      );
  }
}

