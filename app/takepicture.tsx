import { View, Text, StyleSheet, Dimensions, Pressable, Button } from "react-native";
import { CameraView, useCameraPermissions } from 'expo-camera';
import { DetectedObject } from '@tensorflow-models/coco-ssd';
import { useRef, useState } from 'react';
import { CameraCapturedPicture } from 'expo-camera';

const screenHeight = Dimensions.get('window').height;

export default function TakePictureScreen() {
    const [permission, requestPermission] = useCameraPermissions();
    const [predictions, setPredictions] = useState<DetectedObject[]>([]);
    const [data, setData] = useState<undefined | CameraCapturedPicture>();
    //const camera = useRef(Promise<undefined | CameraCapturedPicture>);
    const camera = useRef<CameraView | null>(null);

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

    const takePic = async () => {
        try {
            const data = await camera.current?.takePictureAsync();
            setData(data);
            if (data) {
                console.log(data)
            }
        } catch (err) {
            console.error(err);
        }
    }

        return (
            <View style={{
                backgroundColor: "#3B3C59",
                justifyContent: "center",
                flex: 1
            }}>
                <CameraView ref={camera} style={styles.detailsBox}>
                    <Text style={[styles.lockitFont, { textAlign: 'left', marginHorizontal: 20, position: 'absolute', top: 10 }]}>
                        Looking to detect a lock...
                    </Text>
                    <Pressable onPress={takePic} style={{ width: 75, height: 75, backgroundColor: 'transparent', borderRadius: 100, position: 'absolute', bottom: 20, borderWidth: 10, borderColor: 'white' }} />
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
