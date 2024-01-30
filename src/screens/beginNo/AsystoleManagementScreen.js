import React, {useState, useEffect, useRef} from 'react';
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
  Animated,
  Vibration,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import {COLORS} from '../../styles/GlobalColor';
import Voice from '@react-native-voice/voice';
var Sound = require('react-native-sound');
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const listWidth = deviceWidth - 60;
var whoosh;
const AsystoleManagementScreen = ({navigation, route, timer, animation}) => {
  const [fourthButtonText, setFourthButtonText] = useState(
    'Set Patient Weight to get',
  );
  const [fourthButton1Text, setFourthButto1nText] = useState('');
  const [fourthButtonSmallText, setFourthButtonSmallText] = useState(
    '(Epinephrine <= 1 mcg/kg (Due: Now) >)',
  );
  const [fourthButtonSmall1Text, setFourthButtonSmall1Text] = useState(
    'Considering doubling dose if no response',
  );

  const [isChecked1, setChecked1] = useState(false);
  const [isChecked2, setChecked2] = useState(false);
  const [isChecked3, setChecked3] = useState(false);
  const [isChecked4, setChecked4] = useState(false);
  const [isChecked5, setChecked5] = useState(false);
  const [isChecked6, setChecked6] = useState(false);
  const [isButtonClicked, setButtonClicked] = useState(false);
  const [isRadioActive, setRadioActive] = useState(false);

  const [value, setValue] = useState(0);

  const [remainingTime, setRemainingTime] = useState(120);
  const [counting, setCounting] = useState(false);
  const intervalRef = useRef(null);

  const [isPatientLabile, setPatientLabile] = useState(
    require('../../images/radioInactive.png'),
  );
  const [isResuscitation, setResuscitation] = useState(
    require('../../images/radioInactive.png'),
  );

  const [isPatientUnstable, setPatientUnstable] = useState(
    require('../../images/radioInactive.png'),
  );

  const [isBenzodiazepine, setBenzodiazepine] = useState(
    require('../../images/radioInactive.png'),
  );
  const [isPropofol, setPropofol] = useState(
    require('../../images/radioInactive.png'),
  );
  const [isNoDrug, setNoDrug] = useState(
    require('../../images/radioInactive.png'),
  );

  const [isEndEventAlert, setEndEventAlert] = useState(false);
  const [isSeizureAlert, setSeizureAlert] = useState(false);
  const [isDeffered, setDeffered] = useState(true);
  const [weight, setWeight] = useState('');
  const [fromWhichScreen, setFromWhichScreen] = useState('');
  const [mainHeaderText, setMainHeaderText] = useState('');
  const [firstText, setFirstText] = useState('');
  const [secondText, setSecondText] = useState('');
  const [thirdText, setThirdText] = useState('');
  const [isInitial, setInitial] = useState('0');
  const [showText, setShowText] = useState(true);
  const spinValue = new Animated.Value(0);

  {
    /* Button Method */
  }
  const onBackClicked = () => {
    navigation.navigate('NoPulseScreen', {
      weight: weight,
      isDeffered: false,
      isInitial: isInitial,
      isRemainingTime: value,
    });
  };

  const onFirstButtonClicked = isChecked => {
    setChecked1(isChecked);
    setButtonClicked(isChecked);

    setTimeout(() => {
      if (!isRadioActive) {
        setSeizureAlert(true);
      } else {
        setSeizureAlert(false);
      }
    }, 10000);
  };

  const onSecondButtonClicked = isChecked => {
    setChecked2(isChecked);
  };

  const onThirdButtonClicked = isChecked => {
    setChecked3(isChecked);
  };

  const onFourthButtonClicked = isChecked => {
    console.log('onFourthButtonClicked');
    setChecked4(isChecked);
    if (weight == '') {
      if (fromWhichScreen == 'Asystole') {
        navigation.navigate('LipidEmulsionNoScreen', {
          weight: weight,
          isInitial: isInitial,
          fromWhichScreen: fromWhichScreen,
          isRemainingTime: value,
        });
      } else if (fromWhichScreen == 'Vtach') {
        navigation.navigate('LipidEmulsionNoScreenVTach', {
          weight: weight,
          isInitial: isInitial,
          fromWhichScreen: fromWhichScreen,
          isRemainingTime: value,
        });
      } else if (fromWhichScreen == 'Vfib') {
        navigation.navigate('LipidEmulsionNoScreenVFib', {
          weight: weight,
          isInitial: isInitial,
          fromWhichScreen: fromWhichScreen,
          isRemainingTime: value,
        });
      }
    }
  };

  const onFifthButtonClicked = isChecked => {
    if (isChecked) {
      setChecked5(isChecked);

      if (weight == '') {
        navigation.navigate('LipidEmulsionNoScreen', {
          weight: weight,
          isInitial: isInitial,
          fromWhichScreen: fromWhichScreen,
          isRemainingTime: value,
        });
      } else {
        if (isInitial == '0') {
          let intWeight = parseInt(weight);
          let intInitial = parseInt(isInitial);
          let visitNo = intInitial + 1;
          let strVisitNo = visitNo.toString();

          if (intWeight > 69) {
            navigation.navigate('WeightGreaterScreen', {
              weight: intWeight,
              isFromNo: true,
              isInitial: strVisitNo,
              fromWhichScreen: fromWhichScreen,
              isRemainingTime: value,
            });
          } else {
            navigation.navigate('WeightLessScreen', {
              weight: intWeight,
              isFromNo: true,
              isInitial: strVisitNo,
              fromWhichScreen: fromWhichScreen,
              isRemainingTime: value,
            });
          }
        } else if (isDeffered == true) {
          let intWeight = parseInt(weight);
          let intInitial = parseInt(isInitial);
          let visitNo = intInitial + 1;
          let strVisitNo = visitNo.toString();

          if (intWeight > 69) {
            navigation.navigate('WeightGreaterScreen', {
              weight: intWeight,
              isFromNo: true,
              isInitial: strVisitNo,
              fromWhichScreen: fromWhichScreen,
              isRemainingTime: value,
            });
          } else {
            navigation.navigate('WeightLessScreen', {
              weight: intWeight,
              isFromNo: true,
              isInitial: strVisitNo,
              fromWhichScreen: fromWhichScreen,
              isRemainingTime: value,
            });
          }
        } else {
          let intWeight = parseInt(weight);
          let intInitial = parseInt(isInitial);
          let visitNo = intInitial + 1;
          let strVisitNo = visitNo.toString();

          if (intWeight > 69) {
            navigation.navigate('LipidEmulsionStartedGreater', {
              weight: intWeight,
              isFromNo: true,
              isInitial: strVisitNo,
              fromWhichScreen: fromWhichScreen,
              isRemainingTime: value,
            });
          } else {
            navigation.navigate('LipidEmulsionStartedLess', {
              weight: intWeight,
              isFromNo: true,
              isInitial: strVisitNo,
              fromWhichScreen: fromWhichScreen,
              isRemainingTime: value,
            });
          }
        }
      }
    } else {
      setChecked5(false);
    }
  };

  const onSixthButtonClicked = isChecked => {
    setChecked6(isChecked);
    navigation.navigate('ReversibleCauseScreen', {isRemainingTime: value});
  };

  const onEndEventButtonClicked = () => {
    global.pdfdata.eventend_time = new Date();
    setEndEventAlert(true);
  };

  const onCloseEndEventButtonClicked = () => {
    setEndEventAlert(false);
    setPatientLabile(require('../../images/radioInactive.png'));
    setResuscitation(require('../../images/radioInactive.png'));
    setPatientUnstable(require('../../images/radioInactive.png'));
  };

  const onPatientLabileClicked = () => {
    setPatientLabile(require('../../images/radioActive.png'));
    setResuscitation(require('../../images/radioInactive.png'));
    setPatientUnstable(require('../../images/radioInactive.png'));

    const timeout = setTimeout(() => {
      navigation.navigate('GenerateReportScreen');
      setEndEventAlert(false);
      setPatientLabile(require('../../images/radioInactive.png'));
      setResuscitation(require('../../images/radioInactive.png'));
      setPatientUnstable(require('../../images/radioInactive.png'));
    }, 500);
  };

  const onResuscitationClicked = () => {
    setPatientLabile(require('../../images/radioInactive.png'));
    setResuscitation(require('../../images/radioActive.png'));
    setPatientUnstable(require('../../images/radioInactive.png'));

    const timeout = setTimeout(() => {
      navigation.navigate('GenerateReportScreen');
      setEndEventAlert(false);
      setPatientLabile(require('../../images/radioInactive.png'));
      setResuscitation(require('../../images/radioInactive.png'));
      setPatientUnstable(require('../../images/radioInactive.png'));
    }, 500);
  };

  const onPatientUnstableClicked = () => {
    setPatientLabile(require('../../images/radioInactive.png'));
    setResuscitation(require('../../images/radioInactive.png'));
    setPatientUnstable(require('../../images/radioActive.png'));

    const timeout = setTimeout(() => {
      navigation.navigate('GenerateReportScreen');
      setEndEventAlert(false);
      setPatientLabile(require('../../images/radioInactive.png'));
      setResuscitation(require('../../images/radioInactive.png'));
      setPatientUnstable(require('../../images/radioInactive.png'));
    }, 500);
  };

  const onCloseSeizureButtonClicked = () => {
    setSeizureAlert(false);
  };

  const onBenzodiazepineButtonClicked = () => {
    setRadioActive(true);
    setBenzodiazepine(require('../../images/radioActive.png'));
    setPropofol(require('../../images/radioInactive.png'));
    setNoDrug(require('../../images/radioInactive.png'));
    setSeizureAlert(false);
  };

  const onPropofolButtonClicked = () => {
    setRadioActive(true);
    setPropofol(require('../../images/radioActive.png'));
    setBenzodiazepine(require('../../images/radioInactive.png'));
    setNoDrug(require('../../images/radioInactive.png'));
    setSeizureAlert(false);
  };

  const onNoDrugButtonClicked = () => {
    setRadioActive(true);
    setNoDrug(require('../../images/radioActive.png'));
    setBenzodiazepine(require('../../images/radioInactive.png'));
    setPropofol(require('../../images/radioInactive.png'));
    setSeizureAlert(false);
  };

  {
    /* Use State*/
  }
  function setLoadData(weight, isDeffered, isInitial, fromWhichScreen) {
    // console.log('weight Asystole Management Screen:::' + weight);
    // console.log('isDeffered Asystole Management Screen:::' + isDeffered);

    // console.log('isInitial Asystole Management Screen:::' + isInitial);

    setWeight(weight);
    setDeffered(isDeffered);
    setInitial(isInitial);
    setFromWhichScreen(fromWhichScreen);
    // console.log(
    //   'fromWhichScreen Asystole Management Screen:::' + fromWhichScreen,
    // );

    setFirstText('Continue CPR');
    setThirdText('Consider Advanced Airway');
    if (fromWhichScreen == 'Asystole') {
      setMainHeaderText('Asystole Management');
      setSecondText('No Shock');
      if (weight == '') {
        setFourthButtonText('Set Patient Weight to get');
        setFourthButto1nText('');
        setFourthButtonSmallText('Epinephrine <= 1 mcg/kg (Due: Now)');
        setFourthButtonSmall1Text('Considering doubling dose if no response');
      } else {
        setFourthButtonText('Epinephrine ≤');
        setFourthButto1nText('mcg (Due: Now)');
        setFourthButtonSmallText('(Considering doubling dose if no response)');
        setFourthButtonSmall1Text('');
      }
    } else if (fromWhichScreen == 'Pea') {
      setMainHeaderText('PEA Management');
      setSecondText('No Shock');
    } else if (fromWhichScreen == 'Vtach') {
      setMainHeaderText('V-Tach Management');
      setSecondText('Shock 150J');
    } else if (fromWhichScreen == 'Vfib') {
      setMainHeaderText('V-Fib Management');
      setSecondText('Shock 150J');
      if (weight == '') {
        setFourthButtonText('Set Patient Weight to get');
        setFourthButto1nText('');
        setFourthButtonSmallText('(Epinephrine dosage (Due: Now) >)');
        setFourthButtonSmall1Text('Considering doubling dose if no response');
      } else {
        setFourthButtonText('Epinephrine ≤');
        setFourthButto1nText('mcg (Due: Now)');
        setFourthButtonSmallText('(Considering doubling dose if no response)');
        setFourthButtonSmall1Text('');
      }
    }
  }

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
  }, [timer]); // The empty dependency array ensures this effect runs only once.

  // Convert the value to a "00:00" format
  const formattedValue = `${String(Math.floor(value / 60)).padStart(
    2,
    '0',
  )}:${String(value % 60).padStart(2, '0')}`;

  useEffect(() => {
    setLoadData(
      route.params.weight,
      route.params.isDeffered,
      route.params.isInitial,
      route.params.fromWhichScreen,
    );

    // setTimeout(() => {
    if (!isButtonClicked) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(spinValue, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(spinValue, {
            toValue: 2,
            duration: 400,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    }
    // }, 5000);
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1, 2],
    outputRange: ['0deg', '6deg', '-5deg'],
  });
  const [endeventpop, setendeventpop] = useState(false);
  const startCountdown = isChecked => {
    setChecked1(isChecked);
    setButtonClicked(isChecked);

    setTimeout(() => {
      if (!isRadioActive) {
        setSeizureAlert(true);
      } else {
        setSeizureAlert(false);
      }
    }, 10000);

    setRemainingTime(120); // 2 minutes in seconds
    setCounting(true);

    intervalRef.current = setInterval(() => {
      setRemainingTime(prevTime => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          setCounting(false); // Stop the countdown when it reaches 0 seconds
          console.log('raghu')
          clearInterval(intervalRef.current);
          setendeventpop(true);
          return prevTime;
        }
      });
    }, 1000); // 1000 milliseconds = 1 second
    setTimeout(() => {
      Alert.alert(
        'Reassess?',
        'Would you like to reassess the patient`s pulse and rhythm or end this code event?',
        [
          {
            text: 'Reassess',
            onPress: () => onBackClicked(),
            style: 'cancel',
          },
          {
            text: 'End Event',
            onPress: () => onEndEventButtonClicked(),
            style: 'default',
          },
        ],
        {
          cancelable: false,
        },
      );
    }, 120000);
  };
  const vibrationPress = () => {
    var ONE_SECOND_IN_MS = 1000;
    if (ONE_SECOND_IN_MS) {
      Vibration.vibrate(30 * ONE_SECOND_IN_MS);
      Voice.isAvailable();
    } else {
      Vibration.cancel();
    }
  };
  const replaysound = success => {
    if (success) {
      if (!global.pdfdata.continueCPR) {
        setTimeout(() => whoosh.play(success => replaysound(success)), 2000);
      }

      console.log('successfully finished playing' + global.pdfdata.continueCPR);
    } else {
      console.log('playback failed due to audio decoding errors');
    }
  };

  const scaleAnimate = useRef(new Animated.Value(20)).current;
  const [seconds, setSeconds] = useState(5);
  const timerPress = () => {
    Sound.setCategory('Playback');
    whoosh = new Sound(
      require('../../images/continuecpr.mp3'),
      // Sound.MAIN_BUNDLE,
      error => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
        // loaded successfully
        console.log(
          'duration in seconds: ' +
            whoosh.getDuration() +
            'number of channels: ' +
            whoosh.getNumberOfChannels(),
        );

        // Play the sound with an onEnd callback
        whoosh.play(success => replaysound(success));
      },
    );

    // animateElementIn();
    vibrationPress();
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnimate, {
          toValue: 25,
          duration: 2000,
          useNativeDriver: false,
        }),
        Animated.timing(scaleAnimate, {
          toValue: 20,
          duration: 3000,
          useNativeDriver: false,
        }),
      ]),
    ).start();
  };
  useEffect(() => {
    setTimeout(() => {
      timerPress();
    }, 3000);
  }, []);

  //  const spinValue = new Animated.Value(0);
  const animateElementIn = () => {
    Animated.timing(scaleAnimate, {
      toValue: 25,
      duration: 2000,
      useNativeDriver: false,
    }).start();
  };
  const animateElementOut = () => {
    Animated.timing(scaleAnimate, {
      toValue: 20,
      duration: 3000,
      useNativeDriver: false,
    }).start();
  };
  const animationStyle = {
    width: scaleAnimate,
    height: scaleAnimate,
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
              <Text style={styles.leftTopTitle}>Rhythm</Text>
            </TouchableOpacity>
          </View>
          <Text style={{fontSize: 15, marginRight: 10, color: 'white'}}>
            {formattedValue}
          </Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.mainText}>{mainHeaderText}</Text>
        </TouchableOpacity>

        {/* Main Container*/}
        <View style={[styles.mainContainer,{
        }]}>
          {/* List Container*/}

          {/* List 1 */}
          {/* <Text style={{fontSize: 15}}>0:0{timerValue}</Text> */}
          <View
            style={[
              styles.listViewContainer,
              {
              marginTop: Platform.OS === 'ios' ? 30 : 20,
              margin:Platform.OS === 'ios' ? 5 : 2,
            },

            ]}>
            <TouchableOpacity
              style={[styles.listViewButton]}
              onPress={() => {
                animateElementOut();
                startCountdown(!isChecked1);
                setButtonClicked(!isChecked1);
                global.pdfdata.continueCPR = !isChecked1;
                global.pdfdata.continueCPR_time = new Date();
                Vibration.cancel();
              }}>
              <Animated.Image
                source={
                  isChecked1
                    ? require('../../images/checkboxChecked.png')
                    : require('../../images/checkboxUnchecked.png')
                }
                style={[
                  styles.checkedUnchecked,
                  animationStyle,
                ]}></Animated.Image>

              <Text
                style={[
                  styles.listViewText,
                  {fontSize: Platform.OS === 'ios' ? 16 : 14},
                ]}>
                {firstText}
              </Text>
            </TouchableOpacity>
          </View>

          {/* List 2 */}
          <View style={[styles.listViewContainer, {marginTop: 20}]}>
            {fromWhichScreen == 'Vtach' || fromWhichScreen == 'Vfib' ? (
              <TouchableOpacity
                style={styles.listViewButton}
                disabled={false}
                onPress={() => {
                  onSecondButtonClicked(!isChecked2);
                  global.pdfdata.noShock = !isChecked2;
                  global.pdfdata.noShock_time = new Date();
                }}>
                <Image
                  source={
                    isChecked2
                      ? require('../../images/checkboxChecked.png')
                      : require('../../images/checkboxUnchecked.png')
                  }
                  style={styles.checkedUnchecked}
                />
                <Text style={[styles.listViewText, {fontSize: 16}]}>
                  {secondText}
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.listViewButton}
                disabled={true}
                onPress={() => {
                  onSecondButtonClicked(!isChecked2);
                  global.pdfdata.yesShock = !isChecked2;
                  global.pdfdata.yesShock_time = new Date();
                }}>
                <Image
                  source={
                    isChecked2
                      ? require('../../images/checkboxChecked.png')
                      : require('../../images/checkboxUnchecked.png')
                  }
                  style={[
                    styles.checkedUnchecked,
                    {tintColor: COLORS.TextLightGrayColor},
                  ]}
                />
                <Text
                  style={[
                    styles.listViewText,
                    {fontSize: 16, color: COLORS.TextLightestGrayColor},
                  ]}>
                  {secondText}
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* List 3 */}
          <View style={[styles.listViewContainer, {marginTop: 20}]}>
            <TouchableOpacity
              style={styles.listViewButton}
              onPress={() => {
                onThirdButtonClicked(!isChecked3);
                global.pdfdata.advanceairway = !isChecked3;
                global.pdfdata.advanceairway_time = new Date();
              }}>
              <Image
                source={
                  isChecked3
                    ? require('../../images/checkboxChecked.png')
                    : require('../../images/checkboxUnchecked.png')
                }
                style={styles.checkedUnchecked}
              />
              <Text style={[styles.listViewText, {fontSize: 16}]}>
                {thirdText}
              </Text>
            </TouchableOpacity>
          </View>

          {/* List 4*/}
          <View style={[styles.listViewContainer, {marginTop: 20}]}>
            {fromWhichScreen == 'Asystole' ||
            fromWhichScreen == 'Vtach' ||
            fromWhichScreen == 'Vfib' ? (
              <TouchableOpacity
                style={styles.listViewButton}
                onPress={() => {
                  onFourthButtonClicked(!isChecked4);
                  global.pdfdata.patientWeight = !isChecked4;
                  global.pdfdata.patientWeight_time = new Date();
                }}>
                <Image
                  source={
                    isChecked4
                      ? require('../../images/checkboxChecked.png')
                      : require('../../images/checkboxUnchecked.png')
                  }
                  style={styles.checkedUnchecked}
                />

                <View style={{flexDirection: 'column'}}>
                  <Text style={[styles.listViewText, {fontSize: 16}]}>
                    {fourthButtonText} {weight}
                    {fourthButton1Text}
                  </Text>

                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={[
                        styles.listViewText,
                        {fontSize: 10, marginLeft: 10, marginTop: 2},
                      ]}>
                      {fourthButtonSmallText}
                      {'\n'}
                      {fourthButtonSmall1Text}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.listViewButton}
                disabled={true}
                onPress={() => {
                  onFourthButtonClicked(!isChecked4);
                  global.pdfdata.nodrugCycle = !isChecked4;
                  global.pdfdata.nodrugCycle_time = new Date();
                }}>
                <Image
                  source={
                    isChecked4
                      ? require('../../images/checkboxChecked.png')
                      : require('../../images/checkboxUnchecked.png')
                  }
                  style={[
                    styles.checkedUnchecked,
                    {tintColor: COLORS.TextLightGrayColor},
                  ]}
                />
                <Text
                  style={[
                    styles.listViewText,
                    {fontSize: 16, color: COLORS.TextLightestGrayColor},
                  ]}>
                  No Drug This Cycle
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* List 5 */}
          <View style={[styles.listViewContainer, {marginTop: 20}]}>
            <TouchableOpacity
              style={styles.listViewButton}
              onPress={() => {
                onFifthButtonClicked(!isChecked5);
                global.pdfdata.givelipidemusion = !isChecked5;
                global.pdfdata.givelipidemusion_time = new Date();
              }}>
              <Image
                source={
                  isChecked5
                    ? require('../../images/checkboxChecked.png')
                    : require('../../images/checkboxUnchecked.png')
                }
                style={styles.checkedUnchecked}
              />
              <Text style={[styles.listViewText, {fontSize: 16}]}>
                Give Lipid Emulsion
              </Text>
            </TouchableOpacity>
          </View>

          {/* List 6 */}
          <View style={[styles.listViewContainer, {marginTop: 20}]}>
            <TouchableOpacity
              style={styles.listViewButton}
              onPress={() => {
                onSixthButtonClicked(!isChecked6);
                global.pdfdata.considerreversiblecauses = !isChecked6;
                global.pdfdata.considerreversiblecauses_time = new Date();
              }}>
              <Image
                source={
                  isChecked6
                    ? require('../../images/checkboxChecked.png')
                    : require('../../images/checkboxUnchecked.png')
                }
                style={styles.checkedUnchecked}
              />
              <Text style={[styles.listViewText, {fontSize: 16}]}>
                Consider Reversible Causes
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              marginLeft: 20,
              alignSelf: 'flex-start',
            }}>
            <Text
              style={[
                styles.listViewText,
                {
                  fontSize: 15,
                  marginTop: 2,
                },
              ]}>
              CPR Remaining:
            </Text>

            {/* <Text
              style={[
                styles.listViewText,
                {fontSize: 10, marginTop: 3, marginLeft: 5, fontWeight: 'bold'},
              ]}>
              2:00
            </Text> */}

            <Text
              style={[
                styles.listViewText,
                {
                  fontSize: 15,
                  marginTop: 3,
                  marginLeft: 5,
                  fontWeight: 'bold',
                },
              ]}>
              {`${String(Math.floor(remainingTime / 60)).padStart(
                2,
                '0',
              )}:${String(remainingTime % 60).padStart(2, '0')}`}
            </Text>
          </View>

          {/* Bottom Button */}
          <View
            style={[
              styles.bottomContainer,
              {
                bottom: 0,
                height:  Platform.OS === 'ios' ? 50 : 45,
                backgroundColor: COLORS.BackgroundYellowColor,
              },
            ]}>
            <TouchableOpacity
              style={[styles.bottomButton, {marginLeft: 15}]}
              onPress={() => onBackClicked()}>
              <Image
                source={require('../../images/reassess.png')}
                style={{height: 20, width: 20}}
                resizeMode="contain"
              />
              <Text
                style={[styles.listViewText, {fontSize: 16, color: 'black'}]}>
                Reassess
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.bottomButton, {marginRight: 30}]}
              onPress={() => onEndEventButtonClicked()}>
              <Text
                style={[
                  styles.listViewText,
                  {fontSize: 16, color: COLORS.TextRedColor},
                ]}>
                End Event
              </Text>
              <Image
                source={require('../../images/endEvent.png')}
                style={{height: 15, width: 15, marginLeft: 10}}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>
        {/* Seizure Alert */}
        {isSeizureAlert ? (
          <View position="absolute" style={styles.popUpBgView}>
            <View
              style={[
                styles.popUpSmallBg,
                {height: Platform.OS === 'ios' ? 435 : 460},
              ]}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => onCloseSeizureButtonClicked()}>
                <Image
                  source={require('../../images/cancel.png')}
                  style={styles.popUpClose}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <Text
                style={[
                  styles.popUpMainHeader,
                  {textAlign: 'left', marginTop: 10},
                ]}>
                AVOID PROPOFOL!
              </Text>

              <Text
                style={[
                  styles.popUpTitle,
                  {
                    fontWeight: 'bold',
                    fontSize: 18,
                    marginTop: 35,
                    color: COLORS.BackgroundColorPink,
                  },
                ]}>
                Consider Medication For Seizure Suppression
              </Text>

              <View>
                <TouchableOpacity
                  style={[styles.radioContainer, {marginTop: 30}]}
                  onPress={() => onBenzodiazepineButtonClicked()}>
                  <Image
                    source={isBenzodiazepine}
                    style={styles.radioActiveInActive}
                  />
                  <Text
                    style={{
                      marginLeft: 10,
                      fontSize: 15,
                      color: COLORS.BackgroundColorPink,
                    }}>
                    Benzodiazepine Preferred
                  </Text>
                </TouchableOpacity>
              </View>

              <View>
                <TouchableOpacity
                  style={[styles.radioContainer, {marginTop: 5}]}
                  onPress={() => onPropofolButtonClicked()}>
                  <Image
                    source={isPropofol}
                    style={styles.radioActiveInActive}
                  />

                  <View
                    style={{
                      flexDirection: 'column',
                      marginLeft: 10,
                      color: COLORS.BackgroundColorPink,
                    }}>
                    <Text
                      style={{fontSize: 15, color: COLORS.BackgroundColorPink}}>
                      If Only Propofol Available
                    </Text>
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: 'bold',
                        marginTop: 4,
                        color: COLORS.BackgroundColorPink,
                      }}>
                      use low dose, e.g., 20 mg increments
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View>
                <TouchableOpacity
                  style={[styles.radioContainer, {marginTop: 5}]}
                  onPress={() => onNoDrugButtonClicked()}>
                  <Image source={isNoDrug} style={styles.radioActiveInActive} />
                  <Text
                    style={{
                      marginLeft: 10,
                      fontSize: 15,
                      color: COLORS.BackgroundColorPink,
                    }}>
                    No Drug Needed
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                activeOpacity={0.5}
                style={[styles.popUpPinkButton, {marginTop: 20}]}
                onPress={() => onCloseSeizureButtonClicked()}>
                <Text style={[styles.popUpButtonText, {color: 'white'}]}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}

        {/* End Event Alert */}
        {isEndEventAlert ? (
          <View position="absolute" style={styles.popUpBgView}>
            <View
              style={[
                styles.popUpSmallBg,
                {height: Platform.OS === 'ios' ? 510 : 505},
              ]}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => onCloseEndEventButtonClicked()}>
                <Image
                  source={require('../../images/cancel.png')}
                  style={styles.popUpClose}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <Text
                style={[
                  styles.popUpMainHeader,
                  {textAlign: 'left', marginTop: 10},
                ]}>
                End LAST Event?
              </Text>

              <Text
                style={[
                  styles.popUpTitle,
                  {marginTop: 35, color: COLORS.BackgroundColorPink},
                ]}>
                Continue monitoring 4-6 hrs after a{'\n'}CV event.
              </Text>

              <Text
                style={[
                  styles.popUpTitle,
                  {marginTop: 20, color: COLORS.BackgroundColorPink},
                ]}>
                Continue monitoring 2 hrs after a{'\n'}limited CNS event.
              </Text>

              <Text
                style={[
                  styles.popUpTitle,
                  {
                    fontWeight: 'bold',
                    fontSize: 16,
                    marginTop: 35,
                    color: COLORS.BackgroundColorPink,
                  },
                ]}>
                Please select the correct option:
              </Text>

              <View>
                <TouchableOpacity
                  style={[styles.radioContainer, {marginTop: 10}]}
                  onPress={() => {
                    onPatientLabileClicked();
                    global.pdfdata.correctpatientLabile = true;
                    global.pdfdata.correctpatientLabile_time = new Date();
                  }}>
                  <Image
                    source={isPatientLabile}
                    style={styles.radioActiveInActive}
                  />

                  <View style={{flexDirection: 'column', marginLeft: 10}}>
                    <Text
                      style={{fontSize: 15, color: COLORS.BackgroundColorPink}}>
                      Patient Labile
                    </Text>
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: 'bold',
                        marginTop: 4,
                        color: COLORS.BackgroundColorPink,
                      }}>
                      (Transfer to ICU)
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View>
                <TouchableOpacity
                  style={[styles.radioContainer, {marginTop: 10}]}
                  onPress={() => {
                    onResuscitationClicked();
                    global.pdfdata.resuscitationunsuccessful = true;
                    global.pdfdata.resuscitationunsuccessful_time = new Date();
                  }}>
                  <Image
                    source={isResuscitation}
                    style={styles.radioActiveInActive}
                  />

                  <View style={{flexDirection: 'column', marginLeft: 10}}>
                    <Text
                      style={{fontSize: 15, color: COLORS.BackgroundColorPink}}>
                      Resuscitation Unsuccessful.
                    </Text>
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: 'bold',
                        marginTop: 4,
                        color: COLORS.BackgroundColorPink,
                      }}>
                      (Code was called)
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View>
                <TouchableOpacity
                  style={[styles.radioContainer, {marginTop: 10}]}
                  onPress={() => {
                    onPatientUnstableClicked();
                    global.pdfdata.patientunstable = true;
                    global.pdfdata.patientunstable_time = new Date();
                  }}>
                  <Image
                    source={isPatientUnstable}
                    style={styles.radioActiveInActive}
                  />

                  <View style={{flexDirection: 'row', marginLeft: 10}}>
                    <Text
                      style={{fontSize: 15, color: COLORS.BackgroundColorPink}}>
                      Patient Unstable
                    </Text>
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: 'bold',
                        marginTop: 4,
                        marginLeft: 2,
                        color: COLORS.BackgroundColorPink,
                      }}>
                      (CP Bypass Initiated)
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                activeOpacity={0.5}
                style={[styles.popUpPinkButton, {marginTop: 20}]}
                onPress={() => onCloseEndEventButtonClicked()}>
                <Text style={[styles.popUpButtonText, {color: 'white'}]}>
                  Continue Event
                </Text>
              </TouchableOpacity>
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
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },

  mainContainer: {
    height: Platform.OS === 'ios' ? deviceHeight - 145 : deviceHeight - 132,
    flexDirection: 'column',
    backgroundColor: 'white',
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    alignItems: 'center',

  },

  listViewContainer: {
    height: Platform.OS === 'ios' ? 75 : 65,
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
    height: Platform.OS === 'ios' ? 75 : 65,
    alignItems: 'center',
  },

  listViewText: {
    fontWeight: '500',
    marginLeft: 10,
    color: COLORS.PopUpTextBlueColor,
  },

  checkedUnchecked: {height: 20, width: 20, marginLeft: 20, marginRight: 10},

  pinkButtonBGStyle: {
    width: 55,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
    alignSelf: 'flex-start',
  },

  popUpBullet: {
    fontSize: 9,
    fontWeight: '400',
    alignSelf: 'center',
    color: COLORS.PopUpTextBlueColor,
    marginLeft: 15,
    marginTop: 5,
  },

  popUpBgView: {
    backgroundColor: COLORS.BlackHalfAlpha,
    width: deviceWidth,
    height: deviceHeight,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  popUpSmallBg: {
    backgroundColor: COLORS.BackgroundColor,
    width: deviceWidth - 60,
    borderRadius: 10,
  },

  popUpMainHeader: {
    fontSize: 25,
    fontWeight: 'bold',
    marginHorizontal: 30,
    color: COLORS.BackgroundColorPink,
  },

  popUpTitle: {
    fontSize: 15,
    textAlign: 'left',
    marginHorizontal: 30,
  },

  popUpButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 15,
  },

  popUpClose: {
    width: 20,
    height: 20,
    marginTop: 20,
    marginRight: 20,
    alignSelf: 'flex-end',
  },

  bottomContainer: {
    width: deviceWidth,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  bottomButton: {
    flexDirection: 'row',
    height: 50,
    width: 100,
    alignItems: 'center',
  },

  radioContainer: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    marginHorizontal: 10,
  },

  radioActiveInActive: {
    height: 25,
    width: 25,
    marginLeft: 20,
  },

  popUpPinkButton: {
    height: 55,
    marginHorizontal: 50,
    borderRadius: 30,
    backgroundColor: COLORS.BackgroundColorPink,
  },
  container1: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4b0082',
  },
});
export default AsystoleManagementScreen;
