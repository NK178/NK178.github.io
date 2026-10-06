



import pandas as pd 


cvsName = "extracted_landmarks.csv"
data = pd.read_csv(cvsName)


#using the label column to sort out stuff python data sort insane 
coords = data.drop(columns=["label"]).values
labels = data['label'].values


