/* -------------------------------------------------------------------------- */
/*                                   Imports                                  */
/* -------------------------------------------------------------------------- */
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Pressable, Image } from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

/* -------------------------------------------------------------------------- */
/*                               Implementation                               */
/* -------------------------------------------------------------------------- */

/* ------------------------------ Dropdown-Data ----------------------------- */
const sourceDropdownData = [
  { label: 'Automatic', value: 'auto'},
  { label: 'English', value: 'en'},
  { label: 'German', value: 'de'},
  { label: 'Spanish', value: 'es'},
  { label: 'Italian', value: 'it'},
  { label: 'French', value: 'fr'},
];

const targetDropdownData = [
  { label: 'English', value: 'en'},
  { label: 'German', value: 'de'},
  { label: 'Spanish', value: 'es'},
  { label: 'Italian', value: 'it'},
  { label: 'French', value: 'fr'},
];

const MultilineTextInput = (props) => {
  return (
    <TextInput 
    {...props}
    editable
    maxLength={40}
    />
  );
}

var translatedText = null;

async function handleClick(textValue, source, target){

  if (textValue == null)
  {
    return;
  }

  translatedText = await fetch('http://localhost:8080/libretranslate?text=' + textValue + '&sourceLanguage=' + source + '&targetLanguage=' + target, {
    method: 'GET',
  }).then(response => response.json())
  .then(json => {
    return json;
  });

  return translatedText;

}

export default function TextToSpeech() {  
  
/* -------------------------------- Textinput ------------------------------- */
const [value, onChangeText] = useState('Enter text here...');
const [translation, setTranslation] = useState('');
const [valueDropSource, setValueSource] = useState(null);
const [valueDropTarget, setValueTarget] = useState(null);
const [isFocusSource, setIsFocusSource] = useState(false);
const [isFocusTarget, setIsFocusTarget] = useState(false);
  
  return (
    <View style={styles.background}>
    <Image style={styles.backgroundImage} source={require('./images/LanguageSloth_Background.png')}/>
    <View style={styles.container}>
        <Dropdown
          style={[styles.dropdown, isFocusSource && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={sourceDropdownData}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocusSource ? 'Select source language' : '...'}
          searchPlaceholder="Search..."
          value={valueDropSource}
          onFocus={() => setIsFocusSource(true)}
          onBlur={() => setIsFocusSource(false)}
          onChange={item => {
            setValueSource(item.value);
            setIsFocusSource(false);
          }}
        />

        <Dropdown
          style={[styles.dropdown, isFocusTarget && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={targetDropdownData}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocusTarget ? 'Select target language' : '...'}
          searchPlaceholder="Search..."
          value={valueDropTarget}
          onFocus={() => setIsFocusTarget(true)}
          onBlur={() => setIsFocusTarget(false)}
          onChange={item => {
            setValueTarget(item.value);
            setIsFocusTarget(false);
          }}
        />

      <MultilineTextInput
        multiline
        numberOfLines={4}
        onChangeText={(text) => onChangeText(text)}
        value={value || ""}
        style={styles.input}
      />

      <Pressable style={styles.button} onPress={async () => setTranslation(await handleClick(value, valueDropSource, valueDropTarget))}>
      <Text style={styles.text}>TRANSLATE</Text>
      </Pressable> 

      <MultilineTextInput
        multiline
        numberOfLines={4}
        value={translation || ""}
        style={styles.input}
      /> 

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
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  input: {
    height: 100,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
    minWidth: 390,
    backgroundColor: '#fff'
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
    margin: 10,
    backgroundColor: '#fff'
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
  backgroundImage: {
    width: 400,
    height: 400,
    position: 'absolute',
    right: -25,
    top: -25,
    zIndex: 1
  },
  background: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  }
});