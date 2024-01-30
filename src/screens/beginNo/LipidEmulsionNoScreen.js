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
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {COLORS} from '../../styles/GlobalColor';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const LipidEmulsionNoScreen = ({navigation, route}) => {
  const [weight, setWeight] = useState('');
  const [fromWhichScreen, setFromWhichScreen] = useState('Asystole');
  const [value, setValue] = useState(0);

  useEffect(() => {
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
    navigation.navigate('AsystoleManagementScreen', {
      weight: '',
      isDeffered: false,
      isInitial: '0',
      fromWhichScreen: fromWhichScreen,
      isRemainingTime: value,
    });
  };

  const onSetWeightClicked = () => {
    navigation.navigate('AsystoleManagementScreen', {
      weight: weight,
      isDeffered: false,
      isInitial: '0',
      fromWhichScreen: fromWhichScreen,
      isRemainingTime: value,
    });
  };

  return (
    <SafeAreaProvider style={styles.container} mode="margin">
      <StatusBar barStyle={'dark-content'} />
      
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
        <View
        style={{
            backgroundColor:"#8297CC",
            height: Platform.OS === 'ios' ? 120 : 150,
        }}
        />
        {/* Main Container*/}
        <ScrollView scrollEnabled style={{flex:1, zIndex:2,
    bottom:Platform.OS === 'ios' ? 60 : 120}}>
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
                keyboardType="number-pad"
                autoFocus
                secureTextEntry={false}
                returnKeyType="done"
                blurOnSubmit={true}
                placeholder="000"
                placeholderTextColor={'gray'}
              />
              <View style={styles.weightDivider} />
              <Text style={styles.kgText}>(In kg)</Text>
        </View>
        </ScrollView>

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

    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:"#fff"
  },
  navContainer: {
    width: deviceWidth,
    height: Platform.OS === 'ios' ? 90 : 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor:"#8297CC"
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
    height:Platform.OS === 'ios' ? deviceHeight - 170 : deviceHeight - 200,
    backgroundColor: 'white',
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
   
  },

  textInputStyle: {
    width: deviceWidth - 80,
    height: Platform.OS === 'ios' ? 60 : 70,
    fontSize: 45,
    marginHorizontal: 40,
    marginTop: 10,
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
    color: 'black',
  },

  weightDivider: {
    width: 150,
    height: 1,
    marginTop: 10,
    backgroundColor: COLORS.TextGrayColor,
    alignSelf:"center"
  },

  kgText: {
    fontSize: 17,
    textAlign: 'center',
    marginTop: 15,
    color: 'black',
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
export default LipidEmulsionNoScreen;
