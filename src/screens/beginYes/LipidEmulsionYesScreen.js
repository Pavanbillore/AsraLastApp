import React, {useState, useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {
  StatusBar,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  View,
  TouchableOpacity,
  Platform,
  ImageBackground,
  TextInput,
} from 'react-native';
import {COLORS} from '../../styles/GlobalColor';
import AsyncStorage from '@react-native-async-storage/async-storage';
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const LipidEmulsionYesScreen = ({navigation, route}) => {
  const [weight, setWeight] = useState('');
  const [isInitial, setInitial] = useState('0');
  const [value, setValue] = useState(0);

  useEffect(() => {
    getData;
    setValue(route.params.isRemainingTime);
    const intervalId = setInterval(() => {
      // Update the value here. For example, increment it by 1 each second.
      setValue(prevValue => prevValue + 1);
    }, 1000); // 1000 milliseconds = 1 second
    return () => {
      // Cleanup the interval when the component unmounts to avoid memory leaks.
      clearInterval(intervalId);
    };
  }, []); // The empty dependency array ensures this effect runs only once.

  // Convert the value to a "00:00" format
  const formattedValue = `${String(Math.floor(value / 60)).padStart(
    2,
    '0',
  )}:${String(value % 60).padStart(2, '0')}`;

  {
    /* Button Method */
  }
  const onBackClicked = () => {
    navigation.navigate('PulsatileScreen', {
      weight: '',
      isDeffered: false,
      isInitial: '0',
      isRemainingTime: value,
    });
  };

  const onSetWeightClicked = async () => {
    if (isInitial == '0') {
      let intWeight = parseInt(weight);
      let intInitial = parseInt('0');
      let visitNo = intInitial + 1;
      global.pdfdata.weight = weight;
      console.log('visitNo::' + global.pdfdata.weight);
      let strVisitNo = visitNo.toString();
      console.log('weight', weight);
      if (intWeight > 69) {
        navigation.navigate('WeightGreaterScreen', {
          weight: intWeight,
          isFromNo: false,
          isInitial: strVisitNo,
          fromWhichScreen: 'LipidEmulsion',
          isRemainingTime: value,
        });
      } else {
        navigation.navigate('WeightLessScreen', {
          weight: intWeight,
          isFromNo: false,
          isInitial: strVisitNo,
          fromWhichScreen: 'LipidEmulsion',
          isRemainingTime: value,
        });
      }
    }
  };
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('weight', weight);
      if (value !== null) {
        console.log('value', value);
      }
    } catch (e) {
      console.log('Catch Error', e);
    }
  };
  return (
    <SafeAreaProvider style={styles.container} mode="margin">
      <StatusBar barStyle={'dark-content'} />
      <ImageBackground
        style={styles.container}
        source={require('../../images/bgImage.png')}>
        {/* Nav Container */}
        <View style={styles.navContainer}>
          <View style={styles.viewLeftTopContainer}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.leftTopButton}
              rippleColor="rgba(0, 0, 0, .32)"
              onPress={() => onBackClicked()}>
              <Image
                source={require('../../images/back.png')}
                style={styles.leftTopImage}
              />
              <Text style={styles.leftTopTitle}>Checklist</Text>
            </TouchableOpacity>
          </View>

          <Text style={{fontSize: 15, marginRight: 10, color: 'white'}}>
            {formattedValue}
          </Text>
        </View>

        {/* Main Container*/}
        <View style={styles.mainContainer}>
          <Image
            source={require('../../images/weight.png')}
            style={styles.imageWeightStyle}
          />

          <Text style={styles.weightText}>Enter Approximate Weight</Text>

          <TextInput
            style={styles.textInputStyle}
            value={weight}
            onChangeText={weight => setWeight(weight)}
            keyboardType="numeric"
            autoCapitalize="none"
            secureTextEntry={false}
            returnKeyType="done"
            blurOnSubmit={true}
            maxLength={50}
            placeholder="000"
            placeholderTextColor={'gray'}
          />

          <View style={styles.weightDivider} />

          <Text style={styles.kgText}>(In kg)</Text>
        </View>

        {/* Bottom Button */}
        <View style={styles.bottomViewYellow}>
          <Text style={styles.bottomText}>
            Approximate weight is adequate for patient &gt; 40kg
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.bottomButtonPink}
          onPress={() => onSetWeightClicked()}
          rippleColor="rgba(0, 0, 0, .32)">
          <Text style={[styles.leftTopTitle, {fontSize: 18}]}>SET WEIGHT</Text>
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  navContainer: {
    width: deviceWidth,
    height: Platform.OS === 'ios' ? 90 : 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  viewLeftTopContainer: {
    width: 100,
    height: 25,
    justifyContent: 'flex-start',
    marginTop: Platform.OS === 'ios' ? 40 : 0,
    marginLeft: 15,
  },

  leftTopButton: {
    width: 80,
    height: 25,
    flexDirection: 'row',
  },

  leftTopImage: {
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

  mainContainer: {
    height: Platform.OS === 'ios' ? deviceHeight - 90 : deviceHeight - 50,
    flexDirection: 'column',
    backgroundColor: 'white',
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    alignItems: 'center',
  },

  textInputStyle: {
    width: deviceWidth - 80,
    height: Platform.OS === 'ios' ? 60 : 70,
    fontSize: 45,
    marginTop: 5,
    marginHorizontal: 40,
    marginTop: 30,
    textAlign: 'center',
    color: 'black',
  },

  imageWeightStyle: {
    width: 95,
    height: 95,
    marginTop: 70,
    resizeMode: 'contain',
    alignSelf: 'center',
  },

  weightText: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 35,
    color: COLORS.BackgroundColorPink,
  },

  weightDivider: {
    width: 150,
    height: 1,
    marginTop: 10,
    backgroundColor: COLORS.TextGrayColor,
  },

  kgText: {
    fontSize: 17,
    textAlign: 'center',
    marginTop: 15,
    color: 'gray',
  },

  bottomViewYellow: {
    width: deviceWidth,
    height: 55,
    backgroundColor: COLORS.BackgroundYellowColor,
    marginTop: 40,
    position: 'absolute',
    bottom: 65,
    alignItems: 'center',
    justifyContent: 'center',
  },

  bottomText: {
    fontSize: 13,
    fontStyle: 'italic',
    fontWeight: '500',
    textAlign: 'center',
  },

  bottomButtonPink: {
    width: deviceWidth,
    height: 65,
    backgroundColor: COLORS.BackgroundColorPink,
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
  },
});
export default LipidEmulsionYesScreen;
