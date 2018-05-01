import React,{Component} from 'react';
import Modal from 'react-native-modal';
import {Text,TextInput,View,Button} from 'react-native';

export default class Dialog extends Component{
    constructor(props){
        super(props);
        this.state={
            exercise:null,
        }
    }
    onSubmit=(exercise)=>{
        this.setState({exercise},()=>{
            this.props.addExercise(this.state.exercise)
        });
    }

    render(){
        return(
            <View style={{flex: 1,
                justifyContent: "center",
                alignItems: "center"}}>
            <Modal isVisible={this.props.isVisible}
                ref={(modalRef)=>this.modalRef=modalRef} 
                onBackdropPress={()=>{this.props.onBackDropPressed()}}>
                <View style={{
                    padding:22,
                    justifyContent: "center",
                    backgroundColor:'#fff',
                    alignItems:'center',
                    borderRadius: 4,
                    borderColor: "rgba(0, 0, 0, 0.1)" 
                }}>
                    <Text>Enter Exercise Name:</Text> 
                    <TextInput style={{
                        fontSize:20,
                        fontWeight:'bold',
                    }}
                        autoCapitalize={'words'}
                        autoFocus={true}
                        autoCorrect={true}
                        onSubmitEditing={(event)=>{this.onSubmit(event.nativeEvent.text)}}/>
                </View>
            </Modal>
            </View>
        );
    }
}