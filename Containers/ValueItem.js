import React,{Component} from 'react';
import {Text,View,StyleSheet,TextInput,Button} from 'react-native';
import Modal from 'react-native-modal';
import SQlite from 'react-native-sqlite-storage';
SQlite.DEBUG(true);

//Container to show exercise values and add into the database

//Props: date, exercise name , database object

class ValueItem extends Component{
    state={
        values:[],
        weight:null,
        reps:null,
    }
    componentWillMount(){
        console.log("@@@@@@@@@@@@@@@@@@");
        console.log(this.props.date);
        console.log("@@@@@@@@@@@@@");
    }
    backDropPressed=()=>{
        this.props.callback();
    }
    componentDidMount(){
        const db=this.props.db;
        db.transaction(tx=>{
            tx.executeSql(
                'Select Weight , Reps from Workout_Diary where Exercise = "'+this.props.name+
                    '" and Date = "'+this.props.date+'"',[],this.successFn,this.errorFn
            );
        })
    }
    refreshList=()=>{
        this.props.refreshList();
    }
    insertIntoDataBase=(value)=>{
        console.log("******** IN INSERTINTODATABASE **************");
        console.log(this.props.date);
        const db=this.props.db;
        db.transaction(tx=>{
            tx.executeSql(
                'Insert into Workout_Diary (Exercise, Date, Weight, Reps) values ("'+
                this.props.name+'", "'+this.props.date+'", '+value.Weight+', '+
                value.Reps+' );',[],this.insertSuccess,this.errorFn);
        })
    }
    errorFn=(error)=>{
        console.log("ERROR: "+JSON.stringify(error));
    }
    insertSuccess=()=>{
        console.log("IN SUCCESS IN VALUEITEM");
        if(this.state.weight&&this.state.reps){
            const value={Weight:this.state.weight,Reps:this.state.reps};
            this.refreshList();
        }
    }
    successFn=(tx,results)=>{
        console.log("IN SUCCESS IN VALUEITEM");
        const len=results.rows.length;
        for(let i=0;i<len;i++){
            const row=results.rows.item(i);
            this.addValues({Weight:row.Weight,Reps:row.Reps});
        }
    }
    addValues=(value)=>{
        values=[...this.state.values];
        values.push({Weight:value.Weight,Reps:value.Reps});
        this.setState({values:values,weight:null,reps:null},()=>this.backDropPressed());
    }
    enterValues=()=>{
        if(this.state.weight&&this.state.reps){
            const value={Weight:this.state.weight,Reps:this.state.reps};
            this.insertIntoDataBase(value);
        }
        else alert("You must enter both values!");
    }
    render(){
        const renderValues=this.state.values.map((value,index)=>{
            return(
                <View style={{paddingTop:10,paddingBottom:10}} key={index}>
                    <Text style={{fontSize:13,fontWeight:'bold',fontStyle:'italic'}}>Set {index+1}: {' '}{' '}
                        <Text style={{fontSize:15,fontWeight:'bold',fontStyle:'normal'}}>Weight: {value.Weight}
                            <Text style={{fontSize:13,fontWeight:'normal',fontStyle:'normal'}}>{' '}lbs {' '}</Text>
                                <Text>Reps: {value.Reps}</Text>
                        </Text>
                    </Text>
                </View>
            );
        })
        return(
            <View>
                {renderValues}
                <Modal isVisible={this.props.clicked}
                    onBackdropPress={()=>this.backDropPressed()}>
                    <View style={{alignItems:'center',backgroundColor:'white',padding:40}}>
                        <Text>Enter Weight: </Text>
                        <TextInput onChangeText={(text)=>this.setState({weight:text})}/>
                        <Text>Enter Reps: </Text>
                        <TextInput onChangeText={text=>this.setState({reps:text})}/>
                        <View style={{height:20}}/>
                        <Button title="Done" onPress={()=>this.enterValues()}/>
                    </View>
                </Modal>
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