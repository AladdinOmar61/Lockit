import {View, Text, StyleSheet, TextInput} from "react-native"

export default function Createlock () {
    return (
        <View style={styles.container}>
            <TextInput style={styles.inputField} placeholder="Name your lock" placeholderTextColor={'white'} ></TextInput>
            <TextInput style={styles.inputField} placeholder="Enter your lock brand (optional)" placeholderTextColor={'white'} ></TextInput>
            <TextInput style={styles.inputField} placeholder="Enter your lock code" placeholderTextColor={'white'} ></TextInput>
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
    }
})