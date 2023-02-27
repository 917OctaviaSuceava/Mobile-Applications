import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View, SafeAreaView, Button, Alert } from 'react-native';
import Movie from './components/newMovie';
import { useEffect, useState } from 'react';
import MainPage from './components/mainPage';
import uuid from 'react-native-uuid';
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase('db.movies')
const Stack = createStackNavigator();

const deleteEmpty = () =>
{
  db.transaction((tx) => {
    tx.executeSql(
      `DROP TABLE Movies`
    );
  });
}
export default function App() {

  /*const [movies, setMovies] = useState(
    [{id: uuid.v4(), title: "movie1", description: "description1", duration: "1h45m", datetime: "10.10.2022", actors: "a1 a2 a3"},
     {id: uuid.v4(), title: "movie2", description: "description2", duration: "1h45m", datetime: "11.10.2022", actors: "a11 a22 a33"},
     {id: uuid.v4(), title: "movie3", description: "description3", duration: "1h45m", datetime: "12.10.2022", actors: "a16 a25 a34"}]
  )*/
  const [movies, setMovies] = useState([])
  const [movie, setMovieDetails] = useState(false)

  const selectOperation = async () => {
    db.transaction((tx) => {
     tx.executeSql(
       `SELECT * FROM Movies`,
       [],
       (_, resultSet ) => setMovies(resultSet.rows._array),
       (_, error) => console.log(error)
     );
   });
  }
  

  
  useEffect(() => {
    selectOperation()
    db.transaction(
      (tx)=>{
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS Movies (id TEXT, title TEXT, description TEXT, duration TEXT, datetime TEXT, actors TEXT)'
            )
          }
        )
    }, [])
    
  return (
    <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home"
            children={() => <MainPage movies={movies} setMovieDetails={setMovieDetails}/>} />
          <Stack.Screen name="AddMovie" 
            children={() => <Movie movies={movies} setMovies={setMovies} movie={movie}/>}/>
        </Stack.Navigator>
        
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(2, 67, 104, 1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
