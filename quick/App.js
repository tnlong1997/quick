/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  AsyncStorage,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

var ImagePicker = require('react-native-image-picker');

// More info on all the options is below in the README...just some common use cases shown here
var options = {
  title: 'Select Avatar',
  customButtons: [
    {name: 'fb', title: 'Choose Photo from Facebook'},
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

export default class App extends Component<{}> {
  render() {
    value = AsyncStorage.getItem('1');
    if (value == null) {
      backgroundImage = require('./assets/blank.jpg')
    }
    else {
      // backgroundImage = require(value)
    }
    return (
      <ImageBackground
        source={backgroundImage}
        style={styles.container}
        resizeMode="cover"
      >

        <TouchableOpacity onPress = {this.cog.bind(this)}>
          <Icon name="cog" size ={30} style={styles.button}/>
        </TouchableOpacity>
        <TouchableOpacity onPress = {this.plus.bind(this)}>
          <Icon name="circle-with-plus" size = {30} style={styles.button} />
        </TouchableOpacity>
        <TouchableOpacity onPress = {this.del.bind(this)}>
          <Icon name="circle-with-minus" size = {30} style={styles.button} />
        </TouchableOpacity>

      </ImageBackground>
    );
  }

  cog() {

  }

  del() {

  }

  plus() {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        AsyncStorage.setItem('1', response.uri)
        this.render()
      }
    });
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: '#F5FCFF',
  },
  button: {
    alignSelf: 'flex-start',
    marginTop: 30,
    marginRight: 5,
    marginLeft: 5,
  }
});
