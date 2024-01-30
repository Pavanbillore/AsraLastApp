import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StatusBar, StyleSheet, View, Dimensions, Image} from 'react-native';
import {COLORS} from '../styles/GlobalColor';

import AsyncStorage from '@react-native-async-storage/async-storage';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

class SplashScreen extends React.Component {
  constructor() {
    super();
    this.state = {firstLaunch: null};
  }
  componentDidMount() {
    setTimeout(() => {
      AsyncStorage.getItem('alreadyLaunched').then(value => {
        console.log('value in Splash: ' + value);
        if (value == null) {
          console.log('value inside if');
          AsyncStorage.setItem('alreadyLaunched', 'true');
          AsyncStorage.setItem('emailInitial', 'true');
          this.setState({firstLaunch: true});
        } else {
          this.setState({firstLaunch: false});
          console.log('value inside else');
        }
        this.props.navigation.navigate('HomeScreen');
      }); // Add some error handling, also you can simply do @3x
    }, 2000);
  }

  render() {
    return (
      <SafeAreaProvider style={styles.container} mode="margin">
        <StatusBar
          barStyle="dark-content"
          backgroundColor={COLORS.BackgroundColor}
        />
        <View
          style={{
            width: deviceWidth,
            height: deviceHeight,
            backgroundColor: 'red',
          }}>
          <Image
            source={require('../images/asra-last_icon.png')}
            style={{
              width: deviceWidth,
              height: deviceHeight,
              resizeMode: 'contain',
              borderRadius: 5,
              // justifyContent: 'center',
              backgroundColor: COLORS.BackgroundColor,
            }}
          />
        </View>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.BackgroundColor,
  },
});
export default SplashScreen;
