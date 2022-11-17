
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import spotipy.util as util
import pandas as pd
import json
#import webbrowser

#
cid = "74c5872d7a9e4d828f571fb3681b298e"
secret = "e6162baba38e473b8e164252633a3257"
username = "1281887810"
redirect_uri = "https://developer.spotify.com"
localuri = "https://google.com.mx"
oauth_object = spotipy.SpotifyOAuth(cid,secret,localuri)
token_dict = oauth_object.get_access_token()
token = token_dict['access_token']
spotifyObject = spotipy.Spotify(auth=token)
user = spotifyObject.current_user()

#
def getTrackDataFromCSV(varpath):
    data = pd.read_csv(varpath,sep=";")    
    serie = pd.DataFrame()
    counter = 0
    limit = 10
    print("okey")
    for idx, rows in data.iterrows():
        if counter < limit:
            counter=counter+1
            trackid = spotifyObject.search(q='artist:' + rows['artist'] + ' track:' + rows['title'], type='track', limit=1)
            if trackid['tracks']['total'] > 0:
                analysis = spotifyObject.audio_features(trackid['tracks']['items'][0]['id'])
                serie = pd.concat([serie,pd.DataFrame({'id':trackid['tracks']['items'][0]['id'],'title':rows['title'],'artist':rows['artist'],'feeling':rows['feeling'],'danceability':analysis[0]['danceability'],'acousticness':analysis[0]['acousticness'],'energy':analysis[0]['energy'],'instrumentalness':analysis[0]['instrumentalness'],'liveness':analysis[0]['liveness'],'valence':analysis[0]['valence'],'loudness':analysis[0]['loudness'],'speechiness':analysis[0]['speechiness']},index=[0])])
                yield json.dumps({'status':200,'percent':str(counter*100/limit)})
            else:
                yield json.dumps({'status':404, 'percent':str(counter*100/limit)})
            print(str(counter*100/limit),'%')
        else:
            break
    serie.to_csv('complete_data.csv',index=False,encoding='utf-8')
    
def getPlaylistTracks(url):
    searchResults = spotifyObject.playlist_tracks(url, None)
    print(searchResults)
    return searchResults
getTrackDataFromCSV("sexo")
    
    
