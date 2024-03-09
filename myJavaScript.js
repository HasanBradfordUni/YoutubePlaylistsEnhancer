import { auth } from 'google/colab';
import { build } from 'googleapiclient/discovery';
import * as re from 're';

var _pj;

function _pj_snippets(container) {
  function in_es6(left, right) {
    if (right instanceof Array || typeof right === "string") {
      return right.indexOf(left) > -1;
    } else {
      if (right instanceof Map || right instanceof Set || right instanceof WeakMap || right instanceof WeakSet) {
        return right.has(left);
      } else {
        return left in right;
      }
    }
  }

  container["in_es6"] = in_es6;
  return container;
}

_pj = {};

_pj_snippets(_pj);
/*This is a program that will add additional functionality to Youtube playlists.
The first feature will be a playlists search (search for videos in a playlist).
The second feature will be adding videos directly to a playlist from the playlist screen.
More features coming soon...*/


class YTPlaylistsEnhancer {
  constructor() {
    var PROJECT_ID, api_key;
    PROJECT_ID = "ytplaylistsenhancer";
    auth.authenticate_user({
      "project_id": PROJECT_ID
    });
    api_key = "AIzaSyDwM1s5KQyEpeeRcyeSU7g3KmjxgmSAYj0";
    this.youtube = build("youtube", "v3", {
      "developerKey": api_key
    });
  }

  getURL() {}

  getPlayListItems() {
    var match, next_page_token, pl_request, pl_response, playList_ID, playlist_id, playlist_url, videos;
    playlist_url = this.getURL();
    match = re.search("list=([a-zA-Z0-9_-]+)", playlist_url);

    if (match) {
      playList_ID = match.group(1);
      console.log("Playlist ID:", playList_ID);
    } else {
      console.log("Could not extract playlist ID.");
    }

    playlist_id = playList_ID;
    videos = [];
    next_page_token = null;

    while (true) {
      pl_request = youtube.playlistItems().list({
        "part": "snippet",
        "playlistId": playlist_id,
        "maxResults": 50,
        "pageToken": next_page_token
      });
      pl_response = pl_request.execute();

      videos += function () {
        var _pj_a = [],
            _pj_b = pl_response["items"];

        for (var _pj_c = 0, _pj_d = _pj_b.length; _pj_c < _pj_d; _pj_c += 1) {
          var item = _pj_b[_pj_c];

          _pj_a.push(item["snippet"]["title"]);
        }

        return _pj_a;
      }.call(this);

      next_page_token = pl_response.get("nextPageToken");

      if (!next_page_token) {
        break;
      }
    }

    return videos;
  }

  search_substring(videos, query) {
    var results;
    results = [];

    for (var video, _pj_c = 0, _pj_a = videos, _pj_b = _pj_a.length; _pj_c < _pj_b; _pj_c += 1) {
      video = _pj_a[_pj_c];

      if (_pj.in_es6(query.lower(), video.lower())) {
        results.append(video);
      }
    }

    return results;
  }

  getResults() {
    var count, queryVideos, videoQuery, videos;
    videoQuery = input("Enter a search term for a video in the playlist: ");
    videos = this.getPlayListItems();
    queryVideos = this.search_substring(videos, videoQuery);
    count = 1;

    for (var vid, _pj_c = 0, _pj_a = queryVideos, _pj_b = _pj_a.length; _pj_c < _pj_b; _pj_c += 1) {
      vid = _pj_a[_pj_c];
      console.log(count.toString() + ". " + vid);
      count += 1;
    }
  }

}
