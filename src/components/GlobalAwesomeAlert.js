import React, { useState, useRef, useEffect } from 'react';
import AwesomeAlert from 'react-native-awesome-alerts';
import { COLORS } from '../styles/GlobalColor';

const GlobalAwesomeAlert = ({message, isCancelButton, isConfirmButton, cancelTitle, confirmTitle, onCancelClicked, onConfirmClicked, isAlertShow}) => {

    // const [message, setmessage] = useState('');

    {/* UI */ }
    return (
        <AwesomeAlert
            show={isAlertShow}
            showProgress={false}
            title={'Timeout'}
            message={message}
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showCancelButton={isCancelButton}
            showConfirmButton={isConfirmButton}
            cancelText={cancelTitle}
            confirmText={confirmTitle}
            confirmButtonColor={COLORS.ButtonGreenColor}
            onCancelPressed={onCancelClicked}
            onConfirmPressed={onConfirmClicked}
            contentContainerStyle={{
                maxWidth: '80%',
                width: '80%',
                borderRadius: 5,
                backgroundColor: '#fff',
                padding: 10,
            }}
            titleStyle={{ fontWeight: 'bold' }}
            confirmButtonTextStyle={{ fontWeight: 'bold', fontSize: 15, textAlign: 'center' }}
            confirmButtonStyle={{ width: 70 }}
        />

    )
};

export default GlobalAwesomeAlert;