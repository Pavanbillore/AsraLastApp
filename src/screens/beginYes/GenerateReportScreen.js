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
  Linking,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import Share from 'react-native-share';
import {COLORS} from '../../styles/GlobalColor';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Mailer from 'react-native-mail';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const listWidth = deviceWidth - 60;

const GenerateReportScreen = ({navigation, route}) => {
  const [isEventType, setEventType] = useState(false);
  const [isLipidAlert, setLipidAlert] = useState(false);
  const [pdfData, setpdfData] = useState([]);
  const [pdfurl, setPdfurl] = useState(null);
  const [mailText, setMailText] = useState(
    'The email has a PDF attachment that is a summary report for an ASRA LAST treatment session as recorded by the ASRA LAST iOS app.',
  );
  const [isActual, setActual] = useState(
    require('../../images/radioInactive.png'),
  );
  const [isTrialApp, setTrialApp] = useState(
    require('../../images/radioInactive.png'),
  );

  const [isSimulation, setSimulation] = useState(
    require('../../images/radioInactive.png'),
  );
  const onShare = async () => {
    try {
      // var path =
      //   RNFS.DocumentDirectoryPath +
      //   '/reportfile' +
      //   Math.floor(Math.random(1, 100000) * 100) +
      //   '.pdf';
      // if (Platform.OS == 'android') {
      //   const granted = await PermissionsAndroid.request(
      //     PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      //     {
      //       title: 'Cool Photo App Camera Permission',
      //       message:
      //         'Cool Photo App needs access to your camera ' +
      //         'so you can take awesome pictures.',
      //       buttonNeutral: 'Ask Me Later',
      //       buttonNegative: 'Cancel',
      //       buttonPositive: 'OK',
      //     },
      //   );
      //   const grantedwrite = await PermissionsAndroid.request(
      //     PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      //     {
      //       title: 'Cool Photo App Camera Permission',
      //       message:
      //         'Cool Photo App needs access to your camera ' +
      //         'so you can take awesome pictures.',
      //       buttonNeutral: 'Ask Me Later',
      //       buttonNegative: 'Cancel',
      //       buttonPositive: 'OK',
      //     },
      //   );
      //   if (
      //     granted === PermissionsAndroid.RESULTS.GRANTED &&
      //     grantedwrite === PermissionsAndroid.RESULTS.GRANTED
      //   ) {
      //     RNFS.copyFileAssets('file://' + pdfData, path, 100, 100)
      //       .then(results => {
      //         console.log('Copy File', results);
      //       })
      //       .catch(err => {
      //         console.log('Error copying file', err);
      //       });
      //   } else {
      //     console.log('Read permission denied');
      //   }
      // } else {
      //   RNFS.copyAssetsFileIOS('file://' + pdfData, path, 100, 100)
      //     .then(results => {
      //       console.log('Copy File', results);
      //     })
      //     .catch(err => {
      //       console.log('Error copying file', err);
      //     });
      // }
      Share.open({
        title: 'Health Report',
        message: 'Health Report',
        url: 'file://' + pdfData,
        subject: 'Health Report',
        saveToFiles: true,
        useInternalStorage: true,
      })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          err && console.log(err);
        });
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  useEffect(() => {
    createPDF();
  }, []);
  const datedifference = (d, e) => {
    var d = new Date(d);
    var e = new Date(e);
    var diff = (e - d) / 1000;
    return Math.floor(diff / 60) + ':' + Math.floor(diff % 60);
  };
  const dateformat = d => {
    var d = new Date(d);
    return (dformat =
      [
        d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1,
        d.getDate() < 10 ? '0' + d.getDate() : d.getDate(),
        d.getFullYear(),
      ].join('/') +
      ' ' +
      [
        d.getHours() < 10 ? '0' + d.getHours() : d.getHours(),
        d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes(),
        d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds(),
      ].join(':'));
  };
  const timeformats = d => {
    var d = new Date(d);
    return [
      d.getHours() < 10 ? '0' + d.getHours() : d.getHours(),
      d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes(),
      d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds(),
    ].join(':');
  };
  const createPDF = async () => {
    var datahtml = `<!DOCTYPE html>
      <html lang="en">
      <head>
          <title>PDF Document</title>
      </head>
      <body>
      <div style="width: 100%;">
          <h4 style="text-align:center;font-family:Times New Roman;font-weight:bold;">Events, medications, and timing on this report are approximate and are NOT designed to be<br>
      the official code record. Please use your local institution's local code record for the official<br>
      documentation.</h4></div>`;
    datahtml += `
        <div style="padding:10px;">
            <div style="display:flex;padding:10px;width: 95%;">
                    <text style="width:50%;"><span style="text-decoration: underline;font-weight:bold;">Management Start</span><br>${dateformat(
                      global.pdfdata.eventstart_time,
                    )}</text>
                    <text style="width:50%;"><span style="text-decoration: underline;font-weight:bold;">Management End</span><br>${dateformat(
                      global.pdfdata.eventend_time,
                    )}</text>
                    <text style="width:50%;"><span style="text-decoration: underline;font-weight:bold;">Management Duration</span><br>${datedifference(
                      global.pdfdata.eventstart_time,
                      global.pdfdata.eventend_time,
                    )}</text>
            </div>
        <div>`;
    if (global.pdfdata.weight) {
      datahtml += `
          <div style="display: flex;justify-content:space-evenly;padding:10px;">
                      <text style="width:50%;">Patient Weight: ${global.pdfdata.weight} kg</text>
          </div>`;
    }
    // if (global.pdfdata.weight) {
    //   datahtml += `
    //         <div style="display: flex; justify-content:space-evenly;padding:10px;">
    //             <text style="width:50%;">Total Amiodarone: 0 mg</text>
    //             <text style="width:50%;">Total Lipid Bolus: ${
    //               global.pdfdata.weight * 1.5
    //             } mL</text>
    //         </div>`;
    // }
    datahtml += `
        </div>
        <div style="justify-content: center;padding: 10px;">
          <table style="border-collapse: collapse;  font-family: Arial, Helvetica, sans-serif; width: 100%;">
      <tr>
        <th style="
    font-weight:600;
    padding: 20px;
    border: 1px solid #000;
  text-align: center;
  background-color: #657C94;
  color: white;
  width:20%;
  ">Event Time</th>
        <th style="
     padding: 20px;
     font-weight:600;
     padding-top: 12px;
  padding-bottom: 12px;
  padding-left: 20px;
  text-align: left;
  background-color: #657C94;
  border: 1px solid #000;
  color: white;">Event Description</th>
        <th style="
    padding-top: 12px;
     padding: 20px;
     font-weight:600;
  padding-bottom: 12px;
  padding-right:10px;
  text-align: left;
  border: 1px solid #000;
  background-color: #657C94;
  color: white;
  width:20%;
  ">Event Type</th>
      </tr>`;
    datahtml += `
      <tr style="padding:10;">
        <td style="  border: 1px solid #000; padding:10px;  text-align: center;padding-right:40px;">${timeformats(
          global.pdfdata.eventstart_time,
        )}</td>
        <td style="  border: 1px solid #000;padding: 10px;">Open LAST app.</td>
        <td style="  border: 1px solid #000;padding: 10px;">Info</td>
      </tr>`;
    datahtml += `
      <tr style="padding: 10;">
        <td style="  border: 1px solid #000;background-color: #D1D9EC; padding: 10px; text-align: center;padding-right:40px;">${timeformats(
          global.pdfdata.eventstart_time,
        )}</td>
        <td style="  border: 1px solid #000;background-color: #D1D9EC;padding: 10px;">LAST Management Begin.</td>
        <td style="  border: 1px solid #000;background-color: #D1D9EC;padding: 10px;">Info</td>
      </tr>`;
    if (global.pdfdata.stopinjection) {
      datahtml += `
        <tr style="padding: 10;">
          <td style="  border: 1px solid #000;padding: 10px; text-align: center;padding-right:40px;">${timeformats(
            global.pdfdata.stopinjection_time,
          )}</td>
          <td style="  border: 1px solid #000;padding: 10px;">Injection was stopped.</td>
          <td style="  border: 1px solid #000;padding: 10px;">Drug</td>
        </tr>`;
    }
    if (global.pdfdata.gethelp) {
      datahtml += `
      <tr style="padding: 10;">
        <td style="background-color: #D1D9EC;padding: 10px;  border: 1px solid #000;text-align: center;padding-right:40px;">${timeformats(
          global.pdfdata.gethelp_time,
        )}</td>
        <td style="background-color: #D1D9EC;padding: 10px;  border: 1px solid #000;">Help was sought.</td>
        <td style="background-color: #D1D9EC;padding: 10px;  border: 1px solid #000;">Info</td>
      </tr>`;
    }
    if (global.pdfdata.lastrescuekit) {
      datahtml += `
      <tr style="padding: 10;">
        <td style="padding: 10px;  border: 1px solid #000;text-align: center;padding-right:40px;">${timeformats(
          global.pdfdata.lastrescuekit_time,
        )}</td>
        <td style="padding: 10px;  border: 1px solid #000;">LAST Rescue Kit requested.</td>
        <td style="padding: 10px;  border: 1px solid #000;">Info</td>
      </tr>`;
    }
    if (global.pdfdata.lipidemusion) {
      datahtml += `
      <tr style="padding: 10;">
        <td style="background-color: #D1D9EC;padding: 10px;  border: 1px solid #000;text-align: center;padding-right:40px;">${timeformats(
          global.pdfdata.lipidemusion_time,
        )}</td>
        <td style="background-color: #D1D9EC;padding: 10px;  border: 1px solid #000;">Lipid emulsion considered.</td>
        <td style="background-color: #D1D9EC;padding: 10px;  border: 1px solid #000;">Info</td>
      </tr>`;
    }
    if (global.pdfdata.cpbypassteam) {
      datahtml += `
      <tr style="padding: 10;">
        <td style="padding:10px;  border: 1px solid #000;text-align: center;padding-right:40px;">${timeformats(
          global.pdfdata.cpbypassteam_time,
        )}</td>
        <td style="padding: 10px;  border: 1px solid #000;">CP Bypass alerted.</td>
        <td style="padding: 10px;  border: 1px solid #000;">Info</td>
      </tr>`;
    }
    if (global.pdfdata.cardiacarrest) {
      datahtml += `
      <tr style="padding:10;">
        <td style="background-color: #D1D9EC;padding: 10px;  border: 1px solid #000;text-align: center;padding-right:40px;">${timeformats(
          global.pdfdata.cardiacarrest_time,
        )}</td>
        <td style="background-color: #D1D9EC;padding: 10px;  border: 1px solid #000;">User acknowledged that LAST resuscitation is different from other ACLS
        scenarios.</td>
        <td style="background-color: #D1D9EC;padding: 10px;  border: 1px solid #000;">Info</td>
      </tr>`;
    }
    // if (global.pdfdata.lipidemusion) {
    datahtml += `
      <tr style="padding:10px;">
        <td style="padding: 10px;  border: 1px solid #000;text-align: center;padding-right:40px;">${timeformats(
          global.pdfdata.stopinjection_time,
        )}</td>
        <td style="padding: 10px;  border: 1px solid #000;">Pulsatile selected.</td>
        <td style="padding:10px;  border: 1px solid #000;">Vitals</td>
      </tr>`;
    // }

    if (global.pdfdata.airwaymanagement) {
      datahtml += `
      <tr style="padding: 10px;">
        <td style="background-color: #D1D9EC;padding: 10px; border: 1px solid #000;text-align: center;padding-right:40px;">${timeformats(
          global.pdfdata.airwaymanagement_time,
        )}</td>
        <td style="background-color: #D1D9EC;padding: 10px;border: 1px solid #000;">Airway management completed.</td>
        <td style="background-color: #D1D9EC;padding: 10px;border: 1px solid #000;">Airway</td>
      </tr>`;
    }
    if (global.pdfdata.seizuresuppression) {
      datahtml += `
      <tr style="padding: 10px;">
        <td style="padding: 10px;border: 1px solid #000;text-align: center;padding-right:40px;">${timeformats(
          global.pdfdata.seizuresuppression_time,
        )}</td>
        <td style="padding: 10px;border: 1px solid #000;">Gave propofol for seizure suppression because it was the only option
          available.</td>
        <td style="padding: 10px;border: 1px solid #000;">Drug</td>
      </tr>`;
    }
    if (global.pdfdata.considerlipidtheory) {
      datahtml += `
      <tr style="padding: 10px;">
        <td style="border: 1px solid #000;background-color: #D1D9EC;padding: 10px;text-align: center;padding-right:40px;">${timeformats(
          global.pdfdata.considerlipidtheory_time,
        )}</td>
        <td style="border: 1px solid #000;background-color: #D1D9EC;padding:10px;">Lipid Infusion marked as started.</td>
        <td style="border: 1px solid #000;background-color: #D1D9EC;padding: 10px;">Fluid</td>
      </tr>`;
    }
    if (global.pdfdata.considerbradycardiatreatment) {
      datahtml += `
      <tr style="padding: 10px;">
        <td style="border: 1px solid #000;padding: 10px;text-align: center;padding-right:40px;">${timeformats(
          global.pdfdata.considerbradycardiatreatment_time,
        )}</td>
        <td style="border: 1px solid #000;padding: 10px;">Patient exhibiting Bradycardia.</td>
        <td style="border: 1px solid #000;padding: 10px;">Vitals</td>
      </tr>`;
    }
    if (global.pdfdata.atropine) {
      datahtml += `
      <tr style="padding:10px;">
        <td style="border: 1px solid #000;background-color: #D1D9EC;padding: 10px;text-align: center;padding-right:40px;">${timeformats(
          global.pdfdata.atropine_time,
        )}</td>
        <td style="border: 1px solid #000;background-color: #D1D9EC;padding: 10px;">Atropine given.</td>
        <td style="border: 1px solid #000;background-color: #D1D9EC;padding: 10px;">Drug</td>
      </tr>`;
    }
    if (global.pdfdata.considerhypotensiontreatment) {
      datahtml += `
      <tr style="padding:10px;">
        <td style="border: 1px solid #000;padding: 10px;text-align: center;padding-right:40px;">${timeformats(
          global.pdfdata.considerhypotensiontreatment_time,
        )}</td>
        <td style="border: 1px solid #000;padding: 10px;">Hypotension treatment considered.</td>
        <td style="border: 1px solid #000;padding: 10px;">Info</td>
      </tr>`;
    }
    if (global.pdfdata.treathypotension) {
      datahtml += `
      <tr style="padding: 10px;">
        <td style="border: 1px solid #000;background-color: #D1D9EC;padding: 10px;text-align: center;padding-right:40px;">${timeformats(
          global.pdfdata.treathypotension_time,
        )}</td>
        <td style="border: 1px solid #000;background-color: #D1D9EC;padding:10px;">Hypotension treated. </td>
        <td style="border: 1px solid #000;background-color: #D1D9EC;padding: 10px;">Info</td>
      </tr>`;
    }
    // if (global.pdfdata.considerbradycardiatreatment) {
    datahtml += `
        <tr style="padding: 10px;">
        <td style="border: 1px solid #000;padding: 10px;text-align: center;padding-right:40px;">${timeformats(
          global.pdfdata.eventend_time,
        )}</td>
        <td style="border: 1px solid #000;padding: 10px;">End Event pressed. </td>
        <td style="border: 1px solid #000;padding: 10px;">Info</td>
      </tr>`;
    // }
    if (global.pdfdata.patientunstable) {
      datahtml += `
      <tr style="padding: 10px;">
        <td style="border: 1px solid #000;background-color: #D1D9EC;padding: 10px;text-align: center;padding-right:40px;">${timeformats(
          global.pdfdata.patientunstable_time,
        )}</td>
        <td style="border: 1px solid #000;background-color: #D1D9EC;padding:10px;">Patient stable.</td>
        <td style="border: 1px solid #000;background-color: #D1D9EC;padding: 10px;">Info</td>
      </tr>`;
    }

    datahtml += `
      </table>
              </div>
      </div>
            
        
      </body>
      </html>`;
    let options = {
      html: datahtml,
      fileName: 'Health Report', // + new Date().toISOString(),
      directory: 'Documents',
    };

    let file = await RNHTMLtoPDF.convert(options);
    setpdfData(file.filePath);
    console.log(file.filePath);
    // alert(file.filePath);
  };

  useEffect(() => {
    // Initialization code comes here
    setData();
  }, []);

  function setData() {
    setEventType(true);
    if (Platform.OS === 'ios') {
      setMailText(
        'The email has a PDF attachment that is a summary report for an ASRA LAST treatment session as recorded by the ASRA LAST iOS app.',
      );
    } else {
      setMailText(
        'The email has a PDF attachment that is a summary report for an ASRA LAST treatment session as recorded by the ASRA LAST Android app.',
      );
    }
  }

  {
    /* Button Method */
  }
  const onBackClicked = () => {
    Linking.openURL('file://' + pdfData);
    // navigation.goBack();
  };

  const onDoneClicked = () => {
    navigation.navigate('HomeScreen');
  };

  const onFullChecklistClick = () => {
    navigation.navigate('FullchecklistScreen');
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

  const onCloseEventTypeButtonClicked = () => {
    setActual(require('../../images/radioInactive.png'));
    setTrialApp(require('../../images/radioInactive.png'));
    setSimulation(require('../../images/radioInactive.png'));
    setEventType(false);
  };

  const onActualButtonClicked = () => {
    global.pdfdata.clinicalevent = true;
    global.pdfdata.clinicalevent_time = new Date();
    setActual(require('../../images/radioActive.png'));
    setTrialApp(require('../../images/radioInactive.png'));
    setSimulation(require('../../images/radioInactive.png'));

    const timeout = setTimeout(() => {
      setEventType(false);
      setActual(require('../../images/radioInactive.png'));
      setTrialApp(require('../../images/radioInactive.png'));
      setSimulation(require('../../images/radioInactive.png'));
      setLipidAlert(true);
    }, 500);
  };

  const onTrialButtonClicked = () => {
    global.pdfdata.trailapp = true;
    global.pdfdata.trailapp_time = new Date();
    setActual(require('../../images/radioInactive.png'));
    setTrialApp(require('../../images/radioActive.png'));
    setSimulation(require('../../images/radioInactive.png'));

    const timeout = setTimeout(() => {
      setEventType(false);
      setActual(require('../../images/radioInactive.png'));
      setTrialApp(require('../../images/radioInactive.png'));
      setSimulation(require('../../images/radioInactive.png'));
    }, 500);
  };

  const onSimulationButtonClicked = () => {
    global.pdfdata.simulationlabscanario = true;
    global.pdfdata.simulationlabscanario_time = new Date();
    setActual(require('../../images/radioInactive.png'));
    setTrialApp(require('../../images/radioInactive.png'));
    setSimulation(require('../../images/radioActive.png'));

    const timeout = setTimeout(() => {
      setEventType(false);
      setActual(require('../../images/radioInactive.png'));
      setTrialApp(require('../../images/radioInactive.png'));
      setSimulation(require('../../images/radioInactive.png'));
    }, 500);
  };

  const onCloseLipidButton = () => {
    setLipidAlert(false);
  };

  const onYesLipidButton = () => {
    setLipidAlert(false);
    navigation.navigate('SubmitLipidRescueScreen');
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
              <Text style={styles.leftTopTitle}>Preview PDF</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.rightTopButton}
            onPress={() => onDoneClicked()}>
            <Text style={styles.rightTopTitle}>Done</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.mainText}>Generate Report</Text>

        {/* Main Container*/}
        <View style={styles.mainContainer}>
          {/* List Container*/}
          {/* pdfData && (
            <View>
              <Pdf
                source={{uri: 'file://' + pdfData}}
                onLoadComplete={(numberOfPages, filePath) => {
                  console.log(`Number of pages: ${numberOfPages}`);
                }}
                onPageChanged={(page, numberOfPages) => {
                  console.log(`Current page: ${page}`);
                }}
                onError={error => {
                  console.log(error);
                }}
                onPressLink={uri => {
                  console.log(`Link pressed: ${uri}`);
                }}
                style={{
                  flex: 1,
                  width: Dimensions.get('window').width,
                  height: Dimensions.get('window').height / 2,
                }}
              />
            </View>
              ) */}
          {/* List 1 */}
          <View
            style={[
              styles.listViewContainer,
              {marginTop: Platform.OS === 'ios' ? 80 : 50},
            ]}>
            <TouchableOpacity
              style={styles.listViewButton}
              onPress={
                () =>
                  Mailer.mail(
                    {
                      subject: 'ASRA LAST Session Report',
                      recipients: ['guyw@uic.edu'],
                      body: mailText,
                      isHTML: true,
                      attachments: [
                        {
                          path: pdfData, // The absolute path of the file from which to read data.
                          uri: pdfData, // The uri of the file from which to read the data.
                          type: 'pdf', // Mime Type: jpg, png, doc, ppt, html, pdf, csv
                        },
                      ],
                    },
                    (error, event) => {
                      // Alert.alert(
                      //   error,
                      //   event,
                      //   [
                      //     {
                      //       text: 'Ok',
                      //       onPress: () =>
                      //         console.log('OK: Email Error Response'),
                      //     },
                      //     {
                      //       text: 'Cancel',
                      //       onPress: () =>
                      //         console.log('CANCEL: Email Error Response'),
                      //     },
                      //   ],
                      //   {cancelable: true},
                      // );
                    },
                  )
                // Linking.openURL(
                //   `mailto:support@example.com?subject=ASRA LAST Session Report&body=${mailText}`,
                // )
              }
              title="ASRA LAST Session Report">
              <Text style={styles.listViewText}>Email PDF</Text>
            </TouchableOpacity>
          </View>

          {/* List 2 */}
          <View style={[styles.listViewContainer, {marginTop: 25}]}>
            <TouchableOpacity
              style={styles.listViewButton}
              onPress={() => onShare()}>
              <Text style={styles.listViewText}>Save PDF to Device</Text>
            </TouchableOpacity>
          </View>

          {/* List 3 */}
          <View style={[styles.listViewContainer, {marginTop: 25}]}>
            <TouchableOpacity
              style={styles.listViewButton}
              onPress={() => {
                navigation.navigate('SubmitLipidRescueScreen');
              }}>
              <Text style={styles.listViewText}>Report to Lipid Rescue</Text>
            </TouchableOpacity>
          </View>

          {/* List 4 */}
          <View style={[styles.listViewContainer, {marginTop: 25}]}>
            <TouchableOpacity
              style={styles.listViewButton}
              onPress={() => onFullChecklistClick()}>
              <Text style={styles.listViewText}>Full Checklist</Text>
            </TouchableOpacity>
          </View>

          {/* List 5 */}
          <View style={[styles.listViewContainer, {marginTop: 25}]}>
            <TouchableOpacity
              style={styles.listViewButton}
              onPress={() => Linking.openURL('https://www.asra.com/')}>
              <Text style={styles.listViewText}>
                Get Checklist for Free at ASRA.com
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* EventType Alert */}
        {isEventType ? (
          <View position="absolute" style={styles.popUpBgView}>
            <View style={[styles.popUpSmallBg, {height: 350}]}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => onCloseEventTypeButtonClicked()}>
                <Image
                  source={require('../../images/cancel.png')}
                  style={styles.popUpClose}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <Text
                style={[
                  styles.popUpMainHeader,
                  {textAlign: 'left', marginTop: 20},
                ]}>
                Select Event Type
              </Text>

              <Text
                style={[
                  styles.popUpTitle,
                  {
                    fontWeight: '500',
                    fontSize: 16,
                    marginTop: Platform.OS === 'ios' ? 35 : 25,
                    color: 'black',
                  },
                ]}>
                Please select how you were using the app during this event.
              </Text>

              <View>
                <TouchableOpacity
                  style={[
                    styles.radioContainer,
                    {marginTop: Platform.OS === 'ios' ? 30 : 20},
                  ]}
                  onPress={() => {
                    onActualButtonClicked();
                  }}>
                  <Image source={isActual} style={styles.radioActiveInActive} />

                  <View style={{marginLeft: 10}}>
                    <Text
                      style={{fontSize: 15, color: COLORS.BackgroundColorPink}}>
                      Actual Clinical Event
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View>
                <TouchableOpacity
                  style={[styles.radioContainer, {marginTop: 10}]}
                  onPress={() => {
                    onTrialButtonClicked();
                  }}>
                  <Image
                    source={isTrialApp}
                    style={styles.radioActiveInActive}
                  />

                  <View style={{marginLeft: 10}}>
                    <Text
                      style={{fontSize: 15, color: COLORS.BackgroundColorPink}}>
                      Trial of App
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View>
                <TouchableOpacity
                  style={[styles.radioContainer, {marginTop: 10}]}
                  onPress={() => {
                    onSimulationButtonClicked();
                  }}>
                  <Image
                    source={isSimulation}
                    style={styles.radioActiveInActive}
                  />

                  <View style={{marginLeft: 10}}>
                    <Text
                      style={{fontSize: 15, color: COLORS.BackgroundColorPink}}>
                      Simulation Lab Scenario
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : null}

        {/* Lipid Alert */}
        {isLipidAlert ? (
          <View position="absolute" style={styles.popUpBgView}>
            <View style={[styles.popUpSmallBg, {height: Platform.OS === 'ios' ? 420 : 430}]}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => onCloseLipidButton()}>
                <Image
                  source={require('../../images/cancel.png')}
                  style={styles.popUpClose}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <Text
                style={[
                  styles.popUpMainHeader,
                  {textAlign: 'center', marginTop: 20},
                ]}>
                Send to LipidRescue.org?
              </Text>
              <Text
                style={[
                  styles.popUpTitle,
                  {
                    fontSize: 17,
                    marginTop: Platform.OS === 'ios' ? 35 : 25,
                    textAlign: 'center',
                    color: 'black',
                  },
                ]}>
                Would you like to send this report to LipidRescue.org?
              </Text>
              <Text
                style={[
                  styles.popUpTitle,
                  {
                    fontSize: 17,
                    marginTop: 20,
                    textAlign: 'center',
                    color: 'black',
                  },
                ]}>
                All user-identifying information will be removed.
              </Text>

              <TouchableOpacity
                activeOpacity={0.5}
                style={[
                  styles.popUpPinkButton,
                  {marginTop: Platform.OS === 'ios' ? 35 : 25},
                ]}
                onPress={() => onYesLipidButton()}>
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
                onPress={() => onCloseLipidButton()}>
                <Text style={[styles.popUpButtonText, {color: 'white'}]}>
                  NO
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
    width: 120,
    height: 25,
    justifyContent: 'flex-start',
    marginTop: Platform.OS === 'ios' ? 40 : 0,
    marginLeft: 15,
  },

  leftTopButton: {
    width: 120,
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
    width: 60,
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
    fontSize: 30,
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
    borderRadius: 5,
    shadowColor: 'gray',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 0.5,
    elevation: 10,
    alignItems: 'center',
  },

  listViewButton: {
    flexDirection: 'row',
    height: 80,
    alignItems: 'center',
  },

  listViewText: {
    fontWeight: '500',
    marginLeft: 10,
    fontSize: 16,
    color: COLORS.BackgroundColorPink,
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
    fontSize: 23,
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
});
export default GenerateReportScreen;
