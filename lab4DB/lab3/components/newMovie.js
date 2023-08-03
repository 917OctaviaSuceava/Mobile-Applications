import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, SafeAreaView, Button, Alert, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import * as SQLite from 'expo-sqlite'
//import { uuid } from 'uuidv4';
const db = SQLite.openDatabase('db.movies')

export default function Movie({movies, setMovies, movie}) {
    const navigation = useNavigation()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [duration, setDuration] = useState('')
    const [datetime, setDateTime] = useState('')
    const [actors, setActors] = useState('')

    const [inputText, setInputText] = useState('')
    
    useEffect( () => {
      setTitle(movie.title)
      setDescription(movie.description)
      setDuration(movie.duration)
      setDateTime(movie.datetime)
      setActors(movie.actors)
    }, [movie])

    const min = 1
    const max = 100

    

    const add = async () => {
        var moviesList = movies
        var idd = Math.floor(Math.random() * (max - min + 1)) + min
        moviesList.push({ id: idd, title: title, description: description, 
            duration: duration, datetime: datetime, actors: actors})
        setMovies(Array.from(moviesList))
        db.transaction(
            (tx) => {
                tx.executeSql("INSERT INTO Movies (id,title,description,duration,datetime,actors) values (?,?,?,?,?,?)", [idd,title,description,duration,datetime,actors]);
                tx.executeSql("SELECT * FROM Movies", [], (_, { rows }) => console.log(JSON.stringify(rows))
                );
            }
        );
        
        navigation.navigate('Home')
    }


    const deleteMovie = () => {
        if(movie)
        {   
            Alert.alert("Are you sure you want to delete this item?",
                                        "", [
                                            {text: "Yes", onPress: () => {
                                                var moviesList = []
                                                movies.forEach(m=> {
                                                    if(m.id != movie.id)
                                                        moviesList.push(m)
                                                })
                                                setMovies(Array.from(moviesList))
                                                db.transaction(
                                                    (tx) => {
                                                        tx.executeSql("DELETE FROM Movies WHERE id=?", [movie.id]);
                                                        tx.executeSql("SELECT * FROM Movies", [], (_, { rows }) =>
                                                        console.log(JSON.stringify(rows))
                                                        )
                                                    },
                                                     (error) => {
                                                        console.log(error)
                                                    }
                                                );
                                                navigation.navigate('Home')
                                            }},
                                            {text: "Cancel", style: 'cancel'}
                                        ])
            
        }
        else Alert.alert("No movie to delete!")
    }

    const editMovie = () => {
        var moviesList = movies.map( m => {
            if(m.id == movie.id)
                return {id: m.id, title: title, description: description, duration: duration, datetime: datetime, actors: actors}
            return m
        })
      setMovies(Array.from(moviesList))
      db.transaction(
        (tx) => {
            tx.executeSql("UPDATE Movies SET title=?, description=?, duration=?, datetime=?, actors=? WHERE id=?", [title, description, duration, datetime, actors, movie.id]);
            tx.executeSql("SELECT * FROM Movies", [], (_, { rows }) =>
            console.log(JSON.stringify(rows))
            )
        },
        (error) => {
            console.log(error)
        }
    );
      setInputText('')
      navigation.navigate('Home')
    } 

    return (
        
        <KeyboardAvoidingView style={styles.container} behavior='height'>
            <View style={styles.buttons}>
                <TouchableOpacity style={styles.buttonSave} onPress={movie? editMovie : add}>
                    <Text>Save</Text>
                </TouchableOpacity>
                 
                <TouchableOpacity style={styles.buttonDelete} onPress={deleteMovie}>
                    <Text>Delete</Text>
                </TouchableOpacity>
            </View>
            
            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1}} keyboardDismissMode="interactive">
                <TextInput
                    style={styles.textInputStyle}
                    placeholder='Enter movie title...'
                    returnKeyType='done'
                    name='title'
                    defaultValue={title}
                    clearButtonMode="always"
                    //value={inputText}
                    onChangeText={ text => setTitle(text)}
                />
                <TextInput
                    style={styles.textInputStyle}
                    placeholder='Enter movie description...'
                    multiline={true}
                    numberOfLines={4}
                    returnKeyType='done'
                    name='description'
                    defaultValue={description}
                    clearButtonMode="always"
                    //value={inputText}
                    onChangeText={ text => setDescription(text)}
                />
                <TextInput
                    style={styles.textInputStyle}
                    placeholder='Enter movie duration...'
                    returnKeyType='done'
                    name='duration'
                    defaultValue={duration}
                    clearButtonMode="always"
                    //value={inputText}
                    onChangeText={ text => setDuration(text)} 
                />

                <TextInput
                    style={styles.textInputStyle}
                    placeholder='Enter movie date and time...'
                    returnKeyType='done'
                    name='datetime'
                    defaultValue={datetime}
                    clearButtonMode="always"
                    //value={inputText}
                    onChangeText={ text => setDateTime(text)} 
                />
                
                <TextInput
                    style={styles.textInputStyle}
                    placeholder='Enter movie actors...'
                    returnKeyType='done'
                    name='actors'
                    defaultValue={actors}
                    clearButtonMode="always"
                    //value={inputText}
                    onChangeText={ text => setActors(text)} 
                />
        </ScrollView>
        
        </KeyboardAvoidingView>
          
    )

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'rgba(199, 204, 249, 1)'
    },
    textInputStyle: {
        margin: 15,
        borderBottomWidth: 1,
        padding: 10,
        borderBottomColor: 'rgb(161, 165, 199)',
        
    },
    multilineText: {
        margin: 15,
        borderBottomWidth: 1,
        padding: 20,
        borderBottomColor: 'rgb(161, 165, 199)'
    },
    buttonSave: {
        display: 'flex',
        margin: 15,
        backgroundColor: 'rgb(141, 199, 157)',
        padding: 14,
        paddingHorizontal: 60,
        borderRadius: 5
      },
    buttonDelete: {
        display: 'flex',
        margin: 15,
        backgroundColor: 'rgb(199, 91, 86)',
        padding: 14,
        paddingHorizontal: 60,
        borderRadius: 5
      },
    buttons: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center'
    }
  });
