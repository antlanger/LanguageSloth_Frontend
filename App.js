/* -------------------------------------------------------------------------- */
/*                                   Imports                                  */
/* -------------------------------------------------------------------------- */
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SpeechToSpeech from './SpeechToSpeech';
import TextToSpeech from './TextToSpeech';


/* -------------------------------------------------------------------------- */
/*                                  Variables                                 */
/* -------------------------------------------------------------------------- */
//https://reactnavigation.org/docs/bottom-tab-navigator
const Tab = createBottomTabNavigator();


/* -------------------------------------------------------------------------- */
/*                               Implementation                               */
/* -------------------------------------------------------------------------- */
export default function App() { 
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={({ route }) => ({
          headerShown:false,
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen name="Speech-To-Speech" component={SpeechToSpeech} />
        <Tab.Screen name="Text-To-Text" component={TextToSpeech} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
