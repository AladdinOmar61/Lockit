import { View, Text, StyleSheet } from "react-native";

export default function LockDetailsScreen() {
    return (
        <View style={{
            backgroundColor: "#3B3C59",
            justifyContent: "center",
            flex: 1
        }}>
            <View style={styles.detailsBox}></View>
            <Text style={[styles.lockitFont, { textAlign: 'left', marginHorizontal: 40 }]}>Lock Combination: Information</Text>
            <Text style={[styles.lockitFont, { textAlign: 'left', marginHorizontal: 40 }]}>Brand: more information</Text>
            <Text style={[styles.lockitFont, { textAlign: 'left', marginHorizontal: 40 }]}>Created: even more information</Text>
            <Text style={[styles.lockitFont, { textAlign: 'left', marginHorizontal: 40 }]}>Last opened: the most info</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    lockitFont: {
        fontFamily: 'IBM Plex Mono',
        color: 'white',
        textAlign: 'center',
        fontSize: 15,
    },
    detailsBox: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        padding: 10,
        borderWidth: 2,
        borderColor: 'white',
        backgroundColor: '#5864A6',
        height: 250,
        marginHorizontal: 40,
    }
});