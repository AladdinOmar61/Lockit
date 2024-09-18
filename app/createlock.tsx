import { Link } from "expo-router";
import { View, Text, StyleSheet, TextInput, Pressable, Alert } from "react-native"

export default function Createlock() {
    const lockCreatedSuccessfullyAlert = () =>
        Alert.alert('Notice', 'New lock created successfully', [
            {
                text: 'Ok',
                onPress: () => console.log('pressed') //take user back to mylocks
            }
        ]);
    return (
        <View style={styles.container}>
            <TextInput style={styles.inputField} placeholder="Name your lock" placeholderTextColor={'white'} ></TextInput>
            <TextInput style={styles.inputField} placeholder="Enter your lock brand (optional)" placeholderTextColor={'white'} ></TextInput>
            <TextInput style={styles.inputField} placeholder="Enter your lock code" placeholderTextColor={'white'} ></TextInput>
            <Pressable style={styles.submit} onPress={lockCreatedSuccessfullyAlert}><Text style={[styles.lockitText, { color: 'black' }]}>Submit</Text></Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#3B3C59",
    },
    lockitText: {
        fontFamily: 'IBM Plex Mono',
        color: 'white',
        textAlign: 'center',
        fontSize: 15,
    },
    inputField: {
        borderWidth: 1,
        borderColor: 'white',
        margin: 15,
        padding: 7,
        color: 'white',
    },
    submit: {
        borderColor: 'white',
        borderWidth: 1,
        width: 100,
        marginHorizontal: 'auto',
        padding: 5,
        backgroundColor: 'white',
    },
    submitPressed: {
        backgroundColor: 'black',
    }
})