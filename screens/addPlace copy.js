import React, { Component } from 'react';

import { Image, View, Text, 
    ScrollView, StyleSheet,
    TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import RBSheet from "react-native-raw-bottom-sheet";
import local from './assets/local.png'
import osso from './assets/osso.png'
import { TextInput } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient'

class AddPlace extends Component {

    state = {
        showRegisterPlace: this.props.register
    }

  render() {
    return (

        <View style={[{  }]} >       
        
            <RBSheet 
                ref={ref => { this.Scrollable = ref; }}
                closeOnDragDown
                height = { this.props.tamanho }
                customStyles={{
                container: {
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                }}}>
                <ScrollView style={styles.dialog} >

                     <View style={styles.containerClose} >
                        <TouchableOpacity
                            onPress={() => this.Scrollable.close()}>
                                <Icon name={"remove"}  size={30} color="white" />
                        </TouchableOpacity>
                    </View>    

                    <View style={styles.gridContainer} >
                    
                        {this.state.showRegisterPlace &&
                            <Text style={styles.titleLocal}>Cadastro!</Text>} 

                        {this.state.showRegisterPlace == false &&
                        <View style={styles.containerView}>
                            <Text style={styles.titleLocal}>Parque São Jorge - 3,6 km</Text>
                           
                            <View style={styles.input}>
                                <Icon name={'map-pin'} size={20} style={styles.icon} />
                                <TextInput style={styles.addresslabel}>Rua do marisco</TextInput>
                            </View>
                            
                            <View style={styles.itens}>
                                <View >
                                    <TouchableOpacity >
                                        <LinearGradient style={styles.carac} colors={['#F7651C', '#F71C73']}>
                                            <Image style={styles.osso} source={osso}></Image>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </View>

                                <View >
                                    <TouchableOpacity >
                                        <LinearGradient style={styles.carac} colors={['#F7651C', '#F71C73']}>
                                            <Image style={styles.osso} source={osso}></Image>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </View>   
                            </View>  

                            <View style={styles.itens}>
                                <View >
                                    <TouchableOpacity >
                                        <LinearGradient style={styles.carac} colors={['#F7651C', '#F71C73']}>
                                            <Image style={styles.osso} source={osso}></Image>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </View>

                                <View >
                                    <TouchableOpacity >
                                        <LinearGradient style={styles.carac} colors={['#F7651C', '#F71C73']}>
                                            <Image style={styles.osso} source={osso}></Image>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </View>   
                            </View>  
                            
                        </View>}
                           
                    </View>

                </ScrollView>
            </RBSheet>
            {this.state.showRegisterPlace == false &&
                <TouchableOpacity  onPress={() => this.Scrollable.open()} >
                    <Image style={[styles.localIcon]} source={local}></Image>
                </TouchableOpacity>}  
            
            {this.state.showRegisterPlace &&
                <TouchableOpacity onPress={() => this.Scrollable.open()} 
                                style={styles.buttonView}>
                    <Icon name={"plus"}  size={30} color="#FFF" />
                </TouchableOpacity>}
        </View>
    )
  }
}

var styles = StyleSheet.create({

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

    osso: {
        width: 40,
        height: 40,
    },

    carac2: {
        // flexDirection: "row",
        paddingTop: 20,
    },

    carac: {
        width: 130,
        height: 90,
        borderRadius: 20,
        borderColor: 'transparent',
        backgroundColor: "#F46721",
        borderWidth: 3,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center'
    },

    itens: {
        flex: 1,
        flexDirection: "row",
        width: '100%',
        justifyContent: "space-around",
        padding: 20
    },


    container: {
        backgroundColor: 'white',
    },

    dialog: {
        backgroundColor: '#262B56',
    },

    gridContainer: {
    },

    localIcon: {
        alignItems: 'center',
        width: 80,
        height: 90,  
    },

    containerClose: {
        flexDirection: "row",
        justifyContent: 'flex-end',
        paddingRight: 20,
        paddingTop: 10
    },

    buttonView: {
        flexDirection: 'row',
        borderWidth:1,
        borderColor:'#FFF',
        alignItems:'center',
        justifyContent:'center',
        width:80,
        height:80,
        backgroundColor:'red',
        borderRadius:50,
    },

    gridIcon: {
        fontSize: 30,
        color: "white"
    },

    containerView: {
        alignItems: "center"
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
        fontSize: 22,
        color: 'black',
        paddingLeft: 30,
    },
})

export default AddPlace;