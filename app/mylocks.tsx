import { Text, View, StyleSheet, Pressable, Dimensions, FlatList } from "react-native";
import { Link } from 'expo-router';
import { transform } from "@babel/core";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function MylocksScreen() {

    const hardcodedLocks: Array<any> | null = [{name: "lock1"}]

    return (
        <View style={{
            flex: 1,
            backgroundColor: "#3B3C59",
            justifyContent: "center",
        }}>
            {hardcodedLocks.length > 0 ? (
                <FlatList numColumns={2} keyExtractor={item => item.name} data={hardcodedLocks} renderItem={({ item }) => <Link href="/lockdetails" asChild style={styles.box}><Pressable><Text style={styles.lockitFont}>{item.name}</Text></Pressable></Link>} />
            ) : (
                <Text style={styles.lockitFont}>You have no locks registered!</Text>
            )}
            <Pressable style={styles.addLock}><Link href="/createlock"><MaterialCommunityIcons name="plus" size={40}/></Link></Pressable>
        </View>
    )
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
    },
    addLock: {
        width: 65,
        height: 65,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 50,
        position: 'absolute',
        bottom: 40,
        right: 40,
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: "center",
        alignItems: 'center',
    },
    plus: {
        fontFamily: 'IBM Plex Mono',
        textAlign: 'center',
        fontSize: 30,
        color: 'black',
        maxHeight: 40,
        lineHeight: 35,
    }
});