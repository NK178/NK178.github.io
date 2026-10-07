


import tensorflow as tf 
import pandas as pd 
import numpy as np 



cvsName = "extracted_landmarks.csv"
data = pd.read_csv(cvsName)


#using the label column to sort out stuff python data sort insane 
unshuffledCoords = data.drop(columns=['label']).values
unshuffledLabels = data['label'].values

#doing this the keras way, gonna shuffle up the data, then gonna split it to 80 % training 20 % test, have to shuffle to make it work 
indicies = np.arange(len(unshuffledCoords))   
np.random.shuffle(indicies) 

shuffledCoords = unshuffledCoords[indicies]
shuffledLabels = unshuffledLabels[indicies]

#hot one encoding , just a simple way to keep track of which letter for whicch cos ML cant interpret strings, will work for now 
classes = sorted(list(set(unshuffledLabels)))
labelToID = {label: idx for idx, label in enumerate(classes)}
shuffledId = np.array([labelToID[label] for label in shuffledLabels])

x = shuffledCoords
y = tf.keras.utils.to_categorical(shuffledId, num_classes=len(classes))



model = tf.keras.models.Sequential([
    tf.keras.layers.Input(shape=(63,)),
    tf.keras.layers.Dense(128, activation='relu'),
    tf.keras.layers.Dropout(0.2), 
    tf.keras.layers.Dense(64, activation='relu'),
    tf.keras.layers.Dropout(0.2),


    #output nodes, based on how many classes i got 
    tf.keras.layers.Dense(len(classes), activation='softmax')

])

model.compile(
    optimizer='adam',
    loss='categorical_crossentropy',
    metrics=['accuracy']
)

model.summary()

model.fit(
    x,y, 
    epochs=50, 
    batch_size = 32, 
    validation_split = 0.2, 
    shuffle = True
)

model.save("hand_model.h5")

print("Training model done!")


# import pandas as pd
# import numpy as np
# import tensorflow as tf
# from tensorflow.keras import layers, models
# from sklearn.model_selection import train_test_split
# from sklearn.preprocessing import LabelBinarizer
# import pickle

# # 1. Load data from CSV
# df = pd.read_csv("extracted_landmarks.csv")

# # 2. Separate Features (X) and Labels (y)
# X = df.drop(columns=['label']).values  # Shape: (num_samples, 63)
# y_raw = df['label'].values             # Array of string labels ('A', 'B', etc.)

# # 3. One-Hot Encode labels ('A' -> [1, 0, 0])
# label_binarizer = LabelBinarizer()
# y = label_binarizer.fit_transform(y_raw)

# # Save class labels list so JavaScript web app knows which index corresponds to which letter
# classes = label_binarizer.classes_
# print(f"Dataset classes detected: {classes}")

# # 4. Split into Training (80%) and Testing (20%) sets
# X_train, X_test, y_train, y_test = train_test_split(
#     X, y, test_size=0.2, random_state=42, stratify=y
# )

# # 5. Build Neural Network Architecture
# model = models.Sequential([
#     # Input layer expects 63 floating-point coordinates
#     layers.Input(shape=(63,)),
    
#     # Hidden dense layers for learning geometric patterns
#     layers.Dense(128, activation='relu'),
#     layers.Dropout(0.2),  # Prevents overfitting
#     layers.Dense(64, activation='relu'),
#     layers.Dropout(0.2),
    
#     # Output layer: output size equals number of gesture classes
#     layers.Dense(len(classes), activation='softmax')
# ])

# # 6. Compile the Model
# model.compile(
#     optimizer='adam',
#     loss='categorical_crossentropy',
#     metrics=['accuracy']
# )

# model.summary()

# # 7. Train Neural Network
# print("\nStarting model training...")
# history = model.fit(
#     X_train, y_train,
#     epochs=50,
#     batch_size=32,
#     validation_data=(X_test, y_test)
# )

# # 8. Evaluate Accuracy on Test Set
# test_loss, test_acc = model.evaluate(X_test, y_test)
# print(f"\nFinal Test Accuracy: {test_acc * 100:.2f}%")

# # 9. Save native Keras Model
# model.save("asl_model.h5")
# print("Saved trained model as 'asl_model.h5'.")

# # Save class mapping labels for JavaScript client
# import json
# with open("classes.json", "w") as f:
#     json.dump(list(classes), f)
# print("Saved class mapping to 'classes.json'.")