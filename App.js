import * as React from 'react';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { StyleSheet, Text, View } from 'react-native';
import AudioRecorderPlayer, { 
  AVEncoderAudioQualityIOSType,
  AVEncodingOption, 
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType, 
 } from 'react-native-audio-recorder-player';


class Application extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isLoggingIn: false,
        recordSecs: 0,
        recordTime: '00:00:00',
        currentPositionSec: 0,
        currentDurationSec: 0,
        playTime: '00:00:00',
        duration: '00:00:00',
      };
      this.audioRecorderPlayer = new AudioRecorderPlayer();
      this.audioRecorderPlayer.setSubscriptionDuration(0.09);
    }

    render() {
      return (
        <Card>
        <Card.Title title="Sprachsynthese"/>
        </Card>
      );
    }
}


export default Application;
