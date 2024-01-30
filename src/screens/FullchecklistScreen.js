import React, {useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {
  StatusBar,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  ImageBackground,
  View,
  TouchableOpacity,
  Linking,
  Platform,
} from 'react-native';
import {COLORS} from '../styles/GlobalColor';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const FullchecklistScreen = ({navigation, route}) => {
  const [isloading, setLoading] = useState(false);

  {
    /* Button Method */
  }
  const onDoneButtonClicked = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaProvider style={styles.container} mode="margin">
      <StatusBar barStyle={'dark-content'} />
      <ImageBackground
        style={styles.container}
        source={require('../images/bgImage.png')}>
        {/* Nav Container */}
        <View style={styles.navContainer}>
          <View style={styles.leftNavView}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.leftTopButton}
              rippleColor="rgba(0, 0, 0, .32)"
              onPress={() => navigation.goBack()}>
              <Image
                source={require('../images/back.png')}
                style={styles.leftNavImage}
              />
              <Text style={styles.leftTopTitle}>Back</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Main Container*/}
        <View
          style={{
            width: deviceWidth,
            height:
              Platform.OS === 'ios' ? deviceHeight - 90 : deviceHeight - 50,
            marginTop: 0,
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: COLORS.TextLightestGrayColor,
          }}>
          <Image
            source={require('../images/fullChecklist.png')}
            style={{
              width: deviceWidth,
              height:
                Platform.OS === 'ios' ? deviceHeight - 200 : deviceHeight - 160,
              alignSelf: 'center',
              resizeMode: 'stretch',
              marginBottom: 30,
              marginTop: 5,
            }}
          />
        </View>
      </ImageBackground>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  navContainer: {
    height: Platform.OS === 'ios' ? 90 : 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  leftNavView: {
    width: 70,
    height: 25,
    justifyContent: 'flex-start',
    marginTop: Platform.OS === 'ios' ? 40 : 0,
    marginLeft: 15,
  },

  leftTopButton: {
    flexDirection: 'row',
  },

  leftNavImage: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
    alignSelf: 'center',
  },

  leftTopTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    alignSelf: 'center',
    marginLeft: 10,
  },
});
export default FullchecklistScreen;
