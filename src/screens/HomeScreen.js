import React, {useState, useRef, useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {
  StatusBar,
  StyleSheet,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Text,
  ImageBackground,
  Platform,
  PermissionsAndroid,
  TextInput,
} from 'react-native';
import {COLORS} from '../styles/GlobalColor';
import GlobalAwesomeAlert from '../components/GlobalAwesomeAlert';
import AsyncStorage from '@react-native-async-storage/async-storage';
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const HomeScreen = ({navigation, route}) => {
  const [isInititalEmailALert, setInititalEmailALert] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setmessage] = useState('');
  const [visibleAlert, setShowAlert] = useState(false);
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  useEffect(() => {
    onShare();
  }, []);
  const onShare = async () => {
    try {
      if (Platform.OS == 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Cool Photo App Camera Permission',
            message:
              'Cool Photo App needs access to your camera ' +
              'so you can take awesome pictures.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        const grantedwrite = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Cool Photo App Camera Permission',
            message:
              'Cool Photo App needs access to your camera ' +
              'so you can take awesome pictures.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (
          granted === PermissionsAndroid.RESULTS.GRANTED &&
          grantedwrite === PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log('Read permission accepted');
        } else {
          console.log('Read permission denied');
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  {
    /* Alert */
  }
  function showAlert() {
    setShowAlert(true);
  }

  hideAlert = () => {
    setShowAlert(false);
  };

  {
    /* Functions */
  }
  const getData = async () => {
    try {
      let value = await AsyncStorage.getItem('alreadyLaunched');
      console.log('value home::' + value);

      let valueIntitial = await AsyncStorage.getItem('emailInitial');
      console.log('value Intitial home::' + valueIntitial);

      if (valueIntitial == '' || valueIntitial == null) {
        console.log('value Intitial home inside if');
        AsyncStorage.setItem('emailInitial', 'true');
        setInititalEmailALert(true);
      } else if (valueIntitial == 'true') {
        console.log('value Intitial home inside else if');
        setInititalEmailALert(true);
      } else {
        console.log('value Intitial home inside else');
        setInititalEmailALert(false);
      }
    } catch (e) {
      console.log('Error in local storage: ' + e.message);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener(
      'focus',
      () => {
        getData();
      },
      [navigation],
    );

    return unsubscribe;
  }, [navigation]);

  const callSubscriptionApi = () => {
    var details = {
      email: email,
      device_id: 'xyzabc123980',
      platform_name: Platform.OS === 'ios' ? 'ios' : 'android',
      app_name: 'last',
    };
    console.log('details:::::' + details);

    fetch('http://44.195.249.110/api/subscriptions/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        device_id: 'xyzabc123980',
        platform_name: Platform.OS === 'ios' ? 'ios' : 'android',
        app_name: 'last',
      }),
    })
      .then(response => response.json())
      .then(response => {
        AsyncStorage.setItem('emailInitial', 'false');
        console.log('response for Subscription Api: ' + response);
      })
      .catch(function (error) {
        console.log(
          'There has been a problem with your fetch operation: ' +
            error.message,
        );
        throw error;
      });
  };

  {
    /* Button Container*/
  }
  const clickOnInfoButton = () => {
    navigation.navigate('InfoScreen');
  };

  const clickOnBeginButton = () => {
    global.pdfdata.eventstart_time = new Date();
    navigation.navigate('BeginScreen');
  };

  const onSkipButtonClicked = () => {
    AsyncStorage.setItem('emailInitial', 'false');
    setInititalEmailALert(false);
  };

  const onContinueEmailClicked = () => {
    if (email.length == 0) {
      setmessage('Please enter your registered email address');
      showAlert();
    } else if (reg.test(email) === false) {
      setmessage('Incorrect email address');
      showAlert();
    } else {
      callSubscriptionApi();
      setInititalEmailALert(false);
    }
  };

  return (
    <SafeAreaProvider style={styles.container} mode="margin">
      <StatusBar barStyle={'light-content'} />
      <GlobalAwesomeAlert
        message={message}
        isCancelButton={false}
        isConfirmButton={true}
        cancelTitle={'NO, Cancel'}
        confirmTitle={'OK'}
        onCancelClicked={() => hideAlert()}
        onConfirmClicked={() => hideAlert()}
        isAlertShow={visibleAlert}
      />

      <ImageBackground
        style={styles.container}
        source={require('../images/bgImage.png')}>
        {/* Nav Container */}
        <View style={styles.navigationContainer}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.rightTopButton}
            onPress={clickOnInfoButton}>
            <Image source={require('../images/info.png')} />
          </TouchableOpacity>
        </View>

        {/* Main Container*/}
        <View style={styles.mainContainer}>
          <Text style={styles.mainText}>
            Local Anesthethic Systemic Toxicity Alogrithm 3.0
          </Text>

          <View style={styles.asraLogoContainer}>
            <Image
              source={require('../images/asraLogo.png')}
              style={styles.asraLogo}
            />
            <Text style={styles.beginText}>BEGIN L.A.S.T</Text>

            <TouchableOpacity
              rippleColor="rgba(0, 0, 0, .32)"
              style={styles.pressButton}
              onPress={clickOnBeginButton}>
              <Text style={styles.pressText}>Press To Start</Text>
            </TouchableOpacity>

            <Text style={styles.bottomText}>
              The information provided is based on published data and expert
              opinion. It is to be used as a recommendation only. Clinical
              judgement by a physician is required in every situation. User
              assumes all responsibility for decisions made in concert with the
              use of this app.
            </Text>
          </View>
        </View>

        {/* Subscribe Alert */}
        {isInititalEmailALert ? (
          <View position="absolute" style={styles.popUpBgView}>
            <View style={styles.popUpSmallBg}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => onSkipButtonClicked()}>
                <Image
                  source={require('../images/cancel.png')}
                  style={styles.popUpClose}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <Text style={styles.popUpMainHeader}>
                To receive automatic updates and alerts, please enter the email
                address associated with the account used to download the app.
              </Text>

              {/* Your Email Id */}
              <View style={styles.listViewConatiner}>
                <Text style={styles.listViewText}>Email ID:</Text>
                <TextInput
                  style={styles.textInputStyle}
                  value={email}
                  onChangeText={email => setEmail(email)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  secureTextEntry={false}
                  returnKeyType="done"
                  blurOnSubmit={true}
                  maxLength={30}
                  placeholder="Please enter your email address"
                  color="black"
                  placeholderTextColor="gray"
                />
                <View
                  style={[
                    styles.viewDivider,
                    {backgroundColor: COLORS.TextLightGrayColor},
                  ]}></View>
              </View>

              {/* Submit Button */}
              <TouchableOpacity
                activeOpacity={0.5}
                style={[
                  styles.popUpPinkButton,
                  {
                    backgroundColor: COLORS.BackgroundColorPink,
                    marginTop: 30,
                  },
                ]}
                onPress={() => onContinueEmailClicked()}>
                <Text style={[styles.popUpButtonText, {color: 'white'}]}>
                  Continue
                </Text>
              </TouchableOpacity>

              {/* Skip Button */}
              <TouchableOpacity
                activeOpacity={0.5}
                style={[
                  styles.popUpPinkButton,
                  {backgroundColor: 'transparent', marginTop: 0},
                ]}
                onPress={() => onSkipButtonClicked()}>
                <Text style={styles.popUpButtonText}>Skip</Text>
              </TouchableOpacity>

              <View style={styles.dangerContainer}>
                <Image
                  source={require('../images/alert.png')}
                  style={styles.checkedUnchecked}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    fontSize: 10,
                    fontStyle: 'italic',
                    color: 'black',
                    fontWeight: 'normal',
                  }}>
                  Skipping this, you will not receive automatic updates or
                  service alerts.
                </Text>
              </View>
            </View>
          </View>
        ) : null}
      </ImageBackground>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BackgroundColor,
  },

  navigationContainer: {
    height: 50,
    marginTop: Platform.OS === 'ios' ? 40 : 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  rightTopButton: {
    width: 25,
    height: 25,
    marginTop: 10,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  mainContainer: {
    height: Platform.OS === 'ios' ? deviceHeight - 90 : deviceHeight - 70,
    flexDirection: 'column',
  },

  mainText: {
    color: 'white',
    fontSize: Platform.OS === 'ios' ? 35 : 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
    marginHorizontal: 15,
    height: 150,
  },

  asraLogoContainer: {
    width: deviceWidth,
    height: Platform.OS === 'ios' ? deviceHeight - 240 : deviceHeight - 200,
    flexDirection: 'column',
    alignItems: 'center',
  },

  asraLogo: {
    width: 178,
    height: 217,
    marginTop: Platform.OS === 'ios' ? 50 : 20,
    resizeMode: 'contain',
  },

  beginText: {
    color: 'white',
    fontSize: Platform.OS === 'ios' ? 45 : 40,
    fontWeight: 'bold',
    textAlign: 'center',
    width: deviceWidth,
    marginTop: 25,
  },

  pressButton: {
    width: 200,
    height: 50,
    backgroundColor: COLORS.BackgroundColorPink,
    marginTop: 25,
    borderRadius: 25,
    justifyContent: 'center',
  },

  pressText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  bottomText: {
    color: 'white',
    fontSize: 11,
    fontWeight: '500',
    textAlign: 'center',
    marginHorizontal: 40,
    marginTop: 75,
  },

  popUpBgView: {
    backgroundColor: COLORS.BlackHalfAlpha,
    width: deviceWidth,
    height: deviceHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },

  popUpSmallBg: {
    height: 450,
    width: deviceWidth - 40,
    flexDirection: 'column',
    backgroundColor: 'white',
  },

  popUpMainHeader: {
    fontSize: 14,
    marginHorizontal: 25,
    color: 'black',
    textAlign: 'center',
    marginTop: 20,
  },

  popUpTitle: {
    fontSize: 15,
    textAlign: 'left',
    marginHorizontal: 30,
  },

  popUpButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 15,
  },

  popUpClose: {
    width: 15,
    height: 15,
    marginTop: 25,
    marginRight: 30,
    alignSelf: 'flex-end',
  },

  listViewConatiner: {
    width: deviceWidth - 40,
    marginTop: 30,
    flexDirection: 'column',
  },

  listViewText: {
    fontWeight: '500',
    marginLeft: 30,
    fontSize: 12,
    color: COLORS.TextDarkGrayColor,
    width: deviceWidth - 90,
  },

  textInputStyle: {
    width: deviceWidth - 90,
    height: Platform.OS === 'ios' ? 30 : 40,
    fontSize: 12,
    marginTop: 15,
    marginHorizontal: 25,
    marginTop: Platform.OS === 'ios' ? 20 : 10,
  },

  viewDivider: {
    height: 1,
    width: deviceWidth - 90,
    backgroundColor: COLORS.PowderBlueColor,
    marginTop: 5,
    marginHorizontal: 25,
  },

  popUpPinkButton: {
    height: 50,
    width: deviceWidth - 90,
    marginHorizontal: 25,
  },

  dangerContainer: {
    width: deviceWidth - 40,
    height: 50,
    backgroundColor: COLORS.BackgroundYellowColor,
    marginTop: Platform.OS === 'ios' ? 40 : 0,
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    flexDirection: 'row',
  },

  checkedUnchecked: {height: 15, width: 15, marginLeft: 10, marginRight: 5},
});
export default HomeScreen;
