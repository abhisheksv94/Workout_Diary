import React, { Component } from 'react';
import {Stylesheet,Text,View} from 'react-native';
import {StackNavigator,DrawerNavigator} from 'react-navigation';
import Home from './Containers/Home';
import Exercise from './Containers/Exercise';
import SQLite from 'react-native-sqlite-storage';

SQLite.DEBUG(true);
SQLite.enablePromise(false);
const db=SQLite.openDatabase('Workout_Diary.db',()=>console.log("*********Database opened**************"),()=>console.log("*****************Error************"));

//navigation component
//point of entry for the application

const Navigation=StackNavigator({
  Home:{screen:Home},
  Exercise:{screen:Exercise}
});

export default class App extends Component {
  constructor(props){
    super(props);
    this.state={
      database:{
        TableName:"Workout_Diary",
        col1:"Exercise",
        col2:"Date",
        col3:"Weight",
        col4:"Reps",
        db:db,
      }
    };
    db.transaction(tx=>{
      //tx.executeSql("DROP TABLE IF EXISTS "+this.state.database.TableName);
      tx.executeSql(" CREATE TABLE IF NOT EXISTS "+this.state.database.TableName+" ( "
    + "ID INTEGER PRIMARY KEY AUTOINCREMENT, "+this.state.database.col1+" VARCHAR(30), "+this.state.database.col2+" VARCHAR(30), "
    + this.state.database.col3 +" VARCHAR(30), "+this.state.database.col4+" VARCHAR(30) );",[],()=>console.log("******SUCCESS***"),(error)=>console.log("*******ERROR******"+error.message));
    })
  }
  render() {
    return (
      <Navigation screenProps={this.state.database}/>
    );
  }
}