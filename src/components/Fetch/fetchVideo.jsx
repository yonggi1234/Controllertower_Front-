export async function fetchVideos() {
    try {
      const response = await fetch('http://43.203.120.220:8000/video/');
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error', error);
      return [];
    }
  }
  