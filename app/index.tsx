import { Pressable, Text, View, StyleSheet } from "react-native";
import { Link } from 'expo-router';
import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

SplashScreen.preventAutoHideAsync();

// TODO: Adjust layout to be further separated from each other

export default function Index() {
    const [fontsLoaded, fontError] = useFonts({
        'IBM Plex Mono': require('../assets/fonts/IBMPlexMono.ttf'),
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded || fontError) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded, fontError]);

    if (!fontsLoaded && !fontError) {
        return null;
    }

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#3B3C59"
            }}
            onLayout={onLayoutRootView}
        >
            <Text style={[styles.lockitFont, { fontSize: 45, position: 'absolute', top: 100 }]}>Lock-it</Text>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-around" }}>
                <Link href="/takepicture" asChild style={styles.box}>
                    <Pressable style={{ borderWidth: 3, borderColor: "#5864A6", padding: 10, backgroundColor: "#3B3C59" }}>
                        <View style={{ display: 'flex', alignItems: 'center' }}>
                            <Text style={[styles.lockitFont, { marginTop: 15 }]}>Take picture</Text>
                            <MaterialCommunityIcons
                                name="camera"
                                size={50}
                                style={{ marginTop: 25 }}
                            />
                        </View>
                    </Pressable>
                </Link>
                <Link href="/mylocks" asChild style={styles.box}>
                    <Pressable style={{ borderWidth: 3, borderColor: "#5864A6", padding: 10, backgroundColor: "#3B3C59" }}>
                        <View style={{ display: 'flex', alignItems: 'center' }}>
                            <Text style={[styles.lockitFont, { marginTop: 15 }]}>View locks</Text>
                            <MaterialCommunityIcons
                                name="lock"
                                size={50}
                                style={{ marginTop: 25 }}
                            />
                        </View>
                    </Pressable>
                </Link>
            </View>
            <Text style={[styles.lockitFont]}>Sign in to save your locks!</Text>
            <View style={{ display: "flex", marginTop: 50 }}>
                <Pressable style={{ borderWidth: 3, paddingVertical: 5, paddingHorizontal: 10, borderColor: 'white', borderRadius: 10, backgroundColor: "#5864A6", margin: 5, flexDirection: "row", alignItems: 'center' }}><MaterialCommunityIcons name="google" size={25} style={{ marginRight: 15 }} /><Text style={styles.lockitFont}>Sign in with google</Text></Pressable>
                <Pressable style={{ borderWidth: 3, paddingVertical: 5, paddingHorizontal: 10, borderColor: 'white', borderRadius: 10, backgroundColor: "#5864A6", margin: 5, flexDirection: "row", alignItems: 'center' }}><MaterialCommunityIcons name="email" size={25} style={{ marginRight: 15 }} /><Text style={styles.lockitFont}>Sign in with email</Text></Pressable>
            </View>
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
        width: 175,
        padding: 15,
        margin: 10
    }
});
