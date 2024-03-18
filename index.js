import { API_KEY } from './config.js';

export function getPlaylistID() {
  var match, playList_ID, playlist_url;
  playlist_url = document.getElementById("urlInput").value;

  if (playlist_url == null) {
    var playlist_url = document.getElementById('iframeId').contentWindow.location.href;
  } 

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

const apiKey = API_KEY;
const v = null;

export async function fetchPlaylistVideos(playlistId, pageToken = '', videos = []) {
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

async function searchPlaylists(searchTerm, pageToken = '', playlistResults = []) {

  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${searchTerm}&type=playlist&key=${apiKey}`;

  console.log('Searching for:', searchTerm);

  // Display a placeholder for search results
  document.getElementById('results').innerHTML = '<div class="playlists">Search results for "' + searchTerm + '" will be displayed here.</div>';

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Process the data.items array
    data.items.forEach(item => {
      console.log(item.snippet); // Log the title of each video
      playlistResults.push(item.snippet);
    });

    // Check if there are more pages
    if (data.nextPageToken) {
      return searchPlaylists(searchTerm, data.nextPageToken, playlistResults);
    } else {
      return playlistResults; // No more pages, return the final list of playlist results
    }
  } catch (error) {
    console.error('Error fetching data: ', error);
    return playlistResults; // Return the playlist results fetched so far in case of error
  }
}

export async function displaySearchResults() {
  var searchTerm = document.getElementById('searchQuery').value;
  try {
    const playlistResults = await searchPlaylists(searchTerm, '', []);
    console.log(playlistResults);
  } catch (error) {
    console.log(error)
  }

  var paragraph = document.getElementById('playlists');

  // Clear the paragraph content
  paragraph.innerHTML = '';

  // Iterate over the array and append each element to the paragraph
  playlistResults.forEach(function (element) {
    // Create a text node for each element
    var textNode = document.createTextNode(element);

    // Append the text node to the paragraph
    paragraph.appendChild(textNode);
    paragraph.appendChild(document.createElement('br'));
  });
}

