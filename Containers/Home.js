import React,{Component} from 'react';
import {ScrollView, StyleSheet,View, Text, TextInput, Button} from 'react-native';
import NavigationToggle from '../Components/navigationToggle';
import Dialog from '../Components/dialog';

//main screen
//base screen for the app to traverse through all the exercises


//formatting the title
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
    //navigation options for the screen
    static navigationOptions=({navigation})=>{
        const params=navigation.state.params||{};
        return{
            headerTitle:<Title/>,
            headerLeft:null
        }
    };
    
    //renders the list of exercises with touch input navigating to the exercise screen
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
    //adds the exercise to the exercises array if it is not already present
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
    //renders the page with scrollview header and list of exercises
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