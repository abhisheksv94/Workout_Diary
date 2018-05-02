import React,{Component} from 'react';
import {View,Text,TextInput,TouchableHighlight,Button,StyleSheet,FlatList,ScrollView} from 'react-native';
import Modal from 'react-native-modal';
import DateSelector from '../Components/DateSelector';
import DateItem from '../Components/DateItem';
import ValueItem from '../Components/ValueItem';

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
    componentDidMount(){
        const db=this.props.screenProps.db;
        const col2=this.props.screenProps.col2;
        const tablename=this.props.screenProps.TableName;
        const {params}=this.props.navigation.state;
        const exerciseName=params.exerciseName;
        const col1=this.props.screenProps.col1;
        db.transaction(tx=>{
            tx.executeSql(
                'Select '+col2+' from '+tablename+' where '+col1+' = ?',[exerciseName],this.successFn,this.errorFn
            );
        })
    }
    successFn=(tx,results)=>{
        console.log("IN SUCCESS");
        const len=results.rows.length;
        for(let i=0;i<len;i++){
            this.handleDateSelected(results.rows.item(i).Date);
            console.log(JSON.stringify(results.rows.item(i)));
        }   
    }
    errorFn=()=>{
        console.log("ERROR");
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
        const {params}=this.props.navigation.state;
        const exerciseName=params.exerciseName?params.exerciseName:null;
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
                                <ValueItem date={item.title} name={exerciseName} db={this.props.screenProps.db}/>
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
        backgroundColor:"#d8d8d8",
        paddingTop: 10,
        flex: 1,
    },
    box:{
        flex:1,
        alignItems:'center',
        backgroundColor:'#dff2f5',
        margin:20,
        borderRadius:40,
        minHeight:100,
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