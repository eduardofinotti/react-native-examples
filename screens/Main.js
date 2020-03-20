/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
  Alert,
  Button,
  Text,
  TextInput,
  PermissionsAndroid,
} from 'react-native';
import AddPlace from './addPlace';
import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import osso from './assets/osso.png';
import Search from './Search';

export default function Main() {
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({});
  const [markers, setMarkers] = useState([]);

  function open(t, a) {
    // need refactor variables xD
    setTitle(t);
    setAddress(a);
    setVisible(true);
  }

  function close() {
    setVisible(false);
  }

  function changeLocation(data) {
    try {
      const newLocation = {
        latitude: data.lat,
        longitude: data.lon,
        latitudeDelta: 0.09,
        longitudeDelta: 0.09,
      };
      setPosition(newLocation);
    } catch (e) {
      alert(e.message || '');
    }
  }

  useEffect(() => {
    async function requestPermission() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Acessar a sua Localização',
            message: 'Você pode liberar o acesso??',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          Geolocation.getCurrentPosition(info => {
            console.log(info);

            setPosition({
              latitude: info.coords.latitude,
              longitude: info.coords.longitude,
              latitudeDelta: 0.06,
              longitudeDelta: 0.06,
            });
          });
        } else {
          console.log('sem permissão');
        }
      } catch (error) {
        console.warn(error.message);
      }
    }

    function initialMarkers() {
      const marks = [
        {
          lat: -27.580148,
          lon: -48.622263,
          title: 'Parque dos Cachorros',
          address: 'Rua do Marisco, 2437',
        },
        {
          lat: -27.5802,
          lon: -48.592264,
          title: 'Parque Amarubá',
          address: 'Avenida das Naçoes, 4523, KM-2',
        },
        {
          lat: -27.5986393,
          lon: -48.5187229,
          title: 'Parque Santa Monica',
          address: 'Avenida dos caras, 4569 - SN',
        },
      ];
      setMarkers(marks);
    }

    requestPermission();
    initialMarkers();
  }, []);

  function show(data) {
    const local = {
      lat: data.lat,
      lon: data.lon,
      title: data.title,
      address: data.address,
    };

    setMarkers(...markers, local);
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={'google'}
        showsUserLocation={true}
        showsMyLocationButton={true}
        style={styles.mapView}
        initialRegion={{
          latitude: -22.8524643,
          longitude: -42.0286876,
          latitudeDelta: 0.06,
          longitudeDelta: 0.06,
        }}
        loadingEnabled={true}
        zoomEnabled={true}
        enableZoomControl={true}>
        {markers.map((marker, index) => (
          <MapView.Marker
            style={{alignItems: 'center', paddingBottom: 80}}
            key={index}
            coordinate={{latitude: marker.lat, longitude: marker.lon}}
            onPress={() => open(marker.title, marker.address)}
            width={30}
            height={30}
            description={marker.description}>
            <Image
              source={require('./assets/local.png')}
              style={{height: 40, width: 40}}
            />
          </MapView.Marker>
        ))}
      </MapView>

      <View style={styles.container2}>
        <Search onSearch={changeLocation} />
      </View>

      <View style={styles.container3}>
        <AddPlace onSave={show} tamanho={800} />
      </View>

      <View>
        <Modal
          testID={'modal'}
          isVisible={visible}
          onSwipeComplete={close}
          swipeDirection={['down']}
          style={styles.modal}>
          <View style={styles.scrollableModal}>
            <Text style={{fontSize: 30, color: '#FFF'}}> ___ </Text>
            <View style={styles.scrollableModalContent1}>
              <View style={{alignItems: 'center'}}>
                <Text style={styles.scrollableModalText1}>{title}</Text>

                <View style={{paddingTop: 20}}>
                  <View style={styles.input}>
                    <Icon name={'map-pin'} size={20} />
                    <TextInput style={styles.addresslabel}>{address}</TextInput>
                  </View>
                </View>
                <View style={styles.itens}>
                  <TouchableOpacity style={{}}>
                    <LinearGradient
                      style={styles.contentCarac}
                      colors={['#F7651C', '#F71C73']}>
                      <Image style={styles.osso} source={osso} />
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  mapView: {
    flex: 1,
  },

  container2: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },

  container3: {
    position: 'absolute', //use absolute position to show button on top of the map
    top: '87%', //for center align
    right: '20%',
    alignSelf: 'flex-end', //for align to right
  },

  titleLocal: {
    fontSize: 25,
    color: 'white',
    padding: 20,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },

  addresslabel: {
    textAlign: 'left',
    width: '80%',
    fontSize: 17,
    color: 'black',
    paddingLeft: 20,
  },

  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#EEE',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 20,
  },

  contentCarac: {
    width: 150,
    height: 90,
    borderRadius: 20,
    borderColor: 'transparent',
    backgroundColor: '#F46721',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },

  osso: {
    width: 40,
    height: 40,
  },

  itens: {
    flex: 1,
    // flexDirection: "row",
    width: '100%',
    paddingTop: 20,
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
    fontSize: 25,
    color: 'white',
    padding: 20,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },

  scrollableModalText1: {
    fontSize: 25,
    color: 'white',
    paddingTop: 10,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },

  buttonView: {
    borderWidth: 1,
    borderColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
    backgroundColor: 'red',
    borderRadius: 50,
  },

  buttonView2: {
    borderColor: '#FFF',
    width: 20,
    height: 20,
    backgroundColor: 'red',
    borderRadius: 50,
  },

  mylocation: {
    padding: 60,
  },
});
