import { Text, View, StyleSheet, ScrollView, Dimensions, FlatList } from "react-native";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function MylocksScreen() {

    const hardcodedLocks = [{ name: "lock1" }, { name: "lock2" }, { name: "lock3" }, { name: "lock4" }, { name: "lock5" }, { name: "lock6" }, { name: "lock7" }, { name: "lock8" }]

    // TODO: get scrolling to render bottom section
    // TODO: Get bg color to work

    return (
        <View style={{
            height: screenHeight,
            width: screenWidth,
            backgroundColor: "##3B3C59"
        }}>
            <FlatList numColumns={2} keyExtractor={item => item.name} data={hardcodedLocks} renderItem={({ item }) => <View style={[styles.box, {flexGrow: 1}]}><Text>{item.name}</Text></View>} />
        </View>
    );
}

const styles = StyleSheet.create({
    lockitFont: {
        fontFamily: 'IBM Plex Mono',
        color: 'white',
        textAlign: 'center',
        fontSize: 20
    },
    box: {
        height: 175,
        width: screenWidth / 2.3,
        padding: 15,
        margin: 10,
        borderWidth: 3,
        borderColor: "#5864A6",
    }
});