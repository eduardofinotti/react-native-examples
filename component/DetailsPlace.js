
import React from 'react';
import { Image, View, StyleSheet, Text, TouchableOpacity, TextInput, } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient'
import osso from '../screens/assets/osso.png'

export default function component(props) {
  
  function close() {
    props.isClose(false)
  }

  return (
    <View> 
      <Modal
        testID={'modal'}
        isVisible={props.isOpen}
        onSwipeComplete={close}
        onBackdropPress={close}
        animationOut={'slideOutDown'}
        swipeDirection={['down']}
        style={styles.modal}>

        <View style={styles.scrollableModal}>
          <Text style={{fontSize: 30, color: '#FFF'}} > ___ </Text>
          <View style={styles.scrollableModalContent1}>

            <View style={{alignItems:'center'}}>
              <Text style={styles.scrollableModalText1}>{props.place.title}</Text>
            </View>
            
            <View style={{paddingTop:20}}>
              <View style={styles.input}>
                  <Icon name={'map-pin'} size={20} />
                  <TextInput style={styles.addresslabel}>{props.place.address}</TextInput>
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
  );

}

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      justifyContent: 'flex-end',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
      paddingBottom: 30,
      width: '100%'
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
    scrollableModalText1: {
      fontSize:25,
      color: 'white',
      paddingTop: 10,
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center'
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

addresslabel: {
  textAlign: "left",
  width: '80%',
  fontSize: 17,
  color: 'black',
  paddingLeft: 20
},
itens: {
  flex: 1,
  // flexDirection: "row",
  width: '100%',
  paddingTop: 20
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
    
  });