// import { View, Text, StyleSheet, Dimensions, Pressable, Button } from "react-native";
// import { CameraView, useCameraPermissions } from 'expo-camera';
// import { DetectedObject } from '@tensorflow-models/coco-ssd';
// import { useRef, useState } from 'react';
// import { CameraCapturedPicture } from 'expo-camera';
// import * as cocoSsd from '@tensorflow-models/coco-ssd';
// import * as tf from '@tensorflow/tfjs';
// import "@tensorflow/tfjs-react-native";

// const screenHeight = Dimensions.get('window').height;

// export default function TakePictureScreen() {
//     const [permission, requestPermission] = useCameraPermissions();
//     const [predictions, setPredictions] = useState<DetectedObject[]>([]);
//     const [data, setData] = useState<undefined | CameraCapturedPicture>();
//     //const camera = useRef(Promise<undefined | CameraCapturedPicture>);
//     const camera = useRef<CameraView | null>(null);

//     if (!permission) {
//         // Camera permissions are still loading.
//         return <View />;
//     }

//     if (!permission.granted) {
//         // Camera permissions are not granted yet.
//         return (
//             <View style={{
//                 flex: 1,
//                 justifyContent: "center",
//                 alignItems: "center",
//                 backgroundColor: "#3B3C59"
//             }}>
//                 <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
//                 <Button onPress={requestPermission} title="grant permission" />
//             </View>
//         );
//     }

//     const predictObject = async (image: HTMLImageElement) => {
//         //TODO: Failed to load model [TypeError: Cannot read property 'fetch' of undefined]
//         await tf.ready();
//         const model = await cocoSsd.load();
//         model.detect(image).then((predictions: DetectedObject[]) => {
//             setPredictions(predictions);
//             console.log(predictions)
//         })
//             .catch(err => {
//                 console.error(err)
//             });
//         // }
//     };

//     const takePic = async () => {
//         try {
//             const data = await camera.current?.takePictureAsync();
//             setData(data);
//             if (data) {
//                 // const image = new Image();
//                 // image.src = data.uri;
//                 // predictObject(data.uri);
//             }
//         } catch (err) {
//             console.error(err);
//         }
//     }

//         return (
//             <View style={{
//                 backgroundColor: "#3B3C59",
//                 justifyContent: "center",
//                 flex: 1
//             }}>
//                 <CameraView ref={camera} style={styles.detailsBox}>
//                     <Text style={[styles.lockitFont, { textAlign: 'left', marginHorizontal: 20, position: 'absolute', top: 10 }]}>
//                         Looking to detect a lock...
//                     </Text>
//                     <Pressable onPress={takePic} style={{ width: 75, height: 75, backgroundColor: 'transparent', borderRadius: 100, position: 'absolute', bottom: 20, borderWidth: 10, borderColor: 'white' }} />
//                 </CameraView>
//             </View>
//         );
//     }

//     const styles = StyleSheet.create({
//         lockitFont: {
//             fontFamily: 'IBM Plex Mono',
//             color: 'red',
//             textAlign: 'center',
//             fontSize: 15,
//         },
//         detailsBox: {
//             display: 'flex',
//             flexDirection: 'column',
//             justifyContent: 'center',
//             alignItems: 'center',
//             borderWidth: 2,
//             borderColor: 'white',
//             backgroundColor: '#5864A6',
//             height: screenHeight - 50,
//         }
//     });

import React, { useEffect, useRef, useState } from "react";

import {
    ActivityIndicator,
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Text,
    View
} from "react-native";

import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-react-native";

import * as cocossd from "@tensorflow-models/coco-ssd";

import * as jpeg from "jpeg-js";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";

import { DetectedObject } from '@tensorflow-models/coco-ssd';

import { fetch } from "@tensorflow/tfjs-react-native";

//TODO: Fix Network request failed error

export default function DetectObjectsScreen() {
    const [isTfReady, setIsTfReady] = useState(false);
    const [isModelReady, setIsModelReady] = useState(false);
    const [predictions, setPredictions] = useState<DetectedObject[]>([]);
    const [imageToAnalyze, setImageToAnalyze] = useState<{ uri: string } | null>(null);
    const model = useRef<null | cocossd.ObjectDetection>(null);

    useEffect(() => {
        const initializeTfAsync = async () => {
            await tf.ready();
            setIsTfReady(true);
        };

        const initializeModelAsync = async () => {
            model.current = await cocossd.load(); // preparing COCO-SSD model
            setIsModelReady(true);
        };

        const getPermissionAsync = async () => {
            if (Platform.OS !== "web") {
                const {
                    status,
                } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== "granted") {
                    alert("Sorry, we need camera roll permissions to make this work!");
                }
            }
        };

        initializeTfAsync();
        initializeModelAsync();
        getPermissionAsync();
    }, []);

    const imageToTensor = (rawImageData: ArrayBuffer) => {
        const { width, height, data } = jpeg.decode(rawImageData, {
            useTArray: true,
        }); // return as Uint8Array

        // Drop the alpha channel info for mobile net
        const buffer = new Uint8Array(width * height * 3);
        let offset = 0; // offset into original data
        for (let i = 0; i < buffer.length; i += 3) {
            buffer[i] = data[offset];
            buffer[i + 1] = data[offset + 1];
            buffer[i + 2] = data[offset + 2];

            offset += 4;
        }

        return tf.tensor3d(buffer, [height, width, 3]);
    };

    const detectObjectsAsync = async (source: any) => {
        try {
            const imageAssetPath = Image.resolveAssetSource(source);
            if (imageAssetPath.uri.startsWith('http')) {
                console.log('URL starts with http');
            } else {
                console.log('URL does not start with http');
            }
            const response = await fetch(imageAssetPath.uri, {});
            const rawImageData = await response.arrayBuffer();
            const imageTensor = imageToTensor(rawImageData);
            if (model.current) {
                const newPredictions = await model.current.detect(imageTensor);
                setPredictions(newPredictions);
                console.log("=== Detect objects predictions: ===");
                console.log(newPredictions);
            }
        } catch (error) {
            console.log("Exception Error: ", error);
        }
    };

    const selectImageAsync = async () => {
        try {
            let response = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
            });

            console.log(response);

            if (!response.canceled) {
                // resize image to avoid out of memory crashes
                const manipResponse = await ImageManipulator.manipulateAsync(
                    response?.assets && response.assets[0]?.uri,
                    [{ resize: { width: 900 } }],
                    { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
                );

                const source = { uri: manipResponse.uri };
                setImageToAnalyze(source);
                // console.log(manipResponse);
                setPredictions([]);
                await detectObjectsAsync(source);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const borderColors = ["blue", "green", "orange", "pink", "purple"];
    const scalingFactor = 280 / 900; // image display size / actual image size

    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
            >
                <View style={styles.welcomeContainer}>
                    <Text style={styles.headerText}>COCO-SSD Object Detection</Text>

                    <View style={styles.loadingContainer}>
                        <View style={styles.loadingTfContainer}>
                            <Text style={styles.text}>TensorFlow.js ready?</Text>
                            {isTfReady ? (
                                <Text style={styles.text}>✅</Text>
                            ) : (
                                <ActivityIndicator size="small" />
                            )}
                        </View>

                        <View style={styles.loadingModelContainer}>
                            <Text style={styles.text}>COCO-SSD model ready? </Text>
                            {isModelReady ? (
                                <Text style={styles.text}>✅</Text>
                            ) : (
                                <ActivityIndicator size="small" />
                            )}
                        </View>
                    </View>
                    <TouchableOpacity
                        style={styles.imageWrapper}
                        onPress={isModelReady ? selectImageAsync : undefined}
                    >
                        {imageToAnalyze && (
                            <View style={{ position: "relative" }}>
                                {isModelReady &&
                                    predictions &&
                                    predictions.map((p, index) => {
                                        return (
                                            <View
                                                key={index}
                                                style={{
                                                    zIndex: 1,
                                                    elevation: 1,
                                                    left: p.bbox[0] * scalingFactor,
                                                    top: p.bbox[1] * scalingFactor,
                                                    width: p.bbox[2] * scalingFactor,
                                                    height: p.bbox[3] * scalingFactor,
                                                    borderWidth: 2,
                                                    borderColor: borderColors[index % 5],
                                                    backgroundColor: "transparent",
                                                    position: "absolute",
                                                }}
                                            />
                                        );
                                    })}

                                <View
                                    style={{
                                        zIndex: 0,
                                        elevation: 0,
                                    }}
                                >
                                    <Image
                                        source={imageToAnalyze}
                                        style={styles.imageContainer}
                                    />
                                </View>
                            </View>
                        )}

                        {isModelReady && !imageToAnalyze && (
                            <Text style={styles.transparentText}>Tap to choose image</Text>
                        )}
                    </TouchableOpacity>
                    <View style={styles.predictionWrapper}>
                        {isModelReady && imageToAnalyze && (
                            <Text style={styles.text}>
                                Predictions: {predictions ? "" : "Predicting..."}
                            </Text>
                        )}
                        {isModelReady &&
                            predictions &&
                            predictions.map((p, index) => {
                                return (
                                    <Text
                                        key={index}
                                        style={{ ...styles.text, color: borderColors[index % 5] }}
                                    >
                                        {p.class}: {p.score} {/* p.bbox */}
                                    </Text>
                                );
                            })}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    welcomeContainer: {
        alignItems: "center",
        marginTop: 10,
        marginBottom: 20,
    },
    contentContainer: {
        paddingTop: 30,
    },
    headerText: {
        marginTop: 5,
        fontSize: 20,
        fontWeight: "bold",
    },
    loadingContainer: {
        marginTop: 5,
    },
    text: {
        fontSize: 16,
    },
    loadingTfContainer: {
        flexDirection: "row",
        marginTop: 10,
    },
    loadingModelContainer: {
        flexDirection: "row",
        marginTop: 10,
    },
    imageWrapper: {
        width: 300,
        height: 300,
        borderColor: "#66c8cf",
        borderWidth: 3,
        borderStyle: "dashed",
        marginTop: 40,
        marginBottom: 10,
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
    },
    imageContainer: {
        width: 280,
        height: 280,
    },
    predictionWrapper: {
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
    },
    transparentText: {
        opacity: 0.8,
    },
});