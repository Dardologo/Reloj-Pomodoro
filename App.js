import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import Constants  from "expo-constants";
import { vibrate } from './utils';
import Cronometro from './components/Cronometro';
import { useState } from 'react';
import GlobalContext  ,{ defaultValue } from './components/global/GlobalContext';




export default function App() {

  const [activeTimer, setActiveTimer] = useState(defaultValue)
  const [isWorking, setIsWorking] = useState(true)
 
  return (
    <View style={styles.container}>
      
      <StatusBar style="auto" />
      
<Text style={[styles.center, styles.title]}>Tiempo de {isWorking? 'Trabajo' : 'Descanso'} </Text>
    <GlobalContext.Provider value={{activeTimer, isWorking, setIsWorking}}>
    <Cronometro/>

    </GlobalContext.Provider>
      
      
      <View style={[styles.buttonContainer, styles.center]}>
      <Button 
       
        title= {activeTimer ? 'Iniciar' : 'Pausar'}
        onPress={()=>setActiveTimer(!activeTimer)}
      />
      <Button 
        title='Reiniciar'      
      />
      </View>
     

     {/*  <Button
        title = 'Vibrar'
        onPress={vibrate}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    marginTop: Constants.statusBarHeight
    
  },
  center: {
    alignSelf: 'center'
  },
  title: {
    
    fontSize: 20
  },
  buttonContainer: {
    padding: 10,
    flexDirection: 'row'
    
  }
});
