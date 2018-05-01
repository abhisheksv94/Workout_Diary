import React from 'react';
import {Text,TouchableHighlight,StyleSheet,View} from 'react-native';

//simple component to show the date

//Props: date,seperators

const DateItem=(props)=>{
    handleTouch=(date)=>{
        alert("You clicked on date:\t"+date);
    }
    return(
        <TouchableHighlight
            onPress={()=> {this.handleTouch(props.date)}}>
            <View style={styles.container}>
                <Text style={styles.textStyle}>{props.date}</Text>
            </View>
        </TouchableHighlight>
    );
}

export default DateItem;

styles=StyleSheet.create({
    container:{
        flex:1,
        borderBottomColor:'black',
        margin:5,
        alignItems:'center',
    },
    
    textStyle:{
        fontSize: 15,
        backgroundColor: 'steelblue',
        fontWeight: 'bold',
    },
})