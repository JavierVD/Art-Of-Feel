from pymongo import MongoClient
from pymongo.server_api import ServerApi
import pandas as pd
import json
import csv


def uploadToMongo():
    client = MongoClient("mongodb+srv://Mondongo:4qVKJw2QZVg1ZwPU@cluster0.qsjefes.mongodb.net/?retryWrites=true&w=majority", server_api=ServerApi('1'))
    db = client.ArtOfFeel
    csvfile = open('complete_data.csv', 'r')
    results = pd.read_csv('complete_data.csv')
    reader = csv.DictReader(csvfile)
    counter = 0
    header = ["id", "title", "artist","feeling","danceability","acousticness","energy","instrumentalness","liveness","valence","loudness","speechiness"]
    for each in reader:
        row={}
        counter +=1
        for field in header:
            row[field]=each[field]
        print(row)
        db.final.insert_one(row)
        yield json.dumps({'result':str("{0:.2f}".format(counter*100/len(results)))})