import tensorflow as tf 


# Mediapipe to track hand landmarks, pandas for xyz coords and what not 


import cv2 
import mediapipe as mp
# import pandas as pd 


# mpHands = mp.tasks.vision.HandLandmarker
# hands = mpHands.(
#     static_image_mode=False,    
#     max_num_hands=2,
#     min_detection_confidence=0.5,
#     min_tracking_confidence=0.5
# )


#initialize with new version of media pipeline, need ref to that hand_landmarker.task)  
baseOptions = mp.tasks.BaseOptions(model_asset_path='hand_landmarker.task')
options = mp.tasks.vision.HandLandmarkerOptions( 
    base_options=baseOptions,
    num_hands=2
)   
detector = mp.tasks.vision.HandLandmarker.create_from_options(options)  

videoPath = "HandTrackTest_Scissors.mp4"
label = "A"


#open cv set up for display 
HAND_CONNECTIONS = [
    (0, 1), (1, 2), (2, 3), (3, 4),        # Thumb
    (0, 5), (5, 6), (6, 7), (7, 8),        # Index
    (5, 9), (9, 10), (10, 11), (11, 12),   # Middle
    (9, 13), (13, 14), (14, 15), (15, 16), # Ring
    (13, 17), (0, 17),                     # Palm / Wrist
    (17, 18), (18, 19), (19, 20)           # Pinky
]



def AnnotateFrame(frame, hand_landmarks):

    h, w, c = frame.shape 
    # Convert all 21 normalized landmarks to pixel (x, y) tuples
    pixel_points = []
    for lm in hand_landmarks:
        cx, cy = int(lm.x * w), int(lm.y * h)
        pixel_points.append((cx, cy))

    # 1. Draw connection lines (Skeleton)
    for start_idx, end_idx in HAND_CONNECTIONS:
        cv2.line(frame, pixel_points[start_idx], pixel_points[end_idx], (0, 255, 0), 2)

    # 2. Draw landmark joints (Nodes)
    for pt in pixel_points:
        cv2.circle(frame, pt, 5, (0, 0, 255), -1)
    pass 




data = []
cap = cv2.VideoCapture(videoPath)

if not cap.isOpened():
    print(f"Error: Could not open video file {videoPath}")
    exit()

while cap.isOpened(): 
    ret, frame = cap.read() 

    if not ret: 
        break

    rgbFrame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB) 

    # Wrap frame in a MediaPipe Image object (Required by Tasks API) to then do detection result
    mpImage = mp.Image(image_format=mp.ImageFormat.SRGB, data=rgbFrame)
    detectionResult = detector.detect(mpImage) 


    if detectionResult.hand_landmarks:  

        singularHandLandmark = detectionResult.hand_landmarks[0]   
        row = []
        for lm in singularHandLandmark:
            row.extend([lm.x, lm.y, lm.z])

        AnnotateFrame(frame, singularHandLandmark)

        row.append(label)
        data.append(row)

    cv2.imshow('Processing Video Data', frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()






# # Save recorded data to CSV
# df = pd.DataFrame(data)
# df.to_csv('hand_landmarks.csv', index=False)
# print("Saved to hand_landmarks.csv!")









#not for training

# data = []
# cap = cv2.VideoCapture(0)

# print("Press 'a', 'b', or 'c' to record landmarks for that sign. Press 'q' to quit.")

# while cap.isOpened(): 
#     ret, frame = cap.read() 


#     rgbFrame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB) 
#     results = hands.process(rgbFrame)

#     cv2.imshow('Record Data', frame) 
#     key = cv2.waitKey(1) & 0xFF

#     if key in [ord('a'), ord('b'), ord('c')] and results.multi_hand_landmarks:
#         label = chr(key).upper()
#         landmarks = results.multi_hand_landmarks[0].landmark
        
#         # Flatten 21 points (x, y, z) into a list of 63 floating-point numbers
#         row = []
#         for lm in landmarks:
#             row.extend([lm.x, lm.y, lm.z])
            
#         row.append(label) # Add target label at the end
#         data.append(row)
#         print(f"Recorded sample for Sign {label} (Total: {len(data)})")
        
#     elif key == ord('q'):
#         break

# cap.release()
# cv2.destroyAllWindows()









