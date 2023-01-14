/* -------------------------------------------------------------------------- */
/*                                   Imports                                  */
/* -------------------------------------------------------------------------- */
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  ImageBackground,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";

let mediaRecorder;
let chunks = [];

/* -------------------------------------------------------------------------- */
/*                               Implementation                               */
/* -------------------------------------------------------------------------- */
export default function SpeechToSpeech() {
  const [recording, setRecording] = React.useState();
  const [play, setPlayButton] = React.useState();
  //const [recordings, setRecordings] = React.useState([]);
  const [message, setMessage] = React.useState("");
  const [audioUrl, setAudioUrl] = React.useState("");

  /* -------------------------------- Recording ------------------------------- */
  async function startRecording() {
    if (navigator.mediaDevices.getUserMedia) {
      console.log("SpeechToSpeech: getUserMedia supported.");
      const constraints = { audio: true };

      navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = (e) => {
          console.log(e.data);
          chunks.push(e.data);
        };

        mediaRecorder.start();

        mediaRecorder.onstop = (e) => {
          console.log("Creating BLOB...");
          const audioBlob = new Blob(chunks, { type: "audio/webm" });
          setAudioUrl(URL.createObjectURL(audioBlob));
          //const audio = new Audio(audioUrl);
          //audio.play();

          console.log("Clearing chunks...");
          chunks = [];

          console.log("Attaching BLOB to FormData...");
          const formData = new FormData();
          formData.append("file", audioBlob);

          for (var key of formData.entries()) {
            console.log(key[0] + "," + key[1]);
          }

          console.log("Sending BLOB to server for further processing...");
          const options = {
            method: "POST",
            body: formData,
          };

          fetch("http://localhost:8080/convertInputToWav", options)
            .then((resp) => resp.blob())
            .then((data) => {
              console.log("Return data " + data);
              //var binaryData = [];
              //binaryData.push(data.body);
              //var data_blob = new Blob(data, {type: "audio/wav"})
              setAudioUrl(URL.createObjectURL(data));
            })
            .catch((error) => {
              console.error(error);
            });
        };

        console.log("MediaRecorder state is " + mediaRecorder.state);
        console.log("Recording started...");
      });
    }
    setRecording(true);
    setPlayButton(false);
  }

  async function stopRecording() {
    mediaRecorder.stop();
    console.log("Recording stopped...");
    setRecording(false);
    setPlayButton(true);
  }

  function setButtonText() {
    console.log("Variable - recording - is " + recording);
    console.log("Variable - play - is " + play);

    if (!recording && !play) {
      console.log("START");
      return "START RECORDING";
    } else if (!recording && play) {
      console.log("PLAY");
      return "PLAY AUDIO";
    } else if (recording) {
      console.log("STOP");
      return "STOP RECORDING";
    }
  }

  function workOnAction() {
    if (recording == undefined || play == undefined) {
      setRecording(false);
      setPlayButton(false);
    }

    if (!recording && !play) {
      startRecording();
    } else if (!recording && play) {
      // Play received audio
      let audio = new Audio(audioUrl);
      audio.play();
    } else if (recording) {
      stopRecording();
    }
  }

  function redoRecording() {
    setRecording(false);
    setPlayButton(false);
  }

  function showDeleteButton() {
    if (play) {
      return (
        <Pressable onPress={redoRecording}>
          <Image
            style={styles.deleteButton}
            source={require("./images/LanguageSloth_Redo.svg")}
          />
        </Pressable>
      );
    } else {
      return null;
    }
  }

  /* -------------------------------- Dropdown -------------------------------- */
  const dropdownData = [
    { label: "English", value: "1" },
    { label: "German", value: "2" },
    { label: "Spanish", value: "3" },
    { label: "Italian", value: "4" },
    { label: "French", value: "5" },
  ];

  const [inputValue, setInputValue] = useState(null);
  const [isInputFocus, setIsInputFocus] = useState(false);

  const [outputValue, setOutputValue] = useState(null);
  const [isOutputFocus, setIsOutputFocus] = useState(false);


  /* -------------------------------------------------------------------------- */
  /*                                  Rendering                                 */
  /* -------------------------------------------------------------------------- */

  return (
    <View style={styles.background}>
      <Image
        style={styles.backgroundImage}
        source={require("./images/LanguageSloth_Background.png")}
      />
      <View style={styles.container}>
        <Dropdown
          style={[styles.dropdown, isInputFocus && { borderColor: "blue" }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={dropdownData}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isInputFocus ? "Select input language" : "..."}
          searchPlaceholder="Search..."
          value={inputValue}
          onFocus={() => setIsInputFocus(true)}
          onBlur={() => setIsInputFocus(false)}
          onChange={(item) => {
            setInputValue(item.value);
            setIsInputFocus(false);
          }}
        />

        <Dropdown
          style={[styles.dropdown, isOutputFocus && { borderColor: "blue" }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={dropdownData}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isOutputFocus ? "Select output language" : "..."}
          searchPlaceholder="Search..."
          value={outputValue}
          onFocus={() => setIsOutputFocus(true)}
          onBlur={() => setIsOutputFocus(false)}
          onChange={(item) => {
            setOutputValue(item.value);
            setIsOutputFocus(false);
          }}
        />

        <Text>{message}</Text>
        <View style={styles.buttonView}>
          <Pressable onPress={workOnAction} style={styles.button}>
            <Text style={styles.text}>{setButtonText()}</Text>
          </Pressable>
          {showDeleteButton()}
        </View>
        <StatusBar style="auto" />
      </View>
    </View>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   Styling                                  */
/* -------------------------------------------------------------------------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  fill: {
    flex: 1,
    margin: 16,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "tomato",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    margin: 10,
    backgroundColor: "#fff",
  },
  placeholderStyle: {
    fontSize: 16,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    paddingHorizontal: 35,
  },
  selectedTextStyle: {
    fontSize: 16,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    width: 185,
    textAlign: "center",
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  deleteButton: {
    width: 30,
    height: 30,
    marginLeft: 10,
  },
  buttonView: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  backgroundImage: {
    width: 400,
    height: 400,
    position: "absolute",
    right: -25,
    top: -25,
    zIndex: 1,
  },
  background: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
  },
});
