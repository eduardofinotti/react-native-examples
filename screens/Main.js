import React, { Component } from 'react';
import { StyleSheet, Image, View, Alert, StatusBar, Text, TextInput } from 'react-native';
import AddPlace from './addPlace'
import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Search from './Search';
// import Details from '../component/DetailsPlace'
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient'
import osso from '../screens/assets/osso.png'
import { FlatGrid } from 'react-native-super-grid';

export default class Main extends Component {

  state = {
    isOpen: false,
    actualPlace:{
      title: 'parque teste',
      address: 'address teste',
      lat: null,
      lon: null,
      carac: [
        { name: 'Água',
          value: true
        },
        { name: 'Banheiro',
          value: false
        },
        { name: 'Saco para Coco',
          value: false
        },
        { name: 'Comida para Humanos',
          value: true
        },
        { name: 'Seguro',
        value: true
        },
        { name: 'Ração',
          value: true
        },
      ],
    },
    // actualPlace:{
    //   title: 'parque teste',
    //   address: 'address teste',
    //   lat: -27.580148,
    //   lon: -48.622263,
    //   carac: [
    //     { name: 'Água',
    //       value: true
    //     },
    //     { name: 'Banheiro',
    //       value: false
    //     },
    //     { name: 'Saco para Coco',
    //       value: false
    //     },
    //     { name: 'Comida para Humanos',
    //       value: true
    //     },
    //     { name: 'Seguro',
    //     value: true
    //     },
    //     { name: 'Ração',
    //       value: true
    //     },
    //   ],
    // },
    region: null,
    markers:[
      {
        lat: -27.580148,
        lon: -48.622263,
        title: "Parque dos Cachorros",
        address: "Rua do Marisco, 2437",
        carac: [
          { name: 'Água',
            value: true
          },
          { name: 'Banheiro',
            value: false
          },
          { name: 'Saco para Coco',
            value: false
          },
          { name: 'Comida para Humanos',
            value: true
          },
          { name: 'Seguro',
          value: true
          },
          { name: 'Ração',
            value: true
          },
        ],
      },
      {
        lat: -27.580200,
        lon: -48.592264,
        title: "Parque Amarubá",
        address: "Avenida das Naçoes, 4523, KM-2",
        carac: [
          { name: 'Água',
            value: true
          },
          { name: 'Banheiro',
            value: false
          },
          { name: 'Saco para Coco',
            value: false
          },
          { name: 'Comida para Humanos',
            value: true
          },
          { name: 'Seguro',
          value: true
          },
          { name: 'Ração',
            value: true
          },
        ],
      },
      {
        lat: -27.5986393,
        lon: -48.5187229,
        title: "Parque Santa Monica",
        address: "Avenida dos caras, 4569 - SN",
        carac: [
          { name: 'Água',
            value: true
          },
          { name: 'Banheiro',
            value: false
          },
          { name: 'Saco para Coco',
            value: false
          },
          { name: 'Comida para Humanos',
            value: true
          },
          { name: 'Seguro',
          value: true
          },
          { name: 'Ração',
            value: true
          },
        ],
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
      this.setState({ region: region});

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

  closeDetails= () => {
    this.setState({ isOpen: false })
  }

  componentDidMount() {
      this.getCurrentPosition();
  }

  openDetails = (marker) => {
    this.setState({ visible: true, actualPlace: marker, isOpen: true} )
    // this.setState({isOpen: true} )
  };

  render() {

    return (
      <View style={styles.container}> 
          <StatusBar barStyle="dark-content" />

          <MapView 
            provider={'google'} 
            showsUserLocation={true}
            showsMyLocationButton={true}
            style={styles.mapView}
            region={ this.state.region }
            loadingEnabled={true} 
            zoomEnabled={true}
            enableZoomControl={true}
          >

            {this.state.markers.map((marker, index) => (
              <MapView.Marker style={{alignItems: 'center', paddingBottom: 80}}
                key={index} 
                coordinate={{latitude: marker.lat, longitude: marker.lon}}
                onPress={() => this.openDetails(marker)}
                height={58} width={40} 
                description={marker.description} >
                <Image source={require('./assets/place.png')} style={{height: 58, width: 40}} />
              </MapView.Marker>
            ))}

          </MapView>

          <View style={styles.container2}>
            <Search onSearch={this.changeLocation}/>
          </View>
          
          <View style={styles.container3}>
            <AddPlace onSave={this.savePlace} tamanho={800} /> 
          </View>

          {/* <Details isOpen={this.state.isOpen} isClose={this.closeDetails} place={this.state.actualPlace} /> */}

          <Modal
        testID={'modal'}
        isVisible={this.state.isOpen}
        onSwipeComplete={this.closeDetails}
        onBackdropPress={this.closeDetails}
        animationOut={'slideOutDown'}
        swipeDirection={['down']}
        style={styles.modal}>

        <View style={styles.scrollableModal}>
          <Text style={{fontSize: 30, color: '#FFF'}} > ___ </Text>
          
          <View style={styles.scrollableModalContent1}>

            <View style={{alignItems:'center'}} >
              <Text style={styles.scrollableModalText1}>{this.state.actualPlace.title}</Text>
            </View>
            
            <View style={{paddingTop:20, alignItems:'center'}}>
              <View style={styles.input}>
                <Icon name={'map-pin'} size={20} />
                <TextInput editable={false} style={styles.addresslabel}>{this.state.actualPlace.address}</TextInput>
              </View>
            </View>

            <FlatGrid itemDimension={110} items={this.state.actualPlace.carac} renderItem={({ item, index }) => (      
              <View opacity={item.value?1.0:0.2} style={{alignItems:'center', paddingTop: 10 }} >          
              <LinearGradient style={styles.contentCarac} colors={['#F7651C', '#F71C73']}>
                  <Image style={styles.osso} source={osso}></Image>
                  <Text style={{color: 'white', fontSize: 13, fontWeight: 'bold', textAlign: 'center', }} >
                    {item.name}
                  </Text>
              </LinearGradient>
              </View>
            )}/>

          </View>
        </View>

      </Modal>
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
    top: '81%', //for center align
    right: '2%',
    alignSelf: 'flex-end' //for align to right
  },
  modal: {
    justifyContent: 'flex-end',
    margin: -5,
  },
  scrollableModal: {
    //tamanho do dialog
    // height: '60%',
    width: '100%',
    backgroundColor: '#262B56',
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    alignItems: 'center',
    height: 340,
  },
  scrollableModalContent1: {
    //tamanho do scroll
    // height: '60%',
    backgroundColor: '#262B56',
    justifyContent: 'center',
  },
  scrollableModalText1: {
    fontSize:25,
    color: 'white',
    paddingTop: 10,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  input: {
    width: '90%',
    height: 40,
    backgroundColor: '#EEE',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "flex-start",
    alignContent: 'center',
    paddingLeft: 20,
  },

addresslabel: {
textAlign: "left",
fontSize: 17,
color: 'gray',
paddingLeft: 20
},

contentCarac: {
width: 100,
height: 60,
borderRadius: 15,
borderColor: 'transparent',
backgroundColor: "#F46721",
alignItems: 'center',
alignContent: 'center',
justifyContent: 'center',
},
osso: {
width: 25,
height: 25,
},

});