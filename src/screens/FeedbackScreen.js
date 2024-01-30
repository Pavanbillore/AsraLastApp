import React, {useState, useRef, useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {
  StatusBar,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  ActivityIndicator,
  View,
  TouchableOpacity,
  TextInput,
  Platform,
  ImageBackground,
} from 'react-native';
import {COLORS} from '../styles/GlobalColor';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import GlobalAwesomeAlert from '../components/GlobalAwesomeAlert';

var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;

const FeedbackScreen = ({navigation}) => {
  {
    /* Logic */
  }
  const [isloading, setLoading] = useState(false);
  const [message, setmessage] = useState('');
  const [visibleAlert, setShowAlert] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comments, setComments] = useState('');
  const [selectedSubmissionIndex, setSelectedSubmissionIndex] = useState(0);
  const [selectedRespondIndex, setSelectedRespondIndex] = useState(0);
  const [submissionType, setsubmissionType] = useState('');
  const [responseType, setresponseType] = useState('');
  const [bugReport, setBugReport] = useState(
    require('../images/radioInactive.png'),
  );
  const [feedback, setFeedback] = useState(
    require('../images/radioActive.png'),
  );

  const [respondYes, setRespondYes] = useState(
    require('../images/radioInactive.png'),
  );
  const [respondNo, setRespondNo] = useState(
    require('../images/radioActive.png'),
  );

  const [isFeedbackAlert, setFeedbackAlert] = useState(false);

  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  useEffect(() => {
    const unsubscribe = navigation.addListener(
      'focus',
      () => {
        setSelectedSubmissionIndex(0);
        setSelectedRespondIndex(0);
      },
      [navigation],
    );

    return unsubscribe;
  }, [navigation]);

  {
    /* Alert */
  }
  function showAlert() {
    setShowAlert(true);
  }

  hideAlert = () => {
    setShowAlert(false);
  };

  const handleSubmissionTabsChange = index => {
    setSelectedSubmissionIndex(index);
  };

  const handleRespondTabsChange = index => {
    setSelectedRespondIndex(index);
  };

  {
    /* Button Method */
  }
  const onSubmitFeedbackClicked = () => {
    if (name.length == 0) {
      setmessage('Please enter your name');
      showAlert();
    } else if (email.length == 0) {
      setmessage('Please enter your registered email address');
      showAlert();
    } else if (reg.test(email) === false) {
      setmessage('Incorrect email address');
      showAlert();
    } else if (comments.length == 0) {
      setmessage('Please enter your comments');
      showAlert();
    } else {
      setLoading(true);
      callFeedbackApi();
    }
  };

  const callFeedbackApi = () => {
    // var details = {
    //   name: name,
    //   email: email,
    //   comments: comments,
    //   submission_type: selectedSubmissionIndex == 0 ? 'bug_report' : 'feedback',
    //   respond: selectedRespondIndex == 0 ? 'yes' : 'no',
    //   platform_name: Platform.OS === 'ios' ? 'ios' : 'android',
    //   app_name: 'last',
    // };

    fetch('http://44.195.249.110/api/feedbacks/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        email: email,
        comments: comments,
        submission_type: submissionType,
        respond: responseType,
        platform_name: Platform.OS === 'ios' ? 'ios' : 'android',
        app_name: 'timeout',
      }),
    })
      .then(response => response.json())
      .then(response => {
        setLoading(false);
        console.log('response for Feedback Api: ', JSON.stringify(response));
        setFeedbackAlert(true);
      })
      .catch(function (error) {
        setLoading(false);
        console.log(
          'There has been a problem with your fetch operation: ' +
            error.message,
        );
        throw error;
      });
  };

  const okButtonClicked = () => {
    navigation.goBack();
    setFeedbackAlert(false);
  };

  const onBugReportClicked = () => {
    setBugReport(require('../images/radioActive.png'));
    setFeedback(require('../images/radioInactive.png'));
    setsubmissionType('bug_report');
  };

  const onFeedbackClicked = () => {
    setBugReport(require('../images/radioInactive.png'));
    setFeedback(require('../images/radioActive.png'));
    setsubmissionType('feedback');
  };

  const onRespondYesClicked = () => {
    setRespondYes(require('../images/radioActive.png'));
    setRespondNo(require('../images/radioInactive.png'));
    setresponseType('yes');
  };

  const onRespondNoClicked = () => {
    setRespondYes(require('../images/radioInactive.png'));
    setRespondNo(require('../images/radioActive.png'));
    setresponseType('no');
  };
  {
    /* UI */
  }
  return (
    <SafeAreaProvider style={styles.container} mode="margin">
      <StatusBar barStyle="dark-content" />

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

        <Text style={styles.navigationTitle}>Feedback Form</Text>

        {/* Main Container */}
        <View style={styles.mainContainer}>
          {/* Form */}
          <Text style={[styles.headerLabelText, {marginTop: 50}]}>
            Name (Optional)
          </Text>
          <TextInput
            style={styles.textInputStyle}
            value={name}
            onChangeText={name => setName(name)}
            keyboardType="default"
            autoCapitalize="words"
            secureTextEntry={false}
            returnKeyType="next"
            blurOnSubmit={true}
            maxLength={50}
            placeholder="Enter Name"
            placeholderTextColor={'gray'}
          />
          <View style={styles.viewDivider}></View>

          <Text style={[styles.headerLabelText, {marginTop: 30}]}>
            Email Address (Optional)
          </Text>
          <TextInput
            style={styles.textInputStyle}
            value={email}
            onChangeText={email => setEmail(email)}
            keyboardType="email-address"
            autoCapitalize="none"
            secureTextEntry={false}
            returnKeyType="done"
            blurOnSubmit={true}
            maxLength={50}
            placeholder="Enter E-mail Address"
            placeholderTextColor={'gray'}
          />
          <View style={styles.viewDivider}></View>

          <Text style={[styles.headerLabelText, {marginTop: 30}]}>
            Please Enter Comments
          </Text>
          <TextInput
            style={styles.textInputComments}
            value={comments}
            onChangeText={comments => setComments(comments)}
            keyboardType="default"
            multiline={true}
            numberOfLines={4}
            autoCapitalize="words"
            secureTextEntry={false}
            textAlignVertical="top"
            returnKeyType="done"
            blurOnSubmit={true}
            placeholderTextColor={'gray'}
            placeholder="Enter Comments"
          />
          <View style={styles.viewDivider}></View>

          {/* Submission Container */}
          <Text
            style={[
              styles.headerLabelText,
              {marginTop: 30, color: COLORS.BackgroundColorPink},
            ]}>
            Please select submission type
          </Text>
          <View style={styles.viewSubmission}>
            <TouchableOpacity
              style={styles.buttonRadioStyle}
              activeOpacity={0.5}
              onPress={() => {
                onBugReportClicked();
              }}>
              <Image source={bugReport} style={{height: 20, width: 20}} />
              <Text style={styles.buttonTextStyle}>Bug Report</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonRadioStyle}
              activeOpacity={0.5}
              onPress={() => {
                onFeedbackClicked();
                setsubmissionType('feedback');
              }}>
              <Image source={feedback} style={{height: 20, width: 20}} />
              <Text style={styles.buttonTextStyle}>Feedback</Text>
            </TouchableOpacity>
          </View>

          {/* Respond Container */}
          <Text
            style={[
              styles.headerLabelText,
              {marginTop: 20, color: COLORS.BackgroundColorPink},
            ]}>
            Would you like us to respond?
          </Text>
          <View style={styles.viewSubmission}>
            <TouchableOpacity
              style={styles.buttonRadioStyle}
              activeOpacity={0.5}
              onPress={onRespondYesClicked}>
              <Image source={respondYes} style={{height: 20, width: 20}} />
              <Text style={styles.buttonTextStyle}>Yes</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonRadioStyle}
              activeOpacity={0.5}
              onPress={onRespondNoClicked}>
              <Image source={respondNo} style={{height: 20, width: 20}} />
              <Text style={styles.buttonTextStyle}>No</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            activeOpacity={0.5}
            onPress={onSubmitFeedbackClicked}
            style={styles.buttonSubmitStyle}>
            <Text style={styles.buttonSubmitText}>SUBMIT FEEDBACK</Text>
          </TouchableOpacity>
        </View>

        {isFeedbackAlert ? (
          <View position="absolute" style={styles.alertBgStyle}>
            <View style={styles.alertSmallBgStyle}>
              <Text style={styles.alertTextStyle}>
                Thanks for contacting us. We will do the needful at the
                earliest.
              </Text>
              <View style={styles.alertDividerStyle} />

              <View style={{height: 60}}>
                <TouchableOpacity activeOpacity={0.5} onPress={okButtonClicked}>
                  <Text style={styles.alertButtonStyle}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : null}

        {/* Loader */}
        {isloading ? (
          <View position="absolute" style={styles.viewLoadingContainer}>
            <View style={styles.viewActivityContainer}>
              <ActivityIndicator
                animating={isloading}
                size="large"
                color="white"
              />
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

  navigationTitle: {
    color: 'white',
    fontSize: Platform.OS === 'ios' ? 30 : 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: Platform.OS === 'ios' ? 30 : 25,
  },

  mainContainer: {
    height: Platform.OS === 'ios' ? deviceHeight - 185 : deviceHeight - 145,
    flexDirection: 'column',
    backgroundColor: 'white',
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
  },

  headerLabelText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 40,
  },

  textInputStyle: {
    width: deviceWidth - 80,
    height: Platform.OS === 'ios' ? 30 : 40,
    fontSize: 15,
    marginTop: 5,
    marginHorizontal: 40,
    color: 'black',
  },

  viewDivider: {
    height: 1,
    width: deviceWidth - 80,
    backgroundColor: COLORS.TextDarkGrayColor,
    marginTop: 5,
    marginHorizontal: 40,
  },

  textInputComments: {
    width: deviceWidth - 80,
    height: Platform.OS === 'ios' ? 90 : 80,
    fontSize: 15,
    marginTop: 5,
    minHeight: 75,
    marginHorizontal: 40,
    color: 'black',
  },

  viewSubmission: {
    width: deviceWidth - 80,
    height: Platform.OS === 'ios' ? 40 : 50,
    marginTop: 10,
    flexDirection: 'row',
    marginHorizontal: 40,
  },

  buttonRadioStyle: {
    width: (deviceWidth - 80) / 2,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },

  buttonTextStyle: {
    fontSize: 15,
    textAlign: 'left',
    marginLeft: 5,
    color: COLORS.BackgroundColorPink,
  },

  buttonSubmitStyle: {
    width: deviceWidth,
    height: 45,
    backgroundColor: COLORS.BackgroundColorPink,
    marginTop: 40,
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 30 : 15,
    justifyContent: 'center',
  },

  buttonSubmitText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  alertBgStyle: {
    backgroundColor: COLORS.BlackHalfAlpha,
    width: deviceWidth,
    height: deviceHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },

  alertSmallBgStyle: {
    backgroundColor: COLORS.BackgroundColor,
    width: deviceWidth - 40,
    height: 155,
    borderRadius: 10,
  },

  alertTextStyle: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 30,
    marginHorizontal: 20,
    color: COLORS.PopUpTextBlueColor,
  },

  alertDividerStyle: {
    backgroundColor: COLORS.TextLightGrayColor,
    height: 1,
    width: deviceWidth - 40,
    marginTop: 20,
  },

  alertButtonStyle: {
    color: COLORS.PopUpTextBlueColor,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 15,
  },

  viewLoadingContainer: {
    backgroundColor: COLORS.BlackHalfAlpha,
    width: deviceWidth,
    height: deviceHeight,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  viewActivityContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    width: 100,
    height: 100,
    borderRadius: 10,
    justifyContent: 'center',
  },
});

export default FeedbackScreen;
