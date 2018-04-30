import React,{Component} from 'react';
import {View,Text,Button} from 'react-native';
import {StackNavigator} from 'react-navigation';

export default class Exercise extends Component{

    static navigationOptions=function(props){
        return{
            title:"Exercise",
            headerLeft:<Button
                onPress={()=>props.navigation.navigate('DrawerOpen')}
                title="="/>
        }
    }

    render(){
        const {params}=this.props.navigation.state;
        const exerciseName=params.exerciseName?params.exerciseName:null;
        console.log("********"+exerciseName+"*********")
        return(
            <View style={{alignContent:'center',justifyContent:'center'}}>
                <Text style={{
                    padding:20,fontSize:40,fontWeight:'bold',alignContent:'center'}}>
                    In the exercise page
                </Text>
                <Text style={{padding:40,fontSize:20}}>
                    {exerciseName}
                </Text>
            </View>
        );
    }
}