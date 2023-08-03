import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, Alert, Pressable } from 'react-native';

export default function MovieItem({movie, setMovieDetails}) {
    const navigation = useNavigation()
    const onEdit = () =>{
        setMovieDetails(movie)
        navigation.navigate('AddMovie')
    }
    return (
        <Pressable style={styles.item} onPress={onEdit}>
            <Text style={styles.titleText}>{movie.title}</Text>
            <Text style={styles.descriptionText}>{movie.description}</Text>
        </Pressable>
        )

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'rgba(2, 67, 104, 1)'
    },

    item: {
        backgroundColor: 'rgba(199, 204, 249, 1)',
        shadowOffset: {width: 1, height: 1},
        borderRadius: 6,
        shadowColor: '#333',
        shadowOpacity: 0.3,
        elevation: 3,
        marginHorizontal: 10,
        marginVertical: 10,
        padding: '5%'
    },
    titleText: {
        fontSize: 20,
        fontFamily: 'Verdana',
        fontWeight: "bold",
        paddingTop: 10,
        paddingBottom: 10

    },
    descriptionText: {
        fontFamily: 'Verdana',
        paddingTop: 10,
        paddingBottom: 10
    }
  });