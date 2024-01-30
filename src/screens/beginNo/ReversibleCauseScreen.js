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

const ReversibleCauseScreen = ({navigation, route}) => {
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
    navigation.goBack();
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

        <Text style={styles.mainText}>Reversible Causes</Text>

        {/* Main Container*/}
        <View style={styles.mainContainer}>
          {/* List Container*/}

          {/* List 1 */}
          <View style={[styles.listViewContainer, {marginTop: 40}]}>
            <TouchableOpacity style={styles.listViewButton}>
              <Image
                source={require('../../images/checkList.png')}
                style={styles.checkedUnchecked}
              />
              <Text style={[styles.listViewText, {fontSize: 15}]}>
                Hypovolemia
              </Text>
            </TouchableOpacity>
          </View>

          {/* List 2 */}
          <View style={[styles.listViewContainer, {marginTop: 5}]}>
            <TouchableOpacity style={styles.listViewButton}>
              <Image
                source={require('../../images/checkList.png')}
                style={styles.checkedUnchecked}
              />
              <Text style={[styles.listViewText, {fontSize: 15}]}>Hypoxia</Text>
            </TouchableOpacity>
          </View>

          {/* List 3 */}
          <View style={[styles.listViewContainer, {marginTop: 5}]}>
            <TouchableOpacity style={styles.listViewButton}>
              <Image
                source={require('../../images/checkList.png')}
                style={styles.checkedUnchecked}
              />
              <Text style={[styles.listViewText, {fontSize: 15}]}>
                Hypo/Hyperthermia
              </Text>
            </TouchableOpacity>
          </View>

          {/* List 4 */}
          <View style={[styles.listViewContainer, {marginTop: 5}]}>
            <TouchableOpacity style={styles.listViewButton}>
              <Image
                source={require('../../images/checkList.png')}
                style={styles.checkedUnchecked}
              />
              <Text style={[styles.listViewText, {fontSize: 15}]}>
                Hypo/Hyperkalemia
              </Text>
            </TouchableOpacity>
          </View>

          {/* List 5 */}
          <View style={[styles.listViewContainer, {marginTop: 30}]}>
            <TouchableOpacity style={styles.listViewButton}>
              <Image
                source={require('../../images/checkList.png')}
                style={styles.checkedUnchecked}
              />
              <Text style={[styles.listViewText, {fontSize: 15}]}>
                H⁺ /Acidosis
              </Text>
            </TouchableOpacity>
          </View>

          {/* List 6 */}
          <View style={[styles.listViewContainer, {marginTop: 5}]}>
            <TouchableOpacity style={styles.listViewButton}>
              <Image
                source={require('../../images/checkList.png')}
                style={styles.checkedUnchecked}
              />
              <Text style={[styles.listViewText, {fontSize: 15}]}>
                {' '}
                Hypoglycemia
              </Text>
            </TouchableOpacity>
          </View>

          {/* List 7 */}
          <View style={[styles.listViewContainer, {marginTop: 5}]}>
            <TouchableOpacity style={styles.listViewButton}>
              <Image
                source={require('../../images/checkList.png')}
                style={styles.checkedUnchecked}
              />
              <Text style={[styles.listViewText, {fontSize: 15}]}>
                Hypocalcemia
              </Text>
            </TouchableOpacity>
          </View>

          {/* List 8 */}
          <View style={[styles.listViewContainer, {marginTop: 30}]}>
            <TouchableOpacity style={styles.listViewButton}>
              <Image
                source={require('../../images/checkList.png')}
                style={styles.checkedUnchecked}
              />
              <Text style={[styles.listViewText, {fontSize: 15}]}>
                Tension Pneumothorax
              </Text>
            </TouchableOpacity>
          </View>

          {/* List 9 */}
          <View style={[styles.listViewContainer, {marginTop: 5}]}>
            <TouchableOpacity style={styles.listViewButton}>
              <Image
                source={require('../../images/checkList.png')}
                style={styles.checkedUnchecked}
              />
              <Text style={[styles.listViewText, {fontSize: 15}]}>
                {' '}
                Thrombosis coronary
              </Text>
            </TouchableOpacity>
          </View>

          {/* List 10 */}
          <View style={[styles.listViewContainer, {marginTop: 5}]}>
            <TouchableOpacity style={styles.listViewButton}>
              <Image
                source={require('../../images/checkList.png')}
                style={styles.checkedUnchecked}
              />
              <Text style={[styles.listViewText, {fontSize: 15}]}>
                Thrombosis pulmonary
              </Text>
            </TouchableOpacity>
          </View>

          {/* List 11 */}
          <View style={[styles.listViewContainer, {marginTop: 5}]}>
            <TouchableOpacity style={styles.listViewButton}>
              <Image
                source={require('../../images/checkList.png')}
                style={styles.checkedUnchecked}
              />
              <Text style={[styles.listViewText, {fontSize: 15}]}>Toxins</Text>
            </TouchableOpacity>
          </View>

          {/* List 12 */}
          <View style={[styles.listViewContainer, {marginTop: 5}]}>
            <TouchableOpacity style={styles.listViewButton}>
              <Image
                source={require('../../images/checkList.png')}
                style={styles.checkedUnchecked}
              />
              <Text style={[styles.listViewText, {fontSize: 15}]}>
                Tamponade cardiac
              </Text>
            </TouchableOpacity>
          </View>

          {/* Bottom Button */}
          <View
            style={[
              styles.bottomContainer,
              {
                bottom: 75,
                height: 65,
                backgroundColor: COLORS.BackgroundYellowColor,
              },
            ]}>
            <Text
              style={{
                fontSize: 13,
                fontStyle: 'italic',
                alignSelf: 'center',
              }}>
              LAST is the primary diagnosis;{'\n'}consider possible secondary
              diagnosis.
            </Text>
          </View>

          {/* Bottom Pink Button */}
          <View
            style={[
              styles.bottomContainer,
              {
                bottom: 0,
                height: 75,
                backgroundColor: COLORS.BackgroundColorPink,
              },
            ]}>
            <TouchableOpacity
              style={[
                styles.bottomButton,
                {
                  marginLeft: 0,
                  width: deviceWidth,
                  justifyContent: 'center',
                },
              ]}
              onPress={() => onBackClicked()}>
              <Text
                style={{
                  fontSize: 16,
                  color: 'white',
                  fontWeight: '500',
                }}>
                Back to Checklist
              </Text>
            </TouchableOpacity>
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
    fontSize: 28,
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
    height: 30,
    width: listWidth,
  },

  listViewButton: {
    flexDirection: 'row',
    height: 30,
    alignItems: 'center',
  },

  listViewText: {
    fontWeight: '500',
    marginLeft: 10,
    color: COLORS.PopUpTextBlueColor,
  },

  checkedUnchecked: {height: 22, width: 22, marginLeft: 15, marginRight: 5},

  pinkButtonBGStyle: {
    width: 55,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
    alignSelf: 'flex-start',
  },

  bottomContainer: {
    width: deviceWidth,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  bottomButton: {
    flexDirection: 'row',
    height: 75,
    alignItems: 'center',
    bottom: 10,
  },
});
export default ReversibleCauseScreen;
