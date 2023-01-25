import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View, SafeAreaView, Button, Alert } from 'react-native';
import Movie from './components/newMovie';

//const Stack = createNativeStackNavigator();
export default function App() {
  return (

    <SafeAreaView style={styles.container}>
          <Button
            title="See all movies"
            color='white'
            //backgroundColor='rgba(71, 219, 252, 1)'
            onPress={() => Alert.alert('Simple Button pressed')}
          />
      
          <Button
            title="Add new movie"
            color='white'
            //backgroundColor='rgba(28, 22, 65, 1)'
            onPress={() => Alert.alert('Simple Button pressed')}
          />
          <StatusBar style="auto" />
    </SafeAreaView>
    /*<NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="AddNewMovie" component={Movie} />
        </Stack.Navigator>
        
    </NavigationContainer>*/
    
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
