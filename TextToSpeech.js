/* -------------------------------------------------------------------------- */
/*                                   Imports                                  */
/* -------------------------------------------------------------------------- */
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';

/* -------------------------------------------------------------------------- */
/*                               Implementation                               */
/* -------------------------------------------------------------------------- */

const MultilineTextInput = (props) => {
  return (
    <TextInput 
    {...props}
    editable
    maxLength={40}
    />
  );
}

export default function TextToSpeech() {  
  
/* -------------------------------- Textinput ------------------------------- */
const [value, onChangeText] = useState('Enter text here...');
  
  return (
    <View style={styles.container}>
      <MultilineTextInput
        multiline
        numberOfLines={4}
        onChangeText={text => onChangeText(text)}
        value={value}
        style={styles.input}
      />

      <Pressable style={styles.button}>
      <Text style={styles.text}>TRANSLATE</Text>
      </Pressable> 

      <MultilineTextInput
        multiline
        numberOfLines={4}
        value='Output'
        style={styles.input}
      /> 

    </View>
  );
}


/*
<Pressable style={styles.button}>
          <Text style={styles.text}>This is a button!</Text>
        </Pressable>
*/


/* -------------------------------------------------------------------------- */
/*                                   Styling                                  */
/* -------------------------------------------------------------------------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 100,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
    minWidth: 390,
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
  }
});