import React from 'react';
import {StyleSheet, Text, View, FlatList, TouchableHighlight, Alert, TextInput} from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      contacts: null
    }
  }

  componentDidMount() {
    return fetch('http://cryptic-crag-81902.herokuapp.com/api/contacts')
      .then(response => response.json())
      .then(responseJson => {

        this.setState({
          contacts: responseJson,
        }, function() {
          // do something with new state
        })
      })
      .catch((error) => {
        console.error(error)
      })
  }

// Shake your phone to open the developer menu.
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.footer}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 1, padding: 10}}>
              <TextInput
                style={{flex: 1, height: 40, padding: 5, fontSize: 18,}}
                placeholder='Добавьте контакт'
                onChangeText={(text) => this.setState({text})}
              />
            </View>

            <TouchableHighlight onPress={this._onPressButton} underlayColor='#338cb8'>
              <View style={styles.contactAdd}>
                <Text style={styles.contactAddText}>+</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>

        <FlatList
          data={this.state.contacts}
          keyExtractor={item => item.name}
          renderItem={({item}) => {return (
            <View style={styles.contact}>
              <TouchableHighlight onPress={this._onPressButton} underlayColor='#338cb8' style={{flex: 1}}>
                <View style={styles.contactDescription}>
                  <View style={styles.contactPicture}></View>
                  <Text style={styles.contactText}>{item.name}</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight onPress={this._onPressButton} underlayColor='#338cb8'>
                <View style={styles.contactRemove}>
                  <Text style={styles.contactRemoveText}>-</Text>
                </View>
              </TouchableHighlight>
            </View>
          )}}
        />
      </View>
    )
  }

  _onPressButton() {
    Alert.alert('You tapped the button!')
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#090f27',
    flex: 1,
    paddingTop: 24
  },
  contact: {
    backgroundColor: '#45b0cc',
    flex: 1,
    flexDirection: 'row',
  },
  contactDescription: {
    padding: 10,
    flex: 1,
    flexDirection: 'row',
  },
  contactPicture: {
    backgroundColor: '#87ceeb',
    width: 50,
    height: 50,
    borderRadius: 200,
  },
  contactText: {
    color: '#fff',
    fontSize: 20,
    paddingLeft: 15,
    paddingTop: 10,
  },
  contactRemove: {
    width: 50,
  },
  contactRemoveText: {
    color: '#ccc',
    fontSize: 20,
    paddingTop: 20,
    textAlign: 'center',
  },
  footer: {
    backgroundColor: '#f5f5f5',
    height: 60,
  },
  contactAdd: {
    width: 50,
  },
  contactAddText: {
    color: '#ccc',
    fontSize: 20,
    textAlign: 'center',
    paddingTop: 13,
  },
});
