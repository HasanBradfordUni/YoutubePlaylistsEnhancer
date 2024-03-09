window.onLoadCallback = function() {
  gapi.load('client:auth2', function() {
    // Initialize the Google API client with your API key and the APIs you want to use.
    gapi.client.init({
      'apiKey': 'AIzaSyDwM1s5KQyEpeeRcyeSU7g3KmjxgmSAYj0',
      // Your API key will be automatically added to the Discovery Document URLs.
      'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'],
      // After the library is loaded and initialized, you can make API calls.
    });
  });
}

function loadClient() {
  gapi.client.setApiKey("YOUR_API_KEY");
  return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
    .then(function() { console.log("GAPI client loaded for API"); },
          function(err) { console.error("Error loading GAPI client for API", err); });
}

// Make sure the client is loaded and sign-in is complete before calling this method.
function execute() {
  return gapi.client.youtube.playlistItems.list({
    "part": "snippet,contentDetails",
    "maxResults": 25,
    "playlistId": getPlaylistID()
  })
  .then(function(response) {
      // Handle the results here (response.result has the parsed body).
      console.log("Response", response);
    },
    function(err) { console.error("Execute error", err); });
}

// Make sure to call loadClient function when the page is loaded
gapi.load("client:auth2", function() {
  gapi.auth2.init({client_id: "YOUR_CLIENT_ID"});
});

// Call execute function to make an API call
function getResults() {
  loadClient();
  execute();
}

function getURL() {return window.location.href}

function getPlaylistID() {
  var match, playList_ID, playlist_url;
    playlist_url = getURL();
    match = re.search("list=([a-zA-Z0-9_-]+)", playlist_url);

    if (match) {
      playList_ID = match.group(1);
      console.log("Playlist ID:", playList_ID);
    } else {
      console.log("Could not extract playlist ID.");
    }
    return playList_ID
}

  /*getPlayListItems() {
    

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
  }*/
