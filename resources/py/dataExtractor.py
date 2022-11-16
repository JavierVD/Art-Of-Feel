from sklearn.preprocessing import LabelEncoder,MinMaxScaler
from sklearn.model_selection import train_test_split
from keras.models import Sequential
from keras.layers import Dense
from keras.wrappers.scikit_learn import KerasClassifier
from keras.utils import np_utils
import tensorflow as tf

import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import spotipy.util as util
import pandas as pd
#
cid = "74c5872d7a9e4d828f571fb3681b298e"
secret = "e6162baba38e473b8e164252633a3257"
username = "1281887810"
redirect_uri = "https://developer.spotify.com/"
localuri = "http://localhost/"
#

auth_manager = SpotifyClientCredentials(client_id=cid, client_secret=secret)
sp = spotipy.Spotify(auth_manager=auth_manager)
print(sp)

def getdata(scope):
    token = util.prompt_for_user_token(username,scope,cid,secret,localuri)
    gdata = spotipy.Spotify(auth=token)
    return gdata
tracksdata = []

data = getdata('user-top-read').current_user_top_tracks(limit=50, offset=0, time_range='medium_term')
itemdata = data['items']
for i in range(len(itemdata)):
    eachtrack = {}
    eachtrack['trackid'] = itemdata[i]['id']
    eachtrack['trackname'] = itemdata[i]['name']
    for x in range(len(itemdata[i]['artists'])):
        eachtrack['artistid'] = itemdata[i]['artists'][0]['id']
        eachtrack['artist'] = itemdata[i]['artists'][0]['name']
    tracksdata.append(eachtrack)

print(tracksdata)
trackids = []

for i in range(len(tracksdata)):
    trackids.append(tracksdata[i]['trackid'])    

features = getdata('user-top-read').audio_features(tracks=trackids)
print(features)

td = pd.DataFrame(tracksdata).set_index('trackid')
print(td)
ft = pd.DataFrame(features).set_index('id')
print(ft)


fulldata = pd.merge(td,ft, how='inner', left_index=True, right_index=True)
print(fulldata)
