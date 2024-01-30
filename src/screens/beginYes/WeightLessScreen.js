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
} from 'react-native';
import {COLORS} from '../../styles/GlobalColor';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const listWidth = deviceWidth - 60;

const WeightLessScreen = ({navigation, route}) => {
  const [weight, setWeight] = useState('');
  const [bolus, setBolus] = useState('');
  const [infusion, setInfusion] = useState('');
  const [upperLimit, setUpperLimit] = useState('');
  const [fromWhichScreen, setFromWhichScreen] = useState('');
  const [isFromNo, setFromNo] = useState(false);
  const [isInitial, setInitial] = useState('0');

  const [isChecked1, setChecked1] = useState(false);
  const [isChecked2, setChecked2] = useState(false);
  const [value, setValue] = useState(0);

  useEffect(() => {
    console.log('weight less route.params.weight::::' + route.params.weight);
    setLoadData(
      route.params.weight,
      route.params.isFromNo,
      route.params.isInitial,
      route.params.fromWhichScreen,
      route.params.isRemainingTime,
    );

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

  function setLoadData(
    weight,
    isFromNo,
    isInitial,
    fromWhichScreen,
    isRemainingTime,
  ) {
    setWeight(weight);
    setFromNo(isFromNo);
    setInitial(isInitial);
    setFromWhichScreen(fromWhichScreen);
    setValue(isRemainingTime);

    let weightInt = parseInt(weight);

    let bolus = weightInt * 1.5;
    var strBolus = '' + bolus.toFixed(2);
    const arrayOfStrings = strBolus.split('.');
    setBolus(strBolus);

    let infusion = weightInt * 0.25;
    var strInfusion = '' + infusion.toFixed(2);
    const arrayOfInfusion = strInfusion.split('.');
    setInfusion(strInfusion);

    let upper = weightInt * 12;
    setUpperLimit(upper);
  }

  {
    /* Button Method */
  }
  const onBackClicked = () => {
    if (isFromNo) {
      navigation.navigate('AsystoleManagementScreen', {
        weight: weight,
        isDeffered: false,
        isInitial: '0',
        fromWhichScreen: fromWhichScreen,
        isRemainingTime: value,
      });
    } else {
      navigation.navigate('PulsatileScreen', {
        weight: weight,
        isDeffered: false,
        isInitial: '0',
        fromWhichScreen: 'PulsatileScreen',
        isRemainingTime: value,
      });
    }
  };

  const onFirstButtonClicked = isChecked => {
    setChecked1(isChecked);
    console.log('isInitial in weightLess:::' + isInitial);
    console.log('weight in weightLess:::' + weight);

    if (isChecked == true) {
      if (isFromNo) {
        navigation.navigate('AsystoleManagementScreen', {
          weight: weight,
          isDeffered: false,
          isInitial: isInitial,
          fromWhichScreen: fromWhichScreen,
          isRemainingTime: value,
        });
      } else {
        navigation.navigate('PulsatileScreen', {
          weight: weight,
          isDeffered: false,
          isInitial: isInitial,
          fromWhichScreen: 'PulsatileScreen',
          isRemainingTime: value,
        });
      }
    }
  };

  const onSecondButtonClicked = isChecked => {
    setChecked2(isChecked);

    if (isChecked == true) {
      if (isFromNo) {
        navigation.navigate('AsystoleManagementScreen', {
          weight: weight,
          isDeffered: true,
          isInitial: isInitial,
          fromWhichScreen: fromWhichScreen,
          isRemainingTime: value,
        });
      } else {
        navigation.navigate('PulsatileScreen', {
          weight: weight,
          isDeffered: true,
          isInitial: isInitial,
          fromWhichScreen: 'PulsatileScreen',
          isRemainingTime: value,
        });
      }
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

        <Text style={styles.mainText}>
          Initial Bolus and Infusion Lipid Emulsion 20%
        </Text>

        <Text style={styles.mainTextItalic}>
          The order of administration (bolus or infusion) is not critical.
          Consider infusion pump if &gt;40 kg
        </Text>

        {/* Main Container*/}
        <View style={styles.mainContainer}>
          {/* Frist Column Container*/}
          <View style={styles.firstColumnStyle}>
            <Text style={{fontSize: 16, color: COLORS.PopUpTextBlueColor}}>
              Patient Weight:
            </Text>
            <Text
              style={{
                fontSize: 16,
                marginLeft: 5,
                fontWeight: 'bold',
                color: COLORS.PopUpTextBlueColor,
              }}>
              {weight}kg
            </Text>
          </View>

          {/* First Colunn*/}
          <Text style={styles.firstColumnTextStyle}>
            1. Bolus {bolus} mL IV
          </Text>
          <Text
            style={{
              fontSize: 13,
              marginTop: 5,
              width: deviceWidth - 80,
              color: COLORS.PopUpTextBlueColor,
            }}>
            approx. 1.5 mL/kg IV
          </Text>
          <Text
            style={{
              fontSize: 13,
              marginTop: 5,
              width: deviceWidth - 80,
              color: COLORS.PopUpTextBlueColor,
            }}>
            Infuse over 2-3 minutes
          </Text>

          {/* Second Colunn*/}
          <Text style={styles.firstColumnTextStyle}>
            2. Continuous Infusion
          </Text>
          <Text
            style={{
              fontSize: 13,
              marginTop: 5,
              width: deviceWidth - 80,
              color: COLORS.PopUpTextBlueColor,
            }}>
            {infusion} mL (approx. 0.25 mL/kg/min)
          </Text>

          {/* Third Colunn*/}
          <Text style={styles.firstColumnTextStyle}>
            3. Beware of Upper limit ({upperLimit} mL)
          </Text>
          <Text
            style={{
              fontSize: 13,
              marginTop: 5,
              width: deviceWidth - 80,
              color: COLORS.PopUpTextBlueColor,
            }}>
            Max approx. 12.0 mL/kg
          </Text>

          {/* List 1 */}
          <View
            style={[
              styles.listViewContainer,
              {marginTop: Platform.OS === 'ios' ? 30 : 20},
            ]}>
            <TouchableOpacity
              style={styles.listViewButton}
              onPress={() => onFirstButtonClicked(!isChecked1)}>
              <Image
                source={
                  isChecked1
                    ? require('../../images/checkboxChecked.png')
                    : require('../../images/checkboxUnchecked.png')
                }
                style={styles.checkedUnchecked}
              />
              <Text style={styles.listViewText}>Lipid Emulsion Started</Text>
            </TouchableOpacity>
          </View>

          {/* List 2 */}
          <View
            style={[
              styles.listViewContainer,
              {marginTop: Platform.OS === 'ios' ? 25 : 15},
            ]}>
            <TouchableOpacity
              style={styles.listViewButton}
              onPress={() => onSecondButtonClicked(!isChecked2)}>
              <Image
                source={
                  isChecked2
                    ? require('../../images/checkboxChecked.png')
                    : require('../../images/checkboxUnchecked.png')
                }
                style={styles.checkedUnchecked}
              />
              <Text style={styles.listViewText}>Lipid Emulsion Deferred</Text>
            </TouchableOpacity>
          </View>

          {/* Bullet 1 */}
          <View style={{flexDirection: 'row', marginTop: 20}}>
            <Text style={styles.popUpBullet}>{`\u25cf `}</Text>
            <Text
              style={[
                styles.listViewText,
                {fontSize: 11, marginLeft: 0, marginTop: 5},
              ]}>
              Propofol is not a substitute for Lipid Emulsion 20%
            </Text>
          </View>

          {/* Bullet 2 */}
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <Text style={styles.popUpBullet}>{`\u25cf `}</Text>
            <Text
              style={[
                styles.listViewText,
                {fontSize: 11, marginLeft: 0, marginTop: 5},
              ]}>
              Dosing Limit - approx. 12 ml/kg
            </Text>
          </View>
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

  mainText: {
    fontSize: Platform.OS === 'ios' ? 28 : 25,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginVertical: 10,
    marginHorizontal: 20,
  },

  mainTextItalic: {
    fontSize: 11,
    fontStyle: 'italic',
    fontWeight: '500',
    textAlign: 'center',
    color: 'white',
    marginHorizontal: 30,
    marginBottom: 20,
  },

  mainContainer: {
    height: Platform.OS === 'ios' ? deviceHeight - 140 : deviceHeight - 80,
    flexDirection: 'column',
    backgroundColor: 'white',
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    paddingHorizontal: 30,
  },

  firstColumnStyle: {
    flexDirection: 'row',
    marginTop: Platform.OS === 'ios' ? 50 : 40,
    width: deviceWidth - 80,
  },

  firstColumnTextStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    width: deviceWidth - 80,
    color: COLORS.PopUpTextBlueColor,
  },

  listViewContainer: {
    height: 60,
    width: listWidth,
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: 'gray',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 0.5,
    elevation: 10,
  },

  listViewButton: {
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
  },

  listViewText: {
    marginLeft: 10,
    fontSize: 17,
    color: COLORS.PopUpTextBlueColor,
  },

  checkedUnchecked: {height: 20, width: 20, marginLeft: 20, marginRight: 10},

  popUpBullet: {
    fontSize: 9,
    fontWeight: '400',
    alignSelf: 'center',
    color: COLORS.PopUpTextBlueColor,
    marginLeft: 10,
    marginTop: 5,
  },
});
export default WeightLessScreen;
