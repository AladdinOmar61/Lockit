import { View, Text, StyleSheet, Dimensions, Button } from "react-native";
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';

const screenHeight = Dimensions.get('window').height;

export default function TakePictureScreen() {
    const [permission, requestPermission] = useCameraPermissions();

    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#3B3C59"
            }}>
                <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    return (
        <View style={{
            backgroundColor: "#3B3C59",
            justifyContent: "center",
            flex: 1
        }}>
            <CameraView style={styles.detailsBox}>
                <Text style={[styles.lockitFont, { textAlign: 'left', marginHorizontal: 20, position: 'absolute', top: 10 }]}>
                    Looking to detect a lock...
                </Text>
            </CameraView>
        </View>
    );
}

const styles = StyleSheet.create({
    lockitFont: {
        fontFamily: 'IBM Plex Mono',
        color: 'red',
        textAlign: 'center',
        fontSize: 15,
    },
    detailsBox: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'white',
        backgroundColor: '#5864A6',
        height: screenHeight - 50,
    }
});