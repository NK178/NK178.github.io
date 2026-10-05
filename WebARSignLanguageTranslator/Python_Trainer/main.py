import tensorflow as tf 
# from tensorflow.keras.models import Sequential
# from tensorflow.keras.layers import Dense, Dropout 



# Mediapipe to track hand landmarks, pandas for xyz coords and what not 


import cv2 
import mediapipe as mp
# import pandas as pd 


mpHands = mp.solutions.hands 
hands = mpHands.Hands

data = []
cap = cv2.VideoCapture(0)

print("Press 'a', 'b', or 'c' to record landmarks for that sign. Press 'q' to quit.")

while cap.isOpened(): 
    ret, frame = cap.read() 


    rgbFrame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB) 
    results = hands.process(rgbFrame)

    cv2.imshow('Record Data', frame) 
    key = cv2.waitKey(1) & 0xFF

    if key in [ord('a'), ord('b'), ord('c')] and results.multi_hand_landmarks:
        label = chr(key).upper()
        landmarks = results.multi_hand_landmarks[0].landmark
        
        # Flatten 21 points (x, y, z) into a list of 63 floating-point numbers
        row = []
        for lm in landmarks:
            row.extend([lm.x, lm.y, lm.z])
            
        row.append(label) # Add target label at the end
        data.append(row)
        print(f"Recorded sample for Sign {label} (Total: {len(data)})")
        
    elif key == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()

# # Save recorded data to CSV
# df = pd.DataFrame(data)
# df.to_csv('hand_landmarks.csv', index=False)
# print("Saved to hand_landmarks.csv!")











