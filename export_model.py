from ultralytics import YOLO

model = YOLO("/content/drive/MyDrive/Colab Notebooks/LocksDetectionYOLO/TrainingResults/locksDetection/weights/best.pt")
model.export(format="tflite")  # Export to TensorFlow Lite format