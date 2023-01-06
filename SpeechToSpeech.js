/* -------------------------------------------------------------------------- */
/*                                   Imports                                  */
/* -------------------------------------------------------------------------- */
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

let mediaRecorder;
let chunks = [];


/* -------------------------------------------------------------------------- */
/*                               Implementation                               */
/* -------------------------------------------------------------------------- */
export default function SpeechToSpeech() { 
  const [recording, setRecording] = React.useState();
  const [recordings, setRecordings] = React.useState([]);
  const [message, setMessage] = React.useState("");
  

  /* -------------------------------- Recording ------------------------------- */
  async function startRecording() {
    /*try {
      const permission = await Audio.requestPermissionsAsync();

      if (permission.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true
        });
        
        const { recording } = await Audio.Recording.createAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );

        setRecording(recording);
      } else {
        setMessage("Please grant permission to app to access microphone");
      }
    } catch (err) {
      console.error('Failed to start recording', err);
    }*/

    if (navigator.mediaDevices.getUserMedia)
    {
      console.log('SpeechToSpeech: getUserMedia supported.');
      const constraints = {audio: true};

      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          mediaRecorder = new MediaRecorder(stream);

          mediaRecorder.ondataavailable = (e) => {
            console.log(e.data)
            chunks.push(e.data);
          };
          
          mediaRecorder.start();

          mediaRecorder.onstop = (e) => {
            console.log('Creating BLOB and sending to server...');
            const audioBlob = new Blob(chunks, { type: "audio/webm"});
            const audioUrl = URL.createObjectURL(audioBlob);
            console.log(audioBlob.size)
            console.log(audioBlob)
            console.log(chunks)
            //const audio = new Audio(audioUrl);
            //audio.play();
            
            console.log('Clearing chunks...');
            chunks = [];

            const formData = new FormData();
            formData.append('file', audioBlob);

            for (var key of formData.entries()){
              console.log(key[0] + ',' + key[1]);
            }

            const options = {
              method: 'POST',
              body: formData
            }

            fetch('http://localhost:8080/convertInputToWav', options)
            .then(response => response.json())
            .then(data => {
              console.log(data);
            })
            .catch(error => {
              console.error(error);
            });
          }

          console.log(mediaRecorder.state);
          console.log("recorder started");
        })

    }

    /*navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      audioChunks = [];
      mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.addEventListener('dataavailable', event => {
        audioChunks.push(event.data);
      });

      mediaRecorder.start();
    });*/
    setRecording(true);
  }

  async function stopRecording() {
    /*setRecording(undefined);
    await recording.stopAndUnloadAsync();

    let updatedRecordings = [...recordings];
    const { sound, status } = await recording.createNewLoadedSoundAsync();
    updatedRecordings.push({
      sound: sound,
      duration: getDurationFormatted(status.durationMillis),
      file: recording.getURI()
    });

    console.log(sound);
    
    //const file = new File([], 'test.webm');
    const formData = new FormData();
    formData.append('fileName', sound);
    const options = {
      method: 'POST',
      body: formData
    }

    fetch('http://localhost:8080/convertInputToWav', options)
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error(error);
    });

    //console.log(file)

    setRecordings(updatedRecordings);
    */
    

    
    mediaRecorder.stop();
    console.log("recorder stopped");    
    setRecording(false);
  }

  /*function getDurationFormatted(millis) {
    const minutes = millis / 1000 / 60;
    const minutesDisplay = Math.floor(minutes);
    const seconds = Math.round((minutes - minutesDisplay) * 60);
    const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutesDisplay}:${secondsDisplay}`;
  }

  function getRecordingLines() {
    return recordings.map((recordingLine, index) => {
      return (
        <View key={index} style={styles.row}>
          <Text style={styles.fill}>Recording {index + 1}</Text>
          <Pressable style={styles.button} onPress={() => recordingLine.sound.replayAsync()}>
            <Text style={styles.text}>PLAY</Text>
          </Pressable>
        </View>
      );
    });
  }*/

  /* -------------------------------- Dropdown -------------------------------- */
  const dropdownData = [
    { label: 'English', value: '1'},
    { label: 'German', value: '2'},
    { label: 'Spanish', value: '3'},
    { label: 'Italian', value: '4'},
    { label: 'French', value: '5'}
  ];

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  //<Button style={styles.button} onPress={() => Sharing.shareAsync(recordingLine.file)} title="Share"></Button>
    
  return (
    <View style={styles.container}>
      <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={dropdownData}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select language' : '...'}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
          }}
        />


      <Text>{message}</Text>
        <Pressable
        onPress={recording ? stopRecording : startRecording}
        style={styles.button}> 
            <Text style={styles.text}>{recording ? 'STOP RECORDING' : 'START RECORDING'}</Text>
        </Pressable>
      <StatusBar style="auto" />
    </View>
  );
}


/* -------------------------------------------------------------------------- */
/*                                   Styling                                  */
/* -------------------------------------------------------------------------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fill: {
    flex: 1,
    margin: 16
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'tomato',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    margin: 10
  },
  placeholderStyle: {
    fontSize: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 35
  },
  selectedTextStyle: {
    fontSize: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    width: 185,
    textAlign: 'center',
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});