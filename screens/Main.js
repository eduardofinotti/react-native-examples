import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, Image, View, Alert, Button, Text, TextInput } from 'react-native';
import AddPlace from './addPlace'
import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient'
import osso from './assets/osso.png'
import Search from './Search';

export default class Main extends Component {


  open = (title, address) => {
    this.setState({visible: true, title: title, address: address} )
  };

  close = () => this.setState({visible: false} );
  isVisible = () => this.state.visible;

  state = {
    title: null,
    address: null,
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

  show = data => {
    var local = [...this.state.markers]
    local.push({
        lat: data.lat ,
        lon: data.lon,
        title: data.title,
        address: data.address
    })

    this.setState({ markers: local })
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
                onPress={() => this.open(marker.title, marker.address)}
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
            <AddPlace onSave={this.show} tamanho={800} /> 
          </View>

          <View > 
            <Modal
              testID={'modal'}
              isVisible={this.state.visible}
              onSwipeComplete={this.close}
              swipeDirection={['down']}
              style={styles.modal}>

              <View style={styles.scrollableModal}>
                <Text style={{fontSize: 30, color: '#FFF'}} > ___ </Text>
                  <View style={styles.scrollableModalContent1}>

                      <View style={{alignItems:'center'}}>
                        <Text style={styles.scrollableModalText1}>{this.state.title} </Text>
                      </View>
                      
                      <View style={{paddingTop:20}}>
                        <View style={styles.input}>
                            <Icon name={'map-pin'} size={20} />
                            <TextInput style={styles.addresslabel}>{this.state.address}</TextInput>
                        </View>
                      </View>
                      <View style={styles.itens}>
                        <TouchableOpacity style={{}}>
                            <LinearGradient style={styles.contentCarac} colors={['#F7651C', '#F71C73']}>
                                <Image style={styles.osso} source={osso}></Image>
                            </LinearGradient>
                        </TouchableOpacity>
                      </View>  
                  </View>
              </View>

            </Modal>
        
          </View>

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


titleLocal: {
  fontSize:25,
  color: 'white',
  padding: 20,
  justifyContent: 'center',
  alignContent: 'center',
  alignItems: 'center',
},

addresslabel: {
  textAlign: "left",
  width: '80%',
  fontSize: 17,
  color: 'black',
  paddingLeft: 20
},

input: {
  width: '100%',
  height: 40,
  backgroundColor: '#EEE',
  borderRadius: 20,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: "flex-start",
  paddingLeft: 20,
},

contentCarac: {
  width: 150,
  height: 90,
  borderRadius: 20,
  borderColor: 'transparent',
  backgroundColor: "#F46721",
  alignItems: 'center',
  alignContent: 'center',
  justifyContent: 'center'
},

osso: {
  width: 40,
  height: 40,
},

itens: {
  flex: 1,
  // flexDirection: "row",
  width: '100%',
  paddingTop: 20
},

modal: {
  justifyContent: 'flex-end',
  margin: -5,
},
scrollableModal: {
  //tamanho do dialog
  height: '60%',
  width: '100%',
  backgroundColor: '#262B56',
  borderRadius: 40,
  alignItems: 'center',
},
scrollableModalContent1: {
  //tamanho do scroll
  // height: '100%',
  backgroundColor: '#262B56',
  justifyContent: 'center',
},

title: {
  fontSize:25,
  color: 'white',
  padding: 20,
  justifyContent: 'center',
  alignContent: 'center',
  alignItems: 'center'
},

scrollableModalText1: {
  fontSize:25,
  color: 'white',
  paddingTop: 10,
  justifyContent: 'center',
  alignContent: 'center',
  alignItems: 'center'
},

buttonView: {
  borderWidth:1,
  borderColor:'#FFF',
  alignItems:'center',
  justifyContent:'center',
  width:80,
  height:80,
  backgroundColor:'red',
  borderRadius:50,
},

buttonView2: {
  borderColor:'#FFF',
  width:20,
  height:20,
  backgroundColor:'red',
  borderRadius:50,
},

mylocation: {
  padding: 60
},


});