// Fetch the data from the API
const apiUrl = 'https://api.freeapi.app/api/v1/public/youtube/videos';
let allVideos = [];

// Function to fetch videos
async function fetchVideos() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        allVideos = data.data.data;
        displayVideos(allVideos);
    } catch (error) {
        console.error("Error fetching data from api:", error);
    }
}

// Function to display videos
function displayVideos(videos) {
    const videoGrid = document.getElementById('videoGrid');
    videoGrid.innerHTML = ''; // Clear any existing text content
    videos.forEach(video => {
        const videoCard = document.createElement('div');
        videoCard.classList.add('video-card');
        const videoHTML = `
            <a href="https://www.youtube.com/watch?v=${video.items.id}" target="_blank">
                <img src="${video.items.snippet.thumbnails.standard.url}" alt="${video.items.snippet.thumbnails.default.url}" class="thumbnail">
                <div class="video-info">
                    <h3>${video.items.snippet.title}</h3>
                    <p>${video.items.snippet.channelTitle}</p>
                </div>
            </a>
        `;
        videoCard.innerHTML = videoHTML;
        videoGrid.appendChild(videoCard);
    });
}

// Function to filter videos based on the search input
function filterVideos() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filteredVideos = allVideos.filter(video => {
        return video.items.snippet.title.toLowerCase().includes(searchTerm) ||
            video.items.snippet.channelTitle.toLowerCase().includes(searchTerm);
    });
    displayVideos(filteredVideos);
}

// Initialize the page by fetching videos
fetchVideos();