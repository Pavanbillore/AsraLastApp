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

const PulsatileScreen = ({navigation, route}) => {
  const [isChecked1, setChecked1] = useState(false);
  const [isChecked2, setChecked2] = useState(false);
  const [isChecked3, setChecked3] = useState(false);
  const [isChecked4, setChecked4] = useState(false);
  const [isChecked5, setChecked5] = useState(false);
  const [value, setValue] = useState(0);

  const [isPatientStable, setPatientStable] = useState(
    require('../../images/radioInactive.png'),
  );
  const [isPatientLabile, setPatientLabile] = useState(
    require('../../images/radioInactive.png'),
  );
  const [isEndEventAlert, setEndEventAlert] = useState(false);

  const [isSeizureAlert, setSeizureAlert] = useState(false);
  const [isBenzodiazepine, setBenzodiazepine] = useState(
    require('../../images/radioInactive.png'),
  );
  const [isPropofol, setPropofol] = useState(
    require('../../images/radioInactive.png'),
  );
  const [isNoDrug, setNoDrug] = useState(
    require('../../images/radioInactive.png'),
  );

  const [isAtropine, setAtropine] = useState(
    require('../../images/radioInactive.png'),
  );
  const [isTranscutanous, setTranscutanous] = useState(
    require('../../images/radioInactive.png'),
  );
  const [isHypotension, setHypotension] = useState(
    require('../../images/radioInactive.png'),
  );

  const [isChecked6, setChecked6] = useState(false);
  const [isChecked7, setChecked7] = useState(false);
  const [isChecked8, setChecked8] = useState(false);

  const [isLipidAlert, setLipidAlert] = useState(false);
  const [isBradycardia2Alert, setBradycardia2Alert] = useState(false);
  const [isBradycardia, setBradycardia] = useState(false);
  const [weight, setWeight] = useState('');
  const [isDeffered, setDeffered] = useState(false);
  const [isInitial, setInitial] = useState('0');

  // var time = -16200;
  // var intitialDuration = moment.duration(time, 'seconds');
  // var interval = 1000;
  // const [duration, setDuration] = useState(
  //   moment(intitialDuration.asMilliseconds()).format('mm:ss'),
  // );

  useEffect(() => {
    console.log('route.params.weight in pulsatile:::' + route.params.weight);
    setLoadData(
      route.params.weight,
      route.params.isDeffered,
      route.params.isInitial,
    );
  });

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

  function setLoadData(weight, isDeffered, isInitial) {
    setWeight(weight);
    setDeffered(isDeffered);
    setInitial(isInitial);
  }

  // setInterval(function () {
  //   intitialDuration.add(interval, 'milliseconds'); //using momentjs substract function
  //   var timer = moment(intitialDuration.asMilliseconds()).format('mm:ss');
  //   console.log(timer);

  //   return (
  //     <Text
  //       style={{
  //         marginTop: 5,
  //         marginRight: 5,
  //         justifyContent: 'flex-end',
  //         backgroundColor: 'red',
  //       }}>
  //       {timer}
  //     </Text>
  //   );
  // }, interval);

  {
    /* Button Method */
  }
  const onBackClicked = () => {
    navigation.goBack();
  };

  const onFirstButtonClicked = isChecked => {
    setChecked1(isChecked);
    global.pdfdata.airwaymanagement = isChecked;
    global.pdfdata.airwaymanagement_time = new Date();
  };

  const onSecondButtonClicked = isChecked => {
    if (isChecked2 == true) {
      setSeizureAlert(false);
      global.pdfdata.seizuresuppression = isChecked2;
      global.pdfdata.seizuresuppression_time = new Date();
      setChecked2(false);
    } else {
      setSeizureAlert(true);
    }
  };

  const onThirdButtonClicked = isChecked => {
    if (isChecked) {
      setChecked3(isChecked);
      global.pdfdata.considerlipidtheory = isChecked;
      global.pdfdata.considerlipidtheory_time = new Date();
      setLipidAlert(true);
    } else {
      setChecked3(false);
    }
  };

  const onFourthButtonClicked = isChecked => {
    if (isChecked) {
      setChecked4(isChecked);
      global.pdfdata.considerbradycardiatreatment = isChecked;
      global.pdfdata.considerbradycardiatreatment_time = new Date();
      setBradycardia(true);
    } else {
      setChecked4(false);
    }
  };

  const onFifthButtonClicked = isChecked => {
    setChecked5(isChecked);
    global.pdfdata.considerhypotensiontreatment = isChecked;
    global.pdfdata.considerhypotensiontreatment_time = new Date();
  };

  const onEndEventButtonClicked = () => {
    global.pdfdata.eventend_time = new Date();
    setEndEventAlert(true);
  };

  const onCloseEndEventButtonClicked = () => {
    setEndEventAlert(false);
    setPatientStable(require('../../images/radioInactive.png'));
    setPatientLabile(require('../../images/radioInactive.png'));
  };

  const onPatientStableClicked = () => {
    setPatientStable(require('../../images/radioActive.png'));
    setPatientLabile(require('../../images/radioInactive.png'));
    global.pdfdata.lasteventstable = 'Patient stable';
    global.pdfdata.lasteventstable_time = new Date();
    console.log(global.pdfdata.lasteventstable);
    const timeout = setTimeout(() => {
      navigation.navigate('GenerateReportScreen');
      setSeizureAlert(false);
      setEndEventAlert(false);
      setPatientStable(require('../../images/radioInactive.png'));
      setPatientLabile(require('../../images/radioInactive.png'));
    }, 500);
  };

  const onPatientLabileClicked = () => {
    setPatientLabile(require('../../images/radioActive.png'));
    setPatientStable(require('../../images/radioInactive.png'));
    global.pdfdata.lasteventstable = 'Patient labile';
    global.pdfdata.lasteventstable_time = new Date();
    console.log(global.pdfdata.lasteventlabile);
    const timeout = setTimeout(() => {
      navigation.navigate('GenerateReportScreen');
      setSeizureAlert(false);
      setEndEventAlert(false);
      setPatientStable(require('../../images/radioInactive.png'));
      setPatientLabile(require('../../images/radioInactive.png'));
    }, 500);
  };

  const onCloseSeizureButtonClicked = () => {
    setSeizureAlert(false);
  };

  const onBenzodiazepineButtonClicked = () => {
    setChecked2(true);
    global.pdfdata.benzodiazepinepreferred = true;
    global.pdfdata.benzodiazepinepreferred_time = new Date();
    setBenzodiazepine(require('../../images/radioActive.png'));
    setPropofol(require('../../images/radioInactive.png'));
    setNoDrug(require('../../images/radioInactive.png'));
    setSeizureAlert(false);
  };

  const onPropofolButtonClicked = () => {
    setChecked2(true);
    global.pdfdata.onlypropofolavailable = true;
    global.pdfdata.onlypropofolavailable_time = new Date();
    setPropofol(require('../../images/radioActive.png'));
    setBenzodiazepine(require('../../images/radioInactive.png'));
    setNoDrug(require('../../images/radioInactive.png'));
    setSeizureAlert(false);
  };

  const onNoDrugButtonClicked = () => {
    setChecked2(true);
    global.pdfdata.nodrugneeded = true;
    global.pdfdata.nodrugneeded_time = new Date();
    setNoDrug(require('../../images/radioActive.png'));
    setBenzodiazepine(require('../../images/radioInactive.png'));
    setPropofol(require('../../images/radioInactive.png'));
    setSeizureAlert(false);
  };

  const onCloseLipidButtonClicked = () => {
    setLipidAlert(false);
    setChecked3(false);
  };

  const onNoLipidButtonClicked = () => {
    setLipidAlert(false);
  };

  const onYesLipidButtonClicked = () => {
    setLipidAlert(false);
    console.log('weight:::' + weight);
    console.log('isDeffered Pulsatile:::' + isDeffered);
    console.log('isInitial:::' + isInitial);

    if (weight == '') {
      navigation.navigate('LipidEmulsionYesScreen', {
        weight: weight,
        isInitial: isInitial,
        isRemainingTime: value,
      });
    } else {
      if (isDeffered == true) {
        let intWeight = parseInt(weight);
        let intInitial = parseInt(isInitial);
        let visitNo = intInitial + 1;
        console.log('visitNo::' + visitNo);
        let strVisitNo = visitNo.toString();
        if (intWeight > 69) {
          navigation.navigate('WeightGreaterScreen', {
            weight: intWeight,
            isFromNo: false,
            isInitial: strVisitNo,
            fromWhichScreen: 'Pulsatile',
            isRemainingTime: value,
          });
        } else {
          navigation.navigate('WeightLessScreen', {
            weight: intWeight,
            isFromNo: false,
            isInitial: strVisitNo,
            fromWhichScreen: 'Pulsatile',
            isRemainingTime: value,
          });
        }
      } else {
        let intWeight = parseInt(weight);
        let intInitial = parseInt(isInitial);
        let visitNo = intInitial + 1;
        console.log('visitNo::' + visitNo);
        let strVisitNo = visitNo.toString();
        if (intWeight > 69) {
          navigation.navigate('LipidEmulsionStartedGreater', {
            weight: intWeight,
            isFromNo: false,
            isInitial: strVisitNo,
            fromWhichScreen: 'Pulsatile',
            isRemainingTime: value,
          });
        } else {
          navigation.navigate('LipidEmulsionStartedLess', {
            weight: intWeight,
            isFromNo: false,
            isInitial: strVisitNo,
            fromWhichScreen: 'Pulsatile',
            isRemainingTime: value,
          });
        }
      }
    }
  };

  const onCloseBradycardiaButtonClicked = () => {
    setBradycardia(false);
    setChecked4(false);
  };

  const onNoBradycardiaButtonClicked = () => {
    setBradycardia(false);
    global.pdfdata.bradycardiano = false;
    global.pdfdata.bradycardiano_time = new Date();
  };

  const onYesBradycardiaButtonClicked = () => {
    setBradycardia(false);
    global.pdfdata.bradycardiayes = false;
    global.pdfdata.bradycardiayes_time = new Date();
    setBradycardia2Alert(true);
    //navigation.navigate('BradycardiaPresentScreen');
  };

  const onCloseBradycardia2ButtonClicked = () => {
    setBradycardia2Alert(false);
  };

  const onSixthButtonClicked = isChecked => {
    setChecked6(isChecked);
    if (isChecked == true) {
      if (isChecked7 == true && isChecked8 == true) {
        setBradycardia2Alert(false);
        setChecked5(true);
      }
    }
  };

  const onSeventhButtonClicked = isChecked => {
    setChecked7(isChecked);
    if (isChecked == true) {
      if (isChecked6 == true && isChecked8 == true) {
        setBradycardia2Alert(false);
        setChecked5(true);
      }
    }
  };

  const onEightButtonClicked = isChecked => {
    setChecked8(isChecked);
    if (isChecked == true) {
      if (isChecked6 == true && isChecked7 == true) {
        setBradycardia2Alert(false);
        setChecked5(true);
      }
    }
  };

  // const onAtropineButtonClicked = () => {
  //   setBradycardia2Alert(false);
  // };

  // const onTranscutanousButtonClicked = () => {
  //   setBradycardia2Alert(false);
  // };

  // const onHypotensionButtonClicked = () => {
  //   setBradycardia2Alert(false);
  // };

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
              <Text style={styles.leftTopTitle}>Pulse</Text>
            </TouchableOpacity>
          </View>

          <Text style={{fontSize: 15, marginRight: 10, color: 'white'}}>
            {formattedValue}
          </Text>
        </View>

        <Text style={styles.mainText}>Pulsatile Management</Text>

        {/* Main Container*/}
        <View style={styles.mainContainer}>
          {/* List Container*/}

          {/* List 1 */}
          <View style={[styles.listViewContainer, {marginTop: 50}]}>
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
              <View style={{flexDirection: 'column'}}>
                <Text style={[styles.listViewText, {fontSize: 16}]}>
                  Airway Management
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.popUpBullet}>{`\u25cf `}</Text>
                  <Text
                    style={[
                      styles.listViewText,
                      {
                        fontSize: Platform.OS === 'ios' ? 10 : 11,
                        marginLeft: 0,
                        marginTop: 5,
                      },
                    ]}>
                    Ventilate with 100% Oxygen
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.popUpBullet}>{`\u25cf `}</Text>
                  <Text
                    style={[
                      styles.listViewText,
                      {
                        fontSize: Platform.OS === 'ios' ? 10 : 11,
                        marginLeft: 0,
                        marginTop: 5,
                      },
                    ]}>
                    Consider Intubation
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          {/* List 2*/}
          <View style={[styles.listViewContainer, {marginTop: 20}]}>
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
              <View style={{flexDirection: 'column'}}>
                <Text style={[styles.listViewText, {fontSize: 16}]}>
                  Seizure Suppression
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.popUpBullet}>{`\u25cf `}</Text>
                  <Text
                    style={[
                      styles.listViewText,
                      {
                        fontSize: Platform.OS === 'ios' ? 10 : 11,
                        marginLeft: 0,
                        marginTop: 5,
                      },
                    ]}>
                    Benzodiazopines preferred
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.popUpBullet}>{`\u25cf `}</Text>
                  <Text
                    style={[
                      styles.listViewText,
                      {
                        fontSize: Platform.OS === 'ios' ? 10 : 11,
                        marginLeft: 0,
                        marginTop: 5,
                      },
                    ]}>
                    Avoid PROPOFOL if CV instability present
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          {/* List 3 */}
          <View style={[styles.listViewContainer, {marginTop: 20}]}>
            <TouchableOpacity
              style={styles.listViewButton}
              onPress={() => onThirdButtonClicked(!isChecked3)}>
              <Image
                source={
                  isChecked3
                    ? require('../../images/checkboxChecked.png')
                    : require('../../images/checkboxUnchecked.png')
                }
                style={styles.checkedUnchecked}
              />
              <Text
                style={[
                  styles.listViewText,
                  {fontSize: 16, color: COLORS.PopUpTextBlueColor},
                ]}>
                Consider Lipid{'\n'}Emulsion Therapy
              </Text>
            </TouchableOpacity>
          </View>

          {/* List 4 */}
          <View style={[styles.listViewContainer, {marginTop: 20}]}>
            <TouchableOpacity
              style={styles.listViewButton}
              onPress={() => onFourthButtonClicked(!isChecked4)}>
              <Image
                source={
                  isChecked4
                    ? require('../../images/checkboxChecked.png')
                    : require('../../images/checkboxUnchecked.png')
                }
                style={styles.checkedUnchecked}
              />
              <Text style={[styles.listViewText, {fontSize: 16}]}>
                Consider Bradycardia{'\n'}Treatment
              </Text>
            </TouchableOpacity>
          </View>

          {/* List 5 */}
          <View style={[styles.listViewContainer, {marginTop: 20}]}>
            <TouchableOpacity
              style={styles.listViewButton}
              onPress={() => onFifthButtonClicked(!isChecked5)}>
              <Image
                source={
                  isChecked5
                    ? require('../../images/checkboxChecked.png')
                    : require('../../images/checkboxUnchecked.png')
                }
                style={styles.checkedUnchecked}
              />
              <Text style={[styles.listViewText, {fontSize: 16}]}>
                Consider Hypotension{'\n'}Treatment
              </Text>
            </TouchableOpacity>
          </View>

          {/* Bottom Button */}
          <View style={styles.bottomContainer}>
            <TouchableOpacity
              style={[styles.bottomButton, {marginLeft: 20}]}
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
            <View style={[styles.popUpSmallBg, {height: 435}]}>
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
                  {fontWeight: 'bold', fontSize: 18, marginTop: 35},
                ]}>
                Consider Medication For Seizure Suppression
              </Text>

              <View>
                <TouchableOpacity
                  style={[styles.radioContainer, {marginTop: 30}]}
                  onPress={() => {
                    onBenzodiazepineButtonClicked();
                  }}>
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
                  onPress={() => {
                    onPropofolButtonClicked();
                  }}>
                  <Image
                    source={isPropofol}
                    style={styles.radioActiveInActive}
                  />

                  <View style={{flexDirection: 'column', marginLeft: 10}}>
                    <Text
                      style={{fontSize: 15, color: COLORS.BackgroundColorPink}}>
                      If Only Propofol Available
                    </Text>
                    <Text
                      style={{
                        fontSize: Platform.OS === 'ios' ? 10 : 11,
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
                  onPress={() => {
                    onNoDrugButtonClicked();
                  }}>
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

        {/* Lipid Alert */}
        {isLipidAlert ? (
          <View position="absolute" style={styles.popUpBgView}>
            <View style={[styles.popUpSmallBg, {height: 355}]}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => onCloseLipidButtonClicked()}>
                <Image
                  source={require('../../images/cancel.png')}
                  style={styles.popUpClose}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <Text
                style={[
                  styles.popUpMainHeader,
                  {textAlign: 'center', marginTop: 10},
                ]}>
                Lipid Emulsion?
              </Text>

              <Text
                style={[
                  styles.popUpTitle,
                  {
                    fontWeight: 'bold',
                    fontSize: 18,
                    marginTop: 20,
                    textAlign: 'center',
                  },
                ]}>
                Should this patient lipid Emulsion therapy?
              </Text>

              <TouchableOpacity
                activeOpacity={0.5}
                style={[styles.popUpPinkButton, {marginTop: 25}]}
                onPress={() => onYesLipidButtonClicked()}>
                <Text style={[styles.popUpButtonText, {color: 'white'}]}>
                  YES
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.5}
                style={[
                  styles.popUpPinkButton,
                  {backgroundColor: COLORS.PopUpTextBlueColor, marginTop: 15},
                ]}
                onPress={() => onNoLipidButtonClicked()}>
                <Text style={[styles.popUpButtonText, {color: 'white'}]}>
                  NO
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}

        {/* Bradycardia Alert */}
        {isBradycardia ? (
          <View position="absolute" style={styles.popUpBgView}>
            <View style={[styles.popUpSmallBg, {height: 355}]}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => onCloseBradycardiaButtonClicked()}>
                <Image
                  source={require('../../images/cancel.png')}
                  style={styles.popUpClose}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <Text
                style={[
                  styles.popUpMainHeader,
                  {textAlign: 'center', marginTop: 10},
                ]}>
                Bradycardia Present?
              </Text>

              <Text
                style={[
                  styles.popUpTitle,
                  {
                    fontWeight: 'bold',
                    fontSize: 18,
                    marginTop: 35,
                    textAlign: 'center',
                  },
                ]}>
                Does this patient have Bradycardia?
              </Text>

              <TouchableOpacity
                activeOpacity={0.5}
                style={[styles.popUpPinkButton, {marginTop: 25}]}
                onPress={() => {
                  onYesBradycardiaButtonClicked();
                }}>
                <Text style={[styles.popUpButtonText, {color: 'white'}]}>
                  YES
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.5}
                style={[
                  styles.popUpPinkButton,
                  {backgroundColor: COLORS.PopUpTextBlueColor, marginTop: 15},
                ]}
                onPress={() => {
                  onNoBradycardiaButtonClicked();
                }}>
                <Text style={[styles.popUpButtonText, {color: 'white'}]}>
                  NO
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}

        {/* Bradycardia 2 Alert */}
        {isBradycardia2Alert ? (
          <View position="absolute" style={styles.popUpBgView}>
            <View style={[styles.popUpSmallBg, {height: 400}]}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => onCloseBradycardia2ButtonClicked()}>
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
                Bradycardia Management
              </Text>

              <View>
                <TouchableOpacity
                  style={[styles.radioContainer, {marginTop: 30}]}
                  onPress={() => {
                    onSixthButtonClicked(!isChecked6);
                    global.pdfdata.atropine = !isChecked6;
                    global.pdfdata.atropine_time = new Date();
                  }}>
                  <Image
                    source={
                      isChecked6
                        ? require('../../images/checkboxChecked.png')
                        : require('../../images/checkboxUnchecked.png')
                    }
                    style={styles.checkedUncheckedAlert}
                  />
                  <Text
                    style={{
                      marginLeft: 10,
                      fontSize: 15,
                      color: COLORS.BackgroundBlueColor,
                      fontWeight: '500',
                    }}>
                    Consider atropine 0.5 to 1.0 mg
                  </Text>
                </TouchableOpacity>
              </View>

              <View>
                <TouchableOpacity
                  style={[styles.radioContainer, {marginTop: 5}]}
                  onPress={() => {
                    onSeventhButtonClicked(!isChecked7);
                    global.pdfdata.transcutanouspacing = !isChecked7;
                    global.pdfdata.transcutanouspacing_time = new Date();
                  }}>
                  <Image
                    source={
                      isChecked7
                        ? require('../../images/checkboxChecked.png')
                        : require('../../images/checkboxUnchecked.png')
                    }
                    style={styles.checkedUncheckedAlert}
                  />

                  <Text
                    style={{
                      marginLeft: 10,
                      fontSize: 15,
                      color: COLORS.BackgroundBlueColor,
                      fontWeight: '500',
                    }}>
                    Consider Transcutanous Pacing
                  </Text>
                </TouchableOpacity>
              </View>

              <View>
                <TouchableOpacity
                  style={[styles.radioContainer, {marginTop: 5}]}
                  onPress={() => {
                    onEightButtonClicked(!isChecked8);
                    global.pdfdata.treathypotension = !isChecked8;
                    global.pdfdata.treathypotension_time = new Date();
                  }}>
                  <Image
                    source={
                      isChecked8
                        ? require('../../images/checkboxChecked.png')
                        : require('../../images/checkboxUnchecked.png')
                    }
                    style={styles.checkedUncheckedAlert}
                  />
                  <Text
                    style={{
                      marginLeft: 10,
                      fontSize: 15,
                      color: COLORS.BackgroundBlueColor,
                      fontWeight: '500',
                    }}>
                    Treat Hypotension
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                activeOpacity={0.5}
                style={[styles.popUpPinkButton, {marginTop: 30}]}
                onPress={() => onCloseBradycardia2ButtonClicked()}>
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
            <View style={[styles.popUpSmallBg, {height: 480}]}>
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
                style={[styles.popUpTitle, {marginTop: 35, color: 'black'}]}>
                Continue monitoring 4-6 hrs after a{'\n'}CV event.
              </Text>

              <Text
                style={[styles.popUpTitle, {marginTop: 20, color: 'black'}]}>
                Continue monitoring 2 hrs after a{'\n'}limited CNS event.
              </Text>

              <Text
                style={[
                  styles.popUpTitle,
                  {
                    fontWeight: 'bold',
                    fontSize: 16,
                    marginTop: 35,
                    color: 'black',
                  },
                ]}>
                Please select the correct option:
              </Text>

              <View>
                <TouchableOpacity
                  style={[styles.radioContainer, {marginTop: 20}]}
                  onPress={() => onPatientStableClicked()}>
                  <Image
                    source={isPatientStable}
                    style={styles.radioActiveInActive}
                  />
                  <Text
                    style={{
                      marginLeft: 10,
                      fontSize: 15,
                      color: COLORS.BackgroundColorPink,
                    }}>
                    Patient stable.
                  </Text>
                </TouchableOpacity>
              </View>

              <View>
                <TouchableOpacity
                  style={[styles.radioContainer, {marginTop: 5}]}
                  onPress={() => onPatientLabileClicked()}>
                  <Image
                    source={isPatientLabile}
                    style={styles.radioActiveInActive}
                  />

                  <View style={{flexDirection: 'row', marginLeft: 10}}>
                    <Text
                      style={{fontSize: 15, color: COLORS.BackgroundColorPink}}>
                      Patient labile.{' '}
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
    fontSize: Platform.OS === 'ios' ? 28 : 25,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },

  mainContainer: {
    height: Platform.OS === 'ios' ? deviceHeight - 140 : deviceHeight - 80,
    flexDirection: 'column',
    backgroundColor: 'white',
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    alignItems: 'center',
  },

  listViewContainer: {
    height: 80,
    width: listWidth,
    backgroundColor: 'white',
    // marginHorizontal: 20,
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
    height: 80,
    alignItems: 'center',
  },

  listViewText: {
    fontWeight: '500',
    marginLeft: 10,
    color: COLORS.PopUpTextBlueColor,
  },

  checkedUnchecked: {height: 20, width: 20, marginLeft: 20, marginRight: 10},

  checkedUncheckedAlert: {
    height: 20,
    width: 20,
    marginLeft: 20,
  },

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
    marginLeft: 10,
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
    color: COLORS.PopUpTextBlueColor,
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
    height: 65,
    backgroundColor: COLORS.BackgroundYellowColor,
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 0 : 45,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  bottomButton: {
    flexDirection: 'row',
    height: 65,
    width: 100,
    alignItems: 'center',
  },

  radioContainer: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    marginHorizontal: 10,
  },

  radioActiveInActive: {height: 25, width: 25, marginLeft: 20},

  popUpPinkButton: {
    height: 55,
    marginHorizontal: 50,
    borderRadius: 30,
    backgroundColor: COLORS.BackgroundColorPink,
  },
});
export default PulsatileScreen;
