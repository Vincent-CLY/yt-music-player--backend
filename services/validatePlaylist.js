export default async function validatePlaylist(playlistID) {
  try {
    const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/playlist?list=${playlistID}&format=json`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`oEmbed request failed with status ${response.status}`);
    }

    const data = await response.json();

    if (!data) {
        throw new Error("Failed to fetch playlist data from oEmbed");
    }

    return {
        isValid: true,
        title: data.title,
        author: {
            name: data.author_name,
            url: data.author_url
        }
    };

  } catch (error) {
    console.error("Error validating playlist:", error);
    return { isValid: false };
  }
}
