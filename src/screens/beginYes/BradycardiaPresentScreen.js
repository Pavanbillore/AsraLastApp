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
  Platform,
  ImageBackground,
} from 'react-native';
import {COLORS} from '../../styles/GlobalColor';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const listWidth = deviceWidth - 60;

const BradycardiaPresentScreen = ({navigation, route}) => {
  const [isChecked1, setChecked1] = useState(false);
  const [isChecked2, setChecked2] = useState(false);
  const [isChecked3, setChecked3] = useState(false);
  const [value, setValue] = useState(0);
  {
    /* Button Method */
  }
  const onBackClicked = () => {
    navigation.goBack();
  };

  const onFirstButtonClicked = isChecked => {
    setChecked1(isChecked);

    if (isChecked == true) {
      if (isChecked2 && isChecked3) {
        navigation.goBack();
      }
    }
  };

  const onSecondButtonClicked = isChecked => {
    setChecked2(isChecked);
    if (isChecked == true) {
      if (isChecked1 && isChecked3) {
        navigation.goBack();
      }
    }
  };

  const onThirdButtonClicked = isChecked => {
    setChecked3(isChecked);

    if (isChecked == true) {
      if (isChecked1 && isChecked2) {
        navigation.goBack();
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
        </View>

        <Text style={styles.mainText}>Bradycardia Management</Text>

        {/* Main Container*/}
        <View style={styles.mainContainer}>
          {/* List Container*/}

          {/* List 1 */}
          <View style={[styles.listViewContainer, {marginTop: 80}]}>
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
              <Text style={[styles.listViewText, {fontSize: 16}]}>
                Consider atropine 0.5 to 1.0 mg
              </Text>
            </TouchableOpacity>
          </View>

          {/* List 2 */}
          <View style={[styles.listViewContainer, {marginTop: 30}]}>
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
              <Text style={[styles.listViewText, {fontSize: 16}]}>
                Consider Transcutaneous Pacing
              </Text>
            </TouchableOpacity>
          </View>

          {/* List 3 */}
          <View style={[styles.listViewContainer, {marginTop: 30}]}>
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
              <Text style={[styles.listViewText, {fontSize: 16}]}>
                Treat Hypotension
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom Button */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={[styles.bottomButton, {marginLeft: 20}]}
            onPress={() => onBackClicked()}>
            <Image
              source={require('../../images/backBlack.png')}
              style={{height: 20, width: 20}}
              resizeMode="contain"
            />
            <Text style={[styles.listViewText, {fontSize: 16}]}>
              Back to Checklist
            </Text>
          </TouchableOpacity>
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
    fontWeight: '500',
    marginLeft: 10,
  },

  checkedUnchecked: {height: 20, width: 20, marginLeft: 20, marginRight: 10},

  bottomContainer: {
    width: deviceWidth,
    height: 65,
    backgroundColor: COLORS.BackgroundYellowColor,
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  bottomButton: {
    flexDirection: 'row',
    height: 65,
    width: 160,
    alignItems: 'center',
  },
});
export default BradycardiaPresentScreen;
