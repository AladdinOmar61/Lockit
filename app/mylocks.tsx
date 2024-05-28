import { Text, View, StyleSheet, Pressable, Dimensions, FlatList } from "react-native";
import { Link } from 'expo-router';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function MylocksScreen() {

    const hardcodedLocks = [{ name: "lock1" }, { name: "lock2" }, { name: "lock3" }, { name: "lock4" }, { name: "lock5" }, { name: "lock6" }, { name: "lock7" }, { name: "lock8" }, { name: "lock9" }]

    return (
        <View style={{
            backgroundColor: "#3B3C59",
            justifyContent: "center",
        }}>
            <FlatList numColumns={2} keyExtractor={item => item.name} data={hardcodedLocks} renderItem={({ item }) => <Link href="/lockdetails" asChild style={styles.box}><Pressable><Text style={styles.lockitFont}>{item.name}</Text></Pressable></Link>} />
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
    box: {
        height: 175,
        width: screenWidth / 2.2,
        padding: 10,
        margin: 9,
        borderWidth: 2,
        borderColor: "white",
    }
});