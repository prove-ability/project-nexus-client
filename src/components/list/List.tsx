/**@jsx jsx */
import ListHeader from '@components/list/ListHeader';
import ListInfo from '@components/list/ListInfo';
import { css, jsx } from '@emotion/core';
import useInput from '@lib/hooks/useInput';
import { RootState } from '@stores/rootReducer';
import youtube, { fetchLists, fetchListsDetail } from '@stores/youtube';
import _ from 'lodash';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ListPopup from './ListPopup';

export interface TabItem {
  name: string;
  text: string;
}
const listStyles = css`
  background-color: #555;
  padding: 20px;
`;

const List: NextPage = () => {
  const tabItems = [
    { name: 'channel', text: '체널' },
    { name: 'video', text: '동영상' },
  ];
  const {
    actions: { setTab, resetYouyube },
  } = youtube;
  useEffect(() => {
    return () => {
      resetYouyube();
    };
  });
  const [detailVisible, setDetailVisible] = useState(false);
  const { tab } = useSelector((state: RootState) => state.youtube);
  const [keyword, onChange, onReset] = useInput('');
  const dispatch = useDispatch();
  const onTab = (keyword: string): void => {
    dispatch(setTab(keyword));
    onReset();
  };
  const onSearch = (): void => {
    const args = {
      part: 'snippet',
      type: tab,
      q: keyword,
      order: 'relevance',
      maxResults: 20,
    };
    dispatch(fetchLists(args));
  };
  const onPopup = (id: string): void => {
    console.log(id);
    dispatch(fetchListsDetail(id));
    setDetailVisible(true);
  };
  const { isLoading, error: channelsError, channels } = useSelector(
    (state: RootState) => state.youtube,
  );
  if (channelsError) {
    return (
      <div>
        <h1>Something went wrong...</h1>
        <div>{channelsError.toString()}</div>
      </div>
    );
  }
  const renderedList = isLoading ? (
    <h3>...Loading</h3>
  ) : (
    _.map(channels, (channel, key) => (
      <ListInfo key={key} channel={channel.snippet} onPopup={onPopup} />
    ))
  );
  return (
    <>
      <div css={[listStyles]}>
        <ListHeader
          tabItems={tabItems}
          keyword={keyword}
          onChange={onChange}
          onSearch={onSearch}
          tab={tab}
          onTab={onTab}
        />
        {renderedList}
      </div>
      {detailVisible && <ListPopup detailVisible={detailVisible} />}
    </>
  );
};

export default List;
