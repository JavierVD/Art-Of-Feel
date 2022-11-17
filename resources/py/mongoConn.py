from pymongo import MongoClient
from pymongo.server_api import ServerApi

import json
import csv


def uploadToMongo():
    client = MongoClient("mongodb+srv://JavierVonDNKLHT:<Peloncito1>@cluster0.qsjefes.mongodb.net/?retryWrites=true&w=majority", server_api=ServerApi('1'))
    db = client.test
    db = client.test1
    csvfile = open('complete_data.csv', 'r')
    reader = csv.DictReader( csvfile ) 
    header = [ "id", "title", "artist","feeling","danceability","acousticness","energy","instrumentalness","liveness","valence","loudness","speechiness"]
    for each in reader:
        row={}
        for field in header:
            row[field]=each[field]
        print (row)
        db.test1.insert_one(row)
    return json.dumps({'result':200})