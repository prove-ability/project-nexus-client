import { ApiSearchResult, CommonItem, getListDetail, getLists } from '@api/youtubeAPI';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '@stores';

export interface YoutubeState {
  channels: Record<string, CommonItem>;
  isLoading: boolean;
  error: string | null;
  nextPageToken: string | null;
  totalResults: number | null;
  resultsPerPage: number | null;
  tab: string;

  channelDetail: any;
}

const initialState: YoutubeState = {
  channels: {},
  isLoading: false,
  error: null,
  nextPageToken: null,
  totalResults: null,
  resultsPerPage: null,
  tab: 'channel',

  channelDetail: {},
};

function startLoading(state: YoutubeState): void {
  state.nextPageToken = null;
  state.totalResults = null;
  state.channels = {};
  state.isLoading = true;

  state.channelDetail = {};
}

function loadingFailed(state: YoutubeState, action: PayloadAction<string>): void {
  state.isLoading = false;
  state.error = action.payload;
}

const youtube = createSlice({
  name: 'youtube',
  initialState,
  reducers: {
    getListsStart: startLoading,
    getListsSuccess(state: YoutubeState, { payload }: PayloadAction<ApiSearchResult>) {
      const {
        data: {
          items,
          nextPageToken,
          pageInfo: { totalResults, resultsPerPage },
        },
      } = payload;
      state.isLoading = false;
      state.error = null;
      state.nextPageToken = nextPageToken;
      state.totalResults = totalResults;
      state.resultsPerPage = resultsPerPage;
      switch (state.tab) {
        case 'channel':
          items.forEach((item: CommonItem) => (state.channels[item.id.channelId] = item));
          break;
        case 'video':
          items.forEach((item: CommonItem) => (state.channels[item.id.videoId] = item));
          break;
      }
    },
    getListsFailure: loadingFailed,
    setTab(state: YoutubeState, action: PayloadAction<string>): void {
      state.tab = action.payload;
      state.nextPageToken = null;
      state.totalResults = null;
      state.channels = {};
    },
    resetYouyube(state: YoutubeState): void {
      state.tab = 'channel';
      state.nextPageToken = null;
      state.totalResults = null;
      state.channels = {};
    },
    getListDetailStart: startLoading,
    getListDetailSuccess(state: YoutubeState, { payload }: PayloadAction<any>) {
      state.isLoading = false;
      state.error = null;
      state.channelDetail = payload.items[0];
    },
    getListDetailFailure: loadingFailed,
  },
});

export const {
  getListsStart,
  getListsSuccess,
  getListsFailure,
  setTab,
  getListDetailStart,
  getListDetailSuccess,
  getListDetailFailure,
} = youtube.actions;

interface FetchListsArgs {
  part: string | undefined;
  type: string;
  q: string;
  order: string;
  maxResults?: number;
}

export const fetchLists = ({
  part,
  type,
  q,
  order,
  maxResults,
}: FetchListsArgs): AppThunk => async (dispatch) => {
  try {
    dispatch(getListsStart());
    const lists = await getLists(part, type, q, order, maxResults);
    dispatch(getListsSuccess(lists));
  } catch (err) {
    dispatch(getListsFailure(err.toString()));
  }
};

export const fetchListsDetail = (id: string): AppThunk => async (dispatch) => {
  try {
    dispatch(getListDetailStart());
    const listsDetail = await getListDetail(id);
    dispatch(getListDetailSuccess(listsDetail));
  } catch (err) {
    dispatch(getListDetailFailure(err.toString()));
  }
};

export default youtube;
