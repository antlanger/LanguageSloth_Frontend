/* -------------------------------------------------------------------------- */
/*                                   Imports                                  */
/* -------------------------------------------------------------------------- */
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput } from 'react-native';

/* -------------------------------------------------------------------------- */
/*                               Implementation                               */
/* -------------------------------------------------------------------------- */
export default function TextToSpeech() {  
  
/* -------------------------------- Textinput ------------------------------- */
const [text, onChangeText] = useState('Enter text here...');

const MultilineTextInput = (props) => {
  return (
    <TextInput
      {...props}
      editable
      maxLength={40}
    />
  );
}
  
  
  return (
    <View style={styles.container}>
        <MultilineTextInput
        multiline
        numberOfLines={4}
        onChangeText={text => onChangeText(text)}
        value={text}
        style={styles.input}
        />
        <StatusBar style="auto"/>
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
    justifyContent: 'center',
  },
  input: {
    height: 100,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
    maxWidth: 600
  }
});