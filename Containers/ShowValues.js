import React,{Component} from 'react';
import DateItem from '../Components/DateItem';
import ValueItem from './ValueItem';
import {View} from 'react-native';

export default class ShowValues extends Component{
    constructor(props){
        super(props);
        this.state={
            valuesModalVisible:false,
            date:this.props.date,
            selectedDate:this.props.date,
        }
    }

    handleDateClicked=(selectedDate)=>{
        console.log("You clicked on date: "+selectedDate);
        this.setState({valuesModalVisible:true,selectedDate:selectedDate},()=>{
            console.log("^^^^^^^^^^^^^\n");
            console.log(this.state.selectedDate);
            console.log("^^^^^^^^^^^^^\n");
            this.props.setDate(selectedDate);
        });
    }
    addValue=()=>{
        console.log("value added");
        this.setState({
            valuesModalVisible:false,
            currentDate:null,
        })
    }
    refreshList=()=>{
        this.setState({
            valuesModalVisible:false,
            currentDate:null,
        },()=>this.props.refreshList())
        
    }

    render(){
        console.log("\n"+this.props.index+"\n")
        return(
           <View>
               <DateItem date={this.state.date} separators={this.props.separators} dateSelected={this.handleDateClicked}/>
                <ValueItem refreshList={this.refreshList}date={this.state.selectedDate} name={this.props.exercise} db={this.props.db} clicked={this.state.valuesModalVisible} callback={this.addValue}/>
           </View>
        );
    }
}