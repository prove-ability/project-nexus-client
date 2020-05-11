import axios from 'axios';
import parseLink, { Links } from 'parse-link-header';

const key = process.env.key;

const prefixUrl = 'https://www.googleapis.com/youtube/v3';

interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}

interface YoutubeApi {
  kind: string;
  etag: string;
}

interface Url {
  url: string;
}

interface Thumbnails {
  default: Url;
  medium: Url;
  high: Url;
}

export interface Snippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  liveBroadcastContent: string;
}

export interface CommonId {
  kind: string;
  channelId: string;
  videoId: string;
}

export interface CommonItem extends YoutubeApi {
  id: CommonId;
  snippet: Snippet;
}

export interface Item {
  item: CommonItem;
}

export interface SearchResult extends YoutubeApi {
  nextPageToken: string;
  regionCode: string;
  pageInfo: PageInfo;
  items: CommonItem[];
}

export interface ApiSearchResult {
  pageLinks: Links | null;
  pageCount: number;
  data: SearchResult;
}

const isLastPage = (pageLinks: Links): false | parseLink.Link => {
  return Object.keys(pageLinks).length === 2 && pageLinks.first && pageLinks.prev;
};

const getPageCount = (pageLinks: Links): number => {
  if (!pageLinks) {
    return 0;
  }
  if (isLastPage(pageLinks)) {
    return parseInt(pageLinks.prev.page, 10) + 1;
  } else if (pageLinks.last) {
    return parseInt(pageLinks.last.page, 10);
  } else {
    return 0;
  }
};
// getIs
export async function getLists(
  part = 'snippet',
  type: string,
  q: string,
  order: string,
  maxResults = 20,
): Promise<ApiSearchResult> {
  const url = `${prefixUrl}/search?key=${key}&part=${part}&type=${type}&q=${q}&order=${order}&maxResults=${maxResults}`;
  try {
    const searchResponse = await axios.get<SearchResult>(url);
    let pageCount = 0;
    const pageLinks = parseLink(searchResponse.headers.link);

    if (pageLinks !== null) {
      pageCount = getPageCount(pageLinks);
    }

    return {
      pageLinks,
      pageCount,
      data: searchResponse.data,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
}
export async function getAddLists(
  part = 'snippet',
  pageToken: string,
  maxResults = 20,
  //part, pageToken, maxResults
): Promise<ApiSearchResult> {
  const url = `${prefixUrl}/search?key=${key}&pageToken=${pageToken}&part=${part}&maxResults=${maxResults}`;
  try {
    const searchResponse = await axios.get<SearchResult>(url);
    let pageCount = 0;
    const pageLinks = parseLink(searchResponse.headers.link);

    if (pageLinks !== null) {
      pageCount = getPageCount(pageLinks);
    }

    return {
      pageLinks,
      pageCount,
      data: searchResponse.data,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function getListDetail(id: string): Promise<any> {
  const part =
    'id, snippet, brandingSettings, contentDetails, invideoPromotion, statistics, topicDetails';
  const url = `${prefixUrl}/channels?key=${key}&part=${part}&id=${id}`;

  const { data } = await axios.get<any>(url);
  return data;
}
