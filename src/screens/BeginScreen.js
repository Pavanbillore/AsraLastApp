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
  Share,
} from 'react-native';
import {COLORS} from '../styles/GlobalColor';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const listWidth = deviceWidth - 80;

const BeginScreen = ({navigation, route}) => {
  const [isLastRescueKit, setLastRescueKit] = useState(false);
  const [isPulseAlert, setPulseAlert] = useState(false);

  const [isChecked1, setChecked1] = useState(false);
  const [isChecked2, setChecked2] = useState(false);
  const [isChecked3, setChecked3] = useState(false);
  const [isChecked4, setChecked4] = useState(false);
  const [isChecked5, setChecked5] = useState(false);
  const [isChecked6, setChecked6] = useState(false);
  const [value, setValue] = useState(0);
  /*pdf work */
  const createPDF = async () => {
    let options = {
      html: `<!DOCTYPE html>
<html lang="en">
<head>
    <title>PDF Document</title>
</head>
<body>
    <h4 style="text-align:center">Events, medications, and timing on this report are approximate and are NOT designed to be<br>
the official code record. Please use your local institution's local code record for the official<br>
documentation.</h4>
    <div style="padding:10px;">
        <div style="display:flex;padding:20px; justify-content:space-evenly;">
                <text>Management Start<br>12/01/2023 09:34:10</text>
                <text>Management End<br>12/01/2023 09:34:52</text>
                <text>Management Duration<br>0:42</text>
        </div>
<div>
    <div style="display: flex;justify-content:space-evenly;">
                <text>Patient Weight: 65.0 kg</text>
                <text>Total Epinephrine: 0 mcg</text>
    </div>
        <div style="display: flex; justify-content:space-evenly;">
            <text>Total Amiodarone: 0 mg</text>
            <text>Total Lipid Bolus: 0 mL</text>
         </div>
    </div>
     <div style="justify-content: center;padding: 10px;">
      <table style=" border-collapse: collapse;  font-family: Arial, Helvetica, sans-serif; width: 100%;">
  <tr style="padding: 8px;">
    <th style="
    border: 2px solid #000;
  text-align: center;
  background-color: #657C94;
  color: white;">Event Time</th>
    <th style="padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #657C94;
  border: 2px solid #000;
  color: white;">Event Description</th>
    <th style="padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  border: 2px solid #000;
  background-color: #657C94;
  color: white;">Event Type</th>
  </tr>
  <tr style="padding:8px;">
    <td style="  border: 2px solid #000; padding: 8px;">09:33:52</td>
    <td style="  border: 2px solid #000;padding: 8px;">Event began.</td>
    <td style="  border: 2px solid #000;padding: 8px;">Info</td>
  </tr>
  <tr style="padding: 8px;">
    <td style="  border: 2px solid #000;background-color: #D1D9EC; padding: 8px;">09:34:10</td>
    <td style="  border: 2px solid #000;background-color: #D1D9EC;padding: 8px;">Event began.</td>
    <td style="  border: 2px solid #000;background-color: #D1D9EC;padding: 8px;">Info</td>
  </tr>
  <tr style="padding: 8px;">
    <td style="  border: 2px solid #000;padding: 8px;">09:34:12</td>
    <td style="  border: 2px solid #000;padding: 8px;">Injection was stopped.</td>
    <td style="  border: 2px solid #000;padding: 8px;">Drug</td>
  </tr>
  <tr style="padding: 8px;">
    <td style="background-color: #D1D9EC;padding: 8px;  border: 2px solid #000;">09:34:12</td>
    <td style="background-color: #D1D9EC;padding: 8px;  border: 2px solid #000;">Help was sought.</td>
    <td style="background-color: #D1D9EC;padding: 8px;  border: 2px solid #000;">Info</td>
  </tr>
  <tr style="padding: 8px;">
    <td style="padding: 8px;  border: 2px solid #000;">09:34:13</td>
    <td style="padding: 8px;  border: 2px solid #000;">LAST Rescue Kit requested.</td>
    <td style="padding: 8px;  border: 2px solid #000;">Info</td>
  </tr>
  <tr style="padding: 8px;">
    <td style="background-color: #D1D9EC;padding: 8px;  border: 2px solid #000;">09:34:13</td>
    <td style="background-color: #D1D9EC;padding: 8px;  border: 2px solid #000;">Lipid emulsion considered.</td>
    <td style="background-color: #D1D9EC;padding: 8px;  border: 2px solid #000;">Info</td>
  </tr>
  <tr style="padding: 8px;">
    <td style="padding: 8px;  border: 2px solid #000;">09:34:14</td>
    <td style="padding: 8px;  border: 2px solid #000;">CP Bypass alerted.</td>
    <td style="padding: 8px;  border: 2px solid #000;">Info</td>
  </tr>
  <tr style="padding:8px;">
    <td style="background-color: #D1D9EC;padding: 8px;  border: 2px solid #000;">09:34:15</td>
    <td style="background-color: #D1D9EC;padding: 8px;  border: 2px solid #000;">User acknowledged that LAST resuscitation is different from other ACLS
scenarios.</td>
    <td style="background-color: #D1D9EC;padding: 8px;  border: 2px solid #000;">Info</td>
  </tr>
  <tr style="padding: 8px;">
    <td style="padding: 8px;  border: 2px solid #000;">09:34:18</td>
    <td style="padding: 8px;  border: 2px solid #000;">Pulsatile selected.</td>
    <td style="padding: 8px;  border: 2px solid #000;">Vitals</td>
  </tr>
   <tr style="padding: 8px;">
    <td style="background-color: #D1D9EC;padding: 8px; border: 2px solid #000;">09:34:20</td>
    <td style="background-color: #D1D9EC;padding: 8px;border: 2px solid #000;">Airway management completed.</td>
    <td style="background-color: #D1D9EC;padding: 8px;border: 2px solid #000;">Airway</td>
  </tr>
   <tr style="padding: 8px;">
    <td style="padding: 8px;border: 2px solid #000;">09:34:25</td>
    <td style="padding: 8px;border: 2px solid #000;">Gave propofol for seizure suppression because it was the only option
available.</td>
    <td style="padding: 8px;border: 2px solid #000;">Drug</td>
  </tr>
   <tr style="padding: 8px;">
    <td style="border: 2px solid #000;background-color: #D1D9EC;padding: 8px;">09:34:36</td>
    <td style="border: 2px solid #000;background-color: #D1D9EC;padding: 8px;">Lipid Infusion marked as started.</td>
    <td style="border: 2px solid #000;background-color: #D1D9EC;padding: 8px;">Fluid</td>
  </tr>
   <tr style="padding: 8px;">
    <td style="border: 2px solid #000;padding: 8px;">09:34:41</td>
    <td style="border: 2px solid #000;padding: 8px;">Patient exhibiting Bradycardia.</td>
    <td style="border: 2px solid #000;padding: 8px;">Vitals</td>
  </tr>
    <tr style="padding: 8px;">
    <td style="border: 2px solid #000;background-color: #D1D9EC;padding: 8px;">09:34:43</td>
    <td style="border: 2px solid #000;background-color: #D1D9EC;padding: 8px;">Atropine given.</td>
    <td style="border: 2px solid #000;background-color: #D1D9EC;padding: 8px;">Drug</td>
  </tr>
   <tr style="padding: 8px;">
    <td style="border: 2px solid #000;padding: 8px;">09:34:45</td>
    <td style="border: 2px solid #000;padding: 8px;">Hypotension treatment considered.</td>
    <td style="border: 2px solid #000;padding: 8px;">Info</td>
  </tr>
   <tr style="padding: 8px;">
    <td style="border: 2px solid #000;background-color: #D1D9EC;padding: 8px;">09:34:45</td>
    <td style="border: 2px solid #000;background-color: #D1D9EC;padding: 8px;">Hypotension treated. </td>
    <td style="border: 2px solid #000;background-color: #D1D9EC;padding: 8px;">Info</td>
  </tr>
    <tr style="padding: 8px;">
    <td style="border: 2px solid #000;padding: 8px;">09:34:49</td>
    <td style="border: 2px solid #000;padding: 8px;">End Event pressed. </td>
    <td style="border: 2px solid #000;padding: 8px;">Info</td>
  </tr>
   <tr style="padding: 8px;">
    <td style="border: 2px solid #000;background-color: #D1D9EC;padding: 8px;">09:34:52</td>
    <td style="border: 2px solid #000;background-color: #D1D9EC;padding: 8px;">Patient stable.</td>
    <td style="border: 2px solid #000;background-color: #D1D9EC;padding: 8px;">Info</td>
  </tr>
   
</table>
        </div>
</div>
       
  
</body>
</html>`,
      fileName: 'Health Report',
      directory: 'Documents',
    };

    let file = await RNHTMLtoPDF.convert(options);
    console.log(file.filePath);
    // alert(file.filePath);
  };

  const arrayForPdf = [
    {
      id: '1',
      eventTime: '',
      eventDescription: 'Event began.',
      eventType: 'Info',
    },
  ];
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  {
    /* Button Method */
  }
  const onBackClicked = () => {
    navigation.navigate('HomeScreen', {weight: ''});
  };

  const onFirstButtonClicked = isChecked => {
    setChecked1(isChecked);
    global.pdfdata.stopinjection = isChecked;
    global.pdfdata.stopinjection_time = new Date();
  };

  const onSecondButtonClicked = isChecked => {
    setChecked2(isChecked);
    global.pdfdata.gethelp = isChecked;
    global.pdfdata.gethelp_time = new Date();
  };

  const onThirdButtonClicked = isChecked => {
    setChecked3(isChecked);
    global.pdfdata.lastrescuekit = isChecked;
    global.pdfdata.lastrescuekit_time = new Date();
  };

  const onFourthButtonClicked = isChecked => {
    setChecked4(isChecked);
    global.pdfdata.lipidemusion = isChecked;
    global.pdfdata.lipidemusion_time = new Date();
  };

  const onFifthButtonClicked = isChecked => {
    setChecked5(isChecked);
    global.pdfdata.cpbypassteam = isChecked;
    global.pdfdata.cpbypassteam_time = new Date();
  };

  const onSixthButtonClicked = isChecked => {
    setChecked6(isChecked);
    global.pdfdata.cardiacarrest = isChecked;
    global.pdfdata.cardiacarrest_time = new Date();
  };

  const onOkayButtonClick = () => {
    setLastRescueKit(false);
  };

  const onLastRescueKitClick = () => {
    setLastRescueKit(true);
  };

  const onNextClicked = () => {
    setPulseAlert(true);
  };

  const onCloseButtonClicked = () => {
    setPulseAlert(false);
  };

  const onPulseYesClicked = () => {
    navigation.navigate('PulsatileScreen', {
      weight: '',
      isDeffered: false,
      isInitial: '0',
      isRemainingTime: value,
    });
    setPulseAlert(false);
    setChecked1(false);
    setChecked2(false);
    setChecked3(false);
    setChecked4(false);
    setChecked5(false);
    setChecked6(false);
  };

  const onPulseNoClicked = () => {
    navigation.navigate('InitialPulselessScreen', {
      weight: '',
      isDeffered: false,
      isInitial: '0',
      isRemainingTime: value,
    });
    setPulseAlert(false);
    setChecked1(false);
    setChecked2(false);
    setChecked3(false);
    setChecked4(false);
    setChecked5(false);
    setChecked6(false);
  };

  useEffect(() => {
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
    /* Functions */
  }

  return (
    <SafeAreaProvider style={styles.container} mode="margin">
      <StatusBar barStyle={'dark-content'} />
      <ImageBackground
        style={styles.container}
        source={require('../images/bgImage.png')}>
        {/* Nav Container */}
        <View style={styles.navContainer}>
          <View style={styles.viewLeftTopContainer}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.leftTopButton}
              rippleColor="rgba(0, 0, 0, .32)"
              onPress={() => onBackClicked()}>
              <Image
                source={require('../images/back.png')}
                style={styles.leftTopImage}
              />
              <Text style={styles.leftTopTitle}>Restart</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <Text style={{fontSize: 15, marginRight: 10, color: 'white'}}>
              {formattedValue}
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.mainText}>Complete all 6 Items</Text>

        {/* Main Container*/}
        <View style={styles.mainContainer}>
          {/* List Container*/}

          {/* List 1*/}
          <View
            style={[
              styles.listViewContainer,
              {
                marginTop: Platform.OS === 'ios' ? 50 : 20,
              },
            ]}>
            <TouchableOpacity
              style={styles.listViewButton}
              onPress={() => onFirstButtonClicked(!isChecked1)}>
              <Image
                source={
                  isChecked1
                    ? require('../images/checkboxChecked.png')
                    : require('../images/checkboxUnchecked.png')
                }
                style={styles.checkedUnchecked}
              />
              <Text style={[styles.listViewText, {fontSize: 16}]}>
                Stop Injection
              </Text>
            </TouchableOpacity>
          </View>

          {/* List 2*/}
          <View
            style={[
              styles.listViewContainer,
              {marginTop: Platform.OS === 'ios' ? 20 : 10},
            ]}>
            <TouchableOpacity
              style={styles.listViewButton}
              onPress={() => onSecondButtonClicked(!isChecked2)}>
              <Image
                source={
                  isChecked2
                    ? require('../images/checkboxChecked.png')
                    : require('../images/checkboxUnchecked.png')
                }
                style={styles.checkedUnchecked}
              />
              <View style={{flexDirection: 'column'}}>
                <Text style={[styles.listViewText, {fontSize: 16}]}>
                  Get Help
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.popUpBullet}>{`\u25cf `}</Text>
                  <Text style={[styles.listViewText, {fontSize: 10}]}>
                    Get Code Cart
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          {/* List 3*/}
          <View
            style={[
              styles.listViewContainer,
              {marginTop: Platform.OS === 'ios' ? 20 : 10},
            ]}>
            <TouchableOpacity
              style={styles.listViewButton}
              onPress={() => onThirdButtonClicked(!isChecked3)}>
              <Image
                source={
                  isChecked3
                    ? require('../images/checkboxChecked.png')
                    : require('../images/checkboxUnchecked.png')
                }
                style={styles.checkedUnchecked}
              />
              <View style={{flexDirection: 'column'}}>
                <Text
                  style={[
                    styles.listViewText,
                    {
                      fontSize: 16,
                      width: deviceWidth - 215,
                    },
                  ]}>
                  Call For Last Rescue Kit
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.popUpBullet}>{`\u25cf `}</Text>
                  <Text style={[styles.listViewText, {fontSize: 10}]}>
                    Get Code Cart
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                style={{
                  width: 20,
                  height: 20,
                  marginLeft: 5,
                }}
                onPress={() => onLastRescueKitClick()}>
                <Image
                  source={require('../images/infoBlue.png')}
                  style={{
                    height: 20,
                    width: 20,
                  }}
                  resizeMode="contain"
                />
              </TouchableOpacity>

              <ImageBackground
                source={require('../images/pinkButton.png')}
                style={styles.pinkButtonBGStyle}>
                <Image
                  source={require('../images/briefcase.png')}
                  style={{
                    width: 25,
                    height: 24,
                  }}></Image>
              </ImageBackground>
            </TouchableOpacity>
          </View>

          {/* List 4*/}
          <View
            style={[
              styles.listViewContainer,
              {marginTop: Platform.OS === 'ios' ? 20 : 10},
            ]}>
            <TouchableOpacity
              style={styles.listViewButton}
              onPress={() => onFourthButtonClicked(!isChecked4)}>
              <Image
                source={
                  isChecked4
                    ? require('../images/checkboxChecked.png')
                    : require('../images/checkboxUnchecked.png')
                }
                style={styles.checkedUnchecked}
              />
              <View style={{flexDirection: 'column'}}>
                <Text style={[styles.listViewText, {fontSize: 16}]}>
                  Consider Lipid Emulsion
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.popUpBullet}>{`\u25cf `}</Text>
                  <Text style={[styles.listViewText, {fontSize: 10}]}>
                    At First CNC or CVS Signs of a Serious Last Event
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          {/* List 5*/}
          <View
            style={[
              styles.listViewContainer,
              {marginTop: Platform.OS === 'ios' ? 20 : 10},
            ]}>
            <TouchableOpacity
              style={styles.listViewButton}
              onPress={() => onFifthButtonClicked(!isChecked5)}>
              <Image
                source={
                  isChecked5
                    ? require('../images/checkboxChecked.png')
                    : require('../images/checkboxUnchecked.png')
                }
                style={styles.checkedUnchecked}
              />
              <View style={{flexDirection: 'column'}}>
                <Text style={[styles.listViewText, {fontSize: 16}]}>
                  Consider Alerting CP Bypass Team
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.popUpBullet}>{`\u25cf `}</Text>
                  <Text style={[styles.listViewText, {fontSize: 10}]}>
                    Resuscitation may be Prolonged
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          {/* List 6*/}
          <View
            style={[
              styles.listViewContainer,
              {
                marginTop: Platform.OS === 'ios' ? 20 : 10,
                height: 100,
                justifyContent: 'center',
              },
            ]}>
            <TouchableOpacity
              style={styles.listViewButton}
              onPress={() => onSixthButtonClicked(!isChecked6)}>
              <View style={{flexDirection: 'column'}}>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    source={
                      isChecked6
                        ? require('../images/checkboxChecked.png')
                        : require('../images/checkboxUnchecked.png')
                    }
                    style={styles.checkedUnchecked}
                  />
                  <Text style={[styles.listViewText, {fontSize: 11}]}>
                    The Pharmacologic Treament of LAST Diffrent{'\n'}from Other
                    Cardic Arrest Scenarios
                  </Text>
                </View>

                <View style={styles.bottomView}></View>

                <View style={{flexDirection: 'row', marginLeft: 20}}>
                  <Text style={styles.popUpBullet}>{`\u25cf `}</Text>
                  <Text style={[styles.listViewText, {fontSize: 8}]}>
                    Reduce Individual epinephrine boluses to ≤ 1mcg/kg
                  </Text>
                </View>

                <View style={{flexDirection: 'row', marginLeft: 20}}>
                  <Text style={styles.popUpBullet}>{`\u25cf `}</Text>
                  <Text
                    style={[styles.listViewText, {fontSize: 8, marginTop: 5}]}>
                    Avoid Vasopressin, Calcium Chanel Blockers, Beta Blockers,
                    or Other Local anesthetics
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.dangerContainer}>
            <Image
              source={require('../images/alert.png')}
              style={styles.checkedUnchecked}
              resizeMode="contain"
            />
            <Text
              style={[
                styles.listViewText,
                {fontSize: 11, fontStyle: 'italic', fontWeight: 'bold'},
              ]}>
              Beware LAST Resucitation is DIFFRENT from Standard ACLS
            </Text>
          </View>

          {isChecked1 ? (
            <View style={styles.buttonSubmitStyle}>
              {isChecked2 ? (
                <View style={styles.buttonSubmitStyle}>
                  {isChecked3 ? (
                    <View style={styles.buttonSubmitStyle}>
                      {isChecked4 ? (
                        <View style={styles.buttonSubmitStyle}>
                          {isChecked5 ? (
                            <View style={styles.buttonSubmitStyle}>
                              {isChecked6 ? (
                                <View style={styles.buttonSubmitStyle}>
                                  <View
                                    style={[
                                      styles.buttonSubmitStyle,
                                      {
                                        backgroundColor:
                                          COLORS.PopUpTextBlueColor,
                                      },
                                    ]}>
                                    <TouchableOpacity
                                      activeOpacity={0.5}
                                      onPress={onNextClicked}
                                      style={styles.buttonSubmitStyle}>
                                      <Text
                                        style={[
                                          styles.buttonSubmitText,
                                          {color: 'white'},
                                        ]}>
                                        NEXT
                                      </Text>
                                      <Image
                                        source={require('../images/next.png')}
                                        style={{height: 20, width: 20}}
                                        resizeMode="contain"
                                      />
                                    </TouchableOpacity>
                                  </View>
                                </View>
                              ) : null}
                            </View>
                          ) : null}
                        </View>
                      ) : null}
                    </View>
                  ) : null}
                </View>
              ) : null}
            </View>
          ) : null}

          {/* <TouchableOpacity
            activeOpacity={0.5}
            disabled={
              isChecked1
                ? isChecked2
                  ? isChecked3
                    ? isChecked4
                      ? isChecked5
                        ? isChecked6
                          ? false
                          : true
                        : true
                      : true
                    : true
                  : true
                : true
            }
            onPress={onNextClicked}
            style={[
              styles.buttonSubmitStyle,
              {
                backgroundColor: isChecked1
                  ? isChecked2
                    ? isChecked3
                      ? isChecked4
                        ? isChecked5
                          ? isChecked6
                            ? COLORS.PopUpTextBlueColor
                            : COLORS.TextGrayColor
                          : COLORS.TextGrayColor
                        : COLORS.TextGrayColor
                      : COLORS.TextGrayColor
                    : COLORS.TextGrayColor
                  : COLORS.TextGrayColor,
              },
            ]}>
            <Text
              style={[
                styles.buttonSubmitText,
                {
                  color: isChecked1
                    ? isChecked2
                      ? isChecked3
                        ? isChecked4
                          ? isChecked5
                            ? isChecked6
                              ? 'white'
                              : 'black'
                            : 'black'
                          : 'black'
                        : 'black'
                      : 'black'
                    : 'black',
                },
              ]}>
              NEXT
            </Text>
            <Image
              source={require('../images/next.png')}
              style={{
                height: 20,
                width: 20,
                tintColor: isChecked1
                  ? isChecked2
                    ? isChecked3
                      ? isChecked4
                        ? isChecked5
                          ? isChecked6
                            ? 'white'
                            : 'black'
                          : 'black'
                        : 'black'
                      : 'black'
                    : 'black'
                  : 'black',
              }}
              resizeMode="contain"
            />
          </TouchableOpacity> */}
        </View>

        {/* Last Rescue Kit Alert */}
        {isLastRescueKit ? (
          <View position="absolute" style={styles.popUpBgView}>
            <View style={styles.popUpSmallLastBg}>
              <Text
                style={[
                  styles.popUpMainHeader,
                  {textAlign: 'left', color: COLORS.BackgroundColorPink},
                ]}>
                Call for LAST Rescue Kit
              </Text>
              <Text style={styles.popUpLastRescueMainText}>
                Suggested Contents
              </Text>

              <View style={styles.popUpBulletContainer}>
                <Text
                  style={[
                    styles.popUpBullet,
                    {marginLeft: 30, fontSize: 10},
                  ]}>{`\u25cf`}</Text>
                <Text style={styles.popUpLastRescueText}>
                  1 L (total) lipid emulsion (20%)
                </Text>
              </View>

              <View style={styles.popUpBulletContainer}>
                <Text
                  style={[
                    styles.popUpBullet,
                    {marginLeft: 30, fontSize: 10},
                  ]}>{`\u25cf`}</Text>
                <Text style={styles.popUpLastRescueText}>
                  Several large syringes and needles for administration
                </Text>
              </View>

              <View style={styles.popUpBulletContainer}>
                <Text
                  style={[
                    styles.popUpBullet,
                    {marginLeft: 30, fontSize: 10},
                  ]}>{`\u25cf`}</Text>
                <Text style={styles.popUpLastRescueText}>
                  Standard IV tubing
                </Text>
              </View>

              <View style={styles.popUpBulletContainer}>
                <Text
                  style={[
                    styles.popUpBullet,
                    {marginLeft: 30, fontSize: 10},
                  ]}>{`\u25cf`}</Text>
                <Text style={styles.popUpLastRescueText}>
                  ASRA LAST Checklist
                </Text>
              </View>

              <View
                style={[
                  styles.popUpLastOkButton,
                  {backgroundColor: COLORS.BackgroundColorPink, marginTop: 40},
                ]}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={onOkayButtonClick}>
                  <Text style={[styles.popUpButtonText, {color: 'white'}]}>
                    OK
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : null}

        {/* Pulse Alert */}
        {isPulseAlert ? (
          <View position="absolute" style={styles.popUpBgView}>
            <View style={[styles.popUpSmallLastBg, {height: 330}]}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={onCloseButtonClicked}>
                <Image
                  source={require('../images/cancel.png')}
                  style={styles.popUpClose}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <Text
                style={[
                  styles.popUpMainHeader,
                  {textAlign: 'center', color: 'black', marginTop: 20},
                ]}>
                Does Patient{'\n'}Have a PULSE?
              </Text>

              <View
                style={[
                  styles.popUpLastOkButton,
                  {marginTop: 40, backgroundColor: COLORS.BackgroundColorPink},
                ]}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => onPulseYesClicked()}>
                  <Text style={[styles.popUpButtonText, {color: 'white'}]}>
                    YES
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.popUpLastOkButton}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => onPulseNoClicked()}>
                  <Text style={[styles.popUpButtonText, {color: 'white'}]}>
                    NO
                  </Text>
                </TouchableOpacity>
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
  },

  navContainer: {
    width: deviceWidth,
    height: Platform.OS === 'ios' ? 90 : 40,
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
    fontSize: Platform.OS === 'ios' ? 28 : 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },

  mainContainer: {
    height: Platform.OS === 'ios' ? deviceHeight - 140 : deviceHeight - 110,
    flexDirection: 'column',
    backgroundColor: 'white',
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    alignItems: 'center',
  },

  listViewContainer: {
    height: 65,
    width: listWidth,
    backgroundColor: 'white',
    marginHorizontal: 40,
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
    height: 65,
    alignItems: 'center',
  },

  listViewText: {
    fontWeight: 'normal',
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

  bottomView: {
    width: deviceWidth - 120,
    height: 1,
    backgroundColor: COLORS.TextLightGrayColor,
    marginHorizontal: 20,
    marginVertical: 10,
  },

  popUpBullet: {
    fontSize: 8,
    fontWeight: '400',
    alignSelf: 'center',
    color: COLORS.PopUpTextBlueColor,
  },

  dangerContainer: {
    width: deviceWidth,
    height: 55,
    backgroundColor: COLORS.BackgroundYellowColor,
    marginTop: Platform.OS === 'ios' ? 40 : 10,
    position: 'absolute',
    bottom: 60,
    alignItems: 'center',
    flexDirection: 'row',
  },

  buttonSubmitStyle: {
    width: deviceWidth,
    height: 65,
    marginTop: 0,
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  buttonSubmitText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    width: deviceWidth - 80,
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
    width: 320,
    height: Platform.OS === 'ios' ? 275 : 300,
    borderRadius: 10,
  },

  popUpSmallLastBg: {
    backgroundColor: COLORS.BackgroundColor,
    width: 360,
    height: Platform.OS === 'ios' ? 410 : 415,
    borderRadius: 10,
  },

  popUpMainHeader: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 30,
    marginHorizontal: 30,
  },

  popUpButtonText: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 15,
  },

  popUpLastRescueMainText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    marginTop: 40,
    marginHorizontal: 30,
    color: 'black',
  },

  popUpBulletContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    marginTop: 15,
  },

  popUpLastRescueText: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'left',
    marginLeft: 10,
    color: COLORS.PopUpTextBlueColor,
  },

  popUpLastOkButton: {
    height: 55,
    marginTop: 20,
    marginHorizontal: 50,
    borderRadius: 30,
    backgroundColor: COLORS.PopUpTextBlueColor,
  },

  popUpClose: {
    width: 20,
    height: 20,
    marginTop: 20,
    marginRight: 20,
    alignSelf: 'flex-end',
  },
});
export default BeginScreen;
