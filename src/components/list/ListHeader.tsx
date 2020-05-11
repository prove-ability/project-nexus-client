/**@jsx jsx */
import Tab from '@components/common/Tab';
import { css, jsx } from '@emotion/core';
import { RootState } from '@stores/rootReducer';
import { NextPage } from 'next';
import { ChangeEvent } from 'react';
import { useSelector } from 'react-redux';

import { TabItem } from './List';
import ListSearch from './ListSearch';

const ListHeaderStyles = css`
  display: flex;
`;

interface ListHeaderProps {
  keyword: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSearch: () => void;
  tabItems: TabItem[];
  tab: string;
  onTab: (keyword: string) => void;
}

const ListHeader: NextPage<ListHeaderProps> = ({
  keyword,
  onChange,
  onSearch,
  tabItems,
  tab,
  onTab,
}) => {
  // const { isLoading, error: channelsError, channels } = useSelector(
  //   (state: RootState) => state.youtube,
  // );
  const { totalResults, resultsPerPage } = useSelector((state: RootState) => state.youtube);
  return (
    <div css={[ListHeaderStyles]}>
      <Tab tabItems={tabItems} tab={tab} onTab={onTab} />
      <ListSearch keyword={keyword} onChange={onChange} onSearch={onSearch} />
      <div>
        <div>resultsPerPage</div>
        <div>{resultsPerPage}</div>
        <div>totalResults</div>
        <div>{totalResults}</div>
      </div>
    </div>
  );
};

export default ListHeader;
