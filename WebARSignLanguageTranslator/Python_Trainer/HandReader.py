

# Mediapipe to track hand landmarks, pandas for xyz coords and what not 
import cv2 
import mediapipe as mp
import pandas as pd 
import os

# import tensorflow as tf 


isPaused = False; 
isOutputShowed = False; 
isHandAnnotated = False; 
shouldSaveCSV = True; 


#initialize with new version of media pipeline, need ref to that hand_landmarker.task)  
baseOptions = mp.tasks.BaseOptions(
    model_asset_path='hand_landmarker.task',
    delegate=mp.tasks.BaseOptions.Delegate.CPU                 
)

options = mp.tasks.vision.HandLandmarkerOptions( 
    base_options=baseOptions,
    running_mode= mp.tasks.vision.RunningMode.VIDEO,
    num_hands=2
)   
detector = mp.tasks.vision.HandLandmarker.create_from_options(options)  

# videoPath = "HandTrackTest_Scissors.mp4"
# label = "A"





# videoPath = "HandTrack_R.mp4"
# videoPath = "HandTrack_P.mp4"
videoPath = "HandTrack_S.mp4"


filePath = f"Training_Videos/{videoPath}"

hardCodedLabelIndex = 2; 
hardCodedLabels = ["R", "P", "S"]


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
cap = cv2.VideoCapture(filePath)

if not cap.isOpened():
    print(f"Error: Could not open video file {filePath}")
    exit()
# frame_count = 0
while cap.isOpened(): 


    if not isPaused: 
        ret, frame = cap.read() 
        if not ret: 
            break

        # frame_count += 1
        # if frame_count % 2 != 0:  # Process every 2nd frame
        #     continue

        frame = cv2.resize(frame, (640, 480))

        rgbFrame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB) 

        # Wrap frame in a MediaPipe Image object (Required by Tasks API) to then do detection result
        mpImage = mp.Image(image_format=mp.ImageFormat.SRGB, data=rgbFrame)


        frameTimestampMs = int(cap.get(cv2.CAP_PROP_POS_MSEC))
        detectionResult = detector.detect_for_video(mpImage, frameTimestampMs)        
        # detectionResult = detector.detect(mpImage) 


        if detectionResult.hand_landmarks:  

            singularHandLandmark = detectionResult.hand_landmarks[0]   
            row = []
            for lm in singularHandLandmark:
                row.extend([lm.x, lm.y, lm.z])

            if isHandAnnotated and isOutputShowed:
                AnnotateFrame(frame, singularHandLandmark)



            #for testing purposes, i will hard code the sign lanugage labels 

            row.append(hardCodedLabels[hardCodedLabelIndex])
            data.append(row)

    if isOutputShowed:
        if isPaused: 
            display_frame = frame.copy()
            cv2.putText(display_frame, "PAUSED (Press Space or P to resume)", (20, 40), 
                        cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 2)
            cv2.imshow('Processing Video Data', display_frame)
        elif not isPaused:  
            cv2.imshow('Processing Video Data', frame)

        key = cv2.waitKey(1 if not isPaused else 0) & 0xFF 


        if key == ord(' '): 
            isPaused = not isPaused 

        if key == ord('q'):
            break
        pass

    

cap.release()
cv2.destroyAllWindows()




if (shouldSaveCSV):
    columns = [f"{axis}{i}" for i in range(21) for axis in ("x", "y", "z")] + ["label"] 
    df = pd.DataFrame(data, columns=columns)
    csv_file = "extracted_landmarks.csv"
    df.to_csv(csv_file, mode='a', index=False, header=not os.path.exists(csv_file)) 

    print(f"Extraction complete! Saved {len(data)} frame rows to '{csv_file}'.")
    pass









