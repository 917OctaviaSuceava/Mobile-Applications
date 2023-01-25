import { StyleSheet, Text, View, SafeAreaView, Button, Alert } from 'react-native';

export default function Movie() {
    const [text, onChangeText] = React.useState("Useless Text");
    return (
        <SafeAreaView>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
            />
        </SafeAreaView>
    )

}