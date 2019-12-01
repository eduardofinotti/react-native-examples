import React, { Component } from 'react';

import { View, Text, 
    ScrollView, StyleSheet,
    TouchableOpacity, TextInput } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import RBSheet from "react-native-raw-bottom-sheet";
import Modal from 'react-native-modal';

class AddPlace extends Component {

    
    state={
        visible: false,
        lat: null,
        lon: null,
        title: "",
        address: ""
    }

    save = () => {
        // console.log(this.state.valor)
        const data = { ...this.state }
        this.props.onSave(data)
    }

    constructor(props) {
        super(props, {
          scrollOffset: null,
        });
    
        this.scrollViewRef = React.createRef();
      }
      handleOnScroll = event => {
        this.setState({
          scrollOffset: event.nativeEvent.contentOffset.y,
        });
      };
      handleScrollTo = p => {
        if (this.scrollViewRef.current) {
          this.scrollViewRef.current.scrollTo(p);
        }
      };
    
      open = (title, address) => {
        this.setState({visible: true, title: title, address: address} )
      };
    
      close = () => this.setState({visible: false} );
      isVisible = () => this.state.visible;

  render() {
    return (

        <View style={styles.place}> 

            <TouchableOpacity onPress={() => this.open()} 
                            style={styles.buttonView}>
                <Icon name={"plus"}  size={30} color="#FFF" />
            </TouchableOpacity>

            <Modal
              testID={'modal'}
              isVisible={this.state.visible}
              onSwipeComplete={this.close}
              swipeDirection={['down']}
              scrollTo={this.handleScrollTo}
              scrollOffset={this.state.scrollOffset}
              scrollOffsetMax={500 - 50} // content height - ScrollView height
              style={styles.modal}>

              <View style={styles.scrollableModal}>
                <Text style={{fontSize: 30, color: '#FFF'}} > ___ </Text>
                <ScrollView
                  ref={this.scrollViewRef}
                  onScroll={this.handleOnScroll}
                  scrollEventThrottle={16}>
                  <View style={styles.scrollableModalContent1}>
                    
                  <View >
                      <Text style={styles.title}>Cadastro!</Text>
                      <TextInput onChangeText={lat => this.setState({ lat })} />
                      <TextInput onChangeText={lon => this.setState({ lon })} />
                      <TextInput onChangeText={title => this.setState({ title })} />
                      <TextInput onChangeText={address => this.setState({ address })} />

                      <TouchableOpacity onPress={this.save}>
                          <Text style={styles.button}>Salvar</Text>
                      </TouchableOpacity>
                  </View>

                  </View>
                </ScrollView>
              </View>
            </Modal>

            {/* <AddPlace onSave={this.show} tamanho={800} />  */}
    
           
        </View>
    )
  }
}

var styles = StyleSheet.create({

    dialog: {
        backgroundColor: '#262B56',
    },

    place: {
      flex: 1,
      // flexDirection: "column-reverse",

      // paddingTop: '205%',
      // paddingLeft: '70%'
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

    modal: {
        justifyContent: 'flex-end',
        margin: 0,
      },
      scrollableModal: {
        //tamanho do dialog
        height: '90%',
        backgroundColor: '#262B56',
        borderRadius: 40,
        alignItems: 'center',
      },
      scrollableModalContent1: {
        //tamanho do scroll
        // height: '100%',
        backgroundColor: '#262B56',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 40
      },
      scrollableModalText1: {
        fontSize: 20,
        color: 'white',
      },

})

export default AddPlace;