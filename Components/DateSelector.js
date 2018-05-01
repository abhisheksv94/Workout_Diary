import React,{Component} from 'react';
import {View,Text} from 'react-native';
import DatePicker from 'react-native-datepicker';


//simple component to launch the datepicker in android and 
//get date if selected by the user

//Props: handleDateSelected(date)

class DateSelector extends Component{
    constructor(props){
        super(props);
        const date=new Date();
        const dd=date.getDate()<10?"0"+date.getDate():date.getDate();
        const mm=(date.getMonth()+1)<10?"0"+(date.getMonth()+1):date.getMonth()+1;
        const yyyy=date.getFullYear();
        const today=mm+"/"+dd+"/"+yyyy;
        this.state={date:date};
    }
    

    handleDateSelected=(date)=>{
        console.log("IN DATESELCTOR");
        console.log(date)
        const d=new Date(date).toDateString();
        this.setState({date:d});
        this.props.handleDateSelected(this.state.date);
    }
    render(){
        return(
            <DatePicker
                style={{width:200}}
                date={this.state.date}
                mode='date'
                format="MM/DD/YYYY"
                maxDate={this.state.date}
                placeholder='select date'
                confirmBtnText="Confirm"
                cancelBtnText='Cancel'
                onDateChange={(date)=>this.handleDateSelected(date)}/>
        );
    }
}

export default DateSelector;