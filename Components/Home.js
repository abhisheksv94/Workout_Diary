import React,{Component} from 'react';
import {ScrollView, StyleSheet,View, Text, TextInput, Button} from 'react-native';
import NavigationToggle from './navigationToggle';
import Dialog from './dialog';

const Title=()=>{
    return(
        <Text style={{padding:20, fontSize:20, fontWeight:'bold'}}>Home</Text>
    )
}

export default class Home extends Component{
    state={
        exercises:[],
        isVisible:false,
    }
    static navigationOptions=({navigation})=>{
        const params=navigation.state.params||{};
        return{
            headerTitle:<Title/>,
            headerLeft:null
        }
    };
    
    renderView=()=>{
        let items;
        if(this.state.exercises.length===0){
            items= <Text style={{
                alignSelf:'center',
                fontSize:15,
                fontWeight:'bold',
            }}>No exercises added !</Text>;
        }
        else{
            items=this.state.exercises.map((name,index)=><NavigationToggle
            navigation={this.props.navigation}
            index={index+1}
            key={index}
            text={name}/>)
        }
        return items;
    }
    addExercise=(exercise)=>{
        let exercises=[...this.state.exercises];
        if(exercise){
            if(exercises.indexOf(exercise)===-1){
                exercises.push(exercise);
                this.setState({exercises:exercises,isVisible:false},()=>{
                    console.log("Exercise: "+exercise+" added");
                });
            }
        }
    }
    render(){
        return(
            <View style={styles.container}>
                <View>
                    <Dialog isVisible={this.state.isVisible} addExercise={this.addExercise}
                        onBackDropPressed={()=>this.setState({isVisible:false})}
                    />
                </View>
                <ScrollView style={{
                    alignSelf:'flex-start',
                    padding:10,
                }}>
                    {this.state.exercises.length>0?
                    <Text style={{
                        fontSize:25,
                        fontWeight:'bold',
                        fontStyle:'italic',
                    }}>Exercises: </Text>:null}
                    {this.renderView()}
                </ScrollView>
                <View style={styles.footer}>
                    <Button title="+"
                        onPress={()=>this.setState({isVisible:true})}/>
                </View>
            </View>
        );
    }
}

var styles=StyleSheet.create({
    footer: {
        alignSelf:'flex-end',
        bottom:30,
        height:50,
        width:40,
        margin:30,
      },
    container: {
        paddingTop: 10,
        flex: 1
    },
})