import React,{Component} from 'react';
import {Text,View,StyleSheet} from 'react-native';

//simple component to list out the exercise values

//Props: date, exercise name , database object

class ValueItem extends Component{
    state={
        values:[],
        date:this.props.date,
        name:this.props.name
    }
    componentDidMount(){
        const db=this.props.db;
        db.transaction(tx=>{
            tx.executeSql(
                'Select Weight , Reps from Workout_Diary where Exercise = "'+this.state.name+
                    '" and Date = "'+this.state.date+'"',[],this.successFn,this.errorFn
            );
        })
    }
    errorFn=(error)=>{
        console.log("ERROR: "+error.message);
    }
    successFn=(tx,results)=>{
        console.log("IN SUCCESS IN VALUEITEM");
        const len=results.rows.length;
        values=[...this.state.values];
        for(let i=0;i<len;i++){
            const row=results.rows.item(i);
            values.push({Weight:row.Weight,Reps:row.Reps});
        }
        this.setState({values:values});
    }
    render(){
        const renderValues=this.state.values.map((value,index)=>{
            return(
                <Text style={{fontSize:13,fontWeight:'bold',fontStyle:'italic'}}key={index}>Set {index+1}: {' '}{' '}
                    <Text style={{fontSize:15,fontWeight:'bold',fontStyle:'normal'}}>Weight: {value.Weight}
                        <Text style={{fontSize:13,fontWeight:'normal',fontStyle:'normal'}}>{' '}lbs {' '}</Text>
                            <Text>Reps: {value.Reps}</Text>
                    </Text>
                </Text>
            );
        })
        return(
            <View>
                {renderValues}
            </View>
        );
    }
}


export default ValueItem;

styles=StyleSheet.create({
    textStyle:{
        fontSize:15,
        fontWeight: 'bold',
        fontStyle: 'italic',
    }
});