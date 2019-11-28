import React, { Component } from 'react';
import {Dimensions, StyleSheet, Image, View, Alert, ScrollView, TouchableOpacity, Text, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import RBSheet from "react-native-raw-bottom-sheet";
import AddPlace from './addPlace'
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.dialog = this.dialog.bind(this);
  }
  state = {
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
    ]
  }

  show = data => {

    this.state.markers.push(data);
    
    this.setState({markers:this.state.markers});
    
    // console.log(this.state)

            // ADD TASKS QUANDO SALVANSO NO DISPOSITIVO
        // var local = [...this.state.markers]
        // local.push({
        //     lat: data.lat ,
        //     lon: data.lon,
        //     title: data.title,
        //     address: data.address
        // })

        // this.setState({ markers: local })

    // this.componentDidMount()
  }

  dialog = (title) => {
    console.log(title)
    return (
      <RBSheet 
        ref={ref => { this.Scrollable = ref; }}
        closeOnDragDown
        height = { 500 }
        customStyles={{
          container: {
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10 }}}>

        <ScrollView style={styles.dialog} >
            <View style={styles.gridContainer} >
                <View style={styles.containerView}>
                    <Text style={styles.titleLocal}>{title}</Text>
                  
                    <View style={styles.input}>
                        <Icon name={'map-pin'} size={20} style={styles.icon} />
                        <TextInput style={styles.addresslabel}></TextInput>
                    </View>
                </View>
            </View>

        </ScrollView>
      </RBSheet>
      // this.Scrollable.open()
    );
  };

  componentDidMount() {
    this.getCurrentPosition();
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

  render() {

    return (
      <View style={styles.container}> 

          <MapView 
            style={styles.map2}
            region={ this.state.region }
            showsUserLocation={true}
            loadingEnabled={true} 
            howsMyLocationButton={true}
          >

            {this.state.markers.map((marker, index) => (
              <MapView.Marker style={{alignItems: 'center', paddingBottom: 80}}
                key={index} 
                coordinate={{latitude: marker.lat, longitude: marker.lon}}
                onPress={() => this.dialog(marker.title)}
                width={10} height={10}
                description={marker.title} >
                <Image source={require('./assets/local.png')} style={{height: 50, width: 50}} />
                  
                  

              </MapView.Marker>
            ))}

          </MapView>

          <View style={styles.place}> 
            <AddPlace onSave={this.show} tamanho={800} /> 
          </View>
          
        </View>
      );
  }
}

     
        {/* <ImageBackground style={styles.map} source={map}> */}
          {/* <AddPlace tamanho={500} register={false}/>
          <AddPlace tamanho={800} register={true}/> */}
        {/* </ImageBackground> */}

const styles = StyleSheet.create({
  map: {
    flex: 1, 
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    flexDirection: "row",
    paddingBottom: 30,
    paddingLeft: 140,
    paddingRight: 20,
  },

  container: {
    flex: 1,
    justifyContent: "flex-end",
    width: '100%',
  },

  map2: {
    flex: 1,
    
  },

  place:{
    position: 'absolute',
    padding: 50,
    paddingLeft: 280
  },

  gridContainer: {
  },

  gridIcon: {
    fontSize: 30,
    color: "white"
},

containerView: {
    alignItems: "center"
},

dialog: {
  backgroundColor: '#262B56',
},

containerClose: {
  flexDirection: "row",
  justifyContent: 'flex-end',
  paddingRight: 20,
  paddingTop: 10
},

titleLocal: {
  fontSize:25,
  color: 'white',
  padding: 20,
  justifyContent: 'center',
  alignContent: 'center',
  alignItems: 'center'
},

addresslabel: {
  fontSize: 15,
  color: 'black',
  paddingLeft: 30,
},

input: {
  width: '80%',
  height: 40,
  paddingLeft: 10,
  backgroundColor: '#EEE',
  borderRadius: 20,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: "flex-start",
  paddingLeft: 22
},

carac2: {
  // flexDirection: "row",
  paddingTop: 20,
},

});