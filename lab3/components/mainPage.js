import { useLinkBuilder, useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, Alert } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import MovieItem from './listItem';
import uuid from 'react-native-uuid';

export default function MainPage({movies, setMovieDetails}) {
    const navigation = useNavigation()
    useEffect(() => {
    }, [movies]);
    return (
        <SafeAreaView style={styles.container}>
          <TouchableOpacity style={styles.button} onPress={() => {
            setMovieDetails(false)
            navigation.navigate("AddMovie")}}>
            <Text style={styles.buttonText}>Add new movie</Text>
          </TouchableOpacity>

          <ScrollView style={styles.itemContainer}>
              {
                movies.map((movie) => {
                  return (<MovieItem movie={movie} setMovieDetails={setMovieDetails} key={uuid.v4()}/>)
                })
              }
          </ScrollView>
          
          <StatusBar/>
      
          
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'rgba(2, 67, 104, 1)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      width: '100%',
      marginTop: 10,
      marginBottom: 10,
      backgroundColor: 'rgb(141, 199, 157)',
      padding: 14,
      borderRadius: 5
    },
    buttonText: {
      color: 'rgb(12, 84, 32)'
    },
    itemContainer:{
      width:'100%',
      padding: 5,
      flexDirection:'column'
    }
  });