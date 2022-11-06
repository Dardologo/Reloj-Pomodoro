import {View, Text } from "react-native";
import { useState, useContext, useEffect } from "react";
import styles from "./styles"
import GlobalContext from "../global/GlobalContext";
import { vibrate } from "../../utils";

const DEFAULT_WORK_MINS = 0.15
const DEFAULT_BREAK_MINS =0.05
const mintToSecond = min=>min * 60
let interval

export default () => {
    
    const { activeTimer, isWorking, setIsWorking } = useContext (GlobalContext) 
   

    const [timeRemaining, setTimeRemaining] = useState(mintToSecond(DEFAULT_WORK_MINS))

    useEffect(()=> {
        if (Math.floor(timeRemaining) === 0){
            vibrate()
            setTimeRemaining((isWorking) ? mintToSecond(DEFAULT_BREAK_MINS): mintToSecond(DEFAULT_WORK_MINS))
            /* if (isWorking){
                setTimeRemaining(mintToSecond(DEFAULT_BREAK_MINS))
            }else {
                setTimeRemaining(mintToSecond(DEFAULT_WORK_MINS))
            } */
            setIsWorking(prev => !prev)
        }
    }, [timeRemaining])

    useEffect(()=> {
        console.log("Aqui prendemos o pausamos le cronometro");
        if(activeTimer){
            //Hay que detenerlo
            clearInterval(interval)
        }else {
            interval =setInterval(()=>{
                setTimeRemaining(prev => prev -1)
            }, 1000);
        }
    },[activeTimer])

    const mins = Math.floor(timeRemaining / 60)
    const sec = Math.floor(timeRemaining %60)

    const paddZero = value => value <10 ? '0' : ''


    
    return(
        <View style={styles.center}>
            <Text style={styles.text}>{paddZero(mins)}{mins}:{paddZero(sec)}{sec}</Text>
        </View> 
    )
}