from pymongo import MongoClient
from pymongo.server_api import ServerApi
import pandas as pd
import json
import csv
import numpy as np
from sklearn import preprocessing
from sklearn.preprocessing import LabelEncoder,MinMaxScaler
from sklearn.model_selection import train_test_split, cross_val_score, KFold
from keras.models import Sequential
from keras.layers import Dense
from keras.wrappers.scikit_learn import KerasClassifier
from keras.utils import np_utils
import tensorflow as tf

tf.compat.v1.disable_eager_execution()
tf.compat.v1.disable_v2_behavior()
label_encoder = preprocessing.LabelEncoder()


client = MongoClient("mongodb+srv://Mondongo:4qVKJw2QZVg1ZwPU@cluster0.qsjefes.mongodb.net/?retryWrites=true&w=majority", server_api=ServerApi('1'))
db = client.ArtOfFeel
cursor = db.final.find()
df =  pd.DataFrame(list(cursor))
df['encoded']= label_encoder.fit_transform(df['feeling'])
if 'id' in df:
    del df['_id']
    del df['id']
    del df['title']
    del df['artist']
    
col_features = df.columns[1:9]
X = df[col_features]
Y = df['encoded']
X= MinMaxScaler().fit_transform(X)
X_train,X_test,Y_train,Y_test = train_test_split(X,Y,test_size=0.1,random_state=15)
def model_fn():
    model = Sequential()
    model.add(Dense(16,input_dim=8,activation='relu'))
    model.add(Dense(32,activation='relu'))
    model.add(Dense(97,activation='softmax'))
    model.compile(loss='categorical_crossentropy',optimizer='adam', metrics=['accuracy'])
    return model
print(X)
estimator = KerasClassifier(build_fn=model_fn,epochs=10000,batch_size=100)
estimator.fit(X_train,Y_train)
y_preds = estimator.predict(X_test)