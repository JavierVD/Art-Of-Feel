from flask import Flask, request,Response, stream_with_context
import json 
from flask_cors import CORS

import spotiConn
import mongoConn

app = Flask(__name__) 
CORS(app)

@app.route('/spotifySongsData', methods = ['POST']) 
def getSongsForTrain():
    data = request.get_json()
    data = data['url'] 
    return Response((spotiConn.getTrackDataFromCSV(data)))

@app.route('/uploadToMongo', methods = ['GET']) 
def uploadToMongo():
    return Response(mongoConn.uploadToMongo())

@app.route('/spotifyPlaylist', methods = ['POST']) 
def getPlaylistForAnalyze():
    data = request.get_json()
     
    yield  spotiConn.getPlaylistTracks(data)
    print(data)
    result = data
    return json.dumps({"result":result})
   
if __name__ == "__main__": 
    app.run(port=5000)