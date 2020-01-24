import React, { Component } from 'react';
import { StyleSheet, Image, View, Alert } from 'react-native';
import AddPlace from './addPlace'
import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Search from './Search';
import Details from '../component/DetailsPlace'

export default class Main extends Component {

  openDetails = (title, address) => {
    this.setState({visible: true, actualPlace: {title: title, address: address}, isOpen: true} )
  };

  state = {
    isOpen: false,
    actualPlace:{
      title: null,
      address: null,
      carac: [],
    },
    visible: false,
    region: null,
    markers:[
      {
        lat: -27.580148,
        lon: -48.622263,
        title: "Parque dos Cachorros",
        address: "Rua do Marisco, 2437"
      },
      {
        lat: -27.580200,
        lon: -48.592264,
        title: "Parque Amarubá",
        address: "Avenida das Naçoes, 4523, KM-2"
      },
      {
        lat: -27.5986393,
        lon: -48.5187229,
        title: "Parque Santa Monica",
        address: "Avenida dos caras, 4569 - SN"
      },
    ]
  }

  changeLocation = data => {
    try {
      const region = {
        latitude: data.lat,
        longitude: data.lon,
        latitudeDelta: 0.06,
        longitudeDelta: 0.06,
      }
      this.setState({ region });

    } catch(e) {
      alert(e.message || "");
    }
  }

  getCurrentPosition() { 
    try {
      Geolocation.getCurrentPosition(
        (position) => {
          const region = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.06,
            longitudeDelta: 0.06,
          };
          this.setState({ region });
        },
        (error) => {
          Alert.alert("Localização", "Erro ao pegar localização. Verifique se o serviço de localizaçao está ativo. :)");
        }
      );
    } catch(e) {
      alert(e.message || "");
    }
  };

  savePlace = data => {
    var local = [...this.state.markers]
    local.push({
        lat: data.lat ,
        lon: data.lon,
        title: data.title,
        address: data.address
    })

    this.setState({ markers: local })
  }

  closeDetails = close => {
    this.setState({ isOpen: close })
  }

  componentDidMount() {
    this.getCurrentPosition();
  }

  render() {

    return (
      <View style={styles.container}> 
          
          <MapView 
            provider={'google'} 
            showsUserLocation={true}
            showsMyLocationButton={true}
            style={styles.mapView}
            region={ this.state.region }
            showsUserLocation={true}
            loadingEnabled={true} 
            zoomEnabled={true}
            enableZoomControl={true}
          >

            {this.state.markers.map((marker, index) => (
              <MapView.Marker style={{alignItems: 'center', paddingBottom: 80}}
                key={index} 
                coordinate={{latitude: marker.lat, longitude: marker.lon}}
                onPress={() => this.openDetails(marker.title, marker.address)}
                width={30} height={30}
                description={marker.description} >
                <Image source={require('./assets/local.png')} style={{height: 40, width: 40}} />
              </MapView.Marker>
            ))}

          </MapView>

          <View style={styles.container2}>
            <Search onSearch={this.changeLocation}/>
          </View>
          
          <View style={styles.container3}>
            <AddPlace onSave={this.savePlace} tamanho={800} /> 
          </View>

          <Details isOpen={this.state.isOpen} isClose={this.closeDetails} place={this.state.actualPlace} />
        </View>
      );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },

  mapView: {
    flex: 1,
  },

  container2: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    position: 'absolute',
  },

  container3: {
    position: 'absolute',//use absolute position to show button on top of the map
    top: '87%', //for center align
    right: '20%',
    alignSelf: 'flex-end' //for align to right
  },

});