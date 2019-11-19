import React, { Component } from 'react';

import { Image, View, Text, 
    ScrollView, StyleSheet,
    TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import RBSheet from "react-native-raw-bottom-sheet";
import local from './assets/local.png'

class AddPlace extends Component {

    state = {
        showRegisterPlace: this.props.register
    }

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
                    borderTopRightRadius: 10
                }}}>
                <ScrollView>
                    <View style={styles.gridContainer}>
                        <TouchableOpacity
                            onPress={() => this.Scrollable.close()}
                            style={styles.gridButtonContainer}>

                            {this.state.showRegisterPlace &&
                                <Text style={styles.gridLabel}>Cadastro!</Text>} 

                            {this.state.showRegisterPlace == false &&
                                <Text style={styles.gridLabel}>View!</Text>}     

                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </RBSheet>

            {this.state.showRegisterPlace == false &&
                <TouchableOpacity  onPress={() => this.Scrollable.open()} >
                    <Image style={[styles.localIcon]}source={local}></Image>
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
    container: {
        backgroundColor: 'white',
        justifyContent: 'space-between'
    },

    localIcon: {
        alignItems: 'center',
        width: 80,
        height: 90,  
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

    containerButton: {
        paddingTop: 200,
        alignItems:'flex-end',
        justifyContent: 'center'
    },

    gridContainer: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        padding: 10,
        marginBottom: 20
    },

    gridButtonContainer: {
        flexBasis: "25%",
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center"
    },

    gridButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center"
    },

    gridIcon: {
        fontSize: 30,
        color: "white"
    },

    gridLabel: {
        fontSize: 14,
        paddingTop: 10,
        color: "#333"
    },
})

export default AddPlace;