import React,{Component} from 'react';
import {Button,Text} from 'react-native';
import {StackNavigator, } from 'react-navigation';
import Exercise from './Exercise'

const NavigationToggle=(props)=>{
    return(
        <Text style={{alignSelf:'center',fontSize:20,fontWeight:'bold',padding:10}}
        onPress={()=>props.navigation.navigate('Exercise',{
            exerciseName:props.text,
        })}>
            {props.index}{'. '}{props.text}
        </Text>
    )    
}
export default NavigationToggle;