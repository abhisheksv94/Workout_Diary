import React,{Component} from 'react';
import {DrawerLayoutAndroid, View, Text, TextInput, Button} from 'react-native';
import NavigationToggle from './navigationToggle';

const Title=()=>{
    return(
        <Text style={{padding:20, fontSize:20, fontWeight:'bold'}}>Home</Text>
    )
}

export default class Home extends Component{
    state={
        exercises:[],
        exercise:null,
        drawerOpen:false,
    }
    static navigationOptions=({navigation})=>{
        const params=navigation.state.params||{};
        return{
            headerTitle:<Title/>,
            headerLeft:(
                <Button
                    onPress={params.drawerlayout}
                    title="="/>
            )
        }
    };
    componentWillMount=()=>{
        this.props.navigation.setParams({
            drawerlayout:this.openDrawerLayout
        });
    }
    openDrawerLayout=()=>{
        if(this.state.drawerOpen){
            this.refs.drawerlayout.closeDrawer();
        }
        else{
            this.refs.drawerlayout.openDrawer();
        }
    }
    renderView=()=>{
        let items;
        if(this.state.exercises.length===0){
            items= <Text>No exercises added !</Text>;
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
    addExercise=()=>{
        let exercises=[...this.state.exercises];
        const exercise=this.state.exercise;
        if(exercise){
            if(exercises.indexOf(exercise)===-1){
                exercises.push(exercise);
                this.setState({exercises:exercises,exercise:null},()=>{
                    this.textInput.clear();
                    alert("Exercise added!");
                });
            }
        }
    }
    
    render(){
        return(
            <DrawerLayoutAndroid
                ref='drawerlayout'
                drawerWidth={200}
                drawerPosition={DrawerLayoutAndroid.positions.Left}
                drawerBackgroundColor='#aaa'
                onDrawerOpen={()=>this.setState({drawerOpen:true})}
                onDrawerClose={()=>this.setState({drawerOpen:false})}
                renderNavigationView={this.renderView}
            >
                <View style={{padding:50}}>
                    <TextInput style={{height:40,width:150}}
                    ref={input=>this.textInput=input}
                    placeholder="Enter exercise name"
                    onSubmitEditing={()=>this.addExercise()}
                    onChangeText={(exercise)=>this.setState({exercise})}/>
                </View>
            </DrawerLayoutAndroid>
        );
    }
}