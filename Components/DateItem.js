import React from 'react';
import {Text,TouchableHighlight,StyleSheet,View} from 'react-native';

//simple component to show the date

//Props: date,seperators

const DateItem=(props)=>{
    handleTouch=(selectedDate)=>{
        props.dateSelected(selectedDate);
    }
    return(
        <TouchableHighlight
            onPress={()=> {this.handleTouch(props.date)}}>
            <View style={{backgroundColor:'#004c99',borderRadius:15,padding:10,margin:10,alignItems:'center'}}>
                <Text style={{fontWeight:'bold',color:'white',fontSize:15}}>{props.date}</Text>
            </View>
        </TouchableHighlight>
    );
}

export default DateItem;