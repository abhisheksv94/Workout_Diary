import React,{Component} from 'react';
import {View,Text,TextInput,TouchableHighlight,Button,StyleSheet,FlatList,ScrollView} from 'react-native';
import Modal from 'react-native-modal';
import DateSelector from '../Components/DateSelector';
import DateItem from '../Components/DateItem';

//the exercise page showing the workouts of the particular exercise
export default class Exercise extends Component{
    state={
        dates:[],
        isModalVisible:false,
        renderList:false,
    }

    static navigationOptions=function({navigation}){
        return{
            title:navigation.state.params.headerTitle,
            headerLeft:null
        }
    }

    componentWillMount=()=>{
        const {params}=this.props.navigation.state;
        const exerciseName=params.exerciseName?params.exerciseName:null;
        this.props.navigation.setParams({headerTitle:exerciseName});
    }
    handleButtonClick=()=>{
        this.setState({isModalVisible:true});
    }
    //sort function for the dates
    sortDates=(date1,date2)=>{
        const d1=new Date(date1);
        const d2=new Date(date2);
        return (d1-d2)*-1;
    }
    handleDateSelected=(date)=>{
        console.log("***********");
        console.log(date);
        console.log("************");
        if(date!==undefined){
            let dates=[...this.state.dates];
            if(dates.indexOf(date)===-1){
                dates.push(date)
                dates.sort(this.sortDates);
                this.setState({isModalVisible:false,dates:dates});
            }
        }
    }
    renderListChildren(){
        const items=this.state.dates.map((date,key)=><Text key={key}>{date}</Text>);
        return items;
    }
    render(){
        return(
            <View style={styles.container}>
                <FlatList
                    data={this.state.dates.map((date)=>{
                        return {
                            title: date,
                            key: date,
                        };
                    })}
                    renderItem={({item,separators})=>{
                        return(
                            <View style={styles.box}>
                                <DateItem date={item.title} separators={separators}/>
                            </View>)}}/>
                <View style={styles.footer}>
                    <Button title="+" onPress={()=>{this.handleButtonClick()}}/>
                </View>
                <Modal isVisible={this.state.isModalVisible}
                    onBackdropPress={()=>{this.setState({isModalVisible:false})}}>
                    <View style={styles.modalStyle}>
                        <DateSelector handleDateSelected={this.handleDateSelected}/>
                        <View></View>
                    </View>
                </Modal>
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
        flex: 1,
    },
    box:{
        flex:1,
        margin:20,
        backgroundColor:'gray',
        minHeight:100
    },
    textStyle:{
        fontSize: 15,
        fontWeight: 'bold',
        marginStart:20,
    },
    modalStyle:{
        padding:30,
        justifyContent: "center",
        backgroundColor:'#fff',
        alignItems:'center',
    }
})