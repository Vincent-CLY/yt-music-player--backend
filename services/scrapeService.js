
// import axios from "axios";
import * as cheerio from "cheerio";

export default async function scrapePlaylistThumbnail(playlistID) {
  try {
    // 直接請求 YouTube Music 的網頁版
    const url = `https://music.youtube.com/playlist?list=${playlistID}`;
    
    // Use native fetch instead of axios
    // 模擬瀏覽器 User-Agent 以避免被阻擋
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8"
      }
    });

    if (!response.ok) {
        throw new Error(`Scrape request failed with status ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // YouTube Music 的封面通常藏在 <meta property="og:image"> 標籤裡
    const ogImage = $('meta[property="og:image"]').attr('content');
    const ogImageWidth = $('meta[property="og:image:width"]').attr('content');
    const ogImageHeight = $('meta[property="og:image:height"]').attr('content');
    
    if (ogImage) {
        console.log("Scraped og:image:", ogImage);
        return {
            url: ogImage,
            width: parseInt(ogImageWidth), 
            height: parseInt(ogImageHeight)
        };
    }
    
    return null;

  } catch (error) {
    console.error("Error scraping thumbnail:", error.message);
    return null;
  }
}
