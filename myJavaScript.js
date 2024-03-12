function getPlaylistID() {
  var match, playList_ID, playlist_url;
  playlist_url = document.getElementById("urlInput").value;

  let regex = /list=([a-zA-Z0-9_-]+)/;
  match = playlist_url.match(regex);

  if (match) {
    playList_ID = match[1];
    console.log("Playlist ID:", playList_ID);
  } else {
    console.log("Could not extract playlist ID.");
    document.getElementById('videosList').innerHTML = "Could not extract playlist ID.";
  }
  return playList_ID;
}


// Replace 'YOUR_API_KEY' with your actual API key
const apiKey = 'AIzaSyBirpEydenGZDoSY4ED0lXGmD0F57y6C9o';

async function fetchPlaylistVideos(playlistId, pageToken = '', videos = []) {
  let url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${apiKey}`;
  if (pageToken) {
    url += `&pageToken=${pageToken}`;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Process the data.items array
    data.items.forEach(item => {
      console.log(item.snippet.title); // Log the title of each video
      videos.push(item.snippet.title);
    });

    // Check if there are more pages
    if (data.nextPageToken) {
      return fetchPlaylistVideos(playlistId, data.nextPageToken, videos);
    } else {
      return videos; // No more pages, return the final list of videos
    }
  } catch (error) {
    console.error('Error fetching data: ', error);
    return videos; // Return the videos fetched so far in case of error
  }
}