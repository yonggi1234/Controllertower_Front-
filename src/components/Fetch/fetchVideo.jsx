// fetchvideo.jsx
export async function fetchVideos() {
  try {
    const response = await fetch('https://gamst.omoknooni.link/video/');
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching videos:', error);
    return [];
  }
}
