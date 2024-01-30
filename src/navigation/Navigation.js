import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import InfoScreen from '../screens/InfoScreen';
import FeedbackScreen from '../screens/FeedbackScreen';
import FullchecklistScreen from '../screens/FullchecklistScreen';
import OriginalArticleScreen from '../screens/OriginalArticleScreen';
import BeginScreen from '../screens/BeginScreen';
import PulsatileScreen from '../screens/beginYes/PulsatileScreen';
import LipidEmulsionYesScreen from '../screens/beginYes/LipidEmulsionYesScreen';
import BradycardiaPresentScreen from '../screens/beginYes/BradycardiaPresentScreen';
import GenerateReportScreen from '../screens/beginYes/GenerateReportScreen';
import WeightGreaterScreen from '../screens/beginYes/WeightGreaterScreen';
import WeightLessScreen from '../screens/beginYes/WeightLessScreen';
import LipidEmulsionStartedGreater from '../screens/beginYes/LipidEmulsionStartedGreater';
import LipidEmulsionStartedLess from '../screens/beginYes/LipidEmulsionStartedLess';
import InitialPulselessScreen from '../screens/beginNo/InitialPulselessScreen';
import NoPulseScreen from '../screens/beginNo/NoPulseScreen';
import AsystoleManagementScreen from '../screens/beginNo/AsystoleManagementScreen';
import LipidEmulsionNoScreen from '../screens/beginNo/LipidEmulsionNoScreen';
import ReversibleCauseScreen from '../screens/beginNo/ReversibleCauseScreen';
import LipidEmulsionNoScreenVTach from '../screens/beginNo/LipidEmulsionNoScreenVTach';
import LipidEmulsionNoScreenVFib from '../screens/beginNo/LipidEmulsionNoScreenVFib';
import SubmitLipidRescueScreen from '../screens/beginNo/SubmitLipidRescueScreen';

const Stack = createNativeStackNavigator();

export default Navigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerTitle: 'Last', headerShown: false}}>
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{headerTitle: 'Last', gestureEnabled: false}}
      />
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerTitle: 'Last', gestureEnabled: false}}
      />
      <Stack.Screen
        name="InfoScreen"
        component={InfoScreen}
        options={{headerTitle: 'Last', gestureEnabled: false}}
      />
      <Stack.Screen
        name="FeedbackScreen"
        component={FeedbackScreen}
        options={{headerTitle: 'Last', gestureEnabled: false}}
      />
      <Stack.Screen
        name="FullchecklistScreen"
        component={FullchecklistScreen}
        options={{headerTitle: 'Last', gestureEnabled: false}}
      />
      <Stack.Screen
        name="OriginalArticleScreen"
        component={OriginalArticleScreen}
        options={{headerTitle: 'Last', gestureEnabled: false}}
      />
      <Stack.Screen
        name="BeginScreen"
        component={BeginScreen}
        options={{headerTitle: 'Last', gestureEnabled: false}}
      />
      <Stack.Screen
        name="PulsatileScreen"
        component={PulsatileScreen}
        options={{headerTitle: 'Last', gestureEnabled: false}}
      />
      <Stack.Screen
        name="LipidEmulsionYesScreen"
        component={LipidEmulsionYesScreen}
        options={{headerTitle: 'Last', gestureEnabled: false}}
      />
      <Stack.Screen
        name="BradycardiaPresentScreen"
        component={BradycardiaPresentScreen}
        options={{headerTitle: 'Last', gestureEnabled: false}}
      />
      <Stack.Screen
        name="GenerateReportScreen"
        component={GenerateReportScreen}
        options={{headerTitle: 'Last', gestureEnabled: false}}
      />
      <Stack.Screen
        name="WeightGreaterScreen"
        component={WeightGreaterScreen}
        options={{headerTitle: 'Last', gestureEnabled: false}}
      />
      <Stack.Screen
        name="WeightLessScreen"
        component={WeightLessScreen}
        options={{headerTitle: 'Last', gestureEnabled: false}}
      />
      <Stack.Screen
        name="LipidEmulsionStartedGreater"
        component={LipidEmulsionStartedGreater}
        options={{headerTitle: 'Last', gestureEnabled: false}}
      />
      <Stack.Screen
        name="LipidEmulsionStartedLess"
        component={LipidEmulsionStartedLess}
        options={{headerTitle: 'Last', gestureEnabled: false}}
      />
      <Stack.Screen
        name="InitialPulselessScreen"
        component={InitialPulselessScreen}
        options={{headerTitle: 'Last', gestureEnabled: false}}
      />
      <Stack.Screen
        name="NoPulseScreen"
        component={NoPulseScreen}
        options={{headerTitle: 'Last', gestureEnabled: false}}
      />
      <Stack.Screen
        name="AsystoleManagementScreen"
        component={AsystoleManagementScreen}
        options={{headerTitle: 'Last', gestureEnabled: false}}
      />
      <Stack.Screen
        name="LipidEmulsionNoScreen"
        component={LipidEmulsionNoScreen}
        options={{headerTitle: 'Last', gestureEnabled: false}}
      />
      <Stack.Screen
        name="ReversibleCauseScreen"
        component={ReversibleCauseScreen}
        options={{headerTitle: 'Last', gestureEnabled: false}}
      />
      <Stack.Screen
        name="LipidEmulsionNoScreenVTach"
        component={LipidEmulsionNoScreenVTach}
        options={{headerTitle: 'Last', gestureEnabled: false}}
      />
      <Stack.Screen
        name="LipidEmulsionNoScreenVFib"
        component={LipidEmulsionNoScreenVFib}
        options={{headerTitle: 'Last', gestureEnabled: false}}
      />
      <Stack.Screen
        name="SubmitLipidRescueScreen"
        component={SubmitLipidRescueScreen}
        options={{headerTitle: 'Last', gestureEnabled: false}}
      />
    </Stack.Navigator>
  );
};
