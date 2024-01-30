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
  Alert,
  ImageBackground,
  TextInput,
  ActivityIndicator,
  Keyboard,
  ScrollView,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
// import SegmentedControlTab from 'react-native-segmented-control-tab';
import {COLORS} from '../../styles/GlobalColor';
import Toast from 'react-native-simple-toast';
import GlobalAwesomeAlert from '../../components/GlobalAwesomeAlert';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Mailer from 'react-native-mail';
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const listWidth = deviceWidth - 60;

const SubmitLipidRescueScreen = ({navigation, route}) => {
  const [loading, setloading] = useState(false);
  const [message, setmessage] = useState('');
  const [visibleAlert, setShowAlert] = useState(false);
  const [age, setAge] = useState('');
  const [ageerror, setageerror] = useState(null);
  const [block, setBlock] = useState('');
  const [blockerror, setblockerror] = useState(null);
  const [local, setLocal] = useState('');
  const [localerror, setlocalerror] = useState(null);
  const [additives, setAdditives] = useState('');
  const [additiveserror, setadditiveserror] = useState(null);
  const [volume, setVolume] = useState('');
  const [volumeerror, setvolumeerror] = useState(null);
  const [name, setName] = useState('');
  const [nameerror, setnameerror] = useState(null);
  const [email, setEmail] = useState('');
  const [emailerror, setemailerror] = useState(null);
  const [instruction, setInstruction] = useState('');
  const [instructionerror, setinstructionerror] = useState(null);
  const [selectedAgeIndex, setSelectedAgeIndex] = useState(0);
  const [selectedAsaClassIndex, setSelectedAsaClassIndex] = useState(0);
  const [selectedTimeIndex, setSelectedTimeIndex] = useState(0);
  const [genderType, setgenderType] = useState('');
  const [genderTypeerror, setgenderTypeerror] = useState(null);
  const [pulmonaryType, setpulmonaryType] = useState('');
  const [pulmonaryTypeerror, setpulmonaryTypeerror] = useState(null);
  const [cardiacType, setcardiacType] = useState('');
  const [cardiacTypeerror, setcardiacTypeerror] = useState(null);
  const [RenalType, setRenalType] = useState('');
  const [RenalTypeerror, setRenalTypeerror] = useState(null);
  const [nerveType, setnerveType] = useState('');
  const [nerveTypeerror, setnerveTypeerror] = useState(null);
  const [ultrasoundType, setultrasoundType] = useState('');
  const [ultrasoundTypeerror, setultrasoundTypeerror] = useState(null);
  const [ageType, setageType] = useState('');
  const [ageTypeerror, setageTypeerror] = useState(null);
  const [asaclassType, setasaclass] = useState('');
  const [asaclassTypeerror, setasaclassTypeerror] = useState(null);
  const [ones, setones] = useState(true);
  const [twos, settwos] = useState(false);
  const [threes, setthrees] = useState(false);
  const [fours, setfours] = useState(false);
  const [fives, setfives] = useState(false);
  const [sixs, setsixs] = useState(false);
  const [timeType, settimeType] = useState('');
  const [timeTypeerror, settimeTypeerror] = useState(null);
  const [asaClassType, setasaClassType] = useState('');
  const [asaClassTypeerror, setasaClassTypeerror] = useState(null);
  const [agetimeone, setagetimeone] = useState(true);
  const [agetimetwo, setagetimetwo] = useState(false);
  const [agetimethree, setagetimethree] = useState(false);
  const [blockones, setblockones] = useState(true);
  const [blocktwos, setblocktwos] = useState(false);
  const [blockthrees, setblockthrees] = useState(false);
  const [blockfours, setblockfours] = useState(false);
  const [blockfives, setblockfives] = useState(false);
  const [male, setMale] = useState(require('../../images/radioInactive.png'));
  const [female, setFemale] = useState(
    require('../../images/radioInactive.png'),
  );

  const [emergency, setEmergency] = useState(
    require('../../images/radioInactive.png'),
  );
  const [nonEmergency, setNonEmergency] = useState(
    require('../../images/radioInactive.png'),
  );

  const [pulmonaryYes, setPulmonaryYes] = useState(
    require('../../images/radioInactive.png'),
  );
  const [pulmonaryNo, setPulmonaryNo] = useState(
    require('../../images/radioInactive.png'),
  );

  const [cardiacYes, setCardiacYes] = useState(
    require('../../images/radioInactive.png'),
  );
  const [cardiacNo, setCardiacNo] = useState(
    require('../../images/radioInactive.png'),
  );

  const [renalYes, setRenalYes] = useState(
    require('../../images/radioInactive.png'),
  );
  const [renalNo, setRenalNo] = useState(
    require('../../images/radioInactive.png'),
  );

  const [simulatorYes, setSimulatorYes] = useState(
    require('../../images/radioInactive.png'),
  );
  const [simulatorNo, setSimulatorNo] = useState(
    require('../../images/radioInactive.png'),
  );

  const [ultrasoundYes, setUltrasoundYes] = useState(
    require('../../images/radioInactive.png'),
  );
  const [ultrasoundNo, setUltrasoundNo] = useState(
    require('../../images/radioInactive.png'),
  );

  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  {
    /* Use Effect */
  }
  useEffect(() => {
    const unsubscribe = navigation.addListener(
      'focus',
      () => {
        setSelectedAgeIndex(0);
        setSelectedAsaClassIndex(0);
        setSelectedTimeIndex(0);

        // console.log('selectedAgeIndex:::::' + selectedAgeIndex);
        // console.log('selectedAsaClassIndex:::::' + selectedAsaClassIndex);
        // console.log('selectedTimeIndex:::::' + selectedTimeIndex);
      },
      [navigation],
    );

    return unsubscribe;
  }, [navigation]);
  const [pdfData, setpdfData] = useState([]);
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

  const submitFun = () => {
    var emailValue =
      /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    var done = true;
    if (!age || age == '') {
      setageerror('Please select patient age field');
      done = false;
    }
    if (!ageType || ageType == '') {
      setageTypeerror('please select age type');
      done = false;
    }
    if (!genderType || genderType == '') {
      setgenderTypeerror('please select gender type');
      done = false;
    }
    if (!asaclassType || asaclassType == '') {
      setasaclassTypeerror('please select asa type');
      done = false;
    }
    if (!asaClassType || asaClassType == '') {
      setasaClassTypeerror('please select asa emergency type');
      done = false;
    }
    if (!genderType || genderType == '') {
      setgenderTypeerror('please select gender type');
      done = false;
    }
    if (!pulmonaryType || pulmonaryType == '') {
      setpulmonaryTypeerror('please select pulmonary type');
      done = false;
    }
    if (!cardiacType || cardiacType == '') {
      setcardiacTypeerror('please select cardiac type');
      done = false;
    }
    if (!RenalType || RenalType == '') {
      setRenalTypeerror('please select renal type');
      done = false;
    }
    if (!block || block == '') {
      setblockerror('please select block field');
      done = false;
    }
    if (!local || local == '') {
      setlocalerror('please select local anesthetic field.');
      done = false;
    }
    if (!additives || additives == '') {
      setadditiveserror('please select additives field.');
      done = false;
    }
    if (!volume || volume == '') {
      setvolumeerror('please select volume field.');
      done = false;
    }
    if (!nerveType || nerveType == '') {
      setnerveTypeerror('please select nerve stimulator field.');
      done = false;
    }
    if (!ultrasoundType || ultrasoundType == '') {
      setultrasoundTypeerror('please select ultrasound field.');
      done = false;
    }
    if (!timeType || timeType == '') {
      settimeTypeerror('please select time b/w block and arrest field.');
      done = false;
    }
    if (!name || name == '') {
      setnameerror('please select name field.');
      done = false;
    }
    if (!instruction || instruction == '') {
      setinstructionerror('please select instruction field.');
      done = false;
    }
    if (!email || email == '') {
      setemailerror('please select email field.');
      done = false;
    }
    if (!emailValue.test(email)) {
      setemailerror('please enter correct email');
      return;
    } else {
      setemailerror(null);
    }
    if (done) {
      createPDF();
      navigation.goBack();
    } else {
      Toast.showWithGravity(
        'Please insert all required fields',
        Toast.LONG,
        Toast.TOP,
      );
    }
    Keyboard.dismiss();
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
      </table>`;
    datahtml += `
    <div style="padding:40; padding-Top: 50px; margin-top: 150px;justify-content:center">
          <h3 style="text-align: center;">Additional Information</h3>
          <div style="display: flex; justify-content:space-evenly">
              <text style="width: 50%; text-align: left">Patient Age - </text>
              <text style="width: 50%; text-align: left; padding-left: 5px"> ${
                age + ' ' + ageType
              }</text>
          </div>
          <div style="display: flex; justify-content:space-evenly">
              <text style="width: 50%; text-align: left">Gender - </text>
              <text style="width: 50%; text-align: left; padding-left: 5px">${genderType}</text>
          </div>
          <div style="display: flex; justify-content:center;">
              <text style="width: 50%; text-align: left">ASA Class - </text>
              <text style="width: 50%; text-align: left; padding-left: 5px">${
                asaclassType + ' ' + asaClassType
              }</text>
          </div>
          <div style="display: flex; justify-content:space-evenly">
              <text style="width: 50%; text-align: left">Pulmonary Disease - </text>
              <text style="width: 50%; text-align: left; padding-left: 5px">${pulmonaryType}</text>
          </div>
          <div style="display: flex; justify-content:space-evenly">
              <text style="width: 50%; text-align: left">Cardiac Disease - </text>
              <text style="width: 50%; text-align: left; padding-left: 5px">${cardiacType}</text>
          </div>
          <div style="display: flex; justify-content:space-evenly">
              <text style="width: 50%; text-align: left">Renal Disease - </text>
              <text style="width: 50%; text-align: left; padding-left: 5px">${RenalType}</text>
          </div>
          <div style="display: flex; justify-content:space-evenly"> 
              <text style="width: 50%; text-align: left">Block Being Performed - </text>
              <text style="width: 50%; text-align: left; padding-left: 5px">${block}</text>
          </div>
          <div style="display: flex; justify-content:space-evenly"> 
              <text style="width: 50%; text-align: left">žLocal Anesthic Used - </text>
              <text style="width: 50%; text-align: left; padding-left: 5px">${local}</text>
          </div>
          <div style="display: flex; justify-content:space-evenly">
              <text style="width: 50%; text-align: left">Addictives - </text>
              <text style="width: 50%; text-align: left; padding-left: 5px">${additives}</text>
          </div>
          <div style="display: flex; justify-content:space-evenly">
              <text style="width: 50%; text-align: left">Volume of local anesthic given - </text>
              <text style="width: 50%; text-align: left; padding-left: 5px">${volume}</text>
          </div>
          <div style="display: flex; justify-content:space-evenly">
          <text style="width: 50%; text-align: left">Nerve stimulator being used - </text>
              <text style="width: 50%; text-align: left; padding-left: 5px">${nerveType}</text>
          </div>
          <div style="display: flex; justify-content:space-evenly">
              <text style="width: 50%; text-align: left">Ultrasound being used - </text>
              <text style="width: 50%; text-align: left; padding-left: 5px">${ultrasoundType}</text>
          </div>
          <div style="display: flex; justify-content:space-evenly">
              <text style="width: 50%; text-align: left">Time between block and arrest - </text>
              <text style="width: 50%; text-align: left; padding-left: 5px">${timeType}</text>
          </div>
          <h5 style="text-align: center;">Contact Information</h5>
          <div style="display: flex; justify-content:space-evenly">
              <div style="width: 28%;">
                  <text style="width: 50%; text-align: right">Name - </text>
                  <text style="width: 50%; text-align: left; padding-left: 5px">${name}</text>
              </div>
              <div style="width: 28%;">
                  <text style="width: 50%; text-align: right">Instruction - </text>
                  <text style="width: 50%; text-align: left; padding-left: 5px">${instruction}</text>
              </div>
              <div style="width: 43%;">
                  <text style="width: 50%; text-align: right">Email Address - </text>
                  <text style="width: 50%; text-align: left; padding-left: 5px">${email}</text>
              </div>
          </div>
        </div>
              </div>
      </div>
            
        
      </body>
      </html>`;
    let options = {
      html: datahtml,
      fileName: 'Health Report Lipid', // + new Date().toISOString(),
      directory: 'Documents',
    };

    let file = await RNHTMLtoPDF.convert(options);
    setpdfData(file.filePath);
    console.log(file.filePath);
    setTimeout(() => {
      Mailer.mail(
        {
          subject: 'ASRA LAST Session Report',
          recipients: ['guyw@uic.edu'],
          ccRecipients: [email],
          body: 'The email has a PDF attachment that is a summary report for an ASRA LAST treatment session as recorded by the ASRA LAST iOS app.',
          isHTML: true,
          attachments: [
            {
              path: file.filePath, // The absolute path of the file from which to read data.
              uri: file.filePath, // The uri of the file from which to read the data.
              type: 'pdf', // Mime Type: jpg, png, doc, ppt, html, pdf, csv
            },
          ],
        },
        (error, event) => {
          Toast.showWithGravity('Something went wrong.', Toast.LONG, Toast.TOP);
          // Alert.alert(
          //   error,
          //   event,
          //   [
          //     {
          //       text: 'Ok',
          //       onPress: () => console.log('OK: Email Error Response'),
          //     },
          //     {
          //       text: 'Cancel',
          //       onPress: () => console.log('CANCEL: Email Error Response'),
          //     },
          //   ],
          //   {cancelable: true},
          // );
        },
      );
    }, 1000);
  };

  const submitRescueData = () => {
    setloading(true);
    fetch('http://44.195.249.110/api/lipid-rescue-data/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        patient_age: age,
        age_in: ageType,
        patient_gender: genderType,
        asa_class: asaclassType,
        asa_class_type: asaClassType,
        pulmonary_disease: pulmonaryType,
        cardiac_disease: cardiacType,
        renal_disease: RenalType,
        block_performed: block,
        local_anesthetic: local,
        additives: additives,
        volume_local_anesthetic: volume,
        nerve_stimular: nerveType,
        ultrasound_used: ultrasoundType,
        time_btw_block_arrest: timeType,
        name: name,
        institution: instruction,
        email: email,
      }),
    })
      .then(response => response.json())
      .then(response => {
        if (response) {
          Toast.showWithGravity(
            'Lipid rescue data is updates sucessfully',
            Toast.LONG,
            Toast.TOP,
          );
          navigation.goBack();
          setloading(false);
          console.log('response lipid data', JSON.stringify(response));
        } else {
          Toast.showWithGravity('Something went wrong', Toast.LONG, Toast.TOP);
          setloading(false);
        }
      })
      .catch(function (error) {
        setloading(false);
        Toast.showWithGravity(
          'There has been a problem with your fetch operation: ' +
            error.message,
          Toast.LONG,
          Toast.TOP,
        );
        console.log(
          'There has been a problem with your fetch operation: ' +
            error.message,
        );
        throw error;
      });
  };

  {
    /* Alert */
  }
  function showAlert() {
    setShowAlert(true);
  }

  hideAlert = () => {
    setShowAlert(false);
  };

  {
    /* Tab Method */
  }
  const handleAgeTabsChange = index => {
    setSelectedAgeIndex(index);
  };

  const handleAsaClassTabsChange = index => {
    setSelectedAsaClassIndex(index);
  };

  const handleTimeTabsChange = index => {
    setSelectedTimeIndex(index);
  };

  {
    /* Button Method */
  }
  const onBackClicked = () => {
    navigation.goBack();
  };

  const onGenderMaleButtonClicked = () => {
    setMale(require('../../images/radioActive.png'));
    setFemale(require('../../images/radioInactive.png'));
  };

  const onGenderFemaleButtonClicked = () => {
    setMale(require('../../images/radioInactive.png'));
    setFemale(require('../../images/radioActive.png'));
  };

  const onEmergencyButtonClicked = () => {
    setEmergency(require('../../images/radioActive.png'));
    setNonEmergency(require('../../images/radioInactive.png'));
  };

  const onNonEmergencyButtonClicked = () => {
    setEmergency(require('../../images/radioInactive.png'));
    setNonEmergency(require('../../images/radioActive.png'));
  };

  const onPulmonaryYesButtonClicked = () => {
    setPulmonaryYes(require('../../images/radioActive.png'));
    setPulmonaryNo(require('../../images/radioInactive.png'));
  };

  const onPulmonaryNoButtonClicked = () => {
    setPulmonaryYes(require('../../images/radioInactive.png'));
    setPulmonaryNo(require('../../images/radioActive.png'));
  };

  const onCardiacYesButtonClicked = () => {
    setCardiacYes(require('../../images/radioActive.png'));
    setCardiacNo(require('../../images/radioInactive.png'));
  };

  const onCardiacNoButtonClicked = () => {
    setCardiacYes(require('../../images/radioInactive.png'));
    setCardiacNo(require('../../images/radioActive.png'));
  };

  const onRenalYesButtonClicked = () => {
    setRenalYes(require('../../images/radioActive.png'));
    setRenalNo(require('../../images/radioInactive.png'));
  };

  const onRenalNoButtonClicked = () => {
    setRenalYes(require('../../images/radioInactive.png'));
    setRenalNo(require('../../images/radioActive.png'));
  };

  const onNerveYesButtonClicked = () => {
    setSimulatorYes(require('../../images/radioActive.png'));
    setSimulatorNo(require('../../images/radioInactive.png'));
  };

  const onNerveNoButtonClicked = () => {
    setSimulatorYes(require('../../images/radioInactive.png'));
    setSimulatorNo(require('../../images/radioActive.png'));
  };

  const onUltrasoundYesButtonClicked = () => {
    setUltrasoundYes(require('../../images/radioActive.png'));
    setUltrasoundNo(require('../../images/radioInactive.png'));
  };

  const onUltrasoundNoButtonClicked = () => {
    setUltrasoundYes(require('../../images/radioInactive.png'));
    setUltrasoundNo(require('../../images/radioActive.png'));
  };

  const onSubmitClicked = () => {
    console.log('onSubmitFeedbackClicked');
  };

  return (
    <SafeAreaProvider style={styles.container} mode="margin">
      <StatusBar barStyle={'dark-content'} />

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
              <Text style={styles.leftTopTitle}>Back</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.mainText}>
          Submit to Lipid Rescue.org{'\n'}without additional information
        </Text>

        {/* Main Container*/}
        <View style={styles.mainContainer}>
          <KeyboardAwareScrollView
            viewIsInsideTabBar={false}
            enableAutomaticScroll={true}
            enableOnAndroid={true}
            extraHeight={200}
            extraScrollHeight={120}
            style={{
              backgroundColor: 'transparent',
              marginTop: 10,
            }}>
            <View style={styles.scrollViewContainer}>
              <Text style={styles.mainTitle}>ALL INFORMATION IS OPTIONAL!</Text>
              <Text style={styles.subMainTitle}>
                (Scroll to bottom to submit?)?
              </Text>

              {/* Patient Age*/}
              <View
                style={[
                  styles.listViewConatiner,
                  {
                    flexDirection: 'row',
                    marginTop: Platform.OS === 'ios' ? 50 : 40,
                  },
                ]}>
                <View style={{flexDirection: 'column'}}>
                  <Text style={styles.listViewText}>Patient Age</Text>
                  <TextInput
                    style={[styles.textInputStyle, {width: 100}]}
                    value={age}
                    onChangeText={age => {
                      setAge(age);
                      if (age && age != '') {
                        setageerror(null);
                      }
                    }}
                    keyboardType="numbers-and-punctuation"
                    autoCapitalize="none"
                    secureTextEntry={false}
                    returnKeyType="next"
                    blurOnSubmit={true}
                    maxLength={50}
                    placeholder="Age"
                    placeholderTextColor={'gray'}
                  />
                  <View style={[styles.viewDivider, {width: 100}]}></View>
                </View>

                <View style={[styles.viewSegment]}>
                  <TouchableOpacity
                    onPress={() => {
                      setagetimeone(true);
                      setagetimethree(false);
                      setagetimetwo(false);
                      setageType('Yrs');
                      if (ageType || ageType != '') {
                        setageTypeerror(null);
                      }
                    }}
                    style={[
                      styles.Agecontainer,
                      {
                        backgroundColor:
                          agetimeone == true
                            ? COLORS.PowderBlueColor
                            : COLORS.PowderBlueColorWithLowOpactity,
                      },
                    ]}>
                    <Text style={styles.agetypetext}>Yrs</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setagetimetwo(true);
                      setagetimeone(false);
                      setagetimethree(false);
                      setageType('Mos');
                      if (ageType || ageType != '') {
                        setageTypeerror(null);
                      }
                    }}
                    style={[
                      styles.Agecontainer,
                      {
                        backgroundColor:
                          agetimetwo == true
                            ? COLORS.PowderBlueColor
                            : COLORS.PowderBlueColorWithLowOpactity,
                      },
                    ]}>
                    <Text style={styles.agetypetext}>Mos</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setagetimethree(true);
                      setagetimeone(false);
                      setagetimetwo(false);
                      setageType('Dys');
                      if (ageType || ageType != '') {
                        setageTypeerror(null);
                      }
                    }}
                    style={[
                      styles.Agecontainer,
                      {
                        backgroundColor:
                          agetimethree == true
                            ? COLORS.PowderBlueColor
                            : COLORS.PowderBlueColorWithLowOpactity,
                        left: 2,
                      },
                    ]}>
                    <Text style={styles.agetypetext}>Dys</Text>
                  </TouchableOpacity>
                  {/* <SegmentedControlTab
                    values={['Yrs', 'Mos', 'Dys']}
                    selectedIndex={selectedAgeIndex}
                    onTabPress={handleAgeTabsChange}
                    tabStyle={{
                      backgroundColor: COLORS.PowderBlueColorWithLowOpactity,
                      borderColor: 'transparent',
                    }}
                    tabTextStyle={{
                      color: 'white',
                      fontSize: 15,
                      fontWeight: '500',
                    }}
                    activeTabStyle={{backgroundColor: COLORS.PowderBlueColor}}
                    activeTabTextStyle={{color: 'white'}}
                    tabsContainerStyle={{tintColor: 'white'}}
                  />*/}
                </View>
              </View>
              <Text style={styles.errorTxtStyles}>{ageerror}</Text>
              <Text style={styles.errorTxtStyles}>{ageTypeerror}</Text>
              {/* Patient Gender*/}
              <View
                style={[styles.listViewConatiner, {flexDirection: 'column'}]}>
                <Text style={styles.listViewText}>Patient Gender</Text>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    style={styles.radioContainer}
                    onPress={() => {
                      onGenderMaleButtonClicked();
                      setgenderType('Male');
                      if (genderType || genderType != '') {
                        setgenderTypeerror(null);
                      }
                    }}>
                    <Image source={male} style={styles.radioActiveInActive} />
                    <Text style={{fontSize: 15, marginLeft: 10, color: '#000'}}>
                      Male
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.radioContainer, {marginLeft: 30}]}
                    onPress={() => {
                      onGenderFemaleButtonClicked();
                      setgenderType('Female');
                      if (genderType || genderType != '') {
                        setgenderTypeerror(null);
                      }
                    }}>
                    <Image source={female} style={styles.radioActiveInActive} />
                    <Text style={{fontSize: 15, marginLeft: 10, color: '#000'}}>
                      Female
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={{color: 'red', paddingLeft: 25}}>
                {genderTypeerror}
              </Text>
              {/* ASA Classe*/}
              <View style={styles.listViewConatiner}>
                <Text style={styles.listViewText}>ASA Class</Text>
                <View
                  style={{
                    width: deviceWidth - 50,
                    marginTop: 20,
                    height: Platform.OS === 'ios' ? 30 : 40,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignSelf: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      setones(true);
                      setthrees(false);
                      settwos(false);
                      setfours(false);
                      setfives(false);
                      setsixs(false);
                      setasaclass('I');
                      if (asaclassType || asaclassType != '') {
                        setasaclassTypeerror(null);
                      }
                    }}
                    style={[
                      styles.asacontainer,
                      {
                        backgroundColor:
                          ones == true
                            ? COLORS.PowderBlueColor
                            : COLORS.PowderBlueColorWithLowOpactity,
                      },
                    ]}>
                    <Text style={styles.agetypetext}>I</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setones(false);
                      setthrees(false);
                      settwos(true);
                      setfours(false);
                      setfives(false);
                      setsixs(false);
                      setasaclass('II');
                      if (asaclassType || asaclassType != '') {
                        setasaclassTypeerror(null);
                      }
                    }}
                    style={[
                      styles.asacontainer,
                      {
                        backgroundColor:
                          twos == true
                            ? COLORS.PowderBlueColor
                            : COLORS.PowderBlueColorWithLowOpactity,
                      },
                    ]}>
                    <Text style={styles.agetypetext}>II</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setones(false);
                      setthrees(true);
                      settwos(false);
                      setfours(false);
                      setfives(false);
                      setsixs(false);
                      setasaclass('III');
                      if (asaclassType || asaclassType != '') {
                        setasaclassTypeerror(null);
                      }
                    }}
                    style={[
                      styles.asacontainer,
                      {
                        backgroundColor:
                          threes == true
                            ? COLORS.PowderBlueColor
                            : COLORS.PowderBlueColorWithLowOpactity,
                        left: 2,
                      },
                    ]}>
                    <Text style={styles.agetypetext}>III</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setones(false);
                      setthrees(false);
                      settwos(false);
                      setfours(true);
                      setfives(false);
                      setsixs(false);
                      setasaclass('IV');
                      if (asaclassType || asaclassType != '') {
                        setasaclassTypeerror(null);
                      }
                    }}
                    style={[
                      styles.asacontainer,
                      {
                        backgroundColor:
                          fours == true
                            ? COLORS.PowderBlueColor
                            : COLORS.PowderBlueColorWithLowOpactity,
                        left: 2,
                      },
                    ]}>
                    <Text style={styles.agetypetext}>IV</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setones(false);
                      setthrees(false);
                      settwos(false);
                      setfours(false);
                      setfives(true);
                      setsixs(false);
                      setasaclass('V');
                      if (asaclassType || asaclassType != '') {
                        setasaclassTypeerror(null);
                      }
                    }}
                    style={[
                      styles.asacontainer,
                      {
                        backgroundColor:
                          fives == true
                            ? COLORS.PowderBlueColor
                            : COLORS.PowderBlueColorWithLowOpactity,
                        left: 2,
                      },
                    ]}>
                    <Text style={styles.agetypetext}>V</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      setones(false);
                      setthrees(false);
                      settwos(false);
                      setfours(false);
                      setfives(false);
                      setsixs(true);
                      setasaclass('VI');
                      if (asaclassType || asaclassType != '') {
                        setasaclassTypeerror(null);
                      }
                    }}
                    style={[
                      styles.asacontainer,
                      {
                        backgroundColor:
                          sixs == true
                            ? COLORS.PowderBlueColor
                            : COLORS.PowderBlueColorWithLowOpactity,
                        left: 2,
                      },
                    ]}>
                    <Text style={styles.agetypetext}>VI</Text>
                  </TouchableOpacity>

                  {/*<SegmentedControlTab
                    values={['I', 'II', 'III', 'IV', 'V', 'VI']}
                    selectedIndex={selectedAsaClassIndex}
                    onTabPress={handleAsaClassTabsChange}
                    tabStyle={{
                      backgroundColor: COLORS.PowderBlueColorWithLowOpactity,
                      borderColor: 'transparent',
                    }}
                    tabTextStyle={{
                      color: 'white',
                      fontSize: 15,
                      fontWeight: '500',
                    }}
                    activeTabStyle={{backgroundColor: COLORS.PowderBlueColor}}
                    activeTabTextStyle={{color: 'white'}}
                    tabsContainerStyle={{tintColor: 'white'}}
                  />*/}
                </View>
                <Text style={styles.errorTxtStyles}>{asaclassTypeerror}</Text>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    style={styles.radioContainer}
                    onPress={() => {
                      onEmergencyButtonClicked();
                      setasaClassType('Emergency');
                      if (asaClassType || asaClassType != '') {
                        setasaClassTypeerror(null);
                      }
                    }}>
                    <Image
                      source={emergency}
                      style={styles.radioActiveInActive}
                    />
                    <Text style={{fontSize: 15, marginLeft: 10, color: '#000'}}>
                      Emergency
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.radioContainer, {marginLeft: 20}]}
                    onPress={() => {
                      onNonEmergencyButtonClicked();
                      setasaClassType('Non-Emergency');
                      if (asaClassType || asaClassType != '') {
                        setasaClassTypeerror(null);
                      }
                    }}>
                    <Image
                      source={nonEmergency}
                      style={styles.radioActiveInActive}
                    />
                    <Text style={{fontSize: 15, marginLeft: 10, color: '#000'}}>
                      Non-Emergency
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <Text style={styles.errorTxtStyles}>{asaClassTypeerror}</Text>
              {/* Pulmonary Disease*/}
              <View
                style={[styles.listViewConatiner, {flexDirection: 'column'}]}>
                <Text style={styles.listViewText}>Pulmonary Disease?</Text>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    style={styles.radioContainer}
                    onPress={() => {
                      onPulmonaryYesButtonClicked();
                      setpulmonaryType('Yes');
                      if (pulmonaryType || pulmonaryType != '') {
                        setpulmonaryTypeerror(null);
                      }
                    }}>
                    <Image
                      source={pulmonaryYes}
                      style={styles.radioActiveInActive}
                    />
                    <Text style={{fontSize: 15, marginLeft: 10, color: '#000'}}>
                      Yes
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.radioContainer, {marginLeft: 30}]}
                    onPress={() => {
                      onPulmonaryNoButtonClicked();
                      setpulmonaryType('No');
                      if (pulmonaryType || pulmonaryType != '') {
                        setpulmonaryTypeerror(null);
                      }
                    }}>
                    <Image
                      source={pulmonaryNo}
                      style={styles.radioActiveInActive}
                    />
                    <Text style={{fontSize: 15, marginLeft: 10, color: '#000'}}>
                      No
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={styles.errorTxtStyles}>{pulmonaryTypeerror}</Text>
              {/* Cardiac Disease*/}
              <View
                style={[styles.listViewConatiner, {flexDirection: 'column'}]}>
                <Text style={styles.listViewText}>Cardiac Disease?</Text>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    style={styles.radioContainer}
                    onPress={() => {
                      onCardiacYesButtonClicked();
                      setcardiacType('Yes');
                      if (cardiacType || cardiacType != '') {
                        setcardiacTypeerror(null);
                      }
                    }}>
                    <Image
                      source={cardiacYes}
                      style={styles.radioActiveInActive}
                    />
                    <Text style={{fontSize: 15, marginLeft: 10, color: '#000'}}>
                      Yes
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.radioContainer, {marginLeft: 30}]}
                    onPress={() => {
                      onCardiacNoButtonClicked();
                      setcardiacType('No');
                      if (cardiacType || cardiacType != '') {
                        setcardiacTypeerror(null);
                      }
                    }}>
                    <Image
                      source={cardiacNo}
                      style={styles.radioActiveInActive}
                    />
                    <Text style={{fontSize: 15, marginLeft: 10, color: '#000'}}>
                      No
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={styles.errorTxtStyles}>{cardiacTypeerror}</Text>
              {/* Renal Disease*/}
              <View
                style={[styles.listViewConatiner, {flexDirection: 'column'}]}>
                <Text style={styles.listViewText}>Renal Disease?</Text>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    style={styles.radioContainer}
                    onPress={() => {
                      onRenalYesButtonClicked();
                      setRenalType('Yes');
                      if (RenalType || RenalType != '') {
                        setRenalTypeerror(null);
                      }
                    }}>
                    <Image
                      source={renalYes}
                      style={styles.radioActiveInActive}
                    />
                    <Text style={{fontSize: 15, marginLeft: 10, color: '#000'}}>
                      Yes
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.radioContainer, {marginLeft: 30}]}
                    onPress={() => {
                      onRenalNoButtonClicked();
                      setRenalType('No');
                      if (RenalType || RenalType != '') {
                        setRenalTypeerror(null);
                      }
                    }}>
                    <Image
                      source={renalNo}
                      style={styles.radioActiveInActive}
                    />
                    <Text style={{fontSize: 15, marginLeft: 10, color: '#000'}}>
                      No
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={styles.errorTxtStyles}>{RenalTypeerror}</Text>
              {/* Block Being Performed*/}
              <View
                style={[styles.listViewConatiner, {flexDirection: 'column'}]}>
                <Text style={styles.listViewText}>Block being performed:</Text>
                <TextInput
                  style={[styles.textInputStyle, {marginTop: 30}]}
                  value={block}
                  onChangeText={block => {
                    setBlock(block);
                    if (block && block != '') {
                      setblockerror(null);
                    }
                  }}
                  keyboardType="default"
                  autoCapitalize="words"
                  secureTextEntry={false}
                  returnKeyType="next"
                  blurOnSubmit={true}
                  maxLength={50}
                  placeholder="Name of Block"
                  placeholderTextColor={'gray'}
                />
                <View style={styles.viewDivider}></View>
              </View>
              <Text style={styles.errorTxtStyles}>{blockerror}</Text>
              {/* Local Anesthetic */}
              <View
                style={[styles.listViewConatiner, {flexDirection: 'column'}]}>
                <Text style={styles.listViewText}>Local anesthetic used</Text>
                <TextInput
                  style={[styles.textInputStyle, {marginTop: 30}]}
                  value={local}
                  onChangeText={local => {
                    setLocal(local);
                    if (local && local != '') {
                      setlocalerror(null);
                    }
                  }}
                  keyboardType="default"
                  autoCapitalize="words"
                  secureTextEntry={false}
                  returnKeyType="next"
                  blurOnSubmit={true}
                  maxLength={50}
                  placeholder="E.g., ropivicaine 0.5%"
                  placeholderTextColor={'gray'}
                />
                <View style={styles.viewDivider}></View>
              </View>
              <Text Text style={styles.errorTxtStyles}>
                {localerror}
              </Text>
              {/* Additives */}
              <View
                style={[styles.listViewConatiner, {flexDirection: 'column'}]}>
                <Text style={styles.listViewText}>Additives</Text>
                <TextInput
                  style={[styles.textInputStyle, {marginTop: 30}]}
                  value={additives}
                  onChangeText={additives => {
                    setAdditives(additives);
                    if (additives && additives != '') {
                      setadditiveserror(null);
                    }
                  }}
                  keyboardType="default"
                  autoCapitalize="words"
                  secureTextEntry={false}
                  returnKeyType="next"
                  blurOnSubmit={true}
                  maxLength={50}
                  placeholder="additives"
                  placeholderTextColor={'gray'}
                />
                <View style={styles.viewDivider}></View>
              </View>
              <Text Text style={styles.errorTxtStyles}>
                {additiveserror}
              </Text>
              {/* Volume */}
              <View
                style={[styles.listViewConatiner, {flexDirection: 'column'}]}>
                <Text style={styles.listViewText}>
                  Volume of local anesthetic given
                </Text>
                <TextInput
                  style={[styles.textInputStyle, {marginTop: 30}]}
                  value={volume}
                  onChangeText={volume => {
                    setVolume(volume);
                    if (volume && volume != '') {
                      setvolumeerror(null);
                    }
                  }}
                  keyboardType="default"
                  autoCapitalize="words"
                  secureTextEntry={false}
                  returnKeyType="next"
                  blurOnSubmit={true}
                  maxLength={50}
                  placeholder="volume of local anesthetic"
                  placeholderTextColor={'gray'}
                />
                <View style={styles.viewDivider}></View>
              </View>
              <Text Text style={styles.errorTxtStyles}>
                {volumeerror}
              </Text>
              {/* Nerve*/}
              <View
                style={[styles.listViewConatiner, {flexDirection: 'column'}]}>
                <Text style={styles.listViewText}>
                  Nerve stimulator being used?
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    style={styles.radioContainer}
                    onPress={() => {
                      onNerveYesButtonClicked();
                      setnerveType('Yes');
                      if (nerveType && nerveType != '') {
                        setnerveTypeerror(null);
                      }
                    }}>
                    <Image
                      source={simulatorYes}
                      style={styles.radioActiveInActive}
                    />
                    <Text
                      style={{fontSize: 15, marginLeft: 10, color: 'black'}}>
                      Yes
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.radioContainer, {marginLeft: 30}]}
                    onPress={() => {
                      onNerveNoButtonClicked();
                      setnerveType('No');
                      if (nerveType && nerveType != '') {
                        setnerveTypeerror(null);
                      }
                    }}>
                    <Image
                      source={simulatorNo}
                      style={styles.radioActiveInActive}
                    />
                    <Text
                      style={{fontSize: 15, marginLeft: 10, color: 'black'}}>
                      No
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <Text Text style={styles.errorTxtStyles}>
                {nerveTypeerror}
              </Text>
              {/* Ultrasound*/}
              <View
                style={[styles.listViewConatiner, {flexDirection: 'column'}]}>
                <Text style={styles.listViewText}>Ultrasound being used?</Text>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    style={styles.radioContainer}
                    onPress={() => {
                      onUltrasoundYesButtonClicked();
                      setultrasoundType('Yes');
                      if (ultrasoundType && ultrasoundType != '') {
                        setultrasoundTypeerror(null);
                      }
                    }}>
                    <Image
                      source={ultrasoundYes}
                      style={styles.radioActiveInActive}
                    />
                    <Text
                      style={{fontSize: 15, marginLeft: 10, color: 'black'}}>
                      Yes
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.radioContainer, {marginLeft: 30}]}
                    onPress={() => {
                      onUltrasoundNoButtonClicked();
                      setultrasoundType('No');
                      if (ultrasoundType && ultrasoundType != '') {
                        setultrasoundTypeerror(null);
                      }
                    }}>
                    <Image
                      source={ultrasoundNo}
                      style={styles.radioActiveInActive}
                    />
                    <Text
                      style={{fontSize: 15, marginLeft: 10, color: 'black'}}>
                      No
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <Text Text style={styles.errorTxtStyles}>
                {ultrasoundTypeerror}
              </Text>
              {/* Time*/}
              <View style={styles.listViewConatiner}>
                <Text style={styles.listViewText}>
                  Time between block and arrest?
                </Text>
                <View
                  style={{
                    width: deviceWidth - 50,
                    marginTop: 20,
                    height: Platform.OS === 'ios' ? 30 : 40,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignSelf: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      setblockones(true);
                      setblocktwos(false);
                      setblockthrees(false);
                      setblockfours(false);
                      setblockfives(false);
                      settimeType('During');
                      if (timeType && timeType != '') {
                        settimeTypeerror(null);
                      }
                    }}
                    style={[
                      styles.blockscontainer,
                      {
                        backgroundColor:
                          blockones == true
                            ? COLORS.PowderBlueColor
                            : COLORS.PowderBlueColorWithLowOpactity,
                      },
                    ]}>
                    <Text style={styles.agetypetext}>During</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setblockones(false);
                      setblocktwos(true);
                      setblockthrees(false);
                      setblockfours(false);
                      setblockfives(false);
                      settimeType('<30');
                      if (timeType && timeType != '') {
                        settimeTypeerror(null);
                      }
                    }}
                    style={[
                      styles.blockscontainer,
                      {
                        backgroundColor:
                          blocktwos == true
                            ? COLORS.PowderBlueColor
                            : COLORS.PowderBlueColorWithLowOpactity,
                      },
                    ]}>
                    <Text style={styles.agetypetext}>{'<30'}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setblockones(false);
                      setblocktwos(false);
                      setblockthrees(true);
                      setblockfours(false);
                      setblockfives(false);
                      settimeType('30-60');
                      if (timeType && timeType != '') {
                        settimeTypeerror(null);
                      }
                    }}
                    style={[
                      styles.blockscontainer,
                      {
                        backgroundColor:
                          blockthrees == true
                            ? COLORS.PowderBlueColor
                            : COLORS.PowderBlueColorWithLowOpactity,
                        left: 2,
                      },
                    ]}>
                    <Text style={styles.agetypetext}>30-60</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setblockones(false);
                      setblocktwos(false);
                      setblockthrees(false);
                      setblockfours(true);
                      setblockfives(false);
                      settimeType('>60');
                      if (timeType && timeType != '') {
                        settimeTypeerror(null);
                      }
                    }}
                    style={[
                      styles.blockscontainer,
                      {
                        backgroundColor:
                          blockfours == true
                            ? COLORS.PowderBlueColor
                            : COLORS.PowderBlueColorWithLowOpactity,
                        left: 2,
                      },
                    ]}>
                    <Text style={styles.agetypetext}>{'>60'}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setblockones(false);
                      setblocktwos(false);
                      setblockthrees(false);
                      setblockfours(false);
                      setblockfives(true);
                      settimeType('UNK');
                      if (timeType && timeType != '') {
                        settimeTypeerror(null);
                      }
                    }}
                    style={[
                      styles.blockscontainer,
                      {
                        backgroundColor:
                          blockfives == true
                            ? COLORS.PowderBlueColor
                            : COLORS.PowderBlueColorWithLowOpactity,
                        left: 2,
                      },
                    ]}>
                    <Text style={styles.agetypetext}>UNK</Text>
                  </TouchableOpacity>

                  {/* <SegmentedControlTab
                    values={['During', '<30', '30-60', '>60', 'UNK']}
                    selectedIndex={selectedTimeIndex}
                    onTabPress={handleTimeTabsChange}
                    tabStyle={{
                      backgroundColor: COLORS.PowderBlueColorWithLowOpactity,
                      borderColor: 'transparent',
                    }}
                    tabTextStyle={{color: 'white', fontSize: 15}}
                    activeTabStyle={{backgroundColor: COLORS.PowderBlueColor}}
                    activeTabTextStyle={{color: 'white'}}
                    tabsContainerStyle={{tintColor: 'white'}}
                  />*/}
                </View>
                <Text Text style={styles.errorTxtStyles}>
                  {timeTypeerror}
                </Text>
                <Text style={[styles.subMainTitle, {marginTop: 20}]}>
                  Did the arrest occur:
                </Text>

                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={[
                      styles.popUpBullet,
                      {marginTop: 20},
                    ]}>{`\u25cf `}</Text>
                  <Text
                    style={[
                      styles.subMainTitle,
                      {marginTop: 20, marginLeft: 10},
                    ]}>
                    During the block
                  </Text>
                </View>

                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.popUpBullet}>{`\u25cf `}</Text>
                  <Text
                    style={[
                      styles.subMainTitle,
                      {marginTop: 10, marginLeft: 10},
                    ]}>
                    Within 30 minutes
                  </Text>
                </View>

                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.popUpBullet}>{`\u25cf `}</Text>
                  <Text
                    style={[
                      styles.subMainTitle,
                      {marginTop: 10, marginLeft: 10},
                    ]}>
                    30 minutes to 60 minutes
                  </Text>
                </View>

                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.popUpBullet}>{`\u25cf `}</Text>
                  <Text
                    style={[
                      styles.subMainTitle,
                      {marginTop: 10, marginLeft: 10},
                    ]}>
                    Greater than 60 minutes
                  </Text>
                </View>

                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.popUpBullet}>{`\u25cf `}</Text>
                  <Text
                    style={[
                      styles.subMainTitle,
                      {marginTop: 10, marginLeft: 10},
                    ]}>
                    Unknown
                  </Text>
                </View>
              </View>

              <View
                style={[
                  styles.viewDivider,
                  {marginTop: 40, backgroundColor: COLORS.TextLightGrayColor},
                ]}></View>

              <Text style={styles.mainTitle}>
                Contact Information (Optional)
              </Text>

              {/* Your Name */}
              <View
                style={[styles.listViewConatiner, {flexDirection: 'column'}]}>
                <Text style={styles.listViewText}>Your Name</Text>
                <TextInput
                  style={[
                    styles.textInputStyle,
                    {marginTop: Platform.OS === 'ios' ? 30 : 20},
                  ]}
                  value={name}
                  onChangeText={name => {
                    setName(name);
                    if (name && name != '') {
                      setnameerror(null);
                    }
                  }}
                  keyboardType="default"
                  autoCapitalize="words"
                  secureTextEntry={false}
                  returnKeyType="next"
                  blurOnSubmit={true}
                  maxLength={50}
                  placeholder="Enter name"
                  placeholderTextColor={'gray'}
                />
                <View
                  style={[
                    styles.viewDivider,
                    {backgroundColor: COLORS.TextLightGrayColor},
                  ]}></View>
              </View>
              <Text Text style={styles.errorTxtStyles}>
                {nameerror}
              </Text>
              {/* Your Instruction */}
              <View
                style={[styles.listViewConatiner, {flexDirection: 'column'}]}>
                <Text style={styles.listViewText}>Your Instruction</Text>
                <TextInput
                  style={[
                    styles.textInputStyle,
                    {marginTop: Platform.OS === 'ios' ? 30 : 20},
                  ]}
                  value={instruction}
                  onChangeText={instruction => {
                    setInstruction(instruction);
                    if (instruction && instruction != '') {
                      setinstructionerror(null);
                    }
                  }}
                  keyboardType="default"
                  autoCapitalize="words"
                  secureTextEntry={false}
                  returnKeyType="next"
                  blurOnSubmit={true}
                  maxLength={50}
                  placeholder="Enter instruction"
                  placeholderTextColor={'gray'}
                />
                <View
                  style={[
                    styles.viewDivider,
                    {backgroundColor: COLORS.TextLightGrayColor},
                  ]}></View>
              </View>
              <Text Text style={styles.errorTxtStyles}>
                {instructionerror}
              </Text>
              {/* Your Email */}
              <View
                style={[styles.listViewConatiner, {flexDirection: 'column'}]}>
                <Text style={styles.listViewText}>Your Email Address</Text>
                <TextInput
                  style={[
                    styles.textInputStyle,
                    {marginTop: Platform.OS === 'ios' ? 30 : 20},
                  ]}
                  value={email}
                  onChangeText={email => {
                    setEmail(email);
                    if (email && email != '') {
                      setemailerror(null);
                    }
                  }}
                  keyboardType="email-address"
                  autoCapitalize="words"
                  secureTextEntry={false}
                  returnKeyType="next"
                  blurOnSubmit={true}
                  maxLength={50}
                  placeholderTextColor={'gray'}
                  placeholder="Enter E-mail"
                />
                <View
                  style={[
                    styles.viewDivider,
                    {backgroundColor: COLORS.TextLightGrayColor},
                  ]}></View>
              </View>
              <Text Text style={styles.errorTxtStyles}>
                {emailerror}
              </Text>
              {/* Submit Button */}
              {loading ? (
                <View
                  style={{
                    paddingTop: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <ActivityIndicator
                    size={'large'}
                    color={COLORS.PowderBlueColor}
                  />
                </View>
              ) : (
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={styles.popUpPinkButton}
                  onPress={submitFun}>
                  <Text style={[styles.popUpButtonText, {color: 'white'}]}>
                    SUBMIT
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </KeyboardAwareScrollView>
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

  mainText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },

  mainContainer: {
    height: Platform.OS === 'ios' ? deviceHeight - 140 : deviceHeight - 155,
    flexDirection: 'column',
    backgroundColor: 'white',
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
  },

  scrollViewContainer: {
    backgroundColor: 'transparent',
    flex: 1,
    marginBottom: Platform.OS === 'ios' ? 100 : 0,
  },

  mainTitle: {
    fontWeight: '500',
    marginLeft: 10,
    fontSize: 16,
    marginTop: 40,
    marginLeft: 25,
    color: '#000',
  },

  subMainTitle: {
    fontWeight: '500',
    marginLeft: 25,
    fontSize: 12,
    marginTop: 5,
    color: 'black',
  },

  listViewConatiner: {
    width: deviceWidth,
    marginTop: 30,
  },

  listViewText: {
    fontWeight: '500',
    marginLeft: 25,
    fontSize: 16,
    color: 'black',
  },

  textInputStyle: {
    width: deviceWidth - 50,
    height: Platform.OS === 'ios' ? 30 : 40,
    fontSize: 15,
    marginTop: 15,
    marginHorizontal: 25,
    color: 'black',
  },

  viewDivider: {
    height: 1,
    width: deviceWidth - 50,
    backgroundColor: COLORS.PowderBlueColor,
    marginTop: 5,
    marginHorizontal: 25,
  },

  viewSegment: {
    height: Platform.OS === 'ios' ? 30 : 40,
    // width: Platform.OS === 'ios' ? 135 : 80,
    marginTop: 35,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingLeft: 10,
  },

  popUpBullet: {
    fontSize: 10,
    fontWeight: '400',
    alignSelf: 'center',
    color: COLORS.PopUpTextBlueColor,
    marginLeft: 25,
    marginTop: 10,
  },

  popUpButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 15,
  },

  radioContainer: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    marginTop: 15,
    marginHorizontal: 10,
  },

  radioActiveInActive: {
    height: 25,
    width: 25,
    marginLeft: 20,
  },

  popUpPinkButton: {
    height: 55,
    backgroundColor: COLORS.BackgroundColorPink,
    marginTop: 90,
  },
  Agecontainer: {
    backgroundColor: COLORS.PowderBlueColorWithLowOpactity,
    borderColor: 'transparent',
    borderRadius: 5,
    padding: 5,
    marginHorizontal: 5,
    width: 50,
    borderLeftWidth: 0.5,
    borderLeftColor: COLORS.PowderBlueColor,
    alignItems: 'center',
  },
  asacontainer: {
    backgroundColor: COLORS.PowderBlueColorWithLowOpactity,
    borderColor: 'transparent',
    borderRadius: 5,
    width: Platform.OS === 'ios' ? 40 : 45,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blockscontainer: {
    backgroundColor: COLORS.PowderBlueColorWithLowOpactity,
    borderColor: 'transparent',
    borderRadius: 5,
    width: Platform.OS === 'ios' ? 40 : 55,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  agetypetext: {
    color: 'white',
    fontSize: 15,
    fontWeight: '500',
  },
  errorTxtStyles: {
    color: 'red',
    paddingLeft: 25,
    top: 5,
  },
});
export default SubmitLipidRescueScreen;
