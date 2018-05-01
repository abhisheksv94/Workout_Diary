import React,{Component} from 'react';
import {View,Text,TextInput,TouchableHighlight,Button,StyleSheet,FlatList,} from 'react-native';
import Modal from 'react-native-modal';

//the exercise page showing the workouts of the particular exercise
export default class Exercise extends Component{
    state={
        data:[{title: 'Title Text', key: 'item1'},
                {title: 'Second Title', key:'item2'}],
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
    handleSubmit=(text)=>{
        let data=[...this.state.data];
        const obj={title:text,key:"item"+data.length};
        data.push(obj);
        this.setState({data:data,isModalVisible:false});
    }
    handleTouch=(title)=>{
        alert("You clicked on title:\t"+title);
    }

    render(){
        
        return(
            <View style={styles.container}>
                <FlatList  
                    data={this.state.data}
                    renderItem={({item, separators}) => (
                        <TouchableHighlight
                        onPress={()=> {this.handleTouch(item.title)}}
                        onShowUnderlay={separators.highlight}
                        onHideUnderlay={separators.highlight}>
                        <View style={{backgroundColor: 'white',height:50,borderBottomColor:'black',margin:20}}>
                            <Text style={styles.textStyle}>{item.title}</Text>
                        </View>
                        </TouchableHighlight>
                    )}
                    
                />
                <View style={styles.footer}>
                    <Button title="+" onPress={()=>{this.handleButtonClick()}}/>
                </View>
                <Modal isVisible={this.state.isModalVisible}
                    onBackdropPress={()=>{this.setState({isModalVisible:false})}}>
                    <View style={styles.modalStyle}>
                        <Text style={styles.textStyle}>Enter weight:</Text><TextInput style={styles.textStyle}
                        onSubmitEditing={(event)=>this.handleSubmit(event.nativeEvent.text)} autoFocus={true}/>
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