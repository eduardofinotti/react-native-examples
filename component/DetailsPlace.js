import React from 'react';
import { Image, View, StyleSheet, Text, Button, TextInput, } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient'
import osso from '../screens/assets/osso.png'
import { FlatGrid } from 'react-native-super-grid';

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

            <View style={{alignItems:'center'}} >
              <Text style={styles.scrollableModalText1}>{props.place.title}</Text>
            </View>
            
            <View style={{paddingTop:20, alignItems:'center'}}>
              <View style={styles.input}>
                <Icon name={'map-pin'} size={20} />
                <TextInput editable={false} style={styles.addresslabel}>{props.place.address}</TextInput>
              </View>
            </View>

            <FlatGrid itemDimension={110} items={props.place.carac} renderItem={({ item, index }) => (      
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

const styles = StyleSheet.create({

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