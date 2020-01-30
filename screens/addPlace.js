import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import Search from './Search';

class AddPlace extends Component {

    state={
        visible: false,
        lat: null,
        lon: null,
        title: "",
        address: ""
    }

    save = () => {
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

    changeLocation = data => {
      this.setState({ lat: data.lat, lon: data.lon });
    }

  render() {
    return (

        <View style={styles.place}> 

          <TouchableOpacity onPress={() => this.open()} >
            <Image source={require('./assets/add-place.png')} style={{height: 60, width: 60}} />
          </TouchableOpacity>

          <Modal testID={'modal'}
            isVisible={this.state.visible}
            onSwipeComplete={this.close}
            swipeDirection={['down']}
            scrollTo={this.handleScrollTo}
            scrollOffset={this.state.scrollOffset}
            scrollOffsetMax={500 - 50} // content height - ScrollView height
            style={styles.modal}>

            <View style={styles.scrollableModal}>
              <Text style={{fontSize: 30, color: '#FFF'}} > ___ </Text>
                                
              <View style={styles.container2}>
                <Search onSearch={this.changeLocation}/>
              </View>

              {/* <TextInput onChangeText={title => this.setState({ title })} />
              <TextInput onChangeText={address => this.setState({ address })} />

              <TouchableOpacity onPress={this.save}>
                  <Text style={styles.button}>Salvar</Text>
              </TouchableOpacity> */}
                
            </View>
          </Modal>    
           
        </View>
    )
  }
}

var styles = StyleSheet.create({
  container2: {
    flexDirection: "row",
    alignContent: "flex-start",
    justifyContent: "flex-start",
    position: 'absolute',
  },

  dialog: {
    backgroundColor: '#262B56',
  },

  place: {
    flex: 1,
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
    width:60,
    height:60,
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
    width: '100%',
    backgroundColor: '#262B56',
    borderRadius: 40,
    alignItems: 'center',
    alignContent: "center",
    margin: 0,
  },

  scrollableModalContent1: {
    //tamanho do scroll
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