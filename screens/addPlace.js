import React, { Component } from 'react';

import { View, Text, 
    ScrollView, StyleSheet,
    TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import RBSheet from "react-native-raw-bottom-sheet";

class AddPlace extends Component {

  render() {
    return (

        <View >       
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
                        <Text style={styles.title}>Cadastro!</Text>
                    </View>

                </ScrollView>
            </RBSheet>
    
            <TouchableOpacity onPress={() => this.Scrollable.open()} 
                            style={styles.buttonView}>
                <Icon name={"plus"}  size={30} color="#FFF" />
            </TouchableOpacity>
        </View>
    )
  }
}

var styles = StyleSheet.create({

    dialog: {
        backgroundColor: '#262B56',
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

    title: {
        fontSize:25,
        color: 'white',
        padding: 20,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },

})

export default AddPlace;