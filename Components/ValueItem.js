import React from 'react';
import {Text,View} from 'react-native';

//simple component to list out the exercise values

//Props: exercise values

const ValueItem=(props)=>{
    const data=props.values?props.values:null;
    let dataValues=null;
    if(data){
        dataValues=data.map((values)=><Text>{values}</Text>);
    }
    return(
        <View>
            {dataValues}
        </View>
    );
}


export default ValueItem;