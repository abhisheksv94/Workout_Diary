import React,{Component} from 'react';
import {DrawerLayoutAndroid, View, Text, TextInput, Button} from 'react-native';

const Title=()=>{
    return(
        <Text style={{padding:20, fontSize:20, fontWeight:'bold'}}>Home</Text>
    )
}

export default class Home extends Component{
    static navigationOptions=({navigation})=>{
        const params=navigation.state.params||{};
        const title=params.title||"";
        return{
            headerTitle:<Title/>,
            headerLeft:(
                <Button
                    onPress={params.drawerlayout}
                    title={params.title||""}/>
            )
        }
    };
    componentWillMount=()=>{
        this.props.navigation.setParams({
            drawerlayout:this.openDrawerLayout,
            title:"=>",
        });
    }
    openDrawerLayout=()=>{
        const bt=this.props.navigation.state.params.title;
        if(bt==="=>"){
            this.props.navigation.setParams({
                title:"<="
            })
            this.refs.drawerlayout.openDrawer();
        }
        else{
            this.props.navigation.setParams({
                title:"=>",
            });
            this.refs.drawerlayout.closeDrawer();
        }
    }
    renderView=()=>{
        return(
            <Text style={{padding:10}}>I'm in the navigation view</Text>
        );
    }
    render(){
        return(
            <DrawerLayoutAndroid
                ref='drawerlayout'
                drawerWidth={150}
                drawerPosition={DrawerLayoutAndroid.positions.Left}
                drawerBackgroundColor='#aaa'
                renderNavigationView={this.renderView}
            >
                <View style={{padding:50}}>
                    <Text onPress={()=>this.refs.drawerlayout.openDrawer()}>I'm in the main screen</Text>
                </View>
            </DrawerLayoutAndroid>
        );
    }
}