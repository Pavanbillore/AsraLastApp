import React, {useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {
  StatusBar,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  View,
  TouchableOpacity,
  Linking,
  Platform,
  ImageBackground,
} from 'react-native';
import {COLORS} from '../styles/GlobalColor';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const InfoScreen = ({navigation, route}) => {
  const [isAppStoreLinkAlert, setAppStoreLinkAlert] = useState(false);
  const [isTimeoutApp, setTimeoutApp] = useState('TIMEOUT');
  const [isLastRescueKit, setLastRescueKit] = useState(false);

  {
    /* Button Method */
  }
  const clickOnFeedbackButton = () => {
    navigation.navigate('FeedbackScreen');
  };

  const onBackClicked = () => {
    navigation.navigate('HomeScreen', {isLaunchedFirstTime: 'false'});
  };

  const onAsraTimeoutClick = () => {
    setTimeoutApp('TIMEOUT');
    setAppStoreLinkAlert(true);
  };

  const onAsraCoagsClick = () => {
    setTimeoutApp('Coags');
    setAppStoreLinkAlert(true);
  };

  const onVisitAppStoreClick = () => {
    setAppStoreLinkAlert(true);
    if (Platform.OS === 'ios') {
      if (isTimeoutApp == 'Coags') {
        const link = 'https://apps.apple.com/us/app/asra-coags/id858796572';
        Linking.canOpenURL(link).then(
          supported => {
            supported && Linking.openURL(link);
          },
          err => console.log(err),
        );
      } else {
        const link = 'https://apps.apple.com/il/app/asra-timeout/id922633660';
        Linking.canOpenURL(link).then(
          supported => {
            supported && Linking.openURL(link);
          },
          err => console.log(err),
        );
      }
    } else {
      if (isTimeoutApp == 'Coags') {
        const link =
          'https://play.google.com/store/apps/details?id=com.asra.asracoags&hl=en_IN&gl=US';
        Linking.canOpenURL(link).then(
          supported => {
            supported && Linking.openURL(link);
          },
          err => console.log(err),
        );
      } else {
        const link =
          'https://play.google.com/store/apps/details?id=com.asra.asratimeout&hl=en&gl=US';
        Linking.canOpenURL(link).then(
          supported => {
            supported && Linking.openURL(link);
          },
          err => console.log(err),
        );
      }
    }
  };

  const onStayHereClick = () => {
    setAppStoreLinkAlert(false);
  };

  const onOkayButtonClick = () => {
    setLastRescueKit(false);
  };

  const onLastRescueKitClick = () => {
    setLastRescueKit(true);
  };

  const onFullChecklistClick = () => {
    navigation.navigate('FullchecklistScreen');
  };

  const onOriginalArticleClick = () => {
    navigation.navigate('OriginalArticleScreen');
  };

  const onLipidRescueClick = () => {
    const link = 'http://www.lipidrescue.org';
    console.log('value in link: ' + link);
    Linking.canOpenURL(link).then(
      supported => {
        supported && Linking.openURL(link);
      },
      err => console.log(err),
    );
  };

  const onAsraLinkClick = () => {
    const link =
      'https://www.asra.com/guidelines-articles/guidelines/guideline-item/guidelines/2020/11/01/checklist-for-treatment-of-local-anesthetic-systemic-toxicity';
    Linking.canOpenURL(link).then(
      supported => {
        supported && Linking.openURL(link);
      },
      err => console.log(err),
    );
  };

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
              <Text style={styles.leftTopTitle}>Back</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.rightTopButton}
            onPress={() => clickOnFeedbackButton()}>
            <Text style={styles.rightTopTitle}>Give Feedback</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.mainText}>
          Local Anesthetic Systemic Toxicity Algorithm 3.0
        </Text>

        {/* Main Container*/}
        <View style={styles.mainContainer}>
          {/* List Container*/}
          <View style={[styles.listViewContainer, {marginTop: 50}]}>
            <TouchableOpacity
              rippleColor="rgba(0, 0, 0, .32)"
              style={styles.listViewButton}
              onPress={() => onLastRescueKitClick()}>
              <Text
                style={[
                  styles.listViewText,
                  {width: deviceWidth - 190, marginLeft: 55},
                ]}>
                Last Resuce Kit
              </Text>

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

          <View style={[styles.listViewContainer, {marginTop: 20}]}>
            <TouchableOpacity
              rippleColor="rgba(0, 0, 0, .32)"
              style={styles.listViewButton}
              onPress={() => onFullChecklistClick()}>
              <Text style={styles.listViewText}>Full Checklist</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.listViewContainer, {marginTop: 20}]}>
            <TouchableOpacity
              rippleColor="rgba(0, 0, 0, .32)"
              style={styles.listViewButton}
              onPress={() => onOriginalArticleClick()}>
              <Text style={styles.listViewText}>Original Article</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.listViewContainer, {marginTop: 20}]}>
            <TouchableOpacity
              rippleColor="rgba(0, 0, 0, .32)"
              style={styles.listViewButton}
              onPress={() => Linking.openURL('http://www.lipidrescue.org')}>
              <Text style={styles.listViewText}>Lipidrescue.org</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.listViewContainer, {marginTop: 20}]}>
            <TouchableOpacity
              rippleColor="rgba(0, 0, 0, .32)"
              style={styles.listViewButton}
              onPress={() => Linking.openURL('https://www.asra.com/')}>
              <Text style={styles.listViewText}>
                Get Checklist for Free{'\n'}at ASRA.com
              </Text>
            </TouchableOpacity>
          </View>

          {/* AppLogo Container*/}
          <View style={styles.viewAppContainer}>
            <TouchableOpacity
              onPress={onAsraCoagsClick}
              rippleColor="rgba(0, 0, 0, .32)">
              <Image
                source={require('../images/coagsLogo.png')}
                style={styles.imageAppStyle}
              />
            </TouchableOpacity>

            <View style={styles.dividerLineView} />

            <TouchableOpacity
              onPress={onAsraTimeoutClick}
              rippleColor="rgba(0, 0, 0, .32)">
              <Image
                source={require('../images/timeOutLogo.png')}
                style={styles.imageAppStyle}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom Text*/}
        <Text style={styles.bottomTextBoldStyle}>
          Based on ASRA Practice Advisory on Local Anesthetic Systemic Toxixity
          2017
        </Text>
        <Text style={styles.bottomSmallText}>
          ASRA Owns the copyright to the last checklist and its contents.
        </Text>

        {/* AppStore Link Alert */}
        {isAppStoreLinkAlert ? (
          <View position="absolute" style={styles.popUpBgView}>
            <View style={styles.popUpSmallBg}>
              <Text style={[styles.popUpMainHeader, {textAlign: 'center'}]}>
                Visit App Store?
              </Text>
              <Text style={styles.popUpTitle}>
                You don't have the {isTimeoutApp} app installed on your device.
                Would you like to visit the App Store to download the app?
              </Text>

              <View style={[styles.popUpDivider, {marginTop: 20}]} />

              <View style={{height: 50, width: 320}}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={onVisitAppStoreClick}
                  style={{height: 50, width: 320}}>
                  <Text
                    style={[
                      styles.popUpButtonText,
                      {
                        height: 50,
                        width: 320,
                        color: COLORS.PopUpTextBlueColor,
                      },
                    ]}>
                    Yes, Visit App Store
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.popUpDivider} />

              <View style={{height: 50, width: 320}}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={onStayHereClick}
                  style={{height: 50, width: 320}}>
                  <Text style={styles.popUpStayHereText}>No, Stay Here</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : null}

        {/* Last Rescue Kit Alert */}
        {isLastRescueKit ? (
          <View position="absolute" style={styles.popUpBgView}>
            <View style={styles.popUpSmallLastBg}>
              <Text style={[styles.popUpMainHeader, {textAlign: 'center'}]}>
                Call for LAST Rescue Kit
              </Text>
              <Text style={styles.popUpLastRescueMainText}>
                Suggested Contents
              </Text>

              <View style={styles.popUpBulletContainer}>
                <Text style={styles.popUpBullet}>{`\u25cf`}</Text>
                <Text style={styles.popUpLastRescueText}>
                  1 L (total) lipid emulsion (20%)
                </Text>
              </View>

              <View style={styles.popUpBulletContainer}>
                <Text style={styles.popUpBullet}>{`\u25cf`}</Text>
                <Text style={styles.popUpLastRescueText}>
                  Several large syringes and needles for administration
                </Text>
              </View>

              <View style={styles.popUpBulletContainer}>
                <Text style={styles.popUpBullet}>{`\u25cf`}</Text>
                <Text style={styles.popUpLastRescueText}>
                  Standard IV tubing
                </Text>
              </View>

              <View style={styles.popUpBulletContainer}>
                <Text style={styles.popUpBullet}>{`\u25cf`}</Text>
                <Text style={styles.popUpLastRescueText}>
                  ASRA LAST Checklist
                </Text>
              </View>

              <View style={styles.popUpLastOkButton}>
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
    width: 60,
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

  rightTopButton: {
    width: 120,
    height: 25,
    marginTop: Platform.OS === 'ios' ? 40 : 0,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  rightTopTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },

  mainText: {
    fontSize: Platform.OS === 'ios' ? 25 : 22,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginVertical: 30,
  },

  mainContainer: {
    height: Platform.OS === 'ios' ? deviceHeight - 210 : deviceHeight - 170,
    flexDirection: 'column',
    backgroundColor: 'white',
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    alignItems: 'center',
  },

  listViewContainer: {
    height: 60,
    width: deviceWidth - 80,
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
    height: 60,
    justifyContent: 'center',
  },

  listViewText: {
    color: 'black',
    fontSize: Platform.OS === 'ios' ? 19 : 16,
    fontWeight: 'normal',
    textAlign: 'center',
    alignSelf: 'center',
  },

  pinkButtonBGStyle: {
    width: 55,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },

  viewAppContainer: {
    width: deviceWidth,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
  },

  imageAppStyle: {
    width: 72,
    height: 50,
    resizeMode: 'contain',
  },

  dividerLineView: {
    width: 1,
    height: 50,
    backgroundColor: COLORS.TextGrayColor,
    marginHorizontal: 20,
  },

  bottomTextBoldStyle: {
    fontSize: Platform.OS === 'ios' ? 12 : 11,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 40,
    width: deviceWidth - 80,
    marginTop: 20,
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 50 : 30,
  },

  bottomSmallText: {
    fontSize: 8,
    fontWeight: 'bold',
    textAlign: 'center',
    width: deviceWidth - 80,
    marginHorizontal: 40,
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 30 : 10,
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
    height: Platform.OS === 'ios' ? 275 : 265,
    borderRadius: 10,
  },

  popUpSmallLastBg: {
    backgroundColor: COLORS.BackgroundColor,
    width: 360,
    height: Platform.OS === 'ios' ? 360 : 375,
    borderRadius: 10,
  },

  popUpMainHeader: {
    color: COLORS.BackgroundColorPink,
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 30,
    marginHorizontal: 30,
  },

  popUpTitle: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 15,
    marginHorizontal: 15,
  },

  popUpDivider: {
    backgroundColor: COLORS.TextLightGrayColor,
    height: 1,
    width: 320,
  },

  popUpButtonText: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 12,
  },

  popUpStayHereText: {
    color: COLORS.TextRedColor,
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 10,
  },

  popUpLastRescueMainText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    marginTop: 25,
    marginHorizontal: 30,
    color: COLORS.BackgroundColorPink,
  },

  popUpBulletContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    marginTop: 15,
  },

  popUpBullet: {
    fontSize: 10,
    fontWeight: '400',
    alignSelf: 'center',
    marginLeft: 30,
    color: COLORS.PopUpTextBlueColor,
  },

  popUpLastRescueText: {
    fontSize: 15,
    fontWeight: '400',
    textAlign: 'left',
    marginLeft: 10,
    color: COLORS.PopUpTextBlueColor,
  },

  popUpLastOkButton: {
    height: 50,
    backgroundColor: COLORS.BackgroundColorPink,
    marginTop: 20,
    marginHorizontal: 40,
    borderRadius: 25,
  },
});
export default InfoScreen;
